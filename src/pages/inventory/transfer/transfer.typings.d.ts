declare namespace TRANSFER {
  type Transfer = {
    _id: string;
    number: number;
    status: StatusTransfer;
    warehouseOrigin: WAREHOUSE.Warehouse;
    userOrigin: USER.User;
    detail: DetailTransfer[];
    observationOrigin: string;
    warehouseDestination: WAREHOUSE.Warehouse;
    userDestination: USER.User;
    observationDestination: string;
    observation: string;
    request: REQUEST.Request;
    createdAt: Date;
    updatedAt: Date;
  };

  type DetailTransfer = {
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

  type StatusTransfer = 'open' | 'cancel' | 'sent';
}
