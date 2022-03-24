/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/dot-notation */
import { SearchOutlined, EyeOutlined, PrinterFilled } from '@ant-design/icons';
import { useHistory, useLocation } from 'umi';
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
import type { TablePaginationConfig } from 'antd/es/table/interface';
import type { Moment } from 'moment';
import moment from 'moment';

import { useEffect, useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import SelectWarehouses from '@/components/SelectWarehouses';
import { StatusType } from '../request.data';

import styles from './styles.less';
import './styles.less';
import { useGetRequests } from '@/hooks/request.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';

const FormItem = Form.Item;
const { Option } = Select;
const { Title } = Typography;

const { RangePicker } = DatePicker;

export type FormValues = {
  status?: string;
  number?: number;
  warehouse?: WAREHOUSE.warehouse;
  dates?: Moment[];
  type?: string;
};

const RequestList = () => {
  const [requests, setRequests] = useState<Partial<REQUEST.Request[]>>([]);
  const [filters, setFilters] = useState<Partial<FormValues>>({
    type: 'received',
  });
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const [error, setError] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const history = useHistory();
  const location = useLocation();

  const resultRequests = (data: Partial<REQUEST.Response>) => {
    if (data) {
      setRequests(data.docs || []);

      setPagination({ ...pagination, total: data.totalDocs });
    }
  };

  const messageError = (message: string) => {
    setError({
      message,
      type: 'error',
      visible: true,
    });
  };

  const closeMessageError = () => {
    setError({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const { getRequests, loading } = useGetRequests(resultRequests, messageError);

  const onSearch = (params?: Partial<REQUEST.FiltersGetRequests>) => {
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
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param _ eventdos de los filtros
   * @param sorter evento de ordenamientos
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    // filtersData: Record<string, FilterValue | null>,
    //sorter: SorterResult<PRODUCT.Product>,
  ) => {
    const { current } = paginationLocal;
    setPagination({ ...pagination, current });
    const params = { ...filters };
    delete params.type;
    onSearch({ ...params, page: current });
  };

  const onClear = async () => {
    setFilters({});
    history.push(location.pathname);
    setPagination({
      pageSize: 10,
      current: 1,
    });
    const params = { ...filters };
    delete params.type;
    await onSearch({
      ...params,
      limit: 10,
      page: 1,
    });
  };

  const onFinish = (props: FormValues) => {
    const { status, number, warehouse, dates } = props;
    try {
      const params: Partial<REQUEST.FiltersGetRequests> = {
        page: 1,
        status,
        number,
      };

      if (dates) {
        const dateInitial = moment(dates[0]).format(FORMAT_DATE_API);
        const dateFinal = moment(dates[1]).format(FORMAT_DATE_API);
        params['dateFinal'] = dateFinal;
        params['dateInitial'] = dateInitial;
      }
      if (warehouse) {
        if (status === 'send') {
          params['warehouseDestinationId'] = warehouse?._id;
        } else {
          params['warehouseOriginId'] = warehouse?._id;
        }
      }
      setPagination({ ...pagination, current: 1 });

      setFilters({ ...filters, ...props });
      onSearch(params);

      const datos = Object.keys(props)
        .reduce((a, key) => (props[key] ? `${a}&${key}=${JSON.stringify(props[key])}` : a), '')
        .slice(1);

      history.push(`/inventory/request/list?${datos}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const queryParams = location['query'];

    const newFilters = {};

    Object.keys(queryParams).forEach((item) => {
      newFilters[item] = JSON.parse(queryParams[item]);
    });
    onFinish(newFilters);
  }, []);

  const autoRequest = () => {};

  const columns: ColumnsType<Partial<REQUEST.Request>> = [
    {
      title: 'Número',
      dataIndex: 'number',
      align: 'center',
      sorter: {
        compare: (a: any, b: any) => a.number - b.number,
      },
      showSorterTooltip: false,
    },
    {
      title: 'Origen',
      dataIndex: 'warehouseOrigin',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (warehouseOrigin: WAREHOUSE.warehouse) => warehouseOrigin?.name,
    },
    {
      title: 'Destino',
      dataIndex: 'warehouseDestination',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (warehouseDestination: WAREHOUSE.warehouse) => warehouseDestination?.name,
    },
    {
      title: 'Referencia',
      dataIndex: 'details',
      align: 'center',
      render: (details: REQUEST.DetailRequest[]) => details?.length,
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
      render: (_id: string) => {
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
          <Button shape="round" type="primary" onClick={() => autoRequest}>
            AutoGenerar
          </Button>
        </Space>
      }
    >
      <Card>
        <Form
          layout="inline"
          className={styles.filters}
          onFinish={onFinish}
          initialValues={filters}
        >
          <Row gutter={[8, 8]} className={styles.form}>
            <Col xs={24} lg={4} xl={3} xxl={3}>
              <FormItem label="Número" name="number">
                <InputNumber className={styles.item} disabled={loading} />
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
              <FormItem label="Bodega" name="warehouse">
                <SelectWarehouses />
              </FormItem>
            </Col>
            <Col xs={24} lg={10} xl={7} xxl={6}>
              <FormItem label="Fechas" name="dates">
                <RangePicker className={styles.item} disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} lg={14} xl={4} xxl={3}>
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
                  <Button onClick={onClear} loading={loading}>
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={requests}
          pagination={pagination}
          onChange={handleChangeTable}
          loading={loading}
        />
      </Card>
      <AlertInformation {...error} onCancel={closeMessageError} />
    </PageContainer>
  );
};

export default RequestList;
