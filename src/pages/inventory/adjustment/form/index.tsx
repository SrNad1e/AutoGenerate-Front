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
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useGetAdjustment } from '@/hooks/adjustment.hooks';
import SelectWarehouseStep from '@/components/SelectWarehouseStep';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useReactToPrint } from 'react-to-print';
import ReportAdjustment from '../reports/adjustment';
import FormAdjustment from '../components/FormAdjustment';

import styles from './styles.less';

const { Step } = Steps;

const AdjustmentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [adjustment, setAdjustment] = useState<
    Partial<ADJUSTMENT.Adjustment & ADJUSTMENT.CreateAdjustment>
  >({
    status: 'open',
  });

  //const { initialState } = useModel('@@initialState');

  const { id } = useParams<Partial<{ id: string }>>();

  const history = useHistory();

  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const isNew = !id;

  /** Funciones ejecutadas por los hooks */

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
   * @description se encarga de cargar la entrada actual
   * @param data datos de la entrada
   */
  const currentAdjustment = (data: Partial<ADJUSTMENT.Adjustment>) => {
    setAdjustment(data);
  };

  /**
   * @description se encarga de administrar el error
   * @param message mensaje de error
   */
  const showError = (message: string) => {
    onShowError(message);
  };

  /** FIn de Funciones ejecutadas por los hooks */

  /** Hooks para manejo de consultas */

  const { getAdjustment, loading } = useGetAdjustment(currentAdjustment, showError);

  /** Fin de Hooks para manejo de consultas */

  /**
   * @description se encarga de cambiar el paso y asignar la bodega
   * @param warehouse bodega seleccionada
   */
  const changeCurrentStep = (warehouse: WAREHOUSE.warehouse) => {
    if (warehouse) {
      setCurrentStep(1);

      setAdjustment({
        ...adjustment,
        warehouse,
      });
    } else {
      setCurrentStep(0);
    }
  };

  useEffect(() => {
    if (!isNew) {
      getAdjustment({
        variables: {
          id,
        },
      });
    }
  }, [isNew]);

  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return <SelectWarehouseStep changeCurrentStep={changeCurrentStep} label="Bodega" />;
      case 1:
        return (
          <FormAdjustment
            setAdjustment={setAdjustment}
            adjustment={adjustment}
            setCurrentStep={setCurrentStep}
          />
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
        <FormAdjustment
          setAdjustment={setAdjustment}
          adjustment={adjustment}
          setCurrentStep={setCurrentStep}
        />
      )}
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <div style={{ display: 'none' }}>
        <ReportAdjustment ref={reportRef} data={adjustment} />
      </div>
    </PageContainer>
  );
};

export default AdjustmentForm;
