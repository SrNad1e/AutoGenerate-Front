/* eslint-disable react-hooks/exhaustive-deps */
import { useUpdateUser } from '@/hooks/user.hooks';
import { Input, Modal, Form } from 'antd';
import { useEffect, useState } from 'react';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

const { Password } = Input;
const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancelModal: () => void;
  userId: string;
};

const EditPassword = ({ visible, onCancelModal, userId }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();
  const [updateUser] = useUpdateUser();

  /**
   * @description se encarga de cerrar la alerta y cerrar el modal
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    onCancelModal();
  };

  /**
   * @description se encarga de controlar los mensajes de error
   * @param message mensaje que recibe
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'warning',
      visible: true,
    });
  };

  /**
   * @description se encarga de ejecutar la mutation de edicion de usuario para editar la contraseña
   */
  const editPassword = async () => {
    const value = await form.validateFields();

    delete value.password1;

    try {
      const response = await updateUser({
        variables: {
          id: userId,
          input: {
            ...value,
          },
        },
      });
      if (response?.data?.updateUser) {
        setAlertInformation({
          message: `Contraseña actualizada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      if (error) {
        showError(error?.message);
      }
    }
  };

  /**
   * @description valida si los 2 campos de contraseña  son iguales
   */
  const matchPassword = async () => {
    const firstPassword = await form.getFieldValue('password1');
    const secondPassword = await form.getFieldValue('password');

    if (firstPassword != secondPassword) {
      showError('Las contraseñas no coinciden');
    } else {
      editPassword();
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [visible]);
  return (
    <Modal
      title="Cambiar Contraseña"
      cancelText="Cancelar"
      okText="Cambiar"
      destroyOnClose
      visible={visible}
      onCancel={onCancelModal}
      onOk={() => matchPassword()}
    >
      <Form form={form} layout="vertical">
        <FormItem
          label="Nueva Contraseña"
          name="password1"
          rules={[
            {
              required: true,
              message: 'Este campo no puede estar vacio',
            },
            {
              validator: (_, value) => {
                if (value && value.length < 4) {
                  return Promise.reject(
                    new Error('Este campo debe contener 4 caracteres como minimo'),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Password placeholder="Ingrese Contraseña" autoFocus minLength={4} />
        </FormItem>
        <FormItem
          name="password"
          label="Repita la Contraseña"
          rules={[
            {
              required: true,
              message: 'Este campo no puede estar vacio',
            },
            {
              validator: (_, value) => {
                if (value && value.length < 4) {
                  return Promise.reject(
                    new Error('Este campo debe contener 4 caracteres como minimo'),
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Password placeholder="Ingrese Contraseña" minLength={4} />
        </FormItem>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default EditPassword;
