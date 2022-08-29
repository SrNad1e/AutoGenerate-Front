/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  CrownOutlined,
  EditOutlined,
  FileSyncOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  ShopFilled,
  UserAddOutlined,
  UserOutlined,
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
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { TablePaginationConfig } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useAccess, useHistory, useLocation, useModel } from 'umi';
import type { Location } from 'umi';
import moment from 'moment';
import { useGetUsers } from '@/hooks/user.hooks';
import type { FiltersUsersInput, Role, Shop, User } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';

import UsersForm from '@/components/CreateUser';
import SelectRole from '@/components/SelectRole';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { StatusTypeUser } from '../users.data';

import styles from './styles';
import Filters from '@/components/Filters';

const FormItem = Form.Item;
const { Text } = Typography;
const { Option } = Select;

type FormValues = {
  name?: string;
  roleId?: string;
  isWeb?: boolean;
};

const UsersList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [user, setUser] = useState<Partial<User>>({});

  const location: Location = useLocation();

  const [form] = Form.useForm();
  const history = useHistory();

  const [getUsers, { data, loading }] = useGetUsers();

  const { initialState } = useModel('@@initialState');
  const canQueryUsers = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadConfigurationUsers,
  );

  const {
    user: { canCreate, canEdit },
  } = useAccess();

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
   * @description se encarga de ejecutar la funcion para obtener los usarios
   * @param filters filtros necesarios para la busqueda
   */
  const onSearch = (filters?: FiltersUsersInput) => {
    try {
      getUsers({
        variables: {
          input: {
            ...filters,
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
    }
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

  const visibleModal = (userData: User) => {
    setUser(userData || {});
    setVisibleCreate(true);
  };

  /**
   * @description cierra el modal de creacion
   */
  const closeModal = () => {
    setUser({});
    setVisibleCreate(false);
  };

  /**
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersUsersInput) => {
    try {
      const valuesForm = form.getFieldsValue();
      const valuesNew = {
        ...values,
        ...valuesForm,
      };
      const datos = Object.keys(valuesNew)
        .reduce(
          (a, key) =>
            valuesNew[key] !== undefined && valuesNew[key] !== null
              ? `${a}&${key}=${JSON.stringify(valuesNew[key])}`
              : a,
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
    const params: FiltersUsersInput = {
      page: pageCurrent || 1,
      limit: 10,
      ...value,
    };

    if (params.isWeb === null) {
      delete params.isWeb;
    }

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
    sorter: SorterResult<Partial<User>> | any,
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
      }
      if (item === 'isWeb') {
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
    if (!canQueryUsers) {
      showError('No tiene permisos para consultar los usuarios');
    }
  }, [canQueryUsers]);

  const column: ColumnsType<User> = [
    {
      title: <Text>{<UserOutlined />} Nombre</Text>,
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: <Text>{<UserAddOutlined />} Usuario</Text>,
      dataIndex: 'username',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: <Text>{<CrownOutlined />} Rol</Text>,
      dataIndex: 'role',
      align: 'center',
      render: (role: Role) => <Text>{role?.name}</Text>,
    },
    {
      title: <Text>{<ShopFilled />} Tienda</Text>,
      dataIndex: 'shop',
      align: 'center',
      render: (shop: Shop) => <Text>{shop?.name}</Text>,
    },
    {
      title: <Text>{<FileSyncOutlined />} Estado</Text>,
      dataIndex: 'status',
      align: 'center',
      filteredValue: filterTable?.status || null,
      render: (status: string) => {
        const { color, label } = StatusTypeUser[status || ''];
        return <Badge text={label} color={color} />;
      },
      filterDropdown: (props) => (
        <Filters
          props={props}
          data={[
            {
              text: 'Activo',
              value: 'ACTIVE',
            },
            {
              text: 'Inactivo',
              value: 'INACTIVE',
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
      title: <Text>{<CalendarOutlined />} Fecha</Text>,
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (updatedAt: string) => moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: <Text>{<MoreOutlined />} Opciones</Text>,
      fixed: 'right',
      dataIndex: '_id',
      align: 'center',
      render: (_: string, userId) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            disabled={!canEdit}
            loading={loading}
            onClick={() => visibleModal(userId)}
            type="primary"
            icon={<EditOutlined />}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[20, 20]} align="middle">
            <Col xs={24} md={5} lg={5} xl={7}>
              <FormItem label="Nombre" name="name">
                <Input placeholder="Nombre, Nombre de usuario" />
              </FormItem>
            </Col>
            <Col xs={24} md={5} lg={5} xl={5}>
              <FormItem label="Rol" name="roleId">
                <SelectRole disabled={false} />
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={6} xl={6}>
              <FormItem label="Tipo de Usuario" name="isWeb">
                <Select placeholder="Seleccione Tipo de Usuario">
                  <Option key={'1'} value={true}>
                    Usuarios Web
                  </Option>
                  <Option key={'2'} value={false}>
                    Usuarios ERP
                  </Option>
                  <Option>Todos</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={3} lg={3}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button
                    style={styles.buttonR}
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    Buscar
                  </Button>
                  <Button
                    style={styles.buttonR}
                    htmlType="reset"
                    loading={loading}
                    icon={<ClearOutlined />}
                    onClick={() => onClear()}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
            <Col span={12}>
              <Button
                disabled={!canCreate}
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                loading={loading}
                onClick={() => setVisibleCreate(true)}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={12} style={styles.alignText}>
              <Text strong>Total Encontrados:</Text> {data?.users?.totalDocs || 0}{' '}
              <Text strong>Páginas: </Text> {data?.users?.page || 0} /{' '}
              {data?.users?.totalPages || 0}
            </Col>
            <Col span={24}>
              <Table
                onChange={handleChangeTable}
                columns={column}
                dataSource={data?.users?.docs}
                scroll={{ x: 1000 }}
                pagination={{
                  current: data?.users?.page,
                  total: data?.users?.totalDocs,
                  showSizeChanger: false,
                }}
                loading={loading}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <UsersForm user={user} visible={visibleCreate} onCancel={closeModal} />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default UsersList;
