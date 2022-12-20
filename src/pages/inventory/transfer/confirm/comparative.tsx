/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Modal, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import type { DetailTransfer, Product, StockTransfer } from '@/graphql/graphql';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  dataDetail: StockTransfer;
};

const Comparative = ({ onCancel, visible, dataDetail }: Props) => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

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

  const columns: ColumnsType<DetailTransfer> = [
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
      title: 'Talla',
      dataIndex: 'product',
      align: 'center',
      render: (product: Product) => product?.size?.value,
    },
    {
      title: 'Color',
      dataIndex: 'product',
      width: 150,
      align: 'left',
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
      title: 'Cantidades en el Traslado',
      dataIndex: 'quantity',
      sorter: false,
      showSorterTooltip: false,
      align: 'center',
    },
    {
      title: 'Cantidades Confirmadas en Tienda',
      dataIndex: 'quantityConfirmed',
      sorter: false,
      showSorterTooltip: false,
      align: 'center',
      render: (quantityConfirmed: number) => <>{quantityConfirmed || 0}</>,
    },
    {
      title: 'Faltante',
      sorter: false,
      showSorterTooltip: false,
      align: 'center',
      render: (_, record) => {
        if (record.quantity === record.quantityConfirmed) {
          return 0;
        } else if (record.quantity > record.quantityConfirmed) {
          return record.quantity - record.quantityConfirmed;
        }
        return 0;
      },
    },
    {
      title: 'Sobrante',
      dataIndex: 'quantity',
      sorter: false,
      showSorterTooltip: false,
      align: 'center',
      render: (_, record) => {
        if (record.quantity === record.quantityConfirmed) {
          return 0;
        } else if (record.quantityConfirmed > record.quantity) {
          return record.quantityConfirmed - record.quantity;
        }
        return 0;
      },
    },
  ];

  return (
    <Modal
      title="Tabla Comparativa"
      onCancel={onCancel}
      visible={visible}
      destroyOnClose
      width={1040}
      footer={
        <Button onClick={onCancel} style={{ borderRadius: 5 }} loading={false}>
          Cerrar
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={dataDetail}
        pagination={{
          showSizeChanger: false,
        }}
        loading={false}
        scroll={{ x: 'auto' }}
      />
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default Comparative;
