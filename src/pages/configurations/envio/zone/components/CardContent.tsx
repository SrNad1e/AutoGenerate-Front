import { Card, Form, Input, Row, Col, Button } from '@/utils/Desing';
import { useForm } from 'antd/lib/form/Form';
import { history } from 'umi';
interface props {
  openModal: (value: any) => void;
  setStateInput: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (value: boolean) => void;
}

const CardContent = ({ openModal, setStateInput, onSearch }: props) => {
  const [form] = useForm();
  return (
    <Card>
      <Form
        initialValues={{
          zone: '',
        }}
      >
        <Row>
          <Col xs={24} md={5} lg={9} xl={11}>
            <Form.Item label="Zona:" name="zone">
              <Input onChange={(e) => setStateInput(e.target.value)} placeholder="Buscar zona" />
            </Form.Item>
          </Col>

          <Col xs={0} md={1} lg={1} xl={1}>
            {' '}
          </Col>

          <Col xs={12} md={3} lg={3} xl={4}>
            <Form.Item>
              <Button onClick={() => onSearch(true)} type="primary" style={{ width: '95%' }}>
                Buscar
              </Button>
            </Form.Item>
          </Col>

          <Col xs={12} md={3} lg={3} xl={4}>
            <Form.Item>
              <Button
                htmlType="reset"
                onClick={() => {
                  history.replace(location.pathname);
                  form.resetFields();
                  form.resetFields();
                  form.setFieldsValue({
                    zone: '',
                  });
                  setStateInput('');
                  onSearch(false);
                }}
                style={{ width: '95%' }}
              >
                Limpiar
              </Button>
            </Form.Item>
          </Col>

          <Col xs={12} md={3} lg={3} xl={4}>
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
