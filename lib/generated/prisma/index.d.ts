
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
 * Model visitor_analytics
 * 
 */
export type visitor_analytics = $Result.DefaultSelection<Prisma.$visitor_analyticsPayload>
/**
 * Model guestbook_entries
 * 
 */
export type guestbook_entries = $Result.DefaultSelection<Prisma.$guestbook_entriesPayload>
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
 * Model report_folders
 * 
 */
export type report_folders = $Result.DefaultSelection<Prisma.$report_foldersPayload>
/**
 * Model training_programs
 * 
 */
export type training_programs = $Result.DefaultSelection<Prisma.$training_programsPayload>
/**
 * Model training_cohorts
 * 
 */
export type training_cohorts = $Result.DefaultSelection<Prisma.$training_cohortsPayload>
/**
 * Model cohort_members
 * 
 */
export type cohort_members = $Result.DefaultSelection<Prisma.$cohort_membersPayload>
/**
 * Model master_years
 * 
 */
export type master_years = $Result.DefaultSelection<Prisma.$master_yearsPayload>
/**
 * Model master_cohorts
 * 
 */
export type master_cohorts = $Result.DefaultSelection<Prisma.$master_cohortsPayload>

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


export const CohortStatus: {
  PLANNING: 'PLANNING',
  REGISTRATION: 'REGISTRATION',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type CohortStatus = (typeof CohortStatus)[keyof typeof CohortStatus]


export const MemberStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  GRADUATED: 'GRADUATED',
  DROPPED: 'DROPPED'
};

export type MemberStatus = (typeof MemberStatus)[keyof typeof MemberStatus]

}

export type Priority = $Enums.Priority

export const Priority: typeof $Enums.Priority

export type ReportStatus = $Enums.ReportStatus

export const ReportStatus: typeof $Enums.ReportStatus

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type CohortStatus = $Enums.CohortStatus

export const CohortStatus: typeof $Enums.CohortStatus

export type MemberStatus = $Enums.MemberStatus

export const MemberStatus: typeof $Enums.MemberStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Visitor_analytics
 * const visitor_analytics = await prisma.visitor_analytics.findMany()
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
   * // Fetch zero or more Visitor_analytics
   * const visitor_analytics = await prisma.visitor_analytics.findMany()
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
   * `prisma.visitor_analytics`: Exposes CRUD operations for the **visitor_analytics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Visitor_analytics
    * const visitor_analytics = await prisma.visitor_analytics.findMany()
    * ```
    */
  get visitor_analytics(): Prisma.visitor_analyticsDelegate<ExtArgs, ClientOptions>;

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

  /**
   * `prisma.report_folders`: Exposes CRUD operations for the **report_folders** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Report_folders
    * const report_folders = await prisma.report_folders.findMany()
    * ```
    */
  get report_folders(): Prisma.report_foldersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.training_programs`: Exposes CRUD operations for the **training_programs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Training_programs
    * const training_programs = await prisma.training_programs.findMany()
    * ```
    */
  get training_programs(): Prisma.training_programsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.training_cohorts`: Exposes CRUD operations for the **training_cohorts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Training_cohorts
    * const training_cohorts = await prisma.training_cohorts.findMany()
    * ```
    */
  get training_cohorts(): Prisma.training_cohortsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cohort_members`: Exposes CRUD operations for the **cohort_members** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cohort_members
    * const cohort_members = await prisma.cohort_members.findMany()
    * ```
    */
  get cohort_members(): Prisma.cohort_membersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.master_years`: Exposes CRUD operations for the **master_years** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Master_years
    * const master_years = await prisma.master_years.findMany()
    * ```
    */
  get master_years(): Prisma.master_yearsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.master_cohorts`: Exposes CRUD operations for the **master_cohorts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Master_cohorts
    * const master_cohorts = await prisma.master_cohorts.findMany()
    * ```
    */
  get master_cohorts(): Prisma.master_cohortsDelegate<ExtArgs, ClientOptions>;
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
    visitor_analytics: 'visitor_analytics',
    guestbook_entries: 'guestbook_entries',
    reports: 'reports',
    uploaded_files: 'uploaded_files',
    users: 'users',
    report_folders: 'report_folders',
    training_programs: 'training_programs',
    training_cohorts: 'training_cohorts',
    cohort_members: 'cohort_members',
    master_years: 'master_years',
    master_cohorts: 'master_cohorts'
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
      modelProps: "visitor_analytics" | "guestbook_entries" | "reports" | "uploaded_files" | "users" | "report_folders" | "training_programs" | "training_cohorts" | "cohort_members" | "master_years" | "master_cohorts"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      visitor_analytics: {
        payload: Prisma.$visitor_analyticsPayload<ExtArgs>
        fields: Prisma.visitor_analyticsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.visitor_analyticsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.visitor_analyticsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload>
          }
          findFirst: {
            args: Prisma.visitor_analyticsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.visitor_analyticsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload>
          }
          findMany: {
            args: Prisma.visitor_analyticsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload>[]
          }
          create: {
            args: Prisma.visitor_analyticsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload>
          }
          createMany: {
            args: Prisma.visitor_analyticsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.visitor_analyticsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload>[]
          }
          delete: {
            args: Prisma.visitor_analyticsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload>
          }
          update: {
            args: Prisma.visitor_analyticsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload>
          }
          deleteMany: {
            args: Prisma.visitor_analyticsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.visitor_analyticsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.visitor_analyticsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload>[]
          }
          upsert: {
            args: Prisma.visitor_analyticsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$visitor_analyticsPayload>
          }
          aggregate: {
            args: Prisma.Visitor_analyticsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVisitor_analytics>
          }
          groupBy: {
            args: Prisma.visitor_analyticsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Visitor_analyticsGroupByOutputType>[]
          }
          count: {
            args: Prisma.visitor_analyticsCountArgs<ExtArgs>
            result: $Utils.Optional<Visitor_analyticsCountAggregateOutputType> | number
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
      report_folders: {
        payload: Prisma.$report_foldersPayload<ExtArgs>
        fields: Prisma.report_foldersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.report_foldersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.report_foldersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload>
          }
          findFirst: {
            args: Prisma.report_foldersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.report_foldersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload>
          }
          findMany: {
            args: Prisma.report_foldersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload>[]
          }
          create: {
            args: Prisma.report_foldersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload>
          }
          createMany: {
            args: Prisma.report_foldersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.report_foldersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload>[]
          }
          delete: {
            args: Prisma.report_foldersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload>
          }
          update: {
            args: Prisma.report_foldersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload>
          }
          deleteMany: {
            args: Prisma.report_foldersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.report_foldersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.report_foldersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload>[]
          }
          upsert: {
            args: Prisma.report_foldersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$report_foldersPayload>
          }
          aggregate: {
            args: Prisma.Report_foldersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport_folders>
          }
          groupBy: {
            args: Prisma.report_foldersGroupByArgs<ExtArgs>
            result: $Utils.Optional<Report_foldersGroupByOutputType>[]
          }
          count: {
            args: Prisma.report_foldersCountArgs<ExtArgs>
            result: $Utils.Optional<Report_foldersCountAggregateOutputType> | number
          }
        }
      }
      training_programs: {
        payload: Prisma.$training_programsPayload<ExtArgs>
        fields: Prisma.training_programsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.training_programsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.training_programsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload>
          }
          findFirst: {
            args: Prisma.training_programsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.training_programsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload>
          }
          findMany: {
            args: Prisma.training_programsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload>[]
          }
          create: {
            args: Prisma.training_programsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload>
          }
          createMany: {
            args: Prisma.training_programsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.training_programsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload>[]
          }
          delete: {
            args: Prisma.training_programsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload>
          }
          update: {
            args: Prisma.training_programsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload>
          }
          deleteMany: {
            args: Prisma.training_programsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.training_programsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.training_programsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload>[]
          }
          upsert: {
            args: Prisma.training_programsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_programsPayload>
          }
          aggregate: {
            args: Prisma.Training_programsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTraining_programs>
          }
          groupBy: {
            args: Prisma.training_programsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Training_programsGroupByOutputType>[]
          }
          count: {
            args: Prisma.training_programsCountArgs<ExtArgs>
            result: $Utils.Optional<Training_programsCountAggregateOutputType> | number
          }
        }
      }
      training_cohorts: {
        payload: Prisma.$training_cohortsPayload<ExtArgs>
        fields: Prisma.training_cohortsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.training_cohortsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.training_cohortsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload>
          }
          findFirst: {
            args: Prisma.training_cohortsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.training_cohortsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload>
          }
          findMany: {
            args: Prisma.training_cohortsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload>[]
          }
          create: {
            args: Prisma.training_cohortsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload>
          }
          createMany: {
            args: Prisma.training_cohortsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.training_cohortsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload>[]
          }
          delete: {
            args: Prisma.training_cohortsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload>
          }
          update: {
            args: Prisma.training_cohortsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload>
          }
          deleteMany: {
            args: Prisma.training_cohortsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.training_cohortsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.training_cohortsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload>[]
          }
          upsert: {
            args: Prisma.training_cohortsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$training_cohortsPayload>
          }
          aggregate: {
            args: Prisma.Training_cohortsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTraining_cohorts>
          }
          groupBy: {
            args: Prisma.training_cohortsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Training_cohortsGroupByOutputType>[]
          }
          count: {
            args: Prisma.training_cohortsCountArgs<ExtArgs>
            result: $Utils.Optional<Training_cohortsCountAggregateOutputType> | number
          }
        }
      }
      cohort_members: {
        payload: Prisma.$cohort_membersPayload<ExtArgs>
        fields: Prisma.cohort_membersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cohort_membersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cohort_membersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload>
          }
          findFirst: {
            args: Prisma.cohort_membersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cohort_membersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload>
          }
          findMany: {
            args: Prisma.cohort_membersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload>[]
          }
          create: {
            args: Prisma.cohort_membersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload>
          }
          createMany: {
            args: Prisma.cohort_membersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cohort_membersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload>[]
          }
          delete: {
            args: Prisma.cohort_membersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload>
          }
          update: {
            args: Prisma.cohort_membersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload>
          }
          deleteMany: {
            args: Prisma.cohort_membersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cohort_membersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cohort_membersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload>[]
          }
          upsert: {
            args: Prisma.cohort_membersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cohort_membersPayload>
          }
          aggregate: {
            args: Prisma.Cohort_membersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCohort_members>
          }
          groupBy: {
            args: Prisma.cohort_membersGroupByArgs<ExtArgs>
            result: $Utils.Optional<Cohort_membersGroupByOutputType>[]
          }
          count: {
            args: Prisma.cohort_membersCountArgs<ExtArgs>
            result: $Utils.Optional<Cohort_membersCountAggregateOutputType> | number
          }
        }
      }
      master_years: {
        payload: Prisma.$master_yearsPayload<ExtArgs>
        fields: Prisma.master_yearsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.master_yearsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.master_yearsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload>
          }
          findFirst: {
            args: Prisma.master_yearsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.master_yearsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload>
          }
          findMany: {
            args: Prisma.master_yearsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload>[]
          }
          create: {
            args: Prisma.master_yearsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload>
          }
          createMany: {
            args: Prisma.master_yearsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.master_yearsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload>[]
          }
          delete: {
            args: Prisma.master_yearsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload>
          }
          update: {
            args: Prisma.master_yearsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload>
          }
          deleteMany: {
            args: Prisma.master_yearsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.master_yearsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.master_yearsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload>[]
          }
          upsert: {
            args: Prisma.master_yearsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_yearsPayload>
          }
          aggregate: {
            args: Prisma.Master_yearsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaster_years>
          }
          groupBy: {
            args: Prisma.master_yearsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Master_yearsGroupByOutputType>[]
          }
          count: {
            args: Prisma.master_yearsCountArgs<ExtArgs>
            result: $Utils.Optional<Master_yearsCountAggregateOutputType> | number
          }
        }
      }
      master_cohorts: {
        payload: Prisma.$master_cohortsPayload<ExtArgs>
        fields: Prisma.master_cohortsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.master_cohortsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.master_cohortsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload>
          }
          findFirst: {
            args: Prisma.master_cohortsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.master_cohortsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload>
          }
          findMany: {
            args: Prisma.master_cohortsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload>[]
          }
          create: {
            args: Prisma.master_cohortsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload>
          }
          createMany: {
            args: Prisma.master_cohortsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.master_cohortsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload>[]
          }
          delete: {
            args: Prisma.master_cohortsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload>
          }
          update: {
            args: Prisma.master_cohortsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload>
          }
          deleteMany: {
            args: Prisma.master_cohortsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.master_cohortsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.master_cohortsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload>[]
          }
          upsert: {
            args: Prisma.master_cohortsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$master_cohortsPayload>
          }
          aggregate: {
            args: Prisma.Master_cohortsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaster_cohorts>
          }
          groupBy: {
            args: Prisma.master_cohortsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Master_cohortsGroupByOutputType>[]
          }
          count: {
            args: Prisma.master_cohortsCountArgs<ExtArgs>
            result: $Utils.Optional<Master_cohortsCountAggregateOutputType> | number
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
    visitor_analytics?: visitor_analyticsOmit
    guestbook_entries?: guestbook_entriesOmit
    reports?: reportsOmit
    uploaded_files?: uploaded_filesOmit
    users?: usersOmit
    report_folders?: report_foldersOmit
    training_programs?: training_programsOmit
    training_cohorts?: training_cohortsOmit
    cohort_members?: cohort_membersOmit
    master_years?: master_yearsOmit
    master_cohorts?: master_cohortsOmit
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
    visitor_analytics: number
    guestbook_entries: number
    reports_reports_assignee_idTousers: number
    reports_reports_author_idTousers: number
    uploaded_files: number
    created_folders: number
    cohort_memberships: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    visitor_analytics?: boolean | UsersCountOutputTypeCountVisitor_analyticsArgs
    guestbook_entries?: boolean | UsersCountOutputTypeCountGuestbook_entriesArgs
    reports_reports_assignee_idTousers?: boolean | UsersCountOutputTypeCountReports_reports_assignee_idTousersArgs
    reports_reports_author_idTousers?: boolean | UsersCountOutputTypeCountReports_reports_author_idTousersArgs
    uploaded_files?: boolean | UsersCountOutputTypeCountUploaded_filesArgs
    created_folders?: boolean | UsersCountOutputTypeCountCreated_foldersArgs
    cohort_memberships?: boolean | UsersCountOutputTypeCountCohort_membershipsArgs
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
  export type UsersCountOutputTypeCountVisitor_analyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: visitor_analyticsWhereInput
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
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCreated_foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: report_foldersWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCohort_membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cohort_membersWhereInput
  }


  /**
   * Count Type Training_programsCountOutputType
   */

  export type Training_programsCountOutputType = {
    users: number
    cohorts: number
    folders: number
  }

  export type Training_programsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Training_programsCountOutputTypeCountUsersArgs
    cohorts?: boolean | Training_programsCountOutputTypeCountCohortsArgs
    folders?: boolean | Training_programsCountOutputTypeCountFoldersArgs
  }

  // Custom InputTypes
  /**
   * Training_programsCountOutputType without action
   */
  export type Training_programsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Training_programsCountOutputType
     */
    select?: Training_programsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Training_programsCountOutputType without action
   */
  export type Training_programsCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }

  /**
   * Training_programsCountOutputType without action
   */
  export type Training_programsCountOutputTypeCountCohortsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: training_cohortsWhereInput
  }

  /**
   * Training_programsCountOutputType without action
   */
  export type Training_programsCountOutputTypeCountFoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: report_foldersWhereInput
  }


  /**
   * Count Type Training_cohortsCountOutputType
   */

  export type Training_cohortsCountOutputType = {
    members: number
    folders: number
  }

  export type Training_cohortsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Training_cohortsCountOutputTypeCountMembersArgs
    folders?: boolean | Training_cohortsCountOutputTypeCountFoldersArgs
  }

  // Custom InputTypes
  /**
   * Training_cohortsCountOutputType without action
   */
  export type Training_cohortsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Training_cohortsCountOutputType
     */
    select?: Training_cohortsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Training_cohortsCountOutputType without action
   */
  export type Training_cohortsCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cohort_membersWhereInput
  }

  /**
   * Training_cohortsCountOutputType without action
   */
  export type Training_cohortsCountOutputTypeCountFoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: report_foldersWhereInput
  }


  /**
   * Models
   */

  /**
   * Model visitor_analytics
   */

  export type AggregateVisitor_analytics = {
    _count: Visitor_analyticsCountAggregateOutputType | null
    _avg: Visitor_analyticsAvgAggregateOutputType | null
    _sum: Visitor_analyticsSumAggregateOutputType | null
    _min: Visitor_analyticsMinAggregateOutputType | null
    _max: Visitor_analyticsMaxAggregateOutputType | null
  }

  export type Visitor_analyticsAvgAggregateOutputType = {
    visit_duration: number | null
  }

  export type Visitor_analyticsSumAggregateOutputType = {
    visit_duration: number | null
  }

  export type Visitor_analyticsMinAggregateOutputType = {
    id: string | null
    ip_address: string | null
    user_agent: string | null
    page_path: string | null
    page_title: string | null
    referrer: string | null
    session_id: string | null
    user_id: string | null
    visit_duration: number | null
    created_at: Date | null
  }

  export type Visitor_analyticsMaxAggregateOutputType = {
    id: string | null
    ip_address: string | null
    user_agent: string | null
    page_path: string | null
    page_title: string | null
    referrer: string | null
    session_id: string | null
    user_id: string | null
    visit_duration: number | null
    created_at: Date | null
  }

  export type Visitor_analyticsCountAggregateOutputType = {
    id: number
    ip_address: number
    user_agent: number
    page_path: number
    page_title: number
    referrer: number
    session_id: number
    user_id: number
    visit_duration: number
    created_at: number
    _all: number
  }


  export type Visitor_analyticsAvgAggregateInputType = {
    visit_duration?: true
  }

  export type Visitor_analyticsSumAggregateInputType = {
    visit_duration?: true
  }

  export type Visitor_analyticsMinAggregateInputType = {
    id?: true
    ip_address?: true
    user_agent?: true
    page_path?: true
    page_title?: true
    referrer?: true
    session_id?: true
    user_id?: true
    visit_duration?: true
    created_at?: true
  }

  export type Visitor_analyticsMaxAggregateInputType = {
    id?: true
    ip_address?: true
    user_agent?: true
    page_path?: true
    page_title?: true
    referrer?: true
    session_id?: true
    user_id?: true
    visit_duration?: true
    created_at?: true
  }

  export type Visitor_analyticsCountAggregateInputType = {
    id?: true
    ip_address?: true
    user_agent?: true
    page_path?: true
    page_title?: true
    referrer?: true
    session_id?: true
    user_id?: true
    visit_duration?: true
    created_at?: true
    _all?: true
  }

  export type Visitor_analyticsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which visitor_analytics to aggregate.
     */
    where?: visitor_analyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of visitor_analytics to fetch.
     */
    orderBy?: visitor_analyticsOrderByWithRelationInput | visitor_analyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: visitor_analyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` visitor_analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` visitor_analytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned visitor_analytics
    **/
    _count?: true | Visitor_analyticsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Visitor_analyticsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Visitor_analyticsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Visitor_analyticsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Visitor_analyticsMaxAggregateInputType
  }

  export type GetVisitor_analyticsAggregateType<T extends Visitor_analyticsAggregateArgs> = {
        [P in keyof T & keyof AggregateVisitor_analytics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVisitor_analytics[P]>
      : GetScalarType<T[P], AggregateVisitor_analytics[P]>
  }




  export type visitor_analyticsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: visitor_analyticsWhereInput
    orderBy?: visitor_analyticsOrderByWithAggregationInput | visitor_analyticsOrderByWithAggregationInput[]
    by: Visitor_analyticsScalarFieldEnum[] | Visitor_analyticsScalarFieldEnum
    having?: visitor_analyticsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Visitor_analyticsCountAggregateInputType | true
    _avg?: Visitor_analyticsAvgAggregateInputType
    _sum?: Visitor_analyticsSumAggregateInputType
    _min?: Visitor_analyticsMinAggregateInputType
    _max?: Visitor_analyticsMaxAggregateInputType
  }

  export type Visitor_analyticsGroupByOutputType = {
    id: string
    ip_address: string | null
    user_agent: string | null
    page_path: string
    page_title: string | null
    referrer: string | null
    session_id: string | null
    user_id: string | null
    visit_duration: number | null
    created_at: Date
    _count: Visitor_analyticsCountAggregateOutputType | null
    _avg: Visitor_analyticsAvgAggregateOutputType | null
    _sum: Visitor_analyticsSumAggregateOutputType | null
    _min: Visitor_analyticsMinAggregateOutputType | null
    _max: Visitor_analyticsMaxAggregateOutputType | null
  }

  type GetVisitor_analyticsGroupByPayload<T extends visitor_analyticsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Visitor_analyticsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Visitor_analyticsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Visitor_analyticsGroupByOutputType[P]>
            : GetScalarType<T[P], Visitor_analyticsGroupByOutputType[P]>
        }
      >
    >


  export type visitor_analyticsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ip_address?: boolean
    user_agent?: boolean
    page_path?: boolean
    page_title?: boolean
    referrer?: boolean
    session_id?: boolean
    user_id?: boolean
    visit_duration?: boolean
    created_at?: boolean
    users?: boolean | visitor_analytics$usersArgs<ExtArgs>
  }, ExtArgs["result"]["visitor_analytics"]>

  export type visitor_analyticsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ip_address?: boolean
    user_agent?: boolean
    page_path?: boolean
    page_title?: boolean
    referrer?: boolean
    session_id?: boolean
    user_id?: boolean
    visit_duration?: boolean
    created_at?: boolean
    users?: boolean | visitor_analytics$usersArgs<ExtArgs>
  }, ExtArgs["result"]["visitor_analytics"]>

  export type visitor_analyticsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ip_address?: boolean
    user_agent?: boolean
    page_path?: boolean
    page_title?: boolean
    referrer?: boolean
    session_id?: boolean
    user_id?: boolean
    visit_duration?: boolean
    created_at?: boolean
    users?: boolean | visitor_analytics$usersArgs<ExtArgs>
  }, ExtArgs["result"]["visitor_analytics"]>

  export type visitor_analyticsSelectScalar = {
    id?: boolean
    ip_address?: boolean
    user_agent?: boolean
    page_path?: boolean
    page_title?: boolean
    referrer?: boolean
    session_id?: boolean
    user_id?: boolean
    visit_duration?: boolean
    created_at?: boolean
  }

  export type visitor_analyticsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ip_address" | "user_agent" | "page_path" | "page_title" | "referrer" | "session_id" | "user_id" | "visit_duration" | "created_at", ExtArgs["result"]["visitor_analytics"]>
  export type visitor_analyticsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | visitor_analytics$usersArgs<ExtArgs>
  }
  export type visitor_analyticsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | visitor_analytics$usersArgs<ExtArgs>
  }
  export type visitor_analyticsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | visitor_analytics$usersArgs<ExtArgs>
  }

  export type $visitor_analyticsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "visitor_analytics"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ip_address: string | null
      user_agent: string | null
      page_path: string
      page_title: string | null
      referrer: string | null
      session_id: string | null
      user_id: string | null
      visit_duration: number | null
      created_at: Date
    }, ExtArgs["result"]["visitor_analytics"]>
    composites: {}
  }

  type visitor_analyticsGetPayload<S extends boolean | null | undefined | visitor_analyticsDefaultArgs> = $Result.GetResult<Prisma.$visitor_analyticsPayload, S>

  type visitor_analyticsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<visitor_analyticsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Visitor_analyticsCountAggregateInputType | true
    }

  export interface visitor_analyticsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['visitor_analytics'], meta: { name: 'visitor_analytics' } }
    /**
     * Find zero or one Visitor_analytics that matches the filter.
     * @param {visitor_analyticsFindUniqueArgs} args - Arguments to find a Visitor_analytics
     * @example
     * // Get one Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends visitor_analyticsFindUniqueArgs>(args: SelectSubset<T, visitor_analyticsFindUniqueArgs<ExtArgs>>): Prisma__visitor_analyticsClient<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Visitor_analytics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {visitor_analyticsFindUniqueOrThrowArgs} args - Arguments to find a Visitor_analytics
     * @example
     * // Get one Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends visitor_analyticsFindUniqueOrThrowArgs>(args: SelectSubset<T, visitor_analyticsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__visitor_analyticsClient<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Visitor_analytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {visitor_analyticsFindFirstArgs} args - Arguments to find a Visitor_analytics
     * @example
     * // Get one Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends visitor_analyticsFindFirstArgs>(args?: SelectSubset<T, visitor_analyticsFindFirstArgs<ExtArgs>>): Prisma__visitor_analyticsClient<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Visitor_analytics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {visitor_analyticsFindFirstOrThrowArgs} args - Arguments to find a Visitor_analytics
     * @example
     * // Get one Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends visitor_analyticsFindFirstOrThrowArgs>(args?: SelectSubset<T, visitor_analyticsFindFirstOrThrowArgs<ExtArgs>>): Prisma__visitor_analyticsClient<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Visitor_analytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {visitor_analyticsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.findMany()
     * 
     * // Get first 10 Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const visitor_analyticsWithIdOnly = await prisma.visitor_analytics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends visitor_analyticsFindManyArgs>(args?: SelectSubset<T, visitor_analyticsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Visitor_analytics.
     * @param {visitor_analyticsCreateArgs} args - Arguments to create a Visitor_analytics.
     * @example
     * // Create one Visitor_analytics
     * const Visitor_analytics = await prisma.visitor_analytics.create({
     *   data: {
     *     // ... data to create a Visitor_analytics
     *   }
     * })
     * 
     */
    create<T extends visitor_analyticsCreateArgs>(args: SelectSubset<T, visitor_analyticsCreateArgs<ExtArgs>>): Prisma__visitor_analyticsClient<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Visitor_analytics.
     * @param {visitor_analyticsCreateManyArgs} args - Arguments to create many Visitor_analytics.
     * @example
     * // Create many Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends visitor_analyticsCreateManyArgs>(args?: SelectSubset<T, visitor_analyticsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Visitor_analytics and returns the data saved in the database.
     * @param {visitor_analyticsCreateManyAndReturnArgs} args - Arguments to create many Visitor_analytics.
     * @example
     * // Create many Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Visitor_analytics and only return the `id`
     * const visitor_analyticsWithIdOnly = await prisma.visitor_analytics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends visitor_analyticsCreateManyAndReturnArgs>(args?: SelectSubset<T, visitor_analyticsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Visitor_analytics.
     * @param {visitor_analyticsDeleteArgs} args - Arguments to delete one Visitor_analytics.
     * @example
     * // Delete one Visitor_analytics
     * const Visitor_analytics = await prisma.visitor_analytics.delete({
     *   where: {
     *     // ... filter to delete one Visitor_analytics
     *   }
     * })
     * 
     */
    delete<T extends visitor_analyticsDeleteArgs>(args: SelectSubset<T, visitor_analyticsDeleteArgs<ExtArgs>>): Prisma__visitor_analyticsClient<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Visitor_analytics.
     * @param {visitor_analyticsUpdateArgs} args - Arguments to update one Visitor_analytics.
     * @example
     * // Update one Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends visitor_analyticsUpdateArgs>(args: SelectSubset<T, visitor_analyticsUpdateArgs<ExtArgs>>): Prisma__visitor_analyticsClient<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Visitor_analytics.
     * @param {visitor_analyticsDeleteManyArgs} args - Arguments to filter Visitor_analytics to delete.
     * @example
     * // Delete a few Visitor_analytics
     * const { count } = await prisma.visitor_analytics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends visitor_analyticsDeleteManyArgs>(args?: SelectSubset<T, visitor_analyticsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Visitor_analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {visitor_analyticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends visitor_analyticsUpdateManyArgs>(args: SelectSubset<T, visitor_analyticsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Visitor_analytics and returns the data updated in the database.
     * @param {visitor_analyticsUpdateManyAndReturnArgs} args - Arguments to update many Visitor_analytics.
     * @example
     * // Update many Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Visitor_analytics and only return the `id`
     * const visitor_analyticsWithIdOnly = await prisma.visitor_analytics.updateManyAndReturn({
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
    updateManyAndReturn<T extends visitor_analyticsUpdateManyAndReturnArgs>(args: SelectSubset<T, visitor_analyticsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Visitor_analytics.
     * @param {visitor_analyticsUpsertArgs} args - Arguments to update or create a Visitor_analytics.
     * @example
     * // Update or create a Visitor_analytics
     * const visitor_analytics = await prisma.visitor_analytics.upsert({
     *   create: {
     *     // ... data to create a Visitor_analytics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Visitor_analytics we want to update
     *   }
     * })
     */
    upsert<T extends visitor_analyticsUpsertArgs>(args: SelectSubset<T, visitor_analyticsUpsertArgs<ExtArgs>>): Prisma__visitor_analyticsClient<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Visitor_analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {visitor_analyticsCountArgs} args - Arguments to filter Visitor_analytics to count.
     * @example
     * // Count the number of Visitor_analytics
     * const count = await prisma.visitor_analytics.count({
     *   where: {
     *     // ... the filter for the Visitor_analytics we want to count
     *   }
     * })
    **/
    count<T extends visitor_analyticsCountArgs>(
      args?: Subset<T, visitor_analyticsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Visitor_analyticsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Visitor_analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Visitor_analyticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Visitor_analyticsAggregateArgs>(args: Subset<T, Visitor_analyticsAggregateArgs>): Prisma.PrismaPromise<GetVisitor_analyticsAggregateType<T>>

    /**
     * Group by Visitor_analytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {visitor_analyticsGroupByArgs} args - Group by arguments.
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
      T extends visitor_analyticsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: visitor_analyticsGroupByArgs['orderBy'] }
        : { orderBy?: visitor_analyticsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, visitor_analyticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisitor_analyticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the visitor_analytics model
   */
  readonly fields: visitor_analyticsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for visitor_analytics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__visitor_analyticsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends visitor_analytics$usersArgs<ExtArgs> = {}>(args?: Subset<T, visitor_analytics$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the visitor_analytics model
   */
  interface visitor_analyticsFieldRefs {
    readonly id: FieldRef<"visitor_analytics", 'String'>
    readonly ip_address: FieldRef<"visitor_analytics", 'String'>
    readonly user_agent: FieldRef<"visitor_analytics", 'String'>
    readonly page_path: FieldRef<"visitor_analytics", 'String'>
    readonly page_title: FieldRef<"visitor_analytics", 'String'>
    readonly referrer: FieldRef<"visitor_analytics", 'String'>
    readonly session_id: FieldRef<"visitor_analytics", 'String'>
    readonly user_id: FieldRef<"visitor_analytics", 'String'>
    readonly visit_duration: FieldRef<"visitor_analytics", 'Int'>
    readonly created_at: FieldRef<"visitor_analytics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * visitor_analytics findUnique
   */
  export type visitor_analyticsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
    /**
     * Filter, which visitor_analytics to fetch.
     */
    where: visitor_analyticsWhereUniqueInput
  }

  /**
   * visitor_analytics findUniqueOrThrow
   */
  export type visitor_analyticsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
    /**
     * Filter, which visitor_analytics to fetch.
     */
    where: visitor_analyticsWhereUniqueInput
  }

  /**
   * visitor_analytics findFirst
   */
  export type visitor_analyticsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
    /**
     * Filter, which visitor_analytics to fetch.
     */
    where?: visitor_analyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of visitor_analytics to fetch.
     */
    orderBy?: visitor_analyticsOrderByWithRelationInput | visitor_analyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for visitor_analytics.
     */
    cursor?: visitor_analyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` visitor_analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` visitor_analytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of visitor_analytics.
     */
    distinct?: Visitor_analyticsScalarFieldEnum | Visitor_analyticsScalarFieldEnum[]
  }

  /**
   * visitor_analytics findFirstOrThrow
   */
  export type visitor_analyticsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
    /**
     * Filter, which visitor_analytics to fetch.
     */
    where?: visitor_analyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of visitor_analytics to fetch.
     */
    orderBy?: visitor_analyticsOrderByWithRelationInput | visitor_analyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for visitor_analytics.
     */
    cursor?: visitor_analyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` visitor_analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` visitor_analytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of visitor_analytics.
     */
    distinct?: Visitor_analyticsScalarFieldEnum | Visitor_analyticsScalarFieldEnum[]
  }

  /**
   * visitor_analytics findMany
   */
  export type visitor_analyticsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
    /**
     * Filter, which visitor_analytics to fetch.
     */
    where?: visitor_analyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of visitor_analytics to fetch.
     */
    orderBy?: visitor_analyticsOrderByWithRelationInput | visitor_analyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing visitor_analytics.
     */
    cursor?: visitor_analyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` visitor_analytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` visitor_analytics.
     */
    skip?: number
    distinct?: Visitor_analyticsScalarFieldEnum | Visitor_analyticsScalarFieldEnum[]
  }

  /**
   * visitor_analytics create
   */
  export type visitor_analyticsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
    /**
     * The data needed to create a visitor_analytics.
     */
    data: XOR<visitor_analyticsCreateInput, visitor_analyticsUncheckedCreateInput>
  }

  /**
   * visitor_analytics createMany
   */
  export type visitor_analyticsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many visitor_analytics.
     */
    data: visitor_analyticsCreateManyInput | visitor_analyticsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * visitor_analytics createManyAndReturn
   */
  export type visitor_analyticsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * The data used to create many visitor_analytics.
     */
    data: visitor_analyticsCreateManyInput | visitor_analyticsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * visitor_analytics update
   */
  export type visitor_analyticsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
    /**
     * The data needed to update a visitor_analytics.
     */
    data: XOR<visitor_analyticsUpdateInput, visitor_analyticsUncheckedUpdateInput>
    /**
     * Choose, which visitor_analytics to update.
     */
    where: visitor_analyticsWhereUniqueInput
  }

  /**
   * visitor_analytics updateMany
   */
  export type visitor_analyticsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update visitor_analytics.
     */
    data: XOR<visitor_analyticsUpdateManyMutationInput, visitor_analyticsUncheckedUpdateManyInput>
    /**
     * Filter which visitor_analytics to update
     */
    where?: visitor_analyticsWhereInput
    /**
     * Limit how many visitor_analytics to update.
     */
    limit?: number
  }

  /**
   * visitor_analytics updateManyAndReturn
   */
  export type visitor_analyticsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * The data used to update visitor_analytics.
     */
    data: XOR<visitor_analyticsUpdateManyMutationInput, visitor_analyticsUncheckedUpdateManyInput>
    /**
     * Filter which visitor_analytics to update
     */
    where?: visitor_analyticsWhereInput
    /**
     * Limit how many visitor_analytics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * visitor_analytics upsert
   */
  export type visitor_analyticsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
    /**
     * The filter to search for the visitor_analytics to update in case it exists.
     */
    where: visitor_analyticsWhereUniqueInput
    /**
     * In case the visitor_analytics found by the `where` argument doesn't exist, create a new visitor_analytics with this data.
     */
    create: XOR<visitor_analyticsCreateInput, visitor_analyticsUncheckedCreateInput>
    /**
     * In case the visitor_analytics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<visitor_analyticsUpdateInput, visitor_analyticsUncheckedUpdateInput>
  }

  /**
   * visitor_analytics delete
   */
  export type visitor_analyticsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
    /**
     * Filter which visitor_analytics to delete.
     */
    where: visitor_analyticsWhereUniqueInput
  }

  /**
   * visitor_analytics deleteMany
   */
  export type visitor_analyticsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which visitor_analytics to delete
     */
    where?: visitor_analyticsWhereInput
    /**
     * Limit how many visitor_analytics to delete.
     */
    limit?: number
  }

  /**
   * visitor_analytics.users
   */
  export type visitor_analytics$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * visitor_analytics without action
   */
  export type visitor_analyticsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
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
   * Model reports
   */

  export type AggregateReports = {
    _count: ReportsCountAggregateOutputType | null
    _avg: ReportsAvgAggregateOutputType | null
    _sum: ReportsSumAggregateOutputType | null
    _min: ReportsMinAggregateOutputType | null
    _max: ReportsMaxAggregateOutputType | null
  }

  export type ReportsAvgAggregateOutputType = {
    max_access: number | null
    current_access: number | null
  }

  export type ReportsSumAggregateOutputType = {
    max_access: number | null
    current_access: number | null
  }

  export type ReportsMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    cover_image_url: string | null
    status: $Enums.ReportStatus | null
    category: string | null
    priority: $Enums.Priority | null
    is_public: boolean | null
    max_access: number | null
    current_access: number | null
    tags: string | null
    author_id: string | null
    assignee_id: string | null
    feedback: string | null
    verified_at: Date | null
    rejected_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReportsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    cover_image_url: string | null
    status: $Enums.ReportStatus | null
    category: string | null
    priority: $Enums.Priority | null
    is_public: boolean | null
    max_access: number | null
    current_access: number | null
    tags: string | null
    author_id: string | null
    assignee_id: string | null
    feedback: string | null
    verified_at: Date | null
    rejected_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReportsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    content: number
    cover_image_url: number
    status: number
    category: number
    priority: number
    is_public: number
    max_access: number
    current_access: number
    tags: number
    author_id: number
    assignee_id: number
    feedback: number
    verified_at: number
    rejected_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ReportsAvgAggregateInputType = {
    max_access?: true
    current_access?: true
  }

  export type ReportsSumAggregateInputType = {
    max_access?: true
    current_access?: true
  }

  export type ReportsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    cover_image_url?: true
    status?: true
    category?: true
    priority?: true
    is_public?: true
    max_access?: true
    current_access?: true
    tags?: true
    author_id?: true
    assignee_id?: true
    feedback?: true
    verified_at?: true
    rejected_at?: true
    created_at?: true
    updated_at?: true
  }

  export type ReportsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    cover_image_url?: true
    status?: true
    category?: true
    priority?: true
    is_public?: true
    max_access?: true
    current_access?: true
    tags?: true
    author_id?: true
    assignee_id?: true
    feedback?: true
    verified_at?: true
    rejected_at?: true
    created_at?: true
    updated_at?: true
  }

  export type ReportsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    cover_image_url?: true
    status?: true
    category?: true
    priority?: true
    is_public?: true
    max_access?: true
    current_access?: true
    tags?: true
    author_id?: true
    assignee_id?: true
    feedback?: true
    verified_at?: true
    rejected_at?: true
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
     * Select which fields to average
    **/
    _avg?: ReportsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportsSumAggregateInputType
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
    _avg?: ReportsAvgAggregateInputType
    _sum?: ReportsSumAggregateInputType
    _min?: ReportsMinAggregateInputType
    _max?: ReportsMaxAggregateInputType
  }

  export type ReportsGroupByOutputType = {
    id: string
    title: string
    description: string | null
    content: string
    cover_image_url: string | null
    status: $Enums.ReportStatus
    category: string | null
    priority: $Enums.Priority
    is_public: boolean
    max_access: number | null
    current_access: number | null
    tags: string | null
    author_id: string
    assignee_id: string | null
    feedback: string | null
    verified_at: Date | null
    rejected_at: Date | null
    created_at: Date
    updated_at: Date
    _count: ReportsCountAggregateOutputType | null
    _avg: ReportsAvgAggregateOutputType | null
    _sum: ReportsSumAggregateOutputType | null
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
    cover_image_url?: boolean
    status?: boolean
    category?: boolean
    priority?: boolean
    is_public?: boolean
    max_access?: boolean
    current_access?: boolean
    tags?: boolean
    author_id?: boolean
    assignee_id?: boolean
    feedback?: boolean
    verified_at?: boolean
    rejected_at?: boolean
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
    cover_image_url?: boolean
    status?: boolean
    category?: boolean
    priority?: boolean
    is_public?: boolean
    max_access?: boolean
    current_access?: boolean
    tags?: boolean
    author_id?: boolean
    assignee_id?: boolean
    feedback?: boolean
    verified_at?: boolean
    rejected_at?: boolean
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
    cover_image_url?: boolean
    status?: boolean
    category?: boolean
    priority?: boolean
    is_public?: boolean
    max_access?: boolean
    current_access?: boolean
    tags?: boolean
    author_id?: boolean
    assignee_id?: boolean
    feedback?: boolean
    verified_at?: boolean
    rejected_at?: boolean
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
    cover_image_url?: boolean
    status?: boolean
    category?: boolean
    priority?: boolean
    is_public?: boolean
    max_access?: boolean
    current_access?: boolean
    tags?: boolean
    author_id?: boolean
    assignee_id?: boolean
    feedback?: boolean
    verified_at?: boolean
    rejected_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type reportsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "content" | "cover_image_url" | "status" | "category" | "priority" | "is_public" | "max_access" | "current_access" | "tags" | "author_id" | "assignee_id" | "feedback" | "verified_at" | "rejected_at" | "created_at" | "updated_at", ExtArgs["result"]["reports"]>
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
      cover_image_url: string | null
      status: $Enums.ReportStatus
      category: string | null
      priority: $Enums.Priority
      is_public: boolean
      max_access: number | null
      current_access: number | null
      tags: string | null
      author_id: string
      assignee_id: string | null
      feedback: string | null
      verified_at: Date | null
      rejected_at: Date | null
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
    readonly cover_image_url: FieldRef<"reports", 'String'>
    readonly status: FieldRef<"reports", 'ReportStatus'>
    readonly category: FieldRef<"reports", 'String'>
    readonly priority: FieldRef<"reports", 'Priority'>
    readonly is_public: FieldRef<"reports", 'Boolean'>
    readonly max_access: FieldRef<"reports", 'Int'>
    readonly current_access: FieldRef<"reports", 'Int'>
    readonly tags: FieldRef<"reports", 'String'>
    readonly author_id: FieldRef<"reports", 'String'>
    readonly assignee_id: FieldRef<"reports", 'String'>
    readonly feedback: FieldRef<"reports", 'String'>
    readonly verified_at: FieldRef<"reports", 'DateTime'>
    readonly rejected_at: FieldRef<"reports", 'DateTime'>
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
    file_type: string | null
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
    file_type: string | null
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
    file_type: number
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
    file_type?: true
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
    file_type?: true
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
    file_type?: true
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
    file_type: string | null
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
    file_type?: boolean
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
    file_type?: boolean
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
    file_type?: boolean
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
    file_type?: boolean
    category?: boolean
    year?: boolean
    batch?: boolean
    report_id?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type uploaded_filesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "filename" | "original_name" | "file_path" | "file_size" | "mime_type" | "file_type" | "category" | "year" | "batch" | "report_id" | "author_id" | "created_at" | "updated_at", ExtArgs["result"]["uploaded_files"]>
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
      file_type: string | null
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
    readonly file_type: FieldRef<"uploaded_files", 'String'>
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
    training_program_id: string | null
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
    training_program_id: string | null
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
    training_program_id: number
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
    training_program_id?: true
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
    training_program_id?: true
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
    training_program_id?: true
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
    training_program_id: string | null
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
    training_program_id?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
    visitor_analytics?: boolean | users$visitor_analyticsArgs<ExtArgs>
    guestbook_entries?: boolean | users$guestbook_entriesArgs<ExtArgs>
    reports_reports_assignee_idTousers?: boolean | users$reports_reports_assignee_idTousersArgs<ExtArgs>
    reports_reports_author_idTousers?: boolean | users$reports_reports_author_idTousersArgs<ExtArgs>
    uploaded_files?: boolean | users$uploaded_filesArgs<ExtArgs>
    created_folders?: boolean | users$created_foldersArgs<ExtArgs>
    training_program?: boolean | users$training_programArgs<ExtArgs>
    cohort_memberships?: boolean | users$cohort_membershipsArgs<ExtArgs>
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
    training_program_id?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
    training_program?: boolean | users$training_programArgs<ExtArgs>
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
    training_program_id?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
    training_program?: boolean | users$training_programArgs<ExtArgs>
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
    training_program_id?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "role" | "name" | "avatar" | "training" | "angkatan" | "training_program_id" | "phone" | "created_at" | "updated_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    visitor_analytics?: boolean | users$visitor_analyticsArgs<ExtArgs>
    guestbook_entries?: boolean | users$guestbook_entriesArgs<ExtArgs>
    reports_reports_assignee_idTousers?: boolean | users$reports_reports_assignee_idTousersArgs<ExtArgs>
    reports_reports_author_idTousers?: boolean | users$reports_reports_author_idTousersArgs<ExtArgs>
    uploaded_files?: boolean | users$uploaded_filesArgs<ExtArgs>
    created_folders?: boolean | users$created_foldersArgs<ExtArgs>
    training_program?: boolean | users$training_programArgs<ExtArgs>
    cohort_memberships?: boolean | users$cohort_membershipsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    training_program?: boolean | users$training_programArgs<ExtArgs>
  }
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    training_program?: boolean | users$training_programArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      visitor_analytics: Prisma.$visitor_analyticsPayload<ExtArgs>[]
      guestbook_entries: Prisma.$guestbook_entriesPayload<ExtArgs>[]
      reports_reports_assignee_idTousers: Prisma.$reportsPayload<ExtArgs>[]
      reports_reports_author_idTousers: Prisma.$reportsPayload<ExtArgs>[]
      uploaded_files: Prisma.$uploaded_filesPayload<ExtArgs>[]
      created_folders: Prisma.$report_foldersPayload<ExtArgs>[]
      training_program: Prisma.$training_programsPayload<ExtArgs> | null
      cohort_memberships: Prisma.$cohort_membersPayload<ExtArgs>[]
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
      training_program_id: string | null
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
    visitor_analytics<T extends users$visitor_analyticsArgs<ExtArgs> = {}>(args?: Subset<T, users$visitor_analyticsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$visitor_analyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    guestbook_entries<T extends users$guestbook_entriesArgs<ExtArgs> = {}>(args?: Subset<T, users$guestbook_entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guestbook_entriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports_reports_assignee_idTousers<T extends users$reports_reports_assignee_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$reports_reports_assignee_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports_reports_author_idTousers<T extends users$reports_reports_author_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$reports_reports_author_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reportsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    uploaded_files<T extends users$uploaded_filesArgs<ExtArgs> = {}>(args?: Subset<T, users$uploaded_filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$uploaded_filesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    created_folders<T extends users$created_foldersArgs<ExtArgs> = {}>(args?: Subset<T, users$created_foldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    training_program<T extends users$training_programArgs<ExtArgs> = {}>(args?: Subset<T, users$training_programArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    cohort_memberships<T extends users$cohort_membershipsArgs<ExtArgs> = {}>(args?: Subset<T, users$cohort_membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly training_program_id: FieldRef<"users", 'String'>
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeCreateManyAndReturn<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeUpdateManyAndReturn<ExtArgs> | null
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
   * users.visitor_analytics
   */
  export type users$visitor_analyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the visitor_analytics
     */
    select?: visitor_analyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the visitor_analytics
     */
    omit?: visitor_analyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: visitor_analyticsInclude<ExtArgs> | null
    where?: visitor_analyticsWhereInput
    orderBy?: visitor_analyticsOrderByWithRelationInput | visitor_analyticsOrderByWithRelationInput[]
    cursor?: visitor_analyticsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Visitor_analyticsScalarFieldEnum | Visitor_analyticsScalarFieldEnum[]
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
   * users.created_folders
   */
  export type users$created_foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    where?: report_foldersWhereInput
    orderBy?: report_foldersOrderByWithRelationInput | report_foldersOrderByWithRelationInput[]
    cursor?: report_foldersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Report_foldersScalarFieldEnum | Report_foldersScalarFieldEnum[]
  }

  /**
   * users.training_program
   */
  export type users$training_programArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    where?: training_programsWhereInput
  }

  /**
   * users.cohort_memberships
   */
  export type users$cohort_membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    where?: cohort_membersWhereInput
    orderBy?: cohort_membersOrderByWithRelationInput | cohort_membersOrderByWithRelationInput[]
    cursor?: cohort_membersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Cohort_membersScalarFieldEnum | Cohort_membersScalarFieldEnum[]
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
   * Model report_folders
   */

  export type AggregateReport_folders = {
    _count: Report_foldersCountAggregateOutputType | null
    _min: Report_foldersMinAggregateOutputType | null
    _max: Report_foldersMaxAggregateOutputType | null
  }

  export type Report_foldersMinAggregateOutputType = {
    id: string | null
    year: string | null
    batch: string | null
    report_type: string | null
    description: string | null
    created_by: string | null
    training_program_id: string | null
    cohort_id: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Report_foldersMaxAggregateOutputType = {
    id: string | null
    year: string | null
    batch: string | null
    report_type: string | null
    description: string | null
    created_by: string | null
    training_program_id: string | null
    cohort_id: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Report_foldersCountAggregateOutputType = {
    id: number
    year: number
    batch: number
    report_type: number
    description: number
    created_by: number
    training_program_id: number
    cohort_id: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Report_foldersMinAggregateInputType = {
    id?: true
    year?: true
    batch?: true
    report_type?: true
    description?: true
    created_by?: true
    training_program_id?: true
    cohort_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Report_foldersMaxAggregateInputType = {
    id?: true
    year?: true
    batch?: true
    report_type?: true
    description?: true
    created_by?: true
    training_program_id?: true
    cohort_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Report_foldersCountAggregateInputType = {
    id?: true
    year?: true
    batch?: true
    report_type?: true
    description?: true
    created_by?: true
    training_program_id?: true
    cohort_id?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Report_foldersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which report_folders to aggregate.
     */
    where?: report_foldersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_folders to fetch.
     */
    orderBy?: report_foldersOrderByWithRelationInput | report_foldersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: report_foldersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned report_folders
    **/
    _count?: true | Report_foldersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Report_foldersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Report_foldersMaxAggregateInputType
  }

  export type GetReport_foldersAggregateType<T extends Report_foldersAggregateArgs> = {
        [P in keyof T & keyof AggregateReport_folders]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport_folders[P]>
      : GetScalarType<T[P], AggregateReport_folders[P]>
  }




  export type report_foldersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: report_foldersWhereInput
    orderBy?: report_foldersOrderByWithAggregationInput | report_foldersOrderByWithAggregationInput[]
    by: Report_foldersScalarFieldEnum[] | Report_foldersScalarFieldEnum
    having?: report_foldersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Report_foldersCountAggregateInputType | true
    _min?: Report_foldersMinAggregateInputType
    _max?: Report_foldersMaxAggregateInputType
  }

  export type Report_foldersGroupByOutputType = {
    id: string
    year: string
    batch: string
    report_type: string
    description: string | null
    created_by: string
    training_program_id: string | null
    cohort_id: string | null
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: Report_foldersCountAggregateOutputType | null
    _min: Report_foldersMinAggregateOutputType | null
    _max: Report_foldersMaxAggregateOutputType | null
  }

  type GetReport_foldersGroupByPayload<T extends report_foldersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Report_foldersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Report_foldersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Report_foldersGroupByOutputType[P]>
            : GetScalarType<T[P], Report_foldersGroupByOutputType[P]>
        }
      >
    >


  export type report_foldersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    batch?: boolean
    report_type?: boolean
    description?: boolean
    created_by?: boolean
    training_program_id?: boolean
    cohort_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    creator?: boolean | usersDefaultArgs<ExtArgs>
    training_program?: boolean | report_folders$training_programArgs<ExtArgs>
    cohort?: boolean | report_folders$cohortArgs<ExtArgs>
  }, ExtArgs["result"]["report_folders"]>

  export type report_foldersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    batch?: boolean
    report_type?: boolean
    description?: boolean
    created_by?: boolean
    training_program_id?: boolean
    cohort_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    creator?: boolean | usersDefaultArgs<ExtArgs>
    training_program?: boolean | report_folders$training_programArgs<ExtArgs>
    cohort?: boolean | report_folders$cohortArgs<ExtArgs>
  }, ExtArgs["result"]["report_folders"]>

  export type report_foldersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    batch?: boolean
    report_type?: boolean
    description?: boolean
    created_by?: boolean
    training_program_id?: boolean
    cohort_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    creator?: boolean | usersDefaultArgs<ExtArgs>
    training_program?: boolean | report_folders$training_programArgs<ExtArgs>
    cohort?: boolean | report_folders$cohortArgs<ExtArgs>
  }, ExtArgs["result"]["report_folders"]>

  export type report_foldersSelectScalar = {
    id?: boolean
    year?: boolean
    batch?: boolean
    report_type?: boolean
    description?: boolean
    created_by?: boolean
    training_program_id?: boolean
    cohort_id?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type report_foldersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "batch" | "report_type" | "description" | "created_by" | "training_program_id" | "cohort_id" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["report_folders"]>
  export type report_foldersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | usersDefaultArgs<ExtArgs>
    training_program?: boolean | report_folders$training_programArgs<ExtArgs>
    cohort?: boolean | report_folders$cohortArgs<ExtArgs>
  }
  export type report_foldersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | usersDefaultArgs<ExtArgs>
    training_program?: boolean | report_folders$training_programArgs<ExtArgs>
    cohort?: boolean | report_folders$cohortArgs<ExtArgs>
  }
  export type report_foldersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | usersDefaultArgs<ExtArgs>
    training_program?: boolean | report_folders$training_programArgs<ExtArgs>
    cohort?: boolean | report_folders$cohortArgs<ExtArgs>
  }

  export type $report_foldersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "report_folders"
    objects: {
      creator: Prisma.$usersPayload<ExtArgs>
      training_program: Prisma.$training_programsPayload<ExtArgs> | null
      cohort: Prisma.$training_cohortsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: string
      batch: string
      report_type: string
      description: string | null
      created_by: string
      training_program_id: string | null
      cohort_id: string | null
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["report_folders"]>
    composites: {}
  }

  type report_foldersGetPayload<S extends boolean | null | undefined | report_foldersDefaultArgs> = $Result.GetResult<Prisma.$report_foldersPayload, S>

  type report_foldersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<report_foldersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Report_foldersCountAggregateInputType | true
    }

  export interface report_foldersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['report_folders'], meta: { name: 'report_folders' } }
    /**
     * Find zero or one Report_folders that matches the filter.
     * @param {report_foldersFindUniqueArgs} args - Arguments to find a Report_folders
     * @example
     * // Get one Report_folders
     * const report_folders = await prisma.report_folders.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends report_foldersFindUniqueArgs>(args: SelectSubset<T, report_foldersFindUniqueArgs<ExtArgs>>): Prisma__report_foldersClient<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report_folders that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {report_foldersFindUniqueOrThrowArgs} args - Arguments to find a Report_folders
     * @example
     * // Get one Report_folders
     * const report_folders = await prisma.report_folders.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends report_foldersFindUniqueOrThrowArgs>(args: SelectSubset<T, report_foldersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__report_foldersClient<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report_folders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_foldersFindFirstArgs} args - Arguments to find a Report_folders
     * @example
     * // Get one Report_folders
     * const report_folders = await prisma.report_folders.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends report_foldersFindFirstArgs>(args?: SelectSubset<T, report_foldersFindFirstArgs<ExtArgs>>): Prisma__report_foldersClient<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report_folders that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_foldersFindFirstOrThrowArgs} args - Arguments to find a Report_folders
     * @example
     * // Get one Report_folders
     * const report_folders = await prisma.report_folders.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends report_foldersFindFirstOrThrowArgs>(args?: SelectSubset<T, report_foldersFindFirstOrThrowArgs<ExtArgs>>): Prisma__report_foldersClient<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Report_folders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_foldersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Report_folders
     * const report_folders = await prisma.report_folders.findMany()
     * 
     * // Get first 10 Report_folders
     * const report_folders = await prisma.report_folders.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const report_foldersWithIdOnly = await prisma.report_folders.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends report_foldersFindManyArgs>(args?: SelectSubset<T, report_foldersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report_folders.
     * @param {report_foldersCreateArgs} args - Arguments to create a Report_folders.
     * @example
     * // Create one Report_folders
     * const Report_folders = await prisma.report_folders.create({
     *   data: {
     *     // ... data to create a Report_folders
     *   }
     * })
     * 
     */
    create<T extends report_foldersCreateArgs>(args: SelectSubset<T, report_foldersCreateArgs<ExtArgs>>): Prisma__report_foldersClient<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Report_folders.
     * @param {report_foldersCreateManyArgs} args - Arguments to create many Report_folders.
     * @example
     * // Create many Report_folders
     * const report_folders = await prisma.report_folders.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends report_foldersCreateManyArgs>(args?: SelectSubset<T, report_foldersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Report_folders and returns the data saved in the database.
     * @param {report_foldersCreateManyAndReturnArgs} args - Arguments to create many Report_folders.
     * @example
     * // Create many Report_folders
     * const report_folders = await prisma.report_folders.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Report_folders and only return the `id`
     * const report_foldersWithIdOnly = await prisma.report_folders.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends report_foldersCreateManyAndReturnArgs>(args?: SelectSubset<T, report_foldersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report_folders.
     * @param {report_foldersDeleteArgs} args - Arguments to delete one Report_folders.
     * @example
     * // Delete one Report_folders
     * const Report_folders = await prisma.report_folders.delete({
     *   where: {
     *     // ... filter to delete one Report_folders
     *   }
     * })
     * 
     */
    delete<T extends report_foldersDeleteArgs>(args: SelectSubset<T, report_foldersDeleteArgs<ExtArgs>>): Prisma__report_foldersClient<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report_folders.
     * @param {report_foldersUpdateArgs} args - Arguments to update one Report_folders.
     * @example
     * // Update one Report_folders
     * const report_folders = await prisma.report_folders.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends report_foldersUpdateArgs>(args: SelectSubset<T, report_foldersUpdateArgs<ExtArgs>>): Prisma__report_foldersClient<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Report_folders.
     * @param {report_foldersDeleteManyArgs} args - Arguments to filter Report_folders to delete.
     * @example
     * // Delete a few Report_folders
     * const { count } = await prisma.report_folders.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends report_foldersDeleteManyArgs>(args?: SelectSubset<T, report_foldersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Report_folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_foldersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Report_folders
     * const report_folders = await prisma.report_folders.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends report_foldersUpdateManyArgs>(args: SelectSubset<T, report_foldersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Report_folders and returns the data updated in the database.
     * @param {report_foldersUpdateManyAndReturnArgs} args - Arguments to update many Report_folders.
     * @example
     * // Update many Report_folders
     * const report_folders = await prisma.report_folders.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Report_folders and only return the `id`
     * const report_foldersWithIdOnly = await prisma.report_folders.updateManyAndReturn({
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
    updateManyAndReturn<T extends report_foldersUpdateManyAndReturnArgs>(args: SelectSubset<T, report_foldersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report_folders.
     * @param {report_foldersUpsertArgs} args - Arguments to update or create a Report_folders.
     * @example
     * // Update or create a Report_folders
     * const report_folders = await prisma.report_folders.upsert({
     *   create: {
     *     // ... data to create a Report_folders
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report_folders we want to update
     *   }
     * })
     */
    upsert<T extends report_foldersUpsertArgs>(args: SelectSubset<T, report_foldersUpsertArgs<ExtArgs>>): Prisma__report_foldersClient<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Report_folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_foldersCountArgs} args - Arguments to filter Report_folders to count.
     * @example
     * // Count the number of Report_folders
     * const count = await prisma.report_folders.count({
     *   where: {
     *     // ... the filter for the Report_folders we want to count
     *   }
     * })
    **/
    count<T extends report_foldersCountArgs>(
      args?: Subset<T, report_foldersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Report_foldersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report_folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Report_foldersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Report_foldersAggregateArgs>(args: Subset<T, Report_foldersAggregateArgs>): Prisma.PrismaPromise<GetReport_foldersAggregateType<T>>

    /**
     * Group by Report_folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_foldersGroupByArgs} args - Group by arguments.
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
      T extends report_foldersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: report_foldersGroupByArgs['orderBy'] }
        : { orderBy?: report_foldersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, report_foldersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReport_foldersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the report_folders model
   */
  readonly fields: report_foldersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for report_folders.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__report_foldersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    training_program<T extends report_folders$training_programArgs<ExtArgs> = {}>(args?: Subset<T, report_folders$training_programArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    cohort<T extends report_folders$cohortArgs<ExtArgs> = {}>(args?: Subset<T, report_folders$cohortArgs<ExtArgs>>): Prisma__training_cohortsClient<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the report_folders model
   */
  interface report_foldersFieldRefs {
    readonly id: FieldRef<"report_folders", 'String'>
    readonly year: FieldRef<"report_folders", 'String'>
    readonly batch: FieldRef<"report_folders", 'String'>
    readonly report_type: FieldRef<"report_folders", 'String'>
    readonly description: FieldRef<"report_folders", 'String'>
    readonly created_by: FieldRef<"report_folders", 'String'>
    readonly training_program_id: FieldRef<"report_folders", 'String'>
    readonly cohort_id: FieldRef<"report_folders", 'String'>
    readonly is_active: FieldRef<"report_folders", 'Boolean'>
    readonly created_at: FieldRef<"report_folders", 'DateTime'>
    readonly updated_at: FieldRef<"report_folders", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * report_folders findUnique
   */
  export type report_foldersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    /**
     * Filter, which report_folders to fetch.
     */
    where: report_foldersWhereUniqueInput
  }

  /**
   * report_folders findUniqueOrThrow
   */
  export type report_foldersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    /**
     * Filter, which report_folders to fetch.
     */
    where: report_foldersWhereUniqueInput
  }

  /**
   * report_folders findFirst
   */
  export type report_foldersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    /**
     * Filter, which report_folders to fetch.
     */
    where?: report_foldersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_folders to fetch.
     */
    orderBy?: report_foldersOrderByWithRelationInput | report_foldersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for report_folders.
     */
    cursor?: report_foldersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of report_folders.
     */
    distinct?: Report_foldersScalarFieldEnum | Report_foldersScalarFieldEnum[]
  }

  /**
   * report_folders findFirstOrThrow
   */
  export type report_foldersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    /**
     * Filter, which report_folders to fetch.
     */
    where?: report_foldersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_folders to fetch.
     */
    orderBy?: report_foldersOrderByWithRelationInput | report_foldersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for report_folders.
     */
    cursor?: report_foldersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of report_folders.
     */
    distinct?: Report_foldersScalarFieldEnum | Report_foldersScalarFieldEnum[]
  }

  /**
   * report_folders findMany
   */
  export type report_foldersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    /**
     * Filter, which report_folders to fetch.
     */
    where?: report_foldersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_folders to fetch.
     */
    orderBy?: report_foldersOrderByWithRelationInput | report_foldersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing report_folders.
     */
    cursor?: report_foldersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_folders.
     */
    skip?: number
    distinct?: Report_foldersScalarFieldEnum | Report_foldersScalarFieldEnum[]
  }

  /**
   * report_folders create
   */
  export type report_foldersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    /**
     * The data needed to create a report_folders.
     */
    data: XOR<report_foldersCreateInput, report_foldersUncheckedCreateInput>
  }

  /**
   * report_folders createMany
   */
  export type report_foldersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many report_folders.
     */
    data: report_foldersCreateManyInput | report_foldersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * report_folders createManyAndReturn
   */
  export type report_foldersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * The data used to create many report_folders.
     */
    data: report_foldersCreateManyInput | report_foldersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * report_folders update
   */
  export type report_foldersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    /**
     * The data needed to update a report_folders.
     */
    data: XOR<report_foldersUpdateInput, report_foldersUncheckedUpdateInput>
    /**
     * Choose, which report_folders to update.
     */
    where: report_foldersWhereUniqueInput
  }

  /**
   * report_folders updateMany
   */
  export type report_foldersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update report_folders.
     */
    data: XOR<report_foldersUpdateManyMutationInput, report_foldersUncheckedUpdateManyInput>
    /**
     * Filter which report_folders to update
     */
    where?: report_foldersWhereInput
    /**
     * Limit how many report_folders to update.
     */
    limit?: number
  }

  /**
   * report_folders updateManyAndReturn
   */
  export type report_foldersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * The data used to update report_folders.
     */
    data: XOR<report_foldersUpdateManyMutationInput, report_foldersUncheckedUpdateManyInput>
    /**
     * Filter which report_folders to update
     */
    where?: report_foldersWhereInput
    /**
     * Limit how many report_folders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * report_folders upsert
   */
  export type report_foldersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    /**
     * The filter to search for the report_folders to update in case it exists.
     */
    where: report_foldersWhereUniqueInput
    /**
     * In case the report_folders found by the `where` argument doesn't exist, create a new report_folders with this data.
     */
    create: XOR<report_foldersCreateInput, report_foldersUncheckedCreateInput>
    /**
     * In case the report_folders was found with the provided `where` argument, update it with this data.
     */
    update: XOR<report_foldersUpdateInput, report_foldersUncheckedUpdateInput>
  }

  /**
   * report_folders delete
   */
  export type report_foldersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    /**
     * Filter which report_folders to delete.
     */
    where: report_foldersWhereUniqueInput
  }

  /**
   * report_folders deleteMany
   */
  export type report_foldersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which report_folders to delete
     */
    where?: report_foldersWhereInput
    /**
     * Limit how many report_folders to delete.
     */
    limit?: number
  }

  /**
   * report_folders.training_program
   */
  export type report_folders$training_programArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    where?: training_programsWhereInput
  }

  /**
   * report_folders.cohort
   */
  export type report_folders$cohortArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    where?: training_cohortsWhereInput
  }

  /**
   * report_folders without action
   */
  export type report_foldersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
  }


  /**
   * Model training_programs
   */

  export type AggregateTraining_programs = {
    _count: Training_programsCountAggregateOutputType | null
    _avg: Training_programsAvgAggregateOutputType | null
    _sum: Training_programsSumAggregateOutputType | null
    _min: Training_programsMinAggregateOutputType | null
    _max: Training_programsMaxAggregateOutputType | null
  }

  export type Training_programsAvgAggregateOutputType = {
    duration_days: number | null
  }

  export type Training_programsSumAggregateOutputType = {
    duration_days: number | null
  }

  export type Training_programsMinAggregateOutputType = {
    id: string | null
    name: string | null
    full_name: string | null
    description: string | null
    duration_days: number | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Training_programsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    full_name: string | null
    description: string | null
    duration_days: number | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Training_programsCountAggregateOutputType = {
    id: number
    name: number
    full_name: number
    description: number
    duration_days: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Training_programsAvgAggregateInputType = {
    duration_days?: true
  }

  export type Training_programsSumAggregateInputType = {
    duration_days?: true
  }

  export type Training_programsMinAggregateInputType = {
    id?: true
    name?: true
    full_name?: true
    description?: true
    duration_days?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Training_programsMaxAggregateInputType = {
    id?: true
    name?: true
    full_name?: true
    description?: true
    duration_days?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Training_programsCountAggregateInputType = {
    id?: true
    name?: true
    full_name?: true
    description?: true
    duration_days?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Training_programsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which training_programs to aggregate.
     */
    where?: training_programsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of training_programs to fetch.
     */
    orderBy?: training_programsOrderByWithRelationInput | training_programsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: training_programsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` training_programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` training_programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned training_programs
    **/
    _count?: true | Training_programsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Training_programsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Training_programsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Training_programsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Training_programsMaxAggregateInputType
  }

  export type GetTraining_programsAggregateType<T extends Training_programsAggregateArgs> = {
        [P in keyof T & keyof AggregateTraining_programs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTraining_programs[P]>
      : GetScalarType<T[P], AggregateTraining_programs[P]>
  }




  export type training_programsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: training_programsWhereInput
    orderBy?: training_programsOrderByWithAggregationInput | training_programsOrderByWithAggregationInput[]
    by: Training_programsScalarFieldEnum[] | Training_programsScalarFieldEnum
    having?: training_programsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Training_programsCountAggregateInputType | true
    _avg?: Training_programsAvgAggregateInputType
    _sum?: Training_programsSumAggregateInputType
    _min?: Training_programsMinAggregateInputType
    _max?: Training_programsMaxAggregateInputType
  }

  export type Training_programsGroupByOutputType = {
    id: string
    name: string
    full_name: string
    description: string | null
    duration_days: number | null
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: Training_programsCountAggregateOutputType | null
    _avg: Training_programsAvgAggregateOutputType | null
    _sum: Training_programsSumAggregateOutputType | null
    _min: Training_programsMinAggregateOutputType | null
    _max: Training_programsMaxAggregateOutputType | null
  }

  type GetTraining_programsGroupByPayload<T extends training_programsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Training_programsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Training_programsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Training_programsGroupByOutputType[P]>
            : GetScalarType<T[P], Training_programsGroupByOutputType[P]>
        }
      >
    >


  export type training_programsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    full_name?: boolean
    description?: boolean
    duration_days?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | training_programs$usersArgs<ExtArgs>
    cohorts?: boolean | training_programs$cohortsArgs<ExtArgs>
    folders?: boolean | training_programs$foldersArgs<ExtArgs>
    _count?: boolean | Training_programsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["training_programs"]>

  export type training_programsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    full_name?: boolean
    description?: boolean
    duration_days?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["training_programs"]>

  export type training_programsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    full_name?: boolean
    description?: boolean
    duration_days?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["training_programs"]>

  export type training_programsSelectScalar = {
    id?: boolean
    name?: boolean
    full_name?: boolean
    description?: boolean
    duration_days?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type training_programsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "full_name" | "description" | "duration_days" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["training_programs"]>
  export type training_programsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | training_programs$usersArgs<ExtArgs>
    cohorts?: boolean | training_programs$cohortsArgs<ExtArgs>
    folders?: boolean | training_programs$foldersArgs<ExtArgs>
    _count?: boolean | Training_programsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type training_programsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type training_programsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $training_programsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "training_programs"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>[]
      cohorts: Prisma.$training_cohortsPayload<ExtArgs>[]
      folders: Prisma.$report_foldersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      full_name: string
      description: string | null
      duration_days: number | null
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["training_programs"]>
    composites: {}
  }

  type training_programsGetPayload<S extends boolean | null | undefined | training_programsDefaultArgs> = $Result.GetResult<Prisma.$training_programsPayload, S>

  type training_programsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<training_programsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Training_programsCountAggregateInputType | true
    }

  export interface training_programsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['training_programs'], meta: { name: 'training_programs' } }
    /**
     * Find zero or one Training_programs that matches the filter.
     * @param {training_programsFindUniqueArgs} args - Arguments to find a Training_programs
     * @example
     * // Get one Training_programs
     * const training_programs = await prisma.training_programs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends training_programsFindUniqueArgs>(args: SelectSubset<T, training_programsFindUniqueArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Training_programs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {training_programsFindUniqueOrThrowArgs} args - Arguments to find a Training_programs
     * @example
     * // Get one Training_programs
     * const training_programs = await prisma.training_programs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends training_programsFindUniqueOrThrowArgs>(args: SelectSubset<T, training_programsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Training_programs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_programsFindFirstArgs} args - Arguments to find a Training_programs
     * @example
     * // Get one Training_programs
     * const training_programs = await prisma.training_programs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends training_programsFindFirstArgs>(args?: SelectSubset<T, training_programsFindFirstArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Training_programs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_programsFindFirstOrThrowArgs} args - Arguments to find a Training_programs
     * @example
     * // Get one Training_programs
     * const training_programs = await prisma.training_programs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends training_programsFindFirstOrThrowArgs>(args?: SelectSubset<T, training_programsFindFirstOrThrowArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Training_programs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_programsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Training_programs
     * const training_programs = await prisma.training_programs.findMany()
     * 
     * // Get first 10 Training_programs
     * const training_programs = await prisma.training_programs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const training_programsWithIdOnly = await prisma.training_programs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends training_programsFindManyArgs>(args?: SelectSubset<T, training_programsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Training_programs.
     * @param {training_programsCreateArgs} args - Arguments to create a Training_programs.
     * @example
     * // Create one Training_programs
     * const Training_programs = await prisma.training_programs.create({
     *   data: {
     *     // ... data to create a Training_programs
     *   }
     * })
     * 
     */
    create<T extends training_programsCreateArgs>(args: SelectSubset<T, training_programsCreateArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Training_programs.
     * @param {training_programsCreateManyArgs} args - Arguments to create many Training_programs.
     * @example
     * // Create many Training_programs
     * const training_programs = await prisma.training_programs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends training_programsCreateManyArgs>(args?: SelectSubset<T, training_programsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Training_programs and returns the data saved in the database.
     * @param {training_programsCreateManyAndReturnArgs} args - Arguments to create many Training_programs.
     * @example
     * // Create many Training_programs
     * const training_programs = await prisma.training_programs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Training_programs and only return the `id`
     * const training_programsWithIdOnly = await prisma.training_programs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends training_programsCreateManyAndReturnArgs>(args?: SelectSubset<T, training_programsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Training_programs.
     * @param {training_programsDeleteArgs} args - Arguments to delete one Training_programs.
     * @example
     * // Delete one Training_programs
     * const Training_programs = await prisma.training_programs.delete({
     *   where: {
     *     // ... filter to delete one Training_programs
     *   }
     * })
     * 
     */
    delete<T extends training_programsDeleteArgs>(args: SelectSubset<T, training_programsDeleteArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Training_programs.
     * @param {training_programsUpdateArgs} args - Arguments to update one Training_programs.
     * @example
     * // Update one Training_programs
     * const training_programs = await prisma.training_programs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends training_programsUpdateArgs>(args: SelectSubset<T, training_programsUpdateArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Training_programs.
     * @param {training_programsDeleteManyArgs} args - Arguments to filter Training_programs to delete.
     * @example
     * // Delete a few Training_programs
     * const { count } = await prisma.training_programs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends training_programsDeleteManyArgs>(args?: SelectSubset<T, training_programsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Training_programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_programsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Training_programs
     * const training_programs = await prisma.training_programs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends training_programsUpdateManyArgs>(args: SelectSubset<T, training_programsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Training_programs and returns the data updated in the database.
     * @param {training_programsUpdateManyAndReturnArgs} args - Arguments to update many Training_programs.
     * @example
     * // Update many Training_programs
     * const training_programs = await prisma.training_programs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Training_programs and only return the `id`
     * const training_programsWithIdOnly = await prisma.training_programs.updateManyAndReturn({
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
    updateManyAndReturn<T extends training_programsUpdateManyAndReturnArgs>(args: SelectSubset<T, training_programsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Training_programs.
     * @param {training_programsUpsertArgs} args - Arguments to update or create a Training_programs.
     * @example
     * // Update or create a Training_programs
     * const training_programs = await prisma.training_programs.upsert({
     *   create: {
     *     // ... data to create a Training_programs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Training_programs we want to update
     *   }
     * })
     */
    upsert<T extends training_programsUpsertArgs>(args: SelectSubset<T, training_programsUpsertArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Training_programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_programsCountArgs} args - Arguments to filter Training_programs to count.
     * @example
     * // Count the number of Training_programs
     * const count = await prisma.training_programs.count({
     *   where: {
     *     // ... the filter for the Training_programs we want to count
     *   }
     * })
    **/
    count<T extends training_programsCountArgs>(
      args?: Subset<T, training_programsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Training_programsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Training_programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Training_programsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Training_programsAggregateArgs>(args: Subset<T, Training_programsAggregateArgs>): Prisma.PrismaPromise<GetTraining_programsAggregateType<T>>

    /**
     * Group by Training_programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_programsGroupByArgs} args - Group by arguments.
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
      T extends training_programsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: training_programsGroupByArgs['orderBy'] }
        : { orderBy?: training_programsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, training_programsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTraining_programsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the training_programs model
   */
  readonly fields: training_programsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for training_programs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__training_programsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends training_programs$usersArgs<ExtArgs> = {}>(args?: Subset<T, training_programs$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cohorts<T extends training_programs$cohortsArgs<ExtArgs> = {}>(args?: Subset<T, training_programs$cohortsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    folders<T extends training_programs$foldersArgs<ExtArgs> = {}>(args?: Subset<T, training_programs$foldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the training_programs model
   */
  interface training_programsFieldRefs {
    readonly id: FieldRef<"training_programs", 'String'>
    readonly name: FieldRef<"training_programs", 'String'>
    readonly full_name: FieldRef<"training_programs", 'String'>
    readonly description: FieldRef<"training_programs", 'String'>
    readonly duration_days: FieldRef<"training_programs", 'Int'>
    readonly is_active: FieldRef<"training_programs", 'Boolean'>
    readonly created_at: FieldRef<"training_programs", 'DateTime'>
    readonly updated_at: FieldRef<"training_programs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * training_programs findUnique
   */
  export type training_programsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    /**
     * Filter, which training_programs to fetch.
     */
    where: training_programsWhereUniqueInput
  }

  /**
   * training_programs findUniqueOrThrow
   */
  export type training_programsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    /**
     * Filter, which training_programs to fetch.
     */
    where: training_programsWhereUniqueInput
  }

  /**
   * training_programs findFirst
   */
  export type training_programsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    /**
     * Filter, which training_programs to fetch.
     */
    where?: training_programsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of training_programs to fetch.
     */
    orderBy?: training_programsOrderByWithRelationInput | training_programsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for training_programs.
     */
    cursor?: training_programsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` training_programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` training_programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of training_programs.
     */
    distinct?: Training_programsScalarFieldEnum | Training_programsScalarFieldEnum[]
  }

  /**
   * training_programs findFirstOrThrow
   */
  export type training_programsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    /**
     * Filter, which training_programs to fetch.
     */
    where?: training_programsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of training_programs to fetch.
     */
    orderBy?: training_programsOrderByWithRelationInput | training_programsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for training_programs.
     */
    cursor?: training_programsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` training_programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` training_programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of training_programs.
     */
    distinct?: Training_programsScalarFieldEnum | Training_programsScalarFieldEnum[]
  }

  /**
   * training_programs findMany
   */
  export type training_programsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    /**
     * Filter, which training_programs to fetch.
     */
    where?: training_programsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of training_programs to fetch.
     */
    orderBy?: training_programsOrderByWithRelationInput | training_programsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing training_programs.
     */
    cursor?: training_programsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` training_programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` training_programs.
     */
    skip?: number
    distinct?: Training_programsScalarFieldEnum | Training_programsScalarFieldEnum[]
  }

  /**
   * training_programs create
   */
  export type training_programsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    /**
     * The data needed to create a training_programs.
     */
    data: XOR<training_programsCreateInput, training_programsUncheckedCreateInput>
  }

  /**
   * training_programs createMany
   */
  export type training_programsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many training_programs.
     */
    data: training_programsCreateManyInput | training_programsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * training_programs createManyAndReturn
   */
  export type training_programsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * The data used to create many training_programs.
     */
    data: training_programsCreateManyInput | training_programsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * training_programs update
   */
  export type training_programsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    /**
     * The data needed to update a training_programs.
     */
    data: XOR<training_programsUpdateInput, training_programsUncheckedUpdateInput>
    /**
     * Choose, which training_programs to update.
     */
    where: training_programsWhereUniqueInput
  }

  /**
   * training_programs updateMany
   */
  export type training_programsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update training_programs.
     */
    data: XOR<training_programsUpdateManyMutationInput, training_programsUncheckedUpdateManyInput>
    /**
     * Filter which training_programs to update
     */
    where?: training_programsWhereInput
    /**
     * Limit how many training_programs to update.
     */
    limit?: number
  }

  /**
   * training_programs updateManyAndReturn
   */
  export type training_programsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * The data used to update training_programs.
     */
    data: XOR<training_programsUpdateManyMutationInput, training_programsUncheckedUpdateManyInput>
    /**
     * Filter which training_programs to update
     */
    where?: training_programsWhereInput
    /**
     * Limit how many training_programs to update.
     */
    limit?: number
  }

  /**
   * training_programs upsert
   */
  export type training_programsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    /**
     * The filter to search for the training_programs to update in case it exists.
     */
    where: training_programsWhereUniqueInput
    /**
     * In case the training_programs found by the `where` argument doesn't exist, create a new training_programs with this data.
     */
    create: XOR<training_programsCreateInput, training_programsUncheckedCreateInput>
    /**
     * In case the training_programs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<training_programsUpdateInput, training_programsUncheckedUpdateInput>
  }

  /**
   * training_programs delete
   */
  export type training_programsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
    /**
     * Filter which training_programs to delete.
     */
    where: training_programsWhereUniqueInput
  }

  /**
   * training_programs deleteMany
   */
  export type training_programsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which training_programs to delete
     */
    where?: training_programsWhereInput
    /**
     * Limit how many training_programs to delete.
     */
    limit?: number
  }

  /**
   * training_programs.users
   */
  export type training_programs$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * training_programs.cohorts
   */
  export type training_programs$cohortsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    where?: training_cohortsWhereInput
    orderBy?: training_cohortsOrderByWithRelationInput | training_cohortsOrderByWithRelationInput[]
    cursor?: training_cohortsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Training_cohortsScalarFieldEnum | Training_cohortsScalarFieldEnum[]
  }

  /**
   * training_programs.folders
   */
  export type training_programs$foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    where?: report_foldersWhereInput
    orderBy?: report_foldersOrderByWithRelationInput | report_foldersOrderByWithRelationInput[]
    cursor?: report_foldersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Report_foldersScalarFieldEnum | Report_foldersScalarFieldEnum[]
  }

  /**
   * training_programs without action
   */
  export type training_programsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_programs
     */
    select?: training_programsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_programs
     */
    omit?: training_programsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_programsInclude<ExtArgs> | null
  }


  /**
   * Model training_cohorts
   */

  export type AggregateTraining_cohorts = {
    _count: Training_cohortsCountAggregateOutputType | null
    _avg: Training_cohortsAvgAggregateOutputType | null
    _sum: Training_cohortsSumAggregateOutputType | null
    _min: Training_cohortsMinAggregateOutputType | null
    _max: Training_cohortsMaxAggregateOutputType | null
  }

  export type Training_cohortsAvgAggregateOutputType = {
    max_participants: number | null
    current_participants: number | null
  }

  export type Training_cohortsSumAggregateOutputType = {
    max_participants: number | null
    current_participants: number | null
  }

  export type Training_cohortsMinAggregateOutputType = {
    id: string | null
    name: string | null
    training_program_id: string | null
    year: string | null
    start_date: Date | null
    end_date: Date | null
    max_participants: number | null
    current_participants: number | null
    status: $Enums.CohortStatus | null
    description: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Training_cohortsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    training_program_id: string | null
    year: string | null
    start_date: Date | null
    end_date: Date | null
    max_participants: number | null
    current_participants: number | null
    status: $Enums.CohortStatus | null
    description: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Training_cohortsCountAggregateOutputType = {
    id: number
    name: number
    training_program_id: number
    year: number
    start_date: number
    end_date: number
    max_participants: number
    current_participants: number
    status: number
    description: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Training_cohortsAvgAggregateInputType = {
    max_participants?: true
    current_participants?: true
  }

  export type Training_cohortsSumAggregateInputType = {
    max_participants?: true
    current_participants?: true
  }

  export type Training_cohortsMinAggregateInputType = {
    id?: true
    name?: true
    training_program_id?: true
    year?: true
    start_date?: true
    end_date?: true
    max_participants?: true
    current_participants?: true
    status?: true
    description?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Training_cohortsMaxAggregateInputType = {
    id?: true
    name?: true
    training_program_id?: true
    year?: true
    start_date?: true
    end_date?: true
    max_participants?: true
    current_participants?: true
    status?: true
    description?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Training_cohortsCountAggregateInputType = {
    id?: true
    name?: true
    training_program_id?: true
    year?: true
    start_date?: true
    end_date?: true
    max_participants?: true
    current_participants?: true
    status?: true
    description?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Training_cohortsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which training_cohorts to aggregate.
     */
    where?: training_cohortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of training_cohorts to fetch.
     */
    orderBy?: training_cohortsOrderByWithRelationInput | training_cohortsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: training_cohortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` training_cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` training_cohorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned training_cohorts
    **/
    _count?: true | Training_cohortsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Training_cohortsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Training_cohortsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Training_cohortsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Training_cohortsMaxAggregateInputType
  }

  export type GetTraining_cohortsAggregateType<T extends Training_cohortsAggregateArgs> = {
        [P in keyof T & keyof AggregateTraining_cohorts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTraining_cohorts[P]>
      : GetScalarType<T[P], AggregateTraining_cohorts[P]>
  }




  export type training_cohortsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: training_cohortsWhereInput
    orderBy?: training_cohortsOrderByWithAggregationInput | training_cohortsOrderByWithAggregationInput[]
    by: Training_cohortsScalarFieldEnum[] | Training_cohortsScalarFieldEnum
    having?: training_cohortsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Training_cohortsCountAggregateInputType | true
    _avg?: Training_cohortsAvgAggregateInputType
    _sum?: Training_cohortsSumAggregateInputType
    _min?: Training_cohortsMinAggregateInputType
    _max?: Training_cohortsMaxAggregateInputType
  }

  export type Training_cohortsGroupByOutputType = {
    id: string
    name: string
    training_program_id: string
    year: string
    start_date: Date | null
    end_date: Date | null
    max_participants: number | null
    current_participants: number
    status: $Enums.CohortStatus
    description: string | null
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: Training_cohortsCountAggregateOutputType | null
    _avg: Training_cohortsAvgAggregateOutputType | null
    _sum: Training_cohortsSumAggregateOutputType | null
    _min: Training_cohortsMinAggregateOutputType | null
    _max: Training_cohortsMaxAggregateOutputType | null
  }

  type GetTraining_cohortsGroupByPayload<T extends training_cohortsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Training_cohortsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Training_cohortsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Training_cohortsGroupByOutputType[P]>
            : GetScalarType<T[P], Training_cohortsGroupByOutputType[P]>
        }
      >
    >


  export type training_cohortsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    training_program_id?: boolean
    year?: boolean
    start_date?: boolean
    end_date?: boolean
    max_participants?: boolean
    current_participants?: boolean
    status?: boolean
    description?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    training_program?: boolean | training_programsDefaultArgs<ExtArgs>
    members?: boolean | training_cohorts$membersArgs<ExtArgs>
    folders?: boolean | training_cohorts$foldersArgs<ExtArgs>
    _count?: boolean | Training_cohortsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["training_cohorts"]>

  export type training_cohortsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    training_program_id?: boolean
    year?: boolean
    start_date?: boolean
    end_date?: boolean
    max_participants?: boolean
    current_participants?: boolean
    status?: boolean
    description?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    training_program?: boolean | training_programsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["training_cohorts"]>

  export type training_cohortsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    training_program_id?: boolean
    year?: boolean
    start_date?: boolean
    end_date?: boolean
    max_participants?: boolean
    current_participants?: boolean
    status?: boolean
    description?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    training_program?: boolean | training_programsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["training_cohorts"]>

  export type training_cohortsSelectScalar = {
    id?: boolean
    name?: boolean
    training_program_id?: boolean
    year?: boolean
    start_date?: boolean
    end_date?: boolean
    max_participants?: boolean
    current_participants?: boolean
    status?: boolean
    description?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type training_cohortsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "training_program_id" | "year" | "start_date" | "end_date" | "max_participants" | "current_participants" | "status" | "description" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["training_cohorts"]>
  export type training_cohortsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    training_program?: boolean | training_programsDefaultArgs<ExtArgs>
    members?: boolean | training_cohorts$membersArgs<ExtArgs>
    folders?: boolean | training_cohorts$foldersArgs<ExtArgs>
    _count?: boolean | Training_cohortsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type training_cohortsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    training_program?: boolean | training_programsDefaultArgs<ExtArgs>
  }
  export type training_cohortsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    training_program?: boolean | training_programsDefaultArgs<ExtArgs>
  }

  export type $training_cohortsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "training_cohorts"
    objects: {
      training_program: Prisma.$training_programsPayload<ExtArgs>
      members: Prisma.$cohort_membersPayload<ExtArgs>[]
      folders: Prisma.$report_foldersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      training_program_id: string
      year: string
      start_date: Date | null
      end_date: Date | null
      max_participants: number | null
      current_participants: number
      status: $Enums.CohortStatus
      description: string | null
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["training_cohorts"]>
    composites: {}
  }

  type training_cohortsGetPayload<S extends boolean | null | undefined | training_cohortsDefaultArgs> = $Result.GetResult<Prisma.$training_cohortsPayload, S>

  type training_cohortsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<training_cohortsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Training_cohortsCountAggregateInputType | true
    }

  export interface training_cohortsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['training_cohorts'], meta: { name: 'training_cohorts' } }
    /**
     * Find zero or one Training_cohorts that matches the filter.
     * @param {training_cohortsFindUniqueArgs} args - Arguments to find a Training_cohorts
     * @example
     * // Get one Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends training_cohortsFindUniqueArgs>(args: SelectSubset<T, training_cohortsFindUniqueArgs<ExtArgs>>): Prisma__training_cohortsClient<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Training_cohorts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {training_cohortsFindUniqueOrThrowArgs} args - Arguments to find a Training_cohorts
     * @example
     * // Get one Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends training_cohortsFindUniqueOrThrowArgs>(args: SelectSubset<T, training_cohortsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__training_cohortsClient<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Training_cohorts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_cohortsFindFirstArgs} args - Arguments to find a Training_cohorts
     * @example
     * // Get one Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends training_cohortsFindFirstArgs>(args?: SelectSubset<T, training_cohortsFindFirstArgs<ExtArgs>>): Prisma__training_cohortsClient<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Training_cohorts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_cohortsFindFirstOrThrowArgs} args - Arguments to find a Training_cohorts
     * @example
     * // Get one Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends training_cohortsFindFirstOrThrowArgs>(args?: SelectSubset<T, training_cohortsFindFirstOrThrowArgs<ExtArgs>>): Prisma__training_cohortsClient<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Training_cohorts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_cohortsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.findMany()
     * 
     * // Get first 10 Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const training_cohortsWithIdOnly = await prisma.training_cohorts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends training_cohortsFindManyArgs>(args?: SelectSubset<T, training_cohortsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Training_cohorts.
     * @param {training_cohortsCreateArgs} args - Arguments to create a Training_cohorts.
     * @example
     * // Create one Training_cohorts
     * const Training_cohorts = await prisma.training_cohorts.create({
     *   data: {
     *     // ... data to create a Training_cohorts
     *   }
     * })
     * 
     */
    create<T extends training_cohortsCreateArgs>(args: SelectSubset<T, training_cohortsCreateArgs<ExtArgs>>): Prisma__training_cohortsClient<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Training_cohorts.
     * @param {training_cohortsCreateManyArgs} args - Arguments to create many Training_cohorts.
     * @example
     * // Create many Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends training_cohortsCreateManyArgs>(args?: SelectSubset<T, training_cohortsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Training_cohorts and returns the data saved in the database.
     * @param {training_cohortsCreateManyAndReturnArgs} args - Arguments to create many Training_cohorts.
     * @example
     * // Create many Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Training_cohorts and only return the `id`
     * const training_cohortsWithIdOnly = await prisma.training_cohorts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends training_cohortsCreateManyAndReturnArgs>(args?: SelectSubset<T, training_cohortsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Training_cohorts.
     * @param {training_cohortsDeleteArgs} args - Arguments to delete one Training_cohorts.
     * @example
     * // Delete one Training_cohorts
     * const Training_cohorts = await prisma.training_cohorts.delete({
     *   where: {
     *     // ... filter to delete one Training_cohorts
     *   }
     * })
     * 
     */
    delete<T extends training_cohortsDeleteArgs>(args: SelectSubset<T, training_cohortsDeleteArgs<ExtArgs>>): Prisma__training_cohortsClient<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Training_cohorts.
     * @param {training_cohortsUpdateArgs} args - Arguments to update one Training_cohorts.
     * @example
     * // Update one Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends training_cohortsUpdateArgs>(args: SelectSubset<T, training_cohortsUpdateArgs<ExtArgs>>): Prisma__training_cohortsClient<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Training_cohorts.
     * @param {training_cohortsDeleteManyArgs} args - Arguments to filter Training_cohorts to delete.
     * @example
     * // Delete a few Training_cohorts
     * const { count } = await prisma.training_cohorts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends training_cohortsDeleteManyArgs>(args?: SelectSubset<T, training_cohortsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Training_cohorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_cohortsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends training_cohortsUpdateManyArgs>(args: SelectSubset<T, training_cohortsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Training_cohorts and returns the data updated in the database.
     * @param {training_cohortsUpdateManyAndReturnArgs} args - Arguments to update many Training_cohorts.
     * @example
     * // Update many Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Training_cohorts and only return the `id`
     * const training_cohortsWithIdOnly = await prisma.training_cohorts.updateManyAndReturn({
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
    updateManyAndReturn<T extends training_cohortsUpdateManyAndReturnArgs>(args: SelectSubset<T, training_cohortsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Training_cohorts.
     * @param {training_cohortsUpsertArgs} args - Arguments to update or create a Training_cohorts.
     * @example
     * // Update or create a Training_cohorts
     * const training_cohorts = await prisma.training_cohorts.upsert({
     *   create: {
     *     // ... data to create a Training_cohorts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Training_cohorts we want to update
     *   }
     * })
     */
    upsert<T extends training_cohortsUpsertArgs>(args: SelectSubset<T, training_cohortsUpsertArgs<ExtArgs>>): Prisma__training_cohortsClient<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Training_cohorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_cohortsCountArgs} args - Arguments to filter Training_cohorts to count.
     * @example
     * // Count the number of Training_cohorts
     * const count = await prisma.training_cohorts.count({
     *   where: {
     *     // ... the filter for the Training_cohorts we want to count
     *   }
     * })
    **/
    count<T extends training_cohortsCountArgs>(
      args?: Subset<T, training_cohortsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Training_cohortsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Training_cohorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Training_cohortsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Training_cohortsAggregateArgs>(args: Subset<T, Training_cohortsAggregateArgs>): Prisma.PrismaPromise<GetTraining_cohortsAggregateType<T>>

    /**
     * Group by Training_cohorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {training_cohortsGroupByArgs} args - Group by arguments.
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
      T extends training_cohortsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: training_cohortsGroupByArgs['orderBy'] }
        : { orderBy?: training_cohortsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, training_cohortsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTraining_cohortsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the training_cohorts model
   */
  readonly fields: training_cohortsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for training_cohorts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__training_cohortsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    training_program<T extends training_programsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, training_programsDefaultArgs<ExtArgs>>): Prisma__training_programsClient<$Result.GetResult<Prisma.$training_programsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends training_cohorts$membersArgs<ExtArgs> = {}>(args?: Subset<T, training_cohorts$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    folders<T extends training_cohorts$foldersArgs<ExtArgs> = {}>(args?: Subset<T, training_cohorts$foldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$report_foldersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the training_cohorts model
   */
  interface training_cohortsFieldRefs {
    readonly id: FieldRef<"training_cohorts", 'String'>
    readonly name: FieldRef<"training_cohorts", 'String'>
    readonly training_program_id: FieldRef<"training_cohorts", 'String'>
    readonly year: FieldRef<"training_cohorts", 'String'>
    readonly start_date: FieldRef<"training_cohorts", 'DateTime'>
    readonly end_date: FieldRef<"training_cohorts", 'DateTime'>
    readonly max_participants: FieldRef<"training_cohorts", 'Int'>
    readonly current_participants: FieldRef<"training_cohorts", 'Int'>
    readonly status: FieldRef<"training_cohorts", 'CohortStatus'>
    readonly description: FieldRef<"training_cohorts", 'String'>
    readonly is_active: FieldRef<"training_cohorts", 'Boolean'>
    readonly created_at: FieldRef<"training_cohorts", 'DateTime'>
    readonly updated_at: FieldRef<"training_cohorts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * training_cohorts findUnique
   */
  export type training_cohortsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    /**
     * Filter, which training_cohorts to fetch.
     */
    where: training_cohortsWhereUniqueInput
  }

  /**
   * training_cohorts findUniqueOrThrow
   */
  export type training_cohortsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    /**
     * Filter, which training_cohorts to fetch.
     */
    where: training_cohortsWhereUniqueInput
  }

  /**
   * training_cohorts findFirst
   */
  export type training_cohortsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    /**
     * Filter, which training_cohorts to fetch.
     */
    where?: training_cohortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of training_cohorts to fetch.
     */
    orderBy?: training_cohortsOrderByWithRelationInput | training_cohortsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for training_cohorts.
     */
    cursor?: training_cohortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` training_cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` training_cohorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of training_cohorts.
     */
    distinct?: Training_cohortsScalarFieldEnum | Training_cohortsScalarFieldEnum[]
  }

  /**
   * training_cohorts findFirstOrThrow
   */
  export type training_cohortsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    /**
     * Filter, which training_cohorts to fetch.
     */
    where?: training_cohortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of training_cohorts to fetch.
     */
    orderBy?: training_cohortsOrderByWithRelationInput | training_cohortsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for training_cohorts.
     */
    cursor?: training_cohortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` training_cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` training_cohorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of training_cohorts.
     */
    distinct?: Training_cohortsScalarFieldEnum | Training_cohortsScalarFieldEnum[]
  }

  /**
   * training_cohorts findMany
   */
  export type training_cohortsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    /**
     * Filter, which training_cohorts to fetch.
     */
    where?: training_cohortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of training_cohorts to fetch.
     */
    orderBy?: training_cohortsOrderByWithRelationInput | training_cohortsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing training_cohorts.
     */
    cursor?: training_cohortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` training_cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` training_cohorts.
     */
    skip?: number
    distinct?: Training_cohortsScalarFieldEnum | Training_cohortsScalarFieldEnum[]
  }

  /**
   * training_cohorts create
   */
  export type training_cohortsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    /**
     * The data needed to create a training_cohorts.
     */
    data: XOR<training_cohortsCreateInput, training_cohortsUncheckedCreateInput>
  }

  /**
   * training_cohorts createMany
   */
  export type training_cohortsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many training_cohorts.
     */
    data: training_cohortsCreateManyInput | training_cohortsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * training_cohorts createManyAndReturn
   */
  export type training_cohortsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * The data used to create many training_cohorts.
     */
    data: training_cohortsCreateManyInput | training_cohortsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * training_cohorts update
   */
  export type training_cohortsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    /**
     * The data needed to update a training_cohorts.
     */
    data: XOR<training_cohortsUpdateInput, training_cohortsUncheckedUpdateInput>
    /**
     * Choose, which training_cohorts to update.
     */
    where: training_cohortsWhereUniqueInput
  }

  /**
   * training_cohorts updateMany
   */
  export type training_cohortsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update training_cohorts.
     */
    data: XOR<training_cohortsUpdateManyMutationInput, training_cohortsUncheckedUpdateManyInput>
    /**
     * Filter which training_cohorts to update
     */
    where?: training_cohortsWhereInput
    /**
     * Limit how many training_cohorts to update.
     */
    limit?: number
  }

  /**
   * training_cohorts updateManyAndReturn
   */
  export type training_cohortsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * The data used to update training_cohorts.
     */
    data: XOR<training_cohortsUpdateManyMutationInput, training_cohortsUncheckedUpdateManyInput>
    /**
     * Filter which training_cohorts to update
     */
    where?: training_cohortsWhereInput
    /**
     * Limit how many training_cohorts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * training_cohorts upsert
   */
  export type training_cohortsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    /**
     * The filter to search for the training_cohorts to update in case it exists.
     */
    where: training_cohortsWhereUniqueInput
    /**
     * In case the training_cohorts found by the `where` argument doesn't exist, create a new training_cohorts with this data.
     */
    create: XOR<training_cohortsCreateInput, training_cohortsUncheckedCreateInput>
    /**
     * In case the training_cohorts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<training_cohortsUpdateInput, training_cohortsUncheckedUpdateInput>
  }

  /**
   * training_cohorts delete
   */
  export type training_cohortsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
    /**
     * Filter which training_cohorts to delete.
     */
    where: training_cohortsWhereUniqueInput
  }

  /**
   * training_cohorts deleteMany
   */
  export type training_cohortsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which training_cohorts to delete
     */
    where?: training_cohortsWhereInput
    /**
     * Limit how many training_cohorts to delete.
     */
    limit?: number
  }

  /**
   * training_cohorts.members
   */
  export type training_cohorts$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    where?: cohort_membersWhereInput
    orderBy?: cohort_membersOrderByWithRelationInput | cohort_membersOrderByWithRelationInput[]
    cursor?: cohort_membersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Cohort_membersScalarFieldEnum | Cohort_membersScalarFieldEnum[]
  }

  /**
   * training_cohorts.folders
   */
  export type training_cohorts$foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_folders
     */
    select?: report_foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the report_folders
     */
    omit?: report_foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: report_foldersInclude<ExtArgs> | null
    where?: report_foldersWhereInput
    orderBy?: report_foldersOrderByWithRelationInput | report_foldersOrderByWithRelationInput[]
    cursor?: report_foldersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Report_foldersScalarFieldEnum | Report_foldersScalarFieldEnum[]
  }

  /**
   * training_cohorts without action
   */
  export type training_cohortsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the training_cohorts
     */
    select?: training_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the training_cohorts
     */
    omit?: training_cohortsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: training_cohortsInclude<ExtArgs> | null
  }


  /**
   * Model cohort_members
   */

  export type AggregateCohort_members = {
    _count: Cohort_membersCountAggregateOutputType | null
    _min: Cohort_membersMinAggregateOutputType | null
    _max: Cohort_membersMaxAggregateOutputType | null
  }

  export type Cohort_membersMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    cohort_id: string | null
    joined_at: Date | null
    status: $Enums.MemberStatus | null
    notes: string | null
  }

  export type Cohort_membersMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    cohort_id: string | null
    joined_at: Date | null
    status: $Enums.MemberStatus | null
    notes: string | null
  }

  export type Cohort_membersCountAggregateOutputType = {
    id: number
    user_id: number
    cohort_id: number
    joined_at: number
    status: number
    notes: number
    _all: number
  }


  export type Cohort_membersMinAggregateInputType = {
    id?: true
    user_id?: true
    cohort_id?: true
    joined_at?: true
    status?: true
    notes?: true
  }

  export type Cohort_membersMaxAggregateInputType = {
    id?: true
    user_id?: true
    cohort_id?: true
    joined_at?: true
    status?: true
    notes?: true
  }

  export type Cohort_membersCountAggregateInputType = {
    id?: true
    user_id?: true
    cohort_id?: true
    joined_at?: true
    status?: true
    notes?: true
    _all?: true
  }

  export type Cohort_membersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cohort_members to aggregate.
     */
    where?: cohort_membersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cohort_members to fetch.
     */
    orderBy?: cohort_membersOrderByWithRelationInput | cohort_membersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cohort_membersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cohort_members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cohort_members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cohort_members
    **/
    _count?: true | Cohort_membersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Cohort_membersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Cohort_membersMaxAggregateInputType
  }

  export type GetCohort_membersAggregateType<T extends Cohort_membersAggregateArgs> = {
        [P in keyof T & keyof AggregateCohort_members]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCohort_members[P]>
      : GetScalarType<T[P], AggregateCohort_members[P]>
  }




  export type cohort_membersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cohort_membersWhereInput
    orderBy?: cohort_membersOrderByWithAggregationInput | cohort_membersOrderByWithAggregationInput[]
    by: Cohort_membersScalarFieldEnum[] | Cohort_membersScalarFieldEnum
    having?: cohort_membersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Cohort_membersCountAggregateInputType | true
    _min?: Cohort_membersMinAggregateInputType
    _max?: Cohort_membersMaxAggregateInputType
  }

  export type Cohort_membersGroupByOutputType = {
    id: string
    user_id: string
    cohort_id: string
    joined_at: Date
    status: $Enums.MemberStatus
    notes: string | null
    _count: Cohort_membersCountAggregateOutputType | null
    _min: Cohort_membersMinAggregateOutputType | null
    _max: Cohort_membersMaxAggregateOutputType | null
  }

  type GetCohort_membersGroupByPayload<T extends cohort_membersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Cohort_membersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Cohort_membersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Cohort_membersGroupByOutputType[P]>
            : GetScalarType<T[P], Cohort_membersGroupByOutputType[P]>
        }
      >
    >


  export type cohort_membersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    cohort_id?: boolean
    joined_at?: boolean
    status?: boolean
    notes?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    cohort?: boolean | training_cohortsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cohort_members"]>

  export type cohort_membersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    cohort_id?: boolean
    joined_at?: boolean
    status?: boolean
    notes?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    cohort?: boolean | training_cohortsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cohort_members"]>

  export type cohort_membersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    cohort_id?: boolean
    joined_at?: boolean
    status?: boolean
    notes?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    cohort?: boolean | training_cohortsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cohort_members"]>

  export type cohort_membersSelectScalar = {
    id?: boolean
    user_id?: boolean
    cohort_id?: boolean
    joined_at?: boolean
    status?: boolean
    notes?: boolean
  }

  export type cohort_membersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "cohort_id" | "joined_at" | "status" | "notes", ExtArgs["result"]["cohort_members"]>
  export type cohort_membersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    cohort?: boolean | training_cohortsDefaultArgs<ExtArgs>
  }
  export type cohort_membersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    cohort?: boolean | training_cohortsDefaultArgs<ExtArgs>
  }
  export type cohort_membersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    cohort?: boolean | training_cohortsDefaultArgs<ExtArgs>
  }

  export type $cohort_membersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cohort_members"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      cohort: Prisma.$training_cohortsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      cohort_id: string
      joined_at: Date
      status: $Enums.MemberStatus
      notes: string | null
    }, ExtArgs["result"]["cohort_members"]>
    composites: {}
  }

  type cohort_membersGetPayload<S extends boolean | null | undefined | cohort_membersDefaultArgs> = $Result.GetResult<Prisma.$cohort_membersPayload, S>

  type cohort_membersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cohort_membersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Cohort_membersCountAggregateInputType | true
    }

  export interface cohort_membersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cohort_members'], meta: { name: 'cohort_members' } }
    /**
     * Find zero or one Cohort_members that matches the filter.
     * @param {cohort_membersFindUniqueArgs} args - Arguments to find a Cohort_members
     * @example
     * // Get one Cohort_members
     * const cohort_members = await prisma.cohort_members.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cohort_membersFindUniqueArgs>(args: SelectSubset<T, cohort_membersFindUniqueArgs<ExtArgs>>): Prisma__cohort_membersClient<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cohort_members that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cohort_membersFindUniqueOrThrowArgs} args - Arguments to find a Cohort_members
     * @example
     * // Get one Cohort_members
     * const cohort_members = await prisma.cohort_members.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cohort_membersFindUniqueOrThrowArgs>(args: SelectSubset<T, cohort_membersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cohort_membersClient<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cohort_members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cohort_membersFindFirstArgs} args - Arguments to find a Cohort_members
     * @example
     * // Get one Cohort_members
     * const cohort_members = await prisma.cohort_members.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cohort_membersFindFirstArgs>(args?: SelectSubset<T, cohort_membersFindFirstArgs<ExtArgs>>): Prisma__cohort_membersClient<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cohort_members that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cohort_membersFindFirstOrThrowArgs} args - Arguments to find a Cohort_members
     * @example
     * // Get one Cohort_members
     * const cohort_members = await prisma.cohort_members.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cohort_membersFindFirstOrThrowArgs>(args?: SelectSubset<T, cohort_membersFindFirstOrThrowArgs<ExtArgs>>): Prisma__cohort_membersClient<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cohort_members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cohort_membersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cohort_members
     * const cohort_members = await prisma.cohort_members.findMany()
     * 
     * // Get first 10 Cohort_members
     * const cohort_members = await prisma.cohort_members.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cohort_membersWithIdOnly = await prisma.cohort_members.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cohort_membersFindManyArgs>(args?: SelectSubset<T, cohort_membersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cohort_members.
     * @param {cohort_membersCreateArgs} args - Arguments to create a Cohort_members.
     * @example
     * // Create one Cohort_members
     * const Cohort_members = await prisma.cohort_members.create({
     *   data: {
     *     // ... data to create a Cohort_members
     *   }
     * })
     * 
     */
    create<T extends cohort_membersCreateArgs>(args: SelectSubset<T, cohort_membersCreateArgs<ExtArgs>>): Prisma__cohort_membersClient<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cohort_members.
     * @param {cohort_membersCreateManyArgs} args - Arguments to create many Cohort_members.
     * @example
     * // Create many Cohort_members
     * const cohort_members = await prisma.cohort_members.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cohort_membersCreateManyArgs>(args?: SelectSubset<T, cohort_membersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cohort_members and returns the data saved in the database.
     * @param {cohort_membersCreateManyAndReturnArgs} args - Arguments to create many Cohort_members.
     * @example
     * // Create many Cohort_members
     * const cohort_members = await prisma.cohort_members.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cohort_members and only return the `id`
     * const cohort_membersWithIdOnly = await prisma.cohort_members.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cohort_membersCreateManyAndReturnArgs>(args?: SelectSubset<T, cohort_membersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cohort_members.
     * @param {cohort_membersDeleteArgs} args - Arguments to delete one Cohort_members.
     * @example
     * // Delete one Cohort_members
     * const Cohort_members = await prisma.cohort_members.delete({
     *   where: {
     *     // ... filter to delete one Cohort_members
     *   }
     * })
     * 
     */
    delete<T extends cohort_membersDeleteArgs>(args: SelectSubset<T, cohort_membersDeleteArgs<ExtArgs>>): Prisma__cohort_membersClient<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cohort_members.
     * @param {cohort_membersUpdateArgs} args - Arguments to update one Cohort_members.
     * @example
     * // Update one Cohort_members
     * const cohort_members = await prisma.cohort_members.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cohort_membersUpdateArgs>(args: SelectSubset<T, cohort_membersUpdateArgs<ExtArgs>>): Prisma__cohort_membersClient<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cohort_members.
     * @param {cohort_membersDeleteManyArgs} args - Arguments to filter Cohort_members to delete.
     * @example
     * // Delete a few Cohort_members
     * const { count } = await prisma.cohort_members.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cohort_membersDeleteManyArgs>(args?: SelectSubset<T, cohort_membersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cohort_members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cohort_membersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cohort_members
     * const cohort_members = await prisma.cohort_members.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cohort_membersUpdateManyArgs>(args: SelectSubset<T, cohort_membersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cohort_members and returns the data updated in the database.
     * @param {cohort_membersUpdateManyAndReturnArgs} args - Arguments to update many Cohort_members.
     * @example
     * // Update many Cohort_members
     * const cohort_members = await prisma.cohort_members.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cohort_members and only return the `id`
     * const cohort_membersWithIdOnly = await prisma.cohort_members.updateManyAndReturn({
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
    updateManyAndReturn<T extends cohort_membersUpdateManyAndReturnArgs>(args: SelectSubset<T, cohort_membersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cohort_members.
     * @param {cohort_membersUpsertArgs} args - Arguments to update or create a Cohort_members.
     * @example
     * // Update or create a Cohort_members
     * const cohort_members = await prisma.cohort_members.upsert({
     *   create: {
     *     // ... data to create a Cohort_members
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cohort_members we want to update
     *   }
     * })
     */
    upsert<T extends cohort_membersUpsertArgs>(args: SelectSubset<T, cohort_membersUpsertArgs<ExtArgs>>): Prisma__cohort_membersClient<$Result.GetResult<Prisma.$cohort_membersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cohort_members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cohort_membersCountArgs} args - Arguments to filter Cohort_members to count.
     * @example
     * // Count the number of Cohort_members
     * const count = await prisma.cohort_members.count({
     *   where: {
     *     // ... the filter for the Cohort_members we want to count
     *   }
     * })
    **/
    count<T extends cohort_membersCountArgs>(
      args?: Subset<T, cohort_membersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Cohort_membersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cohort_members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Cohort_membersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Cohort_membersAggregateArgs>(args: Subset<T, Cohort_membersAggregateArgs>): Prisma.PrismaPromise<GetCohort_membersAggregateType<T>>

    /**
     * Group by Cohort_members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cohort_membersGroupByArgs} args - Group by arguments.
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
      T extends cohort_membersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cohort_membersGroupByArgs['orderBy'] }
        : { orderBy?: cohort_membersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, cohort_membersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCohort_membersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cohort_members model
   */
  readonly fields: cohort_membersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cohort_members.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cohort_membersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cohort<T extends training_cohortsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, training_cohortsDefaultArgs<ExtArgs>>): Prisma__training_cohortsClient<$Result.GetResult<Prisma.$training_cohortsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the cohort_members model
   */
  interface cohort_membersFieldRefs {
    readonly id: FieldRef<"cohort_members", 'String'>
    readonly user_id: FieldRef<"cohort_members", 'String'>
    readonly cohort_id: FieldRef<"cohort_members", 'String'>
    readonly joined_at: FieldRef<"cohort_members", 'DateTime'>
    readonly status: FieldRef<"cohort_members", 'MemberStatus'>
    readonly notes: FieldRef<"cohort_members", 'String'>
  }
    

  // Custom InputTypes
  /**
   * cohort_members findUnique
   */
  export type cohort_membersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    /**
     * Filter, which cohort_members to fetch.
     */
    where: cohort_membersWhereUniqueInput
  }

  /**
   * cohort_members findUniqueOrThrow
   */
  export type cohort_membersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    /**
     * Filter, which cohort_members to fetch.
     */
    where: cohort_membersWhereUniqueInput
  }

  /**
   * cohort_members findFirst
   */
  export type cohort_membersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    /**
     * Filter, which cohort_members to fetch.
     */
    where?: cohort_membersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cohort_members to fetch.
     */
    orderBy?: cohort_membersOrderByWithRelationInput | cohort_membersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cohort_members.
     */
    cursor?: cohort_membersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cohort_members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cohort_members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cohort_members.
     */
    distinct?: Cohort_membersScalarFieldEnum | Cohort_membersScalarFieldEnum[]
  }

  /**
   * cohort_members findFirstOrThrow
   */
  export type cohort_membersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    /**
     * Filter, which cohort_members to fetch.
     */
    where?: cohort_membersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cohort_members to fetch.
     */
    orderBy?: cohort_membersOrderByWithRelationInput | cohort_membersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cohort_members.
     */
    cursor?: cohort_membersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cohort_members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cohort_members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cohort_members.
     */
    distinct?: Cohort_membersScalarFieldEnum | Cohort_membersScalarFieldEnum[]
  }

  /**
   * cohort_members findMany
   */
  export type cohort_membersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    /**
     * Filter, which cohort_members to fetch.
     */
    where?: cohort_membersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cohort_members to fetch.
     */
    orderBy?: cohort_membersOrderByWithRelationInput | cohort_membersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cohort_members.
     */
    cursor?: cohort_membersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cohort_members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cohort_members.
     */
    skip?: number
    distinct?: Cohort_membersScalarFieldEnum | Cohort_membersScalarFieldEnum[]
  }

  /**
   * cohort_members create
   */
  export type cohort_membersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    /**
     * The data needed to create a cohort_members.
     */
    data: XOR<cohort_membersCreateInput, cohort_membersUncheckedCreateInput>
  }

  /**
   * cohort_members createMany
   */
  export type cohort_membersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cohort_members.
     */
    data: cohort_membersCreateManyInput | cohort_membersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cohort_members createManyAndReturn
   */
  export type cohort_membersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * The data used to create many cohort_members.
     */
    data: cohort_membersCreateManyInput | cohort_membersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * cohort_members update
   */
  export type cohort_membersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    /**
     * The data needed to update a cohort_members.
     */
    data: XOR<cohort_membersUpdateInput, cohort_membersUncheckedUpdateInput>
    /**
     * Choose, which cohort_members to update.
     */
    where: cohort_membersWhereUniqueInput
  }

  /**
   * cohort_members updateMany
   */
  export type cohort_membersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cohort_members.
     */
    data: XOR<cohort_membersUpdateManyMutationInput, cohort_membersUncheckedUpdateManyInput>
    /**
     * Filter which cohort_members to update
     */
    where?: cohort_membersWhereInput
    /**
     * Limit how many cohort_members to update.
     */
    limit?: number
  }

  /**
   * cohort_members updateManyAndReturn
   */
  export type cohort_membersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * The data used to update cohort_members.
     */
    data: XOR<cohort_membersUpdateManyMutationInput, cohort_membersUncheckedUpdateManyInput>
    /**
     * Filter which cohort_members to update
     */
    where?: cohort_membersWhereInput
    /**
     * Limit how many cohort_members to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * cohort_members upsert
   */
  export type cohort_membersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    /**
     * The filter to search for the cohort_members to update in case it exists.
     */
    where: cohort_membersWhereUniqueInput
    /**
     * In case the cohort_members found by the `where` argument doesn't exist, create a new cohort_members with this data.
     */
    create: XOR<cohort_membersCreateInput, cohort_membersUncheckedCreateInput>
    /**
     * In case the cohort_members was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cohort_membersUpdateInput, cohort_membersUncheckedUpdateInput>
  }

  /**
   * cohort_members delete
   */
  export type cohort_membersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
    /**
     * Filter which cohort_members to delete.
     */
    where: cohort_membersWhereUniqueInput
  }

  /**
   * cohort_members deleteMany
   */
  export type cohort_membersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cohort_members to delete
     */
    where?: cohort_membersWhereInput
    /**
     * Limit how many cohort_members to delete.
     */
    limit?: number
  }

  /**
   * cohort_members without action
   */
  export type cohort_membersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cohort_members
     */
    select?: cohort_membersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cohort_members
     */
    omit?: cohort_membersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cohort_membersInclude<ExtArgs> | null
  }


  /**
   * Model master_years
   */

  export type AggregateMaster_years = {
    _count: Master_yearsCountAggregateOutputType | null
    _min: Master_yearsMinAggregateOutputType | null
    _max: Master_yearsMaxAggregateOutputType | null
  }

  export type Master_yearsMinAggregateOutputType = {
    id: string | null
    year: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Master_yearsMaxAggregateOutputType = {
    id: string | null
    year: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Master_yearsCountAggregateOutputType = {
    id: number
    year: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Master_yearsMinAggregateInputType = {
    id?: true
    year?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Master_yearsMaxAggregateInputType = {
    id?: true
    year?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Master_yearsCountAggregateInputType = {
    id?: true
    year?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Master_yearsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which master_years to aggregate.
     */
    where?: master_yearsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of master_years to fetch.
     */
    orderBy?: master_yearsOrderByWithRelationInput | master_yearsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: master_yearsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` master_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` master_years.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned master_years
    **/
    _count?: true | Master_yearsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Master_yearsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Master_yearsMaxAggregateInputType
  }

  export type GetMaster_yearsAggregateType<T extends Master_yearsAggregateArgs> = {
        [P in keyof T & keyof AggregateMaster_years]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaster_years[P]>
      : GetScalarType<T[P], AggregateMaster_years[P]>
  }




  export type master_yearsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: master_yearsWhereInput
    orderBy?: master_yearsOrderByWithAggregationInput | master_yearsOrderByWithAggregationInput[]
    by: Master_yearsScalarFieldEnum[] | Master_yearsScalarFieldEnum
    having?: master_yearsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Master_yearsCountAggregateInputType | true
    _min?: Master_yearsMinAggregateInputType
    _max?: Master_yearsMaxAggregateInputType
  }

  export type Master_yearsGroupByOutputType = {
    id: string
    year: string
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: Master_yearsCountAggregateOutputType | null
    _min: Master_yearsMinAggregateOutputType | null
    _max: Master_yearsMaxAggregateOutputType | null
  }

  type GetMaster_yearsGroupByPayload<T extends master_yearsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Master_yearsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Master_yearsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Master_yearsGroupByOutputType[P]>
            : GetScalarType<T[P], Master_yearsGroupByOutputType[P]>
        }
      >
    >


  export type master_yearsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["master_years"]>

  export type master_yearsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["master_years"]>

  export type master_yearsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["master_years"]>

  export type master_yearsSelectScalar = {
    id?: boolean
    year?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type master_yearsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["master_years"]>

  export type $master_yearsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "master_years"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      year: string
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["master_years"]>
    composites: {}
  }

  type master_yearsGetPayload<S extends boolean | null | undefined | master_yearsDefaultArgs> = $Result.GetResult<Prisma.$master_yearsPayload, S>

  type master_yearsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<master_yearsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Master_yearsCountAggregateInputType | true
    }

  export interface master_yearsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['master_years'], meta: { name: 'master_years' } }
    /**
     * Find zero or one Master_years that matches the filter.
     * @param {master_yearsFindUniqueArgs} args - Arguments to find a Master_years
     * @example
     * // Get one Master_years
     * const master_years = await prisma.master_years.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends master_yearsFindUniqueArgs>(args: SelectSubset<T, master_yearsFindUniqueArgs<ExtArgs>>): Prisma__master_yearsClient<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Master_years that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {master_yearsFindUniqueOrThrowArgs} args - Arguments to find a Master_years
     * @example
     * // Get one Master_years
     * const master_years = await prisma.master_years.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends master_yearsFindUniqueOrThrowArgs>(args: SelectSubset<T, master_yearsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__master_yearsClient<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Master_years that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_yearsFindFirstArgs} args - Arguments to find a Master_years
     * @example
     * // Get one Master_years
     * const master_years = await prisma.master_years.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends master_yearsFindFirstArgs>(args?: SelectSubset<T, master_yearsFindFirstArgs<ExtArgs>>): Prisma__master_yearsClient<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Master_years that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_yearsFindFirstOrThrowArgs} args - Arguments to find a Master_years
     * @example
     * // Get one Master_years
     * const master_years = await prisma.master_years.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends master_yearsFindFirstOrThrowArgs>(args?: SelectSubset<T, master_yearsFindFirstOrThrowArgs<ExtArgs>>): Prisma__master_yearsClient<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Master_years that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_yearsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Master_years
     * const master_years = await prisma.master_years.findMany()
     * 
     * // Get first 10 Master_years
     * const master_years = await prisma.master_years.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const master_yearsWithIdOnly = await prisma.master_years.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends master_yearsFindManyArgs>(args?: SelectSubset<T, master_yearsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Master_years.
     * @param {master_yearsCreateArgs} args - Arguments to create a Master_years.
     * @example
     * // Create one Master_years
     * const Master_years = await prisma.master_years.create({
     *   data: {
     *     // ... data to create a Master_years
     *   }
     * })
     * 
     */
    create<T extends master_yearsCreateArgs>(args: SelectSubset<T, master_yearsCreateArgs<ExtArgs>>): Prisma__master_yearsClient<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Master_years.
     * @param {master_yearsCreateManyArgs} args - Arguments to create many Master_years.
     * @example
     * // Create many Master_years
     * const master_years = await prisma.master_years.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends master_yearsCreateManyArgs>(args?: SelectSubset<T, master_yearsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Master_years and returns the data saved in the database.
     * @param {master_yearsCreateManyAndReturnArgs} args - Arguments to create many Master_years.
     * @example
     * // Create many Master_years
     * const master_years = await prisma.master_years.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Master_years and only return the `id`
     * const master_yearsWithIdOnly = await prisma.master_years.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends master_yearsCreateManyAndReturnArgs>(args?: SelectSubset<T, master_yearsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Master_years.
     * @param {master_yearsDeleteArgs} args - Arguments to delete one Master_years.
     * @example
     * // Delete one Master_years
     * const Master_years = await prisma.master_years.delete({
     *   where: {
     *     // ... filter to delete one Master_years
     *   }
     * })
     * 
     */
    delete<T extends master_yearsDeleteArgs>(args: SelectSubset<T, master_yearsDeleteArgs<ExtArgs>>): Prisma__master_yearsClient<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Master_years.
     * @param {master_yearsUpdateArgs} args - Arguments to update one Master_years.
     * @example
     * // Update one Master_years
     * const master_years = await prisma.master_years.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends master_yearsUpdateArgs>(args: SelectSubset<T, master_yearsUpdateArgs<ExtArgs>>): Prisma__master_yearsClient<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Master_years.
     * @param {master_yearsDeleteManyArgs} args - Arguments to filter Master_years to delete.
     * @example
     * // Delete a few Master_years
     * const { count } = await prisma.master_years.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends master_yearsDeleteManyArgs>(args?: SelectSubset<T, master_yearsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Master_years.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_yearsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Master_years
     * const master_years = await prisma.master_years.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends master_yearsUpdateManyArgs>(args: SelectSubset<T, master_yearsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Master_years and returns the data updated in the database.
     * @param {master_yearsUpdateManyAndReturnArgs} args - Arguments to update many Master_years.
     * @example
     * // Update many Master_years
     * const master_years = await prisma.master_years.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Master_years and only return the `id`
     * const master_yearsWithIdOnly = await prisma.master_years.updateManyAndReturn({
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
    updateManyAndReturn<T extends master_yearsUpdateManyAndReturnArgs>(args: SelectSubset<T, master_yearsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Master_years.
     * @param {master_yearsUpsertArgs} args - Arguments to update or create a Master_years.
     * @example
     * // Update or create a Master_years
     * const master_years = await prisma.master_years.upsert({
     *   create: {
     *     // ... data to create a Master_years
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Master_years we want to update
     *   }
     * })
     */
    upsert<T extends master_yearsUpsertArgs>(args: SelectSubset<T, master_yearsUpsertArgs<ExtArgs>>): Prisma__master_yearsClient<$Result.GetResult<Prisma.$master_yearsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Master_years.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_yearsCountArgs} args - Arguments to filter Master_years to count.
     * @example
     * // Count the number of Master_years
     * const count = await prisma.master_years.count({
     *   where: {
     *     // ... the filter for the Master_years we want to count
     *   }
     * })
    **/
    count<T extends master_yearsCountArgs>(
      args?: Subset<T, master_yearsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Master_yearsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Master_years.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Master_yearsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Master_yearsAggregateArgs>(args: Subset<T, Master_yearsAggregateArgs>): Prisma.PrismaPromise<GetMaster_yearsAggregateType<T>>

    /**
     * Group by Master_years.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_yearsGroupByArgs} args - Group by arguments.
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
      T extends master_yearsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: master_yearsGroupByArgs['orderBy'] }
        : { orderBy?: master_yearsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, master_yearsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaster_yearsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the master_years model
   */
  readonly fields: master_yearsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for master_years.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__master_yearsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the master_years model
   */
  interface master_yearsFieldRefs {
    readonly id: FieldRef<"master_years", 'String'>
    readonly year: FieldRef<"master_years", 'String'>
    readonly is_active: FieldRef<"master_years", 'Boolean'>
    readonly created_at: FieldRef<"master_years", 'DateTime'>
    readonly updated_at: FieldRef<"master_years", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * master_years findUnique
   */
  export type master_yearsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * Filter, which master_years to fetch.
     */
    where: master_yearsWhereUniqueInput
  }

  /**
   * master_years findUniqueOrThrow
   */
  export type master_yearsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * Filter, which master_years to fetch.
     */
    where: master_yearsWhereUniqueInput
  }

  /**
   * master_years findFirst
   */
  export type master_yearsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * Filter, which master_years to fetch.
     */
    where?: master_yearsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of master_years to fetch.
     */
    orderBy?: master_yearsOrderByWithRelationInput | master_yearsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for master_years.
     */
    cursor?: master_yearsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` master_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` master_years.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of master_years.
     */
    distinct?: Master_yearsScalarFieldEnum | Master_yearsScalarFieldEnum[]
  }

  /**
   * master_years findFirstOrThrow
   */
  export type master_yearsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * Filter, which master_years to fetch.
     */
    where?: master_yearsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of master_years to fetch.
     */
    orderBy?: master_yearsOrderByWithRelationInput | master_yearsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for master_years.
     */
    cursor?: master_yearsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` master_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` master_years.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of master_years.
     */
    distinct?: Master_yearsScalarFieldEnum | Master_yearsScalarFieldEnum[]
  }

  /**
   * master_years findMany
   */
  export type master_yearsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * Filter, which master_years to fetch.
     */
    where?: master_yearsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of master_years to fetch.
     */
    orderBy?: master_yearsOrderByWithRelationInput | master_yearsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing master_years.
     */
    cursor?: master_yearsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` master_years from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` master_years.
     */
    skip?: number
    distinct?: Master_yearsScalarFieldEnum | Master_yearsScalarFieldEnum[]
  }

  /**
   * master_years create
   */
  export type master_yearsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * The data needed to create a master_years.
     */
    data: XOR<master_yearsCreateInput, master_yearsUncheckedCreateInput>
  }

  /**
   * master_years createMany
   */
  export type master_yearsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many master_years.
     */
    data: master_yearsCreateManyInput | master_yearsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * master_years createManyAndReturn
   */
  export type master_yearsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * The data used to create many master_years.
     */
    data: master_yearsCreateManyInput | master_yearsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * master_years update
   */
  export type master_yearsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * The data needed to update a master_years.
     */
    data: XOR<master_yearsUpdateInput, master_yearsUncheckedUpdateInput>
    /**
     * Choose, which master_years to update.
     */
    where: master_yearsWhereUniqueInput
  }

  /**
   * master_years updateMany
   */
  export type master_yearsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update master_years.
     */
    data: XOR<master_yearsUpdateManyMutationInput, master_yearsUncheckedUpdateManyInput>
    /**
     * Filter which master_years to update
     */
    where?: master_yearsWhereInput
    /**
     * Limit how many master_years to update.
     */
    limit?: number
  }

  /**
   * master_years updateManyAndReturn
   */
  export type master_yearsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * The data used to update master_years.
     */
    data: XOR<master_yearsUpdateManyMutationInput, master_yearsUncheckedUpdateManyInput>
    /**
     * Filter which master_years to update
     */
    where?: master_yearsWhereInput
    /**
     * Limit how many master_years to update.
     */
    limit?: number
  }

  /**
   * master_years upsert
   */
  export type master_yearsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * The filter to search for the master_years to update in case it exists.
     */
    where: master_yearsWhereUniqueInput
    /**
     * In case the master_years found by the `where` argument doesn't exist, create a new master_years with this data.
     */
    create: XOR<master_yearsCreateInput, master_yearsUncheckedCreateInput>
    /**
     * In case the master_years was found with the provided `where` argument, update it with this data.
     */
    update: XOR<master_yearsUpdateInput, master_yearsUncheckedUpdateInput>
  }

  /**
   * master_years delete
   */
  export type master_yearsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
    /**
     * Filter which master_years to delete.
     */
    where: master_yearsWhereUniqueInput
  }

  /**
   * master_years deleteMany
   */
  export type master_yearsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which master_years to delete
     */
    where?: master_yearsWhereInput
    /**
     * Limit how many master_years to delete.
     */
    limit?: number
  }

  /**
   * master_years without action
   */
  export type master_yearsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_years
     */
    select?: master_yearsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_years
     */
    omit?: master_yearsOmit<ExtArgs> | null
  }


  /**
   * Model master_cohorts
   */

  export type AggregateMaster_cohorts = {
    _count: Master_cohortsCountAggregateOutputType | null
    _min: Master_cohortsMinAggregateOutputType | null
    _max: Master_cohortsMaxAggregateOutputType | null
  }

  export type Master_cohortsMinAggregateOutputType = {
    id: string | null
    name: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Master_cohortsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Master_cohortsCountAggregateOutputType = {
    id: number
    name: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Master_cohortsMinAggregateInputType = {
    id?: true
    name?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Master_cohortsMaxAggregateInputType = {
    id?: true
    name?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Master_cohortsCountAggregateInputType = {
    id?: true
    name?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Master_cohortsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which master_cohorts to aggregate.
     */
    where?: master_cohortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of master_cohorts to fetch.
     */
    orderBy?: master_cohortsOrderByWithRelationInput | master_cohortsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: master_cohortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` master_cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` master_cohorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned master_cohorts
    **/
    _count?: true | Master_cohortsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Master_cohortsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Master_cohortsMaxAggregateInputType
  }

  export type GetMaster_cohortsAggregateType<T extends Master_cohortsAggregateArgs> = {
        [P in keyof T & keyof AggregateMaster_cohorts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaster_cohorts[P]>
      : GetScalarType<T[P], AggregateMaster_cohorts[P]>
  }




  export type master_cohortsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: master_cohortsWhereInput
    orderBy?: master_cohortsOrderByWithAggregationInput | master_cohortsOrderByWithAggregationInput[]
    by: Master_cohortsScalarFieldEnum[] | Master_cohortsScalarFieldEnum
    having?: master_cohortsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Master_cohortsCountAggregateInputType | true
    _min?: Master_cohortsMinAggregateInputType
    _max?: Master_cohortsMaxAggregateInputType
  }

  export type Master_cohortsGroupByOutputType = {
    id: string
    name: string
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: Master_cohortsCountAggregateOutputType | null
    _min: Master_cohortsMinAggregateOutputType | null
    _max: Master_cohortsMaxAggregateOutputType | null
  }

  type GetMaster_cohortsGroupByPayload<T extends master_cohortsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Master_cohortsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Master_cohortsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Master_cohortsGroupByOutputType[P]>
            : GetScalarType<T[P], Master_cohortsGroupByOutputType[P]>
        }
      >
    >


  export type master_cohortsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["master_cohorts"]>

  export type master_cohortsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["master_cohorts"]>

  export type master_cohortsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["master_cohorts"]>

  export type master_cohortsSelectScalar = {
    id?: boolean
    name?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type master_cohortsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["master_cohorts"]>

  export type $master_cohortsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "master_cohorts"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["master_cohorts"]>
    composites: {}
  }

  type master_cohortsGetPayload<S extends boolean | null | undefined | master_cohortsDefaultArgs> = $Result.GetResult<Prisma.$master_cohortsPayload, S>

  type master_cohortsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<master_cohortsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Master_cohortsCountAggregateInputType | true
    }

  export interface master_cohortsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['master_cohorts'], meta: { name: 'master_cohorts' } }
    /**
     * Find zero or one Master_cohorts that matches the filter.
     * @param {master_cohortsFindUniqueArgs} args - Arguments to find a Master_cohorts
     * @example
     * // Get one Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends master_cohortsFindUniqueArgs>(args: SelectSubset<T, master_cohortsFindUniqueArgs<ExtArgs>>): Prisma__master_cohortsClient<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Master_cohorts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {master_cohortsFindUniqueOrThrowArgs} args - Arguments to find a Master_cohorts
     * @example
     * // Get one Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends master_cohortsFindUniqueOrThrowArgs>(args: SelectSubset<T, master_cohortsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__master_cohortsClient<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Master_cohorts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_cohortsFindFirstArgs} args - Arguments to find a Master_cohorts
     * @example
     * // Get one Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends master_cohortsFindFirstArgs>(args?: SelectSubset<T, master_cohortsFindFirstArgs<ExtArgs>>): Prisma__master_cohortsClient<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Master_cohorts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_cohortsFindFirstOrThrowArgs} args - Arguments to find a Master_cohorts
     * @example
     * // Get one Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends master_cohortsFindFirstOrThrowArgs>(args?: SelectSubset<T, master_cohortsFindFirstOrThrowArgs<ExtArgs>>): Prisma__master_cohortsClient<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Master_cohorts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_cohortsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.findMany()
     * 
     * // Get first 10 Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const master_cohortsWithIdOnly = await prisma.master_cohorts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends master_cohortsFindManyArgs>(args?: SelectSubset<T, master_cohortsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Master_cohorts.
     * @param {master_cohortsCreateArgs} args - Arguments to create a Master_cohorts.
     * @example
     * // Create one Master_cohorts
     * const Master_cohorts = await prisma.master_cohorts.create({
     *   data: {
     *     // ... data to create a Master_cohorts
     *   }
     * })
     * 
     */
    create<T extends master_cohortsCreateArgs>(args: SelectSubset<T, master_cohortsCreateArgs<ExtArgs>>): Prisma__master_cohortsClient<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Master_cohorts.
     * @param {master_cohortsCreateManyArgs} args - Arguments to create many Master_cohorts.
     * @example
     * // Create many Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends master_cohortsCreateManyArgs>(args?: SelectSubset<T, master_cohortsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Master_cohorts and returns the data saved in the database.
     * @param {master_cohortsCreateManyAndReturnArgs} args - Arguments to create many Master_cohorts.
     * @example
     * // Create many Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Master_cohorts and only return the `id`
     * const master_cohortsWithIdOnly = await prisma.master_cohorts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends master_cohortsCreateManyAndReturnArgs>(args?: SelectSubset<T, master_cohortsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Master_cohorts.
     * @param {master_cohortsDeleteArgs} args - Arguments to delete one Master_cohorts.
     * @example
     * // Delete one Master_cohorts
     * const Master_cohorts = await prisma.master_cohorts.delete({
     *   where: {
     *     // ... filter to delete one Master_cohorts
     *   }
     * })
     * 
     */
    delete<T extends master_cohortsDeleteArgs>(args: SelectSubset<T, master_cohortsDeleteArgs<ExtArgs>>): Prisma__master_cohortsClient<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Master_cohorts.
     * @param {master_cohortsUpdateArgs} args - Arguments to update one Master_cohorts.
     * @example
     * // Update one Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends master_cohortsUpdateArgs>(args: SelectSubset<T, master_cohortsUpdateArgs<ExtArgs>>): Prisma__master_cohortsClient<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Master_cohorts.
     * @param {master_cohortsDeleteManyArgs} args - Arguments to filter Master_cohorts to delete.
     * @example
     * // Delete a few Master_cohorts
     * const { count } = await prisma.master_cohorts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends master_cohortsDeleteManyArgs>(args?: SelectSubset<T, master_cohortsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Master_cohorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_cohortsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends master_cohortsUpdateManyArgs>(args: SelectSubset<T, master_cohortsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Master_cohorts and returns the data updated in the database.
     * @param {master_cohortsUpdateManyAndReturnArgs} args - Arguments to update many Master_cohorts.
     * @example
     * // Update many Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Master_cohorts and only return the `id`
     * const master_cohortsWithIdOnly = await prisma.master_cohorts.updateManyAndReturn({
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
    updateManyAndReturn<T extends master_cohortsUpdateManyAndReturnArgs>(args: SelectSubset<T, master_cohortsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Master_cohorts.
     * @param {master_cohortsUpsertArgs} args - Arguments to update or create a Master_cohorts.
     * @example
     * // Update or create a Master_cohorts
     * const master_cohorts = await prisma.master_cohorts.upsert({
     *   create: {
     *     // ... data to create a Master_cohorts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Master_cohorts we want to update
     *   }
     * })
     */
    upsert<T extends master_cohortsUpsertArgs>(args: SelectSubset<T, master_cohortsUpsertArgs<ExtArgs>>): Prisma__master_cohortsClient<$Result.GetResult<Prisma.$master_cohortsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Master_cohorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_cohortsCountArgs} args - Arguments to filter Master_cohorts to count.
     * @example
     * // Count the number of Master_cohorts
     * const count = await prisma.master_cohorts.count({
     *   where: {
     *     // ... the filter for the Master_cohorts we want to count
     *   }
     * })
    **/
    count<T extends master_cohortsCountArgs>(
      args?: Subset<T, master_cohortsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Master_cohortsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Master_cohorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Master_cohortsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Master_cohortsAggregateArgs>(args: Subset<T, Master_cohortsAggregateArgs>): Prisma.PrismaPromise<GetMaster_cohortsAggregateType<T>>

    /**
     * Group by Master_cohorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {master_cohortsGroupByArgs} args - Group by arguments.
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
      T extends master_cohortsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: master_cohortsGroupByArgs['orderBy'] }
        : { orderBy?: master_cohortsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, master_cohortsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaster_cohortsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the master_cohorts model
   */
  readonly fields: master_cohortsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for master_cohorts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__master_cohortsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the master_cohorts model
   */
  interface master_cohortsFieldRefs {
    readonly id: FieldRef<"master_cohorts", 'String'>
    readonly name: FieldRef<"master_cohorts", 'String'>
    readonly is_active: FieldRef<"master_cohorts", 'Boolean'>
    readonly created_at: FieldRef<"master_cohorts", 'DateTime'>
    readonly updated_at: FieldRef<"master_cohorts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * master_cohorts findUnique
   */
  export type master_cohortsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * Filter, which master_cohorts to fetch.
     */
    where: master_cohortsWhereUniqueInput
  }

  /**
   * master_cohorts findUniqueOrThrow
   */
  export type master_cohortsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * Filter, which master_cohorts to fetch.
     */
    where: master_cohortsWhereUniqueInput
  }

  /**
   * master_cohorts findFirst
   */
  export type master_cohortsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * Filter, which master_cohorts to fetch.
     */
    where?: master_cohortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of master_cohorts to fetch.
     */
    orderBy?: master_cohortsOrderByWithRelationInput | master_cohortsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for master_cohorts.
     */
    cursor?: master_cohortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` master_cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` master_cohorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of master_cohorts.
     */
    distinct?: Master_cohortsScalarFieldEnum | Master_cohortsScalarFieldEnum[]
  }

  /**
   * master_cohorts findFirstOrThrow
   */
  export type master_cohortsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * Filter, which master_cohorts to fetch.
     */
    where?: master_cohortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of master_cohorts to fetch.
     */
    orderBy?: master_cohortsOrderByWithRelationInput | master_cohortsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for master_cohorts.
     */
    cursor?: master_cohortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` master_cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` master_cohorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of master_cohorts.
     */
    distinct?: Master_cohortsScalarFieldEnum | Master_cohortsScalarFieldEnum[]
  }

  /**
   * master_cohorts findMany
   */
  export type master_cohortsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * Filter, which master_cohorts to fetch.
     */
    where?: master_cohortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of master_cohorts to fetch.
     */
    orderBy?: master_cohortsOrderByWithRelationInput | master_cohortsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing master_cohorts.
     */
    cursor?: master_cohortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` master_cohorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` master_cohorts.
     */
    skip?: number
    distinct?: Master_cohortsScalarFieldEnum | Master_cohortsScalarFieldEnum[]
  }

  /**
   * master_cohorts create
   */
  export type master_cohortsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * The data needed to create a master_cohorts.
     */
    data: XOR<master_cohortsCreateInput, master_cohortsUncheckedCreateInput>
  }

  /**
   * master_cohorts createMany
   */
  export type master_cohortsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many master_cohorts.
     */
    data: master_cohortsCreateManyInput | master_cohortsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * master_cohorts createManyAndReturn
   */
  export type master_cohortsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * The data used to create many master_cohorts.
     */
    data: master_cohortsCreateManyInput | master_cohortsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * master_cohorts update
   */
  export type master_cohortsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * The data needed to update a master_cohorts.
     */
    data: XOR<master_cohortsUpdateInput, master_cohortsUncheckedUpdateInput>
    /**
     * Choose, which master_cohorts to update.
     */
    where: master_cohortsWhereUniqueInput
  }

  /**
   * master_cohorts updateMany
   */
  export type master_cohortsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update master_cohorts.
     */
    data: XOR<master_cohortsUpdateManyMutationInput, master_cohortsUncheckedUpdateManyInput>
    /**
     * Filter which master_cohorts to update
     */
    where?: master_cohortsWhereInput
    /**
     * Limit how many master_cohorts to update.
     */
    limit?: number
  }

  /**
   * master_cohorts updateManyAndReturn
   */
  export type master_cohortsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * The data used to update master_cohorts.
     */
    data: XOR<master_cohortsUpdateManyMutationInput, master_cohortsUncheckedUpdateManyInput>
    /**
     * Filter which master_cohorts to update
     */
    where?: master_cohortsWhereInput
    /**
     * Limit how many master_cohorts to update.
     */
    limit?: number
  }

  /**
   * master_cohorts upsert
   */
  export type master_cohortsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * The filter to search for the master_cohorts to update in case it exists.
     */
    where: master_cohortsWhereUniqueInput
    /**
     * In case the master_cohorts found by the `where` argument doesn't exist, create a new master_cohorts with this data.
     */
    create: XOR<master_cohortsCreateInput, master_cohortsUncheckedCreateInput>
    /**
     * In case the master_cohorts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<master_cohortsUpdateInput, master_cohortsUncheckedUpdateInput>
  }

  /**
   * master_cohorts delete
   */
  export type master_cohortsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
    /**
     * Filter which master_cohorts to delete.
     */
    where: master_cohortsWhereUniqueInput
  }

  /**
   * master_cohorts deleteMany
   */
  export type master_cohortsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which master_cohorts to delete
     */
    where?: master_cohortsWhereInput
    /**
     * Limit how many master_cohorts to delete.
     */
    limit?: number
  }

  /**
   * master_cohorts without action
   */
  export type master_cohortsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the master_cohorts
     */
    select?: master_cohortsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the master_cohorts
     */
    omit?: master_cohortsOmit<ExtArgs> | null
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


  export const Visitor_analyticsScalarFieldEnum: {
    id: 'id',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    page_path: 'page_path',
    page_title: 'page_title',
    referrer: 'referrer',
    session_id: 'session_id',
    user_id: 'user_id',
    visit_duration: 'visit_duration',
    created_at: 'created_at'
  };

  export type Visitor_analyticsScalarFieldEnum = (typeof Visitor_analyticsScalarFieldEnum)[keyof typeof Visitor_analyticsScalarFieldEnum]


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


  export const ReportsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    cover_image_url: 'cover_image_url',
    status: 'status',
    category: 'category',
    priority: 'priority',
    is_public: 'is_public',
    max_access: 'max_access',
    current_access: 'current_access',
    tags: 'tags',
    author_id: 'author_id',
    assignee_id: 'assignee_id',
    feedback: 'feedback',
    verified_at: 'verified_at',
    rejected_at: 'rejected_at',
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
    file_type: 'file_type',
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
    training_program_id: 'training_program_id',
    phone: 'phone',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const Report_foldersScalarFieldEnum: {
    id: 'id',
    year: 'year',
    batch: 'batch',
    report_type: 'report_type',
    description: 'description',
    created_by: 'created_by',
    training_program_id: 'training_program_id',
    cohort_id: 'cohort_id',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Report_foldersScalarFieldEnum = (typeof Report_foldersScalarFieldEnum)[keyof typeof Report_foldersScalarFieldEnum]


  export const Training_programsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    full_name: 'full_name',
    description: 'description',
    duration_days: 'duration_days',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Training_programsScalarFieldEnum = (typeof Training_programsScalarFieldEnum)[keyof typeof Training_programsScalarFieldEnum]


  export const Training_cohortsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    training_program_id: 'training_program_id',
    year: 'year',
    start_date: 'start_date',
    end_date: 'end_date',
    max_participants: 'max_participants',
    current_participants: 'current_participants',
    status: 'status',
    description: 'description',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Training_cohortsScalarFieldEnum = (typeof Training_cohortsScalarFieldEnum)[keyof typeof Training_cohortsScalarFieldEnum]


  export const Cohort_membersScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    cohort_id: 'cohort_id',
    joined_at: 'joined_at',
    status: 'status',
    notes: 'notes'
  };

  export type Cohort_membersScalarFieldEnum = (typeof Cohort_membersScalarFieldEnum)[keyof typeof Cohort_membersScalarFieldEnum]


  export const Master_yearsScalarFieldEnum: {
    id: 'id',
    year: 'year',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Master_yearsScalarFieldEnum = (typeof Master_yearsScalarFieldEnum)[keyof typeof Master_yearsScalarFieldEnum]


  export const Master_cohortsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Master_cohortsScalarFieldEnum = (typeof Master_cohortsScalarFieldEnum)[keyof typeof Master_cohortsScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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
   * Reference to a field of type 'CohortStatus'
   */
  export type EnumCohortStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CohortStatus'>
    


  /**
   * Reference to a field of type 'CohortStatus[]'
   */
  export type ListEnumCohortStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CohortStatus[]'>
    


  /**
   * Reference to a field of type 'MemberStatus'
   */
  export type EnumMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberStatus'>
    


  /**
   * Reference to a field of type 'MemberStatus[]'
   */
  export type ListEnumMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberStatus[]'>
    


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


  export type visitor_analyticsWhereInput = {
    AND?: visitor_analyticsWhereInput | visitor_analyticsWhereInput[]
    OR?: visitor_analyticsWhereInput[]
    NOT?: visitor_analyticsWhereInput | visitor_analyticsWhereInput[]
    id?: StringFilter<"visitor_analytics"> | string
    ip_address?: StringNullableFilter<"visitor_analytics"> | string | null
    user_agent?: StringNullableFilter<"visitor_analytics"> | string | null
    page_path?: StringFilter<"visitor_analytics"> | string
    page_title?: StringNullableFilter<"visitor_analytics"> | string | null
    referrer?: StringNullableFilter<"visitor_analytics"> | string | null
    session_id?: StringNullableFilter<"visitor_analytics"> | string | null
    user_id?: StringNullableFilter<"visitor_analytics"> | string | null
    visit_duration?: IntNullableFilter<"visitor_analytics"> | number | null
    created_at?: DateTimeFilter<"visitor_analytics"> | Date | string
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type visitor_analyticsOrderByWithRelationInput = {
    id?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    page_path?: SortOrder
    page_title?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    session_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    visit_duration?: SortOrderInput | SortOrder
    created_at?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type visitor_analyticsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: visitor_analyticsWhereInput | visitor_analyticsWhereInput[]
    OR?: visitor_analyticsWhereInput[]
    NOT?: visitor_analyticsWhereInput | visitor_analyticsWhereInput[]
    ip_address?: StringNullableFilter<"visitor_analytics"> | string | null
    user_agent?: StringNullableFilter<"visitor_analytics"> | string | null
    page_path?: StringFilter<"visitor_analytics"> | string
    page_title?: StringNullableFilter<"visitor_analytics"> | string | null
    referrer?: StringNullableFilter<"visitor_analytics"> | string | null
    session_id?: StringNullableFilter<"visitor_analytics"> | string | null
    user_id?: StringNullableFilter<"visitor_analytics"> | string | null
    visit_duration?: IntNullableFilter<"visitor_analytics"> | number | null
    created_at?: DateTimeFilter<"visitor_analytics"> | Date | string
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type visitor_analyticsOrderByWithAggregationInput = {
    id?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    page_path?: SortOrder
    page_title?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    session_id?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    visit_duration?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: visitor_analyticsCountOrderByAggregateInput
    _avg?: visitor_analyticsAvgOrderByAggregateInput
    _max?: visitor_analyticsMaxOrderByAggregateInput
    _min?: visitor_analyticsMinOrderByAggregateInput
    _sum?: visitor_analyticsSumOrderByAggregateInput
  }

  export type visitor_analyticsScalarWhereWithAggregatesInput = {
    AND?: visitor_analyticsScalarWhereWithAggregatesInput | visitor_analyticsScalarWhereWithAggregatesInput[]
    OR?: visitor_analyticsScalarWhereWithAggregatesInput[]
    NOT?: visitor_analyticsScalarWhereWithAggregatesInput | visitor_analyticsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"visitor_analytics"> | string
    ip_address?: StringNullableWithAggregatesFilter<"visitor_analytics"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"visitor_analytics"> | string | null
    page_path?: StringWithAggregatesFilter<"visitor_analytics"> | string
    page_title?: StringNullableWithAggregatesFilter<"visitor_analytics"> | string | null
    referrer?: StringNullableWithAggregatesFilter<"visitor_analytics"> | string | null
    session_id?: StringNullableWithAggregatesFilter<"visitor_analytics"> | string | null
    user_id?: StringNullableWithAggregatesFilter<"visitor_analytics"> | string | null
    visit_duration?: IntNullableWithAggregatesFilter<"visitor_analytics"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"visitor_analytics"> | Date | string
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

  export type reportsWhereInput = {
    AND?: reportsWhereInput | reportsWhereInput[]
    OR?: reportsWhereInput[]
    NOT?: reportsWhereInput | reportsWhereInput[]
    id?: StringFilter<"reports"> | string
    title?: StringFilter<"reports"> | string
    description?: StringNullableFilter<"reports"> | string | null
    content?: StringFilter<"reports"> | string
    cover_image_url?: StringNullableFilter<"reports"> | string | null
    status?: EnumReportStatusFilter<"reports"> | $Enums.ReportStatus
    category?: StringNullableFilter<"reports"> | string | null
    priority?: EnumPriorityFilter<"reports"> | $Enums.Priority
    is_public?: BoolFilter<"reports"> | boolean
    max_access?: IntNullableFilter<"reports"> | number | null
    current_access?: IntNullableFilter<"reports"> | number | null
    tags?: StringNullableFilter<"reports"> | string | null
    author_id?: StringFilter<"reports"> | string
    assignee_id?: StringNullableFilter<"reports"> | string | null
    feedback?: StringNullableFilter<"reports"> | string | null
    verified_at?: DateTimeNullableFilter<"reports"> | Date | string | null
    rejected_at?: DateTimeNullableFilter<"reports"> | Date | string | null
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
    cover_image_url?: SortOrderInput | SortOrder
    status?: SortOrder
    category?: SortOrderInput | SortOrder
    priority?: SortOrder
    is_public?: SortOrder
    max_access?: SortOrderInput | SortOrder
    current_access?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    author_id?: SortOrder
    assignee_id?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    verified_at?: SortOrderInput | SortOrder
    rejected_at?: SortOrderInput | SortOrder
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
    cover_image_url?: StringNullableFilter<"reports"> | string | null
    status?: EnumReportStatusFilter<"reports"> | $Enums.ReportStatus
    category?: StringNullableFilter<"reports"> | string | null
    priority?: EnumPriorityFilter<"reports"> | $Enums.Priority
    is_public?: BoolFilter<"reports"> | boolean
    max_access?: IntNullableFilter<"reports"> | number | null
    current_access?: IntNullableFilter<"reports"> | number | null
    tags?: StringNullableFilter<"reports"> | string | null
    author_id?: StringFilter<"reports"> | string
    assignee_id?: StringNullableFilter<"reports"> | string | null
    feedback?: StringNullableFilter<"reports"> | string | null
    verified_at?: DateTimeNullableFilter<"reports"> | Date | string | null
    rejected_at?: DateTimeNullableFilter<"reports"> | Date | string | null
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
    cover_image_url?: SortOrderInput | SortOrder
    status?: SortOrder
    category?: SortOrderInput | SortOrder
    priority?: SortOrder
    is_public?: SortOrder
    max_access?: SortOrderInput | SortOrder
    current_access?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    author_id?: SortOrder
    assignee_id?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    verified_at?: SortOrderInput | SortOrder
    rejected_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: reportsCountOrderByAggregateInput
    _avg?: reportsAvgOrderByAggregateInput
    _max?: reportsMaxOrderByAggregateInput
    _min?: reportsMinOrderByAggregateInput
    _sum?: reportsSumOrderByAggregateInput
  }

  export type reportsScalarWhereWithAggregatesInput = {
    AND?: reportsScalarWhereWithAggregatesInput | reportsScalarWhereWithAggregatesInput[]
    OR?: reportsScalarWhereWithAggregatesInput[]
    NOT?: reportsScalarWhereWithAggregatesInput | reportsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"reports"> | string
    title?: StringWithAggregatesFilter<"reports"> | string
    description?: StringNullableWithAggregatesFilter<"reports"> | string | null
    content?: StringWithAggregatesFilter<"reports"> | string
    cover_image_url?: StringNullableWithAggregatesFilter<"reports"> | string | null
    status?: EnumReportStatusWithAggregatesFilter<"reports"> | $Enums.ReportStatus
    category?: StringNullableWithAggregatesFilter<"reports"> | string | null
    priority?: EnumPriorityWithAggregatesFilter<"reports"> | $Enums.Priority
    is_public?: BoolWithAggregatesFilter<"reports"> | boolean
    max_access?: IntNullableWithAggregatesFilter<"reports"> | number | null
    current_access?: IntNullableWithAggregatesFilter<"reports"> | number | null
    tags?: StringNullableWithAggregatesFilter<"reports"> | string | null
    author_id?: StringWithAggregatesFilter<"reports"> | string
    assignee_id?: StringNullableWithAggregatesFilter<"reports"> | string | null
    feedback?: StringNullableWithAggregatesFilter<"reports"> | string | null
    verified_at?: DateTimeNullableWithAggregatesFilter<"reports"> | Date | string | null
    rejected_at?: DateTimeNullableWithAggregatesFilter<"reports"> | Date | string | null
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
    file_type?: StringNullableFilter<"uploaded_files"> | string | null
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
    file_type?: SortOrderInput | SortOrder
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
    file_type?: StringNullableFilter<"uploaded_files"> | string | null
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
    file_type?: SortOrderInput | SortOrder
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
    file_type?: StringNullableWithAggregatesFilter<"uploaded_files"> | string | null
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
    training_program_id?: StringNullableFilter<"users"> | string | null
    phone?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    visitor_analytics?: Visitor_analyticsListRelationFilter
    guestbook_entries?: Guestbook_entriesListRelationFilter
    reports_reports_assignee_idTousers?: ReportsListRelationFilter
    reports_reports_author_idTousers?: ReportsListRelationFilter
    uploaded_files?: Uploaded_filesListRelationFilter
    created_folders?: Report_foldersListRelationFilter
    training_program?: XOR<Training_programsNullableScalarRelationFilter, training_programsWhereInput> | null
    cohort_memberships?: Cohort_membersListRelationFilter
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
    training_program_id?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visitor_analytics?: visitor_analyticsOrderByRelationAggregateInput
    guestbook_entries?: guestbook_entriesOrderByRelationAggregateInput
    reports_reports_assignee_idTousers?: reportsOrderByRelationAggregateInput
    reports_reports_author_idTousers?: reportsOrderByRelationAggregateInput
    uploaded_files?: uploaded_filesOrderByRelationAggregateInput
    created_folders?: report_foldersOrderByRelationAggregateInput
    training_program?: training_programsOrderByWithRelationInput
    cohort_memberships?: cohort_membersOrderByRelationAggregateInput
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
    training_program_id?: StringNullableFilter<"users"> | string | null
    phone?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    visitor_analytics?: Visitor_analyticsListRelationFilter
    guestbook_entries?: Guestbook_entriesListRelationFilter
    reports_reports_assignee_idTousers?: ReportsListRelationFilter
    reports_reports_author_idTousers?: ReportsListRelationFilter
    uploaded_files?: Uploaded_filesListRelationFilter
    created_folders?: Report_foldersListRelationFilter
    training_program?: XOR<Training_programsNullableScalarRelationFilter, training_programsWhereInput> | null
    cohort_memberships?: Cohort_membersListRelationFilter
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
    training_program_id?: SortOrderInput | SortOrder
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
    training_program_id?: StringNullableWithAggregatesFilter<"users"> | string | null
    phone?: StringNullableWithAggregatesFilter<"users"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type report_foldersWhereInput = {
    AND?: report_foldersWhereInput | report_foldersWhereInput[]
    OR?: report_foldersWhereInput[]
    NOT?: report_foldersWhereInput | report_foldersWhereInput[]
    id?: StringFilter<"report_folders"> | string
    year?: StringFilter<"report_folders"> | string
    batch?: StringFilter<"report_folders"> | string
    report_type?: StringFilter<"report_folders"> | string
    description?: StringNullableFilter<"report_folders"> | string | null
    created_by?: StringFilter<"report_folders"> | string
    training_program_id?: StringNullableFilter<"report_folders"> | string | null
    cohort_id?: StringNullableFilter<"report_folders"> | string | null
    is_active?: BoolFilter<"report_folders"> | boolean
    created_at?: DateTimeFilter<"report_folders"> | Date | string
    updated_at?: DateTimeFilter<"report_folders"> | Date | string
    creator?: XOR<UsersScalarRelationFilter, usersWhereInput>
    training_program?: XOR<Training_programsNullableScalarRelationFilter, training_programsWhereInput> | null
    cohort?: XOR<Training_cohortsNullableScalarRelationFilter, training_cohortsWhereInput> | null
  }

  export type report_foldersOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    batch?: SortOrder
    report_type?: SortOrder
    description?: SortOrderInput | SortOrder
    created_by?: SortOrder
    training_program_id?: SortOrderInput | SortOrder
    cohort_id?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    creator?: usersOrderByWithRelationInput
    training_program?: training_programsOrderByWithRelationInput
    cohort?: training_cohortsOrderByWithRelationInput
  }

  export type report_foldersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year_batch_report_type?: report_foldersYearBatchReport_typeCompoundUniqueInput
    AND?: report_foldersWhereInput | report_foldersWhereInput[]
    OR?: report_foldersWhereInput[]
    NOT?: report_foldersWhereInput | report_foldersWhereInput[]
    year?: StringFilter<"report_folders"> | string
    batch?: StringFilter<"report_folders"> | string
    report_type?: StringFilter<"report_folders"> | string
    description?: StringNullableFilter<"report_folders"> | string | null
    created_by?: StringFilter<"report_folders"> | string
    training_program_id?: StringNullableFilter<"report_folders"> | string | null
    cohort_id?: StringNullableFilter<"report_folders"> | string | null
    is_active?: BoolFilter<"report_folders"> | boolean
    created_at?: DateTimeFilter<"report_folders"> | Date | string
    updated_at?: DateTimeFilter<"report_folders"> | Date | string
    creator?: XOR<UsersScalarRelationFilter, usersWhereInput>
    training_program?: XOR<Training_programsNullableScalarRelationFilter, training_programsWhereInput> | null
    cohort?: XOR<Training_cohortsNullableScalarRelationFilter, training_cohortsWhereInput> | null
  }, "id" | "year_batch_report_type">

  export type report_foldersOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    batch?: SortOrder
    report_type?: SortOrder
    description?: SortOrderInput | SortOrder
    created_by?: SortOrder
    training_program_id?: SortOrderInput | SortOrder
    cohort_id?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: report_foldersCountOrderByAggregateInput
    _max?: report_foldersMaxOrderByAggregateInput
    _min?: report_foldersMinOrderByAggregateInput
  }

  export type report_foldersScalarWhereWithAggregatesInput = {
    AND?: report_foldersScalarWhereWithAggregatesInput | report_foldersScalarWhereWithAggregatesInput[]
    OR?: report_foldersScalarWhereWithAggregatesInput[]
    NOT?: report_foldersScalarWhereWithAggregatesInput | report_foldersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"report_folders"> | string
    year?: StringWithAggregatesFilter<"report_folders"> | string
    batch?: StringWithAggregatesFilter<"report_folders"> | string
    report_type?: StringWithAggregatesFilter<"report_folders"> | string
    description?: StringNullableWithAggregatesFilter<"report_folders"> | string | null
    created_by?: StringWithAggregatesFilter<"report_folders"> | string
    training_program_id?: StringNullableWithAggregatesFilter<"report_folders"> | string | null
    cohort_id?: StringNullableWithAggregatesFilter<"report_folders"> | string | null
    is_active?: BoolWithAggregatesFilter<"report_folders"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"report_folders"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"report_folders"> | Date | string
  }

  export type training_programsWhereInput = {
    AND?: training_programsWhereInput | training_programsWhereInput[]
    OR?: training_programsWhereInput[]
    NOT?: training_programsWhereInput | training_programsWhereInput[]
    id?: StringFilter<"training_programs"> | string
    name?: StringFilter<"training_programs"> | string
    full_name?: StringFilter<"training_programs"> | string
    description?: StringNullableFilter<"training_programs"> | string | null
    duration_days?: IntNullableFilter<"training_programs"> | number | null
    is_active?: BoolFilter<"training_programs"> | boolean
    created_at?: DateTimeFilter<"training_programs"> | Date | string
    updated_at?: DateTimeFilter<"training_programs"> | Date | string
    users?: UsersListRelationFilter
    cohorts?: Training_cohortsListRelationFilter
    folders?: Report_foldersListRelationFilter
  }

  export type training_programsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    full_name?: SortOrder
    description?: SortOrderInput | SortOrder
    duration_days?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    users?: usersOrderByRelationAggregateInput
    cohorts?: training_cohortsOrderByRelationAggregateInput
    folders?: report_foldersOrderByRelationAggregateInput
  }

  export type training_programsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: training_programsWhereInput | training_programsWhereInput[]
    OR?: training_programsWhereInput[]
    NOT?: training_programsWhereInput | training_programsWhereInput[]
    full_name?: StringFilter<"training_programs"> | string
    description?: StringNullableFilter<"training_programs"> | string | null
    duration_days?: IntNullableFilter<"training_programs"> | number | null
    is_active?: BoolFilter<"training_programs"> | boolean
    created_at?: DateTimeFilter<"training_programs"> | Date | string
    updated_at?: DateTimeFilter<"training_programs"> | Date | string
    users?: UsersListRelationFilter
    cohorts?: Training_cohortsListRelationFilter
    folders?: Report_foldersListRelationFilter
  }, "id" | "name">

  export type training_programsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    full_name?: SortOrder
    description?: SortOrderInput | SortOrder
    duration_days?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: training_programsCountOrderByAggregateInput
    _avg?: training_programsAvgOrderByAggregateInput
    _max?: training_programsMaxOrderByAggregateInput
    _min?: training_programsMinOrderByAggregateInput
    _sum?: training_programsSumOrderByAggregateInput
  }

  export type training_programsScalarWhereWithAggregatesInput = {
    AND?: training_programsScalarWhereWithAggregatesInput | training_programsScalarWhereWithAggregatesInput[]
    OR?: training_programsScalarWhereWithAggregatesInput[]
    NOT?: training_programsScalarWhereWithAggregatesInput | training_programsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"training_programs"> | string
    name?: StringWithAggregatesFilter<"training_programs"> | string
    full_name?: StringWithAggregatesFilter<"training_programs"> | string
    description?: StringNullableWithAggregatesFilter<"training_programs"> | string | null
    duration_days?: IntNullableWithAggregatesFilter<"training_programs"> | number | null
    is_active?: BoolWithAggregatesFilter<"training_programs"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"training_programs"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"training_programs"> | Date | string
  }

  export type training_cohortsWhereInput = {
    AND?: training_cohortsWhereInput | training_cohortsWhereInput[]
    OR?: training_cohortsWhereInput[]
    NOT?: training_cohortsWhereInput | training_cohortsWhereInput[]
    id?: StringFilter<"training_cohorts"> | string
    name?: StringFilter<"training_cohorts"> | string
    training_program_id?: StringFilter<"training_cohorts"> | string
    year?: StringFilter<"training_cohorts"> | string
    start_date?: DateTimeNullableFilter<"training_cohorts"> | Date | string | null
    end_date?: DateTimeNullableFilter<"training_cohorts"> | Date | string | null
    max_participants?: IntNullableFilter<"training_cohorts"> | number | null
    current_participants?: IntFilter<"training_cohorts"> | number
    status?: EnumCohortStatusFilter<"training_cohorts"> | $Enums.CohortStatus
    description?: StringNullableFilter<"training_cohorts"> | string | null
    is_active?: BoolFilter<"training_cohorts"> | boolean
    created_at?: DateTimeFilter<"training_cohorts"> | Date | string
    updated_at?: DateTimeFilter<"training_cohorts"> | Date | string
    training_program?: XOR<Training_programsScalarRelationFilter, training_programsWhereInput>
    members?: Cohort_membersListRelationFilter
    folders?: Report_foldersListRelationFilter
  }

  export type training_cohortsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    training_program_id?: SortOrder
    year?: SortOrder
    start_date?: SortOrderInput | SortOrder
    end_date?: SortOrderInput | SortOrder
    max_participants?: SortOrderInput | SortOrder
    current_participants?: SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    training_program?: training_programsOrderByWithRelationInput
    members?: cohort_membersOrderByRelationAggregateInput
    folders?: report_foldersOrderByRelationAggregateInput
  }

  export type training_cohortsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    training_program_id_name_year?: training_cohortsTraining_program_idNameYearCompoundUniqueInput
    AND?: training_cohortsWhereInput | training_cohortsWhereInput[]
    OR?: training_cohortsWhereInput[]
    NOT?: training_cohortsWhereInput | training_cohortsWhereInput[]
    name?: StringFilter<"training_cohorts"> | string
    training_program_id?: StringFilter<"training_cohorts"> | string
    year?: StringFilter<"training_cohorts"> | string
    start_date?: DateTimeNullableFilter<"training_cohorts"> | Date | string | null
    end_date?: DateTimeNullableFilter<"training_cohorts"> | Date | string | null
    max_participants?: IntNullableFilter<"training_cohorts"> | number | null
    current_participants?: IntFilter<"training_cohorts"> | number
    status?: EnumCohortStatusFilter<"training_cohorts"> | $Enums.CohortStatus
    description?: StringNullableFilter<"training_cohorts"> | string | null
    is_active?: BoolFilter<"training_cohorts"> | boolean
    created_at?: DateTimeFilter<"training_cohorts"> | Date | string
    updated_at?: DateTimeFilter<"training_cohorts"> | Date | string
    training_program?: XOR<Training_programsScalarRelationFilter, training_programsWhereInput>
    members?: Cohort_membersListRelationFilter
    folders?: Report_foldersListRelationFilter
  }, "id" | "training_program_id_name_year">

  export type training_cohortsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    training_program_id?: SortOrder
    year?: SortOrder
    start_date?: SortOrderInput | SortOrder
    end_date?: SortOrderInput | SortOrder
    max_participants?: SortOrderInput | SortOrder
    current_participants?: SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: training_cohortsCountOrderByAggregateInput
    _avg?: training_cohortsAvgOrderByAggregateInput
    _max?: training_cohortsMaxOrderByAggregateInput
    _min?: training_cohortsMinOrderByAggregateInput
    _sum?: training_cohortsSumOrderByAggregateInput
  }

  export type training_cohortsScalarWhereWithAggregatesInput = {
    AND?: training_cohortsScalarWhereWithAggregatesInput | training_cohortsScalarWhereWithAggregatesInput[]
    OR?: training_cohortsScalarWhereWithAggregatesInput[]
    NOT?: training_cohortsScalarWhereWithAggregatesInput | training_cohortsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"training_cohorts"> | string
    name?: StringWithAggregatesFilter<"training_cohorts"> | string
    training_program_id?: StringWithAggregatesFilter<"training_cohorts"> | string
    year?: StringWithAggregatesFilter<"training_cohorts"> | string
    start_date?: DateTimeNullableWithAggregatesFilter<"training_cohorts"> | Date | string | null
    end_date?: DateTimeNullableWithAggregatesFilter<"training_cohorts"> | Date | string | null
    max_participants?: IntNullableWithAggregatesFilter<"training_cohorts"> | number | null
    current_participants?: IntWithAggregatesFilter<"training_cohorts"> | number
    status?: EnumCohortStatusWithAggregatesFilter<"training_cohorts"> | $Enums.CohortStatus
    description?: StringNullableWithAggregatesFilter<"training_cohorts"> | string | null
    is_active?: BoolWithAggregatesFilter<"training_cohorts"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"training_cohorts"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"training_cohorts"> | Date | string
  }

  export type cohort_membersWhereInput = {
    AND?: cohort_membersWhereInput | cohort_membersWhereInput[]
    OR?: cohort_membersWhereInput[]
    NOT?: cohort_membersWhereInput | cohort_membersWhereInput[]
    id?: StringFilter<"cohort_members"> | string
    user_id?: StringFilter<"cohort_members"> | string
    cohort_id?: StringFilter<"cohort_members"> | string
    joined_at?: DateTimeFilter<"cohort_members"> | Date | string
    status?: EnumMemberStatusFilter<"cohort_members"> | $Enums.MemberStatus
    notes?: StringNullableFilter<"cohort_members"> | string | null
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    cohort?: XOR<Training_cohortsScalarRelationFilter, training_cohortsWhereInput>
  }

  export type cohort_membersOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    cohort_id?: SortOrder
    joined_at?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    user?: usersOrderByWithRelationInput
    cohort?: training_cohortsOrderByWithRelationInput
  }

  export type cohort_membersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_cohort_id?: cohort_membersUser_idCohort_idCompoundUniqueInput
    AND?: cohort_membersWhereInput | cohort_membersWhereInput[]
    OR?: cohort_membersWhereInput[]
    NOT?: cohort_membersWhereInput | cohort_membersWhereInput[]
    user_id?: StringFilter<"cohort_members"> | string
    cohort_id?: StringFilter<"cohort_members"> | string
    joined_at?: DateTimeFilter<"cohort_members"> | Date | string
    status?: EnumMemberStatusFilter<"cohort_members"> | $Enums.MemberStatus
    notes?: StringNullableFilter<"cohort_members"> | string | null
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    cohort?: XOR<Training_cohortsScalarRelationFilter, training_cohortsWhereInput>
  }, "id" | "user_id_cohort_id">

  export type cohort_membersOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    cohort_id?: SortOrder
    joined_at?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: cohort_membersCountOrderByAggregateInput
    _max?: cohort_membersMaxOrderByAggregateInput
    _min?: cohort_membersMinOrderByAggregateInput
  }

  export type cohort_membersScalarWhereWithAggregatesInput = {
    AND?: cohort_membersScalarWhereWithAggregatesInput | cohort_membersScalarWhereWithAggregatesInput[]
    OR?: cohort_membersScalarWhereWithAggregatesInput[]
    NOT?: cohort_membersScalarWhereWithAggregatesInput | cohort_membersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"cohort_members"> | string
    user_id?: StringWithAggregatesFilter<"cohort_members"> | string
    cohort_id?: StringWithAggregatesFilter<"cohort_members"> | string
    joined_at?: DateTimeWithAggregatesFilter<"cohort_members"> | Date | string
    status?: EnumMemberStatusWithAggregatesFilter<"cohort_members"> | $Enums.MemberStatus
    notes?: StringNullableWithAggregatesFilter<"cohort_members"> | string | null
  }

  export type master_yearsWhereInput = {
    AND?: master_yearsWhereInput | master_yearsWhereInput[]
    OR?: master_yearsWhereInput[]
    NOT?: master_yearsWhereInput | master_yearsWhereInput[]
    id?: StringFilter<"master_years"> | string
    year?: StringFilter<"master_years"> | string
    is_active?: BoolFilter<"master_years"> | boolean
    created_at?: DateTimeFilter<"master_years"> | Date | string
    updated_at?: DateTimeFilter<"master_years"> | Date | string
  }

  export type master_yearsOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type master_yearsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    year?: string
    AND?: master_yearsWhereInput | master_yearsWhereInput[]
    OR?: master_yearsWhereInput[]
    NOT?: master_yearsWhereInput | master_yearsWhereInput[]
    is_active?: BoolFilter<"master_years"> | boolean
    created_at?: DateTimeFilter<"master_years"> | Date | string
    updated_at?: DateTimeFilter<"master_years"> | Date | string
  }, "id" | "year">

  export type master_yearsOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: master_yearsCountOrderByAggregateInput
    _max?: master_yearsMaxOrderByAggregateInput
    _min?: master_yearsMinOrderByAggregateInput
  }

  export type master_yearsScalarWhereWithAggregatesInput = {
    AND?: master_yearsScalarWhereWithAggregatesInput | master_yearsScalarWhereWithAggregatesInput[]
    OR?: master_yearsScalarWhereWithAggregatesInput[]
    NOT?: master_yearsScalarWhereWithAggregatesInput | master_yearsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"master_years"> | string
    year?: StringWithAggregatesFilter<"master_years"> | string
    is_active?: BoolWithAggregatesFilter<"master_years"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"master_years"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"master_years"> | Date | string
  }

  export type master_cohortsWhereInput = {
    AND?: master_cohortsWhereInput | master_cohortsWhereInput[]
    OR?: master_cohortsWhereInput[]
    NOT?: master_cohortsWhereInput | master_cohortsWhereInput[]
    id?: StringFilter<"master_cohorts"> | string
    name?: StringFilter<"master_cohorts"> | string
    is_active?: BoolFilter<"master_cohorts"> | boolean
    created_at?: DateTimeFilter<"master_cohorts"> | Date | string
    updated_at?: DateTimeFilter<"master_cohorts"> | Date | string
  }

  export type master_cohortsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type master_cohortsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: master_cohortsWhereInput | master_cohortsWhereInput[]
    OR?: master_cohortsWhereInput[]
    NOT?: master_cohortsWhereInput | master_cohortsWhereInput[]
    is_active?: BoolFilter<"master_cohorts"> | boolean
    created_at?: DateTimeFilter<"master_cohorts"> | Date | string
    updated_at?: DateTimeFilter<"master_cohorts"> | Date | string
  }, "id" | "name">

  export type master_cohortsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: master_cohortsCountOrderByAggregateInput
    _max?: master_cohortsMaxOrderByAggregateInput
    _min?: master_cohortsMinOrderByAggregateInput
  }

  export type master_cohortsScalarWhereWithAggregatesInput = {
    AND?: master_cohortsScalarWhereWithAggregatesInput | master_cohortsScalarWhereWithAggregatesInput[]
    OR?: master_cohortsScalarWhereWithAggregatesInput[]
    NOT?: master_cohortsScalarWhereWithAggregatesInput | master_cohortsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"master_cohorts"> | string
    name?: StringWithAggregatesFilter<"master_cohorts"> | string
    is_active?: BoolWithAggregatesFilter<"master_cohorts"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"master_cohorts"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"master_cohorts"> | Date | string
  }

  export type visitor_analyticsCreateInput = {
    id: string
    ip_address?: string | null
    user_agent?: string | null
    page_path: string
    page_title?: string | null
    referrer?: string | null
    session_id?: string | null
    visit_duration?: number | null
    created_at?: Date | string
    users?: usersCreateNestedOneWithoutVisitor_analyticsInput
  }

  export type visitor_analyticsUncheckedCreateInput = {
    id: string
    ip_address?: string | null
    user_agent?: string | null
    page_path: string
    page_title?: string | null
    referrer?: string | null
    session_id?: string | null
    user_id?: string | null
    visit_duration?: number | null
    created_at?: Date | string
  }

  export type visitor_analyticsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    page_path?: StringFieldUpdateOperationsInput | string
    page_title?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    session_id?: NullableStringFieldUpdateOperationsInput | string | null
    visit_duration?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneWithoutVisitor_analyticsNestedInput
  }

  export type visitor_analyticsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    page_path?: StringFieldUpdateOperationsInput | string
    page_title?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    session_id?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    visit_duration?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type visitor_analyticsCreateManyInput = {
    id: string
    ip_address?: string | null
    user_agent?: string | null
    page_path: string
    page_title?: string | null
    referrer?: string | null
    session_id?: string | null
    user_id?: string | null
    visit_duration?: number | null
    created_at?: Date | string
  }

  export type visitor_analyticsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    page_path?: StringFieldUpdateOperationsInput | string
    page_title?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    session_id?: NullableStringFieldUpdateOperationsInput | string | null
    visit_duration?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type visitor_analyticsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    page_path?: StringFieldUpdateOperationsInput | string
    page_title?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    session_id?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    visit_duration?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type reportsCreateInput = {
    id: string
    title: string
    description?: string | null
    content: string
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
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
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    author_id: string
    assignee_id?: string | null
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
    created_at?: Date | string
    updated_at: Date | string
    files?: uploaded_filesUncheckedCreateNestedManyWithoutReportsInput
  }

  export type reportsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    author_id?: StringFieldUpdateOperationsInput | string
    assignee_id?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: uploaded_filesUncheckedUpdateManyWithoutReportsNestedInput
  }

  export type reportsCreateManyInput = {
    id: string
    title: string
    description?: string | null
    content: string
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    author_id: string
    assignee_id?: string | null
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type reportsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reportsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    author_id?: StringFieldUpdateOperationsInput | string
    assignee_id?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    file_type?: string | null
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
    file_type?: string | null
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
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
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
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
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
    file_type?: string | null
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
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
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
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
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
    visitor_analytics?: visitor_analyticsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersCreateNestedManyWithoutCreatorInput
    training_program?: training_programsCreateNestedOneWithoutUsersInput
    cohort_memberships?: cohort_membersCreateNestedManyWithoutUserInput
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
    training_program_id?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    visitor_analytics?: visitor_analyticsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersUncheckedCreateNestedManyWithoutCreatorInput
    cohort_memberships?: cohort_membersUncheckedCreateNestedManyWithoutUserInput
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
    visitor_analytics?: visitor_analyticsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUpdateManyWithoutCreatorNestedInput
    training_program?: training_programsUpdateOneWithoutUsersNestedInput
    cohort_memberships?: cohort_membersUpdateManyWithoutUserNestedInput
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
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visitor_analytics?: visitor_analyticsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUncheckedUpdateManyWithoutCreatorNestedInput
    cohort_memberships?: cohort_membersUncheckedUpdateManyWithoutUserNestedInput
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
    training_program_id?: string | null
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
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type report_foldersCreateInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    creator: usersCreateNestedOneWithoutCreated_foldersInput
    training_program?: training_programsCreateNestedOneWithoutFoldersInput
    cohort?: training_cohortsCreateNestedOneWithoutFoldersInput
  }

  export type report_foldersUncheckedCreateInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    created_by: string
    training_program_id?: string | null
    cohort_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type report_foldersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: usersUpdateOneRequiredWithoutCreated_foldersNestedInput
    training_program?: training_programsUpdateOneWithoutFoldersNestedInput
    cohort?: training_cohortsUpdateOneWithoutFoldersNestedInput
  }

  export type report_foldersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    cohort_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type report_foldersCreateManyInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    created_by: string
    training_program_id?: string | null
    cohort_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type report_foldersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type report_foldersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    cohort_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type training_programsCreateInput = {
    id?: string
    name: string
    full_name: string
    description?: string | null
    duration_days?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    users?: usersCreateNestedManyWithoutTraining_programInput
    cohorts?: training_cohortsCreateNestedManyWithoutTraining_programInput
    folders?: report_foldersCreateNestedManyWithoutTraining_programInput
  }

  export type training_programsUncheckedCreateInput = {
    id?: string
    name: string
    full_name: string
    description?: string | null
    duration_days?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    users?: usersUncheckedCreateNestedManyWithoutTraining_programInput
    cohorts?: training_cohortsUncheckedCreateNestedManyWithoutTraining_programInput
    folders?: report_foldersUncheckedCreateNestedManyWithoutTraining_programInput
  }

  export type training_programsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateManyWithoutTraining_programNestedInput
    cohorts?: training_cohortsUpdateManyWithoutTraining_programNestedInput
    folders?: report_foldersUpdateManyWithoutTraining_programNestedInput
  }

  export type training_programsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUncheckedUpdateManyWithoutTraining_programNestedInput
    cohorts?: training_cohortsUncheckedUpdateManyWithoutTraining_programNestedInput
    folders?: report_foldersUncheckedUpdateManyWithoutTraining_programNestedInput
  }

  export type training_programsCreateManyInput = {
    id?: string
    name: string
    full_name: string
    description?: string | null
    duration_days?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type training_programsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type training_programsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type training_cohortsCreateInput = {
    id?: string
    name: string
    year: string
    start_date?: Date | string | null
    end_date?: Date | string | null
    max_participants?: number | null
    current_participants?: number
    status?: $Enums.CohortStatus
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    training_program: training_programsCreateNestedOneWithoutCohortsInput
    members?: cohort_membersCreateNestedManyWithoutCohortInput
    folders?: report_foldersCreateNestedManyWithoutCohortInput
  }

  export type training_cohortsUncheckedCreateInput = {
    id?: string
    name: string
    training_program_id: string
    year: string
    start_date?: Date | string | null
    end_date?: Date | string | null
    max_participants?: number | null
    current_participants?: number
    status?: $Enums.CohortStatus
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    members?: cohort_membersUncheckedCreateNestedManyWithoutCohortInput
    folders?: report_foldersUncheckedCreateNestedManyWithoutCohortInput
  }

  export type training_cohortsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    training_program?: training_programsUpdateOneRequiredWithoutCohortsNestedInput
    members?: cohort_membersUpdateManyWithoutCohortNestedInput
    folders?: report_foldersUpdateManyWithoutCohortNestedInput
  }

  export type training_cohortsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    training_program_id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: cohort_membersUncheckedUpdateManyWithoutCohortNestedInput
    folders?: report_foldersUncheckedUpdateManyWithoutCohortNestedInput
  }

  export type training_cohortsCreateManyInput = {
    id?: string
    name: string
    training_program_id: string
    year: string
    start_date?: Date | string | null
    end_date?: Date | string | null
    max_participants?: number | null
    current_participants?: number
    status?: $Enums.CohortStatus
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type training_cohortsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type training_cohortsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    training_program_id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cohort_membersCreateInput = {
    id?: string
    joined_at?: Date | string
    status?: $Enums.MemberStatus
    notes?: string | null
    user: usersCreateNestedOneWithoutCohort_membershipsInput
    cohort: training_cohortsCreateNestedOneWithoutMembersInput
  }

  export type cohort_membersUncheckedCreateInput = {
    id?: string
    user_id: string
    cohort_id: string
    joined_at?: Date | string
    status?: $Enums.MemberStatus
    notes?: string | null
  }

  export type cohort_membersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    user?: usersUpdateOneRequiredWithoutCohort_membershipsNestedInput
    cohort?: training_cohortsUpdateOneRequiredWithoutMembersNestedInput
  }

  export type cohort_membersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    cohort_id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cohort_membersCreateManyInput = {
    id?: string
    user_id: string
    cohort_id: string
    joined_at?: Date | string
    status?: $Enums.MemberStatus
    notes?: string | null
  }

  export type cohort_membersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cohort_membersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    cohort_id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type master_yearsCreateInput = {
    id?: string
    year: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type master_yearsUncheckedCreateInput = {
    id?: string
    year: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type master_yearsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type master_yearsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type master_yearsCreateManyInput = {
    id?: string
    year: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type master_yearsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type master_yearsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type master_cohortsCreateInput = {
    id?: string
    name: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type master_cohortsUncheckedCreateInput = {
    id?: string
    name: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type master_cohortsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type master_cohortsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type master_cohortsCreateManyInput = {
    id?: string
    name: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type master_cohortsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type master_cohortsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
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

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type visitor_analyticsCountOrderByAggregateInput = {
    id?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    page_path?: SortOrder
    page_title?: SortOrder
    referrer?: SortOrder
    session_id?: SortOrder
    user_id?: SortOrder
    visit_duration?: SortOrder
    created_at?: SortOrder
  }

  export type visitor_analyticsAvgOrderByAggregateInput = {
    visit_duration?: SortOrder
  }

  export type visitor_analyticsMaxOrderByAggregateInput = {
    id?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    page_path?: SortOrder
    page_title?: SortOrder
    referrer?: SortOrder
    session_id?: SortOrder
    user_id?: SortOrder
    visit_duration?: SortOrder
    created_at?: SortOrder
  }

  export type visitor_analyticsMinOrderByAggregateInput = {
    id?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    page_path?: SortOrder
    page_title?: SortOrder
    referrer?: SortOrder
    session_id?: SortOrder
    user_id?: SortOrder
    visit_duration?: SortOrder
    created_at?: SortOrder
  }

  export type visitor_analyticsSumOrderByAggregateInput = {
    visit_duration?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
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
    cover_image_url?: SortOrder
    status?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    is_public?: SortOrder
    max_access?: SortOrder
    current_access?: SortOrder
    tags?: SortOrder
    author_id?: SortOrder
    assignee_id?: SortOrder
    feedback?: SortOrder
    verified_at?: SortOrder
    rejected_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reportsAvgOrderByAggregateInput = {
    max_access?: SortOrder
    current_access?: SortOrder
  }

  export type reportsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    cover_image_url?: SortOrder
    status?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    is_public?: SortOrder
    max_access?: SortOrder
    current_access?: SortOrder
    tags?: SortOrder
    author_id?: SortOrder
    assignee_id?: SortOrder
    feedback?: SortOrder
    verified_at?: SortOrder
    rejected_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reportsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    cover_image_url?: SortOrder
    status?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    is_public?: SortOrder
    max_access?: SortOrder
    current_access?: SortOrder
    tags?: SortOrder
    author_id?: SortOrder
    assignee_id?: SortOrder
    feedback?: SortOrder
    verified_at?: SortOrder
    rejected_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reportsSumOrderByAggregateInput = {
    max_access?: SortOrder
    current_access?: SortOrder
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
    file_type?: SortOrder
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
    file_type?: SortOrder
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
    file_type?: SortOrder
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type Visitor_analyticsListRelationFilter = {
    every?: visitor_analyticsWhereInput
    some?: visitor_analyticsWhereInput
    none?: visitor_analyticsWhereInput
  }

  export type Guestbook_entriesListRelationFilter = {
    every?: guestbook_entriesWhereInput
    some?: guestbook_entriesWhereInput
    none?: guestbook_entriesWhereInput
  }

  export type ReportsListRelationFilter = {
    every?: reportsWhereInput
    some?: reportsWhereInput
    none?: reportsWhereInput
  }

  export type Report_foldersListRelationFilter = {
    every?: report_foldersWhereInput
    some?: report_foldersWhereInput
    none?: report_foldersWhereInput
  }

  export type Training_programsNullableScalarRelationFilter = {
    is?: training_programsWhereInput | null
    isNot?: training_programsWhereInput | null
  }

  export type Cohort_membersListRelationFilter = {
    every?: cohort_membersWhereInput
    some?: cohort_membersWhereInput
    none?: cohort_membersWhereInput
  }

  export type visitor_analyticsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type guestbook_entriesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reportsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type report_foldersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type cohort_membersOrderByRelationAggregateInput = {
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
    training_program_id?: SortOrder
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
    training_program_id?: SortOrder
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
    training_program_id?: SortOrder
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

  export type Training_cohortsNullableScalarRelationFilter = {
    is?: training_cohortsWhereInput | null
    isNot?: training_cohortsWhereInput | null
  }

  export type report_foldersYearBatchReport_typeCompoundUniqueInput = {
    year: string
    batch: string
    report_type: string
  }

  export type report_foldersCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    batch?: SortOrder
    report_type?: SortOrder
    description?: SortOrder
    created_by?: SortOrder
    training_program_id?: SortOrder
    cohort_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type report_foldersMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    batch?: SortOrder
    report_type?: SortOrder
    description?: SortOrder
    created_by?: SortOrder
    training_program_id?: SortOrder
    cohort_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type report_foldersMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    batch?: SortOrder
    report_type?: SortOrder
    description?: SortOrder
    created_by?: SortOrder
    training_program_id?: SortOrder
    cohort_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UsersListRelationFilter = {
    every?: usersWhereInput
    some?: usersWhereInput
    none?: usersWhereInput
  }

  export type Training_cohortsListRelationFilter = {
    every?: training_cohortsWhereInput
    some?: training_cohortsWhereInput
    none?: training_cohortsWhereInput
  }

  export type usersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type training_cohortsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type training_programsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    full_name?: SortOrder
    description?: SortOrder
    duration_days?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type training_programsAvgOrderByAggregateInput = {
    duration_days?: SortOrder
  }

  export type training_programsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    full_name?: SortOrder
    description?: SortOrder
    duration_days?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type training_programsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    full_name?: SortOrder
    description?: SortOrder
    duration_days?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type training_programsSumOrderByAggregateInput = {
    duration_days?: SortOrder
  }

  export type EnumCohortStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CohortStatus | EnumCohortStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CohortStatus[] | ListEnumCohortStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CohortStatus[] | ListEnumCohortStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCohortStatusFilter<$PrismaModel> | $Enums.CohortStatus
  }

  export type Training_programsScalarRelationFilter = {
    is?: training_programsWhereInput
    isNot?: training_programsWhereInput
  }

  export type training_cohortsTraining_program_idNameYearCompoundUniqueInput = {
    training_program_id: string
    name: string
    year: string
  }

  export type training_cohortsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    training_program_id?: SortOrder
    year?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    max_participants?: SortOrder
    current_participants?: SortOrder
    status?: SortOrder
    description?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type training_cohortsAvgOrderByAggregateInput = {
    max_participants?: SortOrder
    current_participants?: SortOrder
  }

  export type training_cohortsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    training_program_id?: SortOrder
    year?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    max_participants?: SortOrder
    current_participants?: SortOrder
    status?: SortOrder
    description?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type training_cohortsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    training_program_id?: SortOrder
    year?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    max_participants?: SortOrder
    current_participants?: SortOrder
    status?: SortOrder
    description?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type training_cohortsSumOrderByAggregateInput = {
    max_participants?: SortOrder
    current_participants?: SortOrder
  }

  export type EnumCohortStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CohortStatus | EnumCohortStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CohortStatus[] | ListEnumCohortStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CohortStatus[] | ListEnumCohortStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCohortStatusWithAggregatesFilter<$PrismaModel> | $Enums.CohortStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCohortStatusFilter<$PrismaModel>
    _max?: NestedEnumCohortStatusFilter<$PrismaModel>
  }

  export type EnumMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusFilter<$PrismaModel> | $Enums.MemberStatus
  }

  export type Training_cohortsScalarRelationFilter = {
    is?: training_cohortsWhereInput
    isNot?: training_cohortsWhereInput
  }

  export type cohort_membersUser_idCohort_idCompoundUniqueInput = {
    user_id: string
    cohort_id: string
  }

  export type cohort_membersCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    cohort_id?: SortOrder
    joined_at?: SortOrder
    status?: SortOrder
    notes?: SortOrder
  }

  export type cohort_membersMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    cohort_id?: SortOrder
    joined_at?: SortOrder
    status?: SortOrder
    notes?: SortOrder
  }

  export type cohort_membersMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    cohort_id?: SortOrder
    joined_at?: SortOrder
    status?: SortOrder
    notes?: SortOrder
  }

  export type EnumMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.MemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumMemberStatusFilter<$PrismaModel>
  }

  export type master_yearsCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type master_yearsMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type master_yearsMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type master_cohortsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type master_cohortsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type master_cohortsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersCreateNestedOneWithoutVisitor_analyticsInput = {
    create?: XOR<usersCreateWithoutVisitor_analyticsInput, usersUncheckedCreateWithoutVisitor_analyticsInput>
    connectOrCreate?: usersCreateOrConnectWithoutVisitor_analyticsInput
    connect?: usersWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type usersUpdateOneWithoutVisitor_analyticsNestedInput = {
    create?: XOR<usersCreateWithoutVisitor_analyticsInput, usersUncheckedCreateWithoutVisitor_analyticsInput>
    connectOrCreate?: usersCreateOrConnectWithoutVisitor_analyticsInput
    upsert?: usersUpsertWithoutVisitor_analyticsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutVisitor_analyticsInput, usersUpdateWithoutVisitor_analyticsInput>, usersUncheckedUpdateWithoutVisitor_analyticsInput>
  }

  export type usersCreateNestedOneWithoutGuestbook_entriesInput = {
    create?: XOR<usersCreateWithoutGuestbook_entriesInput, usersUncheckedCreateWithoutGuestbook_entriesInput>
    connectOrCreate?: usersCreateOrConnectWithoutGuestbook_entriesInput
    connect?: usersWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type visitor_analyticsCreateNestedManyWithoutUsersInput = {
    create?: XOR<visitor_analyticsCreateWithoutUsersInput, visitor_analyticsUncheckedCreateWithoutUsersInput> | visitor_analyticsCreateWithoutUsersInput[] | visitor_analyticsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: visitor_analyticsCreateOrConnectWithoutUsersInput | visitor_analyticsCreateOrConnectWithoutUsersInput[]
    createMany?: visitor_analyticsCreateManyUsersInputEnvelope
    connect?: visitor_analyticsWhereUniqueInput | visitor_analyticsWhereUniqueInput[]
  }

  export type guestbook_entriesCreateNestedManyWithoutUsersInput = {
    create?: XOR<guestbook_entriesCreateWithoutUsersInput, guestbook_entriesUncheckedCreateWithoutUsersInput> | guestbook_entriesCreateWithoutUsersInput[] | guestbook_entriesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: guestbook_entriesCreateOrConnectWithoutUsersInput | guestbook_entriesCreateOrConnectWithoutUsersInput[]
    createMany?: guestbook_entriesCreateManyUsersInputEnvelope
    connect?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
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

  export type report_foldersCreateNestedManyWithoutCreatorInput = {
    create?: XOR<report_foldersCreateWithoutCreatorInput, report_foldersUncheckedCreateWithoutCreatorInput> | report_foldersCreateWithoutCreatorInput[] | report_foldersUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutCreatorInput | report_foldersCreateOrConnectWithoutCreatorInput[]
    createMany?: report_foldersCreateManyCreatorInputEnvelope
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
  }

  export type training_programsCreateNestedOneWithoutUsersInput = {
    create?: XOR<training_programsCreateWithoutUsersInput, training_programsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: training_programsCreateOrConnectWithoutUsersInput
    connect?: training_programsWhereUniqueInput
  }

  export type cohort_membersCreateNestedManyWithoutUserInput = {
    create?: XOR<cohort_membersCreateWithoutUserInput, cohort_membersUncheckedCreateWithoutUserInput> | cohort_membersCreateWithoutUserInput[] | cohort_membersUncheckedCreateWithoutUserInput[]
    connectOrCreate?: cohort_membersCreateOrConnectWithoutUserInput | cohort_membersCreateOrConnectWithoutUserInput[]
    createMany?: cohort_membersCreateManyUserInputEnvelope
    connect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
  }

  export type visitor_analyticsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<visitor_analyticsCreateWithoutUsersInput, visitor_analyticsUncheckedCreateWithoutUsersInput> | visitor_analyticsCreateWithoutUsersInput[] | visitor_analyticsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: visitor_analyticsCreateOrConnectWithoutUsersInput | visitor_analyticsCreateOrConnectWithoutUsersInput[]
    createMany?: visitor_analyticsCreateManyUsersInputEnvelope
    connect?: visitor_analyticsWhereUniqueInput | visitor_analyticsWhereUniqueInput[]
  }

  export type guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<guestbook_entriesCreateWithoutUsersInput, guestbook_entriesUncheckedCreateWithoutUsersInput> | guestbook_entriesCreateWithoutUsersInput[] | guestbook_entriesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: guestbook_entriesCreateOrConnectWithoutUsersInput | guestbook_entriesCreateOrConnectWithoutUsersInput[]
    createMany?: guestbook_entriesCreateManyUsersInputEnvelope
    connect?: guestbook_entriesWhereUniqueInput | guestbook_entriesWhereUniqueInput[]
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

  export type report_foldersUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<report_foldersCreateWithoutCreatorInput, report_foldersUncheckedCreateWithoutCreatorInput> | report_foldersCreateWithoutCreatorInput[] | report_foldersUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutCreatorInput | report_foldersCreateOrConnectWithoutCreatorInput[]
    createMany?: report_foldersCreateManyCreatorInputEnvelope
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
  }

  export type cohort_membersUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<cohort_membersCreateWithoutUserInput, cohort_membersUncheckedCreateWithoutUserInput> | cohort_membersCreateWithoutUserInput[] | cohort_membersUncheckedCreateWithoutUserInput[]
    connectOrCreate?: cohort_membersCreateOrConnectWithoutUserInput | cohort_membersCreateOrConnectWithoutUserInput[]
    createMany?: cohort_membersCreateManyUserInputEnvelope
    connect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type visitor_analyticsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<visitor_analyticsCreateWithoutUsersInput, visitor_analyticsUncheckedCreateWithoutUsersInput> | visitor_analyticsCreateWithoutUsersInput[] | visitor_analyticsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: visitor_analyticsCreateOrConnectWithoutUsersInput | visitor_analyticsCreateOrConnectWithoutUsersInput[]
    upsert?: visitor_analyticsUpsertWithWhereUniqueWithoutUsersInput | visitor_analyticsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: visitor_analyticsCreateManyUsersInputEnvelope
    set?: visitor_analyticsWhereUniqueInput | visitor_analyticsWhereUniqueInput[]
    disconnect?: visitor_analyticsWhereUniqueInput | visitor_analyticsWhereUniqueInput[]
    delete?: visitor_analyticsWhereUniqueInput | visitor_analyticsWhereUniqueInput[]
    connect?: visitor_analyticsWhereUniqueInput | visitor_analyticsWhereUniqueInput[]
    update?: visitor_analyticsUpdateWithWhereUniqueWithoutUsersInput | visitor_analyticsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: visitor_analyticsUpdateManyWithWhereWithoutUsersInput | visitor_analyticsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: visitor_analyticsScalarWhereInput | visitor_analyticsScalarWhereInput[]
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

  export type report_foldersUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<report_foldersCreateWithoutCreatorInput, report_foldersUncheckedCreateWithoutCreatorInput> | report_foldersCreateWithoutCreatorInput[] | report_foldersUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutCreatorInput | report_foldersCreateOrConnectWithoutCreatorInput[]
    upsert?: report_foldersUpsertWithWhereUniqueWithoutCreatorInput | report_foldersUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: report_foldersCreateManyCreatorInputEnvelope
    set?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    disconnect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    delete?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    update?: report_foldersUpdateWithWhereUniqueWithoutCreatorInput | report_foldersUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: report_foldersUpdateManyWithWhereWithoutCreatorInput | report_foldersUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: report_foldersScalarWhereInput | report_foldersScalarWhereInput[]
  }

  export type training_programsUpdateOneWithoutUsersNestedInput = {
    create?: XOR<training_programsCreateWithoutUsersInput, training_programsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: training_programsCreateOrConnectWithoutUsersInput
    upsert?: training_programsUpsertWithoutUsersInput
    disconnect?: training_programsWhereInput | boolean
    delete?: training_programsWhereInput | boolean
    connect?: training_programsWhereUniqueInput
    update?: XOR<XOR<training_programsUpdateToOneWithWhereWithoutUsersInput, training_programsUpdateWithoutUsersInput>, training_programsUncheckedUpdateWithoutUsersInput>
  }

  export type cohort_membersUpdateManyWithoutUserNestedInput = {
    create?: XOR<cohort_membersCreateWithoutUserInput, cohort_membersUncheckedCreateWithoutUserInput> | cohort_membersCreateWithoutUserInput[] | cohort_membersUncheckedCreateWithoutUserInput[]
    connectOrCreate?: cohort_membersCreateOrConnectWithoutUserInput | cohort_membersCreateOrConnectWithoutUserInput[]
    upsert?: cohort_membersUpsertWithWhereUniqueWithoutUserInput | cohort_membersUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: cohort_membersCreateManyUserInputEnvelope
    set?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    disconnect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    delete?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    connect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    update?: cohort_membersUpdateWithWhereUniqueWithoutUserInput | cohort_membersUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: cohort_membersUpdateManyWithWhereWithoutUserInput | cohort_membersUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: cohort_membersScalarWhereInput | cohort_membersScalarWhereInput[]
  }

  export type visitor_analyticsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<visitor_analyticsCreateWithoutUsersInput, visitor_analyticsUncheckedCreateWithoutUsersInput> | visitor_analyticsCreateWithoutUsersInput[] | visitor_analyticsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: visitor_analyticsCreateOrConnectWithoutUsersInput | visitor_analyticsCreateOrConnectWithoutUsersInput[]
    upsert?: visitor_analyticsUpsertWithWhereUniqueWithoutUsersInput | visitor_analyticsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: visitor_analyticsCreateManyUsersInputEnvelope
    set?: visitor_analyticsWhereUniqueInput | visitor_analyticsWhereUniqueInput[]
    disconnect?: visitor_analyticsWhereUniqueInput | visitor_analyticsWhereUniqueInput[]
    delete?: visitor_analyticsWhereUniqueInput | visitor_analyticsWhereUniqueInput[]
    connect?: visitor_analyticsWhereUniqueInput | visitor_analyticsWhereUniqueInput[]
    update?: visitor_analyticsUpdateWithWhereUniqueWithoutUsersInput | visitor_analyticsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: visitor_analyticsUpdateManyWithWhereWithoutUsersInput | visitor_analyticsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: visitor_analyticsScalarWhereInput | visitor_analyticsScalarWhereInput[]
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

  export type report_foldersUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<report_foldersCreateWithoutCreatorInput, report_foldersUncheckedCreateWithoutCreatorInput> | report_foldersCreateWithoutCreatorInput[] | report_foldersUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutCreatorInput | report_foldersCreateOrConnectWithoutCreatorInput[]
    upsert?: report_foldersUpsertWithWhereUniqueWithoutCreatorInput | report_foldersUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: report_foldersCreateManyCreatorInputEnvelope
    set?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    disconnect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    delete?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    update?: report_foldersUpdateWithWhereUniqueWithoutCreatorInput | report_foldersUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: report_foldersUpdateManyWithWhereWithoutCreatorInput | report_foldersUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: report_foldersScalarWhereInput | report_foldersScalarWhereInput[]
  }

  export type cohort_membersUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<cohort_membersCreateWithoutUserInput, cohort_membersUncheckedCreateWithoutUserInput> | cohort_membersCreateWithoutUserInput[] | cohort_membersUncheckedCreateWithoutUserInput[]
    connectOrCreate?: cohort_membersCreateOrConnectWithoutUserInput | cohort_membersCreateOrConnectWithoutUserInput[]
    upsert?: cohort_membersUpsertWithWhereUniqueWithoutUserInput | cohort_membersUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: cohort_membersCreateManyUserInputEnvelope
    set?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    disconnect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    delete?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    connect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    update?: cohort_membersUpdateWithWhereUniqueWithoutUserInput | cohort_membersUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: cohort_membersUpdateManyWithWhereWithoutUserInput | cohort_membersUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: cohort_membersScalarWhereInput | cohort_membersScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutCreated_foldersInput = {
    create?: XOR<usersCreateWithoutCreated_foldersInput, usersUncheckedCreateWithoutCreated_foldersInput>
    connectOrCreate?: usersCreateOrConnectWithoutCreated_foldersInput
    connect?: usersWhereUniqueInput
  }

  export type training_programsCreateNestedOneWithoutFoldersInput = {
    create?: XOR<training_programsCreateWithoutFoldersInput, training_programsUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: training_programsCreateOrConnectWithoutFoldersInput
    connect?: training_programsWhereUniqueInput
  }

  export type training_cohortsCreateNestedOneWithoutFoldersInput = {
    create?: XOR<training_cohortsCreateWithoutFoldersInput, training_cohortsUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: training_cohortsCreateOrConnectWithoutFoldersInput
    connect?: training_cohortsWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutCreated_foldersNestedInput = {
    create?: XOR<usersCreateWithoutCreated_foldersInput, usersUncheckedCreateWithoutCreated_foldersInput>
    connectOrCreate?: usersCreateOrConnectWithoutCreated_foldersInput
    upsert?: usersUpsertWithoutCreated_foldersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCreated_foldersInput, usersUpdateWithoutCreated_foldersInput>, usersUncheckedUpdateWithoutCreated_foldersInput>
  }

  export type training_programsUpdateOneWithoutFoldersNestedInput = {
    create?: XOR<training_programsCreateWithoutFoldersInput, training_programsUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: training_programsCreateOrConnectWithoutFoldersInput
    upsert?: training_programsUpsertWithoutFoldersInput
    disconnect?: training_programsWhereInput | boolean
    delete?: training_programsWhereInput | boolean
    connect?: training_programsWhereUniqueInput
    update?: XOR<XOR<training_programsUpdateToOneWithWhereWithoutFoldersInput, training_programsUpdateWithoutFoldersInput>, training_programsUncheckedUpdateWithoutFoldersInput>
  }

  export type training_cohortsUpdateOneWithoutFoldersNestedInput = {
    create?: XOR<training_cohortsCreateWithoutFoldersInput, training_cohortsUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: training_cohortsCreateOrConnectWithoutFoldersInput
    upsert?: training_cohortsUpsertWithoutFoldersInput
    disconnect?: training_cohortsWhereInput | boolean
    delete?: training_cohortsWhereInput | boolean
    connect?: training_cohortsWhereUniqueInput
    update?: XOR<XOR<training_cohortsUpdateToOneWithWhereWithoutFoldersInput, training_cohortsUpdateWithoutFoldersInput>, training_cohortsUncheckedUpdateWithoutFoldersInput>
  }

  export type usersCreateNestedManyWithoutTraining_programInput = {
    create?: XOR<usersCreateWithoutTraining_programInput, usersUncheckedCreateWithoutTraining_programInput> | usersCreateWithoutTraining_programInput[] | usersUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: usersCreateOrConnectWithoutTraining_programInput | usersCreateOrConnectWithoutTraining_programInput[]
    createMany?: usersCreateManyTraining_programInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type training_cohortsCreateNestedManyWithoutTraining_programInput = {
    create?: XOR<training_cohortsCreateWithoutTraining_programInput, training_cohortsUncheckedCreateWithoutTraining_programInput> | training_cohortsCreateWithoutTraining_programInput[] | training_cohortsUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: training_cohortsCreateOrConnectWithoutTraining_programInput | training_cohortsCreateOrConnectWithoutTraining_programInput[]
    createMany?: training_cohortsCreateManyTraining_programInputEnvelope
    connect?: training_cohortsWhereUniqueInput | training_cohortsWhereUniqueInput[]
  }

  export type report_foldersCreateNestedManyWithoutTraining_programInput = {
    create?: XOR<report_foldersCreateWithoutTraining_programInput, report_foldersUncheckedCreateWithoutTraining_programInput> | report_foldersCreateWithoutTraining_programInput[] | report_foldersUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutTraining_programInput | report_foldersCreateOrConnectWithoutTraining_programInput[]
    createMany?: report_foldersCreateManyTraining_programInputEnvelope
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutTraining_programInput = {
    create?: XOR<usersCreateWithoutTraining_programInput, usersUncheckedCreateWithoutTraining_programInput> | usersCreateWithoutTraining_programInput[] | usersUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: usersCreateOrConnectWithoutTraining_programInput | usersCreateOrConnectWithoutTraining_programInput[]
    createMany?: usersCreateManyTraining_programInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type training_cohortsUncheckedCreateNestedManyWithoutTraining_programInput = {
    create?: XOR<training_cohortsCreateWithoutTraining_programInput, training_cohortsUncheckedCreateWithoutTraining_programInput> | training_cohortsCreateWithoutTraining_programInput[] | training_cohortsUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: training_cohortsCreateOrConnectWithoutTraining_programInput | training_cohortsCreateOrConnectWithoutTraining_programInput[]
    createMany?: training_cohortsCreateManyTraining_programInputEnvelope
    connect?: training_cohortsWhereUniqueInput | training_cohortsWhereUniqueInput[]
  }

  export type report_foldersUncheckedCreateNestedManyWithoutTraining_programInput = {
    create?: XOR<report_foldersCreateWithoutTraining_programInput, report_foldersUncheckedCreateWithoutTraining_programInput> | report_foldersCreateWithoutTraining_programInput[] | report_foldersUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutTraining_programInput | report_foldersCreateOrConnectWithoutTraining_programInput[]
    createMany?: report_foldersCreateManyTraining_programInputEnvelope
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
  }

  export type usersUpdateManyWithoutTraining_programNestedInput = {
    create?: XOR<usersCreateWithoutTraining_programInput, usersUncheckedCreateWithoutTraining_programInput> | usersCreateWithoutTraining_programInput[] | usersUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: usersCreateOrConnectWithoutTraining_programInput | usersCreateOrConnectWithoutTraining_programInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutTraining_programInput | usersUpsertWithWhereUniqueWithoutTraining_programInput[]
    createMany?: usersCreateManyTraining_programInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutTraining_programInput | usersUpdateWithWhereUniqueWithoutTraining_programInput[]
    updateMany?: usersUpdateManyWithWhereWithoutTraining_programInput | usersUpdateManyWithWhereWithoutTraining_programInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type training_cohortsUpdateManyWithoutTraining_programNestedInput = {
    create?: XOR<training_cohortsCreateWithoutTraining_programInput, training_cohortsUncheckedCreateWithoutTraining_programInput> | training_cohortsCreateWithoutTraining_programInput[] | training_cohortsUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: training_cohortsCreateOrConnectWithoutTraining_programInput | training_cohortsCreateOrConnectWithoutTraining_programInput[]
    upsert?: training_cohortsUpsertWithWhereUniqueWithoutTraining_programInput | training_cohortsUpsertWithWhereUniqueWithoutTraining_programInput[]
    createMany?: training_cohortsCreateManyTraining_programInputEnvelope
    set?: training_cohortsWhereUniqueInput | training_cohortsWhereUniqueInput[]
    disconnect?: training_cohortsWhereUniqueInput | training_cohortsWhereUniqueInput[]
    delete?: training_cohortsWhereUniqueInput | training_cohortsWhereUniqueInput[]
    connect?: training_cohortsWhereUniqueInput | training_cohortsWhereUniqueInput[]
    update?: training_cohortsUpdateWithWhereUniqueWithoutTraining_programInput | training_cohortsUpdateWithWhereUniqueWithoutTraining_programInput[]
    updateMany?: training_cohortsUpdateManyWithWhereWithoutTraining_programInput | training_cohortsUpdateManyWithWhereWithoutTraining_programInput[]
    deleteMany?: training_cohortsScalarWhereInput | training_cohortsScalarWhereInput[]
  }

  export type report_foldersUpdateManyWithoutTraining_programNestedInput = {
    create?: XOR<report_foldersCreateWithoutTraining_programInput, report_foldersUncheckedCreateWithoutTraining_programInput> | report_foldersCreateWithoutTraining_programInput[] | report_foldersUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutTraining_programInput | report_foldersCreateOrConnectWithoutTraining_programInput[]
    upsert?: report_foldersUpsertWithWhereUniqueWithoutTraining_programInput | report_foldersUpsertWithWhereUniqueWithoutTraining_programInput[]
    createMany?: report_foldersCreateManyTraining_programInputEnvelope
    set?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    disconnect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    delete?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    update?: report_foldersUpdateWithWhereUniqueWithoutTraining_programInput | report_foldersUpdateWithWhereUniqueWithoutTraining_programInput[]
    updateMany?: report_foldersUpdateManyWithWhereWithoutTraining_programInput | report_foldersUpdateManyWithWhereWithoutTraining_programInput[]
    deleteMany?: report_foldersScalarWhereInput | report_foldersScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutTraining_programNestedInput = {
    create?: XOR<usersCreateWithoutTraining_programInput, usersUncheckedCreateWithoutTraining_programInput> | usersCreateWithoutTraining_programInput[] | usersUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: usersCreateOrConnectWithoutTraining_programInput | usersCreateOrConnectWithoutTraining_programInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutTraining_programInput | usersUpsertWithWhereUniqueWithoutTraining_programInput[]
    createMany?: usersCreateManyTraining_programInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutTraining_programInput | usersUpdateWithWhereUniqueWithoutTraining_programInput[]
    updateMany?: usersUpdateManyWithWhereWithoutTraining_programInput | usersUpdateManyWithWhereWithoutTraining_programInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type training_cohortsUncheckedUpdateManyWithoutTraining_programNestedInput = {
    create?: XOR<training_cohortsCreateWithoutTraining_programInput, training_cohortsUncheckedCreateWithoutTraining_programInput> | training_cohortsCreateWithoutTraining_programInput[] | training_cohortsUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: training_cohortsCreateOrConnectWithoutTraining_programInput | training_cohortsCreateOrConnectWithoutTraining_programInput[]
    upsert?: training_cohortsUpsertWithWhereUniqueWithoutTraining_programInput | training_cohortsUpsertWithWhereUniqueWithoutTraining_programInput[]
    createMany?: training_cohortsCreateManyTraining_programInputEnvelope
    set?: training_cohortsWhereUniqueInput | training_cohortsWhereUniqueInput[]
    disconnect?: training_cohortsWhereUniqueInput | training_cohortsWhereUniqueInput[]
    delete?: training_cohortsWhereUniqueInput | training_cohortsWhereUniqueInput[]
    connect?: training_cohortsWhereUniqueInput | training_cohortsWhereUniqueInput[]
    update?: training_cohortsUpdateWithWhereUniqueWithoutTraining_programInput | training_cohortsUpdateWithWhereUniqueWithoutTraining_programInput[]
    updateMany?: training_cohortsUpdateManyWithWhereWithoutTraining_programInput | training_cohortsUpdateManyWithWhereWithoutTraining_programInput[]
    deleteMany?: training_cohortsScalarWhereInput | training_cohortsScalarWhereInput[]
  }

  export type report_foldersUncheckedUpdateManyWithoutTraining_programNestedInput = {
    create?: XOR<report_foldersCreateWithoutTraining_programInput, report_foldersUncheckedCreateWithoutTraining_programInput> | report_foldersCreateWithoutTraining_programInput[] | report_foldersUncheckedCreateWithoutTraining_programInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutTraining_programInput | report_foldersCreateOrConnectWithoutTraining_programInput[]
    upsert?: report_foldersUpsertWithWhereUniqueWithoutTraining_programInput | report_foldersUpsertWithWhereUniqueWithoutTraining_programInput[]
    createMany?: report_foldersCreateManyTraining_programInputEnvelope
    set?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    disconnect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    delete?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    update?: report_foldersUpdateWithWhereUniqueWithoutTraining_programInput | report_foldersUpdateWithWhereUniqueWithoutTraining_programInput[]
    updateMany?: report_foldersUpdateManyWithWhereWithoutTraining_programInput | report_foldersUpdateManyWithWhereWithoutTraining_programInput[]
    deleteMany?: report_foldersScalarWhereInput | report_foldersScalarWhereInput[]
  }

  export type training_programsCreateNestedOneWithoutCohortsInput = {
    create?: XOR<training_programsCreateWithoutCohortsInput, training_programsUncheckedCreateWithoutCohortsInput>
    connectOrCreate?: training_programsCreateOrConnectWithoutCohortsInput
    connect?: training_programsWhereUniqueInput
  }

  export type cohort_membersCreateNestedManyWithoutCohortInput = {
    create?: XOR<cohort_membersCreateWithoutCohortInput, cohort_membersUncheckedCreateWithoutCohortInput> | cohort_membersCreateWithoutCohortInput[] | cohort_membersUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: cohort_membersCreateOrConnectWithoutCohortInput | cohort_membersCreateOrConnectWithoutCohortInput[]
    createMany?: cohort_membersCreateManyCohortInputEnvelope
    connect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
  }

  export type report_foldersCreateNestedManyWithoutCohortInput = {
    create?: XOR<report_foldersCreateWithoutCohortInput, report_foldersUncheckedCreateWithoutCohortInput> | report_foldersCreateWithoutCohortInput[] | report_foldersUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutCohortInput | report_foldersCreateOrConnectWithoutCohortInput[]
    createMany?: report_foldersCreateManyCohortInputEnvelope
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
  }

  export type cohort_membersUncheckedCreateNestedManyWithoutCohortInput = {
    create?: XOR<cohort_membersCreateWithoutCohortInput, cohort_membersUncheckedCreateWithoutCohortInput> | cohort_membersCreateWithoutCohortInput[] | cohort_membersUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: cohort_membersCreateOrConnectWithoutCohortInput | cohort_membersCreateOrConnectWithoutCohortInput[]
    createMany?: cohort_membersCreateManyCohortInputEnvelope
    connect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
  }

  export type report_foldersUncheckedCreateNestedManyWithoutCohortInput = {
    create?: XOR<report_foldersCreateWithoutCohortInput, report_foldersUncheckedCreateWithoutCohortInput> | report_foldersCreateWithoutCohortInput[] | report_foldersUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutCohortInput | report_foldersCreateOrConnectWithoutCohortInput[]
    createMany?: report_foldersCreateManyCohortInputEnvelope
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
  }

  export type EnumCohortStatusFieldUpdateOperationsInput = {
    set?: $Enums.CohortStatus
  }

  export type training_programsUpdateOneRequiredWithoutCohortsNestedInput = {
    create?: XOR<training_programsCreateWithoutCohortsInput, training_programsUncheckedCreateWithoutCohortsInput>
    connectOrCreate?: training_programsCreateOrConnectWithoutCohortsInput
    upsert?: training_programsUpsertWithoutCohortsInput
    connect?: training_programsWhereUniqueInput
    update?: XOR<XOR<training_programsUpdateToOneWithWhereWithoutCohortsInput, training_programsUpdateWithoutCohortsInput>, training_programsUncheckedUpdateWithoutCohortsInput>
  }

  export type cohort_membersUpdateManyWithoutCohortNestedInput = {
    create?: XOR<cohort_membersCreateWithoutCohortInput, cohort_membersUncheckedCreateWithoutCohortInput> | cohort_membersCreateWithoutCohortInput[] | cohort_membersUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: cohort_membersCreateOrConnectWithoutCohortInput | cohort_membersCreateOrConnectWithoutCohortInput[]
    upsert?: cohort_membersUpsertWithWhereUniqueWithoutCohortInput | cohort_membersUpsertWithWhereUniqueWithoutCohortInput[]
    createMany?: cohort_membersCreateManyCohortInputEnvelope
    set?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    disconnect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    delete?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    connect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    update?: cohort_membersUpdateWithWhereUniqueWithoutCohortInput | cohort_membersUpdateWithWhereUniqueWithoutCohortInput[]
    updateMany?: cohort_membersUpdateManyWithWhereWithoutCohortInput | cohort_membersUpdateManyWithWhereWithoutCohortInput[]
    deleteMany?: cohort_membersScalarWhereInput | cohort_membersScalarWhereInput[]
  }

  export type report_foldersUpdateManyWithoutCohortNestedInput = {
    create?: XOR<report_foldersCreateWithoutCohortInput, report_foldersUncheckedCreateWithoutCohortInput> | report_foldersCreateWithoutCohortInput[] | report_foldersUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutCohortInput | report_foldersCreateOrConnectWithoutCohortInput[]
    upsert?: report_foldersUpsertWithWhereUniqueWithoutCohortInput | report_foldersUpsertWithWhereUniqueWithoutCohortInput[]
    createMany?: report_foldersCreateManyCohortInputEnvelope
    set?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    disconnect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    delete?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    update?: report_foldersUpdateWithWhereUniqueWithoutCohortInput | report_foldersUpdateWithWhereUniqueWithoutCohortInput[]
    updateMany?: report_foldersUpdateManyWithWhereWithoutCohortInput | report_foldersUpdateManyWithWhereWithoutCohortInput[]
    deleteMany?: report_foldersScalarWhereInput | report_foldersScalarWhereInput[]
  }

  export type cohort_membersUncheckedUpdateManyWithoutCohortNestedInput = {
    create?: XOR<cohort_membersCreateWithoutCohortInput, cohort_membersUncheckedCreateWithoutCohortInput> | cohort_membersCreateWithoutCohortInput[] | cohort_membersUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: cohort_membersCreateOrConnectWithoutCohortInput | cohort_membersCreateOrConnectWithoutCohortInput[]
    upsert?: cohort_membersUpsertWithWhereUniqueWithoutCohortInput | cohort_membersUpsertWithWhereUniqueWithoutCohortInput[]
    createMany?: cohort_membersCreateManyCohortInputEnvelope
    set?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    disconnect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    delete?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    connect?: cohort_membersWhereUniqueInput | cohort_membersWhereUniqueInput[]
    update?: cohort_membersUpdateWithWhereUniqueWithoutCohortInput | cohort_membersUpdateWithWhereUniqueWithoutCohortInput[]
    updateMany?: cohort_membersUpdateManyWithWhereWithoutCohortInput | cohort_membersUpdateManyWithWhereWithoutCohortInput[]
    deleteMany?: cohort_membersScalarWhereInput | cohort_membersScalarWhereInput[]
  }

  export type report_foldersUncheckedUpdateManyWithoutCohortNestedInput = {
    create?: XOR<report_foldersCreateWithoutCohortInput, report_foldersUncheckedCreateWithoutCohortInput> | report_foldersCreateWithoutCohortInput[] | report_foldersUncheckedCreateWithoutCohortInput[]
    connectOrCreate?: report_foldersCreateOrConnectWithoutCohortInput | report_foldersCreateOrConnectWithoutCohortInput[]
    upsert?: report_foldersUpsertWithWhereUniqueWithoutCohortInput | report_foldersUpsertWithWhereUniqueWithoutCohortInput[]
    createMany?: report_foldersCreateManyCohortInputEnvelope
    set?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    disconnect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    delete?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    connect?: report_foldersWhereUniqueInput | report_foldersWhereUniqueInput[]
    update?: report_foldersUpdateWithWhereUniqueWithoutCohortInput | report_foldersUpdateWithWhereUniqueWithoutCohortInput[]
    updateMany?: report_foldersUpdateManyWithWhereWithoutCohortInput | report_foldersUpdateManyWithWhereWithoutCohortInput[]
    deleteMany?: report_foldersScalarWhereInput | report_foldersScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutCohort_membershipsInput = {
    create?: XOR<usersCreateWithoutCohort_membershipsInput, usersUncheckedCreateWithoutCohort_membershipsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCohort_membershipsInput
    connect?: usersWhereUniqueInput
  }

  export type training_cohortsCreateNestedOneWithoutMembersInput = {
    create?: XOR<training_cohortsCreateWithoutMembersInput, training_cohortsUncheckedCreateWithoutMembersInput>
    connectOrCreate?: training_cohortsCreateOrConnectWithoutMembersInput
    connect?: training_cohortsWhereUniqueInput
  }

  export type EnumMemberStatusFieldUpdateOperationsInput = {
    set?: $Enums.MemberStatus
  }

  export type usersUpdateOneRequiredWithoutCohort_membershipsNestedInput = {
    create?: XOR<usersCreateWithoutCohort_membershipsInput, usersUncheckedCreateWithoutCohort_membershipsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCohort_membershipsInput
    upsert?: usersUpsertWithoutCohort_membershipsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCohort_membershipsInput, usersUpdateWithoutCohort_membershipsInput>, usersUncheckedUpdateWithoutCohort_membershipsInput>
  }

  export type training_cohortsUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<training_cohortsCreateWithoutMembersInput, training_cohortsUncheckedCreateWithoutMembersInput>
    connectOrCreate?: training_cohortsCreateOrConnectWithoutMembersInput
    upsert?: training_cohortsUpsertWithoutMembersInput
    connect?: training_cohortsWhereUniqueInput
    update?: XOR<XOR<training_cohortsUpdateToOneWithWhereWithoutMembersInput, training_cohortsUpdateWithoutMembersInput>, training_cohortsUncheckedUpdateWithoutMembersInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumCohortStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CohortStatus | EnumCohortStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CohortStatus[] | ListEnumCohortStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CohortStatus[] | ListEnumCohortStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCohortStatusFilter<$PrismaModel> | $Enums.CohortStatus
  }

  export type NestedEnumCohortStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CohortStatus | EnumCohortStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CohortStatus[] | ListEnumCohortStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CohortStatus[] | ListEnumCohortStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCohortStatusWithAggregatesFilter<$PrismaModel> | $Enums.CohortStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCohortStatusFilter<$PrismaModel>
    _max?: NestedEnumCohortStatusFilter<$PrismaModel>
  }

  export type NestedEnumMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusFilter<$PrismaModel> | $Enums.MemberStatus
  }

  export type NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.MemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumMemberStatusFilter<$PrismaModel>
  }

  export type usersCreateWithoutVisitor_analyticsInput = {
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
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersCreateNestedManyWithoutCreatorInput
    training_program?: training_programsCreateNestedOneWithoutUsersInput
    cohort_memberships?: cohort_membersCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutVisitor_analyticsInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    training_program_id?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersUncheckedCreateNestedManyWithoutCreatorInput
    cohort_memberships?: cohort_membersUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutVisitor_analyticsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutVisitor_analyticsInput, usersUncheckedCreateWithoutVisitor_analyticsInput>
  }

  export type usersUpsertWithoutVisitor_analyticsInput = {
    update: XOR<usersUpdateWithoutVisitor_analyticsInput, usersUncheckedUpdateWithoutVisitor_analyticsInput>
    create: XOR<usersCreateWithoutVisitor_analyticsInput, usersUncheckedCreateWithoutVisitor_analyticsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutVisitor_analyticsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutVisitor_analyticsInput, usersUncheckedUpdateWithoutVisitor_analyticsInput>
  }

  export type usersUpdateWithoutVisitor_analyticsInput = {
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
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUpdateManyWithoutCreatorNestedInput
    training_program?: training_programsUpdateOneWithoutUsersNestedInput
    cohort_memberships?: cohort_membersUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutVisitor_analyticsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUncheckedUpdateManyWithoutCreatorNestedInput
    cohort_memberships?: cohort_membersUncheckedUpdateManyWithoutUserNestedInput
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
    visitor_analytics?: visitor_analyticsCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersCreateNestedManyWithoutCreatorInput
    training_program?: training_programsCreateNestedOneWithoutUsersInput
    cohort_memberships?: cohort_membersCreateNestedManyWithoutUserInput
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
    training_program_id?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    visitor_analytics?: visitor_analyticsUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersUncheckedCreateNestedManyWithoutCreatorInput
    cohort_memberships?: cohort_membersUncheckedCreateNestedManyWithoutUserInput
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
    visitor_analytics?: visitor_analyticsUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUpdateManyWithoutCreatorNestedInput
    training_program?: training_programsUpdateOneWithoutUsersNestedInput
    cohort_memberships?: cohort_membersUpdateManyWithoutUserNestedInput
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
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visitor_analytics?: visitor_analyticsUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUncheckedUpdateManyWithoutCreatorNestedInput
    cohort_memberships?: cohort_membersUncheckedUpdateManyWithoutUserNestedInput
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
    visitor_analytics?: visitor_analyticsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersCreateNestedManyWithoutCreatorInput
    training_program?: training_programsCreateNestedOneWithoutUsersInput
    cohort_memberships?: cohort_membersCreateNestedManyWithoutUserInput
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
    training_program_id?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    visitor_analytics?: visitor_analyticsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersUncheckedCreateNestedManyWithoutCreatorInput
    cohort_memberships?: cohort_membersUncheckedCreateNestedManyWithoutUserInput
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
    visitor_analytics?: visitor_analyticsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersCreateNestedManyWithoutCreatorInput
    training_program?: training_programsCreateNestedOneWithoutUsersInput
    cohort_memberships?: cohort_membersCreateNestedManyWithoutUserInput
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
    training_program_id?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    visitor_analytics?: visitor_analyticsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersUncheckedCreateNestedManyWithoutCreatorInput
    cohort_memberships?: cohort_membersUncheckedCreateNestedManyWithoutUserInput
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
    file_type?: string | null
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
    file_type?: string | null
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
    visitor_analytics?: visitor_analyticsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUpdateManyWithoutCreatorNestedInput
    training_program?: training_programsUpdateOneWithoutUsersNestedInput
    cohort_memberships?: cohort_membersUpdateManyWithoutUserNestedInput
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
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visitor_analytics?: visitor_analyticsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUncheckedUpdateManyWithoutCreatorNestedInput
    cohort_memberships?: cohort_membersUncheckedUpdateManyWithoutUserNestedInput
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
    visitor_analytics?: visitor_analyticsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUpdateManyWithoutCreatorNestedInput
    training_program?: training_programsUpdateOneWithoutUsersNestedInput
    cohort_memberships?: cohort_membersUpdateManyWithoutUserNestedInput
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
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visitor_analytics?: visitor_analyticsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUncheckedUpdateManyWithoutCreatorNestedInput
    cohort_memberships?: cohort_membersUncheckedUpdateManyWithoutUserNestedInput
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
    file_type?: StringNullableFilter<"uploaded_files"> | string | null
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
    visitor_analytics?: visitor_analyticsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    created_folders?: report_foldersCreateNestedManyWithoutCreatorInput
    training_program?: training_programsCreateNestedOneWithoutUsersInput
    cohort_memberships?: cohort_membersCreateNestedManyWithoutUserInput
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
    training_program_id?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    visitor_analytics?: visitor_analyticsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    created_folders?: report_foldersUncheckedCreateNestedManyWithoutCreatorInput
    cohort_memberships?: cohort_membersUncheckedCreateNestedManyWithoutUserInput
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
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
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
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    author_id: string
    assignee_id?: string | null
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
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
    visitor_analytics?: visitor_analyticsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    created_folders?: report_foldersUpdateManyWithoutCreatorNestedInput
    training_program?: training_programsUpdateOneWithoutUsersNestedInput
    cohort_memberships?: cohort_membersUpdateManyWithoutUserNestedInput
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
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visitor_analytics?: visitor_analyticsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    created_folders?: report_foldersUncheckedUpdateManyWithoutCreatorNestedInput
    cohort_memberships?: cohort_membersUncheckedUpdateManyWithoutUserNestedInput
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
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    author_id?: StringFieldUpdateOperationsInput | string
    assignee_id?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type visitor_analyticsCreateWithoutUsersInput = {
    id: string
    ip_address?: string | null
    user_agent?: string | null
    page_path: string
    page_title?: string | null
    referrer?: string | null
    session_id?: string | null
    visit_duration?: number | null
    created_at?: Date | string
  }

  export type visitor_analyticsUncheckedCreateWithoutUsersInput = {
    id: string
    ip_address?: string | null
    user_agent?: string | null
    page_path: string
    page_title?: string | null
    referrer?: string | null
    session_id?: string | null
    visit_duration?: number | null
    created_at?: Date | string
  }

  export type visitor_analyticsCreateOrConnectWithoutUsersInput = {
    where: visitor_analyticsWhereUniqueInput
    create: XOR<visitor_analyticsCreateWithoutUsersInput, visitor_analyticsUncheckedCreateWithoutUsersInput>
  }

  export type visitor_analyticsCreateManyUsersInputEnvelope = {
    data: visitor_analyticsCreateManyUsersInput | visitor_analyticsCreateManyUsersInput[]
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

  export type reportsCreateWithoutUsers_reports_assignee_idTousersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
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
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    author_id: string
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
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
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
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
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    assignee_id?: string | null
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
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
    file_type?: string | null
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
    file_type?: string | null
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

  export type report_foldersCreateWithoutCreatorInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    training_program?: training_programsCreateNestedOneWithoutFoldersInput
    cohort?: training_cohortsCreateNestedOneWithoutFoldersInput
  }

  export type report_foldersUncheckedCreateWithoutCreatorInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    training_program_id?: string | null
    cohort_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type report_foldersCreateOrConnectWithoutCreatorInput = {
    where: report_foldersWhereUniqueInput
    create: XOR<report_foldersCreateWithoutCreatorInput, report_foldersUncheckedCreateWithoutCreatorInput>
  }

  export type report_foldersCreateManyCreatorInputEnvelope = {
    data: report_foldersCreateManyCreatorInput | report_foldersCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type training_programsCreateWithoutUsersInput = {
    id?: string
    name: string
    full_name: string
    description?: string | null
    duration_days?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    cohorts?: training_cohortsCreateNestedManyWithoutTraining_programInput
    folders?: report_foldersCreateNestedManyWithoutTraining_programInput
  }

  export type training_programsUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    full_name: string
    description?: string | null
    duration_days?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    cohorts?: training_cohortsUncheckedCreateNestedManyWithoutTraining_programInput
    folders?: report_foldersUncheckedCreateNestedManyWithoutTraining_programInput
  }

  export type training_programsCreateOrConnectWithoutUsersInput = {
    where: training_programsWhereUniqueInput
    create: XOR<training_programsCreateWithoutUsersInput, training_programsUncheckedCreateWithoutUsersInput>
  }

  export type cohort_membersCreateWithoutUserInput = {
    id?: string
    joined_at?: Date | string
    status?: $Enums.MemberStatus
    notes?: string | null
    cohort: training_cohortsCreateNestedOneWithoutMembersInput
  }

  export type cohort_membersUncheckedCreateWithoutUserInput = {
    id?: string
    cohort_id: string
    joined_at?: Date | string
    status?: $Enums.MemberStatus
    notes?: string | null
  }

  export type cohort_membersCreateOrConnectWithoutUserInput = {
    where: cohort_membersWhereUniqueInput
    create: XOR<cohort_membersCreateWithoutUserInput, cohort_membersUncheckedCreateWithoutUserInput>
  }

  export type cohort_membersCreateManyUserInputEnvelope = {
    data: cohort_membersCreateManyUserInput | cohort_membersCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type visitor_analyticsUpsertWithWhereUniqueWithoutUsersInput = {
    where: visitor_analyticsWhereUniqueInput
    update: XOR<visitor_analyticsUpdateWithoutUsersInput, visitor_analyticsUncheckedUpdateWithoutUsersInput>
    create: XOR<visitor_analyticsCreateWithoutUsersInput, visitor_analyticsUncheckedCreateWithoutUsersInput>
  }

  export type visitor_analyticsUpdateWithWhereUniqueWithoutUsersInput = {
    where: visitor_analyticsWhereUniqueInput
    data: XOR<visitor_analyticsUpdateWithoutUsersInput, visitor_analyticsUncheckedUpdateWithoutUsersInput>
  }

  export type visitor_analyticsUpdateManyWithWhereWithoutUsersInput = {
    where: visitor_analyticsScalarWhereInput
    data: XOR<visitor_analyticsUpdateManyMutationInput, visitor_analyticsUncheckedUpdateManyWithoutUsersInput>
  }

  export type visitor_analyticsScalarWhereInput = {
    AND?: visitor_analyticsScalarWhereInput | visitor_analyticsScalarWhereInput[]
    OR?: visitor_analyticsScalarWhereInput[]
    NOT?: visitor_analyticsScalarWhereInput | visitor_analyticsScalarWhereInput[]
    id?: StringFilter<"visitor_analytics"> | string
    ip_address?: StringNullableFilter<"visitor_analytics"> | string | null
    user_agent?: StringNullableFilter<"visitor_analytics"> | string | null
    page_path?: StringFilter<"visitor_analytics"> | string
    page_title?: StringNullableFilter<"visitor_analytics"> | string | null
    referrer?: StringNullableFilter<"visitor_analytics"> | string | null
    session_id?: StringNullableFilter<"visitor_analytics"> | string | null
    user_id?: StringNullableFilter<"visitor_analytics"> | string | null
    visit_duration?: IntNullableFilter<"visitor_analytics"> | number | null
    created_at?: DateTimeFilter<"visitor_analytics"> | Date | string
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
    cover_image_url?: StringNullableFilter<"reports"> | string | null
    status?: EnumReportStatusFilter<"reports"> | $Enums.ReportStatus
    category?: StringNullableFilter<"reports"> | string | null
    priority?: EnumPriorityFilter<"reports"> | $Enums.Priority
    is_public?: BoolFilter<"reports"> | boolean
    max_access?: IntNullableFilter<"reports"> | number | null
    current_access?: IntNullableFilter<"reports"> | number | null
    tags?: StringNullableFilter<"reports"> | string | null
    author_id?: StringFilter<"reports"> | string
    assignee_id?: StringNullableFilter<"reports"> | string | null
    feedback?: StringNullableFilter<"reports"> | string | null
    verified_at?: DateTimeNullableFilter<"reports"> | Date | string | null
    rejected_at?: DateTimeNullableFilter<"reports"> | Date | string | null
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

  export type report_foldersUpsertWithWhereUniqueWithoutCreatorInput = {
    where: report_foldersWhereUniqueInput
    update: XOR<report_foldersUpdateWithoutCreatorInput, report_foldersUncheckedUpdateWithoutCreatorInput>
    create: XOR<report_foldersCreateWithoutCreatorInput, report_foldersUncheckedCreateWithoutCreatorInput>
  }

  export type report_foldersUpdateWithWhereUniqueWithoutCreatorInput = {
    where: report_foldersWhereUniqueInput
    data: XOR<report_foldersUpdateWithoutCreatorInput, report_foldersUncheckedUpdateWithoutCreatorInput>
  }

  export type report_foldersUpdateManyWithWhereWithoutCreatorInput = {
    where: report_foldersScalarWhereInput
    data: XOR<report_foldersUpdateManyMutationInput, report_foldersUncheckedUpdateManyWithoutCreatorInput>
  }

  export type report_foldersScalarWhereInput = {
    AND?: report_foldersScalarWhereInput | report_foldersScalarWhereInput[]
    OR?: report_foldersScalarWhereInput[]
    NOT?: report_foldersScalarWhereInput | report_foldersScalarWhereInput[]
    id?: StringFilter<"report_folders"> | string
    year?: StringFilter<"report_folders"> | string
    batch?: StringFilter<"report_folders"> | string
    report_type?: StringFilter<"report_folders"> | string
    description?: StringNullableFilter<"report_folders"> | string | null
    created_by?: StringFilter<"report_folders"> | string
    training_program_id?: StringNullableFilter<"report_folders"> | string | null
    cohort_id?: StringNullableFilter<"report_folders"> | string | null
    is_active?: BoolFilter<"report_folders"> | boolean
    created_at?: DateTimeFilter<"report_folders"> | Date | string
    updated_at?: DateTimeFilter<"report_folders"> | Date | string
  }

  export type training_programsUpsertWithoutUsersInput = {
    update: XOR<training_programsUpdateWithoutUsersInput, training_programsUncheckedUpdateWithoutUsersInput>
    create: XOR<training_programsCreateWithoutUsersInput, training_programsUncheckedCreateWithoutUsersInput>
    where?: training_programsWhereInput
  }

  export type training_programsUpdateToOneWithWhereWithoutUsersInput = {
    where?: training_programsWhereInput
    data: XOR<training_programsUpdateWithoutUsersInput, training_programsUncheckedUpdateWithoutUsersInput>
  }

  export type training_programsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    cohorts?: training_cohortsUpdateManyWithoutTraining_programNestedInput
    folders?: report_foldersUpdateManyWithoutTraining_programNestedInput
  }

  export type training_programsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    cohorts?: training_cohortsUncheckedUpdateManyWithoutTraining_programNestedInput
    folders?: report_foldersUncheckedUpdateManyWithoutTraining_programNestedInput
  }

  export type cohort_membersUpsertWithWhereUniqueWithoutUserInput = {
    where: cohort_membersWhereUniqueInput
    update: XOR<cohort_membersUpdateWithoutUserInput, cohort_membersUncheckedUpdateWithoutUserInput>
    create: XOR<cohort_membersCreateWithoutUserInput, cohort_membersUncheckedCreateWithoutUserInput>
  }

  export type cohort_membersUpdateWithWhereUniqueWithoutUserInput = {
    where: cohort_membersWhereUniqueInput
    data: XOR<cohort_membersUpdateWithoutUserInput, cohort_membersUncheckedUpdateWithoutUserInput>
  }

  export type cohort_membersUpdateManyWithWhereWithoutUserInput = {
    where: cohort_membersScalarWhereInput
    data: XOR<cohort_membersUpdateManyMutationInput, cohort_membersUncheckedUpdateManyWithoutUserInput>
  }

  export type cohort_membersScalarWhereInput = {
    AND?: cohort_membersScalarWhereInput | cohort_membersScalarWhereInput[]
    OR?: cohort_membersScalarWhereInput[]
    NOT?: cohort_membersScalarWhereInput | cohort_membersScalarWhereInput[]
    id?: StringFilter<"cohort_members"> | string
    user_id?: StringFilter<"cohort_members"> | string
    cohort_id?: StringFilter<"cohort_members"> | string
    joined_at?: DateTimeFilter<"cohort_members"> | Date | string
    status?: EnumMemberStatusFilter<"cohort_members"> | $Enums.MemberStatus
    notes?: StringNullableFilter<"cohort_members"> | string | null
  }

  export type usersCreateWithoutCreated_foldersInput = {
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
    visitor_analytics?: visitor_analyticsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
    training_program?: training_programsCreateNestedOneWithoutUsersInput
    cohort_memberships?: cohort_membersCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutCreated_foldersInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    training_program_id?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    visitor_analytics?: visitor_analyticsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
    cohort_memberships?: cohort_membersUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutCreated_foldersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCreated_foldersInput, usersUncheckedCreateWithoutCreated_foldersInput>
  }

  export type training_programsCreateWithoutFoldersInput = {
    id?: string
    name: string
    full_name: string
    description?: string | null
    duration_days?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    users?: usersCreateNestedManyWithoutTraining_programInput
    cohorts?: training_cohortsCreateNestedManyWithoutTraining_programInput
  }

  export type training_programsUncheckedCreateWithoutFoldersInput = {
    id?: string
    name: string
    full_name: string
    description?: string | null
    duration_days?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    users?: usersUncheckedCreateNestedManyWithoutTraining_programInput
    cohorts?: training_cohortsUncheckedCreateNestedManyWithoutTraining_programInput
  }

  export type training_programsCreateOrConnectWithoutFoldersInput = {
    where: training_programsWhereUniqueInput
    create: XOR<training_programsCreateWithoutFoldersInput, training_programsUncheckedCreateWithoutFoldersInput>
  }

  export type training_cohortsCreateWithoutFoldersInput = {
    id?: string
    name: string
    year: string
    start_date?: Date | string | null
    end_date?: Date | string | null
    max_participants?: number | null
    current_participants?: number
    status?: $Enums.CohortStatus
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    training_program: training_programsCreateNestedOneWithoutCohortsInput
    members?: cohort_membersCreateNestedManyWithoutCohortInput
  }

  export type training_cohortsUncheckedCreateWithoutFoldersInput = {
    id?: string
    name: string
    training_program_id: string
    year: string
    start_date?: Date | string | null
    end_date?: Date | string | null
    max_participants?: number | null
    current_participants?: number
    status?: $Enums.CohortStatus
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    members?: cohort_membersUncheckedCreateNestedManyWithoutCohortInput
  }

  export type training_cohortsCreateOrConnectWithoutFoldersInput = {
    where: training_cohortsWhereUniqueInput
    create: XOR<training_cohortsCreateWithoutFoldersInput, training_cohortsUncheckedCreateWithoutFoldersInput>
  }

  export type usersUpsertWithoutCreated_foldersInput = {
    update: XOR<usersUpdateWithoutCreated_foldersInput, usersUncheckedUpdateWithoutCreated_foldersInput>
    create: XOR<usersCreateWithoutCreated_foldersInput, usersUncheckedCreateWithoutCreated_foldersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCreated_foldersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCreated_foldersInput, usersUncheckedUpdateWithoutCreated_foldersInput>
  }

  export type usersUpdateWithoutCreated_foldersInput = {
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
    visitor_analytics?: visitor_analyticsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
    training_program?: training_programsUpdateOneWithoutUsersNestedInput
    cohort_memberships?: cohort_membersUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutCreated_foldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visitor_analytics?: visitor_analyticsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
    cohort_memberships?: cohort_membersUncheckedUpdateManyWithoutUserNestedInput
  }

  export type training_programsUpsertWithoutFoldersInput = {
    update: XOR<training_programsUpdateWithoutFoldersInput, training_programsUncheckedUpdateWithoutFoldersInput>
    create: XOR<training_programsCreateWithoutFoldersInput, training_programsUncheckedCreateWithoutFoldersInput>
    where?: training_programsWhereInput
  }

  export type training_programsUpdateToOneWithWhereWithoutFoldersInput = {
    where?: training_programsWhereInput
    data: XOR<training_programsUpdateWithoutFoldersInput, training_programsUncheckedUpdateWithoutFoldersInput>
  }

  export type training_programsUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateManyWithoutTraining_programNestedInput
    cohorts?: training_cohortsUpdateManyWithoutTraining_programNestedInput
  }

  export type training_programsUncheckedUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUncheckedUpdateManyWithoutTraining_programNestedInput
    cohorts?: training_cohortsUncheckedUpdateManyWithoutTraining_programNestedInput
  }

  export type training_cohortsUpsertWithoutFoldersInput = {
    update: XOR<training_cohortsUpdateWithoutFoldersInput, training_cohortsUncheckedUpdateWithoutFoldersInput>
    create: XOR<training_cohortsCreateWithoutFoldersInput, training_cohortsUncheckedCreateWithoutFoldersInput>
    where?: training_cohortsWhereInput
  }

  export type training_cohortsUpdateToOneWithWhereWithoutFoldersInput = {
    where?: training_cohortsWhereInput
    data: XOR<training_cohortsUpdateWithoutFoldersInput, training_cohortsUncheckedUpdateWithoutFoldersInput>
  }

  export type training_cohortsUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    training_program?: training_programsUpdateOneRequiredWithoutCohortsNestedInput
    members?: cohort_membersUpdateManyWithoutCohortNestedInput
  }

  export type training_cohortsUncheckedUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    training_program_id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: cohort_membersUncheckedUpdateManyWithoutCohortNestedInput
  }

  export type usersCreateWithoutTraining_programInput = {
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
    visitor_analytics?: visitor_analyticsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersCreateNestedManyWithoutCreatorInput
    cohort_memberships?: cohort_membersCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutTraining_programInput = {
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
    visitor_analytics?: visitor_analyticsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersUncheckedCreateNestedManyWithoutCreatorInput
    cohort_memberships?: cohort_membersUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutTraining_programInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTraining_programInput, usersUncheckedCreateWithoutTraining_programInput>
  }

  export type usersCreateManyTraining_programInputEnvelope = {
    data: usersCreateManyTraining_programInput | usersCreateManyTraining_programInput[]
    skipDuplicates?: boolean
  }

  export type training_cohortsCreateWithoutTraining_programInput = {
    id?: string
    name: string
    year: string
    start_date?: Date | string | null
    end_date?: Date | string | null
    max_participants?: number | null
    current_participants?: number
    status?: $Enums.CohortStatus
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    members?: cohort_membersCreateNestedManyWithoutCohortInput
    folders?: report_foldersCreateNestedManyWithoutCohortInput
  }

  export type training_cohortsUncheckedCreateWithoutTraining_programInput = {
    id?: string
    name: string
    year: string
    start_date?: Date | string | null
    end_date?: Date | string | null
    max_participants?: number | null
    current_participants?: number
    status?: $Enums.CohortStatus
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    members?: cohort_membersUncheckedCreateNestedManyWithoutCohortInput
    folders?: report_foldersUncheckedCreateNestedManyWithoutCohortInput
  }

  export type training_cohortsCreateOrConnectWithoutTraining_programInput = {
    where: training_cohortsWhereUniqueInput
    create: XOR<training_cohortsCreateWithoutTraining_programInput, training_cohortsUncheckedCreateWithoutTraining_programInput>
  }

  export type training_cohortsCreateManyTraining_programInputEnvelope = {
    data: training_cohortsCreateManyTraining_programInput | training_cohortsCreateManyTraining_programInput[]
    skipDuplicates?: boolean
  }

  export type report_foldersCreateWithoutTraining_programInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    creator: usersCreateNestedOneWithoutCreated_foldersInput
    cohort?: training_cohortsCreateNestedOneWithoutFoldersInput
  }

  export type report_foldersUncheckedCreateWithoutTraining_programInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    created_by: string
    cohort_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type report_foldersCreateOrConnectWithoutTraining_programInput = {
    where: report_foldersWhereUniqueInput
    create: XOR<report_foldersCreateWithoutTraining_programInput, report_foldersUncheckedCreateWithoutTraining_programInput>
  }

  export type report_foldersCreateManyTraining_programInputEnvelope = {
    data: report_foldersCreateManyTraining_programInput | report_foldersCreateManyTraining_programInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithWhereUniqueWithoutTraining_programInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutTraining_programInput, usersUncheckedUpdateWithoutTraining_programInput>
    create: XOR<usersCreateWithoutTraining_programInput, usersUncheckedCreateWithoutTraining_programInput>
  }

  export type usersUpdateWithWhereUniqueWithoutTraining_programInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutTraining_programInput, usersUncheckedUpdateWithoutTraining_programInput>
  }

  export type usersUpdateManyWithWhereWithoutTraining_programInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutTraining_programInput>
  }

  export type usersScalarWhereInput = {
    AND?: usersScalarWhereInput | usersScalarWhereInput[]
    OR?: usersScalarWhereInput[]
    NOT?: usersScalarWhereInput | usersScalarWhereInput[]
    id?: StringFilter<"users"> | string
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: EnumRoleFilter<"users"> | $Enums.Role
    name?: StringNullableFilter<"users"> | string | null
    avatar?: StringNullableFilter<"users"> | string | null
    training?: StringNullableFilter<"users"> | string | null
    angkatan?: StringNullableFilter<"users"> | string | null
    training_program_id?: StringNullableFilter<"users"> | string | null
    phone?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
  }

  export type training_cohortsUpsertWithWhereUniqueWithoutTraining_programInput = {
    where: training_cohortsWhereUniqueInput
    update: XOR<training_cohortsUpdateWithoutTraining_programInput, training_cohortsUncheckedUpdateWithoutTraining_programInput>
    create: XOR<training_cohortsCreateWithoutTraining_programInput, training_cohortsUncheckedCreateWithoutTraining_programInput>
  }

  export type training_cohortsUpdateWithWhereUniqueWithoutTraining_programInput = {
    where: training_cohortsWhereUniqueInput
    data: XOR<training_cohortsUpdateWithoutTraining_programInput, training_cohortsUncheckedUpdateWithoutTraining_programInput>
  }

  export type training_cohortsUpdateManyWithWhereWithoutTraining_programInput = {
    where: training_cohortsScalarWhereInput
    data: XOR<training_cohortsUpdateManyMutationInput, training_cohortsUncheckedUpdateManyWithoutTraining_programInput>
  }

  export type training_cohortsScalarWhereInput = {
    AND?: training_cohortsScalarWhereInput | training_cohortsScalarWhereInput[]
    OR?: training_cohortsScalarWhereInput[]
    NOT?: training_cohortsScalarWhereInput | training_cohortsScalarWhereInput[]
    id?: StringFilter<"training_cohorts"> | string
    name?: StringFilter<"training_cohorts"> | string
    training_program_id?: StringFilter<"training_cohorts"> | string
    year?: StringFilter<"training_cohorts"> | string
    start_date?: DateTimeNullableFilter<"training_cohorts"> | Date | string | null
    end_date?: DateTimeNullableFilter<"training_cohorts"> | Date | string | null
    max_participants?: IntNullableFilter<"training_cohorts"> | number | null
    current_participants?: IntFilter<"training_cohorts"> | number
    status?: EnumCohortStatusFilter<"training_cohorts"> | $Enums.CohortStatus
    description?: StringNullableFilter<"training_cohorts"> | string | null
    is_active?: BoolFilter<"training_cohorts"> | boolean
    created_at?: DateTimeFilter<"training_cohorts"> | Date | string
    updated_at?: DateTimeFilter<"training_cohorts"> | Date | string
  }

  export type report_foldersUpsertWithWhereUniqueWithoutTraining_programInput = {
    where: report_foldersWhereUniqueInput
    update: XOR<report_foldersUpdateWithoutTraining_programInput, report_foldersUncheckedUpdateWithoutTraining_programInput>
    create: XOR<report_foldersCreateWithoutTraining_programInput, report_foldersUncheckedCreateWithoutTraining_programInput>
  }

  export type report_foldersUpdateWithWhereUniqueWithoutTraining_programInput = {
    where: report_foldersWhereUniqueInput
    data: XOR<report_foldersUpdateWithoutTraining_programInput, report_foldersUncheckedUpdateWithoutTraining_programInput>
  }

  export type report_foldersUpdateManyWithWhereWithoutTraining_programInput = {
    where: report_foldersScalarWhereInput
    data: XOR<report_foldersUpdateManyMutationInput, report_foldersUncheckedUpdateManyWithoutTraining_programInput>
  }

  export type training_programsCreateWithoutCohortsInput = {
    id?: string
    name: string
    full_name: string
    description?: string | null
    duration_days?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    users?: usersCreateNestedManyWithoutTraining_programInput
    folders?: report_foldersCreateNestedManyWithoutTraining_programInput
  }

  export type training_programsUncheckedCreateWithoutCohortsInput = {
    id?: string
    name: string
    full_name: string
    description?: string | null
    duration_days?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    users?: usersUncheckedCreateNestedManyWithoutTraining_programInput
    folders?: report_foldersUncheckedCreateNestedManyWithoutTraining_programInput
  }

  export type training_programsCreateOrConnectWithoutCohortsInput = {
    where: training_programsWhereUniqueInput
    create: XOR<training_programsCreateWithoutCohortsInput, training_programsUncheckedCreateWithoutCohortsInput>
  }

  export type cohort_membersCreateWithoutCohortInput = {
    id?: string
    joined_at?: Date | string
    status?: $Enums.MemberStatus
    notes?: string | null
    user: usersCreateNestedOneWithoutCohort_membershipsInput
  }

  export type cohort_membersUncheckedCreateWithoutCohortInput = {
    id?: string
    user_id: string
    joined_at?: Date | string
    status?: $Enums.MemberStatus
    notes?: string | null
  }

  export type cohort_membersCreateOrConnectWithoutCohortInput = {
    where: cohort_membersWhereUniqueInput
    create: XOR<cohort_membersCreateWithoutCohortInput, cohort_membersUncheckedCreateWithoutCohortInput>
  }

  export type cohort_membersCreateManyCohortInputEnvelope = {
    data: cohort_membersCreateManyCohortInput | cohort_membersCreateManyCohortInput[]
    skipDuplicates?: boolean
  }

  export type report_foldersCreateWithoutCohortInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    creator: usersCreateNestedOneWithoutCreated_foldersInput
    training_program?: training_programsCreateNestedOneWithoutFoldersInput
  }

  export type report_foldersUncheckedCreateWithoutCohortInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    created_by: string
    training_program_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type report_foldersCreateOrConnectWithoutCohortInput = {
    where: report_foldersWhereUniqueInput
    create: XOR<report_foldersCreateWithoutCohortInput, report_foldersUncheckedCreateWithoutCohortInput>
  }

  export type report_foldersCreateManyCohortInputEnvelope = {
    data: report_foldersCreateManyCohortInput | report_foldersCreateManyCohortInput[]
    skipDuplicates?: boolean
  }

  export type training_programsUpsertWithoutCohortsInput = {
    update: XOR<training_programsUpdateWithoutCohortsInput, training_programsUncheckedUpdateWithoutCohortsInput>
    create: XOR<training_programsCreateWithoutCohortsInput, training_programsUncheckedCreateWithoutCohortsInput>
    where?: training_programsWhereInput
  }

  export type training_programsUpdateToOneWithWhereWithoutCohortsInput = {
    where?: training_programsWhereInput
    data: XOR<training_programsUpdateWithoutCohortsInput, training_programsUncheckedUpdateWithoutCohortsInput>
  }

  export type training_programsUpdateWithoutCohortsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateManyWithoutTraining_programNestedInput
    folders?: report_foldersUpdateManyWithoutTraining_programNestedInput
  }

  export type training_programsUncheckedUpdateWithoutCohortsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUncheckedUpdateManyWithoutTraining_programNestedInput
    folders?: report_foldersUncheckedUpdateManyWithoutTraining_programNestedInput
  }

  export type cohort_membersUpsertWithWhereUniqueWithoutCohortInput = {
    where: cohort_membersWhereUniqueInput
    update: XOR<cohort_membersUpdateWithoutCohortInput, cohort_membersUncheckedUpdateWithoutCohortInput>
    create: XOR<cohort_membersCreateWithoutCohortInput, cohort_membersUncheckedCreateWithoutCohortInput>
  }

  export type cohort_membersUpdateWithWhereUniqueWithoutCohortInput = {
    where: cohort_membersWhereUniqueInput
    data: XOR<cohort_membersUpdateWithoutCohortInput, cohort_membersUncheckedUpdateWithoutCohortInput>
  }

  export type cohort_membersUpdateManyWithWhereWithoutCohortInput = {
    where: cohort_membersScalarWhereInput
    data: XOR<cohort_membersUpdateManyMutationInput, cohort_membersUncheckedUpdateManyWithoutCohortInput>
  }

  export type report_foldersUpsertWithWhereUniqueWithoutCohortInput = {
    where: report_foldersWhereUniqueInput
    update: XOR<report_foldersUpdateWithoutCohortInput, report_foldersUncheckedUpdateWithoutCohortInput>
    create: XOR<report_foldersCreateWithoutCohortInput, report_foldersUncheckedCreateWithoutCohortInput>
  }

  export type report_foldersUpdateWithWhereUniqueWithoutCohortInput = {
    where: report_foldersWhereUniqueInput
    data: XOR<report_foldersUpdateWithoutCohortInput, report_foldersUncheckedUpdateWithoutCohortInput>
  }

  export type report_foldersUpdateManyWithWhereWithoutCohortInput = {
    where: report_foldersScalarWhereInput
    data: XOR<report_foldersUpdateManyMutationInput, report_foldersUncheckedUpdateManyWithoutCohortInput>
  }

  export type usersCreateWithoutCohort_membershipsInput = {
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
    visitor_analytics?: visitor_analyticsCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersCreateNestedManyWithoutCreatorInput
    training_program?: training_programsCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutCohort_membershipsInput = {
    id: string
    username: string
    email: string
    password: string
    role?: $Enums.Role
    name?: string | null
    avatar?: string | null
    training?: string | null
    angkatan?: string | null
    training_program_id?: string | null
    phone?: string | null
    created_at?: Date | string
    updated_at: Date | string
    visitor_analytics?: visitor_analyticsUncheckedCreateNestedManyWithoutUsersInput
    guestbook_entries?: guestbook_entriesUncheckedCreateNestedManyWithoutUsersInput
    reports_reports_assignee_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_assignee_idTousersInput
    reports_reports_author_idTousers?: reportsUncheckedCreateNestedManyWithoutUsers_reports_author_idTousersInput
    uploaded_files?: uploaded_filesUncheckedCreateNestedManyWithoutUsersInput
    created_folders?: report_foldersUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type usersCreateOrConnectWithoutCohort_membershipsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCohort_membershipsInput, usersUncheckedCreateWithoutCohort_membershipsInput>
  }

  export type training_cohortsCreateWithoutMembersInput = {
    id?: string
    name: string
    year: string
    start_date?: Date | string | null
    end_date?: Date | string | null
    max_participants?: number | null
    current_participants?: number
    status?: $Enums.CohortStatus
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    training_program: training_programsCreateNestedOneWithoutCohortsInput
    folders?: report_foldersCreateNestedManyWithoutCohortInput
  }

  export type training_cohortsUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    training_program_id: string
    year: string
    start_date?: Date | string | null
    end_date?: Date | string | null
    max_participants?: number | null
    current_participants?: number
    status?: $Enums.CohortStatus
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    folders?: report_foldersUncheckedCreateNestedManyWithoutCohortInput
  }

  export type training_cohortsCreateOrConnectWithoutMembersInput = {
    where: training_cohortsWhereUniqueInput
    create: XOR<training_cohortsCreateWithoutMembersInput, training_cohortsUncheckedCreateWithoutMembersInput>
  }

  export type usersUpsertWithoutCohort_membershipsInput = {
    update: XOR<usersUpdateWithoutCohort_membershipsInput, usersUncheckedUpdateWithoutCohort_membershipsInput>
    create: XOR<usersCreateWithoutCohort_membershipsInput, usersUncheckedCreateWithoutCohort_membershipsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCohort_membershipsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCohort_membershipsInput, usersUncheckedUpdateWithoutCohort_membershipsInput>
  }

  export type usersUpdateWithoutCohort_membershipsInput = {
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
    visitor_analytics?: visitor_analyticsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUpdateManyWithoutCreatorNestedInput
    training_program?: training_programsUpdateOneWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutCohort_membershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    training?: NullableStringFieldUpdateOperationsInput | string | null
    angkatan?: NullableStringFieldUpdateOperationsInput | string | null
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    visitor_analytics?: visitor_analyticsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type training_cohortsUpsertWithoutMembersInput = {
    update: XOR<training_cohortsUpdateWithoutMembersInput, training_cohortsUncheckedUpdateWithoutMembersInput>
    create: XOR<training_cohortsCreateWithoutMembersInput, training_cohortsUncheckedCreateWithoutMembersInput>
    where?: training_cohortsWhereInput
  }

  export type training_cohortsUpdateToOneWithWhereWithoutMembersInput = {
    where?: training_cohortsWhereInput
    data: XOR<training_cohortsUpdateWithoutMembersInput, training_cohortsUncheckedUpdateWithoutMembersInput>
  }

  export type training_cohortsUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    training_program?: training_programsUpdateOneRequiredWithoutCohortsNestedInput
    folders?: report_foldersUpdateManyWithoutCohortNestedInput
  }

  export type training_cohortsUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    training_program_id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    folders?: report_foldersUncheckedUpdateManyWithoutCohortNestedInput
  }

  export type uploaded_filesCreateManyReportsInput = {
    id: string
    filename: string
    original_name: string
    file_path: string
    file_size: number
    mime_type: string
    file_type?: string | null
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
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
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
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
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
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type visitor_analyticsCreateManyUsersInput = {
    id: string
    ip_address?: string | null
    user_agent?: string | null
    page_path: string
    page_title?: string | null
    referrer?: string | null
    session_id?: string | null
    visit_duration?: number | null
    created_at?: Date | string
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

  export type reportsCreateManyUsers_reports_assignee_idTousersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    author_id: string
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type reportsCreateManyUsers_reports_author_idTousersInput = {
    id: string
    title: string
    description?: string | null
    content: string
    cover_image_url?: string | null
    status?: $Enums.ReportStatus
    category?: string | null
    priority?: $Enums.Priority
    is_public?: boolean
    max_access?: number | null
    current_access?: number | null
    tags?: string | null
    assignee_id?: string | null
    feedback?: string | null
    verified_at?: Date | string | null
    rejected_at?: Date | string | null
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
    file_type?: string | null
    category?: string | null
    year?: string | null
    batch?: string | null
    report_id?: string | null
    created_at?: Date | string
    updated_at: Date | string
  }

  export type report_foldersCreateManyCreatorInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    training_program_id?: string | null
    cohort_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type cohort_membersCreateManyUserInput = {
    id?: string
    cohort_id: string
    joined_at?: Date | string
    status?: $Enums.MemberStatus
    notes?: string | null
  }

  export type visitor_analyticsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    page_path?: StringFieldUpdateOperationsInput | string
    page_title?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    session_id?: NullableStringFieldUpdateOperationsInput | string | null
    visit_duration?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type visitor_analyticsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    page_path?: StringFieldUpdateOperationsInput | string
    page_title?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    session_id?: NullableStringFieldUpdateOperationsInput | string | null
    visit_duration?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type visitor_analyticsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    page_path?: StringFieldUpdateOperationsInput | string
    page_title?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    session_id?: NullableStringFieldUpdateOperationsInput | string | null
    visit_duration?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type reportsUpdateWithoutUsers_reports_assignee_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    author_id?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: uploaded_filesUncheckedUpdateManyWithoutReportsNestedInput
  }

  export type reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    author_id?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reportsUpdateWithoutUsers_reports_author_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    assignee_id?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: uploaded_filesUncheckedUpdateManyWithoutReportsNestedInput
  }

  export type reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    cover_image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    category?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: EnumPriorityFieldUpdateOperationsInput | $Enums.Priority
    is_public?: BoolFieldUpdateOperationsInput | boolean
    max_access?: NullableIntFieldUpdateOperationsInput | number | null
    current_access?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    assignee_id?: NullableStringFieldUpdateOperationsInput | string | null
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    verified_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejected_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
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
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
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
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableStringFieldUpdateOperationsInput | string | null
    batch?: NullableStringFieldUpdateOperationsInput | string | null
    report_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type report_foldersUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    training_program?: training_programsUpdateOneWithoutFoldersNestedInput
    cohort?: training_cohortsUpdateOneWithoutFoldersNestedInput
  }

  export type report_foldersUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    cohort_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type report_foldersUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    cohort_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cohort_membersUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    cohort?: training_cohortsUpdateOneRequiredWithoutMembersNestedInput
  }

  export type cohort_membersUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cohort_id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cohort_membersUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cohort_id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateManyTraining_programInput = {
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

  export type training_cohortsCreateManyTraining_programInput = {
    id?: string
    name: string
    year: string
    start_date?: Date | string | null
    end_date?: Date | string | null
    max_participants?: number | null
    current_participants?: number
    status?: $Enums.CohortStatus
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type report_foldersCreateManyTraining_programInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    created_by: string
    cohort_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type usersUpdateWithoutTraining_programInput = {
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
    visitor_analytics?: visitor_analyticsUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUpdateManyWithoutCreatorNestedInput
    cohort_memberships?: cohort_membersUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutTraining_programInput = {
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
    visitor_analytics?: visitor_analyticsUncheckedUpdateManyWithoutUsersNestedInput
    guestbook_entries?: guestbook_entriesUncheckedUpdateManyWithoutUsersNestedInput
    reports_reports_assignee_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_assignee_idTousersNestedInput
    reports_reports_author_idTousers?: reportsUncheckedUpdateManyWithoutUsers_reports_author_idTousersNestedInput
    uploaded_files?: uploaded_filesUncheckedUpdateManyWithoutUsersNestedInput
    created_folders?: report_foldersUncheckedUpdateManyWithoutCreatorNestedInput
    cohort_memberships?: cohort_membersUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateManyWithoutTraining_programInput = {
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

  export type training_cohortsUpdateWithoutTraining_programInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: cohort_membersUpdateManyWithoutCohortNestedInput
    folders?: report_foldersUpdateManyWithoutCohortNestedInput
  }

  export type training_cohortsUncheckedUpdateWithoutTraining_programInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: cohort_membersUncheckedUpdateManyWithoutCohortNestedInput
    folders?: report_foldersUncheckedUpdateManyWithoutCohortNestedInput
  }

  export type training_cohortsUncheckedUpdateManyWithoutTraining_programInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    max_participants?: NullableIntFieldUpdateOperationsInput | number | null
    current_participants?: IntFieldUpdateOperationsInput | number
    status?: EnumCohortStatusFieldUpdateOperationsInput | $Enums.CohortStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type report_foldersUpdateWithoutTraining_programInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: usersUpdateOneRequiredWithoutCreated_foldersNestedInput
    cohort?: training_cohortsUpdateOneWithoutFoldersNestedInput
  }

  export type report_foldersUncheckedUpdateWithoutTraining_programInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    cohort_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type report_foldersUncheckedUpdateManyWithoutTraining_programInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    cohort_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cohort_membersCreateManyCohortInput = {
    id?: string
    user_id: string
    joined_at?: Date | string
    status?: $Enums.MemberStatus
    notes?: string | null
  }

  export type report_foldersCreateManyCohortInput = {
    id?: string
    year: string
    batch: string
    report_type: string
    description?: string | null
    created_by: string
    training_program_id?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type cohort_membersUpdateWithoutCohortInput = {
    id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    user?: usersUpdateOneRequiredWithoutCohort_membershipsNestedInput
  }

  export type cohort_membersUncheckedUpdateWithoutCohortInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cohort_membersUncheckedUpdateManyWithoutCohortInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type report_foldersUpdateWithoutCohortInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: usersUpdateOneRequiredWithoutCreated_foldersNestedInput
    training_program?: training_programsUpdateOneWithoutFoldersNestedInput
  }

  export type report_foldersUncheckedUpdateWithoutCohortInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type report_foldersUncheckedUpdateManyWithoutCohortInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    report_type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    training_program_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
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