/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { BarcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table/interface';
import { useModel, useParams } from 'umi';
import { useEffect, useState } from 'react';
import numeral from 'numeral';

import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useCreateInput, useUpdateInput } from '@/hooks/input.hooks';
import AlertLoading from '@/components/Alerts/AlertLoading';
import AlertSave from '@/components/Alerts/AlertSave';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsSelectProducts } from '@/components/SelectProducts';
import SelectProducts from '@/components/SelectProducts';
import Footer from './footer';
import Header from './header';
import type { DetailInput, StockInput, Product } from '@/graphql/graphql';
import { ActionDetailInput } from '@/graphql/graphql';
import { StatusStockInput } from '@/graphql/graphql';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  input?: Partial<StockInput>;
  setCurrentStep: (step: number) => void;
  allowEdit: boolean;
};

const FormInput = ({ input, setCurrentStep, allowEdit }: Props) => {
  const [details, setDetails] = useState<Partial<DetailInput & { action: ActionDetailInput }>[]>(
    [],
  );
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [propsAlertSave, setPropsAlertSave] = useState<{
    type: TYPES;
    visible: boolean;
    message: string;
    status?: StatusStockInput;
  }>({
    visible: false,
    message: '',
    type: 'error',
  });
  const [observation, setObservation] = useState('');

  const { id } = useParams<Partial<{ id: string }>>();

  const { initialState } = useModel('@@initialState');

  const [createInput, paramsCreate] = useCreateInput();
  const [updateInput, paramsUpdate] = useUpdateInput();

  /**
   * @description se encarga de abrir aviso de información
   * @param message error de apollo
   */
  const onShowInformation = (message: string) => {
    setPropsAlert({
      message,
      type: 'warning',
      visible: true,
    });
  };

  /**
   * @description maneja el error de la consulta
   * @param message error que genera al consulta
   */
  const showError = (message: string) => {
    setPropsAlert({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de mostrar la alerta de guardado y cancelar
   * @param status estado actual de la entrada
   */
  const showAlertSave = (status?: StatusStockInput) => {
    try {
      if (
        details.length > 0 ||
        status === StatusStockInput.Cancelled ||
        observation !== (input?.observation || '')
      ) {
        if (status === StatusStockInput.Cancelled) {
          setPropsAlertSave({
            status,
            visible: true,
            message: '¿Está seguro que desea cancelar la entrada?',
            type: 'error',
          });
        } else if (status === StatusStockInput.Open) {
          setPropsAlertSave({
            status,
            visible: true,
            message: '¿Está seguro que desea guardar la entrada?',
            type: 'warning',
          });
        } else if (status === StatusStockInput.Confirmed) {
          setPropsAlertSave({
            status,
            visible: true,
            message: '¿Está seguro que desea enviar la entrada?',
            type: 'warning',
          });
        } else {
          onShowInformation('La entrada no tiene productos');
        }
      } else {
        onShowInformation('No se encontraron cambios en la entrada');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de guardar el traslado
   * @param status se usa para definir el estado de la entrada
   */
  const saveInput = async (status?: StatusStockInput) => {
    try {
      if (id) {
        const detailsFilter = details.filter((detail) => detail?.action);

        const newDetails = detailsFilter.map((detail) => ({
          productId: detail?.product?._id || '',
          quantity: detail?.quantity || 1,
          action: detail?.action as ActionDetailInput,
        }));
        if (newDetails.length > 0 || status || observation !== input?.observation) {
          const props = {
            details: newDetails,
            observation,
            status,
          };

          if (props.status === StatusStockInput.Open) {
            delete props.status;
          }

          const response = await updateInput({
            variables: {
              input: props,
              id,
            },
          });
          if (response?.data?.updateStockInput && status === StatusStockInput.Open) {
            setPropsAlert({
              message: `Entrada No. ${response?.data?.updateStockInput?.number} actualizada correctamente `,
              type: 'success',
              visible: true,
              redirect:
                response?.data?.updateStockInput?.status === StatusStockInput.Confirmed
                  ? '/inventory/input/list'
                  : undefined,
            });
          } else if (response?.data?.updateStockInput && status === StatusStockInput.Confirmed) {
            setPropsAlert({
              message: `Entrada No. ${response?.data?.updateStockInput?.number} creada correctamente `,
              type: 'success',
              visible: true,
              redirect:
                response?.data?.updateStockInput?.status === StatusStockInput.Confirmed
                  ? '/inventory/input/list'
                  : undefined,
            });
          } else if (response?.data?.updateStockInput && status === StatusStockInput.Cancelled) {
            setPropsAlert({
              message: `Entrada No. ${response?.data?.updateStockInput?.number} cancelada correctamente `,
              type: 'success',
              visible: true,
              redirect:
                response?.data?.updateStockInput?.status === StatusStockInput.Confirmed
                  ? '/inventory/input/list'
                  : undefined,
            });
          }
        } else {
          onShowInformation('La entrada no tiene cambios a realizar');
        }
      } else {
        if (status === StatusStockInput.Cancelled) {
          setCurrentStep(0);
        } else {
          const newDetails = details.map((detail) => ({
            productId: detail?.product?._id || '',
            quantity: detail?.quantity || 1,
          }));
          const props = {
            details: newDetails,
            warehouseId:
              input?.warehouse?._id || initialState?.currentUser?.shop?.defaultWarehouse?._id || '',
            observation,
            status,
          };
          const response = await createInput({
            variables: {
              input: props,
            },
          });
          if (response?.data?.createStockInput && status === StatusStockInput.Confirmed) {
            setPropsAlert({
              message: `Entrada creada correctamente No. ${response?.data?.createStockInput?.number}`,
              type: 'success',
              visible: true,
              redirect:
                status === StatusStockInput.Confirmed
                  ? '/inventory/input/list'
                  : `/inventory/input/${response?.data?.createStockInput?._id}`,
            });
          } else if (response?.data?.createStockInput && status === StatusStockInput.Open) {
            setPropsAlert({
              message: `Entrada guardada correctamente No. ${response?.data?.createStockInput?.number}`,
              type: 'success',
              visible: true,
              redirect: `/inventory/input/${response?.data?.createStockInput?._id}`,
            });
          }
        }
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description elimina un producto
   * @param _id identificador del producto a eliminar
   */
  const deleteDetail = (_id: string) => {
    try {
      if (setDetails) {
        const productFind = details.find((detail) => detail?.product?._id);

        if (productFind && !productFind.__typename) {
          setDetails(details.filter((detail) => detail?.product?._id !== _id));
        } else {
          setDetails(
            details.map((detail) => {
              if (detail?.product?._id === _id) {
                return {
                  ...detail,
                  action: ActionDetailInput.Delete,
                };
              }
              return detail;
            }),
          );
        }
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description actualiza la cantidad de un producto
   * @param product producto a actualizar
   * @param quantity cantidad nueva a asignar
   */
  const updateDetail = (product: Partial<Product>, quantity: number) => {
    try {
      if (setDetails) {
        const productFind = input?.details?.find((detail) => detail?.product?._id === product?._id);
        setDetails(
          details.map((detail) => {
            if (detail?.product?._id === product?._id) {
              return {
                ...detail,
                quantity: quantity || 1,
                action: productFind ? ActionDetailInput.Update : ActionDetailInput.Create,
              };
            }
            return detail;
          }) || [],
        );
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description crea un producto
   * @param product identificador del producto a crear
   * @param quantity cantidad  a asignar
   */
  const createDetail = (product: Product, quantity: number) => {
    try {
      const findProduct = input?.details?.find((detail) => detail?.product?._id === product._id);
      if (findProduct) {
        updateDetail(product, quantity);
      } else {
        if (setDetails) {
          setDetails([...details, { product, quantity, action: ActionDetailInput.Create }]);
        }
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de cerrar la alerta information
   */
  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description se encarga de cerrar la alerta Save
   */
  const onCancelAlert = () => {
    setPropsAlertSave({
      visible: false,
      message: '',
      type: 'error',
    });
  };

  useEffect(() => {
    try {
      if (id) {
        if (details?.length === 0) {
          setDetails(input?.details || []);
        }
        setObservation(input?.observation || '');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  }, [input, id]);

  const propsAlertSaveFinal: PropsAlertSave = {
    ...propsAlertSave,
    onOk: saveInput,
    onCancel: onCancelAlert,
  };

  const propsSelectProduct: PropsSelectProducts = {
    details: details.filter((item) => item?.action !== ActionDetailInput.Delete),
    validateStock: false,
    warehouseId: input?.warehouse?._id,
    createDetail,
    updateDetail,
    deleteDetail,
  };

  const columns: ColumnsType<Partial<DetailInput>> = [
    {
      title: 'Referencia',
      dataIndex: 'product',
      render: ({ reference, barcode }: Product) => (
        <Row>
          <Col span={24}>
            {reference?.name} / {reference?.description}
          </Col>
          <Col span={24}>
            <Tag icon={<BarcodeOutlined />}>{barcode}</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'product',
      render: ({ color }: Product) => {
        return (
          <Space>
            <Avatar
              size="small"
              style={{ backgroundColor: color?.html, border: 'solid 1px black' }}
              src={`${CDN_URL}/${color?.image?.urls?.webp?.small}`}
            />
            <Text style={{ marginLeft: 10 }}>{color?.name_internal}</Text>
          </Space>
        );
      },
    },
    {
      title: 'Talla',
      dataIndex: 'product',
      render: ({ size }: Product) => size.value,
    },
    {
      title: 'Costo Unitario',
      dataIndex: 'product',
      render: (product: Product) => numeral(product?.reference?.price).format('$ 0,0'),
    },
    {
      title: 'Inventario',
      dataIndex: 'product',
      align: 'center',
      render: ({ stock }: Product) =>
        stock && (
          <Badge
            overflowCount={99999}
            count={stock[0]?.quantity}
            style={{ backgroundColor: (stock[0]?.quantity || 0) > 0 ? '#dc9575' : 'red' }}
            showZero
          />
        ),
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      align: 'center',
      render: (quantity: number, { product }) => (
        <InputNumber
          value={quantity || 0}
          min={1}
          onChange={(value) => updateDetail(product || {}, value)}
          disabled={!allowEdit}
        />
      ),
    },
    {
      title: 'Opciones',
      dataIndex: 'product',
      align: 'center',
      render: ({ _id = '' }: Product) => (
        <Tooltip title="Eliminar">
          <Popconfirm
            title="¿Está seguro que desea eliminar?"
            onConfirm={() => deleteDetail(_id)}
            okText="Aceptar"
            cancelText="Cancelar"
          >
            <Button icon={<DeleteOutlined />} type="primary" danger disabled={!allowEdit} />
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Header
        allowEdit={allowEdit}
        input={input}
        setObservation={setObservation}
        observation={observation}
      />
      {allowEdit && (
        <Card bordered={false} size="small">
          <Form layout="vertical">
            <FormItem label="Código de barras">
              <SelectProducts {...propsSelectProduct} />
            </FormItem>
          </Form>
        </Card>
      )}
      <Card>
        <Table
          columns={columns}
          dataSource={details
            .filter((detail) => detail?.action !== ActionDetailInput.Delete)
            .reverse()}
          scroll={{ x: 1000 }}
          pagination={{ size: 'small' }}
        />
      </Card>
      <Footer allowEdit={allowEdit} input={input} saveInput={showAlertSave} details={details} />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertLoading visible={paramsUpdate?.loading} message="Guardando Entrada" />
      <AlertLoading visible={paramsCreate?.loading} message="Creando Entrada" />
      <AlertSave {...propsAlertSaveFinal} />
    </>
  );
};

export default FormInput;
