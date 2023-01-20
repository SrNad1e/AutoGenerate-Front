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
import { useModel, useParams } from 'umi';
import type { ColumnsType } from 'antd/es/table/interface';
import { BarcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import type { DetailTransfer, Product, StockRequest, StockTransfer } from '@/graphql/graphql';
import { ActionDetailTransfer } from '@/graphql/graphql';
import { StatusStockTransfer } from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
import type { Props as PropsAlertConfirm } from '@/components/Alerts/AlertConfirm';
import type { Props as PropsSearchProduct } from '@/components/SearchProducts';
import { useCreateTransfer, useUpdateTransfer } from '@/hooks/transfer.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '@/components/Alerts/AlertLoading';
import AlertSave from '@/components/Alerts/AlertSave';

import Footer from './footer';
import Header from './header';
import SelectProducts from '@/components/SelectProducts';
import AlertConfirm from '@/components/Alerts/AlertConfirm';

const { Text } = Typography;
const FormItem = Form.Item;

export type Props = {
  transfer?: Partial<StockTransfer>;
  setCurrentStep: (step: number) => void;
  allowEdit: boolean;
};

const FormTransfer = ({ transfer, setCurrentStep, allowEdit }: Props) => {
  const [requests, setRequests] = useState<StockRequest[]>([]);
  const [details, setDetails] = useState<
    Partial<DetailTransfer & { action: ActionDetailTransfer }>[]
  >([]);
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
    status?: StatusStockTransfer;
  }>({
    visible: false,
    message: '',
    type: 'error',
  });
  const [propsAlertConfirm, setPropsAlertConfirm] = useState<Partial<PropsAlertConfirm>>({
    message: '',
    type: 'warning',
    visible: false,
    arr: details,
  });
  const [withCode, setWithCode] = useState(false);

  const { initialState } = useModel('@@initialState');

  const { id } = useParams<Partial<{ id: string }>>();

  const [createTransfer, paramsCreate] = useCreateTransfer();
  const [updateTransfer, paramsUpdate] = useUpdateTransfer();

  /**
   * @description se encarga de abrir aviso de información
   * @param message mensaje que se muestra en la alerta
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
  const showAlertSave = (status?: StatusStockTransfer) => {
    try {
      if (
        details.length > 0 ||
        status === StatusStockTransfer.Cancelled ||
        observation !== (transfer?.observation || '')
      ) {
        if (status === StatusStockTransfer.Cancelled) {
          setPropsAlertSave({
            status,
            visible: true,
            message: '¿Está seguro que desea cancelar el traslado?',
            type: 'error',
          });
        } else if (status === StatusStockTransfer.Sent) {
          setPropsAlertSave({
            status,
            visible: true,
            message: '¿Está seguro que desea enviar el traslado?',
            type: 'warning',
          });
        } else if (status === StatusStockTransfer.Open) {
          setPropsAlertSave({
            status,
            visible: true,
            message: '¿Está seguro que desea guardar el traslado?',
            type: 'warning',
          });
        } else {
          onShowInformation('El traslado no tiene productos');
        }
      } else {
        onShowInformation('No se encontraron cambios en el traslado');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de guardar el traslado
   * @param status se usa para definir el estado del traslado
   */
  const saveTransfer = async (status?: StatusStockTransfer) => {
    try {
      if (id) {
        const detailsFilter = details.filter((detail) => detail?.action);

        const newDetails = detailsFilter.map((detail) => ({
          productId: detail?.product?._id || '',
          quantity: detail?.quantity,
          action: detail?.action as ActionDetailTransfer,
        }));
        if (newDetails.length > 0 || status || observation !== transfer?.observationOrigin) {
          const props = {
            details: newDetails,
            requests: requests?.map((request) => request?._id),
            observationOrigin: observation,
            status,
          };

          if (props.status === StatusStockTransfer.Open) {
            delete props.status;
          }

          const response = await updateTransfer({
            variables: {
              input: props,
              id,
            },
          });

          if (response?.data?.updateStockTransfer) {
            if (status === StatusStockTransfer.Open) {
              setPropsAlert({
                message: `Traslado No. ${response?.data?.updateStockTransfer?.number} actualizado correctamente`,
                type: 'success',
                visible: true,
                redirect: [StatusStockTransfer.Sent, StatusStockTransfer.Confirmed].includes(
                  response?.data?.updateStockTransfer?.status,
                )
                  ? '/inventory/transfer/list'
                  : undefined,
              });
            } else if (props.status === StatusStockTransfer.Sent) {
              setPropsAlert({
                message: `Traslado No. ${response?.data?.updateStockTransfer?.number} creado correctamente `,
                type: 'success',
                visible: true,
                redirect: [StatusStockTransfer.Sent, StatusStockTransfer.Confirmed].includes(
                  response?.data?.updateStockTransfer?.status,
                )
                  ? '/inventory/transfer/list'
                  : undefined,
              });
            } else if (status === StatusStockTransfer.Cancelled) {
              setPropsAlert({
                message: `Traslado No. ${response?.data?.updateStockTransfer?.number} cancelado correctamente `,
                type: 'success',
                visible: true,
                redirect: [StatusStockTransfer.Sent, StatusStockTransfer.Confirmed].includes(
                  response?.data?.updateStockTransfer?.status,
                )
                  ? '/inventory/transfer/list'
                  : undefined,
              });
            }
          }
        } else {
          onShowInformation('El traslado no tiene cambios a realizar');
        }
      } else {
        if (status === StatusStockTransfer.Cancelled) {
          setCurrentStep(0);
        } else {
          const newDetails = details.map((detail) => ({
            productId: detail?.product?._id || '',
            quantity: detail?.quantity,
          }));
          const props = {
            details: newDetails,
            warehouseDestinationId: transfer?.warehouseDestination?._id || '',
            warehouseOriginId:
              transfer?.warehouseOrigin?._id ||
              initialState?.currentUser?.shop?.defaultWarehouse?._id ||
              '',
            requests: requests?.map((request) => request?._id),
            observationOrigin: observation,
            status,
          };
          const response = await createTransfer({
            variables: {
              input: props,
            },
          });

          if (response?.data?.createStockTransfer && status === StatusStockTransfer.Sent) {
            setPropsAlert({
              message: `Traslado creado correctamente No. ${response?.data?.createStockTransfer?.number}`,
              type: 'success',
              visible: true,
              redirect:
                status === StatusStockTransfer.Sent
                  ? '/inventory/transfer/list'
                  : `/inventory/transfer/${response?.data?.createStockTransfer?._id}`,
            });
          } else if (response?.data?.createStockTransfer && status === StatusStockTransfer.Open) {
            setPropsAlert({
              message: `Traslado guardado correctamente No. ${response?.data?.createStockTransfer?.number}`,
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
                  action: ActionDetailTransfer.Delete,
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
  const updateDetail = async (product: Product, quantity: number) => {
    const newDetails = [];
    try {
      const firstvalue = await document.getElementsByClassName('ant-input-number-input').item(1);
      await firstvalue?.setAttribute('id', 'quantitySelect');
      const firstElement = await document.getElementById(firstvalue?.id);

      await firstElement?.focus();

      console.log(firstElement);

      const value = await document.getElementsByClassName('ant-table-body').item(0);
      value.scrollTop = 0;
      for (let i = 0; i < details.length; i++) {
        if (details[i]?.product?._id === product?._id) {
          newDetails.unshift({
            ...details[i],
            quantity: quantity,
            action: details[i]?.action ?? ActionDetailTransfer.Update,
          });
        } else {
          newDetails.push(details[i]);
        }
      }
      setDetails(newDetails);
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se agrega un detalle de solicitud a los detalles
   * @param product producto del detalle
   * @param quantity cantidad del producto
   */
  const createDetail = async (product: Product, quantity: number) => {
    const newDetails = [];
    try {
      if (requests.length > 0) {
        if (details.includes(product)) {
          details.map((detail) => {
            if (detail?.product?._id === product._id) {
              newDetails.push({
                ...detail,
                quantity: quantity || 0,
                action: detail?.action ?? ActionDetailTransfer.Update,
              });
              setDetails(newDetails);
            }
            newDetails.push(detail);
            setDetails(newDetails);
          });
        } else {
          await setPropsAlertConfirm({
            message:
              requests.length > 1
                ? 'El producto que intenta agregar no existe en las solicitudes, ¿desea agregarlo?'
                : 'El producto que intenta agregar no existe en la solicitud, ¿desea agregarlo?',
            type: 'warning',
            visible: true,
            onOk: setDetails([
              { product, quantity, action: ActionDetailTransfer.Create },
              ...details,
            ]),
          });
        }
      } else {
        setDetails([{ product, quantity, action: ActionDetailTransfer.Create }, ...details]);
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

  /**
   * @description se encarga de cerrar la alerta Save
   */
  const onCancelAlertConfirm = () => {
    setPropsAlertConfirm({
      visible: false,
      message: '',
      type: 'error',
    });
  };

  useEffect(() => {
    try {
      if (id) {
        if (details?.length === 0) {
          setDetails(transfer?.details || []);
        }
        setRequests(transfer?.requests || []);
        setObservation(transfer?.observationOrigin || '');
      }
    } catch (error: any) {
      showError(error?.mesage);
    }
  }, [transfer, id]);

  const propsAlertSaveFinal: PropsAlertSave = {
    ...propsAlertSave,
    onOk: saveTransfer,
    onCancel: onCancelAlert,
  };

  const propsSearchProduct: PropsSearchProduct = {
    details: details.filter((item) => item.action !== ActionDetailTransfer.Delete),
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
      render: ({ stock }: Product) =>
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
          defaultValue={0}
          value={quantity || 0}
          min={1}
          max={product?.stock ? product?.stock[0]?.quantity : 10}
          onChange={(value) => updateDetail(product as Product, value)}
          disabled={!allowEdit || withCode}
          style={{ color: 'black', backgroundColor: 'white' }}
        />
      ),
    },
    {
      title: 'Opción',
      dataIndex: 'product',
      align: 'center',
      width: 30,
      fixed: 'right',
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
        transfer={transfer}
        setObservation={setObservation}
        observation={observation}
        setDetails={setDetails}
        details={details}
        requests={requests}
        setRequests={setRequests}
      />
      {allowEdit && (
        <Card bordered={false} size="small">
          <Form layout="vertical">
            <FormItem label="Código de barras">
              <SelectProducts
                {...propsSearchProduct}
                order={requests.length > 0 ? true : false}
                setWithStock={setWithCode}
              />
            </FormItem>
          </Form>
        </Card>
      )}
      <Card>
        <Table
          columns={columns}
          dataSource={
            details.filter((detail) => detail?.action !== ActionDetailTransfer.Delete) as any
          }
          scroll={{ x: 800, y: 400 }}
          pagination={{ size: 'small' }}
          loading={paramsCreate?.loading || paramsUpdate?.loading}
        />
      </Card>
      <Footer
        allowEdit={allowEdit}
        transfer={transfer}
        saveTransfer={showAlertSave}
        details={details}
      />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertConfirm {...propsAlertConfirm} onCancel={onCancelAlertConfirm} arr={details} />
      <AlertLoading visible={paramsCreate?.loading} message="Creando traslado" />
      <AlertLoading visible={paramsUpdate.loading} message="Guardando  Traslado" />
      <AlertSave {...propsAlertSaveFinal} />
    </>
  );
};
export default FormTransfer;
