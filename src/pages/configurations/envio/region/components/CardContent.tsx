import { Card, Form, Input, Row, Col, Button } from '@/utils/Desing';

interface props {
  openModal: (value: any) => void;
}

const CardContent = ({ openModal }: props) => {
  return (
    <Card>
      <Form>
        <Row>
          <Col xs={24} md={5} lg={6} xl={6}>
            <Form.Item label="Region:">
              <Input placeholder="Buscar region" />
            </Form.Item>
          </Col>

          <Col xs={0} md={1} lg={1} xl={1} />

          <Col xs={24} md={5} lg={6} xl={6}>
            <Form.Item label="Zona:">
              <Input placeholder="Buscar zona" />
            </Form.Item>
          </Col>

          <Col xs={0} md={1} lg={1} xl={1} />

          <Col xs={12} md={3} lg={3} xl={3}>
            <Form.Item>
              <Button type="primary" style={{ width: '95%' }}>
                Buscar
              </Button>
            </Form.Item>
          </Col>

          <Col xs={12} md={3} lg={3} xl={3}>
            <Form.Item>
              <Button style={{ width: '95%' }}>Cancelar</Button>
            </Form.Item>
          </Col>

          <Col xs={12} md={3} lg={3} xl={3}>
            <Form.Item>
              <Button onClick={() => openModal({})} type="primary" style={{ width: '95%' }}>
                Nuevo
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default CardContent;
