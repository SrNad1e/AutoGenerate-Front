import { Alert, Form, Input, Modal, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import { useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '../Alerts/AlertLoading';
import { useCreateSizes, useUpdateSizes } from '@/hooks/size.hooks';

export type Props = {
  modalVisible: boolean;
  current?: Partial<SIZE.Size>;
  onCancel: () => void;
  error?: string | null;
  onOk?: () => void;
};

const CreateSizes = ({ current, modalVisible, onCancel }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [error, setError] = useState('');

  const [form] = Form.useForm();
  const isNew = !current?._id;

  /** Funciones ejecutadas por los hooks */

  /**
   * @description funcion usada por los hooks para mostrar la alerta de creacion
   */
  const resultCreate = () => {
    setAlertInformation({
      message: 'Talla creada correctamente',
      type: 'success',
      visible: true,
    });
  };

  /**
   * @description funcion usada por los hooks para mostrar la alerta de actualizacion
   */
  const resultUpdate = (dataSize: Partial<SIZE.Size>) => {
    setAlertInformation({
      message: `Talla ${dataSize.value} actualizada correctamente`,
      type: 'success',
      visible: true,
    });
  };

  /**
   * @description funcion usada por los hooks para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /** Fin de Funciones ejecutadas por los hooks */

  /** Hooks para manejo de consultas */

  const { createSizes, loadingCreate } = useCreateSizes(resultCreate, showError);
  const { updateSizes, loadingUpdate } = useUpdateSizes(resultUpdate, showError);

  /** Fin de Hooks para manejo de consultas */

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    setError('');
    form.resetFields();
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
    closeAndClear();
  };

  /**
   * @description ejecuta la mutation para actualizar una talla
   */
  const editSize = () => {
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
      if (!isNew) {
        updateSizes({
          variables: {
            input: values,
            id: current?._id,
          },
        });
      }
    }
  };

  /**
   * @description ejecuta la mutation para crear una nueva talla
   */
  const createNewSize = async () => {
    try {
      const values = await form.validateFields();
      delete values.active;
      if (isNew) {
        createSizes({
          variables: {
            input: values,
          },
        });
      }
    } catch (e) {}
  };

  return (
    <Modal
      okText="Aceptar"
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Nuevo' : 'Editar'}
      visible={modalVisible}
      onCancel={() => closeAndClear()}
      onOk={() => (isNew ? createNewSize() : editSize())}
    >
      <Form form={form} initialValues={current}>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Nombre"
          name="value"
          rules={[{ required: true, message: 'Nombre obligatorio', min: 1 }]}
        >
          <Input placeholder="" autoFocus maxLength={45} />
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
        {error && <Alert type="error" message={error} showIcon />}
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertLoading visible={loadingCreate || loadingUpdate} message="Guardando Talla" />
    </Modal>
  );
};

export default CreateSizes;
