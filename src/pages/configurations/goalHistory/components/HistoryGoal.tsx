/* eslint-disable react-hooks/exhaustive-deps */
import { Col, DatePicker, Form, Modal, Row, Table, Typography } from 'antd';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useEffect, useState } from 'react';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import type { GoalHistory, Shop } from '@/graphql/graphql';
import type { ColumnsType } from 'antd/lib/table';
import numeral from 'numeral';
import moment from 'moment';
import { useAddGoal } from '@/hooks/shop.hooks';
import { useGetGoal } from '@/hooks/goal.hooks';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  data: Shop;
};

const HistoryGoal = ({ onCancel, visible, data }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [dateSelected, setDateSelected] = useState(false);
  const [addGoalShop, paramsAddGoalShop] = useAddGoal();
  const [getGoalStatus, paramasGetGoalStatus] = useGetGoal();

  const [form] = Form.useForm();

  /**
   * @description cierra la alerta y resetea los campos del form
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const onSearchGoalStatus = async (shopId: string, currentDate: Date) => {
    const response = await getGoalStatus({
      variables: {
        input: {
          shopId,
          month: moment(currentDate).format('YYYY/MM/01 00:00:00'),
        },
      },
    });
    if (response?.data?.goalStatus) {
      return response?.data?.goalStatus?.netSales;
    }
  };

  const onFilterDate = () => {
    const date = form.getFieldValue('dates');
    if (date) {
      const filterHistory = data.goalHistory?.filter((item) => {
        const monthHistory = moment(item.date).format('YYYY/MM');
        const month1 = moment(date[0]).format('YYYY/MM');
        const month2 = moment(date[1]).format('YYYY/MM');

        if (
          moment(month1).isSame(monthHistory) ||
          (moment(monthHistory).isAfter(month1) && moment(monthHistory).isBefore(month2)) ||
          moment(month2).isSame(monthHistory)
        ) {
          return item;
        }
      });

      return filterHistory;
    }
  };

  const onChangeDateSelected = async (e?: any, obj?: any) => {
    if (e) {
      if (obj.range === 'end') {
        setDateSelected(true);
      }
    } else {
      setDateSelected(false);
    }
  };

  useEffect(() => {
    form.resetFields();
    setDateSelected(false);
  }, [visible]);

  const onUpdateCurrentAchieved = async () => {
    addGoalShop({
      variables: {
        input: {
          shopId: data?._id,
          goalHistory: {
            date: moment(new Date()).format('YYYY/MM/01'),
            goal: data?.goal,
            goalAchieved: await onSearchGoalStatus(
              data?._id,
              moment(new Date()).format('YYYY/MM/01'),
            ),
          },
        },
      },
    });
  };

  useEffect(() => {
    if (visible === true) {
      onUpdateCurrentAchieved();
    }
  }, [visible]);

  const columns: ColumnsType<GoalHistory> = [
    {
      title: (
        <Text>
          <CalendarOutlined /> Fecha
        </Text>
      ),
      dataIndex: 'date',
      align: 'center',
      render: (date: string) => moment(date).format('MM/YYYY'),
    },
    {
      title: (
        <Text>
          <DollarOutlined /> Meta Propuesta
        </Text>
      ),
      dataIndex: 'goal',
      align: 'center',
      render: (goal: number) => <>{numeral(goal).format('$ 0,0')}</>,
    },
    {
      title: (
        <Text>
          <DollarOutlined /> Meta Alcanzada
        </Text>
      ),
      dataIndex: 'goalAchieved',
      align: 'center',
      render: (goalAchieved: number) => <>{numeral(goalAchieved).format('$ 0,0')}</>,
    },
  ];

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      title="Historial de Meta"
      okButtonProps={{ style: { borderRadius: 5 } }}
      footer={<></>}
    >
      <Form
        form={form}
        style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
      >
        <Row>
          <Col xs={24} md={24} lg={24} xl={24}>
            <FormItem label="Fecha" name="dates">
              <DatePicker.RangePicker
                style={{ width: '100%&' }}
                placeholder={['Seleccione Fecha Inicial', 'Seleccione Fecha Final']}
                picker="month"
                onCalendarChange={(e, _, obj) => onChangeDateSelected(e, obj)}
                disabled={paramasGetGoalStatus.loading || paramsAddGoalShop.loading}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={dateSelected ? onFilterDate() : data?.goalHistory}
              loading={paramasGetGoalStatus.loading || paramsAddGoalShop.loading}
            />
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default HistoryGoal;
