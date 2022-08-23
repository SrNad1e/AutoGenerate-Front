/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Descriptions, Divider, Modal, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import type {
  Credit,
  CreditHistory,
  FiltersCreditHistoryInput,
  TypeCreditHistory,
} from '@/graphql/graphql';
import moment from 'moment';
import numeral from 'numeral';

import styles from './styles';
import { useGetHistoryCredits } from '@/hooks/credit.hooks';
import { useEffect } from 'react';

const DescriptionItem = Descriptions.Item;

type Props = {
  onCancel: () => void;
  credit: Credit | null;
};

const CreditsHistorical = ({ onCancel, credit }: Props) => {
  const [getCreditsHistory, { data, loading }] = useGetHistoryCredits();

  const column: ColumnsType<CreditHistory> = [
    {
      title: 'Tipo',
      dataIndex: 'type',
      render: (type: TypeCreditHistory) => <Tag style={styles.tagStyle}>{type}</Tag>,
    },
    {
      title: 'Movimiento',
      dataIndex: 'amount',
      render: (amount: number) => numeral(amount).format('$ 0,0'),
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

  /**
   * @description se trae el historico en base a la id del credito
   * @param credit credito seleccionado
   */
  const getHistory = async (params?: FiltersCreditHistoryInput) => {
    getCreditsHistory({
      variables: {
        input: {
          creditId: credit?._id,
          limit: 10,
          sort: {
            createdAt: -1,
          },
          ...params,
        },
      },
    });
  };

  /**
   * @description se encarga de manejar eventos de tabla
   * @param paginationLocal eventos de la páginacion
   */
  const handleChangeTable = (paginationLocal: TablePaginationConfig) => {
    const { current } = paginationLocal;

    getHistory({ page: current });
  };

  useEffect(() => {
    getHistory();
  }, [credit]);

  return (
    <Modal
      title="Historico"
      visible={!!credit}
      footer={[
        <Button key={0} onClick={onCancel}>
          Cerrar
        </Button>,
      ]}
      onCancel={onCancel}
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
        loading={loading}
        dataSource={data?.creditHistory?.docs || []}
        scroll={{ x: 'auto', y: 200 }}
        onChange={handleChangeTable}
        pagination={{
          current: data?.creditHistory?.page,
          total: data?.creditHistory?.totalDocs,
          pageSize: 10,
          showSizeChanger: false,
        }}
      />
    </Modal>
  );
};

export default CreditsHistorical;
