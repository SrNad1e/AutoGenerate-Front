import { PictureOutlined } from '@ant-design/icons';
import { Button, Col, Space } from 'antd';

export type Props = {
  setVisible: () => void;
};

/**
 * @description se encarga de pintar la interfaz para buscar imagenes
 * @param setVisible  funcion que recibe un estado para controlar el visible del modal para buscar imagenes
 */
const AddImages = ({ setVisible }: Props) => {
  return (
    <Space>
      <Col>
        <Button icon={<PictureOutlined />} onClick={setVisible}>
          Buscar
        </Button>
      </Col>
    </Space>
  );
};

export default AddImages;
