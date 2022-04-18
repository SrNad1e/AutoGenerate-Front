import { useGetColors } from '@/hooks/color.hooks';
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
import FormItem from 'antd/lib/form/FormItem';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState } from 'react';
import styles from './styles.less';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import moment from 'moment';
import { history, useLocation } from 'umi';
//import { SorterResult } from 'antd/lib/table/interface'

type FormData = {
  name?: string;
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

  const { Text } = Typography;
  const [form] = Form.useForm();
  const location = useLocation();

  const resultColors = (data: Partial<COLOR.ResponsePaginate>) => {
    setColors(data.docs || []);
    setPagination({ ...pagination, total: data.totalDocs });
  };

  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const { getColors, loading } = useGetColors(resultColors, showError);

  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const onSearch = (values?: InputRequest) => {
    getColors({
      variables: {
        input: values,
      },
    });
  };

  /**
   * @description esta funcion evalua los paramametros del formulario y ejecuta la busqueda
   * @param values valores del formulario
   */
  const onFinish = (values: FormData) => {
    const datos = Object.keys(values)
      .reduce((a, key) => (values[key] ? `${a}&${key}=${JSON.stringify(values[key])}` : a), '')
      .slice(1);

    onSearch(values);
    form.setFieldsValue(values);
    history.replace(`${location.pathname}?${datos}`);
  };

  const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    /*_: any,
        sorter: SorterResult<Partial<COLOR.Color>>,*/
  ) => {
    const { current } = paginationLocal;
    const prop = form.getFieldsValue();
    /*
        let sort = {};
        if (sorter.field) {
            sort = {
                [sorter.field]: sorter.order === 'ascend' ? 1 : -1,
            };
        } else {
            sort = {
                createdAt: -1,
            };
        }*/
    setPagination({ ...pagination, current });
    onSearch({ ...prop, page: current });
  };

  const onClear = () => {
    history.replace(location.pathname);
    form.resetFields();
    setPagination({
      total: 0,
      pageSize: 10,
      current: 1,
    });
    onSearch({});
  };

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

  useEffect(() => {
    const queryParams = location['query'];

    const params = {};

    Object.keys(queryParams).forEach((item) => {
      params[item] = JSON.parse(queryParams[item]);
    });
    form.setFieldsValue(params);
    onSearch(params);
  }, []);

  const columns: ColumnsType<Partial<COLOR.Color>> = [
    {
      title: 'Color',
      dataIndex: 'name',
      sorter: true,
      showSorterTooltip: false,
      render: (text, values) => (
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

          <Text style={{ marginLeft: 10 }}>{text}</Text>
        </>
      ),
    },
    {
      title: 'Nombre Interno',
      dataIndex: 'name_internal',
    },
    {
      title: 'Active',
      dataIndex: 'active',
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
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
    },
    {
      title: 'Fecha registro',
      dataIndex: 'Created_at',
      sorter: true,
      showSorterTooltip: false,
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Acción',
      render: () => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            style={{ backgroundColor: '#dc9575' }}
            icon={<EditOutlined style={{ color: 'white' }} />}
          />
        </Tooltip>
      ),
    },
  ];

  const totalPages = Math.ceil((pagination.total || 0) / (pagination.pageSize || 0));
  // crear variable para contener el total de colores encontrados

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
              <Button icon={<PlusOutlined />} type="primary" shape="round">
                Nuevo
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Text strong>Total Encontrados:</Text> {1} <Text strong>Páginas: </Text>
              {totalPages}
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
    </PageContainer>
  );
};

export default ColorsList;
