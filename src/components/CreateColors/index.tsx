import { Form, Input, Modal, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useEffect, useState } from 'react';
import AlertInformation from '../Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import UploadImage from '../UploadImage';

export type Props = {
  modalVisible: boolean;
  current?: Partial<COLOR.Color>;
  onCancel: () => void;
  error?: string | null;
  onOk: () => void;
};

const CreateColors = ({ current, modalVisible, onCancel, error, onOk }: Props) => {
  const [image, setImage]: any = useState();
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [modalVisible]);

  useEffect(() => {
    setImage(current?.image);
  }, [current]);

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

  return (
    <Modal
      destroyOnClose
      title={current?._id ? 'Editar' : 'Nuevo'}
      visible={modalVisible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <FormItem
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Color"
        name="name"
        rules={[{ required: true, message: 'Nombre obligatorio', min: 1 }]}
        initialValue={current?.name}
      >
        <Input placeholder="" autoFocus maxLength={45} />
      </FormItem>
      <FormItem
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Nombre interno"
        name="name_internal"
        rules={[{ required: true, message: 'Nombre interno obligatorio', min: 1 }]}
        initialValue={current?.name_internal}
      >
        <Input placeholder="" maxLength={100} />
      </FormItem>
      <FormItem
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Activo"
        name="active"
        valuePropName="checked"
        initialValue={current?.active ? 1 : 0}
      >
        <Switch />
      </FormItem>
      <FormItem
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        label="Color"
        name="html"
        initialValue={current?.html}
      >
        <Input type="Color" />
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Imagen" name="image">
        <UploadImage current={image} onUpload={upload} />
      </FormItem>
      {error && <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />}
    </Modal>
  );
};

export default CreateColors;
