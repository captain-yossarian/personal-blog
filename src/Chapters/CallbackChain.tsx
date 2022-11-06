import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";

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

// credits goes to https://stackoverflow.com/a/50375286
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

const code4 = `
enum HeroSex {
   male,
   female,
   unknown,
}

interface Hero {
   name: string;
   age: number;
   sex: HeroSex;
}

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
   k: infer I
) => void
   ? I
   : never;

type UnionToOvlds<U> = UnionToIntersection<
   U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
   ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
   : [T, ...A];


type MapPredicate<T> = T extends keyof Hero ? [T, (arg: Hero[T]) => any] : never

type Mapped<
   Arr extends Array<unknown>,
   Result extends Array<unknown> = []
   > = Arr extends []
   ? []
   : Arr extends [infer H]
   ? [...Result, MapPredicate<H>]
   : Arr extends [infer Head, ...infer Tail]
   ? Mapped<[...Tail], [...Result, MapPredicate<Head>]>
   : Readonly<Result>;
;


type Data<T> = Mapped<UnionToArray<keyof T>>

const makeData = <T,>(Obj: T, readers: Data<T>) => { };

const hero: Hero = {
   name: "batman",
   age: 38,
   sex: HeroSex.male,
};

const result1 = makeData(hero, [
   ['name', (arg: string) => null],
   ['age', (arg: number) => null],
   ['sex', (arg: HeroSex) => null]
])

const result2 = makeData(hero, [
   ['name', (arg: number) => null], // error
   ['age', (arg: number) => null],
   ['sex', (arg: HeroSex) => null]
])
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
  cb_in_tuple: {
    id: "cb_in_tuple",
    text: "Callback in tuple",
  },
};
const links = Object.values(navigation);

const CallbackChain: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <p>
        Let's say you have a function that accepts function chain where each
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
      <p>What if I say you that there is a much simpler solution ?</p>
      <Code code={code3} />
      <Header {...navigation.cb_in_tuple} />
      <p>
        <Anchor
          href="https://stackoverflow.com/questions/66075326/define-an-array-with-infered-types-related-to-first-prop-in-the-array"
          text="This"
        />
        the question might be interesting for you if you have a callback in tuples.
      </p>
      <Code code={code4} />
    </>
  );
};

export default CallbackChain;
