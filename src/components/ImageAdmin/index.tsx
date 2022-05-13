import {
  CopyOutlined,
  DeleteOutlined,
  InboxOutlined,
  LoadingOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Image, Tooltip, Popconfirm, Upload, Typography } from 'antd';
import { useState } from 'react';

import ModalSearchImage from './ModalSearchImage';
import type { Image as ImageModel } from '@/graphql/graphql';

import DefaultImage from '@/assets/default.webp';

import styles from './styles.less';

const { Dragger } = Upload;
const { Text } = Typography;

export type Props = {
  limit: number;
  value?: ImageModel[] | [];
  onChange?: (images: ImageModel[] | []) => void;
  onCopyImage?: () => void;
  disabled: boolean;
};

/**
 * @description se encarga de gestionar las imagenes
 * @param limit limita el numero de imagenes que pueden agregarse
 * @param value array donde se almacena las imagenes que se seleccionen
 * @param onChange funcion que se encarga de almacenar las imagenes en el value
 * @param  onCopyImage funcion que se encarga de copiar la imagen que se seleccione
 * @returns Componente que muestra las imagenes
 */
const ImageAdmin = ({ limit, value = [], onChange, onCopyImage, disabled }: Props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const canUploadImage = limit ? value?.length < limit : true;

  /**
   * selecciona una imagen y ejecuta onchange para guardar la imagen en value
   * @param image imagen a seleccionar
   */
  const selectImage = (image: ImageModel) => {
    if (value) {
      if (onChange) onChange([...value, image]);
    } else {
      if (onChange) onChange([image]);
    }
  };

  /**
   * se encarga de eliminar una imagen de value
   * @param id el id de la imagen que se va a eliminar
   */
  const deleteImage = (id: string) => {
    if (onChange) onChange(value.filter((e: any) => e._id !== id));
  };

  /**
   * se encarga de poner en value la imagen que se sube en el dragger
   */
  const setPic = async ({ file }: any) => {
    if (file?.status === 'uploading') {
      setLoading(true);
    }

    if (file?.status === 'done') {
      setLoading(false);
      if (value) {
        if (onChange) {
          onChange([...value, file?.response]);
        }
      }
    }
  };

  /**
   * Propiedades del dragger
   */
  const draggerProps = {
    accept: '.png,.jpg,.jpeg,.webp',
    showUploadList: false,
    headers: {
      authorization: `bearer ${localStorage.getItem('token')}`,
    },
    action: `${API_URL}/upload/image`,
    onChange: setPic,
    name: 'image',
    multiple: false,
    style: { width: 148, margin: '0 10px' },
  };

  return (
    <Row gutter={24}>
      <Col span={24} className={styles.imgContainer}>
        <Image.PreviewGroup>
          <Row>
            <Col className={styles.imglist}>
              {value?.length >= limit == false && (
                <Dragger
                  disabled={loading || disabled}
                  listType="picture-card"
                  height="100%"
                  {...draggerProps}
                >
                  {loading || disabled ? (
                    <LoadingOutlined style={{ color: '#dc9575' }} />
                  ) : (
                    <InboxOutlined style={{ fontSize: 30, color: '#dc9575' }} />
                  )}
                  <Text style={{ display: 'flex', fontSize: 12, justifyContent: 'center' }}>
                    {loading ? 'Subiendo Imagen' : 'Arrastre una imagen'}
                  </Text>
                </Dragger>
              )}
              {value?.map((image) => (
                <Row key={image?._id}>
                  <Col className={styles.item}>
                    <Card
                      bordered={false}
                      style={{ width: 148 }}
                      bodyStyle={{
                        height: 130,
                        padding: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      actions={[
                        <Tooltip title={'Borrar imagen'} key={0}>
                          <Popconfirm
                            title="Seguro de borrar esta imagen"
                            onConfirm={() => deleteImage(image._id || '')}
                            okText="Si"
                            cancelText="No"
                          >
                            <Button
                              loading={loading || disabled}
                              ghost
                              danger
                              style={{ margin: 0 }}
                            >
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
                    </Card>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Image.PreviewGroup>
      </Col>
      <Col>
        {canUploadImage ? (
          <Button
            loading={loading || disabled}
            icon={<PictureOutlined />}
            onClick={() => setVisible(true)}
          >
            Buscar
          </Button>
        ) : null}
      </Col>
      {onCopyImage ? (
        <Col>
          <Button loading={disabled} icon={<CopyOutlined />} onClick={() => onCopyImage()}>
            Copiar imagen del mismo color
          </Button>
        </Col>
      ) : undefined}
      <ModalSearchImage
        value={value}
        limit={limit}
        visible={visible}
        onClose={() => setVisible(false)}
        selectImage={selectImage}
        deleteImage={deleteImage}
      />
    </Row>
  );
};

export default ImageAdmin;
