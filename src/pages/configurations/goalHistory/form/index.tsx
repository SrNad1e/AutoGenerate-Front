/* eslint-disable react-hooks/exhaustive-deps */
import SelectShop from '@/components/SelectShop';
import { Col, DatePicker, Form, InputNumber, Modal, Row, Typography } from 'antd';
import moment from 'moment';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useState } from 'react';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { CalendarOutlined, DollarCircleOutlined, ShopOutlined } from '@ant-design/icons';
import { useAddGoal } from '@/hooks/shop.hooks';
import { useGetGoal } from '@/hooks/goal.hooks';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const GoalHistoryCreate = ({ onCancel, visible }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [form] = Form.useForm();
  const [addGoalShop, paramsAddGoalShop] = useAddGoal();
  const [getGoalStatus, paramasGetGoalStatus] = useGetGoal();

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
    if (paramsAddGoalShop?.data) {
      onCloseModal();
    }
  };

  const onSearchGoalStatus = async (shopId: string, currentDate: Date) => {
    const response = await getGoalStatus({
      variables: {
        input: {
          shopId,
          month: moment(currentDate).format('YYYY/MM/01 23:59:59'),
        },
      },
    });
    if (response?.data?.goalStatus) {
      return response?.data?.goalStatus?.netSales;
    }
  };

  const onCreateHistory = async () => {
    const values = await form.getFieldsValue();

    try {
      const registerGoal = {
        date: values.date,
        goal: values.goal,
        goalAchieved: await onSearchGoalStatus(values.shopId, values.date),
      };
      const shopId = values.shopId;
      const response = await addGoalShop({
        variables: {
          input: {
            shopId,
            goalHistory: registerGoal,
          },
        },
      });

      if (response?.data) {
        await setAlertInformation({
          message: 'Registro Creado Correctamente',
          visible: true,
          type: 'success',
        });
      }
    } catch (error: any) {
      setAlertInformation({
        message: error.message,
        visible: true,
        type: 'error',
      });
    }
  };

  return (
    <Modal
      onOk={() => onCreateHistory()}
      onCancel={onCancel}
      open={visible}
      title="Registro de Meta"
      okButtonProps={{
        style: { borderRadius: 5 },
        loading: paramsAddGoalShop.loading || paramasGetGoalStatus.loading,
      }}
      cancelButtonProps={{
        style: { borderRadius: 5 },
        loading: paramsAddGoalShop.loading || paramasGetGoalStatus.loading,
      }}
      okText="Crear Registro"
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
                  <ShopOutlined /> Tienda
                </Text>
              }
              name="shopId"
              rules={[{ required: true, message: 'Este campo no puede estar vacío' }]}
              style={{ width: '70%' }}
            >
              <SelectShop disabled={paramsAddGoalShop?.loading || paramasGetGoalStatus?.loading} />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label={
                <Text>
                  <CalendarOutlined /> Fecha
                </Text>
              }
              name="date"
              rules={[{ required: true, message: 'Este campo no puede estar vacío' }]}
            >
              <DatePicker
                disabled={paramsAddGoalShop.loading || paramasGetGoalStatus?.loading}
                style={{ width: '100%&' }}
                placeholder={'Seleccione Fecha'}
                picker="month"
              />
            </FormItem>
            <Col span={24}>
              <FormItem
                label={
                  <Text>
                    <DollarCircleOutlined /> Meta Propuesta
                  </Text>
                }
                name="goal"
                rules={[{ required: true, message: 'Este campo no puede estar vacío' }]}
              >
                <InputNumber
                  disabled={paramsAddGoalShop?.loading || paramasGetGoalStatus?.loading}
                  min={0}
                  step={100}
                  style={{ width: '70%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </FormItem>
            </Col>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default GoalHistoryCreate;
