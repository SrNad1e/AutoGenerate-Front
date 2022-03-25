/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/dot-notation */
import { SearchOutlined, EyeOutlined, PrinterFilled } from '@ant-design/icons';
import { useHistory, useLocation, useModel } from 'umi';
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
import type { SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import type { Moment } from 'moment';
import moment from 'moment';

import { useEffect, useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import SelectWarehouses from '@/components/SelectWarehouses';
import { StatusType } from '../request.data';

import styles from './styles.less';
import './styles.less';
import { useGenerateRequest, useGetRequests } from '@/hooks/request.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '@/components/Alerts/AlertLoading';

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
  const location = useLocation();

  const [form] = Form.useForm();

  const resultRequests = (data: Partial<REQUEST.Response>) => {
    if (data) {
      setRequests(data.docs || []);

      setPagination({ ...pagination, total: data.totalDocs });
    }
  };

  const resultGenerate = ({ _id, number }: Partial<REQUEST.Request>) => {
    if (_id) {
      setPropsAlertInformation({
        message: `Se ha creado la solicitud No. ${number}`,
        type: 'success',
        redirect: `/inventory/request/${_id}`,
        visible: true,
      });
    }
  };

  const messageError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const { getRequests, loadingGetAll } = useGetRequests(resultRequests, messageError);
  const { generateRequest, loadingGenerate } = useGenerateRequest(resultGenerate, messageError);

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
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    _: any,
    sorter: SorterResult<Partial<REQUEST.Request>>,
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
        createdAt: 1,
      };
    }

    setPagination({ ...pagination, current });

    delete params.type;

    onSearch({
      ...params,
      sort,
      page: current,
      limit: pagination.pageSize,
    });
  };

  /**
   * @description se encarga de hacer la consulta para generar la solicitud
   */
  const autoRequest = () => {
    generateRequest({
      variables: {
        shopId: initialState?.currentUser?.shop?._id,
      },
    });
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    setPagination({
      pageSize: 10,
      current: 1,
    });
    onSearch({
      limit: 10,
      page: 1,
    });
    form.setFieldsValue({
      type: 'received',
    });
  };

  /**
   * @description se encarga de realizar el proceso de busqueda con los filtros
   * @param props filtros seleccionados en el formulario
   */
  const onFinish = (props: FormValues) => {
    const { status, number, warehouse, dates, type = 'received' } = props;
    try {
      const params: REQUEST.FiltersGetRequests = {
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
        if (type === 'sent') {
          params['warehouseOriginId'] = warehouse?._id;
        } else {
          params['warehouseDestinationId'] = warehouse?._id;
        }
      }
      setPagination({ ...pagination, current: 1 });

      onSearch(params);

      const datos = Object.keys(props)
        .reduce((a, key) => (props[key] ? `${a}&${key}=${JSON.stringify(props[key])}` : a), '')
        .slice(1);

      form.setFieldsValue(props);
      history.replace(`${location.pathname}?${datos}`);
    } catch (e) {
      messageError(e as string);
    }
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const loadingData = () => {
    const queryParams = location['query'];

    const newFilters = {};

    Object.keys(queryParams).forEach((item) => {
      newFilters[item] = JSON.parse(queryParams[item]);
    });
    form.setFieldsValue({
      type: 'received',
    });
    onFinish(newFilters);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const columns: ColumnsType<Partial<REQUEST.Request>> = [
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
                <InputNumber min={1} className={styles.item} disabled={loadingGetAll} />
              </FormItem>
            </Col>
            <Col xs={24} lg={5} xl={4} xxl={3}>
              <FormItem label="Estado" name="status">
                <Select className={styles.item} allowClear disabled={loadingGetAll}>
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
                <Select className={styles.item} disabled={loadingGetAll}>
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
                <RangePicker className={styles.item} disabled={loadingGetAll} />
              </FormItem>
            </Col>
            <Col xs={24} lg={14} xl={24} xxl={3}>
              <FormItem>
                <Space className={styles.buttons}>
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    loading={loadingGetAll}
                  >
                    Buscar
                  </Button>
                  <Button htmlType="button" onClick={onClear} loading={loadingGetAll}>
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
          loading={loadingGetAll}
        />
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <AlertLoading message="Generando solicitud" visible={loadingGenerate} />
    </PageContainer>
  );
};

export default RequestList;
