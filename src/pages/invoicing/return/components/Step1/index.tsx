/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  DollarCircleOutlined,
  FieldNumberOutlined,
  IdcardOutlined,
  InteractionOutlined,
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
import type {
  Customer,
  FiltersOrdersInput,
  Order,
  OrdersQuery,
  ResponseOrders,
  Shop,
  SummaryOrder,
} from '@/graphql/graphql';
import numeral from 'numeral';
import { useState } from 'react';
import moment from 'moment';
import type { Moment } from 'moment';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import SearchCustomer from '@/components/SearchCustomer';

import styles from '../styles';

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
  data?: OrdersQuery;
  loading: boolean;
};

const RenderStep1 = ({ selectOrder, data, onSearch, loading }: Props) => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const messageError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description se encarga de realizar el proceso de busqueda con los filtros y formatear las fechas
   * @param props filtros seleccionados en el formulario
   */
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

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
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
        <Text style={styles.iconSize}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'number',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
      width: 120,
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
      width: 130,
      dataIndex: 'customer',
      align: 'center',
      render: (customer: Customer) => <>{customer?.document}</>,
    },
    {
      title: (
        <Text>
          <UserOutlined /> Cliente
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
      align: 'center',
      render: (value: SummaryOrder) => numeral(value?.total).format('$ 0,0'),
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
      width: 130,
      render: (_, Order: Order) => (
        <Button
          disabled={false}
          onClick={() => selectOrder(Order)}
          type="primary"
          loading={loading}
          icon={<SelectOutlined />}
        />
      ),
    },
  ];

  return (
    <>
      <Form layout="horizontal" form={form} onFinish={onFinish}>
        <Row gutter={30}>
          <Col xs={24} md={7} lg={6} xl={6}>
            <FormItem label="Número de Pedido" name="number">
              <InputNumber autoFocus disabled={loading} controls={false} placeholder="Ejem: 10" />
            </FormItem>
          </Col>
          <Col xs={24} md={6} lg={7} xl={7}>
            <FormItem label="Cliente" name="customerId">
              <SearchCustomer disabled={loading} />
            </FormItem>
          </Col>
          <Col xs={24} md={7} lg={8} xl={8}>
            <FormItem label="Fechas" name="dates">
              <RangePicker
                disabled={loading}
                style={styles.allWidth}
                placeholder={['Fecha Inicial', 'Fecha Final']}
              />
            </FormItem>
          </Col>
          <Col xs={18} md={4} lg={3} xl={3}>
            <FormItem>
              <Button
                style={styles.borderR}
                icon={<SearchOutlined />}
                type="primary"
                htmlType="submit"
                loading={loading}
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
          scroll={{ x: 900, y: 400 }}
          dataSource={data?.orders?.docs as any}
          onChange={handleChangeTable}
          loading={loading}
          pagination={{
            current: data?.orders?.page,
            total: data?.orders?.totalDocs,
            showSizeChanger: false,
          }}
        />
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default RenderStep1;
