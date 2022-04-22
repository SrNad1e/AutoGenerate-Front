import Icon, { UploadOutlined } from '@ant-design/icons';
import { Button, Col, message, Modal, Popconfirm, Row, Tooltip, Upload } from 'antd';

import SearchImage from '../SearchImage';
import QueueAnim from 'rc-queue-anim';
import { useEffect, useState } from 'react';
import Picture from '../Picture';

import styles from './styles.less';

export type Image = {
  tags: any[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  path: string;
  imageSizes: { [key: string]: string };
};

export type Props = {
  onUpload: (data: any) => void;
  current: Image;
};

const UploadImage = (props: Props) => {
  const [image, setImage] = useState<Partial<Image>>();
  const [previewImage, setPreviewImage] = useState<Partial<Image>>({});
  const [previewVisible, setPreviewVisible] = useState(false);

  const { onUpload, current } = props;

  useEffect(() => {
    setImage(current);
  }, [current]);

  const handleUpload = (data: any) => {
    const { file, fileList } = data;
    if (file.status === 'error') {
      message.error(file.response);
    }
    if (fileList.slice(-1).status !== 'uploading') {
      if (onUpload) {
        if (fileList[0].response) {
          const newFileList = [];
          newFileList.push(fileList[fileList.length - 1]);
          onUpload(newFileList[0].response);
        }
      }
    }
  };

  const beforeUpload = (file: any) => {
    let success = true;

    const mimetypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (mimetypes.indexOf(file.type) < 0) {
      message.error(`Solo imagenes ${file.type}`);
      return false;
    }

    const fileSize = file.size / 1024 / 1024;
    const isLt2M = fileSize < 25;
    if (!isLt2M) {
      message.error(`Tamaño máximo 25 MB!, ${file.name} ${fileSize}`);
      success = false;
    }
    return success;
  };
  const propsDragger = {
    style: { marginTop: 20 },
    action: `${API_URL}/media-files`,
    multiple: false,
    name: 'file',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('feathers-jwt')}`,
    },
    accept: '.png,.jpg,.jpeg,.gif',
    beforeUpload,
    showUploadList: false,
    onchange: handleUpload,
  };

  const handlePreview = (file: any) => {
    setPreviewImage(file);
    setPreviewVisible(true);
  };

  return (
    <Row gutter={8}>
      <Col xs={24} sm={24} md={24} style={{ marginTop: 10 }}>
        {image !== undefined && image !== null ? (
          <QueueAnim component="div" type={['left', 'right']} className={styles.imglist}>
            <div className={styles.item}>
              <div className={styles.actions}>
                <Tooltip title="Vista previa">
                  <Button type="link" onClick={() => handlePreview(image)}>
                    <Icon type="eye" />
                  </Button>
                </Tooltip>
                <Tooltip title="Borrar imagen">
                  <Popconfirm
                    title="Seguro de borrar esta imagen"
                    onConfirm={() => {
                      setImage(undefined);
                      onUpload(null);
                    }}
                    okText="Si"
                    cancelText="No"
                  >
                    <Button ghost danger>
                      <Icon type="delete" />
                    </Button>
                  </Popconfirm>
                </Tooltip>
              </div>
              {image?.imageSizes && (
                <Picture
                  baseUrl={API_URL}
                  imgwebp={image?.imageSizes?.imgwebp}
                  imgjpg={image?.imageSizes?.imgjpg}
                />
              )}
            </div>
          </QueueAnim>
        ) : (
          <Row gutter={2}>
            <Col md={8}>
              <Upload {...propsDragger}>
                <Button icon={<UploadOutlined />}>Subir</Button>
              </Upload>
            </Col>
            <Col md={8}>
              <SearchImage name="Buscar" handleSelectImage={onUpload} />
            </Col>
          </Row>
        )}
      </Col>
      <div className="clearfix">
        <Modal
          visible={previewVisible}
          onCancel={() => setPreviewVisible(false)}
          footer={null}
          title="Vista previa"
        >
          <Picture
            style={{ width: '100%' }}
            baseUrl={API_URL}
            imgwebp={previewImage?.imageSizes?.imgwebp}
            imgjpg={previewImage?.imageSizes?.imgjpg}
          />
        </Modal>
      </div>
    </Row>
  );
};

export default UploadImage;
