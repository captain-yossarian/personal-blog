import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Link } from "react-router-dom";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
const removeProperty = <Obj, Prop extends keyof Obj>(obj: Obj, prop: Prop) => {
  const { [prop]: _, ...rest } = obj;
  return rest
}
`;

const code2 = `
const hasProperty = <Obj, Prop extends string>(obj: Obj, prop: Prop)
  : obj is Obj & Record<Prop, unknown> =>
  Object.prototype.hasOwnProperty.call(obj, prop);
`;

const code3 = `
const obj = {
  age: 0,
  name: ''
}

if (obj.age === 0) {
  obj.age = 42
}

if(obj.name===''){
  obj.name = 'John'
}
`;

const code4 = `
const handleAge = (obj: Obj, age: Obj['age']) => 
  obj.age === 0 ? { ...obj, age } : obj;
  
const handleName = (obj: Obj, name: Obj['name']) => 
  obj.name === '' ? { ...obj, name } : obj;

const result = handleAge(handleName(obj,'John'), 42);
`;

const code5 = `
const handleAge = (age: Obj['age']) => (obj: Obj) =>
  obj.age === 0 ? { ...obj, age } : obj;

const handleName = (name: Obj['name']) => (obj: Obj) =>
  obj.name === '' ? { ...obj, name } : obj;

const compose = <T,>(...fns: Array<(a: T) => T>) =>
  (obj: T) => fns.reduceRight((acc, fn) => fn(acc), obj);

const builder = compose(handleAge(42), handleName('John'));

const result = builder(obj) // Obj
`;

const code6 = `
const result  =
        obj
        |> handleAge(42)
        |> handleName('John')
`;

const code7 = `
const switcher = (arg: Obj) => {
  if (arg.name === 'John') {
    arg.items.push('Hello John')
  }
  if (arg.name === 'Bruce') {
    arg.items.push('Hi Batman!')
  }
  if (arg.name === 'Peter') {
    arg.items.push('Are U a Spiderman?')
  }

  return arg
}
`;

const code8 = `
const enum SomeEvent {
  click = 'click',
  dbclick = 'dbclick',
  mousedown = 'mousedown ',
  mouseover = 'mouseover',
  mouseenter = 'mouseenter'

}

const handleEvents = (ev: SomeEvent) => {
  if (ev === SomeEvent.click || ev === SomeEvent.dbclick) {
    console.log('Mouse clicked')
  }

  if (ev === SomeEvent.mouseenter || ev === SomeEvent.mouseover) {
    console.log('Mouse hover')
  }
}

const isOneOf = <T extends string, M extends string>(ev: T, ...matchers: M[]) =>
  ev.match(new RegExp(matchers.join('|'), 'gi'))


const isOneOfWithoutIteration = <T extends string>(ev: T, matchers: string) =>
  ev.match(new RegExp(matchers, 'gi'))


const handleEvents2 = (ev: SomeEvent) => {

  if (isOneOf(ev, SomeEvent.click, SomeEvent.dbclick)) {
    console.log('Mouse clicked')
  }
  const union =\`${"${SomeEvent.mouseenter}|${SomeEvent.mouseover}"}\`
  
  if (isOneOfWithoutIteration(ev, union)) {
    console.log('Mouse hover')
  }
}
`;
const navigation = {
  fp_utils: {
    id: "fp_utils",
    text: "Functional programming utils",
  },
  strict_to_general: {
    id: "strictt_to_general",
    text: "Convert strict type to more general",
  },
};

const links = Object.values(navigation);

const FP: FC = () => (
  <>
    <HeaderNav links={links} />
    <p>This article will be about some common functional programming utils.</p>
    <Header {...navigation.fp_utils} />
    <p>Remove property from object</p>
    <Code code={code1} />
    <p>Check if property exists</p>
    <Code code={code2} />
    <p>Let's say you have next code:</p>
    <Code code={code3} />
    <p>
      This code is perfectly valid and very fast. But if for some reason You
      want to avoid mutation, You can make your life and life of your colleague
      a bit complicated.
    </p>
    <p>Let's start with small helpers:</p>
    <Code code={code4} />
    <p>It is looks like a bit repetitive, does't it?</p>
    <p>
      Let's add <Var>compose</Var>. In order to make our utils composable, we
      should change it a bit.
    </p>
    <Code code={code5} />
    <p>
      <Anchor
        text="Here"
        href="https://dev.to/ascorbic/creating-a-typed-compose-function-in-typescript-3-351i"
      />
      You can find very good article about typing <Var>compose</Var> function
      and
      <Anchor
        text="here"
        href="https://github.com/microsoft/TypeScript/pull/39094#issuecomment-647042984"
      />
      You can find some thoughts about using and typing compose functions and
      pipe operator.
    </p>
    <p>This is how it would look like with pipe operator:</p>
    <Code code={code6} />
    <Anchor
      href="https://twitter.com/orta/status/1380585284925059072"
      text="Here"
    />
    You can find <Var>orta's</Var> twitt regarding pipe operator in TypeScript.
    <p>
      Now, I'd willing to bet, that You knw how to rewrite next function to make
      it more FP style
    </p>
    <Code code={code7} />
    <p>
      Let's consider next example. It is not strictly related to TS but I
      believe it will be helpful for you.
    </p>
    <p>
      This code is very specific, since it works only with strings, at least in
      our example.
    </p>
    <p>
      I'm not saying that it is better then several <Var>||</Var>, or better
      then <Var>Array.prototype.includes</Var> or more performant.
    </p>
    <p>You can use it as a typeguard for unions.</p>
    <Code code={code8} />
    <p>
      As You see, RegExp <Var>|</Var> in some way can restrict unions
    </p>
  </>
);
export default FP;
