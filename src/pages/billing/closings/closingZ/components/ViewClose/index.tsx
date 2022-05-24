import { PrinterFilled } from '@ant-design/icons';
import { Button, Modal, Tabs } from 'antd';

import BoxCount from '../../reports/boxCount';
import CashRegister from '../../reports/cashRegister';

import styles from '../styles';

const { TabPane } = Tabs;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const ViewClose = ({ visible, onCancel }: Props) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      destroyOnClose
      bodyStyle={styles.displayFormat}
      footer={
        <>
          <Button onClick={onCancel}>Cerrar</Button>
          <Button type="primary" icon={<PrinterFilled />}>
            Imprimir
          </Button>
        </>
      }
    >
      <Tabs type="card">
        <TabPane tab="Cierre" key="1">
          <div style={styles.displayFormat}>
            <CashRegister />
          </div>
        </TabPane>
        <TabPane tab="Arqueo" key="2">
          <div style={styles.displayFormat}>
            <BoxCount />
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default ViewClose;
