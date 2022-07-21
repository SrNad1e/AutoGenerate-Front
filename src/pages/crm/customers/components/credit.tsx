/* eslint-disable react-hooks/exhaustive-deps */
import type { Credit } from '@/graphql/graphql';
import { Badge, Col, Divider, Form, InputNumber, Row, Select, Typography } from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import { StatusTypeCustomer } from '../customer.data';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useState } from 'react';
import styles from '../styles';

const FormItem = Form.Item;
const { Text } = Typography;
const { Option } = Select;

type Props = {
  dataCredit: Credit[];
  setValuesFields: (value: any) => void;
};

const RenderCredit = ({ dataCredit, setValuesFields }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  const creditProps =
    dataCredit.length > 0 &&
    dataCredit.reduce((target, key, index) => {
      target[index] = key;
      return target;
    });

  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'success',
      visible: false,
    });
  };

  const onChangeAmount = () => {
    const valuesCredit = form.getFieldsValue();
    setValuesFields({ valuesCredit });
  };

  return (
    <>
      <Form form={form} initialValues={{ ...creditProps }}>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          label="Monto Aprobado"
          name="amount"
        >
          <InputNumber
            onChange={() => onChangeAmount()}
            min={0}
            style={{ width: '100%' }}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </FormItem>
        {dataCredit.length > 0 && (
          <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} label="Estado">
            <Select defaultValue={creditProps?.status} style={styles.midWidth}>
              {Object.keys(StatusTypeCustomer).map((status) => (
                <Option key={status}>
                  <Badge
                    color={StatusTypeCustomer[status].color}
                    text={StatusTypeCustomer[status].label}
                  />
                </Option>
              ))}
            </Select>
          </FormItem>
        )}
        <Divider>Resumen</Divider>
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <Text strong>Apertura: </Text>
          </Col>
          <Col span={12}>
            <Text>{moment(creditProps?.updatedAt).format('YYYY/MM/DD')}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Cupo disponible: </Text>
          </Col>
          <Col span={12} style={styles.flexR}>
            <Text style={styles.textAlign}>{numeral(creditProps?.available).format('$ 0,0')}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Cupo congelado: </Text>
          </Col>
          <Col span={12} style={styles.flexR}>
            <Text style={styles.textAlign}>
              {numeral(creditProps?.frozenAmount).format('$ 0,0')}
            </Text>
          </Col>
          <Col span={12}>
            <Text strong>Saldo por pagar: </Text>
          </Col>
          <Col span={12} style={styles.flexR}>
            <Text style={styles.textAlign}>{numeral(creditProps?.balance).format('$ 0,0')}</Text>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default RenderCredit;
