import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Input } from 'antd';

const { Search } = Input;
const FormItem = Form.Item;

const RolesList = () => {
  return (
    <PageContainer>
      <Card>
        <Form layout="inline">
          <FormItem label="Nombre" name="name">
            <Search placeholder="Nombre del rol" enterButton />
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default RolesList;
