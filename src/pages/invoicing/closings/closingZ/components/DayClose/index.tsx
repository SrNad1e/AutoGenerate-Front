/* eslint-disable react-hooks/exhaustive-deps */
import { DollarCircleFilled, PrinterFilled, PrinterOutlined, ShopFilled } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, InputNumber, Modal, Row, Steps, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import numeral from 'numeral';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import type { RangePickerProps } from 'antd/lib/date-picker';

import type { CashRegister } from '@/graphql/graphql';
import { TypePayment } from '@/graphql/graphql';
import SelectPointOfSale from '@/components/SelectPointOfSale';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import ReportCloseZ from '../../reports/closeZ';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from '../styles';
import { useCreateCloseZInvoicing } from '@/hooks/closeZInvoicing.hooks';

const { Text, Title } = Typography;
const { Step } = Steps;
const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
  cashRegister: CashRegister;
};

const CloseDay = ({ visible, onCancel, cashRegister }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  const reportRef = useRef(null);

  const [createClose, { loading, data }] = useCreateCloseZInvoicing();

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const getTotal = () => {
    const keys = Object.keys(cashRegister);
    return keys.reduce((sum, item) => sum + cashRegister[item] * parseInt(item.slice(1)), 0) || 0;
  };

  const getTotalCash = () => {
    return (
      data?.createCloseZInvoicing?.payments?.reduce(
        (sum, payment) => sum + (payment?.payment?.type === TypePayment.Cash ? payment?.value : 0),
        0,
      ) || 0
    );
  };

  const getDifferenceCash = () => {
    const total = getTotal();
    const totalCash = getTotalCash();
    return total - totalCash;
  };

  const getTotalBank = () => {
    return (
      data?.createCloseZInvoicing?.payments?.reduce(
        (sum, payment) =>
          sum + (payment?.payment?.type === TypePayment.Cash ? payment?.quantity : 0),
        0,
      ) || 0
    );
  };

  const getDifferenceBank = () => {
    return (data?.createCloseZInvoicing?.quantityBank || 0) - getTotalBank();
  };

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description funcion usada por los hook para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const messageError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description funcion usada por los hook para mostrar el mensaje ok
   * @param message mensaje de error a mostrar
   */
  const messageSuccess = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'success',
      visible: true,
    });
  };

  const onFinish = async () => {
    switch (currentStep) {
      case 0:
        const values1 = await form.validateFields(['pointOfSaleId']);
        if (values1?.pointOfSaleId) {
          setCurrentStep(1);
        }
        break;
      case 1:
        const values2 = await form.validateFields(['closeDate', 'pointOfSaleId', 'quantityBank']);
        if (values2?.closeDate) {
          try {
            const response = await createClose({
              variables: {
                input: {
                  cashRegister,
                  closeDate: moment(values2?.closeDate).format(FORMAT_DATE_API),
                  pointOfSaleId: values2?.pointOfSaleId,
                  quantityBank: values2?.quantityBank || 0,
                },
              },
            });
            if (response?.data?.createCloseZInvoicing) {
              messageSuccess(
                `Se ha generado el cierre Z del punto de venta ${
                  response?.data?.createCloseZInvoicing?.pointOfSale?.shop?.name
                } / ${response?.data?.createCloseZInvoicing?.pointOfSale?.name} a la fecha ${moment(
                  response?.data?.createCloseZInvoicing?.closeDate,
                ).format(FORMAT_DATE_API)}, ya no se pude facturar`,
              );
              setCurrentStep(2);
            }
          } catch (e: any) {
            messageError(e?.message);
          }
        }
        break;
      case 2:
        handlePrint();
        onCancel();
        break;
      default:
        break;
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > moment().endOf('day');
  };

  useEffect(() => {
    setCurrentStep(0);
    form.resetFields();
    form.setFieldsValue({
      closeDate: moment(),
      total: getTotal(),
    });
  }, [visible]);

  return (
    <Modal
      destroyOnClose
      title="Cierre del día"
      visible={visible}
      onCancel={onCancel}
      footer={
        <>
          <Button loading={loading} onClick={onCancel}>
            {currentStep !== 2 ? 'Cancelar' : 'Cerrar'}
          </Button>
          {visible &&
            (currentStep === 2 ? (
              <Button
                icon={<PrinterOutlined />}
                loading={loading}
                type="primary"
                onClick={onFinish}
              >
                Imprimir
              </Button>
            ) : (
              <Button loading={loading} type="primary" onClick={onFinish}>
                {currentStep === 1 ? 'Crear Cierre' : 'Siguiente'}
              </Button>
            ))}
        </>
      }
    >
      <Steps current={currentStep}>
        <Step title="Punto de venta" icon={<ShopFilled />} />
        <Step title="Cierre" icon={<DollarCircleFilled />} />
        <Step title="Imprimir" icon={<PrinterFilled />} />
      </Steps>
      <Form
        style={styles.formMargin}
        form={form}
        layout="horizontal"
        initialValues={{
          quantityBank: 0,
        }}
        wrapperCol={{ span: 10 }}
        labelCol={{ span: 10 }}
      >
        {currentStep === 0 && (
          <FormItem
            name="pointOfSaleId"
            label="Seleccione Tienda"
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <SelectPointOfSale disabled={loading} />
          </FormItem>
        )}
        {currentStep === 1 && (
          <>
            <FormItem
              label="Seleccione fecha de cierre"
              rules={[{ required: true, message: 'Obligatorio' }]}
              name="closeDate"
            >
              <DatePicker
                disabled={loading}
                style={styles.inputWidth}
                placeholder="Seleccione Fecha"
                disabledDate={disabledDate}
              />
            </FormItem>
            <FormItem
              label="Valor de efectivo"
              rules={[{ required: true, message: 'Obligatorio' }]}
              name="total"
            >
              <InputNumber
                controls={false}
                style={styles.inputWidth}
                prefix="$"
                disabled
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
            <FormItem
              label="Cantidad de transacciones"
              rules={[{ required: true, message: 'Obligatorio' }]}
              name="quantityBank"
            >
              <InputNumber autoFocus controls={false} style={styles.inputWidth} />
            </FormItem>
          </>
        )}
        {currentStep === 2 && (
          <Row justify="center">
            <Col>
              <Title level={3}>Resumen Cierre Z</Title>
            </Col>
            <Col span={20}>
              <Text strong>Recaudo Efectivo:</Text>
            </Col>
            <Col
              span={4}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Text>{numeral(getTotalCash()).format('$ 0,0')}</Text>
            </Col>
            <Col span={20}>
              <Text strong>Efectivo Reportado:</Text>
            </Col>
            <Col
              span={4}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Text>{numeral(getTotal()).format('$ 0,0')}</Text>
            </Col>
            {getDifferenceCash() !== 0 && (
              <>
                <Col span={20}>
                  <Text strong>{getDifferenceCash() > 0 ? 'Sobrante' : 'Faltante'}</Text>
                </Col>
                <Col
                  span={4}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Text>
                    {numeral(
                      getDifferenceCash() > 0 ? getDifferenceCash() : -getDifferenceCash(),
                    ).format('$ 0,0')}
                  </Text>
                </Col>
              </>
            )}
            <Col span={20}>
              <Text strong>Transacciones:</Text>
            </Col>
            <Col
              span={4}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Text>{data?.createCloseZInvoicing?.quantityBank}</Text>
            </Col>
            <Col span={20}>
              <Text strong>Transacciones reportadas:</Text>
            </Col>
            <Col
              span={4}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Text>{getTotalBank()}</Text>
            </Col>
            {getDifferenceBank() !== 0 && (
              <>
                <Col span={20}>
                  <Text strong>{getDifferenceBank() > 0 ? 'Sobrante' : 'Faltante'}</Text>
                </Col>
                <Col
                  span={4}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Text>
                    {getDifferenceBank() > 0 ? getDifferenceBank() : -getDifferenceBank()}
                  </Text>
                </Col>
              </>
            )}
          </Row>
        )}
      </Form>
      <div style={{ display: 'none' }}>
        <ReportCloseZ ref={reportRef} data={data?.createCloseZInvoicing} />
      </div>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default CloseDay;
