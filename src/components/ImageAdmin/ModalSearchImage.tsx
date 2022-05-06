/* eslint-disable react-hooks/exhaustive-deps */
import { ClearOutlined, DeleteOutlined, SearchOutlined, SelectOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Input,
  Image,
  Modal,
  Row,
  Typography,
  Card,
  Pagination,
} from 'antd';

import DefaultImage from '@/assets/default.webp';
import { useGetImages } from '@/hooks/image.hooks';
import { useEffect } from 'react';
import type { Image as ImageModel, FiltersImagesInput } from '@/graphql/graphql';

const FormItem = Form.Item;
const { Title } = Typography;

export type Props = {
  visible: boolean;
  onClose: () => void;
  selectImage: (image: ImageModel) => void;
  value: ImageModel[];
  limit?: number;
  deleteImage: (id: string) => void;
};

const ModalSearchImage = ({ visible, onClose, selectImage, value, limit, deleteImage }: Props) => {
  const [form] = Form.useForm();

  const [getImages, { loading, data }] = useGetImages();

  const canAddImage = limit ? value?.length < limit : true;

  /**
   * se encarga de ejecutar la consulta para obtener las imagenes
   * @param values variables de entrada para realizar la consulta
   */
  const onSearch = (values?: FiltersImagesInput) => {
    getImages({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };

  /**
   * Se encarga de limpiar los filtros y resetear los campos
   */
  const onClear = () => {
    form.resetFields();
    onSearch({});
  };

  /**
   * ejecuta la busqueda con base a los filtros
   * @param currentValue valores obtenidos del formulario para aplicar filtros
   */
  const onFinish = (currentValue: FormData) => {
    const newValue = form.getFieldsValue();
    const actualValue = {
      ...newValue,
      ...currentValue,
    };
    onSearch({ ...actualValue });
  };

  /**
   * se encarga de controlar los eventos de la paginacion
   * @param paginationLocal paginacion
   */
  const onChangePagination = (paginationLocal: number /*_: number*/) => {
    const current = paginationLocal;

    onSearch({ page: current });
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <Modal visible={visible} width={1230} footer={false} onCancel={onClose} destroyOnClose>
      <Form layout="inline" form={form} onFinish={onFinish}>
        <FormItem label="Nombre" name="name">
          <Input width="800px" />
        </FormItem>
        <FormItem colon={false}>
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            Buscar
          </Button>
        </FormItem>
        <FormItem colon={false}>
          <Button type="default" icon={<ClearOutlined />} onClick={onClear}>
            Limpiar
          </Button>
        </FormItem>
      </Form>
      <Divider>Imagenes</Divider>
      {data?.images?.totalDocs === 0 && (
        <Title level={3} style={{ textAlign: 'center' }}>
          No hay imagenes para la busqueda
        </Title>
      )}
      <Row gutter={[16, 16]}>
        <Image.PreviewGroup>
          {data?.images?.docs?.map((image) => {
            const canSelect = !value?.find((item) => item?._id === image?._id);
            const title = !canSelect ? 'Eliminar' : 'Seleccionar';
            return (
              <Card
                key={image._id}
                title={image?.name}
                size="small"
                loading={loading}
                style={{ width: 220, margin: 5 }}
                actions={[
                  <Button
                    disabled={!canAddImage && title !== 'Eliminar'}
                    key={0}
                    type="link"
                    icon={!canSelect ? <DeleteOutlined /> : <SelectOutlined />}
                    onClick={
                      canSelect
                        ? () => selectImage(image as ImageModel)
                        : () => deleteImage(image._id)
                    }
                  >
                    {title}
                  </Button>,
                ]}
                bodyStyle={{
                  height: 200,
                  padding: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: canSelect ? '1px solid white' : '1px solid #dc9575',
                }}
              >
                <Image
                  style={{ maxWidth: 200, maxHeight: 125 }}
                  src={`${CDN_URL}/${image?.urls?.webp?.small}`}
                  fallback={DefaultImage}
                />
              </Card>
            );
          })}
        </Image.PreviewGroup>
      </Row>
      <Pagination
        style={{ paddingTop: 50 }}
        onChange={onChangePagination}
        current={data?.images?.page || 1}
        total={data?.images?.totalDocs}
        showSizeChanger={false}
      />
    </Modal>
  );
};

export default ModalSearchImage;
