export const typesAccess = {
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
};
