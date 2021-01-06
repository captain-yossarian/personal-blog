Let's take a look on `type Values = T[keyof T]` utility.
Maybe you wonder, what does it mean ?
Before we continue, please make sure you are aware of [distibutive types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-typ)

Let's start with simple example:

```typescript
interface Foo {
  age: number;
  name: string;
}

type Alias1 = Foo["age"]; // number
type Alias2 = Foo["name"]; // stirng
type Alias3 = Foo["age" | "name"]; // string | number

type Check = keyof Foo; // 'age'|'name
```

Our `Values` utility works perfect with objects, but not with arrays.
To get all keys of object, we use - `keyof`.
To get all array elements we use `[number]` because arrays have numeric keys.

```typescript
type Arr = [1, 2, 3];
type Val1 = Arr[0]; // 1
type Val2 = Arr[1]; // 2
type Val3 = Arr[0 | 1]; // 1|2
type Val4 = Arr[0 | 1 | 2]; // 3 | 1 | 1
type Val5 = Arr[number]; // 3 | 1 | 1
```

Now, we can keep going. Let's define out utility types.
For clarity, I will use simple Assert test type

```typescript
type Assert<T, U extends T> = T extends U ? true : false;

type Values<T> = T[keyof T];

{
  type Test1 = Values<{ age: 42; name: "John" }>; //  42 | "John"
  type Test2 = Assert<Test1, "John" | 42>;
}

type LiteralDigits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type NumberString<T extends number> = `${T}`;

{
  type Test1 = Assert<NumberString<6>, "6">; // true
  type Test2 = Assert<NumberString<42>, "42">; // true
  type Test3 = Assert<NumberString<6>, 6>; // false
  type Test4 = Assert<NumberString<6>, "6foo">; // false
}

type AppendDigit<T extends number | string> = `${T}${LiteralDigits}`;

{
  /**
   * If you don't understand why, please read again about distributivenes here
   * https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-types
   */
  type Test1 = Assert<
    AppendDigit<2>,
    "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29"
  >; // true
  type Test2 = Assert<
    AppendDigit<9>,
    "90" | "91" | "92" | "93" | "94" | "95" | "96" | "97" | "98" | "99"
  >; // true
}

type MakeSet<T extends number> = {
  [P in T]: AppendDigit<P>;
};

{
  type Test1 = Assert<
    MakeSet<1>,
    {
      1: "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19";
    }
  >;

  type Test2 = Assert<
    MakeSet<1 | 2>,
    {
      1: "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19";
      2: "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29";
    }
  >;
}

type RemoveTrailingZero<
  T extends string
> = T extends `${infer Fst}${infer Rest}`
  ? Fst extends `0`
    ? RemoveTrailingZero<`${Rest}`>
    : `${Fst}${Rest}`
  : never;

{
  /**
   * Because nobody uses 01 | 02 ... | 0n
   * Everybody use 1 | 2 | 3 ... | n
   */
  type Test1 = Assert<RemoveTrailingZero<"01">, "1">;
  type Test2 = Assert<RemoveTrailingZero<"02" | "03">, "2" | "3">;
  type Test3 = Assert<RemoveTrailingZero<"002" | "003">, "2" | "3">;
}

type From_1_to_999 = RemoveTrailingZero<
  Values<
    {
      [P in Values<MakeSet<LiteralDigits>>]: AppendDigit<P>;
    }
  >
>;

type By<V extends NumberString<number>> = RemoveTrailingZero<
  Values<
    {
      [P in V]: AppendDigit<P>;
    }
  >
>;

/**
 * Did not use recursion here,
 * because my CPU will blow up
 */
type From_1_to_99999 =
  | From_1_to_999
  | By<From_1_to_999>
  | By<From_1_to_999 | By<From_1_to_999>>;
```

If you still want to generate literal numbers instead of string numbers, you can use this code:

```typescript
type PrependNextNum<A extends Array<unknown>> = A["length"] extends infer T
  ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
    ? X
    : never
  : never;

type EnumerateInternal<A extends Array<unknown>, N extends number> = {
  0: A;
  1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A["length"] ? 0 : 1];

type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[]
  ? E
  : never;

// Up to 42 - meaning of the life
type Result = Enumerate<43>; // 0 | 1 | 2 | ... | 42
```
