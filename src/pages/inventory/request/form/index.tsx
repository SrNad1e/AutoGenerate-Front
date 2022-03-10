import { useEffect, useState } from 'react';
import { DropboxOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Steps } from 'antd';
import { useParams } from 'umi';

import FormRequest from '../components/FormRequest';
import SelectWarehouseStep from '@/components/SelectWarehouseStep';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useGetRequest } from '@/hooks/request.hooks';

import styles from './styles.less';
import './styles.less';

const { Step } = Steps;

const Form = () => {
  const [currentStep, setCurretStep] = useState(0);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [request, setRequest] = useState<Partial<REQUEST.Request & REQUEST.CreateRequest>>({
    status: 'open',
  });

  const { id } = useParams<Partial<{ id: string }>>();

  const isNew = !id;

  /**
   * @description se encarga de abrir aviso de información
   * @param error error de apollo
   */
  const onShowError = (message: string) => {
    setPropsAlert({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description se encarga de cerrar la alerta
   */
  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };
  /**
   * @description se encarga de cargar la solicitud actual
   * @param data datos de la solicitud
   */
  const currentRequest = (data: Partial<REQUEST.Request>) => {
    setRequest(data);
  };

  /**
   * @description se encarga de administrar el error
   * @param message mensaje de error
   */
  const showError = (message: string) => {
    onShowError(message);
  };

  const { getRequest, loading } = useGetRequest(currentRequest, showError);

  /**
   * @description se encarga de cambiar el paso y asignar la bodega
   * @param warehouseDestinationId bodega seleccionada
   */
  const changeCurrentStep = (warehouseOrigin?: WAREHOUSE.warehouse) => {
    if (warehouseOrigin) {
      setCurretStep(1);

      setRequest({
        ...request,
        warehouseOrigin,
      });
    } else {
      setCurretStep(0);
    }
  };

  useEffect(() => {
    if (!isNew) {
      getRequest({
        variables: {
          id,
        },
      });
    }
  }, [isNew]);

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
        return (
          <FormRequest setRequest={setRequest} request={request} setCurrentStep={setCurretStep} />
        );
      default:
        return <></>;
    }
  };

  return (
    <PageContainer
      title={isNew ? 'Nueva Solicitud' : `Solicitud No. ${request?.number}`}
      loading={loading}
    >
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
        <FormRequest setRequest={setRequest} request={request} setCurrentStep={setCurretStep} />
      )}
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    </PageContainer>
  );
};

export default Form;
