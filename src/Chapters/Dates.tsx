import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
const data = {
  '2021-03-01': {
    "date": '1st March',
    "value": 17
  },
  '2021-03-02': {
    "date": '2nd March',
    "value": 19
  },

  '2021-03-09': {
    "date": '9th March',
    "value": 15
  }
}
`;

const code2 = `Record<string, { date: string, value: number }>`;

const code3 = `
type PrependNextNum<A extends Array<unknown>> = A["length"] extends infer T
    ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
    ? X
    : never
    : never;

type EnumerateInternal<A extends Array<unknown>, N extends number> = {
    0: A;
    1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A["length"] ? 0 : 1];

type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[]
    ? E
    : never;
`;

const code4 = `
 type Range = Enumerate<13>
`;

const code5 = `
 type Month = Exclude<Enumerate<13>, 0>
`;

const code6 = `
type NumberString<T extends number> = \`${"${T}"}\`;
`;

const code7 = `
type Year =
    \`${"${NumberString<number>}${NumberString<number>}${NumberString<number>}${NumberString<number>}"}\`;
`;

const code8 = `
type ZeroRequired = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
`;

const code9 = `
type AddZero<T extends number> = T extends ZeroRequired ? \`${"${0}${T}"}\` : T;
`;

const code10 = `
type Month = AddZero<Exclude<Enumerate<13>, 0>>;
`;

const code11 = `
type MakeString<T extends number | \`${"${number}`> = `${T}"}\`;
`;

const code12 = `
type Month = MakeString<AddZero<Exclude<Enumerate<13>, 0>>>;
`;

const code13 = `
type Day = MakeString<AddZero<Exclude<Enumerate<32>, 0>>>;
`;

const code14 = `
type DataKey = \`${"${Year}-${Month}-${Day}"}\`;
`;

const code15 = `
type MapMonth<T extends NumberString<number>> =
    T extends '01'
    ? 'January' : T extends '02'
    ? 'February' : T extends '03'
    ? 'March' : T extends '04'
    ? 'April' : T extends '05'
    ? 'May' : T extends '06'
    ? 'June' : T extends '07'
    ? 'July' : T extends '08'
    ? 'August' : T extends '09'
    ? 'September' : T extends '10'
    ? 'October' : T extends '11'
    ? 'November' : T extends '12'
    ? 'December' : never
`;

const code16 = `
type GetDay<T extends DataKey> =
    T extends \`${"${string}-${Month}-${infer D}` ? D : `${number}"}\`;

type GetMonth<T extends DataKey> =
    T extends \`${"${string}-${infer M}-${Day}` ? M : `${ number }"}\`;
`;

const code17 = `
type ConvertToMonth<T extends DataKey> = MapMonth<GetMonth<T>>;
type Result = ConvertToMonth<'2021-03-01'> // March
`;

const code18 = `
type AddSt<T extends NumberString<number>> = \`${"${T}st"}\`;

type RemoveLeadZero<T extends GetDay<DataKey>> = T extends \`${"0${infer N}"}\` ? N : T

type MakeDate<T extends DataKey> =
    \`${"${AddSt<RemoveLeadZero<GetDay<T>>>} ${ConvertToMonth<T>}"}\`
`;

const code19 = `
type Base = Record<DataKey, { date: MakeDate<DataKey>, value: number }>

type Result = MakeDate<'2021-03-01'> // 1st March
type Result2 = MakeDate<'2021-03-02'> // 2st March
`;

const code20 = `
type PrependNextNum<A extends Array<unknown>> = A["length"] extends infer T
    ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
    ? X
    : never
    : never;

type EnumerateInternal<A extends Array<unknown>, N extends number> = {
    0: A;
    1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A["length"] ? 0 : 1];

type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[]
    ? E
    : never;

type Range = Enumerate<13>

type NumberString<T extends number> = \`${"${T}"}\`;

type Year =
    \`${"${NumberString<number>}${NumberString<number>}${NumberString<number>}${NumberString<number>}"}\`;

type ZeroRequired = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type AddZero<T extends number> = T extends ZeroRequired ? \`${"${0}${T}"}\` : T;

type MakeString<T extends number | \`${"${number}`> = `${T}"}\`;

type Month = MakeString<AddZero<Exclude<Enumerate<13>, 0>>>;

type Day = MakeString<AddZero<Exclude<Enumerate<32>, 0>>>;

type DataKey = \`${"${Year}-${Month}-${Day}"}\`;

type MapMonth<T extends NumberString<number>> =
    T extends '01'
    ? 'January' : T extends '02'
    ? 'February' : T extends '03'
    ? 'March' : T extends '04'
    ? 'April' : T extends '05'
    ? 'May' : T extends '06'
    ? 'June' : T extends '07'
    ? 'July' : T extends '08'
    ? 'August' : T extends '09'
    ? 'September' : T extends '10'
    ? 'October' : T extends '11'
    ? 'November' : T extends '12'
    ? 'December' : never
type GetDay<T extends DataKey> =
    T extends \`${"${string}-${Month}-${infer D}` ? D : `${number}"}\`;

type GetMonth<T extends DataKey> =
    T extends \`${"${string}-${infer M}-${Day}` ? M : `${ number }"}\`;

type ConvertToMonth<T extends DataKey> = MapMonth<GetMonth<T>>;

type Result = ConvertToMonth<'2021-03-01'> // March

type AddSt<T extends NumberString<number>> = \`${"${T}st"}\`;

type RemoveLeadZero<T extends GetDay<DataKey>> = T extends \`${"0${infer N}"}\` ? N : T

type MakeDate<T extends DataKey> =
    \`${"${AddSt<RemoveLeadZero<GetDay<T>>>} ${ConvertToMonth<T>}"}\`

type Base = Record<DataKey, { date: MakeDate<DataKey>, value: number }>

type Result2 = MakeDate<'2021-03-01'> // 1st March

type Result3 = MakeDate<'2021-03-02'> // 2st March
`;

const navigation = {
  problem: {
    id: "problem",
    text: "The problem",
  },
  solution: {
    id: "solution",
    text: "Template literals and Date",
  },
};
const links = Object.values(navigation);

const Dates: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.problem} />
      <p>
        Let's imagine very simple situation. You need an object where keys are
        dates and values are strings strictly binded with key date.
      </p>
      <p>Example:</p>
      <Code code={code1} />
      <p>First solution which came to my mind was to make a simple Record:</p>
      <Code code={code2} />
      <p>
        But, since we have template literals, let's make it more complicated
      </p>
      <Header {...navigation.solution} />
      <p>
        First of all, in order to work with dates, we should generate numbers
        from 1 to 12 and from 1 to 31. I hope you understand my intensions ))
      </p>
      <p>
        This code was shamelessly stolen from
        <Anchor
          href="https://stackoverflow.com/questions/65573679/how-to-overcome-ts2589-on-enumerate-type-with-dynamic-enumerator-upper-limit-qu"
          text="here"
        />
      </p>
      <Code code={code3} />
      <p>
        If you are interested in really big ranges,
        <Anchor href="https://catchts.com/range-numbers" text="this" /> article
        is for you.
      </p>
      <p>I'm sorry, let's go back to our problem.</p>

      <p>
        Next, we have to create stringified representation of number, because we
        are working with strings.
      </p>
      <Code code={code6} />
      <p>Now, we are ready to create our type representation of year</p>
      <Code code={code7} />
      <p>Let's create allowed numbers for months.</p>
      <Code code={code4} />
      <p>Now, we should get rid of zero</p>
      <Code code={code5} />
      <p>
        We all know, that according to standard, we should use zero lead
        representation for dates.
      </p>
      <p>
        For example, we should use <Var>02</Var> for February instead of
        <Var>2</Var>
      </p>
      <p>
        First of all, we should define all numbers where we should add leading
        zero
      </p>
      <Code code={code8} />
      <p>Now, we can add zero to all one digit numbers</p>
      <Code code={code9} />
      <p>Let's try what we have.</p>
      <Code code={code10} />
      <p>Now we have a mix of numbers and string</p>
      <p>We are interested only in stringified numbers</p>
      <Code code={code11} />
      <p>Omg, finally we can make our Month type representation</p>
      <Code code={code12} />
      <p>Now, it is easy to make Day type</p>
      <Code code={code13} />
      <p>Our object key type:</p>
      <Code code={code14} />
      <p>
        Since we already have types for our keys, we should somehow map them.
        For example 01-01-2020 to January 1st
      </p>
      <Code code={code15} />
      <p>Now, we should be able to obtain actual month and day from the key</p>
      <Code code={code16} />
      <p>
        Now we should actually convert two digits month to month string
        representation
      </p>
      <Code code={code17} />
      <p>
        Do you remember that we should convert <Var>2021-03-01</Var> to
        <Var>1st March</Var> ?
      </p>
      <Code code={code18} />
      <p>This is how our type should be represented</p>
      <Code code={code19} />
      <p>
        There is a drawback, 2st March. Making appropriate endings is up to you
        :)
      </p>
      <p>Full example</p>
      <Code code={code20} />
      <p>
        <Anchor
          href="https://www.typescriptlang.org/play?#code/C4TwDgpgBACgThSA7AJgOQgD2GgrgWwB4BBKLYCVAZymLjgEMRDckBrJAewHckA+PlAC8tANoAiADaUA5sAAW4gLplslFDQCWSAGYQ4UACoAoKGagB+KAAprwAFxGANFAB07ho+IBKYYIBunJoovuTqNNburpiO2noGABq+QgFBKKbmVgkZZo5IEP76OVB5BfoA3MbGoJBQAKJIBPoMFACSSBRwSAySJKoU1LT0TCzsXLx8Lmj94VCN+ABG+oIiAN7FAAxeleZQAIyODU2MbR363b3wiOoY2HhExJNQaHyVAL6i02GDxBLSSHJFCorBsSvslJVquBoEd8M0KIQvmpBvMlnAVvV5vCIO1OhdCKIlFNBN8NDY4vp6t5CcUrHViqVCnBITVoAAlBgA6AiWHYwh7ADMfCqrOeBDRAGVgHBtDJCIYZijxcthFAAAYAElWhjeapZ0KgAE0IAwDEJiprVvdJdLZYRUcs3lrrfopTKAfbleinVavW67Q7vc6-baPYG+Lr9bUAFr6ThsiAAR1wmgQKFVeygAB8oAAmbNQAUFgAsBYArAWAGwFgDsBYAHAWAJxR6DEFAoWNwTjyxVk8OqhWkmhd+NJlNpyzqrUbH06tVgwytqAAWQYbAg-o9Q+R-a9Bctgd1GMt8+XK84HXkqrXG63cvbnbjhDqmAAxpJcCgIC+sScf4KTwbAIrwigaAAiTA3uum6hg+Haji+76ft+v7HC0P4CrmQEgcukHAAwADSEAgKqlrGqabwALRaheV7UVqkEgJGYG1GuYB0QovbDmKiyunBnp8eiKzFDuAxkgA5BsewSbSUASQAUpyuCmiAEmLn2NBSbmsm7FYEkAGIQAscAqXAakaTxUkCrpmTyWucBvvI6mOGJsxScWtlmPpxBgDKkguUYmnyRsZZeVOElrhZrnBVJlbhfpCmsBAgVuYMUk1gl8lJZI0VBVZGz1llEnELgMi4FQwCpbFGxNsVEqIBQQnVVZewbMVADyb7AJwaItbuWl7DJckSWgnCFM1lkDfJew6SN4EQG+ECTYyRSigA4hAwBMdx034URJEibsaVkpalXujIDGrJx8hXRSBjgbqU7gWCh5eixUK1JtwA3bt4k0PtxEgEd5gnTQZ1wXduiUiuV1MU9Vgrq9WpzPuH2igAwpeTLAIYnC-WDUCA4d0EcZeXHfQTAjLgmVC4JIwCqljSA43jv0SbmGy5nsVEbAKvMyYIAD0QurqaTmsW2HZSn9swunA96CWiAhkVqOqVXqktQAm+DjRAAAyJpPt2suDN9O3E8DGKE2qGxavdzwI88i5a7eED4T+hOWyDZiWo+Ms63rhsMMbPbmyMhggW8UBaszrP4+T8jyhGapawAQgwVDctri2cHAKCEJbLirFAKAYY4bse4XLQHcDLj+D0uAQHkaPCp97IQHTDP5iIlcYYQHNczzfMCxJwui3slVi458ha7T9PAEWvcwVXg-c7z-Nc2PUAi3mU8OU5QA"
          text="Playground"
        />
      </p>
    </>
  );
};

export default Dates;
