import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";

const code1 = `
interface Props {
    nameA: string;
    nameB?: string;
}

const Component: React.FC<Props> = (props) => {
     const { nameA, nameB } = props 
     const name = nameB || nameA;

     return <div>Hello World! Name: {name}</div>
}
`;

const code2 = `
interface Props1 {
    nameA: string;
    nameB?: string;
}

interface Props2 {
    nameB: string;
}

type Props = Props1 | Props2
`;

const code3 = `
const Comp: React.VFC<Props> = (props) => {
  if(props.nameA){} // error
}
`;

const code4 = `
import React from 'react';

interface Props1 {
  nameA: string;
  nameB?: string;
}

interface Props2 {
  nameB: string;
}

type Props = Props1 | Props2

const hasProperty = <T extends object>(obj: T, prop: string) => 
    Object.hasOwnProperty.call(obj, prop);

const isA = (props: Props): props is Props1 => 
    hasProperty(props,'nameA');
const isB = (props: Props): props is Props2 => 
    !hasProperty(props,'nameA') && hasProperty(props,'nameB');


const Comp: React.VFC<Props> = (props) => {

  if(isA(props)){
    const y = props; // Props1
  }

   if(isB(props)){
    const y = props; // Props2
  }


  return null
}

  const result1 = <Comp nameB="b" /> // ok
  const result2 = <Comp nameA="a" /> // ok

  // error,  'nameB' is missing in type '{}' but required in type 'Props2'
  const result3 = <Comp />
`;

const code5 = `
import React from 'react';

interface Props1 {
  type:'1'
  nameA: string;
  nameB?: string;
}

interface Props2 {
  type:'2'
  nameB: string;
}

type Props = Props1 | Props2

const Comp: React.VFC<Props> = (props) => {
  if(props.type==='1'){
    const x = props; // Props1
  }
  if(props.type==='2'){
    const x = props; // Props2
  }  


  return null
}

  const result1 = <Comp nameB="b" type="2"/> // ok
  const result2 = <Comp nameA="a" type="1"/> // ok

  // error,  'nameB' is missing in type '{}' but required in type 'Props2'
  const result3 = <Comp />
`;

const code6 = `
import React from 'react';

interface Props1 {
  nameA: string;
  nameB?: string;
}

interface Props2 {
  nameB: string;
}


type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = 
    T extends any 
    ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

type StrictUnion<T> = StrictUnionHelper<T, T>

type Props = StrictUnion<Props1 | Props2>

const Comp: React.VFC<Props> = (props) => {
  // simply boolean coersion
  if (props.nameA) {
    const x = props;
  } else {
    const y = props.nameA // string | undefined
  }

  // strict checking
  if (typeof props.nameA === 'string') {
    const x = props;
  } else {
    const y = props.nameA // undefined
    const x = props.nameB // string | undefined
  }


  return null
}
`;

const code7 = `

// credits https://stackoverflow.com/users/125734/titian-cernicova-dragomir
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;
`;

const Unions: FC = () => (
  <>
    <p>Next technique is extremely simple and useful. </p>
    <p>Let's say you have next React component:</p>
    <Code code={code1} />
    <p>
      How to make <Var> nameB</Var> mandatory if we don't pass <Var>nameA</Var>?
    </p>
    <p>
      To make it possible, we can use <Var>union</Var> type.
    </p>
    <Code code={code2} />
    <p>It is looks like it works and you can finish your reading...</p>
    <p>
      Try to get <Var>nameA</Var> property
    </p>
    <Code code={code3} />
    <p>Bang! Error! But why???</p>
    <p>
      This is how TS unions works. To fix it, and make it 99% type safe, we can
      add typeguards.
    </p>
    <Code code={code4} />
    <p>However, there is 2 alternative ways.</p>
    <p>
      The
      <Anchor
        href="https://stackoverflow.com/questions/65805600/struggling-with-building-a-type-in-ts#answer-65805808"
        text="first"
      />
      one, is to add same required property to both <Var>Props1</Var>
      and <Var>Props2</Var>
    </p>
    <Code code={code5} />
    <p>
      Cons: we should every time add <Var>type</Var> property
    </p>
    <p>Pros: no function overhead</p>
    <p>
      The
      <Anchor
        href="https://stackoverflow.com/questions/65805600/struggling-with-building-a-type-in-ts#answer-65805753"
        text="second"
      />
      one is to use type util
    </p>
    <Code code={code6} />
    <p>
      Maybe this is not the best example for this util, but with help of
      <Var>StrictUnion</Var> you can check unions without any extra properties.
    </p>
    <p>Don't forget, we have a type util to check if type is union or not</p>
    <Code code={code7} />
  </>
);

export default Unions;
