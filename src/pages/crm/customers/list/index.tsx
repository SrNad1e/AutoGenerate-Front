/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  EditFilled,
  IdcardOutlined,
  MailOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
  UserSwitchOutlined,
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
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import type { SorterResult } from 'antd/lib/table/interface';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Customer, CustomerType, FiltersCustomersInput, Permissions } from '@/graphql/graphql';
import { useGetCustomers } from '@/hooks/customer.hooks';
import { Location, useModel } from 'umi';
import { useAccess } from 'umi';
import { useLocation, history } from 'umi';

import Filters from '@/components/Filters';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import EditCustomer from '../form';

import styles from './styles';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  dato?: string;
  active?: boolean;
};

const CustomerList = () => {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [customerData, setCustomerData] = useState<Partial<Customer>>({});

  const [form] = Form.useForm();
  const location: Location = useLocation();

  const {
    customer: { canCreate, canEdit },
  } = useAccess();

  const [getCustomers, paramsGetCustomers] = useGetCustomers();

  const { initialState } = useModel('@@initialState');
  const canQueryCustomers = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadCrmCustomers,
  );

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
   * Cierra el modal
   */
  const closeEditModal = () => {
    setCustomerData({});
    setVisibleEdit(false);
  };

  /**
   * @description abre el modal de edicion y setea el customer
   * @param customer datos del cliente
   */
  const visibleModalEdit = (customer?: Partial<Customer>) => {
    setCustomerData(customer || { birthday: null });
    setVisibleEdit(true);
  };

  /**
   * @description ejecuta la consulta para obtener los clientes
   * @param filters filtros para realizar la consulta
   */
  const onSearch = (filters?: FiltersCustomersInput) => {
    try {
      getCustomers({
        variables: {
          input: {
            limit: 10,
            ...filters,
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersCustomersInput) => {
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

    if (filters.active === null) {
      delete filters.active;
    }

    const params: FiltersCustomersInput = {
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
    sorter: SorterResult<Partial<Customer>> | any,
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
    if (!canQueryCustomers) {
      showError('No tiene permisos para consultar los clientes');
    }
  }, [canQueryCustomers]);

  const column: ColumnsType<Customer> = [
    {
      title: (
        <Text>
          <UserOutlined /> Cliente
        </Text>
      ),
      dataIndex: 'firstName',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (_, customer: Customer) => (
        <Space direction="vertical" size={5}>
          <Text>
            {customer?.firstName} {customer?.lastName}
          </Text>
          <Tag style={styles.tagStyle}>
            {<IdcardOutlined />} {customer?.document}
          </Tag>
        </Space>
      ),
    },
    {
      title: (
        <Text>
          <MailOutlined /> Correo
        </Text>
      ),
      dataIndex: 'email',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (email) => <Text>{email || '(No Registra Correo)'}</Text>,
    },
    {
      title: (
        <Text>
          <UserSwitchOutlined /> Tipo de Cliente
        </Text>
      ),
      dataIndex: 'customerType',
      align: 'center',
      render: (customerType: CustomerType) => (
        <Tag style={styles.tagStyle}>{customerType?.name}</Tag>
      ),
    },
    {
      title: 'Activo',
      dataIndex: 'active',
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
      title: (
        <Text>
          <CalendarOutlined /> Fecha
        </Text>
      ),
      dataIndex: 'updatedAt',
      align: 'center',
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: (
        <Text>
          <MoreOutlined /> Opción
        </Text>
      ),
      dataIndex: '_id',
      align: 'center',
      render: (_, customerId) => (
        <Tooltip title="Editar">
          <Button
            onClick={() => visibleModalEdit(customerId)}
            loading={paramsGetCustomers?.loading}
            type="primary"
            disabled={paramsGetCustomers?.loading || !canEdit}
            icon={<EditFilled />}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={30}>
            <Col xs={24} md={9} lg={9} xl={9}>
              <FormItem label="Dato" name="dato">
                <Input
                  disabled={paramsGetCustomers?.loading}
                  placeholder="Correo, Nombre, Teléfono, Documento..."
                />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={7}>
              <Space>
                <Button
                  style={styles.buttonR}
                  disabled={paramsGetCustomers?.loading}
                  icon={<SearchOutlined />}
                  loading={paramsGetCustomers?.loading}
                  type="primary"
                  htmlType="submit"
                >
                  Buscar
                </Button>
                <Button
                  style={styles.buttonR}
                  disabled={paramsGetCustomers?.loading}
                  icon={<ClearOutlined />}
                  loading={paramsGetCustomers?.loading}
                  onClick={onClear}
                >
                  Limpiar
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 15]} align="middle" style={styles.marginFilter}>
          <Col xs={6} md={15} lg={16}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              disabled={paramsGetCustomers?.loading || !canCreate}
              shape="round"
              loading={paramsGetCustomers?.loading}
              onClick={() => visibleModalEdit()}
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={24} md={9} lg={8} style={{ textAlign: 'right' }}>
            <Text strong>Total Encontrados:</Text>{' '}
            {paramsGetCustomers?.data?.customers?.totalDocs || 0} <Text strong>Páginas: </Text>{' '}
            {paramsGetCustomers?.data?.customers?.page || 0} /{' '}
            {paramsGetCustomers.data?.customers?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={column}
              loading={paramsGetCustomers?.loading}
              dataSource={paramsGetCustomers?.data?.customers?.docs}
              scroll={{ x: 'auto' }}
              pagination={{
                current: paramsGetCustomers?.data?.customers?.page,
                total: paramsGetCustomers?.data?.customers?.totalDocs,
                showSizeChanger: false,
              }}
            />
          </Col>
        </Row>
      </Card>
      <EditCustomer customerData={customerData} visible={visibleEdit} onCancel={closeEditModal} />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default CustomerList;
