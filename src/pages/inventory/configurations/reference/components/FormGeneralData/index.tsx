import {
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Switch,
  Tooltip,
} from 'antd';
import { AlignCenterOutlined, AppstoreOutlined, FileMarkdownOutlined } from '@ant-design/icons';

import SelectAnyCategory from '@/components/SelectAnyCategory';
import SelectBrand from '@/components/SelectBrand';

import styles from '../styles';

const DescriptionsItem = Descriptions.Item;
const FormItem = Form.Item;

const FormGeneralData = () => {
  return (
    <Descriptions bordered size="small">
      <DescriptionsItem label="Referencia">
        <FormItem
          name="name"
          style={styles.marginIntial}
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <Input />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem label="Descripción">
        <FormItem
          style={styles.marginIntial}
          name="description"
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <Input />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem label="Cambiable">
        <FormItem style={styles.marginIntial} name="changeable">
          <Switch />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem span={2} label="Categoría">
        <Row>
          <Col span={20}>
            <FormItem
              style={styles.marginIntial}
              name="categoryId"
              rules={[{ required: true, message: 'Obligatorio' }]}
            >
              <SelectAnyCategory />
            </FormItem>
          </Col>
          <Col span={4}>
            <Divider type="vertical" />
            <Tooltip title="Crear nueva categoría">
              <Button icon={<AppstoreOutlined />} type="primary" shape="circle" />
            </Tooltip>
          </Col>
        </Row>
      </DescriptionsItem>
      <DescriptionsItem label="Activo">
        <FormItem style={styles.marginIntial} name="active">
          <Switch />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem span={2} label="Atributos">
        <Row>
          <Col span={20}>
            <FormItem
              style={styles.marginIntial}
              name="attribIds"
              rules={[{ required: true, message: 'Obligatorio' }]}
            >
              <SelectBrand disabled={false} />
            </FormItem>
          </Col>
          <Col span={4}>
            <Divider type="vertical" />
            <Tooltip title="Crear nuevo atributo">
              <Button
                icon={<AlignCenterOutlined />}
                type="primary"
                shape="circle"
                //onClick={() => setModalSizeVisible(true)}
              />
            </Tooltip>
          </Col>
        </Row>
      </DescriptionsItem>
      <DescriptionsItem label="Costo">
        <FormItem
          style={styles.marginIntial}
          name="cost"
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <InputNumber addonBefore="$" min={0} />
        </FormItem>
      </DescriptionsItem>
      <DescriptionsItem span={2} label="Marca">
        <Row>
          <Col span={20}>
            <FormItem
              style={styles.marginIntial}
              name="brandId"
              rules={[{ required: true, message: 'Obligatorio' }]}
            >
              <SelectBrand disabled={false} />
            </FormItem>
          </Col>
          <Col span={4}>
            <Divider type="vertical" />
            <Tooltip title="Crear nueva marca">
              <Button
                icon={<FileMarkdownOutlined />}
                type="primary"
                shape="circle"
                //onClick={() => setModalSizeVisible(true)}
              />
            </Tooltip>
          </Col>
        </Row>
      </DescriptionsItem>
      <DescriptionsItem label="Precio">
        <FormItem
          style={styles.marginIntial}
          name="price"
          rules={[{ required: true, message: 'Obligatorio' }]}
        >
          <InputNumber addonBefore="$" min={0} />
        </FormItem>
      </DescriptionsItem>
    </Descriptions>
  );
};

export default FormGeneralData;
