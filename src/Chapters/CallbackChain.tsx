import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";

const code1 = `
const myFn = <T>(arg: { a: (a_arg: number) => T; b: (b_arg: T) => void }) => {
  // ...
};
`;

const code2 = `
myFn({
  a: (i) => ({ num: 0 }),
  b: (b_arg) => {
    b_arg.num;
  }, // Error
});
`;

const code3 = `
const myFn = <T>(arg: {
  a: (a_arg: number) => T;
  b: <U extends T>(b_arg: U) => void;
}) => {
  // ...
};

myFn({
  a: (a) => ({ num: 0 }),
  b: (b_arg) => {
    b_arg.num;
  }, // Works!
});
`;

const code4 = `
interface Data<T> {
  data: T,
  callback?: (data: T) => void
}

const arr = [
  {
    data: 42,
    callbacK: (arg) => arg + 1 // error
  }
];
`;

const code5 = `
const builder = <T,>(data: T): Data<T> => ({ data: data, callback: (data) => data })
`;

const code6 = `

interface Instruction<T> {
  data: T,
  callback: (data: T) => void
}

const builder = <T,>(data: T): Instruction<T> => ({ data, callback: (data) => data })

const arr = [
  builder({ foo: 'bar' }),
];

arr[0].callback({ foo: 42 }) // error
arr[0].callback({ foo: 'hello' }) // ok

`;

const code7 = `
interface Instruction<T> {
  data: T,
  callback: (data: T) => void
}

const builder = <T,>(data: T): Instruction<T> => ({ data, callback: (data) => data })

const arr = [
  builder({ foo: 'bar' }),
  builder({ bar: 2 }),
];
// error, why we have here an intersection: '{ foo: string; } & { bar: number; }'
arr[0].callback({ foo: 42 }) 
arr[0].callback({ foo: 'hello' }) // error, but WHY ?

`;

const code8 = `
interface Instruction<T> {
    promise: Promise<T>,
    callback?: (data: T) => void
}

type SomeInstruction = <R>(cb: <T>(instruction: Instruction<T>) => R) => R;
const someInstruction = <T,>(i: Instruction<T>): SomeInstruction => cb => cb(i);

const arr: SomeInstruction[] = [
    someInstruction({ promise: Promise.resolve({ foo: 'bar' }), callback: (data) => console.log(data.foo) }),
    someInstruction({ promise: Promise.resolve({ bar: 'foo' }), callback: (data) => console.log(data.bar) })
]

// writing out T for explicitness here
arr.forEach(someInstruction => someInstruction(<T,>(i: Instruction<T>) => {
    i.promise.then(i.callback); // works
}))

// but it is not necessary:
arr.forEach(someInstruction => someInstruction(i => {
    i.promise.then(i.callback); // works
}))

`;
const CallbackChain: FC = (props) => {
  console.log(props);
  return (
    <>
      <p>Let's say you have next function</p>
      <Code code={code1} />
      <p>
        It is simple. The argument of <Var>b</Var> function should be return
        value of <Var>a</Var>
        function. Let's try if it works:
      </p>
      <Code code={code2} />
      <p>
        But why we have an error here? Honestly - I don't understand it so good
        to be able explain it.
      </p>
      <p>
        <Anchor
          href={
            "https://stackoverflow.com/questions/65550146/how-typescript-infers-callbacks-arguments-type"
          }
          text={"Here"}
        />
        you can find why the error occurs
      </p>
      <p>
        To make it work, You should add an extra generic for <Var>b</Var>
        function.
      </p>
      <Code code={code3} />
      <p>Let's got to a bit complicated example</p>
      <p>Consider next data structure:</p>
      <Code code={code4} />
      <p>
        Our goal is to make sure that type of <Var>callback</Var> argument is
        the same as <Var>data</Var> property. So in this case, <Var>arg</Var>
        should be a <Var>number</Var>
      </p>
      <p>
        I have noticed, that many people have a problems with next construction.
      </p>
      <p>The thing is, TS unable to infer that type without helper function.</p>
      <p>Let's add it</p>
      <Code code={code5} />
      <p>Now, we can assume it work</p>
      <Code code={code6} />
      <p>But it still does not</p>
      <Code code={code7} />
      <p>We ended up with strange intersection.</p>
      <p>
        Another interesting example you can find here,
        <Anchor
          href="https://stackoverflow.com/questions/65624892/define-return-type-of-a-function-in-dictionary-based-on-its-parameter-in-typescr"
          text="in comments section of accepted answer"
        />
      </p>
      <p>This is how TS handles callback argument types.</p>
      <p>
        I'm not a fan of repeating things which was already explained of much
        smarter people, so
        <Anchor
          href="https://stackoverflow.com/questions/65129070/defining-an-array-of-differing-generic-types-in-typescript#answer-65129942"
          text="here"
        />
        you you can find an excellent explanation why we have such behaviour and
        how to handle it.
      </p>
      <p>Finally, working code:</p>
      <Code code={code8} />
      <p>
        <Anchor
          href="https://stackoverflow.com/questions/65644828/typescript-dependant-type-inference-with-variadic-tuple-types#answer-65654415"
          text="Here"
        />
        you can find very similar case with my answer.
      </p>
    </>
  );
};

export default CallbackChain;
