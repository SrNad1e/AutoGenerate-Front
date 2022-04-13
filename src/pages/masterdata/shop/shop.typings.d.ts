declare namespace SHOP {
  type Shop = {
    _id: string;
    name: string;
    defaultWarehouse: WAREHOUSE.warehouse;
  };
}
