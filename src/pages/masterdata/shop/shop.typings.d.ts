declare namespace SHOP {
  type Shipping = {
    width: number;
    height: number;
    long: number;
    weight: number;
    volume: number;
  };
  type Shop = {
    _id: string;
    name: string;
    defaultWarehouse: WAREHOUSE.warehouse;
  };
}
