import { typesAccess } from './generalData';
import type { User } from './graphql/graphql';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: User | undefined }) {
  const { currentUser } = initialState || {};

  return {
    allowOption: (route: any) => {
      if (route?.path) {
        return !!currentUser?.role?.permissions.find((permission) =>
          typesAccess[route?.path]?.access?.includes(permission?.action),
        );
      } else {
        return false;
      }
    },
    request: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_REQUEST',
      ),
      canAutoCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'AUTOGENERATE_INVENTORY_REQUEST',
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'PRINT_INVENTORY_REQUEST',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_REQUEST',
      ),
    },
    adjustment: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_ADJUSTMENT',
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'PRINT_INVENTORY_ADJUSTMENT',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_ADJUSTMENT',
      ),
    },
    input: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_INPUT',
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'PRINT_INVENTORY_INPUT',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_INPUT',
      ),
    },
    output: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_OUTPUT',
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'PRINT_INVENTORY_OUTPUT',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_OUTPUT',
      ),
    },
  };
}
