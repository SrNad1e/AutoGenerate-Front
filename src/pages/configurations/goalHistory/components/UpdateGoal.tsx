/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, InputNumber, Modal, Row, Typography } from 'antd';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useEffect, useState } from 'react';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { DollarCircleOutlined } from '@ant-design/icons';
import { useAddGoal, useUpdateShop } from '@/hooks/shop.hooks';
import type { Shop } from '@/graphql/graphql';
import moment from 'moment';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  data: Shop;
};

const GoalUpdate = ({ onCancel, visible, data }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [form] = Form.useForm();

  const [updateShop, paramsUpdateShop] = useUpdateShop();
  const [addGoalShop] = useAddGoal();

  const onCloseModal = async () => {
    await onCancel();
    form.resetFields();
  };

  /**
   * @description cierra la alerta y resetea los campos del form
   */
  const closeAlertInformation = async () => {
    await setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    if (paramsUpdateShop?.data) {
      onCloseModal();
    }
  };

  /**
   * @description ejecuta la mutation para actualizar una tienda
   */
  const editShop = async () => {
    const values = form.getFieldsValue();
    try {
      const response = await updateShop({
        variables: {
          input: { goal: values.goal },
          id: data?._id,
        },
      });
      addGoalShop({
        variables: {
          input: {
            shopId: data?._id,
            goalHistory: {
              date: moment(new Date()).format('YYYY/MM/01'),
              goal: values?.goal,
            },
          },
        },
      });
      if (response?.data?.updateShop) {
        setAlertInformation({
          message: `Tienda ${response?.data?.updateShop?.name}, meta actualizada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      if (e?.message) {
        setAlertInformation({
          message: e?.message,
          visible: true,
          type: 'error',
        });
      }
    }
  };

  useEffect(() => {
    form.setFieldValue('currentGoal', data?.goal);
  }, [visible]);

  return (
    <Modal
      onOk={() => editShop()}
      onCancel={onCancel}
      open={visible}
      title="Actualizar Meta"
      okButtonProps={{ style: { borderRadius: 5 }, loading: paramsUpdateShop.loading }}
      cancelButtonProps={{ style: { borderRadius: 5 }, loading: paramsUpdateShop.loading }}
      okText="Actualizar"
      cancelText="Cancelar"
    >
      <Form
        form={form}
        layout="vertical"
        style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
      >
        <Row>
          <Col span={24}>
            <FormItem
              label={
                <Text>
                  <DollarCircleOutlined /> Nueva Meta Propuesta
                </Text>
              }
              name="goal"
              rules={[{ required: true, message: 'Este campo no puede estar vacío' }]}
            >
              <InputNumber
                disabled={paramsUpdateShop?.loading}
                min={0}
                step={100}
                style={{ width: '70%' }}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
            <FormItem
              label={
                <Text>
                  <DollarCircleOutlined /> Meta Actual
                </Text>
              }
              name="currentGoal"
            >
              <InputNumber
                disabled={true}
                min={0}
                step={100}
                style={{ width: '70%' }}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default GoalUpdate;
