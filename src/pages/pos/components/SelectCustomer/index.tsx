/* eslint-disable react-hooks/exhaustive-deps */
import { useCreatecustomer, useGetCustomers } from '@/hooks/customer.hooks';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, List, Modal, Row, Select, Space } from 'antd';
import { useEffect, useState } from 'react';

import type { Customer, UpdateOrderInput } from '@/graphql/graphql';
import { useGetDocumentTypes } from '@/hooks/documentType.hooks';
import Item from './item';

import styles from '../styles';

export type Props = {
  visible: boolean;
  onCancel: () => void;
  editOrder: (params: UpdateOrderInput) => void;
};

const FormItem = Form.Item;
const ListItem = List.Item;
const { Option } = Select;

const SelectCustomer = ({ visible, onCancel, editOrder }: Props) => {
  const [search, setSearch] = useState(true);

  const [getCustomers, { data, loading }] = useGetCustomers();
  const [getDocumentTypes, dataDocumentTypes] = useGetDocumentTypes();
  const [createCustomer] = useCreatecustomer();

  const [form] = Form.useForm();

  /**
   * @description valida los campos del formulario y ejecuta la mutation para la creacion del cliente
   */
  const newCustomer = async () => {
    try {
      const values = await form.validateFields();

      if (!values?.documentTypeId) {
        values.documentTypeId = dataDocumentTypes?.data?.documentTypes[0]?._id;
      }

      const response = await createCustomer({
        variables: {
          input: { ...values },
        },
      });

      if (response?.data?.createCustomer) {
        editOrder({ customerId: response?.data?.createCustomer?._id });
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  /**
   * @description consulta el listado de clientes
   * @param value filtro para consultar lista de clientes
   */
  const onSearch = (value: string) => {
    try {
      getCustomers({
        variables: {
          input: {
            dato: value,
          },
        },
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  const renderSearchCustomer = () => (
    <Space direction="vertical" style={styles.maxWidth}>
      <Input.Search
        enterButton="Buscar"
        size="large"
        loading={loading}
        autoFocus
        placeholder="Nombre o identificación"
        onSearch={onSearch}
      />
      <List style={styles.listCustomerStyle}>
        {data?.customers?.docs?.map((customer) => (
          <ListItem key={customer?._id}>
            <Item editOrder={editOrder} customer={customer as Customer} />
          </ListItem>
        ))}
      </List>
      <Button
        loading={loading}
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setSearch(false)}
      >
        Crear Cliente
      </Button>
    </Space>
  );

  const renderNewCustomer = () => (
    <Form form={form} layout="vertical">
      <FormItem name="documentTypeId" label="Tipo de Documento">
        <Select size="large" defaultValue={dataDocumentTypes?.data?.documentTypes[0]?._id}>
          {dataDocumentTypes?.data?.documentTypes?.map(({ abbreviation, _id }) => (
            <Option key={_id} value={_id}>
              {abbreviation}
            </Option>
          ))}
        </Select>
      </FormItem>
      <FormItem
        name="document"
        label="Documento"
        rules={[
          {
            required: true,
            message: '*Campo obligatorio',
          },
        ]}
      >
        <Input autoFocus size="large" />
      </FormItem>
      <FormItem
        name="firstName"
        label="Nombres"
        rules={[
          {
            required: true,
            message: '*Campo obligatorio',
          },
        ]}
      >
        <Input size="large" />
      </FormItem>
      <FormItem
        name="lastName"
        label="Apellidos"
        rules={[
          {
            required: true,
            message: '*Campo obligatorio',
          },
        ]}
      >
        <Input size="large" />
      </FormItem>
      <FormItem name="phone" label="Telefono">
        <Input size="large" />
      </FormItem>
      <FormItem name="email" label="Correo">
        <Input size="large" />
      </FormItem>
      <Divider />
      <Row>
        <Col span={12}>
          <Button onClick={() => setSearch(true)}>Cancelar</Button>
        </Col>
        <Col span={4} offset={8}>
          <Button onClick={newCustomer} type="primary" htmlType="submit">
            Registrar
          </Button>
        </Col>
      </Row>
    </Form>
  );

  useEffect(() => {
    getDocumentTypes({
      variables: {
        input: {},
      },
    });
  }, [visible]);

  return (
    <Modal
      title={search ? 'Buscar Cliente' : 'Registro Cliente'}
      visible={visible}
      footer={false}
      onCancel={onCancel}
      destroyOnClose
    >
      {search ? renderSearchCustomer() : renderNewCustomer()}
    </Modal>
  );
};

export default SelectCustomer;
