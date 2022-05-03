/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SearchOutlined, EyeOutlined, PrinterFilled } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import { useReactToPrint } from 'react-to-print';
import type { Moment } from 'moment';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import type { Location } from 'umi';
import { useHistory, useLocation, useModel } from 'umi';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import SelectWarehouses from '@/components/SelectWarehouses';
import { StatusType } from '../request.data';
import { useGenerateRequest, useGetRequests } from '@/hooks/request.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '@/components/Alerts/AlertLoading';
import ReportRequest from '../reports/request';
import type { DetailRequest, FiltersStockRequestsInput, StockRequest } from '@/graphql/graphql';

import styles from './styles.less';
import './styles.less';

const FormItem = Form.Item;
const { Option } = Select;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export type FormValues = {
  status?: string;
  number?: number;
  warehouseId?: string;
  dates?: Moment[];
  type?: string;
};

const RequestList = () => {
  const [requestData, setRequestData] = useState<Partial<StockRequest>>({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { initialState } = useModel('@@initialState');

  const history = useHistory();
  const location: Location = useLocation();

  const [form] = Form.useForm();

  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const [getRequests, { data, loading }] = useGetRequests();
  const [generateRequest, propsGenerate] = useGenerateRequest();

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
   * @description Se encarga de imprimir una solicitud
   * @param record
   */
  const printPage = async (record: Partial<StockRequest>) => {
    await setRequestData(record);
    handlePrint();
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
   * @description se encarga de ejecutar la funcion para obtener las solicitudes
   * @param params filtros necesarios para la busqueda
   */
  const onSearch = (params?: FiltersStockRequestsInput) => {
    getRequests({
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
    const { status, number, warehouseId, dates, type = 'received' } = props;
    try {
      const params: FiltersStockRequestsInput = {
        page: pageCurrent || 1,
        limit: pagination.pageSize,
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
        if (type === 'sent') {
          params.warehouseOriginId = warehouseId;
        } else {
          params.warehouseDestinationId = warehouseId;
        }
      }
      setPagination({ ...pagination, current: pageCurrent || 1 });

      onSearch(params);

      const datos = Object.keys(props)
        .reduce((a, key) => (props[key] ? `${a}&${key}=${JSON.stringify(props[key])}` : a), '')
        .slice(1);

      form.setFieldsValue(props);
      history.replace(`${location.pathname}?${datos}`);
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
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<StockRequest> | SorterResult<StockRequest>[] | any,
    _: TableCurrentDataSource<StockRequest>,
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

    setPagination({ ...pagination, current });

    onFinish(params, sort, current);
  };

  /**
   * @description se encarga de hacer la consulta para generar la solicitud
   */
  const autoRequest = async () => {
    try {
      const response = await generateRequest({
        variables: {
          shopId: initialState?.currentUser?.shop?._id || '',
        },
      });
      if (response?.data?.generateStockRequest) {
        setPropsAlertInformation({
          message: `Se ha creado la solicitud No. ${response?.data?.generateStockRequest?.number}`,
          type: 'success',
          redirect: `/inventory/request/${response?.data?.generateStockRequest?._id}`,
          visible: true,
        });
      }
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    onSearch();
    setPagination({
      pageSize: 10,
      current: 1,
    });
    form.setFieldsValue({
      type: 'received',
    });
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

  const columns: ColumnsType<StockRequest> = [
    {
      title: 'Número',
      dataIndex: 'number',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Origen',
      dataIndex: 'warehouseOrigin',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (warehouseOrigin: WAREHOUSE.Warehouse) => warehouseOrigin?.name,
    },
    {
      title: 'Destino',
      dataIndex: 'warehouseDestination',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (warehouseDestination: WAREHOUSE.Warehouse) => warehouseDestination?.name,
    },
    {
      title: 'Referencia',
      dataIndex: 'details',
      align: 'center',
      render: (details: DetailRequest[]) => details?.length,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => {
        const { color, label } = StatusType[status || ''];
        return <Badge text={label} color={color} />;
      },
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
                onClick={() => history.push(`/inventory/request/${_id}`)}
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
            Lista de solicitudes
          </Title>
          <Divider type="vertical" />
          <Button shape="round" type="primary" onClick={autoRequest}>
            AutoGenerar
          </Button>
        </Space>
      }
    >
      <Card>
        <Form form={form} layout="inline" className={styles.filters} onFinish={onFinish}>
          <Row gutter={[8, 8]} className={styles.form}>
            <Col xs={24} lg={4} xl={3} xxl={3}>
              <FormItem label="Número" name="number">
                <InputNumber min={1} className={styles.item} disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} lg={5} xl={4} xxl={3}>
              <FormItem label="Estado" name="status">
                <Select className={styles.item} allowClear disabled={loading}>
                  {Object.keys(StatusType).map((key) => (
                    <Option key={key}>
                      <Badge text={StatusType[key].label} color={StatusType[key].color} />
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} lg={5} xl={3} xxl={4}>
              <FormItem label="Tipo" name="type">
                <Select className={styles.item} disabled={loading}>
                  <Option key="sent">Enviado</Option>
                  <Option key="received">Recibido</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} lg={10} xl={5} xxl={5}>
              <FormItem label="Bodega" name="warehouseId">
                <SelectWarehouses />
              </FormItem>
            </Col>
            <Col xs={24} lg={10} xl={7} xxl={6}>
              <FormItem label="Fechas" name="dates">
                <RangePicker className={styles.item} disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} lg={14} xl={24} xxl={3}>
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
          <Text strong>Total Encontrados:</Text> {pagination?.total} <Text strong>Páginas: </Text>{' '}
          {pagination.current} / {data?.stockRequests?.totalPages || 0}
        </Col>
        <Table
          columns={columns}
          dataSource={data?.stockRequests?.docs as any}
          pagination={pagination}
          onChange={handleChangeTable}
          loading={loading}
        />
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <AlertLoading message="Generando solicitud" visible={propsGenerate?.loading} />
      <div style={{ display: 'none' }}>
        <ReportRequest ref={reportRef} data={requestData} />
      </div>
    </PageContainer>
  );
};

export default RequestList;
