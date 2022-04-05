import { Badge, Card, Col, Descriptions, Input, Row } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import { StatusTypeAdjustment } from '../../adjustment.data';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

export type Props = {
  adjustment: Partial<ADJUSTMENT.Adjustment> | undefined;
  setObservation: (value: string) => void;
  observation: string;
};

const Header = ({ adjustment, setObservation, observation }: Props) => {
  const { initialState } = useModel('@@initialState');

  const allowEdit = adjustment?.status === 'open';

  return (
    <Card>
      <Row gutter={[10, 10]}>
        <Col lg={12} xs={24}>
          <Descriptions bordered size="small" column={1}>
            <DescriptionsItem label="Bodega">
              {adjustment?.warehouse?.name ||
                initialState?.currentUser?.shop?.defaultWarehouse?.name}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col lg={12} xs={24}>
          <Descriptions bordered size="small" column={1}>
            <DescriptionsItem label="Usuario">
              {adjustment?.user?.name || initialState?.currentUser?.name}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col span={24}>
          <Descriptions bordered size="small" column={4}>
            <DescriptionsItem label="Número" span={1}>
              {adjustment?.number || '(Pendiente)'}
            </DescriptionsItem>
            <DescriptionsItem label="Estado" span={1}>
              <Badge
                color={StatusTypeAdjustment[adjustment?.status || 'open']?.color}
                text={StatusTypeAdjustment[adjustment?.status || 'open']?.label}
              />
            </DescriptionsItem>
            <DescriptionsItem label="Creado" span={1}>
              {moment(adjustment?.createdAt).format(FORMAT_DATE)}
            </DescriptionsItem>
            <DescriptionsItem label="Actualizado" span={1}>
              {moment(adjustment?.updatedAt).format(FORMAT_DATE)}
            </DescriptionsItem>

            <DescriptionsItem label="Observación de general">
              {allowEdit ? (
                <TextArea value={observation} onChange={(e) => setObservation(e?.target?.value)} />
              ) : (
                adjustment?.observation
              )}
            </DescriptionsItem>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default Header;
