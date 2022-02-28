declare namespace REQUEST {
  type request = {
    _id: string;
    number: number;
    status: StatusTransfer;
    warehouseOrigin: WAREHOUSE.Warehouse;
    userOrigin: USER.User;
    detail: DetailRequest[];
    observationOrigin: string;
    warehouseDestination: WAREHOUSE.Warehouse;
    userDestination: USER.User;
    observationDestination: string;
    observation: string;
    createdAt: Date;
    updatedAt: Date;
  };

  type DetailRequest = {
    product: PRODUCT.Product;
    quantity: number;
    quantityConfirmed?: number;
    status: string;
    createdAt: Date;
    updateAt: Date;
  };

  type Response = {
    warehouse: WAREHOUSE.warehouse;
  };

  type CreateRequest = {
    warehouseDestinationId: string;
  };

  type StatusRequest = 'open' | 'cancel' | 'sent';
}
