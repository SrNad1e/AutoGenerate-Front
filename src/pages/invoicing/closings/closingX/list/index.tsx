/* eslint-disable react-hooks/exhaustive-deps */
import type {
  CashRegister,
  CloseXInvoicing,
  FiltersClosesXInvoicingInput,
  PaymentOrderClose,
  PointOfSale,
  SummaryOrderClose,
  User,
} from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';
import { useGetClosesXInvoicing } from '@/hooks/closeXInvoicing.hooks';
import {
  CalendarOutlined,
  ClearOutlined,
  ContainerOutlined,
  DollarCircleOutlined,
  FieldNumberOutlined,
  LaptopOutlined,
  MoreOutlined,
  PlusOutlined,
  PrinterFilled,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
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
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import type { Moment } from 'moment';
import moment from 'moment';
import numeral from 'numeral';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef, useState } from 'react';
import type { Location } from 'umi';
import { useModel } from 'umi';
import { useLocation, useHistory, useAccess } from 'umi';

import CloseDay from '../components/DayClose';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import CashRegisterModal from '../components/CashRegister';
import SelectShop from '@/components/SelectShop';
import AlertInformation from '@/components/Alerts/AlertInformation';
import ReportCloseX from '../reports/closeX';

import styles from './styles';

const FormItem = Form.Item;
const { Text } = Typography;

export type FormValues = {
  number?: number;
  shopId?: string;
  date?: Moment;
};

const ClosingXList = () => {
  const [visible, setVisible] = useState(false);
  const [cashRegister, setCashRegister] = useState<Partial<CashRegister>>({});
  const [visibleNewClose, setVisibleNewClose] = useState(false);
  const [filters, setFilters] = useState<Partial<FormValues>>();
  const [closeData, setCloseData] = useState<Partial<CloseXInvoicing>>({});
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  const history = useHistory();

  const location: Location = useLocation();

  const reportRef = useRef(null);

  const {
    closingX: { canCreate, canPrint },
  } = useAccess();

  const [getCloses, { data, loading }] = useGetClosesXInvoicing();

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const { initialState } = useModel('@@initialState');
  const canQueryClosingX = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadInvoicingClosesx,
  );

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
   * Cierra el modal de arqueo de dinero
   */
  const closeModal = () => {
    setVisible(false);
  };

  /**
   * Cierra el modal de arqueo de dinero y abre el modal de creacion
   */
  const saveCashRegister = (cash: CashRegister) => {
    setCashRegister(cash);
    setVisibleNewClose(true);
    closeModal();
  };

  /**
   * Cierra el modal de creacion
   */
  const closeNewClose = () => {
    setVisibleNewClose(false);
  };

  /**
   * @description se encarga de seleccionar el cierre que imprime
   * @param record cierre
   */
  const printPage = async (record: Partial<CloseXInvoicing>) => {
    await setCloseData(record);
    handlePrint();
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los cierres
   * @param params filtros necesarios para la busqueda
   */
  const onSearch = (params?: FiltersClosesXInvoicingInput) => {
    try {
      getCloses({
        variables: {
          input: {
            sort: {
              createdAt: -1,
            },
            ...params,
          },
        },
      });
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description se encarga de realizar el proceso de busqueda con los filtros
   * @param props filtros seleccionados en el formulario
   */
  const onFinish = (props: FormValues, sort?: Record<string, number>, pageCurrent?: number) => {
    const { number, shopId, date } = props;
    try {
      const params: Partial<FiltersClosesXInvoicingInput> = {
        page: pageCurrent || 1,
        limit: 10,
        number,
        sort: sort || { createdAt: -1 },
      };

      if (date) {
        const closeDate = moment(date).format(FORMAT_DATE_API);
        params.closeDate = closeDate;
      }
      if (shopId) {
        params.shopId = shopId;
      }
      onSearch(params);

      const datos = Object.keys(props)
        .reduce((a, key) => (props[key] ? `${a}&${key}=${JSON.stringify(props[key])}` : a), '')
        .slice(1);

      form?.setFieldsValue(props);
      history.replace(`${location.pathname}?${datos}`);
    } catch (error: any) {
      messageError(error?.message);
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
    sorter: SorterResult<CloseXInvoicing> | SorterResult<CloseXInvoicing>[] | any,
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
      messageError(error?.message);
    }
  };

  useEffect(() => {
    try {
      const queryParams: any = location.query;

      const newFilters = {};
      Object.keys(queryParams).forEach((item) => {
        newFilters[item] = JSON.parse(queryParams[item]);
      });
      onFinish(newFilters);
    } catch (error: any) {
      messageError(error?.message);
    }
  }, []);

  useEffect(() => {
    if (!canQueryClosingX) {
      messageError('No tiene permisos para consultar los cierre x');
    }
  }, [canQueryClosingX]);

  const columns: ColumnsType<Partial<CloseXInvoicing>> = [
    {
      title: (
        <Text style={styles.iconSize}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'number',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: (
        <Text>
          <LaptopOutlined /> Punto de Venta
        </Text>
      ),
      dataIndex: 'pointOfSale',
      width: 150,
      render: ({ shop, name }: PointOfSale) => (
        <Space direction="vertical" size={0}>
          <Text>{shop?.name}</Text>
          <Tag style={styles.tagStyle}>{name}</Tag>
        </Space>
      ),
    },
    {
      title: (
        <Text>
          <CalendarOutlined /> Fecha Cierre
        </Text>
      ),
      dataIndex: 'closeDate',
      sorter: true,
      showSorterTooltip: false,
      render: (closeDate: Date) => moment(closeDate).format(FORMAT_DATE_API),
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Ingresos
        </Text>
      ),
      dataIndex: 'payments',
      align: 'right',
      render: (payments: PaymentOrderClose[]) =>
        numeral(payments?.reduce((sum, payment) => sum + payment?.value, 0)).format('$ 0,0'),
    },
    {
      title: <Text>{<ContainerOutlined />} Facturas</Text>,
      dataIndex: 'summaryOrder',
      align: 'right',
      render: (summary: SummaryOrderClose) => numeral(summary?.value).format('$ 0,0'),
    },
    {
      title: <Text>{<UserOutlined />} Registrado Por</Text>,
      dataIndex: 'user',
      align: 'center',
      render: (user: User) => user?.name,
    },
    {
      title: (
        <Text>
          <MoreOutlined /> Opción
        </Text>
      ),
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_: string, record) => (
        <Tooltip title="Imprimir" placement="topLeft">
          <Button
            onClick={() => printPage(record)}
            type="primary"
            icon={<PrinterFilled />}
            disabled={!canPrint}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form form={form} onFinish={onFinish} initialValues={filters}>
          <Row gutter={[20, 0]}>
            <Col xs={24} md={4} lg={4} xl={4}>
              <FormItem label="Número" name="number">
                <InputNumber
                  controls={false}
                  style={{ width: '100%' }}
                  disabled={loading}
                  placeholder="Ejem: 10"
                />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={7}>
              <FormItem label="Fecha de Cierre" name="date">
                <DatePicker
                  disabled={loading}
                  placeholder="Seleccione una fecha"
                  style={{ width: '100%' }}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={5} lg={6} xl={7} xxl={6}>
              <FormItem label="Tienda" name="shopId">
                <SelectShop disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={4} lg={4} xl={3} xxl={4}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button
                    loading={loading}
                    htmlType="submit"
                    style={styles.buttonR}
                    icon={<SearchOutlined />}
                    type="primary"
                  >
                    Buscar
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={onClear}
                    style={styles.buttonR}
                    icon={<ClearOutlined />}
                    loading={loading}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 15]} align="middle" style={{ marginTop: 20 }}>
          <Col xs={12} md={15} lg={15}>
            <Button
              disabled={!canCreate}
              icon={<PlusOutlined />}
              onClick={() => setVisible(true)}
              shape="round"
              loading={loading}
              type="primary"
            >
              Registrar
            </Button>
          </Col>
          <Col xs={24} md={9} lg={9} style={{ textAlign: 'right' }}>
            <Text strong>Total Encontrados:</Text> {data?.closesXInvoicing?.totalDocs}{' '}
            <Text strong>Páginas: </Text> {data?.closesXInvoicing?.page} /{' '}
            {data?.closesXInvoicing?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              pagination={{
                current: data?.closesXInvoicing?.page,
                total: data?.closesXInvoicing?.totalDocs,
              }}
              onChange={handleChangeTable}
              columns={columns}
              scroll={{ x: 900 }}
              loading={loading}
              dataSource={data?.closesXInvoicing?.docs as any}
            />
          </Col>
        </Row>
      </Card>
      <CashRegisterModal visible={visible} onCancel={closeModal} onOk={saveCashRegister} />
      <CloseDay
        cashRegister={cashRegister as CashRegister}
        visible={visibleNewClose}
        onCancel={closeNewClose}
      />
      <div style={{ display: 'none' }}>
        <ReportCloseX ref={reportRef} data={closeData} />
      </div>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default ClosingXList;
