/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
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
  Popconfirm,
  Image,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { useHistory, useParams } from 'umi';
import { useEffect, useState } from 'react';

import type {
  Color,
  Product,
  Size,
  Image as ImageModel,
  CreateProductInput,
  UpdateReferenceInput,
} from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertSave } from '@/components/Alerts/AlertSave';
import FormGeneralData from '../components/FormGeneralData';
import FormShipping from '../components/FormShipping';
import FormCreateProduct from '../components/FormCreateProduct';
import { useCreateReference, useGetReference, useUpdateReference } from '@/hooks/reference.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertSave from '@/components/Alerts/AlertSave';
import EditProduct from '../components/EditModal';
import { useCreateProduct } from '@/hooks/product.hooks';

import DefaultImage from '@/assets/default.webp';

import styles from './styles';

const { Text } = Typography;
const { TabPane } = Tabs;

const FormReference = () => {
  const [combinations, setCombinations] = useState<Partial<Product>[]>([]);
  const [activeKey, setActiveKey] = useState('1');
  const [editProduct, setEditProduct] = useState(false);
  const [product, setProduct] = useState<Product>();
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [alertSave, setAlertSave] = useState<Partial<PropsAlertSave>>({
    message: '',
    type: 'error',
    visible: false,
  });

  const history = useHistory();
  const { id } = useParams<Partial<{ id: string }>>();

  const [form] = Form.useForm();
  const [formCreateProduct] = Form.useForm();

  const [createReference] = useCreateReference();
  const [getReference, { data }] = useGetReference();
  const [createProduct, { loading }] = useCreateProduct(id || '');
  const [updateReference] = useUpdateReference();

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

  const closeAlertSave = () => {
    setAlertSave({
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

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showSuccess = (message: string, redirect?: string) => {
    setAlertInformation({
      message,
      type: 'success',
      visible: true,
      redirect,
    });
  };

  const onFinish = () => {
    setAlertSave({
      message: id
        ? '¿Estás seguro que deseas actualizar la referencia?'
        : '¿Estás seguro que deseas crear la referencia?',
      type: 'warning',
      visible: true,
    });
  };

  /**
   * @description ejecuta la mutation para crear una referencia y valida las combinaciones para
   *  crear productos
   */
  const newReference = async () => {
    const values = await form.validateFields();
    try {
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
          showSuccess(
            `Referencia creada correctamente`,
            `/inventory/configurations/reference/${response?.data?.createReference?._id}`,
          );
        }
      } else {
        showError('Debes agregar combinaciones para crear los productos');
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  /**
   * @description valida los valores en los campos y ejecuta la mutation para actualizar la
   * referencia
   */
  const saveReference = async () => {
    const values = await form.validateFields();

    try {
      const params: UpdateReferenceInput = {};

      const categoriesId = values?.categoriesId?.split('-');

      if (categoriesId.length === 3) {
        params.categoryLevel1Id = categoriesId[0];
        params.categoryLevel2Id = categoriesId[1];
        params.categoryLevel3Id = categoriesId[2];
      }

      if (categoriesId.length === 2) {
        params.categoryLevel1Id = categoriesId[0];
        params.categoryLevel2Id = categoriesId[1];
      }

      if (categoriesId.length === 1) {
        params.categoryLevel1Id = categoriesId[0];
        params.categoryLevel2Id = '';
        params.categoryLevel3Id = '';
      }

      if (values?.active !== undefined) {
        params.active = values?.active;
      }

      if (values?.attribIds) {
        params.attribIds = values?.attribIds;
      }

      if (values?.brandId) {
        params.brandId = values?.brandId;
      }

      if (values?.changeable !== undefined) {
        params.changeable = values?.changeable;
      }

      if (values?.cost) {
        params.cost = values?.cost;
      }

      if (values?.description) {
        params.description = values?.description;
      }

      if (values?.height) {
        params.height = values?.height;
      }

      if (values?.long) {
        params.long = values?.long;
      }

      if (values?.name) {
        params.name = values?.name;
      }

      if (values?.price) {
        params.price = values?.price;
      }

      if (values?.volume) {
        params.volume = values?.volume;
      }

      if (values?.weight) {
        params.weight = values?.weight;
      }

      if (values?.width) {
        params.width = values?.width;
      }

      const response = await updateReference({
        variables: {
          id: id || '',
          input: params,
        },
      });

      if (response?.data) {
        showSuccess(
          `La referencia ${response?.data?.updateReference?.name} ha sido actualizada correctamente`,
        );
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  /**
   * @description ejecuta la mutation para crear un producto
   * @param values datos que recibe la mutation para crear un producto
   */
  const addProduct = async (values: CreateProductInput) => {
    try {
      return createProduct({
        variables: {
          input: values,
        },
      });
    } catch (e) {
      return e;
    }
  };

  /**
   * @description gestiona las combinaciones entre color y talla para la creacion de productos
   * @param colors array de colores
   * @param sizes array de tallas
   */
  const addProducts = async ({ colors, sizes }: { colors: Color[]; sizes: Size[] }) => {
    const newCombinations = [];

    for (let c = 0; c < colors.length; c++) {
      const color = colors[c];
      for (let s = 0; s < sizes.length; s++) {
        const size = sizes[s];
        const combinationFind = combinations.find(
          (combination) => combination?.color === color && combination?.size === size,
        );

        if (!combinationFind) {
          if (id) {
            try {
              await addProduct({
                referenceId: id,
                colorId: color?._id,
                sizeId: size?._id,
              });
            } catch (e: any) {
              showError(e.message);
            }
          } else {
            newCombinations.push({
              color,
              size,
            });
          }
        }
      }
    }

    setCombinations(combinations.concat(newCombinations));
    formCreateProduct.resetFields();
  };

  /**
   * @description elimina la combinacion seleccionada
   */
  const deleteProduct = ({ color, size }: Product) => {
    const newCombinations = combinations?.filter(
      (combination) =>
        !(combination?.color?._id === color?._id && combination?.size?._id === size?._id),
    );
    setCombinations(newCombinations);
  };

  useEffect(() => {
    if (id) {
      getReference({
        variables: {
          id,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (data?.referenceId) {
      const {
        name,
        description,
        changeable,
        active,
        price,
        cost,
        shipping,
        categoryLevel1,
        categoryLevel2,
        categoryLevel3,
        attribs,
        brand,
      } = data?.referenceId;

      form.setFieldsValue({
        name,
        description,
        changeable,
        active,
        price,
        cost,
        ...shipping,
        categoriesId:
          `${categoryLevel1?._id}-${categoryLevel2?._id}-${categoryLevel3?._id}`.replaceAll(
            '-undefined',
            '',
          ),
        attribIds: attribs?.map((attrib) => attrib._id) || [],
        brandId: brand?._id,
      });

      setCombinations((data?.referenceId?.products as Product[]) || []);
    }
  }, [data]);

  const columns: ColumnsType<Product> = [
    {
      title: 'Imagen',
      dataIndex: 'images',
      width: 100,
      render: (images: ImageModel[]) => {
        const image = images && images[0];
        return (
          <Image
            style={{ maxWidth: 200, maxHeight: 125 }}
            src={`${CDN_URL}/${image?.urls?.webp?.small}`}
            fallback={DefaultImage}
          />
        );
      },
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
      fixed: 'right',
      render: (_id: string, record) =>
        _id ? (
          <Tooltip title="Editar" placement="topLeft">
            <Button
              onClick={() => {
                setProduct(record);
                setEditProduct(true);
              }}
              type="primary"
              icon={<EditOutlined />}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Eliminar" placement="topLeft">
            <Popconfirm
              title="¿Está seguro que desea eliminarlo?"
              okText="Eliminar"
              onConfirm={() => deleteProduct(record)}
            >
              <Button danger type="primary" icon={<DeleteOutlined />} />
            </Popconfirm>
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
          {id ? `Edición de referencia: ${data?.referenceId?.name}` : 'Nueva Referencia'}
        </Space>
      }
    >
      <Card bordered={false} loading={loading}>
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
        <Table
          loading={loading}
          dataSource={combinations}
          columns={columns}
          pagination={false}
          bordered
          scroll={{ x: 'auto' }}
        />
        <Affix offsetBottom={0}>
          <Card loading={loading} bodyStyle={styles.bodyStyle} size="small">
            <Button type="primary" onClick={onFinish}>
              Guardar
            </Button>
          </Card>
        </Affix>
      </Card>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertSave
        {...alertSave}
        onCancel={closeAlertSave}
        onOk={id ? saveReference : newReference}
      />
      {product && (
        <EditProduct
          products={combinations as Product[]}
          current={product}
          visible={editProduct}
          onClose={() => setEditProduct(false)}
        />
      )}
    </PageContainer>
  );
};

export default FormReference;
