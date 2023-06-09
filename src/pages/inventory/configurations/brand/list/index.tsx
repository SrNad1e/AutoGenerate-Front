/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  SketchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { TablePaginationConfig } from 'antd';
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
import type { Location } from 'umi';
import { useModel } from 'umi';
import { useHistory, useLocation, useAccess } from 'umi';
import type { ColumnsType, SorterResult } from 'antd/es/table/interface';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useGetBrands } from '@/hooks/brand.hooks';
import CreateBrands from '@/components/CreateBrand';
import type { Brand, FiltersBrandsInput } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';

import styles from './styles.less';
import Filters from '@/components/Filters';

const FormItem = Form.Item;

type FormData = {
  name?: string;
  active?: boolean;
};

const BrandsList = () => {
  const [brand, setBrand] = useState<Partial<Brand>>({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visible, setVisible] = useState(false);
  const [sorterTable, setSorterTable] = useState<SorterResult<FiltersBrandsInput>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const { Text, Title } = Typography;

  const [form] = Form.useForm();

  const location: Location = useLocation();
  const history = useHistory();

  const {
    brand: { canCreate, canEdit },
  } = useAccess();

  const [getBrands, { data, loading }] = useGetBrands();

  const { initialState } = useModel('@@initialState');
  const canQueryBrands = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadInventoryBrands,
  );

  /**
   * @description funcion usada por los hooks para mostrar los errores
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
   * @description se encarga de ejecutar la funcion para obtener las marcas
   * @param values Variables para ejecutar la consulta
   */
  const onSearch = (values?: FiltersBrandsInput) => {
    try {
      getBrands({
        variables: {
          input: {
            ...values,
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de abrir el modal de actualizacion o creacion de la marca
   * @param brandData propiedades del objeto para setear
   */
  const visibleModal = (brandData: Partial<Brand>) => {
    setBrand(brandData || {});
    setVisible(true);
  };

  /**
   * @description se encarga de cerrar el modal de actualizacion o creacion de la marca
   */
  const closeModal = async () => {
    await setBrand({});
    setVisible(false);
  };

  const setQueryParams = (values?: FiltersBrandsInput) => {
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
   * @param values valores del formulario
   */
  const onFinish = (values: FormData) => {
    const filters = { ...filterTable };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });

    onSearch({ ...filters, ...values });
    setQueryParams({
      ...values,
      ...filters,
    });
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
    sorter: SorterResult<Partial<Brand>> | any,
  ) => {
    const { current } = paginationLocal;
    const prop = form.getFieldsValue();

    const filters = { ...filterArg };

    try {
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
      setSorterTable(sorter);
      setFilterTable(filterArg);
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    try {
      history.replace(location.pathname);
      form.resetFields();
      onSearch({});
      setSorterTable({});
      setFilterTable({});
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const getFiltersQuery = () => {
    try {
      const queryParams: any = location.query;
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
      setFilterTable(tableFilters);
      onSearch(params);
    } catch (error: any) {
      showError(error?.message);
    }
  };

  useEffect(() => {
    getFiltersQuery();
  }, []);

  useEffect(() => {
    if (!canQueryBrands) {
      showError('No tiene permisos para consultar las marcas');
    }
  }, [canQueryBrands]);

  /**
   * @description se encarga de renderizar la interfaz de busqueda
   */
  const renderFormSearch = () => (
    <Form onFinish={onFinish} form={form}>
      <Row gutter={[8, 8]} align="middle">
        <Col xs={24} md={13} lg={10}>
          <FormItem label="Nombre" name="name">
            <Input placeholder="Nombre de la marca" autoComplete="off" style={{ width: '100%' }} />
          </FormItem>
        </Col>
        <Col xs={24} md={8}>
          <FormItem label="">
            <Space>
              <Button
                style={{ borderRadius: 5 }}
                icon={<SearchOutlined />}
                type="primary"
                loading={loading}
                htmlType="submit"
              >
                Buscar
              </Button>
              <Button
                style={{ borderRadius: 5 }}
                loading={loading}
                icon={<ClearOutlined />}
                onClick={onClear}
              >
                Limpiar
              </Button>
            </Space>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );

  const columns: ColumnsType<Partial<Brand>> = [
    {
      title: <Text>{<SketchOutlined />} Nombre</Text>,
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sorterTable.field === 'name' ? sorterTable.order : undefined,
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
      title: <Text>{<CalendarOutlined />} Fecha Registro</Text>,
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'createdAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: <Text>{<MoreOutlined />} Opción</Text>,
      dataIndex: '_id',
      align: 'center',
      render: (_: string, BrandID) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            disabled={!canEdit}
            loading={loading}
            onClick={() => visibleModal(BrandID)}
            type="primary"
            icon={<EditOutlined />}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4}>Marcas</Title>
        </Space>
      }
    >
      <Card>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{renderFormSearch()}</div>
          <Row gutter={[0, 15]} align="middle" style={{ marginTop: 20 }}>
            <Col span={12}>
              <Button
                disabled={!canCreate}
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                loading={loading}
                onClick={() => visibleModal(brand)}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={12} className={styles.alignRigth}>
              <Text strong>Total Encontrados:</Text> {data?.brands?.totalDocs || 0}{' '}
              <Text strong>Páginas: </Text> {data?.brands?.page || 0} /{' '}
              {data?.brands?.totalPages || 0}
            </Col>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={data?.brands?.docs}
                pagination={{
                  current: data?.brands?.page,
                  total: data?.brands?.totalDocs,
                  showSizeChanger: false,
                }}
                loading={loading}
                onChange={handleChangeTable}
              />
            </Col>
          </Row>
        </div>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <CreateBrands modalVisible={visible} onCancel={closeModal} current={brand} />
    </PageContainer>
  );
};

export default BrandsList;
