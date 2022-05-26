/* eslint-disable react-hooks/exhaustive-deps */
import type {
  CloseXInvoicing,
  FiltersClosesXInvoicingInput,
  PaymentOrderClose,
  Shop,
  SummaryOrderClose,
  User,
} from '@/graphql/graphql';
import { useGetClosesXInvoicing } from '@/hooks/closeXInvoicing.hooks';
import { EditFilled, PlusOutlined, PrinterFilled, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import type { Moment } from 'moment';
import moment from 'moment';
import numeral from 'numeral';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef, useState } from 'react';
import type { Location } from 'umi';
import { useLocation, useHistory } from 'umi';

import CloseDay from '../components/DayClose';
import EditClose from '../components/EditClose';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import FormClosingX from '../components/form';

import styles from './styles';
import SelectShop from '@/components/SelectShop';
import AlertInformation from '@/components/Alerts/AlertInformation';

const FormItem = Form.Item;
const { Text } = Typography;

export type FormValues = {
  number?: number;
  shopId?: string;
  date?: Moment;
};

const ClosingXList = () => {
  const [visible, setVisible] = useState(false);
  const [visibleNewClose, setVisibleNewClose] = useState(false);
  const [visibleEditClose, setVisibleEditClose] = useState(false);
  const [filters, setFilters] = useState<Partial<FormValues>>();
  const [closeData, setCloseData] = useState<Partial<CloseXInvoicing>>({});
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  console.log(closeData);

  const [form] = Form.useForm();

  const history = useHistory();

  const location: Location = useLocation();

  const reportRef = useRef(null);

  const [getCloses, { data, loading }] = useGetClosesXInvoicing();

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

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
   * Cierra el modal de arqueo de dinero
   */
  const closeModal = () => {
    setVisible(false);
  };

  /**
   * Cierra el modal de arqueo de dinero y abre el modal de creacion
   */
  const onOk = () => {
    setVisibleNewClose(true);
    closeModal();
  };

  /**
   * Cierra el modal de creacion
   */
  const closeNewClose = () => {
    setVisibleNewClose(false);
  };

  /**
   * Cierra el modal de edicion
   */
  const closeEditClose = () => {
    setVisibleEditClose(false);
  };

  /**
   * @description se encarga de seleccionar el cierre que imprime
   * @param record cierre
   */
  const printPage = async (record: Partial<CloseXInvoicing>) => {
    await setCloseData(record);
    handlePrint();
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los cierres
   * @param params filtros necesarios para la busqueda
   */
  const onSearch = (params?: FiltersClosesXInvoicingInput) => {
    getCloses({
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
    const { number, shopId, date } = props;
    try {
      const params: Partial<FiltersClosesXInvoicingInput> = {
        page: pageCurrent || 1,
        limit: 10,
        number,
        sort: sort || { createdAt: -1 },
      };

      if (date) {
        const closeDate = moment(date).format(FORMAT_DATE_API);
        params.closeDate = closeDate;
      }
      if (shopId) {
        params.shopId = shopId;
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
    sorter: SorterResult<CloseXInvoicing> | SorterResult<CloseXInvoicing>[] | any,
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

  useEffect(() => {
    const queryParams: any = location.query;

    const newFilters = {};
    Object.keys(queryParams).forEach((item) => {
      newFilters[item] = JSON.parse(queryParams[item]);
    });
    onFinish(newFilters);
  }, []);

  const columns: ColumnsType<Partial<CloseXInvoicing>> = [
    {
      title: 'Número',
      dataIndex: 'number',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Tienda',
      dataIndex: 'shop',
      render: (shop: Shop) => shop?.name,
    },
    {
      title: 'Fecha cierre',
      dataIndex: 'closeDate',
      sorter: true,
      showSorterTooltip: false,
      render: (closeDate: Date) => <span>{moment(closeDate).format(FORMAT_DATE_API)}</span>,
    },
    {
      title: 'Ingresos',
      dataIndex: 'payemnts',
      align: 'right',
      render: (payments: PaymentOrderClose[]) =>
        numeral(payments?.reduce((sum, payment) => sum + payment?.value, 0)).format('$ 0,0'),
    },
    {
      title: 'Facturas',
      dataIndex: 'summaryOrder',
      align: 'right',
      render: (summary: SummaryOrderClose) => numeral(summary?.value).format('$ 0,0'),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: string | any) =>
        status ? <Tag color={status.color}> {status.name}</Tag> : '',
    },
    {
      title: 'Registrado',
      dataIndex: 'user',
      align: 'center',
      render: (user: User) => user?.name,
    },
    {
      title: 'Acción',
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_: string, record) => (
        <Space>
          <Tooltip title="Editar" placement="topLeft">
            <Button
              onClick={() => setVisibleEditClose(true)}
              type="primary"
              icon={<EditFilled />}
            />
            <Tooltip title="Imprimir" placement="topLeft">
              <Button onClick={() => printPage(record)} type="primary" icon={<PrinterFilled />} />
            </Tooltip>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form form={form} layout="inline" onFinish={onFinish} initialValues={filters}>
          <Row gutter={[20, 10]}>
            <Col xs={13} md={7} lg={5} xl={5}>
              <FormItem label="Número" name="number">
                <Input />
              </FormItem>
            </Col>
            <Col xs={11} md={9} lg={9} xl={9}>
              <FormItem label="Fecha de Cierre" name="date">
                <DatePicker placeholder="Seleccione una fecha" style={{ width: '100%' }} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} xl={5}>
              <FormItem label="Tienda" name="shopId">
                <SelectShop disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} xl={5}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary">
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
        <Divider />
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setVisible(true)}
              shape="round"
              type="primary"
            >
              Nuevo
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text strong>Total Encontrados:</Text> {data?.closesXInvoicing?.totalDocs}{' '}
            <Text strong>Páginas: </Text> {data?.closesXInvoicing?.page} /{' '}
            {data?.closesXInvoicing?.totalPages || 0}
          </Col>
        </Row>
      </Card>
      <Card bordered={false} bodyStyle={styles.bodyPadding}>
        <Table
          pagination={{
            current: data?.closesXInvoicing?.page,
            total: data?.closesXInvoicing?.totalDocs,
          }}
          onChange={handleChangeTable}
          columns={columns}
          scroll={{ x: 1000 }}
          loading={loading}
          dataSource={data?.closesXInvoicing?.docs as any}
        />
      </Card>
      <FormClosingX visible={visible} onCancel={closeModal} onOk={onOk} />
      <CloseDay visible={visibleNewClose} onCancel={closeNewClose} />
      <EditClose visible={visibleEditClose} onCancel={closeEditClose} />
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default ClosingXList;
