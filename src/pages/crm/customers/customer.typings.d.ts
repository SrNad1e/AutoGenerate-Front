declare namespace CUSTOMER {
  type Customer = {
    id: string;
    active: boolean;
    address: Address;
    assigningUser: USER.User;
    createdAt: Date;
    updatedAt: Date;
    document: string;
    documentType: DocumentType;
    email: string;
    firstName: string;
    isDefault: boolean;
    isWhatsapp: boolean;
    lastName: string;
    phone: number;
    type: CustomerType;
    user: USER.User;
  };

  type Address = {
    city: City;
    extra: string;
    field1: string;
    field2: string;
    isMain: boolean;
    loteNumber: number;
    number1: number;
    number2: number;
  };

  type CustomerType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    discount: number;
    name: string;
    user: USER.User;
  };

  type City = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    user: USER.User;
  };

  type DocumentType = {
    _id: string;
    abbreviation: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    user: USER.User;
  };
}
