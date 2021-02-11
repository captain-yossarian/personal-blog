import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
type Union =
  | {
      name: "a";
      event:
        | { eventName: "a1"; payload: string }
        | { eventName: "a2"; payload: number };
    }
  | {
      name: "b";
      event: { eventName: "b1"; payload: boolean };
    };
`;

const code2 = `
type Result =
  | { name: "a"; eventName: "a1"; payload: string }
  | { name: "a"; eventName: "a2"; payload: number }
  | { name: "b"; eventName: "b1"; payload: boolean };
`;

const code3 = `
//https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

//https://github.com/microsoft/TypeScript/issues/13298#issuecomment-468114901
type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;


type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

// https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union#comment-94748994
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type ArrayOfUnions<T> = IsUnion<T> extends true ? UnionToArray<T> : T

//https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
type Distributive<T> = [T] extends [any] ? T : never

// treat this predicate as Array.prototype.map predicate
type MapPredicate<T> =
  T extends { event: object, name: string }
  ? IsUnion<T['event']> extends true
  ? ArrayOfUnions<T['event']> extends any[]
  ? Distributive<ArrayOfUnions<T['event']>[number]> & { name: T['name'] }
  : T
  : T['event'] & { name: T['name'] }
  : never
//https://catchts.com/tuples#map
// This util works similar to Array.prototype.map
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

type Union =
  | {
    name: "a";
    event:
    | { eventName: "a1"; payload: string }
    | { eventName: "a2"; payload: number };
  }
  | {
    name: "b";
    event: { eventName: "b1"; payload: boolean };
  };

type Result = Mapped<UnionToArray<Union>>[number]


type Expected =
  | { name: "a"; eventName: "a1"; payload: string }
  | { name: "a"; eventName: "a2"; payload: number }
  | { name: "b"; eventName: "b1"; payload: boolean };


type Assert = Result extends Expected ? true : false // true
`;

const code4 = `
ype Union =
    | {
        name: "a";
        event:
        | { eventName: "a1"; payload: string }
        | { eventName: "a2"; payload: number };
    }
    | {
        name: "b";
        event: { eventName: "b1"; payload: boolean };
    };

type nested = {
    [n in Union['name']]: {
        [e in Extract<Union, { name: n }>['event']['eventName']]: {
            name: n,
            eventName: e,
            payload: Extract<Union['event'], {eventName: e}>['payload']
        }
    }
}
// https://stackoverflow.com/a/50375286/3370341
type UnionToIntersection<U> = 
  (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never

type r = UnionToIntersection<nested[keyof nested]>
type Result = r[keyof r]

type Expected =
    | { name: "a"; eventName: "a1"; payload: string }
    | { name: "a"; eventName: "a2"; payload: number }
    | { name: "b"; eventName: "b1"; payload: boolean };

declare const expected: Expected;
declare const result: Result;
// In case types are not the same I expect a type error here
const y: Result = expected
const l: Expected = result
`;

const navigation = {
  my_ugly_way: {
    id: "my_ugly_way",
    text: "My ugly and too complicated way",
  },
  clever_way: {
    id: "clever_way",
    text: "Clever way by @Ilario Pierbattista",
  },
};
const links = Object.values(navigation);

const FlattenUnion: FC = () => (
  <>
    <HeaderNav links={links} />
    <p>How to flatten nested union types.</p>
    <p>We should convert next union:</p>
    <Code code={code1} />
    <p>To:</p>
    <Code code={code2} />
    <Header {...navigation.my_ugly_way} />
    <Code code={code3} />
    <Header {...navigation.clever_way} />
    <Code code={code4} />
  </>
);

export default FlattenUnion;
