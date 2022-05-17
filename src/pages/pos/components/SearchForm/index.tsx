import { useGetProducts } from '@/hooks/product.hooks';
import { BarcodeOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Popconfirm, Row } from 'antd';

import type { FiltersProductsInput, Product } from '@/graphql/graphql';
import ShopItem from '../ItemShop';

const FormItem = Form.Item;

export type Params = {
  addProductOrder: (product: Product, quantity: number) => void;
  refCode: React.Ref<any>;
};

type FormValues = {
  name?: string;
  stock: boolean;
  quantity: number;
};

const SearchProduct = ({ addProductOrder, refCode }: Params) => {
  const [getProducts, { loading, data }] = useGetProducts();

  const onSearch = async (filters: FiltersProductsInput) => {
    return getProducts({
      variables: {
        input: { ...filters, limit: 20 },
      },
    });
  };

  const onFinish = async ({ stock = true, name, quantity = 1 }: FormValues) => {
    try {
      //TODO: se debe realizar el analisis de si se requiere con stock o sin stock
      console.log(stock);
      const response = await onSearch({ name });
      if (response?.data?.products?.totalDocs === 1) {
        addProductOrder(response?.data?.products?.docs[0] as Product, quantity);
      }
    } catch (e: any) {
      console.log(e?.message);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Card bordered size="small">
          <Form layout="inline" onFinish={onFinish}>
            <Row
              gutter={[12, 0]}
              align="middle"
              style={{
                width: '100%',
              }}
            >
              <Col span={2}>
                <BarcodeOutlined
                  style={{
                    fontSize: 30,
                  }}
                />
              </Col>
              <Col span={8}>
                <FormItem name="name">
                  <Input
                    disabled={loading}
                    size="small"
                    placeholder="Código, Referencia"
                    autoFocus
                    ref={refCode}
                  />
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem name="stock">
                  <Checkbox disabled={loading} defaultChecked>
                    Sin Stock
                  </Checkbox>
                </FormItem>
              </Col>
              <Col span={2}>
                <FormItem name="quantity">
                  <InputNumber
                    min={1}
                    disabled={loading}
                    defaultValue={1}
                    size="small"
                    controls={false}
                    style={{
                      width: 50,
                    }}
                  />
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem>
                  <Button loading={loading} size="small" htmlType="submit" type="primary">
                    Agregar
                  </Button>
                </FormItem>
              </Col>
              <Col span={4}>
                <Popconfirm
                  title="¿Estás seguro que deseas cancelar el carrito?"
                  onConfirm={() => history.back()}
                  okText="Si, cancelar"
                  cancelText="No"
                >
                  <Button loading={loading} danger type="primary" icon={<DeleteFilled />}>
                    Cancelar
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Row
          style={{
            padding: 10,
          }}
          gutter={[16, 16]}
        >
          {data?.products?.docs?.map((product) => (
            <Col key={product?._id}>
              <ShopItem addProductOrder={addProductOrder} product={product as Product} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default SearchProduct;
