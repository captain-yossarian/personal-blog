import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
const myFn = <T>(arg: { a: (a_arg: number) => T; b: (b_arg: T) => void }) => {
  // ...
};
`;

const code2 = `
myFn({
  a: (i) => ({ num: 0 }),
  b: (b_arg) => {
    b_arg.num;
  }, // Error
});
`;

const code3 = `
const myFn = <T>(arg: {
  a: (a_arg: number) => T;
  b: <U extends T>(b_arg: U) => void;
}) => {
  // ...
};

myFn({
  a: (a) => ({ num: 0 }),
  b: (b_arg) => {
    b_arg.num;
  }, // Works!
});
`;

const code4 = `
interface Data<T> {
  data: T,
  callback?: (data: T) => void
}

const arr = [
  {
    data: 42,
    callbacK: (arg) => arg + 1 // error
  }
];
`;

const code5 = `
const builder = <T,>(data: T): Data<T> => ({ data: data, callback: (data) => data })
`;

const code6 = `

interface Instruction<T> {
  data: T,
  callback: (data: T) => void
}

const builder = <T,>(data: T): Instruction<T> => ({ data, callback: (data) => data })

const arr = [
  builder({ foo: 'bar' }),
];

arr[0].callback({ foo: 42 }) // error
arr[0].callback({ foo: 'hello' }) // ok

`;

const code7 = `
interface Instruction<T> {
  data: T,
  callback: (data: T) => void
}

const builder = <T,>(data: T): Instruction<T> => ({ data, callback: (data) => data })

const arr = [
  builder({ foo: 'bar' }),
  builder({ bar: 2 }),
];
// error, why we have here an intersection: '{ foo: string; } & { bar: number; }'
arr[0].callback({ foo: 42 }) 
arr[0].callback({ foo: 'hello' }) // error, but WHY ?

`;

const code8 = `
interface Instruction<T> {
    promise: Promise<T>,
    callback?: (data: T) => void
}

type SomeInstruction = <R>(cb: <T>(instruction: Instruction<T>) => R) => R;
const someInstruction = <T,>(i: Instruction<T>): SomeInstruction => cb => cb(i);

const arr: SomeInstruction[] = [
    someInstruction({
        promise: Promise.resolve({ foo: 'bar' }),
        callback: (data) => console.log(data.foo)
    }),
    someInstruction({
        promise: Promise.resolve({ bar: 'foo' }),
        callback: (data) => console.log(data.bar)
    })
]

// writing out T for explicitness here
arr.forEach(someInstruction => someInstruction(<T,>(i: Instruction<T>) => {
    i.promise.then(i.callback); // works
}))

// but it is not necessary:
arr.forEach(someInstruction => someInstruction(i => {
    i.promise.then(i.callback); // works
}))
`;

const code9 = `
class Store<T> {
  itemCreator<U>(
    generate: (item: Omit<T, keyof U>) => U
  ): (item: Omit<T, keyof U>) => Omit<T, keyof U> & U {
    return item => ({...item, ...generate(item)});
  }
}

type Person = {
  id: string;
  name: string;
  email: string;
  age?: number;
};

const create = new Store<Person>()
  .itemCreator(() => ({id: 'ID', extra: 42}));

const person = create({name: 'John', email: 'john.doe@foo.com'});
`;

const code10 = `
const create = new Store<Person>()
  .itemCreator((a) => ({id: 'ID', extra: 42})); // a: Omit<Person, never>

const person = create({name: 'John', email: 'john.doe@foo.com'}); // error
`;

const code11 = `
class Store<T> {

    itemCreator<U>(
      // here I have used extra generic with default value
        generate: <P = Omit<T, keyof U>>(item: P) => U
    ): (item: Omit<T, keyof U>) => Omit<T, keyof U> & U {
        return item => ({ ...item, ...generate(item) });
    }
}
`;

const code12 = `
type Options<T = any> = {
    options: T[]
} & ({
    isMulti?: false
    onChange: (value: T) => void
} | {
    isMulti: true
    onChange: (value: T[]) => void
})
`;

const code13 = `
interface Option {
    value: string,
}

const a: Options<Option> = {
    // isMulti: false,
    options: [{
        value: 'abc',
    }],
    onChange: (value) => console.log(value)
}
`;

const code14 = `
type A<T> = {
    isMulti: false,
    onChange: (value: T) => any
}
type B<T> = {
    isMulti: true,
    onChange: (value: T[]) => any

}
type C<T> = {
    onChange: (value: T) => any
}
`;

const code15 = `
// credits goes to Titian Cernicova-Dragomir
//https://stackoverflow.com/questions/65805600/struggling-with-building-a-type-in-ts#answer-65805753
type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> =
    T extends any
    ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

type StrictUnion<T> = StrictUnionHelper<T, T>

type Unions<T> = StrictUnion<A<T> | B<T> | C<T>>
`;

const code16 = `

type Options<T = any> = {
    options: T[]
} & Unions<T>

interface Option {
    value: string,
}

const a: Options<Option> = {
    options: [{
        value: 'abc',
    }],

    // trick is here
    onChange: <T extends Option>(value: T) => {
        return value
    }
}
`;

const code17 = `
const b: Options<Option> = {
    isMulti: true,
    options: [{
        value: 'abc',
    }],
    onChange: <T extends Option[]>(value: T) => {
        return value
    }
}
const c: Options<Option> = {
    isMulti: false,
    options: [{
        value: 'abc',
    }],
    onChange: <T extends Option>(value: T) => {
        return value
    }
}

// error because if isMulti is false, value should be Option and not an array of Option
const d: Options<Option> = {
    isMulti: false,
    options: [{
        value: 'abc',
    }],
    // should be T extends Option instead of T extends Option[]
    onChange: <T extends Option[]>(value: T) => {
        return value
    }
}

a.onChange({ value: 'hello' }) // ok
b.onChange([{ value: 'hello' }]) // ok
c.onChange({ value: 'hello' }) // ok
c.onChange([{ value: 'hello' }]) // expected error
`;

const navigation = {
  infer_argument: {
    id: "infer_argument",
    text: "Infer function parameter",
  },
  cb_structure: {
    id: "cb_structure",
    text: "Data structure with callbacks",
  },
  infer_argument_and_return_value: {
    id: "infer_argument_and_return_value",
    text: "Infer argument and return value of callback",
  },
  callback_in_union: {
    id: "callback_in_union",
    text: "Callbacks in unions",
  },
  callback_in_union2: {
    id: "callback_in_union 2",
    text: "Callbacks in unions 2",
    
  },
};
const links = Object.values(navigation);

const code18 = `
type Main = {
    foo: string;
    bar: number;
};
`;

const code19 = `
type Validator<T extends keyof Main> = {
    key: T;
    isValid: (value: Main[T]) => boolean;
};

const validators: Array<MainValidationRule<keyof Main>> = [
    { key: 'foo', isValid: (value) => true }
]
`;

const code20 = `
type Values<T> = T[keyof T]

type MainValidationRule = Values<{
  [P in keyof Main]: {
    key: P;
    isValid: (value: Main[P]) => boolean;
  }
}>

const validators: Array<MainValidationRule> = [
  { key: 'foo', isValid: (value/* infered to stirng */) => true }
]
`;
const Callbacks: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.infer_argument} />
      <p>Let's say you have next function</p>
      <Code code={code1} />
      <p>
        It is simple. The argument of <Var>b</Var> function should be return
        value of <Var>a</Var>
        function. Let's try if it works:
      </p>
      <Code code={code2} />
      <p>
        But why we have an error here? Honestly - I don't understand it so good
        to be able explain it.
      </p>
      <p>
        <Anchor
          href={
            "https://stackoverflow.com/questions/65550146/how-typescript-infers-callbacks-arguments-type"
          }
          text={"Here"}
        />
        you can find why the error occurs
      </p>
      <p>
        To make it work, You should add an extra generic for <Var>b</Var>
        function.
      </p>
      <Code code={code3} />
      <Header {...navigation.cb_structure} />
      <p>Let's go to a bit complicated example</p>
      <p>Consider next data structure:</p>
      <Code code={code4} />
      <p>
        Our goal is to make sure that type of <Var>callback</Var> argument is
        the same as <Var>data</Var> property. So in this case, <Var>arg</Var>
        should be a <Var>number</Var>
      </p>
      <p>
        I have noticed, that many people have a problems with next construction.
      </p>
      <p>The thing is, TS unable to infer that type without helper function.</p>
      <p>Let's add it</p>
      <Code code={code5} />
      <p>Now, we can assume it work</p>
      <Code code={code6} />
      <p>But it still does not, if array have more than one element.</p>
      <Code code={code7} />
      <p>We ended up with strange intersection.</p>
      <p>
        Another interesting example you can find
        <Anchor
          href="https://stackoverflow.com/questions/65624892/define-return-type-of-a-function-in-dictionary-based-on-its-parameter-in-typescr"
          text="here,"
        />
        see question and comments to accepted answer
      </p>
      <p>This is how TS handles callback argument types.</p>
      <p>
        I'm not a fan of repeating things which was already explained of much
        smarter people, so
        <Anchor
          href="https://stackoverflow.com/questions/65129070/defining-an-array-of-differing-generic-types-in-typescript#answer-65129942"
          text="here"
        />
        you you can find an excellent explanation why we have such behaviour and
        how to handle it.
      </p>
      <p>Finally, working code:</p>
      <Code code={code8} />
      <p id="hello">
        <Anchor
          href="https://stackoverflow.com/questions/65644828/typescript-dependant-type-inference-with-variadic-tuple-types#answer-65654415"
          text="Here"
        />
        and
        <Anchor
          href="https://stackoverflow.com/questions/65698415/typing-and-validating-an-array-of-objects-of-unknown-shape"
          text="here"
        />
        you can find very similar cases, maybe it helps you.
      </p>
      <Header {...navigation.infer_argument_and_return_value} />
      <p>
        <Anchor
          href="https://stackoverflow.com/questions/66706012/infer-function-generic-type-u-from-return-value-of-passed-function"
          text="Here"
        />
        you can find another one interesting problem of callback typings.
      </p>
      <p>
        A function with a generic type may infer the generic types from the
        arguments in most cases. However, if an argument is a function where the
        generic type is both part of the arguments and the return value, the
        generic type is sometimes not inferred.
      </p>
      <Code code={code9} />
      <p>Above code works perfectly fine.</p>
      <p>
        But try to add an argument to <Var>itemCreator</Var> argument
      </p>
      <Code code={code10} />
      <p>You will get an error. I'm unable to explain why this happens.</p>
      <p>
        To make it work, you can just add extra generic with default value to
        <Var>itemCreator</Var> callback.
      </p>
      <Code code={code11} />
      <p>Btw, it is safe, you don't break any constraints.</p>
      <Header {...navigation.callback_in_union} />
      <p>Let's say you have simple union type</p>
      <Code code={code12} />
      <p>
        If <Var>isMulti</Var> is <Var>false</Var> or does not exists, callback
        argument is <Var>T</Var>
      </p>
      <p>
        If <Var>isMulti</Var> is <Var>true</Var>, callback argument is
        <Var>T[]</Var>.
      </p>
      <p>Pretty straitforward. But it is not that easy.</p>
      <p>Let's try to compile it:</p>
      <Code code={code13} />
      <p>
        TS is unable to infer <Var>value</Var> argument.
      </p>
      <p>Let's try to fix it.</p>
      <p>First of all, I want to make a small refactor.</p>
      <Code code={code14} />
      <p>
        Next, we should use
        <Anchor
          href="https://stackoverflow.com/questions/65805600/type-union-not-checking-for-excess-properties#answer-65805753"
          text="Titian Cernicova-Dragomir's"
        />
        helper.
      </p>
      <Code code={code15} />
      <p>If you don't understand next line:</p>
      <Code code={`type UnionKeys<T> = T extends T ? keyof T : never;`} />
      <p>
        Please read first two paragraphs of
        <Anchor
          href="https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types"
          text="docs"
        />
      </p>
      <p>So, finally, our type:</p>
      <Code code={code16} />
      <p>Let's test it</p>
      <Code code={code17} />
      <p>
        Original question
        <Anchor
          href="https://stackoverflow.com/questions/65028565/how-to-overload-optional-boolean-in-typescript"
          text="is here"
        />
      </p>
      <Header {...navigation.callback_in_union2} />
      <p>
        Let's say you want to make some validation logic for each key of object:
      </p>
      <Code code={code18} />
      <p>
        And you want to make array of validators. Believe me, such kind of
        questions are VERY popular:
      </p>
      <Code code={code19} />
      <p>
        As You see, <Var>{`(value) => true`} </Var>, argument <Var>value</Var>{" "}
        is inferred to <Var>string | number</Var> instead of <Var>string</Var>{" "}
      </p>
      <p>All we need is just to make union type of all possible values:</p>
      <Code code={code20} />
    </>
  );
};

export default Callbacks;
