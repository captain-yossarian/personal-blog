import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout, Var } from "../Shared/Layout";
import Links, { Anchor } from "../Shared/Links";

const code1 = `
type Union = "one" | "two" | "three";

type ExpectedArray = ["one", "two", "three"];
`;

const code2 = `
type Result = Union[]; // ('one' | 'two' | 'three')[]

type Test1 = Union extends ["one", "one", "one"] ? true : false; // true
`;

const code3 = `
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Converts union to overloaded function
type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// Finally me)
type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

interface Person {
  name: string;
  age: number;
  surname: string;
  children: number;
}

type Result = UnionToArray<keyof Person>; // ["name", "age", "surname", "children"]

const func = <T>(): UnionToArray<keyof T> => null as any;

const result = func<Person>(); // ["name", "age", "surname", "children"]
`;

const code4 = `
type TupleUnion<U extends string, R extends any[] = []> = {
	[S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U];

interface Person {
    firstName: string;
    lastName: string;
    dob: Date;
    hasCats: false;
}

type keys = TupleUnion<keyof Person>;
`;
const links = [
  {
    href:
      "https://stackoverflow.com/questions/65533827/get-keys-of-an-interface-in-generics/65534971#65534971",
    text: "stackoverflow",
  },
];

const UnionArray: FC = () => (
  <Layout title="Convert unions to arrays">
    <p>
      Let's say you have a <Var>Union</Var>, and you want to convert it to
      <Var>ExpectedArray</Var>
    </p>
    <Code code={code1} />
    <p>There is a naive way to do it:</p>
    <Code code={code2} />
    <p>
      As you see, it is not what we are looking for. Next example is hard to
      understand, but you may learn smth new.
    </p>
    <Code code={code3} />
    <p>
      Credits goes to
      <a href="https://github.com/microsoft/TypeScript/issues/13298#issuecomment-468114901">
        Shanon Jackson
      </a>
      ,
      <a href="https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union#comment-94748994">
        Titian Cernicova-Dragomir
      </a>
      ,
      <a href="https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286">
        @jcalz
      </a>
    </p>
    <p>
      Please keep in mind, this solution is not CPU friendly and order will
      always be the same as in union.
    </p>
    <p>
      It is bad, in case, if you want to use above type for
      <Var>Object.keys()</Var>
    </p>
    <p>
      According to specification, using this method, does not give you keys
      order guarantee.
    </p>
    <p>
      If You want to use advanced type for <Var>Object.keys</Var> you should use
      next solution, which is shamelessly stolen from
      <Anchor
        href={"https://twitter.com/WrocTypeScript/status/1306296710407352321"}
        text={"Wroclaw twittergroup"}
      />
    </p>
    <Code code={code4} />
    <Links data={links} />
  </Layout>
);

export default UnionArray;
