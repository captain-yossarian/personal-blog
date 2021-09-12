import React, { FC } from "react";
import { Var } from "../Layout";
import Code from "../Shared/Code";
import { Anchor } from "../Shared/Links";

const code1 = `
const Reducer = <T,>(Arr: ReadonlyArray<T>, Result: ReadonlyArray<T> = [])
  : ReadonlyArray<T> => {

  if (Arr.length === 0) {
    return Result
  }
  const [Head, ...Tail] = Arr;

  if (Array.isArray(Head)) {
    return Reducer([...Head, ...Tail], Result)
  }

  return Reducer(Tail, [...Result, Head])
}
`;

const code2 = `
type Reducer<
  Arr extends ReadonlyArray<unknown>,
  Result extends ReadonlyArray<unknown> = []
  > =
  // if Arr is empty -> return Result
  (Arr extends readonly []
    ? Result
    // if Arr is not empty - destruct it 
    : (Arr extends readonly [infer Head, ...infer Tail]
      // check if Head is an Array
      ? (Head extends ReadonlyArray<any>
        // if it is -> call Reducer with flat Head and Tail
        ? Reducer<readonly [...Head, ...Tail], Result>
        // otherwise call Reducer with Head without flattening
        : Reducer<Tail, readonly [...Result, Head]>
      ) : never
    )
  )
`;

const code3 = `
const flatten = <
  Elem,
  T extends ReadonlyArray<T | Elem>
>(arr: readonly [...T]): Reducer<T> =>
  arr.reduce((acc, elem) =>
    Array.isArray(elem)
      ? flatten(elem) as Reducer<T>
      : [...acc, elem] as Reducer<T>,
    [] as Reducer<T>
  )

// readonly [1, 2, 3]
const result = flatten([[[[[[1]]], 2], 3]] as const)
`;

const FlattenTuple: FC = () => {
  return (
    <>
      <p>How to flatten a tuple type in TypeScript?</p>
      <p>
        Every time when I need to deal with type conversion/mapping, I'm asking
        my self: How would I do it in pure functional language wich supports
        <Var>match</Var>. I mean <Var>match</Var> like in <Var>F#</Var>,{" "}
        <Var>ReasonML</Var> or <Var>Haskell</Var>.
      </p>
      <p>
        Please keep in mind, that you are allowed to use only destruction and
        recursion. There is no <Var>filter</Var>, <Var>fold</Var>,{" "}
        <Var>map</Var> and other fancy methods in type system.
      </p>
      <p>
        Wait, why am I even writing about functional languages. TypeScript is
        not strictly functional but, I believe, that type system is, or at least
        has a lot in common. For instance, you are unable to mutate type itself,
        you can only override it. Please see my previous article about{" "}
        <Anchor href="https://catchts.com/mutations" text="mutations" />.
      </p>
      <p>
        The function I'd like to describe is written in a little bit weird style
        as for typescript/javascript eco system but this is not the case.
      </p>
      <p>Consider this example:</p>
      <Code code={code1} />
      <p>
        This function works in a way we expect. It accepts{" "}
        <Var>[[[[[1]]]]]</Var> and returns <Var>[1]</Var>
      </p>
      <p>
        Above function should not be hard to understand. Since we already now
        how to flat the tuple, let's try to make it in type system
      </p>
      <Code code={code2} />
      <p>
        As you might have noticed, I have used same algorithm as we used
        previously.
      </p>
      <p>
        I just wanted to say, that if you want to write not trivial types, you
        need to change they way you are thinking.
      </p>
      <p>
        Hence, if you learn some basics of <Var>F#</Var>,<Var>OCaml</Var> or any
        other functional language you will become better TypeScript programmer.
      </p>
      <p>
        Let's go back to our utility type. You might want to ask me why I have
        used <Var>ReadonlyArray</Var> instead of regular Arrays?
      </p>
      <p>
        This is because with <Var>ReadonlyArray</Var> it is easier to infer deep
        nested tuple.
      </p>
      <p>See this example:</p>
      <Code code={code3} />
    </>
  );
};

export default FlattenTuple;
