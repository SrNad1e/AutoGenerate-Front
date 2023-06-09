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

export type Params = {
  disabled: boolean;
};

const FormGeneralData = ({ disabled }: Params) => {
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
            <Input autoFocus disabled={disabled} />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Descripción">
          <FormItem
            style={styles.marginIntial}
            name="description"
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input disabled={disabled} />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Cambiable">
          <FormItem valuePropName="checked" style={styles.marginIntial} name="changeable">
            <Switch disabled={disabled} />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem span={2} label="Categoría">
          <FormItem
            style={styles.marginIntial}
            name="categoriesId"
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <SelectCategories disabled={disabled} />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Activo">
          <FormItem valuePropName="checked" style={styles.marginIntial} name="active">
            <Switch defaultChecked disabled={disabled} />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem span={2} label="Atributos">
          <Row>
            <Col xs={12} md={19} lg={20}>
              <FormItem style={styles.marginIntial} name="attribIds">
                <SelectListAttrib disabled={disabled} />
              </FormItem>
            </Col>
            <Col xs={12} md={5} lg={4}>
              <Divider type="vertical" />
              <Tooltip title="Crear nuevo atributo">
                <Button
                  icon={<AlignCenterOutlined />}
                  type="primary"
                  shape="circle"
                  onClick={() => setModalAttribVisible(true)}
                  disabled={disabled}
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
              disabled={disabled}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem span={2} label="Marca">
          <Row>
            <Col xs={12} md={19} lg={20}>
              <FormItem
                style={styles.marginIntial}
                name="brandId"
                rules={[{ required: true, message: 'Obligatorio' }]}
              >
                <SelectBrand disabled={disabled} />
              </FormItem>
            </Col>
            <Col xs={12} md={5} lg={4}>
              <Divider type="vertical" />
              <Tooltip title="Crear nueva marca">
                <Button
                  icon={<FileMarkdownOutlined />}
                  type="primary"
                  shape="circle"
                  disabled={disabled}
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
              disabled={disabled}
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
