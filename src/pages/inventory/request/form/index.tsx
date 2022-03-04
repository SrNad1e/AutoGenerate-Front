import { useEffect, useState } from 'react';
import { DropboxOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Steps } from 'antd';
import { useParams } from 'umi';
import FormRequest from '../components/FormRequest';
import SelectWarehouseStep from '@/components/SelectWarehouseStep';

import './styles.less';
import styles from './styles.less';

const { Step } = Steps;

const Form = () => {
  const [currentStep, setCurretStep] = useState(0);
  const [request, setRequest] = useState<Partial<REQUEST.Request & REQUEST.CreateRequest>>({
    status: 'open',
  });

  const params = useParams();

  const isNew = true;

  /**
   * @description se encarga de cambiar el paso y asignar la bodega
   * @param warehouseDestinationId bodega seleccionada
   */
  const changeCurrentStep = (warehouseDestination?: WAREHOUSE.warehouse) => {
    if (warehouseDestination) {
      setCurretStep(1);
      setRequest({
        ...request,
        warehouseDestination,
      });
    } else {
      setCurretStep(0);
    }
  };

  useEffect(() => {
    console.log(params);
  }, [params]);

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
        return <SelectWarehouseStep changeCurrentStep={changeCurrentStep} label="Bodega Origen" />;
      case 1:
        return <FormRequest warehouse={request.warehouseDestination} request={request} />;
      default:
        return <ErrorStep />;
    }
  };

  return (
    <PageContainer title={isNew ? 'Nueva Solicitud' : `Solicitud No. ${request?.number}`}>
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
        <FormRequest />
      )}
    </PageContainer>
  );
};

export default Form;
