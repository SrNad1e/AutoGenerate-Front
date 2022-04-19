import AlertInformation from '@/components/Alerts/AlertInformation';
import { Input, Modal, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

type Props = {
  error?: string | null;
  current?: Partial<SIZE.Size>;
  modalVisible: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const ModifySize = (props: Props) => {
  const [alert, setAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { modalVisible, current, error, onCancel, onOk } = props;

  const closeAlertInformation = () => {
    setAlert({
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
      onOk={onOk}
      onCancel={onCancel}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="Talla"
        name="value"
        rules={[{ required: true, message: 'Obligatorio', min: 1 }]}
        initialValue={current?.value}
      >
        <Input placeholder="" autoFocus />
      </FormItem>

      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="Activo"
        name="active"
        valuePropName="checked"
        initialValue={current?.active ? 1 : 0}
      >
        <Switch />
      </FormItem>
      {error && <AlertInformation {...alert} onCancel={closeAlertInformation} />}
    </Modal>
  );
};

export default ModifySize;
