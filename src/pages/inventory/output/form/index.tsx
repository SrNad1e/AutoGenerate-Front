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
import { useGetOutput } from '@/hooks/output.hooks';
import SelectWarehouseStep from '@/components/SelectWarehouseStep';
import AlertInformation from '@/components/Alerts/AlertInformation';
import FormOutput from '../components/FormOutput';
import ReportOutput from '../reports/output';
import type { StockOutput, Warehouse } from '@/graphql/graphql';
import { useGetWarehouseId } from '@/hooks/warehouse.hooks';

import styles from './styles.less';

const { Step } = Steps;

const OutputForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [output, setOutput] = useState<Partial<StockOutput>>({
    status: 'open',
  });

  const { id } = useParams<Partial<{ id: string }>>();

  const history = useHistory();

  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const [getOutput, { loading, data }] = useGetOutput();
  const [getWarehouseId] = useGetWarehouseId();

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
   * @description consulta la salida y almacena en memoria
   */
  const getOutputId = async () => {
    try {
      const response = await getOutput({
        variables: {
          id: id || '',
        },
      });

      if (response?.data?.stockOutputId) {
        setOutput(response?.data?.stockOutputId as StockOutput);
      }
    } catch (error: any) {
      onShowError(error?.message);
    }
  };

  /**
   * @description se encarga de cambiar el paso y asignar la bodega
   * @param warehouseId identificador bodega seleccionada
   */
  const changeCurrentStep = async (warehouseId: string) => {
    try {
      if (warehouseId) {
        setCurrentStep(1);
        const response = await getWarehouseId({
          variables: {
            warehouseId: warehouseId,
          },
        });

        setOutput({
          ...output,
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
      getOutputId();
    }
  }, [isNew]);

  useEffect(() => {
    if (data?.stockOutputId) {
      setOutput(data?.stockOutputId as StockOutput);
    }
  }, [data]);

  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return <SelectWarehouseStep changeCurrentStep={changeCurrentStep} label="Bodega" />;
      case 1:
        return <FormOutput output={output} setCurrentStep={setCurrentStep} />;
      default:
        return <></>;
    }
  };

  return (
    <PageContainer
      title={
        <Space align="center">
          {' '}
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
            'Nueva Salida'
          ) : (
            <>
              {' '}
              Salida No. {output?.number} <Divider type="vertical" />
              <Tooltip title="Imprimir">
                <Button type="primary" icon={<PrinterOutlined />} onClick={() => handlePrint()} />
              </Tooltip>{' '}
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
        <FormOutput output={output} setCurrentStep={setCurrentStep} />
      )}
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <div style={{ display: 'none' }}>
        <ReportOutput ref={reportRef} data={output} />
      </div>
    </PageContainer>
  );
};

export default OutputForm;
