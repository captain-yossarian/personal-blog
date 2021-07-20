import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
const add = (x: number) => (y: number) => x + y;
const result = add(4)(2) // 6
`;

const code2 = `
import React, { FC } from "react";

/**
 * Converts 
 * ['hello', 'holla', 'hi']
 * into
 * {hello: 0, holla: 1, hi: 2}
 * 
 */
type ToRecord<T extends string[], Cache extends Record<string, number> = {}> =
    T extends []
    ? Cache
    : T extends [...infer Head, infer Last]
    ? Last extends string
    ? Head extends string[]
    ? ToRecord<Head, Cache & Record<Last, Head['length']>>
    : never
    : never
    : never

const Curry = <
    Elem extends string,
    Data extends Elem[]
>(data: [...Data]): FC<ToRecord<Data>> =>
    (props) =>
        <div>{Object.keys(props).map(elem => <p>{elem}</p>)}</div>

const Result = Curry(['hello', 'holla', 'hi']) // FC<{ greeting: string; }>

// hello - is a required property
const jsx = <Result hello={0} holla={1} hi={2} />
`;

const code3 = `
import React, { FC, ComponentType } from "react";

type EnumerableComponentFactory = <I>(config: {
    Container: FC<{ children: JSX.Element[] }>;
    Item: ComponentType<I>;
}) => FC<{ items: I[] }>;

const Enumerable: EnumerableComponentFactory =
    ({ Container, Item }) =>
        ({ items }) =>
        (
            <Container>
                {items.map((props, index) => (
                    <Item key={index} {...props} />
                ))}
            </Container>
        );

const UnorderedList = Enumerable({
    Container: ({ children }) => <ul>{children}</ul>,
    Item: ({ title }: { title: string }) => <li>{title}</li>,
});

const result = <UnorderedList items={[{ title: "Something" }]} />;
`;

const code4 = `
import React, { FC } from "react";

type BaseProps = {
  isOpen: boolean;
};

const WithTitle: FC<BaseProps & { title: string }> = ({ isOpen, title }) => (
  <p>
    {title}
  </p>
);

const WithCount: FC<BaseProps & { count: number }> = ({ isOpen, count }) => (
  <p>
    {count}
  </p>
);

const Container = Curry([WithCount, WithTitle]);

const result = <Container title={"hello"} count={42} />; // ok

// expected error, because [count] is string instead of number
const result_ = <Container title={"hello"} count={"42"} />; 

// expected error because second component does not expect [isOpen] property
const Container_ = Curry([WithCount, () => null]); 

`;
const code5 = `
type ExtractProps<F extends FC<any>> = F extends FC<infer Props>
    ? Props
    : never;
{
    type Test = ExtractProps<FC<{ age: number }>> // { age: number }
}
`;

const code6 = `
type IsValid<Components extends Array<FC<BaseProps>>> =
    ExtractProps<[...Components][number]> extends BaseProps ? Components : never;
{
    type Test1 = IsValid<[FC<unknown>]> // never
    type Test2 = IsValid<[FC<BaseProps>]> //[React.FC<BaseProps>]
}
`;

const code7 = `
// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

type GetRequired<T> = UnionToIntersection<
    // make sure we have a deal with array
    T extends Array<infer F>
    ? // make sure that element in the array extends FC
    F extends FC<infer Props>
    ? // if Props extends BaseProps
    Props extends BaseProps
    ? // Omit isOpen property, since it is not needed
    Omit<Props, "isOpen">
    : never
    : never
    : never
>
{
    type Test = keyof GetRequired<[
        FC<BaseProps & { title: string }>,
        FC<BaseProps & { count: number }>
    ]> // "title" | "count"
}
`;

const code8 = `
import React, { FC } from "react";

type BaseProps = {
    isOpen: boolean;
};

const WithTitle: FC<BaseProps & { title: string }> = ({ isOpen, title }) => <p>{title}</p>
const WithCount: FC<BaseProps & { count: number }> = ({ isOpen, count }) => <p>{count}</p>

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

type GetRequired<T> = UnionToIntersection<
    // make sure we have a deal with array
    T extends Array<infer F>
    ? // make sure that element in the array extends FC
    F extends FC<infer Props>
    ? // if Props extends BaseProps
    Props extends BaseProps
    ? // Omit isOpen property, since it is not needed
    Omit<Props, "isOpen">
    : never
    : never
    : never
>
{
    type Test = keyof GetRequired<[
        FC<BaseProps & { title: string }>,
        FC<BaseProps & { count: number }>
    ]> // "title" | "count"
}

type ExtractProps<F extends FC<any>> = F extends FC<infer Props>
    ? Props
    : never;
{
    type Test = ExtractProps<FC<{ age: number }>> // { age: number }
}

type IsValid<Components extends Array<FC<BaseProps>>> =
    ExtractProps<[...Components][number]> extends BaseProps ? Components : never;
{
    type Test1 = IsValid<[FC<unknown>]> // never
    type Test2 = IsValid<[FC<BaseProps>]> //[React.FC<BaseProps>]
}

const Curry =
    <Comps extends FC<any>[], Valid extends IsValid<Comps>>(
        /**
         * If each Component expects BaseProps,
         * sections argument will evaluate to [...Comps] & [...Comps],
         * otherwise to [...Comps] & never === never
         */
        sections: [...Comps] & Valid
    ) =>
        (props: GetRequired<[...Comps]>) =>
        (
            <>
                {sections.map((Comp: FC<BaseProps>) => (
                    <Comp isOpen={true} {...props} /> // isOpen is required
                ))}
            </>
        );

const Container = Curry([WithCount, WithTitle]);

const result = <Container title={"hello"} count={42} />; // ok

const result_ = <Container title={"hello"} count={"42"} />; // expected error

const Container_ = Curry([WithCount, () => null]); // expected error
`;
const navigation = {
  typing_factory: {
    id: "typing_factory",
    text: "Typing component factory",
  },
  currying_components: {
    id: "currying_react_components",
    text: "Currying react components",
  },
};
const links = Object.values(navigation);

const CurryingComponents: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.typing_factory} />
      <p>
        First of all, let me remind you what <Var>currying</Var> actually means.
      </p>
      <Code code={code1} />
      <p>Let's get straight to the point.</p>
      <p>Consider this example:</p>
      <Code code={code2} />
      <p>
        Thanks to <Var>Curry</Var> function, we can apply some constraints on
        our <Var>Result</Var> component
      </p>
      <p>It looks like we can do more. What about component factory?</p>
      <p>
        This example I found{" "}
        <Anchor
          href="https://stackoverflow.com/questions/68397897/typing-a-react-component-factory-function/68433032#68433032"
          text="here"
        />
      </p>
      <Code code={code3} />
      <Header {...navigation.currying_components} />
      <p>I know, you are waiting for some crazy unmaintable typings.</p>
      <p>Here you have them :D</p>
      <p>
        Imagine your <Var>Curry</Var> HOC should accept components with{" "}
        <Var>isOpen</Var> property. Here you have full requirements from
        <Anchor
          href="https://stackoverflow.com/questions/68278567/react-ts-generic-component-to-pass-generic-props-to-children/#68442669"
          text="stackoverflow"
        />
        :
      </p>
      <p>
        <i
          style={{
            fontFamily: "system-ui",
            fontStyle: "italic",
          }}
        >
          I want to create a React component that is somewhat like an Accordion.
          It will have children and allow opening/closing each. Each child is
          also a React component that needs unique props from the parent that
          other children may not use. I assumed I need to use Generics to
          facilitate these varying props.
        </i>
      </p>
      <p>This is what I want to achieve</p>
      <Code code={code4} />
      <p>Let's start with some utility types.</p>
      <p>
        First of all, we need to be able to infer <Var>props</Var> from{" "}
        <Var>{`FC<Props>`}</Var>
      </p>
      <Code code={code5} />
      <p>Then, we need to check if every component has expected props.</p>
      <Code code={code6} />
      <p>
        Now, we need to extract all properties from all passed components, merge
        them and omit <Var>isOpen</Var>, because our <Var>Result</Var> should
        not accept it.
      </p>
      <Code code={code7} />
      <p>We can put it all other.</p>
      <Code code={code8} />
    </>
  );
};

export default CurryingComponents;
