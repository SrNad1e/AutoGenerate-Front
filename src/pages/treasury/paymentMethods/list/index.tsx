/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  DollarOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { FilterValue, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useGetPayments } from '@/hooks/payment.hooks';
import type { FiltersPaymentsInput, Payment, ResponsePayments } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';
import { useHistory, useLocation, useModel } from 'umi';
import type { Location } from 'umi';
import { useAccess } from 'umi';
import moment from 'moment';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import Filters from '@/components/Filters';
import AlertInformation from '@/components/Alerts/AlertInformation';
import PaymentMethodsForm from '../form';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name?: string;
  active?: boolean;
};

const PaymentsMethodsList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [visibleForm, setVisibleForm] = useState(false);
  const [paymentMethodData, setPaymentMethodData] = useState({});

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

  const {
    paymentMethod: { canCreate, canEdit },
  } = useAccess();

  const [getPayments, paramsGetPayments] = useGetPayments();

  const { initialState } = useModel('@@initialState');
  const canQueryPayments = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadTreasuryPayments,
  );

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description cierra el formulario y reinicia la data del payment
   */
  const closeForm = () => {
    setPaymentMethodData({});
    setVisibleForm(false);
  };

  /**
   * @description abre el formulario y setea la data del payment
   * @param paymentData data del pago
   */
  const openForm = (paymentData?: Payment) => {
    setPaymentMethodData(paymentData || {});
    setVisibleForm(true);
  };

  /**
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const messageError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los medios de pago
   * @param values filtros necesarios para la busqueda
   */
  const onSearch = (values?: FiltersPaymentsInput) => {
    try {
      getPayments({
        variables: {
          input: {
            limit: 10,
            ...values,
          },
        },
      });
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description se encarga de setear los filtros en la url
   * @param valuesQuery filtros para setear en la url
   */
  const setQueryParams = (valuesQuery?: FiltersPaymentsInput) => {
    try {
      const valuesForm = form.getFieldsValue();

      const valuesNew = {
        ...valuesQuery,
        ...valuesForm,
      };

      const datos = Object.keys(valuesNew)
        .reduce(
          (a, key) =>
            valuesNew[key] !== undefined ? `${a}&${key}=${JSON.stringify(valuesNew[key])}` : a,
          '',
        )
        .slice(1);

      history.replace(`${location.pathname}?${datos}`);
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description ejecuta la busqueda con base a los filtros del formulario
   * @param props valores del formulario
   */
  const onFinish = (props: FormValues) => {
    const filters = { ...filterTable };
    const params: any = {
      ...props,
    };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });
    form.setFieldsValue(params);
    onSearch({ ...filters, ...params });
    setQueryParams({
      ...props,
      ...filters,
    });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   * @param filtersArg filtros de la tabla
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    filtersArg: Record<string, FilterValue | any>,
    sorter: SorterResult<ResponsePayments> | SorterResult<ResponsePayments>[] | any,
  ) => {
    const { current } = paginationLocal;
    const params = form.getFieldsValue();

    let sort = {};
    const filters = { ...filtersArg };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });

    if (sorter?.field) {
      sort = {
        [sorter?.field]: sorter?.order === 'ascend' ? 1 : -1,
      };
    } else {
      sort = {
        createdAt: -1,
      };
    }
    setQueryParams(filters);
    onSearch({ ...params, sort, page: current, ...filters });
    setFilterTable(filtersArg);
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    onSearch({});
    setFilterTable({});
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const getFiltersQuery = () => {
    const queryParams: any = location.query;
    const tableFilters = {
      active: queryParams.active ? [queryParams.active === 'true'] : null,
    };
    const newFilters = {};

    Object.keys(queryParams).forEach((item) => {
      if (item === 'active') {
        newFilters[item] = ['true', true].includes(JSON.parse(queryParams[item]));
      } else if (item === 'dates') {
        const dataItem = JSON.parse(queryParams[item]);
        newFilters[item] = [moment(dataItem[0]), moment(dataItem[1])];
      } else {
        newFilters[item] = JSON.parse(queryParams[item]);
      }
    });

    form.setFieldsValue(newFilters);
    setFilterTable(tableFilters);
    onSearch(newFilters);
  };

  useEffect(() => {
    getFiltersQuery();
  }, []);

  useEffect(() => {
    if (!canQueryPayments) {
      messageError('No tiene permisos para consultar los pagos');
    }
  }, [canQueryPayments]);

  const columns: ColumnsType<Payment> = [
    {
      title: <Text>{<DollarOutlined />} Nombre</Text>,
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      align: 'center',
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
      filterMultiple: false,
      filteredValue: filterTable?.active || null,
      filterDropdown: (props) => (
        <Filters
          props={props}
          data={[
            {
              text: 'Si',
              value: true,
            },
            {
              text: 'No',
              value: false,
            },
          ]}
        />
      ),
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha</Text>,
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: string) => moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: <Text>{<MoreOutlined />} Opción</Text>,
      fixed: 'right',
      dataIndex: '_id',
      align: 'center',
      render: (_: string, paymentId) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            disabled={!canEdit}
            onClick={() => openForm(paymentId)}
            type="primary"
            icon={<EditOutlined />}
            loading={paramsGetPayments.loading}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[20, 0]} align="middle">
            <Col xs={24} md={8} lg={9} xl={7}>
              <FormItem label="Nombre" name="name">
                <Input
                  placeholder="Nombre del medio de pago"
                  disabled={paramsGetPayments?.loading}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={6}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button
                    style={styles.buttonR}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    loading={paramsGetPayments?.loading}
                  >
                    Buscar
                  </Button>
                  <Button
                    loading={paramsGetPayments?.loading}
                    style={styles.buttonR}
                    htmlType="reset"
                    onClick={onClear}
                    icon={<ClearOutlined />}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={[0, 15]} align="middle" style={styles?.marginFilters}>
            <Col span={12}>
              <Button
                disabled={!canCreate}
                loading={paramsGetPayments.loading}
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                onClick={() => openForm()}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={12} style={styles.alignText}>
              <Text strong>Total Encontrados:</Text>{' '}
              {paramsGetPayments?.data?.payments?.totalDocs || 0} <Text strong>Páginas: </Text>{' '}
              {paramsGetPayments?.data?.payments?.page || 0} /{' '}
              {paramsGetPayments?.data?.payments?.totalPages || 0}
            </Col>
            <Col span={24}>
              <Table
                onChange={handleChangeTable}
                columns={columns}
                dataSource={paramsGetPayments?.data?.payments?.docs}
                scroll={{ x: 'auto' }}
                loading={paramsGetPayments.loading}
                pagination={{
                  current: paramsGetPayments?.data?.payments?.page,
                  total: paramsGetPayments?.data?.payments?.totalDocs,
                  showSizeChanger: false,
                }}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <PaymentMethodsForm
        visible={visibleForm}
        onCancel={closeForm}
        paymentMethod={paymentMethodData}
      />
    </PageContainer>
  );
};

export default PaymentsMethodsList;
