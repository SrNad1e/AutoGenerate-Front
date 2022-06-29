/* eslint-disable react-hooks/exhaustive-deps */
import type { Address, Customer } from '@/graphql/graphql';
import { useCreatecustomer, useUpdateCustomer } from '@/hooks/customer.hooks';
import { useGetDocumentTypes } from '@/hooks/documentType.hooks';
import { WhatsAppOutlined } from '@ant-design/icons';
import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Tabs,
  Tooltip,
} from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import 'moment/locale/es-mx';
import { useEffect, useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from '../styles';
import SelectCustomerType from '@/components/SelectCustomerType';
import AddressComponent from '@/components/Address';
import moment from 'moment';
import { useGetCredits } from '@/hooks/credit.hooks';
import RenderCredit from '../components/credit';

const { Option } = Select;
const FormItem = Form.Item;
const { TabPane } = Tabs;

type Props = {
  visible: boolean;
  onCancel: () => void;
  customerData?: Partial<Customer>;
};

const EditCustomer = ({ visible, onCancel, customerData }: Props) => {
  const [disabledWhatsapp, setDisabledWatsapp] = useState(true);
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [form] = Form.useForm();

  const [updateCustomer, { loading }] = useUpdateCustomer();
  const [getDocumentTypes, paramsGetDocumentTypes] = useGetDocumentTypes();
  const [getCredit, paramsGetCredits] = useGetCredits();
  const [createCustomer /*paramsCreateCustomer*/] = useCreatecustomer();

  const isNew = !customerData?._id;

  const onSearchCredit = () => {
    getCredit({
      variables: {
        input: {
          customerId: customerData?._id,
        },
      },
    });
  };

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    form.resetFields();
  };

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

  const editCustomer = async () => {
    const values = await form.validateFields();
    try {
      const response = await updateCustomer({
        variables: {
          input: { ...values, isWhatsapp: isWhatsapp, addresses },
          id: customerData?._id || '',
        },
      });
      if (response?.data?.updateCustomer) {
        setAlertInformation({
          message: `Cliente ${response.data.updateCustomer.firstName} ${response?.data?.updateCustomer?.lastName} actualizado correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  const createNewCustomer = async () => {
    const values = await form.validateFields();
    console.log(values);

    try {
      const response = await createCustomer({
        variables: {
          input: { ...values, isWhatsapp: isWhatsapp, addresses },
        },
      });
      if (response?.data?.createCustomer) {
        setAlertInformation({
          message: `Cliente ${response.data.createCustomer.firstName} ${response?.data?.createCustomer?.lastName} creado correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (error: any) {
      showError(error?.message);
    }
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
    closeAndClear();
  };

  const onSearchDocumentTypes = () => {
    getDocumentTypes({
      variables: {
        input: {},
      },
    });
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

  const documentTypes = Object.values(
    paramsGetDocumentTypes?.data?.documentTypes ? paramsGetDocumentTypes?.data?.documentTypes : {},
  );

  useEffect(() => {
    onSearchDocumentTypes();
  }, []);

  const birthday = moment(customerData?.birthday || undefined);

  useEffect(() => {
    form.setFieldsValue({
      ...customerData,
      customerTypeId: customerData?.customerType?._id,
      birthday: customerData?.birthday !== null ? birthday : undefined,
    });
    onSearchCredit();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={closeAndClear}
      cancelText="Cancelar"
      okText={isNew ? 'Crear' : 'Actualizar'}
      destroyOnClose
      title={isNew ? 'Crear Cliente' : 'Actualizar Cliente'}
      onOk={() => (!isNew ? editCustomer() : createNewCustomer())}
      okButtonProps={{ disabled: loading, loading: loading }}
      cancelButtonProps={{ disabled: loading, loading: loading }}
    >
      <Tabs>
        <TabPane tab="Datos" key="1">
          <Form form={form}>
            <Row gutter={20}>
              <Col span={4}>
                <FormItem name="documentTypeId">
                  <Select size="small" bordered={false}>
                    {documentTypes.map((typeDocument) => (
                      <Option key={typeDocument._id} value={typeDocument._id}>
                        {typeDocument.abbreviation}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Documento" name="document" labelCol={{ span: 7 }}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Nombre" name="firstName" labelCol={{ span: 7 }}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Apellido" name="lastName" labelCol={{ span: 7 }}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Correo" name="email" labelCol={{ span: 7 }}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem
                  name={'phone'}
                  labelCol={{ span: 7 }}
                  label="Telefono"
                  rules={[
                    {
                      validator: (_, value) => {
                        const number = parseInt(value);

                        if (!value) {
                          return Promise.resolve();
                        }
                        if (!isNaN(number)) {
                          return Promise.resolve();
                        }
                        return Promise.reject();
                      },
                      message: '*Campo numerico',
                    },
                  ]}
                >
                  <Input
                    suffix={
                      <Tooltip title="Tiene whatsapp?">
                        <Checkbox
                          disabled={disabledWhatsapp}
                          onChange={(e) => onChangeCheck(e)}
                          defaultChecked={customerData?.isWhatsapp}
                        >
                          {<WhatsAppOutlined color="green" />}
                        </Checkbox>
                      </Tooltip>
                    }
                    onChange={(e) =>
                      e?.target?.value ? setDisabledWatsapp(false) : setDisabledWatsapp(true)
                    }
                  />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Nacimiento" name="birthday" labelCol={{ span: 7 }}>
                  <DatePicker format={FORMAT_DATE_API} locale={locale} style={styles.dateWidth} />
                </FormItem>
              </Col>
              {
                <Col span={18}>
                  <FormItem label="Tipo de Cliente" name="customerTypeId" labelCol={{ span: 8 }}>
                    <SelectCustomerType disabled={false} />
                  </FormItem>
                </Col>
              }
              <Col span={8} offset={4}>
                <FormItem label="Por Defecto" name="isDefault" valuePropName="checked">
                  <Checkbox defaultChecked />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Activo" name="active" valuePropName="checked">
                  <Switch defaultChecked />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </TabPane>
        {!isNew && (
          <>
            <TabPane tab="Direcciones" key="2">
              <AddressComponent addresses={addresses} setAddresses={setAddresses} />
            </TabPane>
            <TabPane tab="Crédito" key="3">
              <RenderCredit
                customerId={customerData?._id}
                dataCredit={paramsGetCredits?.data?.credits?.docs}
              />
            </TabPane>
          </>
        )}
        <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      </Tabs>
    </Modal>
  );
};

export default EditCustomer;
