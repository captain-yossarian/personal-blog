import React, { FC } from "react";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";
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

// non generic version 
type Keys = keyof typeof MyEnum
type Enumerate2 = keyof {
    [Prop in Keys]: Prop
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

const code7 = `
enum MyEnum {
  ONE, // 0
  TWO // 1
}

type EnumType = Record<string | number, string | number>

function handleEnum(enEnum: EnumType, index: number) {
  return enEnum[index]
}

const one = handleEnum(MyEnum, 0) // "ONE"
const two = handleEnum(MyEnum, 1) // "TWO"
`;

const code8 = `
/**
 * Represents any enum type
 */
type EnumType = Record<string | number, string | number>

type EnumToObj<Enum extends EnumType> = Pick<
  {
    [Prop in keyof Enum]: Enum[Prop] extends string | number ? \`${"${Enum[Prop]}"}\` : never
  }, keyof Enum
>

{
  // {
  //   readonly ONE: "0";
  //   readonly TWO: "1";
  // }
  type Test = EnumToObj<typeof MyEnum>
}
`;

const code9 = `
type GetEnumValue<
  Enum extends EnumType,
  Index extends number,
  Obj extends EnumToObj<Enum> = EnumToObj<Enum>
  > =
  {
    [Prop in keyof Obj]: \`${"${Index}"}\`  extends Obj[Prop] ? Prop : never
  }[keyof Enum];

{
  type Test = GetEnumValue<typeof MyEnum, 1> // TWO
}
`;

const code10 = `
// credits https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379091887
type IsNever<T> = [T] extends [never] ? true : false

type IsKeyValid<
  Index extends number,
  Enum extends EnumType
  > = IsNever<GetEnumValue<Enum, Index>> extends true ? never : Index

{
  type _ = IsKeyValid<1, typeof MyEnum> // 1
  type __ = IsKeyValid<2, typeof MyEnum> // never
}
`;

const code11 = `
enum MyEnum {
  ONE, // 0
  TWO // 1
}

/**
 * Obtains a union of all dictionary values
 */
type Values<T> = T[keyof T]


/**
 * Represents any enum type
 */
type EnumType = Record<string | number, string | number>

type EnumToObj<Enum extends EnumType> = Pick<
  {
    [Prop in keyof Enum]:
    (Enum[Prop] extends string | number
      ? \`${"${Enum[Prop]}"}\`
      : never)
  }, keyof Enum
>

{
  // {
  //   readonly ONE: "0";
  //   readonly TWO: "1";
  // }
  type Test = EnumToObj<typeof MyEnum>
}

type GetEnumValue<
  Enum extends EnumType,
  Index extends number,
  Obj extends EnumToObj<Enum> = EnumToObj<Enum>
  > =
  {
    [Prop in keyof Obj]:
    (\`${"${Index}"}\` extends Obj[Prop]
      ? Prop
      : never)
  }[keyof Enum];

{
  type Test = GetEnumValue<typeof MyEnum, 1> // TWO
}

type IsNever<T> = [T] extends [never] ? true : false

type IsKeyValid<
  Index extends number,
  Enum extends EnumType
  > =
  IsNever<GetEnumValue<Enum, Index>> extends true
  ? never
  : Index

{
  type _ = IsKeyValid<1, typeof MyEnum> // 1
  type __ = IsKeyValid<2, typeof MyEnum> // never
}

function handleEnum<
  Index extends number,
  Enum extends EnumType
>(
  enEnum: Enum,
  index: IsKeyValid<Index, Enum>
): GetEnumValue<Enum, Index>
function handleEnum<
  Index extends number,
  Enum extends EnumType
>(enEnum: Enum, index: IsKeyValid<Index, Enum>) {
  return enEnum[index]
}

const x = handleEnum(MyEnum, 0) // "ONE"
const y = handleEnum(MyEnum, 1) // "TWO"

handleEnum(MyEnum, 2) // expected error
handleEnum(MyEnum, 'ONE') // expected error
`;

const navigation = {
  safer_enum: {
    id: "safer_enum",
    text: "Validate enum key",
  },
  obtain_enum_by_key: {
    id: "obtain_enum_by_key",
    text: "Infer enum value by key",
    updated: true,
  },
};

const links = Object.values(navigation);

const SafeEnum: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.safer_enum} />

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
      <p>
        P.S. I hope you have noticed <Var>Enumerate2</Var>. This is interesting
        behavior. Seems that <Var>keyof SomeObj</Var> acts differently inside
        iteration loop and outside. See related{" "}
        <Anchor
          href="https://stackoverflow.com/questions/69523580/typescript-keyof-change-the-origin-property-optional/69524091#69524091"
          text="issue"
        />
      </p>
      <Header {...navigation.obtain_enum_by_key} />
      <p>
        Consider similar example with enum, but now, we need to infer enum value
        by key. See this example:
      </p>
      <Code code={code7} />
      <p>
        I'm not saying that this is preferred way of working with enums. I just
        want to show you how to infer return type.
      </p>
      <p>
        Let's try to validate whether index is allowed or not in a different way
        than we did it in previous section. We can convert our enum to regular
        object
      </p>
      <Code code={code8} />
      <p>
        I have wrapped <Var>Enum[Prop]</Var> into template literal strings
        because in this way we can break enum bindings and TS will treat it as a
        regular property
      </p>
      <p>
        In order to obtain enum value by numerical key, we can use this utility
      </p>
      <Code code={code9} />
      <p>
        <Var>GetEnumValue</Var> iterates through all keys of converted enum and
        checks whether provided <Var>Index</Var> extends object value. Remember,
        that converted enum looks like this <Var>{`readonly ONE: "0";`}</Var>
      </p>
      <p>
        If you are curious why I have used <Var>[keyof Enum]</Var> at the end,{" "}
        <Anchor
          href="https://stackoverflow.com/questions/70608257/retrieve-subset-of-object-where-string-values-start-with-given-string/70608410#70608410"
          text="here"
        />
        you can find thorough explanation
      </p>
      <p>
        Now, we can validate enum key. Be aware that if <Var>GetEnumValue</Var>{" "}
        returns <Var>never</Var> it means that key is not exists. So, we need
        just check whether it is <Var>never</Var> or not
      </p>
      <Code code={code10} />
      <p>Whole example</p>
      <Code code={code11} />
      <p>
        <Anchor href="https://tsplay.dev/NBeo4w" text="Playground" />
      </p>
    </>
  );
};

export default SafeEnum;
