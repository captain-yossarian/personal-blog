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
  | Array<Json>
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
  | Array<Json>
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

const code14 = `
foo([{
  object: { name: 'John' }, key: 'name'
},
{
  object: { surname: 'John' }, key: 'name'
}, {}]) // <--- se here an empty object
`;

const code15 = `
function fn<Char extends "a">(): Char {
  return "a"
}
`;

const code16 = `
function fn<Char extends "a">(): Char {
  return "a"
}

const result = fn<'a' & { readonly __tag: unique symbol }>().__tag 
`;

const code17 = `
function fn<User extends { name: string }>(): User {
  return { name: 'John', age: 42 }
}

fn<{ name: 'John', surname: 'Doe' }>().surname // unsafe
fn<{ name: 'John', surname: 'Doe' }>().age // error

`;

const code18 = `
interface Person {
    firstName: string;
    lastName: string;
}

const foo = <User extends Person>(user: User) => {
    let user1: { [K in keyof User]?: number };
    user1 = { firstName: 1 };

    let user2: Partial<Record<keyof User, number>>;
    user2 = { firstName: 2 } // <----- error
}
`;
const code19 = `
interface Person {
    firstName: string;
    lastName: string;
}

type Human = {
    salary: number;
} & Person

let human1: { [K in keyof Human]?: number } = { firstName: 1 }
let human2: Partial<Record<keyof Human, number>> = { firstName: 2 }
`;

const code20 = `
interface Person {
    firstName?: string;
    lastName?: string;
}

type Human =
    & {
        salary?: number;
    }
    & Person
    & string // <---- string

const foo = <User extends Person>(user: User) => {
    let user1: { [K in keyof User]?: number };
    user1 = { firstName: 1 };

    let user2: Partial<Record<keyof User, number>>;
    user2 = { firstName: 2 } // <----- error
}

declare var human: Human

const result = foo<Human>('a')
`;

const code21 = `
interface Person {
    firstName: string;
    lastName: string;
}

type Human =
    & Person
    & {
        toString: () => string
    }

let user2: Partial<Record<keyof Human, number>>;
user2 = { firstName: 2 } // <----- error
`;

const code22 = `
const result = mapKeys({ age: 1 }, { "age": "newAge" })
result.newAge // 1 
`;

const code23 = `
const mapKeys = <
  ObjKeys extends PropertyKey,
  ObjValues extends PropertyKey,
  Obj extends Record<ObjKeys, ObjValues>,
  >(obj: Obj) => 'unimplemented' as any


const result = mapKeys({ age: 1 })

`;

const code24 = `
const mapKeys = <
  ObjKeys extends PropertyKey,
  ObjValues extends PropertyKey,
  Obj extends Record<ObjKeys, ObjValues>,
  NewKeys extends PropertyKey,
  KeyMap extends Record<keyof Obj, NewKeys>, // <--- keys are taken from Obj
  >(obj: Obj, keyMap: KeyMap) => 'unimplemented' as any


const result = mapKeys({ age: 1 }, { "age": "newAge" })
result.newAge // 1
`;

const code25 = `

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type Values<T> = T[keyof T]

type Rename<Obj, Dictionary> =
  Dictionary extends Record<string, string>
  ? UnionToIntersection<Values<{
    [Prop in keyof Dictionary]: Prop extends keyof Obj
    ? Record<Dictionary[Prop], Obj[Prop]>
    : never
  }>>
  : never


const mapKeys = <
  ObjKeys extends PropertyKey,
  ObjValues extends PropertyKey,
  Obj extends Record<ObjKeys, ObjValues>,
  NewKeys extends PropertyKey,
  KeyMap extends Record<keyof Obj, NewKeys>, 
  >(obj: Obj, keyMap: KeyMap) => 'unimplemented' as any


const result = mapKeys({ age: 1 }, { "age": "newAge" })
result.newAge // 1
`;

const code26 = `
const dictionary = {
    a: {
        foo: () => 'foo',
        bar: () => 42
    },
    b: {
        baz: () => 'baz'
    }
}
`;

const code27 = `
const dictionary = {
    a: {
        foo: () => 'foo',
        bar: () => 42
    },
    b: {
        baz: () => 'baz'
    }
} as const;

const getFn = <
    Type extends keyof typeof dictionary>(
        type: Type,
        method: keyof (typeof dictionary)[Type]
    ) => dictionary[type][method]

// (() => string) | (() => number)
const x = getFn('a', 'foo') // ok
getFn('a', 'baz') // expected error
`;

const code28 = `
const withConfig = (config: typeof dictionary) =>
    <Type extends keyof typeof dictionary>(
        type: Type,
        method: keyof (typeof dictionary)[Type]
    ) => config[type][method]

const applyConfig = withConfig(dictionary)

applyConfig('a', 'foo') // ok
applyConfig('a', 'baz') // expected error
`;

const code29 = `
const withConfig = <
    Dictionary,
    >(config: Dictionary) =>
    <Type extends keyof Dictionary,
        Method extends keyof Dictionary[Type]
    >(
        type: Type,
        method: Method
    ) => config[type][method]

const applyConfig = withConfig({
    a: {
        foo: () => 'foo',
        bar: () => 42
    },
    b: {
        baz: () => 'baz'
    }
})


//  () => "foo"
const ok = applyConfig('a', 'foo') // ok
const error = applyConfig('a', 'baz') // expected error
`;

const code30 = `
enum DataType {
  Text = 'TEXT',
  Image = 'IMAGE',
}
`;
const code31 = `
interface TextInput {
  type: DataType.Text,
  text: string
}

interface TextOutput {
  type: DataType.Text,
  text: string
}

const TextTransformer = {
  transform: (input: TextInput):
    TextOutput => ({
      type: DataType.Text,
      text: input.text,
    })
}
`;
const code32 = `
interface ImageInput {
  type: DataType.Image,
  url: string
}

interface ImageOutput {
  type: DataType.Image,
  url: string
  width: number
  height: number
}

const ImageTransformer = {
  transform: (input: ImageInput):
    ImageOutput => ({
      type: DataType.Image,
      url: input.url,
      width: 0,
      height: 0,
    })
}
`;

const code33 = `
const transformerMap = {
  [DataType.Text]: TextTransformer,
  [DataType.Image]: ImageTransformer,
}

type Input = TextInput | ImageInput

type Output = TextOutput | ImageOutput
`;

const code34 = `
const magic = (inputs: Input[]): Output[] =>
  inputs.map(
    input =>
      transformerMap[input.type]
        .transform(input) // error
  )
`;

const code35 = `
declare var a: (value: string) => void
declare var b: (value: number) => void

declare var c: typeof a | typeof b
c()// expects never
`;

const code36 = `
const magic = <TransformMap,>(transformerMap: TransformMap) =>
  (inputs: Input[]): Output[] =>
    inputs.map(
      input =>
        transformerMap[input.type] // error
          .transform(input)
    )
`;

const code37 = `
const magic = <
  TransformMap extends Record<DataType, { transform: (...args: any[]) => any }>
>(transformerMap: TransformMap) =>
  (inputs: Input[]): Output[] =>
    inputs.map(
      input =>
        transformerMap[input.type] // error
          .transform(input)
    )
`;

const code38 = `
const magic = <
  TransformMap extends Record<DataType, { transform: (args: Input) => Output }>
>(transformerMap: TransformMap) =>
  (inputs: Input[]): Output[] =>
    inputs.map(
      input =>
        transformerMap[input.type]
          .transform(input)
    )

const withMap = magic({
  [DataType.Text]: TextTransformer, // error
  [DataType.Image]: ImageTransformer, // error
})

const result = withMap([{
  type: DataType.Text,
  text: 'string'
}]) // ok
`;

const code39 = `
const magic = <
  Key extends typeof DataType,
  Value extends { transform: (arg: Input) => Output },
  TransformMap extends Record<Key & string, Value>>(transformerMap: TransformMap) =>
  (inputs: Input[]): Output[] =>
    inputs.map(
      input =>
        transformerMap[input.type] // error
          .transform(input)
    )

const withMap = magic({
  [DataType.Text]: TextTransformer, // ok
  [DataType.Image]: ImageTransformer, // ok
})

const result = withMap([{
  type: DataType.Text,
  text: 'string'
}]) // ok
`;

const code40 = `
const magic = <
  Key extends typeof DataType,
  Value extends { transform: (arg: Input) => Output },
  TransformMap extends Record<Key & string, Value>>(transformerMap: TransformMap) =>
  <
    Type extends keyof TransformMap,
    Inpt extends ({ type: Type }),
    Inputs extends Inpt[]
  >(inputs: [...Inputs]): Output[] =>
    inputs.map(
      input =>
        transformerMap[input.type]
          .transform(input) // error
    )
`;

const code41 = `
const magic = <
  Key extends typeof DataType,
  Value extends { transform: (arg: Input) => Output },
  TransformMap extends Record<Key & string, Value>>(transformerMap: TransformMap) =>
  <
    Type extends keyof TransformMap,
    Inpt extends ({ type: Type }) & Input, // small fix
    Inputs extends Inpt[]
  >(inputs: [...Inputs]): Output[] =>
    inputs.map(
      input =>
        transformerMap[input.type]
          .transform(input)
    )

`;

const navigation = {
  generic_inference: {
    id: "generic_inference",
    text: "Basics of argument inference",
  },
  generic_constraints: {
    id: "generic_constraints",
    text: "Generic constraints",
    
  },
  first_level_inference: {
    id: "first_level_inference",
    text: "First level prop inference",
    
  },
  second_level_inference: {
    id: "second_level_inference",
    text: "Second level prop inference",
    
  },
  function_inference: {
    id: "function_inference",
    text: "Function inference",
    
  },
};
const links = Object.values(navigation);

const InferFunctionArguments: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <p>
        In this article I will show you useful examples of type inference in
        TypeScript.
      </p>
      <Header {...navigation.generic_inference} />
      <p>Let's start from the simplest example.</p>
      <p>
        Imagine you want to infer some primitive type. For instance let's infer
        a <Var>number</Var>. Consider this example:
      </p>
      <Code code={code1} />
      <p>
        <Var>T</Var> generic parameter was infered to <Var>42</Var> which is
        perfectly fine. It was infered as a literal <Var>42</Var> instead of
        just <Var>number</Var>.
      </p>
      <p>
        If you used just <Var>{`const foo = (a: number) => a`}</Var>, you would
        infer nothing.
      </p>
      <p>
        Now, try to pass an object <Var>{`{a: 42}`}</Var> to our <Var>foo</Var>
        function.
      </p>
      <Code code={code2} />
      <p>
        This is not really what we want. We want to infer <Var>{`{a: 42}`}</Var>
        , not just <Var>{`{a: number}`}</Var>. You have at least two options how
        to do it. First, you can just annotate your object with{" "}
        <Var>as const</Var>. I mean make it fully immutable.
      </p>
      <Code code={`foo({ a: 42 } as const)`} />
      <p>
        It works, but sometimes, if not always, you are not allowed to use
        immutable values. Second option is much better. You can add extra
        generic in order to infer the value.
      </p>
      <p>
        From my experience arises, that if you can't infer something with one
        generic - add another one.
      </p>
      <Code code={code3} />
      <p>
        As you might have noticed it still does not work. In order to make it
        work you need apply extra restrictions to <Var>Value</Var> generic.
      </p>
      <Code code={code4} />
      <p>
        Now, it works as expected. I'd call it - type dustructure. You infer
        deepest key/value, then you go one level up and infer whole object. What
        if you want to pass an object with multiple keys. According to my
        example, you need to annotate/infer each key/value pair then.
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
        />{" "}
        . The only difference between them, that second infers class constructor
        arguments
      </p>
      <p>
        There is one interesting thing in our last example. The validation
        algorithm. It runs only after providing all arguments but not during.
        Try to add comma after after last element and put an empty object in
        example with error.
      </p>
      <Code code={code14} />
      <p>You will see that error is gone.</p>
      <p>So, this is our algorithm:</p>
      <ul>
        <ol> - TS infers each object in the array</ol>
        <ol> - TS validates whole infered array with elements</ol>
      </ul>
      <p>
        Before we proceed with generics, I'd like to talk about generic
        constraints.
      </p>
      <Header {...navigation.generic_constraints} />
      <p>
        Main point of this chapter is: <Var>extends</Var> does not mean{" "}
        <Var>equal</Var>.
      </p>
      <p>Consider this example:</p>
      <Code code={code15} />
      <p>You will get this error:</p>
      <p>
        <Var>Type '"a"' is not assignable to type 'Char'.</Var>
        <Var>
          '"a"' is assignable to the constraint of type 'Char', but 'Char' could
          be instantiated with a different subtype of constraint '"a"'
        </Var>
      </p>
      <p>
        While we think that compiler is just a picky machine which dislikes our
        code, let's take a look at some weird edge cases.
      </p>
      <p>
        What if our type argument is <Var>branded/tagged</Var>.
      </p>
      <Code code={code16} />
      <p>
        While TS claims that <Var>result</Var> is a <Var>symbol</Var>, in
        runtime, it will be just an <Var>undefined</Var>
      </p>
      <p>
        In above example <Var>{`'a' & { readonly __tag: unique symbol }`}</Var>{" "}
        is assignable to type argument of <Var>fn</Var>function but as you might
        have noticed, return value of function will not conform our expectation.
        I mean if you provide branded type with some extra properties as an
        argument you would expect them as an output, but since our function, in
        fact, returns only <Var>"a"</Var>this behavior is unsafe.
      </p>
      <p>To make it clear, please see another example with object.</p>
      <Code code={code17} />
      <p>
        Related answers you can find
        <Anchor
          text="here"
          href="https://stackoverflow.com/questions/69187022/why-cant-the-generic-interface-in-ts-infer-the-type-correctly/69188596#69188596"
        />{" "}
        and{" "}
        <Anchor
          text="here"
          href="https://stackoverflow.com/questions/70494434/typescript-generic-type-extract-keys-with-value-of-type-x-does-not-behave-as/70496182?noredirect=1#comment124654422_70496182"
        />
      </p>
      <p>
        In case, if you did not like previous example, I have prepared another
        one. More interesting.
      </p>
      <Code code={code18} />
      <p>
        Take a minute and think about this example. Try to answer a simple
        question: Why do you see an error?
      </p>
      <p>
        If <Var>User</Var> is known, it works as expected.
      </p>
      <Code code={code19} />
      <p>
        Do you remember what I said at the beginning? <Var>Extends</Var> does
        not mean - <Var>equal</Var>. It means that left side Type is a subtype
        of right side type. Nothing more, nothing less.
      </p>
      <p>
        Let's slightly change our example. I just made all property optional.
      </p>
      <Code code={code20} />
      <p>You might think: Are you kidding me? Is this a joke?</p>
      <p>
        I know, you expected an object of <Var>Person</Var> type with some extra
        properties. Above code is perfectly valid from technical point of view.{" "}
        Despite being just a <Var>string</Var>, <Var>Human</Var> is a subtype of{" "}
        <Var>Person</Var>.
      </p>
      <p>
        I know it is a bit weird example. Please add <Var>toString</Var>{" "}
        property to <Var>Human</Var> type instead of making it a primitive{" "}
        <Var>string</Var>. Now , for the sake af brevity, we can even get rid of
        out function.
      </p>
      <Code code={code21} />
      <p>The error:</p>
      <p>
        <Var>{`Type '() => string' is not assignable to type 'number'`}</Var>
      </p>
      <p>
        TS is smart enough to figure out that <Var>toString</Var> method of{" "}
        <Var>{`{ firstName: 2 }`}</Var> is a <Var>{`() => string`}</Var> whereas
        type <Var>{`Partial<Record<keyof Human, number>>`}</Var> expects it to
        be <Var>{`toString?: number | undefined;`}</Var>
      </p>
      <p>
        Related{" "}
        <Anchor
          text="answer"
          href="https://stackoverflow.com/questions/69187022/why-cant-the-generic-interface-in-ts-infer-the-type-correctly/69188596#69188596"
        />
      </p>
      <p>
        Now, when we know that <Var>extends</Var> does not mean <Var>equal</Var>
        , we can proceed.
      </p>
      <Header {...navigation.first_level_inference} />
      <p>
        Imagine you have two dictionaries. One is your main, second one maps to
        the key/values pairs which should be renamed.
      </p>
      <p>Consider this exmaple:</p>
      <Code code={code22} />
      <p>
        All you need to do is to rename <Var>age</Var> key to <Var>newAge</Var>.
        Nothing complicated.
      </p>
      <p>
        In order to do that, we need to infer each key/value pair and transform
        it into expected result.
      </p>
      <p>At the beginning, we need to infer first argument.</p>
      <Code code={code23} />
      <p>
        <Var>Obj</Var> is infered as <Var>{`{ age: 1 }`}</Var>
      </p>
      <p>Let's infer the second one, using almost same algorithm.</p>
      <Code code={code24} />
      <p>
        Why I said almost? Because we need to bind these two object. As you
        might have noticed, I used <Var>keyof Obj</Var> for key argument in last{" "}
        <Var>KeyMap</Var>. This is because <Var>KeyMap</Var> should contain only
        valid keys, which exists in our source <Var>Obj</Var>
      </p>
      <p>
        All we need to do is to implement renaming logic, which is not too
        complicated. See full example.
      </p>
      <Code code={code25} />
      <Header {...navigation.second_level_inference} />
      <p>Imagine you have some dictionary.</p>
      <Code code={code26} />
      <p>
        Also, you want to write a function which will return a method from above
        dictionary by pair of keys. I mean <Var>{`a -> foo`}</Var> or{" "}
        <Var>{`b -> baz`}</Var>
      </p>
      <p>See this example.</p>
      <Code code={code27} />
      <p>
        Nothing complicated, right? There is only one drawback, return type is
        infered as a union instead of exact function type. Also, we have used{" "}
        <Var>as const</Var>. From my experience arises, that many people don't
        like/want/able to use it.
      </p>
      <p>
        Let's try to infer exact config object and make some arguments
        validation. Personally, I like to curry config objects.
      </p>
      <Code code={code28} />
      <p>I think it is more readable. Is not it?</p>
      <p>
        There is still a drawback. In fact, we did not infer the config object.
        We should fix it.
      </p>
      <Code code={code29} />
      <p>
        You have probably noticed, that there is nothing complicated in above
        examples. This is because there are no functions.
      </p>
      <Header {...navigation.function_inference} />
      <p>
        Imagine we have two data structures: <Var>Text</Var> and{" "}
        <Var>Image</Var>
      </p>
      <Code code={code30} />
      <p> Both of them have input and output interfaces accordingly.</p>
      <p>For Text</p>
      <Code code={code31} />
      <p>For Image</p>
      <Code code={code32} />
      <p>
        They are very similar and they need to be transformed according to some
        strategy.
      </p>

      <Code code={code33} />
      <p>So we just need write types fro this function</p>
      <Code code={code34} />
      <p>
        Let's do it step by step. Why we have an error here? We always has an
        errors in TypeScript :smile:. If you think that it is hard to fight TS
        compiler - try Rust.
      </p>
      <p>
        <Var>transform</Var> expects <Var>never</Var>. Because if we have union
        of functions their argument types will intersect. See much simpler
        example.
      </p>
      <Code code={code35} />
      <p>
        As usually, I want to start with currying. First of all, we need to type
        <Var>transformerMap</Var>. From my experience arises that if you have
        some variables inside function which were not passed as arguments - you
        better make them an arguments. The more you can infer - the better.
      </p>
      <Code code={code36} />
      <p>
        It is clear that keys of <Var>transformMap</Var> should be assignable to{" "}
        <Var>input.type</Var>. Type of <Var>input.type</Var> is{" "}
        <Var>DataType</Var>
      </p>
      <Code code={code37} />
      <p>
        There are too much <Var>any</Var>, don't you think? We want to play
        nicely, that's why we need to replace <Var>any</Var> with{" "}
        <Var>Input</Var> and <Var>Output</Var> accordingly.
      </p>
      <Code code={code38} />
      <p>
        Now we have some problems with <Var>transformMap</Var> keys. We just
        need to infer their type.
      </p>
      <Code code={code39} />
      <p>
        Despite having error, we have finished our types for first part of the
        function. In order to fix above error, we need to proceed.
        <Var>input.type</Var> is not binded with <Var>transformMap</Var> keys in
        any way. We can easily fix it.
      </p>
      <Code code={code40} />
      <p>Hey, TypeScript! What's wrong with you? I have written all types!</p>
      <p>
        As you might have noticed, <Var>Inpt</Var> has only <Var>type</Var>{" "}
        property, whereas it should be assignable to <Var>Input</Var> union. We
        need to assure TypeScript that{" "}
        <Var>{`Inpt extends ({ type: Type })`}</Var> extends <Var>Input</Var>
        Let's do it!
      </p>
      <Code code={code41} />
      <p>
        <Anchor
          text="Here"
          href="https://stackoverflow.com/questions/69176666/implementing-a-modular-system-with-typescript/69177072#69177072"
        />{" "}
        you can find related question and{" "}
        <Anchor
          text="here"
          href="https://stackoverflow.com/questions/63708358/typescript-narrowing-tk-in-a-function-when-multiple-key-values-are-passed-in/63710980#63710980"
        />{" "}
        you can find also an interesting example which I was unable to solve one
        year ago.
      </p>
      <p>
        Some times it is impossible to infer some property. In such case you
        always can create a helper <Var>builder</Var> function just like I did{" "}
        <Anchor
          href="https://stackoverflow.com/questions/69254779/infer-type-based-on-the-generic-type-of-a-sibling-property-in-typescript/69270014#69270014"
          text="here"
        />{" "}
      </p>
      <p>
        I have at least 3 more examples which are based on these answers [
        <Anchor
          href="https://stackoverflow.com/questions/69201083/is-there-a-better-way-to-tell-typescript-which-type-data-is/69204051?noredirect=1#comment122329355_69204051"
          text={"first"}
        />
        ,
        <Anchor
          href="https://stackoverflow.com/questions/63708358/typescript-narrowing-tk-in-a-function-when-multiple-key-values-are-passed-in/63710980#63710980"
          text={"second"}
        />
        ,
        <Anchor
          href="https://stackoverflow.com/questions/68699646/typescript-strong-typing-and-autocomplete-for-a-value-based-on-a-sibling-obje/68700044#68700044"
          text={"third"}
        />
        ]. If you would like to read more about them, please let me know or
        upvote above answers.
      </p>
    </>
  );
};
//

// https://stackoverflow.com/questions/69201083/is-there-a-better-way-to-tell-typescript-which-type-data-is/69204051?noredirect=1#comment122329355_69204051
// https://stackoverflow.com/questions/63708358/typescript-narrowing-tk-in-a-function-when-multiple-key-values-are-passed-in/63710980#63710980
export default InferFunctionArguments;
