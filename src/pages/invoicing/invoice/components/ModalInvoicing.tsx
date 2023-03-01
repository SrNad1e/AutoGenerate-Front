import SelectShop from '@/components/SelectShop';
import { GroupDates } from '@/graphql/graphql';
import { useGetReportSales } from '@/hooks/reportSales.hooks';
import { Button, Card, Col, DatePicker, Form, InputNumber, Modal, Row, Typography } from 'antd';
import type { RangePickerProps } from 'antd/lib/date-picker';
import numeral from 'numeral';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import type { Moment } from 'moment';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useInvoicing } from '@/hooks/invoice.hooks';
import AlertSuccess from './AlertSuccess';
import { useGenerateDailyClosing } from '@/hooks/dailyClosing.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
export interface Props {
  open: boolean;
  onCancel: () => void;
}

const FormItem = Form.Item;

const { Title, Text } = Typography;

const { RangePicker } = DatePicker;

const ModalInvoicing = ({ open, onCancel }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  const refCash = useRef(null);

  const [reportSales, { loading, data }] = useGetReportSales();

  const [generateInvoicing, dataInvoicing] = useInvoicing();

  const [generateCloseDaily, dataCloseDaily] = useGenerateDailyClosing();

  const getPayments = async () => {
    await form.validateFields(['shopId', 'dates']);
    const shopId = form.getFieldValue('shopId');
    const dates: Moment[] = form.getFieldValue('dates');

    const dateInitial = dates[0].format(FORMAT_DATE_API);
    const dateFinal = dates[1].format(FORMAT_DATE_API);

    await reportSales({
      variables: {
        input: {
          dateFinal,
          dateInitial,
          groupDates: GroupDates.Day,
          isGroupByCategory: false,
          shopId,
        },
      },
    });

    refCash.current?.select();
  };

  const invoicing = async () => {
    await form.validateFields(['shopId', 'dates', 'cash']);

    const shopId = form.getFieldValue('shopId');
    const dates: Moment[] = form.getFieldValue('dates');
    const cash = form.getFieldValue('cash');

    const dateInitial = dates[0].startOf('day').format(FORMAT_DATE_API);
    const dateFinal = dates[1].endOf('day').format(FORMAT_DATE_API);

    try {
      await generateInvoicing({
        variables: {
          input: {
            cash,
            dateFinal,
            dateInitial,
            shopId,
          },
        },
      });
      setShowModal(true);
    } catch (e) {
      setShowModal(true);
    }
  };

  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const showAlert = (message: string, type: 'error' | 'success') => {
    setPropsAlert({
      message,
      type,
      visible: true,
    });
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current > moment().subtract(1, 'd').endOf('day');
  };

  const createCloseDaily = async () => {
    const shopId = form.getFieldValue('shopId');
    const dates: Moment[] = form.getFieldValue('dates');

    const dateInitial = dates[0].startOf('day').format(FORMAT_DATE_API);
    const dateFinal = dates[1].endOf('day').format(FORMAT_DATE_API);

    const response = await generateCloseDaily({
      variables: {
        input: {
          dateFinal,
          dateInitial,
          shopId,
        },
      },
    });

    if (response.data?.generateDailyClosing) {
      showAlert(
        `${response.data?.generateDailyClosing?.message}, total: ${response.data?.generateDailyClosing?.quantity}`,
        'success',
      );
      setShowModal(false);
    } else {
      showAlert('No se pudo generar el cierre diario', 'error');
    }
  };

  return (
    <Modal open={open} footer={null} onCancel={onCancel} centered>
      <Form layout="vertical" form={form}>
        <FormItem
          rules={[
            {
              required: true,
              message: 'Debe seleccionar una tienda',
            },
          ]}
          label="Seleccione la tienda"
          name="shopId"
        >
          <SelectShop disabled={loading || dataInvoicing?.loading} />
        </FormItem>
        <FormItem
          rules={[
            {
              required: true,
              message: 'Debe seleccionar un mes',
            },
          ]}
          label="Selecciona las fechas"
          name="dates"
        >
          <RangePicker disabledDate={disabledDate} disabled={loading || dataInvoicing?.loading} />
        </FormItem>
        <Button loading={loading || dataInvoicing?.loading} onClick={getPayments} type="primary">
          Consultar Resumen
        </Button>
        <Card loading={loading || dataInvoicing?.loading}>
          <Title level={4}>Resumen de ingresos</Title>

          {data?.reportSales?.paymentsSalesReport?.map(({ payment, total }) => (
            <Row key={payment.name}>
              <Col span={12}>
                <Text strong>{payment.name}</Text>
              </Col>
              <Col span={12}>
                <Text
                  style={{
                    justifyContent: 'flex-end',
                    display: 'flex',
                  }}
                >
                  {numeral(total).format('$ 0,0')}
                </Text>
              </Col>
            </Row>
          ))}
        </Card>
        <FormItem label="Cuanto desea facturar?" name="cash">
          <InputNumber
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            ref={refCash}
            style={{ width: '100%' }}
            controls={false}
            disabled={!data?.reportSales}
          />
        </FormItem>
        <Button loading={loading || dataInvoicing?.loading} type="primary" onClick={invoicing}>
          Facturar
        </Button>
      </Form>
      <AlertSuccess
        open={showModal}
        onCancel={() => setShowModal(false)}
        generateCloseDaily={createCloseDaily}
        data={dataInvoicing.data}
        error={dataInvoicing.error}
        loading={dataCloseDaily.loading}
      />
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    </Modal>
  );
};
export default ModalInvoicing;
