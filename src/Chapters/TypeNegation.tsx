import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";

const code1 = `
const notArray = <T,>(arg: T extends Array<any> ? never : T) => arg

const test1 = notArray(1) // ok
const test2 = notArray('string') // ok
const test3 = notArray([]) // error
const test4 = notArray([1]) // error
`;

const code2 = `

type Not<T, R> = R extends T ? never : R;

type Test1 = Not<Array<any>, 1> // ok
type Test2 = Not<Array<any>, []> // never
`;

const code3 = `
type NonEmptyString<T extends string> = T extends '' ? never : T;

type WithName = {
  dogName: string,
  canBark: true,
}

type WithoutName = {
  dogName?: '',
  canBark: false
};

type Animal = WithName | WithoutName;


type Overloadings =
  & ((arg: { canBark: false }) => Animal)
  & ((arg: { dogName: '', canBark: false }) => Animal)
  & (<S extends string>(arg: { dogName: NonEmptyString<S>, canBark: true }) => Animal)

const animal: Overloadings = (arg: Animal) => {
  return arg

}

const x = animal({ dogName: '', canBark: false }) // ok
const xx = animal({ dogName: 'a', canBark: true }) // ok
const xxx = animal({ dogName: 'a', canBark: false }) // error
const xxxx = animal({ dogName: '', canBark: true }) // error
const xxxxx = animal({ canBark: true }) // error
const xxxxxx = animal({ canBark: false }) // ok
`;

const code4 = `
type A = string | null; // Valid
type B = CustomInterface | undefined; // Valid;
type C = string; // Invalid;
type D = CustomInterface // Invalid
`;

const code5 = `
const a: A = Math.floor(Math.random() * 11) <= 5 ? 'a' : null;
const b: B = Math.floor(Math.random() * 11) <= 5 ? { foo: 42 } : undefined;
const c: C = 'c';
const d: D = { foo: 42 }
`;

const code6 = `
function assertDefined<T>(
    value: T,
    ...nullable: T extends null | undefined ? [] : [never]) {
}
`;
const code7 = `

interface CustomInterface {
    foo: number;
}


type A = string | null; // Valid
type B = CustomInterface | undefined; // Valid;
type C = string; // Invalid;
type D = CustomInterface // Invalid


type ShouldBeNonNullable<T> = T extends null | undefined ? T : never;
type Result = ShouldBeNonNullable<A>


function assertDefined<T>(
    value: T,
    ...nullable: T extends null | undefined ? [] : [never]) {
}


const a: A = Math.floor(Math.random() * 11) <= 5 ? 'a' : null;
const b: B = Math.floor(Math.random() * 11) <= 5 ? { foo: 42 } : undefined;
const c: C = 'c';
const d: D = { foo: 42 }

assertDefined(a); // ok
assertDefined(b); // ok
assertDefined(c); // error
assertDefined(d); // error
assertDefined(d, 2); // still error,
`;

const code8 = `
type Entity = {
      a: string;
      b: string;
      c: \`${"${Entity['a']} ${Entity['b']}"}\`
    }
`;

const code9 = `
type IsValid<T> = T extends { a: string; b: string }
  ? T extends {
      a: string;
      b: string;
      c: \`${"${T['a']} ${T['b']}"}\`
    }
    ? T
    : never
  : never;

const makeArr = <T>(arr: IsValid<T>[]) => arr;

makeArr([
  {
    a: "1",
    b: "2",
    c: "1 2",
  },
  {
    a: "3",
    b: "4",
    c: "any", // error
    d: "s",
  },
]);
`;

const code10 = `
type BanProperty<Obj, Prop extends PropertyKey> = Obj extends Record<
  Prop,
  unknown
>
  ? never
  : Obj;

const makeArr = <T>(arr: BanProperty<IsValid<T>, "d">[]) => arr;
`;
const navigation = {
  simple: {
    id: "type_negation",
    text: "Type negation",
  },
  with_overloadings: {
    id: "negation_overloadings",
    text: "Negation of empty string",
  },
  union_constraints: {
    id: "union_constraints",
    text: "Union constraints",
    updated: true,
  },
  generic_constraints: {
    id: "generic_constraints",
    text: "Generic constraints",
    updated: true,
  },
};
const links = Object.values(navigation);

const TypeNegation: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.simple} />
      <p>
        From time to time I see questions on SO about type negation constraints.
      </p>
      <p>
        I mean, ppl are looking for way to negate some type. For example there
        is <Var>not</Var> keyword in Python or more common <Var>!</Var>
        (exclamation mark) in other languages.
      </p>
      <p>Why there is no similar operator for types in TypeScript?</p>
      <p>I can't answer why, but I can help you to emulate such behavior.</p>
      <p>
        It is pretty easy.
        <Anchor
          text="Here"
          href="https://stackoverflow.com/questions/66745644/generic-argument-constrained-to-be-non-array#answer-66745744"
        />
        you can find related question.
      </p>
      <Code code={code1} />
      <p>More generic way</p>
      <Code code={code2} />
      <p>
        The whole trick is in <Var>never</Var> type.
      </p>
      <p>
        If provided type extends type that you want to forbid, it will return{" "}
        <Var>never</Var>.
      </p>
      <p>
        Hence, TS will not allow this argument, since it is impossible to
        provide argument with <Var>never</Var> type.
      </p>
      <Header {...navigation.with_overloadings} />
      <p>
        If you are interested in more advanced use case, with some unions and
        overloadings, please see next
        <Anchor
          text="example"
          href="https://stackoverflow.com/questions/66828502/conditional-type-based-on-a-non-empty-string#answer-66835100"
        />
        . Here we are trying to negate empty string.
      </p>
      <p>Constraints:</p>
      <ul>
        <li>If dogName is empty string or unset, canBark should be false</li>
        <li>If dogName is not empty string, canBark should be true</li>
      </ul>
      <Code code={code3} />
      <Header {...navigation.union_constraints} />
      <p>
        Assume, you want to allow only nullable types. I mean
        <Var>string | null</Var>, or <Var>number|undefined</Var>.
      </p>
      <Code code={code4} />
      <p>
        In order to do it we can use very useful <Var>Never trick</Var>.
      </p>
      <p>Let's define our variables:</p>
      <Code code={code5} />
      <p>Our function with constraints:</p>
      <Code code={code6} />
      <p>
        In order to achieve desired behavior I used rest operator. It means
        that, if <Var>T</Var> can be either <Var>null</Var> or
        <Var>undefined</Var> - <Var>...nullable</Var> evaluates to empty array,
        what means that there is no second argument. Otherwise{" "}
        <Var>...nullable</Var> evaluates to 1 element array <Var>[never]</Var>.
      </p>
      <p>
        Is it possible in this case to pass second argument ? No! You can't do
        smth like that in TS. never means never :D So, even if you pass second
        argument it is still error.
      </p>
      <p>
        Please keep in mind, that <Var>assertDefined(d, 2 as never);</Var> is
        perfectly valid from TS point of view.
      </p>
      <p>Whole code:</p>
      <Code code={code7} />
      <p>
        <Anchor
          text="Playground"
          href="https://www.typescriptlang.org/play?ts=4.3.0-beta#code/FASwdgLgpgTgZgQwMZQAQGECuBnCB7AWwElJZEVUBvYVW1OPPALlTEwICNYBuYAX2CCIATwAOaAIKoAvKlwxwAc1QAfVpgA2G7qgD0u1ADUEGkABNgI8agBCMjDnzFS8ZGjWYwZqHHBQzOvpGJua8Vmjo9vJKgQYkAG4hAZZiaAAi9li4hCTQrhRBCUmCKdYAygAWeJpmNlAAcnhg9ZoaCBwaUAA8ACoAfPY9qFAAHtBe2Opaqqie3r5g-qgA-KhDLIvxPKVoAEpQ2JoQ9pXVGrUNTS1a7Z1dEn0lcJ5IECBNqAjY2LAQaT5+My9PoAChodESGkwUBYPQANODaAA6FFsG4dGFrYZjKATKYaGZzAGLMwrVAAbQAuqgWOTNrBKQBKKj8EpIJq4T4sKSyACyCAgFSRcA0jBgIP5gqRMAQXkIIOZACpUABGFXMrqyACsZIA5AhdTT8bx2WBORwWHY+QKhSKxRKbdLZWZ5UrVerUJrUDrVpR6IwWAAWABMqD4RqJC38Jo5xyQLEisl1SF1MbNxzMLAysj9DGYqBDYcEXx+MD+xP8IIQjNiqDwAGtgCXfv8o2YQRwa3oDA2m98WxX20gu0FYDA8DA+6Xy22QWYRwYxxOpwPZ2Y4ahgwu5G9pkuYAjBEA"
        />
      </p>
      <Header {...navigation.generic_constraints} />
      <p>
        Say we have a function which expects an array with next constraints:
      </p>
      <ul>
        <li>
          <p>
            - each object in array should have <Var>a</Var>,<Var>b</Var> and{" "}
            <Var>c</Var> properties
          </p>
        </li>
        <li>
          <p>
            - <Var>c</Var> property should consists of concatenated <Var>a</Var>{" "}
            and <Var>b</Var> string properties
          </p>
        </li>
      </ul>
      <Code code={code8} />
      <p>
        Solution was provided by{" "}
        <Anchor
          href="https://stackoverflow.com/questions/68235338/making-arrays-of-generic-interfaces#68236225"
          text="aleksxor"
        />{" "}
        user
      </p>
      <Code code={code9} />
      <p>
        If you want to apply more constraints just wrap your validator into
        another one.
      </p>
      <p>
        Let's say You want to disallow <Var>d</Var> property
      </p>
      <Code code={code10} />
    </>
  );
};

export default TypeNegation;
