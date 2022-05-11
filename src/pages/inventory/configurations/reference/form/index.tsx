import { ArrowLeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Affix,
  Avatar,
  Button,
  Card,
  Divider,
  Space,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { history } from 'umi';

import type { Product } from '@/graphql/graphql';
import FormGeneralData from '../components/FormGeneralData';
import FormPrice from '../components/FormPrice';
import FormSend from '../components/FormSend';
import FormAdd from '../components/FormAdd';

import style from './styles.less';

const Form = () => {
  const { Text } = Typography;
  const { TabPane } = Tabs;

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
  ];

  return (
    <PageContainer
      title={
        <Space align="center">
          {' '}
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
      <Tabs type="card" className={style.tabBackground}>
        <TabPane tab="Datos generales" key="1" className={style.tabPadding}>
          <FormGeneralData />
        </TabPane>
        <TabPane tab="Costos y Precios" key="2" className={style.tabPadding}>
          <FormPrice />
        </TabPane>
        <TabPane tab="Datos de envio" key="3" className={style.tabPadding}>
          <FormSend />
        </TabPane>
      </Tabs>
      <Card bordered={false}>
        <Divider>Productos</Divider>
        <FormAdd />
        <Table columns={columns} pagination={false} bordered />
        <Affix offsetBottom={20} className={style.buttonBottom}>
          <Button type="primary" onClick={() => {}}>
            Crear
          </Button>
        </Affix>
      </Card>
    </PageContainer>
  );
};

export default Form;
