import AlertInformation from '@/components/Alerts/AlertInformation';
import { Card, Col, Layout, Row } from 'antd';
import { useState } from 'react';
import OrderSave from '../components/OrderSave';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
//import { CloseCircleOutlined } from "@ant-design/icons";
//import { Content } from "antd/lib/layout/layout";

//const { Title } = Typography;

const PosList = () => {
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /*const newOrder = () => {

  }*/

  return (
    <>
      <Layout style={{ width: '100%', position: 'relative', alignItems: 'end' }}>
        <Card style={{ width: '70%' }}></Card>
      </Layout>
      <Row style={{ height: '93vh' }}>
        <Col span={24}>
          <OrderSave newOrder={() => {}} />
        </Col>
        <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      </Row>
    </>
  );
};

export default PosList;
