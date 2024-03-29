import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";

const code1 = `
type Union = "one" | "two" | "three";

type ExpectedArray = ["one", "two", "three"];
`;

const code2 = `
type Result = Union[]; // ('one' | 'two' | 'three')[]

type Test1 = Union extends ["one", "one", "one"] ? true : false; // true
`;

const code3 = `
// credits goes to https://stackoverflow.com/a/50375286
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

const func = <T,>(): UnionToArray<keyof T> => null as any;

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

const UnionArray: FC = () => (
  <>
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
      <Anchor
        href="https://github.com/microsoft/TypeScript/issues/13298#issuecomment-468114901"
        text="Shanon Jackson"
      />
      ,
      <Anchor
        href="https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union#comment-94748994"
        text="Titian Cernicova-Dragomir"
      />
      ,
      <Anchor
        href="https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286"
        text="@jcalz"
      />
      .
    </p>
    <p>Please keep in mind, this solution is not CPU friendly.</p>
    <p>
      Please, don't use above util for typing
      <Var>Object.keys()</Var>
    </p>
    <p>
      According to specification, using this method, does not give you keys
      order guarantee.
    </p>
    <p>
      If You want to type <Var>Object.keys</Var> you should use next solution,
      which is shamelessly stolen from
      <Anchor
        href={"https://twitter.com/WrocTypeScript/status/1306296710407352321"}
        text={"Wroclaw twittergroup"}
      />
    </p>
    <Code code={code4} />
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/69676439/create-constant-array-type-from-an-object-type/69676731#69676731"
        text="Here"
      />{" "}
      you can find a thorough explanation of this utility type
    </p>
  </>
);

export default UnionArray;
