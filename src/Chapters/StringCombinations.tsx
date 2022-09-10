import React, { FC } from "react";
import Code from "../Shared/Code";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";
import { Var } from "../Layout";

const code1 = `
const countries = ['sg', 'my', 'th'];
const platforms = ['ios', 'android'];

// [["ios", "sg"], ["ios", "my"], ["ios", "th"], ["android", "sg"], ["android", "my"], ["android", "th"]]
const combinationsToQuery = platforms.flatMap((platform) =>
    countries.map((cid) => [platform, cid])
); 
`;

const code2=`
type Country = 'sg' | 'my' | 'th' | 'uk' | 'us'
type Platform = 'ios' | 'android'

const countries: Country[] = ['sg', 'my'];
const platforms: Platform[] = ['ios', 'android'];

const combinationsToQuery: [Platform, Country][] = platforms.flatMap((platform) =>
    countries.map((cid: country) => [platform, cid])
);
`

const navigation = {
  string_combinations: {
    id: "string_combinations",
    text: "String combinations",
  },
} as const;
const links = Object.values(navigation);

const StringCombinations: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.string_combinations} />
      <p>
        THis code is take from{" "}
        <Anchor
          href="https://stackoverflow.com/questions/73630242/unable-to-define-type-for-tuple-target-requires-2-elements-but-source-may-hav#answer-73631072"
          text="this"
        /> question
      </p>
      <Code code={code1} />
      <p>Let's transform this expression to super safe function. First of all, we need define appropriate types for allowed countries and platforms</p>
      <Code code={code2} />

    </>
  );
};
export default StringCombinations;
