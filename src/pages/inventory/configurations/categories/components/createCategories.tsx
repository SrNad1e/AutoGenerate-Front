/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Form, Input, InputNumber, Modal } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import { useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { CategoryLevel1, CategoryLevel2, CategoryLevel3 } from '@/graphql/graphql';
import { useCreateCategory, useUpdateCategory } from '@/hooks/category.hooks';
import SelectCategory from '@/components/SelectCategory';
//import AlertLoading from '@/components/Alerts/AlertLoading';

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
  const isNew = !current?._id;

  const [CreateCategory /* propsCreate*/] = useCreateCategory();
  const [UpdateCategory /*propsUpdate*/] = useUpdateCategory();

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    setError('');
    form.resetFields();
  };

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
            <SelectCategory />
          </FormItem>
        )}
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Nombre de Categoria obligatorio', min: 1 }]}
        >
          <Input placeholder="" autoFocus maxLength={45} />
        </FormItem>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} label="Nivel" name="level">
          <InputNumber />
        </FormItem>
        {error && <Alert type="error" message={error} showIcon />}
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      {/*<AlertLoading visible={loadingCreate || loadingUpdate} message="Guardando Talla" />*/}
    </Modal>
  );
};

export default CreateCategories;
