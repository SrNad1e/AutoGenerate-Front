import { ContainerOutlined } from '@ant-design/icons';
import { Card, Space, Statistic } from 'antd';

export type Props = {
  total: number;
  totalPages: number;
  current: number;
};

const TotalFound = ({ total, current, totalPages }: Props) => {
  return (
    <Card size="small" style={{ height: '80px' }}>
      <Space style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '100px' }}>
        <Statistic
          title="Total Encontrados:"
          value={total}
          prefix={<ContainerOutlined />}
          style={{ marginRight: '25px' }}
        />
        <Statistic
          title="Página:"
          value={current}
          suffix={`/ ${totalPages}`}
          style={{ marginRight: '25px' }}
        />
      </Space>
    </Card>
  );
};

export default TotalFound;
