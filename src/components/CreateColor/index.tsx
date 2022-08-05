/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Col, Form, Input, Modal, Row, Space, Switch, Typography } from 'antd';
import { useEffect, useState } from 'react';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '../Alerts/AlertLoading';
import { useCreateColor, useUpdateColor } from '@/hooks/color.hooks';
import type { Color } from '@/graphql/graphql';
import ImageAdmin from '../ImageAdmin';
import { BgColorsOutlined, FormatPainterOutlined, HighlightOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Text } = Typography;

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
      if (e?.message) {
        showError(e?.message);
      }
    }
  };

  /**
   * @description ejecuta la mutation para crear un nuevo color
   */
  const createNewColor = async () => {
    const values = await form.validateFields();
    try {
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
      showError(e?.message);
    }
  };

  useEffect(() => {
    form.resetFields();
    setError(null);
    form.setFieldsValue({
      image: current?.image ? [current?.image] : [],
    });
  }, [modalVisible]);

  return (
    <Modal
      okText={isNew ? 'Crear' : 'Actualizar'}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Color' : 'Actualizar Color'}
      visible={modalVisible}
      onCancel={() => closeAndClear()}
      onOk={() => (isNew ? createNewColor() : editColor())}
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
        initialValues={{ ...current, image: current?.image ? [current?.image] : [] }}
        layout="vertical"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Row>
          <Col span={24}>
            <FormItem
              label={
                <Space>
                  <BgColorsOutlined />
                  <Text>Nombre</Text>
                </Space>
              }
              name="name"
              rules={[{ required: true, message: 'Campo obligatorio', min: 1 }]}
            >
              <Input
                placeholder="Nombre del color"
                disabled={paramsCreate?.loading || paramsUpdate?.loading}
              />
            </FormItem>
            <FormItem
              label={
                <Space>
                  <HighlightOutlined />
                  <Text>Nombre Interno</Text>
                </Space>
              }
              name="name_internal"
              rules={[{ required: true, message: 'Campo obligatorio', min: 1 }]}
            >
              <Input
                placeholder="Nombre interno del color"
                autoFocus
                disabled={paramsCreate?.loading || paramsUpdate?.loading}
              />
            </FormItem>
            <FormItem label="Activo" name="active" valuePropName="checked">
              <Switch defaultChecked disabled={paramsCreate?.loading || paramsUpdate?.loading} />
            </FormItem>
            <FormItem
              label={
                <Space>
                  <FormatPainterOutlined />
                  <Text>Color</Text>
                </Space>
              }
              name="html"
            >
              <Input type="color" disabled={paramsCreate?.loading || paramsUpdate?.loading} />
            </FormItem>
            <FormItem label="Imagen" name="image">
              <ImageAdmin disabled={paramsCreate?.loading || paramsUpdate?.loading} limit={1} />
            </FormItem>
            {error && <Alert type="error" message={error} showIcon />}
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertLoading visible={paramsCreate?.loading} message="Creando Color" />
      <AlertLoading visible={paramsUpdate?.loading} message="Actualizando Color" />
    </Modal>
  );
};

export default CreateColors;
