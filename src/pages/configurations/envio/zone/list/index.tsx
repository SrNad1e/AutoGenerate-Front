import { PageContainer } from '@ant-design/pro-layout';
import CardContent from '../components/CardContent';
import TableContent from '../components/TableContent';
import { Modal } from '@/utils/Desing';
import { useState } from 'react';
import FormZone from '../form/FormZone';

const Index = () => {
  const [openModalState, setStateOpenModal] = useState({
    visible: false,
    record: null,
  } as any);

  //Apertura de modal
  const openModal = (value) => {
    setStateOpenModal({
      visible: true,
      record: value,
    });
  };

  //Cierre de modal

  const onCloseModal = () => {
    setStateOpenModal({
      visible: false,
      record: null,
    });
  };

  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <PageContainer>
      <CardContent openModal={openModal} />
      <br />
      <TableContent openModal={openModal} />

      <Modal
        open={openModalState.visible}
        onCancel={onCloseModal}
        title={
          openModalState?.record?.id === undefined || openModalState?.record?.id === null
            ? 'Crear'
            : 'Editar'
        }
        footer=""
        destroyOnClose={true}
      >
        <FormZone openModalState={openModalState} onFinish={onFinish} />
      </Modal>
    </PageContainer>
  );
};

export default Index;
