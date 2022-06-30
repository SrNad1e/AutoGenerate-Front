import { Permissions } from './graphql/graphql';

export const typesAccess = {
  //ERP
  '/inventory': {
    access: [
      Permissions.AccessInventoryAdjustments,
      Permissions.AccessInventoryInputs,
      Permissions.AccessInventoryOutputs,
      Permissions.AccessInventoryRequests,
      Permissions.AccessInventoryTransfers,
    ],
  },
  '/inventory/request': {
    access: [Permissions.AccessInventoryRequests],
  },
  '/inventory/request/list': {
    access: [Permissions.ReadInventoryRequests],
  },
  '/inventory/request/new': {
    access: [Permissions.CreateInventoryRequest],
  },
  '/inventory/request/:id': {
    access: [Permissions.UpdateInventoryRequest],
  },
  '/inventory/adjustment': {
    access: [Permissions.AccessInventoryAdjustments],
  },
  '/inventory/adjustment/list': {
    access: [Permissions.ReadInventoryAdjustments],
  },
  '/inventory/adjustment/new': {
    access: [Permissions.CreateInventoryAdjustment],
  },
  '/inventory/adjustment/:id': {
    access: [Permissions.UpdateInventoryAdjustment],
  },
  '/inventory/input': {
    access: [Permissions.AccessInventoryInputs],
  },
  '/inventory/input/list': {
    access: [Permissions.ReadInventoryInputs],
  },
  '/inventory/input/new': {
    access: [Permissions.CreateInventoryInput],
  },
  '/inventory/input/:id': {
    access: [Permissions.UpdateInventoryInput],
  },
  '/inventory/output': {
    access: [Permissions.AccessInventoryOutputs],
  },
  '/inventory/output/list': {
    access: [Permissions.ReadInventoryOutputs],
  },
  '/inventory/output/new': {
    access: [Permissions.CreateInventoryOutput],
  },
  '/inventory/output/:id': {
    access: [Permissions.UpdateInventoryOutput],
  },
  '/inventory/configurations': {
    access: [
      Permissions.AccessInventoryReferences,
      Permissions.AccessInventoryColors,
      Permissions.AccessInventoryCategories,
      Permissions.AccessInventorySizes,
      Permissions.AccessInventoryAttribs,
      Permissions.AccessInventoryBrands,
    ],
  },
  '/inventory/configurations/reference': {
    access: [Permissions.ReadInventoryReferences],
  },
  '/inventory/configurations/reference/new': {
    access: [Permissions.CreateInventoryReference],
  },
  '/inventory/configurations/reference/:id': {
    access: [Permissions.UpdateInventoryReference],
  },
  '/inventory/configurations/color': {
    access: [Permissions.ReadInventoryColors],
  },
  '/inventory/configurations/categories': {
    access: [Permissions.ReadInventoryCategories],
  },
  '/inventory/configurations/size': {
    access: [Permissions.ReadInventorySizes],
  },
  '/inventory/configurations/attribs': {
    access: [Permissions.ReadInventoryAttribs],
  },
  '/inventory/configurations/brand': {
    access: [Permissions.ReadInventoryBrands],
  },
  '/inventory/transfer': {
    access: [Permissions.AccessInventoryTransfers],
  },
  '/inventory/transfer/list': {
    access: [Permissions.ReadInventoryTransfers],
  },
  '/inventory/transfer/new': {
    access: [Permissions.CreateInventoryTransfer],
  },
  '/inventory/transfer/confirm/:id': {
    access: [Permissions.ConfirmInventoryTransfer],
  },
  '/inventory/transfer/:id': {
    access: [Permissions.UpdateInventoryTransfer],
  },
  '/invoicing': {
    access: [
      Permissions.AccessInvoicingClosesx,
      Permissions.AccessInvoicingClosesz,
      Permissions.AccessInvoicingReturns,
    ],
  },

  '/invoicing/order': {
    access: [Permissions.ReadInvoicingOrders],
  },
  '/invoicing/closings': {
    access: [Permissions.AccessInvoicingClosesx, Permissions.AccessInvoicingClosesz],
  },
  '/invoicing/closings/closingX': {
    access: [Permissions.ReadInvoicingClosesx],
  },
  '/invoicing/closings/closingZ': {
    access: [Permissions.ReadInvoicingClosesz],
  },
  '/configurations': {
    access: [
      Permissions.AccessConfigurationRoles,
      Permissions.AccessConfigurationUsers,
      Permissions.AccessConfigurationShops,
    ],
  },
  '/configurations/users': {
    access: [Permissions.ReadConfigurationUsers],
  },
  '/configurations/roles': {
    access: [Permissions.AccessConfigurationRoles],
  },
  '/configurations/roles/list': {
    access: [Permissions.ReadConfigurationRoles],
  },
  '/configurations/roles/new': {
    access: [Permissions.CreateConfigurationRole],
  },
  '/configurations/roles/:id': {
    access: [Permissions.UpdateConfigurationRole],
  },
  '/configurations/warehouse': {
    access: [Permissions.ReadConfigurationWarehouses],
  },
  '/configurations/shop': {
    access: [Permissions.ReadConfigurationShops],
  },
  '/invoicing/return': {
    access: [Permissions.ReadInvoicingReturns],
  },
  //POS
  '/pos': {
    access: [Permissions.AccessPos],
  },
  '/pos/sales': {
    access: [Permissions.AccessPos],
  },
  '/pos/sales/:id': {
    access: [Permissions.AccessPos],
  },
  '/pos/closes/closingX': {
    access: [Permissions.ReadInvoicingClosesx],
  },
  '/pos/closes/closingZ': {
    access: [Permissions.ReadInvoicingClosesz],
  },
  //Treasury
  '/treasury': {
    access: [Permissions.AccessTreasuryExpenses, Permissions.AccessTreasuryReceipts],
  },
  '/treasury/expenses': {
    access: [Permissions.ReadTreasuryExpenses],
  },
  '/treasury/receipt': {
    access: [Permissions.ReadTreasuryReceipts],
  },
  //Wallets
  '/wallets': {
    access: [Permissions.AccessCredits],
  },
  '/wallets/credits': {
    access: [Permissions.ReadCredits],
  },
  //crm
  '/crm': {
    access: [Permissions.AccessCrmCustomers],
  },
  '/crm/customer': {
    access: [Permissions.ReadCrmCustomers],
  },
};
