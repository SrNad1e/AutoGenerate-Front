/* eslint-disable react-hooks/exhaustive-deps */
import type { Payment } from '@/graphql/graphql';
import { useCreatePayments, useUpdatePayment } from '@/hooks/payment.hooks';
import { AliyunOutlined, BankOutlined, BgColorsOutlined, DollarOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, Select, Space, Switch, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styles from '../styles';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { StatusTypePayment } from '../paymentMethod.data';
import ImageAdmin from '@/components/ImageAdmin';

const FormItem = Form.Item;
const { Text } = Typography;
const { Option } = Select;

type Props = {
  visible: boolean;
  onCancel: () => void;
  paymentMethod: Payment;
};

const PaymentMethodsForm = ({ onCancel, paymentMethod, visible }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const isNew = !paymentMethod?._id;
  const [form] = Form.useForm();

  const [updatePayment /*paramsUpdatePayment*/] = useUpdatePayment();
  const [createPayment /*paramsCreatePayment*/] = useCreatePayments();

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    form.resetFields();
  };

  /**
   * @description cierra la alerta y resetea los campos del form
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    closeAndClear();
  };
  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'warning',
      visible: true,
    });
  };

  const updatePaymentMethod = async () => {
    const values = await form.validateFields();
    try {
      const response = await updatePayment({
        variables: {
          id: paymentMethod._id,
          input: {
            ...values,
          },
        },
      });
      if (response?.data?.updatePayment) {
        setAlertInformation({
          message: `Pago ${response?.data?.updatePayment?.name} actualizado correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      if (error.message) {
        showError(error?.message);
      }
    }
  };

  const createNewPaymentMethod = async () => {
    const values = await form.validateFields();

    try {
      const response = await createPayment({
        variables: {
          input: {
            ...values,
          },
        },
      });
      if (response?.data?.createPayment) {
        setAlertInformation({
          message: `Pago ${response?.data?.createPayment?.name} creado correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      if (error.message) {
        showError(error?.message);
      }
    }
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...paymentMethod,
      logo: paymentMethod?.logo?.urls?.webp,
    });
  }, [visible]);

  return (
    <Modal
      onCancel={closeAndClear}
      visible={visible}
      okText={isNew ? 'Crear' : 'Actualizar'}
      title={isNew ? 'Crear Medio de Pago' : 'Actualizar Medio de Pago'}
      cancelText="Cancelar"
      destroyOnClose
      onOk={isNew ? () => createNewPaymentMethod() : () => updatePaymentMethod()}
      okButtonProps={{
        style: styles.buttonR,
      }}
      cancelButtonProps={{ style: styles.buttonR }}
    >
      <Row align="middle" justify="center">
        <Form layout="vertical" form={form}>
          <FormItem
            label={
              <Space>
                <DollarOutlined />
                <Text>Nombre</Text>
              </Space>
            }
            name="name"
          >
            <Input placeholder="Nombre del medio de pago" />
          </FormItem>
          <FormItem
            label={
              <Space>
                <BankOutlined />
                <Text>Tipo de Pago</Text>
              </Space>
            }
            name="type"
          >
            <Select style={{ width: '100%' }} placeholder="Seleccione el Estado" disabled={false}>
              {Object.keys(StatusTypePayment).map((type) => (
                <Option key={type}>
                  <Text> {StatusTypePayment[type].label} </Text>
                </Option>
              ))}
            </Select>
          </FormItem>
          {!isNew && (
            <Col>
              <FormItem label="Activo" name="active" valuePropName="checked">
                <Switch checked />
              </FormItem>
            </Col>
          )}
          <FormItem
            label={
              <Space>
                <BgColorsOutlined />
                <Text>Color</Text>
              </Space>
            }
            name="color"
          >
            <Input type="color" />
          </FormItem>
          <FormItem
            label={
              <Space>
                <AliyunOutlined />
                <Text>Logo</Text>
              </Space>
            }
            name="logo"
          >
            <ImageAdmin limit={1} disabled={false} />
          </FormItem>
        </Form>
      </Row>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default PaymentMethodsForm;
