import {
  Affix,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { useModel, useParams } from 'umi';
import type { ColumnsType } from 'antd/es/table/interface';
import {
  BarcodeOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { StatusType } from '../tranfer.data';
import type { DetailTransfer, Product, StockRequest, StockTransfer } from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
import type { Props as PropsSearchProduct } from '@/components/SearchProducts';
import SearchProducts from '@/components/SearchProducts';
import { useCreateTransfer, useUpdateTransfer } from '@/hooks/transfer.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '@/components/Alerts/AlertLoading';
import AlertSave from '@/components/Alerts/AlertSave';

import styles from './styles.less';
import SearchRequest from './SearchRequest';

const { Title, Text } = Typography;
const DescriptionsItem = Descriptions.Item;
const FormItem = Form.Item;
const { TextArea } = Input;

export type Props = {
  transfer?: Partial<StockTransfer>;
  setCurrentStep: (step: number) => void;
};

const FormTransfer = ({ transfer, setCurrentStep }: Props) => {
  const [showSelectRequests, setShowSelectRequests] = useState(false);
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [details, setDetails] = useState<Partial<DetailTransfer & { action: string }>[]>([]);
  const [observation, setObservation] = useState('');
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

  const { initialState } = useModel('@@initialState');

  const { id } = useParams<Partial<{ id: string }>>();

  const [createTransfer, paramsCreate] = useCreateTransfer();
  const [updateTransfer, paramsUpdate] = useUpdateTransfer();

  const allowEdit =
    transfer?.status === 'open' &&
    (!transfer?.warehouseOrigin?._id ||
      transfer?.warehouseOrigin?._id === initialState?.currentUser?.shop?.defaultWarehouse?._id);

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
   * @param status estado actual de la solicitud
   */
  const showAlertSave = (status?: string) => {
    if (details.length > 0 || status === 'cancelled' || observation !== transfer?.observation) {
      if (status === 'cancelled') {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea cancelar el traslado?',
          type: 'error',
        });
      } else {
        setPropsAlertSave({
          status,
          visible: true,
          message: '¿Está seguro que desea guardar el traslado?',
          type: 'warning',
        });
      }
    } else {
      onShowInformation('El traslado no tiene productos');
    }
  };

  const closeModalSelectRequests = () => {
    setShowSelectRequests(false);
  };

  const showModalSelectRequests = () => {
    setShowSelectRequests(true);
  };

  /**
   * @description se encarga de guardar el traslado
   * @param status se usa para definir el estado del traslado
   */
  const saveTransfer = async (status?: string) => {
    try {
      if (id) {
        const detailsFilter = details.filter((detail) => detail?.action);

        const newDetails = detailsFilter.map((detail) => ({
          productId: detail?.product?._id || '',
          quantity: detail?.quantity || 1,
          action: detail?.action || '',
        }));
        if (newDetails.length > 0 || status || observation !== transfer?.observation) {
          const props = {
            details: newDetails,
            observation,
            status,
          };

          const response = await updateTransfer({
            variables: {
              input: props,
              id,
            },
          });
          if (response?.data?.updateStockTransfer) {
            setPropsAlert({
              message: `Traslado creado correctamente No. ${response?.data?.updateStockTransfer?.number}`,
              type: 'success',
              visible: true,
            });
          }
        } else {
          onShowInformation('El traslado no tiene cambios a realizar');
        }
      } else {
        if (status === 'cancelled') {
          setCurrentStep(0);
        } else {
          const newDetails = details.map((detail) => ({
            productId: detail?.product?._id || '',
            quantity: detail?.quantity || 1,
          }));
          const props = {
            details: newDetails,
            warehouseDestinationId: transfer?.warehouseDestination?._id || '',
            warehouseOriginId:
              transfer?.warehouseOrigin?._id ||
              initialState?.currentUser?.shop?.defaultWarehouse?._id ||
              '',
            observationOrigin: observation,
            status,
          };
          const response = await createTransfer({
            variables: {
              input: props,
            },
          });

          if (response?.data?.createStockTransfer) {
            setPropsAlert({
              message: `Traslado creado correctamente No. ${response?.data?.createStockTransfer?.number}`,
              type: 'success',
              visible: true,
              redirect: `/inventory/transfer/${response?.data?.createStockTransfer?._id}`,
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
  const updateDetail = async (product: Product, quantity: number) => {
    if (setDetails) {
      await setDetails(
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
   * @description se agrega un detalle de solicitud a los detalles
   * @param product producto del detalle
   * @param quantity cantidad del producto
   */
  const createDetail = async (product: Product, quantity: number) => {
    if (setDetails) {
      await setDetails([...details, { product, quantity, action: 'create' }]);
    }
  };

  const addRequests = async (requestsAdd: StockRequest[]) => {
    const create: any[] = [];
    const update: any[] = [];
    if (requestsAdd.length > 0) {
      for (let i = 0; i < requestsAdd.length; i++) {
        const request = requestsAdd[i];
        for (let j = 0; j < request?.details?.length; j++) {
          const detail = request?.details[j];
          const productFind = details?.find((item) => item?.product?._id === detail?.product?._id);
          const productFindLocal = create?.find(
            (item) => item?.product?._id === detail?.product?._id,
          );
          if (productFind || productFindLocal) {
            update.push({
              product: detail?.product,
              quantity: detail?.quantity,
            });
          } else {
            create.push({
              product: detail?.product,
              quantity: detail?.quantity,
            });
          }
        }
      }
      console.log(requests.concat(requestsAdd));

      setRequests(requests.concat(requestsAdd));
    }
    closeModalSelectRequests();
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
      setDetails(transfer?.details || []);
      setRequests(transfer?.requests || []);
      setObservation(transfer?.observation || '');
    }
  }, [transfer, id]);

  const propsAlertSaveFinal: PropsAlertSave = {
    ...propsAlertSave,
    onOk: saveTransfer,
    onCancel: onCancelAlert,
  };

  const propsSearchProduct: PropsSearchProduct = {
    details,
    warehouseId:
      transfer?.warehouseOrigin?._id || initialState?.currentUser?.shop?.defaultWarehouse?._id,
    createDetail,
    updateDetail,
    deleteDetail,
  };

  const columns: ColumnsType<DetailTransfer> = [
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
      render: ({ stock = [] }: Product) =>
        (stock?.length || 0) > 0 && (
          <Badge
            overflowCount={99999}
            count={stock && stock[0]?.quantity}
            style={{
              backgroundColor: ((stock && stock[0]?.quantity) || 0) > 0 ? '#dc9575' : 'red',
            }}
            showZero
          />
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
          style={{ color: 'black', backgroundColor: 'white' }}
        />
      ),
    },
    {
      title: 'Opciones',
      dataIndex: 'product',
      align: 'center',
      width: 30,
      fixed: 'right',
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
      <Card>
        <Row gutter={[0, 1]}>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="small">
              <DescriptionsItem label="Bodega que traslada" span={3}>
                {transfer?.warehouseOrigin?.name ||
                  initialState?.currentUser?.shop?.defaultWarehouse?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que envía" span={3}>
                {transfer?.userOrigin?.name || initialState?.currentUser?.name}
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="small">
              <DescriptionsItem label="Bodega de destino" span={3}>
                {transfer?.warehouseDestination?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que recibe" span={3}>
                {transfer?.userDestination?.name || '(Pendiente)'}
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col lg={24} xs={24}>
            <Descriptions bordered size="small">
              <DescriptionsItem label="Número" span={2}>
                {transfer?.number || '(Pendiente)'}
              </DescriptionsItem>
              <DescriptionsItem label="Estado" span={2}>
                <Badge
                  color={StatusType[transfer?.status || 'open']?.color}
                  text={StatusType[transfer?.status || 'open']?.text}
                />
              </DescriptionsItem>
              <DescriptionsItem label="Creado" span={2}>
                {moment(transfer?.createdAt).format(FORMAT_DATE)}
              </DescriptionsItem>
              <DescriptionsItem label="Actualizado" span={2}>
                {moment(transfer?.updatedAt).format(FORMAT_DATE)}
              </DescriptionsItem>
              <DescriptionsItem label="Solicitudes" span={2}>
                {requests?.map((request) => {
                  <Tag key={request?._id} color="volcano" icon={<CheckCircleOutlined />}>
                    {request?.number}
                  </Tag>;
                })}
                <Tooltip title="Agregar solicitud">
                  <Button
                    onClick={showModalSelectRequests}
                    disabled={!allowEdit}
                    type="primary"
                    icon={<PlusOutlined />}
                  />
                </Tooltip>
              </DescriptionsItem>
              <DescriptionsItem label="Observación" span={2}>
                {allowEdit ? (
                  <TextArea
                    value={observation}
                    onChange={(e) => setObservation(e?.target?.value)}
                  />
                ) : (
                  transfer?.observationOrigin
                )}
              </DescriptionsItem>
            </Descriptions>
          </Col>
        </Row>
        {allowEdit && (
          <Form layout="vertical">
            <FormItem label="Código de barras">
              <SearchProducts {...propsSearchProduct} />
            </FormItem>
          </Form>
        )}
        <Table
          columns={columns}
          dataSource={details.filter((detail) => detail?.action !== 'delete') as any}
          scroll={{ x: 800 }}
          pagination={{ size: 'small' }}
        />
      </Card>

      <Affix offsetBottom={0}>
        <Card bordered={false}>
          <Row justify="center" align="middle">
            <Col span={4}>
              <Button
                disabled={!allowEdit}
                type={transfer?._id ? 'primary' : 'default'}
                danger={!!transfer?._id}
                onClick={() => showAlertSave('cancelled')}
              >
                Cancelar
              </Button>
            </Col>
            <Col span={14}>
              <Space className={styles.centerFooter}>
                <Title level={3}>
                  REFERENCIAS: {details.filter((detail) => detail?.action !== 'delete').length}
                  <Divider type="vertical" />
                  PRODUCTOS:{' '}
                  {details
                    .filter((detail) => detail?.action !== 'delete')
                    .reduce((sum, detail) => sum + (detail?.quantity || 0), 0)}
                </Title>
              </Space>
            </Col>
            <Col span={6}>
              <Space
                align="end"
                style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button disabled={!allowEdit} onClick={() => showAlertSave()}>
                  Guardar
                </Button>
                <Button type="primary" disabled={!allowEdit} onClick={() => showAlertSave('sent')}>
                  Enviar
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Affix>
      <SearchRequest
        visible={showSelectRequests}
        onCancel={closeModalSelectRequests}
        requests={requests as StockRequest[]}
        onOk={addRequests}
      />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertLoading
        visible={paramsCreate?.loading || paramsUpdate?.loading}
        message="Guardando traslado"
      />
      <AlertSave {...propsAlertSaveFinal} />
    </>
  );
};
export default FormTransfer;
