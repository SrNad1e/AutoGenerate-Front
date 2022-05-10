/* eslint-disable react-hooks/exhaustive-deps */
import { EditOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';
import type { SorterResult } from 'antd/lib/table/interface';

import moment from 'moment';
import { useEffect, useState } from 'react';
import type { Location } from 'umi';
import { useLocation, history } from 'umi';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from './styles.less';
import CreateCategory from '../components/createCategories';
import { useGetCategories } from '@/hooks/category.hooks';
import type {
  CategoryLevel1,
  CategoryLevel2,
  CategoryLevel3,
  FiltersCategoriesInput,
} from '@/graphql/graphql';

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
  const [sorterTable, setSorterTable] = useState<SorterResult<FiltersCategoriesInput>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const { Text } = Typography;
  const [form] = Form.useForm();
  const location: Location = useLocation();

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
  ) => {
    setCategory(categoryData);
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
        break;
    }
    setVisible(true);
  };

  /**
   * @description se encarga de cerrar el modal de actualizacion o creacion de la categoria
   */
  const closeModal = async () => {
    await setCategory({});
    setVisible(false);
  };

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
    <Form layout="inline" onFinish={onFinish} form={form}>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <FormItem label="Nombre" name="name" style={{ width: 300 }}>
            <Input placeholder="" autoComplete="off" />
          </FormItem>
        </Col>
      </Row>
      <Col span={12}>
        <span className={styles.submitButtons}>
          <Button type="primary" htmlType="submit">
            Buscar
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onClear}>
            Limpiar
          </Button>
        </span>
      </Col>
    </Form>
  );

  const columns: ColumnsType<Partial<CategoryLevel1>> = [
    {
      title: 'Categoria',
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sorterTable.field === 'name' ? sorterTable.order : undefined,
    },
    {
      title: 'Fecha de creacion',
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sorterTable.field === 'createdAt' ? sorterTable.order : undefined,
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
    {
      title: 'Fecha de actualizacion',
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sorterTable.field === 'updatedAt' ? sorterTable.order : undefined,
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: 'Accion',
      align: 'center',
      dataIndex: '__typename',
      render: (val: string, categoryData) => (
        <>
          <Tooltip title="Editar" placement="topLeft">
            <Button
              onClick={() => visibleModal(categoryData)}
              style={{ backgroundColor: '#dc9575' }}
              icon={<EditOutlined style={{ color: 'white' }} />}
            />
          </Tooltip>
          {val !== 'CategoryLevel3' && (
            <>
              <Divider type="vertical" />
              <Tooltip title="Crear Subcategoria" placement="topLeft">
                <Button
                  onClick={() => visibleModal(categoryData)}
                  style={{ backgroundColor: '#dc9575' }}
                  icon={<PlusSquareOutlined style={{ color: 'white' }} />}
                />
              </Tooltip>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            Categorias
          </Title>
        </Space>
      }
    >
      <Card className={styles.tableList}>
        <div className={styles.tableListForm}>{renderFormSearch()}</div>
        <Row>
          <Col span={12} style={{ marginBottom: 10 }}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              onClick={() => visibleModal(category)}
            >
              Nuevo
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Text strong>Total Encontrados:</Text> {data?.categories.totalDocs}{' '}
            <Text strong>Páginas: </Text> {data?.categories.page} /{' '}
            {data?.categories.totalPages || 0}
          </Col>
        </Row>
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
        />
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <CreateCategory
        level={level}
        modalVisible={visible}
        onCancel={closeModal}
        current={category}
      />
    </PageContainer>
  );
};

export default CategoryList;
