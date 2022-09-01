/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Descriptions, Divider, Row, Typography, Form, Input, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import numeral from 'numeral';
import type { AddressInputOrder, Order } from '@/graphql/graphql';
import { TypePayment } from '@/graphql/graphql';
import { StatusWeb } from '@/graphql/graphql';
import { StatusOrder } from '@/graphql/graphql';

import Payments from '../Payments';
import Products from '../Products';
import AddressDelivery from '@/components/Address';
import SelectConveyor from '@/components/SelectConveyor';
import { useUpdateOrder } from '@/hooks/order.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

const DescriptionItem = Descriptions.Item;
const { Text } = Typography;
const FormItem = Form.Item;

type Props = {
  order: Order;
};

const Tabs = ({ order }: Props) => {
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [addressDelivery, setAddressDelivery] = useState<AddressInputOrder>({});

  const [form] = useForm();

  const [updateOrder, paramsUpdateOrder] = useUpdateOrder();

  const dateInitial = new Date();
  const dateFinal = new Date(order?.conveyorOrder?.shippingDate);
  const difference = dateFinal.getTime() - dateInitial.getTime();
  const TotalDays = difference > 0 ? Math.ceil(difference / (1000 * 3600 * 24)) : 0;
  const typePaymetCash = order?.payments?.find((i) => i?.payment?.type === TypePayment.Cash);

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description funcion usada para cambiar de pestañas
   * @param key numero de la pestaña
   */
  const onTabChange = (key: any) => {
    setActiveTabKey(key);
  };

  /**
   * @description funcion usada para actualizar medio de envio del pedido
   */
  const onUpdateConveyor = async () => {
    const values = await form.validateFields();
    const data = {
      city: {
        _id: order?.address?.city._id,
        name: order?.address?.city?.name,
        state: order?.address?.city?.state,
        country: { name: order?.address?.city?.country?.name },
      },
      contact: order?.address?.contact,
      extra: order?.address?.extra,
      field1: order?.address?.field1,
      isMain: order?.address?.isMain,
      loteNumber: order?.address?.loteNumber,
      neighborhood: order?.address?.neighborhood,
      number1: order?.address?.number1,
      number2: order?.address?.number2,
      phone: order?.address?.phone,
      postalCode: order?.address?.postalCode,
    };

    try {
      if (order?.address !== null) {
        const response = await updateOrder({
          variables: {
            id: order?._id,
            input: {
              conveyorId: values.conveyorId,
              address: data,
            },
          },
        });
        if (response.data) {
          setPropsAlertInformation({
            message: 'Método de envío actualizado correctamente',
            visible: true,
            type: 'success',
          });
        }
      } else if (order?.customer?.addresses?.length > 0) {
        const response = await updateOrder({
          variables: {
            id: order?._id,
            input: {
              conveyorId: values.conveyorId,
              address: addressDelivery,
            },
          },
        });
        if (response.data) {
          setPropsAlertInformation({
            message: 'Método de envío actualizado correctamente',
            visible: true,
            type: 'success',
          });
        }
      } else {
        const response = await updateOrder({
          variables: {
            id: order?._id,
            input: {
              conveyorId: values.conveyorId,
            },
          },
        });
        if (response.data) {
          setPropsAlertInformation({
            message: 'Método de envío actualizado correctamente',
            visible: true,
            type: 'success',
          });
        }
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  const cardTab = [
    {
      key: '1',
      tab: 'Pagos',
    },
    {
      key: '2',
      tab: 'Productos',
    },
    typePaymetCash !== undefined && {
      key: '4',
      tab: 'Confirmar Efectivo',
    },
    {
      key: '3',
      tab: 'Envío',
    },
  ];

  const contentTab = {
    1: <Payments orderData={order} tabKey={activeTabKey} />,
    2: <Products orderdata={order} />,
    3: (
      <>
        <AddressDelivery
          deliveryAddress={order?.customer?.addresses}
          customer={order?.customer}
          setDelivery={setAddressDelivery}
        />
        <Divider>Métodos de Envío</Divider>
        <Row>
          <Col>
            <Form form={form}>
              <Descriptions>
                <DescriptionItem label="Método de envío" span={2}>
                  <FormItem
                    name="conveyorId"
                    initialValue={order?.conveyorOrder?.conveyor?._id}
                    rules={[{ required: true, message: 'Debe seleccionar método de envío' }]}
                  >
                    <SelectConveyor
                      disabled={
                        order?.statusWeb === StatusWeb.Sent ||
                        order?.status === StatusOrder.Closed ||
                        order?.statusWeb === StatusWeb.Cancelled
                      }
                    />
                  </FormItem>
                </DescriptionItem>
                {order?.conveyorOrder?.conveyor?.name === 'Interrapidísimo' && (
                  <DescriptionItem span={1}>
                    <FormItem
                      label="Número de guía"
                      initialValue={order?.conveyorOrder?.guideCode || '(Pendiente)'}
                      name="guideCode"
                    >
                      <Input
                        disabled={
                          order?.statusWeb === StatusWeb.Sent ||
                          order?.status === StatusOrder.Closed ||
                          order?.statusWeb === StatusWeb.Cancelled ||
                          order?.statusWeb === StatusWeb.Delivered
                        }
                      />
                    </FormItem>
                  </DescriptionItem>
                )}
                <DescriptionItem label={<Text strong>Precio</Text>} span={1}>
                  <Text italic>{numeral(order?.conveyorOrder?.value).format('$ 0,0')}</Text>
                </DescriptionItem>
                <DescriptionItem label={<Text strong>Tiempo de Entrega</Text>} span={1}>
                  <Text italic>{`${TotalDays || 0} Dias`}</Text>
                </DescriptionItem>
              </Descriptions>
            </Form>
          </Col>
          {
            <Col xs={5} md={4} lg={4} offset={19}>
              <Button
                onClick={onUpdateConveyor}
                disabled={
                  order?.statusWeb === StatusWeb.Sent ||
                  order?.status === StatusOrder.Closed ||
                  order?.statusWeb === StatusWeb.Cancelled ||
                  order?.statusWeb === StatusWeb.Delivered
                }
                loading={paramsUpdateOrder?.loading}
                type="primary"
                icon={<SaveOutlined />}
              >
                Guardar
              </Button>
            </Col>
          }
        </Row>
      </>
    ),
    4: <Payments orderData={order} tabKey={activeTabKey} />,
  };
  return (
    <Card bordered={false} tabList={cardTab} activeTabKey={activeTabKey} onTabChange={onTabChange}>
      {contentTab[activeTabKey]}
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Card>
  );
};

export default Tabs;
