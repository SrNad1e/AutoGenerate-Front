/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Form, Input, Modal } from 'antd';
import { useState } from 'react';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { CategoryLevel1, CategoryLevel2, CategoryLevel3 } from '@/graphql/graphql';
import { useCreateCategory, useUpdateCategory } from '@/hooks/category.hooks';
import SelectCategory from '@/components/SelectCategory';

const FormItem = Form.Item;

export type Props = {
  modalVisible: boolean;
  level: number;
  current?: Partial<CategoryLevel1 | CategoryLevel2 | CategoryLevel3>;
  onCancel: () => void;
  error?: string | null;
  onOk?: () => void;
};

const CreateCategories = ({ level, current, modalVisible, onCancel }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [error, setError] = useState('');

  const [form] = Form.useForm();

  const [CreateCategory] = useCreateCategory();
  const [UpdateCategory] = useUpdateCategory();

  const isNew = !current?._id;

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    setError('');
    form.resetFields();
  };

  /**
   * @description abre el modal en modo error
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
   * @description se encarga de actualizar la categoría
   */
  const editCategory = async () => {
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
        const response = await UpdateCategory({
          variables: {
            input: values,
            id: current?._id || '',
          },
        });
        if (response?.data?.updateCategory) {
          setAlertInformation({
            message: `Categoria ${response?.data?.updateCategory?.name} actualizada correctamente`,
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
   * @description se encarga de crear una nueva categoría
   */
  const createNewCategory = async () => {
    try {
      form.getFieldsValue();
      const values = await form.validateFields();

      console.log(values);

      const response = await CreateCategory({
        variables: {
          input: values,
        },
      });
      if (response?.data?.createCategory) {
        setAlertInformation({
          message: `Categoria ${response?.data?.createCategory?.name} creada correctamente`,
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

  return (
    <Modal
      okText="Aceptar"
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Nuevo' : 'Editar'}
      visible={modalVisible}
      onCancel={() => closeAndClear()}
      onOk={() => (isNew ? createNewCategory() : editCategory())}
    >
      <Form form={form} initialValues={current}>
        {level > 1 && !isNew && (
          <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Categoria Padre"
            name="parentCategoryId"
          >
            <SelectCategory level={level} />
          </FormItem>
        )}
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Nombre de Categoria obligatorio', min: 1 }]}
        >
          <Input placeholder="" autoFocus />
        </FormItem>
        {error && <Alert type="error" message={error} showIcon />}
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default CreateCategories;
