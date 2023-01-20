import { InfoCircleFilled } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';

import ChartCard from './chartCard';

type Props = {
  loading?: boolean;
  totalSales?: number;
};

const IntroduceRow = ({ loading, totalSales }: Props) => {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
      <Col xl={24}>
        <ChartCard
          content="Total ventas"
          action={
            <Tooltip title={'Total ventas mensuales'}>
              <InfoCircleFilled />
            </Tooltip>
          }
          loading={loading}
          total={numeral(totalSales).format('$ 0,0')}
          contentHeight={90}
        />
      </Col>
    </Row>
  );
};

export default IntroduceRow;
