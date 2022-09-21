import { MoreOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { Product } from './Inconsistencies';

const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  data: Product;
};

const TransferProducts = ({ onCancel, visible, data }: Props) => {
  const columns: ColumnsType<Product> = [
    {
      title: 'Referencia',
      dataIndex: 'reference',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
    },
    {
      title: 'Codigo',
      dataIndex: 'code',
      align: 'center',
    },
    {
      title: 'Talla',
      dataIndex: 'size',
      align: 'center',
    },
    {
      title: 'Cantidad Pendiente',
      dataIndex: 'pendingQuantity',
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
    },
    {
      title: <Text>{<MoreOutlined />} Opciones</Text>,
      dataIndex: 'data',
      align: 'center',
      fixed: 'right',
      render: () => {
        return (
          <Space>
            <Button icon={<SendOutlined />} type="primary" style={{ borderRadius: 5 }}>
              Destino
            </Button>
            <Button icon={<SendOutlined />} type="primary" style={{ borderRadius: 5 }}>
              Origen
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Modal
      title="Productos"
      onCancel={onCancel}
      visible={visible}
      destroyOnClose
      width={900}
      footer={
        <Button onClick={onCancel} style={{ borderRadius: 5 }}>
          Cerrar
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: 1,
          total: 100,
          showSizeChanger: false,
        }}
        onChange={() => {}}
        loading={false}
        scroll={{ x: 'auto' }}
      />
    </Modal>
  );
};

export default TransferProducts;
