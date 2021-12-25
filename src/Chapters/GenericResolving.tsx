import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Link } from "react-router-dom";
import { Header, HeaderNav } from "../Shared/ArticleBase";

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

const code8 = `
interface BasicProps<T> {
  input: T;
}

interface TransformProps<T, O> {
  transform: (input: T) => O;
  render: <U extends O>(input: U) => any; // added extra generic U
}

type TProps<T, O> = BasicProps<T> & TransformProps<T, O>;

function test<T, O>(props: TProps<T, O>) {
  return props.render(props.transform(props.input));
}

const testData = {
  nested: {
    test: 1,
    best: true
  }
};

const testResult = test({
  input: testData,
  transform: input => input.nested,
  render: input => input.test // Error
});
`;

const code9 = `
const testResult = test({
  input: testData,
  transform: input => input.nested,
  render: input => {
    input.test // ok
  }
});
`;

const code10 = `
const hof = (callback, data) => (model) => callback({ ...data, ...model });
`;

const code11 = `
const factory = <
    Callback extends (arg: any) => void,
    Arg extends Parameters<Callback>[0],
    KnownProps extends Partial<Arg>,
    >(callback: Callback, knownProps: KnownProps) => (...[newProps]: any) =>
        callback({ ...knownProps, ...newProps });
`;

const code12 = `
interface GreeterData {
    greetings: string;
    userName: string;
}

const factory = <
    Callback extends (arg: any) => void,
    Arg extends Parameters<Callback>[0],
    KnownProps extends Partial<Arg>,
    >(callback: Callback, knownProps: KnownProps) =>
    (newProps: Omit<Arg, keyof KnownProps>) =>
        callback({ ...knownProps, ...newProps });

const greeter = (greeterData: GreeterData) => string;
const greet1 = factory(greeter, { greetings: "hello" });

greet1({ userName: 'a' })
greet1({ userName: 'a', greetings: 'a' }) // expected error
`;

const navigation = {
  context_sensitive: {
    id: "context_sensitive",
    text: "Context sensitive functions",
  },
  typing_curried_callbacks: {
    id: "typing_curried_callbacks",
    text: "Typing curried factories",
  },
};
const links = Object.values(navigation);

const GenericResolving: FC = () => (
  <>
    <HeaderNav links={links} />
    <p>
      In this article you will find some useful examples of typing factory
      functions which requires you to use several generics with constraints
    </p>
    <Header {...navigation.context_sensitive} />

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
      />
      answers.
    </p>
    <p>
      Btw,
      <Anchor
        text="here"
        href="https://stackoverflow.com/questions/70461273/typescript-use-result-of-one-interface-generic-method-as-input-for-another-int"
      />{" "}
      you can find interesting use case. Code example from the question can be
      rewritten as follow:
    </p>
    <Code code={code8} />
    <p>
      The error still exists. TS i unable to figure out the type of render
      argument <Var>input</Var>. Once you rewrite <Var>render</Var> function to
      make it <Var>void</Var> - TS is able to infer <Var>input</Var> argument.
      This is strange. I'm unable to explain it.
    </p>
    <Code code={code9} />
    <Header {...navigation.typing_curried_callbacks} />
    <p>
      Imagine that we have simple high order function that accepts another
      function and some object and returns another function:
    </p>
    <Code code={code10} />
    <p>
      The main requirements here is that we need exclude from <Var>model</Var>{" "}
      properties that already present in <Var>data</Var>.
    </p>
    <p>
      Let's type it step by step. Our <Var>callback</Var> argument can be any
      one argument function, so we can use simple restriction:
      <Var>{`(arg: any) => void`}</Var>. The second argument <Var>data</Var>
      can be a <Var>Partial</Var> of <Var>callback</Var> argument. I mean
      {`Parameters<Callback>[0]`}. Let's implement it.
    </p>
    <Code code={code11} />
    <p>Now we can type our second part.</p>
    <Code code={code12} />
    <p>
      The argument of inner function meets our main requirement. However, this
      example has few extra requirements. If you are curious, you can find full
      code
      <Anchor
        text="in the answer"
        href="https://stackoverflow.com/questions/70154354/higher-order-function-how-to-deduct-injected-type-from-model-without-casting#answer-70282196"
      />{" "}
      provided by
      <Anchor
        text="Dima Parzhitsky"
        href="https://stackoverflow.com/users/4554883/dima-parzhitsky"
      />
      .
    </p>
    <p>
      Btw, he is an author of famous answer about{" "}
      <Anchor
        href="https://stackoverflow.com/questions/51631786/how-to-use-project-references-in-typescript-3-0"
        text="using project references in TypeScript 3.0"
      />
    </p>
    <p>
      P.S.{" "}
      <Anchor
        href="https://stackoverflow.com/questions/70152059/how-to-type-tuple-array-with-corresponding-types"
        text="Here"
      />{" "}
      you can find an interesting example of typing <Var>Map</Var> constraints.
    </p>
  </>
);
export default GenericResolving;
// issue
//https://stackoverflow.com/questions/70461273/typescript-use-result-of-one-interface-generic-method-as-input-for-another-int?noredirect=1#comment124556693_70461273
// https://github.com/microsoft/TypeScript/issues/25092#issuecomment-420068200
// dima https://stackoverflow.com/questions/70154354/higher-order-function-how-to-deduct-injected-type-from-model-without-casting/70282196#comment124330725_70282196
