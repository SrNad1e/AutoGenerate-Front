import { typesAccess } from './generalData';
import type { User } from './graphql/graphql';
import { Permissions } from './graphql/graphql';
import { useModel } from 'umi';

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
    allowEcomerce: () => {
      // eslint-disable-next-line
      const { initialState } = useModel('@@initialState');
      // eslint-disable-next-line
      if (
        initialState?.currentUser?.pointOfSale?._id === '6331c436da286a36de3c6b9c' ||
        initialState?.currentUser?.pointOfSale?._id === '6331a504aa2af68a4ecab405' ||
        initialState?.currentUser?.shop?.defaultWarehouse?._id === '6331a8aaaa2af68a4ecaba37' ||
        initialState?.currentUser?.shop?.defaultWarehouse?._id === '63319e55aa2af68a4ecaae55'
      ) {
        return true;
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
        (permission) => permission?.action === Permissions.UpdateInventoryRequest,
      ),
      canAutoCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.AutogenerateInventoryRequest,
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintInventoryRequest,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventoryRequest,
      ),
    },
    adjustment: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInventoryAdjustment,
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintInventoryAdjustment,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventoryAdjustment,
      ),
    },
    input: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInventoryInput,
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintInventoryInput,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventoryInput,
      ),
    },
    output: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInventoryOutput,
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintInventoryOutput,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventoryOutput,
      ),
    },
    transfer: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInventoryTransfer,
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintInventoryTransfer,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventoryTransfer,
      ),
      canConfirm: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.ConfirmInventoryTransfer,
      ),
      canVerified: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.InventoryTransfersVerified,
      ),
    },
    reference: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInventoryReference,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventoryReference,
      ),
    },
    color: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInventoryColor,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventoryColor,
      ),
    },
    categories: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInventoryCategory,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventoryCategory,
      ),
    },
    size: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInventorySize,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventorySize,
      ),
    },
    attrib: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInventoryAttrib,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventoryAttrib,
      ),
    },
    brand: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInventoryBrand,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInventoryBrand,
      ),
    },
    closingX: {
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintInvoicingClosex,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInvoicingClosex,
      ),
    },
    closingZ: {
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintInvoicingClosez,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInvoicingClosez,
      ),
    },
    role: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateConfigurationRole,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateConfigurationRole,
      ),
    },
    returns: {
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintInvoicingReturn,
      ),
      canCreate: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.CreateInvoicingReturn,
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
    order: {
      canEdit: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.UpdateInvoicingOrder,
      ),
      canPrint: !!currentUser?.role?.permissions.find(
        (permission) => permission?.action === Permissions.PrintInvoicingOrder,
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
