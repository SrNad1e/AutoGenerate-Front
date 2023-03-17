import { Table, Badge, Button } from '@/utils/Desing';
import { EditOutlined } from '@/utils/Icon';
interface props {
  openModal: (value: any) => void;
  data: any;
  loading: boolean;
}

const TableContent = ({ openModal, data, loading }: props) => {
  const columns: any = [
    {
      title: 'Nombre',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Descripcion',
      key: 'description',
      dataIndex: 'description',
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

  return <Table columns={columns} dataSource={data?.zona?.docs} loading={loading} />;
};

export default TableContent;
