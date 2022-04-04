declare namespace OUTPUT {
  type Output = {
    _id: string;
    number: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    warehouse: WAREHOUSE.warehouse;
    user: USER.User;
    observation: string;
    details: DetailInput[];
    status: StatusOutput;
  };

  type DetailOutput = {
    product: PRODUCT.Product;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  };

  type DetailOutputProps = {
    product?: Partial<PRODUCT.Product>;
    action?: StatusInputProduct;
    quantity: number;
    createdAt?: Date;
    updateAt?: Date;
    __typename?: string;
  };

  type Response = {
    docs: Output[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    page: number;
    nextPage: number;
    pagingCounter: number;
    prevPage: number;
    totalDocs: number;
    totalPages: number;
  };

  type FiltersGetOutputs = {
    dateFinal: string;
    dateInitial: string;
    limit: number;
    number?: number;
    page: number;
    sort: any;
    status?: string;
    total: number;
    warehouseId: string;
  };

  type CreateOutput = {
    warehouseId: string;
  };

  type StatusOutput = 'open' | 'confirmed' | 'cancelled';
  type StatusOutputProduct = 'create' | 'update' | 'delete';
}
