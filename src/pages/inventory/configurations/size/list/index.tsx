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
import FormItem from 'antd/lib/form/FormItem';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation, history } from 'umi';
import styles from './style.less';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useGetSizes } from '@/hooks/size.hooks';
//import { SorterResult } from "antd/lib/table/interface";
import AlertInformation from '@/components/Alerts/AlertInformation';
import CreateSize from '../components/CreateSize';

type FormData = {
  name?: string;
};

type InputVars = {
  name?: string;
  active?: boolean;
  limit?: number;
  sort?: Record<string, number>;
  page?: number;
};

const SizeList = () => {
  const [sizes, setSizes] = useState<Partial<SIZE.Size[]>>([]);
  const [size, setSize] = useState<Partial<SIZE.Size>>({});
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

  const { Text } = Typography;
  const [form] = Form.useForm();
  const location = useLocation();

  const resultSizes = (data: Partial<SIZE.ResponsePaginate>) => {
    setSizes(data.docs || []);
    setPagination({ ...pagination, total: data.totalDocs });
  };

  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const { getSizes, loading } = useGetSizes(resultSizes, showError);

  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const onSearch = (values?: InputVars) => {
    getSizes({
      variables: {
        input: values,
      },
    });
  };

  const visibleModal = (id?: SIZE.Size) => {
    setVisible(true);
    setSize({ _id: id?._id });
  };

  const closeModal = () => {
    setVisible(false);
  };

  const editColor = () => {
    setVisible(false);
  };

  const onFinish = (values: FormData) => {
    const datos = Object.keys(values)
      .reduce((a, key) => (values[key] ? `${a}&${key}=${JSON.stringify(values[key])}` : a), '')
      .slice(1);

    onSearch(values);
    form.setFieldsValue(values);
    history.replace(`${location.pathname}?${datos}`);
  };

  /*const handleChangeTable = (
    paginationLocal: TablePaginationConfig,
    _: any,
    sorter: SorterResult<Partial<SIZE.Size>>,
  ) => {
    const { current } = paginationLocal;
    const prop = form.getFieldsValue();

    let sort = {};

    if (sorter.field) {
      sort = {
        [sorter.field]: sorter.order === 'ascend' ? 1 : -1,
      };
    } else {
      sort = {
        createdAt: -1,
      };
    }
    setPagination({ ...pagination, current });
    onSearch({ ...prop, page: current });
  };*/

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
  };

  const renderFormSearch = () => {
    return (
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <FormItem label="Talla" name="name">
              {<Input placeholder="Talla" autoComplete="off" />}
            </FormItem>
          </Col>
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
        </Row>
      </Form>
    );
  };

  const columns: ColumnsType<Partial<SIZE.Size>> = [
    {
      title: 'Talla',
      dataIndex: 'value',
      sorter: true,
      showSorterTooltip: false,
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
      render: (_id: SIZE.Size) => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            onClick={() => visibleModal(_id)}
            style={{ backgroundColor: '#dc9575' }}
            icon={<EditOutlined style={{ color: 'white' }} />}
          />
        </Tooltip>
      ),
    },
  ];

  const totalPages = Math.ceil((pagination.total || 0) / (pagination.pageSize || 0));

  const data = () => {
    const queryParams = location['query'];

    const params = {};

    Object.keys(queryParams).forEach((item) => {
      params[item] = JSON.parse(queryParams[item]);
    });
    form.setFieldsValue(params);
    onSearch(params);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            Tallas
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
                onClick={() => visibleModal()}
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
            dataSource={sizes}
            pagination={pagination}
            loading={loading}
            onChange={handleChangeTable}
          />
        </div>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <CreateSize modalVisible={visible} onCancel={closeModal} current={size} onOk={editColor} />
    </PageContainer>
  );
};

export default SizeList;
