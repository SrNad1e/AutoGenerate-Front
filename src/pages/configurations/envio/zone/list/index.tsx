import { PageContainer } from '@ant-design/pro-layout';
import CardContent from '../components/CardContent';
import TableContent from '../components/TableContent';
import { Modal } from '@/utils/Desing';
import { useState, useEffect } from 'react';
import FormZone from '../form/FormZone';

import { useGetZone, useCreateZone, useUpdateZone } from '@/hooks/zone.hooks';

const Index = () => {
  const [openModalState, setStateOpenModal] = useState({
    visible: false,
    record: null,
  } as any);
  const [stateInput, setStateInput] = useState('');

  console.log(openModalState);

  const [getZone, { data, loading, refetch }] = useGetZone();
  const [create] = useCreateZone();
  const [update] = useUpdateZone();

  useEffect(() => {
    getZone({
      variables: {
        filtersZoneInput: {
          name: stateInput,
        },
      },
    });
    // eslint-disable-next-line
  }, [data]);

  //Apertura de modal
  const openModal = (value) => {
    setStateOpenModal({
      visible: true,
      record: value,
    });
  };

  //Cierre de modal

  const onCloseModal = async () => {
    console.log(onCloseModal);

    setStateOpenModal({
      visible: false,
      record: null,
    });

    refetch({
      filtersZoneInput: {
        name: '',
      },
    });
  };

  const onFinish = async (value) => {
    try {
      if (!openModalState?.record?._id) {
        await create({
          variables: {
            CreateZoneInput: value,
          },
        })
          .then(async () => {
            getZone({
              variables: {
                filtersZoneInput: {
                  name: '',
                },
              },
            });

            await onCloseModal();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await update({
          variables: {
            id: openModalState?.record?._id,
            updateZoneInput: value,
          },
        })
          .then(async () => {
            getZone({
              variables: {
                filtersZoneInput: {
                  name: '',
                },
              },
            });

            await onCloseModal();
          })
          .catch((e) => console.log(e));
      }

      console.log(value);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (value: boolean) => {
    if (value === true) {
      getZone({
        variables: {
          filtersZoneInput: {
            name: stateInput,
          },
        },
      });
    } else {
      setStateInput('');
      getZone({
        variables: {
          filtersZoneInput: {
            name: '',
          },
        },
      });
    }
  };

  return (
    <PageContainer>
      <CardContent openModal={openModal} setStateInput={setStateInput} onSearch={onSearch} />
      <br />
      <TableContent openModal={openModal} data={data} loading={loading} />

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
        <FormZone openModalState={openModalState} onFinish={onFinish} onCloseModal={onCloseModal} />
      </Modal>
    </PageContainer>
  );
};

export default Index;
