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
const navigation = {
  simple: {
    id: "type_negation",
    text: "Type negation",
  },
  with_overloadings: {
    id: "negation_overloadings",
    text: "Negation of empty string",
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
    </>
  );
};

export default TypeNegation;
