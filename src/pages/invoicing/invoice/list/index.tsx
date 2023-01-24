/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  DollarCircleOutlined,
  FieldNumberOutlined,
  MoreOutlined,
  PrinterFilled,
  SearchOutlined,
  SelectOutlined,
  ShopOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useHistory, useLocation, useModel } from 'umi';
import type { Location } from 'umi';
import numeral from 'numeral';

import { useEffect, useState } from 'react';
import styles from '../styles';
import type {
  Customer,
  FiltersInvoicesInput,
  Invoice,
  ResponseInvoices,
  Shop,
  SummaryInvoice,
  User,
} from '@/graphql/graphql';
import type { ColumnsType } from 'antd/lib/table';
import Filters from '@/components/Filters';
import type { Moment } from 'moment';
import moment from 'moment';
import { useGetInvoices } from '@/hooks/invoice.hooks';
import type { FilterValue, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import ModalInvoicing from '../components/ModalInvoicing';

const FormItem = Form.Item;
const { Text } = Typography;
const { RangePicker } = DatePicker;

type FormValues = {
  active?: boolean;
  dates?: Moment[];
};

const InvoiceList = () => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [showInvoicing, setShowInvoicing] = useState<boolean>(false);
  const { initialState } = useModel('@@initialState');

  const location: Location = useLocation();

  const [form] = Form.useForm();
  const history = useHistory();

  const [getInvoices, paramsGetInvoices] = useGetInvoices();

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
  const onSearch = (values?: FiltersInvoicesInput) => {
    getInvoices({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };

  /**
   * @description se encarga de setear los filtros en la url
   * @param valuesQuery filtros para setear en la url
   */
  const setQueryParams = (valuesQuery?: FiltersInvoicesInput) => {
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
    sorter: SorterResult<ResponseInvoices> | SorterResult<ResponseInvoices>[] | any,
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

  const columns: ColumnsType<Invoice> = [
    {
      title: (
        <Text style={{ fontSize: 20 }}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'number',
      align: 'center',
      render: (number: number, invoice: Invoice) => `${invoice?.authorization?.prefix} ${number}`,
    },
    {
      title: <Text>{<UserOutlined />} Creado Por</Text>,
      dataIndex: 'user',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (user: User) => user.username,
    },
    {
      title: <Text>{<UserAddOutlined />} Cliente</Text>,
      dataIndex: 'customer',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: ({ documentType, document, firstName, lastName }: Customer) => (
        <>
          {firstName} {lastName}
          <Tag>
            {documentType?.abbreviation} {document}
          </Tag>
        </>
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
      render: (summary: SummaryInvoice) => numeral(summary?.total).format('$ 0,0'),
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
      render: () => {
        return (
          <Space>
            <Tooltip title="Imprimir Factura">
              <Button type="primary" onClick={() => {}} icon={<PrinterFilled />} />
            </Tooltip>
            <Space>
              <Tooltip title="Habilitar Productos">
                <Button
                  type="ghost"
                  onClick={() => {}}
                  icon={<SelectOutlined />}
                  disabled={false}
                />
              </Tooltip>
            </Space>
          </Space>
        );
      },
    },
  ];

  console.log('invoices', paramsGetInvoices?.data?.invoices?.docs);

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={30}>
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
                    onClick={onClear}
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
        {initialState?.currentUser?.username === 'admin' && (
          <>
            <Button type="primary" onClick={() => setShowInvoicing(true)}>
              AutoFacturación
            </Button>
            <ModalInvoicing open={showInvoicing} onCancel={() => setShowInvoicing(false)} />
          </>
        )}
        <Row gutter={[0, 15]} align="middle" style={{ marginTop: 20 }}>
          <Col span={12} style={styles.alignText}>
            <Text strong>Total Encontrados: </Text>{' '}
            {paramsGetInvoices?.data?.invoices?.totalDocs || 0} <Text strong> Páginas: </Text>{' '}
            {paramsGetInvoices?.data?.invoices?.page || 0} /{' '}
            {paramsGetInvoices?.data?.invoices?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={columns}
              scroll={{ x: 1000 }}
              pagination={{
                current: paramsGetInvoices?.data?.invoices?.page,
                total: paramsGetInvoices?.data?.invoices?.totalDocs,
                pageSize: 20,
              }}
              dataSource={paramsGetInvoices?.data?.invoices?.docs || []}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      {/*<div style={{ display: 'none' }}>
        <ReportReturn ref={reportRef1} data={returnData} />
            </div>*/}
    </PageContainer>
  );
};

export default InvoiceList;
