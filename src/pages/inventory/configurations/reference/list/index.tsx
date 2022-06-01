/* eslint-disable react-hooks/exhaustive-deps */
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
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
import type { ColumnsType, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { PageContainer } from '@ant-design/pro-layout';
import type { Location } from 'umi';
import { history, Link, useLocation } from 'umi';
import numeral from 'numeral';
import moment from 'moment';
import { useEffect, useState } from 'react';

import type { FiltersReferencesInput, Reference } from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import SelectBrand from '@/components/SelectBrand';
import EditModal from '../components/EditModal';
import { useGetReferences } from '@/hooks/reference.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';

import style from './styles.less';
import Filters from '@/components/Filters';

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

  const [getReferences, { data, loading }] = useGetReferences();

  /**
   * @description se encarga de preparar los datos y realizar la consulta
   * @param filters filtros para la consulta
   */
  const onSearch = (filters?: FiltersReferencesInput) => {
    getReferences({
      variables: {
        id: COMPANY_ID,
        input: { active: true, ...filters },
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
    sorter: SorterResult<Partial<Reference>> | any,
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

  useEffect(() => {
    onSearch();
    getFiltersQuery();
  }, []);

  const columns: ColumnsType<Partial<Reference>> = [
    {
      title: 'Referencia',
      dataIndex: 'name',
      sorter: true,
      width: 200,
      sortOrder: sorterTable?.field === 'name' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (name: string, reference) => (
        <>
          <Text>{name}</Text>
          <br />
          <Text>{reference?.description}</Text>
        </>
      ),
    },
    {
      title: 'Costo',
      dataIndex: 'cost',
      sorter: true,
      align: 'right',
      width: 120,
      sortOrder: sorterTable?.field === 'cost' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (cost: number) => <span>{numeral(cost).format('$ 0,0')}</span>,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      sorter: true,
      align: 'right',
      width: 120,
      sortOrder: sorterTable?.field === 'price' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (price: number) => <span>{numeral(price).format('$ 0,0')}</span>,
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      width: 120,
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
      title: 'Cambiable',
      dataIndex: 'changeable',
      width: 120,
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
      title: 'Fecha Actualización',
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      width: 180,
      sortOrder: sorterTable?.field === 'updatedAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Acción',
      dataIndex: '_id',
      align: 'center',
      width: 80,
      fixed: 'right',
      render: (id: string) => (
        <Tooltip title="Editar" placement="topLeft">
          <Link to={`/inventory/configurations/reference/${id}`}>
            <Button type="primary" icon={<EditOutlined />} />
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
        <Form layout="inline" form={form} onReset={onClear} onFinish={onFinish}>
          <Row gutter={[24, 18]}>
            <Col span={8}>
              <FormItem label="Nombre" name="name">
                <Input placeholder="Nombre, Descripción" autoComplete="off" disabled={loading} />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Marca" name="brandId">
                <SelectBrand disabled={loading} />
              </FormItem>
            </Col>
            <Col span={8}>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Buscar
                </Button>
                <Button htmlType="reset" loading={loading}>
                  Limpiar
                </Button>
              </Space>
            </Col>
            <Col span={12}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                shape="round"
                onClick={() => history.push('/inventory/configurations/reference/new')}
              >
                Nueva Referencia
              </Button>
            </Col>
            <Col span={12} className={style.textRight}>
              <Text>
                <Text strong>Total Encontrados:</Text> {data?.references?.totalDocs}{' '}
                <Text strong>Páginas:</Text> {data?.references.page} /{' '}
                {data?.references?.totalPages || 1}
              </Text>
            </Col>
          </Row>
        </Form>
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
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      {<EditModal />}
    </PageContainer>
  );
};

export default ReferenceList;
