import { useGetReferences } from '@/hooks/reference.hooks';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Badge, Button, Card, Col, Form, Input, Row, Space, Tooltip, TreeSelect } from 'antd';
import { Typography } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Table, { ColumnsType } from 'antd/lib/table';
import { SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { TreeNode } from 'antd/lib/tree-select';
import moment from 'moment';
import { useEffect, useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import styles from './styles.less';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useLocation, history } from 'umi';
import numeral from 'numeral';
import SelectBrand from '@/components/SelectBrand';

type FormData = {
  name?: string;
  brandId?: string;
  category?: string;
  active?: boolean;
};
type InputVars = {
  name?: string;
  active?: boolean;
  brand?: BRAND.Brand;
  category?: string;
  limit?: number;
  sort?: Record<string, number>;
  page?: number;
};

const ReferenceList = () => {
  const [references, setReferences] = useState<Partial<PRODUCT.Reference[]>>([]);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [sorterTable, setSorterTable] = useState<SorterResult<InputVars>>({});
  const [filterTable, setFilterTable] = useState<Record<string, any | null>>({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    showSizeChanger: false,
    total: 0,
    pageSize: 10,
    current: 1,
  });

  const { Title, Text } = Typography;
  const [form] = Form.useForm();
  const location = useLocation();

  const resultReferences = (data: Partial<PRODUCT.ResponsePaginate>) => {
    setReferences(data?.docs || []);
    setPagination({ ...pagination, total: data?.totalDocs });
  };

  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const { getReferences, loading } = useGetReferences(resultReferences, showError);

  const onSearch = (values?: InputVars) => {
    getReferences({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };

  const setQueryParams = (values?: any) => {
    try {
      const valuesForm = form.getFieldsValue(['name']);

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

  const onFinish = (values: Partial<FormData>) => {
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

  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    filterArg: Record<string, any>,
    sorter: SorterResult<Partial<PRODUCT.Reference>>,
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

  const columns: ColumnsType<Partial<PRODUCT.Reference>> = [
    {
      title: 'Referencia',
      dataIndex: 'name',
      sorter: true,
      sortOrder: sorterTable?.field === 'name' ? sorterTable.order : undefined,
      showSorterTooltip: false,
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      sorter: true,
      sortOrder: sorterTable?.field === 'description' ? sorterTable.order : undefined,
      showSorterTooltip: false,
    },
    {
      title: 'Costo',
      dataIndex: 'cost',
      sorter: true,
      sortOrder: sorterTable?.field === 'cost' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (cost: number) => <span>{numeral(cost).format('$ 0,0')}</span>,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      sorter: true,
      sortOrder: sorterTable?.field === 'price' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (price: number) => <span>{numeral(price).format('$ 0,0')}</span>,
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
      title: 'Fecha Creacion',
      dataIndex: 'createdAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'createdAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Fecha Actualizacion',
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'updatedAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Acción',
      dataIndex: '_id',
      align: 'center',
      render: () => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            onClick={() => {}}
            style={{ backgroundColor: '#dc9575' }}
            icon={<EditOutlined style={{ color: 'white' }} />}
          />
        </Tooltip>
      ),
    },
  ];

  const renderFormSearch = () => (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Col span={6}>
        <FormItem label="Nombre" name="name" style={{ width: 240 }}>
          <Input placeholder="Referencia, Descripción" autoComplete="off" />
        </FormItem>
      </Col>
      <Col span={6} style={{ paddingLeft: 20 }}>
        <FormItem label="Marca" name="brandId">
          <SelectBrand />
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem label="Categoria" name="category">
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Seleccionar Categoria"
            allowClear
          >
            <TreeNode value="parent 1" title="Categoria Nivel 1">
              <TreeNode value="parent 1-0" title="Categoria Nivel 2">
                <TreeNode value="leaf1" title="Categoria Nivel 3"></TreeNode>
              </TreeNode>
            </TreeNode>
          </TreeSelect>
        </FormItem>
      </Col>
      <Col span={6} style={{ paddingLeft: 20 }}>
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

  const totalPages = Math.ceil((pagination.total || 0) / (pagination.pageSize || 0));

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            Referencias
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
                onClick={() => history.push('/inventory/configurations/reference/modifyReference')}
              >
                Nueva Referencia
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>Total Encontrados:</Text> {pagination?.total}{' '}
              <Text strong>Páginas: </Text> {pagination.current} / {totalPages}
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={references}
            pagination={pagination}
            loading={loading}
            onChange={handleChangeTable}
          />
        </div>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default ReferenceList;
