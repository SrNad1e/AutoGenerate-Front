/* eslint-disable react-hooks/exhaustive-deps */
import {
  ArrowLeftOutlined,
  DropboxOutlined,
  FileTextOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Divider, Space, Steps, Tooltip } from 'antd';
import { useParams, useHistory, useModel, useAccess } from 'umi';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef, useState } from 'react';

import FormRequest from '../components/FormRequest';
import SelectWarehouseStep from '@/components/SelectWarehouseStep';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useGetRequest } from '@/hooks/request.hooks';
import ReportRequest from '../reports/request';
import type { StockRequest, Warehouse } from '@/graphql/graphql';
import { StatusStockRequest } from '@/graphql/graphql';
import { useGetWarehouseId } from '@/hooks/warehouse.hooks';

import styles from './styles.less';
import './styles.less';

const { Step } = Steps;

const RequestForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [request, setRequest] = useState<Partial<StockRequest>>({
    status: StatusStockRequest.Open,
  });

  const { initialState } = useModel('@@initialState');

  const { id } = useParams<Partial<{ id: string }>>();
  const history = useHistory();

  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const [getRequest, { loading, data }] = useGetRequest();
  const [getWarehouseId] = useGetWarehouseId();

  const isNew = !id;

  const {
    request: { canEdit, canPrint },
  } = useAccess();

  const allowEdit = isNew
    ? true
    : initialState?.currentUser?._id === request?.user?._id &&
      request?.status === StatusStockRequest.Open &&
      canEdit;

  /**
   * @description se encarga de abrir aviso de información
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
   * @description consulta la solicitud y almacena en memoria
   */
  const getRequestId = async () => {
    try {
      const response = await getRequest({
        variables: {
          id: id || '',
        },
      });

      if (response?.data?.stockRequestId) {
        setRequest(response?.data?.stockRequestId as StockRequest);
      }
    } catch (error: any) {
      onShowError(error?.message);
    }
  };

  /**
   * @description se encarga de cambiar el paso, consultar y asignar la bodega
   * @param warehouseOriginId identificador bodega seleccionada
   */
  const changeCurrentStep = async (warehouseOriginId?: string) => {
    try {
      if (warehouseOriginId) {
        setCurrentStep(1);
        const response = await getWarehouseId({
          variables: {
            warehouseId: warehouseOriginId,
          },
        });

        setRequest({
          ...request,
          warehouseOrigin: response?.data?.warehouseId as Warehouse,
        });
      } else {
        setCurrentStep(0);
      }
    } catch (error: any) {
      onShowError(error?.message);
    }
  };

  useEffect(() => {
    if (!isNew) {
      getRequestId();
    }
  }, [isNew]);

  useEffect(() => {
    if (data?.stockRequestId) {
      setRequest(data?.stockRequestId as StockRequest);
    }
  }, [data]);

  /**
   * @description se encarga de renderizar los componentes con base al step
   * @param step paso en el cual se encuentra
   * @returns componente
   */
  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return (
          <SelectWarehouseStep
            warehouseId={initialState?.currentUser?.shop?.defaultWarehouse._id}
            changeCurrentStep={changeCurrentStep}
            label="Bodega Origen"
          />
        );
      case 1:
        return (
          <FormRequest allowEdit={allowEdit} request={request} setCurrentStep={setCurrentStep} />
        );
      default:
        return <></>;
    }
  };

  return (
    <PageContainer
      title={
        <Space align="center">
          <Tooltip title="Atrás">
            <Button
              type="primary"
              ghost
              icon={<ArrowLeftOutlined />}
              onClick={() => history.goBack()}
            />
          </Tooltip>
          <Divider type="vertical" />
          {isNew ? (
            'Nueva Solicitud'
          ) : (
            <>
              Solicitud No. {request?.number}
              <Divider type="vertical" />
              <Tooltip title="Imprimir">
                <Button
                  type="primary"
                  disabled={!canPrint}
                  icon={<PrinterOutlined />}
                  onClick={() => handlePrint()}
                />
              </Tooltip>
            </>
          )}
        </Space>
      }
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
        <FormRequest allowEdit={allowEdit} request={request} setCurrentStep={setCurrentStep} />
      )}
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <div style={{ display: 'none' }}>
        <ReportRequest ref={reportRef} data={request} />
      </div>
    </PageContainer>
  );
};

export default RequestForm;
