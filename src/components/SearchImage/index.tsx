import { PictureOutlined, SearchOutlined, SelectOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  TablePaginationConfig,
  Image,
  Card,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
//import { useGetImages } from '@/hooks/image.hooks';
import DefaultImage from '@/assets/default.webp';
//import styles from './styles.less';

/*type InputValues = {
  name?: string;
  limit?: number;
  page?: number;
};

type FormData = {
  name?: string;
};*/

const SearchImage = () => {
  const [images /*setImages*/] = useState<Partial<COLOR.ResponsePaginate[]>>([]);
  const [visible, setVisible] = useState(false);
  /*const [image, setImage] = useState<Partial<IMAGE.Image>>({});*/
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    showSizeChanger: false,
    total: 0,
    pageSize: 10,
    current: 1,
  });

  const { Title } = Typography;
  const [form] = Form.useForm();

  /*const resultImages = (data: Partial<IMAGE.ResponsePaginate>) => {
    setImages(data?.docs || []);
    setPagination({ ...pagination, total: data.totalDocs });
  };*/

  /*const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };*/

  const closeAlert = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  //const { getImages, loading } = useGetImages(resultImages, showError);

  const onSearch = (/*values?: InputValues*/) => {
    /* getImages({
      variables: {
        input: {
          ...values,
        },
      },
    });*/
  };

  /*const selectImage = (imageData: Partial <IMAGE.Image>) => {
    setImage(imageData)
    setVisible(false)
  }*/

  const onFinish = (/*value: FormData*/) => {
    /* const newValue = form.getFieldsValue();
    const actualValue = {
      ...newValue,
      ...value,
    };
    onSearch({ ...actualValue });*/
  };

  const onChangePagination = (paginationLocal: number /* _: number*/) => {
    const current = paginationLocal;

    setPagination({ ...pagination, current });
    //onSearch({ page: current });
  };

  useEffect(() => {
    /*if (visible) {
    }*/
    onSearch();
  }, []);

  /* const renderFormPreviewImage = () => (
    <>
      {images.map((image, key) => (
        <div className={styles.item} key={image?._id}>
          <div className={styles.actions}>
            
          </div>
        </div>
      ))}
    </>
  );*/

  return (
    <>
      <Button icon={<PictureOutlined />} onClick={() => setVisible(true)}>
        {'Buscar'}
      </Button>
      <Modal
        visible={visible}
        width={1230}
        footer={false}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <Form layout="inline" form={form} onFinish={onFinish}>
          <FormItem label="Nombre" name="name">
            <Input width="800px" />
          </FormItem>
          <FormItem colon={false}>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              Buscar
            </Button>
          </FormItem>
        </Form>
        <Divider>Imagenes</Divider>
        {pagination.total === 0 && (
          <Title level={3} style={{ textAlign: 'center' }}>
            No hay imagenes para la busqueda
          </Title>
        )}
        <Row gutter={[16, 16]}>
          <Image.PreviewGroup>
            {/*loading={loading}*/}
            {images.map((/*image*/) => (
              <Card
                title={'image?.name'}
                size="small"
                style={{ width: 220, height: 250, margin: 5 }}
                actions={[
                  <Button type="link" icon={<SelectOutlined />}>
                    Seleccionar
                  </Button>,
                ]}
              >
                <Image
                  style={{ maxWidth: 200, maxHeight: 125 }}
                  src={`${CDN_URL}/${'image?.urls?.webp?.small'}`}
                  fallback={DefaultImage}
                />
              </Card>
            ))}
          </Image.PreviewGroup>
        </Row>
        <Pagination
          style={{ paddingTop: 50 }}
          onChange={onChangePagination}
          current={pagination.current}
          total={pagination.total}
          showSizeChanger={false}
        />
        <AlertInformation {...alertInformation} onCancel={closeAlert} />
      </Modal>
    </>
  );
};
export default SearchImage;
