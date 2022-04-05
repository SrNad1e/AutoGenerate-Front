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

import Footer from './footer';
import Header from './header';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  adjustment?: Partial<ADJUSTMENT.Adjustment>;
  setCurrentStep: (step: number) => void;
  setAdjustment: (data: Partial<ADJUSTMENT.Adjustment>) => void;
};

const FormAdjustment = ({ adjustment, setCurrentStep, setAdjustment }: Props) => {
  const [details, setDetails] = useState<Partial<ADJUSTMENT.DetailAdjustmentProps[]>>([]);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [propsAlertSave, setPropsAlertSave] = useState<{
    type: TYPES;
    visible: boolean;
    message: string;
    status?: string;
  }>({
    visible: false,
    message: '',
    type: 'error',
  });
  const [observation, setObservation] = useState('');

  const { id } = useParams<Partial<{ id: string }>>();

  const allowEdit = adjustment?.status === 'open';

  const { initialState } = useModel('@@initialState');

  /** Funciones ejecutadas por los hooks */

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
   * @description abre la alerta de confirmacion de creacion
   * @param data entrada creada
   */
  const resultSave = (data: Partial<ADJUSTMENT.Adjustment>) => {
    setPropsAlert({
      message: `Ajuste creado correctamente No. ${data.number}`,
      type: 'success',
      visible: true,
      redirect: `/inventory/adjustment/${data._id}`,
    });
  };

  const resultUpdate = (data: Partial<ADJUSTMENT.Adjustment>) => {
    setPropsAlert({
      message: `Ajuste creado correctamente No. ${data.number}`,
      type: 'success',
      visible: true,
    });
    setAdjustment(data);
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

  /** FIn de Funciones ejecutadas por los hooks */

  /** Hooks para manejo de consultas */

  const { createAdjustment, loadingCreate } = useCreateAdjustment(resultSave, showError);
  const { updateAdjustment, loadingUpdate } = useUpdateAdjustment(resultUpdate, showError);

  /** Fin de Hooks para manejo de consultas */

  /**
   * @description se encarga de mostrar la alerta de guardado y cancelar
   * @param status estado actual de la entrada
   */
  const showAlertSave = (status?: string) => {
    if (details.length > 0 || status === 'cancelled' || observation !== adjustment?.observation) {
      if (status === 'cancelled') {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea cancelar el ajuste?',
          type: 'error',
        });
      } else {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea guardar el ajuste?',
          type: 'warning',
        });
      }
    } else {
      onShowInformation('El ajuste no tiene productos');
    }
  };

  /**
   * @description se encarga de guardar el traslado
   * @param status se usa para definir el estado de la entrada
   */
  const saveAdjustment = (status?: string) => {
    if (id) {
      const detailsFilter = details.filter((detail) => detail?.action);

      const newDetails = detailsFilter.map((detail) => ({
        productId: detail?.product?._id,
        quantity: detail?.quantity,
        action: detail?.action,
      }));
      if (newDetails.length > 0 || status || observation !== adjustment?.observation) {
        const props = {
          details: newDetails,
          observation,
          status,
        };

        updateAdjustment({
          variables: {
            input: props,
            id,
          },
        });
      } else {
        onShowInformation('El ajuste no tiene cambios a realizar');
      }
    } else {
      if (status === 'cancelled') {
        setCurrentStep(0);
      } else {
        const newDetails = details.map((detail) => ({
          productId: detail?.product?._id,
          quantity: detail?.quantity,
        }));
        const props = {
          details: newDetails,
          warehouseId:
            adjustment?.warehouse?._id || initialState?.currentUser?.shop?.defaultWarehouse?._id,
          observation,
          status,
        };
        createAdjustment({
          variables: {
            input: props,
          },
        });
      }
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
                action: 'delete',
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
  const updateDetail = (product: Partial<PRODUCT.Product>, quantity: number) => {
    if (setDetails) {
      if (product?.stock) {
        if (product?.stock[0].quantity >= quantity) {
          setDetails(
            details.map((detail) => {
              if (detail?.product?._id === product?._id) {
                return {
                  ...detail,
                  quantity: quantity || 0,
                  action: detail?.action ?? 'update',
                };
              }
              return detail;
            }),
          );
        } else {
          onShowInformation(
            `El producto ${product?.barcode} / ${product?.reference} no tiene suficientes unidades, inventario: ${product?.stock[0].quantity}`,
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
  const createDetail = (product: Partial<PRODUCT.Product>, quantity: number) => {
    if (setDetails) {
      if (product?.stock) {
        if (product?.stock[0].quantity >= quantity) {
          setDetails([...details, { product, quantity, action: 'create' }]);
        } else {
          onShowInformation(
            `El producto ${product?.barcode} / ${product?.reference} no tiene suficientes unidades, inventario: ${product?.stock[0].quantity}`,
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
    details: details.filter((item) => item?.action !== 'delete'),
    validateStock: false,
    warehouseId: adjustment?.warehouse?._id,
    createDetail,
    updateDetail,
    deleteDetail,
  };

  const columns: ColumnsType<Partial<ADJUSTMENT.DetailAdjustment>> = [
    {
      title: 'Referencia',
      dataIndex: 'product',
      render: ({ reference, description, barcode }: PRODUCT.Product) => (
        <Row>
          <Col span={24}>
            {reference} / {description}
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
      render: ({ color }: PRODUCT.Product) => {
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
      render: ({ size }: PRODUCT.Product) => size.value,
    },
    {
      title: 'Inventario',
      dataIndex: 'product',
      align: 'center',
      render: ({ stock }: PRODUCT.Product) =>
        stock && (
          <Badge
            overflowCount={99999}
            count={stock[0]?.quantity}
            style={{ backgroundColor: stock[0]?.quantity > 0 ? '#dc9575' : 'red' }}
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
          onChange={(value) => updateDetail(product || {}, value)}
          disabled={!allowEdit}
          style={{ color: 'black', backgroundColor: 'white' }}
        />
      ),
    },
    {
      title: 'Opciones',
      dataIndex: 'product',
      align: 'center',
      render: ({ _id }: PRODUCT.Product) => (
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
      <Header adjustment={adjustment} setObservation={setObservation} observation={observation} />
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
          dataSource={details.filter((detail) => detail?.action !== 'delete')}
          scroll={{ x: 1000 }}
          pagination={{ size: 'small' }}
        />
      </Card>
      <Footer adjustment={adjustment} saveAdjustment={showAlertSave} details={details} />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertLoading visible={loadingCreate || loadingUpdate} message="Guardando Solicitud" />
      <AlertSave {...propsAlertSaveFinal} />
    </>
  );
};

export default FormAdjustment;
