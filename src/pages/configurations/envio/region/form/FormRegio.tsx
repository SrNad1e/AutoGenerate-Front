import { useEffect } from 'react';
import { Form, Input, Switch, Button, Row, Col, Select } from '@/utils/Desing';
import { useGetZone } from '@/hooks/zone.hooks';

const { Option } = Select;

const FormRegio = ({ openModalState, onFinish, onCloseModal }: any) => {
  const [getZone, { data, loading }] = useGetZone();

  useEffect(() => {
    getZone({
      variables: {
        filtersZoneInput: {
          name: '',
        },
      },
    });
    // eslint-disable-next-line
  }, [data]);

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        city: openModalState?.record?.city || '',
        country: openModalState?.record?.country || '',
        dpto: openModalState?.record?.dpto || '',
        state: openModalState?.record?.state || '',
        idZone: openModalState?.record?.zone?.name || '',
      }}
    >
      <Form.Item
        label="Departamento"
        name="dpto"
        rules={[
          {
            required: true,
            message: 'Este campo es obligatorio',
          },
        ]}
      >
        <Input placeholder="Departamento o estado" />
      </Form.Item>
      <Form.Item
        label="Ciudad"
        name="city"
        rules={[
          {
            required: true,
            message: 'Este campo es obligatorio',
          },
        ]}
      >
        <Input placeholder="Ciudad" />
      </Form.Item>

      <Form.Item
        label="Pais"
        name="country"
        rules={[
          {
            required: true,
            message: 'Este campo es obligatorio',
          },
        ]}
      >
        <Input placeholder="Pais" />
      </Form.Item>

      <Form.Item
        label="Zona"
        name="idZone"
        rules={[
          {
            required: true,
            message: 'Este campo es obligatorio',
          },
        ]}
      >
        <Select loading={loading} disabled={loading}>
          {data?.zona?.docs?.map((m) => (
            <Option key={m._id} value={m.name}>
              {m.name}
            </Option>
          ))}
        </Select>
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
        <Switch defaultChecked={openModalState.record.state} />
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

export default FormRegio;
