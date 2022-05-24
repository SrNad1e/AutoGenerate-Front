import { PlusOutlined, PrinterFilled, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import moment from 'moment';
import { useState } from 'react';

import FormReturn from '../form';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { Text } = Typography;

const ReturnList = () => {
  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const dataTest = [
    {
      code: '1',
      invoice: 4321,
      order: 32,
      shop: '10 Downing Street',
      value: 10000,
    },
    {
      code: '2',
      invoice: 1234,
      order: 42,
      shop: '10 Downing Street',
      value: 10000,
    },
  ];

  const columns: ColumnsType = [
    {
      title: 'Codigo',
      dataIndex: 'code',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Pedido',
      dataIndex: 'order',
      align: 'center',
    },
    {
      title: 'Factura',
      dataIndex: 'invoice',
      align: 'center',
    },
    {
      title: 'Tienda',
      dataIndex: 'shop',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Fecha de creación',
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
    {
      title: 'Opciones',
      fixed: 'right',
      dataIndex: '_id',
      align: 'center',
      render: () => {
        return (
          <Space>
            <Tooltip title="Imprimir Devolución">
              <Button type="primary" onClick={() => {}} icon={<PrinterFilled />} />
            </Tooltip>
            <Space>
              <Tooltip title="Imprimir Cupon">
                <Button type="ghost" onClick={() => {}} icon={<PrinterFilled />} />
              </Tooltip>
            </Space>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form>
          <Row gutter={[15, 0]}>
            <Col xs={24} md={7} lg={6}>
              <FormItem label="Código Pedido">
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={6}>
              <FormItem label="Código Cupón">
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={6}>
              <FormItem label="Código Factura">
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={6}>
              <FormItem label="Tienda">
                <Select showSearch placeholder="Seleccione una tienda">
                  <Option value="Gucci">Gucci</Option>
                  <Option value="Toulouse">Toulouse</Option>
                  <Option>Louis Vuitton</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={4}>
              <FormItem>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                    Buscar
                  </Button>
                  <Button htmlType="reset" onClick={() => {}}>
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Divider style={styles.dividerNoMargin} />
        <Row>
          <Col xs={12} md={15} lg={15}>
            <Button
              onClick={() => setVisible(true)}
              icon={<PlusOutlined />}
              shape="round"
              type="primary"
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={12} md={9} lg={9}>
            <Space>
              <Text strong>Total Encontrados:</Text>
              <Text>10</Text>
              <Text strong>Pagina:</Text>
              <Text>1/1</Text>
            </Space>
          </Col>
        </Row>
      </Card>
      <Card bordered={false} bodyStyle={styles.noPaddingTop}>
        <Table columns={columns} scroll={{ x: 1000 }} pagination={false} dataSource={dataTest} />
      </Card>
      <FormReturn visible={visible} onCancel={closeModal} />
    </PageContainer>
  );
};

export default ReturnList;
