/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Col, Form, Input, Modal, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { CategoryLevel1, CategoryLevel2, CategoryLevel3 } from '@/graphql/graphql';
import { useCreateCategory, useUpdateCategory } from '@/hooks/category.hooks';
import SelectCategory from '@/components/SelectCategory';
import { GatewayOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  modalVisible: boolean;
  isNew: boolean;
  level: number;
  current: Partial<CategoryLevel1 | CategoryLevel2 | CategoryLevel3>;
  onCancel: () => void;
};

const CreateCategories = ({ level, current, modalVisible, onCancel, isNew }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [error, setError] = useState('');

  const [form] = Form.useForm();

  const [createCategory, paramsCreate] = useCreateCategory();
  const [updateCategory, paramsUpdate] = useUpdateCategory();

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
      type: 'error',
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
    if (alertInformation?.type === 'success') {
      onCancel();
    }
  };

  /**
   * @description se encarga de actualizar la categoría
   */
  const editCategory = async () => {
    const values = await form.validateFields();
    try {
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
        const response = await updateCategory({
          variables: {
            input: { ...values, level },
            id: current?._id || '',
          },
        });

        if (response?.data?.updateCategory) {
          setAlertInformation({
            message: `Categoria ${values?.name} actualizada correctamente`,
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
    const values = await form.validateFields();
    try {
      const response = await createCategory({
        variables: {
          input: {
            parentId: current?._id,
            ...values,
            level: level > 1 || (level === 1 && current?._id && isNew) ? level + 1 : level,
          },
        },
      });
      if (response?.data?.createCategory) {
        setAlertInformation({
          message: `Categoria ${values?.name} creada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      showError(e.message);
    }
  };

  useEffect(() => {
    setError('');
    if (isNew) {
      form.setFieldsValue({
        parentId: current?._id,
        name: '',
      });
    } else {
      form.setFieldsValue(current);
    }
  }, [current, isNew]);

  return (
    <Modal
      okText={isNew ? 'Crear' : 'Actualizar'}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Categoria' : 'Actualizar Categoria'}
      visible={modalVisible}
      onCancel={() => closeAndClear()}
      onOk={() => (isNew ? createNewCategory() : editCategory())}
      okButtonProps={{
        style: { borderRadius: 5 },
        loading: paramsCreate.loading || paramsUpdate.loading,
      }}
      cancelButtonProps={{
        style: { borderRadius: 5 },
        loading: paramsCreate.loading || paramsUpdate.loading,
      }}
    >
      <Form
        form={form}
        initialValues={
          isNew
            ? {
                parentId: current?._id,
              }
            : current
        }
        layout="vertical"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Row>
          {!isNew && level !== 1 && (
            <Col offset={6} span={12}>
              <FormItem
                label={
                  <Space>
                    <GatewayOutlined />
                    <Text>Categoria Padre</Text>
                  </Space>
                }
                name="parentId"
              >
                <SelectCategory
                  parentId={isNew ? current?._id : current?.parentId}
                  disabled={isNew}
                  level={level === 1 ? 1 : isNew ? level : level - 1}
                />
              </FormItem>
            </Col>
          )}
          <Col offset={6} span={12}>
            <FormItem
              label={
                <Space>
                  <GatewayOutlined />
                  <Text>Nombre</Text>
                </Space>
              }
              name="name"
              rules={[{ required: true, message: 'Nombre de Categoria obligatorio', min: 1 }]}
            >
              <Input placeholder="" autoFocus />
            </FormItem>
          </Col>
          {error && <Alert type="error" message={error} showIcon />}
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default CreateCategories;
