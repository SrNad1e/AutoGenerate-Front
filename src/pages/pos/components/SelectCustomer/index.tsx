/* eslint-disable react-hooks/exhaustive-deps */
import { useCreatecustomer, useGetCustomers } from '@/hooks/customer.hooks';
import { PlusOutlined, WhatsAppOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
  Space,
  Tooltip,
} from 'antd';
import { useEffect, useState } from 'react';

import type { Customer, UpdateOrderInput } from '@/graphql/graphql';
import { useGetDocumentTypes } from '@/hooks/documentType.hooks';
import Item from './item';

import styles from '../styles';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

export type Props = {
  visible: boolean;
  onCancel: () => void;
  editOrder: (params: UpdateOrderInput) => void;
};

const FormItem = Form.Item;
const ListItem = List.Item;
const { Option } = Select;

const SelectCustomer = ({ visible, onCancel, editOrder }: Props) => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [search, setSearch] = useState(true);
  const [disabledWhatsapp, setDisabledWatsapp] = useState(true);

  const [getCustomers, { data, loading }] = useGetCustomers();
  const [getDocumentTypes, dataDocumentTypes] = useGetDocumentTypes();
  const [createCustomer] = useCreatecustomer();

  const [form] = Form.useForm();

  /**
   * @description cierra la alerta y resetea el estado
   */
  const onCancelAlert = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    setSearch(true);
  };

  /**
   * @description funcion usada para mostar las alertas de error
   * @param message mensaje de la alerta
   */
  const messageError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description valida los campos del formulario y ejecuta la mutation para la creacion del cliente
   */
  const newCustomer = async () => {
    const values = await form.validateFields();
    try {
      if (!values?.documentTypeId) {
        values.documentTypeId = dataDocumentTypes?.data?.documentTypes[0]?._id;
      }

      const response = await createCustomer({
        variables: {
          input: { ...values, isWhatsapp: isWhatsapp },
        },
      });

      if (response?.data?.createCustomer) {
        editOrder({ customerId: response?.data?.createCustomer?._id });
        setPropsAlertInformation({
          message: `El cliente ${response?.data?.createCustomer?.firstName} ha sido creado correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      messageError(error?.message);
    }
  };

  /**
   * @description se encarga de gestionar si tiene whatsapp o no
   * @param e evento del checkbox
   */
  const onChangeCheck = (e: CheckboxChangeEvent) => {
    if (e?.target?.checked) {
      setIsWhatsapp(true);
    } else {
      setIsWhatsapp(false);
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
      messageError(e.message);
    }
  };

  const addCustomer = async (params: UpdateOrderInput) => {
    await editOrder(params);
    onCancel();
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
            <Item addCustomer={addCustomer} customer={customer as Customer} />
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
            validator: (_, value) => {
              const number = parseInt(value);

              if (!value) {
                return Promise.reject(new Error('*Campo Obligatorio'));
              }

              if (!isNaN(number) && number == value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('*Solo números'));
            },
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
      <FormItem label="Fecha de Nacimiento" name="birthday">
        <DatePicker placeholder="Seleccione Fecha" size="large" style={styles.maxWidth} />
      </FormItem>
      <FormItem
        name="phone"
        label="Telefono"
        rules={[
          {
            validator: (_, value) => {
              const number = parseInt(value);

              if (!value) {
                return Promise.reject(new Error('*Campo Obligatorio'));
              }

              if (!isNaN(number) && number == value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('*Solo números'));
            },
          },
        ]}
      >
        <Input
          size="large"
          suffix={
            <Tooltip title="Tiene whatsapp?">
              <Checkbox disabled={disabledWhatsapp} onChange={(e) => onChangeCheck(e)}>
                {<WhatsAppOutlined color="green" />}
              </Checkbox>
            </Tooltip>
          }
          onChange={(e) =>
            e?.target?.value ? setDisabledWatsapp(false) : setDisabledWatsapp(true)
          }
        />
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
          <Button onClick={() => newCustomer()} type="primary" htmlType="submit">
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
    form.resetFields();
    setSearch(true);
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
      <AlertInformation {...propsAlertInformation} onCancel={onCancelAlert} />
    </Modal>
  );
};

export default SelectCustomer;
