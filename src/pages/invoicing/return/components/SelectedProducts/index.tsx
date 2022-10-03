import type { DetailOrder, Product } from '@/graphql/graphql';
import type { ColumnsType } from 'antd/lib/table';
import { InputNumber, Table, Tag } from 'antd';
import numeral from 'numeral';
import styles from '../styles';

type Props = {
  productsSelected: Partial<(DetailOrder & { quantityReturn: number })[]>;
  onChangeQuantity: (quantity: number, product: Product) => void;
  loading: boolean;
};

const SelectedProducts = ({ productsSelected, onChangeQuantity, loading }: Props) => {
  /**
   * columna de productos seleccionados para la devolucion
   */
  const columnsSelected: ColumnsType<DetailOrder & { quantityReturn: number }> = [
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
      render: (product: Product) => <Tag style={styles.tagStyle}>{product?.barcode}</Tag>,
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantityReturn',
      render: (quantityReturn: number, { quantity, product }) => (
        <InputNumber
          max={quantity}
          min={1}
          value={quantityReturn}
          onChange={(value) => onChangeQuantity(value, product)}
        />
      ),
    },
    {
      title: 'Precio',
      dataIndex: 'quantityReturn',
      align: 'right',
      render: (quantityReturn: number, record) =>
        numeral(quantityReturn * record.price).format('$ 0,0'),
    },
  ];

  return (
    <Table
      columns={columnsSelected}
      dataSource={productsSelected as any}
      pagination={false}
      loading={loading}
      scroll={{ y: 'auto', x: 800 }}
    />
  );
};

export default SelectedProducts;
