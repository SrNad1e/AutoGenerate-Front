import { Badge, Card, Descriptions, Input } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';

import type { StockInput } from '@/graphql/graphql';
import { StatusTypeInput } from '../../input.data';

const DescriptionsItem = Descriptions.Item;
const { TextArea } = Input;

export type Props = {
  input: Partial<StockInput> | undefined;
  setObservation: (value: string) => void;
  observation: string;
  allowEdit: boolean;
};

const Header = ({ input, setObservation, observation, allowEdit }: Props) => {
  const { initialState } = useModel('@@initialState');

  return (
    <Card>
      <Descriptions bordered size="small">
        <DescriptionsItem label="Bodega" span={1}>
          {input?.warehouse?.name || initialState?.currentUser?.shop?.defaultWarehouse?.name}
        </DescriptionsItem>
        <DescriptionsItem label="Usuario" span={2}>
          {input?.user?.name || initialState?.currentUser?.name}
        </DescriptionsItem>
        <DescriptionsItem label="Número" span={1}>
          {input?.number || '(Pendiente)'}
        </DescriptionsItem>
        <DescriptionsItem label="Estado" span={2}>
          <Badge
            color={StatusTypeInput[input?.status || 'open']?.color}
            text={StatusTypeInput[input?.status || 'open']?.label}
          />
        </DescriptionsItem>
        <DescriptionsItem label="Creado" span={1}>
          {moment(input?.createdAt).format(FORMAT_DATE)}
        </DescriptionsItem>
        <DescriptionsItem label="Actualizado" span={2}>
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
    </Card>
  );
};

export default Header;
