/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  CloseCircleOutlined,
  DollarCircleOutlined,
  FieldNumberOutlined,
  FileSyncOutlined,
  IdcardOutlined,
  MoreOutlined,
  PrinterFilled,
  SearchOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { TablePaginationConfig } from 'antd';
import { Badge, Tag, Tooltip } from 'antd';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import type { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { useEffect, useRef, useState } from 'react';
import { useGetOrders, useUpdateOrder } from '@/hooks/order.hooks';
import type { Customer, FiltersOrdersInput, Order, ResponseOrders, Shop } from '@/graphql/graphql';
import { StatusOrder } from '@/graphql/graphql';
import { useAccess, useHistory, useLocation } from 'umi';
import type { Location } from 'umi';
import type { Moment } from 'moment';
import moment from 'moment';
import numeral from 'numeral';
import { useReactToPrint } from 'react-to-print';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import Filters from '@/components/Filters';
import { StatusTypeOrder } from '../order.data';
import SearchCustomer from '@/components/SearchCustomer';
import OrderReport from '../report/order/Order';

import styles from '../styles';
import SelectShop from '@/components/SelectShop';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Text } = Typography;

type FormValues = {
  customerId?: string;
  dates?: Moment[];
  number?: number;
  paymentId?: string;
};

const OrderList = () => {
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [orderData, setOrderData] = useState({});

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

  const reportRef = useRef(null);

  const {
    order: { canEdit, canPrint },
  } = useAccess();

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  /**
   * @description se encarga de seleccionar el pedido e imprime
   * @param record pedido
   */
  const printOrder = async (record: Partial<Order>) => {
    await setOrderData(record);
    handlePrint();
  };

  const [getOrders, paramsGetOrders] = useGetOrders();
  const [updateOrder, paramsUpdateOrder] = useUpdateOrder();

  /**
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const messageError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los pedidos
   * @param values filtros necesarios para la busqueda
   */
  const onSearch = (values?: FiltersOrdersInput) => {
    try {
      getOrders({
        variables: {
          input: {
            limit: 10,
            sort: { createdAt: -1 },
            ...values,
          },
        },
      });
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description funcion usada para cambiar el estado del pedido a cancelado
   */
  const onCancelOrder = (id: string) => {
    try {
      updateOrder({
        variables: {
          id: id,
          input: {
            status: StatusOrder.Cancelled,
          },
        },
      });
    } catch (error: any) {
      messageError(error.message);
    }
  };

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description se encarga de setear los filtros en la url
   * @param valuesQuery filtros para setear en la url
   */
  const setQueryParams = (valuesQuery?: FiltersOrdersInput) => {
    try {
      const valuesForm = form.getFieldsValue();

      const valuesNew = {
        ...valuesQuery,
        ...valuesForm,
      };

      const datos = Object.keys(valuesNew)
        .reduce(
          (a, key) =>
            valuesNew[key] !== undefined ? `${a}&${key}=${JSON.stringify(valuesNew[key])}` : a,
          '',
        )
        .slice(1);

      history.replace(`${location.pathname}?${datos}`);
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description esta funcion evalua los paramametros del formulario y ejecuta la busqueda
   * @param value valores del formulario
   */
  const onFinish = (value: FormValues, pageCurrent?: number) => {
    const { dates } = value;
    const filters = { ...filterTable };
    const params: any = {
      page: pageCurrent || 1,
      limit: 10,
      sort: { createdAt: -1 },
      ...value,
    };

    if (dates) {
      const dateInitial = moment(dates[0]).format(FORMAT_DATE_API);
      const dateFinal = moment(dates[1]).format(FORMAT_DATE_API);
      params.dateFinal = dateFinal;
      params.dateInitial = dateInitial;
    }
    delete params.dates;
    onSearch({ ...params, ...filters });
    setQueryParams({ ...value, ...filters });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   * @param filtersArg filtros de la tabla
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    filtersArg: Record<string, FilterValue | any>,
    sorter: SorterResult<ResponseOrders> | SorterResult<ResponseOrders>[] | any,
  ) => {
    const { current } = paginationLocal;
    const params = form.getFieldsValue();

    if (params.dates) {
      const dateInitial = moment(params.dates[0]).format(FORMAT_DATE_API);
      const dateFinal = moment(params.dates[1]).format(FORMAT_DATE_API);
      params.dateFinal = dateFinal;
      params.dateInitial = dateInitial;
    }
    delete params.dates;

    let sort = {};
    const filters = { ...filtersArg };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });

    if (sorter?.field) {
      sort = {
        [sorter?.field]: sorter?.order === 'ascend' ? 1 : -1,
      };
    } else {
      sort = {
        createdAt: -1,
      };
    }
    setQueryParams(filters);
    onSearch({ ...params, sort, page: current, ...filters });
    setFilterTable(filtersArg);
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    onSearch({});
    setFilterTable({});
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const loadingData = () => {
    const queryParams: any = location?.query;

    const newFilters = {};

    Object.keys(queryParams).forEach((item) => {
      if (item === 'dates') {
        const dataItem = JSON.parse(queryParams[item]);
        newFilters[item] = [moment(dataItem[0]), moment(dataItem[1])];
      } else {
        newFilters[item] = JSON.parse(queryParams[item]);
      }
    });
    form.setFieldsValue(newFilters);
    onFinish(newFilters);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const columns: ColumnsType<Order> = [
    {
      title: (
        <Text style={{ fontSize: 20 }}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'number',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
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
        <Space direction="vertical" size={5}>
          <Text>
            {} {customer?.firstName} {customer?.lastName}
          </Text>
          <Tag style={styles.tagStyle}>
            {<IdcardOutlined />} {customer?.document}
          </Tag>
        </Space>
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
          <DollarCircleOutlined /> Valor
        </Text>
      ),
      dataIndex: 'summary',
      align: 'center',
      render: (summary) => numeral(summary?.total).format('$ 0,0'),
    },
    {
      title: <Text>{<FileSyncOutlined />} Estado</Text>,
      dataIndex: 'status',
      align: 'center',
      filteredValue: filterTable?.status || null,
      render: (status: string) => {
        const { color, label } = StatusTypeOrder[status || ''];
        return <Badge text={label} color={color} />;
      },
      filterDropdown: (props) => (
        <Filters
          props={props}
          data={[
            {
              text: 'Abierto',
              value: 'OPEN',
            },
            {
              text: 'Facturado',
              value: 'INVOICED',
            },
            {
              text: 'Enviado',
              value: 'SENT',
            },
            {
              text: 'Cerrado',
              value: 'CLOSED',
            },
            {
              text: 'Cancelado',
              value: 'CANCELLED',
            },
            {
              text: 'Pendiente',
              value: 'PENDING',
            },
          ]}
        />
      ),
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
          <MoreOutlined /> Opciones
        </Text>
      ),
      fixed: 'right',
      dataIndex: '_id',
      align: 'center',
      render: (_, record) => {
        return (
          <Space>
            <Tooltip title="Imprimir">
              <Button
                type="primary"
                onClick={() => printOrder(record)}
                icon={<PrinterFilled />}
                disabled={!canPrint}
                loading={paramsGetOrders?.loading || paramsUpdateOrder?.loading}
              />
            </Tooltip>
            <Space>
              <Tooltip title="Cancelar">
                <Button
                  danger
                  onClick={() => onCancelOrder(record._id)}
                  icon={<CloseCircleOutlined />}
                  disabled={
                    record.status === StatusOrder.Cancelled ||
                    !canEdit ||
                    record.status === StatusOrder.Closed
                  }
                  loading={paramsGetOrders?.loading || paramsUpdateOrder?.loading}
                />
              </Tooltip>
            </Space>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[20, 15]}>
            <Col xs={6} md={8} lg={5} xl={5}>
              <FormItem label="Número" name="number">
                <InputNumber
                  disabled={paramsGetOrders?.loading || paramsUpdateOrder?.loading}
                  controls={false}
                  style={styles.allWidth}
                  placeholder="Ejem: 10"
                />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={6} xl={6}>
              <FormItem label="Cliente" name="customerId">
                <SearchCustomer disabled={paramsGetOrders?.loading || paramsUpdateOrder?.loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={6} xl={6}>
              <FormItem label="Tienda" name="shopId">
                <SelectShop disabled={paramsGetOrders?.loading || paramsUpdateOrder?.loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={6} xl={7}>
              <FormItem label="Fechas" name="dates">
                <RangePicker
                  disabled={paramsGetOrders?.loading || paramsUpdateOrder?.loading}
                  style={styles.allWidth}
                  placeholder={['Fecha Inicial', 'Fecha Final']}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={2} lg={2} xl={5}>
              <FormItem>
                <Space>
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    loading={paramsGetOrders?.loading || paramsUpdateOrder?.loading}
                    style={styles.borderR}
                  >
                    Buscar
                  </Button>
                  <Button
                    htmlType="reset"
                    onClick={onClear}
                    style={styles.borderR}
                    loading={paramsGetOrders?.loading || paramsUpdateOrder?.loading}
                    icon={<ClearOutlined />}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
            <Col span={24} style={styles.texRigth}>
              <Space>
                <Text strong>Total Encontrados:</Text>
                <Text>{paramsGetOrders?.data?.orders?.totalDocs || 0}</Text>
                <Text strong>Pagina:</Text>
                <Text>
                  {paramsGetOrders?.data?.orders?.page || 0}/{' '}
                  {paramsGetOrders?.data?.orders?.totalPages || 0}
                </Text>
              </Space>
            </Col>
            <Col span={24}>
              <Table
                onChange={handleChangeTable}
                loading={paramsGetOrders?.loading || paramsUpdateOrder?.loading}
                columns={columns}
                scroll={{ x: 1000 }}
                pagination={{
                  current: paramsGetOrders?.data?.orders?.page,
                  total: paramsGetOrders?.data?.orders?.totalDocs,
                  showSizeChanger: false,
                }}
                dataSource={paramsGetOrders?.data?.orders?.docs as any}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <OrderReport data={orderData} ref={reportRef} />
      </div>
    </PageContainer>
  );
};

export default OrderList;
