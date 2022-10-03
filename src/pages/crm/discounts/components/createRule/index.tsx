/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppstoreOutlined,
  ReadOutlined,
  SelectOutlined,
  ShopOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Col, Form, Modal, Row, Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { RuleType } from '../../form/rules.data';
import { DocumentType } from '../../form/discount.data';
import styles from '../../styles';
import SelectListCategory from '../selectListCategory';
import SelectListCustomerType from '../selectListCustomerType';
import type { DiscountRule, Rule } from '@/graphql/graphql';
import { DocumentTypesRule } from '@/graphql/graphql';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import SelectListShop from '../selectListShop';

const FormItem = Form.Item;
const { Option } = Select;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  ruleDataUpdate?: Partial<Rule>;
  discountData?: Partial<DiscountRule>;
  isNew?: boolean;
  rules: Rule[];
  setRules: any;
};

const CreateRuleForm = ({ onCancel, visible, ruleDataUpdate, isNew, rules, setRules }: Props) => {
  const [visibleSelectCategory, setVisibleSelectCategory] = useState(false);
  const [visibleSelectCustomerType, setVisibleCustomerType] = useState(false);
  const [visibleSelectShop, setVisibleSelectShop] = useState(false);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  /**
   * @description cierra la alerta y resetea los campos del form
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description crear una regla y la almacena en el estado
   */
  const createRule = async () => {
    const values = await form.validateFields();
    const rulesType = {
      documentIds: values.documentIds,
      documentType: values.documentType,
      type: values.type,
    };
    if (rules?.length > 0) {
      setRules([...rules, rulesType]);
    } else {
      setRules([rulesType]);
    }
    onCancel();
  };

  /**
   * @description actualiza una regla y la almacena en el estado
   */
  const updateRuleState = async () => {
    const values = await form.validateFields();
    const rulesObjects = rules?.map((i) => ({
      __typename: i.__typename,
      documentType: i.documentType,
      documentIds: i.documentIds,
      type: i.type,
    }));
    const rulesType = {
      documentIds: values.documentIds,
      documentType: values.documentType,
      type: values.type,
    };

    for (let i = 0; i < rules?.length; i++) {
      const rulesTry = {
        documentIds: rulesType.documentIds,
        documentType: rulesType.documentType,
        type: rulesType.type,
      };
      if (rulesObjects[i].documentType === values.documentType) {
        rulesObjects[i].documentIds = rulesTry.documentIds;
        rulesObjects[i].documentType = rulesTry.documentType;
        rulesObjects[i].type = rulesTry.type;

        setRules([...rulesObjects]);
        break;
      } else {
        setRules([...rules, rulesType]);
      }
    }
    if (rules?.length === 0) {
      setRules([rulesType]);
    }
    onCancel();
  };

  /**
   * @description funcion usada para controlar la aparicion de los campos de categoria y seleccion de tipo de cliente
   * @param e evento del onchange
   */
  const onChangeRule = (e?: any) => {
    if (e && e == 'CATEGORIES') {
      setVisibleSelectCategory(true);
      setVisibleCustomerType(false);
      setVisibleSelectShop(false);
      form.resetFields(['documentIds']);
    }
    if (e && e == 'CUSTOMERTYPES') {
      setVisibleCustomerType(true);
      setVisibleSelectCategory(false);
      setVisibleSelectShop(false);
      form.resetFields(['documentIds']);
    }
    if (e && e == 'COMPANY') {
      setVisibleCustomerType(false);
      setVisibleSelectCategory(false);
      setVisibleSelectShop(false);
      form.resetFields(['documentIds']);
    }
    if (e && e == 'SHOPS') {
      setVisibleCustomerType(false);
      setVisibleSelectCategory(false);
      setVisibleSelectShop(true);
      form.resetFields(['documentIds']);
    }
  };

  useEffect(() => {
    form.resetFields();
    setVisibleCustomerType(false);
    setVisibleSelectCategory(false);
    if (ruleDataUpdate) {
      form.setFieldsValue({
        ...ruleDataUpdate,
        documentIds: ruleDataUpdate.documentIds,
      });
      if (ruleDataUpdate.documentType === DocumentTypesRule.Categories) {
        setVisibleSelectCategory(true);
        setVisibleCustomerType(false);
        setVisibleSelectShop(false);
      }
      if (ruleDataUpdate.documentType === DocumentTypesRule.Customertypes) {
        setVisibleCustomerType(true);
        setVisibleSelectCategory(false);
        setVisibleSelectShop(false);
      }
      if (ruleDataUpdate.documentType === DocumentTypesRule.Shops) {
        setVisibleSelectShop(true);
        setVisibleCustomerType(false);
        setVisibleSelectCategory(false);
      }
      if (ruleDataUpdate.documentType === DocumentTypesRule.Company) {
        setVisibleCustomerType(false);
        setVisibleSelectCategory(false);
        setVisibleSelectShop(false);
      }
    }
  }, [visible]);

  return (
    <Modal
      title="Regla"
      cancelText="Cancelar"
      okText="Guardar"
      onOk={!isNew ? () => updateRuleState() : () => createRule()}
      visible={visible}
      onCancel={onCancel}
      cancelButtonProps={{
        style: styles.buttonR,
      }}
      okButtonProps={{
        style: styles.buttonR,
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
                  <ReadOutlined /> Tipos de Documento
                </Space>
              }
              name="documentType"
            >
              <Select
                disabled={ruleDataUpdate !== undefined}
                style={styles.maxWidth}
                placeholder="Seleccione el tipo de documento"
                onChange={(e) => onChangeRule(e)}
              >
                {Object.keys(DocumentType)?.map((type) => (
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
                name="documentIds"
              >
                <SelectListCategory disabled={false} />
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
                name="documentIds"
              >
                <SelectListCustomerType disabled={false} />
              </FormItem>
            )}
            {visibleSelectShop && (
              <FormItem
                rules={[
                  {
                    required: true,
                    message: 'Este campo no puede estar vacio',
                  },
                ]}
                label={
                  <Space>
                    <ShopOutlined />
                    <Text>Tiendas</Text>
                  </Space>
                }
                name="documentIds"
              >
                <SelectListShop disabled={false} />
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
              <Select style={styles.maxWidth} placeholder="Seleccione el tipo de regla">
                {Object.keys(RuleType)?.map((type) => (
                  <Option key={type}>
                    <Text>{RuleType[type].label}</Text>
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default CreateRuleForm;
