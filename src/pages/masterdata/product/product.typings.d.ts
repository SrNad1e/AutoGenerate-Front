declare namespace PRODUCT {
  type Product = {
    _id?: string;
    reference?: string;
    description?: string;
    barcode?: string;
    changeable?: boolean;
    color?: COLOR.Color;
    size?: SIZE.Size;
    provider?: PROVIDER.Provider;
    categories?: CATEGORY.Category;
    price?: number;
    cost?: number;
    state?: string;
    images?: STATICFILE.Image[];
    shipping?: SHOP.Shipping;
    type?: string;
    stock?: Stock[];
  };

  type ResponsePaginate = {
    docs: Product[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    pagingCounter: number;
    prevPage: number;
    totalDocs: number;
    totalPages: number;
  };

  type SortProducts = {
    barcode?: number;
    changeable?: number;
    cost?: number;
    description?: number;
    price?: number;
    reference?: number;
    status?: number;
  };

  type FiltersGetProducts = {
    colorId?: string;
    sizeId?: string;
    limit?: number;
    page?: number;
    status?: string;
    name?: string;
    sort?: Partial<SortProducts>;
  };

  type Stock = {
    quantity?: number;
    warehouse?: WAREHOUSE.Warehouse;
  };
}
