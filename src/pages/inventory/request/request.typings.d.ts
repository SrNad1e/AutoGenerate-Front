declare namespace REQUEST {
  type Request = {
    _id: string;
    number: number;
    status: StatusRequest;
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
    docs: Request[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    page: number;
    nextPage: number;
    paging: number;
    pagingCounter: number;
    prevPage: number;
    totalDocs: number;
    totalPages: number;
  };

  type FiltersGetRequests = {
    number?: number;
    status?: string;
    warehouseOriginId?: string;
    warehouseDestinationId?: string;
    limit: number;
    page: number;
    dateInitial?: string;
    dateFinal?: string;
    sort: any;
  };

  type CreateRequest = {
    warehouseDestinationId: string;
  };

  type StatusRequest = 'open' | 'cancelled' | 'pending' | 'used';
  type StatusRequestProduct = 'create' | 'update' | 'delete';
}
