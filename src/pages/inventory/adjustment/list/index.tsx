/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EyeOutlined, PrinterFilled, SearchOutlined } from '@ant-design/icons';
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
import { useHistory, useLocation } from 'umi';
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
  StockAdjustment,
  Warehouse,
} from '@/graphql/graphql';
import { useGetAdjustments } from '@/hooks/adjustment.hooks';

import styles from './styles.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

export type FormValues = {
  status?: string;
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

  const [form] = Form.useForm();

  const history = useHistory();
  const location: Location = useLocation();

  const reportRef = useRef(null);

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
    });
    setFilters({});
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

    form.setFieldsValue({
      type: 'received',
    });

    onFinish(newFilters);
  };
  useEffect(() => {
    loadingData();
  }, []);

  const columns: ColumnsType<StockAdjustment> = [
    {
      title: 'Número',
      dataIndex: 'number',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Bodega',
      dataIndex: 'warehouse',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (warehouse: Warehouse) => warehouse?.name,
    },
    {
      title: 'Referencia',
      dataIndex: 'details',
      align: 'center',
      render: (details: DetailAdjustment[]) => details?.length,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => {
        const { color, label } = StatusTypeAdjustment[status || ''];
        return <Badge text={label} color={color} />;
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (total: number) => numeral(total).format('$ 0,0'),
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
    {
      title: 'Actualizado',
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      align: 'center',
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
          <Title level={4} style={{ margin: 0 }}>
            Lista de Ajustes
          </Title>
        </Space>
      }
    >
      <Card>
        <Form
          form={form}
          layout="inline"
          className={styles.filters}
          onFinish={onFinish}
          initialValues={filters}
        >
          <Row gutter={[8, 8]} className={styles.form}>
            <Col xs={24} lg={4} xl={4} xxl={2}>
              <FormItem label="Número" name="number">
                <InputNumber className={styles.item} disabled={loading} min={1} />
              </FormItem>
            </Col>
            <Col xs={24} lg={5} xl={5} xxl={4}>
              <FormItem label="Estado" name="status">
                <Select className={styles.item} allowClear disabled={loading}>
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
            <Col xs={24} lg={10} xl={6} xxl={6}>
              <FormItem label="Bodega" name="warehouse">
                <SelectWarehouses />
              </FormItem>
            </Col>
            <Col xs={24} lg={10} xl={8} xxl={7}>
              <FormItem label="Fechas" name="dates">
                <RangePicker className={styles.item} disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} lg={14} xl={5} xxl={4}>
              <FormItem>
                <Space className={styles.buttons}>
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Buscar
                  </Button>
                  <Button htmlType="button" onClick={onClear} loading={loading}>
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Text strong>Total Encontrados:</Text> {data?.stockAdjustments?.totalDocs}{' '}
          <Text strong>Páginas: </Text> {data?.stockAdjustments?.page} /{' '}
          {data?.stockAdjustments?.totalPages || 0}
        </Col>
        <Table
          columns={columns}
          dataSource={data?.stockAdjustments?.docs as any}
          pagination={{
            current: data?.stockAdjustments?.page,
            total: data?.stockAdjustments?.totalDocs,
          }}
          onChange={handleChangeTable}
          loading={loading}
        />
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <ReportAdjustment ref={reportRef} data={adjustmentData} />
      </div>
    </PageContainer>
  );
};

export default AdjustmentList;
