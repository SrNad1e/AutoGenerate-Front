import { Alert, Form, Input, Modal, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import { useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '../Alerts/AlertLoading';
import { useCreateBrand, useUpdateBrand } from '@/hooks/brand.hooks';

export type Props = {
  modalVisible: boolean;
  current?: Partial<BRAND.Brand>;
  onCancel: () => void;
  error?: string | null;
  onOk?: () => void;
};

const CreateBrands = ({ current, modalVisible, onCancel }: Props) => {
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
      message: 'Marca creada correctamente',
      type: 'success',
      visible: true,
    });
  };

  /**
   * @description funcion usada por los hooks para mostrar la alerta de actualizacion
   */
  const resultUpdate = (dataBrand: Partial<BRAND.Brand>) => {
    setAlertInformation({
      message: `Marca ${dataBrand.name} actualizada correctamente`,
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

  const { createBrands, loadingCreate } = useCreateBrand(resultCreate, showError);
  const { updateBrands, loadingUpdate } = useUpdateBrand(resultUpdate, showError);

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
   * @description ejecuta la mutation para actualizar una marca
   */
  const editBrand = () => {
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
        updateBrands({
          variables: {
            input: values,
            id: current?._id,
          },
        });
      }
    }
  };

  /**
   * @description ejecuta la mutation para crear una nueva marca
   */
  const createNewBrand = async () => {
    try {
      const values = await form.validateFields();
      delete values.active;
      if (isNew) {
        createBrands({
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
      onOk={() => (isNew ? createNewBrand() : editBrand())}
    >
      <Form form={form} initialValues={current}>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Marca"
          name="name"
          rules={[{ required: true, message: 'Marca obligatoria', min: 1 }]}
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
      <AlertLoading visible={loadingCreate || loadingUpdate} message="Guardando Marca" />
    </Modal>
  );
};

export default CreateBrands;
