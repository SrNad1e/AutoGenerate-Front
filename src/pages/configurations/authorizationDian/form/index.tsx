/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, Input, Modal, Row, Space, Typography } from 'antd';
import { FieldNumberOutlined, FileProtectOutlined } from '@ant-design/icons';
import type { AuthorizationDian } from '@/graphql/graphql';
import { useCreateAuthorization, useUpdateAuthorization } from '@/hooks/authorization.hooks';
import { useEffect, useState } from 'react';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  authorizationData: AuthorizationDian;
};

const AuthorizationDianForm = ({ authorizationData, onCancel, visible }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const isNew = !authorizationData?._id;
  const [form] = Form.useForm();

  const [createAuthorization, paramsCreateAuthorization] = useCreateAuthorization();
  const [updateAuthorization, paramsUpdateAuthorization] = useUpdateAuthorization();

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
   * @description ejecuta la mutation para actualizar una autorizacion
   */
  const editAuthorization = async () => {
    const values = await form.validateFields();

    try {
      const response = await updateAuthorization({
        variables: {
          input: values,
          id: authorizationData?._id || '',
        },
      });
      if (response?.data?.updateAuthorization) {
        setAlertInformation({
          message: `Autorización ${response?.data?.updateAuthorization?.prefix} actualizada correctamente`,
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
   * @description ejecuta la mutation para crear una autorizacion
   */
  const createNewAuthorization = async () => {
    const values = await form.validateFields();

    try {
      const response = await createAuthorization({
        variables: {
          input: { ...values },
        },
      });
      if (response?.data?.createAuthorization) {
        setAlertInformation({
          message: `Autorización ${response?.data?.createAuthorization?.prefix} creada correctamente`,
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
      ...authorizationData,
    });
  }, [visible]);

  return (
    <Modal
      visible={visible}
      width={400}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={closeAndClear}
      onOk={isNew ? () => createNewAuthorization() : () => editAuthorization()}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Autorización' : 'Actualizar Autorización'}
      cancelButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading,
        loading: paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading,
      }}
      okButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading,
        loading: paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading,
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
              name="prefix"
              label={
                <Space>
                  <FileProtectOutlined />
                  <Text>Prefijo</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese prefijo"
                disabled={paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="prefix"
              label={
                <Space>
                  <FileProtectOutlined />
                  <Text>Resolución de Facturación</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese prefijo"
                disabled={paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="prefix"
              label={
                <Space>
                  <FieldNumberOutlined />
                  <Text>Inicio</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese prefijo"
                disabled={paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="prefix"
              label={
                <Space>
                  <FieldNumberOutlined />
                  <Text>Final</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese prefijo"
                disabled={paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="prefix"
              label={
                <Space>
                  <FileProtectOutlined />
                  <Text>Fechas</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese prefijo"
                disabled={paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="prefix"
              label={
                <Space>
                  <FileProtectOutlined />
                  <Text>Dirección del Local</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese prefijo"
                disabled={paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="prefix"
              label={
                <Space>
                  <FileProtectOutlined />
                  <Text>Teléfono</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese prefijo"
                disabled={paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="prefix"
              label={
                <Space>
                  <FileProtectOutlined />
                  <Text>E-mail</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese prefijo"
                disabled={paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="prefix"
              label={
                <Space>
                  <FileProtectOutlined />
                  <Text>Nombre del establecimiento comercial</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese prefijo"
                disabled={paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="prefix"
              label={
                <Space>
                  <FileProtectOutlined />
                  <Text>NIT</Text>
                </Space>
              }
            >
              <Input
                placeholder="Ingrese prefijo"
                disabled={paramsCreateAuthorization?.loading || paramsUpdateAuthorization?.loading}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default AuthorizationDianForm;
