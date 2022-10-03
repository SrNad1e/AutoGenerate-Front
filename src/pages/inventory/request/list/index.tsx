/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SearchOutlined,
  EyeOutlined,
  PrinterFilled,
  FieldNumberOutlined,
  MoreOutlined,
  DropboxOutlined,
  FileSyncOutlined,
  CalendarOutlined,
  ClearOutlined,
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
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import type {
  DetailRequest,
  FiltersStockRequestsInput,
  StatusStockRequest,
  StockRequest,
  Warehouse,
} from '@/graphql/graphql';
import { useReactToPrint } from 'react-to-print';
import type { Moment } from 'moment';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import type { Location } from 'umi';
import { useHistory, useLocation, useModel, useAccess } from 'umi';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import SelectWarehouses from '@/components/SelectWarehouses';
import { StatusType } from '../request.data';
import { useGenerateRequest, useGetRequests } from '@/hooks/request.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '@/components/Alerts/AlertLoading';
import ReportRequest from '../reports/request';

import styles from './styles.less';
import './styles.less';
import style from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export type FormValues = {
  status?: StatusStockRequest;
  number?: number;
  warehouseId?: string;
  dates?: Moment[];
  type?: string;
};

const RequestList = () => {
  const [requestData, setRequestData] = useState<Partial<StockRequest>>({});
  const [showFilterType, setShowFilterType] = useState(false);
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { initialState } = useModel('@@initialState');
  const defaultWarehouse = initialState?.currentUser?.shop?.defaultWarehouse?._id;
  const canChangeWarehouse = initialState?.currentUser?.role?.changeWarehouse;

  const {
    request: { canAutoCreate, canPrint },
  } = useAccess();

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

  const historyEditConfig = (_id: string) => {
    if (history.location.pathname.includes('pos')) {
      history.push(`/pos/request/${_id}`);
    } else {
      history.push(`/inventory/request/${_id}`);
    }
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
   * @description Se encarga de imprimir una solicitud
   * @param record
   */
  const printPage = async (record: Partial<StockRequest>) => {
    await setRequestData(record);
    handlePrint();
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener las solicitudes
   * @param params filtros necesarios para la busqueda
   */
  const onSearch = (params?: FiltersStockRequestsInput) => {
    try {
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
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description se encarga de realizar el proceso de busqueda con los filtros y setearlos en la url
   * @param props filtros seleccionados en el formulario
   */
  const onFinish = (props: FormValues, sort?: Record<string, number>, pageCurrent?: number) => {
    const { status, number, warehouseId, dates, type = 'sent' } = props;
    try {
      const params: FiltersStockRequestsInput = {
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
        if (type === 'sent') {
          params.warehouseOriginId = warehouseId;
        } else {
          params.warehouseDestinationId = warehouseId;
        }
      }

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
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<StockRequest> | SorterResult<StockRequest>[] | any,
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

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    form.setFieldsValue({
      type: 'sent',
    });
    if (!canChangeWarehouse) {
      onFinish({ warehouseId: defaultWarehouse });
      setShowFilterType(true);
    } else {
      onFinish({});
      setShowFilterType(false);
    }
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
        onClear();
      }
    } catch (error: any) {
      messageError(error?.message);
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
      }
      if (item === 'warehouseId') {
        delete newFilters[item];
      } else {
        newFilters[item] = JSON.parse(queryParams[item]);
      }
    });

    form.setFieldsValue({
      type: 'sent',
    });

    if (!canChangeWarehouse) {
      newFilters['warehouseId'] = defaultWarehouse;
      setShowFilterType(true);
    }

    onFinish(newFilters);
  };

  /**
   * @description funcion usada para controlar el visible del filtro tipo
   */
  const onChangeWarehouse = async () => {
    const warehouseId = await form.getFieldValue('warehouseId');
    if (warehouseId) {
      setShowFilterType(true);
    } else {
      setShowFilterType(false);
    }
  };

  useEffect(() => {
    loadingData();
  }, []);

  const columns: ColumnsType<StockRequest> = [
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
      title: <Text>{<DropboxOutlined />} Origen</Text>,
      dataIndex: 'warehouseOrigin',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (warehouseOrigin: Warehouse) => warehouseOrigin?.name,
    },
    {
      title: <Text>{<DropboxOutlined />} Destino</Text>,
      dataIndex: 'warehouseDestination',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (warehouseDestination: Warehouse) => warehouseDestination?.name,
    },
    {
      title: (
        <Text>
          <FieldNumberOutlined /> Referencias
        </Text>
      ),
      dataIndex: 'details',
      align: 'center',
      render: (details: DetailRequest[]) => details?.length,
    },
    {
      title: <Text>{<FileSyncOutlined />} Estado</Text>,
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => {
        const { color, label } = StatusType[status || ''];
        return <Badge text={label} color={color} />;
      },
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
                loading={loading}
                onClick={() => historyEditConfig(_id)}
              />
            </Tooltip>
            <Space>
              <Tooltip title="Imprimir">
                <Button
                  type="ghost"
                  disabled={!canPrint}
                  loading={loading}
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
    <PageContainer title={<Title level={4}>Lista de solicitudes</Title>}>
      <Card>
        <Form form={form} style={style.marginFilters} onFinish={onFinish}>
          <Row gutter={[40, 0]} align="middle">
            <Col xs={24} md={5} lg={5} xl={4}>
              <FormItem label="Número" name="number">
                <InputNumber controls={false} min={1} style={style.maxWidth} disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={5} xl={5}>
              <FormItem label="Estado" name="status">
                <Select allowClear loading={loading}>
                  {Object.keys(StatusType).map((key) => (
                    <Option key={key}>
                      <Badge text={StatusType[key].label} color={StatusType[key].color} />
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={7} xl={7}>
              <FormItem label="Bodega" name="warehouseId">
                <SelectWarehouses onChange={onChangeWarehouse} disabled={!canChangeWarehouse} />
              </FormItem>
            </Col>
            {showFilterType && (
              <Col xs={24} md={5} lg={6} xl={6}>
                <FormItem label="Tipo" name="type">
                  <Select loading={loading}>
                    <Option key="sent">Enviado</Option>
                    <Option key="received">Recibido</Option>
                  </Select>
                </FormItem>
              </Col>
            )}
            <Col xs={24} md={9} lg={7} xl={8}>
              <FormItem label="Fechas" name="dates">
                <RangePicker disabled={loading} placeholder={['Fecha Inicial', 'Fecha Final']} />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={7}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button
                    loading={loading}
                    style={style.buttonR}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    Buscar
                  </Button>
                  <Button
                    icon={<ClearOutlined />}
                    loading={loading}
                    style={style.buttonR}
                    onClick={() => onClear()}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]} align="middle">
          <Col span={9}>
            <Button
              shape="round"
              type="primary"
              loading={propsGenerate?.loading || loading}
              onClick={autoRequest}
              disabled={!canAutoCreate}
            >
              AutoGenerar
            </Button>
          </Col>
          <Col span={14} className={styles.alignText}>
            <Text strong>Total Encontrados:</Text> {data?.stockRequests?.totalDocs}{' '}
            <Text strong>Páginas: </Text> {data?.stockRequests?.page} /{' '}
            {data?.stockRequests?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={data?.stockRequests?.docs as any}
              pagination={{
                current: data?.stockRequests?.page,
                total: data?.stockRequests?.totalDocs,
                showSizeChanger: false,
              }}
              onChange={handleChangeTable}
              loading={loading}
              scroll={{ x: 'auto' }}
            />
          </Col>
        </Row>
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
