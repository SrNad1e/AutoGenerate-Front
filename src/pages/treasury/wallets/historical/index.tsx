import { Descriptions, Divider, Modal, Table, Tag } from 'antd';
import moment from 'moment';
import numeral from 'numeral';

import styles from './styles';

const DescriptionItem = Descriptions.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const WalletsHistorical = ({ visible, onCancel }: Props) => {
  const datatest = [
    {
      type: 'Credito',
      amount: 100000,
      quota: 10000000,
      order: 187555,
      createdAt: '2022-05-04T18:10:20.727Z',
    },
  ];

  const column = [
    {
      title: 'Tipo',
      dataIndex: 'type',
      render: (type: string) => <Tag style={styles.tagStyle}>{type}</Tag>,
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      render: (amount: number) => numeral(amount).format('$ 0,0'),
    },
    {
      title: 'Cupo',
      dataIndex: 'quota',
      render: (quota: number) => numeral(quota).format('$ 0,0'),
    },
    {
      title: 'Orden',
      dataIndex: 'order',
    },
    {
      title: 'Fecha',
      dataIndex: 'createdAt',
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
  ];

  return (
    <Modal
      title="Historico"
      visible={visible}
      onCancel={onCancel}
      width={600}
      okText="Aceptar"
      cancelText="Cancelar"
    >
      <Descriptions bordered size="small">
        <DescriptionItem label="Cupo Total" span={3}>
          {numeral(100000).format('$ 0,0')}
        </DescriptionItem>
        <DescriptionItem label="Cupo Usado" span={3}>
          {numeral(100000).format('$ 0,0')}
        </DescriptionItem>
        <DescriptionItem label="Cupo Disponible" span={3}>
          {numeral(100000).format('$ 0,0')}
        </DescriptionItem>
      </Descriptions>
      <Divider>Detalles</Divider>
      <Table
        columns={column}
        dataSource={datatest}
        scroll={{ x: 'auto', y: 200 }}
        pagination={false}
      />
    </Modal>
  );
};

export default WalletsHistorical;
