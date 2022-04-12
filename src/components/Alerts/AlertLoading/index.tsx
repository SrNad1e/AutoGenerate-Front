import { Modal, Space, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './styles.less';

const { Title } = Typography;

export type Props = {
  message: string;
  visible: boolean;
};

const AlertLoading = ({ message, visible }: Props) => {
  return (
    <Modal
      className={styles.container}
      centered={true}
      closable={false}
      footer={false}
      visible={visible}
    >
      <Space direction="vertical" className={styles.content}>
        <LoadingOutlined className={styles.icon} />
      </Space>
      <Title level={3} className={styles.texto}>
        {message}
      </Title>
    </Modal>
  );
};

export default AlertLoading;
