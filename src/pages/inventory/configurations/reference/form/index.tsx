import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Affix,
  Avatar,
  Button,
  Card,
  Divider,
  Space,
  Table,
  Form,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { history } from 'umi';

import type { Product } from '@/graphql/graphql';
import FormGeneralData from '../components/FormGeneralData';
import FormShipping from '../components/FormShipping';
import FormCreateProduct from '../components/FormCreateProduct';

import styles from './styles';

const { Text } = Typography;
const { TabPane } = Tabs;

const FormReference = () => {
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
    } catch (e) {
      console.log(e);
    }
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'Imagen',
      dataIndex: 'images',
      render: () => <Avatar shape="square" size="large" />,
    },
    {
      title: 'Color',
      dataIndex: 'color.name',
      render: (name: string, values) => (
        <>
          <Avatar
            style={{
              border: values.color?.image ? 'solid 1px black' : '',
              backgroundColor: 'white',
            }}
          />
          <Avatar
            style={{
              backgroundColor: values.color?.html,
              border: 'solid 1px black',
              marginLeft: 10,
            }}
            shape="square"
          />
          <Text style={{ marginLeft: 10 }}>{name}</Text>
        </>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'size.value',
    },
    {
      title: 'EAN',
      dataIndex: 'barcode',
      render: (text: string) => (text && text !== '' ? text : '(Pendiente)'),
    },
    {
      title: 'Acciones',
      dataIndex: '_id',
      render: () => (
        <Tooltip title="Eliminar" placement="topLeft">
          <Button danger onClick={() => {}} type="primary" icon={<DeleteOutlined />} />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer
      title={
        <Space align="center">
          <Tooltip title="Atrás">
            <Button
              type="primary"
              ghost
              icon={<ArrowLeftOutlined />}
              onClick={() => history.goBack()}
            />
          </Tooltip>
          <Divider type="vertical" />
          Nueva Referencia
        </Space>
      }
    >
      <Card bordered={false}>
        <Form form={form}>
          <Tabs type="card">
            <TabPane tab="Datos generales" key="1">
              <FormGeneralData />
            </TabPane>
            <TabPane tab="Datos de envio" key="2">
              <FormShipping />
            </TabPane>
          </Tabs>
        </Form>
        <Divider>Productos</Divider>
        <FormCreateProduct />
        <Divider />
        <Table columns={columns} pagination={false} bordered />
        <Affix offsetBottom={0}>
          <Card bodyStyle={styles.bodyStyle} size="small">
            <Button type="primary" onClick={onFinish}>
              Crear
            </Button>
          </Card>
        </Affix>
      </Card>
    </PageContainer>
  );
};

export default FormReference;
