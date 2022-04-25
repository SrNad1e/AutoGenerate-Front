/*import { PictureOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal, Pagination, Row } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Title from 'antd/lib/typography/Title';
import { useState } from 'react';*/

export type Props = {
  name: string;
  handleSelectImage: (image: any) => void;
  type?: string[];
};

const SearchImage = (/*props: Props*/) => {
  /* const [images, setImages] = useState<{ total?: number, limit?: number, skip?: number, data?: [] }>({});
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)

  const { name } = props;

  return (
    <>
      <Button icon={<PictureOutlined />} onClick={() => setVisible(true)}>
        {name}
      </Button>
      <Modal visible={visible} width={1230} footer={false} onCancel={() => setVisible(false)}>
        <Form layout="inline">
          <FormItem label="Nombre">
            <Input name="name" width="800px" />
          </FormItem>
          <FormItem label=" " colon={false}>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              Buscar
            </Button>
          </FormItem>
        </Form>
        <Divider>Imagenes</Divider>
        {images.total === 0 && (
          <Title level={3} style={{ textAlign: 'center' }}>
            No hay imagenes para la busqueda
          </Title>
        )}
        <Row gutter={[16, 16]}></Row>
        <Pagination pageSize={12} onChange={() => { }} current={currentPage} total={images.total} />
      </Modal>
    </>
  );*/
};
export default SearchImage;
