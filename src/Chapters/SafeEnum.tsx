import React, { FC } from "react";
import { Var } from "../Layout";
import Code from "../Shared/Code";
import { Anchor } from "../Shared/Links";

const code1 = `
enum MyEnum {
    ONE,
    TWO
}

const handleEnum = (value: MyEnum) => value

/**
 * Crazy tests
 */
handleEnum(Infinity) // ok
handleEnum(0.0000001) // ok
handleEnum(NaN) // ok
handleEnum(-0 + 0) // ok
handleEnum(Math.PI) // ok
`;

const code2 = `
{
    "0": "ONE",
    "1": "TWO",
    "ONE": 0,
    "TWO": 1
}
`;

const code3 = `
enum MyEnum {
    ONE,
    TWO
}

type Enumerate<Enum extends number | string> = keyof {
    [Prop in Enum]: Prop
}

type Result = Enumerate<MyEnum> // MyEnum, not good
`;

const code4 = `
enum MyEnum {
    ONE,
    TWO
}

type Enumerate<Enum extends number | string> = keyof {
    [Prop in \`${"${Enum}"}\`]: Prop
}

type Result = Enumerate<MyEnum> // "0" | "1"
`;

const code5 = `
enum MyEnum {
    ONE, // 0
    TWO // 1
}

type IsKeyValid<
    InitialValue extends number,
    Enum extends Record<string | number, string | number>
    > =
    \`${"${InitialValue}"}\ extends Enumerate<Values<Enum>>
    ? InitialValue
    : never

type Test0 = IsKeyValid<1, typeof MyEnum> // 1
type Test1 = IsKeyValid<42, typeof MyEnum> // never
type Test2 = IsKeyValid<-1, typeof MyEnum> // never
`;

const code6 = `
enum MyEnum {
    ONE, // 0
    TWO // 1
}

type Enumerate<Enum extends number | string> = keyof {
    [Prop in \`${"${Enum}"}\`]: Prop
}

type Values<T> = T[keyof T]

type IsKeyValid<
    InitialValue extends number,
    Enum extends Record<string | number, string | number>
    > =
    \`${"${InitialValue}"}\ extends Enumerate<Values<Enum>>
    ? InitialValue
    : never

const handleEnum = <
    Enum extends Record<string | number, string | number>,
    InitialValue extends number,
    >(anEnum: Enum, initialState: IsKeyValid<InitialValue, Enum>) => { }

handleEnum(MyEnum, MyEnum.ONE) // ok
handleEnum(MyEnum, 0) // ok
handleEnum(MyEnum, 1) // ok

handleEnum(MyEnum, -1) // error
handleEnum(MyEnum, NaN) // error
handleEnum(MyEnum, Infinity); // error
handleEnum(MyEnum, 0.0000001); // error
handleEnum(MyEnum, NaN); // error
handleEnum(MyEnum, (-0 + 0)); // error
handleEnum(MyEnum, Math.PI); // error
`;

const SafeEnum: FC = () => {
  return (
    <>
      <p>
        In this article you will learn how to make numerical <Var>enum</Var> a
        bit safer.
      </p>
      <p>
        We all know, that numerical <Var>enums</Var> are unsafe because function
        which expects an <Var>enum</Var> argument allows you to pass any number.
        See example:
      </p>
      <Code code={code1} />
      <p>
        This behavior is well known. <Var>MyEnum</Var> compiles to:
      </p>
      <Code code={code2} />
      <p>
        So, in order to make <Var>handleEnum</Var> function a bit safer we need
        to assure TS that argument can be either <Var>0</Var> or <Var>1</Var>.
        In other words, we should expect a union <Var>0|1</Var>.
      </p>
      <p>
        To make it work, we need to obtain <Var>MyEnum</Var> keys or values and
        retrieve numerical props. Sounds easy.
      </p>
      <Code code={code3} />
      <p>
        Oooops! It does not work. TypeScript is smart enough to figure out that{" "}
        <Var>keyof Enum</Var> is still a valid <Var>enum</Var>. We need to break
        this relation.
      </p>
      <p>
        We can wrap <Var>Prop</Var> in a template string.
      </p>
      <Code code={code4} />
      <p>
        It works, but we need a <Var>numbers</Var> instead of <Var>strings</Var>
        . It is impossible to obtain/infer a <Var>number</Var> from the{" "}
        <Var>string</Var>. If you are interested in <Var>number</Var>{" "}
        manipulation you can take a look on
        <Anchor
          text="this"
          href="https://stackoverflow.com/questions/69089549/typescript-template-literal-type-how-to-infer-numeric-type"
        />{" "}
        answer or my
        <Anchor text="article" href="https://catchts.com/range-numbers" />.
      </p>
      <p>
        From the other hand, it is possible to stringify any literal{" "}
        <Var> number</Var> type in TypeScript. Small example:
        <Var>{"`${42}`"}</Var>. It means that we can compare any stringified
        number with string.
      </p>
      <Code code={code5} />
      <p>
        Above code returns passed generic argument if it is a valid key for
        passed <Var>enum</Var>, otherwise it returns <Var>never</Var>.
      </p>
      <p>Let's see the whole code:</p>
      <Code code={code6} />
      <p>
        <Anchor
          text="Here"
          href="https://stackoverflow.com/questions/62268023/how-to-type-function-taking-an-enum#answer-69465829"
        />{" "}
        you can find related answer.
      </p>
    </>
  );
};

export default SafeEnum;
