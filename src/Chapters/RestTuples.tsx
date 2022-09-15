import React, { forwardRef, useRef, ForwardRefRenderFunction, FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";

const code1 = `
type Tuple = [...number[], "middle-element", ...boolean[]] // error
`;

const code2 = `
const last = (data: any) => data[data.length - 1]

const handleEmpty = (data: any[], defaultValue) => data.length === 0 ? null : defaultValue

const never = null;

const validation = (params: any[], cache: any[] = []): any[] | null => {
  if (params.length === 0 && cache.length === 0) {
    return never // never is null
  }
  const [fst, ...rest] = params;
  if (cache.length === 0) {
    if (typeof fst === 'number') {
      return handleEmpty(rest, validation(rest, [...cache, fst]))
    } else {
      return never
    }
  }
  if (typeof fst === 'number') {
    return handleEmpty(rest, validation(rest, [...cache, fst]))
  }
  if (typeof fst === "middle-element") {
    if (typeof last(cache) === 'number') {
      return handleEmpty(rest, validation(rest, [...cache, fst]))

    }
    return null
  }
  if (cache.includes('middle-element')) {
    if (typeof fst === 'boolean') {
      return handleEmpty(rest, validation(rest, [...cache, fst]))
    }
  }
  return never
}
`;

const code3 = `
type Elem = number | boolean | "middle-element";

type Last<T extends any[]> = T extends [infer _]
  ? never
  : T extends [...infer _, infer Tl]
  ? Tl
  : never

type HandleEmpty<T extends any[], Data> = T['length'] extends 0 ? never : Data

type Validation<Params extends any[], Cache extends Elem[] = []> =
  Params extends []
  ? Cache['length'] extends 0
  ? never
  : Cache
  : Params extends [infer Fst, ...infer Rest]
  ? Cache extends []
  ? Fst extends number
  ? HandleEmpty<Rest, Validation<Rest, [...Cache, Fst]>>
  : never
  : Fst extends number
  ? Last<Cache> extends number
  ? HandleEmpty<Rest, Validation<Rest, [...Cache, Fst]>>
  : never
  : Fst extends "middle-element"
  ? Last<Cache> extends number
  ? HandleEmpty<Rest, Validation<Rest, [...Cache, Fst]>>
  : never
  : "middle-element" extends Cache[number]
  ? Fst extends boolean
  ? Validation<Rest, [...Cache, Fst]>
  : never
  : never
  : never
`;

const code4 = `
type Test = Validation<[42, 43, "middle-element", false, true]> // ok
type Test2 = Validation<[42, "middle-element", true, false]> // ok

type Test3 = Validation<[false, "middle-element", 42]> // never
type Test4 = Validation<[42, false]> // never
type Test5 = Validation<[false, false, false, "middle-element", 42, "middle-element", 43]> //never
type Test6 = Validation<[false, false, false, "middle-element", 42, false, 43]> // never
type Test7 = Validation<[false, 42, "middle-element"]> // never
type Test8 = Validation<[false, "middle-element", 42, false, "middle-element", 42,]> // never
type Test9 = Validation<[false, "middle-element"]> // never
type Test10 = Validation<[false]> // never
type Test11 = Validation<[]> // never
type Test12 = Validation<[42, "middle-element", boolean, "middle-element", 43]> //never
type Test13 = Validation<[2, false, "middle-element"]> // never
`;

const code5 = `
// credits https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379091887
type IsNever<T> = [T] extends [never] ? true : false;

function check<
  Params extends Elem[],
  IsValid extends Validation<Params>
>(...arr: IsNever<IsValid> extends true ? [never] : [...Params]) {
  return arr
}

/**
 * Ok
 */
const valid = check(1, 'middle-element', false)
const valid2 = check(1, 42, 43, 67, 'middle-element', false, true, false)

/**
 * Errors
 */
const test2 = check(false, "middle-element", 2)
const test1 = check(1, false)
const test3 = check()
`;

const code6 = `
const result = builder([
  {},  //ok
  { name: 'name' },  //ok
  { name: "name", age: 'age' },  //ok
  { age: 'age' } // error
])
`;

const code7 = `
type Last<T> = T extends [...infer _, infer L] ? L : never
type First<T> = T extends [infer Head, ...infer _] ? Head : never
type Tail<T> = T extends [infer _, ...infer Tail] ? Tail : never
type ReplaceFirst<T> = [[never], ...Tail<T>]
`;

const code8 = `
type Validator<T extends Array<any>, Result extends Array<any> = []> =
  (T extends []
    ? Result
    : (T extends [infer Head]
      ? (Head extends Last<Result> ? [...Result, Head]
        : [...Result, never]
      )
      : (T extends [infer Head, ...infer Rest]
        ? (First<Rest> extends Head
          ? Validator<Rest, [...Result, Head]>
          : Validator<ReplaceFirst<Rest>, [...Result, Head]>)
        : never)
    )
  )
`;

const code9 = `
type Last<T> = T extends [...infer _, infer L] ? L : never
type First<T> = T extends [infer Head, ...infer _] ? Head : never
type Tail<T> = T extends [infer _, ...infer Tail] ? Tail : never
type ReplaceFirst<T> = [[never], ...Tail<T>]

type Validator<T extends Array<any>, Result extends Array<any> = []> =
  (T extends []
    ? Result
    : (T extends [infer Head]
      ? (Head extends Last<Result> ? [...Result, Head]
        : [...Result, never]
      )
      : (T extends [infer Head, ...infer Rest]
        ? (First<Rest> extends Head
          ? Validator<Rest, [...Result, Head]>
          : Validator<ReplaceFirst<Rest>, [...Result, Head]>)
        : never)
    )

  )


const builder = <
  Prop extends PropertyKey,
  Value extends string,
  Elem extends Record<Prop, Value>,
  Tuple extends Elem[]
>(tuple: [...Tuple] & Validator<[...Tuple]>) => tuple

const result = builder([
  {},  //ok
  { name: 'name' },  //ok
  { name: "name", age: 'age' },  //ok
  { age: 'age' } // error
])
`;

const code10 = `
type Last<T> = T extends [...infer _, infer LastElem] ? LastElem : never

type Head<T> = T extends [infer First, ...infer _] ? First : never

type IsChainable<Current, Next> =
  (Last<Current> extends Head<Next>
    ? (Head<Next> extends Last<Current>
      ? true
      : false)
    : false)

type True = IsChainable<[1, 2], [2, 3]> // true
type False = IsChainable<[1, 2], [1, 3]> // false
`;

const code11 = `
type DominoChain<List extends any[], Result extends any[] = []> =
  // last call
  (List extends []
    ? Result
    // before last call
    : (List extends [infer First]
    // if elements are chainable, leave next element as it is
      ? (IsChainable<Last<Result>, First> extends true
        ? [...Result, First]
        // otherwise return never
        : never) 
      // all callse except last and before last
      : (List extends [infer First, ...infer Rest]
        // if first call, don't check if it is allowed
        ? (Result extends []
          ? DominoChain<Rest, [...Result, First]>
          // checkif it chainable
          : (IsChainable<First, Head<Rest>> extends true
            // if yes, leave element as it is
            ? DominoChain<Rest, [...Result, First]>
            // otherwise return never
            : never))
        : never
      )
    )
  )
`;
const code12 = `
type Last<T> = T extends [...infer _, infer LastElem] ? LastElem : never

type Head<T> = T extends [infer First, ...infer _] ? First : never

type IsChainable<Current, Next> =
  (Last<Current> extends Head<Next>
    ? (Head<Next> extends Last<Current>
      ? true
      : false)
    : false)

type DominoChain<List extends any[], Result extends any[] = []> =
  (List extends []
    ? Result
    : (List extends [infer First]
      ? (IsChainable<Last<Result>, First> extends true
        ? [...Result, First]
        : never)
      : (List extends [infer First, ...infer Rest]
        ? (Result extends []
          ? DominoChain<Rest, [...Result, First]>
          : (IsChainable<First, Head<Rest>> extends true
            ? DominoChain<Rest, [...Result, First]>
            : never))
        : never
      )
    )
  )

type Test1 = DominoChain<[["A", "B"], ["B", "C"], ["C", "D"], ["D", "E"]]>
type Test2 = DominoChain<[[3, 4], [4, 2], [2, 1]]>
type Test3 = DominoChain<[[3, null], [null, {}], [{}, undefined]]>
type Test4 = DominoChain<[[1, 2]]> // ok 
type Test5 = DominoChain<[]> // ok

type Test6 = DominoChain<[[1, 2], [3, 4],]> // never

const domino = <
  Elem extends string,
  Tuple extends Elem[],
  List extends [...Tuple][]
>(list: [...List] & DominoChain<[...List]>) => list

domino([["A", "B"], ["B", "C"], ["C", "D"], ["D", "E"]]) // ok
domino([[1, 2], [3, 4],]) // error
`;

const code13 = `

type MAXIMUM_ALLOWED_BOUNDARY = 50

type Mapped<
    Tuple extends Array<unknown>,
    Result extends Array<unknown> = [],
    Count extends ReadonlyArray<number> = []
    > =
    (Count['length'] extends MAXIMUM_ALLOWED_BOUNDARY
        ? Result
        : (Tuple extends []
            ? []
            : (Result extends []
                ? Mapped<Tuple, Tuple, [...Count, 1]>
                : Mapped<Tuple, Result | [...Result, ...Tuple], [...Count, 1]>)
        )
    )


type Result = Mapped<[string, number, number[]]>
`;
const navigation = {
  double_rest: {
    id: "duble_rest",
    text: "Double rest operator",
  },
  elem_inheritance: {
    id: "elem_ineritance",
    text: "Make each elem a subtype of previous",
  },
  domino: {
    id: "domino",
    text: "Validate tuples according to domino rules",
    
  },
  repeated_pattern: {
    id: "repeated",
    text: "Typing repeated pattern",
    
  },
};
const links = Object.values(navigation);

const RestTuples: FC = () => (
  <>
    <HeaderNav links={links} />
    <Header {...navigation.double_rest} />

    <p>Assume you have to create a type for this tuple:</p>
    <Code code={code1} />
    <p>
      Above code does not work because of error N 1265
      <Var>A rest element cannot follow another rest element.</Var>
    </p>
    <p>
      Since it is impossible to create such type, we can validate it. I mean,
      create a function which will validate whether our tuple meets the
      requirements or not.
    </p>
    <p>
      Before we proceed with unreadable types, lets think how would you do it in
      plain javascript:
    </p>
    <Code code={code2} />
    <p>
      I know, this code is ugly but readable. I did not use
      <Var>Array.prototype</Var> methods, because typescript mapped types does
      not support such kind of methods. All tuple iteration are made with help
      of recursion. Above example is one-to-one representation of what we will
      do in type system.
    </p>
    <Code code={code3} />
    <p>
      I know, you think this type is unreadable, but it is pretty
      straightforward and repetitive.
    </p>
    <p>Let's test it.</p>
    <Code code={code4} />
    <p>Now we can try to use our type in function declaration.</p>
    <Code code={code5} />
    <p>It works as expected.</p>
    <p>
      This is very rare case, that's why I did not provide you with line-by-line
      explanation, but at least you know that such validation is possible in
      typescript.
    </p>
    <Header {...navigation.elem_inheritance} />
    <p>
      Assume you want to create a tuple, where each next elem is a subtype of
      previous. Like here
    </p>
    <Code code={code6} />
    <p>
      This solution uses similar approach as a previous one. It is impossible to
      create such type in TypeScript but it is possible to infer it and validate
      it in a function{" "}
    </p>
    <p>Let's create some util type. They will be helpful</p>
    <Code code={code7} />
    <p>
      Logic of our validator is pretty straightforward. <Var>Validator</Var> -
      iterates through the infered tuple/array and checks whether next element (
      <Var>Rest[0] extends Head</Var>) extends previous one. If yes, call
      <Var>Validator</Var> recursively with this element, otherwise call{" "}
      <Var>Validator</Var> with <Var>never</Var> instead of invalid element.{" "}
      <Var>T extends [infer Head]</Var> - before the last call, checks whether
      element extends last element from <Var>Result</Var> or not. If yes - push
      element to <Var>Result</Var> and return <Var>Result</Var>, otherwise push{" "}
      <Var>never</Var> to <Var>Result</Var>.
    </p>
    <Code code={code8} />
    <p>Full code:</p>
    <Code code={code9} />
    <p>
      <Anchor
        text="Playground"
        href="https://www.typescriptlang.org/play?ts=4.4.4#code/C4TwDgpgBAMghgZ2AHgCoD4oF4qqhAD2AgDsATBKAbQDo6BLEgMwgCcoB9AGikZfZgBdKAH5YUAFxQSEAG5sAUKEhQAYvVZI0mHHkLFylKnzZQAEhDhkedGifYdhYi1cnS5i5dFRx6AG21sXHwiUgpqe04bBmZTH38nXF8-Nxl5ViVwaAAlCDA-OABjCHVNFAwgqio0tkFomniAjEEFTJUANTg-ejI4YAB7VjQQg3CAQVZWOBBkOBIQdB5chABXP2ARsMoJqZm5hcrBHQUoKAAKPVDDahbT07FlteATu6kLzevjWPYXMlu7+7nX4fcLwLSPdaYMS0OgQ4A8X7-AGnKQwmhwng1VhIu4ASheALel1GRkiv3qkWWwBxALEZ1K4IgSEw+i25ksZAJyMBnW6vQGQypPDRGPZViOXO5Ul5PT6g2QuXyRRKGkZzOFtlFiPQ+O5KPc6V1eNap3xrUK-RISCgACMVv4yKYcMgXgAFVj9MAgyjuz1sUAAaQgIC4L15K2grOuSFYjAA5qHTgBRPwQAC23qguQtrDIyF9YB44YgixeqBW+UjV3CKfTVBa6DOwArqdRtnLleEADIoDL+fK0R3U0dcdhMM3K+bLdbWEynkE7Q62GcqC8AN4AXx4UAA9Dv+gBrdfSOBpiBSADkJFPEAvUC3pz3h+P17PUgARK+IO+eHA4+eoAvP9b3vbcnyPU41ygYDL2Au8N13Hd8EmQYFEEXEgA"
      />
    </p>
    <p>
      I hope you have noticed this line{" "}
      <Var>{`[...Tuple] & Validator<[...Tuple]>`}</Var>. Intersection of infered
      argument with validated argument makes sure that only invalid property
      will be highlighted. This technique is very useful.
    </p>
    <Header {...navigation.domino} />
    <p>
      Imagine you want to validate this tuple of tuples{" "}
      <Var>{`[ [1,2], [2,1], [3,4] ]`}</Var> according to domino rules. I mean,
      first element is <Var>{`[1,2]`}</Var>, hence second element should be{" "}
      <Var>{`[2, *]`}</Var>. So first two elements are in right order and the
      last one is wrong because it should be <Var>{`[1, *]`}</Var>. While it is
      impossible to express in a standalone type such restriction in generic
      way, we can use extra utility type and validate passed argument/generic.
    </p>
    <p>
      Let's define simple utility which will check whether two tuples are
      chainable or not.
    </p>
    <Code code={code10} />
    <p>Now we can define our main iterator utility type</p>
    <Code code={code11} />
    <p>
      If you are not familiar with recursive iteration through tuple,{" "}
      <Anchor href="https://catchts.com/tuples" text="here" /> you can find an
      explanation.
    </p>
    <p>Here you have whole code with tests</p>
    <Code code={code12} />
    <p>
      P.S.{" "}
      <Anchor
        href="https://stackoverflow.com/questions/69901253/defining-an-array-type-with-matching-pairs-like-domino-bricks-in-typscript/69902043#69902043"
        text="Related answer"
      />
    </p>
    <Header {...navigation.repeated_pattern} />
    <p>
      I'd willing to bet that you are curious how to type a tuple in repeated
      manner. For instance <Var>{`[A, B, A, B, A, B]`}</Var>.Since we have
      <Anchor
        href="https://github.com/microsoft/TypeScript/pull/45711"
        text="Tail recursion optimization"
      /> in TS, we can create an utility type which build a union of all allowed values.
      Please keep in mind that it will generate finite collection of allowed
      states.
    </p>
    <Code code={code13} />
    <p>
      Please keep in mind, you can increase <Var>MAXIMUM_ALLOWED_BOUNDARY</Var>{" "}
      if you want up to <Var>999</Var>. I'd willing to bet that it will generate
      enough allowed states.
    </p>
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/61155425/how-to-define-array-with-alternating-types-in-typescript/69800688#69800688"
        text="Here"
      />{" "}
      you can find related answer
    </p>
  </>
);

export default RestTuples;
