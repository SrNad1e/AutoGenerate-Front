import { CopyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Image, Tooltip, Popconfirm, Upload } from 'antd';
import { useState } from 'react';
import AddImages from './AddImages';
import ModalSearchImage from './ModalSearchImage';
import styles from './styles.less';
import DefaultImage from '@/assets/default.webp';

const { Dragger } = Upload;

export type Props = {
  limit?: number;
  value?: /*IMAGE.Image[] | []*/ any;
  onChange?: (images: any /*IMAGE.Image[] | []*/) => void;
  onCopyImage?: () => void;
};

const ImageAdmin = ({ limit = 1, value = [], onChange, onCopyImage }: Props) => {
  const [visible, setVisible] = useState(false);

  const canUploadImage = limit ? (value?.length > limit ? false : true) : true;

  const selectImage = (image: any /*IMAGE.Image*/) => {
    if (value) {
      if (onChange) onChange([...value, image]);
    } else {
      if (onChange) onChange([image]);
    }
  };

  const deleteImage = (id: string) => {
    if (onChange) onChange(value.filter((e: any) => e._id !== id));
  };

  return (
    <Row gutter={2}>
      {
        <div
          style={{
            height: 'auto',
            width: 'auto',
            overflowY: 'hidden',
            overflowX: 'auto',
            padding: 10,
            whiteSpace: 'nowrap',
            border: '1px solid rgba(140, 140, 140, 0.35)',
            margin: 10,
          }}
        >
          <Dragger listType="picture-card" multiple style={{ width: 200, height: 20 }}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Subir</div>
            </div>
          </Dragger>
          <Image.PreviewGroup>
            <div className={styles.imglist}>
              {value.map((image: any) => (
                <div className={styles.item}>
                  <Card
                    bordered={false}
                    style={{ height: 200, width: 148 }}
                    actions={[
                      <Tooltip title={'Borrar imagen'}>
                        <Popconfirm
                          title="Seguro de borrar esta imagen"
                          onConfirm={() => deleteImage(image._id || '')}
                          okText="Si"
                          cancelText="No"
                        >
                          <Button ghost danger style={{ margin: 0 }}>
                            <DeleteOutlined />
                          </Button>
                        </Popconfirm>
                      </Tooltip>,
                    ]}
                  >
                    <Image
                      src={`${CDN_URL}/${image?.urls?.webp?.small}`}
                      style={{ maxWidth: 150, maxHeight: 110 }}
                      fallback={DefaultImage}
                    />
                    {/*<Divider />
                    <div className={styles.actions}>
                      <Tooltip title={'Borrar imagen'}>
                        <Popconfirm
                          title="Seguro de borrar esta imagen"
                          onConfirm={() => deleteImage(image._id || '')}
                          okText="Si"
                          cancelText="No"
                        >
                          <Button ghost danger>
                            <DeleteOutlined />
                          </Button>
                        </Popconfirm>
                      </Tooltip>
                    </div>*/}
                  </Card>
                </div>
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
      }
      {canUploadImage ? <AddImages setVisible={() => setVisible(true)} /> : console.log('error')}
      {onCopyImage ? (
        <Col>
          <Button icon={<CopyOutlined />} onClick={() => onCopyImage()}>
            Copiar Imagen
          </Button>
        </Col>
      ) : undefined}
      <ModalSearchImage
        visible={visible}
        onClose={() => setVisible(false)}
        selectImage={selectImage}
      />
    </Row>
  );
};

export default ImageAdmin;
