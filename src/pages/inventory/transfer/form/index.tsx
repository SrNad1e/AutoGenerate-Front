import { useState } from 'react';
import { DropboxOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Steps } from 'antd';
import type { StockTransfer, Warehouse } from '@/graphql/graphql';

import FormTransfer from '../components/FormTransfer';
import SelectWarehouseStep from '@/components/SelectWarehouseStep';

import './styles.less';
import styles from './styles.less';

const { Step } = Steps;

const Form = () => {
  const [currentStep, setCurretStep] = useState(0);
  const [transfer, setTransfer] = useState<Partial<StockTransfer>>({});

  const isNew = true;

  /**
   * @description se encarga de cambiar el paso y asignar la bodega
   * @param warehouseDestinationId bodega seleccionada
   */
  const changeCurrentStep = (warehouseDestination?: Warehouse | any) => {
    if (warehouseDestination) {
      setCurretStep(1);
      setTransfer({
        ...transfer,
        warehouseDestination,
      });
    } else {
      setCurretStep(0);
    }
  };

  const ErrorStep = () => {
    return <></>;
  };

  /**
   * @description se encarga de renderizar los componentes con base al step
   * @param step paso en el cual se encuentra
   * @returns componente
   */
  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return <SelectWarehouseStep changeCurrentStep={changeCurrentStep} label="Bodega Destino" />;
      case 1:
        return <FormTransfer transfer={transfer} />;
      default:
        return <ErrorStep />;
    }
  };

  return (
    <PageContainer title={isNew ? 'Nuevo Traslado' : `Traslado No. ${transfer?.number}`}>
      {isNew ? (
        <Card>
          <Steps className={styles.steps}>
            <Step
              status={currentStep === 0 ? 'process' : 'wait'}
              title="Bodega"
              icon={<DropboxOutlined />}
            />
            <Step
              status={currentStep === 1 ? 'process' : 'wait'}
              title="Formulario"
              icon={<FileTextOutlined />}
            />
          </Steps>
          {renderSteps(currentStep)}
        </Card>
      ) : (
        <FormTransfer />
      )}
    </PageContainer>
  );
};

export default Form;
