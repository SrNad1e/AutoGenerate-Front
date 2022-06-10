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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
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
  /** Prefijo de autorización */
  prefix: Scalars['String'];
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
  /** País */
  country: Scalars['String'];
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Nombre de la ciudad */
  name: Scalars['String'];
  /** Departamento */
  state: Scalars['String'];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó la ciudad */
  user: User;
};

/** Ciudad entrada */
export type CityInput = {
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** País */
  country: Scalars['String'];
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
  /**
   * Identificador del color mysql
   * @deprecated Campo para migración de mysql
   */
  id?: Maybe<Scalars['Float']>;
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
  /** Logo de la tranportadora */
  logo: Image;
  /** Nombre de la transportadora */
  name: Scalars['String'];
  /** Fecha de actualización de la transportadora */
  updatedAt: Scalars['DateTime'];
  /** Usuario que crea la transportadora */
  user: User;
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

/** Datos para crear el pedido */
export type CreateOrderInput = {
  /** Estado del pedido */
  status: StatusOrder;
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

/** Datos para crear una referencia */
export type CreateReferenceInput = {
  /** Estado de la referencia */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Atributos de la referencia */
  attribIds: Scalars['String'][];
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

/** Datos para crear una talla */
export type CreateSizeInput = {
  /** Valor asignado a la talla */
  value: Scalars['String'];
  /** Posición del ordenamiento */
  weight: Scalars['String'];
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
  /** Identificador de la empresa a la que pertenece el usuario */
  companyId?: InputMaybe<Scalars['String']>;
  /** Identificador del cliente asignado al usuario */
  customerId?: InputMaybe<Scalars['String']>;
  /** Nombre del usuario */
  name: Scalars['String'];
  /** Contraseña de usuario */
  password: Scalars['String'];
  /** Identificador del punto de venta asignado al usuario */
  pointOfSaleId?: InputMaybe<Scalars['String']>;
  /** Identificador del rol del usuario */
  roleId: Scalars['String'];
  /** Identificador de la tienda asignada al usuario */
  shopId: Scalars['String'];
  /** Usuario registrado */
  username: Scalars['String'];
};

/** Cliente */
export type Customer = {
  __typename?: 'Customer';
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

/** Tipos de clientes */
export type CustomerType = {
  __typename?: 'CustomerType';
  /** Identificación de mongo */
  _id: Scalars['String'];
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Descuento al tipo de cliente */
  discount: Scalars['Float'];
  /** Nombre del tipo de cliente */
  name: Scalars['String'];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el tipo de cliente */
  user: User;
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
  /** Estado del producto */
  status: Scalars['String'];
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

export enum DocumentTypesRuler {
  Categories = 'CATEGORIES',
  Customertypes = 'CUSTOMERTYPES',
}

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

/** Filtros para obtener listado de transportadoras */
export type FiltersConveyorsInput = {
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre de la transportadora */
  name?: InputMaybe<Scalars['String']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortConveyor>;
};

/** Filtros de listado de clientes */
export type FiltersCustomersInput = {
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

/** Filtros para los tipos de documento */
export type FiltersDocumentTypesInput = {
  /** Estado activo del documento */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Nombre del tipo de documento */
  name?: InputMaybe<Scalars['String']>;
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
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortInovice>;
};

/** Filtros del listado de pedidos */
export type FiltersOrdersInput = {
  /** Fecha final para la busqueda */
  dateFinal?: InputMaybe<Scalars['String']>;
  /** Fecha inicial para la busqueda */
  dateInitial?: InputMaybe<Scalars['String']>;
  /** Documento del cliente que registra en el pedidod */
  document?: InputMaybe<Scalars['String']>;
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Número consecutivo del pedido */
  number?: InputMaybe<Scalars['Float']>;
  /** Trae los pedidos POS solamente */
  orderPOS?: InputMaybe<Scalars['Boolean']>;
  /** Desde donde arranca la página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento (1 es ascendente, -1 es descendente) */
  sort?: InputMaybe<SortOrder>;
  /** Estado del pedido */
  status?: InputMaybe<StatusOrder>;
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
  /** Identificador de la compañía */
  companyId: Scalars['String'];
  /** Contraseña de usuario */
  password: Scalars['String'];
  /** Usuario registrado */
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Se encarga de agregar medios de pago */
  addPaymentsOrder: Order;
  /** Se encarga de agregar productos a un pedido */
  addProductsOrder: Order;
  /** Confirma los productos del traslado */
  confirmProductsStockTransfer: StockTransfer;
  /** Crea un atributo */
  createAttrib: Attrib;
  /** Crea una marca */
  createBrand: Brand;
  /** Crea una categoría */
  createCategory: CategoryLevel1;
  /** Crea un cierre X de facturación */
  createCloseXInvoicing: CloseXInvoicing;
  /** Crea un cierre Z de facturación */
  createCloseZInvoicing: CloseZInvoicing;
  /** Crea un color */
  createColor: Color;
  /** Se encarga crear un cliente */
  createCustomer: Customer;
  /** Se encarga de crear el pedido */
  createOrder: Order;
  /** Crea un producto */
  createProduct: Product;
  /** Crea una referencia */
  createReference: Reference;
  /** Se encarga de crear la devolución del pedido */
  createReturnOrder: ReturnOrder;
  /** Crea una rol */
  createRole: Role;
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
  /** Autogenera una solicitud de productos por bodega */
  generateStockRequest: StockRequest;
  /** Se encarga de realizar el ingreso al sistema por el usuario */
  login: LoginResponse;
  /** Se encarga de crear el usuario desde aplicaciones externas */
  signup: LoginResponse;
  /** Actualiza un atributo */
  updateAttrib: Attrib;
  /** Actualiza la marca */
  updateBrand: Brand;
  /** Actualiza la categoría */
  updateCategory: CategoryLevel1;
  /** Actualiza el color */
  updateColor: Color;
  /** Se encarga actualizar un cliente */
  updateCustomer: Customer;
  /** Se encarga actualizar un pedido */
  updateOrder: Order;
  /** Se encarga actualizar un producto */
  updateProduct: Product;
  /** Actualiza una referencia */
  updateReference: Reference;
  /** Actualiza un rol */
  updateRole: Role;
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
};

export type MutationAddPaymentsOrderArgs = {
  addPaymentsOrderInput: AddPaymentsOrderInput;
};

export type MutationAddProductsOrderArgs = {
  addProductsOrderInput: AddProductsOrderInput;
};

export type MutationConfirmProductsStockTransferArgs = {
  confirmStockTransferInput: ConfirmStockTransferInput;
  id: Scalars['String'];
};

export type MutationCreateAttribArgs = {
  createAttribInput: CreateAttribInput;
};

export type MutationCreateBrandArgs = {
  createBrandInput: CreateBrandInput;
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
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

export type MutationCreateCustomerArgs = {
  createCustomerInput: CreateCustomerInput;
};

export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};

export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
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

export type MutationGenerateStockRequestArgs = {
  shopId: Scalars['String'];
};

export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};

export type MutationSignupArgs = {
  signUpInput: SignUpInput;
};

export type MutationUpdateAttribArgs = {
  id: Scalars['String'];
  updateAttribInput: UpdateAttribInput;
};

export type MutationUpdateBrandArgs = {
  id: Scalars['String'];
  updateBrandInput: UpdateBrandInput;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars['String'];
  updateCategoryInput: UpdateCategoryInput;
};

export type MutationUpdateColorArgs = {
  id: Scalars['String'];
  updateColorInput: UpdateColorInput;
};

export type MutationUpdateCustomerArgs = {
  id: Scalars['String'];
  updateCustomerInput: UpdateCustomerInput;
};

export type MutationUpdateOrderArgs = {
  id: Scalars['String'];
  updateOrderInput: UpdateOrderInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars['String'];
  updateProductInput: UpdateProductInput;
};

export type MutationUpdateReferenceArgs = {
  id: Scalars['String'];
  updateReferenceInput: UpdateReferenceInput;
};

export type MutationUpdateRoleArgs = {
  id: Scalars['String'];
  updateRoleInput: UpdateRoleInput;
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
  /** Empresa a la que perteneces el pedido */
  company: Company;
  /** Trasportadora */
  conveyor?: Maybe<Conveyor>;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Cliente que solicita el pedido */
  customer: Customer;
  /** Productos que tiene el pedido */
  details?: Maybe<DetailOrder[]>;
  /** Factura generada al facturar */
  invoice?: Maybe<Invoice>;
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
  /** Nombre del medio de pago */
  name: Scalars['String'];
  /** Tipo de medio de pago */
  type: TypePayment;
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó el medio de pago */
  user: User;
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
  /** Fecha de agregado del pago al pedido */
  createdAt: Scalars['DateTime'];
  /** Método de pago usado */
  payment: Payment;
  /** Total pagado */
  receipt?: Maybe<Receipt>;
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
  /** Identificador medio de pago agregado al pedido */
  paymentId: Scalars['String'];
  /** Valor total agregado */
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
  AccessConfigurationUsers = 'ACCESS_CONFIGURATION_USERS',
  AccessCrmCities = 'ACCESS_CRM_CITIES',
  AccessCrmCustomers = 'ACCESS_CRM_CUSTOMERS',
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
  AccessInvoicingClosesx = 'ACCESS_INVOICING_CLOSESX',
  AccessInvoicingClosesz = 'ACCESS_INVOICING_CLOSESZ',
  AccessInvoicingReturns = 'ACCESS_INVOICING_RETURNS',
  AccessPos = 'ACCESS_POS',
  AutogenerateInventoryRequest = 'AUTOGENERATE_INVENTORY_REQUEST',
  ConfirmInventoryTransfer = 'CONFIRM_INVENTORY_TRANSFER',
  CreateConfigurationRole = 'CREATE_CONFIGURATION_ROLE',
  CreateConfigurationUser = 'CREATE_CONFIGURATION_USER',
  CreateCrmCustomer = 'CREATE_CRM_CUSTOMER',
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
  CreateInvoicingClosex = 'CREATE_INVOICING_CLOSEX',
  CreateInvoicingClosez = 'CREATE_INVOICING_CLOSEZ',
  CreateInvoicingOrder = 'CREATE_INVOICING_ORDER',
  CreateInvoicingReturn = 'CREATE_INVOICING_RETURN',
  PrintInventoryAdjustment = 'PRINT_INVENTORY_ADJUSTMENT',
  PrintInventoryInput = 'PRINT_INVENTORY_INPUT',
  PrintInventoryOutput = 'PRINT_INVENTORY_OUTPUT',
  PrintInventoryRequest = 'PRINT_INVENTORY_REQUEST',
  PrintInventoryTransfer = 'PRINT_INVENTORY_TRANSFER',
  PrintInvoicingClosex = 'PRINT_INVOICING_CLOSEX',
  PrintInvoicingClosez = 'PRINT_INVOICING_CLOSEZ',
  PrintInvoicingReturn = 'PRINT_INVOICING_RETURN',
  ReadConfigurationConveyors = 'READ_CONFIGURATION_CONVEYORS',
  ReadConfigurationImages = 'READ_CONFIGURATION_IMAGES',
  ReadConfigurationPermissions = 'READ_CONFIGURATION_PERMISSIONS',
  ReadConfigurationRoles = 'READ_CONFIGURATION_ROLES',
  ReadConfigurationShops = 'READ_CONFIGURATION_SHOPS',
  ReadConfigurationUsers = 'READ_CONFIGURATION_USERS',
  ReadConfigurationWarehouses = 'READ_CONFIGURATION_WAREHOUSES',
  ReadCrmCities = 'READ_CRM_CITIES',
  ReadCrmCustomers = 'READ_CRM_CUSTOMERS',
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
  ReadInvoicingClosesx = 'READ_INVOICING_CLOSESX',
  ReadInvoicingClosesz = 'READ_INVOICING_CLOSESZ',
  ReadInvoicingInvoices = 'READ_INVOICING_INVOICES',
  ReadInvoicingOrders = 'READ_INVOICING_ORDERS',
  ReadInvoicingPointofsales = 'READ_INVOICING_POINTOFSALES',
  ReadInvoicingReturns = 'READ_INVOICING_RETURNS',
  ReadTreasuryPayments = 'READ_TREASURY_PAYMENTS',
  UpdateConfigurationRole = 'UPDATE_CONFIGURATION_ROLE',
  UpdateConfigurationUser = 'UPDATE_CONFIGURATION_USER',
  UpdateCrmCustomer = 'UPDATE_CRM_CUSTOMER',
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
  UpdateInvoicingOrder = 'UPDATE_INVOICING_ORDER',
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
  /** Lista de ajustes de productos */
  conveyors: ResponseConveyors;
  /** Se encarga de obtener el usuario dependiendo del token enviado */
  currentUser: User;
  /** Listado de clientes */
  customers: ResponseCustomers;
  /** Listado de tipos de documento */
  documentTypes: DocumentType[];
  /** Listado de imagenes */
  images: ResponseImages;
  /** Lista de facturas */
  invoices: ResponseInvoices;
  /** Obtiene la orden por el id */
  orderId: Order;
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
  /** Obtiene la referencia por el identificador */
  referenceId: ReferenceData;
  /** Listado de las referencias */
  references: ResponseReferences;
  /** Lista de devoluciones de pedidos */
  returnsOrder: ResponseReturnsOrder;
  /** Obtiene el rol por el identificador */
  roleId: Role;
  /** Listado de las roles */
  roles: ResponseRoles;
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
  /** Consulta todos los usuarios con base a los filtros */
  users: User[];
  /** Se encarga de traer bodega por identificador */
  warehouseId: Warehouse;
  /** Se encarga de listar las bodegas */
  warehouses: ResponseWarehouses;
};

export type QueryAttribsArgs = {
  filtersAttribsInput?: InputMaybe<FiltersAttribsInput>;
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

export type QueryConveyorsArgs = {
  filtersConveyorsInput?: InputMaybe<FiltersConveyorsInput>;
};

export type QueryCustomersArgs = {
  filtersCustomerInput?: InputMaybe<FiltersCustomersInput>;
};

export type QueryDocumentTypesArgs = {
  filtersDocumentTypesInput?: InputMaybe<FiltersDocumentTypesInput>;
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

export type QueryOrdersByPointOfSaleArgs = {
  idPointOfSale: Scalars['String'];
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

export type QueryReferenceIdArgs = {
  id: Scalars['String'];
};

export type QueryReferencesArgs = {
  companyId: Scalars['String'];
  filtersReferencesInput?: InputMaybe<FiltersReferencesInput>;
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

export type QueryUsersArgs = {
  filtersUsersInput: FiltersUsersInput;
};

export type QueryWarehouseIdArgs = {
  warehouseId: Scalars['String'];
};

export type QueryWarehousesArgs = {
  filtersWarehousesInput?: InputMaybe<FiltersWarehousesInput>;
};

/** Egreso de dinero */
export type Receipt = {
  __typename?: 'Receipt';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Método de pago del recibo de caja */
  box: Box;
  /** Empresa a la que pertenece el recibo de caja */
  company: Company;
  /** Concepto del recibo de caja */
  concept?: Maybe<Scalars['String']>;
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Consecutivo del recibo de caja */
  number: Scalars['Float'];
  /** Método de pago del recibo de caja */
  payment: Payment;
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
  /** Cantidad de devoluciones */
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

/** Lista de devoluciones de ordenes */
export type ResponseReturnsOrder = {
  __typename?: 'ResponseReturnsOrder';
  /** Lista de ajustes */
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
  /** Tienda */
  shop: Shop;
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
  documentType: DocumentTypesRuler;
  /** Tipo de regla que deben cumplir los documentos */
  type: Scalars['String'][];
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
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Bodega predeterminada para la tienda */
  defaultWarehouse: Warehouse;
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
export type SortConveyor = {
  /** Ordenamiento por fecha de creación */
  createdAt?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por nombre */
  name?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento por fecha de creación */
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento del cliente */
export type SortCustomer = {
  /** ordernamiento por estado del cliente */
  active: Scalars['Float'];
  /** ordernamiento por documento */
  document: Scalars['Float'];
  /** ordernamiento por correo */
  email: Scalars['Float'];
  /** ordernamiento por nombre */
  firstName: Scalars['Float'];
  /** ordernamiento por si es por defecto */
  isDefault: Scalars['Float'];
  /** ordernamiento por si tiene whatsapp */
  isWhatsapp: Scalars['Float'];
  /** ordernamiento por apellido */
  lastName: Scalars['Float'];
  /** ordernamiento por teléfono */
  phone: Scalars['Float'];
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

export enum StatusDetailTransfer {
  Confirmed = 'CONFIRMED',
  New = 'NEW',
  Sent = 'SENT',
}

export enum StatusExpense {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum StatusOrder {
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Invoiced = 'INVOICED',
  Open = 'OPEN',
  Pending = 'PENDING',
  Sent = 'SENT',
}

export enum StatusProduct {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum StatusReceipt {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
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
  /** Cantidad de las ordenes abiertas */
  quantityOpen: Scalars['Float'];
  /** Valor de las ordenes finalizadas */
  value: Scalars['Float'];
};

export enum TypePayment {
  Bank = 'BANK',
  Bonus = 'BONUS',
  Cash = 'CASH',
  Credit = 'CREDIT',
}

/** Datos para actualizar el atributo */
export type UpdateAttribInput = {
  /** Se encuentra activa el atributo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Valor asignado al atributo */
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

/** Datos para actualizar un cliente */
export type UpdateCustomerInput = {
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
  /** Identificador de la empresa a la que pertenece el usuario */
  companyId?: InputMaybe<Scalars['String']>;
  /** Identificador del cliente asignado al usuario */
  customerId?: InputMaybe<Scalars['String']>;
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
  /** Empresas a la que pertenece el usuario */
  companies: Company[];
  /** Nombre de usuario */
  createdAt: Scalars['DateTime'];
  /** Cliente asignado */
  customer?: Maybe<Customer>;
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

export type CreateCustomerMutationVariables = Exact<{
  input: CreateCustomerInput;
}>;

export type CreateCustomerMutation = {
  __typename?: 'Mutation';
  createCustomer: { __typename?: 'Customer'; _id: string };
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

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;

export type CreateOrderMutation = {
  __typename?: 'Mutation';
  createOrder: { __typename?: 'Order'; _id: string };
};

export type UpdateOrderMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateOrderInput;
}>;

export type UpdateOrderMutation = {
  __typename?: 'Mutation';
  updateOrder: {
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

export type AddPaymentsOrderMutationVariables = Exact<{
  input: AddPaymentsOrderInput;
}>;

export type AddPaymentsOrderMutation = {
  __typename?: 'Mutation';
  addPaymentsOrder: {
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

export type AddProductsOrderMutationVariables = Exact<{
  input: AddProductsOrderInput;
}>;

export type AddProductsOrderMutation = {
  __typename?: 'Mutation';
  addProductsOrder: {
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
      pointOfSale?: { __typename?: 'PointOfSale'; _id: string } | null;
      shop: {
        __typename?: 'Shop';
        _id: string;
        name: string;
        defaultWarehouse: { __typename?: 'Warehouse'; _id: string; name: string };
      };
      role: {
        __typename?: 'Role';
        name: string;
        permissions: { __typename?: 'Permission'; action: Permissions }[];
      };
    };
  };
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
        reference: { __typename?: 'Reference'; cost: number; description: string; name: string };
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

export type CustomersQueryVariables = Exact<{
  input?: InputMaybe<FiltersCustomersInput>;
}>;

export type CustomersQuery = {
  __typename?: 'Query';
  customers: {
    __typename?: 'ResponseCustomers';
    docs: {
      __typename?: 'Customer';
      _id: string;
      document: string;
      firstName: string;
      lastName: string;
      documentType: { __typename?: 'DocumentType'; _id: string; abbreviation: string };
      customerType: { __typename?: 'CustomerType'; _id: string; name: string };
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
        reference: { __typename?: 'Reference'; description: string; cost: number; name: string };
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
    docs: {
      __typename?: 'Invoice';
      _id: string;
      active: boolean;
      createdAt: any;
      authorization: { __typename?: 'AuthorizationDian'; prefix: string };
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
    }[];
  };
};

export type OrderIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type OrderIdQuery = {
  __typename?: 'Query';
  orderId: {
    __typename?: 'Order';
    _id: string;
    number: number;
    status: StatusOrder;
    customer: {
      __typename?: 'Customer';
      document: string;
      firstName: string;
      lastName: string;
      active: boolean;
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
          payment: { __typename?: 'Payment'; name: string; type: TypePayment };
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

export type OrdersByPosQueryVariables = Exact<{
  id: Scalars['String'];
}>;

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
    summary: { __typename?: 'SummaryOrder'; total: number };
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
      _id: string;
      createdAt: any;
      updatedAt: any;
      number: number;
      status: StatusOrder;
      summary: { __typename?: 'SummaryOrder'; total: number };
      customer: { __typename?: 'Customer'; document: string; firstName: string; lastName: string };
      shop: { __typename?: 'Shop'; name: string };
      details?:
        | {
            __typename?: 'DetailOrder';
            price: number;
            quantity: number;
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
        reference: { __typename?: 'Reference'; description: string; cost: number; name: string };
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
    docs: {
      __typename?: 'Payment';
      _id: string;
      name: string;
      type: TypePayment;
      color?: string | null;
      logo?: {
        __typename?: 'Image';
        urls?: {
          __typename?: 'Urls';
          webp?: { __typename?: 'ImageTypes'; small: string } | null;
        } | null;
      } | null;
    }[];
  };
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
      shop: { __typename?: 'Shop'; name: string };
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
      size: { __typename?: 'Size'; value: string };
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
    reference: { __typename?: 'Reference'; description: string; name: string };
    size: { __typename?: 'Size'; value: string };
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
    categoryLevel1: { __typename?: 'CategoryLevel1'; _id: string };
    categoryLevel2?: { __typename?: 'CategoryLevel2'; _id: string } | null;
    categoryLevel3?: { __typename?: 'CategoryLevel3'; _id: string } | null;
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
      shop: { __typename?: 'Shop'; name: string };
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
    docs: { __typename?: 'Shop'; _id: string; name: string }[];
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
      details: { __typename?: 'DetailTransfer'; quantity: number }[];
      warehouseDestination: { __typename?: 'Warehouse'; name: string };
      warehouseOrigin: { __typename?: 'Warehouse'; name: string };
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

export type CurrentUserQueryVariables = Exact<Record<string, never>>;

export type CurrentUserQuery = {
  __typename?: 'Query';
  currentUser: {
    __typename?: 'User';
    _id: string;
    username: string;
    name: string;
    pointOfSale?: { __typename?: 'PointOfSale'; _id: string } | null;
    shop: {
      __typename?: 'Shop';
      _id: string;
      name: string;
      defaultWarehouse: { __typename?: 'Warehouse'; _id: string; name: string };
    };
    role: {
      __typename?: 'Role';
      name: string;
      permissions: { __typename?: 'Permission'; action: Permissions }[];
    };
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
    docs: { __typename?: 'Warehouse'; _id: string; name: string }[];
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
              selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCustomerMutation, CreateCustomerMutationVariables>;
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
              selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'prefix' } }],
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
                                  { kind: 'Field', name: { kind: 'Name', value: 'abbreviation' } },
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
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
} as unknown as DocumentNode<AddProductsOrderMutation, AddProductsOrderMutationVariables>;
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
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
                      { kind: 'Field', name: { kind: 'Name', value: 'document' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'customerType' },
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
      },
    },
  ],
} as unknown as DocumentNode<CustomersQuery, CustomersQueryVariables>;
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'prefix' } }],
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
} as unknown as DocumentNode<InvoicesQuery, InvoicesQueryVariables>;
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
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
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
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
            name: { kind: 'Name', value: 'ordersByPointOfSale' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'idPointOfSale' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
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
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
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
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summary' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'total' } }],
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
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'docs' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
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
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'value' } }],
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
                  name: { kind: 'Name', value: 'stock' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'quantity' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'color' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
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
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'stock' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'quantity' } }],
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
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryLevel2' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryLevel3' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
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
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'shop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pointOfSale' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: '_id' } }],
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
