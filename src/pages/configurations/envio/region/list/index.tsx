import { PageContainer } from '@ant-design/pro-layout';
import { Modal } from '@/utils/Desing';
import { useState, useEffect } from 'react';
import CardContent from '../components/CardContent';
import TableContent from '../components/TableContent';

import { useGetRegion, useCreateRegion, useUpdateRegion } from '@/hooks/region.hooks';
import FormRegio from '../form/FormRegio';

const Index = () => {
  /**
   * @state Estado de todos los componentes padres
   * @param openModalState Guarda el dato de la tabla seleccionado y el estado para mostar el modal
   * @param stateInput Estado para buscar todas las regiones
   */
  const [openModalState, setStateOpenModal] = useState({
    visible: false,
    record: null,
  } as any);
  const [stateInput, setStateInput] = useState('');

  /**
   * @queryAndMutation Se declara los hooks que se va a usar en el componente
   * @param getRegion Obtiene la region
   * @param create Crea la regiones
   * @param update Actualiza la region
   */

  const [getRegion, { data, loading, refetch }] = useGetRegion();
  const [create] = useCreateRegion();
  const [update] = useUpdateRegion();

  /**
   * @useEffect Obtiene toda las regiones
   */

  useEffect(() => {
    getRegion({
      variables: {
        filter: {
          city: stateInput,
        },
      },
    });
    // eslint-disable-next-line
  }, [data]);

  /**
   * @openModal Abre el modal y actualiza el estado
   * @param value obtiene el record en caso de que sea crear el value viene vacio en caso de que no el formulario se actualiza
   */

  const openModal = (value) => {
    setStateOpenModal({
      visible: true,
      record: value,
    });
  };

  /**
   * @onCloseModal Cierra el modal y actualiza el estado
   * @param refetch cada vez que se cierra un modal (crear, actualizar, o cierre normal) => hace una peticion para obtener todo actualizado
   */

  const onCloseModal = () => {
    setStateOpenModal({
      visible: false,
      record: null,
    });

    refetch({
      filter: {
        city: '',
      },
    });
  };

  /**
   * @onFinish Crea y edita una region
   * @param refetch cada vez que se cierra un modal (crear, actualizar, o cierre normal) => hace una peticion para obtener todo actualizado
   */

  const onFinish = async (value) => {
    try {
      if (!openModalState?.record?._id) {
        await create({
          variables: {
            CreateRegionInput: value,
          },
        })
          .then(async () => {
            getRegion({
              variables: {
                filter: {
                  city: '',
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
            data: value,
          },
        })
          .then(async () => {
            getRegion({
              variables: {
                filter: {
                  city: '',
                },
              },
            });

            await onCloseModal();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @onSearch Busca una region
   * @value Cada boton tiene un value
   */

  const onSearch = (value: boolean) => {
    if (value === true) {
      getRegion({
        variables: {
          filter: {
            city: stateInput,
          },
        },
      });
    } else {
      setStateInput('');
      getRegion({
        variables: {
          filter: {
            city: '',
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
        <FormRegio
          openModalState={openModalState}
          onFinish={onFinish}
          onCloseModal={onCloseModal}
        />
      </Modal>
    </PageContainer>
  );
};

export default Index;
