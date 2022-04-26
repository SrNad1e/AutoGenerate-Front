import { Alert, Form, Input, Modal } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import { useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
//import AlertLoading from '@/components/Alerts/AlertLoading';

export type Props = {
  modalVisible: boolean;
  current?: Partial<CATEGORY.CategoryLevel1>;
  onCancel: () => void;
  error?: string | null;
  onOk?: () => void;
};

const CreateCategory = ({ current, modalVisible, onCancel }: Props) => {
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
  
  
    /** Fin de Funciones ejecutadas por los hooks */

  /** Hooks para manejo de consultas */

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

  return (
    <Modal
      okText="Aceptar"
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Nuevo' : 'Editar'}
      visible={modalVisible}
      onCancel={() => closeAndClear()}
      onOk={() => {}}
    >
      <Form form={form} initialValues={current}>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Categoria"
          name="name"
          rules={[{ required: true, message: 'Nombre de Categoria obligatorio', min: 1 }]}
        >
          <Input placeholder="" autoFocus maxLength={45} />
        </FormItem>
        {error && <Alert type="error" message={error} showIcon />}
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      {/*<AlertLoading visible={loadingCreate || loadingUpdate} message="Guardando Talla" />*/}
    </Modal>
  );
};

export default CreateCategory;
