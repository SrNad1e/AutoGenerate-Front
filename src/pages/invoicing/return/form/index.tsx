import type { DetailOrder, DetailReturnInput, FiltersOrdersInput, Order } from '@/graphql/graphql';
import { useGetOrders } from '@/hooks/order.hooks';
import { useCreateReturnInvoice } from '@/hooks/return-invoice.hooks';
import { Button, Modal, Steps } from 'antd';
import { useState } from 'react';

import RenderStep1 from '../components/Step1';
import RenderStep2 from '../components/Step2';

import styles from './styles';

type Props = {
  visible?: boolean;
  onCancel?: () => void;
};

const { Step } = Steps;

const FormReturn = ({ visible, onCancel }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderSelected, setOrderSelected] = useState<Partial<Order>>({});
  const [productsSelected, setProductsSelected] = useState<
    Partial<(DetailOrder & { quantityReturn: number })[]>
  >([]);

  const selectOrder = (record: Order) => {
    setCurrentStep(1);
    setOrderSelected(record);
  };

  const [createReturnOrder] = useCreateReturnInvoice();
  const [getOrders, { data }] = useGetOrders();

  const createNewReturn = () => {
    const details: DetailReturnInput[] = productsSelected?.map((detail) => ({
      productId: detail?.product?._id || '',
      quantity: detail?.quantityReturn || 1,
    }));

    createReturnOrder({
      variables: {
        input: {
          details,
          orderId: orderSelected?._id || '',
        },
      },
    });
  };

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

  return (
    <Modal
      title="Nueva Devolución"
      visible={visible}
      onCancel={onCancel}
      width={1000}
      footer={
        currentStep > -1 && [
          <Button
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
        <RenderStep1 data={data} onSearch={onSearch} selectOrder={selectOrder} />
      )}
      {currentStep === 1 && (
        <RenderStep2
          currentStep={currentStep}
          orderSelected={orderSelected}
          productsSelected={productsSelected}
          setProductsSelected={setProductsSelected}
        />
      )}
    </Modal>
  );
};

export default FormReturn;
