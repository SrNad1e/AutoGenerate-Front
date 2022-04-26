import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Row, Space } from 'antd';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const BrandsList = () => {
  return (
    <PageContainer
      title={
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            Marcas
          </Title>
        </Space>
      }
    >
      <Card>
        <Row>
          <Col span={12}>
            <Button>Nuevo</Button>
          </Col>
          <Col span={12}>
            <Text>Total Encontrados:</Text>
            <Text>Páginas:</Text>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default BrandsList;
