declare namespace ADJUSTMENT {
  type Adjustment = {
    _id: string;
    number: number;
    total: number;
    warehouse: WAREHOUSE.warehouse;
    observation: string;
    details: DetailAdjustment[];
    status: StatusOutput;
    createdAt: Date;
    updatedAt: Date;
    user: USER.User;
  };

  type DetailAdjustment = {
    product: PRODUCT.Product;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  };

  type DetailAdjustmentProps = {
    product: Partial<PRODUCT.Product>;
    action?: StatusInputProduct;
    quantity: number;
    createdAt?: Date;
    updateAt?: Date;
    __typename?: string;
  };

  type Response = {
    docs: Adjustment[];
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

  type FiltersGetAdjustment = {
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

  type CreateAdjustment = {
    warehouseId: string;
  };

  type StatusAdjustment = 'open' | 'confirmed' | 'cancelled';
  type StatusAdjustmentProduct = 'create' | 'update' | 'delete';
}
