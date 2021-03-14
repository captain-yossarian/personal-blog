// //https://stackoverflow.com/questions/66563064/how-do-i-typescript-this-object-array/66564065#66564065
// type PrependNextNum<A extends Array<unknown>> = A["length"] extends infer T
//   ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
//     ? X
//     : never
//   : never;

// type EnumerateInternal<A extends Array<unknown>, N extends number> = {
//   0: A;
//   1: EnumerateInternal<PrependNextNum<A>, N>;
// }[N extends A["length"] ? 0 : 1];

// type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[]
//   ? E
//   : never;

// type ZeroRequired = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// type AddZero<T extends number> = T extends ZeroRequired ? `${0}${T}` : T;

// type AddSt<T extends NumberString<number>> = `${T}st`;

// type MakeString<T extends number | string> = `${T}`;

// type Month = MakeString<AddZero<Exclude<Enumerate<13>, 0>>>;

// type Day = MakeString<AddZero<Exclude<Enumerate<32>, 0>>>;

// type Months = "January" | "February" | "March";

// type NumberString<T extends number> = `${T}`;

// type Year = `${NumberString<number>}${NumberString<number>}${NumberString<number>}${NumberString<number>}`;

// type DataKey = `${Year}-${Month}-${Day}`;

// type GetDay<T extends DataKey> = T extends `${string}-${Month}-${infer D}`
//   ? D
//   : `${number}`;

// type GetMonth<T extends DataKey> = T extends `${string}-${infer M}-${Day}`
//   ? M
//   : `${number}`;

// type MapMonth<T extends NumberString<number>> = T extends "01"
//   ? "January"
//   : T extends "02"
//   ? "February"
//   : T extends "03"
//   ? "March"
//   : never;

// type ConvertToMonth<T extends DataKey> = MapMonth<GetMonth<T>>;

// type RemoveLeadZero<T extends GetDay<DataKey>> = T extends `0${infer N}`
//   ? N
//   : T;

// type MakeDate<T extends DataKey> = `${AddSt<
//   RemoveLeadZero<GetDay<T>>
// >} ${ConvertToMonth<T>}`;

// type Base = Record<DataKey, { date: MakeDate<DataKey>; value: number }>;

// const data = {
//   "2021-03-01": {
//     date: "1st March",
//     value: 17,
//   },
//   "2021-03-02": {
//     date: "2st March",
//     value: 19,
//   },
// } as const;

// type Data = typeof data;

// type Values<T> = T[keyof T];

// // should be allowed to proceed
// type Test = Values<
//   keyof Data extends DataKey
//     ? {
//         [P in keyof Data]: P extends DataKey
//           ? Data[P]["date"] extends MakeDate<P>
//             ? true
//             : false
//           : false;
//       }
//     : false
// > extends true
//   ? "allowed"
//   : "disallowed";

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
