import { Table, Badge, Button } from '@/utils/Desing';

interface props {
  openModal: (value: any) => void;
}

const TableContent = ({ openModal }: props) => {
  const columns: any = [
    {
      title: 'Ciudad',
      key: 'city',
      dataIndex: 'city',
    },
    {
      title: 'Departamento',
      key: 'dpto',
      dataIndex: 'dpto',
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
      city: 'Nombre',
      dpto: 'name',
      country: 'Nombre',
      zone: 'name',
      active: true,
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
};

export default TableContent;
