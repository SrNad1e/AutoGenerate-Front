/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClearOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  FileSyncOutlined,
  IdcardOutlined,
  IssuesCloseOutlined,
  MoreOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Badge, Button, Card, Col, Form, Row, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type {
  ColumnsType,
  FilterDropdownProps,
  SorterResult,
  TablePaginationConfig,
} from 'antd/lib/table/interface';
import { Credit, Customer, FiltersCreditsInput, Permissions } from '@/graphql/graphql';
import { StatusCredit } from '@/graphql/graphql';
import { useGetCredits, useUpdateCredit } from '@/hooks/credit.hooks';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { useAccess, useHistory, useLocation, useModel } from 'umi';
import type { Location } from 'umi';

import Filters from '@/components/Filters';
import SearchCustomer from '@/components/SearchCustomer';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import CreditsHistorical from '../components/historical';
import { StatusTypeCredit } from '../credit.data';

import styles from './styles';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  customerId?: string;
  status?: StatusCredit;
};

const CreditsList = () => {
  const [creditSelected, setCreditSelected] = useState<Credit | null>(null);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

  //permisos
  const {
    credit: { canEdit },
  } = useAccess();

  const [getCredits, { data, loading }] = useGetCredits();
  const [updateCredit, paramsUpdate] = useUpdateCredit();

  const { initialState } = useModel('@@initialState');
  const canQueryCredit = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadCredits,
  );

  /**
   * @description cierra el modal del historico
   */
  const closeModalHistorical = () => {
    setCreditSelected(null);
  };

  /**
   * @description cierra la alerta
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description abre el historico
   */
  const onShowHistorical = (credit: Credit) => {
    setCreditSelected(credit);
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los creditos
   * @param filters Variables para ejecutar la consulta
   */
  const onSearch = async (filters?: FiltersCreditsInput) => {
    getCredits({
      variables: {
        input: {
          ...filters,
        },
      },
    });
  };

  /**
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersCreditsInput) => {
    try {
      const valuesForm = form.getFieldsValue();

      const valuesNew = {
        ...values,
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
      showError(error?.message);
    }
  };

  /**
   * @description esta funcion evalua los paramametros del formulario y ejecuta la busqueda
   * @param value valores del formulario
   */
  const onFinish = (value: FormValues, pageCurrent?: number) => {
    const filters = { ...filterTable };
    const params: FiltersCreditsInput = {
      page: pageCurrent || 1,
      limit: 10,
      ...value,
    };

    onSearch({ ...params, ...filters });
    setQueryParams({ ...value, ...filters });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   * @param filterArg filtros de la tabla
   */
  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    filterArg: Record<string, any>,
    sorter: SorterResult<Partial<Credit>> | any,
  ) => {
    const { current } = paginationLocal;
    const prop = form.getFieldsValue();

    const filters = { ...filterArg };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });

    let sort = {};

    if (sorter.field) {
      if (['ascend', 'descend'].includes(sorter?.order || '')) {
        sort = {
          [sorter.field]: sorter.order === 'ascend' ? 1 : -1,
        };
      }
    }
    setQueryParams(filters);
    onSearch({ ...prop, sort, page: current, ...filters });
    setFilterTable(filterArg);
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
   * @description actualiza el estado del credito
   * @param _id identificador del credito a actualizar
   * @param statusUpdate estado al que se quiere cambiar
   */
  const updateCredits = (_id: string, statusUpdate: StatusCredit) => {
    updateCredit({
      variables: {
        id: _id,
        input: {
          status: statusUpdate,
        },
      },
    });
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const loadingData = () => {
    const queryParams: any = location?.query;

    const params = {};

    Object.keys(queryParams).forEach((item) => {
      if (item === 'active') {
        params[item] = ['true', true].includes(JSON.parse(queryParams[item]));
      } else {
        params[item] = JSON.parse(queryParams[item]);
      }
    });
    form.setFieldsValue(params);
    onFinish(params);
  };

  useEffect(() => {
    loadingData();
  }, []);

  useEffect(() => {
    if (!canQueryCredit) {
      showError('No tiene permisos para consultar los creditos');
    }
  }, [canQueryCredit]);

  const column: ColumnsType<Credit> = [
    {
      title: <Text>{<UserOutlined />} Cliente</Text>,
      dataIndex: 'customer',
      align: 'center',
      render: (customer: Customer) => (
        <Space direction="vertical" size={1}>
          <Text strong>
            {customer?.firstName} {customer?.lastName}
          </Text>
          <Tag icon={<IdcardOutlined />} style={styles.tagStyle}>
            {customer?.document}
          </Tag>
        </Space>
      ),
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Cupo
        </Text>
      ),
      dataIndex: 'amount',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (amount: number) => numeral(amount).format('$ 0,0'),
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Deuda
        </Text>
      ),
      dataIndex: 'balance',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (balance: number) => numeral(balance).format('$ 0,0'),
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Saldo
        </Text>
      ),
      dataIndex: 'available',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (available: number) => numeral(available).format('$ 0,0'),
    },
    {
      title: <Text>{<FileSyncOutlined />} Estado</Text>,
      dataIndex: 'status',
      align: 'center',
      filteredValue: filterTable?.status || null,
      render: (status: string) => {
        const { color, label } = StatusTypeCredit[status || ''];
        return <Badge text={label} color={color} />;
      },
      filterDropdown: (props: FilterDropdownProps) => (
        <Filters
          props={props}
          data={[
            {
              text: 'Activo',
              value: 'ACTIVE',
            },
            {
              text: 'Suspendido',
              value: 'SUSPEND',
            },
          ]}
        />
      ),
    },
    {
      title: (
        <Text>
          <CalendarOutlined /> Fecha
        </Text>
      ),
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: (
        <Text>
          <MoreOutlined /> Opciones
        </Text>
      ),
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (id, credit: Credit) => (
        <Space size={5}>
          <Tooltip title={credit.status === StatusCredit.Active ? 'Suspender' : 'Activar'}>
            <Button
              style={{ backgroundColor: 'white' }}
              danger={credit.status === StatusCredit.Active ? true : false}
              loading={paramsUpdate?.loading}
              disabled={paramsUpdate?.loading || !canEdit}
              onClick={() =>
                updateCredits(
                  id,
                  credit.status === StatusCredit.Active
                    ? StatusCredit.Suspend
                    : StatusCredit.Active,
                )
              }
              type="primary"
              icon={
                credit.status === StatusCredit.Active ? (
                  <IssuesCloseOutlined style={{ color: 'red' }} />
                ) : (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                )
              }
            />
          </Tooltip>
          <Tooltip title="Historicos">
            <Button
              loading={paramsUpdate?.loading}
              disabled={paramsUpdate?.loading}
              onClick={() => onShowHistorical(credit)}
              type="primary"
              icon={<FieldTimeOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col xs={24} md={11} lg={10} xl={9}>
              <FormItem label="Cliente" name="customerId">
                <SearchCustomer disabled={loading || paramsUpdate?.loading} />
              </FormItem>
            </Col>
            <Col xs={24} sm={8} md={7} lg={8}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button
                    disabled={loading || paramsUpdate?.loading}
                    style={styles.buttonR}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    Buscar
                  </Button>
                  <Button
                    style={styles.buttonR}
                    icon={<ClearOutlined />}
                    onClick={onClear}
                    disabled={loading || paramsUpdate?.loading}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 20]} align="middle">
          <Col span={24} style={styles.alignText}>
            <Text strong>Total Encontrados:</Text> {data?.credits?.totalDocs || 0}{' '}
            <Text strong>Páginas: </Text> {data?.credits?.page || 0} /{' '}
            {data?.credits?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              columns={column}
              dataSource={data?.credits?.docs}
              scroll={{ x: 1000 }}
              onChange={handleChangeTable}
              pagination={{
                current: data?.credits?.page,
                total: data?.credits?.totalDocs,
              }}
            />
          </Col>
        </Row>
      </Card>
      <CreditsHistorical credit={creditSelected} onCancel={closeModalHistorical} />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default CreditsList;
