import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {
  Col,
  Descriptions,
  Divider,
  Form,
  InputNumber,
  Row,
  Select,
  Switch,
  Table,
  Tag,
} from 'antd';
import moment from 'moment';
import numeral from 'numeral';

import styles from '../styles';

const { Option } = Select;
const DescriptionsItem = Descriptions.Item;
const FormItem = Form.Item;

const RenderStep2 = () => {
  const rowSelection = {
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Jotaro',
    }),
  };

  /**
   * Columna de productos de la factura
   */
  const data = [
    {
      key: 1,
      id: 1,
      name: 'Jotaro',
      reference: 1010101,
      product: { color: 'Rojo', talla: 'XL' },
      code: 1011010,
      quantity: 10,
      price: 10000,
      changeable: true,
    },
    {
      key: 2,
      id: 2,
      reference: 1010101,
      product: { color: 'Rojo', talla: 'XL' },
      code: 1011010,
      quantity: 10,
      price: 10000,
      changeable: false,
    },
  ];

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Referencia',
      dataIndex: 'reference',
    },
    {
      title: 'Color y Talla',
      dataIndex: 'product',
      render: (product: any) => (
        <>
          {product.color}/{product.talla}
        </>
      ),
    },
    {
      title: 'Codigo',
      dataIndex: 'code',
      render: (barcode: number) => <Tag>{barcode}</Tag>,
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      render: (price: number) => numeral(price).format('$ 0,0'),
      align: 'right',
    },
    {
      title: 'Cambiable',
      dataIndex: 'changeable',
      align: 'center',
      render: (changeable: boolean) =>
        changeable ? (
          <CheckCircleOutlined style={styles.checkStyle} />
        ) : (
          <CloseCircleOutlined style={styles.closeStyle} />
        ),
    },
    {
      title: 'Opciones',
      dataIndex: 'changeable',
      align: 'center',
      render: (changeable: boolean) => <Switch checked={changeable} onChange={() => {}} />,
    },
  ];

  /**
   * Columna de productos seleccionados
   */
  const dataSelected = [
    {
      id: 1,
      reference: 1010101,
      product: { color: 'Rojo', talla: 'XL' },
      code: 1011010,
      quantity: 10,
      price: 10000,
      changeable: true,
    },
    {
      id: 2,
      reference: 1010101,
      product: { color: 'Rojo', talla: 'XL' },
      code: 1011010,
      quantity: 10,
      price: 10000,
      changeable: false,
    },
  ];

  const columnsSelected = [
    {
      title: 'Id',
      dataIndex: 'id',
      onclick: () => console.log('Click'),
    },
    {
      title: 'Referencia',
      dataIndex: 'reference',
    },
    {
      title: 'Color y Talla',
      dataIndex: 'product',
      render: (product: any) => (
        <>
          {product.color}/{product.talla}
        </>
      ),
    },
    {
      title: 'Codigo',
      dataIndex: 'code',
      render: (barcode: number) => <Tag>{barcode}</Tag>,
    },
    {
      title: 'Motivo',
      dataIndex: 'returnType',
      width: 150,
      render: () => {
        return (
          <>
            {' '}
            <Select style={styles.allWidth}>
              <Option key="change" value="change">
                Cambio
              </Option>
              <Option key="warranty" value="warranty">
                Garantía
              </Option>
            </Select>
          </>
        );
      },
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      render: (quantity: number) => <InputNumber min={1} value={quantity} onChange={() => {}} />,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      align: 'right',
      render: (price: number) => numeral(price).format('$ 0,0'),
    },
  ];

  return (
    <>
      <Divider>Factura No.1</Divider>
      <Row justify="center" gutter={[0, 20]}>
        <Col span={24}>
          <Descriptions bordered size="small">
            <DescriptionsItem label="Cliente" span={1}>
              {'Dio Brandon'}
            </DescriptionsItem>
            <DescriptionsItem label="Documento" span={3}>
              {100101001}
            </DescriptionsItem>
            <DescriptionsItem label="Tienda" span={1}>
              {'Salvador'}
            </DescriptionsItem>
            <DescriptionsItem label="Total" span={3}>
              {numeral(10000).format('$ 0,0')}
            </DescriptionsItem>
            <DescriptionsItem label="Fecha" span={1}>
              {moment('2022-05-04T18:10:20.727Z').format('DD/MM/YYYY HH:mm:ss')}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col span={9}>
          <Form>
            <FormItem>
              <Select placeholder="Seleccionar Motivo" allowClear style={styles.allWidth}>
                <Option value="Cambio">Cambio</Option>
                <Option>Garantia</Option>
              </Select>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Divider orientation="left" style={styles.dividerMargin}>
        Productos De La Factura
      </Divider>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 'auto', x: 900 }}
      />
      <Divider orientation="left" style={styles.dividerMargin}>
        Productos Seleccionados
      </Divider>
      <Table
        columns={columnsSelected}
        dataSource={dataSelected}
        pagination={false}
        scroll={{ y: 'auto', x: 800 }}
      />
    </>
  );
};

export default RenderStep2;
