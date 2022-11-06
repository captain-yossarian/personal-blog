import React, { FC } from "react";
import Code from "../Shared/Code";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";
import { Var } from "../Layout";

const code1 = `
type UpLetters = 'A' | 'B' | 'C' // provide all allowed letters
type LowLetters = Lowercase<UpLetters>

type Letters = UpLetters | LowLetters

type IsAllowed<T extends string> = T extends Letters ? T extends Lowercase<T> ? T : never : never

const lower = <T extends string>(str: IsAllowed<T>) => null

/**
 * Ok
 */
lower('a') // ok

/**
 * Error
 */
lower('A') // error
lower('1') // error
lower('$%^') // error
`;

const code2 = `
let str: Lowercase<string>;
str = "abc"; // okay
str = "DEF"; // error in TS4.8+

`;

const code3 = `
<Select
  value="red" // error expected,should be either "dark" or "white"
  options={['dark', 'white']}
/>
`;

const code4 = `
export interface SelectProps<Options extends string[]> {
  options: [...Options],
  value: Options[number]
}

const Select = <Options extends string[]>(props: SelectProps<Options>) => <div></div>
`;

const code5 = `
export interface SelectProps<Value extends string> {
  value: Value & {} // <----- TRICK !
  options: Value[]
}

const Select = <Value extends string>(props: SelectProps<Value>) => <div></div>
`;
const navigation = {
  string_features: {
    id: "string_features",
    text: "String features",
  },
  inference: {
    id: "inference",
    text: "Inference prioritization",
    updated: true,
  },
} as const;
const links = Object.values(navigation);

const UndocumentedFeatures: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.string_features} />
      <p>
        <Anchor
          href="https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/"
          text="Here"
        />{" "}
        you can find announcement of TypeScript 4.8
      </p>
      <p>
        However, you will not find there this interesting feature. Imagine you
        need a type for lowercased string. Before TS 4.8 there was only one
        workaround with extra dummy function
      </p>
      <Code code={code1} />
      <p>However, now, you don't need to use funnction inference, just: </p>
      <Code code={code2} />
      <p>
        This change was implemented{" "}
        <Anchor
          href="https://github.com/microsoft/TypeScript/pull/47050"
          text="here"
        />
      </p>
      <p>
        <Anchor
          href="https://stackoverflow.com/questions/68963491/define-a-typescript-type-that-takes-a-lowercase-word#answer-73732194"
          text="Here"
        />
        you can find an answer of{" "}
        <Anchor
          text="@jcalz"
          href="https://stackoverflow.com/users/2887218/jcalz"
        />
      </p>
      <p>
        If you are interested in another one undocumented behaviour, you can
        check{" "}
        <Anchor
          href="https://catchts.com/safer-types"
          text="my another article"
        />{" "}
      </p>
      <Header {...navigation.inference} />
      <p>
        This very interesting trick I have found in
        <Anchor
          text="this"
          href="https://stackoverflow.com/questions/74093078/how-do-i-create-a-literal-type-for-react-component-parameters#74093982"
        />{" "}
        answer which was provided by
        <Anchor
          href="https://stackoverflow.com/users/8613630/tobias-s"
          text="Tobias S."
        />
        . By the way, you should defenitely check his answers, I'd willing to
        bet that you will find very interesting solutions.
      </p>
      <p>Imagine this super simple React component</p>
      <Code code={code3} />
      <p>
        Property <Var>value</Var> should be one of <Var>options</Var>, either{" "}
        <Var>dark</Var> or <Var>white</Var>
      </p>
      <p>
        This task is relativily easy, we need to infer <Var>options</Var> and
        then make a validation. This is how I would to this:
      </p>
      <Code code={code4} />
      <p>
        However, there is an easier way. You can use <Var>Value & {}</Var> trick
      </p>
      <Code code={code5} />
      <p>
        Using <Var>Value & {}</Var> - means "lower priority inference". You can
        check links under the article to find official explanation. Apart from
        that, <Var>Value & {}</Var> also means <Var>NonNullable</Var>, see{" "}
        <Anchor
          text="TypeScript 4.8"
          href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-8.html#improved-intersection-reduction-union-compatibility-and-narrowing"
        />
      </p>
    </>
  );
};


export default UndocumentedFeatures;
