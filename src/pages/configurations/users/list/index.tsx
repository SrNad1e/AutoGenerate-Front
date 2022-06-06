import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Table } from 'antd';
import React from 'react';

const FormItem = Form.Item;

const UsersList = () => {
  const column = [
    {
      title: 'Usuario',
    },
    {
      title: 'Rol',
    },
    {
      title: 'Fecha',
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Form>
          <FormItem></FormItem>
          <FormItem></FormItem>
        </Form>
        <Table columns={column} />
      </Card>
    </PageContainer>
  );
};

export default UsersList;
