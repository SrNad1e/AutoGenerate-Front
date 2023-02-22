/* eslint-disable react-hooks/exhaustive-deps */
import {
  ClearOutlined,
  FileSyncOutlined,
  LaptopOutlined,
  MoreOutlined,
  PrinterFilled,
  ScheduleOutlined,
  SearchOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, DatePicker, Form, Row, Space, Table, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import type { Moment } from 'moment';
import moment from 'moment';
import type { Location } from 'umi';
import { useHistory, useLocation } from 'umi';
import { useEffect, useRef, useState } from 'react';
import type {
  DailyClosing,
  FiltersDailyClosing,
  Order,
  PointOfSale,
  SummaryClose,
} from '@/graphql/graphql';
import 'moment/locale/es';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectPointOfSale from '@/components/SelectPointOfSale';
import { useGetDailyClosings } from '@/hooks/dailyClosing.hooks';
import numeral from 'numeral';
import DailyClosingReport from '../report/DailyClosing';
import { useReactToPrint } from 'react-to-print';
import DailyClosingRangeReport from '../report/DailyClosingRange';
import AlertLoading from '@/components/Alerts/AlertLoading';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Text } = Typography;
moment.locale('es');

type FormValues = {
  pointOfSaleId?: string;
  dates?: Moment[];
};

const FiscalCloseList = () => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [dailyClosingData, setDailyClosingData] = useState({});

  const [form] = Form.useForm();

  const history = useHistory();

  const location: Location = useLocation();

  const reportRef = useRef(null);

  const reportRangeRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const handlePrintRange = useReactToPrint({
    content: () => reportRangeRef?.current,
  });

  /**
   * @description se encarga de seleccionar el pedido e imprime
   * @param record pedido
   */
  const printOrder = async (record: Partial<DailyClosing>) => {
    await setDailyClosingData(record);
    handlePrint();
  };

  const [getDailyClosings, paramasGetDailyClosings] = useGetDailyClosings();
  const [getDailyRangeClosings, { data, loading }] = useGetDailyClosings();

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
   * @description funcion ejecutada para obtener los documentos
   * @param params filtros para consultar los documentos
   */
  const onSearch = (params?: FiltersDailyClosing) => {
    try {
      getDailyClosings({
        variables: {
          input: {
            sort: { closeDate: -1 },
            ...params,
          },
        },
      });
    } catch (error: any) {
      showError(error.message);
    }
  };

  const generateReangeReport = async () => {
    try {
      const props = form.getFieldsValue();
      const { dates } = props;

      const params: Partial<FiltersDailyClosing> | any = {
        page: 1,
        limit: 1000,
        sort: { createdAt: -1 },
        ...props,
      };
      if (dates) {
        const dateInitial = moment(dates[0]).format('YYYY/MM/DD 00:00:00');
        const dateFinal = moment(dates[1]).format('YYYY/MM/DD 00:00:00');
        params.dateFinal = dateFinal;
        params.dateInitial = dateInitial;
      }
      delete params.dates;
      await getDailyRangeClosings({
        variables: {
          input: {
            sort: { closeDate: -1 },
            ...params,
          },
        },
      });

      handlePrintRange();
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /*
   * @description se encarga de realizar el proceso de busqueda con los filtros
   * @param props filtros seleccionados en el formulario
   */
  const onFinish = (props: FormValues, sort?: Record<string, number>, pageCurrent?: number) => {
    const { dates } = props;
    try {
      const params: Partial<FiltersDailyClosing> | any = {
        page: pageCurrent || 1,
        limit: 10,
        sort: sort || { createdAt: -1 },
        ...props,
      };
      if (dates) {
        const dateInitial = moment(dates[0]).format('YYYY/MM/DD 00:00:00');
        const dateFinal = moment(dates[1]).format('YYYY/MM/DD 00:00:00');
        params.dateFinal = dateFinal;
        params.dateInitial = dateInitial;
      }
      delete params.dates;
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

  const columns: ColumnsType<DailyClosing> = [
    {
      title: <Text>{<LaptopOutlined />} Punto de venta</Text>,
      dataIndex: 'pointOfSale',
      align: 'center',
      render: (pointOfSale: PointOfSale) => pointOfSale?.name,
    },
    {
      title: <Text>{<ShopOutlined />} Tienda</Text>,
      dataIndex: 'pointOfSale',
      align: 'center',
      render: (pointOfSale: PointOfSale) => pointOfSale?.shop?.name,
    },
    {
      title: <Text>{<FileSyncOutlined />} Valor de Cierre</Text>,
      dataIndex: 'summary',
      align: 'center',
      render: (summary: SummaryClose) => numeral(summary?.total).format('$ 0,0'),
    },
    {
      title: (
        <Text>
          <ScheduleOutlined /> Cierre
        </Text>
      ),
      dataIndex: 'closeDate',
      sorter: true,
      showSorterTooltip: false,
      render: (closeDate: string) => moment(closeDate).format(FORMAT_DATE),
    },
    {
      title: <Text>{<MoreOutlined />} Opción</Text>,
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Tooltip title="Imprimir">
          <Button
            type="primary"
            onClick={() => printOrder(record)}
            icon={<PrinterFilled />}
            loading={paramasGetDailyClosings?.loading}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={25} align="middle">
            <Col xs={24} md={9} lg={9} xl={9}>
              <FormItem label="Punto de Venta" name="pointOfSaleId">
                <SelectPointOfSale disabled={paramasGetDailyClosings?.loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} xl={9}>
              <FormItem label="Fechas" name="dates">
                <RangePicker
                  disabled={paramasGetDailyClosings?.loading}
                  style={{ width: '100%' }}
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
                    style={{ borderRadius: 5 }}
                    loading={paramasGetDailyClosings?.loading}
                    disabled={paramasGetDailyClosings?.loading}
                    type="primary"
                  >
                    Buscar
                  </Button>
                  <Button
                    icon={<ClearOutlined />}
                    loading={paramasGetDailyClosings?.loading}
                    disabled={paramasGetDailyClosings?.loading}
                    style={{ borderRadius: 5 }}
                    onClick={onClear}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Button type="primary" onClick={() => generateReangeReport()}>
              Generar PDF
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text strong>Total Encontrados:</Text>{' '}
            {paramasGetDailyClosings?.data?.dailyClosings?.totalDocs || 0}{' '}
            <Text strong>Páginas: </Text> {paramasGetDailyClosings?.data?.dailyClosings?.page || 0}{' '}
            / {paramasGetDailyClosings?.data?.dailyClosings?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              columns={columns as any}
              onChange={handleChangeTable}
              scroll={{ x: 900 }}
              dataSource={paramasGetDailyClosings?.data?.dailyClosings?.docs}
              loading={paramasGetDailyClosings?.loading}
              pagination={{
                current: paramasGetDailyClosings?.data?.dailyClosings?.page,
                total: paramasGetDailyClosings?.data?.dailyClosings?.totalDocs,
              }}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <AlertLoading visible={loading} message="Generando cierres" />
      <div style={{ display: 'none' }}>
        <DailyClosingReport data={dailyClosingData} ref={reportRef} />
      </div>
      <div style={{ display: 'none' }}>
        <DailyClosingRangeReport dataArray={data?.dailyClosings?.docs || []} ref={reportRangeRef} />
      </div>
    </PageContainer>
  );
};

export default FiscalCloseList;
