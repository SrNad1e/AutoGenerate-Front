/* eslint-disable react-hooks/exhaustive-deps */
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from 'antd';
import { useCreateDiscountRule, useUpdateDiscountRule } from '@/hooks/discount.hooks';
import {
  AppstoreOutlined,
  DollarOutlined,
  PercentageOutlined,
  ProfileOutlined,
  ReadOutlined,
  ScheduleOutlined,
  SelectOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { DiscountRule } from '@/graphql/graphql';
import moment from 'moment';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { DocumentType } from './discount.data';
import { RuleType } from './rules.data';
import SelectListCategory from '../components/selectListCategory';
import SelectListCustomerType from '../components/selectListCustomerType';

import styles from '../styles';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  discountData: DiscountRule;
};

const DiscountForm = ({ discountData, onCancel, visible }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visibleSelectCategory, setVisibleSelectCategory] = useState(false);
  const [visibleSelectCustomerType, setVisibleCustomerType] = useState(false);
  const [Ids, setIds] = useState<string[]>([]);
  const [disabledPercent, setDisabledPercent] = useState(false);
  const [disabledValue, setDisabledValue] = useState(false);

  const isNew = !discountData?._id;
  const [form] = Form.useForm();

  const [createDiscountRule, paramsCreateDiscountRule] = useCreateDiscountRule();
  const [updateDiscountRule, paramsUpdateDiscountRule] = useUpdateDiscountRule();

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
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    form.resetFields();
  };

  /**
   * @description cierra la alerta y resetea los campos del form
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    closeAndClear();
  };

  const onChangeValue = (e: any) => {
    if (e > 0) {
      setDisabledPercent(true);
    } else {
      setDisabledPercent(false);
    }
  };

  const onChangePercent = (e: any) => {
    if (e > 0) {
      setDisabledValue(true);
    } else {
      setDisabledValue(false);
    }
  };

  /**
   * @description funcion usada para guardar los Ids del tipo de cliente
   * @param e evento del onchange
   */
  const onChangeType = (e: any) => {
    if (e) {
      setIds([...e]);
    }
  };

  /**
   * @description funcion usada para controlar la aparicion de los campos de categoria y seleccion de tipo de cliente
   * @param e evento del onchange
   */
  const onChangeRule = (e?: any) => {
    if (e && e == 'CATEGORIES') {
      setVisibleSelectCategory(true);
      setVisibleCustomerType(false);
      form.resetFields(['categoryIds', 'customerIds']);
    }
    if (e && e == 'CUSTOMERTYPES') {
      setVisibleCustomerType(true);
      setVisibleSelectCategory(false);
      form.resetFields(['categoryIds', 'customerIds']);
    }
  };

  /**
   * @description funcion usada para actualizar un descuento
   */
  const editDiscount = async () => {
    const values = await form.validateFields();
    const valueCustomer = form.getFieldValue('customerIds');
    const valueCategory = form.getFieldValue('categoryIds');
    let documentCustomerType: any = [];

    try {
      if (valueCustomer !== undefined && Ids.length > 0) {
        documentCustomerType = [...Ids];
      } else if (valueCategory !== undefined) {
        documentCustomerType = [...valueCategory];
      }

      const rulesType = {
        documentIds: documentCustomerType,
        documentType: values.documentType,
        type: values.type,
      };

      const params: any = {
        ...values,
        rules: [rulesType],
      };

      if (values.dates) {
        const dateInitial = moment(values.dates[0]).format(FORMAT_DATE_API);
        const dateFinal = moment(values.dates[1]).format(FORMAT_DATE_API);
        params.dateFinal = dateFinal;
        params.dateInitial = dateInitial;
      }

      delete params.dates;

      delete params.categoryIds;

      delete params.documentType;

      delete params.type;

      delete params.customerIds;

      const response = await updateDiscountRule({
        variables: {
          input: { ...params },
          id: discountData?._id || '',
        },
      });
      if (response?.data?.updateDiscountRule) {
        setAlertInformation({
          message: `Descuento ${response?.data?.updateDiscountRule?.name} actualizado correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      if (e?.message) {
        showError(e?.message);
      }
    }
  };

  /**
   * @description funcion usada para crear un descuento
   */
  const createNewDiscount = async () => {
    const values = await form.validateFields();
    const valueCustomer = form.getFieldValue('customerIds');
    const valueCategory = form.getFieldValue('categoryIds');
    let documentCustomerType: any = [];

    try {
      if (valueCustomer !== undefined) {
        documentCustomerType = [...Ids];
      } else if (valueCategory !== undefined) {
        documentCustomerType = [...valueCategory];
      }

      const rulesType = {
        documentIds: documentCustomerType,
        documentType: values.documentType,
        type: values.type,
      };

      const params: any = {
        ...values,
        rules: [rulesType],
      };

      if (values.dates) {
        const dateInitial = moment(values.dates[0]).format(FORMAT_DATE_API);
        const dateFinal = moment(values.dates[1]).format(FORMAT_DATE_API);
        params.dateFinal = dateFinal;
        params.dateInitial = dateInitial;
      }

      delete params.dates;

      delete params.categoryIds;

      delete params.documentType;

      delete params.type;

      delete params.customerIds;

      const response = await createDiscountRule({
        variables: {
          input: { ...params },
        },
      });
      if (response?.data?.createDiscountRule) {
        setAlertInformation({
          message: `Descuento ${response?.data?.createDiscountRule?.name} creado correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      if (e?.message) {
        showError(e?.message);
      }
    }
  };

  useEffect(() => {
    setVisibleCustomerType(false);
    setVisibleSelectCategory(false);
    setDisabledPercent(false);
    setDisabledValue(false);
    form.resetFields();
    form.setFieldsValue({
      ...discountData,
      documentType: discountData?.rules ? discountData.rules[0].documentType : '',
      type: discountData?.rules ? discountData.rules[0].type : '',
      categoryIds: discountData?.rules ? [...discountData.rules[0].documentIds] : [],
      dates:
        discountData?.dateInitial && discountData?.dateFinal
          ? [moment(discountData?.dateInitial), moment(discountData?.dateFinal)]
          : [undefined, undefined],
      customerIds: discountData?.rules && [...discountData.rules[0].documentIds],
    });

    if (discountData?.rules) {
      if (discountData?.rules[0]?.documentType === 'CATEGORIES') {
        setVisibleSelectCategory(true);
      } else if (discountData?.rules[0]?.documentType === 'CUSTOMERTYPES') {
        setVisibleCustomerType(true);
      }
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      width={400}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={closeAndClear}
      onOk={isNew ? () => createNewDiscount() : () => editDiscount()}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Descuento' : 'Actualizar Descuento'}
      cancelButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading,
        loading: paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading,
      }}
      okButtonProps={{
        style: styles.buttonR,
        disabled: paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading,
        loading: paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading,
      }}
    >
      <Form layout="vertical" form={form} style={styles.centerForm}>
        <Row>
          <Col span={24}>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              label={
                <Space>
                  <ProfileOutlined /> Nombre
                </Space>
              }
              name="name"
            >
              <Input
                disabled={paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading}
              />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              label={
                <Space>
                  <ScheduleOutlined /> Fechas
                </Space>
              }
              name="dates"
            >
              <RangePicker
                format={FORMAT_DATE_API}
                style={styles.maxWidth}
                placeholder={['Fecha Inicial', 'Fecha Final']}
                disabled={paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading}
              />
            </FormItem>
            <FormItem
              label={
                <Space>
                  <PercentageOutlined /> Porcentaje
                </Space>
              }
              name="percent"
            >
              <InputNumber
                style={styles.maxWidth}
                controls={false}
                onChange={(e) => onChangePercent(e)}
                formatter={(value) => `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\%\s?|(,*)/g, '')}
                disabled={
                  paramsCreateDiscountRule?.loading ||
                  paramsUpdateDiscountRule?.loading ||
                  disabledPercent
                }
              />
            </FormItem>
            <FormItem
              label={
                <Space>
                  <DollarOutlined /> Valor
                </Space>
              }
              name="value"
            >
              <InputNumber
                disabled={
                  paramsCreateDiscountRule?.loading ||
                  paramsUpdateDiscountRule?.loading ||
                  disabledValue
                }
                style={styles.maxWidth}
                onChange={(e) => onChangeValue(e)}
                controls={false}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>{' '}
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              label={
                <Space>
                  <ReadOutlined /> Tipos de Documento
                </Space>
              }
              name="documentType"
            >
              <Select
                style={styles.maxWidth}
                placeholder="Seleccione el tipo de documento"
                disabled={paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading}
                onChange={(e) => onChangeRule(e)}
              >
                {Object.keys(DocumentType).map((type) => (
                  <Option key={type}>
                    <Text>{DocumentType[type].label}</Text>
                  </Option>
                ))}
              </Select>
            </FormItem>
            {visibleSelectCategory && (
              <FormItem
                rules={[
                  {
                    required: true,
                    message: 'Este campo no puede estar vacio',
                  },
                ]}
                label={
                  <Space>
                    <AppstoreOutlined />
                    <Text>Categorias</Text>
                  </Space>
                }
                name="categoryIds"
              >
                <SelectListCategory
                  disabled={paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading}
                />
              </FormItem>
            )}
            {visibleSelectCustomerType && (
              <FormItem
                rules={[
                  {
                    required: true,
                    message: 'Este campo no puede estar vacio',
                  },
                ]}
                label={
                  <Space>
                    <UserAddOutlined />
                    <Text>Tipos de Cliente</Text>
                  </Space>
                }
                name="customerIds"
              >
                <SelectListCustomerType
                  onChange={(e) => onChangeType(e)}
                  disabled={paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading}
                />
              </FormItem>
            )}
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              label={
                <Space>
                  <SelectOutlined /> Tipo
                </Space>
              }
              name="type"
            >
              <Select
                style={styles.maxWidth}
                placeholder="Seleccione el tipo de regla"
                disabled={paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading}
              >
                {Object.keys(RuleType).map((type) => (
                  <Option key={type}>
                    <Text>{RuleType[type].label}</Text>
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={6} offset={10}>
            {!isNew && (
              <FormItem valuePropName="checked" name="active" label="Activo">
                <Switch
                  disabled={paramsCreateDiscountRule?.loading || paramsUpdateDiscountRule?.loading}
                  checked
                />
              </FormItem>
            )}
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default DiscountForm;
