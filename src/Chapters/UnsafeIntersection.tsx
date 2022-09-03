import React, { FC } from "react";
import Code from "../Shared/Code";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";
import { Var } from "../Layout";

const code1 = `
type StringItem = string;

type ObjectItem = {
    id?: number
    name?: string
}

type Base = {
    version: string
    list: ObjectItem[];
}

/**
 * Replace [version], use [number] instead of [string] 
 * Very straightforward
 */
export type ResultType =
    Omit<Base, 'version'> & { version: number } // #1


export interface Data {
    list: Array<StringItem>;
}

const builder = (data: Array<Data>): ResultType[] => {
    const result = data.map((elem) => ({
        list: elem.list, // #2 
        version: 2,
    }))
    // you might expect an erro here because ResultType list 
    // property is an object and elem.list is a string
    return result // #3 
}
`;

const code2 = `

type Foo = {
    age?: number;
    name?: string;
    surname?: string
}

type AtLeastOne<
    Obj,
    Keys extends keyof Obj = keyof Obj
    > =
    (Keys extends any
        ? Required<Pick<Obj, Keys>> & Omit<Obj, Keys>
        : never)

type Result = AtLeastOne<Foo>

{
    const _: AtLeastOne<Foo> = {} // expected error
    const __: AtLeastOne<Foo> = { age: 2 } // ok
    const ___: AtLeastOne<Foo> = { age: 2, name: 'John', surname: 'Doe' } // ok
}
`;

const code3 = `
declare let withString: {
  list: string[];
  version: number;
}[]

declare let withObject: ResultType[]

withString = withObject // error

/**
 * object where list peoprty is an array of strings
 * is assignable to object where list property is an
 * array of possible empty objects
 */
withObject = withString // ok
`;

const code3_1 = `
declare let str: string
declare let y: {}

str = obj // error
obj = str // ok
`;

const code4 = `
// .....

export type ResultType = {
    version: number
    list: ObjectItem[];
}

// .....

const builder = (data: Array<Data>): ResultType[] => {
    const result = data.map((elem) => ({
        list: elem.list,
        version: 2,
    }))
    return result // error
}
`;

const code5 = `

// .....

type Base = {
    version: number
    list: ObjectItem[];
}

export type ResultType = Base & {
    version: number
    list: ObjectItem[];
}


// .....

const builder = (data: Array<Data>): ResultType[] => {
    const result = data.map((elem) => ({
        list: elem.list, // #2 
        version: 2,
    }))
    return result // NO ERROR !
}
`;

const code6 = `
export type ResultType =
    & {
        version: number
        list: ObjectItem[];
    }
    & {
        version: number
        list: ObjectItem[];
    }
`;

const code7 = `
const builder = (data: Array<Data>): ResultType[] => {
    const result = data.map((elem): ResultType => ({  // <----- change is here, added explicit return type
        list: elem.list, // error, as expected
        version: 2,
    }))
    return result
}

`;

const code8 = `
interface OldResponse {
    id: string, // NOT OPTIONAL

    name?: string,
    hashmap?: Record<string, string>,
    objects?: Array<{ id: string }>
}

interface NewResponse {
    id: string, // NOT OPTIONAL

    subsettings?: Record<string, string>,
    dictionary?: Array<{ id: string }>
}


const obj: OldResponse = {
    id: '#42',
    name: 'john',
    hashmap: {},
    objects: [{ id: 'a' }]
}


const makeRequest = (data: NewResponse) => { }

makeRequest(obj) // ok
`;

const code9 = `
interface OldResponse {
    id: string,
    name?: string,
    hashmap?: Record<string, string>,
    objects?: Array<{ id: string }>
}

interface NewResponse {
    id: string,
    subsettings?: Record<string, string>,
    dictionary?: Array<{ id: string }>
}


type Without<T> = {
    [P in keyof T]?: never
}


type Except =
    & NewResponse
    & Without<Omit<
        OldResponse, keyof OldResponse & keyof NewResponse>
    >

const obj: OldResponse = {
    id: '#42',
    name: 'john',
    hashmap: {},
    objects: [{ id: 'a' }]
}

const newResponse: NewResponse = {
    id: '#42',
    subsettings: {},
    dictionary: [{ id: 'a' }]
}
const makeRequest = (data: Except) => { }

makeRequest(obj) // error

makeRequest(newResponse) // ok
`;
const navigation = {
  unsafe_intersection: {
    id: "unsafe_intersection",
    text: "Unsafe intersection",
  },
  unsafe_optional_properties: {
    id: "unsafe_optional_properties",
    text: "Object with almost all partial props",
  },
} as const;
const links = Object.values(navigation);

const UnsafeIntersection: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.unsafe_intersection} />
      <p>Please consider this example:</p>
      <Code code={code1} />
      <p>
        <Var>ResultType</Var> - is used for replacing <Var>version</Var>{" "}
        property (from string to number)
      </p>
      <p>
        <Var>ObjectItem</Var> - please keep in mind that making each proeprty
        optional is not the best solution, however, sometimes, we have to live
        with such interfaces. Please see{" "}
        <Anchor
          href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html#weak-type-detection"
          text="Weak type detection"
        />
      </p>

      <p>
        Take a look on line with <Var>#2</Var>. I would expect there an error
        because return type of <Var>builder</Var> is <Var>ResultType[]</Var> -
        an array of objects where property <Var>list</Var> is{" "}
        <Var>ObjectItem</Var> which has two optional properties: <Var>id</Var>
        and <Var>name</Var>, whereas <Var>elem.list</Var> is an array of
        strings.
      </p>
      <Code code={code3} />
      <p>Simplified version</p>
      <Code code={code3_1} />

      <p>
        However, this is not the case. We don't have an error in our example
        because of intersection in <Var>ResultType</Var>. I know, it is
        weird, this is why I have wrote this article.
      </p>
      <p>
        Let's try to rewrite <Var>ReturnType</Var>, without <Var>Omit</Var> and intersection.
      </p>
      <Code code={code4} />
      <p>
        {" "}
        As you might have noticed <Var>ResultType</Var> is without intersection
        now, and it works, you are getting an error. Things get more
        interesting, when you intersect it with itself.
      </p>
      <p>
        As you probably know, TypeScript has structural type system, it means
        that <Var>ResultType</Var> intersects two equal types, hence such
        intersection just can't affect type. Unfortunatelly it affects
      </p>
      <Code code={code5} />
      <p>You can even try this</p>
      <Code code={code6} />
      <p>
        You can experiment. You will notice, that with intersection, there is no
        error and without intersection it works as expected (with error)
      </p>
      <p>
        In order to make this code safer, you can forbid using all optional
        properties in interface/type, or provide explicit type for{" "}
        <Var>Array.prototype.map</Var> callback, like this:
      </p>
      <Code code={code7} />
      <p>
        <Anchor
          href="https://github.com/microsoft/TypeScript/issues/50608"
          text="Here"
        />{" "}
        you can find an issue I have created and{" "}
        <Anchor
          href="https://stackoverflow.com/questions/73580368/why-doesnt-typescript-complain-about-an-incorrect-return-type"
          text="here"
        />{" "}
        my question on stackoverflow
      </p>
      <p>
        Offtopic. There is a workaround for <Var>ObjectItem</Var>. If you want
        to have at least one property defined, you can use this utility type:
      </p>
      <Code code={code2} />
      <Header {...navigation.unsafe_optional_properties} />
      <p>
        Let's consider another example, where object has all optional proeprties
        except one.
      </p>
      <Code code={code8} />
      <p>
        <Var>makeRequest</Var> function expects <Var>NewRequest</Var>, however,{" "}
        <Var>OldRequest</Var> is still assignable. This is because they both
        have same required property <Var>id</Var> and rest are optional. So ,
        from structural point of view, these types are assignable to each other.
      </p>
      <p>
        Please see{" "}
        <Anchor
          href="https://stackoverflow.com/questions/65805600/type-union-not-checking-for-excess-properties#answer-65805753"
          text="this"
        />{" "}
        question for more information about such assignability.
      </p>
      <p>
        If you want to emphasize that <Var>makeRequest</Var> should not accept{" "}
        <Var>OldRequest</Var> type, you can use <Var>never</Var>
      </p>
      <Code code={code9} />
      <p>
        <Var>NewRequest</Var> has also all properties from <Var>OldRequest</Var>{" "}
        however they are optional and type of the value is <Var>never</Var>
      </p>
      <p>
        If you are interested in safe typescript, you can check{" "}
        <Anchor
          href="https://catchts.com/safer-types"
          text="my previous article"
        />
      </p>
    </>
  );
};
export default UnsafeIntersection;
