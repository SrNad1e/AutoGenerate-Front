import {
  CaretRightOutlined,
  ClockCircleFilled,
  EditFilled,
  IdcardFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import numeral from 'numeral';
import moment from 'moment';
import { history } from 'umi';
import { useState } from 'react';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const EcommerceList = () => {
  const [visibleFilters, setVisibleFilters] = useState(false);

  const dataTest = [
    {
      number: 1,
      customer: { firstName: 'Dio', lastName: 'Brandon', identification: 1001203 },
      shop: 'Belen la 76',
      status: { color: 'green', name: 'Pagado' },
      payments: { name: 'Efectivo', total: 100000 },
      createdAt: '2022-05-04T18:10:20.727Z',
      updatedAt: '2022-05-04T18:10:20.727Z',
    },
  ];

  const columns = [
    {
      title: 'Número',
      dataIndex: 'number',
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      width: 200,
      render: (customer: any) => (
        <>
          <Space direction="vertical" size={1}>
            <Text strong>
              {customer?.firstName} {customer?.lastName}{' '}
              <Tag title="Tipo de cliente" style={styles.tagStyle}>
                {'Mayorista'}
              </Tag>
            </Text>
            <Text title="Documento" style={styles.textStyle}>
              <IdcardFilled /> {customer.identification !== '0' ? customer.identification : 'N/A'}
            </Text>
          </Space>
        </>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      render: (status: any) => <Badge color={status.color} text={status.name} />,
    },
    {
      title: 'Formas de Pago',
      dataIndex: 'payments',
      width: 150,
      align: 'left',
      render: (payments: any) => (
        <>
          {payments.name}: <Text strong>{numeral(payments.total).format('$ 0,0')}</Text>
        </>
      ),
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      sorter: true,
      showSorterTooltip: false,
      render: (createdAt: string) => (
        <>
          {moment(createdAt).format(FORMAT_DATE)}
          <Tag style={styles.tagStyle}>
            {moment(createdAt).fromNow()} <ClockCircleFilled />
          </Tag>
        </>
      ),
    },
    {
      title: 'Actualizado',
      dataIndex: 'updatedAt',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: string) => (
        <>
          {moment(updatedAt).format(FORMAT_DATE)}

          <Tag style={styles.tagStyle}>
            {moment(updatedAt).fromNow()} <ClockCircleFilled />
          </Tag>
        </>
      ),
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: () => (
        <Tooltip title="Editar">
          <Button
            onClick={() => history.push('/billing/e-commerce/:id')}
            type="primary"
            icon={<EditFilled />}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form>
          <Row gutter={15} align="middle">
            <Col xs={24} md={6} lg={5}>
              <FormItem label="Número">
                <InputNumber style={styles.inputNumberWidth} controls={false} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8}>
              <FormItem label="Cliente">
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} md={9} lg={9}>
              <FormItem label="Estado">
                <Select allowClear placeholder="Seleccione un estado">
                  <Option value="Completo">Cancelado</Option>
                  <Option value="Incompleto">Entregado</Option>
                  <Option value="Enviado">Enviado</Option>
                  <Option value="Facturado">Facturado</Option>
                  <Option value="Pagado">Pagado</Option>
                  <Option value="Pendiente de pago">Pendiente de pago</Option>
                  <Option value="Preparando pedido">Preparando pedido</Option>
                  <Option value="Reservado">Reservado</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={1} style={styles.moreFilters}>
              <CaretRightOutlined
                onClick={() => setVisibleFilters(visibleFilters ? false : true)}
                rotate={visibleFilters ? 90 : 0}
              />
            </Col>
            {visibleFilters && (
              <>
                <Col xs={24} md={10} lg={9} xl={10}>
                  <FormItem label="Formas de pago">
                    <Select style={styles.selectWidth} allowClear showSearch>
                      <Option value="Efectivo">Efectivo</Option>
                      <Option value="Credito">Credito</Option>
                      <Option value="Bancolombia">Bancolombia</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col xs={24} md={12} lg={12} xl={10}>
                  <FormItem label="Fechas">
                    <RangePicker
                      style={styles.dateWidth}
                      placeholder={['Fecha inicial', 'Fecha Final']}
                    />
                  </FormItem>
                </Col>
              </>
            )}
            <Col span={24}>
              <FormItem colon={false}>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary">
                    Buscar
                  </Button>
                  <Button>Limpiar</Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Divider style={styles.dividerMargin} />
        <Space>
          <Text strong>Total Encontrados:</Text>
          <Text>10</Text>
          <Text strong>Página:</Text>
          <Text>1/1</Text>
        </Space>
      </Card>
      <Card bordered={false} bodyStyle={styles.bodyPadding}>
        <Table columns={columns} scroll={{ x: 1000 }} dataSource={dataTest} />
      </Card>
    </PageContainer>
  );
};

export default EcommerceList;
