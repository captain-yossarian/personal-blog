import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Link } from "react-router-dom";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
    const foo = <T,>(arg: T, ...validation: ??) => { }
`;

const code2 = `
type Units = 'px' | 'rem' | '%';
`;

const code3 = `
type Units = 'px' | 'rem' | '%';

type IsValidCSS<T extends string> = T extends \`${"${number}${Units}"}\` ? true : false;

type Result = IsValidCSS<'10px'> // true
type Result2 = IsValidCSS<'10p'> // false
`;

const code4 = `

type Units = 'px' | 'rem' | '%';

type IsValidCSS<T extends string> = T extends \`${"${number}${Units}"}\` ? true : false;

type Validator<T extends boolean> = T extends true ? [] : [never];

type Test = Validator<IsValidCSS<'10px'>> // []
`;

const code5 = `
const foo = <T,>(arg: T, ...validation: Validator<IsValidCSS<T>>) => {}

foo('10px'); // error
`;

const code6 = `
const foo = <T extends string>(arg: T, ...validation: Validator<IsValidCSS<T>>) => {}

foo('10px'); // ok
foo('10%'); // ok
foo('10p'); // error
`;

const code7 = `


type Units = 'px' | 'rem' | '%';

type IsValidCSS<T> = T extends \`${"${number}${Units}"}\` ? true : false;

type StringNumber<T extends number> = \`${"${T}"}\`;

type IsAllowedNumber<T> = 
  T extends \`${"${infer Num}${Units}"}\` 
  ? Num extends StringNumber<99> 
  ? false 
  : true 
  : false;

type Validator<T extends boolean> = 
  T extends true 
  ? [] 
  : ['Dear developer, please use valid CSS values'];

const foo = <T extends string>
  (arg: T, ...validation: [...Validator<IsValidCSS<T>>, ...Validator<IsAllowedNumber<T>>]) => { }

foo('100px'); // ok
foo('99px'); // expected error

`;
const Validation: FC = () => (
  <>
    <p>Here You can find some type validation techniques.</p>
    <p>Let's start with simple function</p>
    <p>
      Assume, <Var>arg</Var> argument should be always some CSS value. For
      example: <Var>100px, 10rem, 50% etc ...</Var>
    </p>
    <p>
      First of all we should check if value ends with some allowed measure units
    </p>
    <Code code={code2} />
    <p>
      Now, we should be able to split our measure units into two parts: number
      and unit
    </p>
    <Code code={code3} />
    <p>Lets write generic validator:</p>
    <Code code={code4} />
    <p>
      Please, give me a minute, I will explain why we need an array as a return
      type from <Var>Validator</Var>
    </p>
    <p>Let's try it</p>
    <Code code={code5} />
    <p>
      Still does not work, because argument is infered to string instead of
      literal <Var>10px</Var>
    </p>
    <p>
      In order to fix it, we should apply additional constraints to the generic
      type
    </p>
    <Code code={code6} />
    <p>Is it possible to apply several validators?</p>
    <p>
      Assume, we are not allowed to use <Var>99</Var> in our CSS
    </p>
    <Code code={code7} />
    <p>
      Each time, when <Var>Validator</Var> fails, it returns <Var>[never]</Var>
      and because we are using <Var>rest operator</Var> it evaluates to
      <Var>never</Var>
    </p>
    <p>
      So if Validator has failed, TS expects second argument which is{" "}
      <Var>never</Var>
    </p>
    <p>
      <Anchor
        href="https://www.staging-typescript.org/play?#code/FAFwngDgpgBAqgOwJYgM4wLwwOQQB7YwA+OATlALaEnYCk2A3MKJLAJKoBqAhgDZIATAMIBlEQB4AKgD5MMSTCh4QUBAPQADACQBvBAFcKAIyikAvrsQpUZjTAD8MEKX2wAXDABmfVFCYtoGBFnJAQAcwA5QxNSKUVlVXUYA2NTWSxtHUlbf3BAjgBBXl4AewB3KAEo1NiZOQUlFTVNXVDPUxhqix0rNFsHTsN4pqTg0lDI6NNxAE4Z2UdvXl8YD2dXVa8fP2Y82B5+AW4QEtrhxPQjEpLeKG4EdPlz5qcXWEcAbQBdTY-sABE7qQYAIoAA3KClaCkAA0MAgt24K30KzBfEEMFEIhgaN4rlQ2C+-mAAGMSghUCAvNc5HFGhcYJTxuFpAAKbikMIeSRwgB0-NxgmOSHJHg+-N5ByFJ1iHClwjEUmk0j5-Plx1O4kKxXKlWqMSV0i+AEpMLIdDAzMxPNdWdgAIwABkd+GwxoYMAA9J6YCUANbAG0lO1zV3ur0+pTQEkqASKUikU7AIA"
        text="Playground"
      />
    </p>
    <p>
      Please refer to{" "}
      <Anchor
        href="https://stackoverflow.com/questions/67282788/how-would-i-add-type-to-nested-object/67284951#67284951"
        text="this question"
      />{" "}
      if You are interested in object validation or to
      <Anchor href="https://catchts.com/hex-validation" text="my article" /> in
      case You want validate HEX value
    </p>
  </>
);
export default Validation;
