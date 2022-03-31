declare namespace PAYMENT {
  type Payment = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    type: string;
    user: USER.User;
  };
}
