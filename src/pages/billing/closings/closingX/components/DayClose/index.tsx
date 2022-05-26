import { DollarCircleFilled, PrinterFilled, ShopFilled } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Steps,
  Typography,
} from 'antd';
import { useState } from 'react';
import numeral from 'numeral';

import styles from '../styles';

const { Text, Title } = Typography;
const { Step } = Steps;
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

type Props = {
  visible: boolean;
  onCancel: () => void;
  onOk?: () => void;
};

const CloseDay = ({ visible, onCancel, onOk }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Modal
      destroyOnClose
      title="Cierre del día"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={
        currentStep > -1 && [
          <>
            <Button onClick={onCancel}>Cancelar</Button>
            {visible && (
              <Button
                type="primary"
                onClick={currentStep < 2 ? () => setCurrentStep(currentStep + 1) : onCancel}
              >
                {currentStep === 2 ? 'Crear Cierre' : 'Siguiente'}
              </Button>
            )}
          </>,
        ]
      }
    >
      <Steps current={currentStep}>
        <Step title="Tienda" icon={<ShopFilled />} />
        <Step title="Cierre" icon={<DollarCircleFilled />} />
        <Step title="Imprimir" icon={<PrinterFilled />} />
      </Steps>
      <Form
        style={styles.formMargin}
        layout="horizontal"
        wrapperCol={{ span: 10 }}
        labelCol={{ span: 10 }}
      >
        {currentStep === 0 && (
          <FormItem label="Seleccione Tienda" rules={[{ required: true, message: 'Obligatorio' }]}>
            <Select showSearch style={styles.selectWidth}>
              <Option key={1} value={'Gucci'}>
                {'Gucci'}
              </Option>
              <Option key={2} value={'Louis XVI'}>
                {'Louis XVI'}
              </Option>
              <Option key={3} value={'Toulouse'}>
                {'Toulouse'}
              </Option>
            </Select>
          </FormItem>
        )}
        {currentStep === 1 && (
          <>
            <FormItem
              label="Seleccione fecha de cierre"
              rules={[{ required: true, message: 'Obligatorio' }]}
            >
              <DatePicker style={styles.inputWidth} placeholder="Seleccione Fecha" />
            </FormItem>
            <FormItem
              label="Cantidad de efectivo"
              rules={[{ required: true, message: 'Obligatorio' }]}
            >
              <InputNumber
                value={10000}
                controls={false}
                style={styles.inputWidth}
                disabled
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
            <FormItem
              label="Costo de transferencias"
              rules={[{ required: true, message: 'Obligatorio' }]}
            >
              <InputNumber
                controls={false}
                style={styles.inputWidth}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
            <FormItem label="Descripción Gastos">
              <TextArea style={styles.inputWidth} />
            </FormItem>
          </>
        )}
        {currentStep === 2 && (
          <>
            <Row justify="center">
              <Col>
                <Title level={3}>Resumen Cierre</Title>
              </Col>
              <Col span={20}>
                <Text strong>Total Venta:</Text>
              </Col>
              <Col span={4}>
                <Text>{numeral(10000).format('$ 0,0')}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Text strong>Efectivo</Text>
              </Col>
              <Col span={4}>
                <Text>{numeral(100000).format('$ 0,0')}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Text strong>Total Efectivo:</Text>
              </Col>
              <Col span={4}>
                <Text>{numeral(100000).format('$ 0,0')}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Text strong>Total Efectivo Reportado:</Text>
              </Col>
              <Col span={4}>
                <Text>{numeral(10000).format('$ 0,0')}</Text>
              </Col>
            </Row>
            {'status' ? (
              <Row>
                <Col span={20}>
                  <Text strong>Sobrante:</Text>
                </Col>
                <Col span={4}>
                  <Text>{numeral(10000).format('$ 0,0')}</Text>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col span={20}>
                  <Text strong>Faltante:</Text>
                </Col>
                <Col span={4}>
                  <Text strong>{numeral((10000 || 0) * -1).format('$ 0,0')}</Text>
                </Col>
              </Row>
            )}
            <Row>
              <Col span={20}>
                <Text strong>Transferencias reportadas:</Text>
              </Col>
              <Col span={4}>
                <Text>{10}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Text strong>Transferencias registradas:</Text>
              </Col>
              <Col span={4}>
                <Text>{12}</Text>
              </Col>
            </Row>
            {'status' ? (
              <Row>
                <Col span={20}>
                  <Text strong>Sobrante Transferencia:</Text>
                </Col>
                <Col span={4}>
                  <Text>{12}</Text>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col span={20}>
                  <Text strong>Faltante Transferencia:</Text>
                </Col>
                <Col span={4}>
                  <Text strong>{(12 || 0) * -1}</Text>
                </Col>
              </Row>
            )}
          </>
        )}
      </Form>
    </Modal>
  );
};

export default CloseDay;
