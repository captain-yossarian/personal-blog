import React, { FC } from "react";
import { Var } from "../Layout";
import Code from "../Shared/Code";
import { Anchor } from "../Shared/Links";

const code1 = `
type MathCall = [
    '+' | '-' | '/' | '*' | '>' | '<',
    Expression,
    Expression,
];
type Expression = number | string | boolean | MathCall;

/**
 * Required elements in the tuple
 */
type CallParams = [Expression, Expression]
`;

const code2 = `
type Mapped<
    Arr extends Array<unknown>,
    Result extends Array<unknown> = [],
    Original extends any[] = [],
    Count extends ReadonlyArray<number> = []
    > =
    /**
     * It is required to use boundary
     */
    (Count['length'] extends MAXIMUM_ALLOWED_BOUNDARY
        ? Result
        : (Arr extends []
            ? []
            : (Arr extends [infer H]
                /**
                 *  Here we use [...Count, 1] to put a boundary
                 */
                ? [...Result, H, ...([] | Mapped<Original, [], [], [...Count, 1]>)]
                : (Arr extends [infer Head, ...infer Tail]
                    ? Mapped<[...Tail], [...Result, Head], Arr, [...Count, 1]>
                    : Readonly<Result>
                )
            )
        )
    )


type CaseCallParams = Mapped<CallParams>
`;

const code3 = `
// TESTS

// https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

// https://github.com/microsoft/TypeScript/issues/13298#issuecomment-468114901
type UnionToOvlds<U> = UnionToIntersection<
    U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
    ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
    : [T, ...A];

type Result = UnionToArray<CaseCallParams>[3]['length']; // 8
type Result_ = UnionToArray<CaseCallParams>[4]['length']; // 10
type Result__ = UnionToArray<CaseCallParams>[10]['length']; // 12
type Result___ = UnionToArray<CaseCallParams>[12]['length']; // 26
type Result____ = UnionToArray<CaseCallParams>[20]['length']; // 42
type Result_____ = UnionToArray<CaseCallParams>[50]['length']; // 102
type Result______ = UnionToArray<CaseCallParams>[54]['length']; // 110

// should end with 0 , 2 , 4 , 6 , 8
type EvenNumbers = UnionToArray<CaseCallParams>[number]['length']
`;

const code4 = `
type EvenEnd = '0' | '2' | '4' | '6' | '8'

type IsEven<T extends \`${"${number}"}\`> =
    (T extends \`${"${infer Int}${infer Rest}"}\`
        ? (
            Rest extends ''
            ? (Int extends EvenEnd
                ? true
                : false
            )
            : (Rest extends \`${"${number}"}\`
                ? IsEven<Rest>
                : false
            )
        )
        : false
    )

{
    type Test1 = IsEven<'80'> // true
    type Test2 = IsEven<'9010'> // true
    type Test3 = IsEven<'1'> // false
    type Test4 = IsEven<'99999999'> // false
}
`;

const code5 = `
type EvenLength<T extends Expression[]> =
    IsEven<\`${"${T['length']}"}\`> extends true
    ? T
    : never

const evenTuple = <
    T extends Expression,
    Tuple extends T[]
>(tuple: EvenLength<[...Tuple]>) => tuple

evenTuple([1, 3]) // ok
evenTuple([1, 3, 4]) // error
`;

const code6 = `
type Expression = number | string | boolean | CallExpression;

type CallExpression = MathCall | CaseCall;

type MathCall = [
    '+' | '-' | '/' | '*' | '>' | '<',
    Expression,
    Expression,
];



type MAXIMUM_ALLOWED_BOUNDARY = 495

type Mapped<
    N extends number,
    Result extends Array<unknown> = [],
    > =
    (Result['length'] extends N
        ? Result
        : Mapped<N, [...Result, Result['length']]>
    )

// 0 , 1, 2 ... 494
type NumberRange = Mapped<MAXIMUM_ALLOWED_BOUNDARY>[number]


type Dictionary = {
    [Prop in NumberRange as \`${"${Prop}"}\`]: Prop
}

type EvenEnd = '0' | '2' | '4' | '6' | '8'

type IsEven<T extends \`${"${number}"}\`> =
    (T extends \`${"${infer Int}${infer Rest}"}\`
        ? (
            Rest extends ''
            ? (Int extends EvenEnd
                ? true
                : false
            )
            : (Rest extends \`${"${number}"}\`
                ? IsEven<Rest>
                : false
            )
        )
        : false
    )

type Compare<Num extends number> =
    Num extends number
    ? IsEven<\`${"${Num}"}\`> extends true
    ? Num
    : never
    : never

type EvenRange = Exclude<Compare<NumberRange>, 0>

type CaseCall<Exp = unknown> = {
    [Prop in Exclude<NumberRange, 0>]?: Exp
} & { length: EvenRange }

const tuple: CaseCall<Expression> = [1, 1] as const // ok
const tuple2: CaseCall<Expression> = [1, 1, 1] as const // expected error


const handle = <
    Exp extends Expression, Data extends Exp[]
>(
    arg: [...Data],
    ...check: [...Data]['length'] extends EvenRange ? [] : [never]
) => arg

handle([1, 1, 1]) // expected error
handle([1, 1]) // ok
`;

const EvenLength: FC = () => {
  return (
    <>
      <p>Imagine situation where you need to model a tuple with even length.</p>
      <p>
        While we can model recursive object type with help of interfaces, it
        seems to be impossible (or I just don't know how) to model a tuple with
        even infinity length.
      </p>
      <p>
        But what means even infinity length? It means that we can defined this
        kinds of tuples:<Var>[1,1] | [1,1,1,1] | [1,1,1,1,1,1] ...</Var>.
      </p>
      <p>
        In other words, we are allowed to define a union of all possible tuples
        where length is even number.
      </p>
      <p>
        This union will have infinity number of elements. I don't think it is
        possible to implement but it is possible to implement first 55 tuples of
        the union.
      </p>
      <p>
        It might be possible to implement more elements of the union after{" "}
        <Anchor
          href="https://github.com/microsoft/TypeScript/pull/45711"
          text="Tail recursive evaluation of conditional types"
        />{" "}
        will be merged
      </p>
      <p>
        Please see{" "}
        <Anchor
          href="https://stackoverflow.com/questions/68370968/define-a-recursive-array-of-even-length-in-typescript"
          text="this question"
        />{" "}
        for more context.
      </p>
      <p>
        Let's define our tuple element <Var>Expression</Var> and first element
        of the union <Var>CallParams</Var>.
      </p>
      <p>Please use TypeScript 4.5 or a nightly version</p>

      <Code code={code1} />

      <p>Now we can define our main utility function.</p>
      <Code code={code2} />
      <p>
        If you are not familiar with recursive iteration through the tuple,
        please take a look on my{" "}
        <Anchor text="previous article" href="https://catchts.com/tuples" />
      </p>
      <p>
        <Anchor
          text="Playground"
          href="https://www.typescriptlang.org/play?ts=4.5.0-dev.20210904#code/FAFwngDgpgBAsgQxACwMIIDYZgXhgbWBmJgHIBqUmAHzIForbSB6RsgKjdID4uAeUgBoiJAKIAPCACcoAZ1kBLAPYA7YSRgTpcxauEBdANyhIsLTPnKVuGCoCuAWwBGUKTRiyQUhSoDm7pyUlDCgEa1pEFHQsY2BmdnYidhgAJVEARzsFGQATGCgQhygVEFkYHxgUWBA7CBCk5hNoGGiMAAUEKQQHMrx8cx0rQU1JC10VfWA4hKSYAEkQcrKVJUXMDCUAdyg8kCVylQBjGQRZauQFZccXKWGkGBDTxYqAFQBlADoAFm+Gptg4ABBAAaczgAFU4AB9QEAGVhAHkAOqiAAiUIAQgjwQA5VGAlIATRsAEYSQAGKbgZqICDQHJ8ETEQFSNxQcQgYo5MosrpgPh2FQAaxWmxU3HUJBScjsGEW7M5Km5MF5CH5gpFW3FNnw+klxAR3l8Pkw+Q5XLKYTAup1eqZLSUgvl5qVZWlCByqgwYFV-Pszlc3Ft9qDOHt8USGhgyQWSxgMky2R2lX2djOMECgpynTA9ujjQ0AApUI6SvhSCE-ChSPozYrlUDQRDoXDESj0VjcfiiXmSAB+VIyuW94gALhghd5dYtBEmUfnMAHupHUfHk9Z09dBB8ADNXDAABJzhcniMrk-R4gH1ywbYwNOwfAfZ8lp3DEm1vYwCB2NYZ0vZlIuYXie7AFiBUZLs+HzSrIsogMMB7DNBhY2hECB0jsfCGgoxoqJgwy6oReoENBr4lO++jcAAlMeEEkGuU4KjO+C7vu14eshz5sW4LwIAoGB0fRkHwBh9J8E+z58QJJGSTBQ4IYeoQ5CRvKEWRpaKR+3DnhB47up6KjenwsHwTpwkkNRunEFZJ62ZZUz-C0pxQK0HRdD0Ni0uJbmdN0sg6XEzAwC8ohvO8UzMMFxw7AopQwL4ShyCmMDICAIAQLIo5RZ4CCHEKSgAG6uDuGybB8hxKA4zAIMwACs5IAMwAOx1QATAAHAAbE54IqFYLxKHMJSuGchwgFYfDgqGE7gpuypWouE5CuO4LUbgQaFUoCh5OOKhQMVUjrcxW6FvaK0HHubhzMA604Jt205PaA43Roe0Ha4sRRTAMU5HFZSJclX5pRlWVRcaKB2E4FVVcwDgKMcSiyEoO4gMwLymG8xwKBAaOXHBcjMCSjVtQAnB1ADE+N2FAlUOEUJR0F8XUdWSXyk+SJK9f1qiDQihUYNyU0zX1A1DSNUhjRNqiMhoc0nQtKhgEthY7qtd0PTtMDvYdwDcLE1KwG0SgQKLMvTTYZsqHzAtCxbCtlIWCDjjxKoazAW1awOgLa7YH1SAbpjzLIVt8C8M34C8tYOwQVuDcNnKS7T0sqGH3C1gOO6YOm45eDTgfNHHSi+mHww+zHGqiioNp9FRNhzCHPOp+H81lHnUDPTARclxIhwYHYORQKXMDG6bTdpxKBCj6H4dcR8gJUfa46R3PC8F7AplypbTeDSX6BnL5HkBfgjX6OWla+NWRgwN9HVOZvIBQtvYt7y5h-+dw+BfGfFbFJfyA1kMDfYKFJ74KShE-PA3dWRqj4PvVy6x3If3wBSH+F8r5AO+iSNqYC4JyggZAruO9i4wP5PA9+PRP7YLQX-DBwCYBtR6obQceDH4EOfrzEhfI4Fv0QX5Sh+A2rkhoVWAB19vpfBwcwh+BCIEcOtlw2B5C+FH0-g1ER-9AH0IpFIoOMjZGEOgdw5RWAkECLqt-c+tCxGYJAaAoKHhkCOkFvkJUMBNhxWQDAckMBhhtV8TAL4ASuoBLvsw0QxUVA4muKNeRu9SE8IPio5B-obgaKvlSIOETiiiDcXgUg5IuBtS4F8LgXUuAdVIJk5oDdsnN1bjAAABgAEgAN6pNcAAX0aaGe0hYXgNJaa012CdOltNdrBEA3SVwDjOvRSZDTSBVPorMhODS6m5KehZYgA527WVXDALOGAzj7PsiBNcCyY5DI6VIaZ2ylq1MiSZOQIBzLbPHEck59EzlRh+W9Q52cO4aCssAVp9pmEvBeSSeusg6kCA6oUoM309kaAhS8-xeBHnFAEBzCkPB6EopIGizwjUYVwtICSfF31PlAqJUHSFnggmYthU80gpN2UcvZVS4KNLgCdOqWYSJsJrFh3WaMQYqhdS9I0Fi1OQyXhWNETWbpQYY6Ep2SFJeftdbAEqioTw+RIkvFqCEGwssSADJjgMSweh7TGrqLAGOCrJjcELDUB1446nCtERJaC9qQhUXdu6+owAPrWxNVAVCJJhin3Wt9JQQpQ1GojVGmNwxv5xuCq4KQSgpBAA"
        />
      </p>
      <p>Now we can write some tests.</p>
      <Code code={code3} />
      <p>
        In order to better understand how <Var>UnionToArray</Var> works please
        refer to links in comment or my{" "}
        <Anchor text="article" href="https://catchts.com/union-array" />
      </p>
      <p>
        Unfortunately, we are still limited in a number of elements in the
        union.
      </p>
      <p>
        There is a workaround. We can create a function which will validate the
        length of the tuple for us. Let's see how it works.
      </p>
      <p>
        It is relatively easy to check whether number is even or not. All even
        numbers end with <Var>type EvenEnd = '0' | '2' | '4' | '6' | '8'</Var>
      </p>
      <p>
        Hence, in order to validate, we need to convert the length of the tuple
        to string and iterate through each char until we reach the last.
      </p>
      <Code code={code4} />
      <p>Here you have a function:</p>
      <Code code={code5} />
      <p>UPDATE</p>
      <p>
        If you are allowed to use TypeScript 4.5, you can use more efficient
        version for 494 elements.
      </p>
      <Code code={code6} />
    </>
  );
};

export default EvenLength;
