declare namespace PRODUCT {
  type Product = {
    _id: string;
    reference: string;
    description: string;
    barcode: string;
    changeable: boolean;
    color: COLOR.Color;
    size: SIZE.Size;
    provider: PROVIDER.Provider;
    categories: CATEGORY.Category;
    price: number;
    cost: number;
    state: string;
    images: STATICFILE.Image[];
    shipping: SHOP.Shipping;
    type: string;
  };
}
