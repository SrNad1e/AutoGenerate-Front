/* eslint-disable react-hooks/exhaustive-deps */
import {
  BankOutlined,
  CarOutlined,
  ClearOutlined,
  ClockCircleFilled,
  DingtalkOutlined,
  EditFilled,
  FieldNumberOutlined,
  FileSyncOutlined,
  IdcardFilled,
  MoreOutlined,
  ScheduleOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
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
import type { ColumnsType } from 'antd/lib/table';
import type { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import numeral from 'numeral';
import type { Moment } from 'moment';
import moment from 'moment';
import type { Location } from 'umi';
import { useHistory, useLocation } from 'umi';
import { useEffect, useState } from 'react';
import { useGetOrders } from '@/hooks/order.hooks';
import type {
  ConveyorOrder,
  Customer,
  FiltersOrdersInput,
  Order,
  PaymentOrder,
  StatusWeb,
} from '@/graphql/graphql';
import { StatusOrder } from '@/graphql/graphql';
import 'moment/locale/es';

import { StatusType } from '../e-commerce.data';
import SearchCustomer from '@/components/SearchCustomer';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectPayment from '@/components/SelectPayment';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text } = Typography;
moment.locale('es');

type FormValues = {
  number?: number;
  customerId?: string;
  statusWeb?: StatusOrder;
  paymentId?: string;
  dates?: Moment[];
};

const EcommerceList = () => {
  const [filters, setFilters] = useState<Partial<FormValues>>();
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  const history = useHistory();

  const location: Location = useLocation();

  const [getOrders, { data, loading }] = useGetOrders();

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
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description funcion ejecutada para obtener los pedidos
   * @param params filtros para consultar los pedidos
   */
  const onSearch = (params?: FiltersOrdersInput) => {
    try {
      getOrders({
        variables: {
          input: {
            orderPos: false,
            nonStatus: [StatusOrder.Pendding],
            sort: {
              createdAt: -1,
            },
            ...params,
          },
        },
      });
    } catch (error: any) {
      showError(error.message);
    }
  };

  /*
   * @description se encarga de realizar el proceso de busqueda con los filtros
   * @param props filtros seleccionados en el formulario
   */
  const onFinish = (props: FormValues, sort?: Record<string, number>, pageCurrent?: number) => {
    const { statusWeb, number, customerId, paymentId, dates } = props;
    try {
      const params: Partial<FiltersOrdersInput> = {
        page: pageCurrent || 1,
        limit: 10,
        statusWeb,
        number,
        sort: sort || { createdAt: -1 },
      };
      if (dates) {
        const dateInitial = moment(dates[0]).format('YYYY/MM/DD 00:00:00');
        const dateFinal = moment(dates[1]).format('YYYY/MM/DD 00:00:00');
        params.dateFinal = dateFinal;
        params.dateInitial = dateInitial;
      }
      if (customerId) {
        params.customerId = customerId;
      }
      if (paymentId) {
        params.paymentId = paymentId;
      }
      onSearch(params);
      const datos = Object.keys(props)
        .reduce((a, key) => (props[key] ? `${a}&${key}=${JSON.stringify(props[key])}` : a), '')
        .slice(1);
      form.setFieldsValue(props);
      history.replace(`${location.pathname}?${datos}`);
    } catch (error: any) {
      showError(error?.message);
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
    sorter: SorterResult<Order> | SorterResult<Order>[] | any,
  ) => {
    const { current } = paginationLocal;
    const params = form.getFieldsValue();

    let sort = {};

    if (sorter.field) {
      sort = {
        [sorter.field]: sorter.order === 'ascend' ? 1 : -1,
      };
    } else {
      sort = {
        createdAt: -1,
      };
    }
    onFinish(params, sort, current);
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    try {
      history.replace(location.pathname);
      form.resetFields();
      onSearch({
        limit: 10,
        page: 1,
      });
      setFilters({});
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const loadingData = () => {
    const queryParams: any = location?.query;

    const newFilters = {};
    try {
      Object.keys(queryParams).forEach((item) => {
        if (item === 'dates') {
          const dataItem = JSON.parse(queryParams[item]);
          newFilters[item] = [moment(dataItem[0]), moment(dataItem[1])];
        } else {
          newFilters[item] = JSON.parse(queryParams[item]);
        }
      });
      onFinish(newFilters);
    } catch (error: any) {
      showError(error?.message);
    }
  };

  useEffect(() => {
    loadingData();
  }, []);

  const columns: ColumnsType<Order> = [
    {
      title: (
        <Text style={styles.iconFontSize}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'number',
    },
    {
      title: <Text>{<UserOutlined />} Cliente</Text>,
      dataIndex: 'customer',
      width: 200,
      render: (customer: Customer, order: Order) => (
        <>
          <Space direction="vertical" size={1}>
            <Text>
              {customer?.firstName} {customer?.lastName}{' '}
              <Tag title="Tipo de cliente" style={styles.tagStyle}>
                {customer?.customerType?.name}
              </Tag>
            </Text>
            <Text title="Documento" style={styles.textStyle}>
              <IdcardFilled style={styles.tagStyle} />{' '}
              {customer.document !== '0' ? customer.document : 'N/A'}
            </Text>
            {order.address !== null && (
              <Text title="Destino" style={styles.textStyle}>
                <CarOutlined style={styles.tagStyle} /> {order.address?.city.name},{' '}
                {order?.address?.city?.state}
              </Text>
            )}
          </Space>
        </>
      ),
    },
    {
      title: <Text>{<DingtalkOutlined />} Método de Envío</Text>,
      dataIndex: 'conveyorOrder',
      align: 'center',
      width: 160,
      render: (conveyorOrder: ConveyorOrder) => (
        <Space>
          {conveyorOrder === null ? (
            <Text>{'(PENDIENTE)'}</Text>
          ) : (
            <Avatar
              shape="square"
              style={{ borderRadius: 4 }}
              size="small"
              src={`${CDN_URL}/${conveyorOrder?.conveyor?.logo.urls?.webp?.small}`}
            />
          )}
          <Text>{conveyorOrder?.conveyor?.name}</Text>
        </Space>
      ),
    },
    {
      title: <Text>{<FileSyncOutlined />} Estado</Text>,
      dataIndex: 'statusWeb',
      width: 160,
      align: 'center',
      render: (statusWeb: StatusWeb) => (
        <Badge color={StatusType[statusWeb]?.color} text={StatusType[statusWeb]?.text} />
      ),
    },
    {
      title: <Text>{<BankOutlined />} Formas de Pago</Text>,
      dataIndex: 'payments',
      width: 200,
      align: 'left',
      render: (payments: PaymentOrder[]) => (
        <>
          {payments?.length > 0
            ? payments.map(({ total, payment }) => (
                <>
                  {' '}
                  {payment?.name}:{' '}
                  <Text>
                    {numeral(total).format('$ 0,0')}
                    <br />
                  </Text>
                </>
              ))
            : '(PENDIENTE)'}
        </>
      ),
    },
    {
      title: (
        <Text>
          <ScheduleOutlined /> Creado
        </Text>
      ),
      dataIndex: 'createdAt',
      sorter: true,
      showSorterTooltip: false,
      width: 120,
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
      title: (
        <Text>
          <ScheduleOutlined /> Actualizado
        </Text>
      ),
      dataIndex: 'updatedAt',
      sorter: true,
      showSorterTooltip: false,
      width: 150,
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
      title: <Text>{<MoreOutlined />} Opción</Text>,
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_id: string) => (
        <Tooltip title="Editar">
          <Button
            onClick={() => history.push(`/invoicing/e-commerce/${_id}`)}
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
        <Form form={form} initialValues={filters} onFinish={onFinish}>
          <Row gutter={25} align="middle">
            <Col xs={24} md={5} lg={5} xl={4}>
              <FormItem label="Número" name="number">
                <InputNumber disabled={loading} style={styles.inputNumberWidth} controls={false} />
              </FormItem>
            </Col>
            <Col xs={24} md={10} lg={10} xl={7}>
              <FormItem label="Cliente" name="customerId">
                <SearchCustomer disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={5}>
              <FormItem label="Estado" name="statusWeb">
                <Select allowClear disabled={loading}>
                  {Object.keys(StatusType).map((key) => (
                    <Option key={key}>
                      <Badge text={StatusType[key].text} color={StatusType[key].color} />
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={9} xl={8}>
              <FormItem label="Formas de pago" name="paymentId">
                <SelectPayment bonus={true} credit={true} disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} xl={9}>
              <FormItem label="Fechas" name="dates">
                <RangePicker
                  style={styles.dateWidth}
                  placeholder={['Fecha inicial', 'Fecha Final']}
                />
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem colon={false}>
                <Space>
                  <Button
                    htmlType="submit"
                    icon={<SearchOutlined />}
                    style={styles.buttonR}
                    type="primary"
                  >
                    Buscar
                  </Button>
                  <Button icon={<ClearOutlined />} style={styles.buttonR} onClick={onClear}>
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]} style={styles.marginFilters}>
          <Col span={24} style={styles.textRight}>
            <Text strong>Total Encontrados:</Text> {data?.orders?.totalDocs}{' '}
            <Text strong>Páginas: </Text> {data?.orders?.page} / {data?.orders?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              columns={columns as any}
              onChange={handleChangeTable}
              scroll={{ x: 1200 }}
              dataSource={data?.orders?.docs}
              loading={loading}
              pagination={{
                current: data?.orders?.page,
                total: data?.orders?.totalDocs,
              }}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default EcommerceList;
