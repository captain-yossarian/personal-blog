import React, { FC } from "react";
import { Var } from "../Layout";
import Code from "../Shared/Code";
import { Anchor } from "../Shared/Links";

const code1 = `
const obj = {
    a:{
        c:1
    },
    b:{
        a:1 // <---- duplicate, property [a] already exists
    }
}
`;

const code2 = `
/**
 * Compute all possible property combinations
 */
type KeysUnion<T, Cache extends PropertyKey = never> =
    /**
     * If T extends string | number | symbol -> return Cache, this is the end/last call
     */
    T extends PropertyKey
    ? Cache
    : {
        /**
         * Otherwise, iterate through keys of T, because T is an object
         * and unionize Cache 
         */
        [P in keyof T]: KeysUnion<T[P], Cache | P>

    }[keyof T]

// type Result = "a" | "c" | "b" | "d" | "e"
type Result = KeysUnion<{
    a: {
        b: ''
    },
    c: {
        d: {
            e: ''
        }
    }
}>
`;

const code3 = `
type Validate<
    /**
     * Our main data structure
     */
    Obj,
    /**
     * Expected to be  key from the union of all keys
     */
    Key extends PropertyKey,
    /**
     * Result
     */
    Cache extends Record<string, any> = never,
    /**
     * Index is provided to  distinguish same keys on different nesting levels. Because if you unionize same keys, you will end up with one element in the union
     */
    Index extends number[] = [],
    /**
     * Root is provided to make a difference between keys on the same nesting level, because diff leafs might have same keys on same levels
     */
    Root extends string = ''

> =
    /**
     * If provided Obj is a primitive, it is the end of recursion
     */
    Obj extends Primitives
    /**
     * Our result
     */
    ? Exclude<Cache, []>
    : {
        /**
         * Iterate through object keys
         */
        [Prop in keyof Obj]:
        /**
         * Check whether object keys extends argument Key, it will be first encounter of a key
         * Hence, if it will be a second one encounter, we will add to our cache next key: Root-Prop-index
         * Son if Cache contains a union it means that we have more than one match of a key
         */
        Prop extends Key
        ? Validate<Obj[Prop], Key, Record<Key, \`${"${Root}-${Prop & string}-${Index['length']}"}\`>, [...Index, Index['length']], Root extends '' ? Prop : Root>
        : Validate<Obj[Prop], Key, Cache, [...Index, Index['length']], Root extends '' ? Prop : Root>
    }[keyof Obj]


type Data = {
    a: {
        b: 2
    },
    c: {
        b: 3
    }
}

// type Test = Record<"a" | "c" | "b", "a-b-1"> | Record<"a" | "c" | "b", "c-b-1">

type Test = Validate<Data, KeysUnion<Data>>
`;

const code4 = `
type Data = {
    a: {
        b: 2
    },
    c: {
        b: 3
    }
}


type Check<Obj> = {
    [Prop in KeysUnion<Obj>]: IsUnion<Validate<Obj, Prop>> extends true ? 'many' : 'one'
}

// type Result = {
//     a: "one";
//     c: "one";
//     b: "many";
// }
type Result = Check<Data>
`;

const code5 = `
type Primitives = string | number | symbol;

type Values<T> = T[keyof T]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

type KeysUnion<T, Cache extends PropertyKey = never> =
    T extends PropertyKey
    ? Cache
    : { [P in keyof T]: KeysUnion<T[P], Cache | P>
    }[keyof T]

type Validate<
    Obj,
    Key extends PropertyKey,
    Cache extends Record<string, any> = never,
    Index extends number[] = [],
    Root extends string = ''

> =
    Obj extends Primitives
    ? Exclude<Cache, []>
    : {
        [Prop in keyof Obj]:
        Prop extends Key
        ? Validate<Obj[Prop], Key, Record<Key, \`${"${Root}-${Prop & string}-${Index['length']}`"}\`>, [...Index, Index['length']], Root extends '' ? Prop : Root>
        : Validate<Obj[Prop], Key, Cache, [...Index, Index['length']], Root extends '' ? Prop : Root>
    }[keyof Obj]

type Structure = {
    foo: {
        three: 'hi',
        bar: {
            one: 'oh',
            bill: {
                four: 'uh', // duplicated
            },
        },
    },
    bar: {
        two: 'hiya',
        foobar: {
            four: 'hey', // duplicated
        },
    },
}





type Check<Obj> = {
    [Prop in KeysUnion<Obj>]: IsUnion<Validate<Obj, Prop>> extends true ? 'many' : 'one'
}

type Duplicates = Check<Structure>
`;

const Duplicates: FC = () => {
  return (
    <>
      <p>
        Imagine you need to create a dictionary (hash map) data structure, with
        deep nested properties without duplicated keys. I mean, you are allowed
        to create a regular object in javascript with duplicated keys, but only
        if they are on different level of nesting.
      </p>
      <Code code={code1} />
      <p>
        Let's try to create an utility type which will forbid you creating such
        data structures
      </p>
      <p>
        I decided to create a union of all object properties and then check
        whether each property exists only once.
      </p>
      <p>
        In order to create a union of all properties, you can check my{" "}
        <Anchor href="https://catchts.com/deep-pick" text="previous article" />{" "}
        or
        <Anchor
          href="https://stackoverflow.com/questions/69449511/get-typescript-to-infer-tuple-parameters-types/69450150#69450150"
          text="this"
        />
        answer with more explanation
      </p>
      <Code code={code2} />
      <p>
        Now, we need to iterate through each <Var>key</Var> and check whether
        there are a duplicates. To make it work, we should iterate recursively
        through this data structure again. Personally, I don't like it, because
        we already have <Var>O2n</Var>.
      </p>
      <Code code={code3} />
      <p>
        As you might have noticed, <Var>b</Var> is a duplicated property, this
        is why it is marker as <Var>"a-b-1"</Var> and <Var>"c-b-1"</Var>{" "}
        accordingly, because of a pattern <Var>Root-Key-Index</Var>.
      </p>
      <p>Now, it is better to make our output a little bit friendlier</p>
      <Code code={code4} />
      <p>This code works, however it is far from perfect.</p>
      <p>
        If you are interested in more readable solution, you can check{" "}
        <Anchor
          href="https://stackoverflow.com/questions/74489137/typescript-how-to-enforce-unique-keys-across-nested-objects#answer-74496284"
          text="this answer"
        />
      </p>
      <p>Full example</p>
      <Code code={code5} />
      <p>
        Related answer can be found{" "}
        <Anchor
          href="https://stackoverflow.com/questions/74489137/typescript-how-to-enforce-unique-keys-across-nested-objects"
          text="here"
        />
      </p>
    </>
  );
};

export default Duplicates;
