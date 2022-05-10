/* eslint-disable react-hooks/exhaustive-deps */
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Divider, Space, Steps, Tooltip } from 'antd';
import {
  ArrowLeftOutlined,
  DropboxOutlined,
  FileTextOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import { useHistory, useParams } from 'umi';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useGetAdjustment } from '@/hooks/adjustment.hooks';
import SelectWarehouseStep from '@/components/SelectWarehouseStep';
import AlertInformation from '@/components/Alerts/AlertInformation';
import ReportAdjustment from '../reports/adjustment';
import FormAdjustment from '../components/FormAdjustment';
import type { StockAdjustment, Warehouse } from '@/graphql/graphql';
import { useGetWarehouseId } from '@/hooks/warehouse.hooks';

import styles from './styles.less';

const { Step } = Steps;

const AdjustmentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [adjustment, setAdjustment] = useState<Partial<StockAdjustment>>({
    status: 'open',
  });

  const { id } = useParams<Partial<{ id: string }>>();

  const history = useHistory();

  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const isNew = !id;

  const [getAdjustment, { loading, data }] = useGetAdjustment();
  const [getWarehouseId] = useGetWarehouseId();

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
  const getAdjustmentId = async () => {
    try {
      const response = await getAdjustment({
        variables: {
          id: id || '',
        },
      });

      if (response?.data?.stockAdjustmentId) {
        setAdjustment(response?.data?.stockAdjustmentId as StockAdjustment);
      }
    } catch (error: any) {
      onShowError(error?.message);
    }
  };

  /**
   * @description se encarga de cambiar el paso, consultar y asignar la bodega
   * @param warehouseId identificador bodega seleccionada
   */
  const changeCurrentStep = async (warehouseId?: string) => {
    try {
      if (warehouseId) {
        setCurrentStep(1);
        const response = await getWarehouseId({
          variables: {
            warehouseId,
          },
        });

        setAdjustment({
          ...adjustment,
          warehouse: response?.data?.warehouseId as Warehouse,
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
      getAdjustmentId();
    }
  }, [isNew]);

  useEffect(() => {
    if (data?.stockAdjustmentId) {
      setAdjustment(data?.stockAdjustmentId as StockAdjustment);
    }
  }, [data]);

  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return <SelectWarehouseStep changeCurrentStep={changeCurrentStep} label="Bodega" />;
      case 1:
        return <FormAdjustment adjustment={adjustment} setCurrentStep={setCurrentStep} />;
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
            'Nuevo Ajuste'
          ) : (
            <>
              Ajuste No. {adjustment?.number} <Divider type="vertical" />
              <Tooltip title="Imprimir">
                <Button type="primary" icon={<PrinterOutlined />} onClick={() => handlePrint()} />
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
        <FormAdjustment adjustment={adjustment} setCurrentStep={setCurrentStep} />
      )}
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <div style={{ display: 'none' }}>
        {<ReportAdjustment ref={reportRef} data={adjustment} />}
      </div>
    </PageContainer>
  );
};

export default AdjustmentForm;
