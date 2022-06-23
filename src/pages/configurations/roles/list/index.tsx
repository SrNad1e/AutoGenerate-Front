/* eslint-disable react-hooks/exhaustive-deps */
import type { ColumnsType } from 'antd/lib/table';
import {
  CrownOutlined,
  EditOutlined,
  FieldNumberOutlined,
  MoreOutlined,
  RetweetOutlined,
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
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type { SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';
import type { FiltersRolesInput, Role } from '@/graphql/graphql';
import { useGetRoles } from '@/hooks/rol.hooks';
import { useAccess, useHistory, useLocation } from 'umi';
import type { Location } from 'umi';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import Filters from '@/components/Filters';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from './styles';

const { Text } = Typography;

const FormItem = Form.Item;

type FormValues = {
  name?: string;
};

const RolesList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});

  const location: Location = useLocation();

  const {
    role: { canEdit },
  } = useAccess();

  const [form] = Form.useForm();
  const history = useHistory();

  const [getRoles, { data }] = useGetRoles();

  /**
   * @description se encarga de preparar los datos y realizar la consulta
   * @param params filtros para la consulta
   */
  const onSearch = (params?: FiltersRolesInput) => {
    getRoles({
      variables: {
        input: {
          ...params,
        },
      },
    });
  };

  /**
   * @description funcion usada para mostrar los errores
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
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersRolesInput) => {
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
   * @param value valores del formulario
   */
  const onFinish = (value: FormValues, pageCurrent?: number) => {
    const filters = { ...filterTable };

    const params: FiltersRolesInput = {
      page: pageCurrent || 1,
      limit: 10,
      ...value,
    };

    Object.keys(filters).forEach((i) => {
      if (filters[i] === null) {
        delete filters[i];
      } else {
        filters[i] = filters[i][0];
      }
    });
    onSearch({ ...filters, ...params });
    setQueryParams({ ...filters, ...value });
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
    sorter: SorterResult<Partial<Role>> | any,
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
    setFilterTable(filterArg);
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
  const loadingData = () => {
    const queryParams: any = location?.query;

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
    onFinish(params);
    setFilterTable(tableFilters);
  };

  useEffect(() => {
    loadingData();
  }, []);

  const column: ColumnsType<Role> = [
    {
      title: <>{<CrownOutlined />} Nombre</>,
      dataIndex: 'name',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (name: string) => <Tag style={styles.tagStyle}>{name}</Tag>,
    },
    {
      title: <>{<FieldNumberOutlined />} Permisos</>,
      dataIndex: 'permissions',
      align: 'center',
      render: (permissions) => permissions?.length,
    },
    {
      title: <>{<RetweetOutlined />} Cambia Bodega</>,
      dataIndex: 'changeWarehouse',
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (changeWarehouse: boolean) => {
        return (
          <Badge
            status={changeWarehouse ? 'success' : 'default'}
            text={changeWarehouse ? 'Si' : 'No'}
          />
        );
      },
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
      title: <>{<MoreOutlined />} Opciones</>,
      fixed: 'right',
      dataIndex: '_id',
      align: 'center',
      render: (_id) => (
        <Tooltip title="Editar">
          <Button
            disabled={!canEdit}
            type="primary"
            color="secondary"
            icon={<EditOutlined />}
            onClick={() => history.push(`/configurations/roles/${_id}`)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer title="Lista de roles">
      <Card>
        <Form layout="inline" form={form} onFinish={onFinish}>
          <FormItem label="Nombre" name="name">
            <Input placeholder="Nombre del rol" />
          </FormItem>
          <FormItem>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                style={styles.buttonR}
                icon={<SearchOutlined />}
              >
                Buscar
              </Button>
              <Button htmlType="reset" onClick={() => onClear()} style={styles.buttonR}>
                Limpiar
              </Button>
            </Space>
          </FormItem>
        </Form>
        <Row gutter={[0, 15]} align="middle" style={styles.marginFIlters}>
          <Col span={24} style={styles.alignText}>
            <Text strong>Total Encontrados: </Text> {data?.roles?.totalDocs}{' '}
            <Text strong>Páginas: </Text> {data?.roles?.page} / {data?.roles?.totalPages || 0}
          </Col>
          <Col span={24}>
            <Table
              onChange={handleChangeTable}
              columns={column}
              dataSource={data?.roles.docs}
              scroll={{ x: 'auto' }}
              pagination={{
                current: data?.roles?.page,
                total: data?.roles?.totalDocs,
              }}
            />
          </Col>
        </Row>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default RolesList;
