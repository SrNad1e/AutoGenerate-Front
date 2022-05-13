import { Card, Col, Row } from 'antd';
import NewOrder from '../components/NewOrder';

const PosList = () => {
  return (
    <>
      <Row>
        <Col xs={24} md={24} lg={24}>
          <NewOrder />
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={24} lg={24}>
          <Card>Estadisticas</Card>
        </Col>
      </Row>
    </>
  );
};

export default PosList;
