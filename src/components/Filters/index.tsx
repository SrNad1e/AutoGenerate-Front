import { Button, Card, Checkbox, Space } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import type { FilterDropdownProps } from 'antd/lib/table/interface';

export type Props = {
  props: FilterDropdownProps;
  data: { text: string; value: any }[];
};

const Filters = ({
  data,
  props: { selectedKeys, setSelectedKeys, confirm, clearFilters },
}: Props) => {
  const onChange = (e: CheckboxChangeEvent) => {
    setSelectedKeys([e?.target?.value]);
  };

  return (
    <Card
      actions={[
        <Button
          key="1"
          size="small"
          onClick={() => {
            if (clearFilters) {
              clearFilters();
              confirm();
            }
          }}
        >
          Limpiar
        </Button>,
        <Button size="small" key="0" onClick={() => confirm()} type="primary">
          Aceptar
        </Button>,
      ]}
      bodyStyle={{
        padding: 10,
        minWidth: 150,
      }}
    >
      <Space direction="vertical">
        {data.map((item) => (
          <Checkbox
            checked={item.value === selectedKeys[0]}
            onChange={onChange}
            key={item.value}
            value={item.value}
          >
            {item.text}
          </Checkbox>
        ))}
      </Space>
    </Card>
  );
};

export default Filters;
