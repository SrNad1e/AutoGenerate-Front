import { Descriptions, Form, Input, Switch } from 'antd';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import FormItem from 'antd/lib/form/FormItem';

import SelectAnyCategory from '@/components/SelectAnyCategory';
import SelectBrand from '@/components/SelectBrand';

import style from '../styles.less';

const FormGeneralData = () => {
  return (
    <Form>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Referencia">
          <FormItem
            name="reference"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Descripción">
          <FormItem
            name="description"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Cambiable">
          <FormItem
            name="changeable"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Switch />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Categoría">
          <FormItem
            name="categoryId"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <SelectAnyCategory />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Marca">
          <FormItem
            name="brandId"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <SelectBrand />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Activo">
          <FormItem
            name="active"
            className={style.noMargin}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Switch />
          </FormItem>
        </DescriptionsItem>
      </Descriptions>
    </Form>
  );
};

export default FormGeneralData;
