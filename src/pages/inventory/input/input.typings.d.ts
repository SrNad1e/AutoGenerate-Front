declare namespace INPUT {
  type Input = {
    _id: string;
    number: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    warehouse: WAREHOUSE.warehouse;
    user: USER.User;
    observation: string;
    details: DetailInput[];
    status: StatusInput;
  };

  type DetailInput = {
    product: PRODUCT.Product;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  };

  type DetailInputProps = {
    product: Partial<PRODUCT.Product>;
    action?: StatusInputProduct;
    quantity: number;
    createdAt?: Date;
    updateAt?: Date;
    __typename?: string;
  };

  type Response = {
    docs: Input[];
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

  type FiltersGetInputs = {
    dateFinal: string;
    dateInitial: string;
    number?: number;
    status?: string;
    limit: number;
    warehouseId: string;
    page: number;
    sort: any;
  };

  type CreateInput = {
    warehouseId: string;
  };

  type StatusInput = 'open' | 'confirmed' | 'cancelled';
  type StatusInputProduct = 'create' | 'update' | 'delete';
}
