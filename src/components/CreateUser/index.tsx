/* eslint-disable react-hooks/exhaustive-deps */
import {
  CrownOutlined,
  FileSyncOutlined,
  LaptopOutlined,
  RetweetOutlined,
  ShopOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Badge,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import type { User } from '@/graphql/graphql';
import { StatusUser } from '@/graphql/graphql';
import { useCreateUser, useUpdateUser } from '@/hooks/user.hooks';

import SelectPointOfSale from '@/components/SelectPointOfSale';
import SelectRole from '@/components/SelectRole';
import SelectShop from '@/components/SelectShop';
import { StatusTypeUser } from './users.data';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '../Alerts/AlertLoading';
import EditPassword from '../EditPassword';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

import styles from './styles';

const FormItem = Form.Item;
const { Text } = Typography;
const { Option } = Select;

type Props = {
  visible: boolean;
  onCancel: () => void;
  user: User | any;
};

const UsersForm = ({ visible, onCancel, user }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [canSelectPos, setCanSelectPos] = useState(false);
  const [shopId, setShoptId] = useState('');
  const [visibleChangePassword, setVisibleChangePassword] = useState(false);

  const [createUser, { loading }] = useCreateUser();
  const [updateUser, paramsUpdate] = useUpdateUser();

  const isNew = !user._id;

  const [form] = Form.useForm();

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    setError('');
    form.resetFields();
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'warning',
      visible: true,
    });
  };

  /**
   * @description Cierra el modal de cambio de contraseña
   */
  const closeModalChangePassword = () => {
    setVisibleChangePassword(false);
  };

  /**
   * @description cierra la alerta y resetea los campos del form
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    closeAndClear();
  };

  /**
   * @description ejecuta la mutation para actualizar un usuario
   */
  const editUser = async () => {
    const values = await form.validateFields();

    delete values.username;
    try {
      let errorLocal = 'No hay cambios para aplicar';

      Object.keys(values).forEach((i) => {
        if (values[i] !== (user && user[i])) {
          errorLocal = '';
          return;
        }
      });
      if (errorLocal) {
        setError(errorLocal);
      }
      const response = await updateUser({
        variables: {
          input: values,
          id: user?._id || '',
        },
      });
      if (response?.data?.updateUser) {
        setAlertInformation({
          message: `Usuario ${response?.data?.updateUser?.name} actualizado correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      if (e?.message) {
        showError(e?.message);
      }
    }
  };

  /**
   * @description ejecuta la mutation para crear un nuevo usuario
   */
  const createNewUser = async () => {
    const values = await form.validateFields();
    try {
      const response = await createUser({
        variables: {
          input: values,
        },
      });
      if (response?.data?.createUser) {
        setAlertInformation({
          message: (
            <Space direction="vertical">
              <Text>Usuario creado correctamente</Text>
              <Text>Usuario: {response?.data?.createUser?.username}</Text>
              <Text> Contraseña: {response?.data?.createUser?.password}</Text>
            </Space>
          ),
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  const onChangeShop = (id: string) => {
    if (id) {
      setCanSelectPos(true);
      setShoptId(id);
    }
  };

  useEffect(() => {
    setCanSelectPos(false);
    setError(null);

    form.setFieldsValue({
      ...user,
      roleId: user?.role?._id,
      shopId: user?.shop?._id,
      pointOfSaleId: user?.pointOfSale?._id,
    });
  }, [visible]);
  return (
    <Modal
      visible={visible}
      width={400}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={closeAndClear}
      onOk={isNew ? createNewUser : editUser}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Usuario' : 'Actualizar Usuario'}
    >
      <Form form={form} layout="vertical" style={styles.centerForm}>
        <Row>
          <Col span={24}>
            {!isNew && (
              <FormItem
                name="username"
                label={
                  <Space>
                    <UserAddOutlined />
                    <Text>Usuario</Text>
                  </Space>
                }
              >
                <Input disabled />
              </FormItem>
            )}
            <FormItem
              name="name"
              label={
                <Space>
                  <UserOutlined />
                  <Text>Nombre</Text>
                </Space>
              }
            >
              <Input placeholder="Ingrese nombre" />
            </FormItem>
            <FormItem
              name="roleId"
              label={
                <Space>
                  <CrownOutlined />
                  <Text>Rol</Text>
                </Space>
              }
            >
              <SelectRole disabled={loading} />
            </FormItem>
            <FormItem
              name="shopId"
              label={
                <Space>
                  <ShopOutlined />
                  <Text>Tienda</Text>
                </Space>
              }
            >
              <SelectShop onChange={(id) => onChangeShop(id)} disabled={loading} />
            </FormItem>
            <FormItem
              name="pointOfSaleId"
              label={
                <Space>
                  <LaptopOutlined />
                  <Text>Punto de Venta</Text>
                </Space>
              }
            >
              <SelectPointOfSale shopId={shopId} disabled={loading || (isNew && !canSelectPos)} />
            </FormItem>
            <FormItem
              name="status"
              label={
                <Space>
                  <FileSyncOutlined />
                  <Text>Estado</Text>
                </Space>
              }
            >
              <Select
                style={styles.maxWidth}
                loading={loading}
                placeholder="Seleccione el Estado"
                optionFilterProp="children"
                disabled={loading}
                allowClear
                defaultValue={StatusUser.Active}
              >
                {Object.keys(StatusTypeUser).map((status) => (
                  <Option key={status}>
                    <Badge
                      color={StatusTypeUser[status].color}
                      text={StatusTypeUser[status].label}
                    />
                  </Option>
                ))}
              </Select>
            </FormItem>
            {!isNew && (
              <Button
                style={styles.buttonR}
                icon={<RetweetOutlined />}
                onClick={() => setVisibleChangePassword(true)}
                type="primary"
              >
                Cambiar Contraseña
              </Button>
            )}
          </Col>
        </Row>
        {error && <Alert type="error" message={error} showIcon />}
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertLoading visible={loading} message="Creando Usuario" />
      <AlertLoading visible={paramsUpdate?.loading} message="Actualizando Usuario" />
      <EditPassword
        visible={visibleChangePassword}
        onCancelModal={closeModalChangePassword}
        userId={user?._id}
      />
    </Modal>
  );
};

export default UsersForm;
