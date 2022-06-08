/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Steps } from 'antd';
import type { DetailOrder, DetailReturnInput, FiltersOrdersInput, Order } from '@/graphql/graphql';
import { useGetOrders } from '@/hooks/order.hooks';
import { useCreateReturnInvoice } from '@/hooks/return-invoice.hooks';
import { useEffect, useState } from 'react';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import RenderStep1 from '../components/Step1';
import RenderStep2 from '../components/Step2';

import styles from './styles';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { LoadingOutlined } from '@ant-design/icons';

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

  const [createReturnOrder, paramsCreate] = useCreateReturnInvoice();
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
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los pedidos
   * @param params Variables para ejecutar la consulta
   */
  const onSearch = (params?: FiltersOrdersInput) => {
    getOrders({
      variables: {
        input: {
          status: 'closed',
          ...params,
        },
      },
    });
  };

  useEffect(() => {
    getOrders({ variables: { input: {} } });
    setOrderSelected({});
    setProductsSelected([]);
    setCurrentStep(0);
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
            icon={paramsCreate.loading && <LoadingOutlined />}
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
        <RenderStep1 loading={loading} data={data} onSearch={onSearch} selectOrder={selectOrder} />
      )}
      {currentStep === 1 && (
        <RenderStep2
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
