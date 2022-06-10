import type { ColumnsType } from 'antd/lib/table';
import Table from 'antd/lib/table';
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
} from 'antd';
import { BarcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useModel, useParams } from 'umi';

import { useCreateAdjustment, useUpdateAdjustment } from '@/hooks/adjustment.hooks';
import AlertLoading from '@/components/Alerts/AlertLoading';
import AlertSave from '@/components/Alerts/AlertSave';
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectProducts from '@/components/SelectProducts';
import type { Props as PropsSelectProducts } from '@/components/SelectProducts';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
import type { DetailAdjustment, Product, StockAdjustment } from '@/graphql/graphql';
import { ActionDetailAdjustment } from '@/graphql/graphql';
import { StatusStockAdjustment } from '@/graphql/graphql';
import Footer from './footer';
import Header from './header';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  adjustment?: Partial<StockAdjustment>;
  setCurrentStep: (step: number) => void;
  allowEdit: boolean;
};

const FormAdjustment = ({ adjustment, setCurrentStep, allowEdit }: Props) => {
  const [details, setDetails] = useState<
    Partial<DetailAdjustment & { action: ActionDetailAdjustment }>[]
  >([]);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [propsAlertSave, setPropsAlertSave] = useState<{
    type: TYPES;
    visible: boolean;
    message: string;
    status?: StatusStockAdjustment;
  }>({
    visible: false,
    message: '',
    type: 'error',
  });
  const [observation, setObservation] = useState('');

  const { id } = useParams<Partial<{ id: string }>>();

  const { initialState } = useModel('@@initialState');

  const [createAdjustment, paramsCreate] = useCreateAdjustment();
  const [updateAdjustment, paramsUpdate] = useUpdateAdjustment();

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
   * @param status estado actual del ajuste
   */
  const showAlertSave = (status?: StatusStockAdjustment) => {
    if (
      details.length > 0 ||
      status === StatusStockAdjustment.Cancelled ||
      observation !== (adjustment?.observation || '')
    ) {
      if (status === StatusStockAdjustment.Cancelled) {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea cancelar el ajuste?',
          type: 'error',
        });
      } else if (details.length > 0) {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea guardar el ajuste?',
          type: 'warning',
        });
      } else {
        onShowInformation('El ajuste no tiene productos');
      }
    } else {
      onShowInformation('No se encontraron cambios en el ajuste');
    }
  };

  /**
   * @description se encarga de guardar el traslado
   * @param status se usa para definir el estado del ajuste
   */
  const saveAdjustment = async (status?: StatusStockAdjustment) => {
    try {
      if (id) {
        const detailsFilter = details.filter((detail) => detail?.action);

        const newDetails = detailsFilter.map((detail) => ({
          productId: detail?.product?._id || '',
          quantity: detail?.quantity || 1,
          action: detail?.action as ActionDetailAdjustment,
        }));
        if (newDetails.length > 0 || status || observation !== adjustment?.observation) {
          const props = {
            details: newDetails,
            observation,
            status,
          };

          const response = await updateAdjustment({
            variables: {
              input: props,
              id,
            },
          });
          if (response?.data?.updateStockAdjustment) {
            setPropsAlert({
              message: `Ajuste actualizado correctamente No. ${response?.data?.updateStockAdjustment?.number}`,
              type: 'success',
              visible: true,
            });
          }
        } else {
          onShowInformation('El ajuste no tiene cambios a realizar');
        }
      } else {
        if (status === StatusStockAdjustment.Cancelled) {
          setCurrentStep(0);
        } else {
          const newDetails = details.map((detail) => ({
            productId: detail?.product?._id || '',
            quantity: detail?.quantity || 1,
          }));
          const props = {
            details: newDetails,
            warehouseId:
              adjustment?.warehouse?._id ||
              initialState?.currentUser?.shop?.defaultWarehouse?._id ||
              '',
            observation,
            status,
          };
          const response = await createAdjustment({
            variables: {
              input: props,
            },
          });

          if (response?.data?.createStockAdjustment) {
            setPropsAlert({
              message: `Ajuste creado correctamente No. ${response?.data?.createStockAdjustment?.number}`,
              type: 'success',
              visible: true,
              redirect: `/inventory/adjustment/${response?.data?.createStockAdjustment?._id}`,
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
                action: ActionDetailAdjustment.Delete,
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
   * @param product producto a actualizar
   * @param quantity cantidad nueva a asignar
   */
  const updateDetail = (product: Product, quantity: number) => {
    if (setDetails) {
      const productFind = adjustment?.details?.find(
        (detail) => detail?.product?._id === product?._id,
      );
      setDetails(
        details.map((detail) => {
          if (detail?.product?._id === product?._id) {
            return {
              ...detail,
              quantity: quantity || 0,
              action: productFind ? ActionDetailAdjustment.Update : ActionDetailAdjustment.Create,
            };
          }
          return detail;
        }),
      );
    }
  };

  /**
   * @description crea un producto
   * @param product identificador del producto a crear
   * @param quantity cantidad  a asignar
   */
  const createDetail = (product: Product, quantity: number) => {
    const findProduct = adjustment?.details?.find((detail) => detail?.product?._id === product._id);
    if (findProduct) {
      updateDetail(product, quantity);
    } else {
      if (setDetails) {
        setDetails([...details, { product, quantity, action: ActionDetailAdjustment.Create }]);
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
      setDetails(adjustment?.details || []);
      setObservation(adjustment?.observation || '');
    }
  }, [adjustment, id]);

  const propsAlertSaveFinal: PropsAlertSave = {
    ...propsAlertSave,
    onOk: saveAdjustment,
    onCancel: onCancelAlert,
  };

  const propsSelectProduct: PropsSelectProducts = {
    details: details.filter((item) => item?.action !== ActionDetailAdjustment.Delete),
    validateStock: false,
    warehouseId: adjustment?.warehouse?._id,
    createDetail,
    updateDetail,
    deleteDetail,
  };

  const columns: ColumnsType<Partial<DetailAdjustment>> = [
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
          min={0}
          onChange={(value) => updateDetail(product as Product, value)}
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
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => deleteDetail(_id)}
            disabled={!allowEdit}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Header
        allowEdit={allowEdit}
        adjustment={adjustment}
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
          dataSource={details.filter((detail) => detail?.action !== ActionDetailAdjustment.Delete)}
          scroll={{ x: 1000 }}
          pagination={{ size: 'small' }}
        />
      </Card>
      <Footer
        allowEdit={allowEdit}
        adjustment={adjustment}
        saveAdjustment={showAlertSave}
        details={details}
      />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertLoading visible={paramsUpdate?.loading} message="Guardando Ajuste" />
      <AlertLoading visible={paramsCreate?.loading} message="Creando Ajuste" />
      <AlertSave {...propsAlertSaveFinal} />
    </>
  );
};

export default FormAdjustment;
