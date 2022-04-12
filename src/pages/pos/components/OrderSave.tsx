import { Button, Card, Row } from 'antd';
import Col from 'antd/es/grid/col';
import { useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useHistory } from 'umi';
import CardSave from './CardSave';
import { useCreateOrder } from '@/hooks/order.hooks';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '@/components/Alerts/AlertLoading';
//import { PropsCardSave as Props } from './CardSave';

const OrderSave = () => {
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    visible: false,
    type: 'error',
  });

  const history = useHistory();

  const resultGetOrder = (data: Partial<ORDER.Order>) => {
    history.push(`/pos/${data._id}`);
  };

  const closeAlert = () => {
    setPropsAlert({
      message: '',
      visible: false,
      type: 'error',
    });
  };

  const showError = (message: string) => {
    setPropsAlert({
      message,
      type: 'error',
      visible: true,
    });
  };

  const { createOrder, loading } = useCreateOrder(resultGetOrder, showError);

  const newOrder = () => {
    createOrder({
      variables: {
        input: {
          status: 'open',
        },
      },
    });
  };

  return (
    <Row style={{ padding: 50 }}>
      <Col span={24} style={{ minHeight: '25vh' }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card
              onClick={() => newOrder()}
              hoverable
              style={{ borderRadius: '10px', borderColor: '#dc9575' }}
              bodyStyle={{ margin: 0, padding: 20 }}
            >
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col span={9}>
                  <ShoppingCartOutlined style={{ fontSize: 50, color: '#dc9575' }} />
                </Col>
                <Col span={15}>
                  <Button shape="round" style={{ width: '100%', height: 50 }} type="primary">
                    Nuevo Pedido
                  </Button>
                </Col>
              </Row>
            </Card>
            <CardSave />
          </Col>
        </Row>
      </Col>
      <AlertInformation {...propsAlert} onCancel={closeAlert} />
      <AlertLoading message="Cargando pedido" visible={loading} />
    </Row>
  );
};

export default OrderSave;
