import { useGetImages } from '@/hooks/image.hooks';
import { ClearOutlined, SearchOutlined, SelectOutlined } from '@ant-design/icons';
import DefaultImage from '@/assets/default.webp';
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
import { useEffect } from 'react';

const FormItem = Form.Item;
const { Title } = Typography;

export type Props = {
  visible: boolean;
  onClose: () => void;
  selectImage: (image: /*IMAGE.Image*/ any) => void;
};

const ModalSearchImage = ({ visible, onClose, selectImage }: Props) => {
  const [form] = Form.useForm();

  const [getImages, { loading, data }] = useGetImages();

  const onSearch = (values?: any) => {
    getImages({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };

  const onClear = () => {
    form.resetFields();
    onSearch({});
  };

  const onFinish = (value: FormData) => {
    const newValue = form.getFieldsValue();
    const actualValue = {
      ...newValue,
      ...value,
    };
    onSearch({ ...actualValue });
  };

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
          {data?.images?.docs?.map((image: any /*IMAGE.Image*/) => (
            <Card
              title={image?.name}
              size="small"
              loading={loading}
              style={{ width: 220, height: 250, margin: 5 }}
              actions={[
                <Button type="link" icon={<SelectOutlined />} onClick={() => selectImage(image)}>
                  Seleccionar
                </Button>,
              ]}
              bodyStyle={{ display: 'flex', justifyContent: 'center' }}
            >
              <Image
                style={{ maxWidth: 200, maxHeight: 125 }}
                src={`${CDN_URL}/${image?.urls?.webp?.small}`}
                fallback={DefaultImage}
              />
            </Card>
          ))}
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
