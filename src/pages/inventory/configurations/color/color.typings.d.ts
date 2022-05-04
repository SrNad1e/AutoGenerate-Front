declare namespace COLOR {
  type Color = {
    _id?: string;
    name?: string;
    html?: string;
    active?: boolean;
    name_internal?: string;
    image?: IMAGE.Image;
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
