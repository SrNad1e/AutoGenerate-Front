import type { DetailOrder, Order, Product } from '@/graphql/graphql';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Col, Descriptions, Divider, Form, Row, Select, Switch, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import numeral from 'numeral';
import { useState } from 'react';
import SelectedProducts from '../SelectedProducts';

import styles from '../styles';

const { Option } = Select;
const DescriptionsItem = Descriptions.Item;
const FormItem = Form.Item;

type Props = {
  orderSelected?: Partial<Order>;
};

const RenderStep2 = ({ orderSelected }: Props) => {
  const [productsSelected, setProductsSelected] = useState<Partial<DetailOrder[]>>([]);

  const [form] = Form.useForm();

  const rowSelection = {
    onChange: (_: any, selectedRows: DetailOrder[]) => {
      const rows = selectedRows.map((product) => {
        const productFind = productsSelected.find(
          (item) => product?.product?._id === item?.product._id,
        );
        return {
          ...product,
          quantity: productFind?.quantity || 1,
          returnType: form.getFieldValue('returnType'),
        };
      });
      setProductsSelected(rows);
    },
    getCheckboxProps: (record: DetailOrder) => ({
      disabled: record.product.reference.changeable === true,
      name: record.product.reference.name,
    }),
  };

  const dataCustomer = orderSelected?.customer;

  const onChangeQuantity = (quantity: number, product: Product) => {
    const max =
      orderSelected?.details?.find((item) => item.product._id === product._id)?.quantity || 0;

    if (quantity <= max) {
      const productsChange = productsSelected.map((item) => {
        if (product._id === item?.product._id) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      });
      setProductsSelected(productsChange);
    }
  };

  /**
   * Columna de productos de la factura
   */
  const columns: ColumnsType<DetailOrder> = [
    {
      title: 'Referencia',
      dataIndex: 'product',
      render: (product: Product) => <>{product?.reference?.name}</>,
    },
    {
      title: 'Color y Talla',
      dataIndex: 'product',
      render: (product: Product) => (
        <>
          {product?.color?.name}/{product?.size?.value}
        </>
      ),
    },
    {
      title: 'Codigo',
      dataIndex: 'product',
      render: (product: Product) => <Tag>{product?.barcode}</Tag>,
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
      dataIndex: 'product',
      align: 'center',
      render: (product: Product) =>
        product.reference.changeable ? (
          <CheckCircleOutlined style={styles.checkStyle} />
        ) : (
          <CloseCircleOutlined style={styles.closeStyle} />
        ),
    },
    {
      title: 'Opciones',
      dataIndex: 'product',
      align: 'center',
      render: (product: Product) => (
        <Switch checked={product.reference.changeable} onChange={() => {}} />
      ),
    },
  ];

  return (
    <>
      <Divider>Pedido No. {orderSelected?.number}</Divider>
      <Row justify="center" gutter={[0, 20]}>
        <Col span={24}>
          <Descriptions bordered size="small">
            <DescriptionsItem label="Cliente" span={1}>
              {dataCustomer?.firstName} {dataCustomer?.lastName}
            </DescriptionsItem>
            <DescriptionsItem label="Documento" span={3}>
              {dataCustomer?.document}
            </DescriptionsItem>
            <DescriptionsItem label="Tienda" span={1}>
              {orderSelected?.shop?.name}
            </DescriptionsItem>
            <DescriptionsItem label="Total" span={3}>
              {numeral(orderSelected?.summary?.total).format('$ 0,0')}
            </DescriptionsItem>
            <DescriptionsItem label="Fecha" span={1}>
              {moment(orderSelected?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col span={9}>
          <Form form={form}>
            <FormItem name="returnType" initialValue="Cambio">
              <Select placeholder="Seleccionar Motivo" allowClear style={styles.allWidth}>
                <Option value="Cambio">Cambio</Option>
                <Option value="Garantia">Garantia</Option>
              </Select>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Divider orientation="left" style={styles.dividerMargin}>
        Productos Del Pedido
      </Divider>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={orderSelected?.details as any}
        pagination={false}
        scroll={{ y: 'auto', x: 900 }}
      />
      <Divider orientation="left" style={styles.dividerMargin}>
        Productos Seleccionados
      </Divider>
      <SelectedProducts productsSelected={productsSelected} onChangeQuantity={onChangeQuantity} />
    </>
  );
};

export default RenderStep2;
