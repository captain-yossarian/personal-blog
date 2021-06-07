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

const navigation = {
  first_argument: {
    id: "first_argument",
    text: "First argument",
  },

  strict_to_general: {
    id: "strict_to_general",
    text: "Convert strict type to more general",
  },
};
const links = Object.values(navigation);

const Mutations: FC = () => (
  <>
    <HeaderNav links={links} />
    <p>I think object mutation is ok.</p>
    <p>If you also think that way - keep reading ))</p>
    <p>
      In this article, I will describe all problems you can encounter mutating
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
      However, TypeScript is smart enough to prevent some issues related to
      mutations.
    </p>
    <p>Consider next example:</p>
    <Code code={code5} />
  </>
);
// https://stackoverflow.com/questions/67857960/how-to-selectively-assign-from-one-partial-to-another-in-typescript/67860407#67860407
// https://stackoverflow.com/questions/67834191/why-can-i-index-by-string-to-get-a-property-value-but-not-to-set-it/67836124#67836124
// https://stackoverflow.com/questions/67660342/why-does-typescript-say-this-variable-is-referenced-directly-or-indirectly-in-i
// https://stackoverflow.com/questions/66410115/difference-between-variance-covaraince-contravariance-and-bivariance-in-typesc
export default Mutations;
