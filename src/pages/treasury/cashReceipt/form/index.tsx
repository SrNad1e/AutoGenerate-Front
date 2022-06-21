/* eslint-disable react-hooks/exhaustive-deps */
import {
  DollarCircleOutlined,
  FileProtectOutlined,
  SearchOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Table,
  Tag,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import numeral from 'numeral';

import styles from '../styles';
import SearchCustomer from '@/components/SearchCustomer';
import { useGetCredit } from '@/hooks/credit.hooks';
import type { FiltersCreditInput } from '@/graphql/graphql';
import Balance from '../components/balance';
import SelectBox from '@/components/SelectBox';
import SelectPayment from '@/components/SelectPayment';

const { TextArea } = Input;

const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
};
const CashReceiptForm = ({ visible, onCancel }: Props) => {
  const [customerId, setCustomerId] = useState('');
  const [visibleBalance, setVisibleBalance] = useState(false);
  const [getCredit, paramsGetCredit] = useGetCredit();

  const closeVisibleCreditBalance = () => {
    setVisibleBalance(false);
  };

  const currentBalance = paramsGetCredit.data?.credit.balance;
  /**
   * @description se encarga de ejecutar la funcion para obtener los colores
   * @param filters Variables para ejecutar la consulta
   */
  const onSearch = (filters?: FiltersCreditInput) => {
    getCredit({
      variables: {
        input: {
          ...filters,
          customerId: customerId,
        },
      },
    });
  };

  /**
   * @description se encarga de seleccionar el id de una tienda y almacenarlo
   * @param id id de la tienda que selecciona
   */
  const onChangeCustomer = (id: string) => {
    if (id) {
      setCustomerId(id);
    }
  };

  useEffect(() => {
    onSearch();
  }, [customerId]);
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

  console.log(currentBalance);

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
          {<FileProtectOutlined />}
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
        <Row gutter={[20, 20]}>
          <Col span={14}>
            <FormItem label={<Space>{<UserOutlined />} Cliente </Space>} name="customerId">
              <SearchCustomer onChange={(id) => onChangeCustomer(id)} disabled={false} />
            </FormItem>
          </Col>
          <Col>
            <FormItem label=" " colon={false}>
              <Button
                icon={<SearchOutlined />}
                disabled={paramsGetCredit?.loading || customerId.length == 0}
                type="primary"
                htmlType="submit"
                style={styles.buttonR}
                onClick={() => setVisibleBalance(true)}
              >
                Buscar
              </Button>
            </FormItem>
          </Col>
          <Divider>Pedidos</Divider>
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
          <Col span={8}>
            <FormItem label="Caja" name="boxId">
              <SelectBox disabled={paramsGetCredit?.loading} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Medio de pago" name="paymentId">
              <SelectPayment disabled={paramsGetCredit?.loading} />
            </FormItem>
          </Col>
          <Col span={8}>
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
                controls={false}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Balance onCancel={closeVisibleCreditBalance} visible={visibleBalance} />
    </Modal>
  );
};

export default CashReceiptForm;
