/* eslint-disable react-hooks/exhaustive-deps */
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectWarehouses from '@/components/SelectWarehouses';
import type {
  Color,
  FiltersProductsInput,
  Product,
  Reference,
  Size,
  Stock,
} from '@/graphql/graphql';
import { BarcodeOutlined, ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useEffect, useState } from 'react';
import { useGetProducts } from '@/hooks/product.hooks';
import validateCodeBar from '@/libs/validateCodeBar';

const FormItem = Form.Item;
const { Text } = Typography;

type FormValues = {
  name: string;
  warehouseId: string;
};

const Inventories = () => {
  const [propsAlert, setPropsAlert] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [getProducts /*{ data, loading, error }*/] = useGetProducts();

  const onCloseAlert = () => {
    setPropsAlert({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const showError = (message: string) => {
    setPropsAlert({
      message,
      type: 'error',
      visible: true,
    });
  };

  const onSearch = (params: Partial<FiltersProductsInput>) => {
    try {
      getProducts({
        variables: {
          input: {
            ...params,
            status: 'active',
          },
        },
      });
    } catch (err: any) {
      showError(err?.message);
    }
  };

  /**
   * @description realiza la busqueda de los productos con base al filtro
   * @param values valores del formulario
   */
  const onFinish = ({ name, warehouseId }: FormValues) => {
    try {
      const params: Partial<FiltersProductsInput> = {
        page: 1,
        name: name && validateCodeBar(name),
        warehouseId,
      };
      onSearch({ ...params });
    } catch (err: any) {
      showError(err?.message);
    }
  };

  useEffect(() => {
    onSearch({ limit: 10, page: 1 });
  }, []);

  const columns: ColumnsType<Product> = [
    {
      title: 'Bodega',
      dataIndex: 'warehouse',
    },
    {
      title: 'Producto',
      dataIndex: 'reference',
      render: ({ name, description }: Reference, { barcode }) => (
        <Row>
          <Col span={24}>
            {name} / {description}
          </Col>
          <Col span={24}>
            <Tag icon={<BarcodeOutlined />}>{barcode}</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      render: (color: Color) => (
        <>
          <Avatar
            size="small"
            style={{ backgroundColor: color?.html, border: 'solid 1px black' }}
            src={`${CDN_URL}/${color?.image?.urls?.webp?.small}`}
          />

          <Text style={{ marginLeft: 10 }}>{color?.name_internal}</Text>
        </>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'size',
      render: (size: Size) => size.value,
    },
    {
      title: 'Disponible',
      dataIndex: 'stock',
      align: 'center',
      render: (stock: Stock[]) =>
        stock && (
          <Badge
            overflowCount={99999}
            count={stock[0]?.quantity}
            style={{ backgroundColor: (stock[0]?.quantity || 0) > 0 ? 'green' : 'red' }}
            showZero
          />
        ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form onFinish={onFinish}>
          <Row gutter={[20, 15]}>
            <Col>
              <FormItem label="Producto">
                <Input autoFocus placeholder="referencia, descripción, código" />
              </FormItem>
            </Col>
            <Col>
              <FormItem label="Bodega">
                <SelectWarehouses disabled={false} />
              </FormItem>
            </Col>
            <Col>
              <FormItem>
                <Space>
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                    style={{ borderRadius: 5 }}
                  >
                    Buscar
                  </Button>
                  <Button htmlType="reset" style={{ borderRadius: 5 }} icon={<ClearOutlined />}>
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Space>
                <Text strong>Total Encontrados:</Text>
                <Text>{0}</Text>
                <Text strong>Pagina:</Text>
                <Text>
                  {0} / {0}
                </Text>
              </Space>
            </Col>
            <Col span={24}>
              <Table columns={columns} />
            </Col>
          </Row>
        </Form>
      </Card>
      <AlertInformation {...propsAlert} onCancel={onCloseAlert} />
    </PageContainer>
  );
};

export default Inventories;
