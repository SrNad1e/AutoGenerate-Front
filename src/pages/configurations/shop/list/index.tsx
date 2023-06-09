/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  EditOutlined,
  FileSyncOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  ShopOutlined,
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
import moment from 'moment';
import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import type { FilterValue, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import type { FiltersShopsInput, ResponseWarehouses, Shop } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';
import { useAccess, useHistory, useLocation, useModel } from 'umi';
import type { Location } from 'umi';
import { useGetShops } from '@/hooks/shop.hooks';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import Filters from '@/components/Filters';
import { StatusTypeShop } from '../shop.data';
import ShopForm from '../form';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name?: string;
};

const ShopList = () => {
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [shopData, setShopData] = useState<Partial<Shop>>({});

  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();
  const history = useHistory();
  const location: Location = useLocation();

  const {
    shop: { canCreate, canEdit },
  } = useAccess();

  const [getShops, paramsGetShops] = useGetShops();

  const { initialState } = useModel('@@initialState');
  const canQueryShops = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadConfigurationShops,
  );

  /**
   * @description abre el modal de edicion y setea la tienda
   * @param shop datos de la tienda
   */
  const visibleModal = (shop?: Shop) => {
    setShopData(shop || {});
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
   * @description se encarga de ejecutar la funcion para obtener las tiendas
   * @param values filtros necesarios para la busqueda
   */
  const onSearch = (values?: FiltersShopsInput) => {
    try {
      getShops({
        variables: {
          input: {
            limit: 10,
            sort: {
              createdAt: -1,
            },
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
  const setQueryParams = (valuesQuery?: FiltersShopsInput) => {
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
   * @description se encarga de cerrar el modal de creacion
   */

  const closeModal = async () => {
    // eslint-disable-next-line
    onClear();

    setShopData({});
    setVisible(false);
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

  useEffect(() => {
    if (!canQueryShops) {
      messageError('No tiene permisos para consultar las tiendas');
    }
  }, [canQueryShops]);

  const columns: ColumnsType<Shop> = [
    {
      title: (
        <Text>
          <ShopOutlined /> Nombre
        </Text>
      ),
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: <Text>{<FileSyncOutlined />} Estado</Text>,
      dataIndex: 'status',
      align: 'center',
      filteredValue: filterTable?.status || null,
      render: (status: string) => {
        const { color, label } = StatusTypeShop[status || ''];
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
      render: (_, shopId) => {
        return (
          <Tooltip title="Editar Tienda">
            <Button
              type="primary"
              onClick={() => visibleModal(shopId)}
              icon={<EditOutlined />}
              disabled={!canEdit}
              loading={paramsGetShops?.loading}
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
            <Col xs={24} md={9} lg={9} xl={7}>
              <FormItem label="Nombre" name="name">
                <Input placeholder="Ejem: Mayoristas" />
              </FormItem>
            </Col>
            <Col xs={24} md={4} lg={4} xl={5}>
              <FormItem>
                <Space>
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    loading={paramsGetShops?.loading}
                    htmlType="submit"
                    style={styles.buttonR}
                  >
                    Buscar
                  </Button>
                  <Button
                    htmlType="reset"
                    loading={paramsGetShops?.loading}
                    onClick={onClear}
                    style={styles.buttonR}
                    icon={<ClearOutlined />}
                  >
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row gutter={[0, 15]} align="middle" style={styles.marginFIlters}>
          <Col span={12}>
            <Button
              onClick={() => visibleModal()}
              icon={<PlusOutlined />}
              shape="round"
              disabled={!canCreate}
              loading={paramsGetShops?.loading}
              type="primary"
            >
              Nuevo
            </Button>
          </Col>
          <Col span={12} style={styles.alignText}>
            <Text strong>Total Encontrados:</Text> {paramsGetShops?.data?.shops?.totalDocs || 0}{' '}
            <Text strong>Pagina: </Text>
            {paramsGetShops?.data?.shops?.page || 0} /{paramsGetShops?.data?.shops?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={columns}
              scroll={{ x: 'auto' }}
              pagination={{
                current: paramsGetShops?.data?.shops?.page,
                total: paramsGetShops?.data?.shops?.totalDocs,
                showSizeChanger: false,
              }}
              loading={paramsGetShops?.loading}
              dataSource={paramsGetShops?.data?.shops?.docs as any}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />

      <ShopForm shop={shopData} visible={visible} onCancel={closeModal} getShops={getShops} />
    </PageContainer>
  );
};

export default ShopList;
