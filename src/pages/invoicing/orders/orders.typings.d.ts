declare namespace ORDER {
  type Order = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customer: CUSTOMER.Customer;
    details: DetailOrder[];
    invoice: INVOICE.Invoice;
    number: number;
    payments: PaymentOrder[];
    pointOfSale: POS.PointOfSale;
    shop: SHOP.Shop;
    status: string;
    summary: SummaryOrder;
    user: USER.User;
  };

  type DetailOrder = {
    createdAt: Date;
    updatedAt: Date;
    discount: number;
    price: number;
    product: PRODUCT.Product;
    quantity: number;
    status: string;
  };

  type PaymentOrder = {
    createdAt: Date;
    updatedAt: Date;
    payment: PAYMENT.Payment;
    total: number;
  };

  type SummaryOrder = {
    change: number;
    discount: number;
    subtotal: number;
    tax: number;
    total: number;
    totalPaid: number;
  };
}
