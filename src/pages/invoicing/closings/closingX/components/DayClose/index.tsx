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
import { useCreateCloseXInvoicing } from '@/hooks/closeXInvoicing.hooks';
import ReportCloseX from '../../reports/closeX';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from '../styles';
import { useGetCurrentUser } from '@/hooks/user.hooks';

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
  const [expensesSize, setExpensesSize] = useState(0);
  const [quantityBankState, setQuantityBankState] = useState(0);

  const [form] = Form.useForm();

  const reportRef = useRef(null);

  const [createClose, { loading, data }] = useCreateCloseXInvoicing();

  const currentUser = useGetCurrentUser();

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const getTotal = () => {
    const keys = Object.keys(cashRegister);
    return keys.reduce((sum, item) => sum + cashRegister[item] * parseInt(item.slice(1)), 0) || 0;
  };

  const paymentCreditCash = data?.createCloseXInvoicing?.paymentsCredit?.reduce(
    (sum, payment) => sum + (payment?.payment?.type === 'CASH' ? payment?.value : 0),
    0,
  );

  const getTotalCash = () => {
    return (
      data?.createCloseXInvoicing?.payments?.reduce(
        (sum, payment) => sum + (payment?.payment?.type === TypePayment.Cash ? payment?.value : 0),
        0,
      ) || 0
    );
  };

  const getTotalBank = () => {
    return (
      data?.createCloseXInvoicing?.payments?.reduce(
        (sum, payment) =>
          sum + (payment?.payment?.type === TypePayment.Bank ? payment?.quantity : 0),
        0,
      ) || data?.createCloseXInvoicing?.quantityBank
    );
  };

  const getTotalExpenses = () => {
    const totalExpenses = data?.createCloseXInvoicing?.expenses?.reduce(
      (sum, current) => sum + current.value,
      0,
    );
    return totalExpenses;
  };

  const getDifferenceCash = () => {
    const total = getTotal();
    const totalCash = getTotalCash();
    const totalExpenses = getTotalExpenses();
    return total + totalExpenses - (totalCash + paymentCreditCash);
  };

  const getDifferenceBank = () => {
    return (data?.createCloseXInvoicing?.quantityBank || 0) - getTotalBank();
  };

  const totalExpenses = data?.createCloseXInvoicing?.expenses?.reduce(
    (sum, expense) => sum + expense?.value,
    0,
  );

  const quantityCreditBank = data?.createCloseXInvoicing?.paymentsCredit?.reduce(
    (sum, payment) => sum + (payment?.payment?.type === 'BANK' ? payment?.quantity : 0),
    0,
  );

  const diff = getTotal() + totalExpenses - (getTotalCash() + paymentCreditCash);

  const quantityBank = data?.createCloseXInvoicing?.payments?.reduce(
    (sum, payment) => sum + (payment?.payment?.type === 'BANK' ? payment?.quantity : 0),
    0,
  );

  const diffBank =
    data?.createCloseXInvoicing?.quantityBank +
    quantityCreditBank -
    (quantityBank + quantityCreditBank);
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

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > moment().endOf('day');
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
            if (response?.data?.createCloseXInvoicing) {
              messageSuccess(
                `Se ha generado el cierre X del punto de venta ${
                  response?.data?.createCloseXInvoicing?.pointOfSale?.shop?.name
                } / ${response?.data?.createCloseXInvoicing?.pointOfSale?.name} a la fecha ${moment(
                  response?.data?.createCloseXInvoicing?.closeDate,
                ).format(FORMAT_DATE)}`,
              );
              setQuantityBankState(response?.data?.createCloseXInvoicing?.quantityBank);
              setExpensesSize(response?.data?.createCloseXInvoicing?.expenses?.length);
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

  useEffect(() => {
    setCurrentStep(0);
    form?.resetFields();
    form?.setFieldsValue({
      closeDate: moment(),
      total: getTotal(),
    });

    if (!currentUser?.data?.currentUser?.role?.changeWarehouse) {
      setCurrentStep(1);
      form.setFieldsValue({ pointOfSaleId: currentUser?.data?.currentUser?.pointOfSale?._id });
    }
  }, [visible]);

  return (
    <Modal
      destroyOnClose
      title="Cierre del día"
      visible={visible}
      onCancel={onCancel}
      footer={
        <>
          <Button loading={loading} style={{ borderRadius: 5 }} onClick={onCancel}>
            {currentStep !== 2 ? 'Cancelar' : 'Cerrar'}
          </Button>

          {visible &&
            (currentStep === 2 ? (
              <Button
                icon={<PrinterOutlined />}
                loading={loading}
                type="primary"
                onClick={onFinish}
                style={{ borderRadius: 5 }}
              >
                Imprimir
              </Button>
            ) : (
              <Button
                loading={loading}
                type="primary"
                style={{ borderRadius: 5 }}
                onClick={onFinish}
              >
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
              <Title level={3}>Resumen Cierre X</Title>
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
            {getDifferenceCash() !== 0 && expensesSize === 0 && (
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
            {diff !== 0 && expensesSize > 0 && (
              <>
                <Col span={20}>
                  <Text strong>{diff > 0 ? 'Sobrante' : 'Faltante'}</Text>
                </Col>
                <Col
                  span={4}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Text>{numeral(diff > 0 ? diff : diff * -1).format('$ 0,0')}</Text>
                </Col>
              </>
            )}
            {expensesSize > 0 && (
              <>
                <Col span={20}>
                  <Text strong>{'Egresos'}</Text>
                </Col>
                <Col
                  span={4}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Text>{numeral(getTotalExpenses()).format('$ 0,0')}</Text>
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
              <Text>{getTotalBank()}</Text>
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
              <Text>{data?.createCloseXInvoicing?.quantityBank}</Text>
            </Col>
            {getDifferenceBank() > 0 && expensesSize === 0 && quantityBankState > 0 && (
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
            {diffBank !== 0 && expensesSize > 0 && (
              <>
                <Col span={20}>
                  <Text strong>{diffBank > 0 ? 'Sobrante' : 'Faltante'}</Text>
                </Col>
                <Col
                  span={4}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Text>{diffBank > 0 ? diffBank : diffBank * -1}</Text>
                </Col>
              </>
            )}
          </Row>
        )}
      </Form>
      <div style={{ display: 'none' }}>
        <ReportCloseX ref={reportRef} data={data?.createCloseXInvoicing} />
      </div>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default CloseDay;
