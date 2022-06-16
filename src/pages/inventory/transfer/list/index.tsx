/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import SelectWarehouses from '@/components/SelectWarehouses';
import {
  EditOutlined,
  EyeOutlined,
  FileDoneOutlined,
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
import { useHistory, useLocation, useAccess } from 'umi';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { StatusType } from '../tranfer.data';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { FiltersStockTransfersInput, StatusStockTransfer, StockTransfer } from '@/graphql/graphql';
import { useGetTransfers } from '@/hooks/transfer.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import ReportTransfer from '../reports/transfer';

import styles from './styles.less';
import './styles.less';
import style from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

export type FormValues = {
  status?: string;
  number?: number;
  warehouseId?: string;
  dates?: Moment[];
  type?: string;
};

const TransferList = () => {
  const [transferData, setTransferData] = useState<Partial<StockTransfer>>({});
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

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
  };

  /**
   * @description se encarga de realizar el proceso de busqueda con los filtros
   * @param props filtros seleccionados en el formulario
   */
  const onFinish = (props: FormValues, sort?: Record<string, number>, pageCurrent?: number) => {
    const { status, number, warehouseId, dates, type = 'sent' } = props;
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
    filters: Record<string, FilterValue | null>,
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
    form.resetFields();
    onSearch();
    form.setFieldsValue({
      type: 'sent',
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
      type: 'sent',
    });

    onFinish(newFilters);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const columns: ColumnsType<StockTransfer> = [
    {
      title: 'Número',
      dataIndex: 'number',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
      width: 100,
    },
    {
      title: 'Origen',
      dataIndex: 'warehouseOrigin',
      align: 'center',
      width: 200,
      render: (warehouseOrigin) => warehouseOrigin.name,
    },
    {
      title: 'Destino',
      dataIndex: 'warehouseDestination',
      align: 'center',
      width: 200,
      render: (warehouseDestination) => warehouseDestination.name,
    },
    {
      title: 'Referencias',
      dataIndex: 'details',
      align: 'center',
      width: 110,
      render: (details) => details?.length,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      width: 120,
      render: (status: string) => {
        return <Badge color={StatusType[status]?.color} text={StatusType[status]?.text} />;
      },
    },
    {
      title: 'Fecha',
      dataIndex: 'updatedAt',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: 'Opciones',
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (_id: string, record) => {
        return (
          <Space>
            {record?.status === StatusStockTransfer.Open ? (
              <Tooltip title="Editar">
                <Button
                  type="primary"
                  color="secondary"
                  icon={<EditOutlined />}
                  onClick={() => history.push(`/inventory/transfer/${_id}`)}
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
                  onClick={() => history.push(`/inventory/transfer/confirm/${_id}`)}
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
    <PageContainer
      title={
        <Title level={4} style={{ margin: 0 }}>
          Lista de traslados
        </Title>
      }
    >
      <Card>
        <Form form={form} layout="horizontal" className={styles.filters} onFinish={onFinish}>
          <Row gutter={20} className={styles.form}>
            <Col xs={24} md={5} lg={5} xl={3}>
              <FormItem label="Número" name="number">
                <InputNumber controls={false} style={style.maxWidth} />
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={6} xl={5}>
              <FormItem label="Estado" name="status">
                <Select className={styles.item}>
                  {Object.keys(StatusType).map((key) => (
                    <Option key={key}>
                      <Badge text={StatusType[key]?.text} color={StatusType[key]?.color} />
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={6} xl={4}>
              <FormItem label="Tipo" name="type">
                <Select className={styles.item} disabled={loading}>
                  <Option key="sent">Enviados</Option>
                  <Option key="received">Recibidos</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={6}>
              <FormItem label="Bodega" name="warehouseId">
                <SelectWarehouses />
              </FormItem>
            </Col>
            <Col xs={24} md={9} lg={9} xl={6}>
              <FormItem label="Fechas" name="dates">
                <RangePicker disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={24}>
              <FormItem>
                <Space className={styles.buttons}>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                    Buscar
                  </Button>
                  <Button htmlType="reset" onClick={onClear} loading={loading}>
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]}>
          <Col span={24} className={styles.marginFilters}>
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
              }}
              onChange={handleChangeTable}
              loading={loading}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <ReportTransfer ref={reportRef} data={transferData} />
      </div>
    </PageContainer>
  );
};

export default TransferList;
