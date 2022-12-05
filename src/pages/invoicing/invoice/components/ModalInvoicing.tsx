import SelectShop from '@/components/SelectShop';
import { GroupDates } from '@/graphql/graphql';
import { useReportSales } from '@/hooks/reportSales.hooks';
import { Button, Card, Col, DatePicker, Form, InputNumber, Modal, Row, Typography } from 'antd';
import type { RangePickerProps } from 'antd/lib/date-picker';
import numeral from 'numeral';
import type { Moment } from 'moment';
import moment from 'moment';
import { useRef } from 'react';
export interface Props {
  open: boolean;
  onCancel: () => void;
}

const FormItem = Form.Item;

const { Title, Text } = Typography;

const { RangePicker } = DatePicker;

const ModalInvoicing = ({ open, onCancel }: Props) => {
  const [form] = Form.useForm();

  const refCash = useRef(null);

  const [reportSales, { loading, data }] = useReportSales();

  const getPayments = async () => {
    form.validateFields(['shopId', 'dates']);
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

  const invoicing = () => {
    form.validateFields(['shopId', 'dates', 'cash']);

    const shopId = form.getFieldValue('shopId');
    const dates: Moment[] = form.getFieldValue('dates');
    const cash = form.getFieldValue('cash');

    const dateInitial = dates[0].startOf('day').format(FORMAT_DATE_API);
    const dateFinal = dates[1].endOf('day').format(FORMAT_DATE_API);

    console.log('shopId', shopId);
    console.log('dateInitial', dateInitial);
    console.log('dateFinal', dateFinal);
    console.log('cash', cash);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current > moment().subtract(1, 'd').endOf('day');
  };

  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
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
          <SelectShop disabled={loading} />
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
          <RangePicker disabledDate={disabledDate} disabled={loading} />
        </FormItem>
        <Button loading={loading} onClick={getPayments} type="primary">
          Consultar Resumen
        </Button>
        <Card loading={loading}>
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
        <Button loading={loading} type="primary" onClick={invoicing}>
          Facturar
        </Button>
      </Form>
    </Modal>
  );
};
export default ModalInvoicing;
