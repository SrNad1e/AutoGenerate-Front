/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/dot-notation */
import type { ColumnsType } from 'antd/lib/table';
import { BarcodeOutlined, DeleteOutlined } from '@ant-design/icons';
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
  Popconfirm,
} from 'antd';
import { useModel, useParams } from 'umi';
import { useEffect, useState } from 'react';

import type { Props as PropsSearchProduct } from '@/components/SearchProducts';
import SearchProducts from '@/components/SearchProducts';
import { useCreateRequest, useUpdateRequest } from '@/hooks/request.hooks';
import AlertSave from '@/components/Alerts/AlertSave';
import AlertLoading from '@/components/Alerts/AlertLoading';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
import type { DetailRequest, Product, StockRequest } from '@/graphql/graphql';
import { ActionDetailRequest, StatusStockRequest } from '@/graphql/graphql';
import Footer from './footer';
import Header from './header';

import '../styles.less';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  request?: Partial<StockRequest>;
  setCurrentStep: (step: number) => void;
  allowEdit: boolean;
};

const FormRequest = ({ request, setCurrentStep, allowEdit }: Props) => {
  const { initialState } = useModel('@@initialState');

  const [details, setDetails] = useState<
    Partial<DetailRequest & { action: ActionDetailRequest }>[]
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
    status?: StatusStockRequest;
  }>({
    visible: false,
    message: '',
    type: 'error',
  });
  const [observation, setObservation] = useState('');

  const { id } = useParams<Partial<{ id: string }>>();

  const [createRequest, paramsCreate] = useCreateRequest();
  const [updateRequest, paramsUpdate] = useUpdateRequest();

  /**
   * @description se encarga de abrir aviso de información
   * @param message  mensaje que se muestra en la alerta
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
   * @param status estado actual de la solicitud
   */
  const showAlertSave = (status?: StatusStockRequest) => {
    try {
      if (
        details.length > 0 ||
        status === StatusStockRequest.Cancelled ||
        observation !== (request?.observation || '')
      ) {
        if (status === StatusStockRequest.Cancelled) {
          setPropsAlertSave({
            status,
            visible: true,
            message: '¿Está seguro que desea cancelar la solicitud?',
            type: 'error',
          });
        } else if (status === StatusStockRequest.Pending) {
          setPropsAlertSave({
            status,
            visible: true,
            message: '¿Está seguro que desea enviar la solicitud?',
            type: 'warning',
          });
        } else if (status === StatusStockRequest.Open) {
          setPropsAlertSave({
            status,
            visible: true,
            message: '¿Está seguro que desea guardar la solicitud?',
            type: 'warning',
          });
        } else {
          onShowInformation('La solicitud no tiene productos');
        }
      } else {
        onShowInformation('No se encontraron cambios en la solicitud');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de guardar el traslado
   * @param status se usa para definir el estado de la solicitud
   */
  const saveRequest = async (status?: StatusStockRequest) => {
    try {
      if (id) {
        const detailsFilter = details.filter((detail) => detail?.action);

        const newDetails = detailsFilter.map((detail) => ({
          productId: detail?.product?._id || '',
          quantity: detail?.quantity || 1,
          action: detail.action as ActionDetailRequest,
        }));

        if (newDetails.length > 0 || status || observation !== request?.observation) {
          const props = {
            details: newDetails,
            observation,
            status,
          };

          if (props.status === StatusStockRequest.Open) {
            delete props.status;
          }

          const response = await updateRequest({
            variables: {
              input: props,
              id,
            },
          });
          if (response?.data?.updateStockRequest && status === StatusStockRequest.Open) {
            setPropsAlert({
              message: `Solicitud No. ${response?.data?.updateStockRequest?.number} actualizada correctamente `,
              type: 'success',
              visible: true,
              redirect:
                response?.data?.updateStockRequest?.status === StatusStockRequest.Pending
                  ? '/inventory/request/list'
                  : undefined,
            });
          } else if (response?.data?.updateStockRequest && status === StatusStockRequest.Pending) {
            setPropsAlert({
              message: `Solicitud No. ${response?.data?.updateStockRequest?.number} creada correctamente `,
              type: 'success',
              visible: true,
              redirect:
                response?.data?.updateStockRequest?.status === StatusStockRequest.Pending
                  ? '/inventory/request/list'
                  : undefined,
            });
          } else if (
            response?.data?.updateStockRequest &&
            status === StatusStockRequest.Cancelled
          ) {
            setPropsAlert({
              message: `Solicitud No. ${response?.data?.updateStockRequest?.number} cancelada correctamente `,
              type: 'success',
              visible: true,
              redirect:
                response?.data?.updateStockRequest?.status === StatusStockRequest.Pending
                  ? '/inventory/request/list'
                  : undefined,
            });
          }
        } else {
          onShowInformation('La solicitud no tiene cambios a realizar');
        }
      } else {
        if (status === StatusStockRequest.Cancelled) {
          setCurrentStep(0);
        } else {
          const newDetails = details.map((detail) => ({
            productId: detail?.product?._id || '',
            quantity: detail?.quantity || 1,
          }));
          const props = {
            details: newDetails,
            warehouseDestinationId:
              request?.warehouseDestination?._id ||
              initialState?.currentUser?.shop?.defaultWarehouse?._id ||
              '',
            warehouseOriginId: request?.warehouseOrigin?._id || '',
            observation,
            status,
          };
          const response = await createRequest({
            variables: {
              input: props,
            },
          });

          if (response?.data?.createStockRequest && status === StatusStockRequest.Pending) {
            setPropsAlert({
              message: `Solicitud creada correctamente No. ${response?.data?.createStockRequest?.number}`,
              type: 'success',
              visible: true,
              redirect:
                status === StatusStockRequest.Pending
                  ? '/inventory/request/list'
                  : `/inventory/request/${response?.data?.createStockRequest?._id}`,
            });
          } else if (response?.data?.createStockRequest && status === StatusStockRequest.Open) {
            setPropsAlert({
              message: `Solicitud guardada correctamente No. ${response?.data?.createStockRequest?.number}`,
              type: 'success',
              visible: true,
              redirect: `/inventory/request/${response?.data?.createStockRequest?._id}`,
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
                  action: ActionDetailRequest.Delete,
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
  const updateDetail = (product: Product, quantity: number) => {
    try {
      const productFind = request?.details?.find((detail) => detail?.product?._id === product?._id);
      if (setDetails) {
        setDetails(
          details.map((detail) => {
            if (detail?.product?._id === product._id) {
              return {
                ...detail,
                quantity: quantity || 1,
                action: productFind ? ActionDetailRequest.Update : ActionDetailRequest.Create,
              };
            }
            return detail;
          }),
        );
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se agrega un detalle de solicitud a los detalles
   * @param product producto del detalle
   * @param quantity cantidad del producto
   */
  const createDetail = (product: Product, quantity: number) => {
    try {
      const findProduct = request?.details?.find((detail) => detail?.product?._id === product._id);
      if (findProduct) {
        updateDetail(product, quantity);
      } else {
        if (setDetails) {
          setDetails([...details, { product, quantity, action: ActionDetailRequest.Create }]);
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
    if (id) {
      if (details?.length === 0) {
        setDetails(request?.details || []);
      }
      setObservation(request?.observation || '');
    }
  }, [request, id]);

  const propsAlertSaveFinal: PropsAlertSave = {
    ...propsAlertSave,
    onOk: saveRequest,
    onCancel: onCancelAlert,
  };

  const propsSearchProduct: PropsSearchProduct = {
    details: details.filter((item) => item.action !== ActionDetailRequest.Delete),
    warehouseId: request?.warehouseOrigin?._id,
    createDetail,
    updateDetail,
    deleteDetail,
  };

  const columns: ColumnsType<Partial<DetailRequest>> = [
    {
      title: 'Producto',
      dataIndex: 'product',
      width: 80,
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
      width: 60,
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
      width: 30,
      render: ({ size }: Product) => size.value,
    },
    {
      title: 'Inventario',
      dataIndex: 'product',
      align: 'center',
      width: 30,
      render: ({ stock = [] }: Product, record) =>
        record?.__typename ? (
          <Badge
            overflowCount={99999}
            count={(stock && stock[0]?.quantity) || 0}
            style={{
              backgroundColor: ((stock && stock[0]?.quantity) || 0) > 0 ? '#dc9575' : 'red',
            }}
            showZero
          />
        ) : (
          'Pendiente'
        ),
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      align: 'center',
      width: 50,
      render: (quantity: number, { product = {} }) => (
        <InputNumber
          value={quantity || 0}
          min={1}
          max={product?.stock ? product?.stock[0]?.quantity : 0}
          onChange={(value) => updateDetail(product as Product, value)}
          disabled={!allowEdit}
        />
      ),
    },
    {
      title: 'Opción',
      dataIndex: 'product',
      align: 'center',
      fixed: 'right',
      width: 30,
      render: ({ _id = '' }: Product) => (
        <Tooltip title="Eliminar">
          <Popconfirm
            title="¿Está seguro que desea eliminar?"
            onConfirm={() => deleteDetail(_id)}
            okText="Aceptar"
            cancelText="Cancelar"
          >
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              disabled={!allowEdit}
              loading={paramsCreate.loading || paramsUpdate.loading}
            />
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Header
        allowEdit={allowEdit}
        request={request}
        setObservation={setObservation}
        observation={observation}
      />
      {allowEdit && (
        <Card bordered={false} size="small">
          <Form layout="vertical">
            <FormItem label="Búsqueda de Referencias">
              <SearchProducts {...propsSearchProduct} />
            </FormItem>
          </Form>
        </Card>
      )}
      <Card>
        <Table
          columns={columns}
          dataSource={details
            .filter((detail) => detail?.action !== ActionDetailRequest.Delete)
            .reverse()}
          scroll={{ x: 800, y: 400 }}
          pagination={{ size: 'small' }}
          loading={paramsCreate?.loading || paramsUpdate?.loading}
        />
      </Card>
      <Footer
        allowEdit={allowEdit}
        request={request}
        saveRequest={showAlertSave}
        details={details}
      />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertLoading visible={paramsCreate?.loading} message="Creando Solicitud" />
      <AlertLoading visible={paramsUpdate?.loading} message="Guardando Solicitud" />
      <AlertSave {...propsAlertSaveFinal} />
    </>
  );
};
export default FormRequest;
