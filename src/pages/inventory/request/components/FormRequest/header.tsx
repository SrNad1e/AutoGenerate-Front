import { Badge, Card, Col, Descriptions, Divider, Input, Row } from 'antd';

import moment from 'moment';
import { useModel } from 'umi';
import { StatusType } from '../../request.data';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

export type Props = {
  request: Partial<REQUEST.Request> | undefined;
  setObservation: (value: string) => void;
  observation: string;
};

const Header = ({ request, setObservation, observation }: Props) => {
  const { initialState } = useModel('@@initialState');

  const allowEdit = request?.status === 'open';

  return (
    <Card>
      <Divider />
      <Row gutter={[10, 10]}>
        <Col lg={12} xs={24}>
          <Descriptions bordered size="small" column={1}>
            <DescriptionsItem label="Bodega que solicita">
              {request?.warehouseDestination?.name ||
                initialState?.currentUser?.shop?.defaultWarehouse?.name}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col lg={12} xs={24}>
          <Descriptions bordered size="small" column={1}>
            <DescriptionsItem label="Bodega de despacho">
              {request?.warehouseOrigin?.name}
            </DescriptionsItem>
          </Descriptions>
        </Col>
        <Col span={24}>
          <Descriptions bordered size="small" column={4}>
            <DescriptionsItem label="Número" span={1}>
              {request?.number || '(Pendiente)'}
            </DescriptionsItem>
            <DescriptionsItem label="Estado" span={1}>
              <Badge
                color={StatusType[request?.status || 'open']?.color}
                text={StatusType[request?.status || 'open']?.label}
              />
            </DescriptionsItem>
            <DescriptionsItem label="Creado" span={1}>
              {moment(request?.createdAt).format(FORMAT_DATE)}
            </DescriptionsItem>
            <DescriptionsItem label="Actualizado" span={1}>
              {moment(request?.updatedAt).format(FORMAT_DATE)}
            </DescriptionsItem>
            <DescriptionsItem label="Usuario">
              {request?.user?.name || initialState?.currentUser?.name}
            </DescriptionsItem>
            <DescriptionsItem label="Observación de general">
              {allowEdit ? (
                <TextArea value={observation} onChange={(e) => setObservation(e?.target?.value)} />
              ) : (
                request?.observation
              )}
            </DescriptionsItem>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default Header;
