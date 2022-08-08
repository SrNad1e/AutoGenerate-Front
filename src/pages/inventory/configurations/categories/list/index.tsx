/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  EditOutlined,
  GatewayOutlined,
  MoreOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Row, Space, Table, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import type { Location } from 'umi';
import { useLocation, history, useAccess } from 'umi';
import type { ColumnsType, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import CreateCategory from '../components/createCategories';
import { useGetCategories } from '@/hooks/category.hooks';
import type {
  CategoryLevel1,
  CategoryLevel2,
  CategoryLevel3,
  FiltersCategoriesInput,
} from '@/graphql/graphql';

import styles from './styles.less';

const { Text, Title } = Typography;
const FormItem = Form.Item;

type FormData = {
  name?: string;
  active?: boolean;
};

const CategoryList = () => {
  const [category, setCategory] = useState<
    Partial<CategoryLevel1 | CategoryLevel2 | CategoryLevel3>
  >({});
  const [level, setLevel] = useState(1);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visible, setVisible] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [sorterTable, setSorterTable] = useState<SorterResult<FiltersCategoriesInput>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const [form] = Form.useForm();

  const location: Location = useLocation();

  const {
    categories: { canEdit, canCreate },
  } = useAccess();

  const [getCategories, { data, loading }] = useGetCategories();

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
   * @description se encarga de ejecutar la funcion para obtener las tallas
   * @param values Variables para ejecutar la consulta
   */
  const onSearch = (values?: FiltersCategoriesInput) => {
    try {
      getCategories({
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
   * @description se encarga de abrir el modal de actualizacion o creacion de la talla
   * @param categoryData propiedades del objeto para setear
   */
  const visibleModal = (
    categoryData: Partial<CategoryLevel1 | CategoryLevel2 | CategoryLevel3>,
    isNewLocal: boolean,
  ) => {
    setCategory(categoryData);
    setIsNew(isNewLocal);
    switch (categoryData?.__typename) {
      case 'CategoryLevel1':
        setLevel(1);
        setVisible(true);
        break;
      case 'CategoryLevel2':
        setLevel(2);
        setVisible(true);

        break;
      case 'CategoryLevel3':
        setLevel(3);
        setVisible(true);
        break;
      default:
        setLevel(1);
        setVisible(true);
        break;
    }
  };

  /**
   * @description se encarga de cerrar el modal de actualizacion o creacion de la categoria
   */
  const closeModal = async () => {
    await setCategory({});
    setVisible(false);
    history.replace(location.pathname);
    form.resetFields();
    setSorterTable({});
    setFilterTable({});
  };

  /**
   * @description se encarga de agregar los parámetros en la query
   * @param values filtros de parametros
   */
  const setQueryParams = (values?: FiltersCategoriesInput) => {
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
    sorter: SorterResult<Partial<CategoryLevel1>> | any,
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
    setSorterTable(sorter);
    setFilterTable(filterArg);
  };

  /**
   * @description se encarga de limpiar los estados e inicializarlos
   */
  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    onSearch({});
    setSorterTable({});
    setFilterTable({});
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const getFiltersQuery = () => {
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
  };

  useEffect(() => {
    getFiltersQuery();
  }, []);

  /**
   * @description se encarga de renderizar la interfaz de busqueda
   */
  const renderFormSearch = () => (
    <Form onFinish={onFinish} form={form}>
      <Row gutter={[8, 8]} align="middle">
        <Col xs={24} md={13} lg={10}>
          <FormItem label="Nombre" name="name">
            <Input
              placeholder="Nombre de la categoria"
              autoComplete="off"
              style={{ width: '100%' }}
            />
          </FormItem>
        </Col>
        <Col xs={24} md={8}>
          <FormItem label="">
            <Space>
              <Button
                style={{ borderRadius: 5 }}
                icon={<SearchOutlined />}
                type="primary"
                htmlType="submit"
                loading={loading}
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

  const columns: ColumnsType<Partial<CategoryLevel1>> = [
    {
      title: <Text>{<GatewayOutlined />} Categoria</Text>,
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sorterTable.field === 'name' ? sorterTable.order : undefined,
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha Creación</Text>,
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sorterTable.field === 'createdAt' ? sorterTable.order : undefined,
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha Actualización</Text>,
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sorterTable.field === 'updatedAt' ? sorterTable.order : undefined,
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: <Text>{<MoreOutlined />} Opciones</Text>,
      align: 'center',
      dataIndex: '__typename',
      fixed: 'right',
      render: (val: string, categoryData) => (
        <Space>
          <Tooltip title="Editar" placement="topLeft">
            <Button
              disabled={!canEdit}
              onClick={() => visibleModal(categoryData, false)}
              type="primary"
              loading={loading}
              icon={<EditOutlined />}
            />
          </Tooltip>
          {val !== 'CategoryLevel3' && (
            <Tooltip title="Crear Subcategoria" placement="topLeft">
              <Button
                disabled={!canCreate}
                loading={loading}
                onClick={() => visibleModal(categoryData, true)}
                type="primary"
                icon={<PlusSquareOutlined />}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4}>Categorias</Title>
        </Space>
      }
    >
      <Card className={styles.tableList}>
        <div className={styles.tableListForm}>{renderFormSearch()}</div>
        <Row gutter={[0, 20]} align="middle">
          <Col span={12}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              loading={loading}
              onClick={() => visibleModal({ __typename: 'CategoryLevel1' }, true)}
              disabled={!canCreate}
            >
              Nuevo
            </Button>
          </Col>
          <Col span={12} className={styles.alignRigth}>
            <Text strong>Total Encontrados:</Text> {data?.categories.totalDocs}{' '}
            <Text strong>Páginas: </Text> {data?.categories.page} /{' '}
            {data?.categories.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              rowKey="_id"
              expandable={{
                childrenColumnName: 'childs',
                expandedRowClassName: (/*record, index, indent*/) => {
                  return styles.prueba;
                },
              }}
              loading={loading}
              dataSource={data?.categories.docs}
              pagination={{
                current: data?.categories.page,
                total: data?.categories.totalDocs,
                showSizeChanger: false,
              }}
              onChange={handleChangeTable}
              scroll={{ x: 'auto' }}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <CreateCategory
        level={level}
        isNew={isNew}
        modalVisible={visible}
        onCancel={closeModal}
        current={category}
      />
    </PageContainer>
  );
};

export default CategoryList;
