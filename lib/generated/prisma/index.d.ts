
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
 * Model collections
 * 
 */
export type collections = $Result.DefaultSelection<Prisma.$collectionsPayload>
/**
 * Model guestbook_entries
 * 
 */
export type guestbook_entries = $Result.DefaultSelection<Prisma.$guestbook_entriesPayload>
/**
 * Model limited_collections
 * 
 */
export type limited_collections = $Result.DefaultSelection<Prisma.$limited_collectionsPayload>
/**
 * Model reports
 * 
 */
export type reports = $Result.DefaultSelection<Prisma.$reportsPayload>
/**
 * Model uploaded_files
 * 
 */
export type uploaded_files = $Result.DefaultSelection<Prisma.$uploaded_filesPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Priority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

export type Priority = (typeof Priority)[keyof typeof Priority]


export const ReportStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]


export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Priority = $Enums.Priority

export const Priority: typeof $Enums.Priority

export type ReportStatus = $Enums.ReportStatus

export const ReportStatus: typeof $Enums.ReportStatus

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Collections
 * const collections = await prisma.collections.findMany()
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
   * // Fetch zero or more Collections
   * const collections = await prisma.collections.findMany()
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
   * `prisma.collections`: Exposes CRUD operations for the **collections** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Collections
    * const collections = await prisma.collections.findMany()
    * ```
    */
  get collections(): Prisma.collectionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guestbook_entries`: Exposes CRUD operations for the **guestbook_entries** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guestbook_entries
    * const guestbook_entries = await prisma.guestbook_entries.findMany()
    * ```
    */
  get guestbook_entries(): Prisma.guestbook_entriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.limited_collections`: Exposes CRUD operations for the **limited_collections** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Limited_collections
    * const limited_collections = await prisma.limited_collections.findMany()
    * ```
    */
  get limited_collections(): Prisma.limited_collectionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reports`: Exposes CRUD operations for the **reports** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.reports.findMany()
    * ```
    */
  get reports(): Prisma.reportsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploaded_files`: Exposes CRUD operations for the **uploaded_files** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Uploaded_files
    * const uploaded_files = await prisma.uploaded_files.findMany()
    * ```
    */
  get uploaded_files(): Prisma.uploaded_filesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
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
    collections: 'collections',
    guestbook_entries: 'guestbook_entries',
    limited_collections: 'limited_collections',
    reports: 'reports',
    uploaded_files: 'uploaded_files',
    users: 'users'
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
      modelProps: "collections" | "guestbook_entries" | "limited_collections" | "reports" | "uploaded_files" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      collections: {
        payload: Prisma.$collectionsPayload<ExtArgs>
        fields: Prisma.collectionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.collectionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.collectionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload>
          }
          findFirst: {
            args: Prisma.collectionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.collectionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload>
          }
          findMany: {
            args: Prisma.collectionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload>[]
          }
          create: {
            args: Prisma.collectionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload>
          }
          createMany: {
            args: Prisma.collectionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.collectionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload>[]
          }
          delete: {
            args: Prisma.collectionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload>
          }
          update: {
            args: Prisma.collectionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload>
          }
          deleteMany: {
            args: Prisma.collectionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.collectionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.collectionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload>[]
          }
          upsert: {
            args: Prisma.collectionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$collectionsPayload>
          }
          aggregate: {
            args: Prisma.CollectionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollections>
          }
          groupBy: {
            args: Prisma.collectionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollectionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.collectionsCountArgs<ExtArgs>
            result: $Utils.Optional<CollectionsCountAggregateOutputType> | number
          }
        }
      }
      guestbook_entries: {
        payload: Prisma.$guestbook_entriesPayload<ExtArgs>
        fields: Prisma.guestbook_entriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.guestbook_entriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.guestbook_entriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload>
          }
          findFirst: {
            args: Prisma.guestbook_entriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.guestbook_entriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload>
          }
          findMany: {
            args: Prisma.guestbook_entriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload>[]
          }
          create: {
            args: Prisma.guestbook_entriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload>
          }
          createMany: {
            args: Prisma.guestbook_entriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.guestbook_entriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload>[]
          }
          delete: {
            args: Prisma.guestbook_entriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload>
          }
          update: {
            args: Prisma.guestbook_entriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload>
          }
          deleteMany: {
            args: Prisma.guestbook_entriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.guestbook_entriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.guestbook_entriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload>[]
          }
          upsert: {
            args: Prisma.guestbook_entriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guestbook_entriesPayload>
          }
          aggregate: {
            args: Prisma.Guestbook_entriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuestbook_entries>
          }
          groupBy: {
            args: Prisma.guestbook_entriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Guestbook_entriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.guestbook_entriesCountArgs<ExtArgs>
            result: $Utils.Optional<Guestbook_entriesCountAggregateOutputType> | number
          }
        }
      }
      limited_collections: {
        payload: Prisma.$limited_collectionsPayload<ExtArgs>
        fields: Prisma.limited_collectionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.limited_collectionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.limited_collectionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload>
          }
          findFirst: {
            args: Prisma.limited_collectionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.limited_collectionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload>
          }
          findMany: {
            args: Prisma.limited_collectionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload>[]
          }
          create: {
            args: Prisma.limited_collectionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload>
          }
          createMany: {
            args: Prisma.limited_collectionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.limited_collectionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload>[]
          }
          delete: {
            args: Prisma.limited_collectionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload>
          }
          update: {
            args: Prisma.limited_collectionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload>
          }
          deleteMany: {
            args: Prisma.limited_collectionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.limited_collectionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.limited_collectionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload>[]
          }
          upsert: {
            args: Prisma.limited_collectionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$limited_collectionsPayload>
          }
          aggregate: {
            args: Prisma.Limited_collectionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLimited_collections>
          }
          groupBy: {
            args: Prisma.limited_collectionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Limited_collectionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.limited_collectionsCountArgs<ExtArgs>
            result: $Utils.Optional<Limited_collectionsCountAggregateOutputType> | number
          }
        }
      }
      reports: {
        payload: Prisma.$reportsPayload<ExtArgs>
        fields: Prisma.reportsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.reportsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reportsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload>
          }
          findFirst: {
            args: Prisma.reportsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reportsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload>
          }
          findMany: {
            args: Prisma.reportsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload>[]
          }
          create: {
            args: Prisma.reportsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload>
          }
          createMany: {
            args: Prisma.reportsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.reportsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload>[]
          }
          delete: {
            args: Prisma.reportsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload>
          }
          update: {
            args: Prisma.reportsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload>
          }
          deleteMany: {
            args: Prisma.reportsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.reportsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.reportsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload>[]
          }
          upsert: {
            args: Prisma.reportsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reportsPayload>
          }
          aggregate: {
            args: Prisma.ReportsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReports>
          }
          groupBy: {
            args: Prisma.reportsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportsGroupByOutputType>[]
          }
          count: {
            args: Prisma.reportsCountArgs<ExtArgs>
            result: $Utils.Optional<ReportsCountAggregateOutputType> | number
          }
        }
      }
      uploaded_files: {
        payload: Prisma.$uploaded_filesPayload<ExtArgs>
        fields: Prisma.uploaded_filesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.uploaded_filesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.uploaded_filesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload>
          }
          findFirst: {
            args: Prisma.uploaded_filesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.uploaded_filesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload>
          }
          findMany: {
            args: Prisma.uploaded_filesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload>[]
          }
          create: {
            args: Prisma.uploaded_filesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload>
          }
          createMany: {
            args: Prisma.uploaded_filesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.uploaded_filesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload>[]
          }
          delete: {
            args: Prisma.uploaded_filesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload>
          }
          update: {
            args: Prisma.uploaded_filesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload>
          }
          deleteMany: {
            args: Prisma.uploaded_filesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.uploaded_filesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.uploaded_filesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload>[]
          }
          upsert: {
            args: Prisma.uploaded_filesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$uploaded_filesPayload>
          }
          aggregate: {
            args: Prisma.Uploaded_filesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUploaded_files>
          }
          groupBy: {
            args: Prisma.uploaded_filesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Uploaded_filesGroupByOutputType>[]
          }
          count: {
            args: Prisma.uploaded_filesCountArgs<ExtArgs>
            result: $Utils.Optional<Uploaded_filesCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
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
    collections?: collectionsOmit
    guestbook_entries?: guestbook_entriesOmit
    limited_collections?: limited_collectionsOmit
    reports?: reportsOmit
    uploaded_files?: uploaded_filesOmit
    users?: usersOmit
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
   * Count Type ReportsCountOutputType
   */

  export type ReportsCountOutputType = {
    files: number
  }

  export type ReportsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | ReportsCountOutputTypeCountFilesArgs
  }

  // Custom InputTypes
  /**
   * ReportsCountOutputType without action
   */
  export type ReportsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportsCountOutputType
     */
    select?: ReportsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReportsCountOutputType without action
   */
  export type ReportsCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: uploaded_filesWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    collections: number
    guestbook_entries: number
    limited_collections: number
    reports_reports_assignee_idTousers: number
    reports_reports_author_idTousers: number
    uploaded_files: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collections?: boolean | UsersCountOutputTypeCountCollectionsArgs
    guestbook_entries?: boolean | UsersCountOutputTypeCountGuestbook_entriesArgs
    limited_collections?: boolean | UsersCountOutputTypeCountLimited_collectionsArgs
    reports_reports_assignee_idTousers?: boolean | UsersCountOutputTypeCountReports_reports_assignee_idTousersArgs
    reports_reports_author_idTousers?: boolean | UsersCountOutputTypeCountReports_reports_author_idTousersArgs
    uploaded_files?: boolean | UsersCountOutputTypeCountUploaded_filesArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCollectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: collectionsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountGuestbook_entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: guestbook_entriesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountLimited_collectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: limited_collectionsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountReports_reports_assignee_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reportsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountReports_reports_author_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reportsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountUploaded_filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: uploaded_filesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model collections
   */

  export type AggregateCollections = {
    _count: CollectionsCountAggregateOutputType | null
    _min: CollectionsMinAggregateOutputType | null
    _max: CollectionsMaxAggregateOutputType | null
  }

  export type CollectionsMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    image_url: string | null
    category: string | null
    tags: string | null
    is_public: boolean | null
    author_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CollectionsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    image_url: string | null
    category: string | null
    tags: string | null
    is_public: boolean | null
    author_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CollectionsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    content: number
    image_url: number
    category: number
    tags: number
    is_public: number
    author_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CollectionsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    image_url?: true
    category?: true
    tags?: true
    is_public?: true
    author_id?: true
    created_at?: true
    updated_at?: true
  }

  export type CollectionsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    image_url?: true
    category?: true
    tags?: true
    is_public?: true
    author_id?: true
    created_at?: true
    updated_at?: true
  }

  export type CollectionsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    image_url?: true
    category?: true
    tags?: true
    is_public?: true
    author_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CollectionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which collections to aggregate.
     */
    where?: collectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of collections to fetch.
     */
    orderBy?: collectionsOrderByWithRelationInput | collectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: collectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` collections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned collections
    **/
    _count?: true | CollectionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollectionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollectionsMaxAggregateInputType
  }

  export type GetCollectionsAggregateType<T extends CollectionsAggregateArgs> = {
        [P in keyof T & keyof AggregateCollections]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollections[P]>
      : GetScalarType<T[P], AggregateCollections[P]>
  }




  export type collectionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: collectionsWhereInput
    orderBy?: collectionsOrderByWithAggregationInput | collectionsOrderByWithAggregationInput[]
    by: CollectionsScalarFieldEnum[] | CollectionsScalarFieldEnum
    having?: collectionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollectionsCountAggregateInputType | true
    _min?: CollectionsMinAggregateInputType
    _max?: CollectionsMaxAggregateInputType
  }

  export type CollectionsGroupByOutputType = {
    id: string
    title: string
    description: string | null
    content: string
    image_url: string | null
    category: string | null
    tags: string | null
    is_public: boolean
    author_id: string
    created_at: Date
    updated_at: Date
    _count: CollectionsCountAggregateOutputType | null
    _min: CollectionsMinAggregateOutputType | null
    _max: CollectionsMaxAggregateOutputType | null
  }

  type GetCollectionsGroupByPayload<T extends collectionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollectionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollectionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollectionsGroupByOutputType[P]>
            : GetScalarType<T[P], CollectionsGroupByOutputType[P]>
        }
      >
    >


  export type collectionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    image_url?: boolean
    category?: boolean
    tags?: boolean
    is_public?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collections"]>

  export type collectionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    image_url?: boolean
    category?: boolean
    tags?: boolean
    is_public?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collections"]>

  export type collectionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    image_url?: boolean
    category?: boolean
    tags?: boolean
    is_public?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collections"]>

  export type collectionsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    image_url?: boolean
    category?: boolean
    tags?: boolean
    is_public?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type collectionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "content" | "image_url" | "category" | "tags" | "is_public" | "author_id" | "created_at" | "updated_at", ExtArgs["result"]["collections"]>
  export type collectionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type collectionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type collectionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $collectionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "collections"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      content: string
      image_url: string | null
      category: string | null
      tags: string | null
      is_public: boolean
      author_id: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["collections"]>
    composites: {}
  }

  type collectionsGetPayload<S extends boolean | null | undefined | collectionsDefaultArgs> = $Result.GetResult<Prisma.$collectionsPayload, S>

  type collectionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<collectionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollectionsCountAggregateInputType | true
    }

  export interface collectionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['collections'], meta: { name: 'collections' } }
    /**
     * Find zero or one Collections that matches the filter.
     * @param {collectionsFindUniqueArgs} args - Arguments to find a Collections
     * @example
     * // Get one Collections
     * const collections = await prisma.collections.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends collectionsFindUniqueArgs>(args: SelectSubset<T, collectionsFindUniqueArgs<ExtArgs>>): Prisma__collectionsClient<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Collections that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {collectionsFindUniqueOrThrowArgs} args - Arguments to find a Collections
     * @example
     * // Get one Collections
     * const collections = await prisma.collections.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends collectionsFindUniqueOrThrowArgs>(args: SelectSubset<T, collectionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__collectionsClient<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {collectionsFindFirstArgs} args - Arguments to find a Collections
     * @example
     * // Get one Collections
     * const collections = await prisma.collections.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends collectionsFindFirstArgs>(args?: SelectSubset<T, collectionsFindFirstArgs<ExtArgs>>): Prisma__collectionsClient<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collections that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {collectionsFindFirstOrThrowArgs} args - Arguments to find a Collections
     * @example
     * // Get one Collections
     * const collections = await prisma.collections.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends collectionsFindFirstOrThrowArgs>(args?: SelectSubset<T, collectionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__collectionsClient<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Collections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {collectionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Collections
     * const collections = await prisma.collections.findMany()
     * 
     * // Get first 10 Collections
     * const collections = await prisma.collections.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const collectionsWithIdOnly = await prisma.collections.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends collectionsFindManyArgs>(args?: SelectSubset<T, collectionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Collections.
     * @param {collectionsCreateArgs} args - Arguments to create a Collections.
     * @example
     * // Create one Collections
     * const Collections = await prisma.collections.create({
     *   data: {
     *     // ... data to create a Collections
     *   }
     * })
     * 
     */
    create<T extends collectionsCreateArgs>(args: SelectSubset<T, collectionsCreateArgs<ExtArgs>>): Prisma__collectionsClient<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Collections.
     * @param {collectionsCreateManyArgs} args - Arguments to create many Collections.
     * @example
     * // Create many Collections
     * const collections = await prisma.collections.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends collectionsCreateManyArgs>(args?: SelectSubset<T, collectionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Collections and returns the data saved in the database.
     * @param {collectionsCreateManyAndReturnArgs} args - Arguments to create many Collections.
     * @example
     * // Create many Collections
     * const collections = await prisma.collections.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Collections and only return the `id`
     * const collectionsWithIdOnly = await prisma.collections.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends collectionsCreateManyAndReturnArgs>(args?: SelectSubset<T, collectionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Collections.
     * @param {collectionsDeleteArgs} args - Arguments to delete one Collections.
     * @example
     * // Delete one Collections
     * const Collections = await prisma.collections.delete({
     *   where: {
     *     // ... filter to delete one Collections
     *   }
     * })
     * 
     */
    delete<T extends collectionsDeleteArgs>(args: SelectSubset<T, collectionsDeleteArgs<ExtArgs>>): Prisma__collectionsClient<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Collections.
     * @param {collectionsUpdateArgs} args - Arguments to update one Collections.
     * @example
     * // Update one Collections
     * const collections = await prisma.collections.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends collectionsUpdateArgs>(args: SelectSubset<T, collectionsUpdateArgs<ExtArgs>>): Prisma__collectionsClient<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Collections.
     * @param {collectionsDeleteManyArgs} args - Arguments to filter Collections to delete.
     * @example
     * // Delete a few Collections
     * const { count } = await prisma.collections.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends collectionsDeleteManyArgs>(args?: SelectSubset<T, collectionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {collectionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Collections
     * const collections = await prisma.collections.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends collectionsUpdateManyArgs>(args: SelectSubset<T, collectionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collections and returns the data updated in the database.
     * @param {collectionsUpdateManyAndReturnArgs} args - Arguments to update many Collections.
     * @example
     * // Update many Collections
     * const collections = await prisma.collections.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Collections and only return the `id`
     * const collectionsWithIdOnly = await prisma.collections.updateManyAndReturn({
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
    updateManyAndReturn<T extends collectionsUpdateManyAndReturnArgs>(args: SelectSubset<T, collectionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Collections.
     * @param {collectionsUpsertArgs} args - Arguments to update or create a Collections.
     * @example
     * // Update or create a Collections
     * const collections = await prisma.collections.upsert({
     *   create: {
     *     // ... data to create a Collections
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Collections we want to update
     *   }
     * })
     */
    upsert<T extends collectionsUpsertArgs>(args: SelectSubset<T, collectionsUpsertArgs<ExtArgs>>): Prisma__collectionsClient<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Collections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {collectionsCountArgs} args - Arguments to filter Collections to count.
     * @example
     * // Count the number of Collections
     * const count = await prisma.collections.count({
     *   where: {
     *     // ... the filter for the Collections we want to count
     *   }
     * })
    **/
    count<T extends collectionsCountArgs>(
      args?: Subset<T, collectionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollectionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Collections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollectionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CollectionsAggregateArgs>(args: Subset<T, CollectionsAggregateArgs>): Prisma.PrismaPromise<GetCollectionsAggregateType<T>>

    /**
     * Group by Collections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {collectionsGroupByArgs} args - Group by arguments.
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
      T extends collectionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: collectionsGroupByArgs['orderBy'] }
        : { orderBy?: collectionsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, collectionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollectionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the collections model
   */
  readonly fields: collectionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for collections.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__collectionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the collections model
   */
  interface collectionsFieldRefs {
    readonly id: FieldRef<"collections", 'String'>
    readonly title: FieldRef<"collections", 'String'>
    readonly description: FieldRef<"collections", 'String'>
    readonly content: FieldRef<"collections", 'String'>
    readonly image_url: FieldRef<"collections", 'String'>
    readonly category: FieldRef<"collections", 'String'>
    readonly tags: FieldRef<"collections", 'String'>
    readonly is_public: FieldRef<"collections", 'Boolean'>
    readonly author_id: FieldRef<"collections", 'String'>
    readonly created_at: FieldRef<"collections", 'DateTime'>
    readonly updated_at: FieldRef<"collections", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * collections findUnique
   */
  export type collectionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
    /**
     * Filter, which collections to fetch.
     */
    where: collectionsWhereUniqueInput
  }

  /**
   * collections findUniqueOrThrow
   */
  export type collectionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
    /**
     * Filter, which collections to fetch.
     */
    where: collectionsWhereUniqueInput
  }

  /**
   * collections findFirst
   */
  export type collectionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
    /**
     * Filter, which collections to fetch.
     */
    where?: collectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of collections to fetch.
     */
    orderBy?: collectionsOrderByWithRelationInput | collectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for collections.
     */
    cursor?: collectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` collections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of collections.
     */
    distinct?: CollectionsScalarFieldEnum | CollectionsScalarFieldEnum[]
  }

  /**
   * collections findFirstOrThrow
   */
  export type collectionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
    /**
     * Filter, which collections to fetch.
     */
    where?: collectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of collections to fetch.
     */
    orderBy?: collectionsOrderByWithRelationInput | collectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for collections.
     */
    cursor?: collectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` collections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of collections.
     */
    distinct?: CollectionsScalarFieldEnum | CollectionsScalarFieldEnum[]
  }

  /**
   * collections findMany
   */
  export type collectionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
    /**
     * Filter, which collections to fetch.
     */
    where?: collectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of collections to fetch.
     */
    orderBy?: collectionsOrderByWithRelationInput | collectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing collections.
     */
    cursor?: collectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` collections.
     */
    skip?: number
    distinct?: CollectionsScalarFieldEnum | CollectionsScalarFieldEnum[]
  }

  /**
   * collections create
   */
  export type collectionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
    /**
     * The data needed to create a collections.
     */
    data: XOR<collectionsCreateInput, collectionsUncheckedCreateInput>
  }

  /**
   * collections createMany
   */
  export type collectionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many collections.
     */
    data: collectionsCreateManyInput | collectionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * collections createManyAndReturn
   */
  export type collectionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * The data used to create many collections.
     */
    data: collectionsCreateManyInput | collectionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * collections update
   */
  export type collectionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
    /**
     * The data needed to update a collections.
     */
    data: XOR<collectionsUpdateInput, collectionsUncheckedUpdateInput>
    /**
     * Choose, which collections to update.
     */
    where: collectionsWhereUniqueInput
  }

  /**
   * collections updateMany
   */
  export type collectionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update collections.
     */
    data: XOR<collectionsUpdateManyMutationInput, collectionsUncheckedUpdateManyInput>
    /**
     * Filter which collections to update
     */
    where?: collectionsWhereInput
    /**
     * Limit how many collections to update.
     */
    limit?: number
  }

  /**
   * collections updateManyAndReturn
   */
  export type collectionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * The data used to update collections.
     */
    data: XOR<collectionsUpdateManyMutationInput, collectionsUncheckedUpdateManyInput>
    /**
     * Filter which collections to update
     */
    where?: collectionsWhereInput
    /**
     * Limit how many collections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * collections upsert
   */
  export type collectionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
    /**
     * The filter to search for the collections to update in case it exists.
     */
    where: collectionsWhereUniqueInput
    /**
     * In case the collections found by the `where` argument doesn't exist, create a new collections with this data.
     */
    create: XOR<collectionsCreateInput, collectionsUncheckedCreateInput>
    /**
     * In case the collections was found with the provided `where` argument, update it with this data.
     */
    update: XOR<collectionsUpdateInput, collectionsUncheckedUpdateInput>
  }

  /**
   * collections delete
   */
  export type collectionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
    /**
     * Filter which collections to delete.
     */
    where: collectionsWhereUniqueInput
  }

  /**
   * collections deleteMany
   */
  export type collectionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which collections to delete
     */
    where?: collectionsWhereInput
    /**
     * Limit how many collections to delete.
     */
    limit?: number
  }

  /**
   * collections without action
   */
  export type collectionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
  }


  /**
   * Model guestbook_entries
   */

  export type AggregateGuestbook_entries = {
    _count: Guestbook_entriesCountAggregateOutputType | null
    _min: Guestbook_entriesMinAggregateOutputType | null
    _max: Guestbook_entriesMaxAggregateOutputType | null
  }

  export type Guestbook_entriesMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    message: string | null
    is_approved: boolean | null
    author_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Guestbook_entriesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    message: string | null
    is_approved: boolean | null
    author_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Guestbook_entriesCountAggregateOutputType = {
    id: number
    name: number
    email: number
    message: number
    is_approved: number
    author_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Guestbook_entriesMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    message?: true
    is_approved?: true
    author_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Guestbook_entriesMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    message?: true
    is_approved?: true
    author_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Guestbook_entriesCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    message?: true
    is_approved?: true
    author_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Guestbook_entriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which guestbook_entries to aggregate.
     */
    where?: guestbook_entriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guestbook_entries to fetch.
     */
    orderBy?: guestbook_entriesOrderByWithRelationInput | guestbook_entriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: guestbook_entriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guestbook_entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guestbook_entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned guestbook_entries
    **/
    _count?: true | Guestbook_entriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Guestbook_entriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Guestbook_entriesMaxAggregateInputType
  }

  export type GetGuestbook_entriesAggregateType<T extends Guestbook_entriesAggregateArgs> = {
        [P in keyof T & keyof AggregateGuestbook_entries]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuestbook_entries[P]>
      : GetScalarType<T[P], AggregateGuestbook_entries[P]>
  }




  export type guestbook_entriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: guestbook_entriesWhereInput
    orderBy?: guestbook_entriesOrderByWithAggregationInput | guestbook_entriesOrderByWithAggregationInput[]
    by: Guestbook_entriesScalarFieldEnum[] | Guestbook_entriesScalarFieldEnum
    having?: guestbook_entriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Guestbook_entriesCountAggregateInputType | true
    _min?: Guestbook_entriesMinAggregateInputType
    _max?: Guestbook_entriesMaxAggregateInputType
  }

  export type Guestbook_entriesGroupByOutputType = {
    id: string
    name: string
    email: string | null
    message: string
    is_approved: boolean
    author_id: string | null
    created_at: Date
    updated_at: Date
    _count: Guestbook_entriesCountAggregateOutputType | null
    _min: Guestbook_entriesMinAggregateOutputType | null
    _max: Guestbook_entriesMaxAggregateOutputType | null
  }

  type GetGuestbook_entriesGroupByPayload<T extends guestbook_entriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Guestbook_entriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Guestbook_entriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Guestbook_entriesGroupByOutputType[P]>
            : GetScalarType<T[P], Guestbook_entriesGroupByOutputType[P]>
        }
      >
    >


  export type guestbook_entriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    message?: boolean
    is_approved?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | guestbook_entries$usersArgs<ExtArgs>
  }, ExtArgs["result"]["guestbook_entries"]>

  export type guestbook_entriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    message?: boolean
    is_approved?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | guestbook_entries$usersArgs<ExtArgs>
  }, ExtArgs["result"]["guestbook_entries"]>

  export type guestbook_entriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    message?: boolean
    is_approved?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | guestbook_entries$usersArgs<ExtArgs>
  }, ExtArgs["result"]["guestbook_entries"]>

  export type guestbook_entriesSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    message?: boolean
    is_approved?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type guestbook_entriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "message" | "is_approved" | "author_id" | "created_at" | "updated_at", ExtArgs["result"]["guestbook_entries"]>
  export type guestbook_entriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | guestbook_entries$usersArgs<ExtArgs>
  }
  export type guestbook_entriesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | guestbook_entries$usersArgs<ExtArgs>
  }
  export type guestbook_entriesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | guestbook_entries$usersArgs<ExtArgs>
  }

  export type $guestbook_entriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "guestbook_entries"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      message: string
      is_approved: boolean
      author_id: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["guestbook_entries"]>
    composites: {}
  }

  type guestbook_entriesGetPayload<S extends boolean | null | undefined | guestbook_entriesDefaultArgs> = $Result.GetResult<Prisma.$guestbook_entriesPayload, S>

  type guestbook_entriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<guestbook_entriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Guestbook_entriesCountAggregateInputType | true
    }

  export interface guestbook_entriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['guestbook_entries'], meta: { name: 'guestbook_entries' } }
    /**
     * Find zero or one Guestbook_entries that matches the filter.
     * @param {guestbook_entriesFindUniqueArgs} args - Arguments to find a Guestbook_entries
     * @example
     * // Get one Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends guestbook_entriesFindUniqueArgs>(args: SelectSubset<T, guestbook_entriesFindUniqueArgs<ExtArgs>>): Prisma__guestbook_entriesClient<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Guestbook_entries that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {guestbook_entriesFindUniqueOrThrowArgs} args - Arguments to find a Guestbook_entries
     * @example
     * // Get one Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends guestbook_entriesFindUniqueOrThrowArgs>(args: SelectSubset<T, guestbook_entriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__guestbook_entriesClient<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guestbook_entries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guestbook_entriesFindFirstArgs} args - Arguments to find a Guestbook_entries
     * @example
     * // Get one Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends guestbook_entriesFindFirstArgs>(args?: SelectSubset<T, guestbook_entriesFindFirstArgs<ExtArgs>>): Prisma__guestbook_entriesClient<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guestbook_entries that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guestbook_entriesFindFirstOrThrowArgs} args - Arguments to find a Guestbook_entries
     * @example
     * // Get one Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends guestbook_entriesFindFirstOrThrowArgs>(args?: SelectSubset<T, guestbook_entriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__guestbook_entriesClient<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Guestbook_entries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guestbook_entriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.findMany()
     * 
     * // Get first 10 Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guestbook_entriesWithIdOnly = await prisma.guestbook_entries.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends guestbook_entriesFindManyArgs>(args?: SelectSubset<T, guestbook_entriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Guestbook_entries.
     * @param {guestbook_entriesCreateArgs} args - Arguments to create a Guestbook_entries.
     * @example
     * // Create one Guestbook_entries
     * const Guestbook_entries = await prisma.guestbook_entries.create({
     *   data: {
     *     // ... data to create a Guestbook_entries
     *   }
     * })
     * 
     */
    create<T extends guestbook_entriesCreateArgs>(args: SelectSubset<T, guestbook_entriesCreateArgs<ExtArgs>>): Prisma__guestbook_entriesClient<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Guestbook_entries.
     * @param {guestbook_entriesCreateManyArgs} args - Arguments to create many Guestbook_entries.
     * @example
     * // Create many Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends guestbook_entriesCreateManyArgs>(args?: SelectSubset<T, guestbook_entriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Guestbook_entries and returns the data saved in the database.
     * @param {guestbook_entriesCreateManyAndReturnArgs} args - Arguments to create many Guestbook_entries.
     * @example
     * // Create many Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Guestbook_entries and only return the `id`
     * const guestbook_entriesWithIdOnly = await prisma.guestbook_entries.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends guestbook_entriesCreateManyAndReturnArgs>(args?: SelectSubset<T, guestbook_entriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Guestbook_entries.
     * @param {guestbook_entriesDeleteArgs} args - Arguments to delete one Guestbook_entries.
     * @example
     * // Delete one Guestbook_entries
     * const Guestbook_entries = await prisma.guestbook_entries.delete({
     *   where: {
     *     // ... filter to delete one Guestbook_entries
     *   }
     * })
     * 
     */
    delete<T extends guestbook_entriesDeleteArgs>(args: SelectSubset<T, guestbook_entriesDeleteArgs<ExtArgs>>): Prisma__guestbook_entriesClient<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Guestbook_entries.
     * @param {guestbook_entriesUpdateArgs} args - Arguments to update one Guestbook_entries.
     * @example
     * // Update one Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends guestbook_entriesUpdateArgs>(args: SelectSubset<T, guestbook_entriesUpdateArgs<ExtArgs>>): Prisma__guestbook_entriesClient<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Guestbook_entries.
     * @param {guestbook_entriesDeleteManyArgs} args - Arguments to filter Guestbook_entries to delete.
     * @example
     * // Delete a few Guestbook_entries
     * const { count } = await prisma.guestbook_entries.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends guestbook_entriesDeleteManyArgs>(args?: SelectSubset<T, guestbook_entriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guestbook_entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guestbook_entriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends guestbook_entriesUpdateManyArgs>(args: SelectSubset<T, guestbook_entriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guestbook_entries and returns the data updated in the database.
     * @param {guestbook_entriesUpdateManyAndReturnArgs} args - Arguments to update many Guestbook_entries.
     * @example
     * // Update many Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Guestbook_entries and only return the `id`
     * const guestbook_entriesWithIdOnly = await prisma.guestbook_entries.updateManyAndReturn({
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
    updateManyAndReturn<T extends guestbook_entriesUpdateManyAndReturnArgs>(args: SelectSubset<T, guestbook_entriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Guestbook_entries.
     * @param {guestbook_entriesUpsertArgs} args - Arguments to update or create a Guestbook_entries.
     * @example
     * // Update or create a Guestbook_entries
     * const guestbook_entries = await prisma.guestbook_entries.upsert({
     *   create: {
     *     // ... data to create a Guestbook_entries
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guestbook_entries we want to update
     *   }
     * })
     */
    upsert<T extends guestbook_entriesUpsertArgs>(args: SelectSubset<T, guestbook_entriesUpsertArgs<ExtArgs>>): Prisma__guestbook_entriesClient<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Guestbook_entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guestbook_entriesCountArgs} args - Arguments to filter Guestbook_entries to count.
     * @example
     * // Count the number of Guestbook_entries
     * const count = await prisma.guestbook_entries.count({
     *   where: {
     *     // ... the filter for the Guestbook_entries we want to count
     *   }
     * })
    **/
    count<T extends guestbook_entriesCountArgs>(
      args?: Subset<T, guestbook_entriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Guestbook_entriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guestbook_entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Guestbook_entriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Guestbook_entriesAggregateArgs>(args: Subset<T, Guestbook_entriesAggregateArgs>): Prisma.PrismaPromise<GetGuestbook_entriesAggregateType<T>>

    /**
     * Group by Guestbook_entries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guestbook_entriesGroupByArgs} args - Group by arguments.
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
      T extends guestbook_entriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: guestbook_entriesGroupByArgs['orderBy'] }
        : { orderBy?: guestbook_entriesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, guestbook_entriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuestbook_entriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the guestbook_entries model
   */
  readonly fields: guestbook_entriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for guestbook_entries.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__guestbook_entriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends guestbook_entries$usersArgs<ExtArgs> = {}>(args?: Subset<T, guestbook_entries$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the guestbook_entries model
   */
  interface guestbook_entriesFieldRefs {
    readonly id: FieldRef<"guestbook_entries", 'String'>
    readonly name: FieldRef<"guestbook_entries", 'String'>
    readonly email: FieldRef<"guestbook_entries", 'String'>
    readonly message: FieldRef<"guestbook_entries", 'String'>
    readonly is_approved: FieldRef<"guestbook_entries", 'Boolean'>
    readonly author_id: FieldRef<"guestbook_entries", 'String'>
    readonly created_at: FieldRef<"guestbook_entries", 'DateTime'>
    readonly updated_at: FieldRef<"guestbook_entries", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * guestbook_entries findUnique
   */
  export type guestbook_entriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
    /**
     * Filter, which guestbook_entries to fetch.
     */
    where: guestbook_entriesWhereUniqueInput
  }

  /**
   * guestbook_entries findUniqueOrThrow
   */
  export type guestbook_entriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
    /**
     * Filter, which guestbook_entries to fetch.
     */
    where: guestbook_entriesWhereUniqueInput
  }

  /**
   * guestbook_entries findFirst
   */
  export type guestbook_entriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
    /**
     * Filter, which guestbook_entries to fetch.
     */
    where?: guestbook_entriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guestbook_entries to fetch.
     */
    orderBy?: guestbook_entriesOrderByWithRelationInput | guestbook_entriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for guestbook_entries.
     */
    cursor?: guestbook_entriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guestbook_entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guestbook_entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of guestbook_entries.
     */
    distinct?: Guestbook_entriesScalarFieldEnum | Guestbook_entriesScalarFieldEnum[]
  }

  /**
   * guestbook_entries findFirstOrThrow
   */
  export type guestbook_entriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
    /**
     * Filter, which guestbook_entries to fetch.
     */
    where?: guestbook_entriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guestbook_entries to fetch.
     */
    orderBy?: guestbook_entriesOrderByWithRelationInput | guestbook_entriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for guestbook_entries.
     */
    cursor?: guestbook_entriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guestbook_entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guestbook_entries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of guestbook_entries.
     */
    distinct?: Guestbook_entriesScalarFieldEnum | Guestbook_entriesScalarFieldEnum[]
  }

  /**
   * guestbook_entries findMany
   */
  export type guestbook_entriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
    /**
     * Filter, which guestbook_entries to fetch.
     */
    where?: guestbook_entriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guestbook_entries to fetch.
     */
    orderBy?: guestbook_entriesOrderByWithRelationInput | guestbook_entriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing guestbook_entries.
     */
    cursor?: guestbook_entriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guestbook_entries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guestbook_entries.
     */
    skip?: number
    distinct?: Guestbook_entriesScalarFieldEnum | Guestbook_entriesScalarFieldEnum[]
  }

  /**
   * guestbook_entries create
   */
  export type guestbook_entriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
    /**
     * The data needed to create a guestbook_entries.
     */
    data: XOR<guestbook_entriesCreateInput, guestbook_entriesUncheckedCreateInput>
  }

  /**
   * guestbook_entries createMany
   */
  export type guestbook_entriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many guestbook_entries.
     */
    data: guestbook_entriesCreateManyInput | guestbook_entriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * guestbook_entries createManyAndReturn
   */
  export type guestbook_entriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * The data used to create many guestbook_entries.
     */
    data: guestbook_entriesCreateManyInput | guestbook_entriesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * guestbook_entries update
   */
  export type guestbook_entriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
    /**
     * The data needed to update a guestbook_entries.
     */
    data: XOR<guestbook_entriesUpdateInput, guestbook_entriesUncheckedUpdateInput>
    /**
     * Choose, which guestbook_entries to update.
     */
    where: guestbook_entriesWhereUniqueInput
  }

  /**
   * guestbook_entries updateMany
   */
  export type guestbook_entriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update guestbook_entries.
     */
    data: XOR<guestbook_entriesUpdateManyMutationInput, guestbook_entriesUncheckedUpdateManyInput>
    /**
     * Filter which guestbook_entries to update
     */
    where?: guestbook_entriesWhereInput
    /**
     * Limit how many guestbook_entries to update.
     */
    limit?: number
  }

  /**
   * guestbook_entries updateManyAndReturn
   */
  export type guestbook_entriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * The data used to update guestbook_entries.
     */
    data: XOR<guestbook_entriesUpdateManyMutationInput, guestbook_entriesUncheckedUpdateManyInput>
    /**
     * Filter which guestbook_entries to update
     */
    where?: guestbook_entriesWhereInput
    /**
     * Limit how many guestbook_entries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * guestbook_entries upsert
   */
  export type guestbook_entriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
    /**
     * The filter to search for the guestbook_entries to update in case it exists.
     */
    where: guestbook_entriesWhereUniqueInput
    /**
     * In case the guestbook_entries found by the `where` argument doesn't exist, create a new guestbook_entries with this data.
     */
    create: XOR<guestbook_entriesCreateInput, guestbook_entriesUncheckedCreateInput>
    /**
     * In case the guestbook_entries was found with the provided `where` argument, update it with this data.
     */
    update: XOR<guestbook_entriesUpdateInput, guestbook_entriesUncheckedUpdateInput>
  }

  /**
   * guestbook_entries delete
   */
  export type guestbook_entriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
    /**
     * Filter which guestbook_entries to delete.
     */
    where: guestbook_entriesWhereUniqueInput
  }

  /**
   * guestbook_entries deleteMany
   */
  export type guestbook_entriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which guestbook_entries to delete
     */
    where?: guestbook_entriesWhereInput
    /**
     * Limit how many guestbook_entries to delete.
     */
    limit?: number
  }

  /**
   * guestbook_entries.users
   */
  export type guestbook_entries$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * guestbook_entries without action
   */
  export type guestbook_entriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
  }


  /**
   * Model limited_collections
   */

  export type AggregateLimited_collections = {
    _count: Limited_collectionsCountAggregateOutputType | null
    _avg: Limited_collectionsAvgAggregateOutputType | null
    _sum: Limited_collectionsSumAggregateOutputType | null
    _min: Limited_collectionsMinAggregateOutputType | null
    _max: Limited_collectionsMaxAggregateOutputType | null
  }

  export type Limited_collectionsAvgAggregateOutputType = {
    max_access: number | null
    current_access: number | null
  }

  export type Limited_collectionsSumAggregateOutputType = {
    max_access: number | null
    current_access: number | null
  }

  export type Limited_collectionsMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    image_url: string | null
    category: string | null
    tags: string | null
    max_access: number | null
    current_access: number | null
    is_active: boolean | null
    author_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Limited_collectionsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    image_url: string | null
    category: string | null
    tags: string | null
    max_access: number | null
    current_access: number | null
    is_active: boolean | null
    author_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Limited_collectionsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    content: number
    image_url: number
    category: number
    tags: number
    max_access: number
    current_access: number
    is_active: number
    author_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Limited_collectionsAvgAggregateInputType = {
    max_access?: true
    current_access?: true
  }

  export type Limited_collectionsSumAggregateInputType = {
    max_access?: true
    current_access?: true
  }

  export type Limited_collectionsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    image_url?: true
    category?: true
    tags?: true
    max_access?: true
    current_access?: true
    is_active?: true
    author_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Limited_collectionsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    image_url?: true
    category?: true
    tags?: true
    max_access?: true
    current_access?: true
    is_active?: true
    author_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Limited_collectionsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    image_url?: true
    category?: true
    tags?: true
    max_access?: true
    current_access?: true
    is_active?: true
    author_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Limited_collectionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which limited_collections to aggregate.
     */
    where?: limited_collectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of limited_collections to fetch.
     */
    orderBy?: limited_collectionsOrderByWithRelationInput | limited_collectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: limited_collectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` limited_collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` limited_collections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned limited_collections
    **/
    _count?: true | Limited_collectionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Limited_collectionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Limited_collectionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Limited_collectionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Limited_collectionsMaxAggregateInputType
  }

  export type GetLimited_collectionsAggregateType<T extends Limited_collectionsAggregateArgs> = {
        [P in keyof T & keyof AggregateLimited_collections]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLimited_collections[P]>
      : GetScalarType<T[P], AggregateLimited_collections[P]>
  }




  export type limited_collectionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: limited_collectionsWhereInput
    orderBy?: limited_collectionsOrderByWithAggregationInput | limited_collectionsOrderByWithAggregationInput[]
    by: Limited_collectionsScalarFieldEnum[] | Limited_collectionsScalarFieldEnum
    having?: limited_collectionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Limited_collectionsCountAggregateInputType | true
    _avg?: Limited_collectionsAvgAggregateInputType
    _sum?: Limited_collectionsSumAggregateInputType
    _min?: Limited_collectionsMinAggregateInputType
    _max?: Limited_collectionsMaxAggregateInputType
  }

  export type Limited_collectionsGroupByOutputType = {
    id: string
    title: string
    description: string | null
    content: string
    image_url: string | null
    category: string | null
    tags: string | null
    max_access: number
    current_access: number
    is_active: boolean
    author_id: string
    created_at: Date
    updated_at: Date
    _count: Limited_collectionsCountAggregateOutputType | null
    _avg: Limited_collectionsAvgAggregateOutputType | null
    _sum: Limited_collectionsSumAggregateOutputType | null
    _min: Limited_collectionsMinAggregateOutputType | null
    _max: Limited_collectionsMaxAggregateOutputType | null
  }

  type GetLimited_collectionsGroupByPayload<T extends limited_collectionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Limited_collectionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Limited_collectionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Limited_collectionsGroupByOutputType[P]>
            : GetScalarType<T[P], Limited_collectionsGroupByOutputType[P]>
        }
      >
    >


  export type limited_collectionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    image_url?: boolean
    category?: boolean
    tags?: boolean
    max_access?: boolean
    current_access?: boolean
    is_active?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["limited_collections"]>

  export type limited_collectionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    image_url?: boolean
    category?: boolean
    tags?: boolean
    max_access?: boolean
    current_access?: boolean
    is_active?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["limited_collections"]>

  export type limited_collectionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    image_url?: boolean
    category?: boolean
    tags?: boolean
    max_access?: boolean
    current_access?: boolean
    is_active?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["limited_collections"]>

  export type limited_collectionsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    image_url?: boolean
    category?: boolean
    tags?: boolean
    max_access?: boolean
    current_access?: boolean
    is_active?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type limited_collectionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "content" | "image_url" | "category" | "tags" | "max_access" | "current_access" | "is_active" | "author_id" | "created_at" | "updated_at", ExtArgs["result"]["limited_collections"]>
  export type limited_collectionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type limited_collectionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type limited_collectionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $limited_collectionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "limited_collections"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      content: string
      image_url: string | null
      category: string | null
      tags: string | null
      max_access: number
      current_access: number
      is_active: boolean
      author_id: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["limited_collections"]>
    composites: {}
  }

  type limited_collectionsGetPayload<S extends boolean | null | undefined | limited_collectionsDefaultArgs> = $Result.GetResult<Prisma.$limited_collectionsPayload, S>

  type limited_collectionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<limited_collectionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Limited_collectionsCountAggregateInputType | true
    }

  export interface limited_collectionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['limited_collections'], meta: { name: 'limited_collections' } }
    /**
     * Find zero or one Limited_collections that matches the filter.
     * @param {limited_collectionsFindUniqueArgs} args - Arguments to find a Limited_collections
     * @example
     * // Get one Limited_collections
     * const limited_collections = await prisma.limited_collections.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends limited_collectionsFindUniqueArgs>(args: SelectSubset<T, limited_collectionsFindUniqueArgs<ExtArgs>>): Prisma__limited_collectionsClient<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Limited_collections that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {limited_collectionsFindUniqueOrThrowArgs} args - Arguments to find a Limited_collections
     * @example
     * // Get one Limited_collections
     * const limited_collections = await prisma.limited_collections.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends limited_collectionsFindUniqueOrThrowArgs>(args: SelectSubset<T, limited_collectionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__limited_collectionsClient<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Limited_collections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {limited_collectionsFindFirstArgs} args - Arguments to find a Limited_collections
     * @example
     * // Get one Limited_collections
     * const limited_collections = await prisma.limited_collections.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends limited_collectionsFindFirstArgs>(args?: SelectSubset<T, limited_collectionsFindFirstArgs<ExtArgs>>): Prisma__limited_collectionsClient<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Limited_collections that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {limited_collectionsFindFirstOrThrowArgs} args - Arguments to find a Limited_collections
     * @example
     * // Get one Limited_collections
     * const limited_collections = await prisma.limited_collections.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends limited_collectionsFindFirstOrThrowArgs>(args?: SelectSubset<T, limited_collectionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__limited_collectionsClient<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Limited_collections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {limited_collectionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Limited_collections
     * const limited_collections = await prisma.limited_collections.findMany()
     * 
     * // Get first 10 Limited_collections
     * const limited_collections = await prisma.limited_collections.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const limited_collectionsWithIdOnly = await prisma.limited_collections.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends limited_collectionsFindManyArgs>(args?: SelectSubset<T, limited_collectionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Limited_collections.
     * @param {limited_collectionsCreateArgs} args - Arguments to create a Limited_collections.
     * @example
     * // Create one Limited_collections
     * const Limited_collections = await prisma.limited_collections.create({
     *   data: {
     *     // ... data to create a Limited_collections
     *   }
     * })
     * 
     */
    create<T extends limited_collectionsCreateArgs>(args: SelectSubset<T, limited_collectionsCreateArgs<ExtArgs>>): Prisma__limited_collectionsClient<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Limited_collections.
     * @param {limited_collectionsCreateManyArgs} args - Arguments to create many Limited_collections.
     * @example
     * // Create many Limited_collections
     * const limited_collections = await prisma.limited_collections.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends limited_collectionsCreateManyArgs>(args?: SelectSubset<T, limited_collectionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Limited_collections and returns the data saved in the database.
     * @param {limited_collectionsCreateManyAndReturnArgs} args - Arguments to create many Limited_collections.
     * @example
     * // Create many Limited_collections
     * const limited_collections = await prisma.limited_collections.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Limited_collections and only return the `id`
     * const limited_collectionsWithIdOnly = await prisma.limited_collections.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends limited_collectionsCreateManyAndReturnArgs>(args?: SelectSubset<T, limited_collectionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Limited_collections.
     * @param {limited_collectionsDeleteArgs} args - Arguments to delete one Limited_collections.
     * @example
     * // Delete one Limited_collections
     * const Limited_collections = await prisma.limited_collections.delete({
     *   where: {
     *     // ... filter to delete one Limited_collections
     *   }
     * })
     * 
     */
    delete<T extends limited_collectionsDeleteArgs>(args: SelectSubset<T, limited_collectionsDeleteArgs<ExtArgs>>): Prisma__limited_collectionsClient<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Limited_collections.
     * @param {limited_collectionsUpdateArgs} args - Arguments to update one Limited_collections.
     * @example
     * // Update one Limited_collections
     * const limited_collections = await prisma.limited_collections.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends limited_collectionsUpdateArgs>(args: SelectSubset<T, limited_collectionsUpdateArgs<ExtArgs>>): Prisma__limited_collectionsClient<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Limited_collections.
     * @param {limited_collectionsDeleteManyArgs} args - Arguments to filter Limited_collections to delete.
     * @example
     * // Delete a few Limited_collections
     * const { count } = await prisma.limited_collections.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends limited_collectionsDeleteManyArgs>(args?: SelectSubset<T, limited_collectionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Limited_collections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {limited_collectionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Limited_collections
     * const limited_collections = await prisma.limited_collections.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends limited_collectionsUpdateManyArgs>(args: SelectSubset<T, limited_collectionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Limited_collections and returns the data updated in the database.
     * @param {limited_collectionsUpdateManyAndReturnArgs} args - Arguments to update many Limited_collections.
     * @example
     * // Update many Limited_collections
     * const limited_collections = await prisma.limited_collections.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Limited_collections and only return the `id`
     * const limited_collectionsWithIdOnly = await prisma.limited_collections.updateManyAndReturn({
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
    updateManyAndReturn<T extends limited_collectionsUpdateManyAndReturnArgs>(args: SelectSubset<T, limited_collectionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Limited_collections.
     * @param {limited_collectionsUpsertArgs} args - Arguments to update or create a Limited_collections.
     * @example
     * // Update or create a Limited_collections
     * const limited_collections = await prisma.limited_collections.upsert({
     *   create: {
     *     // ... data to create a Limited_collections
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Limited_collections we want to update
     *   }
     * })
     */
    upsert<T extends limited_collectionsUpsertArgs>(args: SelectSubset<T, limited_collectionsUpsertArgs<ExtArgs>>): Prisma__limited_collectionsClient<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Limited_collections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {limited_collectionsCountArgs} args - Arguments to filter Limited_collections to count.
     * @example
     * // Count the number of Limited_collections
     * const count = await prisma.limited_collections.count({
     *   where: {
     *     // ... the filter for the Limited_collections we want to count
     *   }
     * })
    **/
    count<T extends limited_collectionsCountArgs>(
      args?: Subset<T, limited_collectionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Limited_collectionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Limited_collections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Limited_collectionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Limited_collectionsAggregateArgs>(args: Subset<T, Limited_collectionsAggregateArgs>): Prisma.PrismaPromise<GetLimited_collectionsAggregateType<T>>

    /**
     * Group by Limited_collections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {limited_collectionsGroupByArgs} args - Group by arguments.
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
      T extends limited_collectionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: limited_collectionsGroupByArgs['orderBy'] }
        : { orderBy?: limited_collectionsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, limited_collectionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLimited_collectionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the limited_collections model
   */
  readonly fields: limited_collectionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for limited_collections.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__limited_collectionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the limited_collections model
   */
  interface limited_collectionsFieldRefs {
    readonly id: FieldRef<"limited_collections", 'String'>
    readonly title: FieldRef<"limited_collections", 'String'>
    readonly description: FieldRef<"limited_collections", 'String'>
    readonly content: FieldRef<"limited_collections", 'String'>
    readonly image_url: FieldRef<"limited_collections", 'String'>
    readonly category: FieldRef<"limited_collections", 'String'>
    readonly tags: FieldRef<"limited_collections", 'String'>
    readonly max_access: FieldRef<"limited_collections", 'Int'>
    readonly current_access: FieldRef<"limited_collections", 'Int'>
    readonly is_active: FieldRef<"limited_collections", 'Boolean'>
    readonly author_id: FieldRef<"limited_collections", 'String'>
    readonly created_at: FieldRef<"limited_collections", 'DateTime'>
    readonly updated_at: FieldRef<"limited_collections", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * limited_collections findUnique
   */
  export type limited_collectionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
    /**
     * Filter, which limited_collections to fetch.
     */
    where: limited_collectionsWhereUniqueInput
  }

  /**
   * limited_collections findUniqueOrThrow
   */
  export type limited_collectionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
    /**
     * Filter, which limited_collections to fetch.
     */
    where: limited_collectionsWhereUniqueInput
  }

  /**
   * limited_collections findFirst
   */
  export type limited_collectionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
    /**
     * Filter, which limited_collections to fetch.
     */
    where?: limited_collectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of limited_collections to fetch.
     */
    orderBy?: limited_collectionsOrderByWithRelationInput | limited_collectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for limited_collections.
     */
    cursor?: limited_collectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` limited_collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` limited_collections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of limited_collections.
     */
    distinct?: Limited_collectionsScalarFieldEnum | Limited_collectionsScalarFieldEnum[]
  }

  /**
   * limited_collections findFirstOrThrow
   */
  export type limited_collectionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
    /**
     * Filter, which limited_collections to fetch.
     */
    where?: limited_collectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of limited_collections to fetch.
     */
    orderBy?: limited_collectionsOrderByWithRelationInput | limited_collectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for limited_collections.
     */
    cursor?: limited_collectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` limited_collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` limited_collections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of limited_collections.
     */
    distinct?: Limited_collectionsScalarFieldEnum | Limited_collectionsScalarFieldEnum[]
  }

  /**
   * limited_collections findMany
   */
  export type limited_collectionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
    /**
     * Filter, which limited_collections to fetch.
     */
    where?: limited_collectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of limited_collections to fetch.
     */
    orderBy?: limited_collectionsOrderByWithRelationInput | limited_collectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing limited_collections.
     */
    cursor?: limited_collectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` limited_collections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` limited_collections.
     */
    skip?: number
    distinct?: Limited_collectionsScalarFieldEnum | Limited_collectionsScalarFieldEnum[]
  }

  /**
   * limited_collections create
   */
  export type limited_collectionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
    /**
     * The data needed to create a limited_collections.
     */
    data: XOR<limited_collectionsCreateInput, limited_collectionsUncheckedCreateInput>
  }

  /**
   * limited_collections createMany
   */
  export type limited_collectionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many limited_collections.
     */
    data: limited_collectionsCreateManyInput | limited_collectionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * limited_collections createManyAndReturn
   */
  export type limited_collectionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * The data used to create many limited_collections.
     */
    data: limited_collectionsCreateManyInput | limited_collectionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * limited_collections update
   */
  export type limited_collectionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
    /**
     * The data needed to update a limited_collections.
     */
    data: XOR<limited_collectionsUpdateInput, limited_collectionsUncheckedUpdateInput>
    /**
     * Choose, which limited_collections to update.
     */
    where: limited_collectionsWhereUniqueInput
  }

  /**
   * limited_collections updateMany
   */
  export type limited_collectionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update limited_collections.
     */
    data: XOR<limited_collectionsUpdateManyMutationInput, limited_collectionsUncheckedUpdateManyInput>
    /**
     * Filter which limited_collections to update
     */
    where?: limited_collectionsWhereInput
    /**
     * Limit how many limited_collections to update.
     */
    limit?: number
  }

  /**
   * limited_collections updateManyAndReturn
   */
  export type limited_collectionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * The data used to update limited_collections.
     */
    data: XOR<limited_collectionsUpdateManyMutationInput, limited_collectionsUncheckedUpdateManyInput>
    /**
     * Filter which limited_collections to update
     */
    where?: limited_collectionsWhereInput
    /**
     * Limit how many limited_collections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * limited_collections upsert
   */
  export type limited_collectionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
    /**
     * The filter to search for the limited_collections to update in case it exists.
     */
    where: limited_collectionsWhereUniqueInput
    /**
     * In case the limited_collections found by the `where` argument doesn't exist, create a new limited_collections with this data.
     */
    create: XOR<limited_collectionsCreateInput, limited_collectionsUncheckedCreateInput>
    /**
     * In case the limited_collections was found with the provided `where` argument, update it with this data.
     */
    update: XOR<limited_collectionsUpdateInput, limited_collectionsUncheckedUpdateInput>
  }

  /**
   * limited_collections delete
   */
  export type limited_collectionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
    /**
     * Filter which limited_collections to delete.
     */
    where: limited_collectionsWhereUniqueInput
  }

  /**
   * limited_collections deleteMany
   */
  export type limited_collectionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which limited_collections to delete
     */
    where?: limited_collectionsWhereInput
    /**
     * Limit how many limited_collections to delete.
     */
    limit?: number
  }

  /**
   * limited_collections without action
   */
  export type limited_collectionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
  }


  /**
   * Model reports
   */

  export type AggregateReports = {
    _count: ReportsCountAggregateOutputType | null
    _min: ReportsMinAggregateOutputType | null
    _max: ReportsMaxAggregateOutputType | null
  }

  export type ReportsMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    status: $Enums.ReportStatus | null
    category: string | null
    priority: $Enums.Priority | null
    author_id: string | null
    assignee_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReportsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    status: $Enums.ReportStatus | null
    category: string | null
    priority: $Enums.Priority | null
    author_id: string | null
    assignee_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReportsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    content: number
    status: number
    category: number
    priority: number
    author_id: number
    assignee_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ReportsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    status?: true
    category?: true
    priority?: true
    author_id?: true
    assignee_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ReportsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    status?: true
    category?: true
    priority?: true
    author_id?: true
    assignee_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ReportsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    status?: true
    category?: true
    priority?: true
    author_id?: true
    assignee_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ReportsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reports to aggregate.
     */
    where?: reportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     */
    orderBy?: reportsOrderByWithRelationInput | reportsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reports
    **/
    _count?: true | ReportsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportsMaxAggregateInputType
  }

  export type GetReportsAggregateType<T extends ReportsAggregateArgs> = {
        [P in keyof T & keyof AggregateReports]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReports[P]>
      : GetScalarType<T[P], AggregateReports[P]>
  }




  export type reportsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reportsWhereInput
    orderBy?: reportsOrderByWithAggregationInput | reportsOrderByWithAggregationInput[]
    by: ReportsScalarFieldEnum[] | ReportsScalarFieldEnum
    having?: reportsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportsCountAggregateInputType | true
    _min?: ReportsMinAggregateInputType
    _max?: ReportsMaxAggregateInputType
  }

  export type ReportsGroupByOutputType = {
    id: string
    title: string
    description: string | null
    content: string
    status: $Enums.ReportStatus
    category: string | null
    priority: $Enums.Priority
    author_id: string
    assignee_id: string | null
    created_at: Date
    updated_at: Date
    _count: ReportsCountAggregateOutputType | null
    _min: ReportsMinAggregateOutputType | null
    _max: ReportsMaxAggregateOutputType | null
  }

  type GetReportsGroupByPayload<T extends reportsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportsGroupByOutputType[P]>
            : GetScalarType<T[P], ReportsGroupByOutputType[P]>
        }
      >
    >


  export type reportsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    status?: boolean
    category?: boolean
    priority?: boolean
    author_id?: boolean
    assignee_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users_reports_assignee_idTousers?: boolean | reports$users_reports_assignee_idTousersArgs<ExtArgs>
    users_reports_author_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    files?: boolean | reports$filesArgs<ExtArgs>
    _count?: boolean | ReportsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reports"]>

  export type reportsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    status?: boolean
    category?: boolean
    priority?: boolean
    author_id?: boolean
    assignee_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users_reports_assignee_idTousers?: boolean | reports$users_reports_assignee_idTousersArgs<ExtArgs>
    users_reports_author_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reports"]>

  export type reportsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    status?: boolean
    category?: boolean
    priority?: boolean
    author_id?: boolean
    assignee_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users_reports_assignee_idTousers?: boolean | reports$users_reports_assignee_idTousersArgs<ExtArgs>
    users_reports_author_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reports"]>

  export type reportsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    status?: boolean
    category?: boolean
    priority?: boolean
    author_id?: boolean
    assignee_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type reportsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "content" | "status" | "category" | "priority" | "author_id" | "assignee_id" | "created_at" | "updated_at", ExtArgs["result"]["reports"]>
  export type reportsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_reports_assignee_idTousers?: boolean | reports$users_reports_assignee_idTousersArgs<ExtArgs>
    users_reports_author_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    files?: boolean | reports$filesArgs<ExtArgs>
    _count?: boolean | ReportsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type reportsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_reports_assignee_idTousers?: boolean | reports$users_reports_assignee_idTousersArgs<ExtArgs>
    users_reports_author_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type reportsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_reports_assignee_idTousers?: boolean | reports$users_reports_assignee_idTousersArgs<ExtArgs>
    users_reports_author_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $reportsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "reports"
    objects: {
      users_reports_assignee_idTousers: Prisma.$usersPayload<ExtArgs> | null
      users_reports_author_idTousers: Prisma.$usersPayload<ExtArgs>
      files: Prisma.$uploaded_filesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      content: string
      status: $Enums.ReportStatus
      category: string | null
      priority: $Enums.Priority
      author_id: string
      assignee_id: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["reports"]>
    composites: {}
  }

  type reportsGetPayload<S extends boolean | null | undefined | reportsDefaultArgs> = $Result.GetResult<Prisma.$reportsPayload, S>

  type reportsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<reportsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportsCountAggregateInputType | true
    }

  export interface reportsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['reports'], meta: { name: 'reports' } }
    /**
     * Find zero or one Reports that matches the filter.
     * @param {reportsFindUniqueArgs} args - Arguments to find a Reports
     * @example
     * // Get one Reports
     * const reports = await prisma.reports.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reportsFindUniqueArgs>(args: SelectSubset<T, reportsFindUniqueArgs<ExtArgs>>): Prisma__reportsClient<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reports that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reportsFindUniqueOrThrowArgs} args - Arguments to find a Reports
     * @example
     * // Get one Reports
     * const reports = await prisma.reports.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reportsFindUniqueOrThrowArgs>(args: SelectSubset<T, reportsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__reportsClient<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportsFindFirstArgs} args - Arguments to find a Reports
     * @example
     * // Get one Reports
     * const reports = await prisma.reports.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reportsFindFirstArgs>(args?: SelectSubset<T, reportsFindFirstArgs<ExtArgs>>): Prisma__reportsClient<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reports that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportsFindFirstOrThrowArgs} args - Arguments to find a Reports
     * @example
     * // Get one Reports
     * const reports = await prisma.reports.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reportsFindFirstOrThrowArgs>(args?: SelectSubset<T, reportsFindFirstOrThrowArgs<ExtArgs>>): Prisma__reportsClient<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.reports.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.reports.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportsWithIdOnly = await prisma.reports.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends reportsFindManyArgs>(args?: SelectSubset<T, reportsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reports.
     * @param {reportsCreateArgs} args - Arguments to create a Reports.
     * @example
     * // Create one Reports
     * const Reports = await prisma.reports.create({
     *   data: {
     *     // ... data to create a Reports
     *   }
     * })
     * 
     */
    create<T extends reportsCreateArgs>(args: SelectSubset<T, reportsCreateArgs<ExtArgs>>): Prisma__reportsClient<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {reportsCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const reports = await prisma.reports.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends reportsCreateManyArgs>(args?: SelectSubset<T, reportsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {reportsCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const reports = await prisma.reports.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportsWithIdOnly = await prisma.reports.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends reportsCreateManyAndReturnArgs>(args?: SelectSubset<T, reportsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reports.
     * @param {reportsDeleteArgs} args - Arguments to delete one Reports.
     * @example
     * // Delete one Reports
     * const Reports = await prisma.reports.delete({
     *   where: {
     *     // ... filter to delete one Reports
     *   }
     * })
     * 
     */
    delete<T extends reportsDeleteArgs>(args: SelectSubset<T, reportsDeleteArgs<ExtArgs>>): Prisma__reportsClient<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reports.
     * @param {reportsUpdateArgs} args - Arguments to update one Reports.
     * @example
     * // Update one Reports
     * const reports = await prisma.reports.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends reportsUpdateArgs>(args: SelectSubset<T, reportsUpdateArgs<ExtArgs>>): Prisma__reportsClient<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {reportsDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.reports.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends reportsDeleteManyArgs>(args?: SelectSubset<T, reportsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const reports = await prisma.reports.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends reportsUpdateManyArgs>(args: SelectSubset<T, reportsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {reportsUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const reports = await prisma.reports.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportsWithIdOnly = await prisma.reports.updateManyAndReturn({
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
    updateManyAndReturn<T extends reportsUpdateManyAndReturnArgs>(args: SelectSubset<T, reportsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reports.
     * @param {reportsUpsertArgs} args - Arguments to update or create a Reports.
     * @example
     * // Update or create a Reports
     * const reports = await prisma.reports.upsert({
     *   create: {
     *     // ... data to create a Reports
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reports we want to update
     *   }
     * })
     */
    upsert<T extends reportsUpsertArgs>(args: SelectSubset<T, reportsUpsertArgs<ExtArgs>>): Prisma__reportsClient<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportsCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.reports.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends reportsCountArgs>(
      args?: Subset<T, reportsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReportsAggregateArgs>(args: Subset<T, ReportsAggregateArgs>): Prisma.PrismaPromise<GetReportsAggregateType<T>>

    /**
     * Group by Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportsGroupByArgs} args - Group by arguments.
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
      T extends reportsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: reportsGroupByArgs['orderBy'] }
        : { orderBy?: reportsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, reportsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the reports model
   */
  readonly fields: reportsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for reports.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__reportsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users_reports_assignee_idTousers<T extends reports$users_reports_assignee_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, reports$users_reports_assignee_idTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_reports_author_idTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    files<T extends reports$filesArgs<ExtArgs> = {}>(args?: Subset<T, reports$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the reports model
   */
  interface reportsFieldRefs {
    readonly id: FieldRef<"reports", 'String'>
    readonly title: FieldRef<"reports", 'String'>
    readonly description: FieldRef<"reports", 'String'>
    readonly content: FieldRef<"reports", 'String'>
    readonly status: FieldRef<"reports", 'ReportStatus'>
    readonly category: FieldRef<"reports", 'String'>
    readonly priority: FieldRef<"reports", 'Priority'>
    readonly author_id: FieldRef<"reports", 'String'>
    readonly assignee_id: FieldRef<"reports", 'String'>
    readonly created_at: FieldRef<"reports", 'DateTime'>
    readonly updated_at: FieldRef<"reports", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * reports findUnique
   */
  export type reportsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    /**
     * Filter, which reports to fetch.
     */
    where: reportsWhereUniqueInput
  }

  /**
   * reports findUniqueOrThrow
   */
  export type reportsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    /**
     * Filter, which reports to fetch.
     */
    where: reportsWhereUniqueInput
  }

  /**
   * reports findFirst
   */
  export type reportsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    /**
     * Filter, which reports to fetch.
     */
    where?: reportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     */
    orderBy?: reportsOrderByWithRelationInput | reportsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reports.
     */
    cursor?: reportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reports.
     */
    distinct?: ReportsScalarFieldEnum | ReportsScalarFieldEnum[]
  }

  /**
   * reports findFirstOrThrow
   */
  export type reportsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    /**
     * Filter, which reports to fetch.
     */
    where?: reportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     */
    orderBy?: reportsOrderByWithRelationInput | reportsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reports.
     */
    cursor?: reportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reports.
     */
    distinct?: ReportsScalarFieldEnum | ReportsScalarFieldEnum[]
  }

  /**
   * reports findMany
   */
  export type reportsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    /**
     * Filter, which reports to fetch.
     */
    where?: reportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     */
    orderBy?: reportsOrderByWithRelationInput | reportsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reports.
     */
    cursor?: reportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     */
    skip?: number
    distinct?: ReportsScalarFieldEnum | ReportsScalarFieldEnum[]
  }

  /**
   * reports create
   */
  export type reportsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    /**
     * The data needed to create a reports.
     */
    data: XOR<reportsCreateInput, reportsUncheckedCreateInput>
  }

  /**
   * reports createMany
   */
  export type reportsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reports.
     */
    data: reportsCreateManyInput | reportsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * reports createManyAndReturn
   */
  export type reportsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * The data used to create many reports.
     */
    data: reportsCreateManyInput | reportsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * reports update
   */
  export type reportsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    /**
     * The data needed to update a reports.
     */
    data: XOR<reportsUpdateInput, reportsUncheckedUpdateInput>
    /**
     * Choose, which reports to update.
     */
    where: reportsWhereUniqueInput
  }

  /**
   * reports updateMany
   */
  export type reportsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reports.
     */
    data: XOR<reportsUpdateManyMutationInput, reportsUncheckedUpdateManyInput>
    /**
     * Filter which reports to update
     */
    where?: reportsWhereInput
    /**
     * Limit how many reports to update.
     */
    limit?: number
  }

  /**
   * reports updateManyAndReturn
   */
  export type reportsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * The data used to update reports.
     */
    data: XOR<reportsUpdateManyMutationInput, reportsUncheckedUpdateManyInput>
    /**
     * Filter which reports to update
     */
    where?: reportsWhereInput
    /**
     * Limit how many reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * reports upsert
   */
  export type reportsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    /**
     * The filter to search for the reports to update in case it exists.
     */
    where: reportsWhereUniqueInput
    /**
     * In case the reports found by the `where` argument doesn't exist, create a new reports with this data.
     */
    create: XOR<reportsCreateInput, reportsUncheckedCreateInput>
    /**
     * In case the reports was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reportsUpdateInput, reportsUncheckedUpdateInput>
  }

  /**
   * reports delete
   */
  export type reportsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    /**
     * Filter which reports to delete.
     */
    where: reportsWhereUniqueInput
  }

  /**
   * reports deleteMany
   */
  export type reportsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reports to delete
     */
    where?: reportsWhereInput
    /**
     * Limit how many reports to delete.
     */
    limit?: number
  }

  /**
   * reports.users_reports_assignee_idTousers
   */
  export type reports$users_reports_assignee_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * reports.files
   */
  export type reports$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    where?: uploaded_filesWhereInput
    orderBy?: uploaded_filesOrderByWithRelationInput | uploaded_filesOrderByWithRelationInput[]
    cursor?: uploaded_filesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Uploaded_filesScalarFieldEnum | Uploaded_filesScalarFieldEnum[]
  }

  /**
   * reports without action
   */
  export type reportsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
  }


  /**
   * Model uploaded_files
   */

  export type AggregateUploaded_files = {
    _count: Uploaded_filesCountAggregateOutputType | null
    _avg: Uploaded_filesAvgAggregateOutputType | null
    _sum: Uploaded_filesSumAggregateOutputType | null
    _min: Uploaded_filesMinAggregateOutputType | null
    _max: Uploaded_filesMaxAggregateOutputType | null
  }

  export type Uploaded_filesAvgAggregateOutputType = {
    file_size: number | null
  }

  export type Uploaded_filesSumAggregateOutputType = {
    file_size: number | null
  }

  export type Uploaded_filesMinAggregateOutputType = {
    id: string | null
    filename: string | null
    original_name: string | null
    file_path: string | null
    file_size: number | null
    mime_type: string | null
    category: string | null
    year: string | null
    batch: string | null
    report_id: string | null
    author_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Uploaded_filesMaxAggregateOutputType = {
    id: string | null
    filename: string | null
    original_name: string | null
    file_path: string | null
    file_size: number | null
    mime_type: string | null
    category: string | null
    year: string | null
    batch: string | null
    report_id: string | null
    author_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Uploaded_filesCountAggregateOutputType = {
    id: number
    filename: number
    original_name: number
    file_path: number
    file_size: number
    mime_type: number
    category: number
    year: number
    batch: number
    report_id: number
    author_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Uploaded_filesAvgAggregateInputType = {
    file_size?: true
  }

  export type Uploaded_filesSumAggregateInputType = {
    file_size?: true
  }

  export type Uploaded_filesMinAggregateInputType = {
    id?: true
    filename?: true
    original_name?: true
    file_path?: true
    file_size?: true
    mime_type?: true
    category?: true
    year?: true
    batch?: true
    report_id?: true
    author_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Uploaded_filesMaxAggregateInputType = {
    id?: true
    filename?: true
    original_name?: true
    file_path?: true
    file_size?: true
    mime_type?: true
    category?: true
    year?: true
    batch?: true
    report_id?: true
    author_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Uploaded_filesCountAggregateInputType = {
    id?: true
    filename?: true
    original_name?: true
    file_path?: true
    file_size?: true
    mime_type?: true
    category?: true
    year?: true
    batch?: true
    report_id?: true
    author_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Uploaded_filesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which uploaded_files to aggregate.
     */
    where?: uploaded_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uploaded_files to fetch.
     */
    orderBy?: uploaded_filesOrderByWithRelationInput | uploaded_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: uploaded_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uploaded_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uploaded_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned uploaded_files
    **/
    _count?: true | Uploaded_filesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Uploaded_filesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Uploaded_filesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Uploaded_filesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Uploaded_filesMaxAggregateInputType
  }

  export type GetUploaded_filesAggregateType<T extends Uploaded_filesAggregateArgs> = {
        [P in keyof T & keyof AggregateUploaded_files]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploaded_files[P]>
      : GetScalarType<T[P], AggregateUploaded_files[P]>
  }




  export type uploaded_filesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: uploaded_filesWhereInput
    orderBy?: uploaded_filesOrderByWithAggregationInput | uploaded_filesOrderByWithAggregationInput[]
    by: Uploaded_filesScalarFieldEnum[] | Uploaded_filesScalarFieldEnum
    having?: uploaded_filesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Uploaded_filesCountAggregateInputType | true
    _avg?: Uploaded_filesAvgAggregateInputType
    _sum?: Uploaded_filesSumAggregateInputType
    _min?: Uploaded_filesMinAggregateInputType
    _max?: Uploaded_filesMaxAggregateInputType
  }

  export type Uploaded_filesGroupByOutputType = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    category: string | null
    year: string | null
    batch: string | null
    report_id: string | null
    author_id: string
    created_at: Date
    updated_at: Date
    _count: Uploaded_filesCountAggregateOutputType | null
    _avg: Uploaded_filesAvgAggregateOutputType | null
    _sum: Uploaded_filesSumAggregateOutputType | null
    _min: Uploaded_filesMinAggregateOutputType | null
    _max: Uploaded_filesMaxAggregateOutputType | null
  }

  type GetUploaded_filesGroupByPayload<T extends uploaded_filesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Uploaded_filesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Uploaded_filesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Uploaded_filesGroupByOutputType[P]>
            : GetScalarType<T[P], Uploaded_filesGroupByOutputType[P]>
        }
      >
    >


  export type uploaded_filesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    original_name?: boolean
    file_path?: boolean
    file_size?: boolean
    mime_type?: boolean
    category?: boolean
    year?: boolean
    batch?: boolean
    report_id?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    reports?: boolean | uploaded_files$reportsArgs<ExtArgs>
  }, ExtArgs["result"]["uploaded_files"]>

  export type uploaded_filesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    original_name?: boolean
    file_path?: boolean
    file_size?: boolean
    mime_type?: boolean
    category?: boolean
    year?: boolean
    batch?: boolean
    report_id?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    reports?: boolean | uploaded_files$reportsArgs<ExtArgs>
  }, ExtArgs["result"]["uploaded_files"]>

  export type uploaded_filesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    original_name?: boolean
    file_path?: boolean
    file_size?: boolean
    mime_type?: boolean
    category?: boolean
    year?: boolean
    batch?: boolean
    report_id?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    reports?: boolean | uploaded_files$reportsArgs<ExtArgs>
  }, ExtArgs["result"]["uploaded_files"]>

  export type uploaded_filesSelectScalar = {
    id?: boolean
    filename?: boolean
    original_name?: boolean
    file_path?: boolean
    file_size?: boolean
    mime_type?: boolean
    category?: boolean
    year?: boolean
    batch?: boolean
    report_id?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type uploaded_filesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "filename" | "original_name" | "file_path" | "file_size" | "mime_type" | "category" | "year" | "batch" | "report_id" | "author_id" | "created_at" | "updated_at", ExtArgs["result"]["uploaded_files"]>
  export type uploaded_filesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    reports?: boolean | uploaded_files$reportsArgs<ExtArgs>
  }
  export type uploaded_filesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    reports?: boolean | uploaded_files$reportsArgs<ExtArgs>
  }
  export type uploaded_filesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    reports?: boolean | uploaded_files$reportsArgs<ExtArgs>
  }

  export type $uploaded_filesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "uploaded_files"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      reports: Prisma.$reportsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      filename: string
      original_name: string
      file_path: string
      file_size: number
      mime_type: string
      category: string | null
      year: string | null
      batch: string | null
      report_id: string | null
      author_id: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["uploaded_files"]>
    composites: {}
  }

  type uploaded_filesGetPayload<S extends boolean | null | undefined | uploaded_filesDefaultArgs> = $Result.GetResult<Prisma.$uploaded_filesPayload, S>

  type uploaded_filesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<uploaded_filesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Uploaded_filesCountAggregateInputType | true
    }

  export interface uploaded_filesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['uploaded_files'], meta: { name: 'uploaded_files' } }
    /**
     * Find zero or one Uploaded_files that matches the filter.
     * @param {uploaded_filesFindUniqueArgs} args - Arguments to find a Uploaded_files
     * @example
     * // Get one Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends uploaded_filesFindUniqueArgs>(args: SelectSubset<T, uploaded_filesFindUniqueArgs<ExtArgs>>): Prisma__uploaded_filesClient<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Uploaded_files that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {uploaded_filesFindUniqueOrThrowArgs} args - Arguments to find a Uploaded_files
     * @example
     * // Get one Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends uploaded_filesFindUniqueOrThrowArgs>(args: SelectSubset<T, uploaded_filesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__uploaded_filesClient<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Uploaded_files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploaded_filesFindFirstArgs} args - Arguments to find a Uploaded_files
     * @example
     * // Get one Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends uploaded_filesFindFirstArgs>(args?: SelectSubset<T, uploaded_filesFindFirstArgs<ExtArgs>>): Prisma__uploaded_filesClient<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Uploaded_files that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploaded_filesFindFirstOrThrowArgs} args - Arguments to find a Uploaded_files
     * @example
     * // Get one Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends uploaded_filesFindFirstOrThrowArgs>(args?: SelectSubset<T, uploaded_filesFindFirstOrThrowArgs<ExtArgs>>): Prisma__uploaded_filesClient<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Uploaded_files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploaded_filesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.findMany()
     * 
     * // Get first 10 Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploaded_filesWithIdOnly = await prisma.uploaded_files.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends uploaded_filesFindManyArgs>(args?: SelectSubset<T, uploaded_filesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Uploaded_files.
     * @param {uploaded_filesCreateArgs} args - Arguments to create a Uploaded_files.
     * @example
     * // Create one Uploaded_files
     * const Uploaded_files = await prisma.uploaded_files.create({
     *   data: {
     *     // ... data to create a Uploaded_files
     *   }
     * })
     * 
     */
    create<T extends uploaded_filesCreateArgs>(args: SelectSubset<T, uploaded_filesCreateArgs<ExtArgs>>): Prisma__uploaded_filesClient<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Uploaded_files.
     * @param {uploaded_filesCreateManyArgs} args - Arguments to create many Uploaded_files.
     * @example
     * // Create many Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends uploaded_filesCreateManyArgs>(args?: SelectSubset<T, uploaded_filesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Uploaded_files and returns the data saved in the database.
     * @param {uploaded_filesCreateManyAndReturnArgs} args - Arguments to create many Uploaded_files.
     * @example
     * // Create many Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Uploaded_files and only return the `id`
     * const uploaded_filesWithIdOnly = await prisma.uploaded_files.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends uploaded_filesCreateManyAndReturnArgs>(args?: SelectSubset<T, uploaded_filesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Uploaded_files.
     * @param {uploaded_filesDeleteArgs} args - Arguments to delete one Uploaded_files.
     * @example
     * // Delete one Uploaded_files
     * const Uploaded_files = await prisma.uploaded_files.delete({
     *   where: {
     *     // ... filter to delete one Uploaded_files
     *   }
     * })
     * 
     */
    delete<T extends uploaded_filesDeleteArgs>(args: SelectSubset<T, uploaded_filesDeleteArgs<ExtArgs>>): Prisma__uploaded_filesClient<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Uploaded_files.
     * @param {uploaded_filesUpdateArgs} args - Arguments to update one Uploaded_files.
     * @example
     * // Update one Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends uploaded_filesUpdateArgs>(args: SelectSubset<T, uploaded_filesUpdateArgs<ExtArgs>>): Prisma__uploaded_filesClient<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Uploaded_files.
     * @param {uploaded_filesDeleteManyArgs} args - Arguments to filter Uploaded_files to delete.
     * @example
     * // Delete a few Uploaded_files
     * const { count } = await prisma.uploaded_files.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends uploaded_filesDeleteManyArgs>(args?: SelectSubset<T, uploaded_filesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Uploaded_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploaded_filesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends uploaded_filesUpdateManyArgs>(args: SelectSubset<T, uploaded_filesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Uploaded_files and returns the data updated in the database.
     * @param {uploaded_filesUpdateManyAndReturnArgs} args - Arguments to update many Uploaded_files.
     * @example
     * // Update many Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Uploaded_files and only return the `id`
     * const uploaded_filesWithIdOnly = await prisma.uploaded_files.updateManyAndReturn({
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
    updateManyAndReturn<T extends uploaded_filesUpdateManyAndReturnArgs>(args: SelectSubset<T, uploaded_filesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Uploaded_files.
     * @param {uploaded_filesUpsertArgs} args - Arguments to update or create a Uploaded_files.
     * @example
     * // Update or create a Uploaded_files
     * const uploaded_files = await prisma.uploaded_files.upsert({
     *   create: {
     *     // ... data to create a Uploaded_files
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Uploaded_files we want to update
     *   }
     * })
     */
    upsert<T extends uploaded_filesUpsertArgs>(args: SelectSubset<T, uploaded_filesUpsertArgs<ExtArgs>>): Prisma__uploaded_filesClient<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Uploaded_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploaded_filesCountArgs} args - Arguments to filter Uploaded_files to count.
     * @example
     * // Count the number of Uploaded_files
     * const count = await prisma.uploaded_files.count({
     *   where: {
     *     // ... the filter for the Uploaded_files we want to count
     *   }
     * })
    **/
    count<T extends uploaded_filesCountArgs>(
      args?: Subset<T, uploaded_filesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Uploaded_filesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Uploaded_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Uploaded_filesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Uploaded_filesAggregateArgs>(args: Subset<T, Uploaded_filesAggregateArgs>): Prisma.PrismaPromise<GetUploaded_filesAggregateType<T>>

    /**
     * Group by Uploaded_files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {uploaded_filesGroupByArgs} args - Group by arguments.
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
      T extends uploaded_filesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: uploaded_filesGroupByArgs['orderBy'] }
        : { orderBy?: uploaded_filesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, uploaded_filesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploaded_filesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the uploaded_files model
   */
  readonly fields: uploaded_filesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for uploaded_files.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__uploaded_filesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reports<T extends uploaded_files$reportsArgs<ExtArgs> = {}>(args?: Subset<T, uploaded_files$reportsArgs<ExtArgs>>): Prisma__reportsClient<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the uploaded_files model
   */
  interface uploaded_filesFieldRefs {
    readonly id: FieldRef<"uploaded_files", 'String'>
    readonly filename: FieldRef<"uploaded_files", 'String'>
    readonly original_name: FieldRef<"uploaded_files", 'String'>
    readonly file_path: FieldRef<"uploaded_files", 'String'>
    readonly file_size: FieldRef<"uploaded_files", 'Int'>
    readonly mime_type: FieldRef<"uploaded_files", 'String'>
    readonly category: FieldRef<"uploaded_files", 'String'>
    readonly year: FieldRef<"uploaded_files", 'String'>
    readonly batch: FieldRef<"uploaded_files", 'String'>
    readonly report_id: FieldRef<"uploaded_files", 'String'>
    readonly author_id: FieldRef<"uploaded_files", 'String'>
    readonly created_at: FieldRef<"uploaded_files", 'DateTime'>
    readonly updated_at: FieldRef<"uploaded_files", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * uploaded_files findUnique
   */
  export type uploaded_filesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    /**
     * Filter, which uploaded_files to fetch.
     */
    where: uploaded_filesWhereUniqueInput
  }

  /**
   * uploaded_files findUniqueOrThrow
   */
  export type uploaded_filesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    /**
     * Filter, which uploaded_files to fetch.
     */
    where: uploaded_filesWhereUniqueInput
  }

  /**
   * uploaded_files findFirst
   */
  export type uploaded_filesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    /**
     * Filter, which uploaded_files to fetch.
     */
    where?: uploaded_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uploaded_files to fetch.
     */
    orderBy?: uploaded_filesOrderByWithRelationInput | uploaded_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for uploaded_files.
     */
    cursor?: uploaded_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uploaded_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uploaded_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of uploaded_files.
     */
    distinct?: Uploaded_filesScalarFieldEnum | Uploaded_filesScalarFieldEnum[]
  }

  /**
   * uploaded_files findFirstOrThrow
   */
  export type uploaded_filesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    /**
     * Filter, which uploaded_files to fetch.
     */
    where?: uploaded_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uploaded_files to fetch.
     */
    orderBy?: uploaded_filesOrderByWithRelationInput | uploaded_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for uploaded_files.
     */
    cursor?: uploaded_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uploaded_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uploaded_files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of uploaded_files.
     */
    distinct?: Uploaded_filesScalarFieldEnum | Uploaded_filesScalarFieldEnum[]
  }

  /**
   * uploaded_files findMany
   */
  export type uploaded_filesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    /**
     * Filter, which uploaded_files to fetch.
     */
    where?: uploaded_filesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of uploaded_files to fetch.
     */
    orderBy?: uploaded_filesOrderByWithRelationInput | uploaded_filesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing uploaded_files.
     */
    cursor?: uploaded_filesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` uploaded_files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` uploaded_files.
     */
    skip?: number
    distinct?: Uploaded_filesScalarFieldEnum | Uploaded_filesScalarFieldEnum[]
  }

  /**
   * uploaded_files create
   */
  export type uploaded_filesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    /**
     * The data needed to create a uploaded_files.
     */
    data: XOR<uploaded_filesCreateInput, uploaded_filesUncheckedCreateInput>
  }

  /**
   * uploaded_files createMany
   */
  export type uploaded_filesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many uploaded_files.
     */
    data: uploaded_filesCreateManyInput | uploaded_filesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * uploaded_files createManyAndReturn
   */
  export type uploaded_filesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * The data used to create many uploaded_files.
     */
    data: uploaded_filesCreateManyInput | uploaded_filesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * uploaded_files update
   */
  export type uploaded_filesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    /**
     * The data needed to update a uploaded_files.
     */
    data: XOR<uploaded_filesUpdateInput, uploaded_filesUncheckedUpdateInput>
    /**
     * Choose, which uploaded_files to update.
     */
    where: uploaded_filesWhereUniqueInput
  }

  /**
   * uploaded_files updateMany
   */
  export type uploaded_filesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update uploaded_files.
     */
    data: XOR<uploaded_filesUpdateManyMutationInput, uploaded_filesUncheckedUpdateManyInput>
    /**
     * Filter which uploaded_files to update
     */
    where?: uploaded_filesWhereInput
    /**
     * Limit how many uploaded_files to update.
     */
    limit?: number
  }

  /**
   * uploaded_files updateManyAndReturn
   */
  export type uploaded_filesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * The data used to update uploaded_files.
     */
    data: XOR<uploaded_filesUpdateManyMutationInput, uploaded_filesUncheckedUpdateManyInput>
    /**
     * Filter which uploaded_files to update
     */
    where?: uploaded_filesWhereInput
    /**
     * Limit how many uploaded_files to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * uploaded_files upsert
   */
  export type uploaded_filesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    /**
     * The filter to search for the uploaded_files to update in case it exists.
     */
    where: uploaded_filesWhereUniqueInput
    /**
     * In case the uploaded_files found by the `where` argument doesn't exist, create a new uploaded_files with this data.
     */
    create: XOR<uploaded_filesCreateInput, uploaded_filesUncheckedCreateInput>
    /**
     * In case the uploaded_files was found with the provided `where` argument, update it with this data.
     */
    update: XOR<uploaded_filesUpdateInput, uploaded_filesUncheckedUpdateInput>
  }

  /**
   * uploaded_files delete
   */
  export type uploaded_filesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    /**
     * Filter which uploaded_files to delete.
     */
    where: uploaded_filesWhereUniqueInput
  }

  /**
   * uploaded_files deleteMany
   */
  export type uploaded_filesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which uploaded_files to delete
     */
    where?: uploaded_filesWhereInput
    /**
     * Limit how many uploaded_files to delete.
     */
    limit?: number
  }

  /**
   * uploaded_files.reports
   */
  export type uploaded_files$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    where?: reportsWhereInput
  }

  /**
   * uploaded_files without action
   */
  export type uploaded_filesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    name: string | null
    avatar: string | null
    training: string | null
    angkatan: string | null
    phone: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    name: string | null
    avatar: string | null
    training: string | null
    angkatan: string | null
    phone: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    role: number
    name: number
    avatar: number
    training: number
    angkatan: number
    phone: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    name?: true
    avatar?: true
    training?: true
    angkatan?: true
    phone?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    name?: true
    avatar?: true
    training?: true
    angkatan?: true
    phone?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    role?: true
    name?: true
    avatar?: true
    training?: true
    angkatan?: true
    phone?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    role: $Enums.Role
    name: string | null
    avatar: string | null
    training: string | null
    angkatan: string | null
    phone: string | null
    created_at: Date
    updated_at: Date
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    avatar?: boolean
    training?: boolean
    angkatan?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
    collections?: boolean | users$collectionsArgs<ExtArgs>
    guestbook_entries?: boolean | users$guestbook_entriesArgs<ExtArgs>
    limited_collections?: boolean | users$limited_collectionsArgs<ExtArgs>
    reports_reports_assignee_idTousers?: boolean | users$reports_reports_assignee_idTousersArgs<ExtArgs>
    reports_reports_author_idTousers?: boolean | users$reports_reports_author_idTousersArgs<ExtArgs>
    uploaded_files?: boolean | users$uploaded_filesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    avatar?: boolean
    training?: boolean
    angkatan?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    avatar?: boolean
    training?: boolean
    angkatan?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    avatar?: boolean
    training?: boolean
    angkatan?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "role" | "name" | "avatar" | "training" | "angkatan" | "phone" | "created_at" | "updated_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collections?: boolean | users$collectionsArgs<ExtArgs>
    guestbook_entries?: boolean | users$guestbook_entriesArgs<ExtArgs>
    limited_collections?: boolean | users$limited_collectionsArgs<ExtArgs>
    reports_reports_assignee_idTousers?: boolean | users$reports_reports_assignee_idTousersArgs<ExtArgs>
    reports_reports_author_idTousers?: boolean | users$reports_reports_author_idTousersArgs<ExtArgs>
    uploaded_files?: boolean | users$uploaded_filesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      collections: Prisma.$collectionsPayload<ExtArgs>[]
      guestbook_entries: Prisma.$guestbook_entriesPayload<ExtArgs>[]
      limited_collections: Prisma.$limited_collectionsPayload<ExtArgs>[]
      reports_reports_assignee_idTousers: Prisma.$reportsPayload<ExtArgs>[]
      reports_reports_author_idTousers: Prisma.$reportsPayload<ExtArgs>[]
      uploaded_files: Prisma.$uploaded_filesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      role: $Enums.Role
      name: string | null
      avatar: string | null
      training: string | null
      angkatan: string | null
      phone: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
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
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collections<T extends users$collectionsArgs<ExtArgs> = {}>(args?: Subset<T, users$collectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$collectionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    guestbook_entries<T extends users$guestbook_entriesArgs<ExtArgs> = {}>(args?: Subset<T, users$guestbook_entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    limited_collections<T extends users$limited_collectionsArgs<ExtArgs> = {}>(args?: Subset<T, users$limited_collectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$limited_collectionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports_reports_assignee_idTousers<T extends users$reports_reports_assignee_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$reports_reports_assignee_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports_reports_author_idTousers<T extends users$reports_reports_author_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$reports_reports_author_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    uploaded_files<T extends users$uploaded_filesArgs<ExtArgs> = {}>(args?: Subset<T, users$uploaded_filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly username: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'Role'>
    readonly name: FieldRef<"users", 'String'>
    readonly avatar: FieldRef<"users", 'String'>
    readonly training: FieldRef<"users", 'String'>
    readonly angkatan: FieldRef<"users", 'String'>
    readonly phone: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.collections
   */
  export type users$collectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the collections
     */
    select?: collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the collections
     */
    omit?: collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: collectionsInclude<ExtArgs> | null
    where?: collectionsWhereInput
    orderBy?: collectionsOrderByWithRelationInput | collectionsOrderByWithRelationInput[]
    cursor?: collectionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CollectionsScalarFieldEnum | CollectionsScalarFieldEnum[]
  }

  /**
   * users.guestbook_entries
   */
  export type users$guestbook_entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guestbook_entries
     */
    select?: guestbook_entriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guestbook_entries
     */
    omit?: guestbook_entriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: guestbook_entriesInclude<ExtArgs> | null
    where?: guestbook_entriesWhereInput
    orderBy?: guestbook_entriesOrderByWithRelationInput | guestbook_entriesOrderByWithRelationInput[]
    cursor?: guestbook_entriesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Guestbook_entriesScalarFieldEnum | Guestbook_entriesScalarFieldEnum[]
  }

  /**
   * users.limited_collections
   */
  export type users$limited_collectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the limited_collections
     */
    select?: limited_collectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the limited_collections
     */
    omit?: limited_collectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: limited_collectionsInclude<ExtArgs> | null
    where?: limited_collectionsWhereInput
    orderBy?: limited_collectionsOrderByWithRelationInput | limited_collectionsOrderByWithRelationInput[]
    cursor?: limited_collectionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Limited_collectionsScalarFieldEnum | Limited_collectionsScalarFieldEnum[]
  }

  /**
   * users.reports_reports_assignee_idTousers
   */
  export type users$reports_reports_assignee_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    where?: reportsWhereInput
    orderBy?: reportsOrderByWithRelationInput | reportsOrderByWithRelationInput[]
    cursor?: reportsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportsScalarFieldEnum | ReportsScalarFieldEnum[]
  }

  /**
   * users.reports_reports_author_idTousers
   */
  export type users$reports_reports_author_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reports
     */
    select?: reportsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reports
     */
    omit?: reportsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reportsInclude<ExtArgs> | null
    where?: reportsWhereInput
    orderBy?: reportsOrderByWithRelationInput | reportsOrderByWithRelationInput[]
    cursor?: reportsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportsScalarFieldEnum | ReportsScalarFieldEnum[]
  }

  /**
   * users.uploaded_files
   */
  export type users$uploaded_filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the uploaded_files
     */
    select?: uploaded_filesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the uploaded_files
     */
    omit?: uploaded_filesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: uploaded_filesInclude<ExtArgs> | null
    where?: uploaded_filesWhereInput
    orderBy?: uploaded_filesOrderByWithRelationInput | uploaded_filesOrderByWithRelationInput[]
    cursor?: uploaded_filesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Uploaded_filesScalarFieldEnum | Uploaded_filesScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
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


  export const CollectionsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    image_url: 'image_url',
    category: 'category',
    tags: 'tags',
    is_public: 'is_public',
    author_id: 'author_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CollectionsScalarFieldEnum = (typeof CollectionsScalarFieldEnum)[keyof typeof CollectionsScalarFieldEnum]


  export const Guestbook_entriesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    message: 'message',
    is_approved: 'is_approved',
    author_id: 'author_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Guestbook_entriesScalarFieldEnum = (typeof Guestbook_entriesScalarFieldEnum)[keyof typeof Guestbook_entriesScalarFieldEnum]


  export const Limited_collectionsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    image_url: 'image_url',
    category: 'category',
    tags: 'tags',
    max_access: 'max_access',
    current_access: 'current_access',
    is_active: 'is_active',
    author_id: 'author_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Limited_collectionsScalarFieldEnum = (typeof Limited_collectionsScalarFieldEnum)[keyof typeof Limited_collectionsScalarFieldEnum]


  export const ReportsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    status: 'status',
    category: 'category',
    priority: 'priority',
    author_id: 'author_id',
    assignee_id: 'assignee_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ReportsScalarFieldEnum = (typeof ReportsScalarFieldEnum)[keyof typeof ReportsScalarFieldEnum]


  export const Uploaded_filesScalarFieldEnum: {
    id: 'id',
    filename: 'filename',
    original_name: 'original_name',
    file_path: 'file_path',
    file_size: 'file_size',
    mime_type: 'mime_type',
    category: 'category',
    year: 'year',
    batch: 'batch',
    report_id: 'report_id',
    author_id: 'author_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Uploaded_filesScalarFieldEnum = (typeof Uploaded_filesScalarFieldEnum)[keyof typeof Uploaded_filesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    role: 'role',
    name: 'name',
    avatar: 'avatar',
    training: 'training',
    angkatan: 'angkatan',
    phone: 'phone',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ReportStatus'
   */
  export type EnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus'>
    


  /**
   * Reference to a field of type 'ReportStatus[]'
   */
  export type ListEnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus[]'>
    


  /**
   * Reference to a field of type 'Priority'
   */
  export type EnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority'>
    


  /**
   * Reference to a field of type 'Priority[]'
   */
  export type ListEnumPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priority[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


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


  export type collectionsWhereInput = {
    AND?: collectionsWhereInput | collectionsWhereInput[]
    OR?: collectionsWhereInput[]
    NOT?: collectionsWhereInput | collectionsWhereInput[]
    id?: StringFilter<"collections"> | string
    title?: StringFilter<"collections"> | string
    description?: StringNullableFilter<"collections"> | string | null
    content?: StringFilter<"collections"> | string
    image_url?: StringNullableFilter<"collections"> | string | null
    category?: StringNullableFilter<"collections"> | string | null
    tags?: StringNullableFilter<"collections"> | string | null
    is_public?: BoolFilter<"collections"> | boolean
    author_id?: StringFilter<"collections"> | string
    created_at?: DateTimeFilter<"collections"> | Date | string
    updated_at?: DateTimeFilter<"collections"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type collectionsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrder
    image_url?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    is_public?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type collectionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: collectionsWhereInput | collectionsWhereInput[]
    OR?: collectionsWhereInput[]
    NOT?: collectionsWhereInput | collectionsWhereInput[]
    title?: StringFilter<"collections"> | string
    description?: StringNullableFilter<"collections"> | string | null
    content?: StringFilter<"collections"> | string
    image_url?: StringNullableFilter<"collections"> | string | null
    category?: StringNullableFilter<"collections"> | string | null
    tags?: StringNullableFilter<"collections"> | string | null
    is_public?: BoolFilter<"collections"> | boolean
    author_id?: StringFilter<"collections"> | string
    created_at?: DateTimeFilter<"collections"> | Date | string
    updated_at?: DateTimeFilter<"collections"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type collectionsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrder
    image_url?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    is_public?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: collectionsCountOrderByAggregateInput
    _max?: collectionsMaxOrderByAggregateInput
    _min?: collectionsMinOrderByAggregateInput
  }

  export type collectionsScalarWhereWithAggregatesInput = {
    AND?: collectionsScalarWhereWithAggregatesInput | collectionsScalarWhereWithAggregatesInput[]
    OR?: collectionsScalarWhereWithAggregatesInput[]
    NOT?: collectionsScalarWhereWithAggregatesInput | collectionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"collections"> | string
    title?: StringWithAggregatesFilter<"collections"> | string
    description?: StringNullableWithAggregatesFilter<"collections"> | string | null
    content?: StringWithAggregatesFilter<"collections"> | string
    image_url?: StringNullableWithAggregatesFilter<"collections"> | string | null
    category?: StringNullableWithAggregatesFilter<"collections"> | string | null
    tags?: StringNullableWithAggregatesFilter<"collections"> | string | null
    is_public?: BoolWithAggregatesFilter<"collections"> | boolean
    author_id?: StringWithAggregatesFilter<"collections"> | string
    created_at?: DateTimeWithAggregatesFilter<"collections"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"collections"> | Date | string
  }

  export type guestbook_entriesWhereInput = {
    AND?: guestbook_entriesWhereInput | guestbook_entriesWhereInput[]
    OR?: guestbook_entriesWhereInput[]
    NOT?: guestbook_entriesWhereInput | guestbook_entriesWhereInput[]
    id?: StringFilter<"guestbook_entries"> | string
    name?: StringFilter<"guestbook_entries"> | string
    email?: StringNullableFilter<"guestbook_entries"> | string | null
    message?: StringFilter<"guestbook_entries"> | string
    is_approved?: BoolFilter<"guestbook_entries"> | boolean
    author_id?: StringNullableFilter<"guestbook_entries"> | string | null
    created_at?: DateTimeFilter<"guestbook_entries"> | Date | string
    updated_at?: DateTimeFilter<"guestbook_entries"> | Date | string
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type guestbook_entriesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    message?: SortOrder
    is_approved?: SortOrder
    author_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type guestbook_entriesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: guestbook_entriesWhereInput | guestbook_entriesWhereInput[]
    OR?: guestbook_entriesWhereInput[]
    NOT?: guestbook_entriesWhereInput | guestbook_entriesWhereInput[]
    name?: StringFilter<"guestbook_entries"> | string
    email?: StringNullableFilter<"guestbook_entries"> | string | null
    message?: StringFilter<"guestbook_entries"> | string
    is_approved?: BoolFilter<"guestbook_entries"> | boolean
    author_id?: StringNullableFilter<"guestbook_entries"> | string | null
    created_at?: DateTimeFilter<"guestbook_entries"> | Date | string
    updated_at?: DateTimeFilter<"guestbook_entries"> | Date | string
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type guestbook_entriesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    message?: SortOrder
    is_approved?: SortOrder
    author_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: guestbook_entriesCountOrderByAggregateInput
    _max?: guestbook_entriesMaxOrderByAggregateInput
    _min?: guestbook_entriesMinOrderByAggregateInput
  }

  export type guestbook_entriesScalarWhereWithAggregatesInput = {
    AND?: guestbook_entriesScalarWhereWithAggregatesInput | guestbook_entriesScalarWhereWithAggregatesInput[]
    OR?: guestbook_entriesScalarWhereWithAggregatesInput[]
    NOT?: guestbook_entriesScalarWhereWithAggregatesInput | guestbook_entriesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"guestbook_entries"> | string
    name?: StringWithAggregatesFilter<"guestbook_entries"> | string
    email?: StringNullableWithAggregatesFilter<"guestbook_entries"> | string | null
    message?: StringWithAggregatesFilter<"guestbook_entries"> | string
    is_approved?: BoolWithAggregatesFilter<"guestbook_entries"> | boolean
    author_id?: StringNullableWithAggregatesFilter<"guestbook_entries"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"guestbook_entries"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"guestbook_entries"> | Date | string
  }

  export type limited_collectionsWhereInput = {
    AND?: limited_collectionsWhereInput | limited_collectionsWhereInput[]
    OR?: limited_collectionsWhereInput[]
    NOT?: limited_collectionsWhereInput | limited_collectionsWhereInput[]
    id?: StringFilter<"limited_collections"> | string
    title?: StringFilter<"limited_collections"> | string
    description?: StringNullableFilter<"limited_collections"> | string | null
    content?: StringFilter<"limited_collections"> | string
    image_url?: StringNullableFilter<"limited_collections"> | string | null
    category?: StringNullableFilter<"limited_collections"> | string | null
    tags?: StringNullableFilter<"limited_collections"> | string | null
    max_access?: IntFilter<"limited_collections"> | number
    current_access?: IntFilter<"limited_collections"> | number
    is_active?: BoolFilter<"limited_collections"> | boolean
    author_id?: StringFilter<"limited_collections"> | string
    created_at?: DateTimeFilter<"limited_collections"> | Date | string
    updated_at?: DateTimeFilter<"limited_collections"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type limited_collectionsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrder
    image_url?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    max_access?: SortOrder
    current_access?: SortOrder
    is_active?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type limited_collectionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: limited_collectionsWhereInput | limited_collectionsWhereInput[]
    OR?: limited_collectionsWhereInput[]
    NOT?: limited_collectionsWhereInput | limited_collectionsWhereInput[]
    title?: StringFilter<"limited_collections"> | string
    description?: StringNullableFilter<"limited_collections"> | string | null
    content?: StringFilter<"limited_collections"> | string
    image_url?: StringNullableFilter<"limited_collections"> | string | null
    category?: StringNullableFilter<"limited_collections"> | string | null
    tags?: StringNullableFilter<"limited_collections"> | string | null
    max_access?: IntFilter<"limited_collections"> | number
    current_access?: IntFilter<"limited_collections"> | number
    is_active?: BoolFilter<"limited_collections"> | boolean
    author_id?: StringFilter<"limited_collections"> | string
    created_at?: DateTimeFilter<"limited_collections"> | Date | string
    updated_at?: DateTimeFilter<"limited_collections"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type limited_collectionsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrder
    image_url?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    max_access?: SortOrder
    current_access?: SortOrder
    is_active?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: limited_collectionsCountOrderByAggregateInput
    _avg?: limited_collectionsAvgOrderByAggregateInput
    _max?: limited_collectionsMaxOrderByAggregateInput
    _min?: limited_collectionsMinOrderByAggregateInput
    _sum?: limited_collectionsSumOrderByAggregateInput
  }

  export type limited_collectionsScalarWhereWithAggregatesInput = {
    AND?: limited_collectionsScalarWhereWithAggregatesInput | limited_collectionsScalarWhereWithAggregatesInput[]
    OR?: limited_collectionsScalarWhereWithAggregatesInput[]
    NOT?: limited_collectionsScalarWhereWithAggregatesInput | limited_collectionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"limited_collections"> | string
    title?: StringWithAggregatesFilter<"limited_collections"> | string
    description?: StringNullableWithAggregatesFilter<"limited_collections"> | string | null
    content?: StringWithAggregatesFilter<"limited_collections"> | string
    image_url?: StringNullableWithAggregatesFilter<"limited_collections"> | string | null
    category?: StringNullableWithAggregatesFilter<"limited_collections"> | string | null
    tags?: StringNullableWithAggregatesFilter<"limited_collections"> | string | null
    max_access?: IntWithAggregatesFilter<"limited_collections"> | number
    current_access?: IntWithAggregatesFilter<"limited_collections"> | number
    is_active?: BoolWithAggregatesFilter<"limited_collections"> | boolean
    author_id?: StringWithAggregatesFilter<"limited_collections"> | string
    created_at?: DateTimeWithAggregatesFilter<"limited_collections"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"limited_collections"> | Date | string
  }

  export type reportsWhereInput = {
    AND?: reportsWhereInput | reportsWhereInput[]
    OR?: reportsWhereInput[]
    NOT?: reportsWhereInput | reportsWhereInput[]
    id?: StringFilter<"reports"> | string
    title?: StringFilter<"reports"> | string
    description?: StringNullableFilter<"reports"> | string | null
    content?: StringFilter<"reports"> | string
    status?: EnumReportStatusFilter<"reports"> | $Enums.ReportStatus
    category?: StringNullableFilter<"reports"> | string | null
    priority?: EnumPriorityFilter<"reports"> | $Enums.Priority
    author_id?: StringFilter<"reports"> | string
    assignee_id?: StringNullableFilter<"reports"> | string | null
    created_at?: DateTimeFilter<"reports"> | Date | string
    updated_at?: DateTimeFilter<"reports"> | Date | string
    users_reports_assignee_idTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_reports_author_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    files?: Uploaded_filesListRelationFilter
  }

  export type reportsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrder
    status?: SortOrder
    category?: SortOrderInput | SortOrder
    priority?: SortOrder
    author_id?: SortOrder
    assignee_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    users_reports_assignee_idTousers?: usersOrderByWithRelationInput
    users_reports_author_idTousers?: usersOrderByWithRelationInput
    files?: uploaded_filesOrderByRelationAggregateInput
  }

  export type reportsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: reportsWhereInput | reportsWhereInput[]
    OR?: reportsWhereInput[]
    NOT?: reportsWhereInput | reportsWhereInput[]
    title?: StringFilter<"reports"> | string
    description?: StringNullableFilter<"reports"> | string | null
    content?: StringFilter<"reports"> | string
    status?: EnumReportStatusFilter<"reports"> | $Enums.ReportStatus
    category?: StringNullableFilter<"reports"> | string | null
    priority?: EnumPriorityFilter<"reports"> | $Enums.Priority
    author_id?: StringFilter<"reports"> | string
    assignee_id?: StringNullableFilter<"reports"> | string | null
    created_at?: DateTimeFilter<"reports"> | Date | string
    updated_at?: DateTimeFilter<"reports"> | Date | string
    users_reports_assignee_idTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_reports_author_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    files?: Uploaded_filesListRelationFilter
  }, "id">

  export type reportsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrder
    status?: SortOrder
    category?: SortOrderInput | SortOrder
    priority?: SortOrder
    author_id?: SortOrder
    assignee_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: reportsCountOrderByAggregateInput
    _max?: reportsMaxOrderByAggregateInput
    _min?: reportsMinOrderByAggregateInput
  }

  export type reportsScalarWhereWithAggregatesInput = {
    AND?: reportsScalarWhereWithAggregatesInput | reportsScalarWhereWithAggregatesInput[]
    OR?: reportsScalarWhereWithAggregatesInput[]
    NOT?: reportsScalarWhereWithAggregatesInput | reportsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"reports"> | string
    title?: StringWithAggregatesFilter<"reports"> | string
    description?: StringNullableWithAggregatesFilter<"reports"> | string | null
    content?: StringWithAggregatesFilter<"reports"> | string
    status?: EnumReportStatusWithAggregatesFilter<"reports"> | $Enums.ReportStatus
    category?: StringNullableWithAggregatesFilter<"reports"> | string | null
    priority?: EnumPriorityWithAggregatesFilter<"reports"> | $Enums.Priority
    author_id?: StringWithAggregatesFilter<"reports"> | string
    assignee_id?: StringNullableWithAggregatesFilter<"reports"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"reports"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"reports"> | Date | string
  }

  export type uploaded_filesWhereInput = {
    AND?: uploaded_filesWhereInput | uploaded_filesWhereInput[]
    OR?: uploaded_filesWhereInput[]
    NOT?: uploaded_filesWhereInput | uploaded_filesWhereInput[]
    id?: StringFilter<"uploaded_files"> | string
    filename?: StringFilter<"uploaded_files"> | string
    original_name?: StringFilter<"uploaded_files"> | string
    file_path?: StringFilter<"uploaded_files"> | string
    file_size?: IntFilter<"uploaded_files"> | number
    mime_type?: StringFilter<"uploaded_files"> | string
    category?: StringNullableFilter<"uploaded_files"> | string | null
    year?: StringNullableFilter<"uploaded_files"> | string | null
    batch?: StringNullableFilter<"uploaded_files"> | string | null
    report_id?: StringNullableFilter<"uploaded_files"> | string | null
    author_id?: StringFilter<"uploaded_files"> | string
    created_at?: DateTimeFilter<"uploaded_files"> | Date | string
    updated_at?: DateTimeFilter<"uploaded_files"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    reports?: XOR<ReportsNullableScalarRelationFilter, reportsWhereInput> | null
  }

  export type uploaded_filesOrderByWithRelationInput = {
    id?: SortOrder
    filename?: SortOrder
    original_name?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    mime_type?: SortOrder
    category?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    batch?: SortOrderInput | SortOrder
    report_id?: SortOrderInput | SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    users?: usersOrderByWithRelationInput
    reports?: reportsOrderByWithRelationInput
  }

  export type uploaded_filesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: uploaded_filesWhereInput | uploaded_filesWhereInput[]
    OR?: uploaded_filesWhereInput[]
    NOT?: uploaded_filesWhereInput | uploaded_filesWhereInput[]
    filename?: StringFilter<"uploaded_files"> | string
    original_name?: StringFilter<"uploaded_files"> | string
    file_path?: StringFilter<"uploaded_files"> | string
    file_size?: IntFilter<"uploaded_files"> | number
    mime_type?: StringFilter<"uploaded_files"> | string
    category?: StringNullableFilter<"uploaded_files"> | string | null
    year?: StringNullableFilter<"uploaded_files"> | string | null
    batch?: StringNullableFilter<"uploaded_files"> | string | null
    report_id?: StringNullableFilter<"uploaded_files"> | string | null
    author_id?: StringFilter<"uploaded_files"> | string
    created_at?: DateTimeFilter<"uploaded_files"> | Date | string
    updated_at?: DateTimeFilter<"uploaded_files"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    reports?: XOR<ReportsNullableScalarRelationFilter, reportsWhereInput> | null
  }, "id">

  export type uploaded_filesOrderByWithAggregationInput = {
    id?: SortOrder
    filename?: SortOrder
    original_name?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    mime_type?: SortOrder
    category?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    batch?: SortOrderInput | SortOrder
    report_id?: SortOrderInput | SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: uploaded_filesCountOrderByAggregateInput
    _avg?: uploaded_filesAvgOrderByAggregateInput
    _max?: uploaded_filesMaxOrderByAggregateInput
    _min?: uploaded_filesMinOrderByAggregateInput
    _sum?: uploaded_filesSumOrderByAggregateInput
  }

  export type uploaded_filesScalarWhereWithAggregatesInput = {
    AND?: uploaded_filesScalarWhereWithAggregatesInput | uploaded_filesScalarWhereWithAggregatesInput[]
    OR?: uploaded_filesScalarWhereWithAggregatesInput[]
    NOT?: uploaded_filesScalarWhereWithAggregatesInput | uploaded_filesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"uploaded_files"> | string
    filename?: StringWithAggregatesFilter<"uploaded_files"> | string
    original_name?: StringWithAggregatesFilter<"uploaded_files"> | string
    file_path?: StringWithAggregatesFilter<"uploaded_files"> | string
    file_size?: IntWithAggregatesFilter<"uploaded_files"> | number
    mime_type?: StringWithAggregatesFilter<"uploaded_files"> | string
    category?: StringNullableWithAggregatesFilter<"uploaded_files"> | string | null
    year?: StringNullableWithAggregatesFilter<"uploaded_files"> | string | null
    batch?: StringNullableWithAggregatesFilter<"uploaded_files"> | string | null
    report_id?: StringNullableWithAggregatesFilter<"uploaded_files"> | string | null
    author_id?: StringWithAggregatesFilter<"uploaded_files"> | string
    created_at?: DateTimeWithAggregatesFilter<"uploaded_files"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"uploaded_files"> | Date | string
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: EnumRoleFilter<"users"> | $Enums.Role
    name?: StringNullableFilter<"users"> | string | null
    avatar?: StringNullableFilter<"users"> | string | null
    training?: StringNullableFilter<"users"> | string | null
    angkatan?: StringNullableFilter<"users"> | string | null
    phone?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    collections?: CollectionsListRelationFilter
    guestbook_entries?: Guestbook_entriesListRelationFilter
    limited_collections?: Limited_collectionsListRelationFilter
    reports_reports_assignee_idTousers?: ReportsListRelationFilter
    reports_reports_author_idTousers?: ReportsListRelationFilter
    uploaded_files?: Uploaded_filesListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    training?: SortOrderInput | SortOrder
    angkatan?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    collections?: collectionsOrderByRelationAggregateInput
    guestbook_entries?: guestbook_entriesOrderByRelationAggregateInput
    limited_collections?: limited_collectionsOrderByRelationAggregateInput
    reports_reports_assignee_idTousers?: reportsOrderByRelationAggregateInput
    reports_reports_author_idTousers?: reportsOrderByRelationAggregateInput
    uploaded_files?: uploaded_filesOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password?: StringFilter<"users"> | string
    role?: EnumRoleFilter<"users"> | $Enums.Role
    name?: StringNullableFilter<"users"> | string | null
    avatar?: StringNullableFilter<"users"> | string | null
    training?: StringNullableFilter<"users"> | string | null
    angkatan?: StringNullableFilter<"users"> | string | null
    phone?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    collections?: CollectionsListRelationFilter
    guestbook_entries?: Guestbook_entriesListRelationFilter
    limited_collections?: Limited_collectionsListRelationFilter
    reports_reports_assignee_idTousers?: ReportsListRelationFilter
    reports_reports_author_idTousers?: ReportsListRelationFilter
    uploaded_files?: Uploaded_filesListRelationFilter
  }, "id" | "username" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    training?: SortOrderInput | SortOrder
    angkatan?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    username?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    role?: EnumRoleWithAggregatesFilter<"users"> | $Enums.Role
    name?: StringNullableWithAggregatesFilter<"users"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"users"> | string | null
    training?: StringNullableWithAggregatesFilter<"users"> | string | null
    angkatan?: StringNullableWithAggregatesFilter<"users"> | string | null
    phone?: StringNullableWithAggregatesFilter<"users"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type collectionsCreateInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    is_public?: boolean
    created_at?: Date | string
    updated_at: Date | string
    users: usersCreateNestedOneWithoutCollectionsInput
  }

  export type collectionsUncheckedCreateInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    is_public?: boolean
    author_id: string
    created_at?: Date | string
    updated_at: Date | string
  }

  export type collectionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutCollectionsNestedInput
  }

  export type collectionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type collectionsCreateManyInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    is_public?: boolean
    author_id: string
    created_at?: Date | string
    updated_at: Date | string
  }

  export type collectionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type collectionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type guestbook_entriesCreateInput = {
    id: string
    name: string
    email?: string | null
    message: string
    is_approved?: boolean
    created_at?: Date | string
    updated_at: Date | string
    users?: usersCreateNestedOneWithoutGuestbook_entriesInput
  }

  export type guestbook_entriesUncheckedCreateInput = {
    id: string
    name: string
    email?: string | null
    message: string
    is_approved?: boolean
    author_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type guestbook_entriesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    is_approved?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneWithoutGuestbook_entriesNestedInput
  }

  export type guestbook_entriesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    is_approved?: BoolFieldUpdateOperationsInput | boolean
    author_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type guestbook_entriesCreateManyInput = {
    id: string
    name: string
    email?: string | null
    message: string
    is_approved?: boolean
    author_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type guestbook_entriesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    is_approved?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type guestbook_entriesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    is_approved?: BoolFieldUpdateOperationsInput | boolean
    author_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type limited_collectionsCreateInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    max_access?: number
    current_access?: number
    is_active?: boolean
    created_at?: Date | string
    updated_at: Date | string
    users: usersCreateNestedOneWithoutLimited_collectionsInput
  }

  export type limited_collectionsUncheckedCreateInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    max_access?: number
    current_access?: number
    is_active?: boolean
    author_id: string
    created_at?: Date | string
    updated_at: Date | string
  }

  export type limited_collectionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    max_access?: IntFieldUpdateOperationsInput | number
    current_access?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutLimited_collectionsNestedInput
  }

  export type limited_collectionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    max_access?: IntFieldUpdateOperationsInput | number
    current_access?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type limited_collectionsCreateManyInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    max_access?: number
    current_access?: number
    is_active?: boolean
    author_id: string
    created_at?: Date | string
    updated_at: Date | string
  }

  export type limited_collectionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    max_access?: IntFieldUpdateOperationsInput | number
    current_access?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type limited_collectionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    max_access?: IntFieldUpdateOperationsInput | number
    current_access?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reportsCreateInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    created_at?: Date | string
    updated_at: Date | string
    users_reports_assignee_idTousers?: usersCreateNestedOneWithoutReports_reports_assignee_idTousersInput
    users_reports_author_idTousers: usersCreateNestedOneWithoutReports_reports_author_idTousersInput
    files?: uploaded_filesCreateNestedManyWithoutReportsInput
  }

  export type reportsUncheckedCreateInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    author_id: string
    assignee_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
    files?: uploaded_filesUncheckedCreateNestedManyWithoutReportsInput
  }

  export type reportsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users_reports_assignee_idTousers?: usersUpdateOneWithoutReports_reports_assignee_idTousersNestedInput
    users_reports_author_idTousers?: usersUpdateOneRequiredWithoutReports_reports_author_idTousersNestedInput
    files?: uploaded_filesUpdateManyWithoutReportsNestedInput
  }

  export type reportsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    author_id?: StringFieldUpdateOperationsInput | string
    assignee_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: uploaded_filesUncheckedUpdateManyWithoutReportsNestedInput
  }

  export type reportsCreateManyInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    author_id: string
    assignee_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type reportsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reportsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    author_id?: StringFieldUpdateOperationsInput | string
    assignee_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploaded_filesCreateInput = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    category?: string | null
    year?: string | null
    batch?: string | null
    created_at?: Date | string
    updated_at: Date | string
    users: usersCreateNestedOneWithoutUploaded_filesInput
    reports?: reportsCreateNestedOneWithoutFilesInput
  }

  export type uploaded_filesUncheckedCreateInput = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    category?: string | null
    year?: string | null
    batch?: string | null
    report_id?: string | null
    author_id: string
    created_at?: Date | string
    updated_at: Date | string
  }

  export type uploaded_filesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: IntFieldUpdateOperationsInput | number
    mime_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutUploaded_filesNestedInput
    reports?: reportsUpdateOneWithoutFilesNestedInput
  }

  export type uploaded_filesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: IntFieldUpdateOperationsInput | number
    mime_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    report_id?: NullableStringFieldUpdateOperationsInput | string | null
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploaded_filesCreateManyInput = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    category?: string | null
    year?: string | null
    batch?: string | null
    report_id?: string | null
    author_id: string
    created_at?: Date | string
    updated_at: Date | string
  }

  export type uploaded_filesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: IntFieldUpdateOperationsInput | number
    mime_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploaded_filesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: IntFieldUpdateOperationsInput | number
    mime_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    report_id?: NullableStringFieldUpdateOperationsInput | string | null
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersCreateInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type collectionsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    image_url?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    is_public?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type collectionsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    image_url?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    is_public?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type collectionsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    image_url?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    is_public?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type guestbook_entriesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    is_approved?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type guestbook_entriesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    is_approved?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type guestbook_entriesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    is_approved?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type limited_collectionsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    image_url?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    max_access?: SortOrder
    current_access?: SortOrder
    is_active?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type limited_collectionsAvgOrderByAggregateInput = {
    max_access?: SortOrder
    current_access?: SortOrder
  }

  export type limited_collectionsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    image_url?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    max_access?: SortOrder
    current_access?: SortOrder
    is_active?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type limited_collectionsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    image_url?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    max_access?: SortOrder
    current_access?: SortOrder
    is_active?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type limited_collectionsSumOrderByAggregateInput = {
    max_access?: SortOrder
    current_access?: SortOrder
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

  export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type EnumPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityFilter<$PrismaModel> | $Enums.Priority
  }

  export type Uploaded_filesListRelationFilter = {
    every?: uploaded_filesWhereInput
    some?: uploaded_filesWhereInput
    none?: uploaded_filesWhereInput
  }

  export type uploaded_filesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reportsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    status?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    author_id?: SortOrder
    assignee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reportsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    status?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    author_id?: SortOrder
    assignee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reportsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    status?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    author_id?: SortOrder
    assignee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type EnumPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityWithAggregatesFilter<$PrismaModel> | $Enums.Priority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityFilter<$PrismaModel>
    _max?: NestedEnumPriorityFilter<$PrismaModel>
  }

  export type ReportsNullableScalarRelationFilter = {
    is?: reportsWhereInput | null
    isNot?: reportsWhereInput | null
  }

  export type uploaded_filesCountOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    original_name?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    mime_type?: SortOrder
    category?: SortOrder
    year?: SortOrder
    batch?: SortOrder
    report_id?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type uploaded_filesAvgOrderByAggregateInput = {
    file_size?: SortOrder
  }

  export type uploaded_filesMaxOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    original_name?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    mime_type?: SortOrder
    category?: SortOrder
    year?: SortOrder
    batch?: SortOrder
    report_id?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type uploaded_filesMinOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    original_name?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    mime_type?: SortOrder
    category?: SortOrder
    year?: SortOrder
    batch?: SortOrder
    report_id?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type uploaded_filesSumOrderByAggregateInput = {
    file_size?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type CollectionsListRelationFilter = {
    every?: collectionsWhereInput
    some?: collectionsWhereInput
    none?: collectionsWhereInput
  }

  export type Guestbook_entriesListRelationFilter = {
    every?: guestbook_entriesWhereInput
    some?: guestbook_entriesWhereInput
    none?: guestbook_entriesWhereInput
  }

  export type Limited_collectionsListRelationFilter = {
    every?: limited_collectionsWhereInput
    some?: limited_collectionsWhereInput
    none?: limited_collectionsWhereInput
  }

  export type ReportsListRelationFilter = {
    every?: reportsWhereInput
    some?: reportsWhereInput
    none?: reportsWhereInput
  }

  export type collectionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type guestbook_entriesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type limited_collectionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reportsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    training?: SortOrder
    angkatan?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    training?: SortOrder
    angkatan?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    training?: SortOrder
    angkatan?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type usersCreateNestedOneWithoutCollectionsInput = {
    create?: XOR<usersCreateWithoutCollectionsInput, usersUncheckedCreateWithoutCollectionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCollectionsInput
    connect?: usersWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type usersUpdateOneRequiredWithoutCollectionsNestedInput = {
    create?: XOR<usersCreateWithoutCollectionsInput, usersUncheckedCreateWithoutCollectionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCollectionsInput
    upsert?: usersUpsertWithoutCollectionsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCollectionsInput, usersUpdateWithoutCollectionsInput>, usersUncheckedUpdateWithoutCollectionsInput>
  }

  export type usersCreateNestedOneWithoutGuestbook_entriesInput = {
    create?: XOR<usersCreateWithoutGuestbook_entriesInput, usersUncheckedCreateWithoutGuestbook_entriesInput>
    connectOrCreate?: usersCreateOrConnectWithoutGuestbook_entriesInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneWithoutGuestbook_entriesNestedInput = {
    create?: XOR<usersCreateWithoutGuestbook_entriesInput, usersUncheckedCreateWithoutGuestbook_entriesInput>
    connectOrCreate?: usersCreateOrConnectWithoutGuestbook_entriesInput
    upsert?: usersUpsertWithoutGuestbook_entriesInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutGuestbook_entriesInput, usersUpdateWithoutGuestbook_entriesInput>, usersUncheckedUpdateWithoutGuestbook_entriesInput>
  }

  export type usersCreateNestedOneWithoutLimited_collectionsInput = {
    create?: XOR<usersCreateWithoutLimited_collectionsInput, usersUncheckedCreateWithoutLimited_collectionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutLimited_collectionsInput
    connect?: usersWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutLimited_collectionsNestedInput = {
    create?: XOR<usersCreateWithoutLimited_collectionsInput, usersUncheckedCreateWithoutLimited_collectionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutLimited_collectionsInput
    upsert?: usersUpsertWithoutLimited_collectionsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutLimited_collectionsInput, usersUpdateWithoutLimited_collectionsInput>, usersUncheckedUpdateWithoutLimited_collectionsInput>
  }

  export type usersCreateNestedOneWithoutReports_reports_assignee_idTousersInput = {
    create?: XOR<usersCreateWithoutReports_reports_assignee_idTousersInput, usersUncheckedCreateWithoutReports_reports_assignee_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutReports_reports_assignee_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutReports_reports_author_idTousersInput = {
    create?: XOR<usersCreateWithoutReports_reports_author_idTousersInput, usersUncheckedCreateWithoutReports_reports_author_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutReports_reports_author_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type uploaded_filesCreateNestedManyWithoutReportsInput = {
    create?: XOR<uploaded_filesCreateWithoutReportsInput, uploaded_filesUncheckedCreateWithoutReportsInput> | uploaded_filesCreateWithoutReportsInput[] | uploaded_filesUncheckedCreateWithoutReportsInput[]
    connectOrCreate?: uploaded_filesCreateOrConnectWithoutReportsInput | uploaded_filesCreateOrConnectWithoutReportsInput[]
    createMany?: uploaded_filesCreateManyReportsInputEnvelope
    connect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
  }

  export type uploaded_filesUncheckedCreateNestedManyWithoutReportsInput = {
    create?: XOR<uploaded_filesCreateWithoutReportsInput, uploaded_filesUncheckedCreateWithoutReportsInput> | uploaded_filesCreateWithoutReportsInput[] | uploaded_filesUncheckedCreateWithoutReportsInput[]
    connectOrCreate?: uploaded_filesCreateOrConnectWithoutReportsInput | uploaded_filesCreateOrConnectWithoutReportsInput[]
    createMany?: uploaded_filesCreateManyReportsInputEnvelope
    connect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
  }

  export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus
  }

  export type EnumPriorityFieldUpdateOperationsInput = {
    set?: $Enums.Priority
  }

  export type usersUpdateOneWithoutReports_reports_assignee_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutReports_reports_assignee_idTousersInput, usersUncheckedCreateWithoutReports_reports_assignee_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutReports_reports_assignee_idTousersInput
    upsert?: usersUpsertWithoutReports_reports_assignee_idTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutReports_reports_assignee_idTousersInput, usersUpdateWithoutReports_reports_assignee_idTousersInput>, usersUncheckedUpdateWithoutReports_reports_assignee_idTousersInput>
  }

  export type usersUpdateOneRequiredWithoutReports_reports_author_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutReports_reports_author_idTousersInput, usersUncheckedCreateWithoutReports_reports_author_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutReports_reports_author_idTousersInput
    upsert?: usersUpsertWithoutReports_reports_author_idTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutReports_reports_author_idTousersInput, usersUpdateWithoutReports_reports_author_idTousersInput>, usersUncheckedUpdateWithoutReports_reports_author_idTousersInput>
  }

  export type uploaded_filesUpdateManyWithoutReportsNestedInput = {
    create?: XOR<uploaded_filesCreateWithoutReportsInput, uploaded_filesUncheckedCreateWithoutReportsInput> | uploaded_filesCreateWithoutReportsInput[] | uploaded_filesUncheckedCreateWithoutReportsInput[]
    connectOrCreate?: uploaded_filesCreateOrConnectWithoutReportsInput | uploaded_filesCreateOrConnectWithoutReportsInput[]
    upsert?: uploaded_filesUpsertWithWhereUniqueWithoutReportsInput | uploaded_filesUpsertWithWhereUniqueWithoutReportsInput[]
    createMany?: uploaded_filesCreateManyReportsInputEnvelope
    set?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    disconnect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    delete?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    connect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    update?: uploaded_filesUpdateWithWhereUniqueWithoutReportsInput | uploaded_filesUpdateWithWhereUniqueWithoutReportsInput[]
    updateMany?: uploaded_filesUpdateManyWithWhereWithoutReportsInput | uploaded_filesUpdateManyWithWhereWithoutReportsInput[]
    deleteMany?: uploaded_filesScalarWhereInput | uploaded_filesScalarWhereInput[]
  }

  export type uploaded_filesUncheckedUpdateManyWithoutReportsNestedInput = {
    create?: XOR<uploaded_filesCreateWithoutReportsInput, uploaded_filesUncheckedCreateWithoutReportsInput> | uploaded_filesCreateWithoutReportsInput[] | uploaded_filesUncheckedCreateWithoutReportsInput[]
    connectOrCreate?: uploaded_filesCreateOrConnectWithoutReportsInput | uploaded_filesCreateOrConnectWithoutReportsInput[]
    upsert?: uploaded_filesUpsertWithWhereUniqueWithoutReportsInput | uploaded_filesUpsertWithWhereUniqueWithoutReportsInput[]
    createMany?: uploaded_filesCreateManyReportsInputEnvelope
    set?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    disconnect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    delete?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    connect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    update?: uploaded_filesUpdateWithWhereUniqueWithoutReportsInput | uploaded_filesUpdateWithWhereUniqueWithoutReportsInput[]
    updateMany?: uploaded_filesUpdateManyWithWhereWithoutReportsInput | uploaded_filesUpdateManyWithWhereWithoutReportsInput[]
    deleteMany?: uploaded_filesScalarWhereInput | uploaded_filesScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutUploaded_filesInput = {
    create?: XOR<usersCreateWithoutUploaded_filesInput, usersUncheckedCreateWithoutUploaded_filesInput>
    connectOrCreate?: usersCreateOrConnectWithoutUploaded_filesInput
    connect?: usersWhereUniqueInput
  }

  export type reportsCreateNestedOneWithoutFilesInput = {
    create?: XOR<reportsCreateWithoutFilesInput, reportsUncheckedCreateWithoutFilesInput>
    connectOrCreate?: reportsCreateOrConnectWithoutFilesInput
    connect?: reportsWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutUploaded_filesNestedInput = {
    create?: XOR<usersCreateWithoutUploaded_filesInput, usersUncheckedCreateWithoutUploaded_filesInput>
    connectOrCreate?: usersCreateOrConnectWithoutUploaded_filesInput
    upsert?: usersUpsertWithoutUploaded_filesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutUploaded_filesInput, usersUpdateWithoutUploaded_filesInput>, usersUncheckedUpdateWithoutUploaded_filesInput>
  }

  export type reportsUpdateOneWithoutFilesNestedInput = {
    create?: XOR<reportsCreateWithoutFilesInput, reportsUncheckedCreateWithoutFilesInput>
    connectOrCreate?: reportsCreateOrConnectWithoutFilesInput
    upsert?: reportsUpsertWithoutFilesInput
    disconnect?: reportsWhereInput | boolean
    delete?: reportsWhereInput | boolean
    connect?: reportsWhereUniqueInput
    update?: XOR<XOR<reportsUpdateToOneWithWhereWithoutFilesInput, reportsUpdateWithoutFilesInput>, reportsUncheckedUpdateWithoutFilesInput>
  }

  export type collectionsCreateNestedManyWithoutUsersInput = {
    create?: XOR<collectionsCreateWithoutUsersInput, collectionsUncheckedCreateWithoutUsersInput> | collectionsCreateWithoutUsersInput[] | collectionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: collectionsCreateOrConnectWithoutUsersInput | collectionsCreateOrConnectWithoutUsersInput[]
    createMany?: collectionsCreateManyUsersInputEnvelope
    connect?: collectionsWhereUniqueInput | collectionsWhereUniqueInput[]
  }

  export type guestbook_entriesCreateNestedManyWithoutUsersInput = {
    create?: XOR<guestbook_entriesCreateWithoutUsersInput, guestbook_entriesUncheckedCreateWithoutUsersInput> | guestbook_entriesCreateWithoutUsersInput[] | guestbook_entriesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: guestbook_entriesCreateOrConnectWithoutUsersInput | guestbook_entriesCreateOrConnectWithoutUsersInput[]
    createMany?: guestbook_entriesCreateManyUsersInputEnvelope
    connect?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
  }

  export type limited_collectionsCreateNestedManyWithoutUsersInput = {
    create?: XOR<limited_collectionsCreateWithoutUsersInput, limited_collectionsUncheckedCreateWithoutUsersInput> | limited_collectionsCreateWithoutUsersInput[] | limited_collectionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: limited_collectionsCreateOrConnectWithoutUsersInput | limited_collectionsCreateOrConnectWithoutUsersInput[]
    createMany?: limited_collectionsCreateManyUsersInputEnvelope
    connect?: limited_collectionsWhereUniqueInput | limited_collectionsWhereUniqueInput[]
  }

  export type reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput = {
    create?: XOR<reportsCreateWithoutUsers_reports_assignee_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput> | reportsCreateWithoutUsers_reports_assignee_idTousersInput[] | reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput[]
    connectOrCreate?: reportsCreateOrConnectWithoutUsers_reports_assignee_idTousersInput | reportsCreateOrConnectWithoutUsers_reports_assignee_idTousersInput[]
    createMany?: reportsCreateManyUsers_reports_assignee_idTousersInputEnvelope
    connect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
  }

  export type reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput = {
    create?: XOR<reportsCreateWithoutUsers_reports_author_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput> | reportsCreateWithoutUsers_reports_author_idTousersInput[] | reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput[]
    connectOrCreate?: reportsCreateOrConnectWithoutUsers_reports_author_idTousersInput | reportsCreateOrConnectWithoutUsers_reports_author_idTousersInput[]
    createMany?: reportsCreateManyUsers_reports_author_idTousersInputEnvelope
    connect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
  }

  export type uploaded_filesCreateNestedManyWithoutUsersInput = {
    create?: XOR<uploaded_filesCreateWithoutUsersInput, uploaded_filesUncheckedCreateWithoutUsersInput> | uploaded_filesCreateWithoutUsersInput[] | uploaded_filesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: uploaded_filesCreateOrConnectWithoutUsersInput | uploaded_filesCreateOrConnectWithoutUsersInput[]
    createMany?: uploaded_filesCreateManyUsersInputEnvelope
    connect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
  }

  export type collectionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<collectionsCreateWithoutUsersInput, collectionsUncheckedCreateWithoutUsersInput> | collectionsCreateWithoutUsersInput[] | collectionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: collectionsCreateOrConnectWithoutUsersInput | collectionsCreateOrConnectWithoutUsersInput[]
    createMany?: collectionsCreateManyUsersInputEnvelope
    connect?: collectionsWhereUniqueInput | collectionsWhereUniqueInput[]
  }

  export type guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<guestbook_entriesCreateWithoutUsersInput, guestbook_entriesUncheckedCreateWithoutUsersInput> | guestbook_entriesCreateWithoutUsersInput[] | guestbook_entriesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: guestbook_entriesCreateOrConnectWithoutUsersInput | guestbook_entriesCreateOrConnectWithoutUsersInput[]
    createMany?: guestbook_entriesCreateManyUsersInputEnvelope
    connect?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
  }

  export type limited_collectionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<limited_collectionsCreateWithoutUsersInput, limited_collectionsUncheckedCreateWithoutUsersInput> | limited_collectionsCreateWithoutUsersInput[] | limited_collectionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: limited_collectionsCreateOrConnectWithoutUsersInput | limited_collectionsCreateOrConnectWithoutUsersInput[]
    createMany?: limited_collectionsCreateManyUsersInputEnvelope
    connect?: limited_collectionsWhereUniqueInput | limited_collectionsWhereUniqueInput[]
  }

  export type reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput = {
    create?: XOR<reportsCreateWithoutUsers_reports_assignee_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput> | reportsCreateWithoutUsers_reports_assignee_idTousersInput[] | reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput[]
    connectOrCreate?: reportsCreateOrConnectWithoutUsers_reports_assignee_idTousersInput | reportsCreateOrConnectWithoutUsers_reports_assignee_idTousersInput[]
    createMany?: reportsCreateManyUsers_reports_assignee_idTousersInputEnvelope
    connect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
  }

  export type reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput = {
    create?: XOR<reportsCreateWithoutUsers_reports_author_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput> | reportsCreateWithoutUsers_reports_author_idTousersInput[] | reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput[]
    connectOrCreate?: reportsCreateOrConnectWithoutUsers_reports_author_idTousersInput | reportsCreateOrConnectWithoutUsers_reports_author_idTousersInput[]
    createMany?: reportsCreateManyUsers_reports_author_idTousersInputEnvelope
    connect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
  }

  export type uploaded_filesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<uploaded_filesCreateWithoutUsersInput, uploaded_filesUncheckedCreateWithoutUsersInput> | uploaded_filesCreateWithoutUsersInput[] | uploaded_filesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: uploaded_filesCreateOrConnectWithoutUsersInput | uploaded_filesCreateOrConnectWithoutUsersInput[]
    createMany?: uploaded_filesCreateManyUsersInputEnvelope
    connect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type collectionsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<collectionsCreateWithoutUsersInput, collectionsUncheckedCreateWithoutUsersInput> | collectionsCreateWithoutUsersInput[] | collectionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: collectionsCreateOrConnectWithoutUsersInput | collectionsCreateOrConnectWithoutUsersInput[]
    upsert?: collectionsUpsertWithWhereUniqueWithoutUsersInput | collectionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: collectionsCreateManyUsersInputEnvelope
    set?: collectionsWhereUniqueInput | collectionsWhereUniqueInput[]
    disconnect?: collectionsWhereUniqueInput | collectionsWhereUniqueInput[]
    delete?: collectionsWhereUniqueInput | collectionsWhereUniqueInput[]
    connect?: collectionsWhereUniqueInput | collectionsWhereUniqueInput[]
    update?: collectionsUpdateWithWhereUniqueWithoutUsersInput | collectionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: collectionsUpdateManyWithWhereWithoutUsersInput | collectionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: collectionsScalarWhereInput | collectionsScalarWhereInput[]
  }

  export type guestbook_entriesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<guestbook_entriesCreateWithoutUsersInput, guestbook_entriesUncheckedCreateWithoutUsersInput> | guestbook_entriesCreateWithoutUsersInput[] | guestbook_entriesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: guestbook_entriesCreateOrConnectWithoutUsersInput | guestbook_entriesCreateOrConnectWithoutUsersInput[]
    upsert?: guestbook_entriesUpsertWithWhereUniqueWithoutUsersInput | guestbook_entriesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: guestbook_entriesCreateManyUsersInputEnvelope
    set?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
    disconnect?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
    delete?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
    connect?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
    update?: guestbook_entriesUpdateWithWhereUniqueWithoutUsersInput | guestbook_entriesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: guestbook_entriesUpdateManyWithWhereWithoutUsersInput | guestbook_entriesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: guestbook_entriesScalarWhereInput | guestbook_entriesScalarWhereInput[]
  }

  export type limited_collectionsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<limited_collectionsCreateWithoutUsersInput, limited_collectionsUncheckedCreateWithoutUsersInput> | limited_collectionsCreateWithoutUsersInput[] | limited_collectionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: limited_collectionsCreateOrConnectWithoutUsersInput | limited_collectionsCreateOrConnectWithoutUsersInput[]
    upsert?: limited_collectionsUpsertWithWhereUniqueWithoutUsersInput | limited_collectionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: limited_collectionsCreateManyUsersInputEnvelope
    set?: limited_collectionsWhereUniqueInput | limited_collectionsWhereUniqueInput[]
    disconnect?: limited_collectionsWhereUniqueInput | limited_collectionsWhereUniqueInput[]
    delete?: limited_collectionsWhereUniqueInput | limited_collectionsWhereUniqueInput[]
    connect?: limited_collectionsWhereUniqueInput | limited_collectionsWhereUniqueInput[]
    update?: limited_collectionsUpdateWithWhereUniqueWithoutUsersInput | limited_collectionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: limited_collectionsUpdateManyWithWhereWithoutUsersInput | limited_collectionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: limited_collectionsScalarWhereInput | limited_collectionsScalarWhereInput[]
  }

  export type reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput = {
    create?: XOR<reportsCreateWithoutUsers_reports_assignee_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput> | reportsCreateWithoutUsers_reports_assignee_idTousersInput[] | reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput[]
    connectOrCreate?: reportsCreateOrConnectWithoutUsers_reports_assignee_idTousersInput | reportsCreateOrConnectWithoutUsers_reports_assignee_idTousersInput[]
    upsert?: reportsUpsertWithWhereUniqueWithoutUsers_reports_assignee_idTousersInput | reportsUpsertWithWhereUniqueWithoutUsers_reports_assignee_idTousersInput[]
    createMany?: reportsCreateManyUsers_reports_assignee_idTousersInputEnvelope
    set?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    disconnect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    delete?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    connect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    update?: reportsUpdateWithWhereUniqueWithoutUsers_reports_assignee_idTousersInput | reportsUpdateWithWhereUniqueWithoutUsers_reports_assignee_idTousersInput[]
    updateMany?: reportsUpdateManyWithWhereWithoutUsers_reports_assignee_idTousersInput | reportsUpdateManyWithWhereWithoutUsers_reports_assignee_idTousersInput[]
    deleteMany?: reportsScalarWhereInput | reportsScalarWhereInput[]
  }

  export type reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput = {
    create?: XOR<reportsCreateWithoutUsers_reports_author_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput> | reportsCreateWithoutUsers_reports_author_idTousersInput[] | reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput[]
    connectOrCreate?: reportsCreateOrConnectWithoutUsers_reports_author_idTousersInput | reportsCreateOrConnectWithoutUsers_reports_author_idTousersInput[]
    upsert?: reportsUpsertWithWhereUniqueWithoutUsers_reports_author_idTousersInput | reportsUpsertWithWhereUniqueWithoutUsers_reports_author_idTousersInput[]
    createMany?: reportsCreateManyUsers_reports_author_idTousersInputEnvelope
    set?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    disconnect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    delete?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    connect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    update?: reportsUpdateWithWhereUniqueWithoutUsers_reports_author_idTousersInput | reportsUpdateWithWhereUniqueWithoutUsers_reports_author_idTousersInput[]
    updateMany?: reportsUpdateManyWithWhereWithoutUsers_reports_author_idTousersInput | reportsUpdateManyWithWhereWithoutUsers_reports_author_idTousersInput[]
    deleteMany?: reportsScalarWhereInput | reportsScalarWhereInput[]
  }

  export type uploaded_filesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<uploaded_filesCreateWithoutUsersInput, uploaded_filesUncheckedCreateWithoutUsersInput> | uploaded_filesCreateWithoutUsersInput[] | uploaded_filesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: uploaded_filesCreateOrConnectWithoutUsersInput | uploaded_filesCreateOrConnectWithoutUsersInput[]
    upsert?: uploaded_filesUpsertWithWhereUniqueWithoutUsersInput | uploaded_filesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: uploaded_filesCreateManyUsersInputEnvelope
    set?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    disconnect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    delete?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    connect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    update?: uploaded_filesUpdateWithWhereUniqueWithoutUsersInput | uploaded_filesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: uploaded_filesUpdateManyWithWhereWithoutUsersInput | uploaded_filesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: uploaded_filesScalarWhereInput | uploaded_filesScalarWhereInput[]
  }

  export type collectionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<collectionsCreateWithoutUsersInput, collectionsUncheckedCreateWithoutUsersInput> | collectionsCreateWithoutUsersInput[] | collectionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: collectionsCreateOrConnectWithoutUsersInput | collectionsCreateOrConnectWithoutUsersInput[]
    upsert?: collectionsUpsertWithWhereUniqueWithoutUsersInput | collectionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: collectionsCreateManyUsersInputEnvelope
    set?: collectionsWhereUniqueInput | collectionsWhereUniqueInput[]
    disconnect?: collectionsWhereUniqueInput | collectionsWhereUniqueInput[]
    delete?: collectionsWhereUniqueInput | collectionsWhereUniqueInput[]
    connect?: collectionsWhereUniqueInput | collectionsWhereUniqueInput[]
    update?: collectionsUpdateWithWhereUniqueWithoutUsersInput | collectionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: collectionsUpdateManyWithWhereWithoutUsersInput | collectionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: collectionsScalarWhereInput | collectionsScalarWhereInput[]
  }

  export type guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<guestbook_entriesCreateWithoutUsersInput, guestbook_entriesUncheckedCreateWithoutUsersInput> | guestbook_entriesCreateWithoutUsersInput[] | guestbook_entriesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: guestbook_entriesCreateOrConnectWithoutUsersInput | guestbook_entriesCreateOrConnectWithoutUsersInput[]
    upsert?: guestbook_entriesUpsertWithWhereUniqueWithoutUsersInput | guestbook_entriesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: guestbook_entriesCreateManyUsersInputEnvelope
    set?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
    disconnect?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
    delete?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
    connect?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
    update?: guestbook_entriesUpdateWithWhereUniqueWithoutUsersInput | guestbook_entriesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: guestbook_entriesUpdateManyWithWhereWithoutUsersInput | guestbook_entriesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: guestbook_entriesScalarWhereInput | guestbook_entriesScalarWhereInput[]
  }

  export type limited_collectionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<limited_collectionsCreateWithoutUsersInput, limited_collectionsUncheckedCreateWithoutUsersInput> | limited_collectionsCreateWithoutUsersInput[] | limited_collectionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: limited_collectionsCreateOrConnectWithoutUsersInput | limited_collectionsCreateOrConnectWithoutUsersInput[]
    upsert?: limited_collectionsUpsertWithWhereUniqueWithoutUsersInput | limited_collectionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: limited_collectionsCreateManyUsersInputEnvelope
    set?: limited_collectionsWhereUniqueInput | limited_collectionsWhereUniqueInput[]
    disconnect?: limited_collectionsWhereUniqueInput | limited_collectionsWhereUniqueInput[]
    delete?: limited_collectionsWhereUniqueInput | limited_collectionsWhereUniqueInput[]
    connect?: limited_collectionsWhereUniqueInput | limited_collectionsWhereUniqueInput[]
    update?: limited_collectionsUpdateWithWhereUniqueWithoutUsersInput | limited_collectionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: limited_collectionsUpdateManyWithWhereWithoutUsersInput | limited_collectionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: limited_collectionsScalarWhereInput | limited_collectionsScalarWhereInput[]
  }

  export type reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput = {
    create?: XOR<reportsCreateWithoutUsers_reports_assignee_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput> | reportsCreateWithoutUsers_reports_assignee_idTousersInput[] | reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput[]
    connectOrCreate?: reportsCreateOrConnectWithoutUsers_reports_assignee_idTousersInput | reportsCreateOrConnectWithoutUsers_reports_assignee_idTousersInput[]
    upsert?: reportsUpsertWithWhereUniqueWithoutUsers_reports_assignee_idTousersInput | reportsUpsertWithWhereUniqueWithoutUsers_reports_assignee_idTousersInput[]
    createMany?: reportsCreateManyUsers_reports_assignee_idTousersInputEnvelope
    set?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    disconnect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    delete?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    connect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    update?: reportsUpdateWithWhereUniqueWithoutUsers_reports_assignee_idTousersInput | reportsUpdateWithWhereUniqueWithoutUsers_reports_assignee_idTousersInput[]
    updateMany?: reportsUpdateManyWithWhereWithoutUsers_reports_assignee_idTousersInput | reportsUpdateManyWithWhereWithoutUsers_reports_assignee_idTousersInput[]
    deleteMany?: reportsScalarWhereInput | reportsScalarWhereInput[]
  }

  export type reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput = {
    create?: XOR<reportsCreateWithoutUsers_reports_author_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput> | reportsCreateWithoutUsers_reports_author_idTousersInput[] | reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput[]
    connectOrCreate?: reportsCreateOrConnectWithoutUsers_reports_author_idTousersInput | reportsCreateOrConnectWithoutUsers_reports_author_idTousersInput[]
    upsert?: reportsUpsertWithWhereUniqueWithoutUsers_reports_author_idTousersInput | reportsUpsertWithWhereUniqueWithoutUsers_reports_author_idTousersInput[]
    createMany?: reportsCreateManyUsers_reports_author_idTousersInputEnvelope
    set?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    disconnect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    delete?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    connect?: reportsWhereUniqueInput | reportsWhereUniqueInput[]
    update?: reportsUpdateWithWhereUniqueWithoutUsers_reports_author_idTousersInput | reportsUpdateWithWhereUniqueWithoutUsers_reports_author_idTousersInput[]
    updateMany?: reportsUpdateManyWithWhereWithoutUsers_reports_author_idTousersInput | reportsUpdateManyWithWhereWithoutUsers_reports_author_idTousersInput[]
    deleteMany?: reportsScalarWhereInput | reportsScalarWhereInput[]
  }

  export type uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<uploaded_filesCreateWithoutUsersInput, uploaded_filesUncheckedCreateWithoutUsersInput> | uploaded_filesCreateWithoutUsersInput[] | uploaded_filesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: uploaded_filesCreateOrConnectWithoutUsersInput | uploaded_filesCreateOrConnectWithoutUsersInput[]
    upsert?: uploaded_filesUpsertWithWhereUniqueWithoutUsersInput | uploaded_filesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: uploaded_filesCreateManyUsersInputEnvelope
    set?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    disconnect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    delete?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    connect?: uploaded_filesWhereUniqueInput | uploaded_filesWhereUniqueInput[]
    update?: uploaded_filesUpdateWithWhereUniqueWithoutUsersInput | uploaded_filesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: uploaded_filesUpdateManyWithWhereWithoutUsersInput | uploaded_filesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: uploaded_filesScalarWhereInput | uploaded_filesScalarWhereInput[]
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type NestedEnumPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityFilter<$PrismaModel> | $Enums.Priority
  }

  export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type NestedEnumPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priority | EnumPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Priority[] | ListEnumPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumPriorityWithAggregatesFilter<$PrismaModel> | $Enums.Priority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriorityFilter<$PrismaModel>
    _max?: NestedEnumPriorityFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type usersCreateWithoutCollectionsInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutCollectionsInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutCollectionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCollectionsInput, usersUncheckedCreateWithoutCollectionsInput>
  }

  export type usersUpsertWithoutCollectionsInput = {
    update: XOR<usersUpdateWithoutCollectionsInput, usersUncheckedUpdateWithoutCollectionsInput>
    create: XOR<usersCreateWithoutCollectionsInput, usersUncheckedCreateWithoutCollectionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCollectionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCollectionsInput, usersUncheckedUpdateWithoutCollectionsInput>
  }

  export type usersUpdateWithoutCollectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutCollectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateWithoutGuestbook_entriesInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutGuestbook_entriesInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsUncheckedCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutGuestbook_entriesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutGuestbook_entriesInput, usersUncheckedCreateWithoutGuestbook_entriesInput>
  }

  export type usersUpsertWithoutGuestbook_entriesInput = {
    update: XOR<usersUpdateWithoutGuestbook_entriesInput, usersUncheckedUpdateWithoutGuestbook_entriesInput>
    create: XOR<usersCreateWithoutGuestbook_entriesInput, usersUncheckedCreateWithoutGuestbook_entriesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutGuestbook_entriesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutGuestbook_entriesInput, usersUncheckedUpdateWithoutGuestbook_entriesInput>
  }

  export type usersUpdateWithoutGuestbook_entriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutGuestbook_entriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUncheckedUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateWithoutLimited_collectionsInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutLimited_collectionsInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutLimited_collectionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutLimited_collectionsInput, usersUncheckedCreateWithoutLimited_collectionsInput>
  }

  export type usersUpsertWithoutLimited_collectionsInput = {
    update: XOR<usersUpdateWithoutLimited_collectionsInput, usersUncheckedUpdateWithoutLimited_collectionsInput>
    create: XOR<usersCreateWithoutLimited_collectionsInput, usersUncheckedCreateWithoutLimited_collectionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutLimited_collectionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutLimited_collectionsInput, usersUncheckedUpdateWithoutLimited_collectionsInput>
  }

  export type usersUpdateWithoutLimited_collectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutLimited_collectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateWithoutReports_reports_assignee_idTousersInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsCreateNestedManyWithoutUsersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutReports_reports_assignee_idTousersInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutReports_reports_assignee_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutReports_reports_assignee_idTousersInput, usersUncheckedCreateWithoutReports_reports_assignee_idTousersInput>
  }

  export type usersCreateWithoutReports_reports_author_idTousersInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutReports_reports_author_idTousersInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutReports_reports_author_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutReports_reports_author_idTousersInput, usersUncheckedCreateWithoutReports_reports_author_idTousersInput>
  }

  export type uploaded_filesCreateWithoutReportsInput = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    category?: string | null
    year?: string | null
    batch?: string | null
    created_at?: Date | string
    updated_at: Date | string
    users: usersCreateNestedOneWithoutUploaded_filesInput
  }

  export type uploaded_filesUncheckedCreateWithoutReportsInput = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    category?: string | null
    year?: string | null
    batch?: string | null
    author_id: string
    created_at?: Date | string
    updated_at: Date | string
  }

  export type uploaded_filesCreateOrConnectWithoutReportsInput = {
    where: uploaded_filesWhereUniqueInput
    create: XOR<uploaded_filesCreateWithoutReportsInput, uploaded_filesUncheckedCreateWithoutReportsInput>
  }

  export type uploaded_filesCreateManyReportsInputEnvelope = {
    data: uploaded_filesCreateManyReportsInput | uploaded_filesCreateManyReportsInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutReports_reports_assignee_idTousersInput = {
    update: XOR<usersUpdateWithoutReports_reports_assignee_idTousersInput, usersUncheckedUpdateWithoutReports_reports_assignee_idTousersInput>
    create: XOR<usersCreateWithoutReports_reports_assignee_idTousersInput, usersUncheckedCreateWithoutReports_reports_assignee_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutReports_reports_assignee_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutReports_reports_assignee_idTousersInput, usersUncheckedUpdateWithoutReports_reports_assignee_idTousersInput>
  }

  export type usersUpdateWithoutReports_reports_assignee_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUpdateManyWithoutUsersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutReports_reports_assignee_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersUpsertWithoutReports_reports_author_idTousersInput = {
    update: XOR<usersUpdateWithoutReports_reports_author_idTousersInput, usersUncheckedUpdateWithoutReports_reports_author_idTousersInput>
    create: XOR<usersCreateWithoutReports_reports_author_idTousersInput, usersUncheckedCreateWithoutReports_reports_author_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutReports_reports_author_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutReports_reports_author_idTousersInput, usersUncheckedUpdateWithoutReports_reports_author_idTousersInput>
  }

  export type usersUpdateWithoutReports_reports_author_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutReports_reports_author_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type uploaded_filesUpsertWithWhereUniqueWithoutReportsInput = {
    where: uploaded_filesWhereUniqueInput
    update: XOR<uploaded_filesUpdateWithoutReportsInput, uploaded_filesUncheckedUpdateWithoutReportsInput>
    create: XOR<uploaded_filesCreateWithoutReportsInput, uploaded_filesUncheckedCreateWithoutReportsInput>
  }

  export type uploaded_filesUpdateWithWhereUniqueWithoutReportsInput = {
    where: uploaded_filesWhereUniqueInput
    data: XOR<uploaded_filesUpdateWithoutReportsInput, uploaded_filesUncheckedUpdateWithoutReportsInput>
  }

  export type uploaded_filesUpdateManyWithWhereWithoutReportsInput = {
    where: uploaded_filesScalarWhereInput
    data: XOR<uploaded_filesUpdateManyMutationInput, uploaded_filesUncheckedUpdateManyWithoutReportsInput>
  }

  export type uploaded_filesScalarWhereInput = {
    AND?: uploaded_filesScalarWhereInput | uploaded_filesScalarWhereInput[]
    OR?: uploaded_filesScalarWhereInput[]
    NOT?: uploaded_filesScalarWhereInput | uploaded_filesScalarWhereInput[]
    id?: StringFilter<"uploaded_files"> | string
    filename?: StringFilter<"uploaded_files"> | string
    original_name?: StringFilter<"uploaded_files"> | string
    file_path?: StringFilter<"uploaded_files"> | string
    file_size?: IntFilter<"uploaded_files"> | number
    mime_type?: StringFilter<"uploaded_files"> | string
    category?: StringNullableFilter<"uploaded_files"> | string | null
    year?: StringNullableFilter<"uploaded_files"> | string | null
    batch?: StringNullableFilter<"uploaded_files"> | string | null
    report_id?: StringNullableFilter<"uploaded_files"> | string | null
    author_id?: StringFilter<"uploaded_files"> | string
    created_at?: DateTimeFilter<"uploaded_files"> | Date | string
    updated_at?: DateTimeFilter<"uploaded_files"> | Date | string
  }

  export type usersCreateWithoutUploaded_filesInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
  }

  export type usersUncheckedCreateWithoutUploaded_filesInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    collections?: collectionsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    limited_collections?: limited_collectionsUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
  }

  export type usersCreateOrConnectWithoutUploaded_filesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUploaded_filesInput, usersUncheckedCreateWithoutUploaded_filesInput>
  }

  export type reportsCreateWithoutFilesInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    created_at?: Date | string
    updated_at: Date | string
    users_reports_assignee_idTousers?: usersCreateNestedOneWithoutReports_reports_assignee_idTousersInput
    users_reports_author_idTousers: usersCreateNestedOneWithoutReports_reports_author_idTousersInput
  }

  export type reportsUncheckedCreateWithoutFilesInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    author_id: string
    assignee_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type reportsCreateOrConnectWithoutFilesInput = {
    where: reportsWhereUniqueInput
    create: XOR<reportsCreateWithoutFilesInput, reportsUncheckedCreateWithoutFilesInput>
  }

  export type usersUpsertWithoutUploaded_filesInput = {
    update: XOR<usersUpdateWithoutUploaded_filesInput, usersUncheckedUpdateWithoutUploaded_filesInput>
    create: XOR<usersCreateWithoutUploaded_filesInput, usersUncheckedCreateWithoutUploaded_filesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutUploaded_filesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutUploaded_filesInput, usersUncheckedUpdateWithoutUploaded_filesInput>
  }

  export type usersUpdateWithoutUploaded_filesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutUploaded_filesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    collections?: collectionsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    limited_collections?: limited_collectionsUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
  }

  export type reportsUpsertWithoutFilesInput = {
    update: XOR<reportsUpdateWithoutFilesInput, reportsUncheckedUpdateWithoutFilesInput>
    create: XOR<reportsCreateWithoutFilesInput, reportsUncheckedCreateWithoutFilesInput>
    where?: reportsWhereInput
  }

  export type reportsUpdateToOneWithWhereWithoutFilesInput = {
    where?: reportsWhereInput
    data: XOR<reportsUpdateWithoutFilesInput, reportsUncheckedUpdateWithoutFilesInput>
  }

  export type reportsUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users_reports_assignee_idTousers?: usersUpdateOneWithoutReports_reports_assignee_idTousersNestedInput
    users_reports_author_idTousers?: usersUpdateOneRequiredWithoutReports_reports_author_idTousersNestedInput
  }

  export type reportsUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    author_id?: StringFieldUpdateOperationsInput | string
    assignee_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type collectionsCreateWithoutUsersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    is_public?: boolean
    created_at?: Date | string
    updated_at: Date | string
  }

  export type collectionsUncheckedCreateWithoutUsersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    is_public?: boolean
    created_at?: Date | string
    updated_at: Date | string
  }

  export type collectionsCreateOrConnectWithoutUsersInput = {
    where: collectionsWhereUniqueInput
    create: XOR<collectionsCreateWithoutUsersInput, collectionsUncheckedCreateWithoutUsersInput>
  }

  export type collectionsCreateManyUsersInputEnvelope = {
    data: collectionsCreateManyUsersInput | collectionsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type guestbook_entriesCreateWithoutUsersInput = {
    id: string
    name: string
    email?: string | null
    message: string
    is_approved?: boolean
    created_at?: Date | string
    updated_at: Date | string
  }

  export type guestbook_entriesUncheckedCreateWithoutUsersInput = {
    id: string
    name: string
    email?: string | null
    message: string
    is_approved?: boolean
    created_at?: Date | string
    updated_at: Date | string
  }

  export type guestbook_entriesCreateOrConnectWithoutUsersInput = {
    where: guestbook_entriesWhereUniqueInput
    create: XOR<guestbook_entriesCreateWithoutUsersInput, guestbook_entriesUncheckedCreateWithoutUsersInput>
  }

  export type guestbook_entriesCreateManyUsersInputEnvelope = {
    data: guestbook_entriesCreateManyUsersInput | guestbook_entriesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type limited_collectionsCreateWithoutUsersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    max_access?: number
    current_access?: number
    is_active?: boolean
    created_at?: Date | string
    updated_at: Date | string
  }

  export type limited_collectionsUncheckedCreateWithoutUsersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    max_access?: number
    current_access?: number
    is_active?: boolean
    created_at?: Date | string
    updated_at: Date | string
  }

  export type limited_collectionsCreateOrConnectWithoutUsersInput = {
    where: limited_collectionsWhereUniqueInput
    create: XOR<limited_collectionsCreateWithoutUsersInput, limited_collectionsUncheckedCreateWithoutUsersInput>
  }

  export type limited_collectionsCreateManyUsersInputEnvelope = {
    data: limited_collectionsCreateManyUsersInput | limited_collectionsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type reportsCreateWithoutUsers_reports_assignee_idTousersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    created_at?: Date | string
    updated_at: Date | string
    users_reports_author_idTousers: usersCreateNestedOneWithoutReports_reports_author_idTousersInput
    files?: uploaded_filesCreateNestedManyWithoutReportsInput
  }

  export type reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    author_id: string
    created_at?: Date | string
    updated_at: Date | string
    files?: uploaded_filesUncheckedCreateNestedManyWithoutReportsInput
  }

  export type reportsCreateOrConnectWithoutUsers_reports_assignee_idTousersInput = {
    where: reportsWhereUniqueInput
    create: XOR<reportsCreateWithoutUsers_reports_assignee_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput>
  }

  export type reportsCreateManyUsers_reports_assignee_idTousersInputEnvelope = {
    data: reportsCreateManyUsers_reports_assignee_idTousersInput | reportsCreateManyUsers_reports_assignee_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type reportsCreateWithoutUsers_reports_author_idTousersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    created_at?: Date | string
    updated_at: Date | string
    users_reports_assignee_idTousers?: usersCreateNestedOneWithoutReports_reports_assignee_idTousersInput
    files?: uploaded_filesCreateNestedManyWithoutReportsInput
  }

  export type reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    assignee_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
    files?: uploaded_filesUncheckedCreateNestedManyWithoutReportsInput
  }

  export type reportsCreateOrConnectWithoutUsers_reports_author_idTousersInput = {
    where: reportsWhereUniqueInput
    create: XOR<reportsCreateWithoutUsers_reports_author_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput>
  }

  export type reportsCreateManyUsers_reports_author_idTousersInputEnvelope = {
    data: reportsCreateManyUsers_reports_author_idTousersInput | reportsCreateManyUsers_reports_author_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type uploaded_filesCreateWithoutUsersInput = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    category?: string | null
    year?: string | null
    batch?: string | null
    created_at?: Date | string
    updated_at: Date | string
    reports?: reportsCreateNestedOneWithoutFilesInput
  }

  export type uploaded_filesUncheckedCreateWithoutUsersInput = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    category?: string | null
    year?: string | null
    batch?: string | null
    report_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type uploaded_filesCreateOrConnectWithoutUsersInput = {
    where: uploaded_filesWhereUniqueInput
    create: XOR<uploaded_filesCreateWithoutUsersInput, uploaded_filesUncheckedCreateWithoutUsersInput>
  }

  export type uploaded_filesCreateManyUsersInputEnvelope = {
    data: uploaded_filesCreateManyUsersInput | uploaded_filesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type collectionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: collectionsWhereUniqueInput
    update: XOR<collectionsUpdateWithoutUsersInput, collectionsUncheckedUpdateWithoutUsersInput>
    create: XOR<collectionsCreateWithoutUsersInput, collectionsUncheckedCreateWithoutUsersInput>
  }

  export type collectionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: collectionsWhereUniqueInput
    data: XOR<collectionsUpdateWithoutUsersInput, collectionsUncheckedUpdateWithoutUsersInput>
  }

  export type collectionsUpdateManyWithWhereWithoutUsersInput = {
    where: collectionsScalarWhereInput
    data: XOR<collectionsUpdateManyMutationInput, collectionsUncheckedUpdateManyWithoutUsersInput>
  }

  export type collectionsScalarWhereInput = {
    AND?: collectionsScalarWhereInput | collectionsScalarWhereInput[]
    OR?: collectionsScalarWhereInput[]
    NOT?: collectionsScalarWhereInput | collectionsScalarWhereInput[]
    id?: StringFilter<"collections"> | string
    title?: StringFilter<"collections"> | string
    description?: StringNullableFilter<"collections"> | string | null
    content?: StringFilter<"collections"> | string
    image_url?: StringNullableFilter<"collections"> | string | null
    category?: StringNullableFilter<"collections"> | string | null
    tags?: StringNullableFilter<"collections"> | string | null
    is_public?: BoolFilter<"collections"> | boolean
    author_id?: StringFilter<"collections"> | string
    created_at?: DateTimeFilter<"collections"> | Date | string
    updated_at?: DateTimeFilter<"collections"> | Date | string
  }

  export type guestbook_entriesUpsertWithWhereUniqueWithoutUsersInput = {
    where: guestbook_entriesWhereUniqueInput
    update: XOR<guestbook_entriesUpdateWithoutUsersInput, guestbook_entriesUncheckedUpdateWithoutUsersInput>
    create: XOR<guestbook_entriesCreateWithoutUsersInput, guestbook_entriesUncheckedCreateWithoutUsersInput>
  }

  export type guestbook_entriesUpdateWithWhereUniqueWithoutUsersInput = {
    where: guestbook_entriesWhereUniqueInput
    data: XOR<guestbook_entriesUpdateWithoutUsersInput, guestbook_entriesUncheckedUpdateWithoutUsersInput>
  }

  export type guestbook_entriesUpdateManyWithWhereWithoutUsersInput = {
    where: guestbook_entriesScalarWhereInput
    data: XOR<guestbook_entriesUpdateManyMutationInput, guestbook_entriesUncheckedUpdateManyWithoutUsersInput>
  }

  export type guestbook_entriesScalarWhereInput = {
    AND?: guestbook_entriesScalarWhereInput | guestbook_entriesScalarWhereInput[]
    OR?: guestbook_entriesScalarWhereInput[]
    NOT?: guestbook_entriesScalarWhereInput | guestbook_entriesScalarWhereInput[]
    id?: StringFilter<"guestbook_entries"> | string
    name?: StringFilter<"guestbook_entries"> | string
    email?: StringNullableFilter<"guestbook_entries"> | string | null
    message?: StringFilter<"guestbook_entries"> | string
    is_approved?: BoolFilter<"guestbook_entries"> | boolean
    author_id?: StringNullableFilter<"guestbook_entries"> | string | null
    created_at?: DateTimeFilter<"guestbook_entries"> | Date | string
    updated_at?: DateTimeFilter<"guestbook_entries"> | Date | string
  }

  export type limited_collectionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: limited_collectionsWhereUniqueInput
    update: XOR<limited_collectionsUpdateWithoutUsersInput, limited_collectionsUncheckedUpdateWithoutUsersInput>
    create: XOR<limited_collectionsCreateWithoutUsersInput, limited_collectionsUncheckedCreateWithoutUsersInput>
  }

  export type limited_collectionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: limited_collectionsWhereUniqueInput
    data: XOR<limited_collectionsUpdateWithoutUsersInput, limited_collectionsUncheckedUpdateWithoutUsersInput>
  }

  export type limited_collectionsUpdateManyWithWhereWithoutUsersInput = {
    where: limited_collectionsScalarWhereInput
    data: XOR<limited_collectionsUpdateManyMutationInput, limited_collectionsUncheckedUpdateManyWithoutUsersInput>
  }

  export type limited_collectionsScalarWhereInput = {
    AND?: limited_collectionsScalarWhereInput | limited_collectionsScalarWhereInput[]
    OR?: limited_collectionsScalarWhereInput[]
    NOT?: limited_collectionsScalarWhereInput | limited_collectionsScalarWhereInput[]
    id?: StringFilter<"limited_collections"> | string
    title?: StringFilter<"limited_collections"> | string
    description?: StringNullableFilter<"limited_collections"> | string | null
    content?: StringFilter<"limited_collections"> | string
    image_url?: StringNullableFilter<"limited_collections"> | string | null
    category?: StringNullableFilter<"limited_collections"> | string | null
    tags?: StringNullableFilter<"limited_collections"> | string | null
    max_access?: IntFilter<"limited_collections"> | number
    current_access?: IntFilter<"limited_collections"> | number
    is_active?: BoolFilter<"limited_collections"> | boolean
    author_id?: StringFilter<"limited_collections"> | string
    created_at?: DateTimeFilter<"limited_collections"> | Date | string
    updated_at?: DateTimeFilter<"limited_collections"> | Date | string
  }

  export type reportsUpsertWithWhereUniqueWithoutUsers_reports_assignee_idTousersInput = {
    where: reportsWhereUniqueInput
    update: XOR<reportsUpdateWithoutUsers_reports_assignee_idTousersInput, reportsUncheckedUpdateWithoutUsers_reports_assignee_idTousersInput>
    create: XOR<reportsCreateWithoutUsers_reports_assignee_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_assignee_idTousersInput>
  }

  export type reportsUpdateWithWhereUniqueWithoutUsers_reports_assignee_idTousersInput = {
    where: reportsWhereUniqueInput
    data: XOR<reportsUpdateWithoutUsers_reports_assignee_idTousersInput, reportsUncheckedUpdateWithoutUsers_reports_assignee_idTousersInput>
  }

  export type reportsUpdateManyWithWhereWithoutUsers_reports_assignee_idTousersInput = {
    where: reportsScalarWhereInput
    data: XOR<reportsUpdateManyMutationInput, reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersInput>
  }

  export type reportsScalarWhereInput = {
    AND?: reportsScalarWhereInput | reportsScalarWhereInput[]
    OR?: reportsScalarWhereInput[]
    NOT?: reportsScalarWhereInput | reportsScalarWhereInput[]
    id?: StringFilter<"reports"> | string
    title?: StringFilter<"reports"> | string
    description?: StringNullableFilter<"reports"> | string | null
    content?: StringFilter<"reports"> | string
    status?: EnumReportStatusFilter<"reports"> | $Enums.ReportStatus
    category?: StringNullableFilter<"reports"> | string | null
    priority?: EnumPriorityFilter<"reports"> | $Enums.Priority
    author_id?: StringFilter<"reports"> | string
    assignee_id?: StringNullableFilter<"reports"> | string | null
    created_at?: DateTimeFilter<"reports"> | Date | string
    updated_at?: DateTimeFilter<"reports"> | Date | string
  }

  export type reportsUpsertWithWhereUniqueWithoutUsers_reports_author_idTousersInput = {
    where: reportsWhereUniqueInput
    update: XOR<reportsUpdateWithoutUsers_reports_author_idTousersInput, reportsUncheckedUpdateWithoutUsers_reports_author_idTousersInput>
    create: XOR<reportsCreateWithoutUsers_reports_author_idTousersInput, reportsUncheckedCreateWithoutUsers_reports_author_idTousersInput>
  }

  export type reportsUpdateWithWhereUniqueWithoutUsers_reports_author_idTousersInput = {
    where: reportsWhereUniqueInput
    data: XOR<reportsUpdateWithoutUsers_reports_author_idTousersInput, reportsUncheckedUpdateWithoutUsers_reports_author_idTousersInput>
  }

  export type reportsUpdateManyWithWhereWithoutUsers_reports_author_idTousersInput = {
    where: reportsScalarWhereInput
    data: XOR<reportsUpdateManyMutationInput, reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersInput>
  }

  export type uploaded_filesUpsertWithWhereUniqueWithoutUsersInput = {
    where: uploaded_filesWhereUniqueInput
    update: XOR<uploaded_filesUpdateWithoutUsersInput, uploaded_filesUncheckedUpdateWithoutUsersInput>
    create: XOR<uploaded_filesCreateWithoutUsersInput, uploaded_filesUncheckedCreateWithoutUsersInput>
  }

  export type uploaded_filesUpdateWithWhereUniqueWithoutUsersInput = {
    where: uploaded_filesWhereUniqueInput
    data: XOR<uploaded_filesUpdateWithoutUsersInput, uploaded_filesUncheckedUpdateWithoutUsersInput>
  }

  export type uploaded_filesUpdateManyWithWhereWithoutUsersInput = {
    where: uploaded_filesScalarWhereInput
    data: XOR<uploaded_filesUpdateManyMutationInput, uploaded_filesUncheckedUpdateManyWithoutUsersInput>
  }

  export type uploaded_filesCreateManyReportsInput = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    category?: string | null
    year?: string | null
    batch?: string | null
    author_id: string
    created_at?: Date | string
    updated_at: Date | string
  }

  export type uploaded_filesUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: IntFieldUpdateOperationsInput | number
    mime_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutUploaded_filesNestedInput
  }

  export type uploaded_filesUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: IntFieldUpdateOperationsInput | number
    mime_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploaded_filesUncheckedUpdateManyWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: IntFieldUpdateOperationsInput | number
    mime_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type collectionsCreateManyUsersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    is_public?: boolean
    created_at?: Date | string
    updated_at: Date | string
  }

  export type guestbook_entriesCreateManyUsersInput = {
    id: string
    name: string
    email?: string | null
    message: string
    is_approved?: boolean
    created_at?: Date | string
    updated_at: Date | string
  }

  export type limited_collectionsCreateManyUsersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    image_url?: string | null
    category?: string | null
    tags?: string | null
    max_access?: number
    current_access?: number
    is_active?: boolean
    created_at?: Date | string
    updated_at: Date | string
  }

  export type reportsCreateManyUsers_reports_assignee_idTousersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    author_id: string
    created_at?: Date | string
    updated_at: Date | string
  }

  export type reportsCreateManyUsers_reports_author_idTousersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    assignee_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type uploaded_filesCreateManyUsersInput = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    category?: string | null
    year?: string | null
    batch?: string | null
    report_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type collectionsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type collectionsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type collectionsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type guestbook_entriesUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    is_approved?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type guestbook_entriesUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    is_approved?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type guestbook_entriesUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    message?: StringFieldUpdateOperationsInput | string
    is_approved?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type limited_collectionsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    max_access?: IntFieldUpdateOperationsInput | number
    current_access?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type limited_collectionsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    max_access?: IntFieldUpdateOperationsInput | number
    current_access?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type limited_collectionsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    max_access?: IntFieldUpdateOperationsInput | number
    current_access?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reportsUpdateWithoutUsers_reports_assignee_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users_reports_author_idTousers?: usersUpdateOneRequiredWithoutReports_reports_author_idTousersNestedInput
    files?: uploaded_filesUpdateManyWithoutReportsNestedInput
  }

  export type reportsUncheckedUpdateWithoutUsers_reports_assignee_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: uploaded_filesUncheckedUpdateManyWithoutReportsNestedInput
  }

  export type reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reportsUpdateWithoutUsers_reports_author_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users_reports_assignee_idTousers?: usersUpdateOneWithoutReports_reports_assignee_idTousersNestedInput
    files?: uploaded_filesUpdateManyWithoutReportsNestedInput
  }

  export type reportsUncheckedUpdateWithoutUsers_reports_author_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    assignee_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: uploaded_filesUncheckedUpdateManyWithoutReportsNestedInput
  }

  export type reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    assignee_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploaded_filesUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: IntFieldUpdateOperationsInput | number
    mime_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: reportsUpdateOneWithoutFilesNestedInput
  }

  export type uploaded_filesUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: IntFieldUpdateOperationsInput | number
    mime_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    report_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type uploaded_filesUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    original_name?: StringFieldUpdateOperationsInput | string
    file_path?: StringFieldUpdateOperationsInput | string
    file_size?: IntFieldUpdateOperationsInput | number
    mime_type?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    report_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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