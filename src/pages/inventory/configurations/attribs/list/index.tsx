/* eslint-disable react-hooks/exhaustive-deps */
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
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
import { useLocation, useHistory } from 'umi';
import type { TablePaginationConfig, SorterResult, ColumnsType } from 'antd/es/table/interface';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useGetAttribs } from '@/hooks/attrib.hooks';
import CreateAttrib from '@/components/CreateAttrib';
import type { Attrib, FiltersAttribsInput } from '@/graphql/graphql';

import styles from './styles.less';

const FormItem = Form.Item;

type FormData = {
  name?: string;
  active?: boolean;
};

const AttribsList = () => {
  const [attrib, setAttrib] = useState<Partial<Attrib>>({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visible, setVisible] = useState(false);
  const [sorterTable, setSorterTable] = useState<SorterResult<FiltersAttribsInput>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const { Text, Title } = Typography;

  const [form] = Form.useForm();

  const location: Location = useLocation();
  const history = useHistory();

  const [getAttribs, { data, loading }] = useGetAttribs();

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
   * @description se encarga de ejecutar la funcion para obtener los atributos
   * @param values Variables para ejecutar la consulta
   */
  const onSearch = (values?: FiltersAttribsInput) => {
    try {
      getAttribs({
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
   * @description se encarga de abrir el modal de actualizacion o creacion de los atributos
   * @param attribData propiedades del objeto para setear
   */
  const visibleModal = (attribData: Partial<Attrib>) => {
    setAttrib(attribData || {});
    setVisible(true);
  };

  /**
   * @description se encarga de cerrar el modal de actualizacion o creacion de los atributos
   */
  const closeModal = async () => {
    await setAttrib({});
    setVisible(false);
  };

  /**
   * @description se encarga de crear los parámetros para la url
   * @param values
   */
  const setQueryParams = (values?: FiltersAttribsInput) => {
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
    sorter: SorterResult<Partial<Attrib>> | any,
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
            <Input placeholder="Nombre" autoComplete="off" />
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

  const columns: ColumnsType<Partial<Attrib>> = [
    {
      title: 'Nombre',
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
      render: (_: string, AttribID) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            onClick={() => visibleModal(AttribID)}
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
            Atributos
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
                onClick={() => visibleModal(attrib)}
              >
                Nuevo
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>Total Encontrados:</Text> {data?.attribs?.totalDocs}{' '}
              <Text strong>Páginas: </Text> {data?.attribs?.page} / {data?.attribs?.totalPages || 0}
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data?.attribs?.docs}
            pagination={{
              current: data?.attribs?.page,
              total: data?.attribs?.totalDocs,
            }}
            loading={loading}
            onChange={handleChangeTable}
          />
        </div>
      </Card>
      <CreateAttrib modalVisible={visible} onCancel={closeModal} current={attrib} />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default AttribsList;
