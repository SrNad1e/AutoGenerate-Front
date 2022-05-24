import { Button, Modal, Steps } from 'antd';
import { useState } from 'react';

import RenderStep1 from '../components/Step1';
import RenderStep2 from '../components/Step2';

import styles from './styles';

type Props = {
  visible?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
};

const { Step } = Steps;

const FormReturn = ({ visible, onCancel }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const selectInvoice = () => {
    setCurrentStep(1);
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
          <Button key={2} disabled={true} type="primary">
            {currentStep === 1 ? 'Crear Devolución' : undefined}
          </Button>,
        ]
      }
      destroyOnClose
    >
      <Steps progressDot current={currentStep} style={styles.marginStep}>
        <Step key="1" title="Factura" />
        <Step key="2" title="Productos" />
      </Steps>
      {currentStep === 0 && <RenderStep1 selectInvoice={selectInvoice} />}
      {currentStep === 1 && <RenderStep2 />}
    </Modal>
  );
};

export default FormReturn;
