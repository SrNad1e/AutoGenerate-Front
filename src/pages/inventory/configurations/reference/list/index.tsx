/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarOutlined,
  ClearOutlined,
  DollarCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  MoreOutlined,
  PlusOutlined,
  RetweetOutlined,
  SearchOutlined,
} from '@ant-design/icons';
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
import type { ColumnsType, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { PageContainer } from '@ant-design/pro-layout';
import type { Location } from 'umi';
import { useModel } from 'umi';
import { history, Link, useLocation, useAccess } from 'umi';
import numeral from 'numeral';
import moment from 'moment';
import { useEffect, useState } from 'react';

import type { FiltersReferencesInput, Reference } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import SelectBrand from '@/components/SelectBrand';
import EditModal from '../components/EditModal';
import { useGetReferences } from '@/hooks/reference.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import Filters from '@/components/Filters';

import style from './styles.less';
import styles from './styles';

const { Title, Text } = Typography;
const FormItem = Form.Item;

type FormData = {
  name?: string;
  brandId?: string;
};

const ReferenceList = () => {
  const [sorterTable, setSorterTable] = useState<SorterResult<FiltersReferencesInput>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const location: Location = useLocation();

  const [form] = Form.useForm();

  const {
    reference: { canEdit, canCreate },
  } = useAccess();

  const [getReferences, { data, loading }] = useGetReferences();

  const { initialState } = useModel('@@initialState');
  const canQueryReference = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadInventoryReferences,
  );

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
   * @description se encarga de preparar los datos y realizar la consulta
   * @param filters filtros para la consulta
   */
  const onSearch = (filters?: FiltersReferencesInput) => {
    try {
      getReferences({
        variables: {
          id:
            initialState?.currentUser?.username !== USER_ADMIN
              ? initialState?.currentUser?.company?._id || ''
              : '',
          input: { ...filters },
        },
      });
    } catch (error: any) {
      showError(error.message);
    }
  };

  /**
   * @description se encarga de señalar los datos a la query
   * @param values valores para enviar a la query
   */
  const setQueryParams = (values?: FiltersReferencesInput) => {
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

  /**
   * @description esta funcion evalua los paramametros del formulario y ejecuta la busqueda
   * @param values valores del formulario
   */
  const onFinish = (values: FormData) => {
    const filters = { ...filterTable };
    try {
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
    } catch (error: any) {
      showError(error.message);
    }
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
    sorter: SorterResult<Partial<Reference>> | any,
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

  useEffect(() => {
    onSearch();
    getFiltersQuery();
  }, []);

  useEffect(() => {
    if (!canQueryReference) {
      showError('No tiene permisos para consultar las referencias');
    }
  }, [canQueryReference]);

  const columns: ColumnsType<Partial<Reference>> = [
    {
      title: <Text>{<FileTextOutlined />} Referencia</Text>,
      dataIndex: 'name',
      sorter: true,
      sortOrder: sorterTable?.field === 'name' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (name: string, reference) => (
        <>
          <Tag style={styles.tagStyle}>{name}</Tag>
          <br />
          <Text>{reference?.description}</Text>
        </>
      ),
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Costo
        </Text>
      ),
      dataIndex: 'cost',
      sorter: true,
      align: 'center',
      sortOrder: sorterTable?.field === 'cost' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (cost: number) => <span>{numeral(cost).format('$ 0,0')}</span>,
    },
    {
      title: (
        <Text>
          <DollarCircleOutlined /> Precio
        </Text>
      ),
      dataIndex: 'price',
      sorter: true,
      align: 'center',
      sortOrder: sorterTable?.field === 'price' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (price: number) => <span>{numeral(price).format('$ 0,0')}</span>,
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      align: 'center',
      filteredValue: filterTable?.active || null,
      filterDropdown: (props) => (
        <Filters
          props={props}
          data={[
            {
              text: 'Activo',
              value: true,
            },
            {
              text: 'Inactivo',
              value: false,
            },
          ]}
        />
      ),
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
    },
    {
      title: (
        <Text>
          <RetweetOutlined /> Cambiable
        </Text>
      ),
      dataIndex: 'changeable',
      align: 'center',
      filteredValue: filterTable?.changeable || null,
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
      render: (changeable: boolean) => {
        return (
          <Badge status={changeable ? 'success' : 'default'} text={changeable ? 'Si' : 'No'} />
        );
      },
    },
    {
      title: <Text>{<CalendarOutlined />} Fecha</Text>,
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
      render: (id: string) => (
        <Tooltip title="Editar" placement="topLeft">
          <Link to={`/inventory/configurations/reference/${id}`}>
            <Button type="primary" icon={<EditOutlined />} disabled={!canEdit} />
          </Link>
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4}>Referencias</Title>
        </Space>
      }
    >
      <Card>
        <Form layout="horizontal" form={form} onReset={onClear} onFinish={onFinish}>
          <Row gutter={[20, 0]}>
            <Col xs={24} md={8} lg={8} xl={7}>
              <FormItem label="Nombre" name="name">
                <Input placeholder="Nombre, Descripción" autoComplete="off" disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} xl={7}>
              <FormItem label="Marca" name="brandId">
                <SelectBrand disabled={loading} />
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={6} xl={5}>
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
                  htmlType="reset"
                  icon={<ClearOutlined />}
                >
                  Limpiar
                </Button>
              </Space>
            </Col>
          </Row>
          <Row gutter={[0, 15]} align="middle" style={{ marginTop: 20 }}>
            <Col span={12}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                loading={loading}
                disabled={!canCreate}
                onClick={() => history.push('/inventory/configurations/reference/new')}
              >
                Nueva Referencia
              </Button>
            </Col>
            <Col span={12} className={style.textRight}>
              <Text>
                <Text strong>Total Encontrados:</Text> {data?.references?.totalDocs || 0}{' '}
                <Text strong>Páginas:</Text> {data?.references?.page || 0} /{' '}
                {data?.references?.totalPages || 0}
              </Text>
            </Col>
            <Col span={24}>
              <Table
                loading={loading}
                dataSource={data?.references?.docs}
                scroll={{ x: 1200 }}
                pagination={{
                  current: data?.references?.page,
                  total: data?.references?.totalDocs,
                  showSizeChanger: false,
                }}
                columns={columns}
                onChange={handleChangeTable}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      {<EditModal />}
    </PageContainer>
  );
};

export default ReferenceList;
