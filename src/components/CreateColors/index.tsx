import { Form, Input, Modal, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useState } from 'react';
import AlertInformation from '../Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import UploadImage from '../UploadImage';
import { useCreateColor, useUpdateColor } from '@/hooks/color.hooks';
import AlertLoading from '../Alerts/AlertLoading';

export type Props = {
  modalVisible: boolean;
  current?: Partial<COLOR.Color>;
  onCancel: () => void;
  error?: string | null;
  onOk?: () => void;
};

const CreateColors = ({ current, modalVisible, onCancel }: Props) => {
  const [image, setImage]: any = useState();
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  const isNew = !current?._id;

  const resultCreate = () => {
    setAlertInformation({
      message: 'Color creado correctamente',
      type: 'success',
      visible: true,
    });
  };

  const resultUpdate = (dataColor: Partial<COLOR.Color>) => {
    setAlertInformation({
      message: `Color ${dataColor.name} ha sido actualizado correctamente`,
      type: 'success',
      visible: true,
    });
  };

  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const { createColor, loadingCreate } = useCreateColor(resultCreate, showError);
  const { updateColor, loadingUpdate } = useUpdateColor(resultUpdate, showError);

  const upload = (e: any) => {
    setImage(e);
  };

  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const editColor = () => {
    const values = form.getFieldsValue();

    if (!isNew) {
      updateColor({
        variables: {
          input: values,
          id: current?._id,
        },
      });
    }
  };

  const createNewColor = () => {
    const values = form.getFieldsValue();
    delete values.active;

    if (isNew) {
      createColor({
        variables: {
          input: values,
        },
      });
    }
  };

  return (
    <Modal
      destroyOnClose
      title={isNew ? 'Nuevo' : 'Editar'}
      visible={modalVisible}
      onCancel={() => onCancel()}
      onOk={() => (isNew ? createNewColor() : editColor())}
    >
      <Form form={form} initialValues={current}>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Color"
          name="name"
          rules={[{ required: true, message: 'Nombre obligatorio', min: 1 }]}
        >
          <Input placeholder="" autoFocus maxLength={45} />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Nombre interno"
          name="name_internal"
          rules={[{ required: true, message: 'Nombre interno obligatorio', min: 1 }]}
        >
          <Input placeholder="" maxLength={100} />
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
          <Input type="Color" />
        </FormItem>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Imagen" name="image">
          <UploadImage current={image} onUpload={upload} />
        </FormItem>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertLoading visible={loadingCreate || loadingUpdate} message="Guardando Color" />
    </Modal>
  );
};

export default CreateColors;
