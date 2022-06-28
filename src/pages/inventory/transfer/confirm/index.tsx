/* eslint-disable react-hooks/exhaustive-deps */
import {
  useConfirmProductsTransfer,
  useGetTransfer,
  useUpdateTransfer,
} from '@/hooks/transfer.hooks';
import {
  ArrowLeftOutlined,
  BarcodeOutlined,
  CheckCircleOutlined,
  PrinterOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Affix,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useAccess, useHistory, useModel, useParams } from 'umi';
import { useReactToPrint } from 'react-to-print';
import type { ColumnsType } from 'antd/es/table/interface';

import type { DetailTransfer, Product } from '@/graphql/graphql';
import { ActionDetailTransfer } from '@/graphql/graphql';
import { StatusDetailTransfer, StatusStockTransfer } from '@/graphql/graphql';
import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { StatusType } from '../tranfer.data';
import AlertInformation from '@/components/Alerts/AlertInformation';
import ReportTransfer from '../reports/transfer';
//import AlertLoading from '@/components/Alerts/AlertLoading';
import AlertSave from '@/components/Alerts/AlertSave';

import styles from './styles.less';

const { Text, Title } = Typography;
const FormItem = Form.Item;
const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

const ConfirmTransfer = () => {
  const [observation, setObservation] = useState('');
  const [details, setDetails] = useState<
    Partial<DetailTransfer & { action: ActionDetailTransfer }>[]
  >([]);
  const [error, setError] = useState('');
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [propsAlertSave, setPropsAlertSave] = useState<{
    type: TYPES;
    visible: boolean;
    message: string;
    status?: StatusStockTransfer;
  }>({
    visible: false,
    message: '',
    type: 'error',
  });

  const { initialState } = useModel('@@initialState');

  const history = useHistory();

  const { id } = useParams<Partial<{ id: string }>>();

  const reportRef = useRef(null);
  const barcodeRef: any = useRef(null);

  const [form] = Form.useForm();

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const [getTransfer, { loading, data }] = useGetTransfer();
  const [confirmProductsTransfer] = useConfirmProductsTransfer();
  const [updateTransfer] = useUpdateTransfer();

  const {
    transfer: { canPrint, canConfirm },
  } = useAccess();

  const allowConfirm =
    data?.stockTransferId?.status === StatusStockTransfer.Sent &&
    initialState?.currentUser?.shop?.defaultWarehouse?._id ===
      data?.stockTransferId?.warehouseDestination?._id &&
    canConfirm;

  const allowConfirmTransfer = !data?.stockTransferId?.details?.find(
    (item) => item.status === StatusDetailTransfer.New,
  );

  /**
   * @description se encarga de abrir aviso de información
   * @param error error de apollo
   */
  const onShowError = (message: string) => {
    setPropsAlert({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de cerrar la alerta
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

  /**
   * @description consulta la solicitud y almacena en memoria
   */
  const getTransferId = async () => {
    try {
      const response = await getTransfer({
        variables: {
          id: id || '',
        },
      });

      if (response?.data?.stockTransferId) {
        setDetails(
          response?.data?.stockTransferId?.details as Partial<
            DetailTransfer & { action: ActionDetailTransfer }
          >[],
        );
      }
    } catch (e: any) {
      onShowError(e?.message);
    }
  };

  const confirmProduct = async () => {
    try {
      const values = await form.validateFields();

      const newDetails = details.filter((item) => item?.product?.barcode !== values.barcode);

      const detail = newDetails.find((item) => item?.product?.barcode === values.barcode);

      if (detail) {
        if (detail?.status === StatusDetailTransfer.New || detail?.quantityConfirmed === 0) {
          newDetails.push({
            ...detail,
            status: StatusDetailTransfer.New,
            quantityConfirmed: (detail.quantityConfirmed || 0) + 1,
          });
          setError(
            `Confirmado ${detail?.product?.reference?.name} / ${detail?.product?.color?.name} / ${detail?.product?.size?.value}, cantidad: ${detail?.quantityConfirmed}`,
          );
          setDetails(newDetails);
        } else {
          setError(
            `Producto ${detail?.product?.reference?.name} / ${detail?.product?.color?.name} / ${detail?.product?.size?.value}, ya se encuentra confirmado`,
          );
        }
      } else {
        setError('El producto no se encuentra registrado');
      }
      barcodeRef?.current?.select();
    } catch (e: any) {
      setError(e?.message);
    }
  };

  const confirmZero = (_id: string) => {
    const newDetails = details.map((item) => {
      if (item?.product?._id === _id) {
        return {
          ...item,
          status: StatusDetailTransfer.Confirmed,
          quantityConfirmed: 0,
        };
      }
      return item;
    });
    setDetails(newDetails);
  };

  const confirmProducts = () => {
    const productsConfirm = details.filter(
      (item) =>
        ((item?.status === StatusDetailTransfer.New && item?.quantityConfirmed) || 0) > 0 ||
        (item?.status === StatusDetailTransfer.Confirmed && item?.quantityConfirmed === 0),
    );

    if (productsConfirm.length > 0) {
      setPropsAlertSave({
        visible: true,
        message: '¿Está seguro que desea confirmar los productos?',
        type: 'warning',
      });
    } else {
      onShowError('No hay productos para confirmar');
    }
  };

  const confirmTransfer = () => {
    const productsConfirm = details.find((item) => item?.status !== StatusDetailTransfer.Confirmed);

    if (!productsConfirm) {
      setPropsAlertSave({
        visible: true,
        message: 'Se enviaran las unidades confirmadas a la bodega, ¿Está Seguro?',
        type: 'warning',
        status: StatusStockTransfer.Confirmed,
      });
    } else {
      onShowError('Debe confirmar todos los productos');
    }
  };

  const saveTransfer = async (status?: StatusStockTransfer) => {
    if (status === StatusStockTransfer.Confirmed) {
      const confirm = !details?.find((item) => item?.status === StatusDetailTransfer.Sent);

      if (!confirm) {
        onShowError('Debe confirmar todos los productos antes de enviar');
      } else {
        if (id) {
          const response = await updateTransfer({
            variables: {
              id,
              input: {
                observationDestination: observation,
                status,
              },
            },
          });
          if (response?.data?.updateStockTransfer) {
            setPropsAlert({
              message: 'Productos confirmados correctamente',
              visible: true,
              type: 'success',
              redirect: '/inventory/transfer/list',
            });
          }
        }
      }
    } else {
      const newDetails = details.filter(
        (item) =>
          (item?.status === StatusDetailTransfer.New && (item?.quantityConfirmed || 0) > 0) ||
          (item?.status === StatusDetailTransfer.Confirmed && (item?.quantityConfirmed || 0) === 0),
      );
      try {
        if (id) {
          const response = await confirmProductsTransfer({
            variables: {
              id,
              input: {
                details:
                  newDetails.map((item) => ({
                    productId: item?.product?._id || '',
                    quantity: item?.quantityConfirmed || 0,
                  })) || [],
              },
            },
          });

          if (response?.data?.confirmProductsStockTransfer) {
            setPropsAlert({
              message: 'Productos confirmados correctamente',
              visible: true,
              type: 'success',
            });
          }
        }
      } catch (e: any) {
        onShowError(e?.message);
      }
    }
  };

  useEffect(() => {
    getTransferId();
  }, [data]);

  const propsAlertSaveFinal: PropsAlertSave = {
    ...propsAlertSave,
    onOk: saveTransfer,
    onCancel: onCancelAlert,
  };

  const columns: ColumnsType<DetailTransfer> = [
    {
      title: 'Producto',
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
      title: 'Enviado',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Confirmado',
      dataIndex: 'quantityConfirmed',
      align: 'center',
      render: (quantityConfirmed: number, record) => (
        <Badge
          style={{
            backgroundColor: record?.quantity === quantityConfirmed ? 'green' : 'red',
          }}
          count={quantityConfirmed || 0}
          showZero
        />
      ),
    },
    allowConfirm
      ? {
          title: 'Opciones',
          dataIndex: 'product',
          align: 'center',
          fixed: 'right',
          render: ({ _id = '' }: Product, record) => (
            <Popconfirm
              disabled={!allowConfirm || record?.status === StatusDetailTransfer.Confirmed}
              title="¿Desea confirmar en 0?"
              okText="Si, confirmar"
              cancelText="Cancelar"
              onConfirm={() => confirmZero(_id)}
            >
              <Tooltip title="Confirmar en 0">
                <Button
                  icon={<StopOutlined />}
                  type="primary"
                  disabled={!allowConfirm || record?.status === StatusDetailTransfer.Confirmed}
                  danger
                />
              </Tooltip>
            </Popconfirm>
          ),
        }
      : {
          width: 0,
        },
  ];

  return (
    <PageContainer
      title={
        <Space align="center">
          <Tooltip title="Atrás">
            <Button
              type="primary"
              ghost
              icon={<ArrowLeftOutlined />}
              onClick={() => history.goBack()}
            />
          </Tooltip>
          <Divider type="vertical" />

          <>
            <Text>Traslado No. {data?.stockTransferId?.number}</Text>
            <Divider type="vertical" />
            <Tooltip title="Imprimir">
              <Button
                type="primary"
                icon={<PrinterOutlined />}
                onClick={() => handlePrint()}
                disabled={!canPrint}
              />
            </Tooltip>
          </>
        </Space>
      }
      loading={loading}
    >
      <Card>
        <Row gutter={[0, 40]}>
          <Col span={24}>
            <Descriptions bordered size="small">
              <DescriptionsItem label="Bodega que traslada" span={1}>
                {data?.stockTransferId?.warehouseOrigin?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que envía" span={2}>
                {data?.stockTransferId?.userOrigin?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Bodega de destino" span={1}>
                {data?.stockTransferId?.warehouseDestination?.name ||
                  initialState?.currentUser?.shop?.defaultWarehouse?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que recibe" span={2}>
                {data?.stockTransferId?.userDestination?.name || '(Pendiente)'}
              </DescriptionsItem>
              <DescriptionsItem label="Número" span={1}>
                {data?.stockTransferId?.number || '(Pendiente)'}
              </DescriptionsItem>
              <DescriptionsItem label="Estado" span={2}>
                <Badge
                  color={StatusType[data?.stockTransferId?.status || 'open']?.color}
                  text={StatusType[data?.stockTransferId?.status || 'open']?.text}
                />
              </DescriptionsItem>
              <DescriptionsItem label="Creado" span={1}>
                {moment(data?.stockTransferId?.createdAt).format(FORMAT_DATE)}
              </DescriptionsItem>
              <DescriptionsItem label="Actualizado" span={2}>
                {moment(data?.stockTransferId?.updatedAt).format(FORMAT_DATE)}
              </DescriptionsItem>
              <DescriptionsItem label="Solicitudes" span={1}>
                {data?.stockTransferId?.requests?.map((request) => {
                  <Tag key={request?._id} color="volcano" icon={<CheckCircleOutlined />}>
                    {request?.number}
                  </Tag>;
                })}
              </DescriptionsItem>
              <DescriptionsItem label="Observación">
                {allowConfirm ? (
                  <TextArea
                    defaultValue={data?.stockTransferId?.observationDestination || ''}
                    value={observation}
                    onChange={(e) => setObservation(e?.target?.value)}
                  />
                ) : (
                  data?.stockTransferId?.observationDestination
                )}
              </DescriptionsItem>
            </Descriptions>
            {allowConfirm && (
              <Form form={form} layout="vertical">
                <FormItem
                  label="Escanea código de barras"
                  name="barcode"
                  rules={[
                    {
                      required: true,
                      message: 'Debes digitar código de barras',
                    },
                  ]}
                  extra={error && <Alert showIcon message={error} />}
                >
                  <Input ref={barcodeRef} autoFocus onPressEnter={confirmProduct} />
                </FormItem>
              </Form>
            )}
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={
                details
                  .filter((detail) => detail?.action !== ActionDetailTransfer.Delete)
                  .reverse() as any
              }
              scroll={{ x: 800 }}
              pagination={{ size: 'small' }}
            />
          </Col>
        </Row>
      </Card>
      <Affix offsetBottom={0}>
        <Card bordered={false}>
          <Row justify="center" align="middle">
            <Col xs={12} md={18} lg={20}>
              <Title
                level={3}
                style={{
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                REFERENCIAS:{' '}
                {details.filter((detail) => detail?.action !== ActionDetailTransfer.Delete).length}
                <Divider type="vertical" />
                PRODUCTOS:{' '}
                {details
                  .filter((detail) => detail?.action !== ActionDetailTransfer.Delete)
                  .reduce((sum, detail) => sum + (detail?.quantity || 0), 0)}
              </Title>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Space align="end" className={styles.alignRigth}>
                {allowConfirmTransfer ? (
                  <Button onClick={confirmTransfer} type="primary" disabled={!allowConfirm}>
                    Confirmar Traslado
                  </Button>
                ) : (
                  <Button type="primary" onClick={confirmProducts} disabled={!allowConfirm}>
                    Confirmar Productos
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Card>
      </Affix>
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      {/* <AlertLoading
        visible={paramsCreate?.loading || paramsUpdate?.loading}
        message="Guardando traslado"
      />*/}
      <AlertSave {...propsAlertSaveFinal} />
      <div style={{ display: 'none' }}>
        <ReportTransfer ref={reportRef} data={data?.stockTransferId} />
      </div>
    </PageContainer>
  );
};

export default ConfirmTransfer;
