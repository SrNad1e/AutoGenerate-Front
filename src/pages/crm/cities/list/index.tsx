/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  CrownOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  ShopFilled,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tooltip, Typography } from 'antd';
import type { TablePaginationConfig } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import type { Location } from 'umi';
import moment from 'moment';
import type { FiltersCitiesInput, FiltersUsersInput, Role, User } from '@/graphql/graphql';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

import { useGetCities } from '@/hooks/cities.hooks';
import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name?: string;
  country?: string;
  state?: string;
};

const CitiesList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const location: Location = useLocation();

  const [form] = Form.useForm();
  const history = useHistory();

  const [getCities, { data }] = useGetCities();

  /*const {
    user: { canCreate, canEdit },
  } = useAccess();*/

  /**
   * @description se encarga de ejecutar la funcion para obtener las ciudades
   * @param filters filtros necesarios para la busqueda
   */
  const onSearch = (filters?: FiltersCitiesInput) => {
    getCities({
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
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersCitiesInput) => {
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
    const params: FiltersUsersInput = {
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

  const column: ColumnsType<User> = [
    {
      title: <Text>{<UserOutlined />} Nombre</Text>,
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: <Text>{<UserAddOutlined />} Pais</Text>,
      dataIndex: 'username',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: <Text>{<CrownOutlined />} Estado</Text>,
      dataIndex: 'role',
      align: 'center',
      render: (role: Role) => <Text>{role?.name}</Text>,
    },
    {
      title: <Text>{<ShopFilled />} Creado Por</Text>,
      dataIndex: 'user',
      align: 'center',
      render: (user: User) => <Text>{user?.name}</Text>,
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
      render: () => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            disabled={false}
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
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[20, 20]} align="middle">
            <Col xs={24} md={8} lg={9} xl={6}>
              <FormItem label="Nombre" name="name">
                <Input placeholder="Nombre de la ciudad" />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={9} xl={6}>
              <FormItem label="Pais" name="country">
                <Input placeholder="Nombre del pais" />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={9} xl={6}>
              <FormItem label="Estado" name="state">
                <Input placeholder="Nombre del departamento" />
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
                  >
                    Buscar
                  </Button>
                  <Button style={styles.buttonR} htmlType="reset" onClick={() => onClear()}>
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
            <Col span={8}>
              <Button
                disabled={false}
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                onClick={() => {}}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={16} style={styles.alignText}>
              <Text strong>Total Encontrados:</Text> {data?.cities?.totalDocs}{' '}
              <Text strong>Páginas: </Text> {data?.cities?.page} / {data?.cities?.totalPages || 0}
            </Col>
            <Col span={24}>
              <Table
                onChange={handleChangeTable}
                columns={column}
                dataSource={data?.cities.docs}
                scroll={{ x: 1000 }}
                pagination={{
                  current: data?.cities?.page,
                  total: data?.cities?.totalDocs,
                }}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default CitiesList;
