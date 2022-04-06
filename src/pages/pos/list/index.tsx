import AlertInformation from '@/components/Alerts/AlertInformation';
import { Card, Col, Row } from 'antd';
import { useState } from 'react';
import OrderSave from '../components/OrderSave';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

const PosList = () => {
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  //const [orders, setOrders] = useState<Partial<ORDER.Order[]>>([])

  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  return (
    <>
      <Row style={{ height: '95vh' }}>
        <Col span={24}>
          <OrderSave newOrder={() => {}} />
        </Col>
        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Card style={{ height: '80%', width: '100%', marginBottom: 200 }}>Estadisticas</Card>
        </Col>
      </Row>
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    </>
  );
};

export default PosList;
