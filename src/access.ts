import { typesAccess } from './generalData';
import type { User } from './graphql/graphql';
import { Permissions } from './graphql/graphql';

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
    allowCompany: currentUser?.username === 'admin',
    allowERP: !!initialState?.currentUser?.role?.permissions.find(
      (permission) => permission?.action === 'ACCESS_ERP',
    ),
    allowPOS: !!initialState?.currentUser?.role?.permissions.find(
      (permission) => permission?.action === 'ACCESS_POS',
    ),
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
    transfer: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_TRANSFER',
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'PRINT_INVENTORY_TRANSFER',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_TRANSFER',
      ),
      canConfirm: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CONFIRM_INVENTORY_TRANSFER',
      ),
    },
    reference: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_REFERENCE',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_REFERENCE',
      ),
    },
    color: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_COLOR',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_COLOR',
      ),
    },
    categories: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_COLOR',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_COLOR',
      ),
    },
    size: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_SIZE',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_SIZE',
      ),
    },
    attrib: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_ATTRIB',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_ATTRIB',
      ),
    },
    brand: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_INVENTORY_BRAND',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVENTORY_BRAND',
      ),
    },
    closingX: {
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'PRINT_INVOICING_CLOSEX',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVOICING_CLOSEX',
      ),
    },
    closingZ: {
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'PRINT_INVOICING_CLOSEZ',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVOICING_CLOSEZ',
      ),
    },
    role: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'UPDATE_CONFIGURATION_ROLE',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_CONFIGURATION_ROLE',
      ),
    },
    returns: {
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'PRINT_INVOICING_RETURN',
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === 'CREATE_INVOICING_RETURN',
      ),
    },
    user: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateConfigurationUser,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateConfigurationUser,
      ),
    },
    pointOfSales: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInvoicingPointofsale,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInvoicingPointofsale,
      ),
    },
    expense: {
      canCancelled: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateTreasuryExpense,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateTreasuryExpense,
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintTreasuryExpense,
      ),
    },
    receipt: {
      canCancelled: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateTreasuryReceipt,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateTreasuryReceipt,
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintTreasuryReceipt,
      ),
    },
    credit: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateCredit,
      ),
    },
    customer: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateCrmCustomer,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateCrmCustomer,
      ),
    },
    city: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateCrmCity,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateCrmCity,
      ),
    },
    shop: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateConfigurationShop,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateConfigurationShop,
      ),
    },
    warehouse: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateConfigurationWarehouse,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateConfigurationWarehouse,
      ),
    },
    paymentMethod: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateTreasuryPayment,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateTreasuryPayment,
      ),
    },
    coupon: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateCrmCoupon,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateCrmCoupon,
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintCrmCoupon,
      ),
    },
    box: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateTreasuryBox,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateTreasuryBox,
      ),
    },
    authorization: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInvoicingAuthorization,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInvoicingAuthorization,
      ),
    },
    discount: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateCrmDiscountrule,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateCrmDiscountrule,
      ),
    },
  };
}
