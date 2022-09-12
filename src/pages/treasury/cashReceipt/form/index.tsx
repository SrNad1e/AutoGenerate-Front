/* eslint-disable react-hooks/exhaustive-deps */
import {
  CloseCircleOutlined,
  DollarCircleOutlined,
  FieldNumberOutlined,
  InteractionOutlined,
  LaptopOutlined,
  SearchOutlined,
  SelectOutlined,
  ShoppingOutlined,
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
  Typography,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import type { ColumnsType } from 'antd/es/table/interface';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import numeral from 'numeral';
import { useCreateReceipts } from '@/hooks/receipt.hooks';
import { useGetCredit } from '@/hooks/credit.hooks';
import type { DetailCredit, DetailReceiptOrder, Order, ResponseReceipt } from '@/graphql/graphql';

import SearchCustomer from '@/components/SearchCustomer';
import Balance from '../components/balance';
import SelectPayment from '@/components/SelectPayment';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import ReportReceipt from '../report/receipt';

import styles from '../styles';
import SelectPointOfSale from '@/components/SelectPointOfSale';
import { useGetPointOfSales } from '@/hooks/pointOfSale.hooks';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
};
const CashReceiptForm = ({ visible, onCancel }: Props) => {
  const [visibleBalance, setVisibleBalance] = useState<{
    visible: boolean;
    detail?: DetailReceiptOrder;
  }>({
    visible: false,
  });
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [detailsCredit, setDetailsCredit] = useState<DetailReceiptOrder[]>([]);
  const [canSelected, setCanSelected] = useState(true);
  const [selectCustomer, setSelectCustomer] = useState(false);
  const [allowData, setAllowData] = useState(false);
  const [receipt, setReceipt] = useState({});

  const [form] = useForm();

  const [getCredit, paramsGetCredit] = useGetCredit();
  const [createReceipt, paramsCreateReceipt] = useCreateReceipts();
  const [getPos, paramsGetPos] = useGetPointOfSales();

  const reportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });

  const printReceipt = async (record: ResponseReceipt) => {
    await setReceipt(record);
    handlePrint();
  };

  /**
   * @description cierra el modal de saldo
   */
  const closeVisibleCreditBalance = () => {
    const details = detailsCredit.filter((item) => item.orderId !== visibleBalance.detail?.orderId);
    setDetailsCredit(details);
    setVisibleBalance({ visible: false });
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
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showSuccess = (message: string) => {
    setAlertInformation({
      message,
      type: 'success',
      visible: true,
    });
  };

  /**
   * @description cierra la alerta y el modal
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    onCancel();
  };

  const getPosProp = () => {
    const value = form.getFieldsValue();
    getPos({
      variables: {
        input: {
          _id: value.pointOfSaleId,
        },
      },
    });
  };

  /**
   * @description funcion usada para eliminar el detalle del pedido
   * @param id identificador del del detalle
   */
  const deleteDetail = (id: string) => {
    const details = detailsCredit.filter((item) => item.orderId !== id);
    setDetailsCredit(details);
    form.setFieldsValue({
      value: details.reduce((sum, det) => sum + det.amount, 0),
      concept: details.reduce((str, dt) => {
        const detailSelected = paramsGetCredit?.data?.credit?.details?.find(
          (item) => item.order?._id === dt.orderId,
        );

        return `${str} Abono a pedido No. ${detailSelected?.order?.number}, `;
      }, ''),
    });
  };

  /**
   * @description  funcion usada para setear el saldo confirmado y el concepto por defecto
   */
  const confirmBalance = () => {
    const amount = form.getFieldValue('amount');
    const details = detailsCredit.map((detail) => {
      if (detail?.orderId === visibleBalance?.detail?.orderId) {
        return {
          ...detail,
          amount,
        };
      }
      return detail;
    });
    setDetailsCredit(details);
    form.setFieldsValue({
      value: details.reduce((sum, det) => sum + det.amount, 0),
      concept: details.reduce((str, dt) => {
        const detailSelected = paramsGetCredit?.data?.credit?.details?.find(
          (item) => item.order?._id === dt.orderId,
        );

        return `${str} Abono a pedido No. ${detailSelected?.order?.number}, `;
      }, ''),
    });
    setVisibleBalance({ visible: false });
    setCanSelected(false);
  };

  /**
   * @description abre el detalle del pedido seleccionado
   * @param detail detalle del pedido para abrir
   */
  const orderBalance = (detail: DetailCredit) => {
    setDetailsCredit([
      ...detailsCredit,
      {
        orderId: detail?.order?._id,
        amount: detail.balance,
      },
    ]);
    form.setFieldsValue({
      amount: detail.balance,
    });
    setVisibleBalance({
      visible: true,
      detail: {
        orderId: detail?.order?._id,
        amount: detail.balance,
      },
    });
  };

  /**
   * @description se encarga de crear el recibo de caja e imprimirlo
   */
  const createNewReceipt = async () => {
    const values = await form.validateFields();
    const detailsCreate: DetailReceiptOrder[] = detailsCredit.map((detail) => ({
      orderId: detail?.orderId,
      amount: detail?.amount,
    }));
    try {
      delete values.amount;
      delete values.customerId;
      const response = await createReceipt({
        variables: {
          input: {
            ...values,
            details: detailsCreate,
            boxId: paramsGetPos.data?.pointOfSales?.docs[0]?.box?._id,
          },
        },
      });
      if (response) {
        await printReceipt(response?.data?.createReceipt);
        showSuccess(
          `Recibo de Caja No. ${response?.data?.createReceipt?.receipt?.number} generado correctamente`,
        );
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description se encarga de ejecutar la funcion para obtener los creditos
   */
  const onSearch = async () => {
    try {
      const response = await getCredit({
        variables: {
          input: {
            customerId: form.getFieldValue('customerId'),
          },
        },
      });

      if (response.data?.credit && !response.data?.credit?.details) {
        setVisibleBalance({ visible: true });
        setAllowData(false);
      } else if (!response.data?.credit) {
        showError('El cliente no tiene crédito habilitado');
        setAllowData(false);
      } else if (response.data?.credit?.balance <= 0) {
        showError('El cliente no tiene crédito pendiente');
        setAllowData(false);
      }

      setAllowData(true);
    } catch (error: any) {
      showError(error?.message);
    }
  };

  useEffect(() => {
    form.resetFields(['ammount']);
    if (canSelected === false) {
      setCanSelected(false);
    } else if (!confirmBalance) {
      setCanSelected(true);
    }
  }, [visibleBalance]);

  useEffect(() => {
    form.resetFields();
    setDetailsCredit([]);
    setCanSelected(true);
    setSelectCustomer(false);
    setAllowData(false);
  }, [visible]);

  const column: ColumnsType<DetailCredit> = [
    {
      title: (
        <Text style={{ fontSize: 20 }}>
          <FieldNumberOutlined />
        </Text>
      ),
      dataIndex: 'order',
      render: (order: Order) => order?.number,
    },
    {
      title: 'Total',
      dataIndex: 'order',
      render: (order: Order) => numeral(order?.summary?.total).format('$ 0,0'),
    },
    {
      title: 'Saldo',
      dataIndex: 'balance',
      render: (balanceCredit: number) => numeral(balanceCredit).format('$ 0,0'),
    },
    {
      title: 'Fecha',
      dataIndex: 'order',
      render: (order: Order) => moment(order.updatedAt).format(FORMAT_DATE),
    },
    {
      title: (
        <Text>
          <InteractionOutlined /> Seleccionar
        </Text>
      ),
      dataIndex: 'order',
      align: 'center',
      fixed: 'right',
      render: ({ _id }: Order, detailOrder: DetailCredit) => (
        <Space>
          <Button
            disabled={
              canSelected === false
                ? !!detailsCredit.find((detail) => detail.orderId === _id)
                : false || paramsCreateReceipt?.loading
            }
            onClick={() => orderBalance(detailOrder)}
            type="primary"
            icon={<SelectOutlined />}
          />
          <Button
            type="primary"
            danger
            icon={<CloseCircleOutlined />}
            disabled={
              canSelected
                ? true
                : !detailsCredit.find((detail) => detail.orderId === _id) ||
                  paramsCreateReceipt?.loading
            }
            onClick={() => deleteDetail(_id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title="Abono de cartera"
      visible={visible}
      onCancel={onCancel}
      onOk={createNewReceipt}
      width={750}
      okText="Crear"
      cancelText="Cancelar"
      destroyOnClose
      okButtonProps={{
        loading: paramsCreateReceipt?.loading || paramsGetCredit?.loading,
        style: styles.buttonR,
      }}
      cancelButtonProps={{
        style: styles.buttonR,
        loading: paramsGetCredit?.loading || paramsCreateReceipt?.loading,
      }}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={[20, 20]} justify="center">
          <Col span={11}>
            <FormItem label={<Space>{<UserOutlined />} Cliente </Space>} name="customerId">
              <SearchCustomer disabled={false} onChange={() => setSelectCustomer(true)} />
            </FormItem>
          </Col>
          <Col>
            <FormItem label=" " colon={false}>
              <Button
                icon={<SearchOutlined />}
                disabled={!selectCustomer || detailsCredit.length > 0}
                type="primary"
                loading={paramsGetCredit?.loading || paramsCreateReceipt?.loading}
                style={styles.buttonR}
                onClick={() => onSearch()}
              >
                Buscar Pedidos
              </Button>
            </FormItem>
          </Col>
          <Divider style={{ marginTop: 0 }}>Pedidos</Divider>
          <Col span={24}>
            <Table
              columns={column}
              dataSource={allowData ? paramsGetCredit.data?.credit?.details : []}
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
                  name="concept"
                  rules={[
                    {
                      required: true,
                      message: 'Este campo no puede estar vacio',
                    },
                  ]}
                >
                  <TextArea />
                </FormItem>
              )}
            />
          </Col>
          <Col span={8}>
            <FormItem
              label={<Space>{<LaptopOutlined />} Punto de Venta </Space>}
              name="pointOfSaleId"
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
            >
              <SelectPointOfSale
                disabled={paramsGetCredit?.loading || paramsCreateReceipt?.loading}
                onChange={() => getPosProp()}
              />
            </FormItem>
          </Col>
          <Col span={9}>
            <FormItem
              label={<Space>{<ShoppingOutlined />} Medio de Pago </Space>}
              name="paymentId"
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
            >
              <SelectPayment disabled={paramsGetCredit?.loading || paramsCreateReceipt?.loading} />
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem
              label={
                <Space>
                  <DollarCircleOutlined />
                  Total de Pago
                </Space>
              }
              name="value"
            >
              <InputNumber
                style={styles.maxWidth}
                min={0}
                disabled={true}
                controls={false}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
          </Col>
        </Row>
        <Balance onOk={confirmBalance} onCancel={closeVisibleCreditBalance} {...visibleBalance} />
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <ReportReceipt data={receipt} ref={reportRef} />
      </div>
    </Modal>
  );
};

export default CashReceiptForm;
