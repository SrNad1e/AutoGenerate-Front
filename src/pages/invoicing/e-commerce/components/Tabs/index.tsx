import { Card, Col, Descriptions, Divider, Row, Typography, Form, Input, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import numeral from 'numeral';
import type { Order } from '@/graphql/graphql';
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

  const [form] = useForm();

  const [updateOrder, paramsUpdateOrder] = useUpdateOrder();

  const dateInitial = new Date();
  const dateFinal = new Date(order?.conveyorOrder?.shippingDate);
  const difference = dateFinal.getTime() - dateInitial.getTime();
  const TotalDays = difference > 0 ? Math.ceil(difference / (1000 * 3600 * 24)) : 0;

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
    let conveyorId;
    if (values.conveyorId === order?.conveyorOrder?.conveyor?.name) {
      conveyorId = order?.conveyorOrder?.conveyor?._id;
    }
    try {
      updateOrder({
        variables: {
          id: order?._id,
          input: {
            conveyorId: conveyorId,
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
    }
  };

  const cardTab = [
    {
      key: '1',
      tab: 'Productos',
    },
    {
      key: '2',
      tab: 'Envío',
    },
    {
      key: '3',
      tab: 'Pagos',
    },
  ];

  const contentTab = {
    1: <Products orderdata={order} />,
    2: (
      <>
        <AddressDelivery deliveryAddress={order?.customer?.addresses} customer={order?.customer} />
        <Divider>Métodos de Envío</Divider>
        <Row>
          <Col>
            <Form form={form}>
              <Descriptions>
                <DescriptionItem label="Método de envío" span={2}>
                  <FormItem name="conveyorId" initialValue={order?.conveyorOrder?.conveyor?.name}>
                    <SelectConveyor
                      disabled={
                        order?.status === StatusOrder.Sent ||
                        order?.status === StatusOrder.Closed ||
                        order?.status === StatusOrder.Cancelled
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
                      <Input />
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
                  order?.status === StatusOrder.Sent ||
                  order?.status === StatusOrder.Closed ||
                  order?.status === StatusOrder.Cancelled
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
    3: <Payments orderData={order} />,
  };
  return (
    <Card bordered={false} tabList={cardTab} activeTabKey={activeTabKey} onTabChange={onTabChange}>
      {contentTab[activeTabKey]}
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Card>
  );
};

export default Tabs;
