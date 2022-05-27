import { FileProtectOutlined, SearchOutlined, SelectOutlined } from '@ant-design/icons';
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
  Table,
  Tag,
} from 'antd';
import moment from 'moment';
import numeral from 'numeral';

import styles from '../styles';

const FormItem = Form.Item;

type Props = {
  selectInvoice: () => void;
};

const RenderStep1 = ({ selectInvoice }: Props) => {
  const test = [
    {
      shop: 'Gucci',
      identification: 1234,
      customer: { name: 'Jotaro', lastName: 'Dio' },
      total: 10000,
      createdAt: '12/05/2022',
      status: 'Open',
    },
  ];

  const columns = [
    {
      title: 'Factura',
      dataIndex: 'invoice',
      align: 'center',
      render: () => (
        <Tag color="blue">
          <FileProtectOutlined />
          {'SJ'}
          {2905}
        </Tag>
      ),
    },
    {
      title: 'Tienda',
      dataIndex: 'shop',
      align: 'center',
    },
    {
      title: 'Documento',
      dataIndex: 'identification',
      align: 'center',
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      align: 'center',
      render: (customer: any) => (
        <>
          {customer.name} {customer.lastName}
        </>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      sorter: true,
      showSorterTooltip: false,
      align: 'right',
      render: (total: number) => numeral(total).format('$ 0,0'),
    },
    {
      title: 'Fecha',
      dataIndex: 'createdAt',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
      render: (createdAt: Date) => moment(createdAt).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => <Badge color={'green'} text={status} />,
    },
    {
      title: 'Selecccionar',
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: () => (
        <Button disabled={false} onClick={selectInvoice} type="primary" icon={<SelectOutlined />} />
      ),
    },
  ];

  return (
    <>
      <Form layout="inline">
        <Row>
          <Col xs={24} md={7} lg={8}>
            <FormItem label="Buscar">
              <Input autoFocus placeholder="Documento, factura" />
            </FormItem>
          </Col>
          <Col xs={24} md={7} lg={7}>
            <FormItem label=" " colon={false}>
              <DatePicker style={styles.allWidth} placeholder="Seleccionar Fecha" />
            </FormItem>
          </Col>
          <Col xs={6} md={5} lg={6}>
            <FormItem label="Valor">
              <InputNumber
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                step={100}
              />
            </FormItem>
          </Col>
          <Col xs={18} md={5} lg={3}>
            <FormItem label=" " colon={false}>
              <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                Buscar
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Divider orientation="left" style={styles.dividerMarginTop}>
        Facturas
      </Divider>
      <Card bordered={false} bodyStyle={styles.bodyCardPadding}>
        <Table columns={columns} scroll={{ x: 900 }} dataSource={test} />
      </Card>
    </>
  );
};

export default RenderStep1;
