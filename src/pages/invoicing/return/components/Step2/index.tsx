/* eslint-disable react-hooks/exhaustive-deps */
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Col, Descriptions, Divider, Row, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { DetailOrder, Order, Product } from '@/graphql/graphql';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useState } from 'react';

import SelectedProducts from '../SelectedProducts';

import styles from '../styles';

const DescriptionsItem = Descriptions.Item;

type Props = {
  orderSelected?: Partial<Order>;
  productsSelected: (DetailOrder & { quantityReturn: number })[];
  setProductsSelected: (products: (DetailOrder & { quantityReturn: number })[]) => void;
  currentStep: number;
};

const RenderStep2 = ({
  orderSelected,
  productsSelected,
  setProductsSelected,
  currentStep,
}: Props) => {
  const [keysSelected, setKeysSelected] = useState<React.Key[]>([]);

  const dataCustomer = orderSelected?.customer;

  /**
   * @description se encarga de seleccionar los productos del pedido para hacer la devolucion
   */
  const rowSelection = {
    selectedRowKeys: keysSelected,
    onChange: (selectedRowKeys: React.Key[], selectedRows: DetailOrder[]) => {
      setProductsSelected(
        selectedRows.map((detail) => ({
          ...detail,
          quantityReturn: 1,
        })),
      );
      setKeysSelected(selectedRowKeys);
    },
    getCheckboxProps: (record: DetailOrder) => ({
      disabled: record.product.reference.changeable === false,
      name: record.product.reference.name,
    }),
  };

  /**
   * @description se encarga de gestionar la cantidad del producto seleccionado para hacer la devolucion
   * @param quantityReturn cantidad para devolver
   * @param product producto al cual se le cambia la cantidad a devolver
   */
  const onChangeQuantity = (quantityReturn: number, product: Product) => {
    const productsChange = productsSelected?.map((item) => {
      if (product?._id === item?.product?._id) {
        return {
          ...item,
          quantityReturn,
        };
      }
      return item;
    });
    setProductsSelected(productsChange);
  };

  useEffect(() => {
    setProductsSelected([]);
  }, [currentStep]);

  /**
   * Columna de productos del pedido
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
      title: 'Cantidad Disponible',
      dataIndex: 'quantityReturn',
      align: 'center',
      render: (quantityReturn: number, { quantity }) => quantity - (quantityReturn || 0),
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
      </Row>
      <Divider orientation="left" style={styles.dividerMargin}>
        Productos Del Pedido
      </Divider>
      <Table
        rowKey="product"
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
