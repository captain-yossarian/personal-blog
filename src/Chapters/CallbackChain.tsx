import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout, Var } from "../Shared/Layout";
import Links, { Link } from "../Shared/Links";

const links = [
  "https://stackoverflow.com/questions/65540887/typescript-type-can-not-be-inferred-if-function-parameter-is-used/65543597#65543597",
  "https://en.wikipedia.org/wiki/Type_system#:~:text=In%20programming%20languages%2C%20a%20type,%2C%20expressions%2C%20functions%20or%20modules.",
  "https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)",
  "https://basarat.gitbook.io/typescript/type-system/type-compatibility",
  "https://stackoverflow.com/questions/65550146/how-typescript-infers-callbacks-arguments-type",
];

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
  <Layout title="Type safe callbacks">
    <Links links={links} />
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
      <Link
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
  </Layout>
);

export default CallbackChain;
