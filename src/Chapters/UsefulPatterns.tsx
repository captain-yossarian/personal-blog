import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";

const code1 = `
const PROPS = ['a', 'b', 'c'] as const;

PROPS.includes('d') // error

const includes = (elem: string) =>
    PROPS.includes(elem) // error
`;

const code2 = `
const PROPS = ['a', 'b', 'c'] as const;

const withTuple = <
    List extends string[]
>(list: readonly [...List]) =>
    (prop: string): prop is List[number] =>
        list.includes(prop)

const includes = withTuple(PROPS);

const result = includes('d')

declare let str: string

if (includes(str)) {
    str // "a" | "b" | "c"
}
`;

const code21 = `
type Primitives =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined

type InferPrimitive<T, P> = P extends any ? T extends P ? P : never : never;

type Inference<T> = InferPrimitive<T, Primitives>

{
  type _ = Inference<2 | 's'> // stirng | number
  type __ = Inference<42> //  number
}
`;

const code22 = `
const PROPS = ['a', 'b', 'c'] as const;

const withTuple = <
  List extends Primitives[]
>(list: readonly [...List]) =>
  (prop: Inference<List[number]>):
    prop is Inference<List[number]> & List[number] =>
    list.includes(prop)

const includes = withTuple(PROPS);

includes(2)       // expected error
includes(['str']) // expected error

const result = includes('d') // ok

declare let str: string

if (includes(str)) {
  str // "a" | "b" | "c"
}
`;

const code23 = `
type Primitives =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined

type InferPrimitive<T, P> = P extends any ? T extends P ? P : never : never;

type Inference<T> = InferPrimitive<T, Primitives>

{
  type _ = Inference<2 | 's'> // stirng | number
  type __ = Inference<42> //  number
}

const PROPS = ['a', 'b', 'c'] as const;

const withTuple = <
  List extends Primitives[]
>(list: readonly [...List]) =>
  (prop: Inference<List[number]>):
    prop is Inference<List[number]> & List[number] =>
    list.includes(prop)

const includes = withTuple(PROPS);

includes(2)       // expected error
includes(['str']) // expected error

const result = includes('d') // ok

declare let str: string

if (includes(str)) {
  str // "a" | "b" | "c"
}
`;

const code3 = `
type ThingProps<T, R> = {
    something: T;
    callback: (arg: T) => R;
    children: (result: R) => void
};

const fn = <T, R>(props: ThingProps<T, R>) => props

const result = fn({
    something: 1,
    callback: (arg) => arg.toString(),
    children: (result /** unknown */) => { }
})
`;

const code4 = `
type ThingProps<T, R> = {
    something: T;
    callback: (arg: T) => R;
};

const fn = <T, R>(props: ThingProps<T, R>) =>
    (children: (result: R) => void) =>
        ({ ...props, children })

const withChildren = fn({
    something: 1,
    callback: (arg) => arg.toString()
})

const result = withChildren((result /** string */) => { })
`;

const code5 = `
const list = [
  {
    property: 'hello',
    handler: (prop: 'hello') => { }
  }
]
`;

const code6 = `
const fn = <
  Property extends string,
  Item extends { property: Property, handler: (prop: Property) => void },
  Tuple extends Item[],
  >(tuple: [...Tuple]) => tuple

fn([{
  property: 'hello',
  handler: (prop /** string */) => { }
}])
`;

const code7 = `
type Item<P> = {
  property: P, handler(prop: P): void
}

const fn = <
  Property extends string,
  >(tuple: Item<Property>[]) => tuple

fn([
  {
    property: 'hello',
    handler: (prop /** "hello" | "bye" */) => { }
  },
  {
    property: 'bye',
    handler: (prop /** "hello" | "bye" */) => { }
  }
])
`;

const code8 = `

const builder = <
  Property extends string
>(property: Property) => ({
  property,
  handler: (prop: Property) => { },
})

const list = [
  builder('hello'),
  builder('bye')
]
`;

const code9 = `
interface Routes<Path extends string> {
    path: Path;
    prepare?: (params: PathArgs<Path>) => object;
    routes?: Routes[];
}

const routes: Routes[] = [
  {
    path: "/dashboard/:siteId",
    prepared: (params) => {...},
    routes: [
      { 
        path: "/dashboard/:siteId/widgets/:widgetId",
        prepared: (params) => {...}
      },
      {
        path: "/dashboard/:siteId/friend/:friendId",
        prepared: (params) => {...}
      }
    ]
  }
]
`;

const code10 = `
interface Route<Path extends string> {
  path: Path;
  prepare(params: PathArgs<Path>): void;
}
type PathParams<
  Path extends string
  > = Path extends \`${":${infer Param}/${infer Rest}"}\`
  ? Param | PathParams<Rest>
  : Path extends  \`${":${infer Param}"}\`
  ? Param
  : Path extends \`${":${infer _Prefix}:${infer Rest}"}\`
  ? PathParams<\`${":${Rest}"}\`>
  : never;

type PathArgs<Path extends string> = { [K in PathParams<Path>]: string };

type ValidRoute = \`${"/${string}/:${string}"}\`

const route = <
  Path extends string,
  Routes extends Route<\`${"${Path}/${ValidRoute}"}\`>[]
>(
  path: Path,
  prepare: (param: PathArgs<Path>) => void,
  ...routes: Routes
) => ({
  path,
  prepare,
  routes
})

const routes = <
  Str extends string,
  Elem extends Route<Str>[]
>(...elems: [...Elem]) =>
  elems

const result = [
  route("/dashboard/:siteId", (arg) => { },
    route("/dashboard/:siteId/friend/:friendId", (arg) => { }),
    route("/dashboard/:siteId/widgets/:widgetId", (arg) => { },)
  ),
  route("/menu/:optioId", (arg) => { },
    route("/menu/:optioId/select/:selectId", (arg) => { })
  )
]

const fail = [
  route("/dashboard/:siteId", (arg) => { },
    route("/dashboard/:siteId/friend/:friendId", (arg) => { }),
    route("/dashboard/:siteId/widgets/:widgetId", (arg) => { },),
    // expected error, menu is not a part of dashboard namespace
    route("/menu/:optioId/select/:selectId", (arg) => { })
  ),
]
`;
const navigation = {
  includes: {
    id: "includes",
    text: "Array.prototype.includes",
  },
  curry_inference: {
    id: "curry_inference",
    text: "Inference with curry",
  },
  builder: {
    id: "builder",
    text: "Builder utility",
  },
  insights: {
    id: "insights",
    text: "TypeScript insights",
  },
} as const;
const links = Object.values(navigation);

const UsefulPatterns: FC = () => (
  <>
    <HeaderNav links={links} />
    <Header {...navigation.includes} />
    <p>
      If you are working with typescript, sooner or later you will encounter an
      issue with <Var>Array.prototype.includes</Var>
    </p>
    <Code code={code1} />
    <p>
      I don't want to dig into type theory problem of this issue. I just will
      provide you with curried solution.
    </p>
    <Code code={code2} />
    <p>
      However, it is still not cool. Our function works only with{" "}
      <Var>strings</Var>. What if we have a list of numbers or other primitives
      ?
    </p>
    <p>
      First of all, we need to create utility type which will be able to convert
      literal type to to more wider type. I mean, it should convert literal type
      of <Var>42</Var> to <Var>number</Var>{" "}
    </p>
    <Code code={code21} />
    <p>Now we can use our type with curried function</p>
    <Code code={code22} />
    <p>And whole code with playground:</p>
    <Code code={code23} />
    <p>
      <Anchor text="Playground" href="https://tsplay.dev/Wybzbw" />
    </p>

    <Header {...navigation.curry_inference} />
    <p>
      A lot of type problems can be solved with curry. For instance, you can
      check{" "}
      <Anchor
        text="this reddit thread"
        href="https://www.reddit.com/r/typescript/comments/sksclo/why_does_typescript_not_make_the_same_inferences/hvpg13u/?context=3"
      />
    </p>
    <Code code={code3} />
    <p>
      TypeScript have a hard time to infer both <Var>T</Var> and <Var>R</Var>{" "}
      generics. In order to do that, we can curry <Var>fn</Var> function.
    </p>
    <Code code={code4} />
    <p>
      No unreadable types and other TS magic. Everything is readable and clear.
    </p>
    <Header {...navigation.builder} />
    <p>
      It is common pattern to define an array of objects with some property and
      handler which expects a literal type of this property. Please see an
      example:
    </p>
    <Code code={code5} />
    <p>
      Usually you need an extra function in order to infer the type of{" "}
      <Var>handler</Var> argument
    </p>
    <Code code={code6} />
    <p>
      As you might have noticed, <Var>prop</Var> argument is a <Var>string</Var>{" "}
      and not literal <Var>"hello"</Var> as we might expect.
    </p>
    <p>Let's try another approach</p>
    <Code code={code7} />
    <p>
      Still not good. The best approach here is to create helper function,
      builder.
    </p>
    <Code code={code8} />
    <p>
      Above example is trivial and very useful. Imagine situation where you have
      to do some type computation with <Var>handler</Var> argument type.{" "}
      <Anchor
        text="This example"
        href="https://stackoverflow.com/questions/70885329/generic-constraint-between-two-properties-of-an-object"
      />{" "}
      is very good. OP wants to validate route parameters. Each object have
      optional <Var>routes</Var> which makes things a bit complicated. Because
      we should validate whether nested routes contains same namespace
    </p>
    <Code code={code9} />
    <p>
      I have added <Var>route</Var> dummy function only for the sake of
      narrowing.
    </p>
    <Code code={code10} />
    <p>
      <Anchor text="Playground" href="https://tsplay.dev/Nabp2m" />{" "}
    </p>
    <Header {...navigation.insights} />
    <p>
      Please see{" "}
      <Anchor
        text="Instantiation expressions PR"
        href="https://github.com/microsoft/TypeScript/pull/47607"
      />
      .
    </p>
  </>
);
export default UsefulPatterns;
