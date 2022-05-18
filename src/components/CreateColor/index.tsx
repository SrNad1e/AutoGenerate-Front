/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Form, Input, Modal, Switch } from 'antd';
import { useEffect, useState } from 'react';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '../Alerts/AlertLoading';
import { useCreateColor, useUpdateColor } from '@/hooks/color.hooks';
import type { Color } from '@/graphql/graphql';
import ImageAdmin from '../ImageAdmin';

const FormItem = Form.Item;

export type Props = {
  modalVisible: boolean;
  current?: Partial<Color>;
  onCancel: () => void;
};

const CreateColors = ({ current, modalVisible, onCancel }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [error, setError] = useState<string | null>(null);

  const [form] = Form.useForm();

  const [createColor, paramsCreate] = useCreateColor();
  const [updateColor, paramsUpdate] = useUpdateColor();

  const isNew = !current?._id;

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
    setError('');
  };

  /**
   * @description cierra la alerta y el modal
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    if (alertInformation.message !== 'Complete los campos') {
      closeAndClear();
    }
  };

  /**
   * @description ejecuta la mutation para actualizar un color
   */
  const editColor = async () => {
    try {
      const values = form.getFieldsValue();
      let errorLocal = 'No hay cambios para aplicar';

      Object.keys(values).forEach((i) => {
        if (values[i] !== (current && current[i])) {
          errorLocal = '';
          return;
        }
      });
      if (errorLocal) {
        setError(errorLocal);
      } else {
        if (values?.image?.length > 0) {
          values.imageId = values?.image[0]._id;
        }
        delete values.image;
        const response = await updateColor({
          variables: {
            input: values,
            id: current?._id || '',
          },
        });
        if (response?.data?.updateColor) {
          setAlertInformation({
            message: `Color ${response?.data?.updateColor?.name} actualizado correctamente`,
            type: 'success',
            visible: true,
          });
        }
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  /**
   * @description ejecuta la mutation para crear un nuevo color
   */
  const createNewColor = async () => {
    try {
      form.getFieldsValue();
      const values = await form.validateFields();
      delete values.active;
      if (values.image.length === 0) {
        delete values.image;
      }
      if (!values.html) {
        values.html = '#000000';
      }
      if (values?.image?.length > 0) {
        values.imageId = values?.image[0]._id;
      }
      delete values.image;

      const response = await createColor({
        variables: {
          input: values,
        },
      });
      if (response?.data?.createColor) {
        setAlertInformation({
          message: `Color ${response?.data?.createColor?.name} creado correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      showError(e.message);
      if (e.message === undefined) {
        showError('Complete los campos');
      }
    }
  };

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({
      image: current?.image ? [current?.image] : [],
    });
  }, [modalVisible]);

  return (
    <Modal
      okText="Aceptar"
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Nuevo' : 'Editar'}
      visible={modalVisible}
      onCancel={() => closeAndClear()}
      onOk={() => (isNew ? createNewColor() : editColor())}
    >
      <Form
        form={form}
        initialValues={{ ...current, image: current?.image ? [current?.image] : [] }}
      >
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Campo obligatorio', min: 1 }]}
        >
          <Input placeholder="" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Nombre Interno"
          name="name_internal"
          rules={[{ required: true, message: 'Campo obligatorio', min: 1 }]}
        >
          <Input placeholder="" autoFocus />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Activo"
          name="active"
          valuePropName="checked"
        >
          <Switch />
        </FormItem>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} label="Color" name="html">
          <Input type="color" />
        </FormItem>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} label="Imagen" name="image">
          <ImageAdmin limit={1} />
        </FormItem>
        {error && <Alert type="error" message={error} showIcon />}
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertLoading visible={paramsCreate?.loading} message="Creando Talla" />
      <AlertLoading visible={paramsUpdate?.loading} message="Actualizando Talla" />
    </Modal>
  );
};

export default CreateColors;
