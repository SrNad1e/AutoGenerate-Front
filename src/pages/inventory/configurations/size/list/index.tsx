/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  EditOutlined,
  FontSizeOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
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
import type { Location } from 'umi';
import { useLocation, useHistory, useAccess } from 'umi';
import type { TablePaginationConfig, SorterResult, ColumnsType } from 'antd/es/table/interface';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useGetSizes } from '@/hooks/size.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import CreateSize from '@/components/CreateSize';
import type { FiltersSizesInput, Size } from '@/graphql/graphql';

import styles from './style.less';
import Filters from '@/components/Filters';

const FormItem = Form.Item;

type FormData = {
  name?: string;
  active?: boolean;
};

const SizesList = () => {
  const [size, setSize] = useState<Partial<Size>>({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visible, setVisible] = useState(false);
  const [sorterTable, setSorterTable] = useState<SorterResult<FiltersSizesInput>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const { Text, Title } = Typography;

  const [form] = Form.useForm();

  const location: Location = useLocation();
  const history = useHistory();

  const {
    size: { canCreate, canEdit },
  } = useAccess();

  const [getSizes, { data, loading }] = useGetSizes();

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
  const onSearch = (values?: FiltersSizesInput) => {
    try {
      getSizes({
        variables: {
          input: {
            sort: {
              weight: 1,
            },
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
   * @param sizeData propiedades del objeto para setear
   */
  const visibleModal = (sizeData: Partial<Size>) => {
    setSize(sizeData || {});
    setVisible(true);
  };

  /**
   * @description se encarga de cerrar el modal de actualizacion o creacion de la talla
   */
  const closeModal = async () => {
    await setSize({});
    setVisible(false);
  };

  const setQueryParams = (values?: FiltersSizesInput) => {
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

    setQueryParams({
      ...values,
      ...filters,
    });
    onSearch({ ...filters, ...values });
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
    sorter: SorterResult<Partial<Size>> | any,
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
    setSorterTable(sorter);

    if (sort['value']) {
      sort['weight'] = sort['value'];
      delete sort['value'];
    }

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
          <FormItem label="Valor" name="name">
            <Input placeholder="Valor de la talla" autoComplete="off" style={{ width: '100%' }} />
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

  const columns: ColumnsType<Partial<Size>> = [
    {
      title: <Text>{<FontSizeOutlined />} Valor</Text>,
      dataIndex: 'value',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sorterTable.field === 'value' ? sorterTable.order : undefined,
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
      title: <Text>{<CalendarOutlined />} Fecha Creación</Text>,
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'createdAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha Actualización</Text>,
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'updatedAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (updatedAt: string) => <span>{moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: <Text>{<MoreOutlined />} Opción</Text>,
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_: string, SizeID) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            disabled={!canEdit}
            loading={loading}
            onClick={() => visibleModal(SizeID)}
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
          <Title level={4}>Tallas</Title>
        </Space>
      }
    >
      <Card>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{renderFormSearch()}</div>
          <Row gutter={[0, 20]} align="middle">
            <Col span={11}>
              <Button
                disabled={!canCreate}
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                loading={loading}
                onClick={() => visibleModal(size)}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={13} className={styles.alignRigth}>
              <Text strong>Total Encontrados:</Text> {data?.sizes?.totalDocs}{' '}
              <Text strong>Páginas: </Text> {data?.sizes?.page} / {data?.sizes?.totalPages || 0}
            </Col>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={data?.sizes?.docs}
                pagination={{
                  current: data?.sizes?.page,
                  total: data?.sizes?.totalDocs,
                  showSizeChanger: false,
                }}
                loading={loading}
                onChange={handleChangeTable}
                scroll={{ x: 'auto' }}
              />
            </Col>
          </Row>
        </div>
      </Card>
      <CreateSize modalVisible={visible} onCancel={closeModal} current={size} />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default SizesList;
