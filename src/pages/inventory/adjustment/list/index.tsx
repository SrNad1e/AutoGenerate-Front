/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CalendarOutlined,
  ClearOutlined,
  DollarCircleOutlined,
  DropboxOutlined,
  EyeOutlined,
  FieldNumberOutlined,
  FileSyncOutlined,
  MoreOutlined,
  PrinterFilled,
  SearchOutlined,
} from '@ant-design/icons';
import Table from 'antd/lib/table';
import {
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
  Tooltip,
  Typography,
} from 'antd';
import type {
  ColumnsType,
  FilterValue,
  TablePaginationConfig,
  SorterResult,
} from 'antd/es/table/interface';
import { PageContainer } from '@ant-design/pro-layout';
import type { Moment } from 'moment';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import { useAccess, useHistory, useLocation, useModel } from 'umi';
import { useEffect, useRef, useState } from 'react';
import numeral from 'numeral';
import type { Location } from 'umi';

import { StatusTypeAdjustment } from '../adjustment.data';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import SelectWarehouses from '@/components/SelectWarehouses';
import AlertInformation from '@/components/Alerts/AlertInformation';
import ReportAdjustment from '../reports/adjustment';
import type {
  DetailAdjustment,
  FiltersStockAdjustmentsInput,
  StatusStockAdjustment,
  StockAdjustment,
  Warehouse,
} from '@/graphql/graphql';
import { useGetAdjustments } from '@/hooks/adjustment.hooks';

import styles from './styles.less';
import style from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

export type FormValues = {
  status?: StatusStockAdjustment;
  number?: number;
  warehouseId?: string;
  dates?: Moment[];
};

const AdjustmentList = () => {
  const [adjustmentData, setAdjustmentData] = useState<Partial<StockAdjustment>>({});
  const [filters, setFilters] = useState<Partial<FormValues>>();
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const {
    adjustment: { canPrint },
  } = useAccess();

  const [form] = Form.useForm();

  const history = useHistory();
  const location: Location = useLocation();

  const reportRef = useRef(null);

  const { initialState } = useModel('@@initialState');
  const defaultWarehouse = initialState?.currentUser?.shop.defaultWarehouse._id;
  const canChangeWarehouse = initialState?.currentUser?.role?.changeWarehouse;

  const [getAdjustments, { data, loading }] = useGetAdjustments();

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

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
  const messageError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de seleccionar el ajuste e imprime
   * @param record ajuste
   */
  const printPage = async (record: Partial<StockAdjustment>) => {
    await setAdjustmentData(record);
    handlePrint();
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los ajustes
   * @param params filtros necesarios para la busqueda
   */
  const onSearch = (params?: FiltersStockAdjustmentsInput) => {
    try {
      getAdjustments({
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
      messageError(error.message);
    }
  };

  /**
   * @description se encarga de realizar el proceso de busqueda con los filtros
   * @param props filtros seleccionados en el formulario
   */
  const onFinish = (props: FormValues, sort?: Record<string, number>, pageCurrent?: number) => {
    const { status, number, warehouseId, dates } = props;
    try {
      const params: Partial<FiltersStockAdjustmentsInput> = {
        page: pageCurrent || 1,
        limit: 10,
        status,
        number,
        sort: sort || { createdAt: -1 },
      };

      if (dates) {
        const dateInitial = moment(dates[0]).format(FORMAT_DATE_API);
        const dateFinal = moment(dates[1]).format(FORMAT_DATE_API);
        params.dateFinal = dateFinal;
        params.dateInitial = dateInitial;
      }
      if (warehouseId) {
        params.warehouseId = warehouseId;
      }
      onSearch(params);

      const datos = Object.keys(props)
        .reduce((a, key) => (props[key] ? `${a}&${key}=${JSON.stringify(props[key])}` : a), '')
        .slice(1);

      form.setFieldsValue(props);
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
    sorter: SorterResult<StockAdjustment> | SorterResult<StockAdjustment>[] | any,
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
    history.replace(location.pathname);
    form.resetFields();
    onSearch({
      limit: 10,
      page: 1,
      warehouseId: !canChangeWarehouse ? defaultWarehouse : null,
    });
    if (!canChangeWarehouse) {
      form.setFieldsValue({
        warehouseId: defaultWarehouse,
      });
      setFilters({ warehouseId: defaultWarehouse });
    } else {
      setFilters({});
    }
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

    if (!canChangeWarehouse) {
      newFilters['warehouseId'] = defaultWarehouse;
    }
    onFinish(newFilters);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const columns: ColumnsType<StockAdjustment> = [
    {
      title: (
        <Text className={styles.iconTable}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'number',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: <Text>{<DropboxOutlined />} Bodega</Text>,
      dataIndex: 'warehouse',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (warehouse: Warehouse) => warehouse?.name,
    },
    {
      title: (
        <Text>
          <FieldNumberOutlined /> Referencias
        </Text>
      ),
      dataIndex: 'details',
      align: 'center',
      render: (details: DetailAdjustment[]) => details?.length,
    },
    {
      title: <Text>{<FileSyncOutlined />} Estado</Text>,
      dataIndex: 'status',
      align: 'center',
      render: (status: StatusStockAdjustment) => {
        const { color, label } = StatusTypeAdjustment[status || ''];
        return <Badge text={label} color={color} />;
      },
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Total
        </Text>
      ),
      dataIndex: 'total',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (total: number) => numeral(total).format('$ 0,0'),
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha</Text>,
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: <Text>{<MoreOutlined />} Opciones</Text>,
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_id: string, record) => {
        return (
          <Space>
            <Tooltip title="Ver">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => history.push(`/inventory/adjustment/${_id}`)}
              />
            </Tooltip>
            <Space>
              <Tooltip title="Imprimir">
                <Button
                  type="ghost"
                  style={{ backgroundColor: 'white' }}
                  onClick={() => printPage(record)}
                  icon={<PrinterFilled />}
                  disabled={!canPrint}
                />
              </Tooltip>
            </Space>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4}>Lista de Ajustes</Title>
        </Space>
      }
    >
      <Card>
        <Form
          form={form}
          layout="horizontal"
          className={styles.filters}
          onFinish={onFinish}
          initialValues={filters}
        >
          <Row gutter={20} className={styles.form}>
            <Col xs={24} md={5} lg={5} xl={4}>
              <FormItem label="Número" name="number">
                <InputNumber controls={false} style={style.maxWidth} disabled={loading} min={1} />
              </FormItem>
            </Col>
            <Col xs={24} md={5} lg={5} xl={5}>
              <FormItem label="Estado" name="status">
                <Select className={styles.item} allowClear loading={loading}>
                  {Object.keys(StatusTypeAdjustment).map((key) => (
                    <Option key={key}>
                      <Badge
                        text={StatusTypeAdjustment[key].label}
                        color={StatusTypeAdjustment[key].color}
                      />
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={6} xl={7}>
              <FormItem label="Bodega" name="warehouseId">
                <SelectWarehouses disabled={!canChangeWarehouse} />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={8}>
              <FormItem label="Fechas" name="dates">
                <RangePicker
                  className={styles.item}
                  disabled={loading}
                  placeholder={['Fecha Inicial', 'Fecha Final']}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={24} xl={24}>
              <FormItem>
                <Space className={styles.buttons}>
                  <Button
                    icon={<SearchOutlined />}
                    style={style.buttonR}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Buscar
                  </Button>
                  <Button
                    htmlType="button"
                    style={style.buttonR}
                    icon={<ClearOutlined />}
                    onClick={onClear}
                    loading={loading}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]}>
          <Col span={24} className={styles.marginFilters}>
            <Text strong>Total Encontrados:</Text> {data?.stockAdjustments?.totalDocs}{' '}
            <Text strong>Páginas: </Text> {data?.stockAdjustments?.page} /{' '}
            {data?.stockAdjustments?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={data?.stockAdjustments?.docs as any}
              pagination={{
                current: data?.stockAdjustments?.page,
                total: data?.stockAdjustments?.totalDocs,
              }}
              onChange={handleChangeTable}
              loading={loading}
              scroll={{ x: 800 }}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <ReportAdjustment ref={reportRef} data={adjustmentData} />
      </div>
    </PageContainer>
  );
};

export default AdjustmentList;
