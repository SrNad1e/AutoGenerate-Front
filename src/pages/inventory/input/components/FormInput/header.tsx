import { Badge, Card, Col, Descriptions, Input, Row } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import { StatusTypeInput } from '../../input.data';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

export type Props = {
  input: Partial<INPUT.Input> | undefined;
  setObservation: (value: string) => void;
  observation: string;
};

const Header = ({ input, setObservation, observation }: Props) => {
  const { initialState } = useModel('@@initialState');

  const allowEdit = input?.status === 'open';

  return (
    <Card>
      <Row gutter={[10, 10]}>
        <Col lg={12} xs={24}>
          <Descriptions bordered size="small" column={1}>
            <DescriptionsItem label="Bodega">
              {input?.warehouse?.name || initialState?.currentUser?.shop?.defaultWarehouse?.name}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col lg={12} xs={24}>
          <Descriptions bordered size="small" column={1}>
            <DescriptionsItem label="Usuario">
              {input?.user?.name || initialState?.currentUser?.name}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col span={24}>
          <Descriptions bordered size="small" column={4}>
            <DescriptionsItem label="Número" span={1}>
              {input?.number || '(Pendiente)'}
            </DescriptionsItem>
            <DescriptionsItem label="Estado" span={1}>
              <Badge
                color={StatusTypeInput[input?.status || 'open']?.color}
                text={StatusTypeInput[input?.status || 'open']?.label}
              />
            </DescriptionsItem>
            <DescriptionsItem label="Creado" span={1}>
              {moment(input?.createdAt).format(FORMAT_DATE)}
            </DescriptionsItem>
            <DescriptionsItem label="Actualizado" span={1}>
              {moment(input?.updatedAt).format(FORMAT_DATE)}
            </DescriptionsItem>

            <DescriptionsItem label="Observación de general">
              {allowEdit ? (
                <TextArea value={observation} onChange={(e) => setObservation(e?.target?.value)} />
              ) : (
                input?.observation
              )}
            </DescriptionsItem>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default Header;
