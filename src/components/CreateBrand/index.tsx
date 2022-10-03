import { useEffect, useState } from 'react';
import { Alert, Col, Form, Input, Modal, Row, Space, Switch, Typography } from 'antd';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '../Alerts/AlertLoading';
import { useCreateBrand, useUpdateBrand } from '@/hooks/brand.hooks';
import type { Brand } from '@/graphql/graphql';
import { SketchOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  modalVisible: boolean;
  current?: Partial<Brand>;
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
  const [error, setError] = useState<string | null>(null);

  const [form] = Form.useForm();

  const [createBrands, paramsCreate] = useCreateBrand();
  const [updateBrands, paramsUpdate] = useUpdateBrand();

  const isNew = !current?._id;

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
  const editBrand = async () => {
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
        const response = await updateBrands({
          variables: {
            input: values,
            id: current?._id || '',
          },
        });
        if (response?.data?.updateBrand) {
          setAlertInformation({
            message: `Marca ${response?.data?.updateBrand?.name} actualizada correctamente`,
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
   * @description ejecuta la mutation para crear una nueva marca
   */
  const createNewBrand = async () => {
    const values = await form.validateFields();
    try {
      delete values.active;
      const response = await createBrands({
        variables: {
          input: values,
        },
      });
      if (response?.data?.createBrand) {
        setAlertInformation({
          message: `Marca ${response?.data?.createBrand?.name} creada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  useEffect(() => {
    setError(null);
  }, [modalVisible]);

  return (
    <Modal
      okText={isNew ? 'Crear' : 'Actualizar'}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Marca' : 'Actualizar Marca'}
      visible={modalVisible}
      onCancel={() => closeAndClear()}
      onOk={() => (isNew ? createNewBrand() : editBrand())}
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
        initialValues={current}
        layout="vertical"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Row>
          <Col span={24}>
            <FormItem
              label={
                <Space>
                  <SketchOutlined />
                  <Text>Marca</Text>
                </Space>
              }
              name="name"
              rules={[{ required: true, message: 'Marca obligatoria', min: 1 }]}
            >
              <Input placeholder="" autoFocus maxLength={45} />
            </FormItem>
            <FormItem label="Activo" name="active" valuePropName="checked">
              <Switch defaultChecked />
            </FormItem>
            {error && <Alert type="error" message={error} showIcon />}
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertLoading visible={paramsCreate?.loading} message="Creando Marca" />
      <AlertLoading visible={paramsUpdate?.loading} message="Actualizando Marca" />
    </Modal>
  );
};

export default CreateBrands;
