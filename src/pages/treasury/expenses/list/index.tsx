import { CloseSquareFilled, PlusOutlined, PrinterFilled, SearchOutlined } from '@ant-design/icons';
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
import moment from 'moment';
import numeral from 'numeral';
import { useState } from 'react';

import ExpensesForm from '../form';

import styles from '../styles';

const FormItem = Form.Item;
const { Option } = Select;
const { Text } = Typography;

const ExpensesList = () => {
  const [visibleModalCreate, setVisibleModalCreate] = useState(false);

  const closeModalCreate = () => {
    setVisibleModalCreate(false);
  };

  const dataTest = [
    {
      number: 1,
      value: 100000,
      status: 'Activo',
      updatedAt: '2022-05-04T18:10:20.727Z',
    },
  ];

  const column = [
    {
      title: 'Numero',
      dataIndex: 'number',
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      render: (value: number) => numeral(value).format('$ 0,0'),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      render: (status: string) => {
        return (
          <Badge status={status ? 'success' : 'default'} text={status ? 'Activo' : 'Inactivo'} />
        );
      },
    },
    {
      title: 'Fecha',
      dataIndex: 'updatedAt',
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: 'Opción',
      dataIndex: '',
      render: () => (
        <Space>
          <Tooltip title="Anular">
            <Button onClick={() => {}} type="primary" icon={<CloseSquareFilled />} />
          </Tooltip>
          <Tooltip title="Imprimir" placement="topLeft">
            <Button type="primary" icon={<PrinterFilled />} />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Form layout="horizontal">
          <Row gutter={40}>
            <Col xs={24} sm={7} md={5} lg={6}>
              <FormItem label="Número">
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} sm={7} md={9} lg={9}>
              <FormItem label="Tienda">
                <Select placeholder="Seleccione Tienda" allowClear showSearch>
                  <Option>Toulouse</Option>
                  <Option>Gucci</Option>
                  <Option>Louis Vuitton XV</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} sm={8} md={8} lg={8}>
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
              onClick={() => setVisibleModalCreate(true)}
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={12} md={9} lg={8}>
            <Text strong>Total Encontrados:</Text> {1} <Text strong>Páginas: </Text> {1} / {1 || 0}
          </Col>
          <Col span={24}>
            <Table columns={column} dataSource={dataTest} scroll={{ x: 'auto' }} />
          </Col>
        </Row>
      </Card>
      <ExpensesForm visible={visibleModalCreate} onCancel={closeModalCreate} />
    </PageContainer>
  );
};

export default ExpensesList;
