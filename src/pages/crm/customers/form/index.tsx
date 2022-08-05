/* eslint-disable react-hooks/exhaustive-deps */
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
import type { Address, Customer } from '@/graphql/graphql';
import { useCreatecustomer, useUpdateCustomer } from '@/hooks/customer.hooks';
import { useGetDocumentTypes } from '@/hooks/documentType.hooks';
import moment from 'moment';
import { useCreateCredit, useGetCredits, useUpdateCredit } from '@/hooks/credit.hooks';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectCustomerType from '@/components/SelectCustomerType';
import AddressComponent from '@/components/Address';
import RenderCredit from '../components/credit';

import styles from '../styles';
import './styles.css';

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
  const [isDefault, setIsDefault] = useState(false);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [valuesFields, setValuesFields] = useState();

  const [form] = Form.useForm();

  const [updateCredit, paramsUpdateCredit] = useUpdateCredit();
  const [updateCustomer, { loading }] = useUpdateCustomer();
  const [getDocumentTypes, paramsGetDocumentTypes] = useGetDocumentTypes();
  const [getCredit, paramsGetCredits] = useGetCredits();
  const [createCustomer, paramsCreateCustomer] = useCreatecustomer();
  const [createCredit, paramsCreateCredit] = useCreateCredit();

  const isNew = !customerData?._id;

  const birthday = moment(customerData?.birthday || undefined);

  const documentTypes = Object.values(
    paramsGetDocumentTypes?.data?.documentTypes ? paramsGetDocumentTypes?.data?.documentTypes : {},
  );

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

  /**
   * @description ejecuta la consulta para obtener el credito del cliente seleccionado
   */
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
   * @description ejecuta la consulta para obtener el tipo de documentos
   */
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
  const onChangeCheckWhatsapp = (e: CheckboxChangeEvent) => {
    if (e?.target?.checked) {
      setIsWhatsapp(true);
    } else {
      setIsWhatsapp(false);
    }
  };

  /**
   * @description se encarga de gestionar si el cliente es por defecto o no
   * @param e evento del checkbox
   */
  const onChangeCheckDefault = (e: CheckboxChangeEvent) => {
    if (e?.target?.checked) {
      setIsDefault(true);
    } else {
      setIsDefault(false);
    }
  };

  /**
   * @description funcion ejecutada para actualizar un cliente y su credito o en caso de que no tenga credito crearlo
   */
  const editCustomer = async () => {
    const values = await form.validateFields();

    try {
      const response = await updateCustomer({
        variables: {
          input: { ...values, isWhatsapp: isWhatsapp, addresses, isDefault: isDefault },
          id: customerData?._id || '',
        },
      });

      const creditProps =
        paramsGetCredits?.data?.credits?.docs && paramsGetCredits?.data?.credits?.docs[0];
      if (creditProps?._id) {
        await updateCredit({
          variables: {
            id: creditProps?._id || '',
            input: {
              amount: valuesFields?.valuesCredit?.amount,
            },
          },
        });
      } else if (valuesFields?.valuesCredit?.amount) {
        await createCredit({
          variables: {
            input: {
              amount: valuesFields?.valuesCredit?.amount,
              customerId: customerData?._id || '',
            },
          },
        });
      }

      setAlertInformation({
        message: `Cliente ${
          response.data ? response.data.updateCustomer.firstName : customerData?.firstName
        } ${
          response.data ? response.data.updateCustomer.lastName : customerData?.lastName
        } actualizado correctamente`,
        type: 'success',
        visible: true,
      });
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion ejecutada para crear un nuevo cliente
   */
  const createNewCustomer = async () => {
    const values = await form.validateFields();

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

  useEffect(() => {
    onSearchDocumentTypes();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ...customerData,
      customerTypeId: customerData?.customerType?._id,
      birthday: customerData?.birthday !== null ? birthday : undefined,
      documentTypeId: customerData?.documentType?._id,
    });
    setAddresses(customerData?.addresses || []);
    onSearchCredit();
  }, [visible]);

  /**
   * @description selecciona el tipo de documento del cliente
   */
  const documentTypeBefore = (
    <FormItem name="documentTypeId" style={styles.marginZero}>
      <Select
        size="small"
        bordered={false}
        placeholder="NIT..."
        style={styles.selectWidth}
        disabled={
          loading ||
          paramsGetCredits?.loading ||
          paramsCreateCredit?.loading ||
          paramsCreateCustomer?.loading ||
          paramsGetDocumentTypes?.loading ||
          paramsUpdateCredit?.loading
        }
        loading={
          loading ||
          paramsUpdateCredit?.loading ||
          paramsCreateCustomer?.loading ||
          paramsCreateCredit?.loading
        }
      >
        {documentTypes.map((typeDocument) => (
          <Option key={typeDocument._id} value={typeDocument._id}>
            {typeDocument.abbreviation}
          </Option>
        ))}
      </Select>
    </FormItem>
  );

  /**
   * @description Checkbox que valida si tiene whatsapp el cliente
   */
  const isWhatsappSuffix = (
    <FormItem name="isWhatsapp" style={{ marginBottom: 0 }}>
      <Tooltip title="Tiene whatsapp?">
        <Checkbox
          onChange={(e) => onChangeCheckWhatsapp(e)}
          defaultChecked={customerData?.isWhatsapp}
          disabled={
            loading ||
            disabledWhatsapp ||
            paramsGetCredits?.loading ||
            paramsCreateCredit?.loading ||
            paramsCreateCustomer?.loading ||
            paramsGetDocumentTypes?.loading ||
            paramsUpdateCredit?.loading
          }
        >
          {<WhatsAppOutlined color="green" />}
        </Checkbox>
      </Tooltip>
    </FormItem>
  );

  return (
    <Modal
      visible={visible}
      onCancel={closeAndClear}
      cancelText="Cancelar"
      okText={isNew ? 'Crear' : 'Actualizar'}
      destroyOnClose
      title={isNew ? 'Crear Cliente' : 'Actualizar Cliente'}
      onOk={() => (!isNew ? editCustomer() : createNewCustomer())}
      okButtonProps={{
        disabled:
          loading ||
          paramsUpdateCredit?.loading ||
          paramsCreateCustomer?.loading ||
          paramsCreateCredit?.loading,
        loading:
          loading ||
          paramsUpdateCredit?.loading ||
          paramsCreateCustomer?.loading ||
          paramsCreateCredit?.loading,
      }}
      cancelButtonProps={{
        disabled:
          loading ||
          paramsUpdateCredit?.loading ||
          paramsCreateCustomer?.loading ||
          paramsCreateCredit?.loading,
        loading:
          loading ||
          paramsUpdateCredit?.loading ||
          paramsCreateCustomer?.loading ||
          paramsCreateCredit?.loading,
      }}
    >
      <Tabs>
        <TabPane tab="Datos" key="1">
          <Form form={form}>
            <Row gutter={20}>
              <Col span={20}>
                <FormItem
                  label="Documento"
                  name="document"
                  labelCol={{ span: 7 }}
                  rules={[
                    {
                      required: true,
                      message: '*Este campo no puede estar vacio',
                    },
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
                      message: '*Campo numérico',
                    },
                    {
                      validator: () => {
                        const type = form.getFieldValue('documentTypeId');

                        if (!type) {
                          return Promise.reject();
                        }
                        return Promise.resolve();
                      },
                      message: '*Este campo no puede estar vacio',
                    },
                  ]}
                >
                  <Input
                    disabled={
                      loading ||
                      paramsGetCredits?.loading ||
                      paramsCreateCredit?.loading ||
                      paramsCreateCustomer?.loading ||
                      paramsGetDocumentTypes?.loading ||
                      paramsUpdateCredit?.loading
                    }
                    addonBefore={documentTypeBefore}
                  />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem
                  label="Nombre"
                  name="firstName"
                  labelCol={{ span: 7 }}
                  rules={[
                    {
                      required: true,
                      message: '*Este campo no puede estar vacio',
                    },
                  ]}
                >
                  <Input
                    disabled={
                      loading ||
                      paramsGetCredits?.loading ||
                      paramsCreateCredit?.loading ||
                      paramsCreateCustomer?.loading ||
                      paramsGetDocumentTypes?.loading ||
                      paramsUpdateCredit?.loading
                    }
                  />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem
                  label="Apellido"
                  name="lastName"
                  labelCol={{ span: 7 }}
                  rules={[
                    {
                      required: true,
                      message: '*Este campo no puede estar vacio',
                    },
                  ]}
                >
                  <Input
                    disabled={
                      loading ||
                      paramsGetCredits?.loading ||
                      paramsCreateCredit?.loading ||
                      paramsCreateCustomer?.loading ||
                      paramsGetDocumentTypes?.loading ||
                      paramsUpdateCredit?.loading
                    }
                  />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Correo" name="email" labelCol={{ span: 7 }}>
                  <Input
                    disabled={
                      loading ||
                      paramsGetCredits?.loading ||
                      paramsCreateCredit?.loading ||
                      paramsCreateCustomer?.loading ||
                      paramsGetDocumentTypes?.loading ||
                      paramsUpdateCredit?.loading
                    }
                  />
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
                      message: '*Campo numérico',
                    },
                  ]}
                >
                  <Input
                    suffix={isWhatsappSuffix}
                    onChange={(e) =>
                      e?.target?.value ? setDisabledWatsapp(false) : setDisabledWatsapp(true)
                    }
                    disabled={
                      loading ||
                      paramsGetCredits?.loading ||
                      paramsCreateCredit?.loading ||
                      paramsCreateCustomer?.loading ||
                      paramsGetDocumentTypes?.loading ||
                      paramsUpdateCredit?.loading
                    }
                  />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Nacimiento" name="birthday" labelCol={{ span: 7 }}>
                  <DatePicker
                    format={FORMAT_DATE_API}
                    locale={locale}
                    style={styles.dateWidth}
                    disabled={
                      loading ||
                      paramsGetCredits?.loading ||
                      paramsCreateCredit?.loading ||
                      paramsCreateCustomer?.loading ||
                      paramsGetDocumentTypes?.loading ||
                      paramsUpdateCredit?.loading
                    }
                  />
                </FormItem>
              </Col>
              {
                <Col span={18}>
                  <FormItem label="Tipo de Cliente" name="customerTypeId" labelCol={{ span: 8 }}>
                    <SelectCustomerType
                      disabled={
                        loading ||
                        paramsGetCredits?.loading ||
                        paramsCreateCredit?.loading ||
                        paramsCreateCustomer?.loading ||
                        paramsGetDocumentTypes?.loading ||
                        paramsUpdateCredit?.loading
                      }
                    />
                  </FormItem>
                </Col>
              }
              <Col span={8} offset={4}>
                <FormItem label="Por Defecto" name="isDefault" valuePropName="checked">
                  <Checkbox
                    defaultChecked
                    onChange={(e) => onChangeCheckDefault(e)}
                    disabled={
                      loading ||
                      paramsGetCredits?.loading ||
                      paramsCreateCredit?.loading ||
                      paramsCreateCustomer?.loading ||
                      paramsGetDocumentTypes?.loading ||
                      paramsUpdateCredit?.loading
                    }
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Activo" name="active" valuePropName="checked">
                  <Switch
                    defaultChecked
                    disabled={
                      loading ||
                      paramsGetCredits?.loading ||
                      paramsCreateCredit?.loading ||
                      paramsCreateCustomer?.loading ||
                      paramsGetDocumentTypes?.loading ||
                      paramsUpdateCredit?.loading
                    }
                    loading={
                      loading ||
                      paramsUpdateCredit?.loading ||
                      paramsCreateCustomer?.loading ||
                      paramsCreateCredit?.loading
                    }
                  />
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
                setValuesFields={setValuesFields}
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
