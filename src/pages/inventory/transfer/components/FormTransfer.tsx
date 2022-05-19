import {
  Affix,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  InputNumber,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import { useModel, useParams } from 'umi';
import type { ColumnsType } from 'antd/es/table/interface';
import { CheckCircleOutlined, DeleteFilled } from '@ant-design/icons';
import moment from 'moment';

import { StatusType } from '../tranfer.data';
import type { StockTransfer } from '@/graphql/graphql';
//import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
//import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
//import type { Props as PropsSearchProduct } from '@/components/SearchProducts';
import SearchProducts from '@/components/SearchProducts';

import styles from './styles.less';
import { useEffect, useState } from 'react';
//import { useCreateTransfer, useUpdateTransfer } from '@/hooks/transfer.hooks';

const { Title } = Typography;
const DescriptionsItem = Descriptions.Item;

export type Props = {
  transfer?: Partial<StockTransfer>;
  setCurrentStep: (step: number) => void;
};

const FormTransfer = ({ transfer }: Props) => {
  const { initialState } = useModel('@@initialState');
  //const [details, setDetails] = useState<Partial<DetailTransfer & { action: string }>[]>([]);
  /*const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
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
  });*/
  const [observation, setObservation] = useState('');
  console.log(observation);

  const { id } = useParams<Partial<{ id: string }>>();

  // const [createTransfer, paramsCreate] = useCreateTransfer();
  //const [updateTransfer, paramsUpdate] = useUpdateTransfer();

  //const allowEdit = transfer?.status === 'open';

  /**
   * @description se encarga de abrir aviso de información
   * @param error error de apollo
   */
  /*const onShowInformation = (message: string) => {
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
  /* const showError = (message: string) => {
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
  /* const showAlertSave = (status?: string) => {
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

  /**
   * @description se encarga de guardar el traslado
   * @param status se usa para definir el estado del traslado
   */
  /*const saveTransfer = async (status?: string) => {
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
            warehouseDestinationId:
              transfer?.warehouseDestination?._id ||
              initialState?.currentUser?.shop?.defaultWarehouse?._id ||
              '',
            warehouseOriginId: transfer?.warehouseOrigin?._id || '',
            observation,
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
  /*const deleteDetail = (_id: string) => {
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
  /*const updateDetail = (product: Product, quantity: number) => {
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
   * @description se agrega un detalle de solicitud a los detalles
   * @param product producto del detalle
   * @param quantity cantidad del producto
   */
  /*const createDetail = (product: Product, quantity: number) => {
    if (setDetails) {
      setDetails([...details, { product, quantity, action: 'create' }]);
    }
  };

  /**
   * @description se encarga de cerrar la alerta information
   */
  /* const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };
  /**
   * @description se encarga de cerrar la alerta Save
   */
  /*const onCancelAlert = () => {
    setPropsAlertSave({
      visible: false,
      message: '',
      type: 'error',
    });
  };*/

  useEffect(() => {
    if (id) {
      //setDetails(transfer?.details || []);
      setObservation(transfer?.observation || '');
    }
  }, [transfer, id]);

  /*const propsAlertSaveFinal: PropsAlertSave = {
    ...propsAlertSave,
    onOk: saveTransfer,
    onCancel: onCancelAlert,
  };

  const propsSearchProduct: PropsSearchProduct = {
    details,
    warehouseId: transfer?.warehouseOrigin?._id,
    createDetail,
    updateDetail,
    deleteDetail,
  };*/

  const columns: ColumnsType = [
    {
      title: 'Producto',
      dataIndex: 'product.barcode',
      width: 250,
      render: (barcode: string) => (
        <>
          {`${'Referencia'} / ${'Descripcion'}`}
          <Tag>{barcode}</Tag>
        </>
      ),
    },
    {
      title: 'Talla y Color',
      dataIndex: 'product',
      width: 200,
      render: () => {
        return (
          <>
            {'valor de la talla'}
            <Tag color={'blue'}>{'nombre del color'}</Tag>
          </>
        );
      },
    },
    {
      title: 'Cantidad',
      dataIndex: 'product.quantity',
      width: 100,
      render: (quantity: number) => <InputNumber value={quantity} />,
    },
    {
      title: 'Opciones',
      dataIndex: 'product._id',
      width: 100,
      fixed: 'right',
      render: () => <Button icon={<DeleteFilled />} />,
    },
  ];

  return (
    <>
      <Card>
        <Row gutter={[20, 20]}>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="middle">
              <DescriptionsItem label="Bodega de origen" span={3}>
                {initialState?.currentUser?.shop?.defaultWarehouse?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que envía" span={3}>
                {initialState?.currentUser?.name}
              </DescriptionsItem>
              <DescriptionsItem label="Observación de envío">
                {'Observacion a enviar'}
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="middle">
              <DescriptionsItem label="Bodega de destino" span={3}>
                {'Bodega'}
              </DescriptionsItem>
              <DescriptionsItem label="Usuario que recibe" span={3}>
                {'Usuario destinado'}
              </DescriptionsItem>
              <DescriptionsItem label="Observación de recepción">
                {'Observacion a recibir'}
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="middle">
              <DescriptionsItem label="Número" span={3}>
                {transfer?.number || '(Pendiente)'}
              </DescriptionsItem>
              <DescriptionsItem label="Creado" span={3}>
                {moment(transfer?.createdAt).format(FORMAT_DATE)}
              </DescriptionsItem>
              <DescriptionsItem label="Solicitudes base" span={3}>
                {
                  <Tag key={1} color="red" icon={<CheckCircleOutlined />}>
                    {2}
                  </Tag>
                }
              </DescriptionsItem>
            </Descriptions>
          </Col>
          <Col lg={12} xs={24}>
            <Descriptions bordered size="middle">
              <DescriptionsItem label="Estado" span={3}>
                <Badge
                  color={StatusType[transfer?.status || 'open']?.color}
                  text={StatusType[transfer?.status || 'open']?.text}
                />
              </DescriptionsItem>
              <DescriptionsItem label="Actualizado" span={3}>
                {moment(transfer?.updatedAt).format(FORMAT_DATE)}
              </DescriptionsItem>
              <DescriptionsItem label="Observación general">
                {transfer?.observation}
              </DescriptionsItem>
            </Descriptions>
          </Col>
        </Row>
      </Card>
      <Card bordered={false}>
        <SearchProducts />
      </Card>
      <Table columns={columns} scroll={{ x: 1500 }} />
      <Affix offsetBottom={0}>
        <Card bordered={false}>
          <Row justify="center" align="middle">
            <Col span={4}>
              <Button
                disabled={false}
                type={transfer?._id ? 'primary' : 'default'}
                danger={!!transfer?._id}
                onClick={() => {}}
              >
                Cancelar
              </Button>
            </Col>
            <Col span={14}>
              {' '}
              <Space className={styles.centerFooter}>
                <Title level={3}>
                  REFERENCIAS: 0
                  <Divider type="vertical" />
                  PRODUCTOS: 0
                </Title>
              </Space>
            </Col>
            <Col span={6}>
              <Space>
                <Button disabled={false} onClick={() => {}}>
                  Guardar
                </Button>
                <Button type="primary" disabled={false} onClick={() => {}}>
                  Enviar
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Affix>
    </>
  );
};
export default FormTransfer;
