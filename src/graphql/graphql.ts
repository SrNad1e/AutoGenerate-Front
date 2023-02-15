import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export enum ActionDetailAdjustment {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export enum ActionDetailInput {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export enum ActionDetailOutput {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export enum ActionDetailRequest {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export enum ActionDetailTransfer {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export enum ActionPaymentsOrder {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

/** Opción del permiso */
export type ActionPermission = {
  __typename?: 'ActionPermission';
  /** Identificador del permiso */
  _id: Scalars['String'];
  /** Descripción del permiso */
  description: Scalars['String'];
  /** Nombre de la acción del permiso */
  name: Scalars['String'];
};

export enum ActionProductsOrder {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

/** Datos para agregar medios de pago al pedido */
export type AddPaymentsOrderInput = {
  /** Id del pedido que se requiere agreagar o editar productos */
  orderId: Scalars['String'];
  /** Medios de pago */
  payments: PaymentsOrderInput[];
};

/** Datos para agregar productos al pedido */
export type AddProductsOrderInput = {
  /** Productos a crear o actualizar */
  details: DetailAddProductsOrderInput[];
  /** El pedido es mayorista */
  isWholesaler?: InputMaybe<Scalars['Boolean']>;
  /** Id del pedido que se requiere agreagr o editar productos */
  orderId: Scalars['String'];
};

/** Dirección del cliente */
export type Address = {
  __typename?: 'Address';
  /** Ciudad a la que pertenece */
  city: City;
  /** Contacto para el envío */
  contact: Scalars['String'];
  /** Datos extra de la dirección */
  extra?: Maybe<Scalars['String']>;
  /** Tipo de ubicación (Calle, Avenida, Manzana, Etc) */
  field1: Scalars['String'];
  /** Define si la dirección es la principal */
  isMain?: Maybe<Scalars['Boolean']>;
  /** Número de la casa */
  loteNumber: Scalars['String'];
  /** Barrio */
  neighborhood: Scalars['String'];
  /** Número del field1 */
  number1: Scalars['String'];
  /** Número del field2 */
  number2: Scalars['String'];
  /** Teléfono del contacto */
  phone: Scalars['String'];
  /** Código postal */
  postalCode?: Maybe<Scalars['String']>;
};

/** Dirección del cliente */
export type AddressInput = {
  /** Identificador de la ciudad */
  cityId: Scalars['String'];
  /** Contacto para el envío */
  contact: Scalars['String'];
  /** Datos extra de la dirección */
  extra?: InputMaybe<Scalars['String']>;
  /** Tipo de ubicación (Calle, Avenida, Manzana, Etc) */
  field1: Scalars['String'];
  /** Define si la dirección es la principal */
  isMain?: InputMaybe<Scalars['Boolean']>;
  /** Número de la casa */
  loteNumber: Scalars['String'];
  /** Barrio */
  neighborhood: Scalars['String'];
  /** Número del field1 */
  number1: Scalars['String'];
  /** Número del field2 */
  number2: Scalars['String'];
  /** Teléfono del contacto */
  phone: Scalars['String'];
};

/** Dirección del cliente */
export type AddressInputOrder = {
  /** Ciudad de envío */
  city: CityInput;
  /** Contacto para el envío */
  contact: Scalars['String'];
  /** Datos extra de la dirección */
  extra?: InputMaybe<Scalars['String']>;
  /** Tipo de ubicación (Calle, Avenida, Manzana, Etc) */
  field1: Scalars['String'];
  /** Define si la dirección es la principal */
  isMain?: InputMaybe<Scalars['Boolean']>;
  /** Número de la casa */
  loteNumber: Scalars['String'];
  /** Barrio */
  neighborhood: Scalars['String'];
  /** Número del field1 */
  number1: Scalars['String'];
  /** Número del field2 */
  number2: Scalars['String'];
  /** Teléfono del contacto */
  phone: Scalars['String'];
};

/** Atributo del producto */
export type Attrib = {
  __typename?: 'Attrib';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Está activo */
  active: Scalars['Boolean'];
  /** Fecha de creación de la atributo */
  createdAt: Scalars['DateTime'];
  /** Nombre de la atributo */
  name: Scalars['String'];
  /** Fecha de actualización de la atributo */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la atributo */
  user: User;
};

/** Autorizacion DIAN de la tienda */
export type AuthorizationDian = {
  __typename?: 'AuthorizationDian';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Compañía a la que pertenece la autorización */
  company: Scalars['String'];
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Fecha de finalización de la resolución */
  dateFinal?: Maybe<Scalars['DateTime']>;
  /** Fecha de inicio de la resolución */
  dateInitial?: Maybe<Scalars['DateTime']>;
  /** Última fecha de facturación */
  lastDateInvoicing?: Maybe<Scalars['DateTime']>;
  /** Ultimo numero usado para facturar */
  lastNumber: Scalars['Float'];
  /** Numero final de la resolución */
  numberFinal?: Maybe<Scalars['Float']>;
  /** Numero inicial de la resolución */
  numberInitial?: Maybe<Scalars['Float']>;
  /** Prefijo de autorización */
  prefix: Scalars['String'];
  /** Si es una habilitación true */
  qualification: Scalars['Boolean'];
  /** Resolución de la autorización o de la habilitación */
  resolution?: Maybe<Scalars['String']>;
  /** Tienda a la que pertenece */
  shop: Shop;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó la autorización de facturación */
  user: User;
};

/** Caja donde se deposita el dinero */
export type Box = {
  __typename?: 'Box';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Base de la caja */
  base: Scalars['Float'];
  /** Empresa a la que perteneces la caja */
  company: Company;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Caja principal de la empresa */
  isMain: Scalars['Boolean'];
  /** Nombre de la caja */
  name: Scalars['String'];
  /** Total de dinero en la caja sin contar la base */
  total: Scalars['Float'];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó la caja */
  user: User;
};

/** Marca del producto */
export type Brand = {
  __typename?: 'Brand';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Esta activa la marca */
  active: Scalars['Boolean'];
  /** Fecha de creación de la marca */
  createdAt: Scalars['DateTime'];
  /** Nombre de la marca */
  name: Scalars['String'];
  /** Fecha de actualización de la marca */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la marca */
  user: User;
};

/** Arqueo de caja */
export type CashRegister = {
  __typename?: 'CashRegister';
  /** Billete o moneda de $ 1.000 */
  B1000: Scalars['Float'];
  /** Billete de $ 2.000 */
  B2000: Scalars['Float'];
  /** Billete de $ 5.000 */
  B5000: Scalars['Float'];
  /** Billete de $ 10.000 */
  B10000: Scalars['Float'];
  /** Billete de $ 20.000 */
  B20000: Scalars['Float'];
  /** Billete de $ 50.000 */
  B50000: Scalars['Float'];
  /** Billete de $ 100.000 */
  B100000: Scalars['Float'];
  /** Moneda de 50 */
  M50: Scalars['Float'];
  /** Moneda de $ 100 */
  M100: Scalars['Float'];
  /** Moneda de $ 200 */
  M200: Scalars['Float'];
  /** Moneda de $ 500 */
  M500: Scalars['Float'];
};

/** Arqueo de caja */
export type CashRegisterInput = {
  /** Billete o moneda de $ 1.000 */
  B1000: Scalars['Float'];
  /** Billete de $ 2.000 */
  B2000: Scalars['Float'];
  /** Billete de $ 5.000 */
  B5000: Scalars['Float'];
  /** Billete de $ 10.000 */
  B10000: Scalars['Float'];
  /** Billete de $ 20.000 */
  B20000: Scalars['Float'];
  /** Billete de $ 50.000 */
  B50000: Scalars['Float'];
  /** Billete de $ 100.000 */
  B100000: Scalars['Float'];
  /** Moneda de 50 */
  M50: Scalars['Float'];
  /** Moneda de $ 100 */
  M100: Scalars['Float'];
  /** Moneda de $ 200 */
  M200: Scalars['Float'];
  /** Moneda de $ 500 */
  M500: Scalars['Float'];
};

/** Categoría del producto nivel 1 */
export type CategoryLevel1 = {
  __typename?: 'CategoryLevel1';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Nombre de la categoría */
  childs?: Maybe<CategoryLevel2[]>;
  /** Fecha de creación de la categoría */
  createdAt: Scalars['DateTime'];
  /** Nombre de la categoría */
  name: Scalars['String'];
  /** Fecha de actualización de la categoría */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la categoría */
  user: User;
};

/** Categoría del producto nivel 2 */
export type CategoryLevel2 = {
  __typename?: 'CategoryLevel2';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Categorías inferiores */
  childs?: Maybe<CategoryLevel3[]>;
  /** Fecha de creación de la categoría */
  createdAt: Scalars['DateTime'];
  /** Nombre de la categoría */
  name?: Maybe<Scalars['String']>;
  /** Identificador de la categoría padre */
  parentId?: Maybe<Scalars['String']>;
  /** Fecha de actualización de la categoría */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la categoría */
  user: User;
};

/** Categoría del producto nivel 3 */
export type CategoryLevel3 = {
  __typename?: 'CategoryLevel3';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Fecha de creación de la categoría */
  createdAt: Scalars['DateTime'];
  /** Nombre de la categoría */
  name?: Maybe<Scalars['String']>;
  /** Identificador de la categoría padre */
  parentId?: Maybe<Scalars['String']>;
  /** Fecha de actualización de la categoría */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la categoría */
  user: User;
};

/** Ciudad de la dirección */
export type City = {
  __typename?: 'City';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Código DANE */
  code: Scalars['String'];
  /** País */
  country: Country;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Código postal */
  defaultPostalCode: Scalars['String'];
  /** Nombre de la ciudad */
  name: Scalars['String'];
  /** Departamento */
  state: Scalars['String'];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó la ciudad */
  user: User;
  /** Zona a la que pertenece la ciudad */
  zone: ZoneType;
};

/** Ciudad entrada */
export type CityInput = {
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** País */
  country: CountryInput;
  /** Fecha de creación */
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** Nombre de la ciudad */
  name: Scalars['String'];
  /** Departamento */
  state: Scalars['String'];
  /** Fecha de actualización */
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

/** Cierre X de facturación */
export type CloseXInvoicing = {
  __typename?: 'CloseXInvoicing';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Listado de billetes y monedas registrados */
  cashRegister: CashRegister;
  /** Fecha de cierre */
  closeDate: Scalars['DateTime'];
  /** Compañía a la que pertence el cierre */
  company: Company;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Egresos del día */
  expenses?: Maybe<Expense[]>;
  /** Número consecutivo */
  number: Scalars['Float'];
  /** Listado de pagos */
  payments?: Maybe<PaymentOrderClose[]>;
  /** Medios de pago usados para cruzar créditos */
  paymentsCredit?: Maybe<PaymentCredit[]>;
  /** Punto de venta que registra el cierre */
  pointOfSale: PointOfSale;
  /** Transacciones reportadas por el usuario */
  quantityBank: Scalars['Float'];
  /** Devoluciones generadas */
  refunds?: Maybe<RefundOrderClose>;
  /** Datos de las ordenes */
  summaryOrder: SummaryOrderClose;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el cierre */
  user: User;
};

/** Cierre Z de facturación */
export type CloseZInvoicing = {
  __typename?: 'CloseZInvoicing';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Listado de billetes y monedas registrados */
  cashRegister: CashRegister;
  /** Fecha de cierre */
  closeDate: Scalars['DateTime'];
  /** Compañía a la que pertence el cierre */
  company: Company;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Egresos del día */
  expenses?: Maybe<Expense[]>;
  /** Número consecutivo */
  number: Scalars['Float'];
  /** Listado de pagos */
  payments?: Maybe<PaymentOrderClose[]>;
  /** Medios de pago usados para cruzar créditos */
  paymentsCredit?: Maybe<PaymentCredit[]>;
  /** Punto de venta que registra el cierre */
  pointOfSale: PointOfSale;
  /** Transacciones reportadas por el usuario */
  quantityBank: Scalars['Float'];
  /** Devoluciones generadas */
  refunds?: Maybe<RefundOrderClose>;
  /** Datos de las ordenes */
  summaryOrder: SummaryOrderClose;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el cierre */
  user: User;
};

/** Color del producto */
export type Color = {
  __typename?: 'Color';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Estado del color */
  active: Scalars['Boolean'];
  /** Fecha de creación del color */
  createdAt: Scalars['DateTime'];
  /** Color en formato html */
  html: Scalars['String'];
  /** Imagen del color */
  image?: Maybe<Image>;
  /** Nombre del color */
  name: Scalars['String'];
  /** Nombre interno del color */
  name_internal: Scalars['String'];
  /** Fecha de actualización del color */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea el color */
  user: User;
};

/** Combinaciones de color y talla */
export type CombinationInput = {
  /** Identificador del color */
  colorId: Scalars['String'];
  /** Identificadores de las imagenes */
  imageIds?: InputMaybe<Scalars['String'][]>;
  /** Identificador de la talla */
  sizeId: Scalars['String'];
};

/** Empresa */
export type Company = {
  __typename?: 'Company';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Esta activa la compañía */
  active: Scalars['Boolean'];
  /** Dirección de la compañía */
  address: Scalars['String'];
  /** Fecha de creación de la compañia */
  createdAt: Scalars['DateTime'];
  /** Documento de la compañía */
  document: Scalars['String'];
  /** Correo de la compañia */
  email: Scalars['String'];
  /** Url del logo de la compañía */
  logo: Scalars['String'];
  /** Nombre de la compañía */
  name: Scalars['String'];
  /** Teléfono de la compañía */
  phone: Scalars['String'];
  /** Si pertenece al régimen simplificado */
  regimenSimplify: Scalars['Boolean'];
  /** Fecha de actualización de la compañia */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la compañia */
  user: User;
};

/** Datos para confirmar productos */
export type ConfirmPaymentsOrderInput = {
  /** Identificador del pedido a confirmar los pagos */
  orderId: Scalars['String'];
  /** Pagos a confirmar */
  payments: PaymentConfirm[];
};

/** Datos para confirmar productos */
export type ConfirmProductsOrderInput = {
  /** Productos a confirmar */
  details: DetailsConfirm[];
  /** Identificador del pedido a confirmar productos */
  orderId: Scalars['String'];
};

/** Datos para confirmar los productos del traslado */
export type ConfirmStockTransferInput = {
  /** Productos para confirmar */
  details: DetailConfirmStockTransferInput[];
};

/** Modelo para la transportadora */
export type Conveyor = {
  __typename?: 'Conveyor';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Fecha de creación de la transportadora */
  createdAt: Scalars['DateTime'];
  /** Precio por defecto */
  defaultPrice: Scalars['Float'];
  /** Logo de la tranportadora */
  logo: Image;
  /** Mensaje para el usuario */
  message?: Maybe<Scalars['String']>;
  /** Nombre de la transportadora */
  name: Scalars['String'];
  /** Precios por región solo para type ZONE */
  rates?: Maybe<RatesRegion[]>;
  /** Tipo de transportadora */
  type: ConveyorType;
  /** Fecha de actualización de la transportadora */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la transportadora */
  user: User;
};

/** Transportadora que realiza el envio */
export type ConveyorOrder = {
  __typename?: 'ConveyorOrder';
  /** Datos del transportista */
  conveyor: Conveyor;
  /** Error del médio de pago */
  error?: Maybe<Scalars['String']>;
  /** Código de la guia del transportista */
  guideCode?: Maybe<Scalars['String']>;
  /** Fecha en el que se realiza el envío */
  shippingDate?: Maybe<Scalars['DateTime']>;
  /** Valor del envío */
  value: Scalars['Float'];
};

export enum ConveyorType {
  Fedex = 'FEDEX',
  Interrapidisimo = 'INTERRAPIDISIMO',
  Zone = 'ZONE',
}

/** Pais */
export type Country = {
  __typename?: 'Country';
  /** Nombre del país */
  name: Scalars['String'];
  /** Prefijo del país */
  prefix: Scalars['String'];
};

/** País entrada */
export type CountryInput = {
  /** Nombre del país */
  name: Scalars['String'];
};

/** Cupones para pagos */
export type Coupon = {
  __typename?: 'Coupon';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Código para redención del cupón */
  code: Scalars['String'];
  /** Consecutivo del cupón */
  company: Company;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Fecha de vencimiento del cupón */
  expiration: Scalars['DateTime'];
  /** Mensaje del pie del cupón */
  message: Scalars['String'];
  /** Consecutivo del cupón */
  number: Scalars['Float'];
  /** Estado del cupón */
  status: StatusCoupon;
  /** Título del cupón */
  title: Scalars['String'];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el cupón */
  user: User;
  /** Valor de redención del cupón */
  value: Scalars['Float'];
};

/** Datos para crear un atributo */
export type CreateAttribInput = {
  /** Nombre del atributo */
  name: Scalars['String'];
};

/** Datos para la creación de una autorización */
export type CreateAuthorizationInput = {
  /** Fecha de finalización de la resolución */
  dateFinal?: InputMaybe<Scalars['DateTime']>;
  /** Fecha de inicio de la resolución */
  dateInitial?: InputMaybe<Scalars['DateTime']>;
  /** Numero final de la resolución */
  numberFinal?: InputMaybe<Scalars['Float']>;
  /** Numero inicial de la resolución */
  numberInitial?: InputMaybe<Scalars['Float']>;
  /** Prefijo de facturación */
  prefix: Scalars['String'];
  /** Si es una habilitación true */
  qualification?: InputMaybe<Scalars['Boolean']>;
  /** resolución de facturacion */
  resolution?: InputMaybe<Scalars['String']>;
  /** Id de la tienda */
  shopId: Scalars['String'];
};

/** Datos para crear la caja */
export type CreateBoxInput = {
  /** Cantidad de la base para la caja */
  base: Scalars['Float'];
  /** Es caja principal de la compañía */
  isMain?: InputMaybe<Scalars['Boolean']>;
  /** Nombre de la caja */
  name: Scalars['String'];
};

/** Datos para crear una marca */
export type CreateBrandInput = {
  /** Nombre de la marca */
  name: Scalars['String'];
};

/** Datos para la creación de una categoría */
export type CreateCategoryInput = {
  /** Nivel de la categoría */
  level: Scalars['Float'];
  /** Nombre de la categoría */
  name: Scalars['String'];
  /** Identificador de la categoría padre */
  parentId?: InputMaybe<Scalars['String']>;
};

/** Datos para crear una ciudad */
export type CreateCityInput = {
  /** Código DANE */
  code: Scalars['String'];
  /** Nombre del país */
  countryName: Scalars['String'];
  /** Prefijo del país */
  countryPrefix: Scalars['String'];
  /** Código postal de la ciudad por defecto */
  defaultPostalCode: Scalars['String'];
  /** Nombre de la ciudad */
  name: Scalars['String'];
  /** Nombre del departamento */
  state: Scalars['String'];
  /** Tipo de zona */
  zone: ZoneType;
};

/** Datos para crear un cierre X */
export type CreateCloseXInvoicingInput = {
  /** Listado de cash reportado */
  cashRegister: CashRegisterInput;
  /** Fecha del cierre */
  closeDate: Scalars['String'];
  /** Identificador del punto de venta */
  pointOfSaleId: Scalars['String'];
  /** Cantidad de trasnferencias reportadas */
  quantityBank: Scalars['Float'];
};

/** Datos para crear un cierre Z */
export type CreateCloseZInvoicingInput = {
  /** Listado de cash reportado */
  cashRegister: CashRegisterInput;
  /** Fecha del cierre */
  closeDate: Scalars['String'];
  /** Identificador del punto de venta */
  pointOfSaleId: Scalars['String'];
  /** Cantidad de trasnferencias reportadas */
  quantityBank: Scalars['Float'];
};

/** Datos para crear un color */
export type CreateColorInput = {
  /** Url asignado al color */
  html: Scalars['String'];
  /** Identificador de la imagen asignada al color */
  imageId?: InputMaybe<Scalars['String']>;
  /** Nombre asignado al color */
  name: Scalars['String'];
  /** Nombre interno asignado al color */
  name_internal: Scalars['String'];
};

/** Datos para crear empresa */
export type CreateCompanyInput = {
  /** Dirección de la empresa */
  address: Scalars['String'];
  /** Documento de la empresa */
  document: Scalars['String'];
  /** Email de la empresa */
  email: Scalars['String'];
  /** Url del logo de la empresa */
  logo: Scalars['String'];
  /** Nombre de la empresa */
  name: Scalars['String'];
  /** Teléfono de la empresa */
  phone: Scalars['String'];
  /** Si pertenece al régimen simplificado */
  regimenSimplify?: InputMaybe<Scalars['Boolean']>;
};

/** Datos para la creación del cupón */
export type CreateCouponInput = {
  /** Fecha de expiración para el cupón */
  expiration: Scalars['DateTime'];
  /** Mensaje del cupón */
  message: Scalars['String'];
  /** Titulo del cupón */
  title: Scalars['String'];
  /** Monto para crear el cupón */
  value: Scalars['Float'];
};

/** Datos para crear un crédito */
export type CreateCreditInput = {
  /** Monto de crédigo aprobado */
  amount: Scalars['Float'];
  /** Identificador del cliente al que se le va a asignar el crédito */
  customerId: Scalars['String'];
};

/** Datos para crear un cliente */
export type CreateCustomerInput = {
  /** Direcciones del cliente */
  addresses?: InputMaybe<AddressInput[]>;
  /** Fecha de nacimiento */
  birthday?: InputMaybe<Scalars['DateTime']>;
  /** Identificación de tipo de cliente */
  customerTypeId?: InputMaybe<Scalars['String']>;
  /** Número de documento */
  document: Scalars['String'];
  /** Identificación del tipo de documento */
  documentTypeId: Scalars['String'];
  /** Correo del cliente */
  email?: InputMaybe<Scalars['String']>;
  /** Nombres del cliente */
  firstName: Scalars['String'];
  /** Es el cliente por defecto, solo debe existir uno */
  isDefault?: InputMaybe<Scalars['Boolean']>;
  /** El teléfono tiene whatsapp */
  isWhatsapp?: InputMaybe<Scalars['Boolean']>;
  /** Apellidos del cliente */
  lastName: Scalars['String'];
  /** Número de teléfono */
  phone?: InputMaybe<Scalars['String']>;
};

/** Datos para crear un descuento */
export type CreateDiscountRuleInput = {
  /** Fecha final para aplicar el descuento */
  dateFinal: Scalars['String'];
  /** Fecha inicial para aplicar el descuento */
  dateInitial: Scalars['String'];
  /** Nombre del descuento */
  name: Scalars['String'];
  /** Porcentaje del descuento */
  percent?: InputMaybe<Scalars['Float']>;
  /** Reglas a aplicar */
  rules: RuleInput[];
  /** Valor del descuento */
  value?: InputMaybe<Scalars['Float']>;
};

/** Datos para crear Egreso */
export type CreateExpenseInput = {
  /** Identificador de la caja */
  boxId: Scalars['String'];
  /** Descripción del pago */
  concept?: InputMaybe<Scalars['String']>;
  /** Valor del egreso */
  value: Scalars['Float'];
};

/** Datos para crear el pedido */
export type CreateOrderInput = {
  /** Estado del pedido */
  status: StatusOrder;
};

/** Datos para crear un método de pago */
export type CreatePaymentInput = {
  /** Color en html que representa el método de pago  */
  color?: InputMaybe<Scalars['String']>;
  /** Identificador de la imagen del método de pago */
  logoId?: InputMaybe<Scalars['String']>;
  /** Mensaje para el medio de pago */
  message?: InputMaybe<Scalars['String']>;
  /** Nombre del método de pago */
  name: Scalars['String'];
  /** Identificador de tiendas que usan el método de pago */
  shopIds: Scalars['String'][];
  /** Tipo de método de pago */
  type: TypePayment;
};

/** Datos para crear un punto de venta */
export type CreatePointOfSaleInput = {
  /** Identificador de la autorización de facturación */
  autorizationId: Scalars['String'];
  /** Identificador de la caja asignada */
  boxId: Scalars['String'];
  /** Nombre del punto de venta */
  name: Scalars['String'];
  /** Identificador de la tienda a la que pertence */
  shopId: Scalars['String'];
};

/** Datos para crear un producto */
export type CreateProductInput = {
  /** Identificador del producto */
  colorId: Scalars['String'];
  /** Identificador de las imagenes del producto */
  imagesId?: InputMaybe<Scalars['String'][]>;
  /** Identificador de la referencia */
  referenceId: Scalars['String'];
  /** Identificador del producto */
  sizeId: Scalars['String'];
};

/** Datos para crear un recibo de caja */
export type CreateReceiptInput = {
  /** Identificador de la caja que va a afectar */
  boxId: Scalars['String'];
  /** Concepto del recibo */
  concept: Scalars['String'];
  /** Pedidos a los que afecta el recibo */
  details?: InputMaybe<DetailReceiptOrder[]>;
  /** Cruza crédito el recibo */
  isCredit: Scalars['Boolean'];
  /** Identificador del medio de pago */
  paymentId: Scalars['String'];
  /** Identificador del punto de venta */
  pointOfSaleId: Scalars['String'];
  /** Valor del recibo */
  value: Scalars['Float'];
};

/** Datos para crear una referencia */
export type CreateReferenceInput = {
  /** Estado de la referencia */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Atributos de la referencia */
  attribIds?: InputMaybe<Scalars['String'][]>;
  /** Marca de la referencia */
  brandId: Scalars['String'];
  /** Categoría nivel 1 de la referencia */
  categoryLevel1Id: Scalars['String'];
  /** Categoría nivel 2 de la referencia */
  categoryLevel2Id?: InputMaybe<Scalars['String']>;
  /** Categoría nivel 3 de la referencia */
  categoryLevel3Id?: InputMaybe<Scalars['String']>;
  /** Se puede cambiar */
  changeable?: InputMaybe<Scalars['Boolean']>;
  /** Combinaciones de talla y color para crear los productos */
  combinations?: InputMaybe<CombinationInput[]>;
  /** Costo de la referencia */
  cost: Scalars['Float'];
  /** Descripción de la referencia */
  description: Scalars['String'];
  /** Alto del producto */
  height: Scalars['Float'];
  /** Largo del producto */
  long: Scalars['Float'];
  /** Nombre de la referencia */
  name: Scalars['String'];
  /** Precio de la referencia */
  price: Scalars['Float'];
  /** Volumen del producto */
  volume: Scalars['Float'];
  /** Peso del producto */
  weight: Scalars['Float'];
  /** Ancho del producto */
  width: Scalars['Float'];
};

export type CreateReturnOrderInput = {
  /** Productos que se devuelven del pedido */
  details: DetailReturnInput[];
  /** Pedido al que afecta la devolución */
  orderId: Scalars['String'];
};

/** Datos para la creación de un rol */
export type CreateRoleInput = {
  /** Estado del rol */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Habilita para que el usuario pueda consulta cualquier bodega */
  changeWarehouse?: InputMaybe<Scalars['Boolean']>;
  /** Nombre del rol */
  name: Scalars['String'];
  /** Identificadores de los permisos asignados */
  permissionIds: Scalars['String'][];
};

/** Datos para la creación de la tienda */
export type CreateShopInput = {
  /** Dirección de la tienda */
  address: Scalars['String'];
  /** Nombre comercial de la tienda */
  companyName?: InputMaybe<Scalars['String']>;
  /** Identificador de la bodega predeterminada para la tienda */
  defaultWarehouseId: Scalars['String'];
  /** Documento de la tienda */
  document?: InputMaybe<Scalars['String']>;
  /** Email de la tienda */
  email?: InputMaybe<Scalars['String']>;
  /** Meta asiganda a la tienda */
  goal?: InputMaybe<Scalars['Float']>;
  /** Es centro de distribución */
  isMain?: InputMaybe<Scalars['Boolean']>;
  /** Nombre de la tienda */
  name: Scalars['String'];
  /** Teléfono de la tienda */
  phone?: InputMaybe<Scalars['String']>;
  /** Identificador de la bodega de centro de distribución asignado */
  warehouseMainId?: InputMaybe<Scalars['String']>;
};

/** Datos para crear una talla */
export type CreateSizeInput = {
  /** Valor asignado a la talla */
  value: Scalars['String'];
  /** Posición del ordenamiento */
  weight: Scalars['Float'];
};

/** Datos para crear el ajuste de productos */
export type CreateStockAdjustmentInput = {
  /** Productos del ajuste */
  details: DetailStockAdjustmentCreateInput[];
  /** Observación del que realiza el ajuste */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado del ajuste */
  status?: InputMaybe<StatusStockAdjustment>;
  /** Identificador de la bodega para el ajuste */
  warehouseId: Scalars['String'];
};

/** Datos para crear la entrada de productos */
export type CreateStockInputInput = {
  /** Productos de la entrada */
  details: DetailStockInputCreateInput[];
  /** Observación del que realiza la entrada */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la entrada */
  status?: InputMaybe<StatusStockInput>;
  /** Identificador de la bodega para la entrada */
  warehouseId: Scalars['String'];
};

/** Datos para crear la salida de productos */
export type CreateStockOutputInput = {
  /** Productos de la salida */
  details: DetailStockOutputCreateInput[];
  /** Observación del que realiza la salida */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la salida */
  status?: InputMaybe<StatusStockOutput>;
  /** Identificador de la bodega para la salida */
  warehouseId: Scalars['String'];
};

/** Datos para crear la solicitud de productos */
export type CreateStockRequestInput = {
  /** Productos de la solicitud */
  details: DetailStockRequestCreateInput[];
  /** Observación de la solicitud */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la solicitud */
  status?: InputMaybe<StatusStockRequest>;
  /** Identificador de la bodega de destino de la solicitud */
  warehouseDestinationId: Scalars['String'];
  /** Identificador de la bodega de origen de la solicitud */
  warehouseOriginId: Scalars['String'];
};

/** Productos para marcar agregados para el historial */
export type CreateStockTransferInput = {
  /** Productos del traslado */
  details: DetailStockTransferCreateInput[];
  /** Observación del que realiza el traslado */
  observationOrigin?: InputMaybe<Scalars['String']>;
  /** Solicitudes usadas */
  requests?: InputMaybe<Scalars['String'][]>;
  /** Estado del traslado */
  status?: InputMaybe<StatusStockTransfer>;
  /** Identificador de la bodega de destino del traslado */
  warehouseDestinationId: Scalars['String'];
  /** Identificador de la bodega de origen del traslado */
  warehouseOriginId: Scalars['String'];
};

/** Datos para la creación de un usuario */
export type CreateUserInput = {
  /** Identificador del cliente asignado al usuario */
  customerId?: InputMaybe<Scalars['String']>;
  /** Identifica si el usuario es web */
  isWeb?: InputMaybe<Scalars['Boolean']>;
  /** Nombre del usuario */
  name: Scalars['String'];
  /** Contraseña de usuario */
  password?: InputMaybe<Scalars['String']>;
  /** Identificador del punto de venta asignado al usuario */
  pointOfSaleId?: InputMaybe<Scalars['String']>;
  /** Identificador del rol del usuario */
  roleId: Scalars['String'];
  /** Identificador de la tienda asignada al usuario */
  shopId: Scalars['String'];
  /** Estado del usuario */
  status?: InputMaybe<StatusUser>;
  /** Usuario registrado */
  username?: InputMaybe<Scalars['String']>;
};

/** Datos para la creacion de una bodega */
export type CreateWarehouseInput = {
  /** Inventario máximo de productos */
  max: Scalars['Float'];
  /** Inventario mínimo de productos */
  min: Scalars['Float'];
  /** Nombre de la bodega */
  name: Scalars['String'];
};

/** Crédito del cliente */
export type Credit = {
  __typename?: 'Credit';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Monto habilitado para el crédito */
  amount: Scalars['Float'];
  /** Monto disponible para el crédito */
  available: Scalars['Float'];
  /** Monto usado del crédito */
  balance: Scalars['Float'];
  /** Compañía a la que pertenece el crédito */
  company: Scalars['String'];
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Cliente al que pertenece el crédito */
  customer: Customer;
  /** Detalle de la afectación del crédito */
  details?: Maybe<DetailCredit[]>;
  /** Monto congelado que no ha sido finalizado */
  frozenAmount: Scalars['Float'];
  /** Estado del crédito */
  status: StatusCredit;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó la cartera */
  user: User;
};

/** Crédito del cliente */
export type CreditHistory = {
  __typename?: 'CreditHistory';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Valor del movimiento */
  amount: Scalars['Float'];
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Crédito que genera el movimiento */
  credit: Credit;
  /** Número del documento que relaiza el proceso del pedido */
  documentNumber?: Maybe<Scalars['Float']>;
  /** Tipo de documento que genera el movimiento */
  documentType?: Maybe<TypeDocument>;
  /** Tipo de movimiento de cartera */
  type: TypeCreditHistory;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o edito el historial */
  user: User;
};

/** Cliente */
export type Customer = {
  __typename?: 'Customer';
  /** Fecha de mayorista */
  WolesalerDate?: Maybe<Scalars['DateTime']>;
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Se encuentra activo el usuario */
  active: Scalars['Boolean'];
  /** Direcciones del cliente */
  addresses?: Maybe<Address[]>;
  /** Fecha de nacimiento */
  birthday?: Maybe<Scalars['DateTime']>;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Tipo de cliente */
  customerType: CustomerType;
  /** Número de documento */
  document: Scalars['String'];
  /** Tipo de documento */
  documentType: DocumentType;
  /** Número telefónico tiene whatsapp */
  email?: Maybe<Scalars['String']>;
  /** Nombres del cliente */
  firstName: Scalars['String'];
  /** Cliente por defecto */
  isDefault: Scalars['Boolean'];
  /** Número telefonico tiene whatsapp */
  isWhatsapp: Scalars['Boolean'];
  /** Apellidos del cliente */
  lastName: Scalars['String'];
  /** Número telefónico del cliente */
  phone?: Maybe<Scalars['String']>;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el cliente */
  user: User;
};

/** Ventas de tipos de clientes */
export type CustomerSalesReport = {
  __typename?: 'CustomerSalesReport';
  /** Cantidad de ventas */
  quantity: Scalars['Float'];
  /** Valor total de las ventas */
  total: Scalars['Float'];
  /** Tipo de cliente */
  typeCustomer: CustomerType;
};

/** Tipos de clientes */
export type CustomerType = {
  __typename?: 'CustomerType';
  /** Identificación de mongo */
  _id: Scalars['String'];
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Nombre del tipo de cliente */
  name: Scalars['String'];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el tipo de cliente */
  user: User;
};

/** Cierre diario */
export type DailyClosing = {
  __typename?: 'DailyClosing';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Fecha de cierre */
  closeDate: Scalars['DateTime'];
  /** Compañía a la que pertence el cierre */
  company: Company;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Facturas del cierre */
  invoices: Invoice[];
  /** Punto de venta que registra el cierre */
  pointOfSale: PointOfSale;
  /** Resumen del cierre */
  summary: SummaryClose;
  /** Resumen de pagos del cierre */
  summaryPayments: SummaryPayment[];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el cierre */
  user: User;
};

/** Datos para generar la facturación */
export type DataGenerateInvoicesInput = {
  /** Efectivo para facturar */
  cash: Scalars['Float'];
  /** Fecha final para la facturación */
  dateFinal: Scalars['String'];
  /** Fecha inicial para la facturación */
  dateInitial: Scalars['String'];
  /** Identificador de la tienda a facturar */
  shopId: Scalars['String'];
};

/** Detalle para agregar al crédito */
export type DetailAddCredit = {
  /** Pedido que afecta la cartera */
  orderId: Scalars['String'];
  /** Valor que afecta la cartera */
  total: Scalars['Float'];
  /** Tipo de movimiento */
  type: TypeCreditHistory;
};

/** Producto que se va a agregar */
export type DetailAddProductsOrderInput = {
  /** Acción a realizar con el producto */
  action: ActionProductsOrder;
  /** Identificador Producto agregado al pedido */
  productId: Scalars['String'];
  /** Cantidad de producto agregado */
  quantity: Scalars['Float'];
};

/** Detalle de ajuste de productos */
export type DetailAdjustment = {
  __typename?: 'DetailAdjustment';
  /** Fecha de agregado del deltalle al ajuste */
  createdAt: Scalars['DateTime'];
  /** Producto de la ajuste */
  product: Product;
  /** Cantidad de producto */
  quantity: Scalars['Float'];
  /** Fecha de actualización del detalle al ajuste */
  updatedAt: Scalars['DateTime'];
};

/** Producto a confirmar en el traslado */
export type DetailConfirmStockTransferInput = {
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Detalle del crédito */
export type DetailCredit = {
  __typename?: 'DetailCredit';
  /** Monto pendiente en el pedido */
  balance: Scalars['Float'];
  /** Pedido que reporta el crédito */
  order: Order;
  /** Monto total del pedido en crédito */
  total: Scalars['Float'];
};

/** Detalle de la salida de productos */
export type DetailInput = {
  __typename?: 'DetailInput';
  /** Fecha de agregado del deltalle a la entrada */
  createdAt: Scalars['DateTime'];
  /** Producto de la entrada */
  product: Product;
  /** Cantidad de producto */
  quantity: Scalars['Float'];
  /** Fecha de actualización del detalle a la entrada */
  updatedAt: Scalars['DateTime'];
};

/** Productos de la factura */
export type DetailInvoice = {
  __typename?: 'DetailInvoice';
  /** Descuento del producto en la factura */
  discount: Scalars['Float'];
  /** Precio del producto en la factura */
  price: Scalars['Float'];
  /** Producto agregado a la factura */
  product: Product;
  /** Cantidad de productos en la factura */
  quantity: Scalars['Float'];
  /** Impuestos */
  tax: Scalars['Float'];
};

/** Productos del pedido */
export type DetailOrder = {
  __typename?: 'DetailOrder';
  /** Fecha de agregado del producto al pedido */
  createdAt: Scalars['DateTime'];
  /** Descuento del producto en el pedido */
  discount: Scalars['Float'];
  /** Precio del producto en el pedido */
  price: Scalars['Float'];
  /** Producto agregado al pedido */
  product: Product;
  /** Cantidad de productos en el pedido */
  quantity: Scalars['Float'];
  /** Cantidad de productos devueltos */
  quantityReturn: Scalars['Float'];
  /** Estado del producto */
  status: StatusOrderDetail;
  /** Fecha de actualizado del producto al pedido */
  updatedAt: Scalars['DateTime'];
};

/** Detalle de la salida de productos */
export type DetailOutput = {
  __typename?: 'DetailOutput';
  /** Fecha de agregado del deltalle a la salida */
  createdAt: Scalars['DateTime'];
  /** Producto de la salida */
  product: Product;
  /** Cantidad de producto */
  quantity: Scalars['Float'];
  /** Fecha de actualización del detalle a la salida */
  updatedAt: Scalars['DateTime'];
};

/** Detalles del recibo */
export type DetailReceipt = {
  __typename?: 'DetailReceipt';
  /** Monto para abonar al pedido */
  amount: Scalars['Float'];
  /** Identificador del pedido */
  orderId: Scalars['String'];
};

/** Detalles de cruce de la cartera */
export type DetailReceiptOrder = {
  /** Monto para abonar al pedido */
  amount: Scalars['Float'];
  /** Identificador del pedido */
  orderId: Scalars['String'];
};

export type DetailRequest = {
  __typename?: 'DetailRequest';
  /** Fecha de agregado del producto a la solicitud */
  createdAt: Scalars['DateTime'];
  /** Producto de la solicitud */
  product: Product;
  /** Cantidad de la solicfitud */
  quantity: Scalars['Float'];
  /** Fecha de actualizado del producto a la solicitud */
  updatedAt: Scalars['DateTime'];
};

/** Producto de la devoliución del pedido */
export type DetailReturnInput = {
  /** Identificador del producto */
  productId: Scalars['String'];
  /** Cantidad del producto */
  quantity: Scalars['Float'];
};

/** Productos de la devolucion */
export type DetailReturnInvoice = {
  __typename?: 'DetailReturnInvoice';
  /** Precio del producto de la devolución */
  price: Scalars['Float'];
  /** Producto de la devolución */
  product: Product;
  /** Cantidad de productos de la devolución */
  quantity: Scalars['Float'];
};

/** Productos del ajuste de productos */
export type DetailStockAdjustmentCreateInput = {
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Detalle del ajuste de productos */
export type DetailStockAdjustmentInput = {
  /** Acción a efectuar con el producto */
  action: ActionDetailAdjustment;
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Productos de la entrada de productos */
export type DetailStockInputCreateInput = {
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Detalle de la entrada de productos */
export type DetailStockInputInput = {
  /** Acción a efectuar con el producto */
  action: ActionDetailInput;
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Productos de la salida de productos */
export type DetailStockOutputCreateInput = {
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Detalle de la salida de productos */
export type DetailStockOutputInput = {
  /** Acción a efectuar con el producto */
  action: ActionDetailOutput;
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Productos de la solicitud de productos */
export type DetailStockRequestCreateInput = {
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Detalle de la solicitud de productos */
export type DetailStockRequestInput = {
  /** Acción a efectuar con el producto */
  action: ActionDetailRequest;
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Productos del historial de inventario */
export type DetailStockTransferCreateInput = {
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Detalle del traslado de productos */
export type DetailStockTransferInput = {
  /** Acción a efectuar con el producto */
  action: ActionDetailTransfer;
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Detalle del traslado de productos */
export type DetailTransfer = {
  __typename?: 'DetailTransfer';
  /** Fecha de agregado el producto */
  createdAt: Scalars['DateTime'];
  /** Producto del detalle */
  product: Product;
  /** Cantidad del productos en el traslado */
  quantity: Scalars['Float'];
  /** Cantidad del productos confirmados en el traslado */
  quantityConfirmed?: Maybe<Scalars['Float']>;
  /** Estado del producto */
  status: StatusDetailTransfer;
  /** Fecha de actualizacion el producto */
  updatedAt: Scalars['DateTime'];
};

/** Detalle del traslado de productos */
export type DetailTransferError = {
  __typename?: 'DetailTransferError';
  /** Producto del detalle */
  product: Product;
  /** Cantidad del productos en el traslado */
  quantity: Scalars['Float'];
  /** Motivo del proceso */
  reason?: Maybe<Scalars['String']>;
  /** Estado del producto */
  status: StatusDetailTransferError;
  /** Fecha de actualización del traslado */
  updatedAt: Scalars['DateTime'];
  /** Usuario que valida el error */
  user?: Maybe<User>;
};

/** Producto para confirmar en el pedido */
export type DetailsConfirm = {
  /** Producto a confirmar */
  productId: Scalars['String'];
  /** Estado del producto, si es diferente a confirm */
  status?: InputMaybe<StatusOrderDetail>;
};

/** Reglas de descuento */
export type DiscountRule = {
  __typename?: 'DiscountRule';
  /** Identificación de mongo */
  _id: Scalars['String'];
  /** Descuenti activo */
  active: Scalars['Boolean'];
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Fecha y hora del final del descuento */
  dateFinal: Scalars['DateTime'];
  /** Fecha y hora de inicio del descuento */
  dateInitial: Scalars['DateTime'];
  /** Nombre de la regla */
  name: Scalars['String'];
  /** Valor del porcentaje del descuento */
  percent: Scalars['Float'];
  /** Reglas para aplicar el descuento */
  rules: Rule[];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el descuento */
  user: User;
  /** Valor del descuento */
  value: Scalars['Float'];
};

/** Tipo de documento de identificación */
export type DocumentType = {
  __typename?: 'DocumentType';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Abreviación (CC, NIT, TI, CE, PASS) */
  abbreviation: Scalars['String'];
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Nombre del tipo de documento */
  name: Scalars['String'];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el pedido */
  user: User;
};

export enum DocumentTypesRule {
  Categories = 'CATEGORIES',
  Company = 'COMPANY',
  Customertypes = 'CUSTOMERTYPES',
  Shops = 'SHOPS',
}

/** Errores de traslado de efectivo */
export type ErrorCash = {
  __typename?: 'ErrorCash';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Caja hacia donde se realiza el movimiento */
  boxDestination: Box;
  /** Caja desde donde se realiza el movimiento */
  boxOrigin: Box;
  /** Cierre que efectúa el error */
  closeZ?: Maybe<CloseZInvoicing>;
  /** Compañía a la que pertenece el error */
  company: Scalars['String'];
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Motivo del proceso */
  reason?: Maybe<Scalars['String']>;
  /** Tipo de error */
  typeError: TypeErrorCash;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó la caja */
  user: User;
  /** Valor del movimiento */
  value: Scalars['Float'];
  /** Si ya fue verificados */
  verified: Scalars['Boolean'];
};

/** Egreso de dinero */
export type Expense = {
  __typename?: 'Expense';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Caja que afecta el egreso */
  box: Box;
  /** Empresa a la que pertenece el egreso */
  company: Company;
  /** Concepto del egreso */
  concept?: Maybe<Scalars['String']>;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Consecutivo del egreso */
  number: Scalars['Float'];
  /** Estado del egreso */
  status: StatusExpense;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el egreso */
  user: User;
  /** Valor del egreso */
  value: Scalars['Float'];
};

/** Filtros para la lista de atributos */
export type FiltersAttribsInput = {
  /** Identificadores de los atributos */
  _ids?: InputMaybe<Scalars['String'][]>;
  /** Estado del atributo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre del atributo */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortAttrib>;
};

/** Filtros para consultar las autorizaciones */
export type FiltersAuthorizationInput = {
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Prefijo de facturación */
  prefix?: InputMaybe<Scalars['String']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortAuthorization>;
};

/** Filtros para consultar la cajas */
export type FiltersBoxesInput = {
  /** Identificador de la caja */
  _id?: InputMaybe<Scalars['String']>;
  /** Es caja principal */
  isMain?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre de la caja para buscar coincidencias */
  name?: InputMaybe<Scalars['String']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortBox>;
};

/** Filtros para la lista de marcas */
export type FiltersBrandsInput = {
  /** Identificador de la marcas */
  _id?: InputMaybe<Scalars['String']>;
  /** Estado del atributo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre del atributo */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortBrand>;
};

/** Filtros para obtener la lista de categorías */
export type FiltersCategoriesInput = {
  /** Identificador de la categoría padre */
  _id?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre de la categoría */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortCategories>;
};

/** Filtros para obtener la lista de categorías */
export type FiltersCategoriesLevelInput = {
  /** Identificador de la categoría */
  _id?: InputMaybe<Scalars['String']>;
  /** Nivel de categoria */
  level: Scalars['Float'];
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre de la categoría */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Identificador de la categoría padre */
  parentId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortCategories>;
};

/** Filtros para obtener las ciudades */
export type FiltersCitiesInput = {
  /** Identificador de la ciudad */
  _id?: InputMaybe<Scalars['String']>;
  /** Nombre del país */
  country?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre de la ciudad */
  name?: InputMaybe<Scalars['String']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortCity>;
  /** Nombre del departamento */
  state?: InputMaybe<Scalars['String']>;
};

/** Filtros para consultar los cierres X */
export type FiltersClosesXInvoicingInput = {
  /** Fecha del cierre */
  closeDate?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número del cierre */
  number?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Tienda del cierre */
  shopId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortCloseXInvoicing>;
};

/** Filtros para consultar los cierres Z */
export type FiltersClosesZInvoicingInput = {
  /** Fecha del cierre */
  closeDate?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número del cierre */
  number?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Tienda del cierre */
  shopId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortCloseZInvoicing>;
};

/** Filtros para la lista de colores */
export type FiltersColorsInput = {
  /** Identificador del color */
  _id?: InputMaybe<Scalars['String']>;
  /** Estado de la bodega */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comodín busqueda del color */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortColor>;
};

/** Filtros para obtener listado de compañías */
export type FiltersCompaniesInput = {
  /** Estado de la compañía */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comódin para buscar por nombre o documento */
  name?: InputMaybe<Scalars['String']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortCompany>;
};

/** Filtros para obtener listado de transportadoras */
export type FiltersConveyorsInput = {
  /** Identificador de la transportadora */
  _id?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre de la transportadora */
  name?: InputMaybe<Scalars['String']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortConveyor>;
};

/** Filtros para consultar un cupón */
export type FiltersCouponInput = {
  /** Código del cupón */
  code?: InputMaybe<Scalars['String']>;
  /** Estado del cupón */
  status?: InputMaybe<StatusCoupon>;
};

/** Filtros para consultar los cupones */
export type FiltersCouponsInput = {
  /** Código del cupón */
  code?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número consecutivo del cupón */
  number?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortCoupon>;
  /** Estado del cupón */
  status?: InputMaybe<StatusCoupon>;
};

/** Filtros para consultar los créditos de los clientes */
export type FiltersCreditHistoryInput = {
  /** Monto del movimiento */
  amount?: InputMaybe<Scalars['Float']>;
  /** Identificador del crédito */
  creditId?: InputMaybe<Scalars['String']>;
  /** Identificador del cliente */
  customerId?: InputMaybe<Scalars['String']>;
  /** Número del documento que realiza el nmovimiento */
  documentNumber?: InputMaybe<Scalars['Float']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortCreditHistory>;
  /** Tipo del histórico de movimiento */
  type?: InputMaybe<TypeCreditHistory>;
};

/** Filtros para obtener un crédito */
export type FiltersCreditInput = {
  /** Cliente que tiene asignado el crédito */
  customerId?: InputMaybe<Scalars['String']>;
};

/** Filtros para consultar los créditos de los clientes */
export type FiltersCreditsInput = {
  /** Monto aprobado al cliente */
  amount?: InputMaybe<Scalars['Float']>;
  /** Identificador del cliente */
  customerId?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortCredit>;
  /** Estado del crédito */
  status?: InputMaybe<StatusCredit>;
};

/** Filtros para obtener los tipos de cliente */
export type FiltersCustomerTypesInput = {
  /** Identificador del tipo de documento */
  _id?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre comodín para la busqueda de tipos de cliente */
  name?: InputMaybe<Scalars['String']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
};

/** Filtros de listado de clientes */
export type FiltersCustomersInput = {
  /** Identificdor de un usuario */
  _id?: InputMaybe<Scalars['String']>;
  /** Si el cliente se encuentra activo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** comodin para la busque de documento, nombre, apellido, teléfono, correo,  */
  dato?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortCustomer>;
};

/** Filtros para cierre fiscal */
export type FiltersDailyClosing = {
  /** Fecha final del cierre del cierre */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial del cierre del cierre */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  pointOfSaleId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortDailyClosing>;
};

/** Filtros para consultar las reglas de descuentos */
export type FiltersDiscountRulesInput = {
  /** Si el descuento se encuentra activo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comodín para el nombre de la regla */
  name?: InputMaybe<Scalars['String']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Porcentaje del descuento */
  percent?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortDiscountRule>;
  /** Valor en cantidad del descuento */
  value?: InputMaybe<Scalars['Float']>;
};

/** Filtros para los tipos de documento */
export type FiltersDocumentTypesInput = {
  /** Estado activo del documento */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Nombre del tipo de documento */
  name?: InputMaybe<Scalars['String']>;
};

/** Listado de errores de efectivo */
export type FiltersErrorsCashInput = {
  /** Número del cierre que efectúa el error */
  closeZNumber?: InputMaybe<Scalars['Float']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortErrosCash>;
  /** Tipo de error */
  typeError?: InputMaybe<TypeErrorCash>;
  /** cantidad de efectivo */
  value?: InputMaybe<Scalars['Float']>;
  /** Si ya fue verificado */
  verified?: InputMaybe<Scalars['Boolean']>;
};

/** Filtros para obtener el listado de egresos */
export type FiltersExpensesInput = {
  /** Caja a la que afecta el egreso */
  boxId?: InputMaybe<Scalars['String']>;
  /** Fecha final de la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial de la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número consecutivo del egreso */
  number?: InputMaybe<Scalars['Float']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortExpense>;
  /** Estado del egreso */
  status?: InputMaybe<StatusExpense>;
};

/** Datos para consultar el estado de la meta */
export type FiltersGoalStatusInput = {
  /** Mes a evaluar la meta */
  month: Scalars['String'];
  /** Identificador de la tienda */
  shopId?: InputMaybe<Scalars['String']>;
};

/** Filtros para la lista de imagenes */
export type FiltersImagesInput = {
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comodín busqueda de la imagen */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortImage>;
};

/** Filtros del listado de facturas */
export type FiltersInvoicesInput = {
  /** Si la factura de encuentra se encuentra activa */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Fecha final para la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Identificador del punto de venta */
  pointOfSaleId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortInovice>;
};

/** Filtros del listado de pedidos */
export type FiltersOrdersInput = {
  /** Identificador del cliente */
  customerId?: InputMaybe<Scalars['String']>;
  /** Fecha final para la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Estado del pedido que no quiere consultar */
  nonStatus?: InputMaybe<StatusOrder[]>;
  /** Número consecutivo del pedido */
  number?: InputMaybe<Scalars['Float']>;
  /** Trae los pedidos POS solamente */
  orderPos?: InputMaybe<Scalars['Boolean']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Identificador del medio de pago */
  paymentId?: InputMaybe<Scalars['String']>;
  /** Filtro por tienda */
  shopId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortOrder>;
  /** Estado del pedido */
  status?: InputMaybe<StatusOrder>;
  /** Estado del pedido Web */
  statusWeb?: InputMaybe<StatusWeb>;
};

/** Filtros para obtener el listado de tipos de medios de pago */
export type FiltersPaymentsInput = {
  /** Estado del tipo de los médios de pago */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre del medio de pago */
  name?: InputMaybe<Scalars['String']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Tienda para consultar el medio de pago */
  shopId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortPayment>;
  /** Tipo de medio de pago (cash, bank, credit, bonus) */
  type?: InputMaybe<Scalars['String']>;
};

/** Filtros para obtener los puntos de venta */
export type FiltersPointOfSalesInput = {
  /** Identificador del punto de venta */
  _id?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comodín busqueda del punto de venta */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Tienda a la que pertenecen los puntos de venta */
  shopId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortPointOfSale>;
};

export type FiltersProductInput = {
  /** Identificador de mongo */
  _id?: InputMaybe<Scalars['String']>;
  /** Código de barras producto */
  barcode?: InputMaybe<Scalars['String']>;
  /** Color del producto */
  color?: InputMaybe<Scalars['String']>;
  /** Descripción del producto */
  description?: InputMaybe<Scalars['String']>;
  /** Referencia del producto */
  reference?: InputMaybe<Scalars['String']>;
  /** talla del producto */
  size?: InputMaybe<Scalars['String']>;
  /** Estado del producto */
  status?: InputMaybe<Scalars['String']>;
  /** Bodega de inventario o "all" para traer todos los inventarios */
  warehouseId?: InputMaybe<Scalars['String']>;
};

/** Filtros para la lista de productos */
export type FiltersProductsInput = {
  /** Id de color */
  colorId?: InputMaybe<Scalars['String']>;
  /** Identificadores de mongo */
  ids?: InputMaybe<Scalars['String'][]>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comodín para la busqueda del producto, barcode, referencem description */
  name?: InputMaybe<Scalars['String']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Id de referencia */
  referenceId?: InputMaybe<Scalars['String']>;
  /** Id de talla */
  sizeId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortProduct>;
  /** Estado del producto */
  status?: InputMaybe<Scalars['String']>;
  /** Bodega de inventario o "all" para traer todos los inventarios */
  warehouseId?: InputMaybe<Scalars['String']>;
  /** Se usa para seleccionar solo los productos que tengan inventario */
  withStock?: InputMaybe<Scalars['Boolean']>;
};

/** Filtros para consultar los recibos de caja */
export type FiltersReceiptsInput = {
  /** Caja que afecta el pago */
  boxId?: InputMaybe<Scalars['String']>;
  /** Fecha final para la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número consecutivo del recibo */
  number?: InputMaybe<Scalars['Float']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Identificador del medio de pago */
  paymentId?: InputMaybe<Scalars['String']>;
  /** Punto de venta del pago */
  pointOfSaleId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortReceipt>;
  /** Estado del recibo */
  status?: InputMaybe<StatusReceipt>;
};

/** Filtros para la lista de referencias */
export type FiltersReferencesInput = {
  /** Referencia activa */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Identificación de la marca */
  brandId?: InputMaybe<Scalars['String']>;
  /** Identificación de la marca */
  categoryLevel1Id?: InputMaybe<Scalars['String']>;
  /** Identificación de la marca */
  categoryLevel2Id?: InputMaybe<Scalars['String']>;
  /** Identificación de la marca */
  categoryLevel3Id?: InputMaybe<Scalars['String']>;
  /** Referencia se puede cambiar */
  changeable?: InputMaybe<Scalars['Boolean']>;
  /** Costo para la busqueda de referencias */
  cost?: InputMaybe<Scalars['Float']>;
  /** Identificador del cliente para validar descuentos */
  customerId?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comodín para la busqueda de las referencias */
  name?: InputMaybe<Scalars['String']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Precio para la busqueda de referencias */
  price?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortReference>;
};

/** Filtros de listado de devoluciones del pedido */
export type FiltersReturnsOrderInput = {
  /** Si la devolucion de encuentra se encuentra activo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Fecha final para la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número de la devolución */
  number?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Identificador de la tienda */
  shopId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortReturnOrder>;
};

/** Filtros para consultar los roles */
export type FiltersRolesInput = {
  /** Identificador del rol */
  _id?: InputMaybe<Scalars['String']>;
  /** El rol se encuentra activo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre del rol */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortRole>;
};

/** Filtros para el reporte de ventas */
export type FiltersSalesReportInput = {
  /** Fecha final del reporte */
  dateFinal: Scalars['String'];
  /** Fecha inicial del reporte */
  dateInitial: Scalars['String'];
  /** Agrupar por dia, mes o año */
  groupDates: GroupDates;
  /** Si es true se agrupan por categoria */
  isGroupByCategory: Scalars['Boolean'];
  /** Id de la tienda */
  shopId?: InputMaybe<Scalars['String']>;
};

/** Filtros usados para consultar las tiendas */
export type FiltersShopsInput = {
  /** Identificador de la tienda */
  _id?: InputMaybe<Scalars['String']>;
  /** Dirección de la sucursal */
  address?: InputMaybe<Scalars['String']>;
  /** Empresa de la tienda */
  companyId?: InputMaybe<Scalars['String']>;
  /** Bodega por defecto para la sucursal */
  defaultWarehouseId?: InputMaybe<Scalars['String']>;
  /** Meta asignada a la tienda */
  goal?: InputMaybe<Scalars['Float']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comodín de la tienda */
  name?: InputMaybe<Scalars['String']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Teléfono de la sucursal */
  phone?: InputMaybe<Scalars['String']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortShop>;
  /** Estado de la tienda */
  status?: InputMaybe<StatusShop>;
};

/** Filtros para la lista de tallas */
export type FiltersSizesInput = {
  /** Identificador de la talla */
  _id?: InputMaybe<Scalars['String']>;
  /** Estado de la bodega */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comodín busqueda de la talla */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortSize>;
};

/** Filtros para el listado de ajsutes de productos */
export type FiltersStockAdjustmentsInput = {
  /** Fecha final para la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número consecutivo asignado al ajuste */
  number?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortStockAdjustment>;
  /** Estado del ajuste */
  status?: InputMaybe<StatusStockAdjustment>;
  /** Valor total de la entrada */
  total?: InputMaybe<Scalars['Float']>;
  /** Id de la bodega */
  warehouseId?: InputMaybe<Scalars['String']>;
};

/** Filtros para el listado de entradas de productos */
export type FiltersStockInputsInput = {
  /** Fecha final para la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número consecutivo asignado a la entrada */
  number?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortStockInput>;
  /** Estado de la entrada */
  status?: InputMaybe<StatusStockInput>;
  /** Valor total de la entrada */
  total?: InputMaybe<Scalars['Float']>;
  /** Id de la bodega */
  warehouseId?: InputMaybe<Scalars['String']>;
};

/** Filtros para el listado de salidas de productos */
export type FiltersStockOutputsInput = {
  /** Fecha final para la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número consecutivo asignado a la salida */
  number?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortStockOutput>;
  /** Estado de la salida */
  status?: InputMaybe<StatusStockOutput>;
  /** Valor total de la entrada */
  total?: InputMaybe<Scalars['Float']>;
  /** Id de la bodega */
  warehouseId?: InputMaybe<Scalars['String']>;
};

/** Filtros para el listado de solicitudes de productos */
export type FiltersStockRequestsInput = {
  /** Fecha final para la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número consecutivo asignado al traslado */
  number?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortStockRequest>;
  /** Estado de la solicitud */
  status?: InputMaybe<StatusStockRequest>;
  /** Id de la bodega de destino */
  warehouseDestinationId?: InputMaybe<Scalars['String']>;
  /** Id de la bodega de origen */
  warehouseOriginId?: InputMaybe<Scalars['String']>;
};

/** Filtros para el listado de traslados de productos */
export type FiltersStockTransfersErrorInput = {
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortStockTransferError>;
  /** Si el traslado esta o no verificado por completo */
  verifield?: InputMaybe<Scalars['Boolean']>;
};

/** Filtros para el listado de traslados de productos */
export type FiltersStockTransfersInput = {
  /** Fecha final para la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número consecutivo asignado al traslado */
  number?: InputMaybe<Scalars['Float']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortStockTransfer>;
  /** Estado del traslado */
  status?: InputMaybe<StatusStockTransfer>;
  /** Id de la bodega de destino */
  warehouseDestinationId?: InputMaybe<Scalars['String']>;
  /** Id de la bodega de origen */
  warehouseOriginId?: InputMaybe<Scalars['String']>;
};

/** Filtros a aplicar para consultar los usuarios */
export type FiltersUsersInput = {
  /** Identificador del tipo de cliente */
  customerTypeId?: InputMaybe<Scalars['String']>;
  /** Selecciona si es usuario web o no */
  isWeb?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comodín para la busqueda por nombre,nombre de usuario, documento o correo */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Identificador del rol */
  roleId?: InputMaybe<Scalars['String']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortUser>;
  /** Estado del usuario */
  status?: InputMaybe<StatusUser>;
};

/** Filtros de las bodegas */
export type FiltersWarehousesInput = {
  /** Identificador de la bodega */
  _id?: InputMaybe<Scalars['String']>;
  /** Estado de la bodega */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Si se requiere traer la bodega principal */
  isMain?: InputMaybe<Scalars['Boolean']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Comodín busqueda de la bodega */
  name?: InputMaybe<Scalars['String']>;
  /** Página actual */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortWarehouse>;
};

/** Datos para crear cierre diario por fechas */
export type GenerateDailyClosingInput = {
  /** Fecha inicial */
  dateFinal: Scalars['String'];
  /** Fecha inicial */
  dateInitial: Scalars['String'];
  /** Id de la tienda */
  shopId: Scalars['String'];
};

export enum GroupDates {
  Day = 'DAY',
  Month = 'MONTH',
  Year = 'YEAR',
}

/** Indexación de las imagenes */
export type Image = {
  __typename?: 'Image';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Nombre de la imagen */
  name: Scalars['String'];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Direcciones de la imagen */
  urls?: Maybe<Urls>;
  /** Usuario que creó o editó la imagen */
  user: User;
};

/** Enlaces de diferences tamaños */
export type ImageTypes = {
  __typename?: 'ImageTypes';
  /** Enlace de imagen grande */
  big: Scalars['String'];
  /** Enlace de imagen mediana */
  medium: Scalars['String'];
  /** Enlace de imagen pequeña */
  small: Scalars['String'];
};

/** Factura */
export type Invoice = {
  __typename?: 'Invoice';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** La factura se encuentra activa o no */
  active: Scalars['Boolean'];
  /** Autorización de facturación */
  authorization: AuthorizationDian;
  /** Empresa a la que perteneces la factura */
  company: Company;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Cliente para la factura */
  customer: Customer;
  /** Productos de la factura */
  details?: Maybe<DetailInvoice[]>;
  /** Número de factura */
  number: Scalars['Float'];
  /** Pedido basado para la factura */
  order: Order;
  /** Métodos de pago usados en la factura */
  payments?: Maybe<PaymentInvoice[]>;
  /** Tienda donde se realiza la factura */
  shop: Shop;
  /** Resumen de los pagos y totales */
  summary: SummaryInvoice;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó la factrura */
  user: User;
};

/** Respuesta despues de hacer el login */
export type LoginResponse = {
  __typename?: 'LoginResponse';
  /** Token para la conexión */
  access_token: Scalars['String'];
  /** Usuario almacenado en la base de datos */
  user: User;
};

/** Datos para hacer login */
export type LoginUserInput = {
  /** Contraseña de usuario */
  password: Scalars['String'];
  /** Usuario registrado */
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Se encarga de agregar medios de pago */
  addPaymentsOrder: ResponseOrder;
  /** Se encarga de agregar productos a un pedido */
  addProductsOrder: ResponseOrder;
  /** Se encarga de cambiar la clave al usuario con base al tokenu */
  changePasswordToken: LoginResponse;
  /** Se encarga de confirmar o desconfirmar pagos de un pedido */
  confirmPaymentsOrder: ResponseOrder;
  /** Se encarga de confirmar o desconfirmar productos de un pedido */
  confirmProductsOrder: ResponseOrder;
  /** Confirma los productos del traslado */
  confirmProductsStockTransfer: StockTransfer;
  /** Crea un atributo */
  createAttrib: Attrib;
  /** Crea una autorización de facturación */
  createAuthorization: AuthorizationDian;
  /** Crea una caja */
  createBox: Box;
  /** Crea una marca */
  createBrand: Brand;
  /** Crea una categoría */
  createCategory: CategoryLevel1;
  /** Crea una ciudad */
  createCity: City;
  /** Crea un cierre X de facturación */
  createCloseXInvoicing: CloseXInvoicing;
  /** Crea un cierre Z de facturación */
  createCloseZInvoicing: CloseZInvoicing;
  /** Crea un color */
  createColor: Color;
  /** Crea una compañía */
  createCompany: Company;
  /** Se encarga crear un cupón */
  createCoupon: Coupon;
  /** Asigna el crédito a un cliente */
  createCredit: Credit;
  /** Se encarga crear un cliente */
  createCustomer: Customer;
  /** Se encarga crear un descuento */
  createDiscountRule: DiscountRule;
  /** Crea un egreso */
  createExpense: Expense;
  /** Se encarga de crear el pedido */
  createOrder: ResponseOrder;
  /** Crea un método de pago */
  createPayment: Payment;
  /** Se encarga de crear el punto de venta */
  createPointOfSale: PointOfSale;
  /** Crea un producto */
  createProduct: Product;
  /** Crea una recibo de caja */
  createReceipt: ResponseReceipt;
  /** Crea una referencia */
  createReference: Reference;
  /** Se encarga de crear la devolución del pedido */
  createReturnOrder: ReturnOrder;
  /** Crea una rol */
  createRole: Role;
  /** Crea una tienda */
  createShop: Shop;
  /** Crear una talla */
  createSize: Size;
  /** Crea un ajuste de productos */
  createStockAdjustment: StockAdjustment;
  /** Crea una entrada de productos */
  createStockInput: StockInput;
  /** Crea una salida de productos */
  createStockOutput: StockOutput;
  /** Crea una solicitud */
  createStockRequest: StockRequest;
  /** Crea una traslado de productos */
  createStockTransfer: StockTransfer;
  createUser: User;
  /** Crea una bodega */
  createWarehouse: Warehouse;
  /** Genera los cierres diarios */
  generateDailyClosing: ResponseGenerateDailyClosing;
  /** Autogenera una solicitud de productos por bodega */
  generateStockRequest: StockRequest;
  /** Generador de facturas */
  invoicing: ResponseInvoicing;
  /** Se encarga de realizar el ingreso al sistema por el usuario */
  login: LoginResponse;
  /** Se encarga de enviar correo de recuperación de contraseña */
  recoveryPassword: Scalars['Boolean'];
  /** Se encarga de crear el usuario desde aplicaciones externas */
  signup: LoginResponse;
  /** Actualiza un atributo */
  updateAttrib: Attrib;
  /** Actualiza una autorización de facturación */
  updateAuthorization: AuthorizationDian;
  /** Actualiza una caja */
  updateBox: Box;
  /** Actualiza la marca */
  updateBrand: Brand;
  /** Actualiza la categoría */
  updateCategory: CategoryLevel1;
  /** Actualiza una ciudad */
  updateCity: City;
  /** Actualiza el color */
  updateColor: Color;
  /** Actualiza una compañía */
  updateCompany: Company;
  /** Se encarga actualizar un cupón */
  updateCoupon: Coupon;
  /** Actualiza el crédito de un cliente */
  updateCredit: Credit;
  /** Se encarga actualizar un cliente */
  updateCustomer: Customer;
  /** Se encarga actualizar un descuento */
  updateDiscountRule: DiscountRule;
  /** Actualiza un egreso */
  updateExpense: Expense;
  /** Se encarga actualizar un pedido */
  updateOrder: ResponseOrder;
  /** Actualiza un método de pago */
  updatePayment: Payment;
  /** Se encarga actualizar un punto de venta */
  updatePointOfSale: PointOfSale;
  /** Se encarga actualizar un producto */
  updateProduct: Product;
  /** Actualiza un recibo de caja */
  updateReceipt: Receipt;
  /** Actualiza una referencia */
  updateReference: Reference;
  /** Actualiza un rol */
  updateRole: Role;
  /** Actualiza una tienda */
  updateShop: Shop;
  /** Actualizar la talla */
  updateSize: Size;
  /** Actualiza un ajuste de productos */
  updateStockAdjustment: StockAdjustment;
  /** Actualiza una entrada de productos */
  updateStockInput: StockInput;
  /** Actualiza una salida de productos */
  updateStockOutput: StockOutput;
  /** Actualiza una solicitud de productos */
  updateStockRequest: StockRequest;
  /** Actualiza traslado */
  updateStockTransfer: StockTransfer;
  updateUser: User;
  /** Actualiza una bodega */
  updateWarehouse: Warehouse;
  /** Verifica un producto de un traslado en error */
  verifiedErrorsCash: ErrorCash;
  /** Verifica un producto de un traslado en error */
  verifiedProductStockTransfer: StockTransferError;
};

export type MutationAddPaymentsOrderArgs = {
  addPaymentsOrderInput: AddPaymentsOrderInput;
};

export type MutationAddProductsOrderArgs = {
  addProductsOrderInput: AddProductsOrderInput;
};

export type MutationChangePasswordTokenArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MutationConfirmPaymentsOrderArgs = {
  confirmPaymentsOrderInput: ConfirmPaymentsOrderInput;
};

export type MutationConfirmProductsOrderArgs = {
  confirmProductsOrderInput: ConfirmProductsOrderInput;
};

export type MutationConfirmProductsStockTransferArgs = {
  confirmStockTransferInput: ConfirmStockTransferInput;
  id: Scalars['String'];
};

export type MutationCreateAttribArgs = {
  createAttribInput: CreateAttribInput;
};

export type MutationCreateAuthorizationArgs = {
  createAuthorizationInput: CreateAuthorizationInput;
};

export type MutationCreateBoxArgs = {
  createBoxInput: CreateBoxInput;
};

export type MutationCreateBrandArgs = {
  createBrandInput: CreateBrandInput;
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};

export type MutationCreateCityArgs = {
  createCityInput: CreateCityInput;
};

export type MutationCreateCloseXInvoicingArgs = {
  createCloseXInvoicing?: InputMaybe<CreateCloseXInvoicingInput>;
};

export type MutationCreateCloseZInvoicingArgs = {
  createCloseZInvoicing?: InputMaybe<CreateCloseZInvoicingInput>;
};

export type MutationCreateColorArgs = {
  createColorInput: CreateColorInput;
};

export type MutationCreateCompanyArgs = {
  createCompanyInput: CreateCompanyInput;
};

export type MutationCreateCouponArgs = {
  createCouponInput: CreateCouponInput;
};

export type MutationCreateCreditArgs = {
  createCreditInput: CreateCreditInput;
};

export type MutationCreateCustomerArgs = {
  createCustomerInput: CreateCustomerInput;
};

export type MutationCreateDiscountRuleArgs = {
  createDiscountRuleInput: CreateDiscountRuleInput;
};

export type MutationCreateExpenseArgs = {
  createExpenseInput: CreateExpenseInput;
};

export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};

export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
};

export type MutationCreatePointOfSaleArgs = {
  createPointOfSaleInput: CreatePointOfSaleInput;
};

export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};

export type MutationCreateReceiptArgs = {
  createReceiptInput: CreateReceiptInput;
};

export type MutationCreateReferenceArgs = {
  createReferenceInput: CreateReferenceInput;
};

export type MutationCreateReturnOrderArgs = {
  createReturnOrderInput: CreateReturnOrderInput;
};

export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};

export type MutationCreateShopArgs = {
  createShopInput: CreateShopInput;
};

export type MutationCreateSizeArgs = {
  createSizeInput: CreateSizeInput;
};

export type MutationCreateStockAdjustmentArgs = {
  createStockAdjustmentInput: CreateStockAdjustmentInput;
};

export type MutationCreateStockInputArgs = {
  createStockInputInput: CreateStockInputInput;
};

export type MutationCreateStockOutputArgs = {
  createStockOutputInput: CreateStockOutputInput;
};

export type MutationCreateStockRequestArgs = {
  createStockRequestInput: CreateStockRequestInput;
};

export type MutationCreateStockTransferArgs = {
  createStockTransferInput: CreateStockTransferInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationCreateWarehouseArgs = {
  createWarehouseInput: CreateWarehouseInput;
};

export type MutationGenerateDailyClosingArgs = {
  generateDailyClosingInput?: InputMaybe<GenerateDailyClosingInput>;
};

export type MutationGenerateStockRequestArgs = {
  shopId: Scalars['String'];
};

export type MutationInvoicingArgs = {
  dataGenerateInvoicesInput: DataGenerateInvoicesInput;
};

export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};

export type MutationRecoveryPasswordArgs = {
  email: Scalars['String'];
};

export type MutationSignupArgs = {
  signUpInput: SignUpInput;
};

export type MutationUpdateAttribArgs = {
  id: Scalars['String'];
  updateAttribInput: UpdateAttribInput;
};

export type MutationUpdateAuthorizationArgs = {
  id: Scalars['String'];
  updateAuthorizationInput?: InputMaybe<UpdateAuthorizationInput>;
};

export type MutationUpdateBoxArgs = {
  id: Scalars['String'];
  updateBoxInput: UpdateBoxInput;
};

export type MutationUpdateBrandArgs = {
  id: Scalars['String'];
  updateBrandInput: UpdateBrandInput;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars['String'];
  updateCategoryInput: UpdateCategoryInput;
};

export type MutationUpdateCityArgs = {
  id: Scalars['String'];
  updateCityInput: UpadteCityInput;
};

export type MutationUpdateColorArgs = {
  id: Scalars['String'];
  updateColorInput: UpdateColorInput;
};

export type MutationUpdateCompanyArgs = {
  id: Scalars['String'];
  updateCompanyInput: UpdateCompanyInput;
};

export type MutationUpdateCouponArgs = {
  id: Scalars['String'];
  updateCustomerInput: UpdateCouponInput;
};

export type MutationUpdateCreditArgs = {
  id: Scalars['String'];
  updateCreditInput: UpdateCreditInput;
};

export type MutationUpdateCustomerArgs = {
  id: Scalars['String'];
  updateCustomerInput: UpdateCustomerInput;
};

export type MutationUpdateDiscountRuleArgs = {
  id: Scalars['String'];
  updateDiscountRuleInput: UpdateDiscountRuleInput;
};

export type MutationUpdateExpenseArgs = {
  id: Scalars['String'];
  updateExpenseInput: UpdateExpenseInput;
};

export type MutationUpdateOrderArgs = {
  id: Scalars['String'];
  updateOrderInput: UpdateOrderInput;
};

export type MutationUpdatePaymentArgs = {
  id: Scalars['String'];
  updatePaymentInput: UpdatePaymentInput;
};

export type MutationUpdatePointOfSaleArgs = {
  id: Scalars['String'];
  updatePointOfSaleInput: UpdatePointOfSaleInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars['String'];
  updateProductInput: UpdateProductInput;
};

export type MutationUpdateReceiptArgs = {
  id: Scalars['String'];
  updateReceiptInput: UpdateReceiptInput;
};

export type MutationUpdateReferenceArgs = {
  id: Scalars['String'];
  updateReferenceInput: UpdateReferenceInput;
};

export type MutationUpdateRoleArgs = {
  id: Scalars['String'];
  updateRoleInput: UpdateRoleInput;
};

export type MutationUpdateShopArgs = {
  id: Scalars['String'];
  updateShopInput: UpdateShopInput;
};

export type MutationUpdateSizeArgs = {
  id: Scalars['String'];
  updateSizeInput: UpdateSizeInput;
};

export type MutationUpdateStockAdjustmentArgs = {
  id: Scalars['String'];
  updateStockAdjustmentInput: UpdateStockAdjustmentInput;
};

export type MutationUpdateStockInputArgs = {
  id: Scalars['String'];
  updateStockInputInput: UpdateStockInputInput;
};

export type MutationUpdateStockOutputArgs = {
  id: Scalars['String'];
  updateStockOutputInput: UpdateStockOutputInput;
};

export type MutationUpdateStockRequestArgs = {
  id: Scalars['String'];
  updateStockRequestInput: UpdateStockRequestInput;
};

export type MutationUpdateStockTransferArgs = {
  id: Scalars['String'];
  updateStockTransferInput: UpdateStockTransferInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  updateUserInput: UpdateUserInput;
};

export type MutationUpdateWarehouseArgs = {
  id: Scalars['String'];
  updateWarehouseInput: UpdateWarehouseInput;
};

export type MutationVerifiedErrorsCashArgs = {
  verifiedErrorsCashInput: VerifiedErrorsCashInput;
};

export type MutationVerifiedProductStockTransferArgs = {
  verifiedProductTransferErrorInput: VerifiedProductTransferErrorInput;
};

/** Opción del permiso */
export type OptionPermission = {
  __typename?: 'OptionPermission';
  /** Acciones a realizan en la opción */
  actions: ActionPermission[];
  /** Nombre de la opción */
  name: Scalars['String'];
};

/** Pedido de productos */
export type Order = {
  __typename?: 'Order';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Usuario que creó o editó el pedido */
  address?: Maybe<Address>;
  /** Fecha de cierre del pedido */
  closeDate: Scalars['DateTime'];
  /** Empresa a la que perteneces el pedido */
  company: Company;
  /** Trasportadora */
  conveyorOrder?: Maybe<ConveyorOrder>;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Cliente que solicita el pedido */
  customer: Customer;
  /** Productos que tiene el pedido */
  details?: Maybe<DetailOrder[]>;
  /** Factura generada al facturar */
  invoice?: Maybe<Invoice>;
  /**
   * Número de la factura vieja
   * @deprecated facturas viejas
   */
  invoiceNumber?: Maybe<Scalars['Float']>;
  /** Número de pedido */
  number: Scalars['Float'];
  /** Pedido de POS */
  orderPos: Scalars['Boolean'];
  /** Métodos de pago usados en el pedido */
  payments?: Maybe<PaymentOrder[]>;
  /** Punto de venta asigando */
  pointOfSale: PointOfSale;
  /** Tienda donde se solicita el pedido */
  shop: Shop;
  /** Estado del pedido */
  status: StatusOrder;
  /** Estado de transición pedido web */
  statusWeb?: Maybe<StatusWeb>;
  /** Resumen de los pagosy totales */
  summary: SummaryOrder;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el pedido */
  user: User;
};

/** Medios de pago */
export type Payment = {
  __typename?: 'Payment';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Estado del tipo de los médios de pago */
  active: Scalars['Boolean'];
  /** Color del medio de pago */
  color?: Maybe<Scalars['String']>;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Logo para el medio de pago */
  logo?: Maybe<Image>;
  /** Mensaje para el usuario web */
  message?: Maybe<Scalars['String']>;
  /** Nombre del medio de pago */
  name: Scalars['String'];
  /** Tipo de medio de pago */
  shops: Shop[];
  /** Tipo de medio de pago */
  type: TypePayment;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el medio de pago */
  user: User;
};

/** Producto para confirmar en el pedido */
export type PaymentConfirm = {
  /** Médio de pago a confirmar */
  paymentId: Scalars['String'];
  /** Estado del producto, si es diferente a confirm */
  status?: InputMaybe<StatusOrderDetail>;
};

/** Pagos que cruzan créditos */
export type PaymentCredit = {
  __typename?: 'PaymentCredit';
  /** Medio de pago */
  payment: Payment;
  /** Cantidad de las pagos del medio */
  quantity: Scalars['Float'];
  /** Valor del medio de pago */
  value: Scalars['Float'];
};

/** Medios de pago de la factura */
export type PaymentInvoice = {
  __typename?: 'PaymentInvoice';
  /** Método de pago usado */
  payment: Payment;
  /** Total pagado */
  total: Scalars['Float'];
};

/** Medio de pago usado en el pedido */
export type PaymentOrder = {
  __typename?: 'PaymentOrder';
  /** Cupón solo válido para el medio de pago tipo coupon */
  code?: Maybe<Scalars['String']>;
  /** Fecha de agregado del pago al pedido */
  createdAt: Scalars['DateTime'];
  /** Método de pago usado */
  payment: Payment;
  /** Total pagado */
  receipt?: Maybe<Receipt>;
  /** Estado del pago */
  status: StatusOrderDetail;
  /** Total pagado */
  total: Scalars['Float'];
  /** Fecha de actualizado del pago al pedido */
  updatedAt: Scalars['DateTime'];
};

/** Resumen de los pagos */
export type PaymentOrderClose = {
  __typename?: 'PaymentOrderClose';
  /** Medio de pago */
  payment: Payment;
  /** Cantidad de las pagos del medio */
  quantity: Scalars['Float'];
  /** Valor del medio de pago */
  value: Scalars['Float'];
};

/** Medio de pago que se va a agregar */
export type PaymentsOrderInput = {
  /** Acción a realizar con el medio de pago */
  action: ActionPaymentsOrder;
  /** Código del cupón, válido para medios de pago tipo coupon */
  code?: InputMaybe<Scalars['String']>;
  /** Identificador medio de pago agregado al pedido */
  paymentId: Scalars['String'];
  /** Valor total agregado */
  total: Scalars['Float'];
};

/** Medios de pago */
export type PaymentsSalesReport = {
  __typename?: 'PaymentsSalesReport';
  /** Medio de pago */
  payment: Payment;
  /** Cantidad de veces de uso del medio de pago */
  quantity: Scalars['Float'];
  /** Valor total recaudado con el recibo de pago */
  total: Scalars['Float'];
};

/** Permisos a los que tiene el usuario */
export type Permission = {
  __typename?: 'Permission';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Tipo de acción */
  action: Permissions;
  /** Detalle de la acción */
  description: Scalars['String'];
  /** Módulo al que pertenece el permiso */
  module: Scalars['String'];
  /** Nombre de la acción */
  name: Scalars['String'];
  /** Opción del módulo al que pertenece el permiso */
  option: Scalars['String'];
};

/** Permiso */
export type PermissionData = {
  __typename?: 'PermissionData';
  /** Nombre del módulo */
  module: Scalars['String'];
  /** Opciones del módulo */
  options: OptionPermission[];
};

export enum Permissions {
  AccessConfigurationConveyors = 'ACCESS_CONFIGURATION_CONVEYORS',
  AccessConfigurationRoles = 'ACCESS_CONFIGURATION_ROLES',
  AccessConfigurationShops = 'ACCESS_CONFIGURATION_SHOPS',
  AccessConfigurationUsers = 'ACCESS_CONFIGURATION_USERS',
  AccessConfigurationWarehouses = 'ACCESS_CONFIGURATION_WAREHOUSES',
  AccessCredits = 'ACCESS_CREDITS',
  AccessCrmCities = 'ACCESS_CRM_CITIES',
  AccessCrmCoupons = 'ACCESS_CRM_COUPONS',
  AccessCrmCustomers = 'ACCESS_CRM_CUSTOMERS',
  AccessCrmDiscountrules = 'ACCESS_CRM_DISCOUNTRULES',
  AccessErp = 'ACCESS_ERP',
  AccessInventoryAdjustments = 'ACCESS_INVENTORY_ADJUSTMENTS',
  AccessInventoryAttribs = 'ACCESS_INVENTORY_ATTRIBS',
  AccessInventoryBrands = 'ACCESS_INVENTORY_BRANDS',
  AccessInventoryCategories = 'ACCESS_INVENTORY_CATEGORIES',
  AccessInventoryColors = 'ACCESS_INVENTORY_COLORS',
  AccessInventoryInputs = 'ACCESS_INVENTORY_INPUTS',
  AccessInventoryOutputs = 'ACCESS_INVENTORY_OUTPUTS',
  AccessInventoryProducts = 'ACCESS_INVENTORY_PRODUCTS',
  AccessInventoryReferences = 'ACCESS_INVENTORY_REFERENCES',
  AccessInventoryRequests = 'ACCESS_INVENTORY_REQUESTS',
  AccessInventorySizes = 'ACCESS_INVENTORY_SIZES',
  AccessInventoryTransfers = 'ACCESS_INVENTORY_TRANSFERS',
  AccessInvoicingAuthorizations = 'ACCESS_INVOICING_AUTHORIZATIONS',
  AccessInvoicingClosesx = 'ACCESS_INVOICING_CLOSESX',
  AccessInvoicingClosesz = 'ACCESS_INVOICING_CLOSESZ',
  AccessInvoicingPointofsales = 'ACCESS_INVOICING_POINTOFSALES',
  AccessInvoicingReturns = 'ACCESS_INVOICING_RETURNS',
  AccessPos = 'ACCESS_POS',
  AccessTreasuryBoxes = 'ACCESS_TREASURY_BOXES',
  AccessTreasuryExpenses = 'ACCESS_TREASURY_EXPENSES',
  AccessTreasuryPayments = 'ACCESS_TREASURY_PAYMENTS',
  AccessTreasuryReceipt = 'ACCESS_TREASURY_RECEIPT',
  AutogenerateInventoryRequest = 'AUTOGENERATE_INVENTORY_REQUEST',
  ConfirmInventoryTransfer = 'CONFIRM_INVENTORY_TRANSFER',
  CreateConfigurationRole = 'CREATE_CONFIGURATION_ROLE',
  CreateConfigurationShop = 'CREATE_CONFIGURATION_SHOP',
  CreateConfigurationUser = 'CREATE_CONFIGURATION_USER',
  CreateConfigurationWarehouse = 'CREATE_CONFIGURATION_WAREHOUSE',
  CreateCredit = 'CREATE_CREDIT',
  CreateCrmCity = 'CREATE_CRM_CITY',
  CreateCrmCoupon = 'CREATE_CRM_COUPON',
  CreateCrmCustomer = 'CREATE_CRM_CUSTOMER',
  CreateCrmDiscountrule = 'CREATE_CRM_DISCOUNTRULE',
  CreateInventoryAdjustment = 'CREATE_INVENTORY_ADJUSTMENT',
  CreateInventoryAttrib = 'CREATE_INVENTORY_ATTRIB',
  CreateInventoryBrand = 'CREATE_INVENTORY_BRAND',
  CreateInventoryCategory = 'CREATE_INVENTORY_CATEGORY',
  CreateInventoryColor = 'CREATE_INVENTORY_COLOR',
  CreateInventoryInput = 'CREATE_INVENTORY_INPUT',
  CreateInventoryOutput = 'CREATE_INVENTORY_OUTPUT',
  CreateInventoryProduct = 'CREATE_INVENTORY_PRODUCT',
  CreateInventoryReference = 'CREATE_INVENTORY_REFERENCE',
  CreateInventoryRequest = 'CREATE_INVENTORY_REQUEST',
  CreateInventorySize = 'CREATE_INVENTORY_SIZE',
  CreateInventoryTransfer = 'CREATE_INVENTORY_TRANSFER',
  CreateInvoicingAuthorization = 'CREATE_INVOICING_AUTHORIZATION',
  CreateInvoicingClosex = 'CREATE_INVOICING_CLOSEX',
  CreateInvoicingClosez = 'CREATE_INVOICING_CLOSEZ',
  CreateInvoicingOrder = 'CREATE_INVOICING_ORDER',
  CreateInvoicingPointofsale = 'CREATE_INVOICING_POINTOFSALE',
  CreateInvoicingReturn = 'CREATE_INVOICING_RETURN',
  CreateTreasuryBox = 'CREATE_TREASURY_BOX',
  CreateTreasuryExpense = 'CREATE_TREASURY_EXPENSE',
  CreateTreasuryPayment = 'CREATE_TREASURY_PAYMENT',
  CreateTreasuryReceipt = 'CREATE_TREASURY_RECEIPT',
  GenerateInvoicingDailyClosing = 'GENERATE_INVOICING_DAILY_CLOSING',
  InventoryTransfersVerified = 'INVENTORY_TRANSFERS_VERIFIED',
  PrintCrmCoupon = 'PRINT_CRM_COUPON',
  PrintInventoryAdjustment = 'PRINT_INVENTORY_ADJUSTMENT',
  PrintInventoryInput = 'PRINT_INVENTORY_INPUT',
  PrintInventoryOutput = 'PRINT_INVENTORY_OUTPUT',
  PrintInventoryRequest = 'PRINT_INVENTORY_REQUEST',
  PrintInventoryTransfer = 'PRINT_INVENTORY_TRANSFER',
  PrintInvoicingClosex = 'PRINT_INVOICING_CLOSEX',
  PrintInvoicingClosez = 'PRINT_INVOICING_CLOSEZ',
  PrintInvoicingOrder = 'PRINT_INVOICING_ORDER',
  PrintInvoicingReturn = 'PRINT_INVOICING_RETURN',
  PrintTreasuryExpense = 'PRINT_TREASURY_EXPENSE',
  PrintTreasuryReceipt = 'PRINT_TREASURY_RECEIPT',
  ReadConfigurationConveyors = 'READ_CONFIGURATION_CONVEYORS',
  ReadConfigurationImages = 'READ_CONFIGURATION_IMAGES',
  ReadConfigurationPermissions = 'READ_CONFIGURATION_PERMISSIONS',
  ReadConfigurationRoles = 'READ_CONFIGURATION_ROLES',
  ReadConfigurationShops = 'READ_CONFIGURATION_SHOPS',
  ReadConfigurationUsers = 'READ_CONFIGURATION_USERS',
  ReadConfigurationWarehouses = 'READ_CONFIGURATION_WAREHOUSES',
  ReadCredits = 'READ_CREDITS',
  ReadCrmCities = 'READ_CRM_CITIES',
  ReadCrmCoupons = 'READ_CRM_COUPONS',
  ReadCrmCustomers = 'READ_CRM_CUSTOMERS',
  ReadCrmCustomertypes = 'READ_CRM_CUSTOMERTYPES',
  ReadCrmDiscountrules = 'READ_CRM_DISCOUNTRULES',
  ReadInventoryAdjustments = 'READ_INVENTORY_ADJUSTMENTS',
  ReadInventoryAttribs = 'READ_INVENTORY_ATTRIBS',
  ReadInventoryBrands = 'READ_INVENTORY_BRANDS',
  ReadInventoryCategories = 'READ_INVENTORY_CATEGORIES',
  ReadInventoryColors = 'READ_INVENTORY_COLORS',
  ReadInventoryInputs = 'READ_INVENTORY_INPUTS',
  ReadInventoryOutputs = 'READ_INVENTORY_OUTPUTS',
  ReadInventoryProducts = 'READ_INVENTORY_PRODUCTS',
  ReadInventoryReferences = 'READ_INVENTORY_REFERENCES',
  ReadInventoryRequests = 'READ_INVENTORY_REQUESTS',
  ReadInventorySizes = 'READ_INVENTORY_SIZES',
  ReadInventoryTransfers = 'READ_INVENTORY_TRANSFERS',
  ReadInvoicingAuthorizations = 'READ_INVOICING_AUTHORIZATIONS',
  ReadInvoicingClosesx = 'READ_INVOICING_CLOSESX',
  ReadInvoicingClosesz = 'READ_INVOICING_CLOSESZ',
  ReadInvoicingDailyClosing = 'READ_INVOICING_DAILY_CLOSING',
  ReadInvoicingInvoices = 'READ_INVOICING_INVOICES',
  ReadInvoicingOrders = 'READ_INVOICING_ORDERS',
  ReadInvoicingPointofsales = 'READ_INVOICING_POINTOFSALES',
  ReadInvoicingReturns = 'READ_INVOICING_RETURNS',
  ReadTreasuryBoxes = 'READ_TREASURY_BOXES',
  ReadTreasuryErrorsCash = 'READ_TREASURY_ERRORS_CASH',
  ReadTreasuryExpenses = 'READ_TREASURY_EXPENSES',
  ReadTreasuryPayments = 'READ_TREASURY_PAYMENTS',
  ReadTreasuryReceipts = 'READ_TREASURY_RECEIPTS',
  ReportInvoicingGoalStatus = 'REPORT_INVOICING_GOAL_STATUS',
  ReportInvoicingSales = 'REPORT_INVOICING_SALES',
  UpdateConfigurationRole = 'UPDATE_CONFIGURATION_ROLE',
  UpdateConfigurationShop = 'UPDATE_CONFIGURATION_SHOP',
  UpdateConfigurationUser = 'UPDATE_CONFIGURATION_USER',
  UpdateConfigurationWarehouse = 'UPDATE_CONFIGURATION_WAREHOUSE',
  UpdateCredit = 'UPDATE_CREDIT',
  UpdateCrmCity = 'UPDATE_CRM_CITY',
  UpdateCrmCoupon = 'UPDATE_CRM_COUPON',
  UpdateCrmCustomer = 'UPDATE_CRM_CUSTOMER',
  UpdateCrmDiscountrule = 'UPDATE_CRM_DISCOUNTRULE',
  UpdateInventoryAdjustment = 'UPDATE_INVENTORY_ADJUSTMENT',
  UpdateInventoryAttrib = 'UPDATE_INVENTORY_ATTRIB',
  UpdateInventoryBrand = 'UPDATE_INVENTORY_BRAND',
  UpdateInventoryCategory = 'UPDATE_INVENTORY_CATEGORY',
  UpdateInventoryColor = 'UPDATE_INVENTORY_COLOR',
  UpdateInventoryInput = 'UPDATE_INVENTORY_INPUT',
  UpdateInventoryOutput = 'UPDATE_INVENTORY_OUTPUT',
  UpdateInventoryProduct = 'UPDATE_INVENTORY_PRODUCT',
  UpdateInventoryReference = 'UPDATE_INVENTORY_REFERENCE',
  UpdateInventoryRequest = 'UPDATE_INVENTORY_REQUEST',
  UpdateInventorySize = 'UPDATE_INVENTORY_SIZE',
  UpdateInventoryTransfer = 'UPDATE_INVENTORY_TRANSFER',
  UpdateInvoicingAuthorization = 'UPDATE_INVOICING_AUTHORIZATION',
  UpdateInvoicingOrder = 'UPDATE_INVOICING_ORDER',
  UpdateInvoicingPointofsale = 'UPDATE_INVOICING_POINTOFSALE',
  UpdateTreasuryBox = 'UPDATE_TREASURY_BOX',
  UpdateTreasuryExpense = 'UPDATE_TREASURY_EXPENSE',
  UpdateTreasuryPayment = 'UPDATE_TREASURY_PAYMENT',
  UpdateTreasuryReceipt = 'UPDATE_TREASURY_RECEIPT',
  VerifiedTreasuryErrrorsCash = 'VERIFIED_TREASURY_ERRRORS_CASH',
}

/** Punto de venta de la tienda */
export type PointOfSale = {
  __typename?: 'PointOfSale';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Tienda a la que pertenece el punto de venta */
  authorization: AuthorizationDian;
  /** Caja del punto de venta */
  box: Box;
  /** Fecha de cierre */
  closeDate?: Maybe<Scalars['DateTime']>;
  /** Se encuentra en proceso de cierre */
  closing?: Maybe<Scalars['Boolean']>;
  /** Compañia a la que pertenece el punto de venta */
  company: Company;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Nombre del punto de venta */
  name: Scalars['String'];
  /** Tienda a la que pertenece el punto de venta */
  shop: Shop;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el punto de venta */
  user: User;
};

/** Productos del sistema */
export type Product = {
  __typename?: 'Product';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Código de barras del producto */
  barcode: Scalars['String'];
  /** Color del producto */
  color: Color;
  /** Fecha de creación del producto */
  createdAt: Scalars['DateTime'];
  /** Imagenes del producto */
  images?: Maybe<Image[]>;
  /** Referencia del producto */
  reference: Reference;
  /** Talla del producto */
  size: Size;
  /** Estado del producto */
  status: StatusProduct;
  /** Inventario del producto por bodegas */
  stock?: Maybe<Stock[]>;
  /** Fecha de actualización del producto */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea el producto */
  user: User;
};

export type Query = {
  __typename?: 'Query';
  /** Listado de atributos */
  attribs: ResponseAttribs;
  /** Lista de autorizaciones */
  authorizations: ResponseAuthorizations;
  /** Se encarga de listar las cajas */
  boxes: ResponseBoxes;
  /** Listado de marcas */
  brands: ResponseBrands;
  /** Lista las categorías */
  categories: ResponseCategories;
  /** Lista las categorías por level */
  categoriesLevel: ResponseCategories;
  /** Listado de ciudades */
  cities: ResponseCities;
  /** Lista de cierres x */
  closesXInvoicing: ResponseClosesXInvoicing;
  /** Lista de cierres z */
  closesZInvoicing: ResponseClosesZInvoicing;
  /** Lista los colores */
  colors: ResponseColors;
  /** Listado de las compañías */
  companies: ResponseCompanies;
  /** Lista de transportadoras */
  conveyors: ResponseConveyors;
  /** Lista de transportadoras para el pedido */
  conveyorsOrder: ConveyorOrder[];
  /** Consultar cupón */
  coupon: Coupon;
  /** Consultar cupones */
  coupons: ResponseCoupons;
  /** Crédito */
  credit: Credit;
  /** Historico de crédito */
  creditHistory: ResponseCreditHistory;
  /** Crédito */
  creditId: Credit;
  /** Lista de créditos */
  credits: ResponseCredits;
  /** Se encarga de obtener el usuario dependiendo del token enviado */
  currentUser: User;
  /** Listado de tipos de cliente */
  customerTypes: ResponseCustomerTypes;
  /** Listado de clientes */
  customers: ResponseCustomers;
  /** Lista de cierres fiscales */
  dailyClosings: ResponseDailyClosing;
  /** Listado de descuentos */
  discountRules: ResponseDiscountRules;
  /** Listado de tipos de documento */
  documentTypes: DocumentType[];
  /** Obtiene listado de traslados en error de productos entre bodegas */
  errorsCash: ResponseErrorCash;
  /** Se encarga de listar los egresos */
  expenses: ResponseExpenses;
  /** Consulta usada para ver el estado de la meta */
  goalStatus: ResponseGoalStatus;
  /** Listado de imagenes */
  images: ResponseImages;
  /** Lista de facturas */
  invoices: ResponseInvoices;
  /** Obtiene la orden por el id */
  orderId: ResponseOrder;
  /** Obtener las ordenes */
  orders: ResponseOrders;
  /** Obtener las ordenes por punto de venta */
  ordersByPointOfSale: Order[];
  /** Se encarga de listar los metodos de pago */
  payments: ResponsePayments;
  /** Se encarga de listar los permisos */
  permissions: PermissionData[];
  /** Lista de puntos de venta */
  pointOfSales: ResponsePointOfSales;
  /** Obtiene un producto */
  product: Product;
  /** Lista los productos */
  products: ResponseProducts;
  /** Se encarga de listar los metodos de pago */
  receipts: ResponseReceipts;
  /** Obtiene la referencia por el identificador */
  referenceId: ReferenceData;
  /** Listado de las referencias */
  references: ResponseReferences;
  /** Consulta las ventas por rango de fechas */
  reportSales: ResponseReportSales;
  /** Lista de devoluciones de pedidos */
  returnsOrder: ResponseReturnsOrder;
  /** Obtiene el rol por el identificador */
  roleId: Role;
  /** Listado de las roles */
  roles: ResponseRoles;
  /** Obtiene la tienda por el identificador */
  shopId: Shop;
  /** Se encarga de listar las tiendas */
  shops: ResponseShops;
  /** Listar las tallas */
  sizes: ResponseSizes;
  /** Obtiene un ajuste de productos con base a su identificador */
  stockAdjustmentId: StockAdjustment;
  /** Lista de ajustes de productos */
  stockAdjustments: ResponseStockAdjustments;
  /** Obtiene una entrada de productos con base a su identificador */
  stockInputId: StockInput;
  /** Lista de entradas de productos */
  stockInputs: ResponseStockInputs;
  /** Obtiene una salida de productos con base al identificador */
  stockOutputId: StockOutput;
  /** Listado de salidas de productos */
  stockOutputs: ResponseStockOutputs;
  /** Obtiene una solicitud de productos por su identificador */
  stockRequestId: StockRequest;
  /** Lista las solicitudes de productos */
  stockRequests: ResponseStockRequests;
  /** Consulta el trasldo por el identificador */
  stockTransferId: StockTransfer;
  /** Obtiene listado de traslados de productos entre bodegas */
  stockTransfers: ResponseStockTransfers;
  /** Obtiene listado de traslados en error de productos entre bodegas */
  stockTransfersError: ResponseStockTransfersError;
  /** Consulta todos los usuarios con base a los filtros */
  users: ResponseUsers;
  /** Se encarga de traer bodega por identificador */
  warehouseId: Warehouse;
  /** Se encarga de listar las bodegas */
  warehouses: ResponseWarehouses;
};

export type QueryAttribsArgs = {
  filtersAttribsInput?: InputMaybe<FiltersAttribsInput>;
};

export type QueryAuthorizationsArgs = {
  filtersAuthorizations?: InputMaybe<FiltersAuthorizationInput>;
};

export type QueryBoxesArgs = {
  filtersBoxesInput?: InputMaybe<FiltersBoxesInput>;
};

export type QueryBrandsArgs = {
  filtersBrandsInput?: InputMaybe<FiltersBrandsInput>;
};

export type QueryCategoriesArgs = {
  filtersCategoriesInput?: InputMaybe<FiltersCategoriesInput>;
};

export type QueryCategoriesLevelArgs = {
  filtersCategoriesLevelInput?: InputMaybe<FiltersCategoriesLevelInput>;
};

export type QueryCitiesArgs = {
  filtersCitiesInput?: InputMaybe<FiltersCitiesInput>;
};

export type QueryClosesXInvoicingArgs = {
  filtersClosesXInvoicing?: InputMaybe<FiltersClosesXInvoicingInput>;
};

export type QueryClosesZInvoicingArgs = {
  filtersClosesZInvoicing?: InputMaybe<FiltersClosesZInvoicingInput>;
};

export type QueryColorsArgs = {
  filtersColorsInput?: InputMaybe<FiltersColorsInput>;
};

export type QueryCompaniesArgs = {
  filtersCompaniesInput?: InputMaybe<FiltersCompaniesInput>;
};

export type QueryConveyorsArgs = {
  filtersConveyorsInput?: InputMaybe<FiltersConveyorsInput>;
};

export type QueryConveyorsOrderArgs = {
  orderId: Scalars['String'];
};

export type QueryCouponArgs = {
  filtersCouponInput: FiltersCouponInput;
};

export type QueryCouponsArgs = {
  filtersCouponsInput: FiltersCouponsInput;
};

export type QueryCreditArgs = {
  filtersCreditInput: FiltersCreditInput;
};

export type QueryCreditHistoryArgs = {
  FiltersCreditHistoryInput: FiltersCreditHistoryInput;
};

export type QueryCreditIdArgs = {
  id: Scalars['String'];
};

export type QueryCreditsArgs = {
  filtersCreditsInput?: InputMaybe<FiltersCreditsInput>;
};

export type QueryCustomerTypesArgs = {
  filtersCustomerTypesInput: FiltersCustomerTypesInput;
};

export type QueryCustomersArgs = {
  filtersCustomerInput?: InputMaybe<FiltersCustomersInput>;
};

export type QueryDailyClosingsArgs = {
  filtersDailyClosing?: InputMaybe<FiltersDailyClosing>;
};

export type QueryDiscountRulesArgs = {
  filtersDiscountRulesInput?: InputMaybe<FiltersDiscountRulesInput>;
};

export type QueryDocumentTypesArgs = {
  filtersDocumentTypesInput?: InputMaybe<FiltersDocumentTypesInput>;
};

export type QueryErrorsCashArgs = {
  filtersErrorsCashInput: FiltersErrorsCashInput;
};

export type QueryExpensesArgs = {
  filtersExpensesInput?: InputMaybe<FiltersExpensesInput>;
};

export type QueryGoalStatusArgs = {
  filtersGoalStatus: FiltersGoalStatusInput;
};

export type QueryImagesArgs = {
  filtersImagesInput?: InputMaybe<FiltersImagesInput>;
};

export type QueryInvoicesArgs = {
  filtersInvoices?: InputMaybe<FiltersInvoicesInput>;
};

export type QueryOrderIdArgs = {
  id: Scalars['String'];
};

export type QueryOrdersArgs = {
  filtersOrdersInput: FiltersOrdersInput;
};

export type QueryPaymentsArgs = {
  filtersPaymentsInput?: InputMaybe<FiltersPaymentsInput>;
};

export type QueryPointOfSalesArgs = {
  filtersPointOfSales?: InputMaybe<FiltersPointOfSalesInput>;
};

export type QueryProductArgs = {
  filtersProductInput?: InputMaybe<FiltersProductInput>;
};

export type QueryProductsArgs = {
  filtersProductsInput?: InputMaybe<FiltersProductsInput>;
};

export type QueryReceiptsArgs = {
  filtersReceiptsInput?: InputMaybe<FiltersReceiptsInput>;
};

export type QueryReferenceIdArgs = {
  id: Scalars['String'];
  productsStatus?: InputMaybe<Scalars['String']>;
};

export type QueryReferencesArgs = {
  companyId: Scalars['String'];
  filtersReferencesInput?: InputMaybe<FiltersReferencesInput>;
};

export type QueryReportSalesArgs = {
  filtersSalesReportInput: FiltersSalesReportInput;
};

export type QueryReturnsOrderArgs = {
  filtersReturnsOrder?: InputMaybe<FiltersReturnsOrderInput>;
};

export type QueryRoleIdArgs = {
  id: Scalars['String'];
};

export type QueryRolesArgs = {
  filtersRolesInput?: InputMaybe<FiltersRolesInput>;
};

export type QueryShopIdArgs = {
  id: Scalars['String'];
};

export type QueryShopsArgs = {
  filtersShopsInput?: InputMaybe<FiltersShopsInput>;
};

export type QuerySizesArgs = {
  filtersSizesInput?: InputMaybe<FiltersSizesInput>;
};

export type QueryStockAdjustmentIdArgs = {
  id: Scalars['String'];
};

export type QueryStockAdjustmentsArgs = {
  filtersStockAdjustmentsInput?: InputMaybe<FiltersStockAdjustmentsInput>;
};

export type QueryStockInputIdArgs = {
  id: Scalars['String'];
};

export type QueryStockInputsArgs = {
  filtersStockInputsInput?: InputMaybe<FiltersStockInputsInput>;
};

export type QueryStockOutputIdArgs = {
  id: Scalars['String'];
};

export type QueryStockOutputsArgs = {
  filtersStockOutputsInput?: InputMaybe<FiltersStockOutputsInput>;
};

export type QueryStockRequestIdArgs = {
  id: Scalars['String'];
};

export type QueryStockRequestsArgs = {
  filtersStockRequestsInput?: InputMaybe<FiltersStockRequestsInput>;
};

export type QueryStockTransferIdArgs = {
  id: Scalars['String'];
};

export type QueryStockTransfersArgs = {
  filtersStockTransfersInput?: InputMaybe<FiltersStockTransfersInput>;
};

export type QueryStockTransfersErrorArgs = {
  filtersStockTransfersErrorInput?: InputMaybe<FiltersStockTransfersErrorInput>;
};

export type QueryUsersArgs = {
  filtersUsersInput?: InputMaybe<FiltersUsersInput>;
};

export type QueryWarehouseIdArgs = {
  warehouseId: Scalars['String'];
};

export type QueryWarehousesArgs = {
  filtersWarehousesInput?: InputMaybe<FiltersWarehousesInput>;
};

/** Rangos de precio por regiones */
export type RatesRegion = {
  __typename?: 'RatesRegion';
  /** Precio de la zona */
  price: Scalars['Float'];
  /** Zona a aplicar el precio */
  zone: ZoneType;
};

/** Egreso de dinero */
export type Receipt = {
  __typename?: 'Receipt';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Caja afectada por el recibo si es efectivo */
  box?: Maybe<Box>;
  /** Empresa a la que pertenece el recibo de caja */
  company: Company;
  /** Concepto del recibo de caja */
  concept?: Maybe<Scalars['String']>;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Detalle del cruce del recibo */
  details: DetailReceipt[];
  /** Valida si el recibo de caja es crédito */
  isCredit: Scalars['Boolean'];
  /** Consecutivo del recibo de caja */
  number: Scalars['Float'];
  /** Método de pago del recibo de caja */
  payment: Payment;
  /** Punto de venta que genera el recibo */
  pointOfSale: Box;
  /** Prefijo recibo de caja */
  prefix: Scalars['String'];
  /** Estado del recibo de caja */
  status: StatusReceipt;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el recibo de caja */
  user: User;
  /** Valor del recibo de caja */
  value: Scalars['Float'];
};

/** Referencia de los productos */
export type Reference = {
  __typename?: 'Reference';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Estado de la referencia */
  active: Scalars['Boolean'];
  /** Atributos de la referencia */
  attribs?: Maybe<Attrib[]>;
  /** Marca de la referencia */
  brand: Brand;
  /** Categoría Nivel 1 de la referencia */
  categoryLevel1: CategoryLevel1;
  /** Categoría Nivel 2 de la referencia */
  categoryLevel2?: Maybe<CategoryLevel2>;
  /** Categoría Nivel 3 de la referencia */
  categoryLevel3?: Maybe<CategoryLevel3>;
  /** Determina si la referencia se puede cambiar */
  changeable: Scalars['Boolean'];
  /** Compañias que pueden usar la referencia */
  companies: Company[];
  /** Costo de la referencia */
  cost: Scalars['Float'];
  /** Fecha de creación de la referencia */
  createdAt: Scalars['DateTime'];
  /** Descripción de la referencia */
  description: Scalars['String'];
  /** Nombre de la referencia */
  name: Scalars['String'];
  /** Precio de la referencia */
  price: Scalars['Float'];
  /** Medidas de la referencia */
  shipping: Shipping;
  /** Fecha de actualización de la referencia */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la referencia */
  user: User;
};

/** Respuesta de la referencias */
export type ReferenceData = {
  __typename?: 'ReferenceData';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Estado de la referencia */
  active: Scalars['Boolean'];
  /** Atributos de la referencia */
  attribs?: Maybe<Attrib[]>;
  /** Marca de la referencia */
  brand: Brand;
  /** Categoría Nivel 1 de la referencia */
  categoryLevel1: CategoryLevel1;
  /** Categoría Nivel 2 de la referencia */
  categoryLevel2?: Maybe<CategoryLevel2>;
  /** Categoría Nivel 3 de la referencia */
  categoryLevel3?: Maybe<CategoryLevel3>;
  /** Determina si la referencia se puede cambiar */
  changeable: Scalars['Boolean'];
  /** Compañias que pueden usar la referencia */
  companies: Company[];
  /** Costo de la referencia */
  cost: Scalars['Float'];
  /** Fecha de creación de la referencia */
  createdAt: Scalars['DateTime'];
  /** Descripción de la referencia */
  description: Scalars['String'];
  /** Precio con descuento si se envía el tipo de cliente */
  discountPrice: Scalars['Float'];
  /** Nombre de la referencia */
  name: Scalars['String'];
  /** Precio de la referencia */
  price: Scalars['Float'];
  /** Productos de la referencia */
  products: Product[];
  /** Medidas de la referencia */
  shipping: Shipping;
  /** Fecha de actualización de la referencia */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la referencia */
  user: User;
};

/** Resumen de los pagos */
export type RefundOrderClose = {
  __typename?: 'RefundOrderClose';
  /** Cantidad de productos devueltos */
  quantity?: Maybe<Scalars['Float']>;
  /** Valor de las devoluciones */
  value?: Maybe<Scalars['Float']>;
};

/** Respuesta al listado de los atributos */
export type ResponseAttribs = {
  __typename?: 'ResponseAttribs';
  /** Lista de atributos */
  docs: Attrib[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de autorizaciones de facturación */
export type ResponseAuthorizations = {
  __typename?: 'ResponseAuthorizations';
  /** Lista de autorización de facturación */
  docs: AuthorizationDian[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta a la consulta de cajas */
export type ResponseBoxes = {
  __typename?: 'ResponseBoxes';
  /** Lista de cajas */
  docs: Box[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta al listado de las marcas */
export type ResponseBrands = {
  __typename?: 'ResponseBrands';
  /** Lista de marcas */
  docs: Brand[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta al listado de las categorías */
export type ResponseCategories = {
  __typename?: 'ResponseCategories';
  /** Lista de categorías */
  docs: CategoryLevel1[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta del listado de ciudades */
export type ResponseCities = {
  __typename?: 'ResponseCities';
  /** Lista de ciudades */
  docs: City[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de cierres X */
export type ResponseClosesXInvoicing = {
  __typename?: 'ResponseClosesXInvoicing';
  /** Lista de cierres X */
  docs: CloseXInvoicing[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de cierres Z */
export type ResponseClosesZInvoicing = {
  __typename?: 'ResponseClosesZInvoicing';
  /** Lista de cierres Z */
  docs: CloseZInvoicing[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta al listado de los colores */
export type ResponseColors = {
  __typename?: 'ResponseColors';
  /** Lista de colores */
  docs: Color[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de compañías */
export type ResponseCompanies = {
  __typename?: 'ResponseCompanies';
  /** Lista de compañías */
  docs: Company[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de traslados de transportadoras */
export type ResponseConveyors = {
  __typename?: 'ResponseConveyors';
  /** Lista de transportadoras */
  docs: Conveyor[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta del listado de cupones */
export type ResponseCoupons = {
  __typename?: 'ResponseCoupons';
  /** Lista de cupones */
  docs: Coupon[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta al listado del historial de créditos */
export type ResponseCreditHistory = {
  __typename?: 'ResponseCreditHistory';
  /** Lista del historial de créditos */
  docs: CreditHistory[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta al listado de los créditos */
export type ResponseCredits = {
  __typename?: 'ResponseCredits';
  /** Lista de créditos */
  docs: Credit[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta del listado de tipos de cliente */
export type ResponseCustomerTypes = {
  __typename?: 'ResponseCustomerTypes';
  /** Lista de tipos de cliente */
  docs: CustomerType[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de documentos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta del listado de clientes */
export type ResponseCustomers = {
  __typename?: 'ResponseCustomers';
  /** Lista de clientes */
  docs: Customer[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de documentos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de cierres fiscales */
export type ResponseDailyClosing = {
  __typename?: 'ResponseDailyClosing';
  /** Lista de cierres fiscales */
  docs: DailyClosing[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta del listado de reglas de descuento */
export type ResponseDiscountRules = {
  __typename?: 'ResponseDiscountRules';
  /** Lista de reglas de descuento */
  docs: DiscountRule[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta a la consulta de cajas */
export type ResponseErrorCash = {
  __typename?: 'ResponseErrorCash';
  /** Lista de errores de efectivo */
  docs: ErrorCash[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta a la consulta de egresos */
export type ResponseExpenses = {
  __typename?: 'ResponseExpenses';
  /** Lista de egresos */
  docs: Expense[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta de la creación de los cierres diarios de facturación */
export type ResponseGenerateDailyClosing = {
  __typename?: 'ResponseGenerateDailyClosing';
  /** Mensaje de respuesta */
  message: Scalars['String'];
  /** Cantidad de cierres diarios creados */
  quantity: Scalars['Float'];
};

/** Datos resultado de la consulta de Estado de la meta */
export type ResponseGoalStatus = {
  __typename?: 'ResponseGoalStatus';
  /** Meta */
  goal: Scalars['Float'];
  /** Venta neta generada por el usuario */
  netSales: Scalars['Float'];
};

/** Respuesta al listado de las imagenes */
export type ResponseImages = {
  __typename?: 'ResponseImages';
  /** Lista de imagenes */
  docs: Image[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de facturas */
export type ResponseInvoices = {
  __typename?: 'ResponseInvoices';
  /** Lista de facturas */
  docs: Invoice[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Resultado de facturación */
export type ResponseInvoicing = {
  __typename?: 'ResponseInvoicing';
  /** Cantidad de facturas generadas */
  invoiceQuantityBank: Scalars['Float'];
  /** Cantidad de facturas generadas */
  invoiceQuantityCash: Scalars['Float'];
  /** Valor total facturado */
  valueInvoicingBank: Scalars['Float'];
  /** Valor total facturado */
  valueInvoicingCash: Scalars['Float'];
};

/** Respuesta para obtener la orden */
export type ResponseOrder = {
  __typename?: 'ResponseOrder';
  /** Crédito que tiene el cliente */
  credit?: Maybe<Credit>;
  /** Pedido actualizado */
  order: Order;
};

/** Lista de predidos */
export type ResponseOrders = {
  __typename?: 'ResponseOrders';
  /** Lista de pedidos */
  docs: Order[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta a la consulta de metodos de pago */
export type ResponsePayments = {
  __typename?: 'ResponsePayments';
  /** Lista de metodos de pago */
  docs: Payment[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de puntos de venta */
export type ResponsePointOfSales = {
  __typename?: 'ResponsePointOfSales';
  /** Lista de puntos de venta */
  docs: PointOfSale[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta al listado de los productos */
export type ResponseProducts = {
  __typename?: 'ResponseProducts';
  /** Lista de productos */
  docs: Product[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Resultado al crear un recibo de caja */
export type ResponseReceipt = {
  __typename?: 'ResponseReceipt';
  /** Crédito afectado por el recibo de caja */
  credit: Credit;
  /** Recibo de caja generado */
  receipt: Receipt;
};

/** Respuesta a la consulta de recibos de caja */
export type ResponseReceipts = {
  __typename?: 'ResponseReceipts';
  /** Lista de recibos de caja */
  docs: Receipt[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta al listado de las referencias */
export type ResponseReferences = {
  __typename?: 'ResponseReferences';
  /** Lista de referencias */
  docs: ReferenceData[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Reportde de ventas generales */
export type ResponseReportSales = {
  __typename?: 'ResponseReportSales';
  /** Ventas por tipo de cliente */
  customersSalesReport?: Maybe<CustomerSalesReport[]>;
  /** Medios de pago */
  paymentsSalesReport?: Maybe<PaymentsSalesReport[]>;
  /** Ventas detalladas */
  salesReport?: Maybe<SalesReport[]>;
  /** Resumen de ventas */
  summarySalesReport?: Maybe<SummarySalesReport>;
};

/** Lista de devoluciones de ordenes */
export type ResponseReturnsOrder = {
  __typename?: 'ResponseReturnsOrder';
  /** Lista de devoluci0nes */
  docs: ReturnOrder[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta a la consulta de roles */
export type ResponseRoles = {
  __typename?: 'ResponseRoles';
  /** Lista de roles */
  docs: Role[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta a la consulta de tiendas */
export type ResponseShops = {
  __typename?: 'ResponseShops';
  /** Lista de tiendas */
  docs: Shop[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta al listado de las tallas */
export type ResponseSizes = {
  __typename?: 'ResponseSizes';
  /** Lista de tallas */
  docs: Size[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de ajustes de productos */
export type ResponseStockAdjustments = {
  __typename?: 'ResponseStockAdjustments';
  /** Lista de ajustes */
  docs: StockAdjustment[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de entradas de productos */
export type ResponseStockInputs = {
  __typename?: 'ResponseStockInputs';
  /** Lista de entradas */
  docs: StockInput[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de salidas de productos */
export type ResponseStockOutputs = {
  __typename?: 'ResponseStockOutputs';
  /** Lista de salidas */
  docs: StockOutput[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de solicitudes de productos */
export type ResponseStockRequests = {
  __typename?: 'ResponseStockRequests';
  /** Lista de solicitudes */
  docs: StockRequest[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de traslados de productos */
export type ResponseStockTransfers = {
  __typename?: 'ResponseStockTransfers';
  /** Lista de traslados */
  docs: StockTransfer[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de traslados en error de productos */
export type ResponseStockTransfersError = {
  __typename?: 'ResponseStockTransfersError';
  /** Lista de traslados en error */
  docs: StockTransferError[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Lista de usuarios */
export type ResponseUsers = {
  __typename?: 'ResponseUsers';
  /** Lista de usuarios */
  docs: User[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Respuesta a la consulta de bodegas */
export type ResponseWarehouses = {
  __typename?: 'ResponseWarehouses';
  /** Lista de salidas */
  docs: Warehouse[];
  /** ¿Encuentra página siguiente? */
  hasNextPage: Scalars['Boolean'];
  /** ¿Encuentra página anterior? */
  hasPrevPage: Scalars['Boolean'];
  /** Total de docuementos solicitados */
  limit: Scalars['Float'];
  /** Página siguente */
  nextPage: Scalars['Float'];
  /** Página actual */
  page: Scalars['Float'];
  pagingCounter: Scalars['Float'];
  /** Página anterior */
  prevPage: Scalars['Float'];
  /** Total de documentos */
  totalDocs: Scalars['Float'];
  /** Total de páginas */
  totalPages: Scalars['Float'];
};

/** Devoluciones de facturación */
export type ReturnOrder = {
  __typename?: 'ReturnOrder';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Estado del devolucion */
  active: Scalars['Boolean'];
  /** Compañía a la que pertence la devolución */
  company: Company;
  /** Cupón generado */
  coupon: Coupon;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Productos de la devolución */
  details?: Maybe<DetailReturnInvoice[]>;
  /** Número consecutivo */
  number: Scalars['Float'];
  /** Pedido de la devolución */
  order: Order;
  /** Punto de venta */
  pointOfSale: PointOfSale;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó la factrura */
  user: User;
};

/** Rol del usuario  */
export type Role = {
  __typename?: 'Role';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Se encuentra activo el rol */
  active: Scalars['Boolean'];
  /** Permite hacer consultas con otra bodega */
  changeWarehouse: Scalars['Boolean'];
  /** Fecha de creación del rol */
  createdAt: Scalars['DateTime'];
  /** Nombre asignado al rol */
  name: Scalars['String'];
  /** Permisos al los quie tiene el rol */
  permissions: Permission[];
  /** Fecha en la que se actualizó el rol */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o modificó el rol */
  user: User;
};

/** Reglas para el descuento */
export type Rule = {
  __typename?: 'Rule';
  /** Identificador de los documentos */
  documentIds: Scalars['String'][];
  /** Tipo de documento para validar el descuento */
  documentType: DocumentTypesRule;
  /** Tipo de regla que deben cumplir los documentos */
  type: TypesRule;
};

/** Regla de descuento */
export type RuleInput = {
  /** Identificador de los documentos */
  documentIds: Scalars['String'][];
  /** Tipo de documento para validar el descuento */
  documentType: DocumentTypesRule;
  /** Tipo de regla que deben cumplir los documentos */
  type: TypesRule;
};

/** Ventas detalladas con base a los filtros */
export type SalesReport = {
  __typename?: 'SalesReport';
  /** Categoría */
  category?: Maybe<CategoryLevel1>;
  /** Cantidad de productos de la categoría vendidos o cantidad de pedidos generados */
  quantity: Scalars['Float'];
  /** Tienda */
  shop: Shop;
  /** Valor total de la venta */
  total: Scalars['Float'];
};

/** Datos de medidas para el envío de los productos */
export type Shipping = {
  __typename?: 'Shipping';
  /** Fecha de creación del dato de envio */
  createdAt: Scalars['DateTime'];
  /** Alto del producto */
  height: Scalars['Float'];
  /** Largo del producto */
  long: Scalars['Float'];
  /** Fecha de actualización del dato de envio */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea los datos de envío */
  user: User;
  /** Volumen del producto */
  volume: Scalars['Float'];
  /** Peso del producto */
  weight: Scalars['Float'];
  /** Ancho del producto */
  width: Scalars['Float'];
};

export type Shop = {
  __typename?: 'Shop';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Dirección de la tienda */
  address?: Maybe<Scalars['String']>;
  /** Empresa que usa la tienda */
  company: Warehouse;
  /** Nombre comercial de la tienda */
  companyName?: Maybe<Scalars['String']>;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Bodega predeterminada para la tienda */
  defaultWarehouse: Warehouse;
  /** Documento de la tienda(NIT) */
  document?: Maybe<Scalars['String']>;
  /** Correo de la tienda */
  email?: Maybe<Scalars['String']>;
  /** Meta asiganda a la tienda */
  goal: Scalars['Float'];
  /** Es centro de distribución */
  isMain: Scalars['Boolean'];
  /** Nombre de la tienda */
  name: Scalars['String'];
  /** Teléfono de la tienda */
  phone?: Maybe<Scalars['String']>;
  /** Estado de la tienda */
  status: StatusShop;
  /** Fecha de creación */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la tienda */
  user: User;
  /** Bodega de centro de distribución asignado */
  warehouseMain?: Maybe<Warehouse>;
};

/** Datos para el registro de un usuario */
export type SignUpInput = {
  /** Fecha de cumpleaños del cliente */
  birthDate?: InputMaybe<Scalars['String']>;
  /** Identificador de la compañia a la que pertenece */
  companyId: Scalars['String'];
  /** Identificación de tipo de cliente */
  customerTypeId: Scalars['String'];
  /** Documento de identidad del cliente */
  document: Scalars['String'];
  /** Identificación del tipo de documento de identidad del cliente */
  documentTypeId: Scalars['String'];
  /** Correo del cliente */
  email: Scalars['String'];
  /** Nombres del cliente */
  firstName: Scalars['String'];
  /** Apellidos del cliente */
  lastName: Scalars['String'];
  /** Contraseña del cliente */
  password: Scalars['String'];
  /** Teléfono del cliente */
  phone?: InputMaybe<Scalars['String']>;
};

/** Talla del producto */
export type Size = {
  __typename?: 'Size';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Estado de la talla */
  active: Scalars['Boolean'];
  /** Fecha de creación de la talla */
  createdAt: Scalars['DateTime'];
  /**
   * Identificador mysql
   * @deprecated Campo para migración de mysql
   */
  id?: Maybe<Scalars['Float']>;
  /** Fecha de actualización de la talla */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la talla */
  user: User;
  /** Valor de la talla */
  value: Scalars['String'];
  /** Peso de la talla para el ordenamiento */
  weight: Scalars['Float'];
};

/** Ordenamiento para el listado de atributos */
export type SortAttrib = {
  active?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de las autorizaciones */
export type SortAuthorization = {
  /** Ordenamiento por prefijo */
  prefix?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de las cajas */
export type SortBox = {
  base?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  isMain?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento para el listado de marcas */
export type SortBrand = {
  active?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento para el listado de categorías */
export type SortCategories = {
  createdAt?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de la ciudad */
export type SortCity = {
  /** ordernamiento por país */
  country?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por documento */
  name?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por estado */
  state?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de cierre z */
export type SortCloseXInvoicing = {
  /** Ordenamiento por fecha de cierre */
  closeDate?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por numero */
  number?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de cierre z */
export type SortCloseZInvoicing = {
  /** Ordenamiento por fecha de cierre */
  closeDate?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por numero */
  number?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento para el listado de colores */
export type SortColor = {
  active?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  name_internal?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de la trasnportadora */
export type SortCompany = {
  /** Ordenamiento por nombre */
  active?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por nombre */
  name?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por nombre */
  regimenSimplify?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de creación */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de la trasnportadora */
export type SortConveyor = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por nombre */
  name?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de creación */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento del ccupón */
export type SortCoupon = {
  /** ordernamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por fecha de expiración */
  expiration?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por consecutivo */
  number?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por estado */
  status?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de los créditos */
export type SortCredit = {
  /** Ordenamiento por monto aprobado */
  amount?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por monto disponible */
  available?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por monto ocupado */
  balance?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por monto congelado */
  frozenAmount?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por estado */
  status?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de los créditos */
export type SortCreditHistory = {
  /** Ordenamiento por monto aprobado */
  amount?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Tipo de historico de créditos */
  type?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento del cliente */
export type SortCustomer = {
  /** ordernamiento por estado del cliente */
  active?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por documento */
  document?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por correo */
  email?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por nombre */
  firstName?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por si es por defecto */
  isDefault?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por si tiene whatsapp */
  isWhatsapp?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por apellido */
  lastName?: InputMaybe<Scalars['Float']>;
  /** ordernamiento por teléfono */
  phone?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de cierre z */
export type SortDailyClosing = {
  /** Ordenamiento por fecha de cierre */
  closeDate?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
};

/** Datos para el ordenamiento */
export type SortDiscountRule = {
  active?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  dateFinal?: InputMaybe<Scalars['Float']>;
  dateInitial?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  percent?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
  value?: InputMaybe<Scalars['Float']>;
};

/** Ordenamient */
export type SortErrosCash = {
  value?: InputMaybe<Scalars['Float']>;
  verified?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de los egresos */
export type SortExpense = {
  createdAt?: InputMaybe<Scalars['Float']>;
  number?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
  value?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento para el listado de imagenes */
export type SortImage = {
  name?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de facturas */
export type SortInovice = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de pedidos */
export type SortOrder = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por número consecutivo del pedido */
  number?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de la teinda */
export type SortPayment = {
  active?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento para el listado de colores */
export type SortPointOfSale = {
  closeDate?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento para el listado de productos */
export type SortProduct = {
  barcode?: InputMaybe<Scalars['Float']>;
  changeable?: InputMaybe<Scalars['Float']>;
  cost?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['Float']>;
  price?: InputMaybe<Scalars['Float']>;
  reference?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de los recibos de caja */
export type SortReceipt = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por consecutivo */
  number?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por estado del recibo */
  status?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por valor del recibo */
  value?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento para el listado de referencias */
export type SortReference = {
  changeable?: InputMaybe<Scalars['Float']>;
  cost?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  price?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de las devoluciones en pedido */
export type SortReturnOrder = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento para el listado de roles */
export type SortRole = {
  active?: InputMaybe<Scalars['Float']>;
  changeWarehouse?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de la tienda */
export type SortShop = {
  address?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  goal?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  phone?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento para el listado de tallas */
export type SortSize = {
  active?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
  weight?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento del ajuste de productos */
export type SortStockAdjustment = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por número */
  number?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por estado */
  status?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por total */
  total?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por bodega */
  warehouse?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de la entrada de productos */
export type SortStockInput = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por número */
  number?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por estado */
  status?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por total */
  total?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por bodega */
  warehouse?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de la salida de productos */
export type SortStockOutput = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por número */
  number?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por estado */
  status?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por total */
  total?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por bodega */
  warehouse?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento del solicitudes de productos */
export type SortStockRequest = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por número */
  number?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por estado */
  status?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por bodega de destino */
  warehouseDestination?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por bodega de origen */
  warehouseOrigin?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento del traslado de productos */
export type SortStockTransfer = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por número */
  number?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por estado */
  status?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por bodega de destino */
  warehouseDestination?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por bodega de origen */
  warehouseOrigin?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento del traslado de productos */
export type SortStockTransferError = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de actualización */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de los usuarios */
export type SortUser = {
  createdAt?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
  username?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento de la bodega */
export type SortWarehouse = {
  active?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  isMain?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

export enum StatusCoupon {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Redeemed = 'REDEEMED',
}

export enum StatusCredit {
  Active = 'ACTIVE',
  Finish = 'FINISH',
  Suspend = 'SUSPEND',
}

export enum StatusDetailTransfer {
  Confirmed = 'CONFIRMED',
  New = 'NEW',
  Sent = 'SENT',
}

export enum StatusDetailTransferError {
  Confirmed = 'CONFIRMED',
  Missing = 'MISSING',
  Surplus = 'SURPLUS',
}

export enum StatusExpense {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
}

export enum StatusOrder {
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Open = 'OPEN',
  Pendding = 'PENDDING',
}

export enum StatusOrderDetail {
  Confirmed = 'CONFIRMED',
  New = 'NEW',
}

export enum StatusProduct {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum StatusReceipt {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
}

export enum StatusShop {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspend = 'SUSPEND',
}

export enum StatusStockAdjustment {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Open = 'OPEN',
}

export enum StatusStockInput {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Open = 'OPEN',
}

export enum StatusStockOutput {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Open = 'OPEN',
}

export enum StatusStockRequest {
  Cancelled = 'CANCELLED',
  Open = 'OPEN',
  Pending = 'PENDING',
  Used = 'USED',
}

export enum StatusStockTransfer {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Incomplete = 'INCOMPLETE',
  Open = 'OPEN',
  Sent = 'SENT',
  Verified = 'VERIFIED',
}

export enum StatusUser {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspend = 'SUSPEND',
}

export enum StatusWeb {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Open = 'OPEN',
  PaymentConfirmed = 'PAYMENT_CONFIRMED',
  Pendding = 'PENDDING',
  PenddingCredit = 'PENDDING_CREDIT',
  Preparing = 'PREPARING',
  Sent = 'SENT',
}

/** Inventario por bodegas del producto */
export type Stock = {
  __typename?: 'Stock';
  /** Fecha de creación del dato de envio */
  createdAt: Scalars['DateTime'];
  /** Cantidad de productos en la bodega */
  quantity: Scalars['Float'];
  /** Fecha de actualización del dato de envio */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea los datos de envío */
  user: User;
  /** Identificador de la bodega */
  warehouse: Warehouse;
};

/** Ajuste de productos */
export type StockAdjustment = {
  __typename?: 'StockAdjustment';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Compañía a la que pertence el ajuste */
  company: Company;
  /** Fecha de creación de la entrada */
  createdAt: Scalars['DateTime'];
  /** Detalles del ajuste */
  details: DetailAdjustment[];
  /** Número consecutivo */
  number: Scalars['Float'];
  /** Observación de la entrada */
  observation?: Maybe<Scalars['String']>;
  /** Estado del ajuste */
  status: StatusStockAdjustment;
  /** Costo total del ajuste */
  total: Scalars['Float'];
  /** Fecha de la última actulización de la entrada */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó el ajuste */
  user: User;
  /** Bodega del ajuste */
  warehouse: Warehouse;
};

/** Salida de productos */
export type StockInput = {
  __typename?: 'StockInput';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Compañía a la que pertence la entrada */
  company: Company;
  /** Fecha de creación de la entrada */
  createdAt: Scalars['DateTime'];
  /** Detalles de la entrada */
  details: DetailInput[];
  /** Número consecutivo */
  number: Scalars['Float'];
  /** Observación de la entrada */
  observation?: Maybe<Scalars['String']>;
  /** Estado de la entrada */
  status: StatusStockInput;
  /** Costo total de la entrada */
  total: Scalars['Float'];
  /** Fecha de la última actulización de la entrada */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó la entrada */
  user: User;
  /** Bodega de la entrada */
  warehouse: Warehouse;
};

/** Salida de productos */
export type StockOutput = {
  __typename?: 'StockOutput';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Compañía a la que pertence la salida */
  company: Company;
  /** Fecha de creación de la salida */
  createdAt: Scalars['DateTime'];
  /** Detalles de la salida */
  details: DetailOutput[];
  /** Número consecutivo */
  number: Scalars['Float'];
  /** Observación de la entrada */
  observation?: Maybe<Scalars['String']>;
  /** Estado de la salida */
  status: StatusStockOutput;
  /** Costo total de la salida */
  total: Scalars['Float'];
  /** Fecha de la última actulización de la salida */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó la salida */
  user: User;
  /** Bodega de la salida */
  warehouse: Warehouse;
};

/** Solicitud de productos */
export type StockRequest = {
  __typename?: 'StockRequest';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /**
   * Usuario que crea la solicitud
   * @deprecated Migración mysql
   */
  code?: Maybe<Scalars['String']>;
  /** Compañía a la que pertence la solicitud */
  company: Company;
  /** Fecha de creación de la solicitud */
  createdAt: Scalars['DateTime'];
  /** Detalles de la solicitud */
  details: DetailRequest[];
  /** Número consecutivo de identificación */
  number: Scalars['Float'];
  /** Observación de la solicitud */
  observation?: Maybe<Scalars['String']>;
  /** Estado de la solicitud */
  status: StatusStockRequest;
  /** Fecha de la última actulización de la solicitud */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la solicitud */
  user: User;
  /** Bodega de destino de la solicitud */
  warehouseDestination: Warehouse;
  /** Bodega de origen de la solicitud */
  warehouseOrigin: Warehouse;
};

/** Translado de productos */
export type StockTransfer = {
  __typename?: 'StockTransfer';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Compañía a la que pertence el traslado */
  company: Company;
  /** Fecha de creación del traslado */
  createdAt: Scalars['DateTime'];
  /** Detalle de los productos */
  details: DetailTransfer[];
  /** Consecutivo del traslado */
  number: Scalars['Float'];
  /** Observación general */
  observation?: Maybe<Scalars['String']>;
  /** Observación del que crea el traslado */
  observationDestination?: Maybe<Scalars['String']>;
  /** Observación del que crea el traslado */
  observationOrigin?: Maybe<Scalars['String']>;
  /** Solicitudes usadas */
  requests?: Maybe<StockRequest[]>;
  /** Estado del traslado */
  status: StatusStockTransfer;
  /** Fecha de actualización del traslado */
  updatedAt: Scalars['DateTime'];
  /** Usuario de destino del traslado */
  userDestination?: Maybe<User>;
  /** Usuario de origen del traslado */
  userOrigin: User;
  /** Bodega de origen del traslado */
  warehouseDestination: Warehouse;
  /** Bodega de origen del traslado */
  warehouseOrigin: Warehouse;
};

/** Errores en traslados de productos */
export type StockTransferError = {
  __typename?: 'StockTransferError';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Fecha de creación del traslado */
  createdAt: Scalars['DateTime'];
  /** Detalle de los productos que están en error */
  details: DetailTransferError[];
  /** Traslado al que está relacionado */
  stockTransfer: StockTransfer;
  /** Fecha de actualización del traslado */
  updatedAt: Scalars['DateTime'];
  /** Si ya fue verificados todos los errores */
  verified: Scalars['Boolean'];
};

/** Resumen del cierre */
export type SummaryClose = {
  __typename?: 'SummaryClose';
  /** Subtotal del cierre */
  subtotal: Scalars['Float'];
  /** Impuestos del cierre */
  tax: Scalars['Float'];
  /** Total del cierre */
  total: Scalars['Float'];
};

/** Resumen de la factura */
export type SummaryInvoice = {
  __typename?: 'SummaryInvoice';
  /** Cambio de la factura */
  change: Scalars['Float'];
  /** Descuento de la factura */
  discount: Scalars['Float'];
  /** Subtotal de la factura */
  subtotal: Scalars['Float'];
  /** Impuestos de la factura */
  tax: Scalars['Float'];
  /** Total de la factura */
  total: Scalars['Float'];
  /** Total pago de la factura */
  totalPaid: Scalars['Float'];
};

/** Datos de resumen del pedido */
export type SummaryOrder = {
  __typename?: 'SummaryOrder';
  /** Cambio del pedido */
  change: Scalars['Float'];
  /** Descuento del pedido */
  discount: Scalars['Float'];
  /** Subtotal del pedido */
  subtotal: Scalars['Float'];
  /** Impuestos del pedido */
  tax: Scalars['Float'];
  /** Total del pedido */
  total: Scalars['Float'];
  /** Total pago del pedido */
  totalPaid: Scalars['Float'];
};

/** Resumen de las ordenes */
export type SummaryOrderClose = {
  __typename?: 'SummaryOrderClose';
  /** Cantidad de las ordenes canceladas */
  quantityCancel: Scalars['Float'];
  /** Cantidad de las ordenes finalizadas */
  quantityClosed: Scalars['Float'];
  /** Cantidad de los cupones redimidos */
  quantityCoupons: Scalars['Float'];
  /** Cantidad de las ordenes abiertas */
  quantityOpen: Scalars['Float'];
  /** Valor de las ordenes finalizadas */
  value: Scalars['Float'];
  /** Valor de los cupones redimidos */
  valueCoupons: Scalars['Float'];
};

/** Resumen pagos del cierre */
export type SummaryPayment = {
  __typename?: 'SummaryPayment';
  /** Medios de pago */
  payment: Payment;
  /** Cantidad */
  quantity: Scalars['Float'];
  /** Total pagado */
  total: Scalars['Float'];
};

/** Resumen de ventas */
export type SummarySalesReport = {
  __typename?: 'SummarySalesReport';
  /** CMV */
  cmv: Scalars['Float'];
  /** Margen de ventas en porcentaje */
  margin: Scalars['Float'];
  /** Cantidad de ventas */
  quantity: Scalars['Float'];
  /** Valor total de las ventas */
  total: Scalars['Float'];
};

export enum TypeCreditHistory {
  Credit = 'CREDIT',
  Debit = 'DEBIT',
  Frozen = 'FROZEN',
  Thawed = 'THAWED',
}

export enum TypeDocument {
  Order = 'ORDER',
  Receipt = 'RECEIPT',
}

export enum TypeErrorCash {
  Missing = 'MISSING',
  Surplus = 'SURPLUS',
}

export enum TypePayment {
  Bank = 'BANK',
  Bonus = 'BONUS',
  Cash = 'CASH',
  Credit = 'CREDIT',
}

export enum TypesRule {
  Equal = 'EQUAL',
  Greater = 'GREATER',
  Greaterthanorequal = 'GREATERTHANOREQUAL',
  Less = 'LESS',
  Lessthanorequal = 'LESSTHANOREQUAL',
}

/** Datos para actualizar la ciudad */
export type UpadteCityInput = {
  /** Código DANE */
  code?: InputMaybe<Scalars['String']>;
  /** Nombre del país */
  countryName?: InputMaybe<Scalars['String']>;
  /** Prefijo del país */
  countryPrefix?: InputMaybe<Scalars['String']>;
  /** Código postal de la ciudad por defecto */
  defaultPostalCode?: InputMaybe<Scalars['String']>;
  /** Nombre de la ciudad */
  name?: InputMaybe<Scalars['String']>;
  /** Nombre del departamento */
  state?: InputMaybe<Scalars['String']>;
  /** Tipo de zona */
  zone?: InputMaybe<ZoneType>;
};

/** Datos para actualizar el atributo */
export type UpdateAttribInput = {
  /** Se encuentra activa el atributo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Valor asignado al atributo */
  name?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar la autorización */
export type UpdateAuthorizationInput = {
  /** Fecha de finalización de la resolución */
  dateFinal?: InputMaybe<Scalars['DateTime']>;
  /** Fecha de inicio de la resolución */
  dateInitial?: InputMaybe<Scalars['DateTime']>;
  /** Fecha de cierre */
  lastDateInvoicing?: InputMaybe<Scalars['DateTime']>;
  /** Ultimo número usado para facturar */
  lastNumber?: InputMaybe<Scalars['Float']>;
  /** Numero final de la resolución */
  numberFinal?: InputMaybe<Scalars['Float']>;
  /** Numero inicial de la resolución */
  numberInitial?: InputMaybe<Scalars['Float']>;
  /** Prefijo de facturación */
  prefix?: InputMaybe<Scalars['String']>;
  /** Si es una habilitación true */
  qualification?: InputMaybe<Scalars['Boolean']>;
  /** resolución de facturacion */
  resolution?: InputMaybe<Scalars['String']>;
  /** Id de la tienda */
  shopId?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar caja */
export type UpdateBoxInput = {
  /** Cantidad de la base para la caja */
  base?: InputMaybe<Scalars['Float']>;
  /** Es caja principal de la compañía */
  isMain?: InputMaybe<Scalars['Boolean']>;
  /** Nombre de la caja */
  name?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar marcas */
export type UpdateBrandInput = {
  /** Se encuentra activa la marca */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Valor asignado a la marca */
  name?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar la categoría */
export type UpdateCategoryInput = {
  /** Nivel de la categoría */
  level: Scalars['Float'];
  /** Nombre de la categoría */
  name?: InputMaybe<Scalars['String']>;
  /** Identificador de la categoría padre  */
  parentId?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar el color */
export type UpdateColorInput = {
  /** Estado asignado al color */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Url asignado al color */
  html?: InputMaybe<Scalars['String']>;
  /** Identificador de la imagen del color */
  imageId?: InputMaybe<Scalars['String']>;
  /** Nombre asignado al color */
  name?: InputMaybe<Scalars['String']>;
  /** Nombre interno asignado al color */
  name_internal?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar la compañía */
export type UpdateCompanyInput = {
  /** Dirección de la empresa */
  address?: InputMaybe<Scalars['String']>;
  /** Documento de la empresa */
  document?: InputMaybe<Scalars['String']>;
  /** Email de la empresa */
  email?: InputMaybe<Scalars['String']>;
  /** Url del logo de la empresa */
  logo?: InputMaybe<Scalars['String']>;
  /** Nombre de la empresa */
  name?: InputMaybe<Scalars['String']>;
  /** Teléfono de la empresa */
  phone?: InputMaybe<Scalars['String']>;
  /** Si pertenece al régimen simplificado */
  regimenSimplify?: InputMaybe<Scalars['Boolean']>;
};

/** Datos para actualizar el cupón */
export type UpdateCouponInput = {
  /** Estado del cupón */
  status?: InputMaybe<StatusCoupon>;
};

/** Datos para actualizar un crédito */
export type UpdateCreditInput = {
  /** Monto aprobado para el crédito */
  amount?: InputMaybe<Scalars['Float']>;
  /** Detalles para agregar al crédito */
  detailAddCredit?: InputMaybe<DetailAddCredit>;
  /** Estado del crédito */
  status?: InputMaybe<StatusCredit>;
};

/** Datos para actualizar un cliente */
export type UpdateCustomerInput = {
  /** Cliente activo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Direcciones del cliente */
  addresses?: InputMaybe<AddressInput[]>;
  /** Fecha de nacimiento */
  birthday?: InputMaybe<Scalars['DateTime']>;
  /** Identificación de tipo de cliente */
  customerTypeId?: InputMaybe<Scalars['String']>;
  /** Número de documento */
  document?: InputMaybe<Scalars['String']>;
  /** Identificación del tipo de documento */
  documentTypeId?: InputMaybe<Scalars['String']>;
  /** Correo del cliente */
  email?: InputMaybe<Scalars['String']>;
  /** Nombres del cliente */
  firstName?: InputMaybe<Scalars['String']>;
  /** Es el cliente por defecto, solo debe existir uno */
  isDefault?: InputMaybe<Scalars['Boolean']>;
  /** El teléfono tiene whatsapp */
  isWhatsapp?: InputMaybe<Scalars['Boolean']>;
  /** Apellidos del cliente */
  lastName?: InputMaybe<Scalars['String']>;
  /** Número de teléfono */
  phone?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar el descuento */
export type UpdateDiscountRuleInput = {
  /** Estado del descuento */
  active: Scalars['Boolean'];
  /** Fecha final para aplicar el descuento */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para aplicar el descuento */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Nombre del descuento */
  name?: InputMaybe<Scalars['String']>;
  /** Porcentaje del descuento */
  percent?: InputMaybe<Scalars['Float']>;
  /** Reglas a aplicar */
  rules?: InputMaybe<RuleInput[]>;
  /** Valor del descuento */
  value?: InputMaybe<Scalars['Float']>;
};

/** Datos para actualizar el egreso */
export type UpdateExpenseInput = {
  /** Estado del egreso */
  status?: InputMaybe<StatusExpense>;
};

/** Datos para actualizar el pedido */
export type UpdateOrderInput = {
  /** Dirección de envío para el pedido */
  address?: InputMaybe<AddressInputOrder>;
  /** Identificación de la transportadora */
  conveyorId?: InputMaybe<Scalars['String']>;
  /** Identificación del cliente */
  customerId?: InputMaybe<Scalars['String']>;
  /** Estado del pedido */
  status?: InputMaybe<StatusOrder>;
  /** Estado que se aplicará al pedid web */
  statusWeb?: InputMaybe<StatusWeb>;
};

/** Datos para actualizar método de pago */
export type UpdatePaymentInput = {
  /** Estado del método de pago */
  active: Scalars['Boolean'];
  /** Color en html que representa el método de pago  */
  color?: InputMaybe<Scalars['String']>;
  /** Identificador de la imagen del método de pago */
  logoId?: InputMaybe<Scalars['String']>;
  /** Mensaje para el medio de pago */
  message?: InputMaybe<Scalars['String']>;
  /** Nombre del método de pago */
  name?: InputMaybe<Scalars['String']>;
  /** Identificador de tiendas que usan el método de pago */
  shopIds?: InputMaybe<Scalars['String'][]>;
  /** Tipo de método de pago */
  type?: InputMaybe<TypePayment>;
};

/** Datos para actualizar un punto de venta */
export type UpdatePointOfSaleInput = {
  /** Fecha de cierre del punto de venta */
  closeDate?: InputMaybe<Scalars['String']>;
  /** Cerrando punto de venta */
  closing?: InputMaybe<Scalars['Boolean']>;
};

/** Datos para actualizar el producto */
export type UpdateProductInput = {
  /** Código de barras del producto */
  barcode?: InputMaybe<Scalars['String']>;
  /** Identificador del color */
  colorId?: InputMaybe<Scalars['String']>;
  /** Identificador de las imagenes del producto */
  imagesId?: InputMaybe<Scalars['String'][]>;
  /** Identificador de la talla */
  sizeId?: InputMaybe<Scalars['String']>;
  /** Estado del producto */
  status?: InputMaybe<StatusProduct>;
};

/** Datos para actualizar el recibo */
export type UpdateReceiptInput = {
  /** Estado del recibo */
  status?: InputMaybe<StatusReceipt>;
};

/** Datos para actualizar referencia */
export type UpdateReferenceInput = {
  /** Estado de la referencia */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Identificador de los atributos de la referencia */
  attribIds?: InputMaybe<Scalars['String'][]>;
  /** Identificador de la marca de la referencia */
  brandId?: InputMaybe<Scalars['String']>;
  /** Identificador de la categoría level 1 de la referencia */
  categoryLevel1Id?: InputMaybe<Scalars['String']>;
  /** Identificador de la categoría level 2 de la referencia */
  categoryLevel2Id?: InputMaybe<Scalars['String']>;
  /** Identificador de la categoría level 3 de la referencia */
  categoryLevel3Id?: InputMaybe<Scalars['String']>;
  /** Se puede cambiar de la referencia */
  changeable?: InputMaybe<Scalars['Boolean']>;
  /** Costo de la referencia */
  cost?: InputMaybe<Scalars['Float']>;
  /** Descripción de la referencia */
  description?: InputMaybe<Scalars['String']>;
  /** Alto del producto */
  height?: InputMaybe<Scalars['Float']>;
  /** Largo del producto */
  long?: InputMaybe<Scalars['Float']>;
  /** Nombre de la referencia */
  name?: InputMaybe<Scalars['String']>;
  /** Precio de la referencia */
  price?: InputMaybe<Scalars['Float']>;
  /** Volumen del producto */
  volume?: InputMaybe<Scalars['Float']>;
  /** Peso del producto */
  weight?: InputMaybe<Scalars['Float']>;
  /** Ancho del producto */
  width?: InputMaybe<Scalars['Float']>;
};

/** Datos para actualizar el rol */
export type UpdateRoleInput = {
  /** Estado del rol */
  active: Scalars['Boolean'];
  /** Puede el usuario cambiar su bodega */
  changeWarehouse: Scalars['Boolean'];
  /** Nombre del rol */
  name: Scalars['String'];
  /** Identificadores de los permisos seleccionados */
  permissionIds?: InputMaybe<Scalars['String'][]>;
};

/** Datos para actualizar la tienda */
export type UpdateShopInput = {
  /** Dirección de la tienda */
  address?: InputMaybe<Scalars['String']>;
  /** Identificador de la empresa para la tienda */
  companyId?: InputMaybe<Scalars['String']>;
  /** Nombre comercial de la tienda */
  companyName?: InputMaybe<Scalars['String']>;
  /** Identificador de la bodega predeterminada para la tienda */
  defaultWarehouseId?: InputMaybe<Scalars['String']>;
  /** Documento de la tienda */
  document?: InputMaybe<Scalars['String']>;
  /** Email de la tienda */
  email?: InputMaybe<Scalars['String']>;
  /** Meta asiganda a la tienda */
  goal?: InputMaybe<Scalars['Float']>;
  /** Es centro de distribución */
  isMain?: InputMaybe<Scalars['Boolean']>;
  /** Nombre de la tienda */
  name?: InputMaybe<Scalars['String']>;
  /** Teléfono de la tienda */
  phone?: InputMaybe<Scalars['String']>;
  /** Estado de la tienda */
  status?: InputMaybe<StatusShop>;
  /** Identificador de la bodega de centro de distribución asignado */
  warehouseMainId?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar la talla */
export type UpdateSizeInput = {
  /** Se encuentra activa la talla */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Valor asignado a la talla */
  value?: InputMaybe<Scalars['String']>;
  /** Posición del ordenamiento */
  weight?: InputMaybe<Scalars['Float']>;
};

/** Datos para actualizar el ajuste de productos */
export type UpdateStockAdjustmentInput = {
  /** Productos del ajuste */
  details?: InputMaybe<DetailStockAdjustmentInput[]>;
  /** Observación del ajuste */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado del ajuste */
  status?: InputMaybe<StatusStockAdjustment>;
};

/** Datos para actualizar la entrada de productos */
export type UpdateStockInputInput = {
  /** Productos de la entrada */
  details?: InputMaybe<DetailStockInputInput[]>;
  /** Observación de la entrada */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la entrada */
  status?: InputMaybe<StatusStockInput>;
};

/** Datos para actualizar la salida de productos */
export type UpdateStockOutputInput = {
  /** Productos de la salida */
  details?: InputMaybe<DetailStockOutputInput[]>;
  /** Observación de la salida */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la salida */
  status?: InputMaybe<StatusStockOutput>;
};

/** Datos para actualizar la solicitud de productos */
export type UpdateStockRequestInput = {
  /** Productos de la solicitud */
  details?: InputMaybe<DetailStockRequestInput[]>;
  /** Observación de la solicitud */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la solicitud */
  status?: InputMaybe<StatusStockRequest>;
};

/** Datos para actualizar el traslado de productos */
export type UpdateStockTransferInput = {
  /** Productos del traslado */
  details?: InputMaybe<DetailStockTransferInput[]>;
  /** Observación general */
  observation?: InputMaybe<Scalars['String']>;
  /** Observación del que recibe el traslado */
  observationDestination?: InputMaybe<Scalars['String']>;
  /** Observación del que envía el traslado */
  observationOrigin?: InputMaybe<Scalars['String']>;
  /** Solicitudes usadas */
  requests?: InputMaybe<Scalars['String'][]>;
  /** Estado del traslado */
  status?: InputMaybe<StatusStockTransfer>;
};

/** Datos para actualizar el usuario */
export type UpdateUserInput = {
  /** Identificador del cliente asignado al usuario */
  customerId?: InputMaybe<Scalars['String']>;
  /** Identifica si el usuario es web */
  isWeb?: InputMaybe<Scalars['Boolean']>;
  /** Nombre del usuario */
  name?: InputMaybe<Scalars['String']>;
  /** Contraseña de usuario */
  password?: InputMaybe<Scalars['String']>;
  /** Identificador del punto de venta asignado al usuario */
  pointOfSaleId?: InputMaybe<Scalars['String']>;
  /** Identificador del rol del usuario */
  roleId?: InputMaybe<Scalars['String']>;
  /** Identificador de la tienda asignada al usuario */
  shopId?: InputMaybe<Scalars['String']>;
  /** Estado del usuario */
  status?: InputMaybe<StatusUser>;
  /** Usuario registrado */
  username?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar  */
export type UpdateWarehouseInput = {
  /** Estado de la bodega */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Inventario máximo de productos */
  max?: InputMaybe<Scalars['Float']>;
  /** Inventario mínimo de productos */
  min?: InputMaybe<Scalars['Float']>;
  /** Nombre de la bodega */
  name?: InputMaybe<Scalars['String']>;
};

/** Enlaces de diferences tipos */
export type Urls = {
  __typename?: 'Urls';
  /** Enlaces de tipo jpeg */
  jpeg?: Maybe<ImageTypes>;
  /** Enlaces de tipo webp */
  original?: Maybe<Scalars['String']>;
  /** Enlaces de tipo webp */
  webp?: Maybe<ImageTypes>;
};

/** Usuario que manipula los datos de la aplicación */
export type User = {
  __typename?: 'User';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Compañía de acceso para el usuario */
  company: Company;
  /** Nombre de usuario */
  createdAt: Scalars['DateTime'];
  /** Cliente asignado */
  customer?: Maybe<Customer>;
  /** Usado para diferenciar la creación de los usuarios */
  isWeb: Scalars['Boolean'];
  /** Nombre de para mostrar del usuario */
  name: Scalars['String'];
  /** Contraseña de usuario */
  password?: Maybe<Scalars['String']>;
  /** Punto de venta asignado al usuario */
  pointOfSale?: Maybe<PointOfSale>;
  /** Rol que ocupa el usuario */
  role: Role;
  /** Tienda a la que se encuentra asignado el usuario */
  shop: Shop;
  /** Estado del usuario */
  status: StatusUser;
  /** Nombre de usuario */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó el usuario */
  user?: Maybe<User>;
  /** Cuenta de usuario */
  username: Scalars['String'];
};

/** Datos para verificar los errores de pedido */
export type VerifiedErrorsCashInput = {
  /** Identificador del error de efectivo */
  errorCashId: Scalars['String'];
  /** Motivo por el cual se verificar el error */
  reason: Scalars['String'];
};

/** Datos para verificar los productos */
export type VerifiedProductTransferErrorInput = {
  /** Identificador del producto */
  productId: Scalars['String'];
  /** Motivo por el cual se verifica el producto */
  reason: Scalars['String'];
  /** Proceso a realizar, si se envia al origen true, si se envia al destino false */
  returnInventory: Scalars['Boolean'];
  /** Identificador del traslado en error */
  stockTransferErrorId: Scalars['String'];
};

/** Modelo de la bodega */
export type Warehouse = {
  __typename?: 'Warehouse';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Estado de la bodega */
  active: Scalars['Boolean'];
  /** Empresa a la que pertenece la bodega */
  company: Company;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Máxima cantidad de productos en la bodega */
  max: Scalars['Float'];
  /** Mínima cantidad de productos en la bodega */
  min: Scalars['Float'];
  /** Nombre de la bodega */
  name: Scalars['String'];
  /** Fecha de creación */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó el usuario */
  user: User;
};

export enum ZoneType {
  Inshop = 'INSHOP',
  Local = 'LOCAL',
  Metropolitan = 'METROPOLITAN',
  National = 'NATIONAL',
  Special = 'SPECIAL',
  Urban = 'URBAN',
}

export type CreateStockAdjustmentMutationVariables = Exact<{
  input: CreateStockAdjustmentInput;
}>;

export type CreateStockAdjustmentMutation = {
  __typename?: 'Mutation';
  createStockAdjustment: { __typename?: 'StockAdjustment'; _id: string; number: number };
};

export type UpdateStockAdjustmentMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateStockAdjustmentInput;
}>;

export type UpdateStockAdjustmentMutation = {
  __typename?: 'Mutation';
  updateStockAdjustment: {
    __typename?: 'StockAdjustment';
    _id: string;
    number: number;
    observation?: string | null;
    status: StatusStockAdjustment;
    total: number;
    company: { __typename?: 'Company'; _id: string };
    warehouse: { __typename?: 'Warehouse'; name: string; _id: string };
    details: {
      __typename?: 'DetailAdjustment';
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
        reference: { __typename?: 'Reference'; description: string };
        size: { __typename?: 'Size'; value: string };
        color: {
          __typename?: 'Color';
          html: string;
          name_internal: string;
          image?: {
            __typename?: 'Image';
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          } | null;
        };
      };
    }[];
  };
};

export type CreateAttribMutationVariables = Exact<{
  input: CreateAttribInput;
}>;

export type CreateAttribMutation = {
  __typename?: 'Mutation';
  createAttrib: {
    __typename?: 'Attrib';
    _id: string;
    active: boolean;
    createdAt: any;
    updatedAt: any;
    name: string;
  };
};

export type UpdateAttribMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateAttribInput;
}>;

export type UpdateAttribMutation = {
  __typename?: 'Mutation';
  updateAttrib: {
    __typename?: 'Attrib';
    _id: string;
    active: boolean;
    createdAt: any;
    updatedAt: any;
    name: string;
  };
};

export type CreateAuthorizationMutationVariables = Exact<{
  input: CreateAuthorizationInput;
}>;

export type CreateAuthorizationMutation = {
  __typename?: 'Mutation';
  createAuthorization: { __typename?: 'AuthorizationDian'; _id: string; prefix: string };
};

export type UpdateAuthorizationMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateAuthorizationInput;
}>;

export type UpdateAuthorizationMutation = {
  __typename?: 'Mutation';
  updateAuthorization: { __typename?: 'AuthorizationDian'; _id: string; prefix: string };
};

export type CreateBoxMutationVariables = Exact<{
  input: CreateBoxInput;
}>;

export type CreateBoxMutation = {
  __typename?: 'Mutation';
  createBox: { __typename?: 'Box'; _id: string; name: string };
};

export type UpdateBoxMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateBoxInput;
}>;

export type UpdateBoxMutation = {
  __typename?: 'Mutation';
  updateBox: { __typename?: 'Box'; _id: string; name: string };
};

export type VerifiedErrorCashMutationVariables = Exact<{
  input: VerifiedErrorsCashInput;
}>;

export type VerifiedErrorCashMutation = {
  __typename?: 'Mutation';
  verifiedErrorsCash: {
    __typename?: 'ErrorCash';
    _id: string;
    reason?: string | null;
    verified: boolean;
    updatedAt: any;
    typeError: TypeErrorCash;
    boxDestination: { __typename?: 'Box'; name: string };
    boxOrigin: { __typename?: 'Box'; name: string };
    closeZ?: { __typename?: 'CloseZInvoicing'; number: number } | null;
  };
};

export type CreateBrandMutationVariables = Exact<{
  input: CreateBrandInput;
}>;

export type CreateBrandMutation = {
  __typename?: 'Mutation';
  createBrand: {
    __typename?: 'Brand';
    _id: string;
    active: boolean;
    name: string;
    createdAt: any;
    updatedAt: any;
  };
};

export type UpdateBrandMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateBrandInput;
}>;

export type UpdateBrandMutation = {
  __typename?: 'Mutation';
  updateBrand: {
    __typename?: 'Brand';
    _id: string;
    active: boolean;
    name: string;
    createdAt: any;
    updatedAt: any;
  };
};

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'CategoryLevel1';
    _id: string;
    createdAt: any;
    updatedAt: any;
    name: string;
    childs?:
      | {
          __typename?: 'CategoryLevel2';
          _id: string;
          createdAt: any;
          updatedAt: any;
          parentId?: string | null;
          name?: string | null;
          childs?:
            | {
                __typename?: 'CategoryLevel3';
                _id: string;
                name?: string | null;
                createdAt: any;
                updatedAt: any;
                parentId?: string | null;
              }[]
            | null;
        }[]
      | null;
  };
};

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateCategoryInput;
}>;

export type UpdateCategoryMutation = {
  __typename?: 'Mutation';
  updateCategory: {
    __typename?: 'CategoryLevel1';
    _id: string;
    createdAt: any;
    updatedAt: any;
    name: string;
    childs?:
      | {
          __typename?: 'CategoryLevel2';
          _id: string;
          createdAt: any;
          updatedAt: any;
          parentId?: string | null;
          name?: string | null;
          childs?:
            | {
                __typename?: 'CategoryLevel3';
                _id: string;
                name?: string | null;
                createdAt: any;
                updatedAt: any;
                parentId?: string | null;
              }[]
            | null;
        }[]
      | null;
  };
};

export type CreateCityMutationVariables = Exact<{
  input: CreateCityInput;
}>;

export type CreateCityMutation = {
  __typename?: 'Mutation';
  createCity: { __typename?: 'City'; _id: string; name: string };
};

export type UpdateCityMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpadteCityInput;
}>;

export type UpdateCityMutation = {
  __typename?: 'Mutation';
  updateCity: { __typename?: 'City'; _id: string; name: string };
};

export type CreateCloseXInvoicingMutationVariables = Exact<{
  input: CreateCloseXInvoicingInput;
}>;

export type CreateCloseXInvoicingMutation = {
  __typename?: 'Mutation';
  createCloseXInvoicing: {
    __typename?: 'CloseXInvoicing';
    _id: string;
    number: number;
    closeDate: any;
    quantityBank: number;
    cashRegister: {
      __typename?: 'CashRegister';
      M50: number;
      M100: number;
      M200: number;
      M500: number;
      B1000: number;
      B2000: number;
      B5000: number;
      B10000: number;
      B20000: number;
      B50000: number;
      B100000: number;
    };
    pointOfSale: {
      __typename?: 'PointOfSale';
      name: string;
      shop: { __typename?: 'Shop'; name: string };
    };
    expenses?: { __typename?: 'Expense'; value: number }[] | null;
    refunds?: {
      __typename?: 'RefundOrderClose';
      quantity?: number | null;
      value?: number | null;
    } | null;
    summaryOrder: {
      __typename?: 'SummaryOrderClose';
      value: number;
      quantityClosed: number;
      quantityCancel: number;
      quantityOpen: number;
    };
    payments?:
      | {
          __typename?: 'PaymentOrderClose';
          quantity: number;
          value: number;
          payment: { __typename?: 'Payment'; type: TypePayment; name: string };
        }[]
      | null;
    paymentsCredit?:
      | {
          __typename?: 'PaymentCredit';
          quantity: number;
          value: number;
          payment: { __typename?: 'Payment'; type: TypePayment; name: string };
        }[]
      | null;
    user: { __typename?: 'User'; name: string };
  };
};

export type CreateCloseZInvoicingMutationVariables = Exact<{
  input: CreateCloseZInvoicingInput;
}>;

export type CreateCloseZInvoicingMutation = {
  __typename?: 'Mutation';
  createCloseZInvoicing: {
    __typename?: 'CloseZInvoicing';
    _id: string;
    number: number;
    closeDate: any;
    quantityBank: number;
    cashRegister: {
      __typename?: 'CashRegister';
      M50: number;
      M100: number;
      M200: number;
      M500: number;
      B1000: number;
      B2000: number;
      B5000: number;
      B10000: number;
      B20000: number;
      B50000: number;
      B100000: number;
    };
    pointOfSale: {
      __typename?: 'PointOfSale';
      name: string;
      shop: { __typename?: 'Shop'; name: string };
    };
    expenses?: { __typename?: 'Expense'; value: number }[] | null;
    refunds?: {
      __typename?: 'RefundOrderClose';
      quantity?: number | null;
      value?: number | null;
    } | null;
    summaryOrder: {
      __typename?: 'SummaryOrderClose';
      value: number;
      quantityClosed: number;
      quantityCancel: number;
      quantityOpen: number;
    };
    payments?:
      | {
          __typename?: 'PaymentOrderClose';
          quantity: number;
          value: number;
          payment: { __typename?: 'Payment'; type: TypePayment; name: string };
        }[]
      | null;
    paymentsCredit?:
      | {
          __typename?: 'PaymentCredit';
          quantity: number;
          value: number;
          payment: { __typename?: 'Payment'; type: TypePayment; name: string };
        }[]
      | null;
    user: { __typename?: 'User'; name: string };
  };
};

export type CreateColorMutationVariables = Exact<{
  input: CreateColorInput;
}>;

export type CreateColorMutation = {
  __typename?: 'Mutation';
  createColor: {
    __typename?: 'Color';
    _id: string;
    active: boolean;
    html: string;
    name: string;
    name_internal: string;
    createdAt: any;
    image?: {
      __typename?: 'Image';
      urls?: {
        __typename?: 'Urls';
        webp?: { __typename?: 'ImageTypes'; small: string } | null;
      } | null;
    } | null;
  };
};

export type UpdateColorMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateColorInput;
}>;

export type UpdateColorMutation = {
  __typename?: 'Mutation';
  updateColor: {
    __typename?: 'Color';
    _id: string;
    active: boolean;
    html: string;
    name: string;
    name_internal: string;
    image?: {
      __typename?: 'Image';
      urls?: {
        __typename?: 'Urls';
        webp?: { __typename?: 'ImageTypes'; small: string } | null;
      } | null;
    } | null;
  };
};

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;

export type CreateCompanyMutation = {
  __typename?: 'Mutation';
  createCompany: { __typename?: 'Company'; _id: string; name: string };
};

export type UpdateCompanyMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateCompanyInput;
}>;

export type UpdateCompanyMutation = {
  __typename?: 'Mutation';
  updateCompany: { __typename?: 'Company'; _id: string; name: string };
};

export type CreateCouponMutationVariables = Exact<{
  input: CreateCouponInput;
}>;

export type CreateCouponMutation = {
  __typename?: 'Mutation';
  createCoupon: { __typename?: 'Coupon'; _id: string; number: number };
};

export type UpdateCouponMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateCouponInput;
}>;

export type UpdateCouponMutation = {
  __typename?: 'Mutation';
  updateCoupon: { __typename?: 'Coupon'; _id: string; number: number };
};

export type UpdateCreditMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateCreditInput;
}>;

export type UpdateCreditMutation = {
  __typename?: 'Mutation';
  updateCredit: { __typename?: 'Credit'; _id: string };
};

export type CreateCreditMutationVariables = Exact<{
  input: CreateCreditInput;
}>;

export type CreateCreditMutation = {
  __typename?: 'Mutation';
  createCredit: { __typename?: 'Credit'; _id: string };
};

export type CreateCustomerMutationVariables = Exact<{
  input: CreateCustomerInput;
}>;

export type CreateCustomerMutation = {
  __typename?: 'Mutation';
  createCustomer: { __typename?: 'Customer'; _id: string; firstName: string; lastName: string };
};

export type UpdateCustomerMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateCustomerInput;
}>;

export type UpdateCustomerMutation = {
  __typename?: 'Mutation';
  updateCustomer: { __typename?: 'Customer'; _id: string; firstName: string; lastName: string };
};

export type GenerateDailyClosingMutationVariables = Exact<{
  input: GenerateDailyClosingInput;
}>;

export type GenerateDailyClosingMutation = {
  __typename?: 'Mutation';
  generateDailyClosing: {
    __typename?: 'ResponseGenerateDailyClosing';
    message: string;
    quantity: number;
  };
};

export type CreateDiscountRuleMutationVariables = Exact<{
  input: CreateDiscountRuleInput;
}>;

export type CreateDiscountRuleMutation = {
  __typename?: 'Mutation';
  createDiscountRule: { __typename?: 'DiscountRule'; _id: string; name: string };
};

export type UpdateDiscountRuleMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateDiscountRuleInput;
}>;

export type UpdateDiscountRuleMutation = {
  __typename?: 'Mutation';
  updateDiscountRule: { __typename?: 'DiscountRule'; _id: string; name: string };
};

export type CreateExpenseMutationVariables = Exact<{
  input: CreateExpenseInput;
}>;

export type CreateExpenseMutation = {
  __typename?: 'Mutation';
  createExpense: {
    __typename?: 'Expense';
    number: number;
    value: number;
    updatedAt: any;
    status: StatusExpense;
  };
};

export type UpdateExpenseMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateExpenseInput;
}>;

export type UpdateExpenseMutation = {
  __typename?: 'Mutation';
  updateExpense: {
    __typename?: 'Expense';
    _id: string;
    concept?: string | null;
    status: StatusExpense;
    value: number;
    number: number;
  };
};

export type CreateStockInputMutationVariables = Exact<{
  input: CreateStockInputInput;
}>;

export type CreateStockInputMutation = {
  __typename?: 'Mutation';
  createStockInput: { __typename?: 'StockInput'; _id: string; number: number };
};

export type UpdateStockInputMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateStockInputInput;
}>;

export type UpdateStockInputMutation = {
  __typename?: 'Mutation';
  updateStockInput: {
    __typename?: 'StockInput';
    _id: string;
    createdAt: any;
    updatedAt: any;
    number: number;
    observation?: string | null;
    status: StatusStockInput;
    total: number;
    details: {
      __typename?: 'DetailInput';
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        color: {
          __typename?: 'Color';
          html: string;
          name_internal: string;
          image?: {
            __typename?: 'Image';
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          } | null;
        };
        reference: { __typename?: 'Reference'; description: string; name: string };
        size: { __typename?: 'Size'; value: string };
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
      };
    }[];
    user: { __typename?: 'User'; name: string };
    warehouse: { __typename?: 'Warehouse'; name: string; _id: string };
  };
};

export type InvoicingMutationVariables = Exact<{
  input: DataGenerateInvoicesInput;
}>;

export type InvoicingMutation = {
  __typename?: 'Mutation';
  invoicing: {
    __typename?: 'ResponseInvoicing';
    invoiceQuantityBank: number;
    valueInvoicingCash: number;
    invoiceQuantityCash: number;
    valueInvoicingBank: number;
  };
};

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;

export type CreateOrderMutation = {
  __typename?: 'Mutation';
  createOrder: { __typename?: 'ResponseOrder'; order: { __typename?: 'Order'; _id: string } };
};

export type UpdateOrderMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateOrderInput;
}>;

export type UpdateOrderMutation = {
  __typename?: 'Mutation';
  updateOrder: {
    __typename?: 'ResponseOrder';
    credit?: { __typename?: 'Credit'; amount: number; available: number } | null;
    order: {
      __typename?: 'Order';
      updatedAt: any;
      _id: string;
      number: number;
      status: StatusOrder;
      user: { __typename?: 'User'; name: string };
      customer: {
        __typename?: 'Customer';
        phone?: string | null;
        document: string;
        firstName: string;
        lastName: string;
        documentType: { __typename?: 'DocumentType'; abbreviation: string };
        customerType: { __typename?: 'CustomerType'; name: string };
      };
      details?:
        | {
            __typename?: 'DetailOrder';
            discount: number;
            quantity: number;
            price: number;
            product: {
              __typename?: 'Product';
              _id: string;
              barcode: string;
              status: StatusProduct;
              reference: {
                __typename?: 'Reference';
                name: string;
                cost: number;
                description: string;
              };
              size: { __typename?: 'Size'; value: string };
              color: {
                __typename?: 'Color';
                html: string;
                name: string;
                name_internal: string;
                image?: {
                  __typename?: 'Image';
                  urls?: {
                    __typename?: 'Urls';
                    webp?: { __typename?: 'ImageTypes'; small: string } | null;
                  } | null;
                } | null;
              };
              stock?: { __typename?: 'Stock'; quantity: number }[] | null;
            };
          }[]
        | null;
      payments?:
        | {
            __typename?: 'PaymentOrder';
            total: number;
            payment: { __typename?: 'Payment'; type: TypePayment; name: string };
          }[]
        | null;
      summary: {
        __typename?: 'SummaryOrder';
        discount: number;
        subtotal: number;
        total: number;
        totalPaid: number;
        change: number;
      };
      invoice?: {
        __typename?: 'Invoice';
        createdAt: any;
        number: number;
        authorization: { __typename?: 'AuthorizationDian'; prefix: string };
        customer: {
          __typename?: 'Customer';
          document: string;
          firstName: string;
          lastName: string;
          phone?: string | null;
          documentType: { __typename?: 'DocumentType'; abbreviation: string };
        };
        details?:
          | {
              __typename?: 'DetailInvoice';
              quantity: number;
              price: number;
              discount: number;
              product: {
                __typename?: 'Product';
                barcode: string;
                color: { __typename?: 'Color'; name: string };
                reference: { __typename?: 'Reference'; name: string; description: string };
                size: { __typename?: 'Size'; value: string };
              };
            }[]
          | null;
        payments?:
          | {
              __typename?: 'PaymentInvoice';
              total: number;
              payment: { __typename?: 'Payment'; _id: string; name: string };
            }[]
          | null;
        shop: { __typename?: 'Shop'; name: string };
        summary: {
          __typename?: 'SummaryInvoice';
          total: number;
          subtotal: number;
          change: number;
          discount: number;
          totalPaid: number;
        };
        user: { __typename?: 'User'; name: string };
      } | null;
    };
  };
};

export type AddPaymentsOrderMutationVariables = Exact<{
  input: AddPaymentsOrderInput;
}>;

export type AddPaymentsOrderMutation = {
  __typename?: 'Mutation';
  addPaymentsOrder: {
    __typename?: 'ResponseOrder';
    credit?: { __typename?: 'Credit'; amount: number; available: number } | null;
    order: {
      __typename?: 'Order';
      updatedAt: any;
      _id: string;
      number: number;
      user: { __typename?: 'User'; name: string };
      customer: {
        __typename?: 'Customer';
        document: string;
        firstName: string;
        lastName: string;
        phone?: string | null;
        documentType: { __typename?: 'DocumentType'; abbreviation: string };
        customerType: { __typename?: 'CustomerType'; name: string };
      };
      details?:
        | {
            __typename?: 'DetailOrder';
            discount: number;
            quantity: number;
            price: number;
            product: {
              __typename?: 'Product';
              _id: string;
              barcode: string;
              status: StatusProduct;
              reference: {
                __typename?: 'Reference';
                name: string;
                cost: number;
                description: string;
              };
              size: { __typename?: 'Size'; value: string };
              color: {
                __typename?: 'Color';
                html: string;
                name: string;
                name_internal: string;
                image?: {
                  __typename?: 'Image';
                  urls?: {
                    __typename?: 'Urls';
                    webp?: { __typename?: 'ImageTypes'; small: string } | null;
                  } | null;
                } | null;
              };
              stock?: { __typename?: 'Stock'; quantity: number }[] | null;
            };
          }[]
        | null;
      payments?:
        | {
            __typename?: 'PaymentOrder';
            total: number;
            payment: { __typename?: 'Payment'; type: TypePayment; name: string };
          }[]
        | null;
      summary: {
        __typename?: 'SummaryOrder';
        discount: number;
        subtotal: number;
        total: number;
        totalPaid: number;
      };
    };
  };
};

export type AddProductsOrderMutationVariables = Exact<{
  input: AddProductsOrderInput;
}>;

export type AddProductsOrderMutation = {
  __typename?: 'Mutation';
  addProductsOrder: {
    __typename?: 'ResponseOrder';
    credit?: { __typename?: 'Credit'; amount: number; available: number } | null;
    order: {
      __typename?: 'Order';
      _id: string;
      number: number;
      customer: {
        __typename?: 'Customer';
        document: string;
        firstName: string;
        lastName: string;
        documentType: { __typename?: 'DocumentType'; abbreviation: string };
        customerType: { __typename?: 'CustomerType'; name: string };
      };
      details?:
        | {
            __typename?: 'DetailOrder';
            discount: number;
            quantity: number;
            price: number;
            product: {
              __typename?: 'Product';
              _id: string;
              barcode: string;
              status: StatusProduct;
              reference: {
                __typename?: 'Reference';
                name: string;
                cost: number;
                description: string;
              };
              size: { __typename?: 'Size'; value: string };
              color: {
                __typename?: 'Color';
                html: string;
                name: string;
                name_internal: string;
                image?: {
                  __typename?: 'Image';
                  urls?: {
                    __typename?: 'Urls';
                    webp?: { __typename?: 'ImageTypes'; small: string } | null;
                  } | null;
                } | null;
              };
              stock?: { __typename?: 'Stock'; quantity: number }[] | null;
            };
          }[]
        | null;
      payments?:
        | {
            __typename?: 'PaymentOrder';
            total: number;
            payment: { __typename?: 'Payment'; name: string };
          }[]
        | null;
      summary: {
        __typename?: 'SummaryOrder';
        discount: number;
        subtotal: number;
        total: number;
        totalPaid: number;
      };
    };
  };
};

export type ConfirmProductsOrderMutationVariables = Exact<{
  input: ConfirmProductsOrderInput;
}>;

export type ConfirmProductsOrderMutation = {
  __typename?: 'Mutation';
  confirmProductsOrder: {
    __typename?: 'ResponseOrder';
    order: {
      __typename?: 'Order';
      details?:
        | {
            __typename?: 'DetailOrder';
            product: {
              __typename?: 'Product';
              _id: string;
              barcode: string;
              reference: { __typename?: 'Reference'; name: string };
            };
          }[]
        | null;
    };
  };
};

export type ConfirmPaymentsOrderMutationVariables = Exact<{
  input: ConfirmPaymentsOrderInput;
}>;

export type ConfirmPaymentsOrderMutation = {
  __typename?: 'Mutation';
  confirmPaymentsOrder: {
    __typename?: 'ResponseOrder';
    order: {
      __typename?: 'Order';
      payments?:
        | { __typename?: 'PaymentOrder'; payment: { __typename?: 'Payment'; name: string } }[]
        | null;
    };
  };
};

export type CreateStockOutputMutationVariables = Exact<{
  input: CreateStockOutputInput;
}>;

export type CreateStockOutputMutation = {
  __typename?: 'Mutation';
  createStockOutput: { __typename?: 'StockOutput'; _id: string; number: number };
};

export type UpdateStockOutputMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateStockOutputInput;
}>;

export type UpdateStockOutputMutation = {
  __typename?: 'Mutation';
  updateStockOutput: {
    __typename?: 'StockOutput';
    _id: string;
    createdAt: any;
    updatedAt: any;
    number: number;
    observation?: string | null;
    status: StatusStockOutput;
    total: number;
    details: {
      __typename?: 'DetailOutput';
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        color: {
          __typename?: 'Color';
          html: string;
          name_internal: string;
          image?: {
            __typename?: 'Image';
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          } | null;
        };
        reference: { __typename?: 'Reference'; description: string };
        size: { __typename?: 'Size'; value: string };
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
      };
    }[];
    user: { __typename?: 'User'; name: string };
    warehouse: { __typename?: 'Warehouse'; name: string; _id: string };
  };
};

export type CreatePaymentMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;

export type CreatePaymentMutation = {
  __typename?: 'Mutation';
  createPayment: { __typename?: 'Payment'; _id: string; name: string };
};

export type UpdatePaymentMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdatePaymentInput;
}>;

export type UpdatePaymentMutation = {
  __typename?: 'Mutation';
  updatePayment: { __typename?: 'Payment'; _id: string; name: string };
};

export type CreatePointOfSaleMutationVariables = Exact<{
  input: CreatePointOfSaleInput;
}>;

export type CreatePointOfSaleMutation = {
  __typename?: 'Mutation';
  createPointOfSale: { __typename?: 'PointOfSale'; _id: string; name: string };
};

export type UpdatePointOfSaleMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdatePointOfSaleInput;
}>;

export type UpdatePointOfSaleMutation = {
  __typename?: 'Mutation';
  updatePointOfSale: { __typename?: 'PointOfSale'; _id: string; name: string };
};

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct: {
    __typename?: 'Product';
    _id: string;
    barcode: string;
    status: StatusProduct;
    color: { __typename?: 'Color'; _id: string; name: string };
    size: { __typename?: 'Size'; _id: string; value: string };
    images?:
      | {
          __typename?: 'Image';
          _id: string;
          urls?: {
            __typename?: 'Urls';
            webp?: { __typename?: 'ImageTypes'; small: string } | null;
          } | null;
        }[]
      | null;
  };
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: {
    __typename?: 'Product';
    _id: string;
    barcode: string;
    status: StatusProduct;
    color: { __typename?: 'Color'; _id: string; name: string };
    size: { __typename?: 'Size'; _id: string; value: string };
    images?:
      | {
          __typename?: 'Image';
          _id: string;
          urls?: {
            __typename?: 'Urls';
            webp?: { __typename?: 'ImageTypes'; small: string } | null;
          } | null;
        }[]
      | null;
  };
};

export type CreateReceiptMutationVariables = Exact<{
  input: CreateReceiptInput;
}>;

export type CreateReceiptMutation = {
  __typename?: 'Mutation';
  createReceipt: {
    __typename?: 'ResponseReceipt';
    credit: {
      __typename?: 'Credit';
      available: number;
      balance: number;
      amount: number;
      frozenAmount: number;
      customer: { __typename?: 'Customer'; firstName: string; lastName: string; document: string };
    };
    receipt: {
      __typename?: 'Receipt';
      number: number;
      _id: string;
      createdAt: any;
      concept?: string | null;
      value: number;
      box?: { __typename?: 'Box'; name: string } | null;
      user: { __typename?: 'User'; name: string };
    };
  };
};

export type UpdateReceiptMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateReceiptInput;
}>;

export type UpdateReceiptMutation = {
  __typename?: 'Mutation';
  updateReceipt: { __typename?: 'Receipt'; _id: string; number: number };
};

export type CreateReferenceMutationVariables = Exact<{
  input: CreateReferenceInput;
}>;

export type CreateReferenceMutation = {
  __typename?: 'Mutation';
  createReference: { __typename?: 'Reference'; _id: string };
};

export type UpdateReferenceMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateReferenceInput;
}>;

export type UpdateReferenceMutation = {
  __typename?: 'Mutation';
  updateReference: {
    __typename?: 'Reference';
    _id: string;
    active: boolean;
    changeable: boolean;
    cost: number;
    description: string;
    name: string;
    price: number;
    shipping: {
      __typename?: 'Shipping';
      height: number;
      long: number;
      volume: number;
      width: number;
      weight: number;
    };
    brand: { __typename?: 'Brand'; _id: string; name: string };
    attribs?: { __typename?: 'Attrib'; _id: string; name: string }[] | null;
    categoryLevel1: {
      __typename?: 'CategoryLevel1';
      _id: string;
      name: string;
      childs?: { __typename?: 'CategoryLevel2'; _id: string; name?: string | null }[] | null;
    };
    categoryLevel2?: {
      __typename?: 'CategoryLevel2';
      _id: string;
      name?: string | null;
      childs?: { __typename?: 'CategoryLevel3'; _id: string; name?: string | null }[] | null;
    } | null;
    categoryLevel3?: { __typename?: 'CategoryLevel3'; _id: string; name?: string | null } | null;
  };
};

export type CreateStockRequestMutationVariables = Exact<{
  input: CreateStockRequestInput;
}>;

export type CreateStockRequestMutation = {
  __typename?: 'Mutation';
  createStockRequest: { __typename?: 'StockRequest'; _id: string; number: number };
};

export type UpdateStockRequestMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateStockRequestInput;
}>;

export type UpdateStockRequestMutation = {
  __typename?: 'Mutation';
  updateStockRequest: {
    __typename?: 'StockRequest';
    _id: string;
    number: number;
    status: StatusStockRequest;
    createdAt: any;
    updatedAt: any;
    observation?: string | null;
    details: {
      __typename?: 'DetailRequest';
      quantity: number;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        color: {
          __typename?: 'Color';
          html: string;
          name_internal: string;
          image?: {
            __typename?: 'Image';
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          } | null;
        };
        reference: { __typename?: 'Reference'; description: string };
        size: { __typename?: 'Size'; value: string };
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
      };
    }[];
    user: { __typename?: 'User'; name: string };
    warehouseDestination: { __typename?: 'Warehouse'; name: string };
    warehouseOrigin: { __typename?: 'Warehouse'; name: string };
  };
};

export type GenerateStockRequestMutationVariables = Exact<{
  shopId: Scalars['String'];
}>;

export type GenerateStockRequestMutation = {
  __typename?: 'Mutation';
  generateStockRequest: { __typename?: 'StockRequest'; _id: string; number: number };
};

export type CreateReturnOrderMutationVariables = Exact<{
  input: CreateReturnOrderInput;
}>;

export type CreateReturnOrderMutation = {
  __typename?: 'Mutation';
  createReturnOrder: {
    __typename?: 'ReturnOrder';
    number: number;
    coupon: {
      __typename?: 'Coupon';
      code: string;
      title: string;
      number: number;
      message: string;
      createdAt: any;
      updatedAt: any;
      expiration: any;
      value: number;
      _id: string;
    };
    order: { __typename?: 'Order'; number: number; shop: { __typename?: 'Shop'; name: string } };
  };
};

export type CreateRoleMutationVariables = Exact<{
  input: CreateRoleInput;
}>;

export type CreateRoleMutation = {
  __typename?: 'Mutation';
  createRole: {
    __typename?: 'Role';
    _id: string;
    active: boolean;
    changeWarehouse: boolean;
    name: string;
    permissions: { __typename?: 'Permission'; _id: string }[];
  };
};

export type UpdateRoleMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateRoleInput;
}>;

export type UpdateRoleMutation = {
  __typename?: 'Mutation';
  updateRole: {
    __typename?: 'Role';
    _id: string;
    active: boolean;
    changeWarehouse: boolean;
    name: string;
    permissions: { __typename?: 'Permission'; _id: string }[];
  };
};

export type CreateShopMutationVariables = Exact<{
  input: CreateShopInput;
}>;

export type CreateShopMutation = {
  __typename?: 'Mutation';
  createShop: { __typename?: 'Shop'; name: string; _id: string };
};

export type UpdateShopMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateShopInput;
}>;

export type UpdateShopMutation = {
  __typename?: 'Mutation';
  updateShop: { __typename?: 'Shop'; name: string; _id: string };
};

export type CreateSizeMutationVariables = Exact<{
  input: CreateSizeInput;
}>;

export type CreateSizeMutation = {
  __typename?: 'Mutation';
  createSize: {
    __typename?: 'Size';
    _id: string;
    active: boolean;
    createdAt: any;
    updatedAt: any;
    value: string;
    weight: number;
  };
};

export type UpdateSizeMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateSizeInput;
}>;

export type UpdateSizeMutation = {
  __typename?: 'Mutation';
  updateSize: {
    __typename?: 'Size';
    _id: string;
    active: boolean;
    createdAt: any;
    updatedAt: any;
    value: string;
    weight: number;
  };
};

export type CreateStockTransferMutationVariables = Exact<{
  input: CreateStockTransferInput;
}>;

export type CreateStockTransferMutation = {
  __typename?: 'Mutation';
  createStockTransfer: {
    __typename?: 'StockTransfer';
    _id: string;
    createdAt: any;
    number: number;
    observation?: string | null;
    observationDestination?: string | null;
    observationOrigin?: string | null;
    status: StatusStockTransfer;
    updatedAt: any;
    details: {
      __typename?: 'DetailTransfer';
      quantity: number;
      quantityConfirmed?: number | null;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        color: { __typename?: 'Color'; name: string };
        reference: { __typename?: 'Reference'; name: string; description: string };
        size: { __typename?: 'Size'; value: string };
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
      };
    }[];
    requests?: { __typename?: 'StockRequest'; _id: string; number: number }[] | null;
    userDestination?: { __typename?: 'User'; name: string } | null;
    userOrigin: { __typename?: 'User'; name: string };
    warehouseDestination: { __typename?: 'Warehouse'; name: string };
    warehouseOrigin: { __typename?: 'Warehouse'; name: string };
  };
};

export type UpdateStockTransferMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateStockTransferInput;
}>;

export type UpdateStockTransferMutation = {
  __typename?: 'Mutation';
  updateStockTransfer: {
    __typename?: 'StockTransfer';
    _id: string;
    createdAt: any;
    number: number;
    observation?: string | null;
    observationDestination?: string | null;
    observationOrigin?: string | null;
    status: StatusStockTransfer;
    updatedAt: any;
    details: {
      __typename?: 'DetailTransfer';
      quantity: number;
      quantityConfirmed?: number | null;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        color: { __typename?: 'Color'; name: string };
        reference: { __typename?: 'Reference'; name: string; description: string };
        size: { __typename?: 'Size'; value: string };
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
      };
    }[];
    requests?: { __typename?: 'StockRequest'; _id: string; number: number }[] | null;
    userDestination?: { __typename?: 'User'; name: string } | null;
    userOrigin: { __typename?: 'User'; name: string };
    warehouseDestination: { __typename?: 'Warehouse'; name: string };
    warehouseOrigin: { __typename?: 'Warehouse'; name: string };
  };
};

export type ConfirmProductsStockTransferMutationVariables = Exact<{
  id: Scalars['String'];
  input: ConfirmStockTransferInput;
}>;

export type ConfirmProductsStockTransferMutation = {
  __typename?: 'Mutation';
  confirmProductsStockTransfer: {
    __typename?: 'StockTransfer';
    _id: string;
    details: {
      __typename?: 'DetailTransfer';
      quantity: number;
      quantityConfirmed?: number | null;
      status: StatusDetailTransfer;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        color: { __typename?: 'Color'; name: string };
        reference: { __typename?: 'Reference'; name: string; description: string };
        size: { __typename?: 'Size'; value: string };
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
      };
    }[];
  };
};

export type VerifiedProducttStockTransferMutationVariables = Exact<{
  input: VerifiedProductTransferErrorInput;
}>;

export type VerifiedProducttStockTransferMutation = {
  __typename?: 'Mutation';
  verifiedProductStockTransfer: {
    __typename?: 'StockTransferError';
    _id: string;
    createdAt: any;
    updatedAt: any;
    verified: boolean;
    details: {
      __typename?: 'DetailTransferError';
      quantity: number;
      reason?: string | null;
      status: StatusDetailTransferError;
      updatedAt: any;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        reference: { __typename?: 'Reference'; name: string };
        size: { __typename?: 'Size'; value: string };
        color: { __typename?: 'Color'; name: string; html: string; name_internal: string };
      };
    }[];
    stockTransfer: { __typename?: 'StockTransfer'; _id: string };
  };
};

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginResponse';
    access_token: string;
    user: {
      __typename?: 'User';
      _id: string;
      username: string;
      name: string;
      pointOfSale?: {
        __typename?: 'PointOfSale';
        _id: string;
        box: { __typename?: 'Box'; _id: string };
      } | null;
      shop: {
        __typename?: 'Shop';
        _id: string;
        name: string;
        defaultWarehouse: { __typename?: 'Warehouse'; _id: string; name: string };
      };
      role: {
        __typename?: 'Role';
        changeWarehouse: boolean;
        name: string;
        permissions: { __typename?: 'Permission'; action: Permissions }[];
      };
    };
  };
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'User';
    _id: string;
    username: string;
    name: string;
    password?: string | null;
    pointOfSale?: { __typename?: 'PointOfSale'; name: string; _id: string } | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: { __typename?: 'User'; _id: string; username: string; name: string };
};

export type CreateWarehouseMutationVariables = Exact<{
  input: CreateWarehouseInput;
}>;

export type CreateWarehouseMutation = {
  __typename?: 'Mutation';
  createWarehouse: { __typename?: 'Warehouse'; _id: string; name: string };
};

export type UpdateWarehouseMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateWarehouseInput;
}>;

export type UpdateWarehouseMutation = {
  __typename?: 'Mutation';
  updateWarehouse: { __typename?: 'Warehouse'; _id: string; name: string };
};

export type StockAdjustmentQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type StockAdjustmentQuery = {
  __typename?: 'Query';
  stockAdjustmentId: {
    __typename?: 'StockAdjustment';
    _id: string;
    number: number;
    observation?: string | null;
    status: StatusStockAdjustment;
    total: number;
    createdAt: any;
    updatedAt: any;
    user: { __typename?: 'User'; _id: string; name: string };
    warehouse: { __typename?: 'Warehouse'; name: string; _id: string };
    details: {
      __typename?: 'DetailAdjustment';
      quantity: number;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        status: StatusProduct;
        reference: {
          __typename?: 'Reference';
          cost: number;
          description: string;
          name: string;
          price: number;
        };
        size: { __typename?: 'Size'; value: string };
        color: {
          __typename?: 'Color';
          html: string;
          name_internal: string;
          image?: {
            __typename?: 'Image';
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          } | null;
        };
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
        user: { __typename?: 'User'; name: string };
      };
    }[];
  };
};

export type StockAdjustmentsQueryVariables = Exact<{
  input?: InputMaybe<FiltersStockAdjustmentsInput>;
}>;

export type StockAdjustmentsQuery = {
  __typename?: 'Query';
  stockAdjustments: {
    __typename?: 'ResponseStockAdjustments';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'StockAdjustment';
      _id: string;
      number: number;
      observation?: string | null;
      status: StatusStockAdjustment;
      total: number;
      createdAt: any;
      updatedAt: any;
      warehouse: { __typename?: 'Warehouse'; name: string };
      details: {
        __typename?: 'DetailAdjustment';
        quantity: number;
        product: {
          __typename?: 'Product';
          _id: string;
          barcode: string;
          reference: { __typename?: 'Reference'; description: string; cost: number; name: string };
          size: { __typename?: 'Size'; value: string };
          stock?: { __typename?: 'Stock'; quantity: number }[] | null;
          color: {
            __typename?: 'Color';
            html: string;
            name_internal: string;
            image?: {
              __typename?: 'Image';
              urls?: {
                __typename?: 'Urls';
                webp?: { __typename?: 'ImageTypes'; small: string } | null;
              } | null;
            } | null;
          };
        };
      }[];
    }[];
  };
};

export type AttribsQueryVariables = Exact<{
  input?: InputMaybe<FiltersAttribsInput>;
}>;

export type AttribsQuery = {
  __typename?: 'Query';
  attribs: {
    __typename?: 'ResponseAttribs';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Attrib';
      _id: string;
      active: boolean;
      createdAt: any;
      name: string;
      updatedAt: any;
    }[];
  };
};

export type AuthorizationsQueryVariables = Exact<{
  input?: InputMaybe<FiltersAuthorizationInput>;
}>;

export type AuthorizationsQuery = {
  __typename?: 'Query';
  authorizations: {
    __typename?: 'ResponseAuthorizations';
    totalDocs: number;
    page: number;
    totalPages: number;
    docs: {
      __typename?: 'AuthorizationDian';
      _id: string;
      updatedAt: any;
      prefix: string;
      resolution?: string | null;
      dateInitial?: any | null;
      dateFinal?: any | null;
      numberInitial?: number | null;
      numberFinal?: number | null;
      shop: {
        __typename?: 'Shop';
        _id: string;
        name: string;
        email?: string | null;
        phone?: string | null;
        document?: string | null;
        address?: string | null;
        companyName?: string | null;
      };
    }[];
  };
};

export type BoxesQueryVariables = Exact<{
  input?: InputMaybe<FiltersBoxesInput>;
}>;

export type BoxesQuery = {
  __typename?: 'Query';
  boxes: {
    __typename?: 'ResponseBoxes';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Box';
      _id: string;
      base: number;
      updatedAt: any;
      total: number;
      name: string;
      isMain: boolean;
    }[];
  };
};

export type ErrorCashQueryVariables = Exact<{
  input: FiltersErrorsCashInput;
}>;

export type ErrorCashQuery = {
  __typename?: 'Query';
  errorsCash: {
    __typename?: 'ResponseErrorCash';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'ErrorCash';
      _id: string;
      reason?: string | null;
      typeError: TypeErrorCash;
      value: number;
      verified: boolean;
      updatedAt: any;
      boxDestination: { __typename?: 'Box'; _id: string; name: string };
      boxOrigin: { __typename?: 'Box'; name: string; _id: string };
      closeZ?: {
        __typename?: 'CloseZInvoicing';
        _id: string;
        number: number;
        pointOfSale: { __typename?: 'PointOfSale'; name: string };
      } | null;
    }[];
  };
};

export type BrandsQueryVariables = Exact<{
  input?: InputMaybe<FiltersBrandsInput>;
}>;

export type BrandsQuery = {
  __typename?: 'Query';
  brands: {
    __typename?: 'ResponseBrands';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Brand';
      _id: string;
      active: boolean;
      createdAt: any;
      updatedAt: any;
      name: string;
    }[];
  };
};

export type CategoriesQueryVariables = Exact<{
  input?: InputMaybe<FiltersCategoriesInput>;
}>;

export type CategoriesQuery = {
  __typename?: 'Query';
  categories: {
    __typename?: 'ResponseCategories';
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    docs: {
      __typename?: 'CategoryLevel1';
      _id: string;
      createdAt: any;
      updatedAt: any;
      name: string;
      childs?:
        | {
            __typename?: 'CategoryLevel2';
            _id: string;
            parentId?: string | null;
            createdAt: any;
            updatedAt: any;
            name?: string | null;
            childs?:
              | {
                  __typename?: 'CategoryLevel3';
                  _id: string;
                  parentId?: string | null;
                  createdAt: any;
                  updatedAt: any;
                  name?: string | null;
                }[]
              | null;
          }[]
        | null;
    }[];
  };
};

export type CategoriesLevelQueryVariables = Exact<{
  input?: InputMaybe<FiltersCategoriesLevelInput>;
}>;

export type CategoriesLevelQuery = {
  __typename?: 'Query';
  categoriesLevel: {
    __typename?: 'ResponseCategories';
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    docs: {
      __typename?: 'CategoryLevel1';
      _id: string;
      createdAt: any;
      updatedAt: any;
      name: string;
      childs?:
        | {
            __typename?: 'CategoryLevel2';
            _id: string;
            name?: string | null;
            createdAt: any;
            updatedAt: any;
            childs?:
              | {
                  __typename?: 'CategoryLevel3';
                  _id: string;
                  createdAt: any;
                  updatedAt: any;
                  name?: string | null;
                }[]
              | null;
          }[]
        | null;
    }[];
  };
};

export type CitiesQueryVariables = Exact<{
  input?: InputMaybe<FiltersCitiesInput>;
}>;

export type CitiesQuery = {
  __typename?: 'Query';
  cities: {
    __typename?: 'ResponseCities';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'City';
      _id: string;
      name: string;
      state: string;
      updatedAt: any;
      country: { __typename?: 'Country'; name: string; prefix: string };
      user: { __typename?: 'User'; name: string };
    }[];
  };
};

export type ClosesXInvoicingQueryVariables = Exact<{
  input?: InputMaybe<FiltersClosesXInvoicingInput>;
}>;

export type ClosesXInvoicingQuery = {
  __typename?: 'Query';
  closesXInvoicing: {
    __typename?: 'ResponseClosesXInvoicing';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'CloseXInvoicing';
      _id: string;
      number: number;
      closeDate: any;
      quantityBank: number;
      cashRegister: {
        __typename?: 'CashRegister';
        M50: number;
        M100: number;
        M200: number;
        M500: number;
        B1000: number;
        B2000: number;
        B5000: number;
        B10000: number;
        B20000: number;
        B50000: number;
        B100000: number;
      };
      pointOfSale: {
        __typename?: 'PointOfSale';
        name: string;
        shop: { __typename?: 'Shop'; name: string };
      };
      expenses?: { __typename?: 'Expense'; value: number }[] | null;
      refunds?: {
        __typename?: 'RefundOrderClose';
        quantity?: number | null;
        value?: number | null;
      } | null;
      summaryOrder: {
        __typename?: 'SummaryOrderClose';
        value: number;
        quantityClosed: number;
        quantityCancel: number;
        quantityOpen: number;
      };
      payments?:
        | {
            __typename?: 'PaymentOrderClose';
            quantity: number;
            value: number;
            payment: { __typename?: 'Payment'; type: TypePayment; name: string };
          }[]
        | null;
      paymentsCredit?:
        | {
            __typename?: 'PaymentCredit';
            quantity: number;
            value: number;
            payment: { __typename?: 'Payment'; type: TypePayment; name: string };
          }[]
        | null;
      user: { __typename?: 'User'; name: string };
    }[];
  };
};

export type ClosesZInvoicingQueryVariables = Exact<{
  input?: InputMaybe<FiltersClosesZInvoicingInput>;
}>;

export type ClosesZInvoicingQuery = {
  __typename?: 'Query';
  closesZInvoicing: {
    __typename?: 'ResponseClosesZInvoicing';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'CloseZInvoicing';
      _id: string;
      number: number;
      closeDate: any;
      quantityBank: number;
      cashRegister: {
        __typename?: 'CashRegister';
        M50: number;
        M100: number;
        M200: number;
        M500: number;
        B1000: number;
        B2000: number;
        B5000: number;
        B10000: number;
        B20000: number;
        B50000: number;
        B100000: number;
      };
      pointOfSale: {
        __typename?: 'PointOfSale';
        name: string;
        shop: { __typename?: 'Shop'; name: string };
      };
      expenses?: { __typename?: 'Expense'; value: number }[] | null;
      refunds?: {
        __typename?: 'RefundOrderClose';
        quantity?: number | null;
        value?: number | null;
      } | null;
      summaryOrder: {
        __typename?: 'SummaryOrderClose';
        value: number;
        quantityClosed: number;
        quantityCancel: number;
        quantityOpen: number;
      };
      payments?:
        | {
            __typename?: 'PaymentOrderClose';
            quantity: number;
            value: number;
            payment: { __typename?: 'Payment'; type: TypePayment; name: string };
          }[]
        | null;
      paymentsCredit?:
        | {
            __typename?: 'PaymentCredit';
            quantity: number;
            value: number;
            payment: { __typename?: 'Payment'; type: TypePayment; name: string };
          }[]
        | null;
      user: { __typename?: 'User'; name: string };
    }[];
  };
};

export type ColorsQueryVariables = Exact<{
  input: FiltersColorsInput;
}>;

export type ColorsQuery = {
  __typename?: 'Query';
  colors: {
    __typename?: 'ResponseColors';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Color';
      _id: string;
      name: string;
      name_internal: string;
      createdAt: any;
      updatedAt: any;
      html: string;
      active: boolean;
      image?: {
        __typename?: 'Image';
        _id: string;
        urls?: {
          __typename?: 'Urls';
          webp?: { __typename?: 'ImageTypes'; small: string } | null;
        } | null;
      } | null;
    }[];
  };
};

export type CompaniesQueryVariables = Exact<{
  input?: InputMaybe<FiltersCompaniesInput>;
}>;

export type CompaniesQuery = {
  __typename?: 'Query';
  companies: {
    __typename?: 'ResponseCompanies';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Company';
      name: string;
      document: string;
      phone: string;
      email: string;
      address: string;
      regimenSimplify: boolean;
      active: boolean;
      updatedAt: any;
      _id: string;
      logo: string;
    }[];
  };
};

export type ConveyorsQueryVariables = Exact<{
  input?: InputMaybe<FiltersConveyorsInput>;
}>;

export type ConveyorsQuery = {
  __typename?: 'Query';
  conveyors: {
    __typename?: 'ResponseConveyors';
    docs: {
      __typename?: 'Conveyor';
      name: string;
      _id: string;
      message?: string | null;
      updatedAt: any;
      createdAt: any;
    }[];
  };
};

export type CouponQueryVariables = Exact<{
  input: FiltersCouponInput;
}>;

export type CouponQuery = {
  __typename?: 'Query';
  coupon: {
    __typename?: 'Coupon';
    _id: string;
    code: string;
    title: string;
    updatedAt: any;
    createdAt: any;
    expiration: any;
    message: string;
    number: number;
    status: StatusCoupon;
    value: number;
  };
};

export type CouponsQueryVariables = Exact<{
  input: FiltersCouponsInput;
}>;

export type CouponsQuery = {
  __typename?: 'Query';
  coupons: {
    __typename?: 'ResponseCoupons';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Coupon';
      _id: string;
      number: number;
      title: string;
      status: StatusCoupon;
      value: number;
      message: string;
      code: string;
      expiration: any;
      updatedAt: any;
      createdAt: any;
    }[];
  };
};

export type CreditQueryVariables = Exact<{
  input: FiltersCreditInput;
}>;

export type CreditQuery = {
  __typename?: 'Query';
  credit: {
    __typename?: 'Credit';
    balance: number;
    details?:
      | {
          __typename?: 'DetailCredit';
          balance: number;
          total: number;
          order: {
            __typename?: 'Order';
            _id: string;
            number: number;
            updatedAt: any;
            summary: { __typename?: 'SummaryOrder'; total: number };
          };
        }[]
      | null;
  };
};

export type CreditsQueryVariables = Exact<{
  input?: InputMaybe<FiltersCreditsInput>;
}>;

export type CreditsQuery = {
  __typename?: 'Query';
  credits: {
    __typename?: 'ResponseCredits';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Credit';
      _id: string;
      amount: number;
      available: number;
      frozenAmount: number;
      balance: number;
      createdAt: any;
      updatedAt: any;
      status: StatusCredit;
      customer: { __typename?: 'Customer'; document: string; firstName: string; lastName: string };
      details?: { __typename?: 'DetailCredit'; balance: number; total: number }[] | null;
    }[];
  };
};

export type CreditHistoryQueryVariables = Exact<{
  input: FiltersCreditHistoryInput;
}>;

export type CreditHistoryQuery = {
  __typename?: 'Query';
  creditHistory: {
    __typename?: 'ResponseCreditHistory';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'CreditHistory';
      type: TypeCreditHistory;
      amount: number;
      documentNumber?: number | null;
      documentType?: TypeDocument | null;
      credit: {
        __typename?: 'Credit';
        frozenAmount: number;
        amount: number;
        available: number;
        balance: number;
        updatedAt: any;
      };
    }[];
  };
};

export type CustomersQueryVariables = Exact<{
  input?: InputMaybe<FiltersCustomersInput>;
}>;

export type CustomersQuery = {
  __typename?: 'Query';
  customers: {
    __typename?: 'ResponseCustomers';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Customer';
      _id: string;
      document: string;
      firstName: string;
      lastName: string;
      email?: string | null;
      updatedAt: any;
      phone?: string | null;
      birthday?: any | null;
      isWhatsapp: boolean;
      active: boolean;
      documentType: { __typename?: 'DocumentType'; _id: string; abbreviation: string };
      addresses?:
        | {
            __typename?: 'Address';
            contact: string;
            extra?: string | null;
            field1: string;
            isMain?: boolean | null;
            loteNumber: string;
            neighborhood: string;
            number1: string;
            number2: string;
            phone: string;
            city: { __typename?: 'City'; _id: string; name: string };
          }[]
        | null;
      customerType: { __typename?: 'CustomerType'; name: string; _id: string };
    }[];
  };
};

export type CustomerTypesQueryVariables = Exact<{
  input: FiltersCustomerTypesInput;
}>;

export type CustomerTypesQuery = {
  __typename?: 'Query';
  customerTypes: {
    __typename?: 'ResponseCustomerTypes';
    docs: { __typename?: 'CustomerType'; _id: string; name: string }[];
  };
};

export type DailyClosingQueryVariables = Exact<{
  input?: InputMaybe<FiltersDailyClosing>;
}>;

export type DailyClosingQuery = {
  __typename?: 'Query';
  dailyClosings: {
    __typename?: 'ResponseDailyClosing';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'DailyClosing';
      _id: string;
      closeDate: any;
      invoices: {
        __typename?: 'Invoice';
        number: number;
        createdAt: any;
        order: { __typename?: 'Order'; number: number };
        authorization: { __typename?: 'AuthorizationDian'; prefix: string };
        summary: { __typename?: 'SummaryInvoice'; total: number; subtotal: number; tax: number };
      }[];
      pointOfSale: {
        __typename?: 'PointOfSale';
        name: string;
        shop: { __typename?: 'Shop'; name: string; document?: string | null };
        box: { __typename?: 'Box'; name: string };
      };
      summary: { __typename?: 'SummaryClose'; total: number; tax: number; subtotal: number };
      summaryPayments: {
        __typename?: 'SummaryPayment';
        quantity: number;
        total: number;
        payment: { __typename?: 'Payment'; name: string; type: TypePayment };
      }[];
    }[];
  };
};

export type DiscountRulesQueryVariables = Exact<{
  input?: InputMaybe<FiltersDiscountRulesInput>;
}>;

export type DiscountRulesQuery = {
  __typename?: 'Query';
  discountRules: {
    __typename?: 'ResponseDiscountRules';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'DiscountRule';
      _id: string;
      active: boolean;
      updatedAt: any;
      dateFinal: any;
      dateInitial: any;
      name: string;
      percent: number;
      value: number;
      rules: {
        __typename?: 'Rule';
        documentType: DocumentTypesRule;
        documentIds: string[];
        type: TypesRule;
      }[];
    }[];
  };
};

export type DocumentTypesQueryVariables = Exact<{
  input?: InputMaybe<FiltersDocumentTypesInput>;
}>;

export type DocumentTypesQuery = {
  __typename?: 'Query';
  documentTypes: { __typename?: 'DocumentType'; _id: string; abbreviation: string }[];
};

export type ExpensesQueryVariables = Exact<{
  input?: InputMaybe<FiltersExpensesInput>;
}>;

export type ExpensesQuery = {
  __typename?: 'Query';
  expenses: {
    __typename?: 'ResponseExpenses';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Expense';
      _id: string;
      number: number;
      value: number;
      status: StatusExpense;
      concept?: string | null;
      createdAt: any;
      user: { __typename?: 'User'; name: string };
      box: { __typename?: 'Box'; _id: string; name: string };
    }[];
  };
};

export type GoalStatusQueryVariables = Exact<{
  input: FiltersGoalStatusInput;
}>;

export type GoalStatusQuery = {
  __typename?: 'Query';
  goalStatus: { __typename?: 'ResponseGoalStatus'; goal: number; netSales: number };
};

export type ImagesQueryVariables = Exact<{
  input?: InputMaybe<FiltersImagesInput>;
}>;

export type ImagesQuery = {
  __typename?: 'Query';
  images: {
    __typename?: 'ResponseImages';
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
    docs: {
      __typename?: 'Image';
      name: string;
      _id: string;
      urls?: {
        __typename?: 'Urls';
        webp?: { __typename?: 'ImageTypes'; small: string } | null;
      } | null;
    }[];
  };
};

export type StockInputQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type StockInputQuery = {
  __typename?: 'Query';
  stockInputId: {
    __typename?: 'StockInput';
    _id: string;
    createdAt: any;
    updatedAt: any;
    total: number;
    status: StatusStockInput;
    observation?: string | null;
    number: number;
    details: {
      __typename?: 'DetailInput';
      quantity: number;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        reference: {
          __typename?: 'Reference';
          description: string;
          cost: number;
          name: string;
          price: number;
        };
        color: {
          __typename?: 'Color';
          html: string;
          name_internal: string;
          image?: {
            __typename?: 'Image';
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          } | null;
        };
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
        size: { __typename?: 'Size'; value: string };
      };
    }[];
    user: { __typename?: 'User'; _id: string; name: string };
    warehouse: { __typename?: 'Warehouse'; _id: string; name: string };
  };
};

export type StockInputsQueryVariables = Exact<{
  input?: InputMaybe<FiltersStockInputsInput>;
}>;

export type StockInputsQuery = {
  __typename?: 'Query';
  stockInputs: {
    __typename?: 'ResponseStockInputs';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'StockInput';
      _id: string;
      number: number;
      observation?: string | null;
      status: StatusStockInput;
      total: number;
      createdAt: any;
      updatedAt: any;
      warehouse: { __typename?: 'Warehouse'; name: string };
      user: { __typename?: 'User'; name: string };
      details: {
        __typename?: 'DetailInput';
        quantity: number;
        product: {
          __typename?: 'Product';
          barcode: string;
          reference: {
            __typename?: 'Reference';
            description: string;
            cost: number;
            price: number;
            name: string;
          };
          color: { __typename?: 'Color'; name_internal: string };
          size: { __typename?: 'Size'; value: string };
        };
      }[];
    }[];
  };
};

export type InvoicesQueryVariables = Exact<{
  input?: InputMaybe<FiltersInvoicesInput>;
}>;

export type InvoicesQuery = {
  __typename?: 'Query';
  invoices: {
    __typename?: 'ResponseInvoices';
    page: number;
    totalDocs: number;
    totalPages: number;
    docs: {
      __typename?: 'Invoice';
      _id: string;
      active: boolean;
      number: number;
      updatedAt: any;
      createdAt: any;
      authorization: {
        __typename?: 'AuthorizationDian';
        prefix: string;
        resolution?: string | null;
        dateInitial?: any | null;
        dateFinal?: any | null;
        numberInitial?: number | null;
        numberFinal?: number | null;
      };
      user: { __typename?: 'User'; username: string };
      summary: { __typename?: 'SummaryInvoice'; total: number; subtotal: number; tax: number };
      shop: { __typename?: 'Shop'; name: string };
      customer: {
        __typename?: 'Customer';
        firstName: string;
        lastName: string;
        document: string;
        documentType: { __typename?: 'DocumentType'; abbreviation: string };
      };
      details?:
        | {
            __typename?: 'DetailInvoice';
            price: number;
            quantity: number;
            product: {
              __typename?: 'Product';
              barcode: string;
              reference: {
                __typename?: 'Reference';
                changeable: boolean;
                name: string;
                description: string;
              };
              color: { __typename?: 'Color'; name: string };
              size: { __typename?: 'Size'; value: string };
            };
          }[]
        | null;
      company: {
        __typename?: 'Company';
        name: string;
        email: string;
        document: string;
        address: string;
        logo: string;
      };
      payments?:
        | { __typename?: 'PaymentInvoice'; payment: { __typename?: 'Payment'; name: string } }[]
        | null;
    }[];
  };
};

export type ReportSalesQueryVariables = Exact<{
  input: FiltersSalesReportInput;
}>;

export type ReportSalesQuery = {
  __typename?: 'Query';
  reportSales: {
    __typename?: 'ResponseReportSales';
    customersSalesReport?:
      | {
          __typename?: 'CustomerSalesReport';
          quantity: number;
          total: number;
          typeCustomer: { __typename?: 'CustomerType'; name: string };
        }[]
      | null;
    paymentsSalesReport?:
      | {
          __typename?: 'PaymentsSalesReport';
          quantity: number;
          total: number;
          payment: { __typename?: 'Payment'; name: string };
        }[]
      | null;
    salesReport?:
      | {
          __typename?: 'SalesReport';
          quantity: number;
          total: number;
          category?: { __typename?: 'CategoryLevel1'; name: string } | null;
          shop: { __typename?: 'Shop'; name: string };
        }[]
      | null;
    summarySalesReport?: {
      __typename?: 'SummarySalesReport';
      cmv: number;
      margin: number;
      quantity: number;
      total: number;
    } | null;
  };
};

export type OrderIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OrderIdQuery = {
  __typename?: 'Query';
  orderId: {
    __typename?: 'ResponseOrder';
    credit?: { __typename?: 'Credit'; available: number; amount: number } | null;
    order: {
      __typename?: 'Order';
      closeDate: any;
      statusWeb?: StatusWeb | null;
      status: StatusOrder;
      _id: string;
      number: number;
      updatedAt: any;
      createdAt: any;
      invoice?: {
        __typename?: 'Invoice';
        createdAt: any;
        user: { __typename?: 'User'; name: string };
        authorization: { __typename?: 'AuthorizationDian'; prefix: string };
        customer: {
          __typename?: 'Customer';
          document: string;
          firstName: string;
          lastName: string;
          addresses?:
            | {
                __typename?: 'Address';
                extra?: string | null;
                field1: string;
                isMain?: boolean | null;
                loteNumber: string;
                neighborhood: string;
                number1: string;
                number2: string;
                contact: string;
                phone: string;
                city: {
                  __typename?: 'City';
                  _id: string;
                  name: string;
                  state: string;
                  country: { __typename?: 'Country'; name: string };
                };
              }[]
            | null;
        };
        payments?:
          | {
              __typename?: 'PaymentInvoice';
              total: number;
              payment: { __typename?: 'Payment'; name: string; _id: string; type: TypePayment };
            }[]
          | null;
        summary: {
          __typename?: 'SummaryInvoice';
          change: number;
          discount: number;
          total: number;
          totalPaid: number;
          tax: number;
          subtotal: number;
        };
        shop: { __typename?: 'Shop'; name: string };
        details?:
          | {
              __typename?: 'DetailInvoice';
              discount: number;
              price: number;
              quantity: number;
              product: {
                __typename?: 'Product';
                size: { __typename?: 'Size'; value: string };
                reference: { __typename?: 'Reference'; description: string; name: string };
                color: { __typename?: 'Color'; name: string };
              };
            }[]
          | null;
      } | null;
      user: { __typename?: 'User'; name: string };
      conveyorOrder?: {
        __typename?: 'ConveyorOrder';
        shippingDate?: any | null;
        value: number;
        guideCode?: string | null;
        conveyor: { __typename?: 'Conveyor'; _id: string; name: string };
      } | null;
      address?: {
        __typename?: 'Address';
        contact: string;
        extra?: string | null;
        field1: string;
        isMain?: boolean | null;
        loteNumber: string;
        neighborhood: string;
        number1: string;
        number2: string;
        phone: string;
        city: {
          __typename?: 'City';
          _id: string;
          name: string;
          state: string;
          country: { __typename?: 'Country'; name: string };
        };
      } | null;
      shop: {
        __typename?: 'Shop';
        name: string;
        defaultWarehouse: { __typename?: 'Warehouse'; _id: string };
      };
      customer: {
        __typename?: 'Customer';
        _id: string;
        document: string;
        phone?: string | null;
        firstName: string;
        lastName: string;
        active: boolean;
        addresses?:
          | {
              __typename?: 'Address';
              extra?: string | null;
              field1: string;
              isMain?: boolean | null;
              loteNumber: string;
              neighborhood: string;
              number1: string;
              number2: string;
              contact: string;
              phone: string;
              city: { __typename?: 'City'; _id: string; name: string; state: string };
            }[]
          | null;
        documentType: { __typename?: 'DocumentType'; abbreviation: string };
        customerType: { __typename?: 'CustomerType'; name: string };
      };
      details?:
        | {
            __typename?: 'DetailOrder';
            createdAt: any;
            updatedAt: any;
            discount: number;
            quantity: number;
            price: number;
            status: StatusOrderDetail;
            product: {
              __typename?: 'Product';
              _id: string;
              barcode: string;
              status: StatusProduct;
              images?:
                | {
                    __typename?: 'Image';
                    urls?: {
                      __typename?: 'Urls';
                      webp?: { __typename?: 'ImageTypes'; small: string } | null;
                    } | null;
                  }[]
                | null;
              reference: {
                __typename?: 'Reference';
                name: string;
                cost: number;
                description: string;
                _id: string;
                price: number;
              };
              size: { __typename?: 'Size'; value: string };
              color: {
                __typename?: 'Color';
                html: string;
                name: string;
                name_internal: string;
                image?: {
                  __typename?: 'Image';
                  urls?: {
                    __typename?: 'Urls';
                    webp?: { __typename?: 'ImageTypes'; small: string } | null;
                  } | null;
                } | null;
              };
              stock?: { __typename?: 'Stock'; quantity: number }[] | null;
            };
          }[]
        | null;
      payments?:
        | {
            __typename?: 'PaymentOrder';
            createdAt: any;
            updatedAt: any;
            total: number;
            status: StatusOrderDetail;
            code?: string | null;
            payment: {
              __typename?: 'Payment';
              _id: string;
              name: string;
              type: TypePayment;
              active: boolean;
            };
          }[]
        | null;
      summary: {
        __typename?: 'SummaryOrder';
        change: number;
        discount: number;
        subtotal: number;
        total: number;
        totalPaid: number;
      };
    };
  };
};

export type OrdersByPosQueryVariables = Exact<Record<string, never>>;

export type OrdersByPosQuery = {
  __typename?: 'Query';
  ordersByPointOfSale: {
    __typename?: 'Order';
    _id: string;
    number: number;
    status: StatusOrder;
    updatedAt: any;
    shop: { __typename?: 'Shop'; name: string };
    invoice?: { __typename?: 'Invoice'; number: number } | null;
    customer: {
      __typename?: 'Customer';
      document: string;
      firstName: string;
      lastName: string;
      documentType: { __typename?: 'DocumentType'; abbreviation: string };
    };
    details?:
      | {
          __typename?: 'DetailOrder';
          price: number;
          quantity: number;
          product: {
            __typename?: 'Product';
            _id: string;
            barcode: string;
            color: { __typename?: 'Color'; name: string };
            size: { __typename?: 'Size'; value: string };
            reference: { __typename?: 'Reference'; name: string };
          };
        }[]
      | null;
    summary: {
      __typename?: 'SummaryOrder';
      discount: number;
      subtotal: number;
      total: number;
      totalPaid: number;
    };
  }[];
};

export type OrdersQueryVariables = Exact<{
  input: FiltersOrdersInput;
}>;

export type OrdersQuery = {
  __typename?: 'Query';
  orders: {
    __typename?: 'ResponseOrders';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Order';
      closeDate: any;
      statusWeb?: StatusWeb | null;
      _id: string;
      createdAt: any;
      updatedAt: any;
      number: number;
      status: StatusOrder;
      address?: {
        __typename?: 'Address';
        city: { __typename?: 'City'; name: string; state: string };
      } | null;
      conveyorOrder?: {
        __typename?: 'ConveyorOrder';
        conveyor: {
          __typename?: 'Conveyor';
          name: string;
          logo: {
            __typename?: 'Image';
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          };
        };
      } | null;
      payments?:
        | {
            __typename?: 'PaymentOrder';
            total: number;
            payment: { __typename?: 'Payment'; name: string; type: TypePayment };
          }[]
        | null;
      summary: {
        __typename?: 'SummaryOrder';
        total: number;
        change: number;
        discount: number;
        subtotal: number;
        totalPaid: number;
      };
      customer: {
        __typename?: 'Customer';
        document: string;
        firstName: string;
        lastName: string;
        phone?: string | null;
        customerType: { __typename?: 'CustomerType'; name: string };
      };
      shop: { __typename?: 'Shop'; name: string };
      user: { __typename?: 'User'; name: string };
      details?:
        | {
            __typename?: 'DetailOrder';
            discount: number;
            price: number;
            quantity: number;
            quantityReturn: number;
            product: {
              __typename?: 'Product';
              _id: string;
              barcode: string;
              reference: {
                __typename?: 'Reference';
                changeable: boolean;
                name: string;
                description: string;
              };
              color: { __typename?: 'Color'; name: string };
              size: { __typename?: 'Size'; value: string };
            };
          }[]
        | null;
    }[];
  };
};

export type StockOutputQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type StockOutputQuery = {
  __typename?: 'Query';
  stockOutputId: {
    __typename?: 'StockOutput';
    _id: string;
    createdAt: any;
    updatedAt: any;
    total: number;
    status: StatusStockOutput;
    observation?: string | null;
    number: number;
    details: {
      __typename?: 'DetailOutput';
      quantity: number;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        reference: {
          __typename?: 'Reference';
          description: string;
          cost: number;
          name: string;
          price: number;
        };
        color: {
          __typename?: 'Color';
          html: string;
          name_internal: string;
          image?: {
            __typename?: 'Image';
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          } | null;
        };
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
        size: { __typename?: 'Size'; value: string };
      };
    }[];
    user: { __typename?: 'User'; _id: string; name: string };
    warehouse: { __typename?: 'Warehouse'; _id: string; name: string };
  };
};

export type StockOutputsQueryVariables = Exact<{
  input?: InputMaybe<FiltersStockOutputsInput>;
}>;

export type StockOutputsQuery = {
  __typename?: 'Query';
  stockOutputs: {
    __typename?: 'ResponseStockOutputs';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'StockOutput';
      observation?: string | null;
      _id: string;
      createdAt: any;
      number: number;
      updatedAt: any;
      status: StatusStockOutput;
      total: number;
      user: { __typename?: 'User'; name: string };
      warehouse: { __typename?: 'Warehouse'; name: string; _id: string };
      details: {
        __typename?: 'DetailOutput';
        quantity: number;
        product: {
          __typename?: 'Product';
          barcode: string;
          reference: {
            __typename?: 'Reference';
            description: string;
            price: number;
            cost: number;
            name: string;
          };
          color: { __typename?: 'Color'; name: string; name_internal: string };
          size: { __typename?: 'Size'; value: string };
        };
      }[];
    }[];
  };
};

export type PaymentsQueryVariables = Exact<{
  input?: InputMaybe<FiltersPaymentsInput>;
}>;

export type PaymentsQuery = {
  __typename?: 'Query';
  payments: {
    __typename?: 'ResponsePayments';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Payment';
      _id: string;
      active: boolean;
      updatedAt: any;
      message?: string | null;
      name: string;
      type: TypePayment;
      color?: string | null;
      user: { __typename?: 'User'; name: string };
      logo?: {
        __typename?: 'Image';
        _id: string;
        urls?: {
          __typename?: 'Urls';
          webp?: { __typename?: 'ImageTypes'; small: string } | null;
        } | null;
      } | null;
    }[];
  };
};

export type PermissionsQueryVariables = Exact<Record<string, never>>;

export type PermissionsQuery = {
  __typename?: 'Query';
  permissions: {
    __typename?: 'PermissionData';
    module: string;
    options: {
      __typename?: 'OptionPermission';
      name: string;
      actions: {
        __typename?: 'ActionPermission';
        _id: string;
        description: string;
        name: string;
      }[];
    }[];
  }[];
};

export type PointOfSalesQueryVariables = Exact<{
  input?: InputMaybe<FiltersPointOfSalesInput>;
}>;

export type PointOfSalesQuery = {
  __typename?: 'Query';
  pointOfSales: {
    __typename?: 'ResponsePointOfSales';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'PointOfSale';
      _id: string;
      name: string;
      closeDate?: any | null;
      updatedAt: any;
      shop: { __typename?: 'Shop'; _id: string; name: string };
      box: { __typename?: 'Box'; _id: string; name: string };
      authorization: { __typename?: 'AuthorizationDian'; _id: string; prefix: string };
    }[];
  };
};

export type ProductsQueryVariables = Exact<{
  input: FiltersProductsInput;
}>;

export type ProductsQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'ResponseProducts';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Product';
      _id: string;
      barcode: string;
      reference: { __typename?: 'Reference'; description: string; name: string; price: number };
      color: {
        __typename?: 'Color';
        name_internal: string;
        name: string;
        html: string;
        image?: {
          __typename?: 'Image';
          urls?: {
            __typename?: 'Urls';
            webp?: { __typename?: 'ImageTypes'; small: string } | null;
          } | null;
        } | null;
      };
      size: { __typename?: 'Size'; value: string; weight: number };
      stock?: { __typename?: 'Stock'; quantity: number }[] | null;
    }[];
  };
};

export type ProductQueryVariables = Exact<{
  input: FiltersProductInput;
}>;

export type ProductQuery = {
  __typename?: 'Query';
  product: {
    __typename?: 'Product';
    _id: string;
    barcode: string;
    status: StatusProduct;
    stock?: { __typename?: 'Stock'; quantity: number }[] | null;
    color: {
      __typename?: 'Color';
      name: string;
      name_internal: string;
      html: string;
      image?: {
        __typename?: 'Image';
        urls?: {
          __typename?: 'Urls';
          webp?: { __typename?: 'ImageTypes'; small: string } | null;
        } | null;
      } | null;
    };
    reference: { __typename?: 'Reference'; description: string; name: string; price: number };
    size: { __typename?: 'Size'; value: string };
  };
};

export type ReceiptsQueryVariables = Exact<{
  input?: InputMaybe<FiltersReceiptsInput>;
}>;

export type ReceiptsQuery = {
  __typename?: 'Query';
  receipts: {
    __typename?: 'ResponseReceipts';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Receipt';
      _id: string;
      number: number;
      updatedAt: any;
      createdAt: any;
      concept?: string | null;
      value: number;
      status: StatusReceipt;
      box?: { __typename?: 'Box'; name: string } | null;
      user: { __typename?: 'User'; name: string };
      payment: { __typename?: 'Payment'; name: string; type: TypePayment };
    }[];
  };
};

export type ReferenceIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type ReferenceIdQuery = {
  __typename?: 'Query';
  referenceId: {
    __typename?: 'ReferenceData';
    _id: string;
    active: boolean;
    changeable: boolean;
    cost: number;
    description: string;
    name: string;
    price: number;
    attribs?:
      | {
          __typename?: 'Attrib';
          _id: string;
          active: boolean;
          createdAt: any;
          updatedAt: any;
          name: string;
        }[]
      | null;
    brand: { __typename?: 'Brand'; _id: string; active: boolean; name: string };
    categoryLevel1: {
      __typename?: 'CategoryLevel1';
      _id: string;
      name: string;
      childs?:
        | {
            __typename?: 'CategoryLevel2';
            _id: string;
            name?: string | null;
            childs?: { __typename?: 'CategoryLevel3'; _id: string; name?: string | null }[] | null;
          }[]
        | null;
    };
    categoryLevel2?: {
      __typename?: 'CategoryLevel2';
      _id: string;
      parentId?: string | null;
      name?: string | null;
      childs?:
        | {
            __typename?: 'CategoryLevel3';
            parentId?: string | null;
            _id: string;
            name?: string | null;
          }[]
        | null;
    } | null;
    categoryLevel3?: {
      __typename?: 'CategoryLevel3';
      _id: string;
      parentId?: string | null;
      name?: string | null;
    } | null;
    shipping: {
      __typename?: 'Shipping';
      height: number;
      long: number;
      volume: number;
      width: number;
      weight: number;
    };
    products: {
      __typename?: 'Product';
      _id: string;
      barcode: string;
      status: StatusProduct;
      images?:
        | {
            __typename?: 'Image';
            _id: string;
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          }[]
        | null;
      color: {
        __typename?: 'Color';
        _id: string;
        name: string;
        name_internal: string;
        html: string;
        image?: {
          __typename?: 'Image';
          urls?: {
            __typename?: 'Urls';
            webp?: { __typename?: 'ImageTypes'; small: string } | null;
          } | null;
        } | null;
      };
      size: { __typename?: 'Size'; _id: string; value: string };
    }[];
  };
};

export type ReferencesQueryVariables = Exact<{
  id: Scalars['String'];
  input?: InputMaybe<FiltersReferencesInput>;
}>;

export type ReferencesQuery = {
  __typename?: 'Query';
  references: {
    __typename?: 'ResponseReferences';
    page: number;
    totalDocs: number;
    totalPages: number;
    limit: number;
    docs: {
      __typename?: 'ReferenceData';
      _id: string;
      name: string;
      description: string;
      active: boolean;
      cost: number;
      price: number;
      changeable: boolean;
      updatedAt: any;
    }[];
  };
};

export type StockRequestQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type StockRequestQuery = {
  __typename?: 'Query';
  stockRequestId: {
    __typename?: 'StockRequest';
    _id: string;
    createdAt: any;
    number: number;
    observation?: string | null;
    status: StatusStockRequest;
    updatedAt: any;
    details: {
      __typename?: 'DetailRequest';
      createdAt: any;
      updatedAt: any;
      quantity: number;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
        color: {
          __typename?: 'Color';
          html: string;
          name_internal: string;
          image?: {
            __typename?: 'Image';
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          } | null;
        };
        reference: { __typename?: 'Reference'; cost: number; description: string; name: string };
        size: { __typename?: 'Size'; value: string };
      };
    }[];
    user: { __typename?: 'User'; _id: string; name: string };
    warehouseDestination: { __typename?: 'Warehouse'; _id: string; name: string };
    warehouseOrigin: { __typename?: 'Warehouse'; _id: string; name: string };
  };
};

export type StockRequestsQueryVariables = Exact<{
  input: FiltersStockRequestsInput;
}>;

export type StockRequestsQuery = {
  __typename?: 'Query';
  stockRequests: {
    __typename?: 'ResponseStockRequests';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'StockRequest';
      _id: string;
      number: number;
      observation?: string | null;
      status: StatusStockRequest;
      createdAt: any;
      updatedAt: any;
      warehouseOrigin: { __typename?: 'Warehouse'; _id: string; name: string };
      warehouseDestination: { __typename?: 'Warehouse'; _id: string; name: string };
      details: {
        __typename?: 'DetailRequest';
        createdAt: any;
        updatedAt: any;
        quantity: number;
        product: {
          __typename?: 'Product';
          _id: string;
          barcode: string;
          reference: { __typename?: 'Reference'; name: string; description: string };
          color: {
            __typename?: 'Color';
            html: string;
            name_internal: string;
            image?: {
              __typename?: 'Image';
              urls?: {
                __typename?: 'Urls';
                webp?: { __typename?: 'ImageTypes'; small: string } | null;
              } | null;
            } | null;
          };
          size: { __typename?: 'Size'; value: string };
          stock?: { __typename?: 'Stock'; quantity: number }[] | null;
        };
      }[];
      user: { __typename?: 'User'; name: string };
    }[];
  };
};

export type ReturnsOrderQueryVariables = Exact<{
  input?: InputMaybe<FiltersReturnsOrderInput>;
}>;

export type ReturnsOrderQuery = {
  __typename?: 'Query';
  returnsOrder: {
    __typename?: 'ResponseReturnsOrder';
    totalPages: number;
    totalDocs: number;
    page: number;
    docs: {
      __typename?: 'ReturnOrder';
      active: boolean;
      createdAt: any;
      updatedAt: any;
      _id: string;
      number: number;
      user: { __typename?: 'User'; name: string };
      coupon: {
        __typename?: 'Coupon';
        _id: string;
        code: string;
        createdAt: any;
        updatedAt: any;
        title: string;
        value: number;
        number: number;
        message: string;
        expiration: any;
      };
      order: {
        __typename?: 'Order';
        number: number;
        summary: { __typename?: 'SummaryOrder'; discount: number; total: number };
      };
      details?:
        | {
            __typename?: 'DetailReturnInvoice';
            price: number;
            quantity: number;
            product: {
              __typename?: 'Product';
              barcode: string;
              color: { __typename?: 'Color'; name: string };
              size: { __typename?: 'Size'; value: string };
              reference: { __typename?: 'Reference'; name: string; description: string };
            };
          }[]
        | null;
      pointOfSale: { __typename?: 'PointOfSale'; name: string };
    }[];
  };
};

export type RoleIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type RoleIdQuery = {
  __typename?: 'Query';
  roleId: {
    __typename?: 'Role';
    _id: string;
    name: string;
    changeWarehouse: boolean;
    active: boolean;
    user: { __typename?: 'User'; name: string };
    permissions: { __typename?: 'Permission'; _id: string }[];
  };
};

export type RolesQueryVariables = Exact<{
  input?: InputMaybe<FiltersRolesInput>;
}>;

export type RolesQuery = {
  __typename?: 'Query';
  roles: {
    __typename?: 'ResponseRoles';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Role';
      _id: string;
      changeWarehouse: boolean;
      name: string;
      active: boolean;
      permissions: { __typename?: 'Permission'; description: string }[];
    }[];
  };
};

export type ShopsQueryVariables = Exact<{
  input?: InputMaybe<FiltersShopsInput>;
}>;

export type ShopsQuery = {
  __typename?: 'Query';
  shops: {
    __typename?: 'ResponseShops';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'Shop';
      _id: string;
      name: string;
      status: StatusShop;
      updatedAt: any;
      address?: string | null;
      goal: number;
      email?: string | null;
      document?: string | null;
      companyName?: string | null;
      phone?: string | null;
      isMain: boolean;
      user: { __typename?: 'User'; name: string };
      defaultWarehouse: { __typename?: 'Warehouse'; name: string; _id: string };
      warehouseMain?: { __typename?: 'Warehouse'; name: string; _id: string } | null;
    }[];
  };
};

export type SizesQueryVariables = Exact<{
  input: FiltersSizesInput;
}>;

export type SizesQuery = {
  __typename?: 'Query';
  sizes: {
    __typename?: 'ResponseSizes';
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
    docs: {
      __typename?: 'Size';
      createdAt: any;
      updatedAt: any;
      _id: string;
      value: string;
      active: boolean;
      weight: number;
    }[];
  };
};

export type StockTransfersQueryVariables = Exact<{
  input?: InputMaybe<FiltersStockTransfersInput>;
}>;

export type StockTransfersQuery = {
  __typename?: 'Query';
  stockTransfers: {
    __typename?: 'ResponseStockTransfers';
    page: number;
    totalDocs: number;
    totalPages: number;
    docs: {
      __typename?: 'StockTransfer';
      _id: string;
      number: number;
      status: StatusStockTransfer;
      updatedAt: any;
      createdAt: any;
      observation?: string | null;
      observationOrigin?: string | null;
      observationDestination?: string | null;
      details: {
        __typename?: 'DetailTransfer';
        quantityConfirmed?: number | null;
        quantity: number;
        product: {
          __typename?: 'Product';
          _id: string;
          barcode: string;
          color: {
            __typename?: 'Color';
            name: string;
            name_internal: string;
            html: string;
            image?: {
              __typename?: 'Image';
              urls?: {
                __typename?: 'Urls';
                webp?: { __typename?: 'ImageTypes'; small: string } | null;
              } | null;
            } | null;
          };
          reference: { __typename?: 'Reference'; name: string; description: string };
          size: { __typename?: 'Size'; value: string };
          stock?: { __typename?: 'Stock'; quantity: number }[] | null;
        };
      }[];
      warehouseDestination: { __typename?: 'Warehouse'; name: string };
      warehouseOrigin: { __typename?: 'Warehouse'; name: string };
      userOrigin: { __typename?: 'User'; name: string };
    }[];
  };
};

export type StockTransferIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type StockTransferIdQuery = {
  __typename?: 'Query';
  stockTransferId: {
    __typename?: 'StockTransfer';
    _id: string;
    createdAt: any;
    number: number;
    observation?: string | null;
    observationDestination?: string | null;
    observationOrigin?: string | null;
    status: StatusStockTransfer;
    updatedAt: any;
    details: {
      __typename?: 'DetailTransfer';
      quantity: number;
      quantityConfirmed?: number | null;
      status: StatusDetailTransfer;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        color: {
          __typename?: 'Color';
          name: string;
          name_internal: string;
          html: string;
          image?: {
            __typename?: 'Image';
            urls?: {
              __typename?: 'Urls';
              webp?: { __typename?: 'ImageTypes'; small: string } | null;
            } | null;
          } | null;
        };
        reference: { __typename?: 'Reference'; name: string; description: string };
        size: { __typename?: 'Size'; value: string };
        stock?: { __typename?: 'Stock'; quantity: number }[] | null;
      };
    }[];
    requests?: { __typename?: 'StockRequest'; _id: string; number: number }[] | null;
    userDestination?: { __typename?: 'User'; name: string } | null;
    userOrigin: { __typename?: 'User'; _id: string; name: string };
    warehouseDestination: { __typename?: 'Warehouse'; _id: string; name: string };
    warehouseOrigin: { __typename?: 'Warehouse'; _id: string; name: string };
  };
};

export type StockTransfersErrorQueryVariables = Exact<{
  input?: InputMaybe<FiltersStockTransfersErrorInput>;
}>;

export type StockTransfersErrorQuery = {
  __typename?: 'Query';
  stockTransfersError: {
    __typename?: 'ResponseStockTransfersError';
    page: number;
    totalDocs: number;
    totalPages: number;
    docs: {
      __typename?: 'StockTransferError';
      _id: string;
      updatedAt: any;
      createdAt: any;
      verified: boolean;
      details: {
        __typename?: 'DetailTransferError';
        status: StatusDetailTransferError;
        quantity: number;
        reason?: string | null;
        updatedAt: any;
        product: {
          __typename?: 'Product';
          _id: string;
          barcode: string;
          size: { __typename?: 'Size'; value: string };
          reference: { __typename?: 'Reference'; name: string };
          color: { __typename?: 'Color'; name: string; name_internal: string; html: string };
        };
      }[];
      stockTransfer: {
        __typename?: 'StockTransfer';
        _id: string;
        number: number;
        updatedAt: any;
        warehouseOrigin: { __typename?: 'Warehouse'; name: string };
        warehouseDestination: { __typename?: 'Warehouse'; name: string };
      };
    }[];
  };
};

export type CurrentUserQueryVariables = Exact<Record<string, never>>;

export type CurrentUserQuery = {
  __typename?: 'Query';
  currentUser: {
    __typename?: 'User';
    _id: string;
    username: string;
    name: string;
    isWeb: boolean;
    pointOfSale?: {
      __typename?: 'PointOfSale';
      _id: string;
      box: { __typename?: 'Box'; _id: string };
    } | null;
    shop: {
      __typename?: 'Shop';
      _id: string;
      name: string;
      defaultWarehouse: { __typename?: 'Warehouse'; _id: string; name: string };
    };
    role: {
      __typename?: 'Role';
      changeWarehouse: boolean;
      name: string;
      permissions: { __typename?: 'Permission'; action: Permissions }[];
    };
  };
};

export type UsersQueryVariables = Exact<{
  input: FiltersUsersInput;
}>;

export type UsersQuery = {
  __typename?: 'Query';
  users: {
    __typename?: 'ResponseUsers';
    totalDocs: number;
    totalPages: number;
    page: number;
    docs: {
      __typename?: 'User';
      _id: string;
      createdAt: any;
      updatedAt: any;
      name: string;
      isWeb: boolean;
      status: StatusUser;
      username: string;
      role: { __typename?: 'Role'; name: string; _id: string };
      shop: { __typename?: 'Shop'; name: string; _id: string };
      pointOfSale?: { __typename?: 'PointOfSale'; name: string; _id: string } | null;
    }[];
  };
};

export type WarehousesQueryVariables = Exact<{
  input: FiltersWarehousesInput;
}>;

export type WarehousesQuery = {
  __typename?: 'Query';
  warehouses: {
    __typename?: 'ResponseWarehouses';
    page: number;
    totalDocs: number;
    totalPages: number;
    docs: {
      __typename?: 'Warehouse';
      max: number;
      min: number;
      _id: string;
      name: string;
      updatedAt: any;
      active: boolean;
      user: { __typename?: 'User'; name: string };
    }[];
  };
};

export type WarehouseIdQueryVariables = Exact<{
  warehouseId: Scalars['String'];
}>;

export type WarehouseIdQuery = {
  __typename?: 'Query';
  warehouseId: { __typename?: 'Warehouse'; _id: string; name: string };
};

export const CreateStockAdjustmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createStockAdjustment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateStockAdjustmentInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createStockAdjustment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createStockAdjustmentInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateStockAdjustmentMutation, CreateStockAdjustmentMutationVariables>;
export const UpdateStockAdjustmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateStockAdjustment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateStockAdjustmentInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateStockAdjustment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateStockAdjustmentInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'company' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouse' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateStockAdjustmentMutation, UpdateStockAdjustmentMutationVariables>;
export const CreateAttribDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createAttrib' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateAttribInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createAttrib' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createAttribInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAttribMutation, CreateAttribMutationVariables>;
export const UpdateAttribDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateAttrib' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateAttribInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAttrib' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateAttribInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateAttribMutation, UpdateAttribMutationVariables>;
export const CreateAuthorizationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createAuthorization' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateAuthorizationInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createAuthorization' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createAuthorizationInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAuthorizationMutation, CreateAuthorizationMutationVariables>;
export const UpdateAuthorizationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateAuthorization' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateAuthorizationInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAuthorization' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateAuthorizationInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateAuthorizationMutation, UpdateAuthorizationMutationVariables>;
export const CreateBoxDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createBox' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateBoxInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createBox' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createBoxInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateBoxMutation, CreateBoxMutationVariables>;
export const UpdateBoxDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateBox' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateBoxInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateBox' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateBoxInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateBoxMutation, UpdateBoxMutationVariables>;
export const VerifiedErrorCashDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'verifiedErrorCash' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'VerifiedErrorsCashInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'verifiedErrorsCash' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'verifiedErrorsCashInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'boxDestination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'boxOrigin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'closeZ' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'number' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'typeError' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifiedErrorCashMutation, VerifiedErrorCashMutationVariables>;
export const CreateBrandDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createBrand' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateBrandInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createBrand' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createBrandInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateBrandMutation, CreateBrandMutationVariables>;
export const UpdateBrandDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateBrand' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateBrandInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateBrand' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateBrandInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateBrandMutation, UpdateBrandMutationVariables>;
export const CreateCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateCategoryInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCategoryInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'childs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'childs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateCategoryInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateCategoryInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'childs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'childs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const CreateCityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateCityInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCity' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCityInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCityMutation, CreateCityMutationVariables>;
export const UpdateCityDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateCity' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpadteCityInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCity' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateCityInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCityMutation, UpdateCityMutationVariables>;
export const CreateCloseXInvoicingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCloseXInvoicing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateCloseXInvoicingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCloseXInvoicing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCloseXInvoicing' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cashRegister' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'M50' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'M100' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'M200' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'M500' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B1000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B2000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B5000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B10000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B20000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B50000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B100000' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pointOfSale' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'closeDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'expenses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'value' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refunds' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'summaryOrder' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityClosed' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityCancel' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityOpen' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'quantityBank' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'payments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentsCredit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCloseXInvoicingMutation, CreateCloseXInvoicingMutationVariables>;
export const CreateCloseZInvoicingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCloseZInvoicing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateCloseZInvoicingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCloseZInvoicing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCloseZInvoicing' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cashRegister' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'M50' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'M100' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'M200' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'M500' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B1000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B2000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B5000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B10000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B20000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B50000' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'B100000' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pointOfSale' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'closeDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'expenses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'value' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refunds' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'summaryOrder' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityClosed' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityCancel' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityOpen' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'quantityBank' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'payments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentsCredit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCloseZInvoicingMutation, CreateCloseZInvoicingMutationVariables>;
export const CreateColorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createColor' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateColorInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createColor' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createColorInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'urls' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'webp' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'small' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateColorMutation, CreateColorMutationVariables>;
export const UpdateColorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateColor' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateColorInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateColor' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateColorInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'urls' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'webp' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'small' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateColorMutation, UpdateColorMutationVariables>;
export const CreateCompanyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCompany' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateCompanyInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCompany' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCompanyInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const UpdateCompanyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateCompany' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateCompanyInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCompany' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateCompanyInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const CreateCouponDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCoupon' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateCouponInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCoupon' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCouponInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCouponMutation, CreateCouponMutationVariables>;
export const UpdateCouponDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateCoupon' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateCouponInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCoupon' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateCustomerInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCouponMutation, UpdateCouponMutationVariables>;
export const UpdateCreditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateCredit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateCreditInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCredit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateCreditInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCreditMutation, UpdateCreditMutationVariables>;
export const CreateCreditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCredit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateCreditInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCredit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCreditInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCreditMutation, CreateCreditMutationVariables>;
export const CreateCustomerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createCustomer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateCustomerInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCustomer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createCustomerInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const UpdateCustomerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateCustomer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateCustomerInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCustomer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateCustomerInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const GenerateDailyClosingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'generateDailyClosing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'GenerateDailyClosingInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'generateDailyClosing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'generateDailyClosingInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GenerateDailyClosingMutation, GenerateDailyClosingMutationVariables>;
export const CreateDiscountRuleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createDiscountRule' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateDiscountRuleInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createDiscountRule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createDiscountRuleInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateDiscountRuleMutation, CreateDiscountRuleMutationVariables>;
export const UpdateDiscountRuleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateDiscountRule' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateDiscountRuleInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateDiscountRule' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateDiscountRuleInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateDiscountRuleMutation, UpdateDiscountRuleMutationVariables>;
export const CreateExpenseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createExpense' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateExpenseInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createExpense' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createExpenseInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const UpdateExpenseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateExpense' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateExpenseInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateExpense' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateExpenseInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'concept' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const CreateStockInputDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createStockInput' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateStockInputInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createStockInput' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createStockInputInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateStockInputMutation, CreateStockInputMutationVariables>;
export const UpdateStockInputDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateStockInput' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateStockInputInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateStockInput' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateStockInputInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouse' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateStockInputMutation, UpdateStockInputMutationVariables>;
export const InvoicingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'invoicing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'DataGenerateInvoicesInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'invoicing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dataGenerateInvoicesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'invoiceQuantityBank' } },
                { kind: 'Field', name: { kind: 'Name', value: 'valueInvoicingCash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'invoiceQuantityCash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'valueInvoicingBank' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvoicingMutation, InvoicingMutationVariables>;
export const CreateOrderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createOrder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateOrderInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createOrder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createOrderInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateOrderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateOrder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateOrderInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateOrder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateOrderInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'credit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'available' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customerType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'image' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'urls' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'webp' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'small' },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name_internal' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stock' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'quantity' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summary' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'totalPaid' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'change' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'invoice' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'authorization' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customer' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'documentType' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'abbreviation' },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'details' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'product' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'color' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'reference' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'description' },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'size' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'value' },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payments' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'payment' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shop' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'summary' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'change' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'totalPaid' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'user' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const AddPaymentsOrderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addPaymentsOrder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddPaymentsOrderInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addPaymentsOrder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'addPaymentsOrderInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'credit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'available' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customerType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'image' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'urls' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'webp' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'small' },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name_internal' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stock' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'quantity' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summary' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'totalPaid' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddPaymentsOrderMutation, AddPaymentsOrderMutationVariables>;
export const AddProductsOrderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addProductsOrder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'AddProductsOrderInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addProductsOrder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'addProductsOrderInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'credit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'available' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customerType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'image' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'urls' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'webp' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'small' },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name_internal' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stock' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'quantity' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summary' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'totalPaid' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddProductsOrderMutation, AddProductsOrderMutationVariables>;
export const ConfirmProductsOrderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'confirmProductsOrder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ConfirmProductsOrderInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'confirmProductsOrder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'confirmProductsOrderInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ConfirmProductsOrderMutation, ConfirmProductsOrderMutationVariables>;
export const ConfirmPaymentsOrderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'confirmPaymentsOrder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ConfirmPaymentsOrderInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'confirmPaymentsOrder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'confirmPaymentsOrderInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ConfirmPaymentsOrderMutation, ConfirmPaymentsOrderMutationVariables>;
export const CreateStockOutputDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createStockOutput' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateStockOutputInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createStockOutput' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createStockOutputInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateStockOutputMutation, CreateStockOutputMutationVariables>;
export const UpdateStockOutputDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateStockOutput' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateStockOutputInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateStockOutput' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateStockOutputInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouse' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateStockOutputMutation, UpdateStockOutputMutationVariables>;
export const CreatePaymentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createPayment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreatePaymentInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPayment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createPaymentInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const UpdatePaymentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updatePayment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdatePaymentInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePayment' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updatePaymentInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePaymentMutation, UpdatePaymentMutationVariables>;
export const CreatePointOfSaleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createPointOfSale' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreatePointOfSaleInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPointOfSale' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createPointOfSaleInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePointOfSaleMutation, CreatePointOfSaleMutationVariables>;
export const UpdatePointOfSaleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updatePointOfSale' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdatePointOfSaleInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePointOfSale' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updatePointOfSaleInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePointOfSaleMutation, UpdatePointOfSaleMutationVariables>;
export const UpdateProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateProductInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateProductInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'color' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'size' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'urls' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'webp' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'small' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const CreateProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateProductInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createProductInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'color' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'size' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'urls' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'webp' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'small' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const CreateReceiptDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createReceipt' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateReceiptInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createReceipt' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createReceiptInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'credit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'available' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'frozenAmount' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'receipt' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'concept' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'box' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateReceiptMutation, CreateReceiptMutationVariables>;
export const UpdateReceiptDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateReceipt' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateReceiptInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateReceipt' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateReceiptInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateReceiptMutation, UpdateReceiptMutationVariables>;
export const CreateReferenceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createReference' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateReferenceInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createReference' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createReferenceInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateReferenceMutation, CreateReferenceMutationVariables>;
export const UpdateReferenceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateReference' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateReferenceInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateReference' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateReferenceInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'changeable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shipping' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'long' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'volume' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'brand' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'attribs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryLevel1' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'childs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryLevel2' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'childs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryLevel3' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateReferenceMutation, UpdateReferenceMutationVariables>;
export const CreateStockRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createStockRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateStockRequestInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createStockRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createStockRequestInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateStockRequestMutation, CreateStockRequestMutationVariables>;
export const UpdateStockRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateStockRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateStockRequestInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateStockRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateStockRequestInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouseDestination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouseOrigin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateStockRequestMutation, UpdateStockRequestMutationVariables>;
export const GenerateStockRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'generateStockRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'shopId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'generateStockRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shopId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'shopId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GenerateStockRequestMutation, GenerateStockRequestMutationVariables>;
export const CreateReturnOrderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createReturnOrder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateReturnOrderInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createReturnOrder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createReturnOrderInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'coupon' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'expiration' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateReturnOrderMutation, CreateReturnOrderMutationVariables>;
export const CreateRoleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createRole' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateRoleInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createRole' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createRoleInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'changeWarehouse' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'permissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateRoleMutation, CreateRoleMutationVariables>;
export const UpdateRoleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateRole' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateRoleInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateRole' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateRoleInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'changeWarehouse' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'permissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const CreateShopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createShop' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateShopInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createShop' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createShopInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateShopMutation, CreateShopMutationVariables>;
export const UpdateShopDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateShop' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateShopInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateShop' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateShopInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateShopMutation, UpdateShopMutationVariables>;
export const CreateSizeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createSize' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateSizeInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createSize' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createSizeInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateSizeMutation, CreateSizeMutationVariables>;
export const UpdateSizeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateSize' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateSizeInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateSize' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateSizeInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateSizeMutation, UpdateSizeMutationVariables>;
export const CreateStockTransferDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createStockTransfer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateStockTransferInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createStockTransfer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createStockTransferInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityConfirmed' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observationDestination' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observationOrigin' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'requests' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userDestination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userOrigin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouseDestination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouseOrigin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateStockTransferMutation, CreateStockTransferMutationVariables>;
export const UpdateStockTransferDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateStockTransfer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateStockTransferInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateStockTransfer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateStockTransferInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityConfirmed' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observationDestination' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observationOrigin' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'requests' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userDestination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userOrigin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouseDestination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouseOrigin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateStockTransferMutation, UpdateStockTransferMutationVariables>;
export const ConfirmProductsStockTransferDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'confirmProductsStockTransfer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ConfirmStockTransferInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'confirmProductsStockTransfer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'confirmStockTransferInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityConfirmed' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConfirmProductsStockTransferMutation,
  ConfirmProductsStockTransferMutationVariables
>;
export const VerifiedProducttStockTransferDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'verifiedProducttStockTransfer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'VerifiedProductTransferErrorInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'verifiedProductStockTransfer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'verifiedProductTransferErrorInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'stockTransfer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  VerifiedProducttStockTransferMutation,
  VerifiedProducttStockTransferMutationVariables
>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'LoginUserInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'loginUserInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pointOfSale' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'box' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'defaultWarehouse' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'role' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'changeWarehouse' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'permissions' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'action' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'access_token' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateUserInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createUserInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'password' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pointOfSale' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateUserInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateUserInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateWarehouseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createWarehouse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateWarehouseInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createWarehouse' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createWarehouseInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateWarehouseMutation, CreateWarehouseMutationVariables>;
export const UpdateWarehouseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateWarehouse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateWarehouseInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateWarehouse' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateWarehouseInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;
export const StockAdjustmentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockAdjustment' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockAdjustmentId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouse' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'user' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockAdjustmentQuery, StockAdjustmentQueryVariables>;
export const StockAdjustmentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockAdjustments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'FiltersStockAdjustmentsInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockAdjustments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersStockAdjustmentsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouse' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stock' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'quantity' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'image' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'urls' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'webp' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'small' },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name_internal' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockAdjustmentsQuery, StockAdjustmentsQueryVariables>;
export const AttribsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'attribs' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersAttribsInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'attribs' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersAttribsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AttribsQuery, AttribsQueryVariables>;
export const AuthorizationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'authorizations' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersAuthorizationInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authorizations' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersAuthorizations' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'resolution' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dateInitial' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dateFinal' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'numberInitial' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'numberFinal' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'companyName' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthorizationsQuery, AuthorizationsQueryVariables>;
export const BoxesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'boxes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersBoxesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'boxes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersBoxesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'base' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isMain' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BoxesQuery, BoxesQueryVariables>;
export const ErrorCashDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'errorCash' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersErrorsCashInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'errorsCash' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersErrorsCashInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'boxDestination' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'boxOrigin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'closeZ' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pointOfSale' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'typeError' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ErrorCashQuery, ErrorCashQueryVariables>;
export const BrandsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'brands' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersBrandsInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'brands' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersBrandsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BrandsQuery, BrandsQueryVariables>;
export const CategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'categories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCategoriesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersCategoriesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'childs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'childs' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CategoriesLevelDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'categoriesLevel' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCategoriesLevelInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesLevel' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersCategoriesLevelInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'childs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'childs' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoriesLevelQuery, CategoriesLevelQueryVariables>;
export const CitiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'cities' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCitiesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cities' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersCitiesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CitiesQuery, CitiesQueryVariables>;
export const ClosesXInvoicingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'closesXInvoicing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'FiltersClosesXInvoicingInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'closesXInvoicing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersClosesXInvoicing' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cashRegister' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'M50' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'M100' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'M200' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'M500' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B1000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B2000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B5000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B10000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B20000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B50000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B100000' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pointOfSale' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shop' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'closeDate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'expenses' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'value' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'refunds' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summaryOrder' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantityClosed' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantityCancel' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantityOpen' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityBank' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paymentsCredit' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClosesXInvoicingQuery, ClosesXInvoicingQueryVariables>;
export const ClosesZInvoicingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'closesZInvoicing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'FiltersClosesZInvoicingInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'closesZInvoicing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersClosesZInvoicing' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cashRegister' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'M50' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'M100' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'M200' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'M500' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B1000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B2000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B5000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B10000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B20000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B50000' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'B100000' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pointOfSale' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shop' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'closeDate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'expenses' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'value' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'refunds' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summaryOrder' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantityClosed' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantityCancel' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantityOpen' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityBank' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paymentsCredit' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClosesZInvoicingQuery, ClosesZInvoicingQueryVariables>;
export const ColorsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'colors' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersColorsInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'colors' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersColorsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'urls' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'webp' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'small' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ColorsQuery, ColorsQueryVariables>;
export const CompaniesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'companies' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCompaniesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'companies' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersCompaniesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'regimenSimplify' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CompaniesQuery, CompaniesQueryVariables>;
export const ConveyorsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'conveyors' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersConveyorsInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'conveyors' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersConveyorsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ConveyorsQuery, ConveyorsQueryVariables>;
export const CouponDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'coupon' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCouponInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'coupon' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersCouponInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expiration' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CouponQuery, CouponQueryVariables>;
export const CouponsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'coupons' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCouponsInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'coupons' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersCouponsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'expiration' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CouponsQuery, CouponsQueryVariables>;
export const CreditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'credit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCreditInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'credit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersCreditInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'order' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'summary' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreditQuery, CreditQueryVariables>;
export const CreditsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'credits' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCreditsInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'credits' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersCreditsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'available' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'frozenAmount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreditsQuery, CreditsQueryVariables>;
export const CreditHistoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'creditHistory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCreditHistoryInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'creditHistory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'FiltersCreditHistoryInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'credit' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'frozenAmount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'available' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'documentNumber' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'documentType' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreditHistoryQuery, CreditHistoryQueryVariables>;
export const CustomersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'customers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCustomersInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersCustomerInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentType' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addresses' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'contact' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'extra' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'field1' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'isMain' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'loteNumber' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'neighborhood' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'number1' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'number2' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'birthday' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isWhatsapp' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customerType' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomersQuery, CustomersQueryVariables>;
export const CustomerTypesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'customerTypes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersCustomerTypesInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customerTypes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersCustomerTypesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomerTypesQuery, CustomerTypesQueryVariables>;
export const DailyClosingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'dailyClosing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersDailyClosing' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dailyClosings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersDailyClosing' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'closeDate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'invoices' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'order' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'authorization' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'summary' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'tax' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pointOfSale' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shop' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'box' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summary' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'tax' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summaryPayments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DailyClosingQuery, DailyClosingQueryVariables>;
export const DiscountRulesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'discountRules' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersDiscountRulesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'discountRules' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersDiscountRulesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dateFinal' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dateInitial' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'percent' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rules' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'documentType' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'documentIds' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DiscountRulesQuery, DiscountRulesQueryVariables>;
export const DocumentTypesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'documentTypes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersDocumentTypesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'documentTypes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersDocumentTypesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DocumentTypesQuery, DocumentTypesQueryVariables>;
export const ExpensesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'expenses' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersExpensesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'expenses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersExpensesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'concept' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'box' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ExpensesQuery, ExpensesQueryVariables>;
export const GoalStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'goalStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersGoalStatusInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'goalStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersGoalStatus' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'goal' } },
                { kind: 'Field', name: { kind: 'Name', value: 'netSales' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GoalStatusQuery, GoalStatusQueryVariables>;
export const ImagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'images' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersImagesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'images' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersImagesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'urls' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'webp' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'small' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ImagesQuery, ImagesQueryVariables>;
export const StockInputDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockInput' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockInputId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouse' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockInputQuery, StockInputQueryVariables>;
export const StockInputsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockInputs' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersStockInputsInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockInputs' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersStockInputsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouse' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name_internal' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockInputsQuery, StockInputsQueryVariables>;
export const InvoicesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'invoices' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersInvoicesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'invoices' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersInvoices' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'authorization' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'resolution' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'dateInitial' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'dateFinal' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'numberInitial' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'numberFinal' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summary' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'tax' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'changeable' },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'company' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InvoicesQuery, InvoicesQueryVariables>;
export const ReportSalesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'reportSales' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersSalesReportInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'reportSales' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersSalesReportInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'customersSalesReport' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'typeCustomer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentsSalesReport' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'salesReport' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'summarySalesReport' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'cmv' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'margin' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReportSalesQuery, ReportSalesQueryVariables>;
export const OrderIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'orderId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'orderId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'credit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'available' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'closeDate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'statusWeb' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'invoice' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'user' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'authorization' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customer' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'addresses' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'city' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: '_id' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'state' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'country' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'name' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'extra' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'field1' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'isMain' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'loteNumber' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'neighborhood' },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'number1' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'number2' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'contact' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payments' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'payment' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'summary' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'change' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'totalPaid' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'tax' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shop' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'details' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'product' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'size' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'value' },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'reference' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'description' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'color' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'conveyorOrder' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'shippingDate' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'guideCode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'conveyor' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'contact' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'extra' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'field1' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'isMain' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'loteNumber' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'neighborhood' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'number1' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'number2' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'country' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'defaultWarehouse' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'addresses' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'city' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'extra' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'field1' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'isMain' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'loteNumber' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'neighborhood' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'number1' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'number2' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'contact' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customerType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'images' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'image' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'urls' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'webp' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'small' },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name_internal' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stock' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'quantity' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summary' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'change' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'totalPaid' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OrderIdQuery, OrderIdQueryVariables>;
export const OrdersByPosDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'OrdersByPos' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ordersByPointOfSale' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shop' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'invoice' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'number' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'customer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentType' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'summary' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'totalPaid' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OrdersByPosQuery, OrdersByPosQueryVariables>;
export const OrdersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Orders' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersOrdersInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'orders' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersOrdersInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'closeDate' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'conveyorOrder' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'conveyor' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'logo' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'statusWeb' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payments' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'payment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summary' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'change' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'subtotal' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'totalPaid' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'customerType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantityReturn' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'changeable' },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OrdersQuery, OrdersQueryVariables>;
export const StockOutputDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockOutput' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockOutputId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouse' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockOutputQuery, StockOutputQueryVariables>;
export const StockOutputsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockOutputs' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersStockOutputsInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockOutputs' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersStockOutputsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouse' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name_internal' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockOutputsQuery, StockOutputsQueryVariables>;
export const PaymentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'payments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersPaymentsInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'payments' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersPaymentsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'urls' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'webp' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'small' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PaymentsQuery, PaymentsQueryVariables>;
export const PermissionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'permissions' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'permissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'module' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'options' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'actions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PermissionsQuery, PermissionsQueryVariables>;
export const PointOfSalesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'pointOfSales' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersPointOfSalesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pointOfSales' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersPointOfSales' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'closeDate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'box' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'authorization' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PointOfSalesQuery, PointOfSalesQueryVariables>;
export const ProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'products' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersProductsInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersProductsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'reference' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'color' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'urls' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'webp' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'small' },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'size' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stock' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const ProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'product' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersProductInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersProductInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'stock' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'quantity' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'color' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'urls' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'webp' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'small' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reference' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'size' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'value' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;
export const ReceiptsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'receipts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersReceiptsInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'receipts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersReceiptsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'concept' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'box' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReceiptsQuery, ReceiptsQueryVariables>;
export const ReferenceIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'referenceId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'referenceId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'changeable' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'attribs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'brand' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryLevel1' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'childs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'childs' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryLevel2' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'childs' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryLevel3' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'parentId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shipping' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'long' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'volume' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'images' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'urls' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'webp' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'small' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'color' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'urls' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'webp' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'small' },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'size' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReferenceIdQuery, ReferenceIdQueryVariables>;
export const ReferencesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'references' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersReferencesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'references' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'companyId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersReferencesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'changeable' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReferencesQuery, ReferencesQueryVariables>;
export const StockRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockRequestId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'cost' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouseDestination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouseOrigin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockRequestQuery, StockRequestQueryVariables>;
export const StockRequestsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockRequests' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersStockRequestsInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockRequests' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersStockRequestsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouseOrigin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouseDestination' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'image' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'urls' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'webp' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'small' },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name_internal' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stock' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'quantity' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockRequestsQuery, StockRequestsQueryVariables>;
export const ReturnsOrderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'returnsOrder' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersReturnsOrderInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'returnsOrder' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersReturnsOrder' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'coupon' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'expiration' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'order' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'summary' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'discount' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pointOfSale' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReturnsOrderQuery, ReturnsOrderQueryVariables>;
export const RoleIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'roleId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roleId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'changeWarehouse' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'permissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RoleIdQuery, RoleIdQueryVariables>;
export const RolesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'roles' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersRolesInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersRolesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'changeWarehouse' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'permissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RolesQuery, RolesQueryVariables>;
export const ShopsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'shops' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersShopsInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'shops' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersShopsInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'goal' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'companyName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'defaultWarehouse' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'isMain' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouseMain' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ShopsQuery, ShopsQueryVariables>;
export const SizesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'sizes' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersSizesInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sizes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersSizesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SizesQuery, SizesQueryVariables>;
export const StockTransfersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockTransfers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersStockTransfersInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockTransfers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersStockTransfersInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'quantityConfirmed' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name_internal' },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'image' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'urls' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'webp' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'small' },
                                                          },
                                                        ],
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stock' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'quantity' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'observationOrigin' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'observationDestination' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouseDestination' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'warehouseOrigin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'userOrigin' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockTransfersQuery, StockTransfersQueryVariables>;
export const StockTransferIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockTransferId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockTransferId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'details' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'color' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name_internal' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'image' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'urls' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'webp' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'small' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'size' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stock' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantityConfirmed' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observationDestination' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observationOrigin' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'requests' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userDestination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userOrigin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouseDestination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'warehouseOrigin' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockTransferIdQuery, StockTransferIdQueryVariables>;
export const StockTransfersErrorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'stockTransfersError' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'FiltersStockTransfersErrorInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'stockTransfersError' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersStockTransfersErrorInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'details' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'size' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'color' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name_internal' },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'barcode' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'reason' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stockTransfer' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'warehouseOrigin' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'warehouseDestination' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockTransfersErrorQuery, StockTransfersErrorQueryVariables>;
export const CurrentUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'currentUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isWeb' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pointOfSale' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'box' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shop' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'defaultWarehouse' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'role' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'changeWarehouse' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'permissions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'action' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const UsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'users' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersUsersInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersUsersInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isWeb' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'role' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pointOfSale' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const WarehousesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'warehouses' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'FiltersWarehousesInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'warehouses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filtersWarehousesInput' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'max' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'min' } },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<WarehousesQuery, WarehousesQueryVariables>;
export const WarehouseIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'warehouseId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'warehouseId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'warehouseId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'warehouseId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'warehouseId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<WarehouseIdQuery, WarehouseIdQueryVariables>;
