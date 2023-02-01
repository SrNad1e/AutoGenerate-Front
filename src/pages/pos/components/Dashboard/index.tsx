/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Descriptions, Divider, InputNumber, Row, Typography } from 'antd';
import numeral from 'numeral';
import { Liquid } from '@ant-design/charts';
import './style.less';
import { useGetGoal } from '@/hooks/goal.hooks';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import moment from 'moment';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [getGoal, paramsGetGoal] = useGetGoal();
  const [bonus, setBonus] = useState(0);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const goal = paramsGetGoal?.data?.goalStatus?.goal;
  const netSales = paramsGetGoal?.data?.goalStatus?.netSales;
  const bonusStatic = (netSales - goal * 0.8) * 0.04;

  const onChangeSimulator = (e: number) => {
    if (e >= goal * 0.8) {
      setBonus((e - goal * 0.8) * 0.04);
    } else {
      setBonus(0);
    }
  };

  /**
   * @description funcion usada por los hooks para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const onCloseAlert = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    try {
      getGoal({
        variables: {
          input: {
            month: moment().format(FORMAT_DATE_API),
            shopId: initialState?.currentUser?.shop?._id,
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
    }
  }, []);

  return (
    <Card>
      <Row gutter={[40, 16]}>
        <Col span={24}>
          <Divider orientation="right">Bonificación por ventas</Divider>
          {
            <Row gutter={40}>
              <Col lg={11} xs={24}>
                <Card bordered>
                  <Title style={{ textAlign: 'center' }} level={2}>
                    Progreso de meta
                  </Title>
                  <Liquid
                    percent={netSales / goal}
                    style={{ width: '50%', maxHeight: 294, margin: 'auto' }}
                  />
                </Card>
              </Col>
              <Col lg={13} xs={24}>
                <Card bordered style={{ width: '100%' }}>
                  <Divider>Estadisticas</Divider>
                  <Descriptions bordered layout="horizontal">
                    <Descriptions.Item label="Total Meta" span={24}>
                      {numeral(goal).format('$ 0,0')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Venta Neta" span={24}>
                      {numeral(netSales).format('$ 0,0')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Bono" span={24}>
                      {numeral(netSales >= goal ? bonusStatic : 0).format('$ 0,0')}
                    </Descriptions.Item>
                  </Descriptions>
                  <Divider>Simulador</Divider>
                  <Text>Valor de la venta:</Text>
                  <br />
                  <InputNumber
                    onChange={(e) => onChangeSimulator(e)}
                    style={{ marginBottom: 20, width: '50%' }}
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                  <br />
                  <Text>Total bono: {numeral(bonus).format('$ 0,0')}</Text>
                </Card>
              </Col>
            </Row>
          }
        </Col>
      </Row>
      <AlertInformation {...alertInformation} onCancel={onCloseAlert} />
    </Card>
  );
};

export default Dashboard;
