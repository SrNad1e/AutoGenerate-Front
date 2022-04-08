declare namespace COLOR {
  type Color = {
    _id?: string;
    name?: string;
    html?: string;
    name_internal?: string;
  };

  type ResponsePaginate = {
    docs: Color[];

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
