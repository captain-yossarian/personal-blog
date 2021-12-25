import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Link } from "react-router-dom";

const code1 = `
factory({
  a: function () {
    this.id // string
    const b = this.b(); // Ok
    return "0";
  },
  b: function () {
    const b = this.b(); // Ok
    this.c() // expected error, [c] does not exists
    return 0;
  },
}, function () {
  this.id // string
  const a = this.a() // string
  const b = this.b(); // number
});

`;

const code2 = `
type Base = { id: string }

`;

const code3 = `
const factory = <
  T extends Base,
  Methods extends Record<string, (this: T) => unknown>,
  >(methods: Methods, method: (this: T) => void) => {
  return null as any
}

`;

const code4 = `
factory({
  a: function () {
    const b = this.b(); // error
    return "0";
  },
  b: function () {
    const b = this.b(); // error
    return 0;
  },
}, function () {
  const a = this.a() // error
  const b = this.b(); // error
});
`;

const code5 = `
const factory = <
  T extends Base,
  Methods extends Record<string, (this: T & Methods) => unknown>,
  >(methods: Methods, method: (this: T & Methods) => void) => {
  return null as any
}

factory(
  {
    a: function () { }, // error
  },
  function () { }
);
`;

const code6 = `
factory(
  {
    a: function () { }, // is a context sensitive function
  },
  function () { }
);
`;

const code7 = `
type Base = { id: string }

const factory = <
  T extends Base,
  Methods extends Record<string, <Self extends Methods>(this: T & Self) => unknown>,
  >(methods: Methods, method: (this: T & Methods) => void) => {
  return null as any
}

factory({
  a: function () {
    const b = this.b(); // Ok
    return "0";
  },
  b: function () {
    const b = this.b(); // Ok
    return 0;
  },
}, function () {
  const a = this.a() // string
  const b = this.b(); // number
});

`;
const GenericResolving: FC = () => (
  <>
    <p>
      Sometimes it is hard to get around with typescript generics. Especially
      when we want to apply some sort of type validation.
    </p>
    <p>
      First thing that we should keep in mind, is that they are resolved from
      left to right.
    </p>
    <p>
      Let's imagine a case where we need to implement a factory functions.
      Function should expect two arguments. First one <Var>methods</Var> expects
      a dictionary where <Var>key</Var> is a method name and <Var>value</Var> is
      a method which have an access to this. If user provides two{" "}
      <Var>key/value</Var> pairs as a first argument, <Var>this</Var> of each
      method should be aware about the other one.
    </p>
    <Code code={code1} />
    <p>
      As you might have noticed, second argument <Var>method</Var> should be
      just a function which can access any of these methods. Also, there should
      be shared property <Var>id</Var>
    </p>
    <p>
      Since we have all our requirements, we can try to type it. Because
      property <Var>id</Var> should be accessible from any argument, we can
      create base type.
    </p>
    <Code code={code2} />
    <p>
      Now, when we know that <Var>this</Var> of each method should implement
      <Var>Base</Var> type it is easy to type a prototype of a<Var>factory</Var>{" "}
      function
    </p>
    <Code code={code3} />
    <p>
      We still unable to access <Var>this.a</Var> and <Var>this.b</Var>
    </p>
    <Code code={code4} />
    <p>
      Let's brainstorm <Var>Methods</Var> generic. Each methods <Var>this</Var>
      should be aware of each method. It means that <Var>this</Var> should be an
      intersection of <Var>Base</Var> type and <Var>Methods</Var> itself
    </p>
    <Code code={code5} />
    <p>
      But, it does not work in a way we expect.
      <Var> The 'this' types of each signature are incompatible.</Var> This is
      not trivial.
    </p>
    <Code code={code6} />
    <p>
      Function <Var>a</Var> is
      <Anchor
        href="https://github.com/microsoft/TypeScript/issues/25092#issuecomment-420068200"
        text=" context-sensitive"
      />
      . In order to better understand this type of problem, please see
      <Anchor
        text="this"
        href="https://stackoverflow.com/questions/65550146/how-typescript-infers-callbacks-arguments-type"
      />{" "}
      answer of{" "}
      <Anchor
        text="A_blop"
        href="https://stackoverflow.com/users/14725934/a-blop"
      />{" "}
      user.
    </p>
    <p>
      <Anchor href="https://catchts.com/callbacks#infer_argument" text="Here" />{" "}
      you can find related article
    </p>
    <p>
      As you might have guessed, in order to fix it we need to provide extra
      generic <Var>Self</Var>
    </p>
    <Code code={code7} />
    <p>
      If you are interested in runtime implementation of <Var>factory</Var>
      function and other problems/issues you may face please see
      <Anchor
        text="this"
        href="https://stackoverflow.com/questions/70360843/typescript-factory-with-custom-methods-2nd-step"
      />
      and
      <Anchor
        text="this"
        href="https://stackoverflow.com/questions/70453358/typescript-factory-with-custom-methods-3rd-step"
      />{" "}
      answers.
    </p>
  </>
);
export default GenericResolving;
// issue
//https://stackoverflow.com/questions/70461273/typescript-use-result-of-one-interface-generic-method-as-input-for-another-int?noredirect=1#comment124556693_70461273
// https://github.com/microsoft/TypeScript/issues/25092#issuecomment-420068200
// dima https://stackoverflow.com/questions/70154354/higher-order-function-how-to-deduct-injected-type-from-model-without-casting/70282196#comment124330725_70282196