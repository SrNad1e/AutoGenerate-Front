declare namespace SIZE {
  type Size = {
    _id?: string;
    value?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    user?: USER.User;
  };

  type ResponsePaginate = {
    docs: Size[];

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
