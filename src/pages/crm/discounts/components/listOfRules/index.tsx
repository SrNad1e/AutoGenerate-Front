/* eslint-disable react-hooks/exhaustive-deps */
import {
  DeleteOutlined,
  EditOutlined,
  FieldNumberOutlined,
  MoreOutlined,
  PlusOutlined,
  ReadOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import { Button, Divider, Modal, Popconfirm, Space, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import Table from 'antd/lib/table';
import { useState } from 'react';
import type { DiscountRule, Rule } from '@/graphql/graphql';
import { DocumentTypesRule, TypesRule } from '@/graphql/graphql';

import { RuleType } from '../../form/rules.data';
import { DocumentType } from '../../form/discount.data';
import CreateRuleForm from '../createRule';

import styles from '../../styles';

const { Text } = Typography;

type Props = {
  onCancel: () => void;
  visible: boolean;
  isNew: boolean;
  discountData: DiscountRule;
  rules: Rule[];
  setRules: any;
};

const ListOfRules = ({ onCancel, visible, isNew, discountData, rules, setRules }: Props) => {
  const [visibleCreateRule, setVisibleCreateRule] = useState(false);
  const [ruleDataUpdate, setRuleDataUpdate] = useState<Partial<Rule> | any>({});

  /**
   * @description cierra el modal de creacion de regla
   */
  const onCloseCreateRule = () => {
    setVisibleCreateRule(false);
  };

  /**
   * @description abre el modal de creacion de regla y guarda la regla a modificar en el estado
   * @param rule regla para actualizar
   */
  const openUpdateRule = (rule: Rule) => {
    setRuleDataUpdate(rule);
    setVisibleCreateRule(true);
  };

  /**
   * @description funcion usada para eliminar una regla del estado
   * @param documentType tipo de documento que se quiere eliminar
   */
  const deleteRuleList = (documentType: string) => {
    const newRules = rules.filter((index) => index.documentType !== documentType);
    setRules([...newRules]);
  };

  /**
   * @description funcion usada para abir el modal de creacion de regla
   */
  const openAddRule = () => {
    setVisibleCreateRule(true);
    setRuleDataUpdate(undefined);
  };

  const column: ColumnsType<Rule> = [
    {
      title: <Text>{<ReadOutlined />} Tipos de Documento</Text>,
      dataIndex: 'documentType',
      align: 'center',
      showSorterTooltip: false,
      render: (documentType: string) => (
        <Tag style={styles.tagStyle}>
          {documentType === DocumentTypesRule.Categories
            ? DocumentType.CATEGORIES.label
            : documentType === DocumentTypesRule.Customertypes
            ? DocumentType.CUSTOMERTYPES.label
            : documentType === DocumentTypesRule.Company && DocumentType.COMPANY.label}
        </Tag>
      ),
    },
    {
      title: <Text>{<FieldNumberOutlined />} Documentos</Text>,
      dataIndex: 'documentIds',
      align: 'center',
      showSorterTooltip: false,
      render: (documentIds: string[]) => documentIds?.length,
    },
    {
      title: <Text>{<SelectOutlined />} Tipo</Text>,
      dataIndex: 'type',
      align: 'center',
      showSorterTooltip: false,
      render: (type: string) =>
        type === TypesRule.Equal
          ? RuleType.EQUAL.label
          : type === TypesRule.Greater
          ? RuleType.GREATER.label
          : type === TypesRule.Greaterthanorequal
          ? RuleType.GREATERTHANOREQUAL.label
          : type === TypesRule.Less
          ? RuleType.LESS.label
          : type === TypesRule.Lessthanorequal && RuleType.LESSTHANOREQUAL.label,
    },
    {
      title: <Text>{<MoreOutlined />} Opciones</Text>,
      fixed: 'right',
      dataIndex: 'documentType',
      align: 'center',
      render: (_, rule) => (
        <Space>
          <Tooltip title="Editar" placement="topLeft">
            <Button onClick={() => openUpdateRule(rule)} type="primary" icon={<EditOutlined />} />
          </Tooltip>
          <Popconfirm
            title="¿Esta seguro que desea eliminar?"
            cancelText="Cancelar"
            okText="Eliminar"
            disabled={rules.length === 1 && !isNew}
            onConfirm={() => deleteRuleList(rule?.documentType)}
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              type="primary"
              disabled={rules.length === 1 && !isNew}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Modal
      width={800}
      visible={visible}
      onCancel={onCancel}
      destroyOnClose
      title="Lista de Reglas"
      footer={
        <Button onClick={onCancel} style={styles.buttonR}>
          Cerrar
        </Button>
      }
    >
      {!isNew && (
        <Divider>
          <Button
            icon={<PlusOutlined />}
            style={styles.buttonR}
            type="primary"
            onClick={() => openAddRule()}
          >
            Agregar Regla
          </Button>
        </Divider>
      )}
      <Table columns={column} scroll={{ x: 600, y: 500 }} dataSource={rules} pagination={false} />
      <CreateRuleForm
        rules={rules}
        setRules={setRules}
        discountData={discountData}
        visible={visibleCreateRule}
        onCancel={onCloseCreateRule}
        ruleDataUpdate={ruleDataUpdate}
      />
    </Modal>
  );
};

export default ListOfRules;
