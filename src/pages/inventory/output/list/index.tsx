import { EyeOutlined, PrinterFilled, SearchOutlined } from '@ant-design/icons';
import Table, { ColumnsType } from 'antd/lib/table';
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
import { TablePaginationConfig } from 'antd/es/table/interface';
import { PageContainer } from '@ant-design/pro-layout';
import type { Moment } from 'moment';
import moment from 'moment';
import { SorterResult } from 'antd/lib/table/interface';

import { useHistory, useLocation } from 'umi';
import { useGetOutputs } from '@/hooks/output.hooks';
import { useEffect, useRef, useState } from 'react';

import { StatusTypeOutput } from '../output.data';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import numeral from 'numeral';
import SelectWarehouses from '@/components/SelectWarehouses';
import AlertInformation from '@/components/Alerts/AlertInformation';
import TotalFound from '@/components/TotalFound';
import ReportOutput from '../reports/output';
import { useReactToPrint } from 'react-to-print';

import styles from './styles.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

export type FormValues = {
  status?: string;
  number?: number;
  warehouse?: WAREHOUSE.warehouse;
  dates?: Moment[];
};

const OutputList = () => {
  const [outputs, setOutputs] = useState<Partial<OUTPUT.Output[]>>([]);
  const [outputData, setOutputData] = useState<Partial<OUTPUT.Output>>({});
  const [filters, setFilters] = useState<Partial<FormValues>>();
  const [totalPages, setTotalPages] = useState(0);
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

  const [form] = Form.useForm();

  const history = useHistory();

  const location = useLocation();

  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  /** Funciones ejecutadas por los hooks */

  /**
   * @description se encarga de almacenar los datos de la consulta
   * @param data respuesta de la consulta
   */
  const resultOutputs = (data: Partial<OUTPUT.Response>) => {
    if (data) {
      setOutputs(data.docs || []);
      setTotalPages(data?.totalPages || 0);
      setPagination({ ...pagination, total: data.totalDocs });
    }
  };

  /**
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const messageError = (message: string) => {
    setError({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeMessageError = () => {
    setError({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /** FIn de Funciones ejecutadas por los hooks */

  /** Hooks para manejo de consultas */

  const { getOutputs, loading } = useGetOutputs(resultOutputs, messageError);

  /** Fin de Hooks para manejo de consultas */

  const printPage = async (record: Partial<OUTPUT.Output>) => {
    await setOutputData(record);
    handlePrint();
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener las entradas
   * @param params filtros necesarios para la busqueda
   */
  const onSearch = (params?: Partial<OUTPUT.FiltersGetOutputs>) => {
    getOutputs({
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
    const { status, number, warehouse, dates } = props;
    try {
      const params: Partial<OUTPUT.FiltersGetOutputs> = {
        page: pageCurrent || 1,
        limit: pagination.pageSize,
        status,
        number,
        sort: sort || { createdAt: -1 },
      };

      if (dates) {
        const dateInitial = moment(dates[0]).format(FORMAT_DATE_API);
        const dateFinal = moment(dates[1]).format(FORMAT_DATE_API);
        params['dateFinal'] = dateFinal;
        params['dateInitial'] = dateInitial;
      }
      if (warehouse) {
        params['warehouseId'] = warehouse?._id;
      }
      setPagination({ ...pagination, current: pageCurrent || 1 });
      onSearch(params);

      const datos = Object.keys(props)
        .reduce((a, key) => (props[key] ? `${a}&${key}=${JSON.stringify(props[key])}` : a), '')
        .slice(1);

      form.setFieldsValue(props);
      history.replace(`${location.pathname}?${datos}`);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    _: any,
    sorter: SorterResult<Partial<OUTPUT.Output>>,
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

    setPagination({ ...pagination, current });
    onFinish(params, sort, current);
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    setPagination({
      total: 0,
      pageSize: 10,
      current: 1,
    });
    onSearch({
      limit: 10,
      page: 1,
    });
    setFilters({});
  };

  useEffect(() => {
    const queryParams = location['query'];

    const newFilters = {};

    Object.keys(queryParams).forEach((item) => {
      newFilters[item] = JSON.parse(queryParams[item]);
    });
    onFinish(newFilters);
  }, []);

  const columns: ColumnsType<Partial<OUTPUT.Output>> = [
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
      render: (warehouse: WAREHOUSE.warehouse) => warehouse?.name,
    },
    {
      title: 'Referencia',
      dataIndex: 'details',
      align: 'center',
      render: (details: OUTPUT.DetailOutput[]) => details?.length,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => {
        const { color, label } = StatusTypeOutput[status || ''];
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
                onClick={() => history.push(`/inventory/output/${_id}`)}
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
            Lista de Salidas
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
            <Col xs={24} lg={4} xl={3} xxl={3}>
              <FormItem label="Número" name="number">
                <InputNumber
                  className={styles.item}
                  disabled={loading}
                  min={1}
                  max={pagination.total}
                />
              </FormItem>
            </Col>
            <Col xs={24} lg={5} xl={3} xxl={3}>
              <FormItem label="Estado" name="status">
                <Select className={styles.item} allowClear disabled={loading}>
                  {Object.keys(StatusTypeOutput).map((key) => (
                    <Option key={key}>
                      <Badge
                        text={StatusTypeOutput[key].label}
                        color={StatusTypeOutput[key].color}
                      />
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} lg={10} xl={7} xxl={7}>
              <FormItem label="Bodega" name="warehouse">
                <SelectWarehouses />
              </FormItem>
            </Col>
            <Col xs={24} lg={10} xl={7} xxl={7}>
              <FormItem label="Fechas" name="dates">
                <RangePicker className={styles.item} disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} lg={14} xl={4} xxl={4}>
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
      <TotalFound
        current={pagination.current || 0}
        totalPages={totalPages}
        total={pagination.total || 0}
      />
      <Card>
        <Table
          columns={columns}
          dataSource={outputs}
          pagination={pagination}
          onChange={handleChangeTable}
          loading={loading}
        />
      </Card>
      <AlertInformation {...error} onCancel={closeMessageError} />
      <div style={{ display: 'none' }}>
        <ReportOutput ref={reportRef} data={outputData} />
      </div>
    </PageContainer>
  );
};

export default OutputList;
