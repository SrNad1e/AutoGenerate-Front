/* eslint-disable react-hooks/exhaustive-deps */
import { DollarCircleFilled, PrinterFilled, PrinterOutlined, ShopFilled } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, InputNumber, Modal, Row, Steps, Typography } from 'antd';
import { useEffect, useState } from 'react';
import numeral from 'numeral';
import moment from 'moment';

import type { CashRegister } from '@/graphql/graphql';
import SelectPointOfSale from '@/components/SelectPointOfSale';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useCreateCloseXInvoicing } from '@/hooks/closeXInvoicing.hooks';

import styles from '../styles';
import AlertInformation from '@/components/Alerts/AlertInformation';

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

  const [createClose, { loading, data }] = useCreateCloseXInvoicing();

  const getTotal = () => {
    const keys = Object.keys(cashRegister);
    return keys.reduce((sum, item) => sum + cashRegister[item] * parseInt(item.slice(1)), 0) || 0;
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
        const values2 = await form.validateFields(['closeDate', 'pointOfSaleId']);
        if (values2?.closeDate) {
          try {
            const response = await createClose({
              variables: {
                input: {
                  cashRegister,
                  closeDate: moment(values2?.closeDate).format(FORMAT_DATE_API),
                  pointOfSaleId: values2?.pointOfSaleId,
                },
              },
            });
            if (response?.data?.createCloseXInvoicing) {
              messageSuccess(
                `Se ha cerrado el punto de venta ${
                  response?.data?.createCloseXInvoicing?.pointOfSale?.shop?.name
                } / ${response?.data?.createCloseXInvoicing?.pointOfSale?.name} a la fecha ${moment(
                  response?.data?.createCloseXInvoicing?.closeDate,
                ).format(FORMAT_DATE_API)}`,
              );
              setCurrentStep(2);
            }
          } catch (e: any) {
            messageError(e?.message);
          }
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setCurrentStep(0);
    form.resetFields();
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
            Cancelar
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
        wrapperCol={{ span: 10 }}
        labelCol={{ span: 10 }}
        initialValues={{
          closeDate: moment(),
          total: getTotal(),
        }}
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
                autoFocus
                style={styles.inputWidth}
                placeholder="Seleccione Fecha"
              />
            </FormItem>
            <FormItem
              label="Cantidad de efectivo"
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
          </>
        )}
        {currentStep === 2 && (
          <>
            <Row justify="center">
              <Col>
                <Title level={3}>Resumen Cierre</Title>
              </Col>
              <Col span={20}>
                <Text strong>Total Venta:</Text>
              </Col>
              <Col span={4}>
                <Text>
                  {numeral(data?.createCloseXInvoicing?.summaryOrder?.value).format('$ 0,0')}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Text strong>Efectivo</Text>
              </Col>
              <Col span={4}>
                <Text>
                  {numeral(
                    data?.createCloseXInvoicing?.payments?.find(
                      (payment) => payment?.payment?.name === 'cash',
                    )?.quantity,
                  ).format('$ 0,0')}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Text strong>Total Efectivo:</Text>
              </Col>
              <Col span={4}>
                <Text>{numeral(100000).format('$ 0,0')}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Text strong>Total Efectivo Reportado:</Text>
              </Col>
              <Col span={4}>
                <Text>{numeral(10000).format('$ 0,0')}</Text>
              </Col>
            </Row>
            {'status' ? (
              <Row>
                <Col span={20}>
                  <Text strong>Sobrante:</Text>
                </Col>
                <Col span={4}>
                  <Text>{numeral(10000).format('$ 0,0')}</Text>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col span={20}>
                  <Text strong>Faltante:</Text>
                </Col>
                <Col span={4}>
                  <Text strong>{numeral((10000 || 0) * -1).format('$ 0,0')}</Text>
                </Col>
              </Row>
            )}
            <Row>
              <Col span={20}>
                <Text strong>Transferencias reportadas:</Text>
              </Col>
              <Col span={4}>
                <Text>{10}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Text strong>Transferencias registradas:</Text>
              </Col>
              <Col span={4}>
                <Text>{12}</Text>
              </Col>
            </Row>
            {'status' ? (
              <Row>
                <Col span={20}>
                  <Text strong>Sobrante Transferencia:</Text>
                </Col>
                <Col span={4}>
                  <Text>{12}</Text>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col span={20}>
                  <Text strong>Faltante Transferencia:</Text>
                </Col>
                <Col span={4}>
                  <Text strong>{(12 || 0) * -1}</Text>
                </Col>
              </Row>
            )}
          </>
        )}
      </Form>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default CloseDay;
