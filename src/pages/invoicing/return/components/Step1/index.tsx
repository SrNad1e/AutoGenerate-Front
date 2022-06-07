/* eslint-disable react-hooks/exhaustive-deps */
import type {
  Customer,
  FiltersOrdersInput,
  Order,
  OrdersQuery,
  ResponseOrders,
  Shop,
  SummaryOrder,
} from '@/graphql/graphql';
import {
  CalendarOutlined,
  DollarCircleOutlined,
  IdcardOutlined,
  InteractionOutlined,
  NumberOutlined,
  SearchOutlined,
  SelectOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
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
  Typography,
} from 'antd';
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import numeral from 'numeral';
import { useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

import styles from '../styles';
import AlertInformation from '@/components/Alerts/AlertInformation';
import moment from 'moment';
import type { Moment } from 'moment';

const { Text } = Typography;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

type FormValues = {
  dates?: Moment[];
  document?: string;
  number?: number;
};

type Props = {
  selectOrder: (record: Order) => void;
  onSearch: (params: FiltersOrdersInput) => void;
  data: OrdersQuery;
};

const RenderStep1 = ({ selectOrder, data, onSearch }: Props) => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  const messageError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const onFinish = (props: FormValues, sort?: Record<string, number>, pageCurrent?: number) => {
    try {
      const params: any = {
        page: pageCurrent || 1,
        limit: 10,
        sort: sort || { createdAt: -1 },
        ...props,
      };

      if (props.dates) {
        const dateInitial = moment(props.dates[0]).format(FORMAT_DATE_API);
        const dateFinal = moment(props.dates[1]).format(FORMAT_DATE_API);
        params.dateFinal = dateFinal;
        params.dateInitial = dateInitial;
      }
      delete params.dates;
      onSearch(params);
    } catch (e: any) {
      messageError(e?.message);
    }
  };

  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ResponseOrders> | SorterResult<ResponseOrders>[] | any,
  ) => {
    const { current } = paginationLocal;
    const params = form.getFieldsValue();

    let sort = {};

    if (sorter?.field) {
      sort = {
        [sorter?.field]: sorter?.order === 'ascend' ? 1 : -1,
      };
    } else {
      sort = {
        createdAt: -1,
      };
    }

    onFinish(params, sort, current);
  };

  const columns: ColumnsType<Order> = [
    {
      title: (
        <Text>
          <NumberOutlined /> Número
        </Text>
      ),
      dataIndex: 'number',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
      render: (number: number) => (
        <Tag style={{ backgroundColor: 'white', color: '#dc9575', borderColor: '#dc9575' }}>
          {number}
        </Tag>
      ),
    },
    {
      title: (
        <Text>
          <ShopOutlined /> Tienda
        </Text>
      ),
      dataIndex: 'shop',
      align: 'center',
      render: (shop: Shop) => <>{shop?.name}</>,
    },
    {
      title: (
        <Text>
          <IdcardOutlined /> Documento
        </Text>
      ),
      dataIndex: 'customer',
      align: 'center',
      render: (customer: Customer) => <>{customer?.document}</>,
    },
    {
      title: (
        <Text>
          <UserOutlined /> Usuario
        </Text>
      ),
      dataIndex: 'customer',
      align: 'center',
      render: (customer: Customer) => (
        <>
          {customer?.firstName} {customer?.lastName}
        </>
      ),
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Total
        </Text>
      ),
      dataIndex: 'summary',
      align: 'right',
      render: (value: SummaryOrder) => numeral(value.total).format('$ 0,0'),
    },
    {
      title: (
        <Text>
          <CalendarOutlined /> Fecha
        </Text>
      ),
      dataIndex: 'updatedAt',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
      render: (updatedAt: Date) => moment(updatedAt).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: (
        <Text>
          <InteractionOutlined /> Seleccionar
        </Text>
      ),
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
      <Form layout="inline" form={form} onFinish={onFinish}>
        <Row>
          <Col xs={6} md={7} lg={6}>
            <FormItem label="Número de Pedido" name="number">
              <InputNumber autoFocus controls={false} placeholder="Ejem: 10" />
            </FormItem>
          </Col>
          <Col xs={24} md={6} lg={7}>
            <FormItem label="Documento" name="document">
              <Input placeholder="Ejem: 1004512204" />
            </FormItem>
          </Col>
          <Col xs={24} md={7} lg={8}>
            <FormItem label="Fechas" colon={false} name="dates">
              <RangePicker style={styles.allWidth} placeholder={['Fecha Inicial', 'Fecha Final']} />
            </FormItem>
          </Col>
          <Col xs={18} md={4} lg={3}>
            <FormItem label=" " colon={false}>
              <Button
                style={styles.borderR}
                icon={<SearchOutlined />}
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
          dataSource={data?.orders.docs as any}
          onChange={handleChangeTable}
        />
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default RenderStep1;
