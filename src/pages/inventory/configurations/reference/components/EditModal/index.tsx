import { Col, Form, Input, Modal, Row, Switch } from 'antd';

import ImageAdmin from '@/components/ImageAdmin';
import SelectColor from '@/components/SelectColor';
import SelectSize from '@/components/SelectSize';

import style from '../styles.less';

const EditModal = () => {
  const FormItem = Form.Item;

  return (
    <Modal
      okText="Aceptar"
      cancelText="Cancelar"
      destroyOnClose
      title={`Edición Producto ${'Nombre del Producto'}`}
      visible={false}
      width="80%"
    >
      <Row className={style.displayStyle}>
        <Form layout="inline">
          <Col>
            <FormItem label="EAN 13" name="barcode">
              <Input placeholder="" />
            </FormItem>
          </Col>
          <Col>
            <FormItem
              className={style.styleInput}
              label="Color"
              rules={[{ required: true, message: 'Obligatorio' }]}
              name="color"
            >
              <SelectColor />
            </FormItem>
          </Col>
          <Col>
            <FormItem
              label="Talla"
              rules={[{ required: true, message: 'Obligatorio' }]}
              name="size"
            >
              <SelectSize />
            </FormItem>
          </Col>
          <Col>
            <FormItem
              name="active"
              label="Activo"
              rules={[{ required: true, message: 'Obligatorio' }]}
            >
              <Switch />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="Imagenes" name="images">
              <ImageAdmin limit={20} />
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Modal>
  );
};

export default EditModal;
