import type { DetailOrder, Product } from '@/graphql/graphql';
import { InputNumber, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import numeral from 'numeral';
import styles from '../styles';

const { Option } = Select;

type Props = {
  productsSelected: Partial<DetailOrder[]>;
  onChangeQuantity: (quantity: number, product: Product) => void;
};

const SelectedProducts = ({ productsSelected, onChangeQuantity }: Props) => {
  const columnsSelected: ColumnsType<DetailOrder> = [
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
      title: 'Motivo',
      dataIndex: 'returnType',
      width: 150,
      render: (returnType: number) => {
        return (
          <>
            {' '}
            <Select defaultValue={returnType} style={styles.allWidth}>
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
      render: (quantity: number) => (
        <InputNumber min={1} value={quantity} onChange={() => onChangeQuantity} />
      ),
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      align: 'right',
      render: (price: number) => numeral(price).format('$ 0,0'),
    },
  ];

  return (
    <Table
      columns={columnsSelected}
      dataSource={productsSelected}
      pagination={false}
      scroll={{ y: 'auto', x: 800 }}
    />
  );
};

export default SelectedProducts;
