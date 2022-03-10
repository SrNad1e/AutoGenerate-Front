declare namespace REQUEST {
  type Request = {
    _id: string;
    number: number;
    status: StatusTransfer;
    warehouseOrigin: WAREHOUSE.Warehouse;
    user: USER.User;
    details: DetailRequest[];
    warehouseDestination: WAREHOUSE.Warehouse;
    observation: string;
    createdAt: Date;
    updatedAt: Date;
  };

  type DetailRequest = {
    product: PRODUCT.Product;
    quantity: number;
    createdAt: Date;
    updateAt: Date;
  };

  type DetailRequestProps = {
    product: Partial<PRODUCT.Product>;
    action?: StatusRequestProduct;
    quantity: number;
    createdAt?: Date;
    updateAt?: Date;
    __typename?: string;
  };

  type Response = {
    warehouse: WAREHOUSE.warehouse;
  };

  type CreateRequest = {
    warehouseDestinationId: string;
  };

  type StatusRequest = 'open' | 'cancelled' | 'pending' | 'used';
  type StatusRequestProduct = 'create' | 'update' | 'delete';
}
