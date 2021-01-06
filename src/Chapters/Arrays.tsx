import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout } from "../Shared/Layout";
import Links, { Link } from "../Shared/Links";

const links = [
  "https://stackoverflow.com/questions/65429424/need-help-in-understanding-confusing-typescript-function",
  "https://typescriptnapowaznie.pl/",
];

const code1 = `
const arr = [85, 65, 4, 9] as const;
type Arr = typeof arr;

/**
 * Naive approach
 */
const result_naive = arr.filter((elem) => elem !== 4 && elem !== 9); // (85 | 65 | 4 | 9)[]
`;

const code2 = `
type Without_4_and_9 = Exclude<Arr[number], 4 | 9>;
const result = arr.filter(
  (elem): elem is Without_4_and_9 => elem !== 4 && elem !== 9
); // (85 | 65)[]
`;

const code3 = `
const arr = [85, 65, 4, 9] as const;
type Arr = typeof arr;

type Values<T> = T[keyof T];

type ArrayKeys = keyof [];

type FindIndex<
  T extends ReadonlyArray<number>,
  Value extends number = 0,
  Keys extends keyof T = keyof T
> = {
  [P in Keys]: Value extends T[P] ? P : never;
};

type Result = Values<Omit<FindIndex<Arr, 65>, ArrayKeys>>; // '1'
`;

const Arrays: FC = () => (
  <Layout>
    <Links links={links} />
    <p>
      I'd willing to bet, you are using Array.prototype.filter 1 hundred times
      per day.
    </p>
    <p>And I bet you want to do it like a PRO.</p>
    <p>
      I have found this example in this
      <a href="https://typescriptnapowaznie.pl/">book</a>
    </p>
    <p>Let's say you have an array, and you want to get rid of 4s and 9s</p>
    <Code code={code1} />
    <p>
      You still have 4 | 9 in your union type. This is not what we expected.
    </p>
    <p> Here is much better approach:</p>
    <Code code={code2} />
    <p>
      By using simple utility types, we can emulate JS Array.prototype.findIndex
    </p>
    <Code code={code3} />
    <p>Is second example is useful in practive? Of course not)</p>
    <p> Will it help you to understand better TS type system? - Definitely</p>
    <p>
      <Link
        href={
          "https://stackoverflow.com/questions/65429424/need-help-in-understanding-confusing-typescript-function"
        }
        text={"here"}
      />
      you can find very interesting example with typeguards
    </p>
  </Layout>
);

export default Arrays;
