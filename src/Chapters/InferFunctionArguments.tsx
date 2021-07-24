import React, { FC } from "react";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import Code from "../Shared/Code";
import { Anchor } from "../Shared/Links";

const code1 = `
const foo = <T,>(a: T) => a

// const foo: <42>(a: 42) => 42
foo(42)
`;

const code2 = `
const foo = <T,>(a: T) => a

// const foo: <{ a: number; }> (a: { a: number; }) => { a: number; }
foo({ a: 42 })
`;

const code3 = `
const foo = <Value, T extends { a: Value }>(a: T) => a

// const foo: <{ a: number; }> (a: { a: number; }) => { a: number; }
foo({ a: 42 })
`;

const code4 = `
const foo = <Value extends number, T extends { a: Value }>(a: T) => a

// const foo: <{ a: 42; }> (a: { a: 42; }) => { a:42; }
foo({ a: 42 })
`;
const code5 = `
const foo = <
  Key extends PropertyKey,
  Value extends number | string,
  T extends Record<Key, Value>
>(a: T) => a


// const foo: <PropertyKey, string | number, { a: 42; b: "hello";}> 
foo({ a: 42, b: 'hello' })
`;

const code6 = `

type Json =
  | null
  | string
  | number
  | boolean
  | Array<JSON>
  | {
    [prop: string]: Json
  }

const foo = <
  Key extends PropertyKey,
  Value extends Json,
  T extends Record<Key, Value>
>(a: T) => a

// const foo: <PropertyKey, Json, { a: 42; b: "hello"; }
foo({ a: 42, b: 'hello' })
`;

const code7 = `
type Json =
  | null
  | string
  | number
  | boolean
  | Array<JSON>
  | {
    [prop: string]: Json
  }

const foo = <
  Key extends PropertyKey,
  Value extends Json,
  T extends Record<Key, Value>[]
>(a: T) => a

// const foo: <PropertyKey, Json, { a: 42; b: "hello"; }
foo([{ a: 42, b: 'hello' }])
`;

const code8 = `
const foo = <
  V extends number,
  A extends { a: V }[]
>(a: [...A]) => a

foo([{ a: 1 }])
`;

const code9 = `
func([
   {object: object1, key: someKeyOfObject1},
   {object: object2, key: someKeyOfObject2}
])
`;

const code10 = `
type Entity<Obj, Key> = {
    object: Obj,
    key: Key
}
`;

const code11 = `
type IsValid<T extends Entity<any, any>[]> = 
    /**
     * Infer each element of the array
     */
    T[number] extends infer Elem 
    /**
     * Check if every element of the array extends Entity
     */
    ? Elem extends Entity<any, any> 
    /**
     * Check if keyof Elem['object'] extends [key] property
     * 1) if [key] property is one of object properties - return true
     * 2) if at least one element does not meet your requirements return false | true,
     * because some element are ok
     */
    ? keyof Elem['object'] extends Elem['key'] 
    ? true 
    : false 
    : false 
    : false;
`;

const code12 = `
// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

// credits https://stackoverflow.com/users/125734/titian-cernicova-dragomir
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type Validator<T extends boolean> =
    /**
     * If IsValid returns false | true (boolean) it means Error
     * otherwise - ok
     */
    IsUnion<T> extends true ?
    ['Dear developer, please do smth right']
    /**
     * I'm using empty array here, because 
     * (...flag:[])=>any evaluates to function without arguments
     */
    : []
`;

const code13 = `
type Entity<Obj, Key> = {
    object: Obj,
    key: Key
}

type IsValid<T extends Entity<any, any>[]> = 
    /**
     * Infer each element of the array
     */
    T[number] extends infer Elem 
    /**
     * Check if every element of the array extends Entity
     */
    ? Elem extends Entity<any, any> 
    /**
     * Check if keyof Elem['object'] extends [key] property
     * 1) if [key] property is one of object properties - return true
     * 2) if at least one element does not meet your requirements return false | true,
     * because some element are ok
     */
    ? keyof Elem['object'] extends Elem['key'] 
    ? true 
    : false 
    : false 
    : false;

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

// credits https://stackoverflow.com/users/125734/titian-cernicova-dragomir
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type Validator<T extends boolean> =
    /**
     * If IsValid returns false | true (boolean) it means Error
     * otherwise - ok
     */
    IsUnion<T> extends true ?
    ['Dear developer, please do smth right']
    /**
     * I'm using empty array here, because 
     * (...flag:[])=>any evaluates to function without arguments
     */
    : []

const foo = <
    Value extends Record<PropertyKey, string>,
    Key extends keyof Value,
    Data extends Entity<Value, Key>[],
>(a: [...Data], ...flag: [...Validator<IsValid<[...Data]>>]) => a

/**
 * Ok
 */
foo([{
    object: { name: 'John' }, key: 'name'
},
{
    object: { surname: 'John' }, key: 'surname'
}])

/**
 * Error
 */
foo([{
    object: { name: 'John' }, key: 'name'
},
{
    object: { surname: 'John' }, key: 'name'
}])
`;
const navigation = {
  oop: {
    id: "oop",
    text: "OOP approach",
  },
  fp: {
    id: "fp",
    text: "FP approach",
    updated: true,
  },
};

const links = Object.values(navigation);
const InferFunctionArguments: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.oop} />
      <p>
        In this article I will show you simple and very useful examples of type
        inference in TypeScript.
      </p>
      <p>
        Imagine you want to infer not just number type but a literal
        representation. Consider next example:
      </p>
      <Code code={code1} />
      <p>
        <Var>T</Var> generic parameter was infered to <Var>42</Var> which is
        perfectly fine. Now, try to pass an object: <Var>{`{a: 42}`}</Var>:
      </p>
      <Code code={code2} />
      <p>
        This is not really what we want. We want to infer <Var>{`{a: 42}`}</Var>{" "}
        , not just <Var>{`{a: number}`}</Var>. You have at least two options how
        to do it. First, you can just annotate your object as immutable value. I
        mean <Var>as const</Var> .
      </p>
      <Code code={`foo({ a: 42 } as const)`} />
      <p>
        It works, but sometimes you are not allowed to use immutable values.
        Second option is much better. You can add extra generic yo annotate the
        value.
      </p>
      <Code code={code3} />
      <p>
        As you might have noticed it still does not work. In order to make it
        work you need apply extra restrictions to <Var>Value</Var> generic.
      </p>
      <Code code={code4} />
      <p>
        Now, it works as expected. I know that you did not like last example.
        What if you want to pass an object with multiple keys. According to my
        example, you need to annotate each key then.
      </p>
      <p>Consider next example:</p>
      <Code code={code5} />

      <p>
        Now, I don't like this example, because my values are restricted to
        string and number types. Instead of using <Var>string | number</Var> as
        a value type, we can use <Var>Json</Var> type.
      </p>
      <Code code={code6} />
      <p>
        If you want to infer an <Var> Array</Var> instead of <Var>Record</Var>,
        you can do this:
      </p>
      <Code code={code7} />
      <p>
        If your array consists of homogeneous data, you can use{" "}
        <Anchor
          href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types"
          text="variadic tuple types"
        />{" "}
        :
      </p>
      <Code code={code8} />
      <p>
        You may ask me, why I even need to infer literal type? Because sometimes
        we want to validate our arguments. Imagine that you want to disallow
        value if it equals <Var>1</Var>. Try to implement this validation rule.
      </p>
      <p>
        What about validation/infering some deep nested properties? Consider
        next example:
      </p>
      <Code code={code9} />
      <p>
        Each <Var>key</Var> property should extend <Var>keyof object.</Var>
        Let's define all type helpers. First of all we need to define type of
        entity
      </p>
      <Code code={code10} />
      <p>
        Then we need some validation logic. You can find some explanation in the
        comments.
      </p>
      <Code code={code11} />
      <p>
        In order to understand what's going on here, please read my previous
        articles about{" "}
        <Anchor href="https://catchts.com/type-negation" text="type negation" />{" "}
        and{" "}
        <Anchor href="https://catchts.com/validators" text="type validators" />{" "}
      </p>
      <Code code={code12} />
      <p>Full example with overloads</p>
      <Code code={code13} />
      <p>
        Very similar example you can find{" "}
        <Anchor
          href="https://stackoverflow.com/questions/68482949/typescript-keyof-unexpected-behavior/68483709#68483709"
          text="here"
        />
        . The only difference between them, that second infers class constructor
        arguments
      </p>
      <p>
        If you want to infer class instances, please refer to attached links at
        the bottom. You will find there more interesting examples
      </p>
    </>
  );
};

export default InferFunctionArguments;
