import React, { FC } from "react";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import Code from "../Shared/Code";
import { Layout, Var } from "../Shared/Layout";

const code1 = `
import React, { FC } from 'react';

type Props = {
    label: string;
};

type CustomReturn = React.ReactElement<Props>;

const One: React.FC<{ label: string }> = ({ label }) => <div>{label}</div>;

const Two: React.FC = () => <div></div>;

/**
 * I expect here component with label prop as a return type,
 * but this code is perfectly valid from TS point of view
 */
const Result: FC<Props> = (prop: Props): CustomReturn => <Two />;
`;

const code2 = `{label:string}`;

const code3 = `
const Result: FC<Props> = (prop: Props): CustomReturn => <Two />; // No error, but should be

const Result2: FC<Props> = (prop: Props): CustomReturn =>
  React.createElement(Two); // Error

const Result3: FC<Props> = (prop: Props): CustomReturn =>
  React.createElement(One); // ok
`;

const code4 = `
type Props<D, S> = {
  data: D;
  selector: (data: D) => S;
};

const Comp = <D, S>(props: Props<D, S>) => null;

const result = (
  <Comp<number, string>
    data={2}
    selector={(data: number) => "fg"}
  />
); // ok

const result2 = (
  <Comp<number, string>
    data={2}
    // expected error
    selector={(data: string) => "fg"} 
  />
); 
`;

const ReactReturnType: FC = () => (
  <Layout>
    <p>There is a common pattern for typing return value of component:</p>
    <Code code={code1} />
    <p>Is it helpful ? - Yes, but actually - No</p>
    <p>
      What if you need to make sure that Result component will always return
      component with some particular props.
    </p>
    <p>
      For example I'm interested in <Var>{code2}</Var> property.
    </p>
    <p>Native React syntax comes to help!</p>
    <Code code={code3} />
    <p>Btw, small reminder, how to use generics with React components:</p>
    <Code code={code4} />
  </Layout>
);

export default ReactReturnType;
