import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout, Var } from "../Layout";
import Links, { Anchor } from "../Shared/Links";

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
type Mapped<
  Arr extends Array<unknown>,
  Result extends Array<unknown> = []
> = Arr extends []
  ? []
  : Arr extends [infer H]
  ? [...Result, [H, true]]
  : Arr extends [infer Head, ...infer Tail]
  ? Mapped<[...Tail], [...Result, [Head, true]]>
  : Readonly<Result>;

type Result = Mapped<[1, 2, 3, 4]>; // [[1, true], [2, true], [3, true], [4, true]]
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

type Data = typeof myArray;

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

const Tuples: FC = () => (
  <Layout title="Handle Tupels">
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
      I hope you have noticed, that in case of empty list, I returned never,
      because empty list has not neither head nor tail.
    </p>
    <p>Now, we can define our recursive type:</p>
    <Code code={code4} />
    <p>
      I hope you have noticed the <Var>{"-->"}</Var> symbol at the and of
      conditional type.
    </p>
    <p>
      It is mean, that if list has not neither Head nor Tail - return empty
      array.
    </p>
    <p>
      I used empty array here instead of never, because we want to filter an
      array, not to get either Head or Tail.
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
      Let's say you have an array and you want to map it to other array. How to
      do it with type system?
    </p>
    <Code code={code5} />
    <p>
      If you want to restrict maximum array (tuple) length - this is not a
      problem.
    </p>
    <p>
      <Anchor
        href={
          "https://stackoverflow.com/questions/65495285/typescript-restrict-maximum-array-length"
        }
        text={"here"}
      />
      you can find how to do it.
    </p>
    <Code code={code6} />
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
    <Links
      data={[
        {
          href:
            "https://stackoverflow.com/questions/65476787/how-to-dynamically-create-an-object-based-on-a-readonly-tuple-in-typescript/65478618#65478618",
          text: "stackoverflow",
        },
      ]}
    />
  </Layout>
);

export default Tuples;
