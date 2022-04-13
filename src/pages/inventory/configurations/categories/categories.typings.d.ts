declare namespace CATEGORY {
  type CategoryLevel1 = {
    _id: string;
    name: string;
    user: USER.User;
    updatedAt: Date;
    createdeAt: Date;
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
}
