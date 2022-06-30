/* eslint-disable react-hooks/exhaustive-deps */
import Filters from '@/components/Filters';
import {
  CalendarOutlined,
  ClearOutlined,
  DropboxOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
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
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

import styles from '../styles';
import type { ColumnsType } from 'antd/lib/table';
import type {
  FiltersWarehousesInput,
  ResponseWarehouses,
  User,
  Warehouse,
} from '@/graphql/graphql';
import { useGetWarehouses } from '@/hooks/warehouse.hooks';
import type { ApolloError } from '@apollo/client';
import type { Location } from 'umi';
import { useHistory, useLocation } from 'umi';
import type { FilterValue, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import WarehouseForm from '../form';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name?: string;
  active?: boolean;
};

const WarehouseList = () => {
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visible, setVisible] = useState(false);
  const [warehouseData, setWarehouseData] = useState<Partial<Warehouse>>({});

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

  /**
   * @description controla el error de permisos en las bodegas
   * @param e Error de apollo
   */
  const onError = (e: ApolloError) => {
    const { statusCode } = e?.graphQLErrors[0]?.extensions?.response as any;

    if (statusCode == 403) {
      setPropsAlertInformation({
        message: 'No tiene acceso a consultar bodegas',
        visible: true,
        type: 'error',
      });
    } else {
      setPropsAlertInformation({
        message: e?.graphQLErrors[0]?.message,
        visible: true,
        type: 'error',
      });
    }
  };

  const [getWarehouses, paramsGetWarehouse] = useGetWarehouses(onError);

  /**
   * @description se encarga de cerrar el modal de creacion
   */
  const closeModal = () => {
    setWarehouseData({});
    setVisible(false);
  };

  const visibleModal = (warehouse?: Warehouse) => {
    setWarehouseData(warehouse || {});
    setVisible(true);
  };

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
   * @description se encarga de ejecutar la funcion para obtener las devoluciones
   * @param values filtros necesarios para la busqueda
   */
  const onSearch = (values?: FiltersWarehousesInput) => {
    getWarehouses({
      variables: {
        input: {
          sort: { createdAt: -1 },
          ...values,
        },
      },
    });
  };

  /**
   * @description se encarga de setear los filtros en la url
   * @param valuesQuery filtros para setear en la url
   */
  const setQueryParams = (valuesQuery?: FiltersWarehousesInput) => {
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
   * @description ejecuta la busqueda con base a los filtros del formulario y formatea las fechas
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
    sorter: SorterResult<ResponseWarehouses> | SorterResult<ResponseWarehouses>[] | any,
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

  const columns: ColumnsType<Warehouse> = [
    {
      title: (
        <Text>
          <DropboxOutlined /> Nombre
        </Text>
      ),
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: (
        <Text>
          <UserOutlined /> Creado Por
        </Text>
      ),
      dataIndex: 'user',
      align: 'center',
      render: (user: User) => <Tag style={styles.tagStyle}>{user?.name}</Tag>,
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
      fixed: 'right',
      dataIndex: '_id',
      align: 'center',
      render: (_, warehouse) => {
        return (
          <Tooltip title="Editar Bodega">
            <Button
              type="primary"
              onClick={() => visibleModal(warehouse)}
              icon={<EditOutlined />}
            />
          </Tooltip>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={30}>
            <Col xs={24} md={7} lg={5} xl={5}>
              <FormItem label="Nombre" name="name">
                <Input placeholder="Ejem: Mayoristas" style={styles.allWidth} />
              </FormItem>
            </Col>
            <Col xs={24} md={4} lg={4} xl={5}>
              <FormItem>
                <Space>
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    style={styles.borderR}
                  >
                    Buscar
                  </Button>
                  <Button
                    htmlType="reset"
                    onClick={onClear}
                    style={styles.borderR}
                    icon={<ClearOutlined />}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 15]} align="middle" style={{ marginTop: 20 }}>
          <Col xs={8} md={15} lg={15}>
            <Button
              onClick={() => visibleModal()}
              icon={<PlusOutlined />}
              shape="round"
              type="primary"
              disabled={false}
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={16} md={9} lg={9} style={styles.texRigth}>
            <Space>
              <Text strong>Total Encontrados:</Text>
              <Text>{paramsGetWarehouse?.data?.warehouses?.totalDocs || 0}</Text>
              <Text strong>Pagina:</Text>
              <Text>
                {paramsGetWarehouse?.data?.warehouses?.page || 0}/{' '}
                {paramsGetWarehouse?.data?.warehouses?.totalPages || 0}
              </Text>
            </Space>
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={columns}
              scroll={{ x: 1000 }}
              pagination={{
                current: paramsGetWarehouse?.data?.warehouses?.page,
                total: paramsGetWarehouse?.data?.warehouses?.totalDocs,
              }}
              dataSource={paramsGetWarehouse?.data?.warehouses?.docs as any}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <WarehouseForm visible={visible} onCancel={closeModal} warehouseData={warehouseData} />
    </PageContainer>
  );
};

export default WarehouseList;
