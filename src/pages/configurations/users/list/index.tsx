/*import SelectRole from '@/components/SelectRole';
import type { FiltersUsersInput, User } from '@/graphql/graphql';
import { useGetUsers } from '@/hooks/user.hooks';
import { EditOutlined, PlusOutlined, SearchOutlined, ShopFilled } from '@ant-design/icons';
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
import type { TablePaginationConfig } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import UsersForm from '../form';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useHistory, useLocation } from 'umi';
import type { Location } from 'umi';
import type { SorterResult } from 'antd/es/table/interface';
import AlertInformation from '@/components/Alerts/AlertInformation';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name?: string;
  roleId?: string;
};

const UsersList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [visibleCreate, setVisibleCreate] = useState(false);

  const location: Location = useLocation();

  const [form] = Form.useForm();
  const history = useHistory();
  const [getUsers, { data }] = useGetUsers();

  const onSearch = (filters?: FiltersUsersInput) => {
    getUsers({
      variables: {
        input: {
          ...filters,
        },
      },
    });
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
/*
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de cerrar la alerta informativa
   */ /*
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const closeModalCreate = () => {
    setVisibleCreate(false);
  };

  /**
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */ /*
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
   */ /*
  const onFinish = (value: FormValues, pageCurrent?: number) => {
    const filters = { ...filterTable };

    const params: FiltersUsersInput = {
      page: pageCurrent || 1,
      limit: 10,
      ...value,
    };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });
    onSearch({ ...filters, ...params });
    setQueryParams({ ...filters, ...value });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   * @param sorter ordenamiento de la tabla
   * @param filterArg filtros de la tabla
   */ /*
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
   */ /*
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    onSearch({});
    setFilterTable({});
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */ /*
  const loadingData = () => {
    const queryParams: any = location?.query;

    const params = {};
    const tableFilters = {
      active: queryParams.active ? [queryParams.active === 'true'] : null,
    };
    Object.keys(queryParams).forEach((item) => {
      if (item === 'active') {
        params[item] = ['true', true].includes(JSON.parse(queryParams[item]));
      } else {
        params[item] = JSON.parse(queryParams[item]);
      }
    });
    form.setFieldsValue(params);
    onFinish(params);
    setFilterTable(tableFilters);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const column = [
    {
      title: 'Nombre',
      dataIndex: 'name',
    },
    {
      title: 'Usuario',
      dataIndex: 'username',
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
    },
    {
      title: 'Tienda',
      dataIndex: 'shop',
      render: (shop: string) => (
        <Text>
          {<ShopFilled />} {shop}
        </Text>
      ),
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      align: 'center',
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
      filterMultiple: false,
      filters: [
        {
          text: 'Si',
          value: true,
        },
        {
          text: 'No',
          value: false,
        },
      ],
    },
    {
      title: 'Fecha',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (updatedAt: string) => moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Opciones',
      fixed: 'right',
      align: 'center',
      render: () => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            onClick={() => {}}
            style={{ backgroundColor: '#dc9575' }}
            icon={<EditOutlined style={{ color: 'white' }} />}
          />
        </Tooltip>
      ),
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Form>
          <Row gutter={[20, 20]} align="middle">
            <Col xs={24} md={8} lg={9} xl={7}>
              <FormItem label="Nombre" name="name">
                <Input placeholder="Nombre, Nombre de usuario" />
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={6}>
              <FormItem label="Rol" name="roleId">
                <SelectRole disabled={false} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={6}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                    Buscar
                  </Button>
                  <Button htmlType="button">Limpiar</Button>
                </Space>
              </FormItem>
            </Col>
            <Col span={12}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                onClick={() => setVisibleCreate(true)}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>Total Encontrados:</Text> {data?.users?.totalDocs}{' '}
              <Text strong>Páginas: </Text> {data?.users?.page} / {data?.users?.totalPages || 0}
            </Col>
            <Col span={24}>
              <Table
                columns={column}
                dataSource={data?.users}
                scroll={{ x: 'auto' }}
                pagination={{
                  current: data?.users?.page,
                  total: data?.users?.totalDocs,
                }}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <UsersForm visible={visibleCreate} onCancel={closeModalCreate} />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default UsersList;*/ export default <></>;
