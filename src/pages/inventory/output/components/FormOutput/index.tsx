/* eslint-disable react-hooks/exhaustive-deps */
import { BarcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
  Table,
  Popconfirm,
} from 'antd';
import { useModel, useParams } from 'umi';
import type { ColumnsType } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';
import numeral from 'numeral';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
import AlertLoading from '@/components/Alerts/AlertLoading';
import AlertSave from '@/components/Alerts/AlertSave';
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectProducts from '@/components/SelectProducts';
import type { Props as PropsSelectProducts } from '@/components/SelectProducts';
import { useCreateOutput, useUpdateOutput } from '@/hooks/output.hooks';
import Header from './header';
import Footer from './footer';
import type { DetailOutput, StockOutput, Product } from '@/graphql/graphql';
import { ActionDetailOutput, StatusStockOutput } from '@/graphql/graphql';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  output?: Partial<StockOutput>;
  setCurrentStep: (step: number) => void;
  allowEdit: boolean;
};

const FormOutput = ({ output, setCurrentStep, allowEdit }: Props) => {
  const [details, setDetails] = useState<Partial<DetailOutput & { action: ActionDetailOutput }>[]>(
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
    status?: StatusStockOutput;
  }>({
    visible: false,
    message: '',
    type: 'error',
  });
  const [observation, setObservation] = useState('');

  const { id } = useParams<Partial<{ id: string }>>();

  const { initialState } = useModel('@@initialState');

  const [createOutput, paramsCreate] = useCreateOutput();
  const [updateOutput, paramsUpdate] = useUpdateOutput();

  /**
   * @description se encarga de abrir aviso de información
   * @param error error de apollo
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
   * @param status estado actual de la salida
   */
  const showAlertSave = (status?: StatusStockOutput) => {
    if (
      details.length > 0 ||
      status === StatusStockOutput.Cancelled ||
      observation !== (output?.observation || '')
    ) {
      if (status === StatusStockOutput.Cancelled) {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea cancelar la salida?',
          type: 'error',
        });
      } else if (status === StatusStockOutput.Open) {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea guardar la salida?',
          type: 'warning',
        });
      } else if (status === StatusStockOutput.Confirmed) {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea enviar la salida?',
          type: 'warning',
        });
      } else {
        onShowInformation('La salida no tiene productos');
      }
    } else {
      onShowInformation('No se encontraron cambios en la salida');
    }
  };

  /**
   * @description se encarga de guardar el traslado
   * @param status se usa para definir el estado de la salida
   */
  const saveOutput = async (status?: StatusStockOutput) => {
    try {
      if (id) {
        const detailsFilter = details.filter((detail) => detail?.action);

        const newDetails = detailsFilter.map((detail) => ({
          productId: detail?.product?._id || '',
          quantity: detail?.quantity || 1,
          action: detail?.action as ActionDetailOutput,
        }));
        if (newDetails.length > 0 || status || observation !== output?.observation) {
          const props = {
            details: newDetails,
            observation,
            status,
          };

          if (props.status === StatusStockOutput.Open) {
            delete props.status;
          }

          const response = await updateOutput({
            variables: {
              input: props,
              id,
            },
          });
          if (response?.data?.updateStockOutput && status === StatusStockOutput.Open) {
            setPropsAlert({
              message: `Salida No. ${response?.data?.updateStockOutput?.number} actualizada correctamente `,
              type: 'success',
              visible: true,
              redirect:
                response?.data?.updateStockOutput?.status === StatusStockOutput.Confirmed
                  ? '/inventory/output/list'
                  : undefined,
            });
          } else if (response?.data?.updateStockOutput && status === StatusStockOutput.Confirmed) {
            setPropsAlert({
              message: `Salida No. ${response?.data?.updateStockOutput?.number} creada correctamente `,
              type: 'success',
              visible: true,
              redirect:
                response?.data?.updateStockOutput?.status === StatusStockOutput.Confirmed
                  ? '/inventory/output/list'
                  : undefined,
            });
          } else if (response?.data?.updateStockOutput && status === StatusStockOutput.Cancelled) {
            setPropsAlert({
              message: `Salida No. ${response?.data?.updateStockOutput?.number} cancelada correctamente `,
              type: 'success',
              visible: true,
              redirect:
                response?.data?.updateStockOutput?.status === StatusStockOutput.Confirmed
                  ? '/inventory/output/list'
                  : undefined,
            });
          }
        } else {
          onShowInformation('La salida no tiene cambios a realizar');
        }
      } else {
        if (status === StatusStockOutput.Cancelled) {
          setCurrentStep(0);
        } else {
          const newDetails = details.map((detail) => ({
            productId: detail?.product?._id || '',
            quantity: detail?.quantity || 1,
          }));
          const props = {
            details: newDetails,
            warehouseId:
              output?.warehouse?._id ||
              initialState?.currentUser?.shop?.defaultWarehouse?._id ||
              '',
            observation,
            status,
          };
          const response = await createOutput({
            variables: {
              input: props,
            },
          });
          if (response?.data?.createStockOutput && status === StatusStockOutput.Confirmed) {
            setPropsAlert({
              message: `Salida creada correctamente No. ${response?.data?.createStockOutput?.number}`,
              type: 'success',
              visible: true,
              redirect:
                status === StatusStockOutput.Confirmed
                  ? '/inventory/output/list'
                  : `/inventory/output/${response?.data?.createStockOutput?._id}`,
            });
          } else if (response?.data?.createStockOutput && status === StatusStockOutput.Open) {
            setPropsAlert({
              message: `Salida guardada correctamente No. ${response?.data?.createStockOutput?.number}`,
              type: 'success',
              visible: true,
              redirect: `/inventory/output/${response?.data?.createStockOutput?._id}`,
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
                action: ActionDetailOutput.Delete,
              };
            }
            return detail;
          }),
        );
      }
    }
  };

  /**
   * @description actualiza la cantidad de un producto
   * @param _id identificador del producto a actualizar
   * @param quantity cantidad nueva a asignar
   */
  const updateDetail = (product: Partial<Product>, quantity: number) => {
    if (setDetails) {
      if (product.stock && product?.stock[0].quantity) {
        if (product?.stock[0].quantity >= quantity) {
          const productFind = output?.details?.find(
            (detail) => detail?.product?._id === product?._id,
          );
          setDetails(
            details.map((detail) => {
              if (detail?.product?._id === product?._id) {
                return {
                  ...detail,
                  quantity: quantity || 1,
                  action: productFind ? ActionDetailOutput.Update : ActionDetailOutput.Create,
                };
              }
              return detail;
            }) || [],
          );
        } else {
          onShowInformation(
            `El producto ${product?.barcode} / ${product?.reference?.name} no tiene unidades suficientes, Inventario: ${product?.stock[0].quantity}`,
          );
        }
      }
    }
  };

  /**
   * @description crea un producto
   * @param product identificador del producto a crear
   * @param quantity cantidad  a asignar
   */
  const createDetail = (product: Product, quantity: number) => {
    if (setDetails) {
      if (product?.stock && product.stock[0].quantity) {
        if (product?.stock[0].quantity >= quantity) {
          const findProduct = output?.details?.find(
            (detail) => detail?.product?._id === product._id,
          );
          if (findProduct) {
            updateDetail(product, quantity);
          } else {
            setDetails([...details, { product, quantity, action: ActionDetailOutput.Create }]);
          }
        } else {
          onShowInformation(
            `El producto ${product?.barcode} / ${product?.reference?.name} no tiene unidades suficientes, Inventario: ${product?.stock[0].quantity}`,
          );
        }
      }
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
    if (id) {
      if (details?.length === 0) {
        setDetails(output?.details || []);
      }
      setObservation(output?.observation || '');
    }
  }, [output, id]);

  const propsAlertSaveFinal: PropsAlertSave = {
    ...propsAlertSave,
    onOk: saveOutput,
    onCancel: onCancelAlert,
  };

  const propsSelectProduct: PropsSelectProducts = {
    details: details.filter((item) => item?.action !== ActionDetailOutput.Delete),
    validateStock: true,
    warehouseId: output?.warehouse?._id,
    createDetail,
    updateDetail,
    deleteDetail,
  };

  const columns: ColumnsType<Partial<DetailOutput>> = [
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
              //src={apiUrl + color.image?.imageSizes?.thumbnail}
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
          max={product?.stock ? product?.stock[0]?.quantity : 0}
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
        output={output}
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
          dataSource={details.filter((detail) => detail?.action !== ActionDetailOutput.Delete)}
          scroll={{ x: 1000 }}
          pagination={{ size: 'small' }}
        />
      </Card>
      <Footer allowEdit={allowEdit} output={output} saveOutput={showAlertSave} details={details} />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertLoading visible={paramsUpdate?.loading} message="Guardando Salida" />
      <AlertLoading visible={paramsCreate?.loading} message="Creando Salida" />
      <AlertSave {...propsAlertSaveFinal} />
    </>
  );
};

export default FormOutput;
