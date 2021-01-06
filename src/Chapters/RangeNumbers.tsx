import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout, Var } from "../Shared/Layout";

const code1 = `
interface Foo {
  age: number;
  name: string;
}

type Alias1 = Foo["age"]; // number
type Alias2 = Foo["name"]; // stirng
type Alias3 = Foo["age" | "name"]; // string | number

type Check = keyof Foo; // 'age'|'name
`;

const RangeNumbers = () => (
  <Layout>
    <p>
      Let's take a look on <Var>type Values = T[keyof T]</Var> utility.
    </p>
    <p>Maybe you wonder, what does it mean ?</p>
    <p>
      Before we continue, please make sure you are aware of
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#distributive-conditional-typ"
      >
        distibutive types
      </a>
    </p>
    <p>Let's start with simple example:</p>
  </Layout>
);

export default RangeNumbers;
