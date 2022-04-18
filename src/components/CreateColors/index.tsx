import { Input, Modal, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

export type Props = {
  modalVisible: boolean;
  current?: Partial<COLOR.Color>;
};

const CreateColors = ({ current, modalVisible }: Props) => {
  return (
    <Modal destroyOnClose title={current?._id ? 'Editar' : 'Nuevo'} visible={modalVisible}>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} label="Color">
        <Input placeholder="" autoFocus maxLength={45} />
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} label="Nombre interno">
        <Input placeholder="" maxLength={100} />
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} label="Activo">
        <Switch />
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} label="Color">
        <Input type="Color" />
      </FormItem>
      <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} label="Imagen">
        <Input placeholder="" autoFocus maxLength={45} />
      </FormItem>
    </Modal>
  );
};

export default CreateColors;
