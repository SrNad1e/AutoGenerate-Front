import { Descriptions, Divider, Modal, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type {
  Credit,
  CreditHistory,
  ResponseCreditHistory,
  TypeCreditHistory,
} from '@/graphql/graphql';
import moment from 'moment';
import numeral from 'numeral';

import styles from './styles';

const DescriptionItem = Descriptions.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
  creditHistory: CreditHistory;
  credit: Credit;
  data: ResponseCreditHistory;
};

const CreditsHistorical = ({ visible, onCancel, creditHistory, credit, data }: Props) => {
  const column: ColumnsType<CreditHistory> = [
    {
      title: 'Tipo',
      dataIndex: 'type',
      render: (type: TypeCreditHistory) => <Tag style={styles.tagStyle}>{type}</Tag>,
    },
    {
      title: 'Movimiento',
      dataIndex: 'credit',
      render: (credits: Credit) => numeral(credits?.amount).format('$ 0,0'),
    },
    {
      title: 'Saldo',
      dataIndex: 'credit',
      render: (credits: Credit) => numeral(credits?.balance).format('$ 0,0'),
    },
    {
      title: 'Disponible',
      dataIndex: 'credit',
      render: (credits: Credit) => numeral(credits?.available).format('$ 0,0'),
    },
    {
      title: 'Fecha',
      dataIndex: 'credit',
      render: (credits: Credit) => moment(credits?.updatedAt).format(FORMAT_DATE),
    },
  ];

  return (
    <Modal
      title="Historico"
      visible={visible}
      onCancel={onCancel}
      onOk={onCancel}
      width={700}
      okText="Aceptar"
      cancelText="Cancelar"
    >
      <Descriptions bordered size="small">
        <DescriptionItem label="Cupo Total" span={3}>
          {numeral(credit?.amount).format('$ 0,0')}
        </DescriptionItem>
        <DescriptionItem label="Cupo Usado" span={3}>
          {numeral(credit?.balance).format('$ 0,0')}
        </DescriptionItem>
        <DescriptionItem label="Cupo Disponible" span={3}>
          {numeral(credit?.available).format('$ 0,0')}
        </DescriptionItem>
      </Descriptions>
      <Divider>Detalles</Divider>
      <Table
        columns={column}
        dataSource={creditHistory}
        scroll={{ x: 'auto', y: 200 }}
        pagination={{
          current: data?.page,
        }}
      />
    </Modal>
  );
};

export default CreditsHistorical;
