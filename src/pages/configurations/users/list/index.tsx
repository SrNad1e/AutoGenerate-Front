import SelectRole from '@/components/SelectRole';
import { EditOutlined, PlusOutlined, SearchOutlined, ShopFilled } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import { useState } from 'react';
import UsersForm from '../form';

const FormItem = Form.Item;
const { Text } = Typography;

const UsersList = () => {
  const [visibleCreate, setVisibleCreate] = useState(false);

  const closeModalCreate = () => {
    setVisibleCreate(false);
  };

  const dataTest = [
    {
      name: 'Dio Brandon',
      user: 'JoJo',
      rol: 'Admin',
      shop: 'Gucci',
      active: true,
      updatedAt: '2022-05-31T12:26:50.208Z',
    },
  ];

  const column = [
    {
      title: 'Nombre',
      dataIndex: 'name',
    },
    {
      title: 'Usuario',
      dataIndex: 'user',
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
    },
    {
      title: 'Tienda',
      dataIndex: 'shop',
      render: (shop: string) => (
        <Text>
          {<ShopFilled />} {shop}
        </Text>
      ),
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      align: 'center',
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
      filterMultiple: false,
      filters: [
        {
          text: 'Si',
          value: true,
        },
        {
          text: 'No',
          value: false,
        },
      ],
    },
    {
      title: 'Fecha',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (updatedAt: string) => moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Opciones',
      fixed: 'right',
      align: 'center',
      render: () => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            onClick={() => {}}
            style={{ backgroundColor: '#dc9575' }}
            icon={<EditOutlined style={{ color: 'white' }} />}
          />
        </Tooltip>
      ),
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Form>
          <Row gutter={[20, 20]} align="middle">
            <Col xs={24} md={8} lg={9} xl={7}>
              <FormItem label="Nombre">
                <Input placeholder="Nombre, Nombre de usuario" />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={6}>
              <FormItem label="Rol">
                <SelectRole disabled={false} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={6}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                    Buscar
                  </Button>
                  <Button htmlType="button">Limpiar</Button>
                </Space>
              </FormItem>
            </Col>
            <Col span={12}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                onClick={() => setVisibleCreate(true)}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>Total Encontrados:</Text> {0} <Text strong>Páginas: </Text> {1} /{' '}
              {1 || 0}
            </Col>
            <Col span={24}>
              <Table columns={column} dataSource={dataTest} scroll={{ x: 'auto' }} />
            </Col>
          </Row>
        </Form>
      </Card>
      <UsersForm visible={visibleCreate} onCancel={closeModalCreate} />
    </PageContainer>
  );
};

export default UsersList;
