/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Steps } from 'antd';
import type { DetailOrder, DetailReturnInput, FiltersOrdersInput, Order } from '@/graphql/graphql';
import { StatusOrder } from '@/graphql/graphql';
import { useGetOrders } from '@/hooks/order.hooks';
import { useCreateReturnOrder } from '@/hooks/return-order.hooks';
import { useEffect, useState } from 'react';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import RenderStep1 from '../Step1';
import RenderStep2 from '../Step2';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from './styles';

type Props = {
  visible?: boolean;
  onCancel: () => void;
};

const { Step } = Steps;

const FormReturn = ({ visible, onCancel }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderSelected, setOrderSelected] = useState<Partial<Order>>({});
  const [productsSelected, setProductsSelected] = useState<
    (DetailOrder & { quantityReturn: number })[]
  >([]);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [createReturnOrder, paramsCreate] = useCreateReturnOrder();
  const [getOrders, { data, loading }] = useGetOrders();

  /**
   * @description se encarga de cerrar la alerta de informacion y de cerrar el modal
   */
  const closeAlertInformation = async () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    onCancel();
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const messageError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description funcion encargada de seleccionar el pedido y pasar al siguiente paso
   * @param record record del pedido
   */
  const selectOrder = (record: Order) => {
    setCurrentStep(1);
    setOrderSelected(record);
  };

  /**
   * @description se encarga de ejecutar la funcion para crear una devolucion
   */
  const createNewReturn = async () => {
    const details: DetailReturnInput[] = productsSelected?.map((detail) => ({
      productId: detail?.product?._id || '',
      quantity: detail?.quantityReturn || 1,
    }));
    try {
      const response = await createReturnOrder({
        variables: {
          input: {
            details,
            orderId: orderSelected?._id || '',
          },
        },
      });
      if (response?.data?.createReturnOrder) {
        setAlertInformation({
          message: `Devolucion No.${response.data.createReturnOrder.number} creada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los pedidos
   * @param params Variables para ejecutar la consulta
   */
  const onSearch = (params?: FiltersOrdersInput) => {
    try {
      getOrders({
        variables: {
          input: {
            status: StatusOrder.Closed,
            ...params,
          },
        },
      });
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  useEffect(() => {
    try {
      getOrders({ variables: { input: { status: StatusOrder.Closed, sort: { createdAt: -1 } } } });
      setOrderSelected({});
      setProductsSelected([]);
      setCurrentStep(0);
    } catch (error: any) {
      messageError(error?.message);
    }
  }, [visible]);

  return (
    <Modal
      title="Nueva Devolución"
      visible={visible}
      onCancel={onCancel}
      width={1000}
      footer={
        currentStep > -1 && [
          <Button
            style={styles.borderR}
            loading={paramsCreate?.loading || loading}
            key={1}
            onClick={
              currentStep === 0
                ? onCancel
                : () => {
                    setCurrentStep(currentStep - 1);
                  }
            }
          >
            {currentStep === 1 ? 'Atrás' : 'Cancelar'}
          </Button>,
          <Button
            style={styles.borderR}
            loading={paramsCreate?.loading || loading}
            key={2}
            disabled={productsSelected.length < 1}
            type="primary"
            onClick={createNewReturn}
          >
            {currentStep === 1 ? 'Crear Devolución' : undefined}
          </Button>,
        ]
      }
      destroyOnClose
    >
      <Steps progressDot current={currentStep} style={styles.marginStep}>
        <Step key="1" title="Pedido" />
        <Step key="2" title="Productos" />
      </Steps>
      {currentStep === 0 && (
        <RenderStep1
          loading={loading || paramsCreate?.loading}
          data={data}
          onSearch={onSearch}
          selectOrder={selectOrder}
        />
      )}
      {currentStep === 1 && (
        <RenderStep2
          loading={loading || paramsCreate?.loading}
          currentStep={currentStep}
          orderSelected={orderSelected}
          productsSelected={productsSelected}
          setProductsSelected={setProductsSelected}
        />
      )}
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default FormReturn;
