import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout, Var } from "../Shared/Layout";
import Links from "../Shared/Links";

const code1 = `
const handleArray=(x: number[], y: number[][]) => void
`;

const code2 = `
type ArrayElement = number;
type Array1D = ReadonlyArray<ArrayElement>;

function array<X extends Array1D, Y extends readonly ArrayElement[]>(
  x: X,
  y: readonly Y[]
) {}

const result = array([1, 2, 3], [[1, 1, 1, 1, 1]]); // no error, unexpected behaviour
`;

const code3 = `
/**
 * Get length of the array
 */
type Length<T extends ReadonlyArray<any>> = T extends { length: infer L }
  ? L
  : never;
/**
 * There is another approach to get the length of the array
 */
type Length2<T extends ReadonlyArray<any>> = T["length"];

type ArrayMock1 = readonly [1, 2, 3];
type ArrayMock2 = readonly [4, 5, 6, 7];
type ArrayMock3 = readonly [8, 9, 10];
type ArrayMock4 = readonly [[11, 12, 14]];
type ArrayMock5 = readonly [[15, 16]];
type ArrayMock6 = readonly [[1], [2], [3]];

type TestArrayLength1 = Length<ArrayMock1>; // 3
type TestArrayLength2 = Length<ArrayMock2>; // 4
`;

const code4 = `
/**
 * Compare length of the arrays
 */
type CompareLength<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
> = Length<X> extends Length<Y> ? true : false;

/**
 * Tests
 */
type TestCompareLength1 = CompareLength<ArrayMock1, ArrayMock2>; // false
type TestCompareLength2 = CompareLength<ArrayMock1, ArrayMock3>; // true
`;

const code5 = `
{
  type Foo = {
    x: number;
  };

  type FooX = {
    x: number;
  }["x"];

  type Result = FooX extends number ? true : false; // true

  const obj = {
    y: 42,
  }["y"];

  obj; // 42
}

/**
 * A bit complicated with weird conditional statement
 */
{
  type Foo = {
    x: number;
  };

  type FooX<T> = {
    x: number;
    y: string;
  }[T extends number ? "x" : "y"];

  type Result = FooX<number> extends number ? true : false; // true

  type Result2 = FooX<string> extends string ? true : false; // true

  const condition = 2;

  const obj = {
    y: 42,
    x: 43,
  }[condition === 2 ? "y" : "x"];

  obj; // 42
}
`;

const code6 = `
function array<
  X extends Array1D,
  Y extends {
    0: readonly ArrayElement[];
  }[CompareLength<X, Y> extends true ? 0 : never]
>(x: X, y: readonly Y[]): void;

function array<X extends Array1D, Y extends readonly ArrayElement[]>(
  x: X,
  y: readonly Y[]
) {}
`;

const code7 = `
type ArrayElement = number;
type Array1D = ReadonlyArray<ArrayElement>;

type Length<T extends ReadonlyArray<any>> = T extends { length: infer L }
  ? L
  : never;

type CompareLength<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
> = Length<X> extends Length<Y> ? true : false;

function array<
  X extends Array1D,
  Y extends {
    0: readonly ArrayElement[];
  }[CompareLength<X, Y> extends true ? 0 : never]
>(x: X, y: readonly Y[]): void;
function array<X extends Array1D, Y extends readonly ArrayElement[]>(
  x: X,
  y: readonly Y[]
) {}

const arr = [1, 2, 3] as const;

/**
 * No errors expected
 */
const result = array(
  [1, 2, 3] as const,
  [
    [1, 1, 1],
    [1, 2, 3],
  ] as const
); // ok
const result0 = array([1, 2, 3] as const, [[1, 1, 1]] as const); // ok

/**
 * Errors expected
 */
const result1 = array([1, 2, 3], [[1, 1, 1], [1]]); // no error, but should be
const result2 = array(
  [1, 2, 3] as const,
  [
    [1, 1, 1],
    [1, 2],
  ] as const
); // no error, but should be
const result3 = array([1, 2, 3] as const, [[1, 2]] as const); // error
const result5 = array([1, 2, 3] as const, [1] as const); // error
const result6 = array([1, 2, 3] as const, [[1, 2, 3], []] as const); // no error, but should be
const result7 = array(arr, [[1, 1, 1]]); // no error, but should be
`;

const code8 = `
type Length<T extends ReadonlyArray<any>> = T extends { length: infer L }
  ? L
  : never;
const array1 = [1, 2, 3];

type Test1 = Length<[1, 2, 3]>; // ok - 3 literal type
type Test2 = Length<typeof array1>; // not ok - number

/**
 * Q: But why TS does not complain here?
 * I have explicitly defined that Length argument should extend ReadonlyArray
 *
 * A: Because, literal array type extends ReadonlyArray
 * When you use [typeof array1], TS treats it as number[], because array1 is mutable.
 * Hence TS can't infer the length of array1. It is possible only in runtime
 */
`;

const code9 = `
// Type of mutable array length will be always - number
type MutableLength = unknown[]["length"]; // number

type CheckCompatibility = number extends 5 ? true : false; // false
type CheckCompatibility2 = 5 extends number ? true : false; // true

/**
 * This code works because  number does not extends literal 5
 * but literal 5 does extends number
 */
export type Length<T extends ReadonlyArray<any>> = T extends { length: infer L }
  ? MutableLength extends L
    ? MutableLength
    : L
  : MutableLength;

/**
 * Tests
 */
const array = [1, 2, 3];
const arrayImm = [1, 2, 3] as const;

type Test1 = Length<number[]>; // number
type Test2 = Length<unknown[]>; // number
type Test3 = Length<typeof array>; // number
type Test4 = Length<typeof arrayImm>; // 3

type CompareLength<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
> = Length<X> extends Length<Y> ? true : false;

/**
 * Let's test again CompareLength
 */
const arr1 = [1, 2, 3];
const arr2 = [1, 2];
type Test1 = CompareLength<typeof arr1, typeof arr2>; // true, BANG! this is not what we are expect!
`;

const code10 = `
type CompareLength<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
> = MutableLength extends Length<X>
  ? false
  : MutableLength extends Length<Y>
  ? false
  : Length<X> extends Length<Y>
  ? true
  : false;

/**
 * Tests
 */
const arr1 = [1, 2, 3];
const arr2 = [1, 2];
type Test1 = CompareLength<typeof arr1, typeof arr2>; // false, expected
`;

const code11 = `
type ArrayElement = number;
type Array1D = ReadonlyArray<ArrayElement>;

type MutableLength = unknown[]["length"]; // number

/**
 * Get length of the array
 * Allow only immutable arrays
 */
export type Length<T extends ReadonlyArray<any>> = T extends { length: infer L }
  ? MutableLength extends L
    ? MutableLength
    : L
  : MutableLength;

/**
 * Compare length of the arrays
 */
type CompareLength<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
> = MutableLength extends Length<X>
  ? false
  : MutableLength extends Length<Y>
  ? false
  : Length<X> extends Length<Y>
  ? true
  : false;

/**
 * CompareLength, compares length of X and filtered Y,
 * if true - return zero index element - ReadonlyArray<ArrayElement>
 * if false - return never
 *
 * So, if it will return never, then you can't pass second argument,
 * but if you did not provide second argument, you will receive another error -
 * function expects two arguments
 */
function array<
  X extends Array1D,
  Y extends {
    0: readonly ArrayElement[];
  }[CompareLength<X, Y> extends true ? 0 : never]
>(x: X, y: readonly Y[]): "put here your returned type";

function array<
  X extends Array1D,
  Y extends readonly ArrayElement[],
  Z extends CompareLength<X, Y>
>(x: X, y: readonly Y[]) {
  return [1, 2, 3] as any;
}
const result = array(
  [1, 2, 3] as const,
  [
    [1, 1, 1],
    [1, 2, 3],
  ] as const
); // ok
const result0 = array([1, 2, 3] as const, [[1, 1, 1]] as const); // ok

const arr = [1, 2, 3] as const;

const result1 = array([1, 2, 3], [[1, 1, 1], [1]]); // error
const result2 = array(
  [1, 2, 3] as const,
  [
    [1, 1, 1],
    [1, 2],
  ] as const
); // no error, but SHOULD BE
const result3 = array([1, 2, 3] as const, [[1, 2]] as const); // error
const result5 = array([1, 2, 3] as const, [1] as const); // error
const result5 = array([1, 2, 3] as const, [[1, 2, 3], []] as const); // error
const result6 = array(arr, [[1, 1, 1]]); // error, because TS is unable to fidure out length of mutable array.
`;

const code12 = `
/**
 * Check if all inner arrays have same length as X
 */
type Filter<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
> = X["length"] extends Y["length"]
  ? Y["length"] extends X["length"]
    ? Y
    : never
  : never;

type Test1 = Filter<[1, 2, 3], [1, 2]>; // never
type Test2 = Filter<[], [1, 2]>; // never
type Test3 = Filter<[1, 2], [1, 2]>; // [1,2]

/**
 * Please keep in mind that Y can be and will be a union type of inner arrays
 *
 */
type Test4 = Filter<[], [1, 2] | [1, 2, 3]>; // never
type Test5 = Filter<[1, 2], [1] | [1, 2] | [1, 2, 3]>; // never

/**
 * Btw, try to rewrite Filter without second conditional
 */
type Filter<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
> = X["length"] extends Y["length"] ? Y : never;

type Test5 = Filter<[1, 2], [1] | [1, 2] | [1, 2, 3]>; // not never, not ok
/**
 * Why ?
 */
type O = 5 extends 1 | 2 | 5 ? true : false; // true
type O2 = 1 | 2 | 5 extends 5 ? true : false; // false
`;

const code13 = `
type ArrayElement = number;
type Array1D = ReadonlyArray<ArrayElement>;
type MutableLength = unknown[]["length"]; // number

export type Length<T extends ReadonlyArray<any>> = T extends { length: infer L }
  ? MutableLength extends L
    ? MutableLength
    : L
  : MutableLength;

type CompareLength<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
> = MutableLength extends Length<X>
  ? false
  : MutableLength extends Length<Y>
  ? false
  : Length<X> extends Length<Y>
  ? true
  : false;

type Filter<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
> = X["length"] extends Y["length"]
  ? Y["length"] extends X["length"]
    ? Y
    : never
  : never;

function array<
  X extends Array1D,
  Y extends {
    0: readonly ArrayElement[];
  }[CompareLength<X, Filter<X, Y>> extends true ? 0 : never]
>(x: X, y: readonly Y[]): "put here your returned type";

function array<
  X extends Array1D,
  Y extends readonly ArrayElement[],
  Z extends CompareLength<X, Y>
>(x: X, y: readonly Y[]) {
  return [1, 2, 3] as any;
}

/**
 * Positive Tests
 */
const result = array(
  [1, 2, 3] as const,
  [
    [1, 1, 1],
    [1, 2, 3],
  ] as const
); // ok
const result0 = array([1, 2, 3] as const, [[1, 1, 1]] as const); // ok

const arr = [1, 2, 3] as const;

/**
 * Negative Tests
 */
const result1 = array([1, 2, 3], [[1, 1, 1], [1]]); // error
const result2 = array(
  [1, 2, 3] as const,
  [
    [1, 1, 1],
    [1, 2],
  ] as const
); // error
const result3 = array([1, 2, 3] as const, [[1, 2]] as const); // error
const result4 = array([1, 2, 3] as const, [[1], [1, 2], [1, 2, 3]] as const); // error
const result5 = array([1, 2, 3] as const, [1] as const); // error
const result6 = array([1, 2, 3] as const, [[1, 2, 3], []] as const); // error
const result7 = array(arr, [[1, 1, 1]]); // error, because TS is unable to figure out length of mutable array.
`;

const links = [
  "https://stackoverflow.com/questions/65361696/arguments-of-same-length-typescript",
];

const CompareArguments: FC = () => (
  <Layout title="Arguments constraints">
    <Links links={links} />
    <p>Let's say you want to make a function with next constraints:</p>
    <ul>
      <li>First argument should be an array</li>
      <li>
        Second arguments should be 2D array, where each nested array has same
        length as first argument
      </li>
    </ul>
    <Code code={code1} />
    <p>
      Let's start from defining our function. This is very naive approach, we
      will improve it later
    </p>
    <Code code={code2} />
    <p>
      So, now we should find a way to compare length of first argument with
      length of all inner arrays of second argument.
    </p>
    <p>
      First, of all we should define <Var>Length</Var> util.
    </p>
    <Code code={code3} />
    <p>
      Now, when we know how to get length of the array, we should create
      comparison util.
    </p>
    <Code code={code4} />
    <p>
      It is looks like we have all our necessary utils. If you still have't head
      ake, here You have other portion of types to think about. Try to figure
      out whats going on here:
    </p>
    <Code code={code5} />
    <p>
      Now, when You are familiar with such a weird syntax, we can go further.
      Here is our function definition with 1 overloading.
    </p>
    <Code code={code6} />
    <p>And here is our whole code placed in one block with type tests</p>
    <Code code={code7} />
    <p>
      It is look like we made logical error somewhere in the code. Ok, not we, I
      made it :D.
    </p>
    <p>
      Maybe we should test again our <Var>Length</Var> type util.
    </p>
    <p>
      What exactly are we expect from this util ? Answer is - literal integer.
    </p>
    <p>Let's test it again:</p>
    <Code code={code8} />
    <p>
      So, we should provide extra restrictions for mutable arrays? Correct? -
      Yes. Let's provide them:
    </p>
    <Code code={code9} />
    <p>
      <Var> CompareLength</Var> should be rewritten as follow:
    </p>
    <Code code={code10} />
    <p>Ok, I'm exhausted now, it should work. Let's test our code:</p>
    <Code code={code11} />
    <p>Ohh, what a .... What's going on here ? </p>
    <p>We still need to fix one failed test, see `result3`.</p>
    <p>
      It looks like if second arguments contains at least one array which feet
      requirements, TS ok with it.
    </p>
    <p> So we should compare arrays only if their length are equal.</p>
    <Code code={code12} />
    <p>Finall working code:</p>
    <Code code={code13} />
  </Layout>
);

export default CompareArguments;
