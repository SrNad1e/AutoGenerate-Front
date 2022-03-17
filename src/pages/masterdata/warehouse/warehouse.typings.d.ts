declare namespace WAREHOUSE {
  type warehouse = {
    _id: string;
    name: string;
    shopId: number;
    active: boolean;
    id: number;
  };
  type Response = {
    docs: Warehouse[];
  };
}
