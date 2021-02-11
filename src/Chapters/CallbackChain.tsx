import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
function withWorld<Context extends {}>(context: Context) {
  return { ...context, hello: 'world' }
}

function withSomething<Context extends {}>(context: Context) {
  return { ...context, something: 'else' }
}

test([withWorld, withSomething], (_context) => {})
`;

const code2 = `
type Fn = (...args: any[]) => any
type MapObject<T extends Fn> = ReturnType<T>
type Elem = Fn

type Mapper<
  Arr extends ReadonlyArray<Elem>,
  Result extends Record<string, any> = {}
  > = Arr extends []
  ? Result
  : Arr extends [infer H]
  ? H extends Elem
  ? Result & MapObject<H>
  : never
  : Arr extends readonly [infer H, ...infer Tail]
  ? Tail extends ReadonlyArray<Elem>
  ? H extends Elem
  ? Mapper<Tail, Result & MapObject<H>>
  : never
  : never
  : never


type Foo = { foo: 'foo' }
type Bar = { bar: 'bar' }
type Baz = { baz: 'baz' }

// Foo & Bar & Baz
type Result = Mapper<[(arg: number) => Foo, (arg: Foo) => Bar, (arg: Bar) => Baz]> 

export interface TestFunction<Ctx> {
  <A>(
    conditions: [(context: Ctx) => A],
    body: (context: A) => any
  ): any

  <A, B, C extends ReadonlyArray<any>>(
    conditions: C,
    body: (context: Mapper<C, Ctx>) => void
  ): any
}

const test: TestFunction<{ hello: 'world' }> = () => void 0

function withWorld<Context extends { hello: 'world' }>(context: Context) {
  return { ...context, world: 'hello' }
}

function withSomething<Context extends {}>(context: Context) {
  return { ...context, something: 'else' }
}

function withSomethingElse<Context extends {}>(context: Context) {
  return { ...context, somethingElse: 'smth else' }
}

test([withSomething], (_context) => void 0)
test([withWorld], (_context) => void 0)
test([withWorld, withSomething, withSomethingElse] as const, (_context) => void 0)
`;

const code3 = `
type Fn = (...args: any[]) => any

// credits goes https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export interface TestFunction<Ctx> {
  <A>(
    conditions: [(context: Ctx) => A],
    body: (context: A) => any
  ): any

  <C extends Array<Fn>>(
    conditions: C,
    body: (context: UnionToIntersection<ReturnType<C[number]>>) => void
  ): any
}

const test: TestFunction<{ hello: 'world' }> = () => void 0


function withWorld<Context extends { hello: 'world' }>(context: Context) {
  return { ...context, world: 'hello' }
}

function withSomething<Context extends {}>(context: Context) {
  return { ...context, something: 'else' }
}

function withSomethingElse<Context extends {}>(context: Context) {
  return { ...context, somethingElse: 'smth else' }
}

test([withSomething], (_context) => void 0)
test([withWorld], (_context) => void 0)
test([withWorld, withSomething, withSomethingElse], (_context) => void 0)
`;

const navigation = {
  long_way: {
    id: "long_way",
    text: "Long and complicated way",
  },
  short_way: {
    id: "short_way",
    text: "Short way",
  },
};
const links = Object.values(navigation);

const CallbackChain: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <p>
        Let's say you have a function which accepts function chain where each
        function transforms results from the previous one
      </p>
      <Code code={code1} />
      <p>
        Our goal is to type <Var>_context</Var> argument so it will be the
        intersection of chain return types.
      </p>
      <p>
        In above case, it should be:
        <Var>{'Context & {hello: "world"; something: "else"; }'}</Var>
      </p>
      <Header {...navigation.long_way} />

      <p>
        Here you have non flexible (accepts only immutable array) and too
        complicated solution:
      </p>
      <Code code={code2} />

      <Header {...navigation.short_way} />
      <p>What if I say you that there is a much simplier solution ?</p>
      <Code code={code3} />
    </>
  );
};

export default CallbackChain;
