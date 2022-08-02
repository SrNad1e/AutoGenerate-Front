/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, Input, InputNumber, Modal, Row, Space, Switch, Typography } from 'antd';
import { DollarOutlined, ProfileOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { Box } from '@/graphql/graphql';
import { useCreateBox, useUpdateBox } from '@/hooks/box.hooks';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  boxData: Box;
};

const BoxForm = ({ boxData, onCancel, visible }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const isNew = !boxData?._id;
  const [form] = Form.useForm();

  const [createBox, paramsCreateBox] = useCreateBox();
  const [updateBox, paramsUpdateBox] = useUpdateBox();

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
   * @description ejecuta la mutation para actualizar una caja
   */
  const editBox = async () => {
    const values = await form.validateFields();

    try {
      const response = await updateBox({
        variables: {
          input: values,
          id: boxData?._id || '',
        },
      });
      if (response?.data?.updateBox) {
        setAlertInformation({
          message: `Caja ${response?.data?.updateBox?.name} actualizada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      if (e?.message) {
        showError(e?.message);
      }
    }
  };

  /**
   * @description ejecuta la mutation para crear una caja
   */
  const createNewBox = async () => {
    const values = await form.validateFields();

    try {
      const response = await createBox({
        variables: {
          input: { ...values },
        },
      });
      if (response?.data?.createBox) {
        setAlertInformation({
          message: `Caja ${response?.data?.createBox?.name} creada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      if (e?.message) {
        showError(e?.message);
      }
    }
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      ...boxData,
    });
  }, [visible]);

  return (
    <Modal
      visible={visible}
      width={400}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={closeAndClear}
      onOk={isNew ? () => createNewBox() : () => editBox()}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Caja' : 'Actualizar Caja'}
      cancelButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreateBox?.loading || paramsUpdateBox?.loading,
        loading: paramsCreateBox?.loading || paramsUpdateBox?.loading,
      }}
      okButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreateBox?.loading || paramsUpdateBox?.loading,
        loading: paramsCreateBox?.loading || paramsUpdateBox?.loading,
      }}
    >
      <Form form={form} layout="vertical" style={styles.centerForm}>
        <Row>
          <Col span={24}>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="name"
              label={
                <Space>
                  <ProfileOutlined />
                  <Text>Nombre</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese nombre"
                disabled={paramsCreateBox?.loading || paramsUpdateBox?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="base"
              label={
                <Space>
                  <DollarOutlined />
                  <Text>Base</Text>
                </Space>
              }
            >
              <InputNumber
                min={0}
                step={100}
                style={styles.maxWidth}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                placeholder="Ingrese base"
                disabled={paramsCreateBox?.loading || paramsUpdateBox?.loading}
              />
            </FormItem>
            <FormItem name="isMain" label={<Text>¿Es Principal?</Text>} valuePropName="checked">
              <Switch disabled={paramsCreateBox?.loading || paramsUpdateBox?.loading} />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default BoxForm;
