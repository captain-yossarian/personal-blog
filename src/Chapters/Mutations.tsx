import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Link } from "react-router-dom";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
type User = {
    name: string;
}
`;

const code2 = `
type User = {
    name: string;
}

type User1 = User & {
    name: number;
}

type User2 = {
    [P in keyof User]: P extends 'name' ? number : User[P]
}

type User3 = Omit<User, 'name'> & { name: number }
`;

const code3 = `
type Type = {
    name: string
}

type SubTypeA = Type & {
    salary: string
}

type SubTypeB = Type & {
    car: boolean
}

type Extends<T, U> =
    T extends U ? true : false


let employee: SubTypeA = {
    name: 'John Doe',
    salary: '1000$'
}

let human: Type = {
    name: 'Morgan Freeman'
}

let student: SubTypeB = {
    name: 'Will',
    car: true
}


// same direction
type Covariance<T> = {
    box: T
}

let employeeInBox: Covariance<SubTypeA> = {
    box: employee
}

let humanInBox: Covariance<Type> = {
    box: human
}

/**
 * MUTATION 
 */
let test: Covariance<Type> = employeeInBox

test.box = student // mutation of employeeInBox

// while result_0 is undefined, it is infered a a string
const result_0 = employeeInBox.box.salary 


/**
 * MUTATION
 */
let array: Array<Type> = []
let employees = [employee]
array = employees
array.push(student)

// while result_1  is [string, undefined], it is infered as string[]
const result_1 = employees.map(elem => elem.salary) 
`;

const code4 = `
type Covariance<T> = {
   readonly box: T
}

let array: ReadonlyArray<Type> = []
`;

const code5 = `
type Obj = {
    tag: string;
    count?: number;
}

const obj:Obj={
    tag:'tag'
}
delete obj.tag // error, tag is required property, even if it is mutable

Reflect.deleteProperty(obj, 'tag'); // unfortunatelly is allowed

delete obj.count // allowed
`;

const code6 = `
interface InjectMap {
    "A": "B",
    "C": "D"
}
type InjectKey = keyof InjectMap;

const input: Partial<InjectMap> = {};
const output: Partial<InjectMap> = {};

const keys: InjectKey[] = []


for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    const inp = input[key] // "B" | "D" | undefined
    const out = output[key] // "B" | "D" | undefined

    output[key] = input[key] // error
    
}
`;

const code7 = `
type KeyType_ = "B" | "D" | undefined

let keyB: KeyType_ = 'B';
let keyD: KeyType_ = 'D'

output[keyB] = input[keyD] // Boom, illegal state! Runtime error!
`;

const code8 = `
const foo = <T extends { [key: string]: any }>(obj: T) => {
    obj['a'] = 2 // error
}
`;

const code9 = `
let index: { [key: string]: any } = {}

let immutable = {
    a: 'a'
} as const

let record: Record<'a', 1> = { a: 1 }

index = immutable // ok
index = record // ok

const foo = <T extends { [key: string]: any }>(obj: T) => {
    obj['a'] = 2 // error

    return obj
}

const result1 = foo(immutable) //  unsound, see return type 
const result2 = foo(record) // unsound , see return type
`;

const code10 = `
let index: { [key: string]: any } = {}

let immutable = {
  a: 'a'
} as const

let record: Record<'a', 1> = { a: 1 }

index = immutable // ok
index = record // ok

const foo = <T extends { [key: string]: any }>(obj: T) => {
  Reflect.deleteProperty(obj, 'a')

  return obj
}

const result1 = foo(immutable) //  unsound, see return type 
const result2 = foo(record) // unsound , see return type
`;

const code11 = `
const paths = ['a', 'b'] as const

type Path = typeof paths[number]

type PathMap = {
    [path in Path]: path
}

const BASE_PATHS = paths.reduce((map: PathMap, p: Path) => {
    let x = map[p]
    map[p] = p // same here
    return map
}, {} as PathMap)
`;

const code12 = `
type a = 'a'
type b = 'b'

type c = a & b // never

`;

const code13 = `
type DescribableFunction = {
  description: string;
  (): boolean;
};

// error
const fn: DescribableFunction = () => true

// fn.description = 'hello';
`;
const navigation = {
  first: {
    id: "first",
    text: "First example",
  },
  second: {
    id: "second",
    text: "Second example",
  },
  third: {
    id: "third",
    text: "Third example",
    updated: true,
  },
};
const links = Object.values(navigation);

const Mutations: FC = () => (
  <>
    <HeaderNav links={links} />
    <p>
      In this article, I will describe some problems you can encounter mutating
      the objects in typescript.
    </p>
    <p>
      I have noticed that few people on StackOverflow had issues with mutations
      in typescript. Most of the time, it looks like a bug for us, but it is
      not.
    </p>
    <p>Let's start from type system itself.</p>
    <Code code={code1} />
    <p>Is it possible to mutate this type?</p>
    <p>
      How would you change the type of <Var>name</Var> property to{" "}
      <Var>number</Var>?
    </p>
    <p>There are several ways to do this:</p>
    <Code code={code2} />
    <p>As you see, non of them mutate the type, only overrides the property.</p>
    <p>
      I believe this is the most natural way of dealing with objects in
      TypeScript.
    </p>

    <p>
      First and foremost, you should definitely watch
      <Anchor
        text="Titian-Cernicova-Dragomir 's"
        href="https://www.youtube.com/watch?v=RH49aarW6sU"
      />
      talk about covariance and contravariance in TypeScript.
    </p>
    <p>
      If you don't have a time, take a look at my
      <Anchor
        text="question"
        href="https://stackoverflow.com/questions/66410115/difference-between-variance-covaraince-contravariance-and-bivariance-in-typesc"
      />
      and this example, which is shamelessly stolen from Titian's talk
    </p>
    <Code code={code3} />
    <p>
      <Anchor text="Playground" href="https://bit.ly/34VF9FZ" />
    </p>
    <p>
      If you are curious how to avoid such behavior, all you need is to make
      values immutable.
    </p>
    <p>
      Try to add <Var>readonly</Var> flag to <Var>Covariance</Var> and use{" "}
      <Var>ReadonlyArray</Var>
    </p>
    <Code code={code4} />
    <p>
      However, if you are planning to mutate your objects, you should be aware
      about some issues you can face.
    </p>
    <Header {...navigation.first} />
    <p>First example:</p>
    <Code code={code6} />
    <p>It is might be not obvious, but this is expected behavior.</p>
    <p>
      While both <Var>input</Var> and <Var>output</Var> share same type, they
      could have different value.
    </p>
    <Code code={code7} />
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/67857960/how-to-selectively-assign-from-one-partial-to-another-in-typescript/67860407#67860407"
        text="Here"
      />
      you can find above example
    </p>
    <Header {...navigation.second} />
    <p>Second example:</p>
    <Code code={code8} />
    <p>
      This behavior is expected, because mutating the arguments can lead to
      runtime errors.
    </p>
    <Code code={code9} />
    <p>
      As you see, TS has some mechanisms to avoid unsound mutations. But,
      unfortunately, it is not enough.
    </p>
    <p>
      Try to use <Var>Reflect.deleteProperty</Var>
    </p>
    <Code code={code10} />
    <p>
      Unfortunately, there is no error.
      <Anchor
        text="Here"
        href="https://stackoverflow.com/questions/67834191/why-can-i-index-by-string-to-get-a-property-value-but-not-to-set-it/67836124#67836124"
      />
      you can find related question/answer
    </p>
    <Header {...navigation.third} />
    <p>Consider next example:</p>
    <Code code={code11} />
    <p>
      You see the error here because objects are contravariant in their key
      types
    </p>
    <p>What does it mean ???</p>
    <p>
      Multiple candidates for the same type variable in contra-variant positions
      causes an intersection type to be inferred.
    </p>
    <Code code={code12} />
    <p>
      <Anchor
        text="Here"
        href="https://github.com/microsoft/TypeScript/pull/30769"
      />{" "}
      you can find official explanation
    </p>
    <p>
      This is why, in above examples, we have
      <Var>Type 'string' is not assignable to type 'never'</Var>
    </p>
    <p>
      <Anchor
        text="Here"
        href="https://stackoverflow.com/questions/67660342/why-does-typescript-say-this-variable-is-referenced-directly-or-indirectly-in-i"
      />
      you can find another good example when TS is not happy about mutations
    </p>
    <p>
      So, if you want to mutate your variable, please check if you don't break
      anything :)
    </p>
    <p>P.S. It turns out that TypeScript can track mutations in this case:</p>
    <Code code={code13} />
    <p>
      If you uncomment last line you will see that error will disappear. More
      about this feature you can read{" "}
      <Anchor
        text="here"
        href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html#properties-declarations-on-functions"
      />{" "}
    </p>
    <p>
      <Anchor
        text="Related question"
        href="https://stackoverflow.com/questions/68643123/why-does-typescript-track-mutation-of-function-static-properties"
      />
    </p>
  </>
);

export default Mutations;
