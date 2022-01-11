import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
enum E {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}
`;

const code2 = `
enum E {
  A = 'A',
  B = 'B'
}

type O = keyof typeof E
const state: { [key in keyof typeof E]?: string } = {};
`;

const code3 = `
enum E {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// //https://github.com/microsoft/TypeScript/issues/13298#issuecomment-468114901
type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

type State<T extends string, R extends string[] = []> = {
  [P in T]: IsUnion<T> extends true ? State<Exclude<T, P>, [...R, Exclude<T, P>]> : R
}[T]

// Array of all possible keys
type Result = UnionToArray<State<keyof typeof E>>

// convert union to object with appropriate keys
type MapPredicate<T> = UnionToIntersection<T extends string ? {
  [P in T]: string
} : never>

// don't allow empty object because value can't be undefined
type Empty = { __tag: 'empty' }

// iterate through array of strings
type MappedString<
  Arr,
  Result = Empty
  > = Arr extends []
  ? []
  : Arr extends [infer H]
  ? Result | MapPredicate<H>
  : Arr extends [infer Head, ...infer Tail]
  ? MappedString<[...Tail], Result | MapPredicate<Head>>
  : Readonly<Result>;


// iterate through array of array of string
type MappedArray<
  Arr extends Array<unknown>,
  Result extends Array<unknown> = []
  > = Arr extends []
  ? []
  : Arr extends [infer H]
  ? [...Result, MappedString<H>]
  : Arr extends [infer Head, ...infer Tail]
  ? MappedArray<[...Tail], [...Result, MappedString<Head>]>
  : Readonly<Result>;

type AllPossibleValues = MappedArray<Result>[number];

const A: AllPossibleValues = { A: 'A' }
const AB: AllPossibleValues = { A: 'A', B: 'B' }
const ABC: AllPossibleValues = { A: 'A', B: 'B', C: 'C' }
const ABCD: AllPossibleValues = { A: 'A', B: 'B', C: 'C', D: 'D' }
const CD: AllPossibleValues = { C: 'C', D: 'D' }
const AD: AllPossibleValues = { A: 'A', D: 'D' }
const BD: AllPossibleValues = { B: 'B', D: 'D' }

const BE: AllPossibleValues = {} // expected error
const QA: AllPossibleValues = {A:'A', Q:'Q'} // expected error

const state:AllPossibleValues={A:'A'}

/* [key: string, value: string] */
const result = Object.entries(state).forEach(([key, value]) => { 

})
`;

const code4 = `
type MetaKey = 'meta';
type CtrlKey = 'ctrl';
type ShiftKey = 'shift';
type AltKey = 'alt';
type ModiferKeyCombinations = ???
`;

const code5 = `
type ModiferKeyCombinations = 
  | 'meta'
  | 'ctrl'
  | 'shift'
  | 'alt'
  | 'meta ctrl'
  | 'meta shift'
  | 'meta alt'
  | 'ctrl meta'
  | 'ctrl shift'
  | 'ctrl alt'
  | 'shift meta'
  | 'shift ctrl'
  | 'shift alt'
  | 'alt meta'
  | 'alt ctrl'
  | 'alt shift'
  | 'meta ctrl shift'
  | 'meta ctrl alt'
  | 'meta shift ctrl'
  | 'meta shift alt'
  | 'meta alt ctrl'
  | 'meta alt shift'
  | 'ctrl meta shift'
  | 'ctrl meta alt'
  | 'ctrl shift meta'
  | 'ctrl shift alt'
  | 'ctrl alt meta'
  | 'ctrl alt shift'
  | 'shift meta ctrl'
  | 'shift meta alt'
  | 'shift ctrl meta'
  | 'shift ctrl alt'
  | 'shift alt meta'
  | 'shift alt ctrl'
  | 'alt meta ctrl'
  | 'alt meta shift'
  | 'alt ctrl meta'
  | 'alt ctrl shift'
  | 'alt shift meta'
  | 'alt shift ctrl'
  | 'meta ctrl shift alt'
  | 'meta ctrl alt shift'
  | 'meta shift ctrl alt'
  | 'meta shift alt ctrl'
  | 'meta alt ctrl shift'
  | 'meta alt shift ctrl'
  | 'ctrl meta shift alt'
  | 'ctrl meta alt shift'
  | 'ctrl shift meta alt'
  | 'ctrl shift alt meta'
  | 'ctrl alt meta shift'
  | 'ctrl alt shift meta'
  | 'shift meta ctrl alt'
  | 'shift meta alt ctrl'
  | 'shift ctrl meta alt'
  | 'shift ctrl alt meta'
  | 'shift alt meta ctrl'
  | 'shift alt ctrl meta'
  | 'alt meta ctrl shift'
  | 'alt meta shift ctrl'
  | 'alt ctrl meta shift'
  | 'alt ctrl shift meta'
  | 'alt shift meta ctrl'
  | 'alt shift ctrl meta'
`;

const code6 = `
type Permutations<T extends string, U extends string = T> =
    T extends any ? (T | \`${"${T} ${Permutations<Exclude<U, T>>}"}\`) : never;
`;
const navigation = {
  first: {
    id: "first",
    text: "Enum permutations",
  },
  second: {
    id: "second",
    text: "Template literal string permutations",
    
  },
};
const links = Object.values(navigation);

const Permutations: FC = () => (
  <>
    <HeaderNav links={links} />
    <Header {...navigation.first} />
    <p>Let's say you have next enum:</p>
    <Code code={code1} />
    <p>
      You need to constrain object keys to enum's values while not requiring all
      keys to be present and object values are not considered undefined
    </p>
    <p>
      First idea I came up with - was to use <Var>Partial</Var>
    </p>
    <p>
      But it did not meet our requirements, since value could be
      <Var>undefined</Var>
    </p>
    <Code code={code2} />
    <p>So, let's try another, a bit complicated approach</p>
    <Code code={code3} />
    <p>
      <Var>AllPossibleValues</Var> is a union type of all possible interfaces.
    </p>
    <p>
      If you add 5th property to enum, above code will not compile, because of
      recursion limit in TS.
    </p>
    <p>
      TypeScript allows you roughly ~50 recursion calls. My code reaches this
      limit very fast, because rec <Var>MappedArray</Var> calls rec
      <Var>MappedString</Var>.
    </p>
    <Header {...navigation.second} />
    <p>Let's say you have next string literal types:</p>
    <Code code={code4} />
    <p>
      Where <Var>ModiferKeyCombinations</Var> expected to be:
      <Code code={code5} />
    </p>
    <p>How can we compute all permutations of above strings?</p>
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/68252446/is-it-possible-to-generate-string-literal-combinations-with-template-literal-in#answer-68256789"
        text="Here"
      />
      You can find @jcalz's solution:
    </p>
    <Code code={code6} />
  </>
);

export default Permutations;
