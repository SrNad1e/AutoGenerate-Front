declare namespace USER {
  type User = {
    id: number;
    name: string;
    permissions: Permission[];
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
  type Permission = {
    name: string;
  };
}
