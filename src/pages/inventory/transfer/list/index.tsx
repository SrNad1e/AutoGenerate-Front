/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import SelectWarehouses from '@/components/SelectWarehouses';
import {
  CalendarOutlined,
  ClearOutlined,
  DropboxOutlined,
  EditOutlined,
  EyeOutlined,
  FieldNumberOutlined,
  FileDoneOutlined,
  FileSyncOutlined,
  FireOutlined,
  MoreOutlined,
  PrinterFilled,
  SearchOutlined,
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
import type { Moment } from 'moment';
import moment from 'moment';
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import type { Location } from 'umi';
import { useModel } from 'umi';
import { useHistory, useLocation, useAccess } from 'umi';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { StatusType } from '../tranfer.data';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import type { FiltersStockTransfersInput, StockTransfer } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';
import { StatusStockTransfer } from '@/graphql/graphql';
import { useGetTransfers } from '@/hooks/transfer.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import ReportTransfer from '../reports/transfer';

import styles from './styles.less';
import './styles.less';
import style from './styles';
import Inconsistencies from '../components/Inconsistencies';

const FormItem = Form.Item;
const { Option } = Select;
const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

export type FormValues = {
  status?: StatusStockTransfer;
  number?: number;
  warehouseId?: string;
  dates?: Moment[];
  type?: string;
};

const TransferList = () => {
  const [transferData, setTransferData] = useState<Partial<StockTransfer>>({});
  const [showFilterType, setShowFilterType] = useState(false);
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visibleInconsistencies, setVisibleInconsistencies] = useState(false);

  const history = useHistory();
  const location: Location = useLocation();

  const [form] = Form.useForm();

  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const {
    transfer: { canPrint, canConfirm },
  } = useAccess();

  const { initialState } = useModel('@@initialState');
  const defaultWarehouse = initialState?.currentUser?.shop?.defaultWarehouse?._id;
  const canChangeWarehouse = initialState?.currentUser?.role?.changeWarehouse;

  const [getTransfers, { data, loading }] = useGetTransfers();

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

  const historyConfirmConfig = (_id: string) => {
    if (history.location.pathname.includes('pos')) {
      history.push(`/pos/transfer/confirm/${_id}`);
    } else {
      history.push(`/inventory/transfer/confirm/${_id}`);
    }
  };

  const historyEditConfig = (_id: string) => {
    if (history.location.pathname.includes('pos')) {
      history.push(`/pos/transfer/${_id}`);
    } else {
      history.push(`/inventory/transfer/${_id}`);
    }
  };

  /**
   * @description Se encarga de imprimir una solicitud
   * @param record
   */
  const printPage = async (record: Partial<StockTransfer>) => {
    await setTransferData(record);
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
   * @description se encarga de ejecutar la funcion para obtener los traslados
   * @param params filtros necesarios para la busqueda
   */
  const onSearch = (params?: FiltersStockTransfersInput) => {
    try {
      getTransfers({
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
    const { status, number, warehouseId, dates, type = 'received' } = props;
    try {
      const params: FiltersStockTransfersInput = {
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
    __: Record<string, FilterValue | null>,
    sorter: SorterResult<StockTransfer> | SorterResult<StockTransfer>[] | any,
    _: TableCurrentDataSource<StockTransfer>,
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
    onSearch({});
    form.resetFields();
    form.setFieldsValue({
      type: 'received',
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
      type: 'received',
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
    if (!canChangeWarehouse) {
      form.setFieldsValue({
        warehouseId: defaultWarehouse,
      });
    }
  }, []);

  const columns: ColumnsType<StockTransfer> = [
    {
      title: (
        <Text className={styles.iconTable}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'number',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
    },
    {
      title: <Text>{<DropboxOutlined />} Origen</Text>,
      dataIndex: 'warehouseOrigin',
      align: 'center',
      render: (warehouseOrigin) => warehouseOrigin.name,
    },
    {
      title: <Text>{<DropboxOutlined />} Destino</Text>,
      dataIndex: 'warehouseDestination',
      align: 'center',
      render: (warehouseDestination) => warehouseDestination.name,
    },
    {
      title: (
        <Text>
          <FieldNumberOutlined /> Referencias
        </Text>
      ),
      dataIndex: 'details',
      align: 'center',
      render: (details) => details?.length,
    },
    {
      title: <Text>{<FileSyncOutlined />} Estado</Text>,
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => {
        return <Badge color={StatusType[status]?.color} text={StatusType[status]?.text} />;
      },
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha</Text>,
      dataIndex: 'updatedAt',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
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
            {record?.status === StatusStockTransfer.Open ? (
              <Tooltip title="Editar">
                <Button
                  type="primary"
                  color="secondary"
                  icon={<EditOutlined />}
                  onClick={() => historyEditConfig(_id)}
                />
              </Tooltip>
            ) : (
              <Tooltip title={record?.status === StatusStockTransfer.Sent ? 'Confirmar' : 'Ver'}>
                <Button
                  type="primary"
                  disabled={record?.status === StatusStockTransfer.Sent && !canConfirm}
                  danger={record?.status === StatusStockTransfer.Sent}
                  icon={
                    record?.status === StatusStockTransfer.Sent ? (
                      <FileDoneOutlined />
                    ) : (
                      <EyeOutlined />
                    )
                  }
                  onClick={() => historyConfirmConfig(_id)}
                />
              </Tooltip>
            )}
            <Tooltip title="Imprimir">
              <Button
                type="ghost"
                disabled={!canPrint}
                style={style.whiteColor}
                onClick={() => printPage(record)}
                icon={<PrinterFilled />}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer title={<Title level={4}>Lista de traslados</Title>}>
      <Card>
        <Form form={form} layout="horizontal" className={styles.filters} onFinish={onFinish}>
          <Row gutter={[40, 0]} align="middle">
            <Col xs={24} md={5} lg={5} xl={4}>
              <FormItem label="Número" name="number">
                <InputNumber controls={false} style={style.maxWidth} disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={5} xl={5}>
              <FormItem label="Estado" name="status">
                <Select className={styles.item} loading={loading}>
                  {Object.keys(StatusType).map((key) => (
                    <Option key={key}>
                      <Badge text={StatusType[key]?.text} color={StatusType[key]?.color} />
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={7} xl={7}>
              <FormItem label="Bodega" name="warehouseId">
                <SelectWarehouses
                  onChange={onChangeWarehouse}
                  disabled={!canChangeWarehouse || loading}
                />
              </FormItem>
            </Col>
            {showFilterType && (
              <Col xs={24} md={5} lg={6} xl={6}>
                <FormItem label="Tipo" name="type">
                  <Select className={styles.item} loading={loading}>
                    <Option key="sent">Enviados</Option>
                    <Option key="received">Recibidos</Option>
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
              <FormItem>
                <Space className={styles.buttons}>
                  <Button
                    icon={<SearchOutlined />}
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    style={style.buttonR}
                  >
                    Buscar
                  </Button>
                  <Button
                    onClick={onClear}
                    icon={<ClearOutlined />}
                    loading={loading}
                    style={style.buttonR}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]} align="middle" style={{ marginTop: 20 }}>
          <Col span={12}>
            <Button
              icon={<FireOutlined />}
              type="primary"
              shape="round"
              loading={loading}
              onClick={() => setVisibleInconsistencies(true)}
            >
              Inconsistencias
            </Button>
          </Col>
          <Col span={12} className={styles.marginFilters}>
            <Text strong>Total Encontrados:</Text> {data?.stockTransfers?.totalDocs}{' '}
            <Text strong>Páginas: </Text> {data?.stockTransfers?.page} /{' '}
            {data?.stockTransfers?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              scroll={{ x: 'auto' }}
              columns={columns}
              dataSource={data?.stockTransfers?.docs as any}
              pagination={{
                current: data?.stockTransfers?.page,
                total: data?.stockTransfers?.totalDocs,
                showSizeChanger: false,
              }}
              onChange={handleChangeTable}
              loading={loading}
            />
          </Col>
        </Row>
      </Card>
      <Inconsistencies
        onCancel={() => setVisibleInconsistencies(false)}
        visible={visibleInconsistencies}
      />
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <ReportTransfer ref={reportRef} data={transferData} />
      </div>
    </PageContainer>
  );
};

export default TransferList;
