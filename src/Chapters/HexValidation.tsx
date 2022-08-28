import React, { FC } from "react";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import Code from "../Shared/Code";
import { Anchor } from "../Shared/Links";

const code1 = `
type HexNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type HexString = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
type StringNumber<T extends number> = \`${"${T}"}\`;
type HEX = HexNumber | StringNumber<HexNumber> | HexString;
`;

const code2 = `
type ToArray<T extends string, Cache extends readonly string[] = []> =
    T extends \`${"${infer A}${infer Rest}"}\`
    ? A extends HEX
    ? ToArray<Rest, [...Cache, A]> : A extends ''
    ? 1 : 2 : T extends '' ? Cache extends { length: 6 }
    ? Cache : 'String should have 6 chars. No more, no less' : never;

`;

const code3 = `
type Elem = string;

type ReduceToString<
    Arr extends ReadonlyArray<Elem>,
    Result extends string = ''
    > = Arr extends []
    ? Result
    : Arr extends [infer H]
    ? H extends Elem
    ? \`${"${Result}${H}"}\`
    : never
    : Arr extends readonly [infer H, ...infer Tail]
    ? Tail extends ReadonlyArray<Elem>
    ? H extends Elem
    ? ReduceToString<Tail, \`${"${Result}${H}"}\`>
    : never
    : never
    : never;
`;

const code4 = `
type Result = ReduceToString<ToArray<'abcdef'>> // allow
type Result2 = ReduceToString<ToArray<'00cdef'>> // allow
type Result3 = ReduceToString<ToArray<'z0cdef'>> // not allow
type Result4 = ReduceToString<ToArray<'00cdem'>> // not allow
type Result5 = ReduceToString<ToArray<'aaaaa'>> // to few arguments

`;

const code5 = `
const hex = <T extends string, U extends {
    'valid': 'valid',
    'invalid': 'invalid',
}[Check<T> extends string[] ? Mapper<Check<T>> extends T ? 'valid' : never : 'invalid']>
    (value: T, ...rest: U extends 'valid' ? [] : [never]) => value

const result = hex('aaaaaf') // ok
const result2 = hex('aaaaaZ') // error
`;

const code6 = `
type HexNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type HexString = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
type StringNumber<T extends number> = \`${"${T}"}\`;
type HEX = HexNumber | StringNumber<HexNumber> | HexString;

type ToArray<T extends string, Cache extends readonly string[] = []> =
    T extends \`${"${infer A}${infer Rest}"}\`
    ? A extends HEX
    ? ToArray<Rest, [...Cache, A]> : A extends ''
    ? 1 : 2 : T extends '' ? Cache extends { length: 6 }
    ? Cache : 'String should have 6 chars. No more, no less' : never;

type Elem = string;

type ReduceToString<
    Arr extends ReadonlyArray<Elem>,
    Result extends string = ''
    > = Arr extends []
    ? Result
    : Arr extends [infer H]
    ? H extends Elem
    ? \`${"${Result}${H}"}\`
    : never
    : Arr extends readonly [infer H, ...infer Tail]
    ? Tail extends ReadonlyArray<Elem>
    ? H extends Elem
    ? ReduceToString<Tail, \`${"${Result}${H}"}\`>
    : never
    : never
    : never;
`;

const code7 = `
type ComputeRange<
    N extends number,
    Result extends Array<unknown> = [],
    > =
    (Result['length'] extends N
        ? Result[number]
        : ComputeRange<N, [...Result, Result['length']]>
    )

type HexNumber =\`${"${ComputeRange<10>}"}\`
type HexString = 
  | 'A' 
  | 'B' 
  | 'C' 
  | 'D' 
  | 'E' 
  | 'F' 
  | 'a' 
  | 'b' 
  | 'c' 
  | 'd' 
  | 'e' 
  | 'f'

type Hex = \`${"${HexNumber}"}\` | HexString;

type StringLength<
    Str extends string,
    Acc extends string[] = []
    > =
    (Str extends \`${"${infer S}${infer Rest}"}\`
        ? StringLength<Rest, [...Acc, S]>
        : Acc['length'])

type ValidateLength<
    Str extends string,
    Length extends number
    > =
    (StringLength<Str> extends Length
        ? Str
        : never)

type ValidateHex<
    Color extends string,
    Cache extends string = '',
    > =
    Color extends \`${"${infer A}${infer Rest}"}\`
    ? (A extends ''
        ? Cache
        : (A extends Hex
            ? ValidateHex<Rest, \`${"${Cache}${A}"}\`>
            : never)
    ) : Cache


type ExtractHash<T extends string> = T extends \`${"#${infer Rest}"}\` ? Rest : never


type ValidateMap<T extends Record<string, string>> = {
  [Prop in keyof T]:
  & T[Prop]
  & ValidateHex<T[Prop]>
  & ValidateLength<T[Prop], 6 | 3>
}

type AddHash<T extends Record<string, string>> = {
  [Prop in keyof T]: \`${"#${T[Prop]}"}\`
}

const color = <
    Key extends string,
    Value extends string,
    ColorMap extends Record<Key, Value>
>(dictionary: AddHash<ValidateMap<ColorMap>>) => dictionary


const colorTheme = color({
  /**
   * Ok
   */
  white: '#ffffff', // ok
  gray: '#e2e2e2', // ok
  anyColor: '#ddd', // ok
  /**
   * Error
   */
  green: '#ffx', // expected error,
  foo:'#___', // expected error
  bar: '#www' // expected error
})


colorTheme.gray // '#e2e2e2'
`;
const navigation = {
  function_inference: {
    id: "function_inference",
    text: "Function inference validation",
    updated: true,
  },
  type_validation: {
    id: "type_validation",
    text: "Type scope validation",
  },
};

const links = Object.values(navigation);

const HexValidation: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.function_inference} />
      <p>
        If you need to create a color map, where each value should be a valid
        HEX value, you can check this code:
        <Code code={code7} />
        <p>Explanation</p>
        <p>
          <ul>
            <li>
              <Var>type ComputeRange</Var>: is used for generating union of
              numbers. See
              <Anchor
                href="https://catchts.com/range-numbers"
                text="my article"
              />
              for more explanation
            </li>
            <li>
              <Var>type Hex</Var>: just a union of all allowed HEX chars
            </li>
            <li>
              <Var>type StringLength</Var>: recursively computes length of
              string, is used for validation of HEX length, because it should be
              either 3 or 6
            </li>
            <li>
              <Var>type ValidateLength</Var>: If length is valid return provided
              string, otherwise return <Var>never</Var>
            </li>
            <li>
              <Var>type ValidateHex</Var>: main validation type utility;
              iterates recursively through each char and checks whether it is
              allowed HEX value or not
            </li>
            <li>
              <Var>type ExtractHash</Var>: removes <Var>#</Var> from provided
              HEX value, because it pollutes main hex values
            </li>
            <li>
              <Var>type ValidateMap</Var>: checks whether provided string has
              length 3 or 6 chars and if every char is allowed hex value
            </li>
          </ul>
        </p>
      </p>
      <p><Anchor href="https://tsplay.dev/WKRPZm" text="Playground" /></p>
      <Header {...navigation.type_validation} />
      <p>So, you want to validate HEX string?</p>
      <p>Am, I right?</p>
      <p>First of all, let's define our constraints.</p>
      <Code code={code1} />
      <p>
        To be able to do some transformations over the string, we should convert
        it to tuple.
      </p>
      <Code code={code2} />
      <p>
        Now, when we know that our string is exactly 6 chars length and contains
        only allowed symbols, we can join it back to string.
      </p>
      <Code code={code3} />
      <p>Let's test it.</p>
      <Code code={code4} />
      <p>Looks great, but how we can use it in practice?</p>
      <Code code={code5} />
      <p>That's all folks.</p>
      <p>Full code</p>
      <Code code={code6} />
      <p>
        <Anchor
          href="https://www.typescriptlang.org/play?#code/C4TwDgpgBAEhAeA5ArgWwEYQE5QLxQAYoAfKARhKgCZKBmSgFkoFZKA2SgdkoA5KBOAFChIsBAGVgWAJYA7AOZ4oAcgCCyysoBCG0soDCulQBEjygKJmAYmYCGZ9GYDGZgCZmIZgGbLh4aJIyCigY2AA8ACpQCMAQsq4AzlCyaJhYAHxKAAYAJADeEQC+WQDcfqIw5gAaSnBIqdiUgXLyIWlhdW3YmaR1zQplguXQEQD2qlhYtiCR0fCx8UkJUi0ANFD6tk4AFtAxcYlQWBC2rqOyADYgUMtB8gDaALpKT5m4glCfUFH7i1C5eTkXkaqkK+SBjQAShBlsUPl8APxQVRzBaHSpVeGfJFjCZTGbQ5bre4AOjJmx2EHWqkemQAXMjUQckspfF8oEiKAyaAyfvNmSoNEiKbsmX88lALnF5MBtgyOIUsRyNltRQzlP1FAltqNkBdXFBtrYAG7QDg7WxYBIkqCIUZQVCjY7rWT2qUJBIaBmyCCmrCDYZQcxS1BKW4tQYiaDQ1zIJwQMaasJKvFiw7Q07nK546ZhYMQVDpVZKwl64BppYrBRKVlKt7IyYVqBPJVI0sXYBKhmp36He4QnAwR6t2BN-OoEcA9vAMF5GBw9ne33YLsNnC9pLHTOXa792TAwfrMkkgffWzSC7D9k488XJsZs47nMzcfpEcwMchkcxuMJ0ZJiJb3WKcYTLWd5yyN9F2SZcsFXH0-Xg2DI38KBpyUH940TKt5EicZJlzZRbHQJxXAgHx0kyAB6KioFsC4LlGAB3QNpxofBML-AD8PxMJlAIAhSPI5RKKgGi6IY5jWNAjt6A4iBYyw-8cLw58+IAL0EsiKOo2jXXLejGJYqM0Jk4AmHkxSuJU3ECJmfitILETdOSUYDMk4zUOnVhLN-bC7lUuy+NsEKQucsTaOAe1gSYuisHkNA4mABIgA"
          text="Playground"
        />
      </p>
    </>
  );
};

export default HexValidation;
