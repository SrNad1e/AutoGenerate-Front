import {
  EditFilled,
  EyeFilled,
  PlusOutlined,
  PrinterFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
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
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import { useState } from 'react';

import CloseDay from '../components/DayClose';
import EditClose from '../components/EditClose';
import ViewClose from '../components/ViewClose';
import FormClosingZ from '../form';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { Text } = Typography;

const ClosingZList = () => {
  const [visible, setVisible] = useState(false);
  const [visibleNewClose, setVisibleNewClose] = useState(false);
  const [visibleEditClose, setVisibleEditClose] = useState(false);
  const [visibleViewClose, setVisibleViewClose] = useState(false);

  /**
   * Cierra el modal de arqueo de dinero
   */
  const closeModal = () => {
    setVisible(false);
  };

  /**
   * Cierra el modal de arqueo de dinero y abre el modal de creacion
   */
  const onOk = () => {
    setVisibleNewClose(true);
    closeModal();
  };

  /**
   * Cierra el modal de creacion
   */
  const closeNewClose = () => {
    setVisibleNewClose(false);
  };

  /**
   * Cierra el modal de edicion
   */
  const closeEditClose = () => {
    setVisibleEditClose(false);
  };

  /**
   * Cierra el modal de la vista
   */
  const closeViewClose = () => {
    setVisibleViewClose(false);
  };

  const test = [
    {
      code: 123,
      shop: 'Gucci',
      createdAt: '2022-05-04T18:10:20.727Z',
      total: 100000,
      status: { name: 'Completo', color: 'green' },
      name: 'Dio Brandon',
      fixedByName: 'Jotaro',
    },
    {
      code: 321,
      shop: 'Louis XVI',
      createdAt: '2022-05-04T18:10:20.727Z',
      total: 200000,
      status: { name: 'Incompleto', color: 'red' },
      name: 'Jotaro Kujo',
      fixedByName: 'Dio',
    },
  ];

  const column = [
    {
      title: 'Código',
      dataIndex: 'code',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Tienda',
      dataIndex: 'shop',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: 'Fecha cierre',
      dataIndex: 'createdAt',
      sorter: true,
      showSorterTooltip: false,
      render: (createdAt: Date) => <span>{moment(createdAt).format(FORMAT_DATE)}</span>,
    },
    {
      title: 'Total Ingresos',
      dataIndex: 'total',
      sorter: true,
      showSorterTooltip: false,
      align: 'right',
      render: (total: number) => numeral(total).format('$ 0,0'),
    },
    {
      title: 'Total Facturas',
      dataIndex: 'total',
      sorter: true,
      showSorterTooltip: false,
      align: 'right',
      render: (total: number) => numeral(total).format('$ 0,0'),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: string | any) =>
        status ? <Tag color={status.color}> {status.name}</Tag> : '',
    },
    {
      title: 'Consignaciones',
      dataIndex: '',
      align: 'center',
      render: () => (
        <>
          {1} / {1}
        </>
      ),
    },
    {
      title: 'Registrado Por',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Modificado Por',
      dataIndex: 'fixedByName',
      align: 'center',
      render: (fixedByName: string) => fixedByName || '(Sin Modificar)',
    },
    {
      title: 'Acción',
      dataIndex: '_id',
      align: 'center',
      fixed: 'right',
      render: () => (
        <Row gutter={10}>
          <Col span={8}>
            <Tooltip title="Editar" placement="topLeft">
              <Button
                onClick={() => setVisibleEditClose(true)}
                type="primary"
                icon={<EditFilled />}
              />
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Ver Cierre" placement="topLeft">
              <Button
                onClick={() => setVisibleViewClose(true)}
                type="primary"
                icon={<EyeFilled />}
              />
            </Tooltip>
          </Col>
          <Col span={8}>
            <Tooltip title="Imprimir" placement="topLeft">
              <Button type="primary" icon={<PrinterFilled />} />
            </Tooltip>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form>
          <Row gutter={[20, 0]}>
            <Col xs={11} md={9} lg={9} xl={9}>
              <FormItem label="Fecha de Cierre">
                <DatePicker placeholder="Seleccione una fecha" style={{ width: '100%' }} />
              </FormItem>
            </Col>
            <Col xs={13} md={7} lg={5} xl={5}>
              <FormItem label="Codigo">
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} md={8} lg={8} xl={5}>
              <FormItem label="Tienda">
                <Select showSearch placeholder="Seleccione una tienda">
                  <Option value="Gucci">Gucci</Option>
                  <Option value="Toulouse">Toulouse</Option>
                  <Option>Louis Vuitton</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={7} lg={7} xl={5}>
              <FormItem label="Estado">
                <Select placeholder="Estado">
                  <Option value="Completo">Completo</Option>
                  <Option value="Incompleto">Incompleto</Option>
                  <Option>Verificado</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={17} lg={17} xl={24}>
              <FormItem label=" " colon={false}>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary">
                    Buscar
                  </Button>
                  <Button>Limpiar</Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Divider style={styles.dividerMargin} />
        <Row>
          <Col xs={12} md={15} lg={15}>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setVisible(true)}
              shape="round"
              type="primary"
            >
              Nuevo
            </Button>
          </Col>
          <Col xs={12} md={9} lg={9}>
            <Space>
              <Text strong>Total Encontrados:</Text>
              <Text>10</Text>
              <Text strong>Pagina:</Text>
              <Text>1/1</Text>
            </Space>
          </Col>
        </Row>
      </Card>
      <Card bordered={false} bodyStyle={styles.bodyPadding}>
        <Table columns={column} scroll={{ x: 1350 }} dataSource={test} />
      </Card>
      <FormClosingZ visible={visible} onCancel={closeModal} onOk={onOk} />
      <CloseDay visible={visibleNewClose} onCancel={closeNewClose} />
      <EditClose visible={visibleEditClose} onCancel={closeEditClose} />
      <ViewClose visible={visibleViewClose} onCancel={closeViewClose} />
    </PageContainer>
  );
};

export default ClosingZList;
