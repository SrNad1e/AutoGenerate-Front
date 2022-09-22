import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LikeOutlined,
  MoreOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Badge, Button, Modal, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type {
  DetailTransferError,
  Product,
  StockTransferError,
  VerifiedProductTransferErrorInput,
} from '@/graphql/graphql';
import { StatusDetailTransferError } from '@/graphql/graphql';
import { useState } from 'react';

import { StatusTypeError } from './FormTransfer/error.data';
import Reason from './Reason';

const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  data: StockTransferError;
  loading: boolean;
};

const TransferProducts = ({ onCancel, visible, data, loading }: Props) => {
  const [visibleReason, setVisibleReason] = useState(false);
  const [dataVerified, setDataVerified] = useState<VerifiedProductTransferErrorInput>({
    returnInventory: false,
    reason: '',
    productId: '',
    stockTransferErrorId: '',
  });

  /**
   *@description funcion usada para almacenar los datos de la trasnferencia en el estado y abrir el modal de verificacion
   * @param dataT datos de la transferencia con error
   * @param detailsProduct detalles de los productos
   * @param destinyOrOrigin si es enviado a origin o a destino
   */
  const onVerifiedProduct = (
    dataT: StockTransferError,
    detailsProduct: DetailTransferError,
    destinyOrOrigin: boolean,
  ) => {
    setDataVerified({
      productId: detailsProduct?.product?._id,
      stockTransferErrorId: dataT?._id,
      reason: '',
      returnInventory: destinyOrOrigin,
    });
    setVisibleReason(true);
  };

  const columns: ColumnsType<DetailTransferError> = [
    {
      title: 'Referencia',
      dataIndex: 'product',
      sorter: false,
      showSorterTooltip: false,
      align: 'center',
      render: (product: Product) => product?.reference?.name,
    },
    {
      title: 'Código de Barras',
      dataIndex: 'product',
      align: 'center',
      render: (product: Product) => (
        <Tag style={{ borderColor: '#dc9575', color: '#dc9575', backgroundColor: 'white' }}>
          {product?.barcode}
        </Tag>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: StatusDetailTransferError) => {
        return (
          <Badge
            count={
              status === StatusDetailTransferError.Confirmed ? (
                <LikeOutlined />
              ) : status === StatusDetailTransferError.Missing ? (
                <ArrowDownOutlined />
              ) : (
                status === StatusDetailTransferError.Surplus && <ArrowUpOutlined />
              )
            }
            text={StatusTypeError[status]?.text}
          />
        );
      },
    },
    {
      title: 'Talla',
      dataIndex: 'product',
      align: 'center',
      render: (product: Product) => product?.size?.value,
    },
    {
      title: 'Cantidad Pendiente',
      dataIndex: 'quantity',
      sorter: false,
      showSorterTooltip: false,
      align: 'center',
    },
    {
      title: <Text>{<MoreOutlined />} Opciones</Text>,
      dataIndex: 'details',
      align: 'center',
      fixed: 'right',
      render: (_, details) => {
        return (
          <Space>
            <Button
              loading={loading}
              disabled={details?.status === StatusDetailTransferError.Confirmed}
              icon={<SendOutlined />}
              type="primary"
              style={{ borderRadius: 5 }}
              onClick={() => onVerifiedProduct(data, details, true)}
            >
              Origen
            </Button>
            <Button
              loading={loading}
              icon={<SendOutlined />}
              type="primary"
              style={{ borderRadius: 5 }}
              disabled={details?.status === StatusDetailTransferError.Confirmed}
              onClick={() => onVerifiedProduct(data, details, false)}
            >
              Destino
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
      width={1000}
      footer={
        <Button onClick={onCancel} style={{ borderRadius: 5 }}>
          Cerrar
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={data?.details}
        pagination={false}
        loading={loading}
        scroll={{ x: 'auto' }}
      />
      <Reason
        onCloseProducts={onCancel}
        onCancel={() => setVisibleReason(false)}
        visible={visibleReason}
        dataVerified={dataVerified}
      />
    </Modal>
  );
};

export default TransferProducts;
