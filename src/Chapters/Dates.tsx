import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
const data = {
  '2021-03-01': {
    "date": '1st March',
    "value": 17
  },
  '2021-03-02': {
    "date": '2nd March',
    "value": 19
  },

  '2021-03-09': {
    "date": '9th March',
    "value": 15
  }
}
`;

const code2 = `Record<string, { date: string, value: number }>`;

const code3 = `
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
`;

const code4 = `
 type Range = Enumerate<13>
`;

const code5 = `
 type Month = Exclude<Enumerate<13>, 0>
`;

const code6 = `
type NumberString<T extends number> = \`${"${T}"}\`;
`;

const code7 = `
type Year =
    \`${"${NumberString<number>}${NumberString<number>}${NumberString<number>}${NumberString<number>}"}\`;
`;

const code8 = `
type ZeroRequired = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
`;

const code9 = `
type AddZero<T extends number> = T extends ZeroRequired ? \`${"${0}${T}"}\` : T;
`;

const code10 = `
type Month = AddZero<Exclude<Enumerate<13>, 0>>;
`;

const code11 = `
type MakeString<T extends number | \`${"${number}`> = `${T}"}\`;
`;

const code12 = `
type Month = MakeString<AddZero<Exclude<Enumerate<13>, 0>>>;
`;

const code13 = `
type Day = MakeString<AddZero<Exclude<Enumerate<32>, 0>>>;
`;

const code14 = `
type DataKey = \`${"${Year}-${Month}-${Day}"}\`;
`;

const code15 = `
type MapMonth<T extends NumberString<number>> =
    T extends '01'
    ? 'January' : T extends '02'
    ? 'February' : T extends '03'
    ? 'March' : T extends '04'
    ? 'April' : T extends '05'
    ? 'May' : T extends '06'
    ? 'June' : T extends '07'
    ? 'July' : T extends '08'
    ? 'August' : T extends '09'
    ? 'September' : T extends '10'
    ? 'October' : T extends '11'
    ? 'November' : T extends '12'
    ? 'December' : never
`;

const code16 = `
type GetDay<T extends DataKey> =
    T extends \`${"${string}-${Month}-${infer D}` ? D : `${number}"}\`;

type GetMonth<T extends DataKey> =
    T extends \`${"${string}-${infer M}-${Day}` ? M : `${ number }"}\`;
`;

const code17 = `
type ConvertToMonth<T extends DataKey> = MapMonth<GetMonth<T>>;
type Result = ConvertToMonth<'2021-03-01'> // March
`;

const code18 = `
type AddSt<T extends NumberString<number>> = \`${"${T}st"}\`;

type RemoveLeadZero<T extends GetDay<DataKey>> = T extends \`${"0${infer N}"}\` ? N : T

type MakeDate<T extends DataKey> =
    \`${"${AddSt<RemoveLeadZero<GetDay<T>>>} ${ConvertToMonth<T>}"}\`
`;

const code19 = `
type Base = Record<DataKey, { date: MakeDate<DataKey>, value: number }>

type Result = MakeDate<'2021-03-01'> // 1st March
type Result2 = MakeDate<'2021-03-02'> // 2st March
`;

const navigation = {
  problem: {
    id: "problem",
    text: "The problem",
  },
  solution: {
    id: "solution",
    text: "Template literals and Date",
  },
};
const links = Object.values(navigation);

const Dates: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.problem} />
      <p>
        Let's imagine very simple situation. You need an object where keys are
        dates and values are strings strictly binded with key date.
      </p>
      <p>Example:</p>
      <Code code={code1} />
      <p>First solution which came to my mind was to make a simple Record:</p>
      <Code code={code2} />
      <p>
        But, since we have template literals, let's make it more complicated
      </p>
      <Header {...navigation.solution} />
      <p>
        First of all, in order to work with dates, we should generate numbers
        from 1 to 12 and from 1 to 31. I hope you understand my intensions ))
      </p>
      <p>
        This code was honestly stolen from
        <Anchor
          href="https://stackoverflow.com/questions/65573679/how-to-overcome-ts2589-on-enumerate-type-with-dynamic-enumerator-upper-limit-qu"
          text="here"
        />
      </p>
      <Code code={code3} />
      <p>
        If you are interested in really big ranges,
        <Anchor href="https://catchts.com/range-numbers" text="this" /> article
        is for you.
      </p>
      <p>I'm sorry, let's go back to our problem.</p>

      <p>
        Next, we have to create stringified representation of number, because we
        are working with strings.
      </p>
      <Code code={code6} />
      <p>Now, we are ready to create our type representation of year</p>
      <Code code={code7} />
      <p>Let's create allowed numbers for months.</p>
      <Code code={code4} />
      <p>Now, we should get rid of zero</p>
      <Code code={code5} />
      <p>
        We all know, that according to standard, we should use zero lead
        representation for dates.
      </p>
      <p>
        For example, we should use <Var>02</Var> for February instead of
        <Var>2</Var>
      </p>
      <p>
        First of all, we should define all numbers where we should add leading
        zero
      </p>
      <Code code={code8} />
      <p>Now, we can add zero to all one digit numbers</p>
      <Code code={code9} />
      <p>Let's try what we have.</p>
      <Code code={code10} />
      <p>Now we have a mix of numbers and string</p>
      <p>We are interested only in stringified numbers</p>
      <Code code={code11} />
      <p>Omg, finally we can make our Month type representation</p>
      <Code code={code12} />
      <p>Now, it is easy to make Day type</p>
      <Code code={code13} />
      <p>Our object key type:</p>
      <Code code={code14} />
      <p>
        Since we already have types for our keys, we should somehow map, for
        example 01-01-2020 to January 1st
      </p>
      <Code code={code15} />
      <p>
        Now, we we should be able to obtain actual month and day from the key
      </p>
      <Code code={code16} />
      <p>
        Now we should actually convert two digits month to month string
        representation
      </p>
      <Code code={code17} />
      <p>
        Do you remember, that we should convert <Var>2021-03-01</Var> to
        <Var>1st March</Var> ?
      </p>
      <Code code={code18} />
      <p>This is how our type should be represented</p>
      <Code code={code19} />
      <p>
        There is a drawback, 2st March. I leave making appropriate endings to
        you :)
      </p>
    </>
  );
};

export default Dates;

// {
//   // https://twitter.com/OliverJAsh/status/1369672585378750465
//   type Params = {
//     onChange(event: { foo: number }): void;
//     // onChange: (event: { foo: number }) => void;
//   };

//   declare const fn: (params: Params) => void;

//   declare const onChange: (event: { foo: number; bar: number }) => {};

//   // Expected error because `onChange` has wrong parameter type, but got none. ❌
//   fn({ onChange });
// }

// {
//     //https://twitter.com/captainyosarian/status/1368896102855045129
//     import React from 'react'

// type OperationFn = (left: number, right: number) => number

// type Operator = '+' | '-' | '/' | '*'

// function div(left: number, right: 0): never
// function div(left: number, right: number): number
// function div(left: number, right: number): number | never {
//     return (left / right)
// }

// const operations = {
//     '+': (left: number, right: number) => left + right,
//     '-': (left: number, right: number) => left - right,
//     '*': (left: number, right: number) => left * right,
//     '/': div
// } as const;

// type CalculatorProps = Readonly<{
//     left: number
//     operator: keyof typeof operations
//     right: number
// }>

// function calc<T extends '/'>(op: T): typeof div
// function calc<T extends '+'>(op: T): OperationFn
// function calc<T extends '-'>(op: T): OperationFn
// function calc<T extends '*'>(op: T): OperationFn
// function calc<T extends Exclude<Operator, '/'>>(op: T): OperationFn
// function calc<T extends Operator>(op: T) {
//     return operations[op]
// }

// type IsSafe<T extends CalculatorProps> = {
//     left: number,
//     operator: '/'
//     right: 0
// } extends T ? never : T

// function Calculator<T extends CalculatorProps>(props: IsSafe<T>) {
//     const { left, operator, right } = props;
//     const result = calc(operator)(1, 1) // error, we can't use operator without condition statement

//     if (operator !== '/') {
//         const result = calc(operator)(1, 1) // number
//         const result2 = calc(operator)(1, 0) // number

//     }

//     if (operator === '/') {
//         const result = calc(operator)(1, 0) // never
//         const result2 = calc(operator)(1, 1) // number

//     }

//     return (
//         <div>
//             <code>
//                 {left} {operator} {right} = <output>{result}</output>
//             </code>
//         </div>
//     )
// }

// const examples = (

// )

// const Foo = (props: { right: number }) => {
//     return (
//         <>
//             <Calculator left={1} operator="+" right={2} />
//             <Calculator left={1} operator="-" right={2} />
//             <Calculator left={1} operator="*" right={2} />
//             <Calculator left={1} operator="/" right={props.right} /> // error, not sure if zero or not
//             <Calculator left={1} operator="/" right={0} /> // error
//         </>
//     )
// }

// }
