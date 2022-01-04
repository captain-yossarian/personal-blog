import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
const removeProperty = <Obj, Prop extends keyof Obj>(obj: Obj, prop: Prop) => {
  const { [prop]: _, ...rest } = obj;
  return rest
}
`;

const code2 = `
const hasProperty = <Obj, Prop extends string>(obj: Obj, prop: Prop)
  : obj is Obj & Record<Prop, unknown> =>
  Object.prototype.hasOwnProperty.call(obj, prop);
`;

const code2_1 = `
type Tag = { [prop: \`${"tag${number}"}\`]: never }

interface Object {
  hasOwnProperty(v: PropertyKey): boolean & Tag
}

interface CallableFunction extends Function {
  call<
    T,
    Prop extends string,
    R extends boolean & Tag
  >(this: (this: T, property: Prop) => R, thisArg: T, property: Prop): thisArg is T & Record<Prop, string>;
}

declare const obj: { name?: string, surname?: number }

if (Object.prototype.hasOwnProperty.call(obj, 'name')) {
  const test = obj.name // string
}

if (Object.prototype.propertyIsEnumerable.call(obj, 'name')) {
  const test = obj.name // string | undefined
}

`;

const code3 = `
const obj = {
  age: 0,
  name: ''
}

if (obj.age === 0) {
  obj.age = 42
}

if(obj.name===''){
  obj.name = 'John'
}
`;

const code4 = `
const handleAge = (obj: Obj, age: Obj['age']) => 
  obj.age === 0 ? { ...obj, age } : obj;
  
const handleName = (obj: Obj, name: Obj['name']) => 
  obj.name === '' ? { ...obj, name } : obj;

const result = handleAge(handleName(obj,'John'), 42);
`;

const code5 = `
const handleAge = (age: Obj['age']) => (obj: Obj) =>
  obj.age === 0 ? { ...obj, age } : obj;

const handleName = (name: Obj['name']) => (obj: Obj) =>
  obj.name === '' ? { ...obj, name } : obj;

const compose = <T,>(...fns: Array<(a: T) => T>) =>
  (obj: T) => fns.reduceRight((acc, fn) => fn(acc), obj);

const builder = compose(handleAge(42), handleName('John'));

const result = builder(obj) // Obj
`;

const code6 = `
const result  =
        obj
        |> handleAge(42)
        |> handleName('John')
`;

const code7 = `
const switcher = (arg: Obj) => {
  if (arg.name === 'John') {
    arg.items.push('Hello John')
  }
  if (arg.name === 'Bruce') {
    arg.items.push('Hi Batman!')
  }
  if (arg.name === 'Peter') {
    arg.items.push('Are U a Spiderman?')
  }

  return arg
}
`;

const code8 = `
const enum SomeEvent {
  click = 'click',
  dbclick = 'dbclick',
  mousedown = 'mousedown ',
  mouseover = 'mouseover',
  mouseenter = 'mouseenter'

}

const handleEvents = (ev: SomeEvent) => {
  if (ev === SomeEvent.click || ev === SomeEvent.dbclick) {
    console.log('Mouse clicked')
  }

  if (ev === SomeEvent.mouseenter || ev === SomeEvent.mouseover) {
    console.log('Mouse hover')
  }
}

const isOneOf = <T extends string, M extends string>(ev: T, ...matchers: M[]) =>
  ev.match(new RegExp(matchers.join('|'), 'gi'))


const isOneOfWithoutIteration = <T extends string>(ev: T, matchers: string) =>
  ev.match(new RegExp(matchers, 'gi'))


const handleEvents2 = (ev: SomeEvent) => {

  if (isOneOf(ev, SomeEvent.click, SomeEvent.dbclick)) {
    console.log('Mouse clicked')
  }
  const union =\`${"${SomeEvent.mouseenter}|${SomeEvent.mouseover}"}\`
  
  if (isOneOfWithoutIteration(ev, union)) {
    console.log('Mouse hover')
  }
}
`;

const code9 = `
type Fn = (a: any) => any

type Head<T extends any[]> =
    T extends [infer H, ...infer _]
    ? H
    : never;

type Last<T extends any[]> =
    T extends [infer _]
    ? never : T extends [...infer _, infer Tl]
    ? Tl
    : never;

type Foo = typeof foo
type Bar = typeof bar
type Baz = typeof baz
`;

const code10 = `
    interface LodashFlowRight {
        <A extends any[], R1, R2, R3, R4, R5, R6, R7>(f7: (a: R6) => R7, f6: (a: R5) => R6, f5: (a: R4) => R5, f4: (a: R3) => R4, f3: (a: R2) => R3, f2: (a: R1) => R2, f1: (...args: A) => R1): (...args: A) => R7;
        <A extends any[], R1, R2, R3, R4, R5, R6>(f6: (a: R5) => R6, f5: (a: R4) => R5, f4: (a: R3) => R4, f3: (a: R2) => R3, f2: (a: R1) => R2, f1: (...args: A) => R1): (...args: A) => R6;
        <A extends any[], R1, R2, R3, R4, R5>(f5: (a: R4) => R5, f4: (a: R3) => R4, f3: (a: R2) => R3, f2: (a: R1) => R2, f1: (...args: A) => R1): (...args: A) => R5;
        <A extends any[], R1, R2, R3, R4>(f4: (a: R3) => R4, f3: (a: R2) => R3, f2: (a: R1) => R2, f1: (...args: A) => R1): (...args: A) => R4;
        <A extends any[], R1, R2, R3>(f3: (a: R2) => R3, f2: (a: R1) => R2, f1: (...args: A) => R1): (...args: A) => R3;
        <A extends any[], R1, R2>(f2: (a: R1) => R2, f1: (...args: A) => R1): (...args: A) => R2;
        (...func: Array<lodash.Many<(...args: any[]) => any>>): (...args: any[]) => any;
    }
`;

const code11 = `
type Allowed<
    T extends Fn[],
    Cache extends Fn[] = []
    > =
    T extends []
    ? Cache
    : T extends [infer Lst]
    ? Lst extends Fn
    ? Allowed<[], [...Cache, Lst]> : never
    : T extends [infer Fst, ...infer Lst]
    ? Fst extends Fn
    ? Lst extends Fn[]
    ? Head<Lst> extends Fn
    ? Head<Parameters<Fst>> extends ReturnType<Head<Lst>>
    ? Allowed<Lst, [...Cache, Fst]>
    : never
    : never
    : never
    : never
    : never;
`;
const code12 = `
type LastParameterOf<T extends Fn[]> =
    Last<T> extends Fn
    ? Head<Parameters<Last<T>>>
    : never

type Return<T extends Fn[]> =
    Head<T> extends Fn
    ? ReturnType<Head<T>>
    : never

`;

const code13 = `
function compose<T extends Fn, Fns extends T[], Allow extends {
    0: [never],
    1: [LastParameterOf<Fns>]
}[Allowed<Fns> extends never ? 0 : 1]>
    (...args: [...Fns]): (...data: Allow) => Return<Fns>

function compose<
    T extends Fn,
    Fns extends T[], Allow extends unknown[]
>(...args: [...Fns]) {
    return (...data: Allow) =>
        args.reduceRight((acc, elem) => elem(acc), data)
}
`;

const code14 = `

type Foo = typeof foo
type Bar = typeof bar
type Baz = typeof baz


type Fn = (a: any) => any

type Head<T extends any[]> =
    T extends [infer H, ...infer _]
    ? H
    : never;

type Last<T extends any[]> =
    T extends [infer _]
    ? never : T extends [...infer _, infer Tl]
    ? Tl
    : never;


type Allowed<
    T extends Fn[],
    Cache extends Fn[] = []
    > =
    T extends []
    ? Cache
    : T extends [infer Lst]
    ? Lst extends Fn
    ? Allowed<[], [...Cache, Lst]> : never
    : T extends [infer Fst, ...infer Lst]
    ? Fst extends Fn
    ? Lst extends Fn[]
    ? Head<Lst> extends Fn
    ? Head<Parameters<Fst>> extends ReturnType<Head<Lst>>
    ? Allowed<Lst, [...Cache, Fst]>
    : never
    : never
    : never
    : never
    : never;

type LastParameterOf<T extends Fn[]> =
    Last<T> extends Fn
    ? Head<Parameters<Last<T>>>
    : never

type Return<T extends Fn[]> =
    Head<T> extends Fn
    ? ReturnType<Head<T>>
    : never


function compose<T extends Fn, Fns extends T[], Allow extends {
    0: [never],
    1: [LastParameterOf<Fns>]
}[Allowed<Fns> extends never ? 0 : 1]>
    (...args: [...Fns]): (...data: Allow) => Return<Fns>

function compose<
    T extends Fn,
    Fns extends T[], Allow extends unknown[]
>(...args: [...Fns]) {
    return (...data: Allow) =>
        args.reduceRight((acc, elem) => elem(acc), data)
}

const foo = (arg: 1 | 2) => [1, 2, 3]
const bar = (arg: string) => arg.length > 10 ? 1 : 2
const baz = (arg: number[]) => 'hello'

const check = compose(foo, bar, baz)([1, 2, 3]) // [number]
const check2 = compose(bar, foo)(1) // expected error
`;

const code15 = `
type Foo = typeof foo
type Bar = typeof bar
type Baz = typeof baz

type Fn = (a: any) => any

type Head<T extends any[]> = T extends [infer H, ...infer _] ? H : never

type Last<T extends any[]> = T extends [infer _]
  ? never
  : T extends [...infer _, infer Tl]
  ? Tl
  : never

type Allowed<T extends Fn[], Cache extends Fn[] = []> = T extends []
  ? Cache
  : T extends [infer Lst]
  ? Lst extends Fn
    ? Allowed<[], [...Cache, Lst]>
    : never
  : T extends [infer Fst, ...infer Lst]
  ? Fst extends Fn
    ? Lst extends Fn[]
      ? Head<Lst> extends Fn
        ? ReturnType<Fst> extends Head<Parameters<Head<Lst>>>
          ? Allowed<Lst, [...Cache, Fst]>
          : never
        : never
      : never
    : never
  : never

type FirstParameterOf<T extends Fn[]> = Head<T> extends Fn
  ? Head<Parameters<Head<T>>>
  : never

type Return<T extends Fn[]> = Last<T> extends Fn ? ReturnType<Last<T>> : never

function pipe<
  T extends Fn,
  Fns extends T[],
  Allow extends {
    0: [never]
    1: [FirstParameterOf<Fns>]
  }[Allowed<Fns> extends never ? 0 : 1]
>(...args: [...Fns]): (...data: Allow) => Return<Fns>

function pipe<T extends Fn, Fns extends T[], Allow extends unknown[]>(
  ...args: [...Fns]
) {
  return (...data: Allow) => args.reduce((acc, elem) => elem(acc), data)
}

const foo = (arg: string) => [1, 2, 3]
const baz = (arg: number[]) => 42

const bar = (arg: number) => ['str']

const check = pipe(foo, baz, bar)('hello') // string[]
const check3 = pipe(baz, bar)([2]) // string[]
const check2 = pipe(baz, bar)('hello') // expected error
`;

const code16 = `
export {};

declare function foo(a: number): number[];
declare function bar(a: string): number;
declare function baz(a: number[]): string;

type Fn = (a: any) => any;

type Last<T extends any[]> = T extends [...infer _, infer LastElement]
  ? LastElement
  : never;

// Built in Parameters utility type
type CustomParameters<T> = T extends (...args: infer P) => any ? P : never;

// Built in ReturnType utility type
type CustomReturnType<T> = T extends (...args: any) => infer R ? R : any;

type Compose<Fst, Scd, Return> =
  CustomParameters<Fst>[0] extends CustomReturnType<Scd> ? Return : never;

/**
 * Main logic
 */
type Iterate<T extends any[], Cache extends any[] = []> = T extends []
  ? Cache
  : T extends [infer Lst]
  ? Iterate<[], [...Cache, Lst]>
  : T extends [infer Fst, ...infer Lst]
  ? Compose<Fst, Lst[0], Iterate<Lst, [...Cache, Fst]>>
  : never;

type ComposeArgument<Fns extends any[]> = Iterate<Fns> extends never
  ? never
  : CustomParameters<Last<Fns>>[0];

const compose =
  <T extends Fn, Fns extends T[]>(...args: [...Fns]) =>
  (...data: [ComposeArgument<Fns>]): CustomReturnType<Fns[0]> =>
    "UNIMPLEMENTED" as any;

const check = compose(foo, bar, baz)([1, 2, 3]); // [number]
const check2 = compose(bar, foo)(1); // expected error
`;
const navigation = {
  fp_utils: {
    id: "fp_utils",
    text: "Functional programming utils",
  },

  compose: {
    id: "compose",
    text: "Typing compose/pipe function",
  },
  string_unions: {
    id: "string_unions",
    text: "String union types",
  },
};

const links = Object.values(navigation);

const FP: FC = () => (
  <>
    <HeaderNav links={links} />
    <p>This article will be about some common functional programming utils.</p>
    <Header {...navigation.fp_utils} />
    <p>Remove property from object</p>
    <Code code={code1} />
    <p>Check if property exists</p>
    <Code code={code2} />
    <p>
      Also, you can overload <Var>hasOwnProperty.call</Var> in{" "}
      <Anchor
        href="https://stackoverflow.com/questions/68001036/override-types-for-built-in-methods-on-prototype/68136715#68136715"
        text="this"
      />{" "}
      way. Please keep in mind, it works only with TS 4.4
    </p>
    <Code code={code2_1} />
    <p>
      Btw, You might be interested in{" "}
      <Anchor href="https://v8.dev/features/object-has-own" text="this" />{" "}
      feature.
    </p>
    <p>Let's say you have next code:</p>
    <Code code={code3} />
    <p>
      This code is perfectly valid and very fast. But if for some reason You
      want to avoid mutation, You can make your life and life of your colleague
      a bit complicated.
    </p>
    <p>Let's start with small helpers:</p>
    <Code code={code4} />
    <p>It is looks like a bit repetitive, does't it?</p>
    <p>
      Let's add <Var>compose</Var>. In order to make our utils composable, we
      should change it a bit.
    </p>
    <Code code={code5} />
    <p>
      <Anchor
        text="Here"
        href="https://dev.to/ascorbic/creating-a-typed-compose-function-in-typescript-3-351i"
      />
      You can find very good article about typing <Var>compose</Var> function
      and
      <Anchor
        text="here"
        href="https://github.com/microsoft/TypeScript/pull/39094#issuecomment-647042984"
      />
      You can find some thoughts about using and typing compose functions and
      pipe operator.
    </p>
    <p>This is how it would look like with pipe operator:</p>
    <Code code={code6} />
    <Anchor
      href="https://twitter.com/orta/status/1380585284925059072"
      text="Here"
    />
    You can find <Var>orta's</Var> twitt regarding pipe operator in TypeScript.
    <p>
      Now, I'd willing to bet, that You know how to rewrite next function to
      make it more FP style
    </p>
    <Code code={code7} />
    <Header {...navigation.compose} />
    <p>
      Wait, don't you think above <Var>compose</Var> function is poorly typed?
    </p>
    <p>Let's write some crazy, unreadable and unmaintainable typings! :)</p>
    <p>Let's define some base types and utils.</p>
    <Code code={code9} />
    <p>
      Our main goal is to make <Var>compose</Var> without any arguments length
      restriction.
    </p>
    <p>
      For example, take a look on <Var>lodash compose typings</Var>
    </p>
    <Code code={code10} />
    <p>There is a limit for arguments.</p>
    <p>
      Let's try to write function without any limits, at least explicit limits.
      In practice I was able to provide 2 functions more :D. Please keep in mind
      TS has his own recursion limits, so we have to live with that
    </p>
    <p>Validation logic</p>
    <Code code={code11} />
    <p>
      Above type iterates through every function in the array and checks if
      argument of current function is assignable to return type of next function{" "}
      <Var>{"Head<Parameters<Fst>> extends ReturnType<Head<Lst>>"}</Var>
    </p>
    <p>Next, we can define simple helpers</p>
    <Code code={code12} />
    <p>
      Finally, our <Var>compose</Var> function
    </p>
    <p>
      <Anchor text="Here" href="https://catchts.com/validators" /> you can find
      my article about type validation, it will help You to understand how I
      made validation.
    </p>
    <Code code={code13} />
    <p>
      As you might have noticed, I have defined only one overload, this is
      considered a bad practice. We should always define at least two. Sorry for
      that.
    </p>
    <p>Full example</p>
    <Code code={code14} />
    <p>
      <Anchor
        text="Playground"
        href="https://www.typescriptlang.org/play?#code/FAFwngDgpgBAYgewTAvDc0EDMZaaSWAIQEMAnVdQ7GAI3IOhlIC9KMob6XheP4AdpQAUJAFwwSAsAEpUAPknS+hGAAkoJACYAeACowoADxBQBWgM5KwAbQC6ilMBguYB46fNWbASwFYoCjUAGhgAOgi-AIoAfTtnVwB+dQSXCQEoADdAgG4VJgAZEgsQfUMTM0tre0dUt3LPKt9-QJg4uuSM7IoJdwqvGBsIsKjWmNDRij0AG3jXGGSZuvSs3N5GWABBaemEAHcoXTq+xqs4AXtguoBhEgBjAAtYD0qzi7tKezra+ZPXwbmSRgt0eUGW9ReA2a0RgBRKgJcyThIAa-3OHRg212B10l0GwxBT1CyIcMBW3XBfyhk3gJVCwxpJIxcBKqIG6PmSNZkKq5y+nPUml0yMUPLeGI02h0AAVyCQALZQUxkCw6FkgeSi-pVABKSoArmQBHpCDpJcKSpqMVj9ocdMjQkMIoSoKF1Q5wV1Ap7VmQfRT5uTvYGYF6yHkNrDiiBZWQFUrAgB5LBlMWCGqoOpFEr6LWnQQSoUyuWK5Wq7OlPSa+T+72RvUgQ0CVPat4Zpzzc25tm8gQYhtNk3QM1Fqs1kNh9ZYfUCO4gHwIIR3BDyiAICxQFv585ugRWNN6PE2vY9qwAbzqAAYJDYw3YrvMAIw3iux+PK5NqvfyeIAXxsx52ucFh5v8YYLDAl5kjAj4evMwjDOQADmFg3sMwF2DIEgIREWgkCA4iYjs+xyCgigDkaX4gbw06zvOi4wMuq7rpuxynoID6uMB7GHveRHYuxM4ANYCPs7zAPIOFhMhqH4hEGFyBe8xkAaRowFJeEERIx6keO8yuDJYQqVo+p3FAOo+EhDwgMIoh3HcoRQNMUDyrphjOfKdl3DIoSaSQMjAL+vDLnuKJ4MgaCiGQSESI+MAAD4wAATG5NiPqESWhAAzPEIWsvQFCRchEglGQfhIW5yFhM5AhISADwwIoj5QckcUSElwB5Si3AiMVob6vKtCBPYbkAORPMRo3BYurKgncQmUExa4bsI4WhAV60kCwMjCGlGXZZhMAAPRHYMAgDUNZC5TNKJzUJSWLSuy1QMIG24EgO2PnIJ3lNAc6HIYZBkAgfrrGDwBAA"
      />
    </p>
    <p>
      It is possible to use a bit reduced version of <Var>compose</Var>, without
      redundant type checking:
    </p>
    <Code code={code16} />
    <p>
      Since, <Var>pipe</Var> function is very similar to <Var>compose</Var>, we
      need to made only few changes to convert it
    </p>
    <Code code={code15} />
    <Anchor
      text="Here"
      href="https://github.com/drizzer14/fnts/blob/main/src/compose.ts"
    />{" "}
    you can find slightly better implementation of <Var>Compose</Var> utility
    type
    <Header {...navigation.string_unions} />
    <p>
      Let's consider next example. It is not strictly related to TS but I
      believe it will be helpful for you.
    </p>
    <p>
      This code is very specific, since it works only with strings, at least in
      our example. Btw, I strongly recommend you to check source code of{" "}
      <Anchor text="drizzer14/fnts" href="https://github.com/drizzer14/fnts" />{" "}
      package.
    </p>
    <p>
      I'm not saying that it is better then several <Var>||</Var>, or better
      then <Var>Array.prototype.includes</Var> or more performant.
    </p>
    <p>You can use it as a typeguard for unions.</p>
    <Code code={code8} />
    <p>
      As You see, RegExp <Var>|</Var> in some way can restrict unions
    </p>
  </>
);
export default FP;
