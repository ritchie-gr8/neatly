
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model BedType
 * 
 */
export type BedType = $Result.DefaultSelection<Prisma.$BedTypePayload>
/**
 * Model RoomStatus
 * 
 */
export type RoomStatus = $Result.DefaultSelection<Prisma.$RoomStatusPayload>
/**
 * Model RoomType
 * 
 */
export type RoomType = $Result.DefaultSelection<Prisma.$RoomTypePayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model RoomAmniety
 * 
 */
export type RoomAmniety = $Result.DefaultSelection<Prisma.$RoomAmnietyPayload>
/**
 * Model Guest
 * 
 */
export type Guest = $Result.DefaultSelection<Prisma.$GuestPayload>
/**
 * Model HotelMaster
 * 
 */
export type HotelMaster = $Result.DefaultSelection<Prisma.$HotelMasterPayload>
/**
 * Model RoomImage
 * 
 */
export type RoomImage = $Result.DefaultSelection<Prisma.$RoomImagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bedType`: Exposes CRUD operations for the **BedType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BedTypes
    * const bedTypes = await prisma.bedType.findMany()
    * ```
    */
  get bedType(): Prisma.BedTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomStatus`: Exposes CRUD operations for the **RoomStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomStatuses
    * const roomStatuses = await prisma.roomStatus.findMany()
    * ```
    */
  get roomStatus(): Prisma.RoomStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomType`: Exposes CRUD operations for the **RoomType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomTypes
    * const roomTypes = await prisma.roomType.findMany()
    * ```
    */
  get roomType(): Prisma.RoomTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomAmniety`: Exposes CRUD operations for the **RoomAmniety** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomAmnieties
    * const roomAmnieties = await prisma.roomAmniety.findMany()
    * ```
    */
  get roomAmniety(): Prisma.RoomAmnietyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guest`: Exposes CRUD operations for the **Guest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guests
    * const guests = await prisma.guest.findMany()
    * ```
    */
  get guest(): Prisma.GuestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hotelMaster`: Exposes CRUD operations for the **HotelMaster** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HotelMasters
    * const hotelMasters = await prisma.hotelMaster.findMany()
    * ```
    */
  get hotelMaster(): Prisma.HotelMasterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomImage`: Exposes CRUD operations for the **RoomImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomImages
    * const roomImages = await prisma.roomImage.findMany()
    * ```
    */
  get roomImage(): Prisma.RoomImageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    BedType: 'BedType',
    RoomStatus: 'RoomStatus',
    RoomType: 'RoomType',
    Room: 'Room',
    RoomAmniety: 'RoomAmniety',
    Guest: 'Guest',
    HotelMaster: 'HotelMaster',
    RoomImage: 'RoomImage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "bedType" | "roomStatus" | "roomType" | "room" | "roomAmniety" | "guest" | "hotelMaster" | "roomImage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      BedType: {
        payload: Prisma.$BedTypePayload<ExtArgs>
        fields: Prisma.BedTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BedTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BedTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload>
          }
          findFirst: {
            args: Prisma.BedTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BedTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload>
          }
          findMany: {
            args: Prisma.BedTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload>[]
          }
          create: {
            args: Prisma.BedTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload>
          }
          createMany: {
            args: Prisma.BedTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BedTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload>[]
          }
          delete: {
            args: Prisma.BedTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload>
          }
          update: {
            args: Prisma.BedTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload>
          }
          deleteMany: {
            args: Prisma.BedTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BedTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BedTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload>[]
          }
          upsert: {
            args: Prisma.BedTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BedTypePayload>
          }
          aggregate: {
            args: Prisma.BedTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBedType>
          }
          groupBy: {
            args: Prisma.BedTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<BedTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.BedTypeCountArgs<ExtArgs>
            result: $Utils.Optional<BedTypeCountAggregateOutputType> | number
          }
        }
      }
      RoomStatus: {
        payload: Prisma.$RoomStatusPayload<ExtArgs>
        fields: Prisma.RoomStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          findFirst: {
            args: Prisma.RoomStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          findMany: {
            args: Prisma.RoomStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>[]
          }
          create: {
            args: Prisma.RoomStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          createMany: {
            args: Prisma.RoomStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>[]
          }
          delete: {
            args: Prisma.RoomStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          update: {
            args: Prisma.RoomStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          deleteMany: {
            args: Prisma.RoomStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>[]
          }
          upsert: {
            args: Prisma.RoomStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          aggregate: {
            args: Prisma.RoomStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomStatus>
          }
          groupBy: {
            args: Prisma.RoomStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomStatusCountArgs<ExtArgs>
            result: $Utils.Optional<RoomStatusCountAggregateOutputType> | number
          }
        }
      }
      RoomType: {
        payload: Prisma.$RoomTypePayload<ExtArgs>
        fields: Prisma.RoomTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          findFirst: {
            args: Prisma.RoomTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          findMany: {
            args: Prisma.RoomTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>[]
          }
          create: {
            args: Prisma.RoomTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          createMany: {
            args: Prisma.RoomTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>[]
          }
          delete: {
            args: Prisma.RoomTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          update: {
            args: Prisma.RoomTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          deleteMany: {
            args: Prisma.RoomTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>[]
          }
          upsert: {
            args: Prisma.RoomTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomTypePayload>
          }
          aggregate: {
            args: Prisma.RoomTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomType>
          }
          groupBy: {
            args: Prisma.RoomTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomTypeCountArgs<ExtArgs>
            result: $Utils.Optional<RoomTypeCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      RoomAmniety: {
        payload: Prisma.$RoomAmnietyPayload<ExtArgs>
        fields: Prisma.RoomAmnietyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomAmnietyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomAmnietyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload>
          }
          findFirst: {
            args: Prisma.RoomAmnietyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomAmnietyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload>
          }
          findMany: {
            args: Prisma.RoomAmnietyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload>[]
          }
          create: {
            args: Prisma.RoomAmnietyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload>
          }
          createMany: {
            args: Prisma.RoomAmnietyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomAmnietyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload>[]
          }
          delete: {
            args: Prisma.RoomAmnietyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload>
          }
          update: {
            args: Prisma.RoomAmnietyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload>
          }
          deleteMany: {
            args: Prisma.RoomAmnietyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomAmnietyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomAmnietyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload>[]
          }
          upsert: {
            args: Prisma.RoomAmnietyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomAmnietyPayload>
          }
          aggregate: {
            args: Prisma.RoomAmnietyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomAmniety>
          }
          groupBy: {
            args: Prisma.RoomAmnietyGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomAmnietyGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomAmnietyCountArgs<ExtArgs>
            result: $Utils.Optional<RoomAmnietyCountAggregateOutputType> | number
          }
        }
      }
      Guest: {
        payload: Prisma.$GuestPayload<ExtArgs>
        fields: Prisma.GuestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          findFirst: {
            args: Prisma.GuestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          findMany: {
            args: Prisma.GuestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          create: {
            args: Prisma.GuestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          createMany: {
            args: Prisma.GuestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          delete: {
            args: Prisma.GuestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          update: {
            args: Prisma.GuestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          deleteMany: {
            args: Prisma.GuestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>[]
          }
          upsert: {
            args: Prisma.GuestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuestPayload>
          }
          aggregate: {
            args: Prisma.GuestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuest>
          }
          groupBy: {
            args: Prisma.GuestGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuestGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuestCountArgs<ExtArgs>
            result: $Utils.Optional<GuestCountAggregateOutputType> | number
          }
        }
      }
      HotelMaster: {
        payload: Prisma.$HotelMasterPayload<ExtArgs>
        fields: Prisma.HotelMasterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HotelMasterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HotelMasterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload>
          }
          findFirst: {
            args: Prisma.HotelMasterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HotelMasterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload>
          }
          findMany: {
            args: Prisma.HotelMasterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload>[]
          }
          create: {
            args: Prisma.HotelMasterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload>
          }
          createMany: {
            args: Prisma.HotelMasterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HotelMasterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload>[]
          }
          delete: {
            args: Prisma.HotelMasterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload>
          }
          update: {
            args: Prisma.HotelMasterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload>
          }
          deleteMany: {
            args: Prisma.HotelMasterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HotelMasterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HotelMasterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload>[]
          }
          upsert: {
            args: Prisma.HotelMasterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelMasterPayload>
          }
          aggregate: {
            args: Prisma.HotelMasterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHotelMaster>
          }
          groupBy: {
            args: Prisma.HotelMasterGroupByArgs<ExtArgs>
            result: $Utils.Optional<HotelMasterGroupByOutputType>[]
          }
          count: {
            args: Prisma.HotelMasterCountArgs<ExtArgs>
            result: $Utils.Optional<HotelMasterCountAggregateOutputType> | number
          }
        }
      }
      RoomImage: {
        payload: Prisma.$RoomImagePayload<ExtArgs>
        fields: Prisma.RoomImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload>
          }
          findFirst: {
            args: Prisma.RoomImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload>
          }
          findMany: {
            args: Prisma.RoomImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload>[]
          }
          create: {
            args: Prisma.RoomImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload>
          }
          createMany: {
            args: Prisma.RoomImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload>[]
          }
          delete: {
            args: Prisma.RoomImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload>
          }
          update: {
            args: Prisma.RoomImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload>
          }
          deleteMany: {
            args: Prisma.RoomImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload>[]
          }
          upsert: {
            args: Prisma.RoomImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomImagePayload>
          }
          aggregate: {
            args: Prisma.RoomImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomImage>
          }
          groupBy: {
            args: Prisma.RoomImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomImageCountArgs<ExtArgs>
            result: $Utils.Optional<RoomImageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    bedType?: BedTypeOmit
    roomStatus?: RoomStatusOmit
    roomType?: RoomTypeOmit
    room?: RoomOmit
    roomAmniety?: RoomAmnietyOmit
    guest?: GuestOmit
    hotelMaster?: HotelMasterOmit
    roomImage?: RoomImageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BedTypeCountOutputType
   */

  export type BedTypeCountOutputType = {
    roomTypes: number
  }

  export type BedTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomTypes?: boolean | BedTypeCountOutputTypeCountRoomTypesArgs
  }

  // Custom InputTypes
  /**
   * BedTypeCountOutputType without action
   */
  export type BedTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedTypeCountOutputType
     */
    select?: BedTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BedTypeCountOutputType without action
   */
  export type BedTypeCountOutputTypeCountRoomTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomTypeWhereInput
  }


  /**
   * Count Type RoomStatusCountOutputType
   */

  export type RoomStatusCountOutputType = {
    rooms: number
  }

  export type RoomStatusCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | RoomStatusCountOutputTypeCountRoomsArgs
  }

  // Custom InputTypes
  /**
   * RoomStatusCountOutputType without action
   */
  export type RoomStatusCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatusCountOutputType
     */
    select?: RoomStatusCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomStatusCountOutputType without action
   */
  export type RoomStatusCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }


  /**
   * Count Type RoomTypeCountOutputType
   */

  export type RoomTypeCountOutputType = {
    rooms: number
    roomImages: number
    roomAmniety: number
  }

  export type RoomTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | RoomTypeCountOutputTypeCountRoomsArgs
    roomImages?: boolean | RoomTypeCountOutputTypeCountRoomImagesArgs
    roomAmniety?: boolean | RoomTypeCountOutputTypeCountRoomAmnietyArgs
  }

  // Custom InputTypes
  /**
   * RoomTypeCountOutputType without action
   */
  export type RoomTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomTypeCountOutputType
     */
    select?: RoomTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomTypeCountOutputType without action
   */
  export type RoomTypeCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }

  /**
   * RoomTypeCountOutputType without action
   */
  export type RoomTypeCountOutputTypeCountRoomImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomImageWhereInput
  }

  /**
   * RoomTypeCountOutputType without action
   */
  export type RoomTypeCountOutputTypeCountRoomAmnietyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomAmnietyWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    phone: string | null
    profilePicture: string | null
    profilePicturePublicId: string | null
    country: string | null
    dateOfBirth: Date | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    phone: string | null
    profilePicture: string | null
    profilePicturePublicId: string | null
    country: string | null
    dateOfBirth: Date | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    username: number
    email: number
    passwordHash: number
    phone: number
    profilePicture: number
    profilePicturePublicId: number
    country: number
    dateOfBirth: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    passwordHash?: true
    phone?: true
    profilePicture?: true
    profilePicturePublicId?: true
    country?: true
    dateOfBirth?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    passwordHash?: true
    phone?: true
    profilePicture?: true
    profilePicturePublicId?: true
    country?: true
    dateOfBirth?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    username?: true
    email?: true
    passwordHash?: true
    phone?: true
    profilePicture?: true
    profilePicturePublicId?: true
    country?: true
    dateOfBirth?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string | null
    passwordHash: string
    phone: string | null
    profilePicture: string | null
    profilePicturePublicId: string | null
    country: string
    dateOfBirth: Date | null
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    phone?: boolean
    profilePicture?: boolean
    profilePicturePublicId?: boolean
    country?: boolean
    dateOfBirth?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    phone?: boolean
    profilePicture?: boolean
    profilePicturePublicId?: boolean
    country?: boolean
    dateOfBirth?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    phone?: boolean
    profilePicture?: boolean
    profilePicturePublicId?: boolean
    country?: boolean
    dateOfBirth?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    phone?: boolean
    profilePicture?: boolean
    profilePicturePublicId?: boolean
    country?: boolean
    dateOfBirth?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "username" | "email" | "passwordHash" | "phone" | "profilePicture" | "profilePicturePublicId" | "country" | "dateOfBirth" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      lastName: string
      username: string
      email: string | null
      passwordHash: string
      phone: string | null
      profilePicture: string | null
      profilePicturePublicId: string | null
      country: string
      dateOfBirth: Date | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly profilePicture: FieldRef<"User", 'String'>
    readonly profilePicturePublicId: FieldRef<"User", 'String'>
    readonly country: FieldRef<"User", 'String'>
    readonly dateOfBirth: FieldRef<"User", 'DateTime'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model BedType
   */

  export type AggregateBedType = {
    _count: BedTypeCountAggregateOutputType | null
    _avg: BedTypeAvgAggregateOutputType | null
    _sum: BedTypeSumAggregateOutputType | null
    _min: BedTypeMinAggregateOutputType | null
    _max: BedTypeMaxAggregateOutputType | null
  }

  export type BedTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type BedTypeSumAggregateOutputType = {
    id: number | null
  }

  export type BedTypeMinAggregateOutputType = {
    id: number | null
    bedDescription: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BedTypeMaxAggregateOutputType = {
    id: number | null
    bedDescription: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BedTypeCountAggregateOutputType = {
    id: number
    bedDescription: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BedTypeAvgAggregateInputType = {
    id?: true
  }

  export type BedTypeSumAggregateInputType = {
    id?: true
  }

  export type BedTypeMinAggregateInputType = {
    id?: true
    bedDescription?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BedTypeMaxAggregateInputType = {
    id?: true
    bedDescription?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BedTypeCountAggregateInputType = {
    id?: true
    bedDescription?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BedTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BedType to aggregate.
     */
    where?: BedTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BedTypes to fetch.
     */
    orderBy?: BedTypeOrderByWithRelationInput | BedTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BedTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BedTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BedTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BedTypes
    **/
    _count?: true | BedTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BedTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BedTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BedTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BedTypeMaxAggregateInputType
  }

  export type GetBedTypeAggregateType<T extends BedTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateBedType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBedType[P]>
      : GetScalarType<T[P], AggregateBedType[P]>
  }




  export type BedTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BedTypeWhereInput
    orderBy?: BedTypeOrderByWithAggregationInput | BedTypeOrderByWithAggregationInput[]
    by: BedTypeScalarFieldEnum[] | BedTypeScalarFieldEnum
    having?: BedTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BedTypeCountAggregateInputType | true
    _avg?: BedTypeAvgAggregateInputType
    _sum?: BedTypeSumAggregateInputType
    _min?: BedTypeMinAggregateInputType
    _max?: BedTypeMaxAggregateInputType
  }

  export type BedTypeGroupByOutputType = {
    id: number
    bedDescription: string | null
    createdAt: Date
    updatedAt: Date
    _count: BedTypeCountAggregateOutputType | null
    _avg: BedTypeAvgAggregateOutputType | null
    _sum: BedTypeSumAggregateOutputType | null
    _min: BedTypeMinAggregateOutputType | null
    _max: BedTypeMaxAggregateOutputType | null
  }

  type GetBedTypeGroupByPayload<T extends BedTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BedTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BedTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BedTypeGroupByOutputType[P]>
            : GetScalarType<T[P], BedTypeGroupByOutputType[P]>
        }
      >
    >


  export type BedTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bedDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roomTypes?: boolean | BedType$roomTypesArgs<ExtArgs>
    _count?: boolean | BedTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bedType"]>

  export type BedTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bedDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bedType"]>

  export type BedTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bedDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bedType"]>

  export type BedTypeSelectScalar = {
    id?: boolean
    bedDescription?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BedTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bedDescription" | "createdAt" | "updatedAt", ExtArgs["result"]["bedType"]>
  export type BedTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomTypes?: boolean | BedType$roomTypesArgs<ExtArgs>
    _count?: boolean | BedTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BedTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BedTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BedTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BedType"
    objects: {
      roomTypes: Prisma.$RoomTypePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      bedDescription: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bedType"]>
    composites: {}
  }

  type BedTypeGetPayload<S extends boolean | null | undefined | BedTypeDefaultArgs> = $Result.GetResult<Prisma.$BedTypePayload, S>

  type BedTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BedTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BedTypeCountAggregateInputType | true
    }

  export interface BedTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BedType'], meta: { name: 'BedType' } }
    /**
     * Find zero or one BedType that matches the filter.
     * @param {BedTypeFindUniqueArgs} args - Arguments to find a BedType
     * @example
     * // Get one BedType
     * const bedType = await prisma.bedType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BedTypeFindUniqueArgs>(args: SelectSubset<T, BedTypeFindUniqueArgs<ExtArgs>>): Prisma__BedTypeClient<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BedType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BedTypeFindUniqueOrThrowArgs} args - Arguments to find a BedType
     * @example
     * // Get one BedType
     * const bedType = await prisma.bedType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BedTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, BedTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BedTypeClient<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BedType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedTypeFindFirstArgs} args - Arguments to find a BedType
     * @example
     * // Get one BedType
     * const bedType = await prisma.bedType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BedTypeFindFirstArgs>(args?: SelectSubset<T, BedTypeFindFirstArgs<ExtArgs>>): Prisma__BedTypeClient<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BedType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedTypeFindFirstOrThrowArgs} args - Arguments to find a BedType
     * @example
     * // Get one BedType
     * const bedType = await prisma.bedType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BedTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, BedTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__BedTypeClient<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BedTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BedTypes
     * const bedTypes = await prisma.bedType.findMany()
     * 
     * // Get first 10 BedTypes
     * const bedTypes = await prisma.bedType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bedTypeWithIdOnly = await prisma.bedType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BedTypeFindManyArgs>(args?: SelectSubset<T, BedTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BedType.
     * @param {BedTypeCreateArgs} args - Arguments to create a BedType.
     * @example
     * // Create one BedType
     * const BedType = await prisma.bedType.create({
     *   data: {
     *     // ... data to create a BedType
     *   }
     * })
     * 
     */
    create<T extends BedTypeCreateArgs>(args: SelectSubset<T, BedTypeCreateArgs<ExtArgs>>): Prisma__BedTypeClient<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BedTypes.
     * @param {BedTypeCreateManyArgs} args - Arguments to create many BedTypes.
     * @example
     * // Create many BedTypes
     * const bedType = await prisma.bedType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BedTypeCreateManyArgs>(args?: SelectSubset<T, BedTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BedTypes and returns the data saved in the database.
     * @param {BedTypeCreateManyAndReturnArgs} args - Arguments to create many BedTypes.
     * @example
     * // Create many BedTypes
     * const bedType = await prisma.bedType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BedTypes and only return the `id`
     * const bedTypeWithIdOnly = await prisma.bedType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BedTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, BedTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BedType.
     * @param {BedTypeDeleteArgs} args - Arguments to delete one BedType.
     * @example
     * // Delete one BedType
     * const BedType = await prisma.bedType.delete({
     *   where: {
     *     // ... filter to delete one BedType
     *   }
     * })
     * 
     */
    delete<T extends BedTypeDeleteArgs>(args: SelectSubset<T, BedTypeDeleteArgs<ExtArgs>>): Prisma__BedTypeClient<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BedType.
     * @param {BedTypeUpdateArgs} args - Arguments to update one BedType.
     * @example
     * // Update one BedType
     * const bedType = await prisma.bedType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BedTypeUpdateArgs>(args: SelectSubset<T, BedTypeUpdateArgs<ExtArgs>>): Prisma__BedTypeClient<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BedTypes.
     * @param {BedTypeDeleteManyArgs} args - Arguments to filter BedTypes to delete.
     * @example
     * // Delete a few BedTypes
     * const { count } = await prisma.bedType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BedTypeDeleteManyArgs>(args?: SelectSubset<T, BedTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BedTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BedTypes
     * const bedType = await prisma.bedType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BedTypeUpdateManyArgs>(args: SelectSubset<T, BedTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BedTypes and returns the data updated in the database.
     * @param {BedTypeUpdateManyAndReturnArgs} args - Arguments to update many BedTypes.
     * @example
     * // Update many BedTypes
     * const bedType = await prisma.bedType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BedTypes and only return the `id`
     * const bedTypeWithIdOnly = await prisma.bedType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BedTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, BedTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BedType.
     * @param {BedTypeUpsertArgs} args - Arguments to update or create a BedType.
     * @example
     * // Update or create a BedType
     * const bedType = await prisma.bedType.upsert({
     *   create: {
     *     // ... data to create a BedType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BedType we want to update
     *   }
     * })
     */
    upsert<T extends BedTypeUpsertArgs>(args: SelectSubset<T, BedTypeUpsertArgs<ExtArgs>>): Prisma__BedTypeClient<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BedTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedTypeCountArgs} args - Arguments to filter BedTypes to count.
     * @example
     * // Count the number of BedTypes
     * const count = await prisma.bedType.count({
     *   where: {
     *     // ... the filter for the BedTypes we want to count
     *   }
     * })
    **/
    count<T extends BedTypeCountArgs>(
      args?: Subset<T, BedTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BedTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BedType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BedTypeAggregateArgs>(args: Subset<T, BedTypeAggregateArgs>): Prisma.PrismaPromise<GetBedTypeAggregateType<T>>

    /**
     * Group by BedType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BedTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BedTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BedTypeGroupByArgs['orderBy'] }
        : { orderBy?: BedTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BedTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBedTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BedType model
   */
  readonly fields: BedTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BedType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BedTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roomTypes<T extends BedType$roomTypesArgs<ExtArgs> = {}>(args?: Subset<T, BedType$roomTypesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BedType model
   */
  interface BedTypeFieldRefs {
    readonly id: FieldRef<"BedType", 'Int'>
    readonly bedDescription: FieldRef<"BedType", 'String'>
    readonly createdAt: FieldRef<"BedType", 'DateTime'>
    readonly updatedAt: FieldRef<"BedType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BedType findUnique
   */
  export type BedTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
    /**
     * Filter, which BedType to fetch.
     */
    where: BedTypeWhereUniqueInput
  }

  /**
   * BedType findUniqueOrThrow
   */
  export type BedTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
    /**
     * Filter, which BedType to fetch.
     */
    where: BedTypeWhereUniqueInput
  }

  /**
   * BedType findFirst
   */
  export type BedTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
    /**
     * Filter, which BedType to fetch.
     */
    where?: BedTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BedTypes to fetch.
     */
    orderBy?: BedTypeOrderByWithRelationInput | BedTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BedTypes.
     */
    cursor?: BedTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BedTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BedTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BedTypes.
     */
    distinct?: BedTypeScalarFieldEnum | BedTypeScalarFieldEnum[]
  }

  /**
   * BedType findFirstOrThrow
   */
  export type BedTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
    /**
     * Filter, which BedType to fetch.
     */
    where?: BedTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BedTypes to fetch.
     */
    orderBy?: BedTypeOrderByWithRelationInput | BedTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BedTypes.
     */
    cursor?: BedTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BedTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BedTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BedTypes.
     */
    distinct?: BedTypeScalarFieldEnum | BedTypeScalarFieldEnum[]
  }

  /**
   * BedType findMany
   */
  export type BedTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
    /**
     * Filter, which BedTypes to fetch.
     */
    where?: BedTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BedTypes to fetch.
     */
    orderBy?: BedTypeOrderByWithRelationInput | BedTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BedTypes.
     */
    cursor?: BedTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BedTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BedTypes.
     */
    skip?: number
    distinct?: BedTypeScalarFieldEnum | BedTypeScalarFieldEnum[]
  }

  /**
   * BedType create
   */
  export type BedTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a BedType.
     */
    data?: XOR<BedTypeCreateInput, BedTypeUncheckedCreateInput>
  }

  /**
   * BedType createMany
   */
  export type BedTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BedTypes.
     */
    data: BedTypeCreateManyInput | BedTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BedType createManyAndReturn
   */
  export type BedTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * The data used to create many BedTypes.
     */
    data: BedTypeCreateManyInput | BedTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BedType update
   */
  export type BedTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a BedType.
     */
    data: XOR<BedTypeUpdateInput, BedTypeUncheckedUpdateInput>
    /**
     * Choose, which BedType to update.
     */
    where: BedTypeWhereUniqueInput
  }

  /**
   * BedType updateMany
   */
  export type BedTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BedTypes.
     */
    data: XOR<BedTypeUpdateManyMutationInput, BedTypeUncheckedUpdateManyInput>
    /**
     * Filter which BedTypes to update
     */
    where?: BedTypeWhereInput
    /**
     * Limit how many BedTypes to update.
     */
    limit?: number
  }

  /**
   * BedType updateManyAndReturn
   */
  export type BedTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * The data used to update BedTypes.
     */
    data: XOR<BedTypeUpdateManyMutationInput, BedTypeUncheckedUpdateManyInput>
    /**
     * Filter which BedTypes to update
     */
    where?: BedTypeWhereInput
    /**
     * Limit how many BedTypes to update.
     */
    limit?: number
  }

  /**
   * BedType upsert
   */
  export type BedTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the BedType to update in case it exists.
     */
    where: BedTypeWhereUniqueInput
    /**
     * In case the BedType found by the `where` argument doesn't exist, create a new BedType with this data.
     */
    create: XOR<BedTypeCreateInput, BedTypeUncheckedCreateInput>
    /**
     * In case the BedType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BedTypeUpdateInput, BedTypeUncheckedUpdateInput>
  }

  /**
   * BedType delete
   */
  export type BedTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
    /**
     * Filter which BedType to delete.
     */
    where: BedTypeWhereUniqueInput
  }

  /**
   * BedType deleteMany
   */
  export type BedTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BedTypes to delete
     */
    where?: BedTypeWhereInput
    /**
     * Limit how many BedTypes to delete.
     */
    limit?: number
  }

  /**
   * BedType.roomTypes
   */
  export type BedType$roomTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    where?: RoomTypeWhereInput
    orderBy?: RoomTypeOrderByWithRelationInput | RoomTypeOrderByWithRelationInput[]
    cursor?: RoomTypeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomTypeScalarFieldEnum | RoomTypeScalarFieldEnum[]
  }

  /**
   * BedType without action
   */
  export type BedTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
  }


  /**
   * Model RoomStatus
   */

  export type AggregateRoomStatus = {
    _count: RoomStatusCountAggregateOutputType | null
    _avg: RoomStatusAvgAggregateOutputType | null
    _sum: RoomStatusSumAggregateOutputType | null
    _min: RoomStatusMinAggregateOutputType | null
    _max: RoomStatusMaxAggregateOutputType | null
  }

  export type RoomStatusAvgAggregateOutputType = {
    id: number | null
  }

  export type RoomStatusSumAggregateOutputType = {
    id: number | null
  }

  export type RoomStatusMinAggregateOutputType = {
    id: number | null
    statusName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomStatusMaxAggregateOutputType = {
    id: number | null
    statusName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomStatusCountAggregateOutputType = {
    id: number
    statusName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomStatusAvgAggregateInputType = {
    id?: true
  }

  export type RoomStatusSumAggregateInputType = {
    id?: true
  }

  export type RoomStatusMinAggregateInputType = {
    id?: true
    statusName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomStatusMaxAggregateInputType = {
    id?: true
    statusName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomStatusCountAggregateInputType = {
    id?: true
    statusName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStatus to aggregate.
     */
    where?: RoomStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatuses to fetch.
     */
    orderBy?: RoomStatusOrderByWithRelationInput | RoomStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomStatuses
    **/
    _count?: true | RoomStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomStatusMaxAggregateInputType
  }

  export type GetRoomStatusAggregateType<T extends RoomStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomStatus[P]>
      : GetScalarType<T[P], AggregateRoomStatus[P]>
  }




  export type RoomStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStatusWhereInput
    orderBy?: RoomStatusOrderByWithAggregationInput | RoomStatusOrderByWithAggregationInput[]
    by: RoomStatusScalarFieldEnum[] | RoomStatusScalarFieldEnum
    having?: RoomStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomStatusCountAggregateInputType | true
    _avg?: RoomStatusAvgAggregateInputType
    _sum?: RoomStatusSumAggregateInputType
    _min?: RoomStatusMinAggregateInputType
    _max?: RoomStatusMaxAggregateInputType
  }

  export type RoomStatusGroupByOutputType = {
    id: number
    statusName: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoomStatusCountAggregateOutputType | null
    _avg: RoomStatusAvgAggregateOutputType | null
    _sum: RoomStatusSumAggregateOutputType | null
    _min: RoomStatusMinAggregateOutputType | null
    _max: RoomStatusMaxAggregateOutputType | null
  }

  type GetRoomStatusGroupByPayload<T extends RoomStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomStatusGroupByOutputType[P]>
            : GetScalarType<T[P], RoomStatusGroupByOutputType[P]>
        }
      >
    >


  export type RoomStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statusName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rooms?: boolean | RoomStatus$roomsArgs<ExtArgs>
    _count?: boolean | RoomStatusCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStatus"]>

  export type RoomStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statusName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roomStatus"]>

  export type RoomStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    statusName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roomStatus"]>

  export type RoomStatusSelectScalar = {
    id?: boolean
    statusName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "statusName" | "createdAt" | "updatedAt", ExtArgs["result"]["roomStatus"]>
  export type RoomStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | RoomStatus$roomsArgs<ExtArgs>
    _count?: boolean | RoomStatusCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoomStatusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoomStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomStatus"
    objects: {
      rooms: Prisma.$RoomPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      statusName: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roomStatus"]>
    composites: {}
  }

  type RoomStatusGetPayload<S extends boolean | null | undefined | RoomStatusDefaultArgs> = $Result.GetResult<Prisma.$RoomStatusPayload, S>

  type RoomStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomStatusCountAggregateInputType | true
    }

  export interface RoomStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomStatus'], meta: { name: 'RoomStatus' } }
    /**
     * Find zero or one RoomStatus that matches the filter.
     * @param {RoomStatusFindUniqueArgs} args - Arguments to find a RoomStatus
     * @example
     * // Get one RoomStatus
     * const roomStatus = await prisma.roomStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomStatusFindUniqueArgs>(args: SelectSubset<T, RoomStatusFindUniqueArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomStatusFindUniqueOrThrowArgs} args - Arguments to find a RoomStatus
     * @example
     * // Get one RoomStatus
     * const roomStatus = await prisma.roomStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusFindFirstArgs} args - Arguments to find a RoomStatus
     * @example
     * // Get one RoomStatus
     * const roomStatus = await prisma.roomStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomStatusFindFirstArgs>(args?: SelectSubset<T, RoomStatusFindFirstArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusFindFirstOrThrowArgs} args - Arguments to find a RoomStatus
     * @example
     * // Get one RoomStatus
     * const roomStatus = await prisma.roomStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomStatuses
     * const roomStatuses = await prisma.roomStatus.findMany()
     * 
     * // Get first 10 RoomStatuses
     * const roomStatuses = await prisma.roomStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomStatusWithIdOnly = await prisma.roomStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomStatusFindManyArgs>(args?: SelectSubset<T, RoomStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomStatus.
     * @param {RoomStatusCreateArgs} args - Arguments to create a RoomStatus.
     * @example
     * // Create one RoomStatus
     * const RoomStatus = await prisma.roomStatus.create({
     *   data: {
     *     // ... data to create a RoomStatus
     *   }
     * })
     * 
     */
    create<T extends RoomStatusCreateArgs>(args: SelectSubset<T, RoomStatusCreateArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomStatuses.
     * @param {RoomStatusCreateManyArgs} args - Arguments to create many RoomStatuses.
     * @example
     * // Create many RoomStatuses
     * const roomStatus = await prisma.roomStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomStatusCreateManyArgs>(args?: SelectSubset<T, RoomStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomStatuses and returns the data saved in the database.
     * @param {RoomStatusCreateManyAndReturnArgs} args - Arguments to create many RoomStatuses.
     * @example
     * // Create many RoomStatuses
     * const roomStatus = await prisma.roomStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomStatuses and only return the `id`
     * const roomStatusWithIdOnly = await prisma.roomStatus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomStatus.
     * @param {RoomStatusDeleteArgs} args - Arguments to delete one RoomStatus.
     * @example
     * // Delete one RoomStatus
     * const RoomStatus = await prisma.roomStatus.delete({
     *   where: {
     *     // ... filter to delete one RoomStatus
     *   }
     * })
     * 
     */
    delete<T extends RoomStatusDeleteArgs>(args: SelectSubset<T, RoomStatusDeleteArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomStatus.
     * @param {RoomStatusUpdateArgs} args - Arguments to update one RoomStatus.
     * @example
     * // Update one RoomStatus
     * const roomStatus = await prisma.roomStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomStatusUpdateArgs>(args: SelectSubset<T, RoomStatusUpdateArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomStatuses.
     * @param {RoomStatusDeleteManyArgs} args - Arguments to filter RoomStatuses to delete.
     * @example
     * // Delete a few RoomStatuses
     * const { count } = await prisma.roomStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomStatusDeleteManyArgs>(args?: SelectSubset<T, RoomStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomStatuses
     * const roomStatus = await prisma.roomStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomStatusUpdateManyArgs>(args: SelectSubset<T, RoomStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStatuses and returns the data updated in the database.
     * @param {RoomStatusUpdateManyAndReturnArgs} args - Arguments to update many RoomStatuses.
     * @example
     * // Update many RoomStatuses
     * const roomStatus = await prisma.roomStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomStatuses and only return the `id`
     * const roomStatusWithIdOnly = await prisma.roomStatus.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomStatus.
     * @param {RoomStatusUpsertArgs} args - Arguments to update or create a RoomStatus.
     * @example
     * // Update or create a RoomStatus
     * const roomStatus = await prisma.roomStatus.upsert({
     *   create: {
     *     // ... data to create a RoomStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomStatus we want to update
     *   }
     * })
     */
    upsert<T extends RoomStatusUpsertArgs>(args: SelectSubset<T, RoomStatusUpsertArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusCountArgs} args - Arguments to filter RoomStatuses to count.
     * @example
     * // Count the number of RoomStatuses
     * const count = await prisma.roomStatus.count({
     *   where: {
     *     // ... the filter for the RoomStatuses we want to count
     *   }
     * })
    **/
    count<T extends RoomStatusCountArgs>(
      args?: Subset<T, RoomStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomStatusAggregateArgs>(args: Subset<T, RoomStatusAggregateArgs>): Prisma.PrismaPromise<GetRoomStatusAggregateType<T>>

    /**
     * Group by RoomStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomStatusGroupByArgs['orderBy'] }
        : { orderBy?: RoomStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomStatus model
   */
  readonly fields: RoomStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rooms<T extends RoomStatus$roomsArgs<ExtArgs> = {}>(args?: Subset<T, RoomStatus$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomStatus model
   */
  interface RoomStatusFieldRefs {
    readonly id: FieldRef<"RoomStatus", 'Int'>
    readonly statusName: FieldRef<"RoomStatus", 'String'>
    readonly createdAt: FieldRef<"RoomStatus", 'DateTime'>
    readonly updatedAt: FieldRef<"RoomStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomStatus findUnique
   */
  export type RoomStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatus to fetch.
     */
    where: RoomStatusWhereUniqueInput
  }

  /**
   * RoomStatus findUniqueOrThrow
   */
  export type RoomStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatus to fetch.
     */
    where: RoomStatusWhereUniqueInput
  }

  /**
   * RoomStatus findFirst
   */
  export type RoomStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatus to fetch.
     */
    where?: RoomStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatuses to fetch.
     */
    orderBy?: RoomStatusOrderByWithRelationInput | RoomStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStatuses.
     */
    cursor?: RoomStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStatuses.
     */
    distinct?: RoomStatusScalarFieldEnum | RoomStatusScalarFieldEnum[]
  }

  /**
   * RoomStatus findFirstOrThrow
   */
  export type RoomStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatus to fetch.
     */
    where?: RoomStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatuses to fetch.
     */
    orderBy?: RoomStatusOrderByWithRelationInput | RoomStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStatuses.
     */
    cursor?: RoomStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStatuses.
     */
    distinct?: RoomStatusScalarFieldEnum | RoomStatusScalarFieldEnum[]
  }

  /**
   * RoomStatus findMany
   */
  export type RoomStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatuses to fetch.
     */
    where?: RoomStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatuses to fetch.
     */
    orderBy?: RoomStatusOrderByWithRelationInput | RoomStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomStatuses.
     */
    cursor?: RoomStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatuses.
     */
    skip?: number
    distinct?: RoomStatusScalarFieldEnum | RoomStatusScalarFieldEnum[]
  }

  /**
   * RoomStatus create
   */
  export type RoomStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomStatus.
     */
    data?: XOR<RoomStatusCreateInput, RoomStatusUncheckedCreateInput>
  }

  /**
   * RoomStatus createMany
   */
  export type RoomStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomStatuses.
     */
    data: RoomStatusCreateManyInput | RoomStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomStatus createManyAndReturn
   */
  export type RoomStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * The data used to create many RoomStatuses.
     */
    data: RoomStatusCreateManyInput | RoomStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomStatus update
   */
  export type RoomStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomStatus.
     */
    data: XOR<RoomStatusUpdateInput, RoomStatusUncheckedUpdateInput>
    /**
     * Choose, which RoomStatus to update.
     */
    where: RoomStatusWhereUniqueInput
  }

  /**
   * RoomStatus updateMany
   */
  export type RoomStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomStatuses.
     */
    data: XOR<RoomStatusUpdateManyMutationInput, RoomStatusUncheckedUpdateManyInput>
    /**
     * Filter which RoomStatuses to update
     */
    where?: RoomStatusWhereInput
    /**
     * Limit how many RoomStatuses to update.
     */
    limit?: number
  }

  /**
   * RoomStatus updateManyAndReturn
   */
  export type RoomStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * The data used to update RoomStatuses.
     */
    data: XOR<RoomStatusUpdateManyMutationInput, RoomStatusUncheckedUpdateManyInput>
    /**
     * Filter which RoomStatuses to update
     */
    where?: RoomStatusWhereInput
    /**
     * Limit how many RoomStatuses to update.
     */
    limit?: number
  }

  /**
   * RoomStatus upsert
   */
  export type RoomStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomStatus to update in case it exists.
     */
    where: RoomStatusWhereUniqueInput
    /**
     * In case the RoomStatus found by the `where` argument doesn't exist, create a new RoomStatus with this data.
     */
    create: XOR<RoomStatusCreateInput, RoomStatusUncheckedCreateInput>
    /**
     * In case the RoomStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomStatusUpdateInput, RoomStatusUncheckedUpdateInput>
  }

  /**
   * RoomStatus delete
   */
  export type RoomStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter which RoomStatus to delete.
     */
    where: RoomStatusWhereUniqueInput
  }

  /**
   * RoomStatus deleteMany
   */
  export type RoomStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStatuses to delete
     */
    where?: RoomStatusWhereInput
    /**
     * Limit how many RoomStatuses to delete.
     */
    limit?: number
  }

  /**
   * RoomStatus.rooms
   */
  export type RoomStatus$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * RoomStatus without action
   */
  export type RoomStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
  }


  /**
   * Model RoomType
   */

  export type AggregateRoomType = {
    _count: RoomTypeCountAggregateOutputType | null
    _avg: RoomTypeAvgAggregateOutputType | null
    _sum: RoomTypeSumAggregateOutputType | null
    _min: RoomTypeMinAggregateOutputType | null
    _max: RoomTypeMaxAggregateOutputType | null
  }

  export type RoomTypeAvgAggregateOutputType = {
    id: number | null
    bedTypeId: number | null
    capacity: number | null
    roomSize: number | null
    pricePerNight: Decimal | null
    promotionPrice: Decimal | null
  }

  export type RoomTypeSumAggregateOutputType = {
    id: number | null
    bedTypeId: number | null
    capacity: number | null
    roomSize: number | null
    pricePerNight: Decimal | null
    promotionPrice: Decimal | null
  }

  export type RoomTypeMinAggregateOutputType = {
    id: number | null
    bedTypeId: number | null
    name: string | null
    description: string | null
    capacity: number | null
    roomSize: number | null
    pricePerNight: Decimal | null
    promotionPrice: Decimal | null
    isPromotion: boolean | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomTypeMaxAggregateOutputType = {
    id: number | null
    bedTypeId: number | null
    name: string | null
    description: string | null
    capacity: number | null
    roomSize: number | null
    pricePerNight: Decimal | null
    promotionPrice: Decimal | null
    isPromotion: boolean | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomTypeCountAggregateOutputType = {
    id: number
    bedTypeId: number
    name: number
    description: number
    capacity: number
    roomSize: number
    pricePerNight: number
    promotionPrice: number
    isPromotion: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomTypeAvgAggregateInputType = {
    id?: true
    bedTypeId?: true
    capacity?: true
    roomSize?: true
    pricePerNight?: true
    promotionPrice?: true
  }

  export type RoomTypeSumAggregateInputType = {
    id?: true
    bedTypeId?: true
    capacity?: true
    roomSize?: true
    pricePerNight?: true
    promotionPrice?: true
  }

  export type RoomTypeMinAggregateInputType = {
    id?: true
    bedTypeId?: true
    name?: true
    description?: true
    capacity?: true
    roomSize?: true
    pricePerNight?: true
    promotionPrice?: true
    isPromotion?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomTypeMaxAggregateInputType = {
    id?: true
    bedTypeId?: true
    name?: true
    description?: true
    capacity?: true
    roomSize?: true
    pricePerNight?: true
    promotionPrice?: true
    isPromotion?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomTypeCountAggregateInputType = {
    id?: true
    bedTypeId?: true
    name?: true
    description?: true
    capacity?: true
    roomSize?: true
    pricePerNight?: true
    promotionPrice?: true
    isPromotion?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomType to aggregate.
     */
    where?: RoomTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypes to fetch.
     */
    orderBy?: RoomTypeOrderByWithRelationInput | RoomTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomTypes
    **/
    _count?: true | RoomTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomTypeMaxAggregateInputType
  }

  export type GetRoomTypeAggregateType<T extends RoomTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomType[P]>
      : GetScalarType<T[P], AggregateRoomType[P]>
  }




  export type RoomTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomTypeWhereInput
    orderBy?: RoomTypeOrderByWithAggregationInput | RoomTypeOrderByWithAggregationInput[]
    by: RoomTypeScalarFieldEnum[] | RoomTypeScalarFieldEnum
    having?: RoomTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomTypeCountAggregateInputType | true
    _avg?: RoomTypeAvgAggregateInputType
    _sum?: RoomTypeSumAggregateInputType
    _min?: RoomTypeMinAggregateInputType
    _max?: RoomTypeMaxAggregateInputType
  }

  export type RoomTypeGroupByOutputType = {
    id: number
    bedTypeId: number | null
    name: string | null
    description: string | null
    capacity: number | null
    roomSize: number | null
    pricePerNight: Decimal | null
    promotionPrice: Decimal | null
    isPromotion: boolean | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoomTypeCountAggregateOutputType | null
    _avg: RoomTypeAvgAggregateOutputType | null
    _sum: RoomTypeSumAggregateOutputType | null
    _min: RoomTypeMinAggregateOutputType | null
    _max: RoomTypeMaxAggregateOutputType | null
  }

  type GetRoomTypeGroupByPayload<T extends RoomTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomTypeGroupByOutputType[P]>
            : GetScalarType<T[P], RoomTypeGroupByOutputType[P]>
        }
      >
    >


  export type RoomTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bedTypeId?: boolean
    name?: boolean
    description?: boolean
    capacity?: boolean
    roomSize?: boolean
    pricePerNight?: boolean
    promotionPrice?: boolean
    isPromotion?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bedType?: boolean | RoomType$bedTypeArgs<ExtArgs>
    rooms?: boolean | RoomType$roomsArgs<ExtArgs>
    roomImages?: boolean | RoomType$roomImagesArgs<ExtArgs>
    roomAmniety?: boolean | RoomType$roomAmnietyArgs<ExtArgs>
    _count?: boolean | RoomTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomType"]>

  export type RoomTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bedTypeId?: boolean
    name?: boolean
    description?: boolean
    capacity?: boolean
    roomSize?: boolean
    pricePerNight?: boolean
    promotionPrice?: boolean
    isPromotion?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bedType?: boolean | RoomType$bedTypeArgs<ExtArgs>
  }, ExtArgs["result"]["roomType"]>

  export type RoomTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bedTypeId?: boolean
    name?: boolean
    description?: boolean
    capacity?: boolean
    roomSize?: boolean
    pricePerNight?: boolean
    promotionPrice?: boolean
    isPromotion?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bedType?: boolean | RoomType$bedTypeArgs<ExtArgs>
  }, ExtArgs["result"]["roomType"]>

  export type RoomTypeSelectScalar = {
    id?: boolean
    bedTypeId?: boolean
    name?: boolean
    description?: boolean
    capacity?: boolean
    roomSize?: boolean
    pricePerNight?: boolean
    promotionPrice?: boolean
    isPromotion?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bedTypeId" | "name" | "description" | "capacity" | "roomSize" | "pricePerNight" | "promotionPrice" | "isPromotion" | "imageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["roomType"]>
  export type RoomTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bedType?: boolean | RoomType$bedTypeArgs<ExtArgs>
    rooms?: boolean | RoomType$roomsArgs<ExtArgs>
    roomImages?: boolean | RoomType$roomImagesArgs<ExtArgs>
    roomAmniety?: boolean | RoomType$roomAmnietyArgs<ExtArgs>
    _count?: boolean | RoomTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bedType?: boolean | RoomType$bedTypeArgs<ExtArgs>
  }
  export type RoomTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bedType?: boolean | RoomType$bedTypeArgs<ExtArgs>
  }

  export type $RoomTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomType"
    objects: {
      bedType: Prisma.$BedTypePayload<ExtArgs> | null
      rooms: Prisma.$RoomPayload<ExtArgs>[]
      roomImages: Prisma.$RoomImagePayload<ExtArgs>[]
      roomAmniety: Prisma.$RoomAmnietyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      bedTypeId: number | null
      name: string | null
      description: string | null
      capacity: number | null
      roomSize: number | null
      pricePerNight: Prisma.Decimal | null
      promotionPrice: Prisma.Decimal | null
      isPromotion: boolean | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roomType"]>
    composites: {}
  }

  type RoomTypeGetPayload<S extends boolean | null | undefined | RoomTypeDefaultArgs> = $Result.GetResult<Prisma.$RoomTypePayload, S>

  type RoomTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomTypeCountAggregateInputType | true
    }

  export interface RoomTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomType'], meta: { name: 'RoomType' } }
    /**
     * Find zero or one RoomType that matches the filter.
     * @param {RoomTypeFindUniqueArgs} args - Arguments to find a RoomType
     * @example
     * // Get one RoomType
     * const roomType = await prisma.roomType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomTypeFindUniqueArgs>(args: SelectSubset<T, RoomTypeFindUniqueArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomTypeFindUniqueOrThrowArgs} args - Arguments to find a RoomType
     * @example
     * // Get one RoomType
     * const roomType = await prisma.roomType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeFindFirstArgs} args - Arguments to find a RoomType
     * @example
     * // Get one RoomType
     * const roomType = await prisma.roomType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomTypeFindFirstArgs>(args?: SelectSubset<T, RoomTypeFindFirstArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeFindFirstOrThrowArgs} args - Arguments to find a RoomType
     * @example
     * // Get one RoomType
     * const roomType = await prisma.roomType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomTypes
     * const roomTypes = await prisma.roomType.findMany()
     * 
     * // Get first 10 RoomTypes
     * const roomTypes = await prisma.roomType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomTypeWithIdOnly = await prisma.roomType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomTypeFindManyArgs>(args?: SelectSubset<T, RoomTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomType.
     * @param {RoomTypeCreateArgs} args - Arguments to create a RoomType.
     * @example
     * // Create one RoomType
     * const RoomType = await prisma.roomType.create({
     *   data: {
     *     // ... data to create a RoomType
     *   }
     * })
     * 
     */
    create<T extends RoomTypeCreateArgs>(args: SelectSubset<T, RoomTypeCreateArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomTypes.
     * @param {RoomTypeCreateManyArgs} args - Arguments to create many RoomTypes.
     * @example
     * // Create many RoomTypes
     * const roomType = await prisma.roomType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomTypeCreateManyArgs>(args?: SelectSubset<T, RoomTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomTypes and returns the data saved in the database.
     * @param {RoomTypeCreateManyAndReturnArgs} args - Arguments to create many RoomTypes.
     * @example
     * // Create many RoomTypes
     * const roomType = await prisma.roomType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomTypes and only return the `id`
     * const roomTypeWithIdOnly = await prisma.roomType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomType.
     * @param {RoomTypeDeleteArgs} args - Arguments to delete one RoomType.
     * @example
     * // Delete one RoomType
     * const RoomType = await prisma.roomType.delete({
     *   where: {
     *     // ... filter to delete one RoomType
     *   }
     * })
     * 
     */
    delete<T extends RoomTypeDeleteArgs>(args: SelectSubset<T, RoomTypeDeleteArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomType.
     * @param {RoomTypeUpdateArgs} args - Arguments to update one RoomType.
     * @example
     * // Update one RoomType
     * const roomType = await prisma.roomType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomTypeUpdateArgs>(args: SelectSubset<T, RoomTypeUpdateArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomTypes.
     * @param {RoomTypeDeleteManyArgs} args - Arguments to filter RoomTypes to delete.
     * @example
     * // Delete a few RoomTypes
     * const { count } = await prisma.roomType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomTypeDeleteManyArgs>(args?: SelectSubset<T, RoomTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomTypes
     * const roomType = await prisma.roomType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomTypeUpdateManyArgs>(args: SelectSubset<T, RoomTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomTypes and returns the data updated in the database.
     * @param {RoomTypeUpdateManyAndReturnArgs} args - Arguments to update many RoomTypes.
     * @example
     * // Update many RoomTypes
     * const roomType = await prisma.roomType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomTypes and only return the `id`
     * const roomTypeWithIdOnly = await prisma.roomType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomType.
     * @param {RoomTypeUpsertArgs} args - Arguments to update or create a RoomType.
     * @example
     * // Update or create a RoomType
     * const roomType = await prisma.roomType.upsert({
     *   create: {
     *     // ... data to create a RoomType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomType we want to update
     *   }
     * })
     */
    upsert<T extends RoomTypeUpsertArgs>(args: SelectSubset<T, RoomTypeUpsertArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeCountArgs} args - Arguments to filter RoomTypes to count.
     * @example
     * // Count the number of RoomTypes
     * const count = await prisma.roomType.count({
     *   where: {
     *     // ... the filter for the RoomTypes we want to count
     *   }
     * })
    **/
    count<T extends RoomTypeCountArgs>(
      args?: Subset<T, RoomTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomTypeAggregateArgs>(args: Subset<T, RoomTypeAggregateArgs>): Prisma.PrismaPromise<GetRoomTypeAggregateType<T>>

    /**
     * Group by RoomType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomTypeGroupByArgs['orderBy'] }
        : { orderBy?: RoomTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomType model
   */
  readonly fields: RoomTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bedType<T extends RoomType$bedTypeArgs<ExtArgs> = {}>(args?: Subset<T, RoomType$bedTypeArgs<ExtArgs>>): Prisma__BedTypeClient<$Result.GetResult<Prisma.$BedTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    rooms<T extends RoomType$roomsArgs<ExtArgs> = {}>(args?: Subset<T, RoomType$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roomImages<T extends RoomType$roomImagesArgs<ExtArgs> = {}>(args?: Subset<T, RoomType$roomImagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roomAmniety<T extends RoomType$roomAmnietyArgs<ExtArgs> = {}>(args?: Subset<T, RoomType$roomAmnietyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomType model
   */
  interface RoomTypeFieldRefs {
    readonly id: FieldRef<"RoomType", 'Int'>
    readonly bedTypeId: FieldRef<"RoomType", 'Int'>
    readonly name: FieldRef<"RoomType", 'String'>
    readonly description: FieldRef<"RoomType", 'String'>
    readonly capacity: FieldRef<"RoomType", 'Int'>
    readonly roomSize: FieldRef<"RoomType", 'Int'>
    readonly pricePerNight: FieldRef<"RoomType", 'Decimal'>
    readonly promotionPrice: FieldRef<"RoomType", 'Decimal'>
    readonly isPromotion: FieldRef<"RoomType", 'Boolean'>
    readonly imageUrl: FieldRef<"RoomType", 'String'>
    readonly createdAt: FieldRef<"RoomType", 'DateTime'>
    readonly updatedAt: FieldRef<"RoomType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomType findUnique
   */
  export type RoomTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter, which RoomType to fetch.
     */
    where: RoomTypeWhereUniqueInput
  }

  /**
   * RoomType findUniqueOrThrow
   */
  export type RoomTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter, which RoomType to fetch.
     */
    where: RoomTypeWhereUniqueInput
  }

  /**
   * RoomType findFirst
   */
  export type RoomTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter, which RoomType to fetch.
     */
    where?: RoomTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypes to fetch.
     */
    orderBy?: RoomTypeOrderByWithRelationInput | RoomTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomTypes.
     */
    cursor?: RoomTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomTypes.
     */
    distinct?: RoomTypeScalarFieldEnum | RoomTypeScalarFieldEnum[]
  }

  /**
   * RoomType findFirstOrThrow
   */
  export type RoomTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter, which RoomType to fetch.
     */
    where?: RoomTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypes to fetch.
     */
    orderBy?: RoomTypeOrderByWithRelationInput | RoomTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomTypes.
     */
    cursor?: RoomTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomTypes.
     */
    distinct?: RoomTypeScalarFieldEnum | RoomTypeScalarFieldEnum[]
  }

  /**
   * RoomType findMany
   */
  export type RoomTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter, which RoomTypes to fetch.
     */
    where?: RoomTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomTypes to fetch.
     */
    orderBy?: RoomTypeOrderByWithRelationInput | RoomTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomTypes.
     */
    cursor?: RoomTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomTypes.
     */
    skip?: number
    distinct?: RoomTypeScalarFieldEnum | RoomTypeScalarFieldEnum[]
  }

  /**
   * RoomType create
   */
  export type RoomTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomType.
     */
    data?: XOR<RoomTypeCreateInput, RoomTypeUncheckedCreateInput>
  }

  /**
   * RoomType createMany
   */
  export type RoomTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomTypes.
     */
    data: RoomTypeCreateManyInput | RoomTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomType createManyAndReturn
   */
  export type RoomTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * The data used to create many RoomTypes.
     */
    data: RoomTypeCreateManyInput | RoomTypeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomType update
   */
  export type RoomTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomType.
     */
    data: XOR<RoomTypeUpdateInput, RoomTypeUncheckedUpdateInput>
    /**
     * Choose, which RoomType to update.
     */
    where: RoomTypeWhereUniqueInput
  }

  /**
   * RoomType updateMany
   */
  export type RoomTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomTypes.
     */
    data: XOR<RoomTypeUpdateManyMutationInput, RoomTypeUncheckedUpdateManyInput>
    /**
     * Filter which RoomTypes to update
     */
    where?: RoomTypeWhereInput
    /**
     * Limit how many RoomTypes to update.
     */
    limit?: number
  }

  /**
   * RoomType updateManyAndReturn
   */
  export type RoomTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * The data used to update RoomTypes.
     */
    data: XOR<RoomTypeUpdateManyMutationInput, RoomTypeUncheckedUpdateManyInput>
    /**
     * Filter which RoomTypes to update
     */
    where?: RoomTypeWhereInput
    /**
     * Limit how many RoomTypes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomType upsert
   */
  export type RoomTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomType to update in case it exists.
     */
    where: RoomTypeWhereUniqueInput
    /**
     * In case the RoomType found by the `where` argument doesn't exist, create a new RoomType with this data.
     */
    create: XOR<RoomTypeCreateInput, RoomTypeUncheckedCreateInput>
    /**
     * In case the RoomType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomTypeUpdateInput, RoomTypeUncheckedUpdateInput>
  }

  /**
   * RoomType delete
   */
  export type RoomTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    /**
     * Filter which RoomType to delete.
     */
    where: RoomTypeWhereUniqueInput
  }

  /**
   * RoomType deleteMany
   */
  export type RoomTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomTypes to delete
     */
    where?: RoomTypeWhereInput
    /**
     * Limit how many RoomTypes to delete.
     */
    limit?: number
  }

  /**
   * RoomType.bedType
   */
  export type RoomType$bedTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BedType
     */
    select?: BedTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BedType
     */
    omit?: BedTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BedTypeInclude<ExtArgs> | null
    where?: BedTypeWhereInput
  }

  /**
   * RoomType.rooms
   */
  export type RoomType$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * RoomType.roomImages
   */
  export type RoomType$roomImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
    where?: RoomImageWhereInput
    orderBy?: RoomImageOrderByWithRelationInput | RoomImageOrderByWithRelationInput[]
    cursor?: RoomImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomImageScalarFieldEnum | RoomImageScalarFieldEnum[]
  }

  /**
   * RoomType.roomAmniety
   */
  export type RoomType$roomAmnietyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
    where?: RoomAmnietyWhereInput
    orderBy?: RoomAmnietyOrderByWithRelationInput | RoomAmnietyOrderByWithRelationInput[]
    cursor?: RoomAmnietyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomAmnietyScalarFieldEnum | RoomAmnietyScalarFieldEnum[]
  }

  /**
   * RoomType without action
   */
  export type RoomTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    id: number | null
    roomTypeId: number | null
    roomStatusId: number | null
  }

  export type RoomSumAggregateOutputType = {
    id: number | null
    roomTypeId: number | null
    roomStatusId: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: number | null
    roomNumber: string | null
    roomTypeId: number | null
    roomStatusId: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: number | null
    roomNumber: string | null
    roomTypeId: number | null
    roomStatusId: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    roomNumber: number
    roomTypeId: number
    roomStatusId: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    id?: true
    roomTypeId?: true
    roomStatusId?: true
  }

  export type RoomSumAggregateInputType = {
    id?: true
    roomTypeId?: true
    roomStatusId?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    roomNumber?: true
    roomTypeId?: true
    roomStatusId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    roomNumber?: true
    roomTypeId?: true
    roomStatusId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    roomNumber?: true
    roomTypeId?: true
    roomStatusId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: number
    roomNumber: string | null
    roomTypeId: number | null
    roomStatusId: number | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomNumber?: boolean
    roomTypeId?: boolean
    roomStatusId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roomType?: boolean | Room$roomTypeArgs<ExtArgs>
    roomStatus?: boolean | Room$roomStatusArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomNumber?: boolean
    roomTypeId?: boolean
    roomStatusId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roomType?: boolean | Room$roomTypeArgs<ExtArgs>
    roomStatus?: boolean | Room$roomStatusArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomNumber?: boolean
    roomTypeId?: boolean
    roomStatusId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roomType?: boolean | Room$roomTypeArgs<ExtArgs>
    roomStatus?: boolean | Room$roomStatusArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    roomNumber?: boolean
    roomTypeId?: boolean
    roomStatusId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomNumber" | "roomTypeId" | "roomStatusId" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | Room$roomTypeArgs<ExtArgs>
    roomStatus?: boolean | Room$roomStatusArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | Room$roomTypeArgs<ExtArgs>
    roomStatus?: boolean | Room$roomStatusArgs<ExtArgs>
  }
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | Room$roomTypeArgs<ExtArgs>
    roomStatus?: boolean | Room$roomStatusArgs<ExtArgs>
  }

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      roomType: Prisma.$RoomTypePayload<ExtArgs> | null
      roomStatus: Prisma.$RoomStatusPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      roomNumber: string | null
      roomTypeId: number | null
      roomStatusId: number | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roomType<T extends Room$roomTypeArgs<ExtArgs> = {}>(args?: Subset<T, Room$roomTypeArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    roomStatus<T extends Room$roomStatusArgs<ExtArgs> = {}>(args?: Subset<T, Room$roomStatusArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'Int'>
    readonly roomNumber: FieldRef<"Room", 'String'>
    readonly roomTypeId: FieldRef<"Room", 'Int'>
    readonly roomStatusId: FieldRef<"Room", 'Int'>
    readonly notes: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data?: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.roomType
   */
  export type Room$roomTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    where?: RoomTypeWhereInput
  }

  /**
   * Room.roomStatus
   */
  export type Room$roomStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    where?: RoomStatusWhereInput
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model RoomAmniety
   */

  export type AggregateRoomAmniety = {
    _count: RoomAmnietyCountAggregateOutputType | null
    _avg: RoomAmnietyAvgAggregateOutputType | null
    _sum: RoomAmnietySumAggregateOutputType | null
    _min: RoomAmnietyMinAggregateOutputType | null
    _max: RoomAmnietyMaxAggregateOutputType | null
  }

  export type RoomAmnietyAvgAggregateOutputType = {
    id: number | null
    roomTypeId: number | null
    order: number | null
  }

  export type RoomAmnietySumAggregateOutputType = {
    id: number | null
    roomTypeId: number | null
    order: number | null
  }

  export type RoomAmnietyMinAggregateOutputType = {
    id: number | null
    roomTypeId: number | null
    name: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomAmnietyMaxAggregateOutputType = {
    id: number | null
    roomTypeId: number | null
    name: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomAmnietyCountAggregateOutputType = {
    id: number
    roomTypeId: number
    name: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomAmnietyAvgAggregateInputType = {
    id?: true
    roomTypeId?: true
    order?: true
  }

  export type RoomAmnietySumAggregateInputType = {
    id?: true
    roomTypeId?: true
    order?: true
  }

  export type RoomAmnietyMinAggregateInputType = {
    id?: true
    roomTypeId?: true
    name?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomAmnietyMaxAggregateInputType = {
    id?: true
    roomTypeId?: true
    name?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomAmnietyCountAggregateInputType = {
    id?: true
    roomTypeId?: true
    name?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAmnietyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomAmniety to aggregate.
     */
    where?: RoomAmnietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomAmnieties to fetch.
     */
    orderBy?: RoomAmnietyOrderByWithRelationInput | RoomAmnietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomAmnietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomAmnieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomAmnieties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomAmnieties
    **/
    _count?: true | RoomAmnietyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAmnietyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomAmnietySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomAmnietyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomAmnietyMaxAggregateInputType
  }

  export type GetRoomAmnietyAggregateType<T extends RoomAmnietyAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomAmniety]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomAmniety[P]>
      : GetScalarType<T[P], AggregateRoomAmniety[P]>
  }




  export type RoomAmnietyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomAmnietyWhereInput
    orderBy?: RoomAmnietyOrderByWithAggregationInput | RoomAmnietyOrderByWithAggregationInput[]
    by: RoomAmnietyScalarFieldEnum[] | RoomAmnietyScalarFieldEnum
    having?: RoomAmnietyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomAmnietyCountAggregateInputType | true
    _avg?: RoomAmnietyAvgAggregateInputType
    _sum?: RoomAmnietySumAggregateInputType
    _min?: RoomAmnietyMinAggregateInputType
    _max?: RoomAmnietyMaxAggregateInputType
  }

  export type RoomAmnietyGroupByOutputType = {
    id: number
    roomTypeId: number | null
    name: string
    order: number
    createdAt: Date
    updatedAt: Date
    _count: RoomAmnietyCountAggregateOutputType | null
    _avg: RoomAmnietyAvgAggregateOutputType | null
    _sum: RoomAmnietySumAggregateOutputType | null
    _min: RoomAmnietyMinAggregateOutputType | null
    _max: RoomAmnietyMaxAggregateOutputType | null
  }

  type GetRoomAmnietyGroupByPayload<T extends RoomAmnietyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomAmnietyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomAmnietyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomAmnietyGroupByOutputType[P]>
            : GetScalarType<T[P], RoomAmnietyGroupByOutputType[P]>
        }
      >
    >


  export type RoomAmnietySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomTypeId?: boolean
    name?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roomType?: boolean | RoomAmniety$roomTypeArgs<ExtArgs>
  }, ExtArgs["result"]["roomAmniety"]>

  export type RoomAmnietySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomTypeId?: boolean
    name?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roomType?: boolean | RoomAmniety$roomTypeArgs<ExtArgs>
  }, ExtArgs["result"]["roomAmniety"]>

  export type RoomAmnietySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomTypeId?: boolean
    name?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roomType?: boolean | RoomAmniety$roomTypeArgs<ExtArgs>
  }, ExtArgs["result"]["roomAmniety"]>

  export type RoomAmnietySelectScalar = {
    id?: boolean
    roomTypeId?: boolean
    name?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomAmnietyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomTypeId" | "name" | "order" | "createdAt" | "updatedAt", ExtArgs["result"]["roomAmniety"]>
  export type RoomAmnietyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | RoomAmniety$roomTypeArgs<ExtArgs>
  }
  export type RoomAmnietyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | RoomAmniety$roomTypeArgs<ExtArgs>
  }
  export type RoomAmnietyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | RoomAmniety$roomTypeArgs<ExtArgs>
  }

  export type $RoomAmnietyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomAmniety"
    objects: {
      roomType: Prisma.$RoomTypePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      roomTypeId: number | null
      name: string
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roomAmniety"]>
    composites: {}
  }

  type RoomAmnietyGetPayload<S extends boolean | null | undefined | RoomAmnietyDefaultArgs> = $Result.GetResult<Prisma.$RoomAmnietyPayload, S>

  type RoomAmnietyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomAmnietyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomAmnietyCountAggregateInputType | true
    }

  export interface RoomAmnietyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomAmniety'], meta: { name: 'RoomAmniety' } }
    /**
     * Find zero or one RoomAmniety that matches the filter.
     * @param {RoomAmnietyFindUniqueArgs} args - Arguments to find a RoomAmniety
     * @example
     * // Get one RoomAmniety
     * const roomAmniety = await prisma.roomAmniety.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomAmnietyFindUniqueArgs>(args: SelectSubset<T, RoomAmnietyFindUniqueArgs<ExtArgs>>): Prisma__RoomAmnietyClient<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomAmniety that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomAmnietyFindUniqueOrThrowArgs} args - Arguments to find a RoomAmniety
     * @example
     * // Get one RoomAmniety
     * const roomAmniety = await prisma.roomAmniety.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomAmnietyFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomAmnietyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomAmnietyClient<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomAmniety that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAmnietyFindFirstArgs} args - Arguments to find a RoomAmniety
     * @example
     * // Get one RoomAmniety
     * const roomAmniety = await prisma.roomAmniety.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomAmnietyFindFirstArgs>(args?: SelectSubset<T, RoomAmnietyFindFirstArgs<ExtArgs>>): Prisma__RoomAmnietyClient<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomAmniety that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAmnietyFindFirstOrThrowArgs} args - Arguments to find a RoomAmniety
     * @example
     * // Get one RoomAmniety
     * const roomAmniety = await prisma.roomAmniety.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomAmnietyFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomAmnietyFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomAmnietyClient<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomAmnieties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAmnietyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomAmnieties
     * const roomAmnieties = await prisma.roomAmniety.findMany()
     * 
     * // Get first 10 RoomAmnieties
     * const roomAmnieties = await prisma.roomAmniety.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomAmnietyWithIdOnly = await prisma.roomAmniety.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomAmnietyFindManyArgs>(args?: SelectSubset<T, RoomAmnietyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomAmniety.
     * @param {RoomAmnietyCreateArgs} args - Arguments to create a RoomAmniety.
     * @example
     * // Create one RoomAmniety
     * const RoomAmniety = await prisma.roomAmniety.create({
     *   data: {
     *     // ... data to create a RoomAmniety
     *   }
     * })
     * 
     */
    create<T extends RoomAmnietyCreateArgs>(args: SelectSubset<T, RoomAmnietyCreateArgs<ExtArgs>>): Prisma__RoomAmnietyClient<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomAmnieties.
     * @param {RoomAmnietyCreateManyArgs} args - Arguments to create many RoomAmnieties.
     * @example
     * // Create many RoomAmnieties
     * const roomAmniety = await prisma.roomAmniety.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomAmnietyCreateManyArgs>(args?: SelectSubset<T, RoomAmnietyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomAmnieties and returns the data saved in the database.
     * @param {RoomAmnietyCreateManyAndReturnArgs} args - Arguments to create many RoomAmnieties.
     * @example
     * // Create many RoomAmnieties
     * const roomAmniety = await prisma.roomAmniety.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomAmnieties and only return the `id`
     * const roomAmnietyWithIdOnly = await prisma.roomAmniety.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomAmnietyCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomAmnietyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomAmniety.
     * @param {RoomAmnietyDeleteArgs} args - Arguments to delete one RoomAmniety.
     * @example
     * // Delete one RoomAmniety
     * const RoomAmniety = await prisma.roomAmniety.delete({
     *   where: {
     *     // ... filter to delete one RoomAmniety
     *   }
     * })
     * 
     */
    delete<T extends RoomAmnietyDeleteArgs>(args: SelectSubset<T, RoomAmnietyDeleteArgs<ExtArgs>>): Prisma__RoomAmnietyClient<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomAmniety.
     * @param {RoomAmnietyUpdateArgs} args - Arguments to update one RoomAmniety.
     * @example
     * // Update one RoomAmniety
     * const roomAmniety = await prisma.roomAmniety.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomAmnietyUpdateArgs>(args: SelectSubset<T, RoomAmnietyUpdateArgs<ExtArgs>>): Prisma__RoomAmnietyClient<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomAmnieties.
     * @param {RoomAmnietyDeleteManyArgs} args - Arguments to filter RoomAmnieties to delete.
     * @example
     * // Delete a few RoomAmnieties
     * const { count } = await prisma.roomAmniety.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomAmnietyDeleteManyArgs>(args?: SelectSubset<T, RoomAmnietyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomAmnieties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAmnietyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomAmnieties
     * const roomAmniety = await prisma.roomAmniety.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomAmnietyUpdateManyArgs>(args: SelectSubset<T, RoomAmnietyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomAmnieties and returns the data updated in the database.
     * @param {RoomAmnietyUpdateManyAndReturnArgs} args - Arguments to update many RoomAmnieties.
     * @example
     * // Update many RoomAmnieties
     * const roomAmniety = await prisma.roomAmniety.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomAmnieties and only return the `id`
     * const roomAmnietyWithIdOnly = await prisma.roomAmniety.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomAmnietyUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomAmnietyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomAmniety.
     * @param {RoomAmnietyUpsertArgs} args - Arguments to update or create a RoomAmniety.
     * @example
     * // Update or create a RoomAmniety
     * const roomAmniety = await prisma.roomAmniety.upsert({
     *   create: {
     *     // ... data to create a RoomAmniety
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomAmniety we want to update
     *   }
     * })
     */
    upsert<T extends RoomAmnietyUpsertArgs>(args: SelectSubset<T, RoomAmnietyUpsertArgs<ExtArgs>>): Prisma__RoomAmnietyClient<$Result.GetResult<Prisma.$RoomAmnietyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomAmnieties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAmnietyCountArgs} args - Arguments to filter RoomAmnieties to count.
     * @example
     * // Count the number of RoomAmnieties
     * const count = await prisma.roomAmniety.count({
     *   where: {
     *     // ... the filter for the RoomAmnieties we want to count
     *   }
     * })
    **/
    count<T extends RoomAmnietyCountArgs>(
      args?: Subset<T, RoomAmnietyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomAmnietyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomAmniety.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAmnietyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAmnietyAggregateArgs>(args: Subset<T, RoomAmnietyAggregateArgs>): Prisma.PrismaPromise<GetRoomAmnietyAggregateType<T>>

    /**
     * Group by RoomAmniety.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAmnietyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomAmnietyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomAmnietyGroupByArgs['orderBy'] }
        : { orderBy?: RoomAmnietyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomAmnietyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomAmnietyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomAmniety model
   */
  readonly fields: RoomAmnietyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomAmniety.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomAmnietyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roomType<T extends RoomAmniety$roomTypeArgs<ExtArgs> = {}>(args?: Subset<T, RoomAmniety$roomTypeArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomAmniety model
   */
  interface RoomAmnietyFieldRefs {
    readonly id: FieldRef<"RoomAmniety", 'Int'>
    readonly roomTypeId: FieldRef<"RoomAmniety", 'Int'>
    readonly name: FieldRef<"RoomAmniety", 'String'>
    readonly order: FieldRef<"RoomAmniety", 'Int'>
    readonly createdAt: FieldRef<"RoomAmniety", 'DateTime'>
    readonly updatedAt: FieldRef<"RoomAmniety", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomAmniety findUnique
   */
  export type RoomAmnietyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
    /**
     * Filter, which RoomAmniety to fetch.
     */
    where: RoomAmnietyWhereUniqueInput
  }

  /**
   * RoomAmniety findUniqueOrThrow
   */
  export type RoomAmnietyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
    /**
     * Filter, which RoomAmniety to fetch.
     */
    where: RoomAmnietyWhereUniqueInput
  }

  /**
   * RoomAmniety findFirst
   */
  export type RoomAmnietyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
    /**
     * Filter, which RoomAmniety to fetch.
     */
    where?: RoomAmnietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomAmnieties to fetch.
     */
    orderBy?: RoomAmnietyOrderByWithRelationInput | RoomAmnietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomAmnieties.
     */
    cursor?: RoomAmnietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomAmnieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomAmnieties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomAmnieties.
     */
    distinct?: RoomAmnietyScalarFieldEnum | RoomAmnietyScalarFieldEnum[]
  }

  /**
   * RoomAmniety findFirstOrThrow
   */
  export type RoomAmnietyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
    /**
     * Filter, which RoomAmniety to fetch.
     */
    where?: RoomAmnietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomAmnieties to fetch.
     */
    orderBy?: RoomAmnietyOrderByWithRelationInput | RoomAmnietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomAmnieties.
     */
    cursor?: RoomAmnietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomAmnieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomAmnieties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomAmnieties.
     */
    distinct?: RoomAmnietyScalarFieldEnum | RoomAmnietyScalarFieldEnum[]
  }

  /**
   * RoomAmniety findMany
   */
  export type RoomAmnietyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
    /**
     * Filter, which RoomAmnieties to fetch.
     */
    where?: RoomAmnietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomAmnieties to fetch.
     */
    orderBy?: RoomAmnietyOrderByWithRelationInput | RoomAmnietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomAmnieties.
     */
    cursor?: RoomAmnietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomAmnieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomAmnieties.
     */
    skip?: number
    distinct?: RoomAmnietyScalarFieldEnum | RoomAmnietyScalarFieldEnum[]
  }

  /**
   * RoomAmniety create
   */
  export type RoomAmnietyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomAmniety.
     */
    data: XOR<RoomAmnietyCreateInput, RoomAmnietyUncheckedCreateInput>
  }

  /**
   * RoomAmniety createMany
   */
  export type RoomAmnietyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomAmnieties.
     */
    data: RoomAmnietyCreateManyInput | RoomAmnietyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomAmniety createManyAndReturn
   */
  export type RoomAmnietyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * The data used to create many RoomAmnieties.
     */
    data: RoomAmnietyCreateManyInput | RoomAmnietyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomAmniety update
   */
  export type RoomAmnietyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomAmniety.
     */
    data: XOR<RoomAmnietyUpdateInput, RoomAmnietyUncheckedUpdateInput>
    /**
     * Choose, which RoomAmniety to update.
     */
    where: RoomAmnietyWhereUniqueInput
  }

  /**
   * RoomAmniety updateMany
   */
  export type RoomAmnietyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomAmnieties.
     */
    data: XOR<RoomAmnietyUpdateManyMutationInput, RoomAmnietyUncheckedUpdateManyInput>
    /**
     * Filter which RoomAmnieties to update
     */
    where?: RoomAmnietyWhereInput
    /**
     * Limit how many RoomAmnieties to update.
     */
    limit?: number
  }

  /**
   * RoomAmniety updateManyAndReturn
   */
  export type RoomAmnietyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * The data used to update RoomAmnieties.
     */
    data: XOR<RoomAmnietyUpdateManyMutationInput, RoomAmnietyUncheckedUpdateManyInput>
    /**
     * Filter which RoomAmnieties to update
     */
    where?: RoomAmnietyWhereInput
    /**
     * Limit how many RoomAmnieties to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomAmniety upsert
   */
  export type RoomAmnietyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomAmniety to update in case it exists.
     */
    where: RoomAmnietyWhereUniqueInput
    /**
     * In case the RoomAmniety found by the `where` argument doesn't exist, create a new RoomAmniety with this data.
     */
    create: XOR<RoomAmnietyCreateInput, RoomAmnietyUncheckedCreateInput>
    /**
     * In case the RoomAmniety was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomAmnietyUpdateInput, RoomAmnietyUncheckedUpdateInput>
  }

  /**
   * RoomAmniety delete
   */
  export type RoomAmnietyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
    /**
     * Filter which RoomAmniety to delete.
     */
    where: RoomAmnietyWhereUniqueInput
  }

  /**
   * RoomAmniety deleteMany
   */
  export type RoomAmnietyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomAmnieties to delete
     */
    where?: RoomAmnietyWhereInput
    /**
     * Limit how many RoomAmnieties to delete.
     */
    limit?: number
  }

  /**
   * RoomAmniety.roomType
   */
  export type RoomAmniety$roomTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    where?: RoomTypeWhereInput
  }

  /**
   * RoomAmniety without action
   */
  export type RoomAmnietyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomAmniety
     */
    select?: RoomAmnietySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomAmniety
     */
    omit?: RoomAmnietyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomAmnietyInclude<ExtArgs> | null
  }


  /**
   * Model Guest
   */

  export type AggregateGuest = {
    _count: GuestCountAggregateOutputType | null
    _avg: GuestAvgAggregateOutputType | null
    _sum: GuestSumAggregateOutputType | null
    _min: GuestMinAggregateOutputType | null
    _max: GuestMaxAggregateOutputType | null
  }

  export type GuestAvgAggregateOutputType = {
    id: number | null
  }

  export type GuestSumAggregateOutputType = {
    id: number | null
  }

  export type GuestMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    country: string | null
    dateOfBirth: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GuestMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    country: string | null
    dateOfBirth: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GuestCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    phone: number
    country: number
    dateOfBirth: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GuestAvgAggregateInputType = {
    id?: true
  }

  export type GuestSumAggregateInputType = {
    id?: true
  }

  export type GuestMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    country?: true
    dateOfBirth?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GuestMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    country?: true
    dateOfBirth?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GuestCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    country?: true
    dateOfBirth?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GuestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guest to aggregate.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Guests
    **/
    _count?: true | GuestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GuestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GuestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuestMaxAggregateInputType
  }

  export type GetGuestAggregateType<T extends GuestAggregateArgs> = {
        [P in keyof T & keyof AggregateGuest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuest[P]>
      : GetScalarType<T[P], AggregateGuest[P]>
  }




  export type GuestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuestWhereInput
    orderBy?: GuestOrderByWithAggregationInput | GuestOrderByWithAggregationInput[]
    by: GuestScalarFieldEnum[] | GuestScalarFieldEnum
    having?: GuestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuestCountAggregateInputType | true
    _avg?: GuestAvgAggregateInputType
    _sum?: GuestSumAggregateInputType
    _min?: GuestMinAggregateInputType
    _max?: GuestMaxAggregateInputType
  }

  export type GuestGroupByOutputType = {
    id: number
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    country: string | null
    dateOfBirth: Date | null
    createdAt: Date
    updatedAt: Date
    _count: GuestCountAggregateOutputType | null
    _avg: GuestAvgAggregateOutputType | null
    _sum: GuestSumAggregateOutputType | null
    _min: GuestMinAggregateOutputType | null
    _max: GuestMaxAggregateOutputType | null
  }

  type GetGuestGroupByPayload<T extends GuestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuestGroupByOutputType[P]>
            : GetScalarType<T[P], GuestGroupByOutputType[P]>
        }
      >
    >


  export type GuestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    country?: boolean
    dateOfBirth?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    country?: boolean
    dateOfBirth?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    country?: boolean
    dateOfBirth?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["guest"]>

  export type GuestSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    country?: boolean
    dateOfBirth?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GuestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "phone" | "country" | "dateOfBirth" | "createdAt" | "updatedAt", ExtArgs["result"]["guest"]>

  export type $GuestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Guest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string | null
      lastName: string | null
      email: string | null
      phone: string | null
      country: string | null
      dateOfBirth: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["guest"]>
    composites: {}
  }

  type GuestGetPayload<S extends boolean | null | undefined | GuestDefaultArgs> = $Result.GetResult<Prisma.$GuestPayload, S>

  type GuestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuestCountAggregateInputType | true
    }

  export interface GuestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Guest'], meta: { name: 'Guest' } }
    /**
     * Find zero or one Guest that matches the filter.
     * @param {GuestFindUniqueArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuestFindUniqueArgs>(args: SelectSubset<T, GuestFindUniqueArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Guest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuestFindUniqueOrThrowArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuestFindUniqueOrThrowArgs>(args: SelectSubset<T, GuestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindFirstArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuestFindFirstArgs>(args?: SelectSubset<T, GuestFindFirstArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindFirstOrThrowArgs} args - Arguments to find a Guest
     * @example
     * // Get one Guest
     * const guest = await prisma.guest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuestFindFirstOrThrowArgs>(args?: SelectSubset<T, GuestFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Guests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guests
     * const guests = await prisma.guest.findMany()
     * 
     * // Get first 10 Guests
     * const guests = await prisma.guest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guestWithIdOnly = await prisma.guest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuestFindManyArgs>(args?: SelectSubset<T, GuestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Guest.
     * @param {GuestCreateArgs} args - Arguments to create a Guest.
     * @example
     * // Create one Guest
     * const Guest = await prisma.guest.create({
     *   data: {
     *     // ... data to create a Guest
     *   }
     * })
     * 
     */
    create<T extends GuestCreateArgs>(args: SelectSubset<T, GuestCreateArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Guests.
     * @param {GuestCreateManyArgs} args - Arguments to create many Guests.
     * @example
     * // Create many Guests
     * const guest = await prisma.guest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuestCreateManyArgs>(args?: SelectSubset<T, GuestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Guests and returns the data saved in the database.
     * @param {GuestCreateManyAndReturnArgs} args - Arguments to create many Guests.
     * @example
     * // Create many Guests
     * const guest = await prisma.guest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Guests and only return the `id`
     * const guestWithIdOnly = await prisma.guest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuestCreateManyAndReturnArgs>(args?: SelectSubset<T, GuestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Guest.
     * @param {GuestDeleteArgs} args - Arguments to delete one Guest.
     * @example
     * // Delete one Guest
     * const Guest = await prisma.guest.delete({
     *   where: {
     *     // ... filter to delete one Guest
     *   }
     * })
     * 
     */
    delete<T extends GuestDeleteArgs>(args: SelectSubset<T, GuestDeleteArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Guest.
     * @param {GuestUpdateArgs} args - Arguments to update one Guest.
     * @example
     * // Update one Guest
     * const guest = await prisma.guest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuestUpdateArgs>(args: SelectSubset<T, GuestUpdateArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Guests.
     * @param {GuestDeleteManyArgs} args - Arguments to filter Guests to delete.
     * @example
     * // Delete a few Guests
     * const { count } = await prisma.guest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuestDeleteManyArgs>(args?: SelectSubset<T, GuestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guests
     * const guest = await prisma.guest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuestUpdateManyArgs>(args: SelectSubset<T, GuestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guests and returns the data updated in the database.
     * @param {GuestUpdateManyAndReturnArgs} args - Arguments to update many Guests.
     * @example
     * // Update many Guests
     * const guest = await prisma.guest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Guests and only return the `id`
     * const guestWithIdOnly = await prisma.guest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuestUpdateManyAndReturnArgs>(args: SelectSubset<T, GuestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Guest.
     * @param {GuestUpsertArgs} args - Arguments to update or create a Guest.
     * @example
     * // Update or create a Guest
     * const guest = await prisma.guest.upsert({
     *   create: {
     *     // ... data to create a Guest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guest we want to update
     *   }
     * })
     */
    upsert<T extends GuestUpsertArgs>(args: SelectSubset<T, GuestUpsertArgs<ExtArgs>>): Prisma__GuestClient<$Result.GetResult<Prisma.$GuestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Guests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestCountArgs} args - Arguments to filter Guests to count.
     * @example
     * // Count the number of Guests
     * const count = await prisma.guest.count({
     *   where: {
     *     // ... the filter for the Guests we want to count
     *   }
     * })
    **/
    count<T extends GuestCountArgs>(
      args?: Subset<T, GuestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuestAggregateArgs>(args: Subset<T, GuestAggregateArgs>): Prisma.PrismaPromise<GetGuestAggregateType<T>>

    /**
     * Group by Guest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuestGroupByArgs['orderBy'] }
        : { orderBy?: GuestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Guest model
   */
  readonly fields: GuestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Guest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Guest model
   */
  interface GuestFieldRefs {
    readonly id: FieldRef<"Guest", 'Int'>
    readonly firstName: FieldRef<"Guest", 'String'>
    readonly lastName: FieldRef<"Guest", 'String'>
    readonly email: FieldRef<"Guest", 'String'>
    readonly phone: FieldRef<"Guest", 'String'>
    readonly country: FieldRef<"Guest", 'String'>
    readonly dateOfBirth: FieldRef<"Guest", 'DateTime'>
    readonly createdAt: FieldRef<"Guest", 'DateTime'>
    readonly updatedAt: FieldRef<"Guest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Guest findUnique
   */
  export type GuestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest findUniqueOrThrow
   */
  export type GuestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest findFirst
   */
  export type GuestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest findFirstOrThrow
   */
  export type GuestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Filter, which Guest to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guests.
     */
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest findMany
   */
  export type GuestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Filter, which Guests to fetch.
     */
    where?: GuestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guests to fetch.
     */
    orderBy?: GuestOrderByWithRelationInput | GuestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Guests.
     */
    cursor?: GuestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guests.
     */
    skip?: number
    distinct?: GuestScalarFieldEnum | GuestScalarFieldEnum[]
  }

  /**
   * Guest create
   */
  export type GuestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The data needed to create a Guest.
     */
    data?: XOR<GuestCreateInput, GuestUncheckedCreateInput>
  }

  /**
   * Guest createMany
   */
  export type GuestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Guests.
     */
    data: GuestCreateManyInput | GuestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guest createManyAndReturn
   */
  export type GuestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The data used to create many Guests.
     */
    data: GuestCreateManyInput | GuestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guest update
   */
  export type GuestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The data needed to update a Guest.
     */
    data: XOR<GuestUpdateInput, GuestUncheckedUpdateInput>
    /**
     * Choose, which Guest to update.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest updateMany
   */
  export type GuestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Guests.
     */
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyInput>
    /**
     * Filter which Guests to update
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to update.
     */
    limit?: number
  }

  /**
   * Guest updateManyAndReturn
   */
  export type GuestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The data used to update Guests.
     */
    data: XOR<GuestUpdateManyMutationInput, GuestUncheckedUpdateManyInput>
    /**
     * Filter which Guests to update
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to update.
     */
    limit?: number
  }

  /**
   * Guest upsert
   */
  export type GuestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * The filter to search for the Guest to update in case it exists.
     */
    where: GuestWhereUniqueInput
    /**
     * In case the Guest found by the `where` argument doesn't exist, create a new Guest with this data.
     */
    create: XOR<GuestCreateInput, GuestUncheckedCreateInput>
    /**
     * In case the Guest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuestUpdateInput, GuestUncheckedUpdateInput>
  }

  /**
   * Guest delete
   */
  export type GuestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
    /**
     * Filter which Guest to delete.
     */
    where: GuestWhereUniqueInput
  }

  /**
   * Guest deleteMany
   */
  export type GuestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guests to delete
     */
    where?: GuestWhereInput
    /**
     * Limit how many Guests to delete.
     */
    limit?: number
  }

  /**
   * Guest without action
   */
  export type GuestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guest
     */
    select?: GuestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guest
     */
    omit?: GuestOmit<ExtArgs> | null
  }


  /**
   * Model HotelMaster
   */

  export type AggregateHotelMaster = {
    _count: HotelMasterCountAggregateOutputType | null
    _avg: HotelMasterAvgAggregateOutputType | null
    _sum: HotelMasterSumAggregateOutputType | null
    _min: HotelMasterMinAggregateOutputType | null
    _max: HotelMasterMaxAggregateOutputType | null
  }

  export type HotelMasterAvgAggregateOutputType = {
    id: number | null
  }

  export type HotelMasterSumAggregateOutputType = {
    id: number | null
  }

  export type HotelMasterMinAggregateOutputType = {
    id: number | null
    hotelName: string | null
    hotelDescription: string | null
    hotelLogo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HotelMasterMaxAggregateOutputType = {
    id: number | null
    hotelName: string | null
    hotelDescription: string | null
    hotelLogo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HotelMasterCountAggregateOutputType = {
    id: number
    hotelName: number
    hotelDescription: number
    hotelLogo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HotelMasterAvgAggregateInputType = {
    id?: true
  }

  export type HotelMasterSumAggregateInputType = {
    id?: true
  }

  export type HotelMasterMinAggregateInputType = {
    id?: true
    hotelName?: true
    hotelDescription?: true
    hotelLogo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HotelMasterMaxAggregateInputType = {
    id?: true
    hotelName?: true
    hotelDescription?: true
    hotelLogo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HotelMasterCountAggregateInputType = {
    id?: true
    hotelName?: true
    hotelDescription?: true
    hotelLogo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HotelMasterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HotelMaster to aggregate.
     */
    where?: HotelMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HotelMasters to fetch.
     */
    orderBy?: HotelMasterOrderByWithRelationInput | HotelMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HotelMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HotelMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HotelMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HotelMasters
    **/
    _count?: true | HotelMasterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HotelMasterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HotelMasterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HotelMasterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HotelMasterMaxAggregateInputType
  }

  export type GetHotelMasterAggregateType<T extends HotelMasterAggregateArgs> = {
        [P in keyof T & keyof AggregateHotelMaster]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHotelMaster[P]>
      : GetScalarType<T[P], AggregateHotelMaster[P]>
  }




  export type HotelMasterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HotelMasterWhereInput
    orderBy?: HotelMasterOrderByWithAggregationInput | HotelMasterOrderByWithAggregationInput[]
    by: HotelMasterScalarFieldEnum[] | HotelMasterScalarFieldEnum
    having?: HotelMasterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HotelMasterCountAggregateInputType | true
    _avg?: HotelMasterAvgAggregateInputType
    _sum?: HotelMasterSumAggregateInputType
    _min?: HotelMasterMinAggregateInputType
    _max?: HotelMasterMaxAggregateInputType
  }

  export type HotelMasterGroupByOutputType = {
    id: number
    hotelName: string | null
    hotelDescription: string | null
    hotelLogo: string | null
    createdAt: Date
    updatedAt: Date
    _count: HotelMasterCountAggregateOutputType | null
    _avg: HotelMasterAvgAggregateOutputType | null
    _sum: HotelMasterSumAggregateOutputType | null
    _min: HotelMasterMinAggregateOutputType | null
    _max: HotelMasterMaxAggregateOutputType | null
  }

  type GetHotelMasterGroupByPayload<T extends HotelMasterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HotelMasterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HotelMasterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HotelMasterGroupByOutputType[P]>
            : GetScalarType<T[P], HotelMasterGroupByOutputType[P]>
        }
      >
    >


  export type HotelMasterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hotelName?: boolean
    hotelDescription?: boolean
    hotelLogo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["hotelMaster"]>

  export type HotelMasterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hotelName?: boolean
    hotelDescription?: boolean
    hotelLogo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["hotelMaster"]>

  export type HotelMasterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hotelName?: boolean
    hotelDescription?: boolean
    hotelLogo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["hotelMaster"]>

  export type HotelMasterSelectScalar = {
    id?: boolean
    hotelName?: boolean
    hotelDescription?: boolean
    hotelLogo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HotelMasterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hotelName" | "hotelDescription" | "hotelLogo" | "createdAt" | "updatedAt", ExtArgs["result"]["hotelMaster"]>

  export type $HotelMasterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HotelMaster"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hotelName: string | null
      hotelDescription: string | null
      hotelLogo: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["hotelMaster"]>
    composites: {}
  }

  type HotelMasterGetPayload<S extends boolean | null | undefined | HotelMasterDefaultArgs> = $Result.GetResult<Prisma.$HotelMasterPayload, S>

  type HotelMasterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HotelMasterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HotelMasterCountAggregateInputType | true
    }

  export interface HotelMasterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HotelMaster'], meta: { name: 'HotelMaster' } }
    /**
     * Find zero or one HotelMaster that matches the filter.
     * @param {HotelMasterFindUniqueArgs} args - Arguments to find a HotelMaster
     * @example
     * // Get one HotelMaster
     * const hotelMaster = await prisma.hotelMaster.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HotelMasterFindUniqueArgs>(args: SelectSubset<T, HotelMasterFindUniqueArgs<ExtArgs>>): Prisma__HotelMasterClient<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HotelMaster that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HotelMasterFindUniqueOrThrowArgs} args - Arguments to find a HotelMaster
     * @example
     * // Get one HotelMaster
     * const hotelMaster = await prisma.hotelMaster.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HotelMasterFindUniqueOrThrowArgs>(args: SelectSubset<T, HotelMasterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HotelMasterClient<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HotelMaster that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelMasterFindFirstArgs} args - Arguments to find a HotelMaster
     * @example
     * // Get one HotelMaster
     * const hotelMaster = await prisma.hotelMaster.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HotelMasterFindFirstArgs>(args?: SelectSubset<T, HotelMasterFindFirstArgs<ExtArgs>>): Prisma__HotelMasterClient<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HotelMaster that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelMasterFindFirstOrThrowArgs} args - Arguments to find a HotelMaster
     * @example
     * // Get one HotelMaster
     * const hotelMaster = await prisma.hotelMaster.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HotelMasterFindFirstOrThrowArgs>(args?: SelectSubset<T, HotelMasterFindFirstOrThrowArgs<ExtArgs>>): Prisma__HotelMasterClient<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HotelMasters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelMasterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HotelMasters
     * const hotelMasters = await prisma.hotelMaster.findMany()
     * 
     * // Get first 10 HotelMasters
     * const hotelMasters = await prisma.hotelMaster.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hotelMasterWithIdOnly = await prisma.hotelMaster.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HotelMasterFindManyArgs>(args?: SelectSubset<T, HotelMasterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HotelMaster.
     * @param {HotelMasterCreateArgs} args - Arguments to create a HotelMaster.
     * @example
     * // Create one HotelMaster
     * const HotelMaster = await prisma.hotelMaster.create({
     *   data: {
     *     // ... data to create a HotelMaster
     *   }
     * })
     * 
     */
    create<T extends HotelMasterCreateArgs>(args: SelectSubset<T, HotelMasterCreateArgs<ExtArgs>>): Prisma__HotelMasterClient<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HotelMasters.
     * @param {HotelMasterCreateManyArgs} args - Arguments to create many HotelMasters.
     * @example
     * // Create many HotelMasters
     * const hotelMaster = await prisma.hotelMaster.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HotelMasterCreateManyArgs>(args?: SelectSubset<T, HotelMasterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HotelMasters and returns the data saved in the database.
     * @param {HotelMasterCreateManyAndReturnArgs} args - Arguments to create many HotelMasters.
     * @example
     * // Create many HotelMasters
     * const hotelMaster = await prisma.hotelMaster.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HotelMasters and only return the `id`
     * const hotelMasterWithIdOnly = await prisma.hotelMaster.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HotelMasterCreateManyAndReturnArgs>(args?: SelectSubset<T, HotelMasterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HotelMaster.
     * @param {HotelMasterDeleteArgs} args - Arguments to delete one HotelMaster.
     * @example
     * // Delete one HotelMaster
     * const HotelMaster = await prisma.hotelMaster.delete({
     *   where: {
     *     // ... filter to delete one HotelMaster
     *   }
     * })
     * 
     */
    delete<T extends HotelMasterDeleteArgs>(args: SelectSubset<T, HotelMasterDeleteArgs<ExtArgs>>): Prisma__HotelMasterClient<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HotelMaster.
     * @param {HotelMasterUpdateArgs} args - Arguments to update one HotelMaster.
     * @example
     * // Update one HotelMaster
     * const hotelMaster = await prisma.hotelMaster.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HotelMasterUpdateArgs>(args: SelectSubset<T, HotelMasterUpdateArgs<ExtArgs>>): Prisma__HotelMasterClient<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HotelMasters.
     * @param {HotelMasterDeleteManyArgs} args - Arguments to filter HotelMasters to delete.
     * @example
     * // Delete a few HotelMasters
     * const { count } = await prisma.hotelMaster.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HotelMasterDeleteManyArgs>(args?: SelectSubset<T, HotelMasterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HotelMasters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelMasterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HotelMasters
     * const hotelMaster = await prisma.hotelMaster.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HotelMasterUpdateManyArgs>(args: SelectSubset<T, HotelMasterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HotelMasters and returns the data updated in the database.
     * @param {HotelMasterUpdateManyAndReturnArgs} args - Arguments to update many HotelMasters.
     * @example
     * // Update many HotelMasters
     * const hotelMaster = await prisma.hotelMaster.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HotelMasters and only return the `id`
     * const hotelMasterWithIdOnly = await prisma.hotelMaster.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HotelMasterUpdateManyAndReturnArgs>(args: SelectSubset<T, HotelMasterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HotelMaster.
     * @param {HotelMasterUpsertArgs} args - Arguments to update or create a HotelMaster.
     * @example
     * // Update or create a HotelMaster
     * const hotelMaster = await prisma.hotelMaster.upsert({
     *   create: {
     *     // ... data to create a HotelMaster
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HotelMaster we want to update
     *   }
     * })
     */
    upsert<T extends HotelMasterUpsertArgs>(args: SelectSubset<T, HotelMasterUpsertArgs<ExtArgs>>): Prisma__HotelMasterClient<$Result.GetResult<Prisma.$HotelMasterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HotelMasters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelMasterCountArgs} args - Arguments to filter HotelMasters to count.
     * @example
     * // Count the number of HotelMasters
     * const count = await prisma.hotelMaster.count({
     *   where: {
     *     // ... the filter for the HotelMasters we want to count
     *   }
     * })
    **/
    count<T extends HotelMasterCountArgs>(
      args?: Subset<T, HotelMasterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HotelMasterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HotelMaster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelMasterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HotelMasterAggregateArgs>(args: Subset<T, HotelMasterAggregateArgs>): Prisma.PrismaPromise<GetHotelMasterAggregateType<T>>

    /**
     * Group by HotelMaster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelMasterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HotelMasterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HotelMasterGroupByArgs['orderBy'] }
        : { orderBy?: HotelMasterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HotelMasterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHotelMasterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HotelMaster model
   */
  readonly fields: HotelMasterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HotelMaster.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HotelMasterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HotelMaster model
   */
  interface HotelMasterFieldRefs {
    readonly id: FieldRef<"HotelMaster", 'Int'>
    readonly hotelName: FieldRef<"HotelMaster", 'String'>
    readonly hotelDescription: FieldRef<"HotelMaster", 'String'>
    readonly hotelLogo: FieldRef<"HotelMaster", 'String'>
    readonly createdAt: FieldRef<"HotelMaster", 'DateTime'>
    readonly updatedAt: FieldRef<"HotelMaster", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HotelMaster findUnique
   */
  export type HotelMasterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * Filter, which HotelMaster to fetch.
     */
    where: HotelMasterWhereUniqueInput
  }

  /**
   * HotelMaster findUniqueOrThrow
   */
  export type HotelMasterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * Filter, which HotelMaster to fetch.
     */
    where: HotelMasterWhereUniqueInput
  }

  /**
   * HotelMaster findFirst
   */
  export type HotelMasterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * Filter, which HotelMaster to fetch.
     */
    where?: HotelMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HotelMasters to fetch.
     */
    orderBy?: HotelMasterOrderByWithRelationInput | HotelMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HotelMasters.
     */
    cursor?: HotelMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HotelMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HotelMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HotelMasters.
     */
    distinct?: HotelMasterScalarFieldEnum | HotelMasterScalarFieldEnum[]
  }

  /**
   * HotelMaster findFirstOrThrow
   */
  export type HotelMasterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * Filter, which HotelMaster to fetch.
     */
    where?: HotelMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HotelMasters to fetch.
     */
    orderBy?: HotelMasterOrderByWithRelationInput | HotelMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HotelMasters.
     */
    cursor?: HotelMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HotelMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HotelMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HotelMasters.
     */
    distinct?: HotelMasterScalarFieldEnum | HotelMasterScalarFieldEnum[]
  }

  /**
   * HotelMaster findMany
   */
  export type HotelMasterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * Filter, which HotelMasters to fetch.
     */
    where?: HotelMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HotelMasters to fetch.
     */
    orderBy?: HotelMasterOrderByWithRelationInput | HotelMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HotelMasters.
     */
    cursor?: HotelMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HotelMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HotelMasters.
     */
    skip?: number
    distinct?: HotelMasterScalarFieldEnum | HotelMasterScalarFieldEnum[]
  }

  /**
   * HotelMaster create
   */
  export type HotelMasterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * The data needed to create a HotelMaster.
     */
    data?: XOR<HotelMasterCreateInput, HotelMasterUncheckedCreateInput>
  }

  /**
   * HotelMaster createMany
   */
  export type HotelMasterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HotelMasters.
     */
    data: HotelMasterCreateManyInput | HotelMasterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HotelMaster createManyAndReturn
   */
  export type HotelMasterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * The data used to create many HotelMasters.
     */
    data: HotelMasterCreateManyInput | HotelMasterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HotelMaster update
   */
  export type HotelMasterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * The data needed to update a HotelMaster.
     */
    data: XOR<HotelMasterUpdateInput, HotelMasterUncheckedUpdateInput>
    /**
     * Choose, which HotelMaster to update.
     */
    where: HotelMasterWhereUniqueInput
  }

  /**
   * HotelMaster updateMany
   */
  export type HotelMasterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HotelMasters.
     */
    data: XOR<HotelMasterUpdateManyMutationInput, HotelMasterUncheckedUpdateManyInput>
    /**
     * Filter which HotelMasters to update
     */
    where?: HotelMasterWhereInput
    /**
     * Limit how many HotelMasters to update.
     */
    limit?: number
  }

  /**
   * HotelMaster updateManyAndReturn
   */
  export type HotelMasterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * The data used to update HotelMasters.
     */
    data: XOR<HotelMasterUpdateManyMutationInput, HotelMasterUncheckedUpdateManyInput>
    /**
     * Filter which HotelMasters to update
     */
    where?: HotelMasterWhereInput
    /**
     * Limit how many HotelMasters to update.
     */
    limit?: number
  }

  /**
   * HotelMaster upsert
   */
  export type HotelMasterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * The filter to search for the HotelMaster to update in case it exists.
     */
    where: HotelMasterWhereUniqueInput
    /**
     * In case the HotelMaster found by the `where` argument doesn't exist, create a new HotelMaster with this data.
     */
    create: XOR<HotelMasterCreateInput, HotelMasterUncheckedCreateInput>
    /**
     * In case the HotelMaster was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HotelMasterUpdateInput, HotelMasterUncheckedUpdateInput>
  }

  /**
   * HotelMaster delete
   */
  export type HotelMasterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
    /**
     * Filter which HotelMaster to delete.
     */
    where: HotelMasterWhereUniqueInput
  }

  /**
   * HotelMaster deleteMany
   */
  export type HotelMasterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HotelMasters to delete
     */
    where?: HotelMasterWhereInput
    /**
     * Limit how many HotelMasters to delete.
     */
    limit?: number
  }

  /**
   * HotelMaster without action
   */
  export type HotelMasterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HotelMaster
     */
    select?: HotelMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HotelMaster
     */
    omit?: HotelMasterOmit<ExtArgs> | null
  }


  /**
   * Model RoomImage
   */

  export type AggregateRoomImage = {
    _count: RoomImageCountAggregateOutputType | null
    _avg: RoomImageAvgAggregateOutputType | null
    _sum: RoomImageSumAggregateOutputType | null
    _min: RoomImageMinAggregateOutputType | null
    _max: RoomImageMaxAggregateOutputType | null
  }

  export type RoomImageAvgAggregateOutputType = {
    id: number | null
    roomTypeId: number | null
    imageOrder: number | null
  }

  export type RoomImageSumAggregateOutputType = {
    id: number | null
    roomTypeId: number | null
    imageOrder: number | null
  }

  export type RoomImageMinAggregateOutputType = {
    id: number | null
    roomTypeId: number | null
    imageUrl: string | null
    imagePublicId: string | null
    imageOrder: number | null
    imageDefault: boolean | null
  }

  export type RoomImageMaxAggregateOutputType = {
    id: number | null
    roomTypeId: number | null
    imageUrl: string | null
    imagePublicId: string | null
    imageOrder: number | null
    imageDefault: boolean | null
  }

  export type RoomImageCountAggregateOutputType = {
    id: number
    roomTypeId: number
    imageUrl: number
    imagePublicId: number
    imageOrder: number
    imageDefault: number
    _all: number
  }


  export type RoomImageAvgAggregateInputType = {
    id?: true
    roomTypeId?: true
    imageOrder?: true
  }

  export type RoomImageSumAggregateInputType = {
    id?: true
    roomTypeId?: true
    imageOrder?: true
  }

  export type RoomImageMinAggregateInputType = {
    id?: true
    roomTypeId?: true
    imageUrl?: true
    imagePublicId?: true
    imageOrder?: true
    imageDefault?: true
  }

  export type RoomImageMaxAggregateInputType = {
    id?: true
    roomTypeId?: true
    imageUrl?: true
    imagePublicId?: true
    imageOrder?: true
    imageDefault?: true
  }

  export type RoomImageCountAggregateInputType = {
    id?: true
    roomTypeId?: true
    imageUrl?: true
    imagePublicId?: true
    imageOrder?: true
    imageDefault?: true
    _all?: true
  }

  export type RoomImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomImage to aggregate.
     */
    where?: RoomImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomImages to fetch.
     */
    orderBy?: RoomImageOrderByWithRelationInput | RoomImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomImages
    **/
    _count?: true | RoomImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomImageMaxAggregateInputType
  }

  export type GetRoomImageAggregateType<T extends RoomImageAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomImage[P]>
      : GetScalarType<T[P], AggregateRoomImage[P]>
  }




  export type RoomImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomImageWhereInput
    orderBy?: RoomImageOrderByWithAggregationInput | RoomImageOrderByWithAggregationInput[]
    by: RoomImageScalarFieldEnum[] | RoomImageScalarFieldEnum
    having?: RoomImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomImageCountAggregateInputType | true
    _avg?: RoomImageAvgAggregateInputType
    _sum?: RoomImageSumAggregateInputType
    _min?: RoomImageMinAggregateInputType
    _max?: RoomImageMaxAggregateInputType
  }

  export type RoomImageGroupByOutputType = {
    id: number
    roomTypeId: number | null
    imageUrl: string | null
    imagePublicId: string | null
    imageOrder: number | null
    imageDefault: boolean | null
    _count: RoomImageCountAggregateOutputType | null
    _avg: RoomImageAvgAggregateOutputType | null
    _sum: RoomImageSumAggregateOutputType | null
    _min: RoomImageMinAggregateOutputType | null
    _max: RoomImageMaxAggregateOutputType | null
  }

  type GetRoomImageGroupByPayload<T extends RoomImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomImageGroupByOutputType[P]>
            : GetScalarType<T[P], RoomImageGroupByOutputType[P]>
        }
      >
    >


  export type RoomImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomTypeId?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    imageOrder?: boolean
    imageDefault?: boolean
    roomType?: boolean | RoomImage$roomTypeArgs<ExtArgs>
  }, ExtArgs["result"]["roomImage"]>

  export type RoomImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomTypeId?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    imageOrder?: boolean
    imageDefault?: boolean
    roomType?: boolean | RoomImage$roomTypeArgs<ExtArgs>
  }, ExtArgs["result"]["roomImage"]>

  export type RoomImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomTypeId?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    imageOrder?: boolean
    imageDefault?: boolean
    roomType?: boolean | RoomImage$roomTypeArgs<ExtArgs>
  }, ExtArgs["result"]["roomImage"]>

  export type RoomImageSelectScalar = {
    id?: boolean
    roomTypeId?: boolean
    imageUrl?: boolean
    imagePublicId?: boolean
    imageOrder?: boolean
    imageDefault?: boolean
  }

  export type RoomImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomTypeId" | "imageUrl" | "imagePublicId" | "imageOrder" | "imageDefault", ExtArgs["result"]["roomImage"]>
  export type RoomImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | RoomImage$roomTypeArgs<ExtArgs>
  }
  export type RoomImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | RoomImage$roomTypeArgs<ExtArgs>
  }
  export type RoomImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roomType?: boolean | RoomImage$roomTypeArgs<ExtArgs>
  }

  export type $RoomImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomImage"
    objects: {
      roomType: Prisma.$RoomTypePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      roomTypeId: number | null
      imageUrl: string | null
      imagePublicId: string | null
      imageOrder: number | null
      imageDefault: boolean | null
    }, ExtArgs["result"]["roomImage"]>
    composites: {}
  }

  type RoomImageGetPayload<S extends boolean | null | undefined | RoomImageDefaultArgs> = $Result.GetResult<Prisma.$RoomImagePayload, S>

  type RoomImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomImageCountAggregateInputType | true
    }

  export interface RoomImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomImage'], meta: { name: 'RoomImage' } }
    /**
     * Find zero or one RoomImage that matches the filter.
     * @param {RoomImageFindUniqueArgs} args - Arguments to find a RoomImage
     * @example
     * // Get one RoomImage
     * const roomImage = await prisma.roomImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomImageFindUniqueArgs>(args: SelectSubset<T, RoomImageFindUniqueArgs<ExtArgs>>): Prisma__RoomImageClient<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomImageFindUniqueOrThrowArgs} args - Arguments to find a RoomImage
     * @example
     * // Get one RoomImage
     * const roomImage = await prisma.roomImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomImageFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomImageClient<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomImageFindFirstArgs} args - Arguments to find a RoomImage
     * @example
     * // Get one RoomImage
     * const roomImage = await prisma.roomImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomImageFindFirstArgs>(args?: SelectSubset<T, RoomImageFindFirstArgs<ExtArgs>>): Prisma__RoomImageClient<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomImageFindFirstOrThrowArgs} args - Arguments to find a RoomImage
     * @example
     * // Get one RoomImage
     * const roomImage = await prisma.roomImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomImageFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomImageClient<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomImages
     * const roomImages = await prisma.roomImage.findMany()
     * 
     * // Get first 10 RoomImages
     * const roomImages = await prisma.roomImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomImageWithIdOnly = await prisma.roomImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomImageFindManyArgs>(args?: SelectSubset<T, RoomImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomImage.
     * @param {RoomImageCreateArgs} args - Arguments to create a RoomImage.
     * @example
     * // Create one RoomImage
     * const RoomImage = await prisma.roomImage.create({
     *   data: {
     *     // ... data to create a RoomImage
     *   }
     * })
     * 
     */
    create<T extends RoomImageCreateArgs>(args: SelectSubset<T, RoomImageCreateArgs<ExtArgs>>): Prisma__RoomImageClient<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomImages.
     * @param {RoomImageCreateManyArgs} args - Arguments to create many RoomImages.
     * @example
     * // Create many RoomImages
     * const roomImage = await prisma.roomImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomImageCreateManyArgs>(args?: SelectSubset<T, RoomImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomImages and returns the data saved in the database.
     * @param {RoomImageCreateManyAndReturnArgs} args - Arguments to create many RoomImages.
     * @example
     * // Create many RoomImages
     * const roomImage = await prisma.roomImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomImages and only return the `id`
     * const roomImageWithIdOnly = await prisma.roomImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomImageCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomImage.
     * @param {RoomImageDeleteArgs} args - Arguments to delete one RoomImage.
     * @example
     * // Delete one RoomImage
     * const RoomImage = await prisma.roomImage.delete({
     *   where: {
     *     // ... filter to delete one RoomImage
     *   }
     * })
     * 
     */
    delete<T extends RoomImageDeleteArgs>(args: SelectSubset<T, RoomImageDeleteArgs<ExtArgs>>): Prisma__RoomImageClient<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomImage.
     * @param {RoomImageUpdateArgs} args - Arguments to update one RoomImage.
     * @example
     * // Update one RoomImage
     * const roomImage = await prisma.roomImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomImageUpdateArgs>(args: SelectSubset<T, RoomImageUpdateArgs<ExtArgs>>): Prisma__RoomImageClient<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomImages.
     * @param {RoomImageDeleteManyArgs} args - Arguments to filter RoomImages to delete.
     * @example
     * // Delete a few RoomImages
     * const { count } = await prisma.roomImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomImageDeleteManyArgs>(args?: SelectSubset<T, RoomImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomImages
     * const roomImage = await prisma.roomImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomImageUpdateManyArgs>(args: SelectSubset<T, RoomImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomImages and returns the data updated in the database.
     * @param {RoomImageUpdateManyAndReturnArgs} args - Arguments to update many RoomImages.
     * @example
     * // Update many RoomImages
     * const roomImage = await prisma.roomImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomImages and only return the `id`
     * const roomImageWithIdOnly = await prisma.roomImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomImageUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomImage.
     * @param {RoomImageUpsertArgs} args - Arguments to update or create a RoomImage.
     * @example
     * // Update or create a RoomImage
     * const roomImage = await prisma.roomImage.upsert({
     *   create: {
     *     // ... data to create a RoomImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomImage we want to update
     *   }
     * })
     */
    upsert<T extends RoomImageUpsertArgs>(args: SelectSubset<T, RoomImageUpsertArgs<ExtArgs>>): Prisma__RoomImageClient<$Result.GetResult<Prisma.$RoomImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomImageCountArgs} args - Arguments to filter RoomImages to count.
     * @example
     * // Count the number of RoomImages
     * const count = await prisma.roomImage.count({
     *   where: {
     *     // ... the filter for the RoomImages we want to count
     *   }
     * })
    **/
    count<T extends RoomImageCountArgs>(
      args?: Subset<T, RoomImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomImageAggregateArgs>(args: Subset<T, RoomImageAggregateArgs>): Prisma.PrismaPromise<GetRoomImageAggregateType<T>>

    /**
     * Group by RoomImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomImageGroupByArgs['orderBy'] }
        : { orderBy?: RoomImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomImage model
   */
  readonly fields: RoomImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roomType<T extends RoomImage$roomTypeArgs<ExtArgs> = {}>(args?: Subset<T, RoomImage$roomTypeArgs<ExtArgs>>): Prisma__RoomTypeClient<$Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomImage model
   */
  interface RoomImageFieldRefs {
    readonly id: FieldRef<"RoomImage", 'Int'>
    readonly roomTypeId: FieldRef<"RoomImage", 'Int'>
    readonly imageUrl: FieldRef<"RoomImage", 'String'>
    readonly imagePublicId: FieldRef<"RoomImage", 'String'>
    readonly imageOrder: FieldRef<"RoomImage", 'Int'>
    readonly imageDefault: FieldRef<"RoomImage", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * RoomImage findUnique
   */
  export type RoomImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
    /**
     * Filter, which RoomImage to fetch.
     */
    where: RoomImageWhereUniqueInput
  }

  /**
   * RoomImage findUniqueOrThrow
   */
  export type RoomImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
    /**
     * Filter, which RoomImage to fetch.
     */
    where: RoomImageWhereUniqueInput
  }

  /**
   * RoomImage findFirst
   */
  export type RoomImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
    /**
     * Filter, which RoomImage to fetch.
     */
    where?: RoomImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomImages to fetch.
     */
    orderBy?: RoomImageOrderByWithRelationInput | RoomImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomImages.
     */
    cursor?: RoomImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomImages.
     */
    distinct?: RoomImageScalarFieldEnum | RoomImageScalarFieldEnum[]
  }

  /**
   * RoomImage findFirstOrThrow
   */
  export type RoomImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
    /**
     * Filter, which RoomImage to fetch.
     */
    where?: RoomImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomImages to fetch.
     */
    orderBy?: RoomImageOrderByWithRelationInput | RoomImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomImages.
     */
    cursor?: RoomImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomImages.
     */
    distinct?: RoomImageScalarFieldEnum | RoomImageScalarFieldEnum[]
  }

  /**
   * RoomImage findMany
   */
  export type RoomImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
    /**
     * Filter, which RoomImages to fetch.
     */
    where?: RoomImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomImages to fetch.
     */
    orderBy?: RoomImageOrderByWithRelationInput | RoomImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomImages.
     */
    cursor?: RoomImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomImages.
     */
    skip?: number
    distinct?: RoomImageScalarFieldEnum | RoomImageScalarFieldEnum[]
  }

  /**
   * RoomImage create
   */
  export type RoomImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomImage.
     */
    data?: XOR<RoomImageCreateInput, RoomImageUncheckedCreateInput>
  }

  /**
   * RoomImage createMany
   */
  export type RoomImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomImages.
     */
    data: RoomImageCreateManyInput | RoomImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomImage createManyAndReturn
   */
  export type RoomImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * The data used to create many RoomImages.
     */
    data: RoomImageCreateManyInput | RoomImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomImage update
   */
  export type RoomImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomImage.
     */
    data: XOR<RoomImageUpdateInput, RoomImageUncheckedUpdateInput>
    /**
     * Choose, which RoomImage to update.
     */
    where: RoomImageWhereUniqueInput
  }

  /**
   * RoomImage updateMany
   */
  export type RoomImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomImages.
     */
    data: XOR<RoomImageUpdateManyMutationInput, RoomImageUncheckedUpdateManyInput>
    /**
     * Filter which RoomImages to update
     */
    where?: RoomImageWhereInput
    /**
     * Limit how many RoomImages to update.
     */
    limit?: number
  }

  /**
   * RoomImage updateManyAndReturn
   */
  export type RoomImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * The data used to update RoomImages.
     */
    data: XOR<RoomImageUpdateManyMutationInput, RoomImageUncheckedUpdateManyInput>
    /**
     * Filter which RoomImages to update
     */
    where?: RoomImageWhereInput
    /**
     * Limit how many RoomImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomImage upsert
   */
  export type RoomImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomImage to update in case it exists.
     */
    where: RoomImageWhereUniqueInput
    /**
     * In case the RoomImage found by the `where` argument doesn't exist, create a new RoomImage with this data.
     */
    create: XOR<RoomImageCreateInput, RoomImageUncheckedCreateInput>
    /**
     * In case the RoomImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomImageUpdateInput, RoomImageUncheckedUpdateInput>
  }

  /**
   * RoomImage delete
   */
  export type RoomImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
    /**
     * Filter which RoomImage to delete.
     */
    where: RoomImageWhereUniqueInput
  }

  /**
   * RoomImage deleteMany
   */
  export type RoomImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomImages to delete
     */
    where?: RoomImageWhereInput
    /**
     * Limit how many RoomImages to delete.
     */
    limit?: number
  }

  /**
   * RoomImage.roomType
   */
  export type RoomImage$roomTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomType
     */
    select?: RoomTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomType
     */
    omit?: RoomTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomTypeInclude<ExtArgs> | null
    where?: RoomTypeWhereInput
  }

  /**
   * RoomImage without action
   */
  export type RoomImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomImage
     */
    select?: RoomImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomImage
     */
    omit?: RoomImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomImageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    email: 'email',
    passwordHash: 'passwordHash',
    phone: 'phone',
    profilePicture: 'profilePicture',
    profilePicturePublicId: 'profilePicturePublicId',
    country: 'country',
    dateOfBirth: 'dateOfBirth',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BedTypeScalarFieldEnum: {
    id: 'id',
    bedDescription: 'bedDescription',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BedTypeScalarFieldEnum = (typeof BedTypeScalarFieldEnum)[keyof typeof BedTypeScalarFieldEnum]


  export const RoomStatusScalarFieldEnum: {
    id: 'id',
    statusName: 'statusName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomStatusScalarFieldEnum = (typeof RoomStatusScalarFieldEnum)[keyof typeof RoomStatusScalarFieldEnum]


  export const RoomTypeScalarFieldEnum: {
    id: 'id',
    bedTypeId: 'bedTypeId',
    name: 'name',
    description: 'description',
    capacity: 'capacity',
    roomSize: 'roomSize',
    pricePerNight: 'pricePerNight',
    promotionPrice: 'promotionPrice',
    isPromotion: 'isPromotion',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomTypeScalarFieldEnum = (typeof RoomTypeScalarFieldEnum)[keyof typeof RoomTypeScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    roomNumber: 'roomNumber',
    roomTypeId: 'roomTypeId',
    roomStatusId: 'roomStatusId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const RoomAmnietyScalarFieldEnum: {
    id: 'id',
    roomTypeId: 'roomTypeId',
    name: 'name',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomAmnietyScalarFieldEnum = (typeof RoomAmnietyScalarFieldEnum)[keyof typeof RoomAmnietyScalarFieldEnum]


  export const GuestScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    country: 'country',
    dateOfBirth: 'dateOfBirth',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GuestScalarFieldEnum = (typeof GuestScalarFieldEnum)[keyof typeof GuestScalarFieldEnum]


  export const HotelMasterScalarFieldEnum: {
    id: 'id',
    hotelName: 'hotelName',
    hotelDescription: 'hotelDescription',
    hotelLogo: 'hotelLogo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HotelMasterScalarFieldEnum = (typeof HotelMasterScalarFieldEnum)[keyof typeof HotelMasterScalarFieldEnum]


  export const RoomImageScalarFieldEnum: {
    id: 'id',
    roomTypeId: 'roomTypeId',
    imageUrl: 'imageUrl',
    imagePublicId: 'imagePublicId',
    imageOrder: 'imageOrder',
    imageDefault: 'imageDefault'
  };

  export type RoomImageScalarFieldEnum = (typeof RoomImageScalarFieldEnum)[keyof typeof RoomImageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    profilePicture?: StringNullableFilter<"User"> | string | null
    profilePicturePublicId?: StringNullableFilter<"User"> | string | null
    country?: StringFilter<"User"> | string
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    phone?: SortOrderInput | SortOrder
    profilePicture?: SortOrderInput | SortOrder
    profilePicturePublicId?: SortOrderInput | SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    profilePicture?: StringNullableFilter<"User"> | string | null
    profilePicturePublicId?: StringNullableFilter<"User"> | string | null
    country?: StringFilter<"User"> | string
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    phone?: SortOrderInput | SortOrder
    profilePicture?: SortOrderInput | SortOrder
    profilePicturePublicId?: SortOrderInput | SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    profilePicture?: StringNullableWithAggregatesFilter<"User"> | string | null
    profilePicturePublicId?: StringNullableWithAggregatesFilter<"User"> | string | null
    country?: StringWithAggregatesFilter<"User"> | string
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BedTypeWhereInput = {
    AND?: BedTypeWhereInput | BedTypeWhereInput[]
    OR?: BedTypeWhereInput[]
    NOT?: BedTypeWhereInput | BedTypeWhereInput[]
    id?: IntFilter<"BedType"> | number
    bedDescription?: StringNullableFilter<"BedType"> | string | null
    createdAt?: DateTimeFilter<"BedType"> | Date | string
    updatedAt?: DateTimeFilter<"BedType"> | Date | string
    roomTypes?: RoomTypeListRelationFilter
  }

  export type BedTypeOrderByWithRelationInput = {
    id?: SortOrder
    bedDescription?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roomTypes?: RoomTypeOrderByRelationAggregateInput
  }

  export type BedTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BedTypeWhereInput | BedTypeWhereInput[]
    OR?: BedTypeWhereInput[]
    NOT?: BedTypeWhereInput | BedTypeWhereInput[]
    bedDescription?: StringNullableFilter<"BedType"> | string | null
    createdAt?: DateTimeFilter<"BedType"> | Date | string
    updatedAt?: DateTimeFilter<"BedType"> | Date | string
    roomTypes?: RoomTypeListRelationFilter
  }, "id">

  export type BedTypeOrderByWithAggregationInput = {
    id?: SortOrder
    bedDescription?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BedTypeCountOrderByAggregateInput
    _avg?: BedTypeAvgOrderByAggregateInput
    _max?: BedTypeMaxOrderByAggregateInput
    _min?: BedTypeMinOrderByAggregateInput
    _sum?: BedTypeSumOrderByAggregateInput
  }

  export type BedTypeScalarWhereWithAggregatesInput = {
    AND?: BedTypeScalarWhereWithAggregatesInput | BedTypeScalarWhereWithAggregatesInput[]
    OR?: BedTypeScalarWhereWithAggregatesInput[]
    NOT?: BedTypeScalarWhereWithAggregatesInput | BedTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BedType"> | number
    bedDescription?: StringNullableWithAggregatesFilter<"BedType"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BedType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BedType"> | Date | string
  }

  export type RoomStatusWhereInput = {
    AND?: RoomStatusWhereInput | RoomStatusWhereInput[]
    OR?: RoomStatusWhereInput[]
    NOT?: RoomStatusWhereInput | RoomStatusWhereInput[]
    id?: IntFilter<"RoomStatus"> | number
    statusName?: StringNullableFilter<"RoomStatus"> | string | null
    createdAt?: DateTimeFilter<"RoomStatus"> | Date | string
    updatedAt?: DateTimeFilter<"RoomStatus"> | Date | string
    rooms?: RoomListRelationFilter
  }

  export type RoomStatusOrderByWithRelationInput = {
    id?: SortOrder
    statusName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rooms?: RoomOrderByRelationAggregateInput
  }

  export type RoomStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RoomStatusWhereInput | RoomStatusWhereInput[]
    OR?: RoomStatusWhereInput[]
    NOT?: RoomStatusWhereInput | RoomStatusWhereInput[]
    statusName?: StringNullableFilter<"RoomStatus"> | string | null
    createdAt?: DateTimeFilter<"RoomStatus"> | Date | string
    updatedAt?: DateTimeFilter<"RoomStatus"> | Date | string
    rooms?: RoomListRelationFilter
  }, "id">

  export type RoomStatusOrderByWithAggregationInput = {
    id?: SortOrder
    statusName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomStatusCountOrderByAggregateInput
    _avg?: RoomStatusAvgOrderByAggregateInput
    _max?: RoomStatusMaxOrderByAggregateInput
    _min?: RoomStatusMinOrderByAggregateInput
    _sum?: RoomStatusSumOrderByAggregateInput
  }

  export type RoomStatusScalarWhereWithAggregatesInput = {
    AND?: RoomStatusScalarWhereWithAggregatesInput | RoomStatusScalarWhereWithAggregatesInput[]
    OR?: RoomStatusScalarWhereWithAggregatesInput[]
    NOT?: RoomStatusScalarWhereWithAggregatesInput | RoomStatusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RoomStatus"> | number
    statusName?: StringNullableWithAggregatesFilter<"RoomStatus"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RoomStatus"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoomStatus"> | Date | string
  }

  export type RoomTypeWhereInput = {
    AND?: RoomTypeWhereInput | RoomTypeWhereInput[]
    OR?: RoomTypeWhereInput[]
    NOT?: RoomTypeWhereInput | RoomTypeWhereInput[]
    id?: IntFilter<"RoomType"> | number
    bedTypeId?: IntNullableFilter<"RoomType"> | number | null
    name?: StringNullableFilter<"RoomType"> | string | null
    description?: StringNullableFilter<"RoomType"> | string | null
    capacity?: IntNullableFilter<"RoomType"> | number | null
    roomSize?: IntNullableFilter<"RoomType"> | number | null
    pricePerNight?: DecimalNullableFilter<"RoomType"> | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: DecimalNullableFilter<"RoomType"> | Decimal | DecimalJsLike | number | string | null
    isPromotion?: BoolNullableFilter<"RoomType"> | boolean | null
    imageUrl?: StringNullableFilter<"RoomType"> | string | null
    createdAt?: DateTimeFilter<"RoomType"> | Date | string
    updatedAt?: DateTimeFilter<"RoomType"> | Date | string
    bedType?: XOR<BedTypeNullableScalarRelationFilter, BedTypeWhereInput> | null
    rooms?: RoomListRelationFilter
    roomImages?: RoomImageListRelationFilter
    roomAmniety?: RoomAmnietyListRelationFilter
  }

  export type RoomTypeOrderByWithRelationInput = {
    id?: SortOrder
    bedTypeId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    capacity?: SortOrderInput | SortOrder
    roomSize?: SortOrderInput | SortOrder
    pricePerNight?: SortOrderInput | SortOrder
    promotionPrice?: SortOrderInput | SortOrder
    isPromotion?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bedType?: BedTypeOrderByWithRelationInput
    rooms?: RoomOrderByRelationAggregateInput
    roomImages?: RoomImageOrderByRelationAggregateInput
    roomAmniety?: RoomAmnietyOrderByRelationAggregateInput
  }

  export type RoomTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RoomTypeWhereInput | RoomTypeWhereInput[]
    OR?: RoomTypeWhereInput[]
    NOT?: RoomTypeWhereInput | RoomTypeWhereInput[]
    bedTypeId?: IntNullableFilter<"RoomType"> | number | null
    name?: StringNullableFilter<"RoomType"> | string | null
    description?: StringNullableFilter<"RoomType"> | string | null
    capacity?: IntNullableFilter<"RoomType"> | number | null
    roomSize?: IntNullableFilter<"RoomType"> | number | null
    pricePerNight?: DecimalNullableFilter<"RoomType"> | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: DecimalNullableFilter<"RoomType"> | Decimal | DecimalJsLike | number | string | null
    isPromotion?: BoolNullableFilter<"RoomType"> | boolean | null
    imageUrl?: StringNullableFilter<"RoomType"> | string | null
    createdAt?: DateTimeFilter<"RoomType"> | Date | string
    updatedAt?: DateTimeFilter<"RoomType"> | Date | string
    bedType?: XOR<BedTypeNullableScalarRelationFilter, BedTypeWhereInput> | null
    rooms?: RoomListRelationFilter
    roomImages?: RoomImageListRelationFilter
    roomAmniety?: RoomAmnietyListRelationFilter
  }, "id">

  export type RoomTypeOrderByWithAggregationInput = {
    id?: SortOrder
    bedTypeId?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    capacity?: SortOrderInput | SortOrder
    roomSize?: SortOrderInput | SortOrder
    pricePerNight?: SortOrderInput | SortOrder
    promotionPrice?: SortOrderInput | SortOrder
    isPromotion?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomTypeCountOrderByAggregateInput
    _avg?: RoomTypeAvgOrderByAggregateInput
    _max?: RoomTypeMaxOrderByAggregateInput
    _min?: RoomTypeMinOrderByAggregateInput
    _sum?: RoomTypeSumOrderByAggregateInput
  }

  export type RoomTypeScalarWhereWithAggregatesInput = {
    AND?: RoomTypeScalarWhereWithAggregatesInput | RoomTypeScalarWhereWithAggregatesInput[]
    OR?: RoomTypeScalarWhereWithAggregatesInput[]
    NOT?: RoomTypeScalarWhereWithAggregatesInput | RoomTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RoomType"> | number
    bedTypeId?: IntNullableWithAggregatesFilter<"RoomType"> | number | null
    name?: StringNullableWithAggregatesFilter<"RoomType"> | string | null
    description?: StringNullableWithAggregatesFilter<"RoomType"> | string | null
    capacity?: IntNullableWithAggregatesFilter<"RoomType"> | number | null
    roomSize?: IntNullableWithAggregatesFilter<"RoomType"> | number | null
    pricePerNight?: DecimalNullableWithAggregatesFilter<"RoomType"> | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: DecimalNullableWithAggregatesFilter<"RoomType"> | Decimal | DecimalJsLike | number | string | null
    isPromotion?: BoolNullableWithAggregatesFilter<"RoomType"> | boolean | null
    imageUrl?: StringNullableWithAggregatesFilter<"RoomType"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RoomType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoomType"> | Date | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: IntFilter<"Room"> | number
    roomNumber?: StringNullableFilter<"Room"> | string | null
    roomTypeId?: IntNullableFilter<"Room"> | number | null
    roomStatusId?: IntNullableFilter<"Room"> | number | null
    notes?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    roomType?: XOR<RoomTypeNullableScalarRelationFilter, RoomTypeWhereInput> | null
    roomStatus?: XOR<RoomStatusNullableScalarRelationFilter, RoomStatusWhereInput> | null
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    roomNumber?: SortOrderInput | SortOrder
    roomTypeId?: SortOrderInput | SortOrder
    roomStatusId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roomType?: RoomTypeOrderByWithRelationInput
    roomStatus?: RoomStatusOrderByWithRelationInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    roomNumber?: StringNullableFilter<"Room"> | string | null
    roomTypeId?: IntNullableFilter<"Room"> | number | null
    roomStatusId?: IntNullableFilter<"Room"> | number | null
    notes?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    roomType?: XOR<RoomTypeNullableScalarRelationFilter, RoomTypeWhereInput> | null
    roomStatus?: XOR<RoomStatusNullableScalarRelationFilter, RoomStatusWhereInput> | null
  }, "id">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    roomNumber?: SortOrderInput | SortOrder
    roomTypeId?: SortOrderInput | SortOrder
    roomStatusId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Room"> | number
    roomNumber?: StringNullableWithAggregatesFilter<"Room"> | string | null
    roomTypeId?: IntNullableWithAggregatesFilter<"Room"> | number | null
    roomStatusId?: IntNullableWithAggregatesFilter<"Room"> | number | null
    notes?: StringNullableWithAggregatesFilter<"Room"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type RoomAmnietyWhereInput = {
    AND?: RoomAmnietyWhereInput | RoomAmnietyWhereInput[]
    OR?: RoomAmnietyWhereInput[]
    NOT?: RoomAmnietyWhereInput | RoomAmnietyWhereInput[]
    id?: IntFilter<"RoomAmniety"> | number
    roomTypeId?: IntNullableFilter<"RoomAmniety"> | number | null
    name?: StringFilter<"RoomAmniety"> | string
    order?: IntFilter<"RoomAmniety"> | number
    createdAt?: DateTimeFilter<"RoomAmniety"> | Date | string
    updatedAt?: DateTimeFilter<"RoomAmniety"> | Date | string
    roomType?: XOR<RoomTypeNullableScalarRelationFilter, RoomTypeWhereInput> | null
  }

  export type RoomAmnietyOrderByWithRelationInput = {
    id?: SortOrder
    roomTypeId?: SortOrderInput | SortOrder
    name?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roomType?: RoomTypeOrderByWithRelationInput
  }

  export type RoomAmnietyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RoomAmnietyWhereInput | RoomAmnietyWhereInput[]
    OR?: RoomAmnietyWhereInput[]
    NOT?: RoomAmnietyWhereInput | RoomAmnietyWhereInput[]
    roomTypeId?: IntNullableFilter<"RoomAmniety"> | number | null
    name?: StringFilter<"RoomAmniety"> | string
    order?: IntFilter<"RoomAmniety"> | number
    createdAt?: DateTimeFilter<"RoomAmniety"> | Date | string
    updatedAt?: DateTimeFilter<"RoomAmniety"> | Date | string
    roomType?: XOR<RoomTypeNullableScalarRelationFilter, RoomTypeWhereInput> | null
  }, "id">

  export type RoomAmnietyOrderByWithAggregationInput = {
    id?: SortOrder
    roomTypeId?: SortOrderInput | SortOrder
    name?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomAmnietyCountOrderByAggregateInput
    _avg?: RoomAmnietyAvgOrderByAggregateInput
    _max?: RoomAmnietyMaxOrderByAggregateInput
    _min?: RoomAmnietyMinOrderByAggregateInput
    _sum?: RoomAmnietySumOrderByAggregateInput
  }

  export type RoomAmnietyScalarWhereWithAggregatesInput = {
    AND?: RoomAmnietyScalarWhereWithAggregatesInput | RoomAmnietyScalarWhereWithAggregatesInput[]
    OR?: RoomAmnietyScalarWhereWithAggregatesInput[]
    NOT?: RoomAmnietyScalarWhereWithAggregatesInput | RoomAmnietyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RoomAmniety"> | number
    roomTypeId?: IntNullableWithAggregatesFilter<"RoomAmniety"> | number | null
    name?: StringWithAggregatesFilter<"RoomAmniety"> | string
    order?: IntWithAggregatesFilter<"RoomAmniety"> | number
    createdAt?: DateTimeWithAggregatesFilter<"RoomAmniety"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoomAmniety"> | Date | string
  }

  export type GuestWhereInput = {
    AND?: GuestWhereInput | GuestWhereInput[]
    OR?: GuestWhereInput[]
    NOT?: GuestWhereInput | GuestWhereInput[]
    id?: IntFilter<"Guest"> | number
    firstName?: StringNullableFilter<"Guest"> | string | null
    lastName?: StringNullableFilter<"Guest"> | string | null
    email?: StringNullableFilter<"Guest"> | string | null
    phone?: StringNullableFilter<"Guest"> | string | null
    country?: StringNullableFilter<"Guest"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Guest"> | Date | string | null
    createdAt?: DateTimeFilter<"Guest"> | Date | string
    updatedAt?: DateTimeFilter<"Guest"> | Date | string
  }

  export type GuestOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GuestWhereInput | GuestWhereInput[]
    OR?: GuestWhereInput[]
    NOT?: GuestWhereInput | GuestWhereInput[]
    firstName?: StringNullableFilter<"Guest"> | string | null
    lastName?: StringNullableFilter<"Guest"> | string | null
    email?: StringNullableFilter<"Guest"> | string | null
    phone?: StringNullableFilter<"Guest"> | string | null
    country?: StringNullableFilter<"Guest"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Guest"> | Date | string | null
    createdAt?: DateTimeFilter<"Guest"> | Date | string
    updatedAt?: DateTimeFilter<"Guest"> | Date | string
  }, "id">

  export type GuestOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GuestCountOrderByAggregateInput
    _avg?: GuestAvgOrderByAggregateInput
    _max?: GuestMaxOrderByAggregateInput
    _min?: GuestMinOrderByAggregateInput
    _sum?: GuestSumOrderByAggregateInput
  }

  export type GuestScalarWhereWithAggregatesInput = {
    AND?: GuestScalarWhereWithAggregatesInput | GuestScalarWhereWithAggregatesInput[]
    OR?: GuestScalarWhereWithAggregatesInput[]
    NOT?: GuestScalarWhereWithAggregatesInput | GuestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Guest"> | number
    firstName?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    email?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    country?: StringNullableWithAggregatesFilter<"Guest"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Guest"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Guest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Guest"> | Date | string
  }

  export type HotelMasterWhereInput = {
    AND?: HotelMasterWhereInput | HotelMasterWhereInput[]
    OR?: HotelMasterWhereInput[]
    NOT?: HotelMasterWhereInput | HotelMasterWhereInput[]
    id?: IntFilter<"HotelMaster"> | number
    hotelName?: StringNullableFilter<"HotelMaster"> | string | null
    hotelDescription?: StringNullableFilter<"HotelMaster"> | string | null
    hotelLogo?: StringNullableFilter<"HotelMaster"> | string | null
    createdAt?: DateTimeFilter<"HotelMaster"> | Date | string
    updatedAt?: DateTimeFilter<"HotelMaster"> | Date | string
  }

  export type HotelMasterOrderByWithRelationInput = {
    id?: SortOrder
    hotelName?: SortOrderInput | SortOrder
    hotelDescription?: SortOrderInput | SortOrder
    hotelLogo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HotelMasterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HotelMasterWhereInput | HotelMasterWhereInput[]
    OR?: HotelMasterWhereInput[]
    NOT?: HotelMasterWhereInput | HotelMasterWhereInput[]
    hotelName?: StringNullableFilter<"HotelMaster"> | string | null
    hotelDescription?: StringNullableFilter<"HotelMaster"> | string | null
    hotelLogo?: StringNullableFilter<"HotelMaster"> | string | null
    createdAt?: DateTimeFilter<"HotelMaster"> | Date | string
    updatedAt?: DateTimeFilter<"HotelMaster"> | Date | string
  }, "id">

  export type HotelMasterOrderByWithAggregationInput = {
    id?: SortOrder
    hotelName?: SortOrderInput | SortOrder
    hotelDescription?: SortOrderInput | SortOrder
    hotelLogo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HotelMasterCountOrderByAggregateInput
    _avg?: HotelMasterAvgOrderByAggregateInput
    _max?: HotelMasterMaxOrderByAggregateInput
    _min?: HotelMasterMinOrderByAggregateInput
    _sum?: HotelMasterSumOrderByAggregateInput
  }

  export type HotelMasterScalarWhereWithAggregatesInput = {
    AND?: HotelMasterScalarWhereWithAggregatesInput | HotelMasterScalarWhereWithAggregatesInput[]
    OR?: HotelMasterScalarWhereWithAggregatesInput[]
    NOT?: HotelMasterScalarWhereWithAggregatesInput | HotelMasterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HotelMaster"> | number
    hotelName?: StringNullableWithAggregatesFilter<"HotelMaster"> | string | null
    hotelDescription?: StringNullableWithAggregatesFilter<"HotelMaster"> | string | null
    hotelLogo?: StringNullableWithAggregatesFilter<"HotelMaster"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HotelMaster"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HotelMaster"> | Date | string
  }

  export type RoomImageWhereInput = {
    AND?: RoomImageWhereInput | RoomImageWhereInput[]
    OR?: RoomImageWhereInput[]
    NOT?: RoomImageWhereInput | RoomImageWhereInput[]
    id?: IntFilter<"RoomImage"> | number
    roomTypeId?: IntNullableFilter<"RoomImage"> | number | null
    imageUrl?: StringNullableFilter<"RoomImage"> | string | null
    imagePublicId?: StringNullableFilter<"RoomImage"> | string | null
    imageOrder?: IntNullableFilter<"RoomImage"> | number | null
    imageDefault?: BoolNullableFilter<"RoomImage"> | boolean | null
    roomType?: XOR<RoomTypeNullableScalarRelationFilter, RoomTypeWhereInput> | null
  }

  export type RoomImageOrderByWithRelationInput = {
    id?: SortOrder
    roomTypeId?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imagePublicId?: SortOrderInput | SortOrder
    imageOrder?: SortOrderInput | SortOrder
    imageDefault?: SortOrderInput | SortOrder
    roomType?: RoomTypeOrderByWithRelationInput
  }

  export type RoomImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RoomImageWhereInput | RoomImageWhereInput[]
    OR?: RoomImageWhereInput[]
    NOT?: RoomImageWhereInput | RoomImageWhereInput[]
    roomTypeId?: IntNullableFilter<"RoomImage"> | number | null
    imageUrl?: StringNullableFilter<"RoomImage"> | string | null
    imagePublicId?: StringNullableFilter<"RoomImage"> | string | null
    imageOrder?: IntNullableFilter<"RoomImage"> | number | null
    imageDefault?: BoolNullableFilter<"RoomImage"> | boolean | null
    roomType?: XOR<RoomTypeNullableScalarRelationFilter, RoomTypeWhereInput> | null
  }, "id">

  export type RoomImageOrderByWithAggregationInput = {
    id?: SortOrder
    roomTypeId?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imagePublicId?: SortOrderInput | SortOrder
    imageOrder?: SortOrderInput | SortOrder
    imageDefault?: SortOrderInput | SortOrder
    _count?: RoomImageCountOrderByAggregateInput
    _avg?: RoomImageAvgOrderByAggregateInput
    _max?: RoomImageMaxOrderByAggregateInput
    _min?: RoomImageMinOrderByAggregateInput
    _sum?: RoomImageSumOrderByAggregateInput
  }

  export type RoomImageScalarWhereWithAggregatesInput = {
    AND?: RoomImageScalarWhereWithAggregatesInput | RoomImageScalarWhereWithAggregatesInput[]
    OR?: RoomImageScalarWhereWithAggregatesInput[]
    NOT?: RoomImageScalarWhereWithAggregatesInput | RoomImageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RoomImage"> | number
    roomTypeId?: IntNullableWithAggregatesFilter<"RoomImage"> | number | null
    imageUrl?: StringNullableWithAggregatesFilter<"RoomImage"> | string | null
    imagePublicId?: StringNullableWithAggregatesFilter<"RoomImage"> | string | null
    imageOrder?: IntNullableWithAggregatesFilter<"RoomImage"> | number | null
    imageDefault?: BoolNullableWithAggregatesFilter<"RoomImage"> | boolean | null
  }

  export type UserCreateInput = {
    firstName: string
    lastName: string
    username: string
    email?: string | null
    passwordHash: string
    phone?: string | null
    profilePicture?: string | null
    profilePicturePublicId?: string | null
    country: string
    dateOfBirth?: Date | string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName: string
    username: string
    email?: string | null
    passwordHash: string
    phone?: string | null
    profilePicture?: string | null
    profilePicturePublicId?: string | null
    country: string
    dateOfBirth?: Date | string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicturePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicturePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    firstName: string
    lastName: string
    username: string
    email?: string | null
    passwordHash: string
    phone?: string | null
    profilePicture?: string | null
    profilePicturePublicId?: string | null
    country: string
    dateOfBirth?: Date | string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicturePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePicturePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BedTypeCreateInput = {
    bedDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomTypes?: RoomTypeCreateNestedManyWithoutBedTypeInput
  }

  export type BedTypeUncheckedCreateInput = {
    id?: number
    bedDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomTypes?: RoomTypeUncheckedCreateNestedManyWithoutBedTypeInput
  }

  export type BedTypeUpdateInput = {
    bedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomTypes?: RoomTypeUpdateManyWithoutBedTypeNestedInput
  }

  export type BedTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomTypes?: RoomTypeUncheckedUpdateManyWithoutBedTypeNestedInput
  }

  export type BedTypeCreateManyInput = {
    id?: number
    bedDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BedTypeUpdateManyMutationInput = {
    bedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BedTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStatusCreateInput = {
    statusName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomCreateNestedManyWithoutRoomStatusInput
  }

  export type RoomStatusUncheckedCreateInput = {
    id?: number
    statusName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomUncheckedCreateNestedManyWithoutRoomStatusInput
  }

  export type RoomStatusUpdateInput = {
    statusName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUpdateManyWithoutRoomStatusNestedInput
  }

  export type RoomStatusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    statusName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUncheckedUpdateManyWithoutRoomStatusNestedInput
  }

  export type RoomStatusCreateManyInput = {
    id?: number
    statusName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomStatusUpdateManyMutationInput = {
    statusName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStatusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    statusName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomTypeCreateInput = {
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bedType?: BedTypeCreateNestedOneWithoutRoomTypesInput
    rooms?: RoomCreateNestedManyWithoutRoomTypeInput
    roomImages?: RoomImageCreateNestedManyWithoutRoomTypeInput
    roomAmniety?: RoomAmnietyCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUncheckedCreateInput = {
    id?: number
    bedTypeId?: number | null
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomUncheckedCreateNestedManyWithoutRoomTypeInput
    roomImages?: RoomImageUncheckedCreateNestedManyWithoutRoomTypeInput
    roomAmniety?: RoomAmnietyUncheckedCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bedType?: BedTypeUpdateOneWithoutRoomTypesNestedInput
    rooms?: RoomUpdateManyWithoutRoomTypeNestedInput
    roomImages?: RoomImageUpdateManyWithoutRoomTypeNestedInput
    roomAmniety?: RoomAmnietyUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bedTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUncheckedUpdateManyWithoutRoomTypeNestedInput
    roomImages?: RoomImageUncheckedUpdateManyWithoutRoomTypeNestedInput
    roomAmniety?: RoomAmnietyUncheckedUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeCreateManyInput = {
    id?: number
    bedTypeId?: number | null
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomTypeUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bedTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateInput = {
    roomNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomType?: RoomTypeCreateNestedOneWithoutRoomsInput
    roomStatus?: RoomStatusCreateNestedOneWithoutRoomsInput
  }

  export type RoomUncheckedCreateInput = {
    id?: number
    roomNumber?: string | null
    roomTypeId?: number | null
    roomStatusId?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateInput = {
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: RoomTypeUpdateOneWithoutRoomsNestedInput
    roomStatus?: RoomStatusUpdateOneWithoutRoomsNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roomTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    roomStatusId?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateManyInput = {
    id?: number
    roomNumber?: string | null
    roomTypeId?: number | null
    roomStatusId?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roomTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    roomStatusId?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomAmnietyCreateInput = {
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    roomType?: RoomTypeCreateNestedOneWithoutRoomAmnietyInput
  }

  export type RoomAmnietyUncheckedCreateInput = {
    id?: number
    roomTypeId?: number | null
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomAmnietyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: RoomTypeUpdateOneWithoutRoomAmnietyNestedInput
  }

  export type RoomAmnietyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomAmnietyCreateManyInput = {
    id?: number
    roomTypeId?: number | null
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomAmnietyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomAmnietyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestCreateInput = {
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    country?: string | null
    dateOfBirth?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuestUncheckedCreateInput = {
    id?: number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    country?: string | null
    dateOfBirth?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuestUpdateInput = {
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestCreateManyInput = {
    id?: number
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
    country?: string | null
    dateOfBirth?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuestUpdateManyMutationInput = {
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HotelMasterCreateInput = {
    hotelName?: string | null
    hotelDescription?: string | null
    hotelLogo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HotelMasterUncheckedCreateInput = {
    id?: number
    hotelName?: string | null
    hotelDescription?: string | null
    hotelLogo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HotelMasterUpdateInput = {
    hotelName?: NullableStringFieldUpdateOperationsInput | string | null
    hotelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    hotelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HotelMasterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hotelName?: NullableStringFieldUpdateOperationsInput | string | null
    hotelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    hotelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HotelMasterCreateManyInput = {
    id?: number
    hotelName?: string | null
    hotelDescription?: string | null
    hotelLogo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HotelMasterUpdateManyMutationInput = {
    hotelName?: NullableStringFieldUpdateOperationsInput | string | null
    hotelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    hotelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HotelMasterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hotelName?: NullableStringFieldUpdateOperationsInput | string | null
    hotelDescription?: NullableStringFieldUpdateOperationsInput | string | null
    hotelLogo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomImageCreateInput = {
    imageUrl?: string | null
    imagePublicId?: string | null
    imageOrder?: number | null
    imageDefault?: boolean | null
    roomType?: RoomTypeCreateNestedOneWithoutRoomImagesInput
  }

  export type RoomImageUncheckedCreateInput = {
    id?: number
    roomTypeId?: number | null
    imageUrl?: string | null
    imagePublicId?: string | null
    imageOrder?: number | null
    imageDefault?: boolean | null
  }

  export type RoomImageUpdateInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    imageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    imageDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
    roomType?: RoomTypeUpdateOneWithoutRoomImagesNestedInput
  }

  export type RoomImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    imageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    imageDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type RoomImageCreateManyInput = {
    id?: number
    roomTypeId?: number | null
    imageUrl?: string | null
    imagePublicId?: string | null
    imageOrder?: number | null
    imageDefault?: boolean | null
  }

  export type RoomImageUpdateManyMutationInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    imageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    imageDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type RoomImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    imageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    imageDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    profilePicture?: SortOrder
    profilePicturePublicId?: SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    profilePicture?: SortOrder
    profilePicturePublicId?: SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    profilePicture?: SortOrder
    profilePicturePublicId?: SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type RoomTypeListRelationFilter = {
    every?: RoomTypeWhereInput
    some?: RoomTypeWhereInput
    none?: RoomTypeWhereInput
  }

  export type RoomTypeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BedTypeCountOrderByAggregateInput = {
    id?: SortOrder
    bedDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BedTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BedTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    bedDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BedTypeMinOrderByAggregateInput = {
    id?: SortOrder
    bedDescription?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BedTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoomListRelationFilter = {
    every?: RoomWhereInput
    some?: RoomWhereInput
    none?: RoomWhereInput
  }

  export type RoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomStatusCountOrderByAggregateInput = {
    id?: SortOrder
    statusName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomStatusAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoomStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    statusName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomStatusMinOrderByAggregateInput = {
    id?: SortOrder
    statusName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomStatusSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type BedTypeNullableScalarRelationFilter = {
    is?: BedTypeWhereInput | null
    isNot?: BedTypeWhereInput | null
  }

  export type RoomImageListRelationFilter = {
    every?: RoomImageWhereInput
    some?: RoomImageWhereInput
    none?: RoomImageWhereInput
  }

  export type RoomAmnietyListRelationFilter = {
    every?: RoomAmnietyWhereInput
    some?: RoomAmnietyWhereInput
    none?: RoomAmnietyWhereInput
  }

  export type RoomImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomAmnietyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomTypeCountOrderByAggregateInput = {
    id?: SortOrder
    bedTypeId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    capacity?: SortOrder
    roomSize?: SortOrder
    pricePerNight?: SortOrder
    promotionPrice?: SortOrder
    isPromotion?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomTypeAvgOrderByAggregateInput = {
    id?: SortOrder
    bedTypeId?: SortOrder
    capacity?: SortOrder
    roomSize?: SortOrder
    pricePerNight?: SortOrder
    promotionPrice?: SortOrder
  }

  export type RoomTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    bedTypeId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    capacity?: SortOrder
    roomSize?: SortOrder
    pricePerNight?: SortOrder
    promotionPrice?: SortOrder
    isPromotion?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomTypeMinOrderByAggregateInput = {
    id?: SortOrder
    bedTypeId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    capacity?: SortOrder
    roomSize?: SortOrder
    pricePerNight?: SortOrder
    promotionPrice?: SortOrder
    isPromotion?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomTypeSumOrderByAggregateInput = {
    id?: SortOrder
    bedTypeId?: SortOrder
    capacity?: SortOrder
    roomSize?: SortOrder
    pricePerNight?: SortOrder
    promotionPrice?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type RoomTypeNullableScalarRelationFilter = {
    is?: RoomTypeWhereInput | null
    isNot?: RoomTypeWhereInput | null
  }

  export type RoomStatusNullableScalarRelationFilter = {
    is?: RoomStatusWhereInput | null
    isNot?: RoomStatusWhereInput | null
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    roomNumber?: SortOrder
    roomTypeId?: SortOrder
    roomStatusId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    roomStatusId?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    roomNumber?: SortOrder
    roomTypeId?: SortOrder
    roomStatusId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    roomNumber?: SortOrder
    roomTypeId?: SortOrder
    roomStatusId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    roomStatusId?: SortOrder
  }

  export type RoomAmnietyCountOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    name?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomAmnietyAvgOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    order?: SortOrder
  }

  export type RoomAmnietyMaxOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    name?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomAmnietyMinOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    name?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomAmnietySumOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    order?: SortOrder
  }

  export type GuestCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuestAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GuestMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuestMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    country?: SortOrder
    dateOfBirth?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuestSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type HotelMasterCountOrderByAggregateInput = {
    id?: SortOrder
    hotelName?: SortOrder
    hotelDescription?: SortOrder
    hotelLogo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HotelMasterAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type HotelMasterMaxOrderByAggregateInput = {
    id?: SortOrder
    hotelName?: SortOrder
    hotelDescription?: SortOrder
    hotelLogo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HotelMasterMinOrderByAggregateInput = {
    id?: SortOrder
    hotelName?: SortOrder
    hotelDescription?: SortOrder
    hotelLogo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HotelMasterSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoomImageCountOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    imageOrder?: SortOrder
    imageDefault?: SortOrder
  }

  export type RoomImageAvgOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    imageOrder?: SortOrder
  }

  export type RoomImageMaxOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    imageOrder?: SortOrder
    imageDefault?: SortOrder
  }

  export type RoomImageMinOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    imageUrl?: SortOrder
    imagePublicId?: SortOrder
    imageOrder?: SortOrder
    imageDefault?: SortOrder
  }

  export type RoomImageSumOrderByAggregateInput = {
    id?: SortOrder
    roomTypeId?: SortOrder
    imageOrder?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RoomTypeCreateNestedManyWithoutBedTypeInput = {
    create?: XOR<RoomTypeCreateWithoutBedTypeInput, RoomTypeUncheckedCreateWithoutBedTypeInput> | RoomTypeCreateWithoutBedTypeInput[] | RoomTypeUncheckedCreateWithoutBedTypeInput[]
    connectOrCreate?: RoomTypeCreateOrConnectWithoutBedTypeInput | RoomTypeCreateOrConnectWithoutBedTypeInput[]
    createMany?: RoomTypeCreateManyBedTypeInputEnvelope
    connect?: RoomTypeWhereUniqueInput | RoomTypeWhereUniqueInput[]
  }

  export type RoomTypeUncheckedCreateNestedManyWithoutBedTypeInput = {
    create?: XOR<RoomTypeCreateWithoutBedTypeInput, RoomTypeUncheckedCreateWithoutBedTypeInput> | RoomTypeCreateWithoutBedTypeInput[] | RoomTypeUncheckedCreateWithoutBedTypeInput[]
    connectOrCreate?: RoomTypeCreateOrConnectWithoutBedTypeInput | RoomTypeCreateOrConnectWithoutBedTypeInput[]
    createMany?: RoomTypeCreateManyBedTypeInputEnvelope
    connect?: RoomTypeWhereUniqueInput | RoomTypeWhereUniqueInput[]
  }

  export type RoomTypeUpdateManyWithoutBedTypeNestedInput = {
    create?: XOR<RoomTypeCreateWithoutBedTypeInput, RoomTypeUncheckedCreateWithoutBedTypeInput> | RoomTypeCreateWithoutBedTypeInput[] | RoomTypeUncheckedCreateWithoutBedTypeInput[]
    connectOrCreate?: RoomTypeCreateOrConnectWithoutBedTypeInput | RoomTypeCreateOrConnectWithoutBedTypeInput[]
    upsert?: RoomTypeUpsertWithWhereUniqueWithoutBedTypeInput | RoomTypeUpsertWithWhereUniqueWithoutBedTypeInput[]
    createMany?: RoomTypeCreateManyBedTypeInputEnvelope
    set?: RoomTypeWhereUniqueInput | RoomTypeWhereUniqueInput[]
    disconnect?: RoomTypeWhereUniqueInput | RoomTypeWhereUniqueInput[]
    delete?: RoomTypeWhereUniqueInput | RoomTypeWhereUniqueInput[]
    connect?: RoomTypeWhereUniqueInput | RoomTypeWhereUniqueInput[]
    update?: RoomTypeUpdateWithWhereUniqueWithoutBedTypeInput | RoomTypeUpdateWithWhereUniqueWithoutBedTypeInput[]
    updateMany?: RoomTypeUpdateManyWithWhereWithoutBedTypeInput | RoomTypeUpdateManyWithWhereWithoutBedTypeInput[]
    deleteMany?: RoomTypeScalarWhereInput | RoomTypeScalarWhereInput[]
  }

  export type RoomTypeUncheckedUpdateManyWithoutBedTypeNestedInput = {
    create?: XOR<RoomTypeCreateWithoutBedTypeInput, RoomTypeUncheckedCreateWithoutBedTypeInput> | RoomTypeCreateWithoutBedTypeInput[] | RoomTypeUncheckedCreateWithoutBedTypeInput[]
    connectOrCreate?: RoomTypeCreateOrConnectWithoutBedTypeInput | RoomTypeCreateOrConnectWithoutBedTypeInput[]
    upsert?: RoomTypeUpsertWithWhereUniqueWithoutBedTypeInput | RoomTypeUpsertWithWhereUniqueWithoutBedTypeInput[]
    createMany?: RoomTypeCreateManyBedTypeInputEnvelope
    set?: RoomTypeWhereUniqueInput | RoomTypeWhereUniqueInput[]
    disconnect?: RoomTypeWhereUniqueInput | RoomTypeWhereUniqueInput[]
    delete?: RoomTypeWhereUniqueInput | RoomTypeWhereUniqueInput[]
    connect?: RoomTypeWhereUniqueInput | RoomTypeWhereUniqueInput[]
    update?: RoomTypeUpdateWithWhereUniqueWithoutBedTypeInput | RoomTypeUpdateWithWhereUniqueWithoutBedTypeInput[]
    updateMany?: RoomTypeUpdateManyWithWhereWithoutBedTypeInput | RoomTypeUpdateManyWithWhereWithoutBedTypeInput[]
    deleteMany?: RoomTypeScalarWhereInput | RoomTypeScalarWhereInput[]
  }

  export type RoomCreateNestedManyWithoutRoomStatusInput = {
    create?: XOR<RoomCreateWithoutRoomStatusInput, RoomUncheckedCreateWithoutRoomStatusInput> | RoomCreateWithoutRoomStatusInput[] | RoomUncheckedCreateWithoutRoomStatusInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomStatusInput | RoomCreateOrConnectWithoutRoomStatusInput[]
    createMany?: RoomCreateManyRoomStatusInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutRoomStatusInput = {
    create?: XOR<RoomCreateWithoutRoomStatusInput, RoomUncheckedCreateWithoutRoomStatusInput> | RoomCreateWithoutRoomStatusInput[] | RoomUncheckedCreateWithoutRoomStatusInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomStatusInput | RoomCreateOrConnectWithoutRoomStatusInput[]
    createMany?: RoomCreateManyRoomStatusInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomUpdateManyWithoutRoomStatusNestedInput = {
    create?: XOR<RoomCreateWithoutRoomStatusInput, RoomUncheckedCreateWithoutRoomStatusInput> | RoomCreateWithoutRoomStatusInput[] | RoomUncheckedCreateWithoutRoomStatusInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomStatusInput | RoomCreateOrConnectWithoutRoomStatusInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutRoomStatusInput | RoomUpsertWithWhereUniqueWithoutRoomStatusInput[]
    createMany?: RoomCreateManyRoomStatusInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutRoomStatusInput | RoomUpdateWithWhereUniqueWithoutRoomStatusInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutRoomStatusInput | RoomUpdateManyWithWhereWithoutRoomStatusInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutRoomStatusNestedInput = {
    create?: XOR<RoomCreateWithoutRoomStatusInput, RoomUncheckedCreateWithoutRoomStatusInput> | RoomCreateWithoutRoomStatusInput[] | RoomUncheckedCreateWithoutRoomStatusInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomStatusInput | RoomCreateOrConnectWithoutRoomStatusInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutRoomStatusInput | RoomUpsertWithWhereUniqueWithoutRoomStatusInput[]
    createMany?: RoomCreateManyRoomStatusInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutRoomStatusInput | RoomUpdateWithWhereUniqueWithoutRoomStatusInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutRoomStatusInput | RoomUpdateManyWithWhereWithoutRoomStatusInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type BedTypeCreateNestedOneWithoutRoomTypesInput = {
    create?: XOR<BedTypeCreateWithoutRoomTypesInput, BedTypeUncheckedCreateWithoutRoomTypesInput>
    connectOrCreate?: BedTypeCreateOrConnectWithoutRoomTypesInput
    connect?: BedTypeWhereUniqueInput
  }

  export type RoomCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput> | RoomCreateWithoutRoomTypeInput[] | RoomUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomTypeInput | RoomCreateOrConnectWithoutRoomTypeInput[]
    createMany?: RoomCreateManyRoomTypeInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomImageCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<RoomImageCreateWithoutRoomTypeInput, RoomImageUncheckedCreateWithoutRoomTypeInput> | RoomImageCreateWithoutRoomTypeInput[] | RoomImageUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomImageCreateOrConnectWithoutRoomTypeInput | RoomImageCreateOrConnectWithoutRoomTypeInput[]
    createMany?: RoomImageCreateManyRoomTypeInputEnvelope
    connect?: RoomImageWhereUniqueInput | RoomImageWhereUniqueInput[]
  }

  export type RoomAmnietyCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<RoomAmnietyCreateWithoutRoomTypeInput, RoomAmnietyUncheckedCreateWithoutRoomTypeInput> | RoomAmnietyCreateWithoutRoomTypeInput[] | RoomAmnietyUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomAmnietyCreateOrConnectWithoutRoomTypeInput | RoomAmnietyCreateOrConnectWithoutRoomTypeInput[]
    createMany?: RoomAmnietyCreateManyRoomTypeInputEnvelope
    connect?: RoomAmnietyWhereUniqueInput | RoomAmnietyWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput> | RoomCreateWithoutRoomTypeInput[] | RoomUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomTypeInput | RoomCreateOrConnectWithoutRoomTypeInput[]
    createMany?: RoomCreateManyRoomTypeInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomImageUncheckedCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<RoomImageCreateWithoutRoomTypeInput, RoomImageUncheckedCreateWithoutRoomTypeInput> | RoomImageCreateWithoutRoomTypeInput[] | RoomImageUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomImageCreateOrConnectWithoutRoomTypeInput | RoomImageCreateOrConnectWithoutRoomTypeInput[]
    createMany?: RoomImageCreateManyRoomTypeInputEnvelope
    connect?: RoomImageWhereUniqueInput | RoomImageWhereUniqueInput[]
  }

  export type RoomAmnietyUncheckedCreateNestedManyWithoutRoomTypeInput = {
    create?: XOR<RoomAmnietyCreateWithoutRoomTypeInput, RoomAmnietyUncheckedCreateWithoutRoomTypeInput> | RoomAmnietyCreateWithoutRoomTypeInput[] | RoomAmnietyUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomAmnietyCreateOrConnectWithoutRoomTypeInput | RoomAmnietyCreateOrConnectWithoutRoomTypeInput[]
    createMany?: RoomAmnietyCreateManyRoomTypeInputEnvelope
    connect?: RoomAmnietyWhereUniqueInput | RoomAmnietyWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type BedTypeUpdateOneWithoutRoomTypesNestedInput = {
    create?: XOR<BedTypeCreateWithoutRoomTypesInput, BedTypeUncheckedCreateWithoutRoomTypesInput>
    connectOrCreate?: BedTypeCreateOrConnectWithoutRoomTypesInput
    upsert?: BedTypeUpsertWithoutRoomTypesInput
    disconnect?: BedTypeWhereInput | boolean
    delete?: BedTypeWhereInput | boolean
    connect?: BedTypeWhereUniqueInput
    update?: XOR<XOR<BedTypeUpdateToOneWithWhereWithoutRoomTypesInput, BedTypeUpdateWithoutRoomTypesInput>, BedTypeUncheckedUpdateWithoutRoomTypesInput>
  }

  export type RoomUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput> | RoomCreateWithoutRoomTypeInput[] | RoomUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomTypeInput | RoomCreateOrConnectWithoutRoomTypeInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutRoomTypeInput | RoomUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: RoomCreateManyRoomTypeInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutRoomTypeInput | RoomUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutRoomTypeInput | RoomUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomImageUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<RoomImageCreateWithoutRoomTypeInput, RoomImageUncheckedCreateWithoutRoomTypeInput> | RoomImageCreateWithoutRoomTypeInput[] | RoomImageUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomImageCreateOrConnectWithoutRoomTypeInput | RoomImageCreateOrConnectWithoutRoomTypeInput[]
    upsert?: RoomImageUpsertWithWhereUniqueWithoutRoomTypeInput | RoomImageUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: RoomImageCreateManyRoomTypeInputEnvelope
    set?: RoomImageWhereUniqueInput | RoomImageWhereUniqueInput[]
    disconnect?: RoomImageWhereUniqueInput | RoomImageWhereUniqueInput[]
    delete?: RoomImageWhereUniqueInput | RoomImageWhereUniqueInput[]
    connect?: RoomImageWhereUniqueInput | RoomImageWhereUniqueInput[]
    update?: RoomImageUpdateWithWhereUniqueWithoutRoomTypeInput | RoomImageUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: RoomImageUpdateManyWithWhereWithoutRoomTypeInput | RoomImageUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: RoomImageScalarWhereInput | RoomImageScalarWhereInput[]
  }

  export type RoomAmnietyUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<RoomAmnietyCreateWithoutRoomTypeInput, RoomAmnietyUncheckedCreateWithoutRoomTypeInput> | RoomAmnietyCreateWithoutRoomTypeInput[] | RoomAmnietyUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomAmnietyCreateOrConnectWithoutRoomTypeInput | RoomAmnietyCreateOrConnectWithoutRoomTypeInput[]
    upsert?: RoomAmnietyUpsertWithWhereUniqueWithoutRoomTypeInput | RoomAmnietyUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: RoomAmnietyCreateManyRoomTypeInputEnvelope
    set?: RoomAmnietyWhereUniqueInput | RoomAmnietyWhereUniqueInput[]
    disconnect?: RoomAmnietyWhereUniqueInput | RoomAmnietyWhereUniqueInput[]
    delete?: RoomAmnietyWhereUniqueInput | RoomAmnietyWhereUniqueInput[]
    connect?: RoomAmnietyWhereUniqueInput | RoomAmnietyWhereUniqueInput[]
    update?: RoomAmnietyUpdateWithWhereUniqueWithoutRoomTypeInput | RoomAmnietyUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: RoomAmnietyUpdateManyWithWhereWithoutRoomTypeInput | RoomAmnietyUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: RoomAmnietyScalarWhereInput | RoomAmnietyScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput> | RoomCreateWithoutRoomTypeInput[] | RoomUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutRoomTypeInput | RoomCreateOrConnectWithoutRoomTypeInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutRoomTypeInput | RoomUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: RoomCreateManyRoomTypeInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutRoomTypeInput | RoomUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutRoomTypeInput | RoomUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomImageUncheckedUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<RoomImageCreateWithoutRoomTypeInput, RoomImageUncheckedCreateWithoutRoomTypeInput> | RoomImageCreateWithoutRoomTypeInput[] | RoomImageUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomImageCreateOrConnectWithoutRoomTypeInput | RoomImageCreateOrConnectWithoutRoomTypeInput[]
    upsert?: RoomImageUpsertWithWhereUniqueWithoutRoomTypeInput | RoomImageUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: RoomImageCreateManyRoomTypeInputEnvelope
    set?: RoomImageWhereUniqueInput | RoomImageWhereUniqueInput[]
    disconnect?: RoomImageWhereUniqueInput | RoomImageWhereUniqueInput[]
    delete?: RoomImageWhereUniqueInput | RoomImageWhereUniqueInput[]
    connect?: RoomImageWhereUniqueInput | RoomImageWhereUniqueInput[]
    update?: RoomImageUpdateWithWhereUniqueWithoutRoomTypeInput | RoomImageUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: RoomImageUpdateManyWithWhereWithoutRoomTypeInput | RoomImageUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: RoomImageScalarWhereInput | RoomImageScalarWhereInput[]
  }

  export type RoomAmnietyUncheckedUpdateManyWithoutRoomTypeNestedInput = {
    create?: XOR<RoomAmnietyCreateWithoutRoomTypeInput, RoomAmnietyUncheckedCreateWithoutRoomTypeInput> | RoomAmnietyCreateWithoutRoomTypeInput[] | RoomAmnietyUncheckedCreateWithoutRoomTypeInput[]
    connectOrCreate?: RoomAmnietyCreateOrConnectWithoutRoomTypeInput | RoomAmnietyCreateOrConnectWithoutRoomTypeInput[]
    upsert?: RoomAmnietyUpsertWithWhereUniqueWithoutRoomTypeInput | RoomAmnietyUpsertWithWhereUniqueWithoutRoomTypeInput[]
    createMany?: RoomAmnietyCreateManyRoomTypeInputEnvelope
    set?: RoomAmnietyWhereUniqueInput | RoomAmnietyWhereUniqueInput[]
    disconnect?: RoomAmnietyWhereUniqueInput | RoomAmnietyWhereUniqueInput[]
    delete?: RoomAmnietyWhereUniqueInput | RoomAmnietyWhereUniqueInput[]
    connect?: RoomAmnietyWhereUniqueInput | RoomAmnietyWhereUniqueInput[]
    update?: RoomAmnietyUpdateWithWhereUniqueWithoutRoomTypeInput | RoomAmnietyUpdateWithWhereUniqueWithoutRoomTypeInput[]
    updateMany?: RoomAmnietyUpdateManyWithWhereWithoutRoomTypeInput | RoomAmnietyUpdateManyWithWhereWithoutRoomTypeInput[]
    deleteMany?: RoomAmnietyScalarWhereInput | RoomAmnietyScalarWhereInput[]
  }

  export type RoomTypeCreateNestedOneWithoutRoomsInput = {
    create?: XOR<RoomTypeCreateWithoutRoomsInput, RoomTypeUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutRoomsInput
    connect?: RoomTypeWhereUniqueInput
  }

  export type RoomStatusCreateNestedOneWithoutRoomsInput = {
    create?: XOR<RoomStatusCreateWithoutRoomsInput, RoomStatusUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: RoomStatusCreateOrConnectWithoutRoomsInput
    connect?: RoomStatusWhereUniqueInput
  }

  export type RoomTypeUpdateOneWithoutRoomsNestedInput = {
    create?: XOR<RoomTypeCreateWithoutRoomsInput, RoomTypeUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutRoomsInput
    upsert?: RoomTypeUpsertWithoutRoomsInput
    disconnect?: RoomTypeWhereInput | boolean
    delete?: RoomTypeWhereInput | boolean
    connect?: RoomTypeWhereUniqueInput
    update?: XOR<XOR<RoomTypeUpdateToOneWithWhereWithoutRoomsInput, RoomTypeUpdateWithoutRoomsInput>, RoomTypeUncheckedUpdateWithoutRoomsInput>
  }

  export type RoomStatusUpdateOneWithoutRoomsNestedInput = {
    create?: XOR<RoomStatusCreateWithoutRoomsInput, RoomStatusUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: RoomStatusCreateOrConnectWithoutRoomsInput
    upsert?: RoomStatusUpsertWithoutRoomsInput
    disconnect?: RoomStatusWhereInput | boolean
    delete?: RoomStatusWhereInput | boolean
    connect?: RoomStatusWhereUniqueInput
    update?: XOR<XOR<RoomStatusUpdateToOneWithWhereWithoutRoomsInput, RoomStatusUpdateWithoutRoomsInput>, RoomStatusUncheckedUpdateWithoutRoomsInput>
  }

  export type RoomTypeCreateNestedOneWithoutRoomAmnietyInput = {
    create?: XOR<RoomTypeCreateWithoutRoomAmnietyInput, RoomTypeUncheckedCreateWithoutRoomAmnietyInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutRoomAmnietyInput
    connect?: RoomTypeWhereUniqueInput
  }

  export type RoomTypeUpdateOneWithoutRoomAmnietyNestedInput = {
    create?: XOR<RoomTypeCreateWithoutRoomAmnietyInput, RoomTypeUncheckedCreateWithoutRoomAmnietyInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutRoomAmnietyInput
    upsert?: RoomTypeUpsertWithoutRoomAmnietyInput
    disconnect?: RoomTypeWhereInput | boolean
    delete?: RoomTypeWhereInput | boolean
    connect?: RoomTypeWhereUniqueInput
    update?: XOR<XOR<RoomTypeUpdateToOneWithWhereWithoutRoomAmnietyInput, RoomTypeUpdateWithoutRoomAmnietyInput>, RoomTypeUncheckedUpdateWithoutRoomAmnietyInput>
  }

  export type RoomTypeCreateNestedOneWithoutRoomImagesInput = {
    create?: XOR<RoomTypeCreateWithoutRoomImagesInput, RoomTypeUncheckedCreateWithoutRoomImagesInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutRoomImagesInput
    connect?: RoomTypeWhereUniqueInput
  }

  export type RoomTypeUpdateOneWithoutRoomImagesNestedInput = {
    create?: XOR<RoomTypeCreateWithoutRoomImagesInput, RoomTypeUncheckedCreateWithoutRoomImagesInput>
    connectOrCreate?: RoomTypeCreateOrConnectWithoutRoomImagesInput
    upsert?: RoomTypeUpsertWithoutRoomImagesInput
    disconnect?: RoomTypeWhereInput | boolean
    delete?: RoomTypeWhereInput | boolean
    connect?: RoomTypeWhereUniqueInput
    update?: XOR<XOR<RoomTypeUpdateToOneWithWhereWithoutRoomImagesInput, RoomTypeUpdateWithoutRoomImagesInput>, RoomTypeUncheckedUpdateWithoutRoomImagesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type RoomTypeCreateWithoutBedTypeInput = {
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomCreateNestedManyWithoutRoomTypeInput
    roomImages?: RoomImageCreateNestedManyWithoutRoomTypeInput
    roomAmniety?: RoomAmnietyCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUncheckedCreateWithoutBedTypeInput = {
    id?: number
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomUncheckedCreateNestedManyWithoutRoomTypeInput
    roomImages?: RoomImageUncheckedCreateNestedManyWithoutRoomTypeInput
    roomAmniety?: RoomAmnietyUncheckedCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeCreateOrConnectWithoutBedTypeInput = {
    where: RoomTypeWhereUniqueInput
    create: XOR<RoomTypeCreateWithoutBedTypeInput, RoomTypeUncheckedCreateWithoutBedTypeInput>
  }

  export type RoomTypeCreateManyBedTypeInputEnvelope = {
    data: RoomTypeCreateManyBedTypeInput | RoomTypeCreateManyBedTypeInput[]
    skipDuplicates?: boolean
  }

  export type RoomTypeUpsertWithWhereUniqueWithoutBedTypeInput = {
    where: RoomTypeWhereUniqueInput
    update: XOR<RoomTypeUpdateWithoutBedTypeInput, RoomTypeUncheckedUpdateWithoutBedTypeInput>
    create: XOR<RoomTypeCreateWithoutBedTypeInput, RoomTypeUncheckedCreateWithoutBedTypeInput>
  }

  export type RoomTypeUpdateWithWhereUniqueWithoutBedTypeInput = {
    where: RoomTypeWhereUniqueInput
    data: XOR<RoomTypeUpdateWithoutBedTypeInput, RoomTypeUncheckedUpdateWithoutBedTypeInput>
  }

  export type RoomTypeUpdateManyWithWhereWithoutBedTypeInput = {
    where: RoomTypeScalarWhereInput
    data: XOR<RoomTypeUpdateManyMutationInput, RoomTypeUncheckedUpdateManyWithoutBedTypeInput>
  }

  export type RoomTypeScalarWhereInput = {
    AND?: RoomTypeScalarWhereInput | RoomTypeScalarWhereInput[]
    OR?: RoomTypeScalarWhereInput[]
    NOT?: RoomTypeScalarWhereInput | RoomTypeScalarWhereInput[]
    id?: IntFilter<"RoomType"> | number
    bedTypeId?: IntNullableFilter<"RoomType"> | number | null
    name?: StringNullableFilter<"RoomType"> | string | null
    description?: StringNullableFilter<"RoomType"> | string | null
    capacity?: IntNullableFilter<"RoomType"> | number | null
    roomSize?: IntNullableFilter<"RoomType"> | number | null
    pricePerNight?: DecimalNullableFilter<"RoomType"> | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: DecimalNullableFilter<"RoomType"> | Decimal | DecimalJsLike | number | string | null
    isPromotion?: BoolNullableFilter<"RoomType"> | boolean | null
    imageUrl?: StringNullableFilter<"RoomType"> | string | null
    createdAt?: DateTimeFilter<"RoomType"> | Date | string
    updatedAt?: DateTimeFilter<"RoomType"> | Date | string
  }

  export type RoomCreateWithoutRoomStatusInput = {
    roomNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomType?: RoomTypeCreateNestedOneWithoutRoomsInput
  }

  export type RoomUncheckedCreateWithoutRoomStatusInput = {
    id?: number
    roomNumber?: string | null
    roomTypeId?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomCreateOrConnectWithoutRoomStatusInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutRoomStatusInput, RoomUncheckedCreateWithoutRoomStatusInput>
  }

  export type RoomCreateManyRoomStatusInputEnvelope = {
    data: RoomCreateManyRoomStatusInput | RoomCreateManyRoomStatusInput[]
    skipDuplicates?: boolean
  }

  export type RoomUpsertWithWhereUniqueWithoutRoomStatusInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutRoomStatusInput, RoomUncheckedUpdateWithoutRoomStatusInput>
    create: XOR<RoomCreateWithoutRoomStatusInput, RoomUncheckedCreateWithoutRoomStatusInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutRoomStatusInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutRoomStatusInput, RoomUncheckedUpdateWithoutRoomStatusInput>
  }

  export type RoomUpdateManyWithWhereWithoutRoomStatusInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutRoomStatusInput>
  }

  export type RoomScalarWhereInput = {
    AND?: RoomScalarWhereInput | RoomScalarWhereInput[]
    OR?: RoomScalarWhereInput[]
    NOT?: RoomScalarWhereInput | RoomScalarWhereInput[]
    id?: IntFilter<"Room"> | number
    roomNumber?: StringNullableFilter<"Room"> | string | null
    roomTypeId?: IntNullableFilter<"Room"> | number | null
    roomStatusId?: IntNullableFilter<"Room"> | number | null
    notes?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
  }

  export type BedTypeCreateWithoutRoomTypesInput = {
    bedDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BedTypeUncheckedCreateWithoutRoomTypesInput = {
    id?: number
    bedDescription?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BedTypeCreateOrConnectWithoutRoomTypesInput = {
    where: BedTypeWhereUniqueInput
    create: XOR<BedTypeCreateWithoutRoomTypesInput, BedTypeUncheckedCreateWithoutRoomTypesInput>
  }

  export type RoomCreateWithoutRoomTypeInput = {
    roomNumber?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomStatus?: RoomStatusCreateNestedOneWithoutRoomsInput
  }

  export type RoomUncheckedCreateWithoutRoomTypeInput = {
    id?: number
    roomNumber?: string | null
    roomStatusId?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomCreateOrConnectWithoutRoomTypeInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput>
  }

  export type RoomCreateManyRoomTypeInputEnvelope = {
    data: RoomCreateManyRoomTypeInput | RoomCreateManyRoomTypeInput[]
    skipDuplicates?: boolean
  }

  export type RoomImageCreateWithoutRoomTypeInput = {
    imageUrl?: string | null
    imagePublicId?: string | null
    imageOrder?: number | null
    imageDefault?: boolean | null
  }

  export type RoomImageUncheckedCreateWithoutRoomTypeInput = {
    id?: number
    imageUrl?: string | null
    imagePublicId?: string | null
    imageOrder?: number | null
    imageDefault?: boolean | null
  }

  export type RoomImageCreateOrConnectWithoutRoomTypeInput = {
    where: RoomImageWhereUniqueInput
    create: XOR<RoomImageCreateWithoutRoomTypeInput, RoomImageUncheckedCreateWithoutRoomTypeInput>
  }

  export type RoomImageCreateManyRoomTypeInputEnvelope = {
    data: RoomImageCreateManyRoomTypeInput | RoomImageCreateManyRoomTypeInput[]
    skipDuplicates?: boolean
  }

  export type RoomAmnietyCreateWithoutRoomTypeInput = {
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomAmnietyUncheckedCreateWithoutRoomTypeInput = {
    id?: number
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomAmnietyCreateOrConnectWithoutRoomTypeInput = {
    where: RoomAmnietyWhereUniqueInput
    create: XOR<RoomAmnietyCreateWithoutRoomTypeInput, RoomAmnietyUncheckedCreateWithoutRoomTypeInput>
  }

  export type RoomAmnietyCreateManyRoomTypeInputEnvelope = {
    data: RoomAmnietyCreateManyRoomTypeInput | RoomAmnietyCreateManyRoomTypeInput[]
    skipDuplicates?: boolean
  }

  export type BedTypeUpsertWithoutRoomTypesInput = {
    update: XOR<BedTypeUpdateWithoutRoomTypesInput, BedTypeUncheckedUpdateWithoutRoomTypesInput>
    create: XOR<BedTypeCreateWithoutRoomTypesInput, BedTypeUncheckedCreateWithoutRoomTypesInput>
    where?: BedTypeWhereInput
  }

  export type BedTypeUpdateToOneWithWhereWithoutRoomTypesInput = {
    where?: BedTypeWhereInput
    data: XOR<BedTypeUpdateWithoutRoomTypesInput, BedTypeUncheckedUpdateWithoutRoomTypesInput>
  }

  export type BedTypeUpdateWithoutRoomTypesInput = {
    bedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BedTypeUncheckedUpdateWithoutRoomTypesInput = {
    id?: IntFieldUpdateOperationsInput | number
    bedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUpsertWithWhereUniqueWithoutRoomTypeInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutRoomTypeInput, RoomUncheckedUpdateWithoutRoomTypeInput>
    create: XOR<RoomCreateWithoutRoomTypeInput, RoomUncheckedCreateWithoutRoomTypeInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutRoomTypeInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutRoomTypeInput, RoomUncheckedUpdateWithoutRoomTypeInput>
  }

  export type RoomUpdateManyWithWhereWithoutRoomTypeInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutRoomTypeInput>
  }

  export type RoomImageUpsertWithWhereUniqueWithoutRoomTypeInput = {
    where: RoomImageWhereUniqueInput
    update: XOR<RoomImageUpdateWithoutRoomTypeInput, RoomImageUncheckedUpdateWithoutRoomTypeInput>
    create: XOR<RoomImageCreateWithoutRoomTypeInput, RoomImageUncheckedCreateWithoutRoomTypeInput>
  }

  export type RoomImageUpdateWithWhereUniqueWithoutRoomTypeInput = {
    where: RoomImageWhereUniqueInput
    data: XOR<RoomImageUpdateWithoutRoomTypeInput, RoomImageUncheckedUpdateWithoutRoomTypeInput>
  }

  export type RoomImageUpdateManyWithWhereWithoutRoomTypeInput = {
    where: RoomImageScalarWhereInput
    data: XOR<RoomImageUpdateManyMutationInput, RoomImageUncheckedUpdateManyWithoutRoomTypeInput>
  }

  export type RoomImageScalarWhereInput = {
    AND?: RoomImageScalarWhereInput | RoomImageScalarWhereInput[]
    OR?: RoomImageScalarWhereInput[]
    NOT?: RoomImageScalarWhereInput | RoomImageScalarWhereInput[]
    id?: IntFilter<"RoomImage"> | number
    roomTypeId?: IntNullableFilter<"RoomImage"> | number | null
    imageUrl?: StringNullableFilter<"RoomImage"> | string | null
    imagePublicId?: StringNullableFilter<"RoomImage"> | string | null
    imageOrder?: IntNullableFilter<"RoomImage"> | number | null
    imageDefault?: BoolNullableFilter<"RoomImage"> | boolean | null
  }

  export type RoomAmnietyUpsertWithWhereUniqueWithoutRoomTypeInput = {
    where: RoomAmnietyWhereUniqueInput
    update: XOR<RoomAmnietyUpdateWithoutRoomTypeInput, RoomAmnietyUncheckedUpdateWithoutRoomTypeInput>
    create: XOR<RoomAmnietyCreateWithoutRoomTypeInput, RoomAmnietyUncheckedCreateWithoutRoomTypeInput>
  }

  export type RoomAmnietyUpdateWithWhereUniqueWithoutRoomTypeInput = {
    where: RoomAmnietyWhereUniqueInput
    data: XOR<RoomAmnietyUpdateWithoutRoomTypeInput, RoomAmnietyUncheckedUpdateWithoutRoomTypeInput>
  }

  export type RoomAmnietyUpdateManyWithWhereWithoutRoomTypeInput = {
    where: RoomAmnietyScalarWhereInput
    data: XOR<RoomAmnietyUpdateManyMutationInput, RoomAmnietyUncheckedUpdateManyWithoutRoomTypeInput>
  }

  export type RoomAmnietyScalarWhereInput = {
    AND?: RoomAmnietyScalarWhereInput | RoomAmnietyScalarWhereInput[]
    OR?: RoomAmnietyScalarWhereInput[]
    NOT?: RoomAmnietyScalarWhereInput | RoomAmnietyScalarWhereInput[]
    id?: IntFilter<"RoomAmniety"> | number
    roomTypeId?: IntNullableFilter<"RoomAmniety"> | number | null
    name?: StringFilter<"RoomAmniety"> | string
    order?: IntFilter<"RoomAmniety"> | number
    createdAt?: DateTimeFilter<"RoomAmniety"> | Date | string
    updatedAt?: DateTimeFilter<"RoomAmniety"> | Date | string
  }

  export type RoomTypeCreateWithoutRoomsInput = {
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bedType?: BedTypeCreateNestedOneWithoutRoomTypesInput
    roomImages?: RoomImageCreateNestedManyWithoutRoomTypeInput
    roomAmniety?: RoomAmnietyCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUncheckedCreateWithoutRoomsInput = {
    id?: number
    bedTypeId?: number | null
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomImages?: RoomImageUncheckedCreateNestedManyWithoutRoomTypeInput
    roomAmniety?: RoomAmnietyUncheckedCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeCreateOrConnectWithoutRoomsInput = {
    where: RoomTypeWhereUniqueInput
    create: XOR<RoomTypeCreateWithoutRoomsInput, RoomTypeUncheckedCreateWithoutRoomsInput>
  }

  export type RoomStatusCreateWithoutRoomsInput = {
    statusName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomStatusUncheckedCreateWithoutRoomsInput = {
    id?: number
    statusName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomStatusCreateOrConnectWithoutRoomsInput = {
    where: RoomStatusWhereUniqueInput
    create: XOR<RoomStatusCreateWithoutRoomsInput, RoomStatusUncheckedCreateWithoutRoomsInput>
  }

  export type RoomTypeUpsertWithoutRoomsInput = {
    update: XOR<RoomTypeUpdateWithoutRoomsInput, RoomTypeUncheckedUpdateWithoutRoomsInput>
    create: XOR<RoomTypeCreateWithoutRoomsInput, RoomTypeUncheckedCreateWithoutRoomsInput>
    where?: RoomTypeWhereInput
  }

  export type RoomTypeUpdateToOneWithWhereWithoutRoomsInput = {
    where?: RoomTypeWhereInput
    data: XOR<RoomTypeUpdateWithoutRoomsInput, RoomTypeUncheckedUpdateWithoutRoomsInput>
  }

  export type RoomTypeUpdateWithoutRoomsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bedType?: BedTypeUpdateOneWithoutRoomTypesNestedInput
    roomImages?: RoomImageUpdateManyWithoutRoomTypeNestedInput
    roomAmniety?: RoomAmnietyUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeUncheckedUpdateWithoutRoomsInput = {
    id?: IntFieldUpdateOperationsInput | number
    bedTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomImages?: RoomImageUncheckedUpdateManyWithoutRoomTypeNestedInput
    roomAmniety?: RoomAmnietyUncheckedUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomStatusUpsertWithoutRoomsInput = {
    update: XOR<RoomStatusUpdateWithoutRoomsInput, RoomStatusUncheckedUpdateWithoutRoomsInput>
    create: XOR<RoomStatusCreateWithoutRoomsInput, RoomStatusUncheckedCreateWithoutRoomsInput>
    where?: RoomStatusWhereInput
  }

  export type RoomStatusUpdateToOneWithWhereWithoutRoomsInput = {
    where?: RoomStatusWhereInput
    data: XOR<RoomStatusUpdateWithoutRoomsInput, RoomStatusUncheckedUpdateWithoutRoomsInput>
  }

  export type RoomStatusUpdateWithoutRoomsInput = {
    statusName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStatusUncheckedUpdateWithoutRoomsInput = {
    id?: IntFieldUpdateOperationsInput | number
    statusName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomTypeCreateWithoutRoomAmnietyInput = {
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bedType?: BedTypeCreateNestedOneWithoutRoomTypesInput
    rooms?: RoomCreateNestedManyWithoutRoomTypeInput
    roomImages?: RoomImageCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUncheckedCreateWithoutRoomAmnietyInput = {
    id?: number
    bedTypeId?: number | null
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomUncheckedCreateNestedManyWithoutRoomTypeInput
    roomImages?: RoomImageUncheckedCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeCreateOrConnectWithoutRoomAmnietyInput = {
    where: RoomTypeWhereUniqueInput
    create: XOR<RoomTypeCreateWithoutRoomAmnietyInput, RoomTypeUncheckedCreateWithoutRoomAmnietyInput>
  }

  export type RoomTypeUpsertWithoutRoomAmnietyInput = {
    update: XOR<RoomTypeUpdateWithoutRoomAmnietyInput, RoomTypeUncheckedUpdateWithoutRoomAmnietyInput>
    create: XOR<RoomTypeCreateWithoutRoomAmnietyInput, RoomTypeUncheckedCreateWithoutRoomAmnietyInput>
    where?: RoomTypeWhereInput
  }

  export type RoomTypeUpdateToOneWithWhereWithoutRoomAmnietyInput = {
    where?: RoomTypeWhereInput
    data: XOR<RoomTypeUpdateWithoutRoomAmnietyInput, RoomTypeUncheckedUpdateWithoutRoomAmnietyInput>
  }

  export type RoomTypeUpdateWithoutRoomAmnietyInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bedType?: BedTypeUpdateOneWithoutRoomTypesNestedInput
    rooms?: RoomUpdateManyWithoutRoomTypeNestedInput
    roomImages?: RoomImageUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeUncheckedUpdateWithoutRoomAmnietyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bedTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUncheckedUpdateManyWithoutRoomTypeNestedInput
    roomImages?: RoomImageUncheckedUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeCreateWithoutRoomImagesInput = {
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bedType?: BedTypeCreateNestedOneWithoutRoomTypesInput
    rooms?: RoomCreateNestedManyWithoutRoomTypeInput
    roomAmniety?: RoomAmnietyCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeUncheckedCreateWithoutRoomImagesInput = {
    id?: number
    bedTypeId?: number | null
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomUncheckedCreateNestedManyWithoutRoomTypeInput
    roomAmniety?: RoomAmnietyUncheckedCreateNestedManyWithoutRoomTypeInput
  }

  export type RoomTypeCreateOrConnectWithoutRoomImagesInput = {
    where: RoomTypeWhereUniqueInput
    create: XOR<RoomTypeCreateWithoutRoomImagesInput, RoomTypeUncheckedCreateWithoutRoomImagesInput>
  }

  export type RoomTypeUpsertWithoutRoomImagesInput = {
    update: XOR<RoomTypeUpdateWithoutRoomImagesInput, RoomTypeUncheckedUpdateWithoutRoomImagesInput>
    create: XOR<RoomTypeCreateWithoutRoomImagesInput, RoomTypeUncheckedCreateWithoutRoomImagesInput>
    where?: RoomTypeWhereInput
  }

  export type RoomTypeUpdateToOneWithWhereWithoutRoomImagesInput = {
    where?: RoomTypeWhereInput
    data: XOR<RoomTypeUpdateWithoutRoomImagesInput, RoomTypeUncheckedUpdateWithoutRoomImagesInput>
  }

  export type RoomTypeUpdateWithoutRoomImagesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bedType?: BedTypeUpdateOneWithoutRoomTypesNestedInput
    rooms?: RoomUpdateManyWithoutRoomTypeNestedInput
    roomAmniety?: RoomAmnietyUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeUncheckedUpdateWithoutRoomImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    bedTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUncheckedUpdateManyWithoutRoomTypeNestedInput
    roomAmniety?: RoomAmnietyUncheckedUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeCreateManyBedTypeInput = {
    id?: number
    name?: string | null
    description?: string | null
    capacity?: number | null
    roomSize?: number | null
    pricePerNight?: Decimal | DecimalJsLike | number | string | null
    promotionPrice?: Decimal | DecimalJsLike | number | string | null
    isPromotion?: boolean | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomTypeUpdateWithoutBedTypeInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUpdateManyWithoutRoomTypeNestedInput
    roomImages?: RoomImageUpdateManyWithoutRoomTypeNestedInput
    roomAmniety?: RoomAmnietyUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeUncheckedUpdateWithoutBedTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUncheckedUpdateManyWithoutRoomTypeNestedInput
    roomImages?: RoomImageUncheckedUpdateManyWithoutRoomTypeNestedInput
    roomAmniety?: RoomAmnietyUncheckedUpdateManyWithoutRoomTypeNestedInput
  }

  export type RoomTypeUncheckedUpdateManyWithoutBedTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    roomSize?: NullableIntFieldUpdateOperationsInput | number | null
    pricePerNight?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    promotionPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isPromotion?: NullableBoolFieldUpdateOperationsInput | boolean | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateManyRoomStatusInput = {
    id?: number
    roomNumber?: string | null
    roomTypeId?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateWithoutRoomStatusInput = {
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomType?: RoomTypeUpdateOneWithoutRoomsNestedInput
  }

  export type RoomUncheckedUpdateWithoutRoomStatusInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roomTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyWithoutRoomStatusInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roomTypeId?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateManyRoomTypeInput = {
    id?: number
    roomNumber?: string | null
    roomStatusId?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomImageCreateManyRoomTypeInput = {
    id?: number
    imageUrl?: string | null
    imagePublicId?: string | null
    imageOrder?: number | null
    imageDefault?: boolean | null
  }

  export type RoomAmnietyCreateManyRoomTypeInput = {
    id?: number
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateWithoutRoomTypeInput = {
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomStatus?: RoomStatusUpdateOneWithoutRoomsNestedInput
  }

  export type RoomUncheckedUpdateWithoutRoomTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roomStatusId?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyWithoutRoomTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomNumber?: NullableStringFieldUpdateOperationsInput | string | null
    roomStatusId?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomImageUpdateWithoutRoomTypeInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    imageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    imageDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type RoomImageUncheckedUpdateWithoutRoomTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    imageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    imageDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type RoomImageUncheckedUpdateManyWithoutRoomTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagePublicId?: NullableStringFieldUpdateOperationsInput | string | null
    imageOrder?: NullableIntFieldUpdateOperationsInput | number | null
    imageDefault?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type RoomAmnietyUpdateWithoutRoomTypeInput = {
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomAmnietyUncheckedUpdateWithoutRoomTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomAmnietyUncheckedUpdateManyWithoutRoomTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}