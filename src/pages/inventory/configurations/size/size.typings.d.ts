declare namespace SIZE {
  type Size = {
    _id?: string;
    value?: string;
    active?: boolean;
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
