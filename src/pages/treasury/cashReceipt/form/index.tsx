import {
  DollarCircleOutlined,
  FileProtectOutlined,
  IdcardOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Col,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import moment from 'moment';
import { useState } from 'react';
import numeral from 'numeral';

import styles from '../styles';

const { TextArea } = Input;
const { Title } = Typography;

const FormItem = Form.Item;
const DescriptionItem = Descriptions.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
};
const CashReceiptForm = ({ visible, onCancel }: Props) => {
  const [customer, setCustomer] = useState<any>({});

  const setCustomerData = () => {
    setCustomer({
      name: 'Dio Brandon',
      contact: 3104603499,
    });
  };

  const dataTest = [
    {
      number: 1,
      key: 1,
      invoice: 18711,
      createdAt: '2022-05-04T18:10:20.727Z',
      expiration: '2022-05-04T18:10:20.727Z',
      value: 100000,
      pending: 1000000,
    },
  ];

  const column = [
    {
      title: 'Numero',
      dataIndex: 'number',
    },
    {
      title: 'Factura',
      dataIndex: 'invoice',
      render: (invoice: any) => (
        <Tag style={styles.tagStyle}>
          {<FileProtectOutlined style={styles.iconColor} />}
          {invoice}
        </Tag>
      ),
    },

    {
      title: 'Total',
      dataIndex: 'value',
      render: (value: number) => numeral(value).format('$ 0,0'),
    },
    {
      title: 'Saldo',
      dataIndex: 'pending',
      render: (pending: number) => numeral(pending).format('$ 0,0'),
    },
    {
      title: 'Vencimiento',
      dataIndex: 'expiration',
      render: (expiration: Date) => moment(expiration).format(FORMAT_DATE_API),
    },
    {
      title: 'Creación',
      dataIndex: 'createdAt',
      render: (createdAt: Date) => moment(createdAt).format(FORMAT_DATE),
    },
  ];

  return (
    <Modal
      title="Crear Recibo"
      visible={visible}
      onCancel={onCancel}
      width={750}
      okText="Crear"
      cancelText="Cancelar"
    >
      <Form layout="vertical">
        <Row gutter={[0, 20]}>
          <Col span={14}>
            <FormItem label={<Space>{<IdcardOutlined />} Documento </Space>}>
              <Input onPressEnter={setCustomerData} style={styles.inputWidth} />
            </FormItem>
          </Col>
          <Col span={10}>
            {customer?.name && (
              <Descriptions layout="vertical">
                <DescriptionItem label={<Space>{<UserOutlined />} Cliente </Space>}>
                  <Title level={5}>
                    {customer?.name} - {customer?.contact}
                  </Title>
                </DescriptionItem>
              </Descriptions>
            )}
          </Col>
          <Col span={24}>
            <Table
              rowSelection={{ type: 'checkbox' }}
              columns={column}
              dataSource={dataTest}
              pagination={false}
              scroll={{ y: 200 }}
              footer={() => (
                <FormItem
                  label={
                    <Space>
                      <SolutionOutlined />
                      Concepto
                    </Space>
                  }
                >
                  <TextArea />
                </FormItem>
              )}
            />
          </Col>
          <Col offset={16} span={8}>
            <FormItem
              label={
                <Space>
                  <DollarCircleOutlined />
                  Total de Pago
                </Space>
              }
            >
              <InputNumber
                style={styles.inputNumberWidth}
                min={0}
                step={100}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CashReceiptForm;
