import { PictureOutlined } from '@ant-design/icons';
import { Button, Col, Space } from 'antd';

export type Props = {
  setVisible: () => void;
};

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
