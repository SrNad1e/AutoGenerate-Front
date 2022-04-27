import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const ReferenceList = () => {
  const renderFormSearch = () => {
    return <></>;
  };

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            Referencias
          </Title>
        </Space>
      }
    >
      {renderFormSearch}
      <Card></Card>
    </PageContainer>
  );
};

export default ReferenceList;
