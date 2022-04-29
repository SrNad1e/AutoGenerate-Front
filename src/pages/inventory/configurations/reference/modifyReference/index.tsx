import CreateColors from '@/components/CreateColors';
import SelectBrand from '@/components/SelectBrand';
import { ArrowLeftOutlined, BgColorsOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  Tooltip,
  TreeSelect,
  Typography,
} from 'antd';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import FormItem from 'antd/lib/form/FormItem';
import Table, { ColumnsType } from 'antd/lib/table';
import { TreeNode } from 'antd/lib/tree-select';
import { TabPane } from 'rc-tabs';
import { useState } from 'react';
import { history } from 'umi';

const ModifyProduct = () => {
  const [visible, setVisible] = useState(false);
  const [, /*color*/ setColor] = useState<Partial<COLOR.Color>>({});

  const { Text } = Typography;
  const { Option } = Select;

  const visibleModal = (colorData: Partial<COLOR.Color>) => {
    setColor(colorData || {});
    setVisible(true);
  };

  const closeModal = async () => {
    await setColor({});
    setVisible(false);
  };

  const columns: ColumnsType<PRODUCT.Product> = [
    {
      title: 'Imagen',
      dataIndex: 'images',
      render: () => <Avatar shape="square" size="large"></Avatar>,
    },
    {
      title: 'Color',
      dataIndex: 'color.name',
      render: (name: string, values) => (
        <>
          <Avatar
            style={{
              border: values.color?.image ? 'solid 1px black' : '',
              backgroundColor: 'white',
            }}
          />
          <Avatar
            style={{
              backgroundColor: values.color?.html,
              border: 'solid 1px black',
              marginLeft: 10,
            }}
            shape="square"
          />
          <Text style={{ marginLeft: 10 }}>{name}</Text>
        </>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'size.value',
    },
    {
      title: 'EAN',
      dataIndex: 'barcode',
      render: (text: string) => (text && text !== '' ? text : '(Pendiente)'),
    },
  ];
  const renderFormGeneralData = () => (
    <Form>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Referencia">
          <FormItem
            name="reference"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Descripción">
          <FormItem
            name="description"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Cambiable">
          <FormItem
            name="changeable"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Switch />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Categoría">
          <FormItem
            name="category_id"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Seleccionar Categoria"
              allowClear
            >
              <TreeNode value="parent 1" title="Categoria Nivel 1">
                <TreeNode value="parent 1-0" title="Categoria Nivel 2">
                  <TreeNode value="leaf1" title="Categoria Nivel 3"></TreeNode>
                </TreeNode>
              </TreeNode>
            </TreeSelect>
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Marca">
          <FormItem
            name="brandId"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <SelectBrand />
          </FormItem>
        </DescriptionsItem>
      </Descriptions>
    </Form>
  );

  const renderFormPrice = () => (
    <Form>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Precio">
          <FormItem
            name="price"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input value="$" disabled style={{ width: 35 }} />
            <InputNumber
              min={1}
              style={{
                width: '80%',
                marginLeft: -1,
                borderLeft: 'none',
                borderEndStartRadius: 0,
                borderStartStartRadius: 0,
              }}
              step={100}
            />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Costo">
          <FormItem
            name="cost"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input value="$" disabled style={{ width: 35 }} />
            <InputNumber
              min={0}
              style={{
                width: '80%',
                marginLeft: -1,
                borderLeft: 'none',
                borderEndStartRadius: 0,
                borderStartStartRadius: 0,
              }}
              step={100}
            />
          </FormItem>
        </DescriptionsItem>
      </Descriptions>
    </Form>
  );

  const renderFormSend = () => (
    <Form>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Ancho">
          <FormItem
            name="widht"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input value="cm" disabled style={{ width: 42, marginLeft: -1 }} />
            <InputNumber
              min={0}
              style={{
                width: '80%',
                marginLeft: -1,
                borderLeft: 'none',
                borderEndStartRadius: 0,
                borderStartStartRadius: 0,
              }}
              step={100}
            />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Alto">
          <FormItem
            name="height"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input value="cm" disabled style={{ width: 42, marginLeft: -1 }} />
            <InputNumber
              min={0}
              style={{
                width: '80%',
                marginLeft: -1,
                borderLeft: 'none',
                borderEndStartRadius: 0,
                borderStartStartRadius: 0,
              }}
              step={100}
            />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Largo">
          <FormItem
            name="long"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input value="cm" disabled style={{ width: 42, marginLeft: -1 }} />
            <InputNumber
              min={0}
              style={{
                width: '80%',
                marginLeft: -1,
                borderLeft: 'none',
                borderEndStartRadius: 0,
                borderStartStartRadius: 0,
              }}
              step={100}
            />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Peso">
          <FormItem
            name="weight"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input value="cm" disabled style={{ width: 42, marginLeft: -1 }} />
            <InputNumber
              min={0}
              style={{
                width: '80%',
                paddingTop: 1,
                marginLeft: -1,
                borderLeft: 'none',
                borderEndStartRadius: 0,
                borderStartStartRadius: 0,
              }}
              step={100}
            />
          </FormItem>
        </DescriptionsItem>
        <DescriptionsItem label="Volumen">
          <FormItem
            name="volume"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: 'Obligatorio' }]}
          >
            <Input value="cc" disabled style={{ width: 42, marginLeft: -1 }} />
            <InputNumber
              min={0}
              style={{
                width: '80%',
                marginLeft: -1,
                borderLeft: 'none',
                borderEndStartRadius: 0,
                borderStartStartRadius: 0,
              }}
              step={100}
            />
          </FormItem>
        </DescriptionsItem>
      </Descriptions>
    </Form>
  );

  const renderFormAdd = () => {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 14 },
      },
    };
    return (
      <Row gutter={16}>
        <Col xs={24} sm={10}>
          <FormItem
            {...formItemLayout}
            label={
              <>
                <Tooltip title="Agregar nuevo Color">
                  <Button
                    icon={<BgColorsOutlined />}
                    type="primary"
                    style={{ marginRight: 10 }}
                    shape="circle"
                    onClick={() => visibleModal()}
                  ></Button>
                </Tooltip>
                Color
              </>
            }
            rules={[{ required: true, message: 'Obligatorio' }]}
            name="color"
          >
            <Select>
              <Option value={'Color'} key={'Color1'}>
                <Avatar
                  size={15}
                  style={{
                    backgroundColor: 'red',
                    border: 'solid 1px black',
                    marginRight: 10,
                  }}
                />
                <Text>
                  {'Nombre'}/{'NombreInterno'}
                </Text>
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem></FormItem>
        </Col>
        <Col xs={24} sm={4}>
          <FormItem label="Talla" rules={[{ required: true, message: 'Obligatorio' }]} name="size">
            <Select>
              <Option value={'Talla'}>{'XL'}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col xs={24} sm={5}>
          <FormItem>
            <Divider type="vertical" />
            <Button onClick={() => {}} type="primary">
              Agregar
            </Button>
          </FormItem>
        </Col>
      </Row>
    );
  };

  return (
    <PageContainer
      title={
        <Space align="center">
          {' '}
          <Tooltip title="Atrás">
            <Button
              type="primary"
              ghost
              icon={<ArrowLeftOutlined />}
              onClick={() => history.goBack()}
            />
          </Tooltip>
          <Divider type="vertical" />
          Nueva Referencia
        </Space>
      }
    >
      <Tabs type="card" style={{ backgroundColor: 'white' }}>
        <TabPane tab="Datos generales" key="1" style={{ padding: '5px 30px' }}>
          {renderFormGeneralData()}
        </TabPane>
        <TabPane tab="Costos y precios" key="2" style={{ padding: '5px 30px' }}>
          {renderFormPrice()}
        </TabPane>
        <TabPane tab="Datos de envio" key="3" style={{ padding: '5px 30px' }}>
          {renderFormSend()}
        </TabPane>
      </Tabs>
      <Card bordered={false}>
        <Divider>Productos</Divider>
        {renderFormAdd()}
        <Table columns={columns} pagination={false} bordered />
        <Button>Crear</Button>
      </Card>
      <CreateColors modalVisible={visible} onCancel={closeModal} />
    </PageContainer>
  );
};

export default ModifyProduct;
