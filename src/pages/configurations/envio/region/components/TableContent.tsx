import { Table, Badge, Button, Typography } from '@/utils/Desing';
import { EditOutlined } from '@/utils/Icon';

interface props {
  openModal: (value: any) => void;
  data: any;
  loading: boolean;
}

const TableContent = ({ openModal, data, loading }: props) => {
  const columns: any = [
    {
      title: 'Departamento',
      key: 'dpto',
      dataIndex: 'dpto',
    },

    {
      title: 'Ciudad',
      key: 'city',
      dataIndex: 'city',
    },

    {
      title: 'Pais',
      key: 'country',
      dataIndex: 'country',
    },
    {
      title: 'Zona',
      key: 'zone',
      dataIndex: 'zone',
      render: (text, record) => (
        <>
          <Typography.Text>{record.zone.name}</Typography.Text>
        </>
      ),
    },
    {
      title: 'Activo',
      key: 'active',
      dataIndex: 'active',
      render: (text, record) => (
        <>
          <Badge
            color={record.state === true ? 'green' : 'red'}
            text={record.state === true ? 'Si' : 'No'}
          />
        </>
      ),
    },

    {
      title: '',
      key: '',
      render: (text, record) => (
        <Button onClick={() => openModal(record)}>
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data?.regions?.docs} loading={loading} />;
};

export default TableContent;
