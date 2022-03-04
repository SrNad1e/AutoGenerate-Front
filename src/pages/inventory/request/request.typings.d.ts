declare namespace REQUEST {
  type Request = {
    _id: string;
    number: number;
    status: StatusTransfer;
    warehouseOrigin: WAREHOUSE.Warehouse;
    userOrigin: USER.User;
    details: DetailRequest[];
    warehouseDestination: WAREHOUSE.Warehouse;
    userDestination: USER.User;
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
