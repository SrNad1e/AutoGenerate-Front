import {
  EditFilled,
  FieldTimeOutlined,
  IdcardOutlined,
  PlusOutlined,
  PrinterFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import { useState } from 'react';

import WalletsForm from '../form';
import WalletsHistorical from '../historical';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { Text } = Typography;

const WalletsList = () => {
  const [visibleHistorical, setVisibleHistorical] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [wallet, setWallet] = useState({});

  const closeModal = () => {
    setVisibleModal(false);
  };

  const closeModalHistorical = () => {
    setVisibleHistorical(false);
  };

  const newWallet = (id?: number) => {
    setWallet({ id });
    setVisibleModal(true);
  };

  const dataTest = [
    {
      id: 1000101,
      number: 1,
      customer: { name: 'Angelo Lagusa', id: 100100101 },
      value: 10000000,
      coupon: 187555,
      createdAt: '2022-05-04T18:10:20.727Z',
      expiration: '2022-05-04T18:10:20.727Z',
    },
  ];

  const column = [
    {
      title: 'Número',
      dataIndex: 'number',
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      render: (customer: any) => (
        <Space direction="vertical" size={1}>
          <Text strong>{customer.name}</Text>
          <Tag icon={<IdcardOutlined />} style={styles.tagStyle}>
            {customer.id}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Deuda',
      dataIndex: 'value',
      render: (value: number) => numeral(value).format('$ 0,0'),
    },
    {
      title: 'Cupo',
      dataIndex: 'coupon',
      render: (coupon: number) => numeral(coupon).format('$ 0,0'),
    },
    {
      title: 'Saldo',
      dataIndex: 'value',
      render: (value: number) => numeral(value).format('$ 0,0'),
    },
    {
      title: 'Vencimiento',
      dataIndex: 'expiration',
      render: (expiration: Date) => moment(expiration).format(FORMAT_DATE_API),
    },
    {
      title: 'Creación',
      dataIndex: 'createdAt',
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
    {
      title: 'Opciones',
      dataIndex: 'id',
      fixed: 'right',
      render: (id: number) => (
        <Space size={5}>
          <Tooltip title="Editar">
            <Button onClick={() => newWallet(id)} type="primary" icon={<EditFilled />} />
          </Tooltip>
          <Tooltip title="Imprimir">
            <Button type="dashed" icon={<PrinterFilled />} />
          </Tooltip>
          <Tooltip title="Historicos">
            <Button
              onClick={() => setVisibleHistorical(true)}
              ghost
              type="primary"
              icon={<FieldTimeOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form>
          <Row gutter={20}>
            <Col xs={24} md={6} lg={6}>
              <FormItem label="Número">
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} md={11} lg={10}>
              <FormItem label="Cliente">
                <Select
                  allowClear
                  showSearch
                  placeholder="Seleccione el Cliente"
                  style={styles.selectWidth}
                >
                  <Option value="1">Jotaro Koru</Option>
                  <Option value="2">Dio Brandon</Option>
                  <Option value="3">Angelo Lagusa</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} sm={8} md={7} lg={8}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                    Buscar
                  </Button>
                  <Button onClick={() => {}}>Limpiar</Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]} align="middle" style={styles.marginFilters}>
          <Col xs={12} md={15} lg={16}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              onClick={() => newWallet()}
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={12} md={9} lg={8}>
            <Text strong>Total Encontrados:</Text> {1} <Text strong>Páginas: </Text> {1} / {1 || 0}
          </Col>
          <Col span={24}>
            <Table columns={column} dataSource={dataTest} scroll={{ x: 1000 }} />
          </Col>
        </Row>
      </Card>
      <WalletsForm visible={visibleModal} onCancel={closeModal} wallets={wallet} />
      <WalletsHistorical visible={visibleHistorical} onCancel={closeModalHistorical} />
    </PageContainer>
  );
};

export default WalletsList;
