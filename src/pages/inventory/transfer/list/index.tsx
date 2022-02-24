import { SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';

import styles from './styles.less';

const FormItem = Form.Item;
const { Option } = Select;

const { RangePicker } = DatePicker;

const TransferList = () => {
  return (
    <PageContainer>
      <Card>
        <Form layout="inline" className={styles.filters}>
          <Row gutter={[8, 8]} className={styles.form}>
            <Col xs={24} lg={4} xl={3} xxl={3}>
              <FormItem label="Número" name="number">
                <Input className={styles.item} />
              </FormItem>
            </Col>
            <Col xs={24} lg={5} xl={3} xxl={3}>
              <FormItem label="Estado" name="status">
                <Select className={styles.item}>
                  <Option key="0">Prueba</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} lg={5} xl={4} xxl={4}>
              <FormItem label="Tipo" name="type">
                <Select className={styles.item}>
                  <Option key="0">Prueba</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} lg={10} xl={5} xxl={5}>
              <FormItem label="Bodega" name="warehouse">
                <Select className={styles.item}>
                  <Option key="0">Prueba</Option>
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} lg={10} xl={6} xxl={6}>
              <FormItem label="Fechas" name="dates">
                <RangePicker className={styles.item} />
              </FormItem>
            </Col>
            <Col xs={24} lg={14} xl={3} xxl={3}>
              <FormItem>
                <Space className={styles.buttons}>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                    Buscar
                  </Button>
                  <Button htmlType="reset">Limpiar</Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default TransferList;
