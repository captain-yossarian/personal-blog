import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
/**
 * We should get rid of all numbers
 */
type Arr = [number, string, ...number[]];

type Filter<T, U>= // @todo

// Our test suite
type Test0 = Filter<[], number>; // []
type Test1 = Filter<Arr, number>; // [string, ...number[]]
type Test2 = Filter<Arr, number[]>; // [number, string]

type Test3 = Filter<Arr, number | number[]>; // [string]
type Test4 = Filter<Arr, number | number[] | string>; // []
`;

const code2 = `
type Filter<T extends any[], F> = T extends [] ? [] : T; //

type Test0 = Filter<[], number>; // []
`;

const code3 = `
type Head<T extends ReadonlyArray<unknown>> = T extends readonly [
  infer H,
  ...infer Tail
]
  ? H
  : never;

{
  type Test1 = Assert<Head<[1, 2, 3]>, 1>;
  type Test2 = Assert<Head<["head", "tail"]>, "head">;
  type Test3 = Assert<Head<[]>, never>;
}

type Tail<List extends ReadonlyArray<unknown>> = List extends readonly [
  infer H,
  ...infer Tail
]
  ? Tail
  : never;

{
  type Test1 = Assert<Tail<[1, 2, 3]>, [2, 3]>;
  type Test2 = Assert<Tail<["head", "tail"]>, ["tail"]>;
  type Test3 = Assert<Head<[]>, never>;
}

// Before TS 4
type Tail_before_TS_4<T extends any[]> = ((...args: T) => void) extends (
  first: any,
  ...rest: infer S1
) => void
  ? S1
  : T extends [infer S2]
  ? []
  : T extends []
  ? []
  : never;
`;

const code4 = `
type Filter<T extends any[], F> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? Head extends F
    ? Filter<Tail, F>
    : [Head, ...Filter<Tail, F>]
  : /* --> */ [];

{
  type Test1 = Filter<Arr, number>; // [string, ...number[]]
  type Test2 = Filter<Arr, number[]>; // [number, string]

  type Test3 = Filter<Arr, number | number[]>; // [string]
  type Test4 = Filter<Arr, number | number[] | string>; // []
  type Test5 = Filter<[number[]], number | number[] | string>; // []
}
`;

const code5 = `
type MapPredicate<T> = [T, true]

type Mapped<
  Arr extends Array<unknown>,
  Result extends Array<unknown> = []
  > = Arr extends []
  ? []
  : Arr extends [infer H]
  ? [...Result, MapPredicate<H>]
  : Arr extends [infer Head, ...infer Tail]
  ? Mapped<[...Tail], [...Result, MapPredicate<Head>]>
  : Readonly<Result>;

type Result = Mapped<[1, 2, 3, 4]>; // [[1, true], [2, true], [3, true], [4, true]]
`;

const code51 = `
// All credits you can find here https://catchts.com/union-array

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

type UnionToOvlds<U> = UnionToIntersection<
    U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
    ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
    : [T, ...A];


const map = <A extends readonly [...any[]]>(values: A) =>
    <T,>(func: (value: A[number]) => T) => {
        type Mapped<
            Arr extends Array<unknown>,
            Result extends Array<unknown> = [],
            > = Arr extends []
            ? []
            : Arr extends [infer H]
            ? [...Result, T]
            : Arr extends [infer Head, ...infer Tail]
            ? Mapped<[...Tail], [...Result, T]>
            : Readonly<Result>;

        return (values.map<T>(func)) as Mapped<UnionToArray<A[number]>>
    }

const arr = [1, 2, 3] as const;
type Arr = typeof arr;

const result = map([1, 2, 3] as const)<{ elem: Arr[number] }>(elem => ({ elem }));

// [{
//     elem: Arr[number];
// }, {
//     elem: Arr[number];
// }, {
//     elem: Arr[number];
// }]
`;

const code6 = `
type ArrayOfMaxLength4 = readonly [any?, any?, any?, any?];
`;
const code7 = `
export const myArray = [
  { name: "Relationship", options: "foo" },
  { name: "Full name of family member as shown in passport", options: "bar" },
  { name: "Country family member lives in", options: "baz" },
] as const;

type Data = typeof myArray;

type ExpectedType = Array<{
  Relationship: "foo";
  "Full name of family member as shown in passport": "bar";
  "Country family member lives in": "baz";
}>;

type Values<T> = T[keyof T];

type Elem = { readonly name: string; readonly options: string };

type MapObject<T extends Elem, Key extends keyof T, Val extends keyof T> = {
  [P in Values<Pick<T, Key>> & string]: T[Val];
};

type Mapper<
  Arr extends ReadonlyArray<Elem>,
  Result extends Record<string, any> = {}
> = Arr extends []
  ? Result
  : Arr extends [infer H]
  ? H extends Elem
    ? Result & MapObject<H, "name", "options">
    : never
  : Arr extends readonly [infer H, ...infer Tail]
  ? Tail extends ReadonlyArray<Elem>
    ? H extends Elem
      ? Mapper<Tail, Result & MapObject<H, "name", "options">>
      : never
    : never
  : never;

type Result = Mapper<Data>[] extends ExpectedType ? true : false;
`;

const code8 = `
const arr = [85, 65, 4, 9] as const;
type Arr = typeof arr;

/**
 * Naive approach - (85 | 65 | 4 | 9)[]
 */ 
const result_naive = arr.filter((elem) => elem !== 4 && elem !== 9); 

/**
 * Filter like a PRO
 */ 
type Without_4_and_9 = Exclude<Arr[number], 4 | 9>;

const result_pro = arr.filter(
  (elem): elem is Without_4_and_9 => elem !== 4 && elem !== 9
); // (85 | 65)[]
`;

const code9 = `
const arr = [85, 65, 4, 9] as const;
type Arr = typeof arr;

type Values<T> = T[keyof T];

type ArrayKeys = keyof [];

type FindIndex<
  T extends ReadonlyArray<number>,
  Value extends number = 0,
  Keys extends keyof T = keyof T
> = {
  [P in Keys]: Value extends T[P] ? P : never;
};

type Result = Values<Omit<FindIndex<Arr, 65>, ArrayKeys>>; // '1'
`;

const code10 = `
type A = ["foo", "bar"];
type B = [5, "bar"];

type Expected = {
  foo:5,
  bar:'bar'
}
`;

const code11 = `
type Length<T extends ReadonlyArray<any>> = T extends { length: infer L }
  ? L
  : never;

type CompareLength<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
  > = Length<X> extends Length<Y> ? true : false;
`;

const code12 = `
/**
 * Let's operate on primitives 
 */
type Keys = string | number | symbol;
type AllowedKeys<T> = T extends readonly Keys[] ? T : never;


type Predicate<T, U> = T extends Keys ? U extends Keys ? Record<T, U> : never : never;
`;

const code13 = `
/**
 * Recursive iteration through two arrays
 */
type Zip<
T extends ReadonlyArray<Keys>,
 U extends ReadonlyArray<Keys>, 
 Result extends Record<string, any> = {}> =
  CompareLength<T, U> extends true
  ? T extends []
  ? Result :
  T extends [infer HeadT1]
  ? U extends [infer HeadU1]
  ? Result & Predicate<HeadT1, HeadU1> : never :
  T extends [infer HeadT2, ...infer TailT2]
  ? U extends [infer HeadU2, ...infer TailU2]
  ? Zip<AllowedKeys<TailT2>, AllowedKeys<TailU2>, Result & Predicate<HeadT2, HeadU2>>
  : never
  : never
  : never;
`;

const code14 = `
/**
 * Apply Zip only if arrays length is equal, otherwise return never
 */
type Zipper<T extends ReadonlyArray<Keys>, U extends ReadonlyArray<Keys>> =
  CompareLength<T, U> extends true ? Zip<T, U> : never;
`;

const code15 = `

type Length<T extends ReadonlyArray<any>> = T extends { length: infer L }
  ? L
  : never;

type CompareLength<
  X extends ReadonlyArray<any>,
  Y extends ReadonlyArray<any>
  > = Length<X> extends Length<Y> ? true : false;

/**
 * Let's operate on primitives 
 */
type Keys = string | number | symbol;
type AllowedKeys<T> = T extends readonly Keys[] ? T : never;


type Predicate<T, U> = T extends Keys ? U extends Keys ? Record<T, U> : never : never;

/**
 * Recursive iteration through two arrays
 */
type Zip<
T extends ReadonlyArray<Keys>,
 U extends ReadonlyArray<Keys>, 
 Result extends Record<string, any> = {}> =
  CompareLength<T, U> extends true
  ? T extends []
  ? Result :
  T extends [infer HeadT1]
  ? U extends [infer HeadU1]
  ? Result & Predicate<HeadT1, HeadU1> : never :
  T extends [infer HeadT2, ...infer TailT2]
  ? U extends [infer HeadU2, ...infer TailU2]
  ? Zip<AllowedKeys<TailT2>, AllowedKeys<TailU2>, Result & Predicate<HeadT2, HeadU2>>
  : never
  : never
  : never;

/**
 * Apply Zip only if arrays length is equal, otherwise return never
 */
type Zipper<T extends ReadonlyArray<Keys>, U extends ReadonlyArray<Keys>> =
  CompareLength<T, U> extends true ? Zip<T, U> : never;

type Result = Zipper<["foo", "bar"], [5, "bar"]>;


const zip: Result = {
  foo: 5,
  bar: 'bar'
} // ok

`;

const navigation = {
  filter: {
    id: "filter",
    text: "Filter literal type",
  },
  map: {
    id: "map",
    text: "Map literal type",
  },
  reduce: {
    id: "reduce",
    text: "Reduce literal type",
  },
  zip: {
    id: "zip",
    text: "Zip arrays into object",
    updated: true,
  },
  find_index: {
    id: "find_index",
    text: "Find index in literal types",
  },
};

const links = Object.values(navigation);

const Tuples: FC = () => (
  <>
    <HeaderNav links={links} />
    <Header {...navigation.filter} />
    <p>
      Let's say you have a literal type of array and you want to filter this
      type
    </p>
    <Code code={code1} />
    <p>
      First of all, we should handle all possible cases. What if first generic
      parameter of <Var>Filter</Var> is empty array?
    </p>
    <Code code={code2} />
    <p>
      Before, we continue, make sure you are aware of some basics of functional
      programming lists operations.
    </p>
    <p>
      Each list has Head - the first element and Tail - all elements but first.
    </p>
    <p>
      To iterate recursively through the tuple, we should every time to separate
      <Var>Head</Var> and <Var>Tail</Var>
    </p>
    <Code code={code3} />
    <p>Very straightforward. </p>
    <p>
      I hope you have noticed, that in case of empty list, I have returned
      never, because empty list has not neither head nor tail.
    </p>
    <p>Now, we can define our recursive type:</p>
    <Code code={code4} />
    <p>
      I hope you have noticed the <Var>{"-->"}</Var> symbol at the and of
      conditional type.
    </p>
    <p>
      It means, that if list has not neither Head nor Tail - return empty array.
    </p>
    <p>
      I have used empty array instead of <Var>never</Var>, because we want to
      filter an array, not to get either Head or Tail.
    </p>
    <p>Is it possible to reuse above pattern for other cases ? Sure!</p>
    <p>
      Take a look on this
      <Anchor
        href={
          "https://stackoverflow.com/questions/65476787/how-to-dynamically-create-an-object-based-on-a-readonly-tuple-in-typescript/65478618#65478618"
        }
        text={"question"}
      />
    </p>
    <p>
      Btw, we can use typeguard for <Var>Array.prototype.filter</Var>
    </p>
    <p>
      I have found this example in this
      <Anchor href="https://typescriptnapowaznie.pl/" text="book" />
    </p>
    <Code code={code8} />
    <Header {...navigation.map} />
    <p>
      Let's say you have an array and you want to map it to other array. How to
      do it with type system?
    </p>
    <Code code={code5} />
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/64112702/possible-to-use-array-prototype-map-on-tuple-in-typescript-while-preserving-tu#answer-64117673"
        text="There is"
      />
      very similar approach but more generic for mapping immutable arrays:
    </p>
    <Code code={code51} />
    <p>
      Meanwhile, you can boil some water on your laptop )) I don't know the
      reason, but declaring <Var>Mapped</Var> type inside function make TS
      playground inactive for a while
    </p>
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/65666822/typescript-merged-type-of-two-objects-in-array-with-different-payload/65668729#65668729"
        text="Here"
      />{" "}
      is another example of using above mapper util.
    </p>
    <p>
      If you want to restrict maximum array (tuple) length - this is not a
      problem.
    </p>
    <p>
      <Anchor
        href={
          "https://stackoverflow.com/questions/65495285/typescript-restrict-maximum-array-length"
        }
        text={"Here"}
      />
      you can find how to do it.
    </p>
    <Code code={code6} />
    <Header {...navigation.reduce} />
    <p>
      Ok, ok. I know what you are thinking about. How we can reduce the array to
      object?
    </p>
    <p>
      Is it possible at all with typings? Sure, you can take a look on this
      <Anchor
        text={"answer"}
        href={
          "https://stackoverflow.com/questions/65517583/create-an-object-type-in-typescript-derived-from-another-objects-values-using-a/65522869#65522869"
        }
      />
    </p>
    <p>
      We should transform <Var>Data</Var> type to <Var>ExpectedType</Var> type
    </p>
    <Code code={code7} />
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/65899183/typescript-template-literals-convert-array-to-a-list#answer-65899432"
        text="Here"
      />
      you can find another interesting use case for reduce and template literals
    </p>
    <Header {...navigation.zip} />
    <p>
      Very similar approach you can use if you want to zip your arrays into
      object.{" "}
      <Anchor
        text="Here"
        href="https://stackoverflow.com/questions/67021405/ts-types-convert-arrays-of-keys-and-array-of-values-to-object"
      />{" "}
      you can find original question.
    </p>
    <Code code={code10} />
    <p>First of all we should make sure that arrays have same length.</p>
    <Code code={code11} />
    <p>
      Array values should be primitives in our example for simplicity. Let's
      define some utils and our reduce predicate, aka callback:
    </p>
    <Code code={code12} />
    <p>Our main util:</p>
    <Code code={code13} />
    <p>Don't forget about length comparison:</p>
    <Code code={code14} />
    <p>And whole code</p>
    <Code code={code15} />
    <p>
      {" "}
      <Anchor
        text="TypeScript playground"
        href="https://www.typescriptlang.org/play?#code/FAFwngDgpgBAMlAdgcxACwDwBUZQB4hIAmAzjAEpQCGRA9ogDZgCCATq1WBlYmAHx8YAXhg58hRKRgBvGAySo0ALhgBLRADMoreDAC+wGDAD88QzBWIoAN20BuYKEiwAwrQC2EKqygIU6DHMADVwCYjJKGnomNg4uHn4AGnMATVCJKUi6RhZ2Tm5ePnNBET9FDCDBcXD4BQCUwVMQVgBXWBUNKgYSKAdgAHoAKkHDQdqQAHIyWmgOQhh6GAhWVXdVEFVbMlH+p2gYAGkoMDIREmb1ZBgAHxhEFvcAI20bmBIwJ9oGB3B95gYGLQAO5QIhHE7YEqidI1HxRHKHY4kADaAF0TNDLDZ7I49rAAAo+IiqADGVEI2ESMAAqlCxGFJGRwWRTNSYYzEScMZQSbRWERKTTBFjbDoRTiBsNRhQoCSWqwSJtYOttOTVIt0KxaC1kGgYCAgbQYN44iQdniYAAtVQQbDszLUbIxPJcZl8Kls6ocrLRXJxDBuqmUEgtBgge0RWV8gXnFYoKkJKHSPQlcxuTzeXx1TBYD1VBlSZptcymekZMhoksykNhizmMs1ZHqLQ6AASjqwAEZUVXPQWK82Xu2aNTu1Xg6HwwAyGCE0Gk8lQDDDohdqkr0fCu7YsX1iMwJuaIcdgBMVIAdJfBzosFRVAwsCee0ZWfvDy2YBuzzBL+fr6I7wYaknyra1bX+QEQTBJFsEAx93RgCDgVBZlYPvYCEInWsZznYkyQpFdH3XR0MKKIxxVYcwKKo7dRT6IYRhgMZmAgCAmCtG0FgRVQNGNF0yHkfw9VUMgoAARxaLoqVodBtCBETYB8EB5UQWjtHNX5YDA2Y7S9B14Wdf1AxpfcfRyWJ8jdVMjHTLwfDKAJcyFfci1gUwwMFWkLDU1g+k06tJ2EDjWO0DBkQAIg0WhaHCqlwsebxwtRKlkQAVjihLWCSvg+mAXlEHOGAAC8bRULDwxEaRzCi2gVHS8xMpUCZMomYA9Bgfp+gWABrYAgA"
      />
    </p>

    <Header {...navigation.find_index} />
    <p>
      It is also possible to emulate <Var>Array.prototype.findIndex</Var> in
      type system:
    </p>
    <Code code={code9} />
    <p>
      Try to implement <Var>Array.prototype.some</Var>, etc ...
    </p>
  </>
);

export default Tuples;
