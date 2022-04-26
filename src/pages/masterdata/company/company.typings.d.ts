declare namespace COMPANY {
  type Company = {
    _id: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
    document?: string;
    logo?: string;
    name?: string;
    phone?: string;
    regimentSimplify?: boolean;
    user?: USER.User;
  };
}
