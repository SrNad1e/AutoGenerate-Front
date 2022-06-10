/*import { useCreateUser } from '@/hooks/user.hooks';*/
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Switch, Typography } from 'antd';
const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const UsersForm = ({ visible, onCancel }: Props) => {
  /* const [createUser, { data }] = useCreateUser();*/

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
          name="name"
          label={
            <>
              {' '}
              <UserOutlined /> <Text>Nombre</Text>
            </>
          }
        >
          <Input />
        </FormItem>
        <FormItem name="" label="E-Mail">
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
