import React, { FC } from "react";
import Code from "../Shared/Code";

const code1 = `
type HexNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type HexString = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
type StringNumber<T extends number> = \`${"${T}"}\`;
type HEX = HexNumber | StringNumber<HexNumber> | HexString;
`;

const code2 = `
type ToArray<T extends string, Cache extends readonly string[] = []> =
    T extends \`${"${infer A}${infer Rest}"}\`
    ? A extends AllowedItem
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

const HexValidation: FC = () => {
  return (
    <>
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
    </>
  );
};

export default HexValidation;
