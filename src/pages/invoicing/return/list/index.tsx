/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AuditOutlined,
  CalendarOutlined,
  ClearOutlined,
  DollarCircleOutlined,
  MoreOutlined,
  NumberOutlined,
  PlusOutlined,
  PrinterFilled,
  SearchOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { TablePaginationConfig } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import moment from 'moment';
import type { Moment } from 'moment';
import type { Location } from 'umi';
import { useHistory, useLocation } from 'umi';
import numeral from 'numeral';
import { useEffect, useState, useRef } from 'react';
import type {
  Shop,
  Order,
  ReturnOrder,
  DetailReturnInvoice,
  ResponseReturnsOrder,
  FiltersReturnsOrderInput,
  Coupon,
} from '@/graphql/graphql';
import { useGetReturnsOrder } from '@/hooks/return-order.hooks';
import { useReactToPrint } from 'react-to-print';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import FormReturn from '../form';
import SelectShop from '@/components/SelectShop';
import AlertInformation from '@/components/Alerts/AlertInformation';
import Filters from '@/components/Filters';

import styles from './styles';
import ReportCoupon from '../reports/coupon';
import ReportReturn from '../reports/return/return';

const FormItem = Form.Item;
const { Text } = Typography;
const { RangePicker } = DatePicker;

type FormValues = {
  number?: number;
  shopId?: string;
  active?: boolean;
  dates?: Moment[];
};

const ReturnList = () => {
  const [returnData, setReturnData] = useState<Partial<ReturnOrder>>({});
  const [couponData, setCouponData] = useState<Partial<Coupon>>({});
  const [visible, setVisible] = useState(false);
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

  const reportRef = useRef(null);
  const reportRef1 = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });
  const handlePrintReturn = useReactToPrint({
    content: () => reportRef1?.current,
  });

  /**
   * @description se encarga de seleccionar el ajuste e imprime
   * @param record ajuste
   */
  const printCoupon = async (record: Partial<Coupon>) => {
    await setCouponData(record);
    handlePrint();
  };

  /**
   * @description se encarga de seleccionar el ajuste e imprime
   * @param record ajuste
   */
  const printReturn = async (record: Partial<ReturnOrder>) => {
    await setReturnData(record);
    handlePrintReturn();
  };

  const [getReturns, { data, loading }] = useGetReturnsOrder();

  /**
   * @description se encarga de cerrar el modal de creacion
   */
  const closeModal = () => {
    setVisible(false);
  };

  /**
   * @description funcion usada por los hook para mostrar los errores
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
   * @description se encarga de ejecutar la funcion para obtener las devoluciones
   * @param values filtros necesarios para la busqueda
   */
  const onSearch = (values?: FiltersReturnsOrderInput) => {
    getReturns({
      variables: {
        input: {
          sort: { createdAt: -1 },
          ...values,
        },
      },
    });
  };

  /**
   * @description se encarga de setear los filtros en la url
   * @param valuesQuery filtros para setear en la url
   */
  const setQueryParams = (valuesQuery?: FiltersReturnsOrderInput) => {
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
   * @description ejecuta la busqueda con base a los filtros del formulario y formatea las fechas
   * @param props valores del formulario
   */
  const onFinish = (props: FormValues) => {
    const filters = { ...filterTable };
    const params: any = {
      ...props,
    };
    if (props.dates) {
      const dateInitial = moment(props.dates[0]).format(FORMAT_DATE_API);
      const dateFinal = moment(props.dates[1]).format(FORMAT_DATE_API);
      params.dateFinal = dateFinal;
      params.dateInitial = dateInitial;
    }
    delete params.dates;

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });
    form.setFieldsValue(params);
    onSearch({ ...filters, ...params });
    setQueryParams({
      ...props,
      ...filters,
    });
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
    sorter: SorterResult<ResponseReturnsOrder> | SorterResult<ResponseReturnsOrder>[] | any,
  ) => {
    const { current } = paginationLocal;
    const params = form.getFieldsValue();

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
  const getFiltersQuery = () => {
    const queryParams: any = location.query;
    const tableFilters = {
      active: queryParams.active ? [queryParams.active === 'true'] : null,
    };
    const newFilters = {};

    Object.keys(queryParams).forEach((item) => {
      if (item === 'active') {
        newFilters[item] = ['true', true].includes(JSON.parse(queryParams[item]));
      } else if (item === 'dates') {
        const dataItem = JSON.parse(queryParams[item]);
        newFilters[item] = [moment(dataItem[0]), moment(dataItem[1])];
      } else {
        newFilters[item] = JSON.parse(queryParams[item]);
      }
    });

    form.setFieldsValue(newFilters);
    setFilterTable(tableFilters);
    onSearch(newFilters);
  };

  useEffect(() => {
    getFiltersQuery();
  }, []);

  const columns: ColumnsType<ReturnOrder> = [
    {
      title: (
        <Text>
          <NumberOutlined /> Número
        </Text>
      ),
      dataIndex: 'number',
      align: 'center',
    },
    {
      title: (
        <Text>
          <AuditOutlined /> Pedido
        </Text>
      ),
      dataIndex: 'order',
      align: 'center',
      render: (order: Order) => <>{order?.number}</>,
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
      dataIndex: 'details',
      align: 'center',
      render: (details: DetailReturnInvoice[]) =>
        numeral(details.reduce((sum, detail) => sum + detail?.price * detail?.quantity, 0)).format(
          '$ 0,0',
        ),
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      align: 'center',
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
      filterMultiple: false,
      filteredValue: filterTable?.active || null,
      filterDropdown: (props) => (
        <Filters
          props={props}
          data={[
            {
              text: 'Si',
              value: true,
            },
            {
              text: 'No',
              value: false,
            },
          ]}
        />
      ),
    },
    {
      title: (
        <Text>
          <CalendarOutlined /> Fecha Creación
        </Text>
      ),
      dataIndex: 'createdAt',
      align: 'center',
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
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
      render: (_, returns) => {
        return (
          <Space>
            <Tooltip title="Imprimir Devolución">
              <Button
                type="primary"
                onClick={() => printReturn(returns)}
                icon={<PrinterFilled />}
              />
            </Tooltip>
            <Space>
              <Tooltip title="Imprimir Cupon">
                <Button
                  type="ghost"
                  onClick={() => printCoupon(returns.coupon)}
                  icon={<PrinterFilled />}
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
      <Card bordered={false}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={30}>
            <Col xs={24} md={7} lg={5} xl={5}>
              <FormItem label="Número Pedido" name="number">
                <InputNumber controls={false} placeholder="Ejem: 10" style={styles.allWidth} />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={6} xl={6}>
              <FormItem label="Tienda" name="shopId">
                <SelectShop disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={9} lg={6} xl={7}>
              <FormItem label="Fechas" name="dates">
                <RangePicker
                  style={styles.allWidth}
                  placeholder={['Fecha Inicial', 'Fecha Final']}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={4} lg={4} xl={5}>
              <FormItem>
                <Space>
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    style={styles.borderR}
                  >
                    Buscar
                  </Button>
                  <Button
                    htmlType="reset"
                    onClick={() => onClear()}
                    style={styles.borderR}
                    icon={<ClearOutlined />}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 15]} align="middle" style={{ marginTop: 20 }}>
          <Col xs={8} md={15} lg={15}>
            <Button
              onClick={() => setVisible(true)}
              icon={<PlusOutlined />}
              shape="round"
              type="primary"
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={16} md={9} lg={9} style={styles.texRigth}>
            <Space>
              <Text strong>Total Encontrados:</Text>
              <Text>{data?.returnsOrder?.totalDocs || 0}</Text>
              <Text strong>Pagina:</Text>
              <Text>
                {data?.returnsOrder.page || 0}/ {data?.returnsOrder?.totalPages || 0}
              </Text>
            </Space>
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={columns}
              scroll={{ x: 1000 }}
              pagination={{
                current: data?.returnsOrder?.page,
                total: data?.returnsOrder?.totalDocs,
              }}
              dataSource={data?.returnsOrder?.docs as any}
            />
          </Col>
        </Row>
      </Card>
      <FormReturn visible={visible} onCancel={closeModal} />
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <ReportCoupon ref={reportRef} data={couponData} />
      </div>
      <div style={{ display: 'none' }}>
        <ReportReturn ref={reportRef1} data={returnData} />
      </div>
    </PageContainer>
  );
};

export default ReturnList;
