declare namespace PRODUCT {
  type Product = {
    _id?: string;
    reference?: Reference;
    barcode?: string;
    color?: COLOR.Color;
    size: SIZE.Size;
    status?: string;
    images?: STATICFILE.Image[];
    stock?: Stock[];
    createdAt?: Date;
    updatedAt?: Date;
  };

  type ResponsePaginate = {
    docs: Reference[];
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

  type Shipping = {
    width: number;
    height: number;
    long: number;
    weight: number;
    volume: number;
  };

  type Reference = {
    _id?: string;
    brand?: BRAND.Brand;
    changeable?: boolean;
    companies?: COMPANIES.Company;
    cost?: number;
    description?: string;
    name?: string;
    price?: number;
    shipping?: Shipping;
    user?: USER.User;
    createdAt?: Date;
    updatedAt?: Date;
    attribs?: ATTRIBS.Attribs;
    categoryLevel1?: CATEGORY.CategoryLevel1;
    categoryLevel2?: CATEGORY.CategoryLevel2;
    categoryLevel3?: CATEGORY.CategoryLevel3;
  };
}
