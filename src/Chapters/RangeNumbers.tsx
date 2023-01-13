import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code2 = `
interface Foo {
  age: number;
  name: string;
}

type Alias1 = Foo["age"]; // number
type Alias2 = Foo["name"]; // stirng
type Alias3 = Foo["age" | "name"]; // string | number

type Check = keyof Foo; // 'age'|'name
`;

const code3 = `
type Arr = [1, 2, 3];
type Val1 = Arr[0]; // 1
type Val2 = Arr[1]; // 2
type Val3 = Arr[0 | 1]; // 1|2
type Val4 = Arr[0 | 1 | 2]; // 3 | 1 | 1
type Val5 = Arr[number]; // 3 | 1 | 1
`;

const code4 = `type Assert<T, U extends T> = T extends U ? true : false;

type Values<T> = T[keyof T];

{
  type Test1 = Values<{ age: 42; name: "John" }>; //  42 | "John"
  type Test2 = Assert<Test1, "John" | 42>;
}

type LiteralDigits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type NumberString<T extends number> = \`${"${T}"}\`

{
  type Test1 = Assert<NumberString<6>, "6">; // true
  type Test2 = Assert<NumberString<42>, "42">; // true
  type Test3 = Assert<NumberString<6>, 6>; // false
  type Test4 = Assert<NumberString<6>, "6foo">; // false
}

type AppendDigit<T extends number | string> = \`${"${T}"}${"${LiteralDigits}"}\`

{
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
> = T extends \`${"${infer Fst}"}${"${infer Rest}"}\`
  ? Fst extends \`0\`
    ? RemoveTrailingZero<${`${"Rest"}`}>
    : \`${"${Fst}"}${"${Rest}"}\`
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

`;

const code5 = `
// https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
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
`;

const code6 = `
type MAXIMUM_ALLOWED_BOUNDARY = 999

type ComputeRange<
    N extends number,
    Result extends Array<unknown> = [],
    > =
    (Result['length'] extends N
        ? Result
        : ComputeRange<N, [...Result, Result['length']]>
    )

const ComputeRange = (N: number, Result: number[] = []): number[] => {
    if (Result.length === N) {
        return Result
    }
    return ComputeRange(N, [...Result, Result.length])
}
// 0 , 1, 2 ... 998
type NumberRange = ComputeRange<MAXIMUM_ALLOWED_BOUNDARY>[number]

// Pure js representation

const Mapped = (N: number, Result: number[] = []): number[] => {
    if (Result.length === N) {
        return Result
    }
    return Mapped(N, [...Result, Result.length])
}
`;

const code7 = `
type MAXIMUM_ALLOWED_BOUNDARY = 256

type ComputeRange<
    N extends number,
    Result extends Array<unknown> = [],
    > =
    (Result['length'] extends N
        ? Result
        : ComputeRange<N, [...Result, Result['length']]>
    )

type Octal = ComputeRange<MAXIMUM_ALLOWED_BOUNDARY>[number] // 0 - 255

type Digits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type AlphaChanel =\`${"0.${ComputeRange<999>[number]}"}\` | '1.0'

type AssertAlpha<Alpha extends number> = \`${"${Alpha}"}\` extends AlphaChanel ? Alpha : never;

type RGBA<Alpha extends number = 1.0> = [Octal, Octal, Octal, AssertAlpha<Alpha>?]

const rgb: RGBA = [255, 67, 89] // ok
const rgb2: RGBA = [256, 67, 89] //error, 255 is out of range
const rgba: RGBA<0.25> = [245, 67, 34, 0.25] // ok
`;

const code8 = `
const add = (xl: number[], yl: number[]) => [...xl, ...yl].length

const result = add([3, 3, 3], [1]) // 4
`;

const code9 = `
  type Add<A extends number, B extends number> = 
    [...ComputeRange<A>, ...ComputeRange<B>]['length']
`;

const code10 = `
type Add_5_3 = Add<5, 3> // 8
`;

const code11 = `
const first = [1, 2, 3, 4]
const second = [1, 2, 3, 4, 5, 6, 7, 8, 9]

first[second[second.length-1]] // undefined

// second is greater
`;
const code12 = `

type IsLiteralNumber<N> =
    N extends number ? number extends N ? false : true : false

type Last<T extends any[]> =
    T extends [...infer _, infer Last] ? Last extends number ? Last : never : never

type IsGreater<A extends number, B extends number> =
    IsLiteralNumber<
        [...ComputeRange<B>][Last<[...ComputeRange<A>]>]
    > extends true ? false : true
`;

const code13 = `
type Iteration<
    Min extends number,
    Max extends number,
    ScaleBy extends number,
> =
    IsGreater<Last<Result>, Max> extends true
    ? Result
    : 'RECURSIVE CALL'
`;
const code14 = `
type AddIteration<
    Min extends number,
    Max extends number,
    ScaleBy extends number,
    Result extends Array<unknown> = []
> =
    IsGreater<Last<Result>, Max> extends true
    ? Result
    : AddIteration<
        Min, Max, ScaleBy, [...Result, Add<Last<Result>, ScaleBy>]
    >

// Type instantiation is excessively deep and possibly infinite.
type Result = AddIteration<5, 40, 8>

`;

const code15 = `

type AddIteration<
    Min extends number,
    Max extends number,
    ScaleBy extends number,
    Result extends Array<unknown> = [0]
> =
    IsGreater<Last<Result>, Max> extends true
    ? Result
    : AddIteration<
        Min, Max, ScaleBy, [...Result, Add<Last<Result>, ScaleBy>]
    >

// [0, 8, 16, 24, 32, 40, 48]
type Result = AddIteration<5, 40, 8>
`;

const code16 = `
type AddIteration<
    Min extends number,
    Max extends number,
    ScaleBy extends number,
    Result extends Array<unknown> = [Min]
> =
    IsGreater<Last<Result>, Max> extends true
    ? Result
    : AddIteration<
        Min, Max, ScaleBy, [...Result, Add<Last<Result>, ScaleBy>]
    >

// [5, 13, 21, 29, 37, 45]
type Result = AddIteration<5, 40, 8>
`;

const code17 = `
type ComputeRange<
    N extends number,
    Result extends Array<unknown> = [],
> =
    (Result['length'] extends N
        ? Result
        : ComputeRange<N, [...Result, Result['length']]>
    )

type Add<A extends number, B extends number> = [...ComputeRange<A>, ...ComputeRange<B>]['length']

type IsGreater<A extends number, B extends number> = IsLiteralNumber<[...ComputeRange<B>][Last<[...ComputeRange<A>]>]> extends true ? false : true

type Last<T extends any[]> = T extends [...infer _, infer Last] ? Last extends number ? Last : never : never

type RemoveLast<T extends any[]> = T extends [...infer Rest, infer _] ? Rest : never

type IsLiteralNumber<N> = N extends number ? number extends N ? false : true : false


type AddIteration<
    Min extends number,
    Max extends number,
    ScaleBy extends number,
    Result extends Array<unknown> = [Min]
> =
    IsGreater<Last<Result>, Max> extends true
    ? RemoveLast<Result>
    : AddIteration<
        Min, Max, ScaleBy, [...Result, Add<Last<Result>, ScaleBy>]
    >

// [5, 13, 21, 29, 37]
type Result = AddIteration<5, 40, 8>

`;

const code18 = `
const add = (a: number, b: number) => [...computeRange(a), ...computeRange(b)]['length']

const isLiteralNumber = (value: any) => typeof value === 'number'

const last = (xl: number[]) => {
    //const [...rest, last] = xl
    return xl[xl.length - 1]
}

const computeRange = (n: number) => Array(n).fill(0).map((_, index) => index)

const isGreater = (a: number, b: number) => 
  isLiteralNumber([...computeRange(b)][last(computeRange(a))]) ? false : true

const addIteration = (min: number, max: number, scaleBy: number, result = [min]): number[] => {
    if (isGreater(last(result), max)) {
        return result
    }

    return addIteration(min, max, scaleBy, [...result, add(last(result), scaleBy)])
}
const result = addIteration(5, 40, 8)

// [ 5, 13, 21, 29, 37, 45 ]
console.log({ result })
`;

const navigation = {
  part_1: {
    id: "part_1",
    text: "Generate a union of number range in TS >= 4.5",
  },
  part_2: {
    id: "part_2",
    text: "Generate a range with min,max and steb by parameters",
    updated:true
  },
  part_3: {
    id: "part_2",
    text: "Generate a union of number range in TS <= 4.5",
  },
};

const links = Object.values(navigation);

const RangeNumbers: FC = () => (
  <>
    <HeaderNav links={links} />
    <Header {...navigation.part_1} />
    <p>
      Since TS 4.5,{" "}
      <Anchor
        href="https://github.com/microsoft/TypeScript/pull/45711"
        text="Tail recursion PR"
      />
      it is possible to make a range of <Var>numbers</Var> from 0 to 999.
    </p>
    <Code code={code6} />
    <p>
      We can use above pattern to create a standalone type for RGBa color
      format:
    </p>
    <Code code={code7} />
    <p>
      <Anchor text="Playground" href="tsplay.dev/mAvlkW" />
    </p>
    <p>
      Since TypeScript 4.8 it is possible to infer pure number from string. See{" "}
      <Anchor
        text="PR"
        href=" https://github.com/microsoft/TypeScript/pull/48094"
      />
    </p>
    <p>
      Let's take a look on <Var>type Values = T[keyof T]</Var> utility.
    </p>
    <p>Maybe you wonder, what does it mean ?</p>
    <p>
      Before we continue, please make sure you are aware of
      <Anchor
        href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-typ"
        text="distributive types"
      />
    </p>
    <p>Let's start with simple example:</p>
    <Code code={code2} />
    <p>
      Our <Var>Values</Var> utility works perfect with objects, but not with
      arrays.
    </p>
    <p>
      To get all keys of object, we use - <Var>keyof</Var>.
    </p>
    <p>
      To get all array elements we use <Var>[number]</Var> because arrays have
      numeric keys.
    </p>
    <Code code={code3} />
    <Header {...navigation.part_2} />
    <p>
      Imagine you need to create utility type to generate a range with MIN, MAX
      and STEP_BY parameters. I mean something like that:{" "}
      <Var>type ScaleByEight = 8 | 16 | 24 | 32 ... 400</Var>. Where MIN is 8,
      MAX is 400 and step is 8.
    </p>
    <p>There is no built-in utility type for that, but we can write it.</p>
    <p>
      First of all, we need to use already known utility type{" "}
      <Var>ComputeRange</Var>. In order to generate a range with incremental
      step, we need to teach our program to add numbers in TS type system. It is
      not complicated at all. How to add numbers in pure JS having only arrays ?
    </p>
    <Code code={code8} />
    <p>
      I have used arrays instead of numbers, because we can concat two arrays
      and get their length.
    </p>
    <p>Let's write it in TS system.</p>
    <Code code={code9} />
    <p>
      Please don't forget that <Var>ComputeRange</Var> generates an array of
      some length where each element represents its own index.{" "}
      <Var>{"type Result = ComputeRange<5> // [0,1,2,3,4]"}</Var>
    </p>
    <p>Let's try to add two numbers:</p>
    <Code code={code10} />
    <p>
      Ok, assume we know how to generate a range with incremental step, but how
      do we know when to stop? We need to compare current element to MAX allowed
      value. There is no {">"} and {"<"} operators. How would you do it in JS
      without math operations?
    </p>
    <p>
      You can check whetherlast element of one array can be a valid index for
      second array.
    </p>
    <Code code={code11} />
    <p>Let's write in TS type system:</p>
    <Code code={code12} />
    <p>
      You probably have noticed that I have added two helpers: <Var>Last</Var> -
      infers last element from the array and <Var>IsLiteralNumber</Var> which
      checks whether obtained number is actually a literal number or{" "}
      <Var>undefined</Var>. Btw, I have used <Var>{"[...ComputeRange<B>]"}</Var>{" "}
      instead of <Var>{"ComputeRange<B>"}</Var> because it prevents it from{" "}
      <Var>Type instantiation is excessively deep and possibly infinite</Var>{" "}
      error. SMall trick :D
    </p>
    <p>
      Now, we have all required utilities to write our main function. First of
      all we need to decide when we have to exit recursive utility type. We need
      to exit when next element is greater than <Var>MAX</Var>.
    </p>
    <p>
      So, now, we need to recursively generate an array where each next value
      should be a sum of a previous one and <Var>scale by</Var> parameter.
    </p>
    <Code code={code13} />
    <p>
      Now we can implement <Var>RECURSIVE CALL</Var>. Just call itself :D
    </p>
    <Code code={code14} />
    <p>
      Unfortunately, we have an error. Luckly, I know how to fix it :D. Just use
      an array with at least one element <Var>[0]</Var> instead of <Var>[]</Var>{" "}
      as a default value for <Var>Result</Var> generic.
    </p>
    <Code code={code15} />
    <p>
      Still not cool, we always have <Var>Max + step</Var> last element. Since{" "}
      <Var>Max</Var> is 40, we should not allow <Var>48</Var>. Also,{" "}
      <Var>Min</Var> is not used at all. In order to apply minimum value, we
      should replace <Var>[0]</Var> with <Var>[Min]</Var>.
    </p>
    <Code code={code16} />
    <p>
      Still does not work. We don't respect <Var>Max</Var>. In order to fix it,
      before returning <Var>Result</Var> in our recursive function, we just need
      always remove last element. Let's see the final code:
    </p>
    <Code code={code17} />
    <p>
      In order to better understand this, I have prepared for you a pure JS
      representation for above logic.
    </p>
    <Code code={code18} />
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/75108082/is-it-possible-to-generate-a-union-type-of-numbers-without-explicitly-stating-ea/75109244#75109244"
        text="Here"
      />{" "}
      you can find my answer
    </p>

    <Header {...navigation.part_3} />
    <p>
      If you still want to generate literal numbers instead of string numbers,
      you can use this code:
    </p>
    <Code code={code5} />
  </>
);

export default RangeNumbers;
