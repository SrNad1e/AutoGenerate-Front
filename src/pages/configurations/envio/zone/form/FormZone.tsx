import { Form, Input, Switch, Button, Row, Col } from '@/utils/Desing';

const FormZone = ({ openModalState, onFinish, onCloseModal }: any) => {
  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        _id: openModalState?.record?._id || null,
        name: openModalState?.record?.name || '',
        description: openModalState?.record?.description || '',
        state: openModalState?.record?.state || false,
      }}
    >
      <Form.Item
        label="Nombre"
        name="name"
        rules={[
          {
            required: true,
            message: 'Este campo es obligatorio',
          },
        ]}
      >
        <Input placeholder="Nombre" />
      </Form.Item>
      <Form.Item
        label="Descripcion"
        name="description"
        rules={[
          {
            required: true,
            message: 'Este campo es obligatorio',
          },
        ]}
      >
        <Input placeholder="Nombre" />
      </Form.Item>

      <Form.Item
        label="Activo:"
        name="state"
        rules={[
          {
            required: true,
            message: 'Este campo es obligatorio',
          },
        ]}
      >
        <Switch />
      </Form.Item>

      <Form.Item>
        <Row>
          <Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ width: '95%' }} type="primary" htmlType="submit">
              {!openModalState?.record?._id ? 'Crear' : 'Editar'}{' '}
            </Button>
          </Col>

          <Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ width: '95%' }} onClick={() => onCloseModal()}>
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default FormZone;
