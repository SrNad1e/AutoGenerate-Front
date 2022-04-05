import { Badge, Card, Col, Descriptions, Input, Row } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import { StatusTypeOutput } from '../../output.data';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

export type Props = {
  output: Partial<OUTPUT.Output> | undefined;
  setObservation: (value: string) => void;
  observation: string;
};

const Header = ({ output, setObservation, observation }: Props) => {
  const { initialState } = useModel('@@initialState');

  const allowEdit = output?.status === 'open';

  return (
    <Card>
      <Row gutter={[10, 10]}>
        <Col lg={12} xs={24}>
          <Descriptions bordered size="small" column={1}>
            <DescriptionsItem label="Bodega">
              {output?.warehouse?.name || initialState?.currentUser?.shop?.defaultWarehouse?.name}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col lg={12} xs={24}>
          <Descriptions bordered size="small" column={1}>
            <DescriptionsItem label="Usuario">
              {output?.user?.name || initialState?.currentUser?.name}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col span={24}>
          <Descriptions bordered size="small" column={4}>
            <DescriptionsItem label="Número" span={1}>
              {output?.number || '(Pendiente)'}
            </DescriptionsItem>
            <DescriptionsItem label="Estado" span={1}>
              <Badge
                color={StatusTypeOutput[output?.status || 'open']?.color}
                text={StatusTypeOutput[output?.status || 'open']?.label}
              />
            </DescriptionsItem>
            <DescriptionsItem label="Creado" span={1}>
              {moment(output?.createdAt).format(FORMAT_DATE)}
            </DescriptionsItem>
            <DescriptionsItem label="Actualizado" span={1}>
              {moment(output?.updatedAt).format(FORMAT_DATE)}
            </DescriptionsItem>

            <DescriptionsItem label="Observación de general">
              {allowEdit ? (
                <TextArea value={observation} onChange={(e) => setObservation(e?.target?.value)} />
              ) : (
                output?.observation
              )}
            </DescriptionsItem>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default Header;
