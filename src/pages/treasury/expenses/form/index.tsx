/* eslint-disable react-hooks/exhaustive-deps */
import { DollarCircleOutlined, GroupOutlined, SolutionOutlined } from '@ant-design/icons';
import { Col, Form, Input, InputNumber, Modal, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectBox from '@/components/SelectBox';
import { useCreateExpense } from '@/hooks/expense.hooks';

import styles from '../styles';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const ExpensesForm = ({ visible, onCancel }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [createExpense, { loading }] = useCreateExpense();

  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');

  const canChangeBox = initialState?.currentUser?.role?.changeWarehouse;

  /**
   * @description Cierra la alerta, resetea los campos del form y cierra el modal
   */
  const closeAndClear = async () => {
    await setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    onCancel();
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
   * @description Valida si el usuario puede elegir la caja o se le es asignada
   */
  const valueBox = () => {
    if (!canChangeBox) {
      if (initialState?.currentUser?.pointOfSale?._id) {
        form.setFieldsValue({ boxId: initialState?.currentUser?.pointOfSale?.box._id });
      } else {
        setAlertInformation({
          message: 'El usuario no tiene punto de venta asignado',
          type: 'warning',
          visible: true,
        });
      }
    }
  };

  /**
   * @description ejecuta la mutation para crear un nuevo egreso
   */
  const createNewExpense = async () => {
    const values = await form.validateFields();
    try {
      const response = await createExpense({
        variables: {
          input: values,
        },
      });
      if (response?.data?.createExpense) {
        setAlertInformation({
          message: `Egreso No ${response?.data?.createExpense?.number} creado Correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  useEffect(() => {
    form.resetFields();
    valueBox();
  }, [visible]);
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Crear Egreso"
      okText="Crear"
      cancelText="Cancelar"
      onOk={createNewExpense}
      okButtonProps={{
        loading: loading,
      }}
    >
      <Form form={form} layout="vertical">
        <Row gutter={40}>
          <Col span={12}>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="boxId"
              label={
                <Space>
                  <GroupOutlined />
                  <Text>Caja</Text>
                </Space>
              }
            >
              <SelectBox disabled={!canChangeBox} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="value"
              label={
                <Space>
                  <DollarCircleOutlined />
                  <Text>Valor</Text>
                </Space>
              }
            >
              <InputNumber
                autoFocus
                style={styles.InputFormWIdth}
                min={1}
                step={100}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="concept"
              label={
                <Space>
                  <SolutionOutlined />
                  <Text>Concepto</Text>
                </Space>
              }
            >
              <TextArea />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAndClear} />
    </Modal>
  );
};

export default ExpensesForm;
