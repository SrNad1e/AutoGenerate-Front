/* eslint-disable react-hooks/exhaustive-deps */
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
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
  Avatar,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import type { Location } from 'umi';
import { useHistory, useLocation } from 'umi';
import type { ColumnsType, SorterResult } from 'antd/es/table/interface';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useGetColors } from '@/hooks/color.hooks';
import CreateColors from '@/components/CreateColors';
import type { Color, FiltersColorsInput } from '@/graphql/graphql';

import styles from './styles.less';

const FormItem = Form.Item;

type FormData = {
  name?: string;
  active?: boolean;
};

const ColorsList = () => {
  const [color, setColor] = useState<Partial<Color>>({});
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
  const [sorterTable, setSorterTable] = useState<SorterResult<FiltersColorsInput>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const { Text, Title } = Typography;

  const [form] = Form.useForm();

  const location: Location = useLocation();
  const history = useHistory();

  const [getColors, { data, loading }] = useGetColors();

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
   * @description se encarga de ejecutar la funcion para obtener los colores
   * @param values Variables para ejecutar la consulta
   */
  const onSearch = (values?: FiltersColorsInput) => {
    try {
      getColors({
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
   * @description se encarga de abrir el modal de actualizacion o creacion del color
   * @param colorData propiedades del objeto para setear
   */
  const visibleModal = (colorData: Partial<Color>) => {
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
    sorter: SorterResult<Partial<Color>> | any,
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
            <Input placeholder="Color" autoComplete="off" />
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

  const columns: ColumnsType<Partial<Color>> = [
    {
      title: 'Color',
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
      title: 'Fecha registro',
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'createdAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
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
              <Text strong>Páginas: </Text> {pagination.current} / {data?.colors?.totalPages || 0}
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data?.colors?.docs as any}
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
