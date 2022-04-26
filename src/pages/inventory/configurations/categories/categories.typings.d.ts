declare namespace CATEGORY {
  type CategoryLevel1 = {
    _id?: string;
    name?: string;
    user?: USER.User;
    updatedAt?: string;
    createdAt?: string;
    key?: number;
  };

  type CategoryLevel2 = {
    _id: string;
    categoryParent: CategoryLevel1;
    name: string;
    user: USER.User;
    updatedAt: Date;
    createdAt: Date;
  };

  type CategoryLevel3 = {
    _id: string;
    categoryParent: CategoryLevel2;
    name: string;
    user: USER.User;
    createdAt: Date;
    updatedAt: Date;
  };

  type ResponsePaginate = {
    docs: CategoryLevel1[];

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
