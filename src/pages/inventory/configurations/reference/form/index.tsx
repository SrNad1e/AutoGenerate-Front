import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Affix,
  Avatar,
  Button,
  Card,
  Divider,
  Space,
  Table,
  Form,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { useHistory } from 'umi';
import { useState } from 'react';

import type { Color, Product, Size } from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import FormGeneralData from '../components/FormGeneralData';
import FormShipping from '../components/FormShipping';
import FormCreateProduct from '../components/FormCreateProduct';
import { useCreateReference } from '@/hooks/reference.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from './styles';

const { Text } = Typography;
const { TabPane } = Tabs;

const FormReference = () => {
  const [combinations, setCombinations] = useState<Partial<Product>[]>([]);
  const [activeKey, setActiveKey] = useState('1');
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const history = useHistory();

  const [form] = Form.useForm();
  const [formCreateProduct] = Form.useForm();

  const [createReference] = useCreateReference();

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      if (!values?.name) {
        setActiveKey('1');
        return;
      }

      if (!values?.long) {
        setActiveKey('2');
        return;
      }

      if (combinations.length > 0) {
        const categoriesId = values?.categoriesId?.split('-');

        let categoryLevel1Id;
        let categoryLevel2Id;
        let categoryLevel3Id;
        if (categoriesId.length === 3) {
          categoryLevel1Id = categoriesId[0];
          categoryLevel2Id = categoriesId[1];
          categoryLevel3Id = categoriesId[2];
        }

        if (categoriesId.length === 2) {
          categoryLevel1Id = categoriesId[0];
          categoryLevel2Id = categoriesId[1];
        }

        if (categoriesId.length === 1) {
          categoryLevel1Id = categoriesId[0];
          categoryLevel2Id = categoriesId[1];
        }

        delete values.categoriesId;
        const newCombinations = combinations?.map(({ color, size }) => ({
          colorId: color?._id,
          sizeId: size?._id,
        }));
        const response = await createReference({
          variables: {
            input: {
              ...values,
              categoryLevel1Id,
              categoryLevel2Id,
              categoryLevel3Id,
              combinations: newCombinations,
            },
          },
        });
        if (response?.data?.createReference) {
          history.push(
            `/inventory/configurations/reference/${response?.data?.createReference?._id}`,
          );
        }
      } else {
        showError('Debes agregar combinaciones para crear los productos');
      }
    } catch (e: any) {
      if (e?.message) {
        showError(e?.message);
      }
    }
  };

  const addProducts = ({ colors, sizes }: { colors: Color[]; sizes: Size[] }) => {
    const newCombinations = [];

    for (let c = 0; c < colors.length; c++) {
      const color = colors[c];
      for (let s = 0; s < sizes.length; s++) {
        const size = sizes[s];
        const combinationFind = combinations.find(
          (combination) => combination?.color === color && combination?.size === size,
        );
        if (!combinationFind) {
          newCombinations.push({
            color,
            size,
          });
        }
      }
    }

    setCombinations(combinations.concat(newCombinations));
    formCreateProduct.resetFields();
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'Imagen',
      dataIndex: 'images',
      render: () => <Avatar shape="square" size="large" />,
    },
    {
      title: 'Color',
      dataIndex: 'color',
      render: ({ name, name_internal, html, image }: Color) => (
        <>
          <Avatar
            size="small"
            style={{ backgroundColor: html, border: 'solid 1px black' }}
            src={`${CDN_URL}/${image?.urls?.webp?.small}`}
          />

          <Text style={{ marginLeft: 10 }}>
            {name} / {name_internal}
          </Text>
        </>
      ),
    },
    {
      title: 'Talla',
      dataIndex: 'size',
      render: ({ value }) => value,
    },
    {
      title: 'EAN',
      dataIndex: 'barcode',
      render: (text: string) => (text && text !== '' ? text : '(Pendiente)'),
    },
    {
      title: 'Acciones',
      dataIndex: '_id',
      align: 'center',
      render: () => (
        <Tooltip title="Eliminar" placement="topLeft">
          <Button danger onClick={() => {}} type="primary" icon={<DeleteOutlined />} />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer
      title={
        <Space align="center">
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
      <Card bordered={false}>
        <Form form={form}>
          <Tabs type="card" activeKey={activeKey} onChange={setActiveKey}>
            <TabPane tab="Datos generales" key="1">
              <FormGeneralData />
            </TabPane>
            <TabPane tab="Datos de envio" key="2">
              <FormShipping />
            </TabPane>
          </Tabs>
        </Form>
        <Divider>Productos</Divider>
        <FormCreateProduct form={formCreateProduct} onFinish={addProducts} />
        <Divider />
        <Table dataSource={combinations} columns={columns} pagination={false} bordered />
        <Affix offsetBottom={0}>
          <Card bodyStyle={styles.bodyStyle} size="small">
            <Button type="primary" onClick={onFinish}>
              Guardar
            </Button>
          </Card>
        </Affix>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default FormReference;
