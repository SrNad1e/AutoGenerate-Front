/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Space, Switch } from 'antd';
import { useCreateDiscountRule, useUpdateDiscountRule } from '@/hooks/discount.hooks';
import {
  DollarOutlined,
  EyeOutlined,
  PercentageOutlined,
  PlusOutlined,
  ProfileOutlined,
  ReadOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { DiscountRule, Rule } from '@/graphql/graphql';
import moment from 'moment';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import CreateRuleForm from '../components/createRule';
import ListOfRules from '../components/listOfRules';

import styles from '../styles';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

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
  const [disabledPercent, setDisabledPercent] = useState(false);
  const [disabledValue, setDisabledValue] = useState(false);
  const [visibleAddRule, setVisibleAddRule] = useState(false);
  const [visibleListRules, setVisibleListRules] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);

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
   * @description abre el modal de la lista de reglas y guarda las reglas del descuento en el estado
   */
  const openListOfRules = () => {
    setVisibleListRules(true);
    if (discountData?.rules?.length > 0) {
      setRules([...discountData.rules]);
    }
  };

  /**
   * @description cierra el modal de la lista de reglas
   */
  const onCloseVisibleListOfRules = () => {
    setVisibleListRules(false);
  };

  /**
   * @description cierra el modal de creacion de regla
   */
  const onCloseVisibleAddRule = () => {
    setVisibleAddRule(false);
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

  /**
   * @description controla la deshabilitacion del campo de porcentaje
   * @param e valor del campo
   */
  const onChangeValue = (e: any) => {
    if (e > 0) {
      setDisabledPercent(true);
    } else {
      setDisabledPercent(false);
    }
  };

  /**
   * @description controla la deshabilitacion del campo de valor
   * @param e valor del campo
   */
  const onChangePercent = (e: any) => {
    if (e > 0) {
      setDisabledValue(true);
    } else {
      setDisabledValue(false);
    }
  };

  /**
   * @description funcion usada para actualizar un descuento
   */
  const editDiscount = async () => {
    const values = await form.validateFields();

    const newRules = rules.map(({ __typename, ...rest }) => {
      return rest;
    });
    const newDiscountDataRules = discountData.rules.map(({ __typename, ...rest }) => {
      return rest;
    });

    try {
      const params: any = {
        ...values,
        rules: rules.length > 0 ? newRules : newDiscountDataRules,
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
    try {
      const params: any = {
        ...values,
        rules: [...rules],
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
    setRules([]);
    setDisabledPercent(false);
    setDisabledValue(false);
    form.resetFields();
    form.setFieldsValue({
      ...discountData,
      dates:
        discountData?.dateInitial && discountData?.dateFinal
          ? [moment(discountData?.dateInitial), moment(discountData?.dateFinal)]
          : [undefined, undefined],
    });
    if (discountData.percent > 0) {
      setDisabledValue(true);
    }
    if (discountData.value > 0) {
      setDisabledPercent(true);
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
        disabled:
          paramsCreateDiscountRule?.loading ||
          paramsUpdateDiscountRule?.loading ||
          (isNew && rules?.length === 0),
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
                showTime
                format={FORMAT_DATE}
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
              label={
                <Space>
                  <ReadOutlined /> Reglas
                </Space>
              }
            >
              <Space size="large">
                {isNew && (
                  <Button
                    icon={<PlusOutlined />}
                    style={styles.buttonR}
                    onClick={() => setVisibleAddRule(true)}
                    type="primary"
                  >
                    Agregar Regla
                  </Button>
                )}
                {(discountData?.rules?.length > 0 || rules?.length > 0) && (
                  <Button
                    icon={<EyeOutlined />}
                    style={styles.buttonR}
                    onClick={() => openListOfRules()}
                    type="primary"
                  >
                    Ver reglas
                  </Button>
                )}
              </Space>
            </FormItem>
          </Col>
          <Col span={6}>
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
      <CreateRuleForm
        setRules={setRules}
        isNew={isNew}
        rules={rules}
        onCancel={onCloseVisibleAddRule}
        visible={visibleAddRule}
      />
      <ListOfRules
        setRules={setRules}
        rules={rules}
        discountData={discountData}
        visible={visibleListRules}
        isNew={isNew}
        onCancel={onCloseVisibleListOfRules}
      />
    </Modal>
  );
};

export default DiscountForm;
