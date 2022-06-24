/* eslint-disable react-hooks/exhaustive-deps */
import { Customer, FiltersCustomersInput } from '@/graphql/graphql';
import { useGetCustomers } from '@/hooks/customer.hooks';
import {
  ClearOutlined,
  EditFilled,
  IdcardOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { useEffect, useState } from 'react';

import EditCustomer from '../edit';
import FormCustmer from '../form';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { Text } = Typography;

const CustomerList = () => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const [getCustomers, paramsGetCustomers] = useGetCustomers();

  const onSearch = (filters?: FiltersCustomersInput) => {
    getCustomers({
      variables: {
        input: {
          ...filters,
        },
      },
    });
  };

  /**
   * Cierra el modal de edicion
   */
  const closeEditModal = () => {
    setVisibleEdit(false);
  };

  /**
   * Cierra el modal de creacion
   */
  const closeCreateModal = () => {
    setVisibleForm(false);
  };

  useEffect(() => {
    onSearch();
  }, []);

  const column: ColumnsType<Customer> = [
    {
      title: 'Cliente',
      dataIndex: 'customer',
      align: 'center',
      render: (_, customer: Customer) => (
        <Space direction="vertical" size={5}>
          <Text>
            {<UserOutlined />} {customer?.firstName} {customer?.lastName}
          </Text>
          <Text>
            {<IdcardOutlined />} {customer?.document}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: 'Tipo de cliente',
      dataIndex: 'customerType',
      align: 'center',
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
      dataIndex: 'createdAt',
      align: 'center',
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
    {
      title: 'Opción',
      dataIndex: '',
      align: 'center',
      render: () => (
        <Tooltip title="Editar">
          <Button onClick={() => setVisibleEdit(true)} type="primary" icon={<EditFilled />} />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form>
          <Row gutter={30}>
            <Col xs={24} md={9} lg={9} xl={7}>
              <FormItem label="Nombre">
                <Input placeholder="Correo, Telefono, Documento..." />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8}>
              <FormItem label="Tipo de Cliente">
                <Select allowClear showSearch>
                  <Option value="Mayorista">Mayorista</Option>
                  <Option value="Distribuidor">Distribuidor</Option>
                  <Option value="Detal">Detal</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7}>
              <Space>
                <Button
                  style={{ borderRadius: 5 }}
                  icon={<SearchOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Buscar
                </Button>
                <Button style={{ borderRadius: 5 }} icon={<ClearOutlined />} onClick={() => {}}>
                  Limpiar
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]} align="middle" style={styles.marginFilter}>
          <Col xs={12} md={15} lg={16}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              onClick={() => setVisibleForm(true)}
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={12} md={9} lg={8} style={{ textAlign: 'right' }}>
            <Text strong>Total Encontrados:</Text> {1} <Text strong>Páginas: </Text> {1} / {1 || 0}
          </Col>
          <Col span={24}>
            <Table
              columns={column}
              dataSource={paramsGetCustomers.data?.customers.docs}
              scroll={{ x: 'auto' }}
            />
          </Col>
        </Row>
      </Card>
      <FormCustmer visible={visibleForm} onCancel={closeCreateModal} />
      <EditCustomer visible={visibleEdit} onCancel={closeEditModal} />
    </PageContainer>
  );
};

export default CustomerList;
