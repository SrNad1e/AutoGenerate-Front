import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import numeral from 'numeral';
import { useState } from 'react';
import {
  BarcodeOutlined,
  DeleteOutlined,
  EditOutlined,
  IdcardOutlined,
  PlusOutlined,
  RetweetOutlined,
  SaveOutlined,
} from '@ant-design/icons';

import SelectProducts from '@/components/SelectProducts';

import styles from '../styles';

const { Text } = Typography;
const FormItem = Form.Item;

const Products = () => {
  const [confirmProduct, setConfirmProduct] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const dataTest = [
    {
      id: 123,
      reference: { name: 'Susana BR', description: 'PantyMedia', barcode: 1010101, id: 1001001 },
      color: { name: 'Black' },
      size: 'XL',
      quantity: 10,
      price: 10000,
    },
  ];

  /**
   * Columna de productos
   */
  const column = [
    {
      title: 'Imagen',
      dateIndex: 'image',
      render: () => (
        <Image
          preview={false}
          height={50}
          width={50}
          src={
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/modern-pop-lofi-music-cover-art-design-template-f6db8ab55ee30bac80c523b3129a268d_screen.jpg?ts=1635274786'
          }
        />
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Referencia',
      dataIndex: 'reference',
      render: (reference: any) => (
        <Space direction="vertical" size={2}>
          <Text strong>{reference.name}</Text>
          <Tag style={styles.tagStyle}>{reference.description}</Tag>
          <Tag icon={<BarcodeOutlined />} style={styles.tagStyle}>
            {reference.barcode}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      render: (color: any) => (
        <>
          <Avatar
            size={10}
            style={{
              backgroundColor: 'black',
              border: 'solid 1px black',
              marginRight: 10,
            }}
          />
          <Text>{color.name}</Text>
        </>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'size',
    },
    {
      title: 'PVP',
      dataIndex: 'price',
      render: (price: number) => numeral(price).format('$ 0,0'),
    },
    {
      title: 'Precio Facturado',
      dataIndex: 'price',
      render: (price: number) => numeral(price).format('$ 0,0'),
    },
    {
      title: 'Precio Distribuidor',
      dataIndex: 'price',
      render: (price: number) => numeral(price).format('$ 0,0'),
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      render: (quantity: number) => <>{canEdit ? <InputNumber value={quantity} /> : quantity}</>,
    },
    {
      title: 'Opciones',
      dataIndex: '',
      fixed: 'right',
      align: 'center',
      render: () => (
        <Space>
          <Tooltip title="Editar Cantidad">
            <Button
              type="primary"
              onClick={() => setCanEdit(canEdit ? false : true)}
              icon={canEdit ? <SaveOutlined /> : <EditOutlined />}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Eliminar">
            <Button danger type="primary" onClick={() => {}} icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  /**
   * Columna de confirmacion de productos
   */
  const columnConfirm = [
    {
      title: 'Imagen',
      dataIndex: 'image',
      render: () => (
        <Image
          preview={false}
          height={50}
          width={50}
          src={
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/modern-pop-lofi-music-cover-art-design-template-f6db8ab55ee30bac80c523b3129a268d_screen.jpg?ts=1635274786'
          }
        />
      ),
    },
    {
      title: 'Referencia',
      dataIndex: 'reference',
      render: (reference: any) => (
        <Space direction="vertical" size={2}>
          <Text strong>{reference.name}</Text>
          <Tag style={styles.tagStyle}>{reference.description}</Tag>
          <Tag icon={<BarcodeOutlined />} style={styles.tagStyle}>
            {reference.barcode}
          </Tag>
          <Tag icon={<IdcardOutlined />} style={styles.tagStyle}>
            {reference.id}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      render: (color: any) => (
        <>
          <Avatar
            size={10}
            style={{
              backgroundColor: 'black',
              border: 'solid 1px black',
              marginRight: 10,
            }}
          />
          <Text>{color.name}</Text>
        </>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'size',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      align: 'center',
      width: 120,
      render: (price: number) => numeral(price).format('$ 0,0'),
    },
    {
      title: 'Precio Distribuidor',
      dataIndex: 'price',
      align: 'center',
      render: (price: number) => numeral(price).format('$ 0,0'),
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Cantidad Confirmada',
      dataIndex: 'quantity',
      align: 'center',
      render: (quantity: number) => (
        <Badge
          showZero
          style={{ backgroundColor: quantity > 0 ? 'green' : 'red' }}
          count={quantity}
        />
      ),
    },
  ];

  return (
    <>
      <Divider>
        <Switch
          onClick={() => setConfirmProduct(confirmProduct ? false : true)}
          checkedChildren="Confirmación de productos"
          unCheckedChildren="Resumen de productos"
        />
      </Divider>
      <Row gutter={[0, 20]}>
        <Col span={24}>
          {confirmProduct ? (
            <Form layout="vertical">
              <FormItem label="Código de barras :">
                <Space>
                  <Input style={styles.inputBorder} />
                  <Button type="primary" icon={<PlusOutlined />} />
                </Space>
              </FormItem>{' '}
              <Space>
                <Button type="primary" icon={<SaveOutlined />}>
                  Aprobar productos confirmados
                </Button>
                <Button type="primary" icon={<RetweetOutlined />}>
                  Reiniciar productos
                </Button>
              </Space>
            </Form>
          ) : (
            <SelectProducts />
          )}
        </Col>
        <Col span={24}>
          <Table
            columns={confirmProduct ? columnConfirm : column}
            dataSource={dataTest}
            scroll={{ x: 1600 }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Products;
