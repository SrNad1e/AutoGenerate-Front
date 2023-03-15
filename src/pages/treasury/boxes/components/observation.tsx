import { MessageOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, Space, Typography } from 'antd';

const { Text } = Typography;
const { TextArea } = Input;

type Props = {
  visible: boolean;
  onCancel: () => void;
  setObservation: any;
};

const Observation = ({ onCancel, visible, setObservation }: Props) => {
  const [form] = Form.useForm();

  const onSetObservation = () => {
    const values = form.getFieldsValue();
    setObservation(values.observation);
    onCancel();
  };
  return (
    <Modal
      maskClosable={false}
      okText="Aceptar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={onSetObservation}
      open={visible}
      destroyOnClose
      okButtonProps={{
        style: { borderRadius: 5 },
      }}
      cancelButtonProps={{
        style: { borderRadius: 5 },
      }}
    >
      <Form form={form}>
        <Row>
          <Col>
            <Form.Item
              label={
                <Space>
                  <MessageOutlined />
                  <Text>Observación</Text>
                </Space>
              }
              name="observation"
              rules={[{ required: true, message: 'Campo obligatorio', min: 1 }]}
            >
              <TextArea
                autoFocus
                disabled={false}
                showCount
                maxLength={150}
                style={{ height: 120 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Observation;
