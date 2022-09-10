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

const code2 = `
type Country = 'sg' | 'my' | 'th' | 'uk' | 'us'
type Platform = 'ios' | 'android'

const countries: Country[] = ['sg', 'my'];
const platforms: Platform[] = ['ios', 'android'];

const combinationsToQuery: [Platform, Country][] = platforms.flatMap((platform) =>
    countries.map((cid: country) => [platform, cid])
);
`;

const code3 = `
type Country = 'sg' | 'my' | 'th'
type Platform = 'ios' | 'android'

// https://github.com/microsoft/TypeScript/issues/13298#issuecomment-692864087
type TupleUnion<U extends string, R extends any[] = []> = {
    [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S] | R>;
}[U];



type Countries = TupleUnion<Country>
type Platforms = TupleUnion<Platform>

const countries: Countries = ['sg', 'my'];

const platforms: Platforms = ['ios', 'android'];

const should_be_error : Platforms = ['ios', 'ios'] // error
`;

const code4 = `
type Country = 'sg' | 'my' | 'th'
type Platform = 'ios' | 'android'

// https://github.com/microsoft/TypeScript/issues/13298#issuecomment-692864087
type TupleUnion<U extends string, R extends any[] = []> = {
    [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S] | R>;
}[U];


type Countries = TupleUnion<Country>
type Platforms = TupleUnion<Platform>

const countries: Countries = ['sg', 'my'];

const platforms: Platforms = ['ios', 'android'];

type Add<Plat extends string, Cntrs extends string[]> = {
    [Index in keyof Cntrs]: [Plat, Cntrs[Index]]
}

type Compute<
    Plats extends string[],
    Cntrs extends string[],
    Acc extends string[][] = []
> =
    /**
     * If last call of recursion
     */
    (Plats extends []
        /**
         * Return Accumulator
         */
        ? Acc
        /**
         * If nit is not the last step, infer first and rest elements
         */
        : (Plats extends [
            infer Head extends string,
            ...infer Rest extends string[]
        ]
            /**
             * Call Compute recursively using Rest as a main tuple (Platforms)
             * and call our Add "callback", which just adds Head element to each Country
             */
            ? Compute<Rest, Cntrs, [...Acc, ...Add<Head, Cntrs>]>
            : Acc)
    )

function combinations<
    P extends Platforms,
    C extends Countries
>(platforms: P, countries: C): Compute<P, C>
function combinations<
    P extends Platforms,
    C extends Countries
>(platforms: P, countries: C) {
    return platforms.flatMap((platform) =>
        countries.map((cid) => [platform, cid])
    )
}

// [["ios", "sg"], ["ios", "my"], ["android", "sg"], ["android", "my"]]
const result = combinations(platforms, countries)

console.log({ result })
`;

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
        />
        question
      </p>
      <Code code={code1} />
      <p>
        Let's transform this expression to super safe function. First of all, we
        need define appropriate types for allowed countries and platforms
      </p>
      <Code code={code2} />
      <p>
        Please be aware, that <Var>Country[]</Var> type is not safe, because you
        are allowed to use duplications <Var>['sg', 'sg']</Var>, whic is not ok
      </p>
      <p>
        In order to make it a bit safer, we can use{" "}
        <Anchor
          href="https://github.com/microsoft/TypeScript/issues/13298#issuecomment-692864087"
          text="TupleUnion"
        />{" "}
        utility type
      </p>
      <Code code={code3} />
      <p>
        As you might have noticed, you are no more allowed to use duplications.
        However, <Var>TupleUnion</Var> is not perfect. The max allowed length of
        elements in the union is 8, If you provide a union with 9 elements you
        will get this error:
        <Var>Type instantiation is excessively deep and possibly infinite</Var>.
        Do you remember factorial function ?
        <Var> 8! =8 x 7 × 6 × 5 × 4 × 3 × 2 × 1 = 40 320 </Var>.
        <Anchor
          href="https://www.mathsisfun.com/combinatorics/combinations-permutations.html"
          text="Here"
        />{" "}
        you can find nice article about permutations and combinations
      </p>
      <p>
        Now, we need to create a function and represent runtime logic in a scope
        type{" "}
      </p>
      <Code code={code4} />
      <p>
        <Var>Add</Var> - utility type represents <Var>Array.prototype.map</Var>{" "}
        callback, which just creates a tuple with two elementsm just like we did
        it in this callback <Var>{"(cid) => [platform, cid]"}</Var>
      </p>
      <p>
        <Var>Compute</Var> - utility type, recursively iterates through{" "}
        <Var>Platforms</Var> and applies <Var>Add</Var> to each element. Just
        like it is done in our expression
      </p>
      <p>
        In order to generate exact return type, we need to overload our
        function.
      </p>
      <p>
        Very similar example ypu will find
        <Anchor
          href="https://stackoverflow.com/questions/69265186/how-to-generate-array-with-template-literal-types-items/69265799#69265799"
          text="here"
        />. The only difference there, that we don't create a tuple but just concatenate two chars.
      </p>
      <p>I hope that this article helps you to make your code more safer. Have a nice day</p>
    </>
  );
};
export default StringCombinations;
