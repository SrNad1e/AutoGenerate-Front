import { DollarCircleFilled } from '@ant-design/icons';
import { Card, Col, Modal, Row } from 'antd';
import Title from 'antd/lib/typography/Title';

const ModalPayment = () => {
  return (
    <Modal>
      <Col span={12} style={{ padding: '0 35px', borderRight: 'solid 2px black' }}>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Col span={2}>
            {' '}
            <DollarCircleFilled style={{ fontSize: 25 }} />
          </Col>
          <Col span={21}>
            <Title level={3} style={{ margin: 0, padding: 0 }}>
              Pago y Factura
            </Title>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Card style={{ borderRadius: 5 }}></Card>
        </Row>
      </Col>
    </Modal>
  );
};

export default ModalPayment;
