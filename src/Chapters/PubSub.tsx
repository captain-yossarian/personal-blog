import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout, Var } from "../Shared/Layout";
import Links from "../Shared/Links";

const links = [
  "https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286",
];

const code1 = `
const enum Events {
  foo = "foo",
  bar = "bar",
  baz = "baz",
}

/**
 * Single sourse of true
 */
interface EventMap {
  [Events.foo]: { foo: number };
  [Events.bar]: { bar: string };
  [Events.baz]: { baz: string[] };
}

type Values<T> = T[keyof T];

// All credits goes here :
// https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type EmitRecord = {
  [P in keyof EventMap]: (name: P, data: EventMap[P]) => void;
};

type ListenRecord = {
  [P in keyof EventMap]: (
    name: P,
    callback: (arg: EventMap[P]) => void
  ) => void;
};

type MakeOverloadings<T> = UnionToIntersection<Values<T>>;

type Emit = MakeOverloadings<EmitRecord>;
type Listen = MakeOverloadings<ListenRecord>;

const emit: Emit = <T>(name: string, data: T) => {};

emit(Events.bar, { bar: "1" });
emit(Events.baz, { baz: ["1"] });
emit("unimplemented", { foo: 2 }); // expected error

const listen: Listen = (name: string, callback: (arg: any) => void) => {};

listen(Events.baz, (arg /* { baz: string[] } */) => {});
listen(Events.bar, (arg /* { bar: string } */) => {});
`;

const PubSub: FC = () => (
  <Layout>
    <Links links={links} />
    <p>Our main goal - is to make illegal states unrepresentable.</p>
    <p>
      Please see next example. This pattern is your friend if you want to make
      event driven app (sockets, etc...)
    </p>
    <Code code={code1} />

    <p>
      <Var>EventMap</Var> - is our single source of true.
    </p>
    <p>We can use it for typing our listeners and emitters</p>
  </Layout>
);

export default PubSub;
