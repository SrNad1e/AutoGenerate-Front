export const typesAccess = {
  //ERP
  '/inventory': {
    access: [
      'ACCESS_INVENTORY_ADJUSTMENTS',
      'ACCESS_INVENTORY_INPUTS',
      'ACCESS_INVENTORY_OUTPUTS',
      'ACCESS_INVENTORY_REQUESTS',
      'ACCESS_INVENTORY_TRANSFERS',
    ],
  },
  '/inventory/request': {
    access: ['ACCESS_INVENTORY_REQUESTS'],
  },
  '/inventory/request/list': {
    access: ['READ_INVENTORY_REQUESTS'],
  },
  '/inventory/request/new': {
    access: ['CREATE_INVENTORY_REQUEST'],
  },
  '/inventory/request/:id': {
    access: ['UPDATE_INVENTORY_REQUEST'],
  },
  '/inventory/adjustment': {
    access: ['ACCESS_INVENTORY_ADJUSTMENTS'],
  },
  '/inventory/adjustment/list': {
    access: ['READ_INVENTORY_ADJUSTMENTS'],
  },
  '/inventory/adjustment/new': {
    access: ['CREATE_INVENTORY_ADJUSTMENT'],
  },
  '/inventory/adjustment/:id': {
    access: ['UPDATE_INVENTORY_ADJUSTMENT'],
  },
  '/inventory/input': {
    access: ['ACCESS_INVENTORY_INPUTS'],
  },
  '/inventory/input/list': {
    access: ['READ_INVENTORY_INPUTS'],
  },
  '/inventory/input/new': {
    access: ['CREATE_INVENTORY_INPUT'],
  },
  '/inventory/input/:id': {
    access: ['UPDATE_INVENTORY_INPUT'],
  },
  '/inventory/output': {
    access: ['ACCESS_INVENTORY_OUTPUTS'],
  },
  '/inventory/output/list': {
    access: ['READ_INVENTORY_OUTPUTS'],
  },
  '/inventory/output/new': {
    access: ['CREATE_INVENTORY_OUTPUT'],
  },
  '/inventory/output/:id': {
    access: ['UPDATE_INVENTORY_OUTPUT'],
  },
  '/inventory/configurations': {
    access: [
      'ACCESS_INVENTORY_REFERENCES',
      'ACCESS_INVENTORY_COLORS',
      'ACCESS_INVENTORY_SIZES',
      'ACCESS_INVENTORY_CATEGORIES',
      'ACCESS_INVENTORY_ATTRIBS',
      'ACCESS_INVENTORY_BRANDS',
    ],
  },
  '/inventory/configurations/reference': {
    access: ['READ_INVENTORY_REFERENCES'],
  },
  '/inventory/configurations/reference/new': {
    access: ['CREATE_INVENTORY_REFERENCE'],
  },
  '/inventory/configurations/reference/:id': {
    access: ['UPDATE_INVENTORY_REFERENCE'],
  },
  '/inventory/configurations/color': {
    access: ['READ_INVENTORY_COLORS'],
  },
  '/inventory/configurations/categories': {
    access: ['READ_INVENTORY_CATEGORIES'],
  },
  '/inventory/configurations/size': {
    access: ['READ_INVENTORY_SIZES'],
  },
  '/inventory/configurations/attribs': {
    access: ['READ_INVENTORY_ATTRIBS'],
  },
  '/inventory/configurations/brand': {
    access: ['READ_INVENTORY_BRANDS'],
  },
  '/inventory/transfer': {
    access: ['ACCESS_INVENTORY_TRANSFERS'],
  },
  '/inventory/transfer/list': {
    access: ['READ_INVENTORY_TRANSFERS'],
  },
  '/inventory/transfer/new': {
    access: ['CREATE_INVENTORY_TRANSFER'],
  },
  '/inventory/transfer/confirm/:id': {
    access: ['CONFIRM_INVENTORY_TRANSFER'],
  },
  '/inventory/transfer/:id': {
    access: ['UPDATE_INVENTORY_TRANSFER'],
  },
  '/invoicing': {
    access: ['ACCESS_INVOICING_CLOSESX', 'ACCESS_INVOICING_CLOSESZ', 'ACCESS_INVOICING_RETURNS'],
  },
  '/invoicing/closings': {
    access: ['ACCESS_INVOICING_CLOSESX', 'ACCESS_INVOICING_CLOSESZ'],
  },
  '/invoicing/closings/closingX': {
    access: ['READ_INVOICING_CLOSESX'],
  },
  '/invoicing/closings/closingZ': {
    access: ['READ_INVOICING_CLOSESZ'],
  },
  '/configurations': {
    access: ['ACCESS_CONFIGURATION_ROLES', 'ACCESS_CONFIGURATION_USERS'],
  },
  '/configurations/users': {
    access: ['READ_CONFIGURATION_USERS'],
  },
  '/configurations/roles': {
    access: ['READ_CONFIGURATION_ROLES'],
  },
  //POS
  '/pos': {
    access: ['ACCESS_POS'],
  },
  '/pos/sales': {
    access: ['ACCESS_POS'],
  },
  '/pos/sales/:id': {
    access: ['ACCESS_POS'],
  },
  '/pos/closes/closingX': {
    access: ['READ_INVOICING_CLOSESX'],
  },
  '/pos/closes/closingZ': {
    access: ['READ_INVOICING_CLOSESX'],
  },
};
