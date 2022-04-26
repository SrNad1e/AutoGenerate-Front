declare namespace BRAND {
  type Brand = {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name?: string;
    user?: USER.User;
  };
}
