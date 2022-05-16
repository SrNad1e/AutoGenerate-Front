import SelectWarehouses from '@/components/SelectWarehouses';
import { EyeOutlined, PlusOutlined, PrinterFilled, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { history } from 'umi';

import { StatusType } from '../tranfer.data';

import styles from './styles.less';
import './styles.less';

const FormItem = Form.Item;
const { Option } = Select;
const { Text } = Typography;

const { RangePicker } = DatePicker;

const TransferList = () => {
  const columns: ColumnsType = [
    {
      title: 'Número',
      dataIndex: 'number',
      align: 'center',
    },
    {
      title: 'Origen',
      dataIndex: 'warehouseOrigin',
      align: 'center',
      render: (warehouseOrigin) => warehouseOrigin.name,
    },
    {
      title: 'Destino',
      dataIndex: 'warehouseDestination',
      align: 'center',
      render: (warehouseDestination) => warehouseDestination.name,
    },
    {
      title: 'Referencias',
      dataIndex: 'detail',
      align: 'center',
      render: (detail) => detail.length,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => {
        const { color, text } = StatusType[status || ''];
        return <Badge color={color} text={text} />;
      },
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      align: 'center',
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
    {
      title: 'Actualizado',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (updatedAt: Date) => moment(updatedAt).format(FORMAT_DATE),
    },
    {
      title: 'Acciones',
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: (_id: string) => {
        return (
          <Space>
            <Tooltip title="Ver">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => history.push(`/inventory/transfer/${_id}`)}
              />
            </Tooltip>
            <Space>
              <Tooltip title="Imprimir">
                <Button
                  type="ghost"
                  style={{ backgroundColor: 'white' }}
                  onClick={() => {}}
                  icon={<PrinterFilled />}
                />
              </Tooltip>
            </Space>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form layout="inline" className={styles.filters}>
          <Row gutter={[20, 20]} className={styles.form}>
            <Col xs={24} md={5} lg={5}>
              <FormItem label="Número" name="number">
                <Input className={styles.item} />
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={6}>
              <FormItem label="Estado" name="status">
                <Select className={styles.item}>
                  {Object.keys(StatusType).map((key) => (
                    <Option key={key}>{StatusType[key].text}</Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={6} lg={5}>
              <FormItem label="Tipo" name="type">
                <Select className={styles.item}>
                  <Option key="sent">Enviados</Option>
                  <Option key="received">Recibidos</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7}>
              <FormItem label="Bodega" name="warehouse">
                <SelectWarehouses />
              </FormItem>
            </Col>
            <Col xs={24} md={12} lg={11}>
              <FormItem label="Fechas" name="dates">
                <RangePicker />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem>
                <Space className={styles.buttons}>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                    Buscar
                  </Button>
                  <Button htmlType="reset">Limpiar</Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Row>
          <Col span={18}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              onClick={() => history.push('/inventory/transfer/new')}
            >
              Nuevo
            </Button>
          </Col>
          <Col span={6}>
            <Text strong>Total Encontrados:</Text> {0} <Text strong>Páginas: </Text> {1} / {1}
          </Col>
        </Row>
      </Card>
      <Table scroll={{ x: 1200 }} columns={columns} />
    </PageContainer>
  );
};

export default TransferList;
