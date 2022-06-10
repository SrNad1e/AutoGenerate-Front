/* eslint-disable react-hooks/exhaustive-deps */
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Affix,
  Button,
  Card,
  Checkbox,
  Collapse,
  Descriptions,
  Divider,
  Form,
  Input,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';
import { useGetPermissions } from '@/hooks/permission.hooks';
import { useCreateRol, useGetRol, useUpdateRol } from '@/hooks/rol.hooks';
import { useParams } from 'umi';

import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

import './style.css';
import styles from './styles';

const { Title } = Typography;
const FormItem = Form.Item;
const DescriptionsItem = Descriptions.Item;

const RolesForm = () => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [form] = Form.useForm();

  const [getPermissions, { data }] = useGetPermissions();
  const [getRol, paramsGet] = useGetRol();
  const [updateRol] = useUpdateRol();
  const [createRol, paramsCreate] = useCreateRol();

  const { id } = useParams<Partial<{ id: string }>>();

  const isNew = !id;

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description  se encarga de almacenar los permisos seleccionados en una array
   * @param e evento ejecutado al cambiar el estado del checkbox
   * @param permission permiso agregado
   */
  const onChangeCheck = (e: CheckboxChangeEvent, permission: string) => {
    if (e?.target?.checked) {
      const ids: string[] = [...permissions, permission];
      setPermissions(ids);
    } else {
      const ids: string[] = permissions.filter((permissionId) => permissionId !== permission);
      setPermissions(ids);
    }
  };

  /**
   * @description funcion usada para editar los roles y redireccionar al listado
   */
  const editRol = async () => {
    const values = await form.validateFields();
    try {
      const response = await updateRol({
        variables: {
          input: { ...values, permissionIds: [...permissions] },
          id: paramsGet.data?.roleId._id || '',
        },
      });
      if (response.data?.updateRole) {
        setAlertInformation({
          message: `Rol ${response?.data?.updateRole?.name} Actualizado correctamente`,
          type: 'success',
          visible: true,
          redirect: `/configurations/roles/list`,
        });
      }
    } catch (error: any) {
      setAlertInformation({
        message: error?.message,
        type: 'error',
        visible: true,
      });
    }
  };

  /**
   * @description funcion usada para crear los roles y redireccionar al listado
   */
  const createNewRol = async () => {
    const value = await form.validateFields();
    try {
      const response = await createRol({
        variables: {
          input: {
            ...value,
            permissionIds: [...permissions],
          },
        },
      });
      if (response.data?.createRole) {
        setAlertInformation({
          message: `Rol ${response?.data?.createRole?.name} creado correctamente`,
          type: 'success',
          visible: true,
          redirect: `/configurations/roles/list`,
        });
      }
    } catch (error: any) {
      setAlertInformation({
        message: error?.message,
        type: 'error',
        visible: true,
      });
    }
  };

  useEffect(() => {
    getPermissions({
      variables: {},
    });
    if (id) {
      getRol({
        variables: {
          id,
        },
      });
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue(paramsGet.data?.roleId);
    setPermissions(paramsGet?.data?.roleId?.permissions?.map((item) => item._id) || []);
  }, [paramsGet?.data]);

  return (
    <PageContainer
      title={isNew ? <Title level={4}>Nuevo Rol</Title> : <Title level={4}>Editar Rol</Title>}
    >
      <Card className="form-permissions">
        <Divider orientation="left">Datos Generales</Divider>
        <Form form={form} initialValues={paramsGet.data?.roleId}>
          <Descriptions bordered size="small">
            <DescriptionsItem label="Nombre">
              <FormItem
                style={styles.marginItem}
                name="name"
                rules={[{ required: true, message: 'Obligatorio' }]}
              >
                <Input
                  autoFocus
                  placeholder="Ingrese el nombre del nuevo rol"
                  disabled={paramsCreate?.loading}
                />
              </FormItem>
            </DescriptionsItem>
            <DescriptionsItem label="Cambia Bodega">
              <FormItem style={styles.marginItem} valuePropName="checked" name="changeWarehouse">
                <Switch disabled={paramsCreate?.loading} />
              </FormItem>
            </DescriptionsItem>
            <DescriptionsItem label="Activo">
              <FormItem valuePropName="checked" style={styles.marginItem} name="active">
                <Switch disabled={paramsCreate?.loading} checked />
              </FormItem>
            </DescriptionsItem>
          </Descriptions>
        </Form>
        <Divider orientation="left">Permisos</Divider>
        <Collapse style={styles.collapseFather}>
          {data?.permissions
            ?.slice()
            .sort((a, b) => {
              if (a?.module > b?.module) {
                return 1;
              }
              if (a?.module < b?.module) {
                return -1;
              }
              return 0;
            })
            .map((permission) => (
              <CollapsePanel key={permission.module} header={permission.module}>
                {permission.options.map((option) => (
                  <Collapse key={1} style={styles.collapseBackColor}>
                    <CollapsePanel key={1} header={option.name}>
                      {option.actions.map((action) => (
                        <DescriptionsItem key={1}>
                          <Tooltip title={action.description}>
                            <Checkbox
                              checked={
                                !!permissions.find((permisionId) => permisionId === action._id)
                              }
                              onChange={(e) => onChangeCheck(e, action._id)}
                            >
                              {action.name}
                            </Checkbox>
                          </Tooltip>
                        </DescriptionsItem>
                      ))}
                    </CollapsePanel>
                  </Collapse>
                ))}
              </CollapsePanel>
            ))}
        </Collapse>
      </Card>
      <Affix offsetBottom={0}>
        <Card size="small" bodyStyle={styles.buttonEnd}>
          <Button
            disabled={false}
            icon={isNew ? <PlusOutlined /> : <EditOutlined />}
            type="primary"
            style={styles.buttonR}
            onClick={() => (isNew ? createNewRol() : editRol())}
          >
            {isNew ? 'Crear Rol' : 'Editar Rol'}
          </Button>
        </Card>
      </Affix>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </PageContainer>
  );
};

export default RolesForm;
