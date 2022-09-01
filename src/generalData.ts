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
      Permissions.AccessInventoryReferences,
      Permissions.AccessInventoryColors,
      Permissions.AccessInventoryCategories,
      Permissions.AccessInventorySizes,
      Permissions.AccessInventoryAttribs,
      Permissions.AccessInventoryBrands,
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
    access: [Permissions.AccessInventoryReferences],
  },
  '/inventory/configurations/reference/new': {
    access: [Permissions.CreateInventoryReference],
  },
  '/inventory/configurations/reference/:id': {
    access: [Permissions.UpdateInventoryReference],
  },
  '/inventory/configurations/color': {
    access: [Permissions.AccessInventoryColors],
  },
  '/inventory/configurations/categories': {
    access: [Permissions.AccessInventoryCategories],
  },
  '/inventory/configurations/size': {
    access: [Permissions.AccessInventorySizes],
  },
  '/inventory/configurations/attribs': {
    access: [Permissions.AccessInventoryAttribs],
  },
  '/inventory/configurations/brand': {
    access: [Permissions.AccessInventoryBrands],
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
      Permissions.AccessPos,
    ],
  },
  '/invoicing/pos': {
    access: [Permissions.AccessPos],
  },
  '/invoicing/closings': {
    access: [Permissions.AccessInvoicingClosesx, Permissions.AccessInvoicingClosesz],
  },
  '/invoicing/closings/closingX': {
    access: [Permissions.AccessInvoicingClosesx],
  },
  '/invoicing/closings/closingZ': {
    access: [Permissions.AccessInvoicingClosesz],
  },
  '/configurations': {
    access: [
      Permissions.AccessConfigurationRoles,
      Permissions.AccessConfigurationUsers,
      Permissions.AccessConfigurationShops,
      Permissions.AccessInvoicingPointofsales,
      Permissions.AccessInvoicingAuthorizations,
      Permissions.AccessConfigurationWarehouses,
    ],
  },
  '/configurations/pointOfSale': {
    access: [Permissions.AccessInvoicingPointofsales],
  },
  '/configurations/authorizationDian': {
    access: [Permissions.AccessInvoicingAuthorizations],
  },
  '/configurations/users': {
    access: [Permissions.AccessConfigurationUsers],
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
    access: [Permissions.AccessConfigurationWarehouses],
  },
  '/configurations/shop': {
    access: [Permissions.AccessConfigurationShops],
  },
  '/invoicing/return': {
    access: [Permissions.AccessInvoicingReturns],
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
    access: [Permissions.AccessInvoicingClosesx],
  },
  '/pos/closes/closingZ': {
    access: [Permissions.AccessInvoicingClosesz],
  },
  '/pos/return': {
    access: [Permissions.AccessInvoicingReturns],
  },
  //Treasury
  '/treasury': {
    access: [
      Permissions.AccessTreasuryExpenses,
      Permissions.AccessTreasuryReceipt,
      Permissions.AccessTreasuryPayments,
      Permissions.AccessTreasuryBoxes,
    ],
  },
  '/treasury/boxes': {
    access: [Permissions.AccessTreasuryBoxes],
  },
  '/treasury/expenses': {
    access: [Permissions.AccessTreasuryExpenses],
  },
  '/treasury/cashReceipt': {
    access: [Permissions.AccessTreasuryReceipt],
  },
  '/treasury/paymentMethods': {
    access: [Permissions.AccessTreasuryPayments],
  },
  //Wallets
  '/credits': {
    access: [Permissions.AccessCredits],
  },
  '/credits/list': {
    access: [Permissions.AccessCredits],
  },
  //crm
  '/crm': {
    access: [
      Permissions.AccessCrmCustomers,
      Permissions.AccessCrmCoupons,
      Permissions.AccessCrmCities,
      Permissions.AccessCrmDiscountrules,
    ],
  },
  '/crm/customer': {
    access: [Permissions.AccessCrmCustomers],
  },
  '/crm/cities': {
    access: [Permissions.AccessCrmCities],
  },
  '/crm/coupon': {
    access: [Permissions.AccessCrmCoupons],
  },
  '/crm/discount': {
    access: [Permissions.AccessCrmDiscountrules],
  },
};
