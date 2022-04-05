import type { ColumnsType } from 'antd/lib/table';
import { BarcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel, useParams } from 'umi';
import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  InputNumber,
  Row,
  Space,
  Table,
  Tag,
  Form,
  Avatar,
  Typography,
  Tooltip,
} from 'antd';

import type { Props as PropsSearchProduct } from '@/components/SearchProducts';
import SearchProducts from '@/components/SearchProducts';
import { useCreateRequest, useUpdateRequest } from '@/hooks/request.hooks';
import AlertSave from '@/components/Alerts/AlertSave';
import AlertLoading from '@/components/Alerts/AlertLoading';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
import Footer from './footer';
import Header from './header';

import '../styles.less';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  request?: Partial<REQUEST.Request>;
  setCurrentStep: (step: number) => void;
  setRequest: (data: Partial<REQUEST.Request>) => void;
};

const FormRequest = ({ request, setCurrentStep, setRequest }: Props) => {
  const { initialState } = useModel('@@initialState');

  const [details, setDetails] = useState<Partial<REQUEST.DetailRequestProps[]>>([]);
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

  const allowEdit = request?.status === 'open';

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
   * @param data solicitud creada
   */
  const resultSave = (data: Partial<REQUEST.Request>) => {
    setPropsAlert({
      message: `Solicitud creada correctamente No. ${data.number}`,
      type: 'success',
      visible: true,
      redirect: `/inventory/request/${data._id}`,
    });
  };

  /**
   * @description abre la alerta de confirmacion de creacion
   * @param data solicitud creada
   */
  const resultUpdate = (data: Partial<REQUEST.Request>) => {
    setPropsAlert({
      message: `Solicitud creada correctamente No. ${data.number}`,
      type: 'success',
      visible: true,
    });
    setRequest(data);
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
  const { createRequest, loadingCreate } = useCreateRequest(resultSave, showError);
  const { updateRequest, loadingUpdate } = useUpdateRequest(resultUpdate, showError);

  /**
   * @description se encarga de mostrar la alerta de guardado y cancelar
   * @param status estado actual de la solicitud
   */
  const showAlertSave = (status?: string) => {
    if (details.length > 0 || status === 'cancelled' || observation !== request?.observation) {
      if (status === 'cancelled') {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea cancelar la solicitud?',
          type: 'error',
        });
      } else {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea guardar la solicitud?',
          type: 'warning',
        });
      }
    } else {
      onShowInformation('La solicitud no tiene productos');
    }
  };

  /**
   * @description se encarga de guardar el traslado
   * @param status se usa para definir el estado de la solicitud
   */
  const saveRequest = (status?: string) => {
    if (id) {
      const detailsFilter = details.filter((detail) => detail?.action);

      const newDetails = detailsFilter.map((detail) => ({
        productId: detail?.product?._id,
        quantity: detail?.quantity,
        action: detail?.action,
      }));
      if (newDetails.length > 0 || status || observation !== request?.observation) {
        const props = {
          details: newDetails,
          observation,
          status,
        };

        updateRequest({
          variables: {
            input: props,
            id,
          },
        });
      } else {
        onShowInformation('La solicitud no tiene cambios a realizar');
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
          warehouseDestinationId:
            request?.warehouseDestination?._id ||
            initialState?.currentUser?.shop?.defaultWarehouse?._id,
          warehouseOriginId: request?.warehouseOrigin?._id,
          observation,
          status,
        };
        createRequest({
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
      setDetails(
        details.map((detail) => {
          if (detail?.product?._id === product._id) {
            return {
              ...detail,
              quantity: quantity || 0,
              action: detail?.action ?? 'update',
            };
          }
          return detail;
        }),
      );
    }
  };

  /**
   * @description se agrega un detalle de solicitud a los detalle
   * @param product producto del detalle
   * @param quantity cantidad del producto
   */
  const createDetail = (product: Partial<PRODUCT.Product>, quantity: number) => {
    if (setDetails) {
      setDetails([...details, { product, quantity, action: 'create' }]);
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
      setDetails(request?.details || []);
      setObservation(request?.observation || '');
    }
  }, [request, id]);

  const propsAlertSaveFinal: PropsAlertSave = {
    ...propsAlertSave,
    onOk: saveRequest,
    onCancel: onCancelAlert,
  };

  const propsSearchProduct: PropsSearchProduct = {
    details,
    warehouseId: request?.warehouseOrigin?._id,
    createDetail,
    updateDetail,
    deleteDetail,
  };

  const columns: ColumnsType<Partial<REQUEST.DetailRequest>> = [
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
          min={1}
          max={product?.stock ? product?.stock[0]?.quantity : 0}
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
      <Header request={request} setObservation={setObservation} observation={observation} />
      {allowEdit && (
        <Card bordered={false} size="small">
          <Form layout="vertical">
            <FormItem label="Código de barras">
              <SearchProducts {...propsSearchProduct} />
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
      <Footer request={request} saveRequest={showAlertSave} details={details} />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertLoading visible={loadingCreate || loadingUpdate} message="Guardando Solicitud" />
      <AlertSave {...propsAlertSaveFinal} />
    </>
  );
};
export default FormRequest;
