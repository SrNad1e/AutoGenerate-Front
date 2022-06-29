/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftOutlined,
  DropboxOutlined,
  FileTextOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Divider, Space, Steps, Tooltip } from 'antd';
import { useHistory, useModel, useParams, useAccess } from 'umi';
import { useReactToPrint } from 'react-to-print';

import type { StockTransfer, Warehouse } from '@/graphql/graphql';
import { StatusStockTransfer } from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import FormTransfer from '../components/FormTransfer';
import SelectWarehouseStep from '@/components/SelectWarehouseStep';
import { useGetWarehouseId } from '@/hooks/warehouse.hooks';
import { useGetTransfer } from '@/hooks/transfer.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import ReportTransfer from '../reports/transfer';

import './styles.less';
import styles from './styles.less';

const { Step } = Steps;

const Form = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [transfer, setTransfer] = useState<Partial<StockTransfer>>({
    status: StatusStockTransfer.Open,
  });

  const { initialState } = useModel('@@initialState');

  const { id } = useParams<Partial<{ id: string }>>();
  const history = useHistory();

  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const [getTransfer, { loading, data }] = useGetTransfer();
  const [getWarehouseId] = useGetWarehouseId();

  const isNew = !id;

  const {
    transfer: { canPrint, canEdit },
  } = useAccess();

  const allowEdit = isNew
    ? true
    : transfer?.status === StatusStockTransfer.Open &&
      (!transfer?.warehouseOrigin?._id ||
        transfer?.warehouseOrigin?._id ===
          initialState?.currentUser?.shop?.defaultWarehouse?._id) &&
      initialState?.currentUser?._id === transfer?.userOrigin?._id &&
      canEdit;

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
   * @description consulta la solicitud y almacena en memoria
   */
  const getTransferId = async () => {
    try {
      const response = await getTransfer({
        variables: {
          id: id || '',
        },
      });

      if (response?.data?.stockTransferId) {
        setTransfer(response?.data?.stockTransferId as StockTransfer);
      }
    } catch (error: any) {
      onShowError(error?.message);
    }
  };

  /**
   * @description se encarga de cambiar el paso, consultar y asignar la bodega
   * @param warehouseDestinationId identificador bodega seleccionada
   */
  const changeCurrentStep = async (warehouseDestinationId?: string) => {
    try {
      if (warehouseDestinationId) {
        setCurrentStep(1);
        const response = await getWarehouseId({
          variables: {
            warehouseId: warehouseDestinationId,
          },
        });

        setTransfer({
          ...transfer,
          warehouseDestination: response?.data?.warehouseId as Warehouse,
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
      getTransferId();
    }
  }, [isNew]);

  useEffect(() => {
    if (data?.stockTransferId) {
      setTransfer(data?.stockTransferId as StockTransfer);
    }
  }, [data]);

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
        return (
          <SelectWarehouseStep
            warehouseId={initialState?.currentUser?.shop?.defaultWarehouse._id}
            changeCurrentStep={changeCurrentStep}
            label="Bodega Destino"
          />
        );
      case 1:
        return (
          <FormTransfer allowEdit={allowEdit} transfer={transfer} setCurrentStep={setCurrentStep} />
        );
      default:
        return <ErrorStep />;
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
            'Nuevo traslado'
          ) : (
            <>
              Traslado No. {transfer?.number}
              <Divider type="vertical" />
              <Tooltip title="Imprimir">
                <Button
                  type="primary"
                  icon={<PrinterOutlined />}
                  onClick={() => handlePrint()}
                  disabled={!canPrint}
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
        <FormTransfer allowEdit={allowEdit} transfer={transfer} setCurrentStep={setCurrentStep} />
      )}
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <div style={{ display: 'none' }}>
        <ReportTransfer ref={reportRef} data={data?.stockTransferId} />
      </div>
    </PageContainer>
  );
};

export default Form;
