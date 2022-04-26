declare namespace BRAND {
  type Brand = {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    user?: USER.User;
  };

  type ResponseBrands = {
    docs: Brand[];

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
}
