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
const navigation = {
  string_features: {
    id: "string_features",
    text: "String features",
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
    </>
  );
};
export default UndocumentedFeatures;
