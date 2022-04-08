declare namespace WAREHOUSE {
  type Warehouse = {
    _id?: string;
    name?: string;
    shopId?: number;
    active?: boolean;
  };
  type Response = {
    docs: Warehouse[];
  };
}
