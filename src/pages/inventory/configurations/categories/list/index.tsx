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
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';
import { SorterResult } from 'antd/lib/table/interface';

import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation, history } from 'umi';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from './styles.less';
import CreateCategory from '../components/createCategories';
import { useGetCategories } from '@/hooks/category.hooks';

type FormData = {
  name?: string;
  active?: boolean;
};

type InputVars = {
  name?: string;
  active?: boolean;
  limit?: number;
  sort?: Record<string, number>;
  page?: number;
};

const CategoryList = () => {
  const [categories, setCategories] = useState<Partial<CATEGORY.CategoryLevel1[]>>([]);
  const [category, setCategory] = useState<Partial<CATEGORY.CategoryLevel1>>({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    showSizeChanger: false,
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visible, setVisible] = useState(false);
  const [sorterTable, setSorterTable] = useState<SorterResult<InputVars>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const { Text } = Typography;
  const [form] = Form.useForm();
  const location = useLocation();

  /** Funciones ejecutadas por los hooks */

  /**
   * @description se encarga de almacenar los datos de la consulta
   * @param data respuesta de la consulta
   */
  const resultCategories = (data: Partial<CATEGORY.ResponsePaginate>) => {
    setCategories(data.docs || []);
    setPagination({ ...pagination, total: data.totalDocs });
  };

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

  /** Fin de Funciones ejecutadas por los hooks */

  /** Hooks para manejo de consultas */
  const { getCategories, loading } = useGetCategories(resultCategories, showError);
  /** Fin de Hooks para manejo de consultas */

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
  const onSearch = (values?: InputVars) => {
    getCategories({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };

  /**
   * @description se encarga de abrir el modal de actualizacion o creacion de la talla
   * @param categoryData propiedades del objeto para setear
   */
  const visibleModal = (categoryData: Partial<CATEGORY.CategoryLevel1>) => {
    setCategory(categoryData || {});
    setVisible(true);
  };

  /**
   * @description se encarga de cerrar el modal de actualizacion o creacion de la talla
   */
  const closeModal = async () => {
    await setCategory({});
    setVisible(false);
  };

  const setQueryParams = (values?: any) => {
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
    } catch (e) {
      console.log(e);
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

    /* onSearch({ ...filters, ...values });*/
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
    sorter: SorterResult<Partial<CATEGORY.CategoryLevel1>>,
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
    setPagination({ ...pagination, current });
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
    setPagination({
      total: 0,
      pageSize: 10,
      current: 1,
      showSizeChanger: false,
    });
    onSearch({});
    setSorterTable({});
    setFilterTable({});
  };

  /**
   * @description se encarga de cargar los datos con base a la query
   */
  const getFiltersQuery = () => {
    const queryParams = location['query'];
    const params = {};
    const tableFilters = {
      active: queryParams['active'] ? [queryParams['active'] === 'true'] : null,
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
            <Input placeholder="Categoria" autoComplete="off" />
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

  const columns: ColumnsType<Partial<CATEGORY.CategoryLevel1>> = [
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
      dataIndex: '_id',
      render: (_: string, CategoryID) => (
        <>
          <Tooltip title="Editar" placement="topLeft">
            <Button
              onClick={() => visibleModal(CategoryID)}
              style={{ backgroundColor: '#dc9575' }}
              icon={<EditOutlined style={{ color: 'white' }} />}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Crear Subcategoria" placement="topLeft">
            <Button
              onClick={() => visibleModal(category)}
              style={{ backgroundColor: '#dc9575' }}
              icon={<PlusSquareOutlined style={{ color: 'white' }} />}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const data: any = [];
  categories.map(() => {
    const datanew = {
      key: 1,
      name: 'Hola',
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      children: [
        {
          key: 5,
          name: 'PantyMedias',
          createdAt: '2022-04-26 00:00:00',
          updatedAt: '2022-04-26 00:00:00',
          children: [
            {
              key: 6,
              name: 'Tanga',
              createdAt: '2022-04-26 00:00:00',
              updatedAt: '2022-04-26 00:00:00',
            },
          ],
        },
      ],
    };
    data.push(datanew);
  }); /*{
      key: 1,
      name: categories.find(e => e?.name === 'Otros'),
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      children: [
        {
          key: 5,
          name: 'PantyMedias',
          createdAt: '2022-04-26 00:00:00',
          updatedAt: '2022-04-26 00:00:00',
          children: [
            {
              key: 6,
              name: 'Tanga',
              createdAt: '2022-04-26 00:00:00',
              updatedAt: '2022-04-26 00:00:00',
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: 'Bra',
      createdAt: '2022-04-26 00:00:00',
      updatedAt: '2022-04-26 00:00:00',
      description: 'Mundo',
      children: [
        {
          key: 7,
          name: 'Bra bacan',
          createdAt: '2022-04-26 00:00:00',
          updatedAt: '2022-04-26 00:00:00',
          children: [
            {
              key: 8,
              name: 'Brasier',
              createdAt: '2022-04-26 00:00:00',
              updatedAt: '2022-04-26 00:00:00',
            },
          ],
        },
      ],
    },*/

  const totalPages = Math.ceil((pagination.total || 0) / (pagination.pageSize || 0));

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
      <Card>
        <div className={styles.tableList}>
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
              <Text strong>Total Encontrados:</Text> {pagination?.total}{' '}
              <Text strong>Páginas: </Text> {pagination.current} / {totalPages}
            </Col>
          </Row>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => {
                return (
                  <Row>
                    <Col style={{ paddingLeft: 120 }} span={4}>
                      {record?.childs?.name}
                    </Col>
                    <Col style={{ paddingLeft: 145 }} span={8}>
                      {moment(record?.childs?.createdAt).format(FORMAT_DATE)}
                    </Col>
                    <Col style={{ paddingLeft: 110 }} span={8}>
                      {moment(record?.childs?.updatedAt).format(FORMAT_DATE)}
                    </Col>
                    <Col style={{ paddingLeft: 50 }} span={4}>
                      <Tooltip title="Editar" placement="topLeft">
                        <Button
                          onClick={() => {}}
                          style={{ backgroundColor: '#dc9575' }}
                          icon={<EditOutlined style={{ color: 'white' }} />}
                        />
                      </Tooltip>
                      <Divider type="vertical" />
                      <Tooltip title="Crear Subcategoria" placement="topLeft">
                        <Button
                          onClick={() => {}}
                          style={{ backgroundColor: '#dc9575' }}
                          icon={<PlusSquareOutlined style={{ color: 'white' }} />}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                );
              },
              rowExpandable: (record) => record.name !== 'hola',
            }}
            loading={loading}
            dataSource={data}
            pagination={pagination}
            onChange={handleChangeTable}
          />
        </div>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      {<CreateCategory modalVisible={visible} onCancel={closeModal} current={category} />}
    </PageContainer>
  );
};

export default CategoryList;
