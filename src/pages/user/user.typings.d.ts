declare namespace USER {
  type User = {
    id: number;
    name: string;
    role: Role;
    shop: SHOP.shop;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    type: CustomerType;
    username: string;
    pointOfSale: PointOfSale;
  };
  type LoginParams = {
    username: string;
    password: string;
  };
  type Response = {
    user: User;
    access_token: string;
  };
  type Role = {
    name: string;
    permissions: Permission[];
  };

  type Permission = {
    name: string;
  };

  type CustomerType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    discount: number;
    name: string;
    user: User;
  };

  type PointOfSale = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    shop: SHOP.Shop;
    name: string;
    authorization: AuthorizationDian;
  };

  type AuthorizationDian = {
    id: string;
    prefix: string;
  };
}
