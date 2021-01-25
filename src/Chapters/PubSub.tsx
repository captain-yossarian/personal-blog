import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Header, HeaderNav } from "../Shared/ArticleBase";

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

const code2 = `
interface ChatEventMap {
  incomingMessage: string;
  newUser: {
    id: number;
    name: string;
  };
}

type EventType = keyof ChatEventMap;
type Payload<T extends EventType> = ChatEventMap[T];

// a bit of love for TypeScript
type Mapped = {
  [P in keyof ChatEventMap]: {
    type: P, data: ChatEventMap[P]
  }
}

function on<T extends EventType>(type: T, callback: (data: Payload<T>) => void) { }

on('newUser', user /** newUser type */ => null);

function onEvent(callback: <T extends EventType>(ev: Mapped[T]) => void) { }

onEvent(ev => {
  if (ev.type === 'newUser') {
    console.log(ev.data.name); // ok
  }
  if (ev.type === 'incomingMessage') {
    console.log(ev.data); // ok, string
  }
});
`;

const code3 = `
function onEvent(callback: <T extends EventType>(ev: Mapped[T]) => void) { }
`;

const code4 = `
function onEvent(callback: (ev: Mapped[EventType]) => void) { }
`;

const navigation = {
  first_approach: {
    id: "first_approach",
    text: "First approach",
  },
  second_approach: {
    id: "second_approach",
    text: "Second approach",
  },
} as const;

const links = Object.values(navigation);

const PubSub: FC = () => (
  <>
    <HeaderNav links={links} />
    <Header {...navigation.first_approach} />
    <p>Our main goal - is to make illegal states unrepresentable.</p>
    <p>
      Please see next example. This pattern is your friend if you want to make
      event driven app (sockets, etc...)
    </p>
    <Code code={code1} />
    <p>
      <Var>UnionToIntersection</Var> util type is taken from
      <Anchor
        href="https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286"
        text="here"
      />
    </p>
    <p>
      <Var>EventMap</Var> - is our single source of true.
    </p>
    <p>We can use it for typing our listeners and emitters</p>
    <Header {...navigation.second_approach} />
    <p>
      Second example is taken from
      <Anchor
        href="https://stackoverflow.com/questions/65668969/event-maps-and-type-guards#answer-65890181"
        text="here"
      />
    </p>
    <p>I used this example to show how generics work and how they don't</p>
    <Code code={code2} />
    <p>But why it does not work ???</p>
    <p>You just need to replace</p>
    <Code code={code3} />
    <p>with</p>
    <Code code={code4} />
    <p>
      Because <Var>T extends EventType</Var> is not the same as
      <Var>EventType</Var>
    </p>
  </>
);

export default PubSub;
