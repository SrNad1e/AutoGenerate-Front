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
  /** Datos extra de la dirección */
  extra?: Maybe<Scalars['String']>;
  /** Tipo de ubicación (Calle, Avenida, Manzana, Etc) */
  field1: Scalars['String'];
  /** Tipo de ubicación (Calle, Avenida, Manzana, Etc) */
  field2: Scalars['String'];
  /** Define si la dirección es la principal */
  isMain?: Maybe<Scalars['Boolean']>;
  /** Número de la casa */
  loteNumber: Scalars['Float'];
  /** Número del field1 */
  number1: Scalars['Float'];
  /** Número del field2 */
  number2: Scalars['Float'];
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

/** Categoría del producto nivel 1 */
export type CategoryLevel1 = {
  __typename?: 'CategoryLevel1';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Categorías inferiores */
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
  name: Scalars['String'];
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
  name: Scalars['String'];
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
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Nombre de la ciudad */
  name: Scalars['String'];
  /** Fecha de actualización */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o editó la ciudad */
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
  level?: InputMaybe<Scalars['Float']>;
  /** Nombre de la categoría */
  name: Scalars['String'];
  /** Identificador de la categoría padre */
  parentCategoryId?: InputMaybe<Scalars['String']>;
};

/** Datos para crear un color */
export type CreateColorInput = {
  /** Url asignado al color */
  html: Scalars['String'];
  /** Imagen asignada al color */
  image?: InputMaybe<Scalars['String']>;
  /** Nombre asignado al color */
  name: Scalars['String'];
  /** Nombre interno asignado al color */
  name_internal: Scalars['String'];
};

/** Datos para crear el pedido */
export type CreateOrderInput = {
  /** Estado del pedido (open, pending ,cancelled, closed, sent, invoiced) */
  status: Scalars['String'];
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
  /** Marca de la referencia */
  brandId: Scalars['String'];
  /** Categoría nivel 1 de la referencia */
  categoryLevel1Id: Scalars['String'];
  /** Categoría nivel 2 de la referencia */
  categoryLevel2Id: Scalars['String'];
  /** Categoría nivel 3 de la referencia */
  categoryLevel3Id: Scalars['String'];
  /** Se puede cambiar */
  changeable: Scalars['Boolean'];
  /** Compañía de la referencia */
  companyId: Scalars['String'];
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

/** Datos para crear una talla */
export type CreateSizeInput = {
  /** Valor asignado a la talla */
  value: Scalars['String'];
};

/** Datos para crear el ajuste de productos */
export type CreateStockAdjustmentInput = {
  /** Productos del ajuste */
  details: DetailStockAdjustmentCreateInput[];
  /** Observación del que realiza el ajuste */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado del ajuste (open, confirmed, cancelled) */
  status?: InputMaybe<Scalars['String']>;
  /** Identificador de la bodega para el ajuste */
  warehouseId: Scalars['String'];
};

/** Datos para crear la entrada de productos */
export type CreateStockInputInput = {
  /** Productos de la entrada */
  details: DetailStockInputCreateInput[];
  /** Observación del que realiza la entrada */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la entrada (open, confirmed, cancelled) */
  status?: InputMaybe<Scalars['String']>;
  /** Identificador de la bodega para la entrada */
  warehouseId: Scalars['String'];
};

/** Datos para crear la salida de productos */
export type CreateStockOutputInput = {
  /** Productos de la salida */
  details: DetailStockOutputCreateInput[];
  /** Observación del que realiza la salida */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la salida (open, confirmed, cancelled) */
  status?: InputMaybe<Scalars['String']>;
  /** Identificador de la bodega para la salida */
  warehouseId: Scalars['String'];
};

/** Datos para crear la solicitud de productos */
export type CreateStockRequestInput = {
  /** Productos de la solicitud */
  details: DetailStockRequestCreateInput[];
  /** Observación de la solicitud */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la solicitud (open, pending, used, cancelled ) */
  status?: InputMaybe<Scalars['String']>;
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
  /** Estado del traslado (open, sent, confirmed, incomplete, cancelled) */
  status?: InputMaybe<Scalars['String']>;
  /** Identificador de la bodega de destino del traslado */
  warehouseDestinationId: Scalars['String'];
  /** Identificador de la bodega de origen del traslado */
  warehouseOriginId: Scalars['String'];
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
  /** Acción a realizar con el producto (create, update, delete) */
  action: Scalars['String'];
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
  /** Estado del producto (new, confirmed) */
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

/** Productos del ajuste de productos */
export type DetailStockAdjustmentCreateInput = {
  /** Identificador de mongo del producto */
  productId: Scalars['String'];
  /** Cantidad de productos */
  quantity: Scalars['Float'];
};

/** Detalle del ajuste de productos */
export type DetailStockAdjustmentInput = {
  /** Acción a efectuar con el producto (delete, update, create) */
  action: Scalars['String'];
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
  /** Acción a efectuar con el producto (delete, update, create) */
  action: Scalars['String'];
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
  /** Acción a efectuar con el producto (delete, update, create) */
  action: Scalars['String'];
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
  /** Acción a efectuar con el producto (delete, update, create) */
  action: Scalars['String'];
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
  /** Acción a efectuar con el producto (delete, update, create) */
  action: Scalars['String'];
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
  /** Estado del producto (confirmed, new) */
  status: Scalars['String'];
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

/** Filtros para la lista de atributos */
export type FiltersAttribsInput = {
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
  /** Cantidad de registros */
  limit?: InputMaybe<Scalars['Float']>;
  /** Nombre de la categoría de primer nivel */
  name?: InputMaybe<Scalars['String']>;
  /** Página */
  page?: InputMaybe<Scalars['Float']>;
  /** Ordenamiento */
  sort?: InputMaybe<SortCategories>;
};

/** Filtros para la lista de colores */
export type FiltersColorsInput = {
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
  /** Nombre del tipo de documento */
  name: Scalars['String'];
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
  /** Costo para la busqueda de referencias */
  cost?: InputMaybe<Scalars['Float']>;
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

/** Filtros para la lista de tallas */
export type FiltersSizesInput = {
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
  /** Estado del ajuste (open, confirmed, cancelled) */
  status?: InputMaybe<Scalars['String']>;
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
  /** Estado de la entrada (open, confirmed, cancelled) */
  status?: InputMaybe<Scalars['String']>;
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
  /** Estado de la salida (open, confirmed, cancelled) */
  status?: InputMaybe<Scalars['String']>;
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
  /** Estado de la solicitud (open, pending, cancelled, used) */
  status?: InputMaybe<Scalars['String']>;
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
  /** Estado del traslado (open, sent, confirmed, incomplete, cancelled) */
  status?: InputMaybe<Scalars['String']>;
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
  /** Estado del usuario (active, inactive, suspend) */
  status?: InputMaybe<Scalars['String']>;
};

/** Filtros de las bodegas */
export type FiltersWarehousesInput = {
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
  urls: Urls;
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
  /** Crea un atributo */
  createAttrib: Attrib;
  /** Crea una marca */
  createBrand: Brand;
  /** Crea una categoría */
  createCategory: CategoryLevel1;
  /** Crea un color */
  createColor: Color;
  /** Se encarga de crear el pedido */
  createOrder: Order;
  /** Crea un producto */
  createProduct: Product;
  /** Crea una referencia */
  createReference: Reference;
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
  /** Se encarga actualizar un pedido */
  updateOrder: Order;
  /** Se encarga actualizar un producto */
  updateProduct: Product;
  /** Actualiza una referencia */
  updateReference: Reference;
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

export type MutationCreateAttribArgs = {
  createAttribInput: CreateAttribInput;
};

export type MutationCreateBrandArgs = {
  createBrandInput: CreateBrandInput;
};

export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};

export type MutationCreateColorArgs = {
  createColorInput: CreateColorInput;
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

/** Pedido de productos */
export type Order = {
  __typename?: 'Order';
  /** Identificador de mongo */
  _id: Scalars['String'];
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
  /** Métodos de pago usados en el pedido */
  payments?: Maybe<PaymentOrder[]>;
  /** Punto de venta asigando */
  pointOfSale: PointOfSale;
  /** Tienda donde se solicita el pedido */
  shop: Shop;
  /** Estado del pedido (open, pending, cancelled, closed, sent, invoiced) */
  status: Scalars['String'];
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
  /** Fecha de creación */
  createdAt: Scalars['DateTime'];
  /** Nombre del medio de pago */
  name: Scalars['String'];
  /** Tipo de medio de pago (cash, bank, credit, bonus) */
  type: Scalars['String'];
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
  total: Scalars['Float'];
  /** Fecha de actualizado del pago al pedido */
  updatedAt: Scalars['DateTime'];
};

/** Medio de pago que se va a agregar */
export type PaymentsOrderInput = {
  /** Acción a realizar con el medio de pago (create, update, delete) */
  action: Scalars['String'];
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
  /** Tipo de acción (list, see, create, update, autogenerate) */
  action: Scalars['String'];
  /** Detalle de la acción */
  description: Scalars['String'];
  /** Módulo al que pertenece el permiso */
  module: Scalars['String'];
  /** Nombre de la acción */
  name: Scalars['String'];
  /** Opción del módulo al que pertenece el permiso */
  option: Scalars['String'];
};

/** Punto de venta de la tienda */
export type PointOfSale = {
  __typename?: 'PointOfSale';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Tienda a la que pertenece el punto de venta */
  authorization: AuthorizationDian;
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
  images: Image[];
  /** Referencia del producto */
  reference: Reference;
  /** Talla del producto */
  size: Size;
  /** Estado del producto (active, inactive) */
  status: Scalars['String'];
  /** Inventario del producto por bodegas */
  stock: Stock[];
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
  /** Lista los colores */
  colors: ResponseColors;
  /** Se encarga de obtener el usuario dependiendo del token enviado */
  currentUser: User;
  /** Listado de clientes */
  customers: ResponseCustomers;
  /** Listado de tipos de documento */
  documentTypes: DocumentType[];
  /** Listado de imagenes */
  images: ResponseImages;
  /** Obtiene la orden por el id */
  orderId: Order;
  /** Obtener las ordenes por punto de venta */
  ordersByPointOfSale: Order[];
  /** Obtiene un producto */
  product: Product;
  /** Lista los productos */
  products: ResponseProducts;
  /** Obtiene la referencia por el identificador */
  referenceId: Reference;
  /** Listado de las referencias */
  references: ResponseReferences;
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

export type QueryColorsArgs = {
  filtersColorsInput?: InputMaybe<FiltersColorsInput>;
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

export type QueryOrderIdArgs = {
  id: Scalars['String'];
};

export type QueryOrdersByPointOfSaleArgs = {
  idPointOfSale: Scalars['String'];
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

/** Referencia de los productos */
export type Reference = {
  __typename?: 'Reference';
  /** Identificador de mongo */
  _id: Scalars['String'];
  /** Estado de la referencia */
  active: Scalars['Boolean'];
  /** Atributos de la referencia */
  attribs: Attrib[];
  /** Marca de la referencia */
  brand: Brand;
  /** Categoría Nivel 1 de la referencia */
  categoryLevel1: CategoryLevel1;
  /** Categoría Nivel 2 de la referencia */
  categoryLevel2: CategoryLevel2;
  /** Categoría Nivel 3 de la referencia */
  categoryLevel3: CategoryLevel3;
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
  attribs: Attrib[];
  /** Marca de la referencia */
  brand: Brand;
  /** Categoría Nivel 1 de la referencia */
  categoryLevel1: CategoryLevel1;
  /** Categoría Nivel 2 de la referencia */
  categoryLevel2: CategoryLevel2;
  /** Categoría Nivel 3 de la referencia */
  categoryLevel3: CategoryLevel3;
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

/** Respuesta del listado de clientes */
export type ResponseCustomers = {
  __typename?: 'ResponseCustomers';
  /** Lista de clientes */
  docs: Customer[];
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
  /** Nombre asiganado al rol */
  name: Scalars['String'];
  /** Permisos al los quie tiene el rol */
  permissions: Permission[];
  /** Fecha en la que se actualizó el rol */
  updatedAt: Scalars['DateTime'];
  /** Usuario que creó o modificó el rol */
  user: User;
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
  address: Scalars['String'];
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
  /** Estado de la tienda (active, inactive, suspend) */
  status: Scalars['String'];
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

/** Ordenamiento para el listado de colores */
export type SortColor = {
  active?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  name_internal?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento del cliente */
export type SortCustomer = {
  /** ordernamiento por docuemnto */
  active: Scalars['Float'];
  /** ordernamiento por documento */
  document: Scalars['Float'];
  /** ordernamiento por docuemnto */
  email: Scalars['Float'];
  /** ordernamiento por nombre */
  firstName: Scalars['Float'];
  /** ordernamiento por docuemnto */
  isDefault: Scalars['Float'];
  /** ordernamiento por docuemnto */
  isWhatsapp: Scalars['Float'];
  /** ordernamiento por apellido */
  lastName: Scalars['Float'];
  /** ordernamiento por docuemnto */
  phone: Scalars['Float'];
};

/** Ordenamiento para el listado de imagenes */
export type SortImage = {
  name?: InputMaybe<Scalars['Float']>;
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
  description?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['Float']>;
  price?: InputMaybe<Scalars['Float']>;
};

/** Ordenamiento para el listado de tallas */
export type SortSize = {
  active?: InputMaybe<Scalars['Float']>;
  createdAt?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['Float']>;
  value?: InputMaybe<Scalars['Float']>;
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
  /** Estado del ajuste (open, confirmed, cancelled) */
  status: Scalars['String'];
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
  /** Estado de la entrada (open, confirmed, cancelled) */
  status: Scalars['String'];
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
  /** Estado de la salida (open, confirmed, cancelled) */
  status: Scalars['String'];
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
  /** Fecha de creación de la solicitud */
  createdAt: Scalars['DateTime'];
  /** Detalles de la solicitud */
  details: DetailRequest[];
  /** Número consecutivo de identificación */
  number: Scalars['Float'];
  /** Observación de la solicitud */
  observation?: Maybe<Scalars['String']>;
  /** Estado de la solicitud (open, pending, used, cancelled ) */
  status: Scalars['String'];
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
  /** Estado del traslado (open, sent, confirmed, incomplete, cancelled, verified ) */
  status: Scalars['String'];
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
  parentCategoryId?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar el color */
export type UpdateColorInput = {
  /** Estado asignado al color */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Url asignado al color */
  html?: InputMaybe<Scalars['String']>;
  /** Imagen asignada al color */
  image?: InputMaybe<Scalars['String']>;
  /** Nombre asignado al color */
  name?: InputMaybe<Scalars['String']>;
  /** Nombre interno asignado al color */
  name_internal?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar el pedido */
export type UpdateOrderInput = {
  /** Identificación del cliente */
  customerId?: InputMaybe<Scalars['String']>;
  /** Estado del pedido (open, pending ,cancelled, closed, sent, invoiced) */
  status?: InputMaybe<Scalars['String']>;
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
  /** Estado del producto (active, inactive) */
  status?: InputMaybe<Scalars['String']>;
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

/** Datos para actualizar la talla */
export type UpdateSizeInput = {
  /** Se encuentra activa la talla */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Valor asignado a la talla */
  value?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar el ajuste de productos */
export type UpdateStockAdjustmentInput = {
  /** Productos del ajuste */
  details?: InputMaybe<DetailStockAdjustmentInput[]>;
  /** Observación del ajuste */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado del ajuste (open, confirmed, cancelled) */
  status?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar la entrada de productos */
export type UpdateStockInputInput = {
  /** Productos de la entrada */
  details?: InputMaybe<DetailStockInputInput[]>;
  /** Observación de la entrada */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la entrada (open, confirmed, cancelled) */
  status?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar la salida de productos */
export type UpdateStockOutputInput = {
  /** Productos de la salida */
  details?: InputMaybe<DetailStockOutputInput[]>;
  /** Observación de la salida */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la salida (open, confirmed, cancelled) */
  status?: InputMaybe<Scalars['String']>;
};

/** Datos para actualizar la solicitud de productos */
export type UpdateStockRequestInput = {
  /** Productos de la solicitud */
  details?: InputMaybe<DetailStockRequestInput[]>;
  /** Observación de la solicitud */
  observation?: InputMaybe<Scalars['String']>;
  /** Estado de la solicitud (open, pending, used, cancelled ) */
  status?: InputMaybe<Scalars['String']>;
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
  /** Estado del traslado (open, sent, confirmed, incomplete, cancelled) */
  status?: InputMaybe<Scalars['String']>;
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
  status?: InputMaybe<Scalars['String']>;
  /** Usuario registrado */
  username?: InputMaybe<Scalars['String']>;
};

/** Enlaces de diferences tipos */
export type Urls = {
  __typename?: 'Urls';
  /** Enlaces de tipo jpeg */
  jpeg: ImageTypes;
  /** Enlaces de tipo webp */
  original: Scalars['String'];
  /** Enlaces de tipo webp */
  webp: ImageTypes;
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
  /** Tienda a la que se encuentra asiganado el usuario */
  shop: Shop;
  /** Estado del usuario (active, inactive, suspend) */
  status: Scalars['String'];
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

export type CreateStockRequestMutationVariables = Exact<{
  input: CreateStockRequestInput;
}>;

export type CreateStockRequestMutation = {
  __typename?: 'Mutation';
  createStockRequest: { __typename?: 'StockRequest'; _id: string; number: number };
};

export type UpdateStockMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateStockRequestInput;
}>;

export type UpdateStockMutation = {
  __typename?: 'Mutation';
  updateStockRequest: {
    __typename?: 'StockRequest';
    _id: string;
    number: number;
    status: string;
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
            urls: { __typename?: 'Urls'; webp: { __typename?: 'ImageTypes'; small: string } };
          } | null;
        };
        reference: { __typename?: 'Reference'; description: string };
        size: { __typename?: 'Size'; value: string };
        stock: { __typename?: 'Stock'; quantity: number }[];
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
      username: string;
      name: string;
      _id: string;
      shop: {
        __typename?: 'Shop';
        _id: string;
        name: string;
        defaultWarehouse: { __typename?: 'Warehouse'; _id: string; name: string };
      };
      role: {
        __typename?: 'Role';
        name: string;
        permissions: { __typename?: 'Permission'; name: string }[];
      };
    };
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
    docs: {
      __typename?: 'Product';
      _id: string;
      barcode: string;
      reference: { __typename?: 'Reference'; description: string; name: string };
      color: {
        __typename?: 'Color';
        name_internal: string;
        html: string;
        image?: {
          __typename?: 'Image';
          urls: { __typename?: 'Urls'; webp: { __typename?: 'ImageTypes'; small: string } };
        } | null;
      };
      size: { __typename?: 'Size'; value: string };
      stock: { __typename?: 'Stock'; quantity: number }[];
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
    status: string;
    stock: { __typename?: 'Stock'; quantity: number }[];
    color: {
      __typename?: 'Color';
      name_internal: string;
      html: string;
      image?: {
        __typename?: 'Image';
        urls: { __typename?: 'Urls'; webp: { __typename?: 'ImageTypes'; small: string } };
      } | null;
    };
    reference: { __typename?: 'Reference'; description: string; name: string };
    size: { __typename?: 'Size'; value: string };
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
    status: string;
    updatedAt: any;
    details: {
      __typename?: 'DetailRequest';
      quantity: number;
      product: {
        __typename?: 'Product';
        _id: string;
        barcode: string;
        stock: { __typename?: 'Stock'; quantity: number }[];
        color: {
          __typename?: 'Color';
          html: string;
          name_internal: string;
          image?: {
            __typename?: 'Image';
            urls: { __typename?: 'Urls'; webp: { __typename?: 'ImageTypes'; small: string } };
          } | null;
        };
        reference: { __typename?: 'Reference'; cost: number; description: string; name: string };
        size: { __typename?: 'Size'; value: string };
      };
    }[];
    user: { __typename?: 'User'; name: string };
    warehouseDestination: { __typename?: 'Warehouse'; name: string };
    warehouseOrigin: { __typename?: 'Warehouse'; name: string };
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
    docs: {
      __typename?: 'StockRequest';
      _id: string;
      number: number;
      status: string;
      createdAt: any;
      updatedAt: any;
      warehouseOrigin: { __typename?: 'Warehouse'; name: string };
      warehouseDestination: { __typename?: 'Warehouse'; name: string };
      details: {
        __typename?: 'DetailRequest';
        quantity: number;
        product: {
          __typename?: 'Product';
          barcode: string;
          reference: { __typename?: 'Reference'; name: string; description: string };
          color: { __typename?: 'Color'; name_internal: string };
          size: { __typename?: 'Size'; value: string };
        };
      }[];
    }[];
  };
};

export type CurrentUserQueryVariables = Exact<Record<string, never>>;

export type CurrentUserQuery = {
  __typename?: 'Query';
  currentUser: {
    __typename?: 'User';
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
      permissions: { __typename?: 'Permission'; name: string }[];
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
export const UpdateStockDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateStock' },
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
} as unknown as DocumentNode<UpdateStockMutation, UpdateStockMutationVariables>;
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
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
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
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'observation' } },
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
                        name: { kind: 'Name', value: 'warehouseDestination' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
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
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalDocs' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalPages' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StockRequestsQuery, StockRequestsQueryVariables>;
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
