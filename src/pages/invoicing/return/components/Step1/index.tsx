import type { Customer, Order, Shop, SummaryOrder } from '@/graphql/graphql';
import { useGetOrdersByPos } from '@/hooks/order.hooks';
import { SearchOutlined, SelectOutlined } from '@ant-design/icons';
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
import type { ColumnsType } from 'antd/es/table/interface';
import moment from 'moment';
import numeral from 'numeral';
import { useModel } from 'umi';
import { StatusType } from '../../return.data';

import styles from '../styles';

const FormItem = Form.Item;

type Props = {
  selectOrder: (record: Order) => void;
};

const RenderStep1 = ({ selectOrder }: Props) => {
  const { initialState } = useModel('@@initialState');
  const [getOrders, { data }] = useGetOrdersByPos();

  const idPos = initialState?.currentUser?.pointOfSale?._id;
  const onSearch = (id: string) => {
    getOrders({
      variables: {
        id,
      },
    });
  };

  const columns: ColumnsType<Order> = [
    {
      title: 'Pedido',
      dataIndex: 'number',
      align: 'center',
      render: (number: number) => <Tag color={'cyan'}>{number}</Tag>,
    },
    {
      title: 'Tienda',
      dataIndex: 'shop',
      align: 'center',
      render: (shop: Shop) => <>{shop?.name}</>,
    },
    {
      title: 'Documento',
      dataIndex: 'customer',
      align: 'center',
      render: (customer: Customer) => <>{customer.document}</>,
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      align: 'center',
      render: (customer: Customer) => (
        <>
          {customer.firstName} {customer.lastName}
        </>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'summary',
      sorter: true,
      showSorterTooltip: false,
      align: 'right',
      render: (value: SummaryOrder) => numeral(value.total).format('$ 0,0'),
    },
    {
      title: 'Fecha',
      dataIndex: 'updatedAt',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
      render: (updatedAt: Date) => moment(updatedAt).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => (
        <Badge color={StatusType[status]?.color} text={StatusType[status]?.text} />
      ),
    },
    {
      title: 'Selecccionar',
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_, Order: Order) => (
        <Button
          disabled={false}
          onClick={() => selectOrder(Order)}
          type="primary"
          icon={<SelectOutlined />}
        />
      ),
    },
  ];

  return (
    <>
      <Form layout="inline">
        <Row>
          <Col xs={24} md={7} lg={8}>
            <FormItem label="Buscar">
              <Input autoFocus placeholder="Documento, pedido" />
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
              <Button
                icon={<SearchOutlined />}
                onClick={() => onSearch(idPos)}
                type="primary"
                htmlType="submit"
              >
                Buscar
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Divider orientation="left" style={styles.dividerMarginTop}>
        Pedidos
      </Divider>
      <Card bordered={false} bodyStyle={styles.bodyCardPadding}>
        <Table
          columns={columns}
          scroll={{ x: 900 }}
          dataSource={data?.ordersByPointOfSale as any}
        />
      </Card>
    </>
  );
};

export default RenderStep1;
