import type { Credit } from '@/graphql/graphql';
import { useCreateCredit, useUpdateCredit } from '@/hooks/credit.hooks';
import { PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Col, Divider, Form, InputNumber, Row, Select, Typography } from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import { StatusTypeCustomer } from '../customer.data';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useState } from 'react';

const FormItem = Form.Item;
const { Text } = Typography;
const { Option } = Select;

type Props = {
  dataCredit: Credit[];
  customerId: string;
};

const RenderCredit = ({ dataCredit, customerId }: Props) => {
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

  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'success',
      visible: false,
    });
  };

  console.log(creditProps);
  const [createCredit /*paramsCreateCredit*/] = useCreateCredit();
  const [updateCredit /*paramsUpdateCredit*/] = useUpdateCredit();

  const createNewCredit = async () => {
    const values = await form.validateFields();

    const response = await createCredit({
      variables: {
        input: {
          amount: values.amount,
          customerId: customerId,
        },
      },
    });

    if (response) {
      setAlertInformation({
        message: 'Credito Creado Correctamente',
        type: 'success',
        visible: true,
      });
    }
  };

  const updateNewCredit = async () => {
    const values = await form.validateFields();

    const response = await updateCredit({
      variables: {
        id: creditProps._id,
        input: {
          amount: values.amount,
        },
      },
    });

    if (response) {
      setAlertInformation({
        message: 'Credito Actualizado Correctamente',
        type: 'success',
        visible: true,
      });
      showError();
    }
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
            min={0}
            style={{ width: '100%' }}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </FormItem>
        {dataCredit.length > 0 && (
          <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} label="Estado">
            <Select defaultValue={creditProps?.status} style={{ width: '50%' }}>
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
          <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
            <Text style={{ textAlign: 'right' }}>
              {numeral(creditProps?.available).format('$ 0,0')}
            </Text>
          </Col>
          <Col span={12}>
            <Text strong>Cupo congelado: </Text>
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
            <Text style={{ textAlign: 'right' }}>
              {numeral(creditProps?.frozenAmount).format('$ 0,0')}
            </Text>
          </Col>
          <Col span={12}>
            <Text strong>Saldo por pagar: </Text>
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'right' }}>
            <Text style={{ textAlign: 'right' }}>
              {numeral(creditProps?.balance).format('$ 0,0')}
            </Text>
          </Col>
          <Col span={8} offset={15}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => (dataCredit.length > 0 ? updateNewCredit() : createNewCredit())}
            >
              {dataCredit.length > 0 ? 'Actualizar Credito' : 'Crear Credito'}
            </Button>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default RenderCredit;
