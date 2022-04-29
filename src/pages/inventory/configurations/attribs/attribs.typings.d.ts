declare namespace ATTRIBS {
  type Attribs = {
    _id?: string;
    name?: string;
    user?: USER.User;
    createdAt?: Date;
    updatedAt?: Date;
    active?: boolean;
  };

  type ResponseAttribs = {
    docs: Attribs[];

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
