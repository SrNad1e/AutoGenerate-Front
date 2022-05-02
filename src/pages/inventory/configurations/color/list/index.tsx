import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import FormItem from 'antd/lib/form/FormItem';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';

import { useGetColors } from '@/hooks/color.hooks';
import { useEffect, useState } from 'react';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import moment from 'moment';
import { history, useLocation } from 'umi';
import CreateColors from '@/components/CreateColors';

import styles from './styles.less';

type FormData = {
  name?: string;
  active?: boolean;
};

type InputRequest = {
  name?: string;
  active?: boolean;
  limit?: number;
  sort?: Record<string, number>;
  page?: number;
};

const ColorsList = () => {
  const [colors, setColors] = useState<Partial<COLOR.Color[]>>([]);
  const [color, setColor] = useState<Partial<COLOR.Color>>({});
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
  const [sorterTable, setSorterTable] = useState<SorterResult<InputRequest>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const { Text } = Typography;
  const [form] = Form.useForm();
  const location = useLocation();

  /** Funciones ejecutadas por los hooks */

  /**
   * @description se encarga de almacenar los datos de la consulta
   * @param data respuesta de la consulta
   */
  const resultColors = (data: Partial<COLOR.ResponsePaginate>) => {
    setColors(data.docs || []);
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

  const { getColors, loading } = useGetColors(resultColors, showError);

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
   * @description se encarga de ejecutar la funcion para obtener los colores
   * @param values Variables para ejecutar la consulta
   */
  const onSearch = (values?: InputRequest) => {
    getColors({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };

  /**
   * @description se encarga de abrir el modal de actualizacion o creacion del color
   * @param colorData propiedades del objeto para setear
   */
  const visibleModal = (colorData: Partial<COLOR.Color>) => {
    setColor(colorData || {});
    setVisible(true);
  };

  /**
   * @description se encarga de cerrar el modal de actualizacion o creacion del color
   */
  const closeModal = async () => {
    await setColor({});
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
    sorter: SorterResult<Partial<COLOR.Color>>,
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
            <Input placeholder="Nombre del color" autoComplete="off" />
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

  const columns: ColumnsType<Partial<COLOR.Color>> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      sorter: true,
      sortOrder: sorterTable?.field === 'name' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (name: string, values) => (
        <>
          <Avatar
            style={{
              border: values.image ? 'solid 1px black' : '',
              backgroundColor: 'white',
            }}
          />
          <Avatar
            style={{ backgroundColor: values.html, border: 'solid 1px black', marginLeft: 10 }}
            shape="square"
          />
          <Text style={{ marginLeft: 10 }}>{name}</Text>
        </>
      ),
    },
    {
      title: 'Nombre Interno',
      dataIndex: 'name_internal',
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
      filterMultiple: false,
      filteredValue: filterTable?.active || null,
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
      title: 'Fecha Creación',
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'createdAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'updatedAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (updatedAt: string) => <span>{moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Acción',
      dataIndex: '_id',
      align: 'center',
      render: (_: string, colorID) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            onClick={() => visibleModal(colorID)}
            style={{ backgroundColor: '#dc9575' }}
            icon={<EditOutlined style={{ color: 'white' }} />}
          />
        </Tooltip>
      ),
    },
  ];

  const totalPages = Math.ceil((pagination.total || 0) / (pagination.pageSize || 0));

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            Colores
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
                onClick={() => visibleModal(color)}
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
            dataSource={colors}
            pagination={pagination}
            loading={loading}
            onChange={handleChangeTable}
          />
        </div>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <CreateColors modalVisible={visible} onCancel={closeModal} current={color} />
    </PageContainer>
  );
};

export default ColorsList;
