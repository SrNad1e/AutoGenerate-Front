/* eslint-disable react-hooks/exhaustive-deps */
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LikeOutlined,
  MoreOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Modal, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type {
  DetailTransferError,
  Product,
  StockTransferError,
  VerifiedProductTransferErrorInput,
} from '@/graphql/graphql';
import { StatusDetailTransferError } from '@/graphql/graphql';
import { useEffect, useState } from 'react';

import { StatusTypeError } from './FormTransfer/error.data';
import Reason from './Reason';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  data: StockTransferError;
  loading: boolean;
};

const TransferProducts = ({ onCancel, visible, data, loading }: Props) => {
  const [visibleReason, setVisibleReason] = useState(false);
  const [detailsData, setDetailsData] = useState(data?.details);
  const [dataVerified, setDataVerified] = useState<VerifiedProductTransferErrorInput>({
    returnInventory: false,
    reason: '',
    productId: '',
    stockTransferErrorId: '',
  });
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const onShowError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

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
    try {
      setDataVerified({
        productId: detailsProduct?.product?._id,
        stockTransferErrorId: dataT?._id,
        reason: '',
        returnInventory: destinyOrOrigin,
      });
      setVisibleReason(true);
    } catch (error: any) {
      onShowError(error?.message);
    }
  };

  useEffect(() => {
    try {
      setDetailsData(data?.details);
    } catch (error: any) {
      onShowError(error?.message);
    }
  }, [data]);

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
      title: 'Color',
      dataIndex: 'product',
      align: 'center',
      render: (product: Product) => (
        <>
          <Avatar
            size="small"
            style={{ backgroundColor: product?.color?.html, border: 'solid 1px black' }}
            src={`${CDN_URL}/${product?.color?.image?.urls?.webp?.small}`}
          />

          <Text style={{ marginLeft: 10 }}>{product?.color?.name_internal}</Text>
        </>
      ),
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
        dataSource={detailsData}
        pagination={false}
        loading={loading}
        scroll={{ x: 'auto' }}
      />
      <Reason
        setDetailsData={setDetailsData}
        onCancel={() => setVisibleReason(false)}
        visible={visibleReason}
        dataVerified={dataVerified}
      />
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default TransferProducts;
