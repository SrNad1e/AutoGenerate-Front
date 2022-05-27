import {
  BankOutlined,
  DeleteOutlined,
  DollarCircleOutlined,
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  InputNumber,
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

import styles from '../styles';

const { Text } = Typography;
const FormItem = Form.Item;
const { Option } = Select;

const Payments = () => {
  const [visiblePayment, setVisiblePayment] = useState(false);
  const dataTest = [
    {
      register: {
        name: 'Dio Brandon',
        register: '2022-05-04T18:10:20.727Z',
        updated: '2022-05-04T18:10:20.727Z',
      },
      payment: { name: 'bank' },
      change: 10500,
      price: 20000,
    },
  ];

  const column = [
    {
      title: 'Registro',
      dataIndex: 'register',
      render: (register: any) => (
        <Space direction="vertical">
          <Tag icon={<UserOutlined />} style={styles.tagStyle}>
            {register.name}
          </Tag>
          <Text strong>
            Registro:{' '}
            <Tag style={styles.tagStyle}>{moment(register.register).format(FORMAT_DATE)}</Tag>
          </Text>
          <Text strong>
            Actualizado:{' '}
            <Tag style={styles.tagStyle}>{moment(register.updated).format(FORMAT_DATE)}</Tag>
          </Text>
        </Space>
      ),
    },
    {
      title: 'Forma de pago',
      dataIndex: 'payment',
      align: 'center',
      render: (payment: any) => (
        payment.name === 'cash' && (
          <>
            {'Efectivo'} <DollarCircleOutlined style={styles.colorPrimary} />
          </>
        ),
        payment.name === 'bank' && (
          <>
            {'Banco'} <BankOutlined style={styles.colorPrimary} />
          </>
        )
      ),
    },
    {
      title: 'Cambio',
      dataIndex: 'change',
      width: 100,
      render: (change: number) => numeral(change).format('$ 0,0'),
    },
    {
      title: 'Total Pago',
      dataIndex: 'price',
      render: (price: number) => numeral(price).format('$ 0,0'),
    },
    {
      title: 'Opciones',
      dataIndex: '',
      fixed: 'right',
      render: () => (
        <Space>
          <Tooltip title="Confirmar Pago" placement="topLeft">
            <Button onClick={() => {}} type="primary" icon={<DollarCircleOutlined />} />
          </Tooltip>

          <Tooltip title="Editar Valor" placement="topLeft">
            <Button onClick={() => {}} type="primary" ghost icon={<EditOutlined />} />
          </Tooltip>

          <Tooltip title="Eliminar" placement="topLeft">
            <Button danger type="primary" icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const footerTable = () => (
    <Row>
      <Col span={16}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Space size={20}>
              <Button style={styles.inputBorder} type="primary">
                Guardar Pagos
              </Button>
              <Button style={styles.inputBorder} type="primary">
                Reversar Pagos
              </Button>
              <Button
                style={styles.inputBorder}
                onClick={() => setVisiblePayment(visiblePayment ? false : true)}
                type="primary"
                icon={visiblePayment ? <MinusOutlined /> : <PlusOutlined />}
              >
                Agregar Pago
              </Button>
            </Space>
          </Col>
          <Col span={24}>
            {visiblePayment && (
              <Form>
                <FormItem label="Medio de Pago" required>
                  <Select style={styles.widthSelect}>
                    <Option value="Efectivo">Efectivo</Option>
                    <Option value="Banco">Banco</Option>
                  </Select>
                </FormItem>
                <FormItem label="Valor" required>
                  <InputNumber
                    min={1}
                    value={1}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                    controls={false}
                  />
                  <Divider type="vertical" />
                  <Button type="primary" icon={<PlusOutlined />} />
                </FormItem>
              </Form>
            )}
          </Col>
        </Row>
      </Col>
      <Col span={8} style={styles.textRight}>
        <Row>
          <Col span={12}>
            <Text strong>Subtotal</Text>
          </Col>
          <Col span={12}>{numeral(10000).format('$ 0,0')}</Col>
          <Col span={12}>
            <Text strong>Descuento</Text>
          </Col>
          <Col span={12}>{numeral(10000).format('$ 0,0')}</Col>
          <Col span={12}>
            <Text strong>Envío</Text>
          </Col>
          <Col span={12}>{numeral(10000).format('$ 0,0')}</Col>
          <Col span={12}>
            <Text strong>Total</Text>
          </Col>
          <Col span={12}>{numeral(1000000).format('$ 0,0')}</Col>
          <Col span={12}>
            <Text strong>Abonos</Text>
          </Col>
          <Col span={12}>{numeral(10000).format('$ 0,0')}</Col>
          <Col span={12}>
            <Text strong>Saldo</Text>
          </Col>
          <Col span={12}>{numeral(10000).format('$ 0,0')}</Col>
        </Row>
      </Col>
    </Row>
  );

  return (
    <>
      <Divider>Pagos</Divider>
      <Table
        bordered
        columns={column}
        dataSource={dataTest}
        scroll={{ x: 'auto' }}
        footer={footerTable}
        pagination={false}
      />
    </>
  );
};

export default Payments;
