/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Col, Form, Input, Modal, Progress, Row, Select } from 'antd';
import { useEffect, useState } from 'react';

import ImageAdmin from '@/components/ImageAdmin';
import SelectColor from '@/components/SelectColor';
import SelectSize from '@/components/SelectSize';
import { Image, Product, StatusProduct, UpdateProductInput } from '@/graphql/graphql';
import { StatusType } from '../../product.data';
import { useUpdateProduct } from '@/hooks/product.hooks';

const FormItem = Form.Item;
const { Option } = Select;

export type Params = {
  visible: boolean;
  current: Product;
  onClose: () => void;
  products: Product[] | [];
};

const EditModal = ({ visible, current, onClose, products }: Params) => {
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const [updateProduct, { loading }] = useUpdateProduct();

  const [form] = Form.useForm();

  /**
   * @description se encarga de ejecutar la consulta para actualizar el producto
   * @param params datos del producto a actualizar
   * @param productId identificador del producto a actualizar
   * @param copyImages si lo que se desea es copiar las imagenes solamente
   * @returns respuesta de la consulta
   */
  const saveProduct = async (
    params: UpdateProductInput,
    productId: string,
    copyImages?: boolean,
  ) => {
    try {
      const { barcode, colorId, imagesId, sizeId, status } = params;
      const values: UpdateProductInput = {};

      const currentImagesId = current?.images?.map((image) => image._id) || [];

      if (current?.color?._id !== colorId) {
        values.colorId = colorId;
      }

      if (current?.size?._id !== sizeId) {
        values.sizeId = sizeId;
      }

      if (current?.barcode !== barcode) {
        values.barcode = barcode;
      }

      if (current?.status !== status) {
        values.status = status;
      }

      if (JSON.stringify(currentImagesId) !== JSON.stringify(imagesId) || copyImages) {
        values.imagesId = imagesId;
      }

      if (Object.keys(values).length === 0) {
        setError('No hay cambios para guardar');
      } else {
        return updateProduct({
          variables: {
            id: productId,
            input: values,
          },
        });
      }
    } catch (e: any) {
      setError(e?.message);
      return e;
    }
  };

  /**
   * @description se encarga de seleccionar y actualizar los productos que tengan el mismo color
   */
  const copyImages = async () => {
    try {
      const newProducts = products?.filter(
        (product) => product?.color?._id === current?.color?._id,
      );

      const images = form.getFieldValue('images');
      for (let i = 0; i < newProducts.length; i++) {
        const product = newProducts[i];

        await saveProduct(
          {
            imagesId: images.map((image: Image) => image?._id),
          },
          product._id,
          true,
        );
        setProgress(((i + 1) * 100) / newProducts.length);
      }
    } catch (e: any) {
      setError(e?.message);
    }
  };

  /**
   * @description se encarga de organizar los datos para actualizar el producto
   */
  const onFinish = async () => {
    try {
      setError('');
      const values = await form.validateFields();

      if (values?.images?.length > 0) {
        values.imagesId = values?.images?.map((image: Image) => image?._id);
      }

      console.log(values);
      console.log(StatusProduct[values?.status]);

      /* if (values?.status) {
        values.status = StatusProduct[values?.status];
      }*/

      delete values?.images;
      const response = await saveProduct(values, current?._id);
      if (response?.data?.updateProduct) {
        onClose();
      }
    } catch (e: any) {
      setError(e?.message);
    }
  };

  useEffect(() => {
    if (current) {
      setError('');
      setProgress(0);
      form.setFieldsValue({
        barcode: current?.barcode,
        colorId: current?.color?._id,
        sizeId: current?.size?._id,
        status: current?.status,
        images: current?.images,
      });
    }
  }, [current]);

  return (
    <Modal
      onOk={onFinish}
      okText="Aceptar"
      cancelText="Cancelar"
      destroyOnClose
      title={`Edición Producto ${current?.barcode}`}
      visible={visible}
      width="80%"
      onCancel={onClose}
      okButtonProps={{
        style: { borderRadius: 5 },
        loading: loading,
      }}
      cancelButtonProps={{
        style: { borderRadius: 5 },
        loading: loading,
      }}
    >
      <Form form={form} layout="horizontal">
        <Row gutter={20}>
          <Col xs={24} md={10} lg={6}>
            <FormItem label="EAN 13" name="barcode">
              <Input disabled={loading} autoFocus placeholder="" />
            </FormItem>
          </Col>
          <Col xs={24} md={11} lg={8}>
            <FormItem
              label="Color"
              rules={[{ required: true, message: 'Obligatorio' }]}
              name="colorId"
            >
              <SelectColor disabled={loading} />
            </FormItem>
          </Col>
          <Col xs={24} md={10} lg={4}>
            <FormItem
              label="Talla"
              rules={[{ required: true, message: 'Obligatorio' }]}
              name="sizeId"
            >
              <SelectSize disabled={loading} />
            </FormItem>
          </Col>
          <Col xs={24} md={10} lg={6}>
            <FormItem
              name="status"
              label="Estado"
              rules={[{ required: true, message: 'Obligatorio' }]}
            >
              <Select loading={loading}>
                {Object.keys(StatusType).map((name) => (
                  <Option key={name} value={name}>
                    {StatusType[name].title}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="Imagenes" name="images">
              <ImageAdmin disabled={loading} limit={3} onCopyImage={copyImages} />
            </FormItem>
          </Col>
        </Row>
      </Form>
      {error && <Alert type="error" message={error} showIcon />}
      {progress > 0 && <Progress strokeColor="primary.main" percent={progress} />}
    </Modal>
  );
};

export default EditModal;
