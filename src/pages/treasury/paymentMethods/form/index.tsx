/* eslint-disable react-hooks/exhaustive-deps */
import {
  AliyunOutlined,
  BankOutlined,
  BgColorsOutlined,
  DollarOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, Select, Space, Switch, Typography } from 'antd';
import { useCreatePayments, useUpdatePayment } from '@/hooks/payment.hooks';
import type { Payment } from '@/graphql/graphql';
import { useEffect, useState } from 'react';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { StatusTypePayment } from '../paymentMethod.data';
import ImageAdmin from '@/components/ImageAdmin';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

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

  const [updatePayment, paramsUpdatePayment] = useUpdatePayment();
  const [createPayment, paramsCreatePayment] = useCreatePayments();

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

  /**
   * @description funcion usada para actualiar un medio de pago existente
   */
  const updatePaymentMethod = async () => {
    const values = await form.validateFields();

    try {
      const response = await updatePayment({
        variables: {
          id: paymentMethod._id,
          input: {
            ...values,
            logoId: values?.logoId[0]?._id,
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

  /**
   * @description funcion ejecutada para crear un nuevo medio de pago
   */
  const createNewPaymentMethod = async () => {
    const values = await form.validateFields();

    try {
      if (values?.logoId?.length > 0) {
        values.logoId = values?.logoId[0]?._id;
      } else {
        delete values?.logoId;
      }

      const response = await createPayment({
        variables: {
          input: values,
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
      logoId: paymentMethod?.logo ? [paymentMethod?.logo] : [],
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
        loading: paramsCreatePayment?.loading || paramsUpdatePayment?.loading,
      }}
      cancelButtonProps={{
        style: styles.buttonR,
        loading: paramsCreatePayment?.loading || paramsUpdatePayment?.loading,
      }}
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
            rules={[
              {
                required: true,
                message: 'Este campo no puede estar vacio',
              },
            ]}
            name="name"
          >
            <Input
              placeholder="Nombre del medio de pago"
              disabled={paramsCreatePayment?.loading || paramsUpdatePayment?.loading}
            />
          </FormItem>
          <FormItem
            label={
              <Space>
                <BankOutlined />
                <Text>Tipo de Pago</Text>
              </Space>
            }
            rules={[
              {
                required: true,
                message: 'Este campo no puede estar vacio',
              },
            ]}
            name="type"
          >
            <Select
              style={{ width: '100%' }}
              placeholder="Seleccione el Estado"
              loading={paramsCreatePayment?.loading || paramsUpdatePayment?.loading}
            >
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
                <Switch
                  checked
                  disabled={paramsCreatePayment?.loading || paramsUpdatePayment?.loading}
                />
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
            <Input
              type="color"
              disabled={paramsCreatePayment?.loading || paramsUpdatePayment?.loading}
            />
          </FormItem>
          <FormItem
            label={
              <Space>
                <MessageOutlined />
                <Text>Mensaje</Text>
              </Space>
            }
            name="message"
          >
            <TextArea
              maxLength={175}
              showCount
              autoSize
              disabled={paramsCreatePayment?.loading || paramsUpdatePayment?.loading}
            />
          </FormItem>
          <FormItem
            label={
              <Space>
                <AliyunOutlined />
                <Text>Logo</Text>
              </Space>
            }
            name="logoId"
          >
            <ImageAdmin
              limit={1}
              disabled={paramsCreatePayment?.loading || paramsUpdatePayment?.loading}
            />
          </FormItem>
        </Form>
      </Row>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default PaymentMethodsForm;
