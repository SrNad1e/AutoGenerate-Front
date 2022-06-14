/* eslint-disable react-hooks/exhaustive-deps */
import { useAccess, useHistory, useModel, useParams } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Divider, Space, Steps, Tooltip } from 'antd';
import {
  ArrowLeftOutlined,
  DropboxOutlined,
  FileTextOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useGetInput } from '@/hooks/input.hooks';
import SelectWarehouseStep from '@/components/SelectWarehouseStep';
import AlertInformation from '@/components/Alerts/AlertInformation';
import FormInput from '../components/FormInput';
import ReportInput from '../reports/input';
import type { StockInput, Warehouse } from '@/graphql/graphql';
import { StatusStockInput } from '@/graphql/graphql';
import { useGetWarehouseId } from '@/hooks/warehouse.hooks';

import styles from './styles.less';

const { Step } = Steps;

const InputForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [input, setInput] = useState<Partial<StockInput>>({
    status: StatusStockInput.Open,
  });

  const { id } = useParams<Partial<{ id: string }>>();

  const history = useHistory();

  const reportRef = useRef(null);

  const { initialState } = useModel('@@initialState');

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const [getInput, { loading, data }] = useGetInput();
  const [getWarehouseId] = useGetWarehouseId();

  const isNew = !id;
  const {
    input: { canPrint, canEdit },
  } = useAccess();

  const allowEdit = isNew
    ? true
    : initialState?.currentUser?._id === input?.user?._id &&
      input?.status === StatusStockInput.Open &&
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
   * @description consulta la entrada y almacena en memoria
   */
  const getInputId = async () => {
    try {
      const response = await getInput({
        variables: {
          id: id || '',
        },
      });

      if (response?.data?.stockInputId) {
        setInput(response?.data?.stockInputId as StockInput);
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

        setInput({
          ...input,
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
      getInputId();
    }
  }, [isNew]);

  useEffect(() => {
    if (data?.stockInputId) {
      setInput(data?.stockInputId as StockInput);
    }
  }, [data]);

  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return <SelectWarehouseStep changeCurrentStep={changeCurrentStep} label="Bodega" />;
      case 1:
        return <FormInput allowEdit={allowEdit} input={input} setCurrentStep={setCurrentStep} />;
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
            'Nueva Entrada'
          ) : (
            <>
              {' '}
              Entrada No. {input?.number} <Divider type="vertical" />
              <Tooltip title="Imprimir">
                <Button
                  type="primary"
                  icon={<PrinterOutlined />}
                  disabled={!canPrint}
                  onClick={() => handlePrint()}
                />
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
        <FormInput allowEdit={allowEdit} input={input} setCurrentStep={setCurrentStep} />
      )}
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
      <div style={{ display: 'none' }}>
        <ReportInput ref={reportRef} data={input} />
      </div>
    </PageContainer>
  );
};

export default InputForm;
