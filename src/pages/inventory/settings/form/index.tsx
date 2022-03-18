import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, DropboxOutlined, FileTextOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Space, Steps } from 'antd';
import { useParams, useHistory } from 'umi';

import FormRequest from '../../request/components/FormRequest';
import SelectWarehouseStep from '@/components/SelectWarehouseStep';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useGetRequest } from '@/hooks/request.hooks';

const { Step } = Steps;

function SettingsForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [request, setRequest] = useState<Partial<REQUEST.Request & REQUEST.CreateRequest>>({
    status: 'open',
  });

  const { id } = useParams<Partial<{ id: string }>>();
  const history = useHistory();
  const isNew = !id;

  const onShowError = (message: string) => {
    setPropsAlert({
      message,
      type: 'error',
      visible: true,
    });
  };

  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const currentRequest = (data: Partial<REQUEST.Request>) => {
    setRequest(data);
  };

  const showError = (message: string) => {
    onShowError(message);
  };

  const { getRequest, loading } = useGetRequest(currentRequest, showError);

  const changeCurrentStep = (warehouseOrigin?: WAREHOUSE.warehouse) => {
    if (warehouseOrigin) {
      setCurrentStep(1);

      setRequest({
        ...request,
        warehouseOrigin,
      });
    } else {
      setCurrentStep(0);
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

  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return <SelectWarehouseStep changeCurrentStep={changeCurrentStep} label="Bodega Origen" />;
      case 1:
        return (
          <FormRequest setRequest={setRequest} request={request} setCurrentStep={setCurrentStep} />
        );
      default:
        return <></>;
    }
  };

  return (
    <PageContainer
      title={
        <Space align="center">
          {' '}
          <Button
            size="small"
            type="primary"
            style={{ display: 'flex', padding: '5px' }}
            ghost
            icon={<ArrowLeftOutlined />}
            onClick={() => history.goBack()}
          />
          {isNew ? 'Nueva Solicitud' : `Solicitud No. ${request?.number}`}
        </Space>
      }
      loading={loading}
    >
      {isNew ? (
        <Card>
          <Steps>
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
        <FormRequest setRequest={setRequest} request={request} setCurrentStep={setCurrentStep} />
      )}
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    </PageContainer>
  );
}

export default SettingsForm;
