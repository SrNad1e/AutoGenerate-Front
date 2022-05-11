import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType, SorterResult } from 'antd/es/table/interface';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import numeral from 'numeral';
import moment from 'moment';

import type { FiltersReferencesInput, Reference } from '@/graphql/graphql';
import { useState } from 'react';
import SelectBrand from '@/components/SelectBrand';
import EditModal from '../components/EditModal';

import style from './styles.less';

const ReferenceList = () => {
  const [sorterTable /*setSorterTable*/] = useState<SorterResult<FiltersReferencesInput>>({});
  const [filterTable /*setFilterTable*/] = useState<Record<string, any | null>>({});

  const { Title, Text } = Typography;
  const FormItem = Form.Item;

  const columns: ColumnsType<Partial<Reference>> = [
    {
      title: 'Referencia',
      dataIndex: 'name',
      sorter: true,
      sortOrder: sorterTable?.field === 'name' ? sorterTable.order : undefined,
      showSorterTooltip: false,
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      sorter: true,
      sortOrder: sorterTable?.field === 'description' ? sorterTable.order : undefined,
      showSorterTooltip: false,
    },
    {
      title: 'Costo',
      dataIndex: 'cost',
      sorter: true,
      sortOrder: sorterTable?.field === 'cost' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (cost: number) => <span>{numeral(cost).format('$ 0,0')}</span>,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      sorter: true,
      sortOrder: sorterTable?.field === 'price' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (price: number) => <span>{numeral(price).format('$ 0,0')}</span>,
    },
    {
      title: 'Activo',
      dataIndex: 'active',
      render: (active: boolean) => {
        return <Badge status={active ? 'success' : 'default'} text={active ? 'Si' : 'No'} />;
      },
      filterMultiple: false,
      filteredValue: filterTable?.active || null,
      filters: [
        {
          text: 'Si',
          value: true,
        },
        {
          text: 'No',
          value: false,
        },
      ],
    },
    {
      title: 'Cambiable',
      dataIndex: 'changeable',
      render: (changeable: boolean) => {
        return (
          <Badge status={changeable ? 'success' : 'default'} text={changeable ? 'Si' : 'No'} />
        );
      },
      filterMultiple: false,
      filteredValue: filterTable?.active || null,
      filters: [
        {
          text: 'Si',
          value: true,
        },
        {
          text: 'No',
          value: false,
        },
      ],
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'updatedAt',
      align: 'center',
      sorter: true,
      sortOrder: sorterTable?.field === 'updatedAt' ? sorterTable.order : undefined,
      showSorterTooltip: false,
      render: (createdAt: string) => <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Acción',
      dataIndex: '_id',
      align: 'center',
      render: () => (
        <Tooltip title="Editar" placement="topLeft">
          <Button
            onClick={() => {}}
            style={{ backgroundColor: '#dc9575' }}
            icon={<EditOutlined style={{ color: 'white' }} />}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <PageContainer
      title={
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            Referencias
          </Title>
        </Space>
      }
    >
      <Card className={style.tableList}>
        <Form layout="inline">
          <Col span={6}>
            <FormItem label="Nombre" name="name" style={{ width: 240 }}>
              <Input placeholder="Nombre, Descripción" autoComplete="off" />
            </FormItem>
          </Col>
          <Col span={6} style={{ paddingLeft: 20 }}>
            <FormItem label="Marca" name="brandId">
              <SelectBrand />
            </FormItem>
          </Col>
          <Col span={12}>
            <Button type="primary" htmlType="submit" className={style.submitButtons}>
              Buscar
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => {}} className={style.submitButtons}>
              Limpiar
            </Button>
          </Col>
        </Form>
        <Row className={style.spaceForm}>
          <Col span={12} className={style.marginButton}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              shape="round"
              onClick={() => history.push('/inventory/configurations/reference/new')}
            >
              Nueva Referencia
            </Button>
          </Col>
          <Col span={12} className={style.totalFound}>
            <Text strong>Total Encontrados:</Text> {1} <Text strong>Páginas: </Text> {1} / {1}
          </Col>
        </Row>
        <Table columns={columns} />
      </Card>
      {<EditModal />}
    </PageContainer>
  );
};

export default ReferenceList;
