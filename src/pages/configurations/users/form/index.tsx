import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Switch, Typography } from 'antd';
const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const UsersForm = ({ visible, onCancel }: Props) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      okText="Crear"
      cancelText="Cancelar"
      destroyOnClose
      title="Crear Usuario"
    >
      <Form layout="vertical">
        <FormItem
          label={
            <>
              {' '}
              <UserOutlined /> <Text>Nombre</Text>
            </>
          }
        >
          <Input />
        </FormItem>
        <FormItem label="E-Mail">
          <Input />
        </FormItem>
        <FormItem label="Rol">
          <Input />
        </FormItem>
        <FormItem label="Tienda">
          <Input />
        </FormItem>
        <FormItem label="Activo">
          <Switch />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UsersForm;
