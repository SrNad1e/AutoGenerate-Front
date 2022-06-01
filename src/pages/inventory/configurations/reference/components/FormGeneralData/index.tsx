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
import { Link } from 'umi';
import { useState } from 'react';

import SelectCategories from '@/components/SelectCategories';
import SelectBrand from '@/components/SelectBrand';
import SelectListAttrib from '@/components/SelectListAttrib';
import CreateAttrib from '@/components/CreateAttrib';
import CreateBrands from '@/components/CreateBrand';

import styles from '../styles';

const DescriptionsItem = Descriptions.Item;
const FormItem = Form.Item;

const FormGeneralData = () => {
  const [modalAttribVisible, setModalAttribVisible] = useState(false);
  const [modalBrandVisible, setModalBrandVisible] = useState(false);

  /**
   * @description se encarga de cerrar el modal para crear color
   */
  const closeModalAttrib = () => {
    setModalAttribVisible(false);
  };

  /**
   * @description se encarga de cerrar el modal para crear color
   */
  const closeModalBrand = () => {
    setModalBrandVisible(false);
  };

  return (
    <>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Referencia">
          <FormItem
            name="name"
            style={styles.marginIntial}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input autoFocus />
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
            <Col xs={18} md={19} lg={20}>
              <FormItem
                style={styles.marginIntial}
                name="categoriesId"
                rules={[{ required: true, message: 'Obligatorio' }]}
              >
                <SelectCategories />
              </FormItem>
            </Col>
            <Col xs={6} md={5} lg={4}>
              <Divider type="vertical" />
              <Tooltip title="Crear nueva categoría">
                <Link to="/inventory/configurations/categories" target="_blank">
                  <Button icon={<AppstoreOutlined />} type="primary" shape="circle" />
                </Link>
              </Tooltip>
            </Col>
          </Row>
        </DescriptionsItem>
        <DescriptionsItem label="Activo">
          <FormItem style={styles.marginIntial} name="active">
            <Switch defaultChecked />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem span={2} label="Atributos">
          <Row>
            <Col xs={18} md={19} lg={20}>
              <FormItem
                style={styles.marginIntial}
                name="attribIds"
                rules={[{ required: true, message: 'Obligatorio' }]}
              >
                <SelectListAttrib disabled={false} />
              </FormItem>
            </Col>
            <Col xs={6} md={5} lg={4}>
              <Divider type="vertical" />
              <Tooltip title="Crear nuevo atributo">
                <Button
                  icon={<AlignCenterOutlined />}
                  type="primary"
                  shape="circle"
                  onClick={() => setModalAttribVisible(true)}
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
            <InputNumber
              addonBefore="$"
              min={0}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem span={2} label="Marca">
          <Row>
            <Col xs={18} md={19} lg={20}>
              <FormItem
                style={styles.marginIntial}
                name="brandId"
                rules={[{ required: true, message: 'Obligatorio' }]}
              >
                <SelectBrand disabled={false} />
              </FormItem>
            </Col>
            <Col xs={6} md={5} lg={4}>
              <Divider type="vertical" />
              <Tooltip title="Crear nueva marca">
                <Button
                  icon={<FileMarkdownOutlined />}
                  type="primary"
                  shape="circle"
                  onClick={() => setModalBrandVisible(true)}
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
            <InputNumber
              addonBefore="$"
              min={0}
              formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            />
          </FormItem>
        </DescriptionsItem>
      </Descriptions>
      <CreateAttrib modalVisible={modalAttribVisible} onCancel={closeModalAttrib} />
      <CreateBrands modalVisible={modalBrandVisible} onCancel={closeModalBrand} />
    </>
  );
};

export default FormGeneralData;
