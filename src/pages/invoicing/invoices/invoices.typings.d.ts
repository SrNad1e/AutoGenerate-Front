declare namespace INVOICE {
  type Invoice = {
    id: string;
    active: boolean;
    authorization: AuthorizationDian;
    createdAt: Date;
    updatedAt: Date;
    customer: CUSTOMER.Customer;
    details: DetailInvoice[];
    number: number;
    payments: PaymentInvoice[];
    shop: SHOP.Shop;
    summary: SummaryInvoice;
    user: USER.User;
  };

  type AuthorizationDian = {
    id: string;
    prefix: string;
  };

  type DetailInvoice = {
    product: PRODUCT.Product;
    quantity: number;
  };

  type PaymentInvoice = {
    payment: PAYMENT.Payment;
    total: string;
  };

  type SummaryInvoice = {
    change: number;
    discount: number;
    subtotal: number;
    tax: number;
    total: number;
    totalPaid: number;
  };
}
