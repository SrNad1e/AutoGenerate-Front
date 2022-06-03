export const typesAccess = {
  '/inventory': {
    access: [
      'ACCESS_INVENTORY_ADJUSTMENTS',
      'ACCESS_INVENTORY_INPUTS',
      'ACCESS_INVENTORY_OUTPUTS',
      'ACCESS_INVENTORY_REQUESTS',
      'ACCESS_INVENTORY_TRANSFERS',
      'ACCESS_INVENTORY_CONFIGURATIONS',
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
    access: ['ACCESS_INVENTORY_CONFIGURATIONS'],
  },
  '/inventory/configurations/reference': {
    access: ['ACCESS_INVENTORY_CONFIGURATIONS_REFERENCES'],
  },
  '/inventory/configurations/reference/new': {
    access: ['ACCESS_INVENTORY_CONFIGURATIONS_REFERENCE'],
  },
  '/inventory/configurations/reference/:id': {
    access: ['ACCESS_INVENTORY_CONFIGURATIONS_REFERENCE'],
  },
  '/inventory/configurations/color': {
    access: ['ACCESS_INVENTORY_CONFIGURATIONS_COLORS'],
  },
  '/inventory/configurations/categories': {
    access: ['ACCESS_INVENTORY_CONFIGURATIONS_CATEGORIES'],
  },
  '/inventory/configurations/size': {
    access: ['ACCESS_INVENTORY_CONFIGURATIONS_SIZES'],
  },
  '/inventory/configurations/attribs': {
    access: ['ACCESS_INVENTORY_CONFIGURATIONS_ATTRIBS'],
  },
  '/inventory/configurations/brand': {
    access: ['ACCESS_INVENTORY_CONFIGURATIONS_BRANDS'],
  },
  '/inventory/transfer': {
    access: ['ACCESS_INVENTORY_TRANSFERS'],
  },
  '/inventory/transfer/list': {
    access: ['READ_INVENTORY_TRANSFERS'],
  },
};
