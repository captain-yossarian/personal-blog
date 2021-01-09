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

const CallbackChain: FC = () => (
  <>
    <p>Let's say you have next function</p>
    <Code code={code1} />
    <p>
      It is simple. The argument of <Var>b</Var> function should be return value
      of <Var>a</Var>
      function. Let's try if it works:
    </p>
    <Code code={code2} />
    <p>
      But why we have an error here? Honestly - I don't understand it so good to
      be able explain it.
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
  </>
);

export default CallbackChain;
