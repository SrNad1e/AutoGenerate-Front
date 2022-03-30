declare namespace USER {
  type User = {
    id: number;
    name: string;
    role: Role;
    shop: SHOP.shop;
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
}
