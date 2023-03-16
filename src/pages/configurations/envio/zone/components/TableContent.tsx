import { Table, Badge, Button } from '@/utils/Desing';

interface props {
  openModal: (value: any) => void;
}

const TableContent = ({ openModal }: props) => {
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
          <Badge color={text === true ? 'green' : 'red'} text={text === true ? 'Si' : 'No'} />
        </>
      ),
    },

    {
      title: '',
      key: '',
      render: (text, record) => <Button onClick={() => openModal(record)}>ll</Button>,
    },
  ];

  const dataSource: any = [
    {
      id: 'jkshdjd',
      name: 'Nombre',
      description: 'name',
      active: true,
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
};

export default TableContent;
