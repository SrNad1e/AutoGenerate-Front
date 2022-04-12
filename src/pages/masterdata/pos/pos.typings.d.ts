declare namespace POS {
  type PointOfSale = {
    _id: string;
    authorization: AUTHORIZATION.AuthorizationDian;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    shop: SHOP.Shop;
    user: USER.User;
  };
}
