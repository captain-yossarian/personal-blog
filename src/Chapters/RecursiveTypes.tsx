import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout, Var } from "../Shared/Layout";
import Links from "../Shared/Links";

const links = [
  "https://stackoverflow.com/questions/64899511/deepexclude-type-for-typescript",
  "https://stackoverflow.com/questions/65503728/defining-a-type-for-this-function-that-works-on-arbitrary-length-tuples",
];

const code1 = `
type Immutable<T> = { readonly [K in keyof T]: Immutable<T[K]> };

function foo<T>(t: T): Immutable<T> {
  return t;
}

const result1 = foo({ age: { name: "John" } }); // { readonly age: { name: string }; }
`;

const code2 = `
type Immutable<T> = {
  readonly [K in keyof T]: K extends "name" ? T[K] : Immutable<T[K]>;
};

function foo<T>(t: T): Immutable<T> {
  return (t as any) as Immutable<T>;
}

const result1 = foo({ age: { name: { surname: "Doe" } } });
result1.age.name = "2"; // error
result1.age.name.surname = "2"; // ok
`;

const RecursiveTypes: FC = () => (
  <Layout>
    <Links links={links} />
    <p>Simple example:</p>
    <Code code={code1} />
    <p>Make all properties immutable except name children</p>
    <Code code={code2} />
    <p>Please check links, there are really useful examples</p>
  </Layout>
);

export default RecursiveTypes;