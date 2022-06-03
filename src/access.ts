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
    canEditRequest: !!currentUser?.role?.permissions.find(
      (permission) => permission?.action === 'UPDATE_INVENTORY_REQUEST',
    ),
  };
}
