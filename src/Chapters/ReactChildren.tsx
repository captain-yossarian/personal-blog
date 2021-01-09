import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout, Var } from "../Layout";
import Links from "../Shared/Links";

const code1 = `
function One() {
  return <div>Child One</div>;
}

const Two: React.FC<{ label: string }> = ({ label }) => {
  return <div>{label}</div>;
};

function Parent({ children }: { children: JSX.Element[] }) {
  return (
    <div>
      {children.map((child) => (
        <div key={child.props.label}>{child}</div> // Props: any
      ))}
    </div>
  );
}

function App2() {
  // I want TS to complain about One component, because there is no label prop
  return <Parent children={[<One />, <Two label={"hello"} />]} />; 
}
`;

const code2 = `
function One() {
  return <div>Child One</div>;
}

const Two: React.FC<{ label: string }> = ({ label }) => {
  return <div>{label}</div>;
};

function Parent({
  children,
}: {
  children: React.ReactElement<{ label: string }>[]; // change is here
}) {
  return (
    <div>
      {children.map((child) => (
        <div key={child.props.label}>{child}</div>
      ))}
    </div>
  );
}

function App2() {
  return <Parent children={[<One />, <Two label={"hello"} />]} />;
}
`;

const code3 = "React.ReactElement<{label: string}>";
const code4 = "(props:any)=>{}";

const code5 = `
// One is explicitly typed now
const One: React.FC = () => {
    return <div>Child One</div>;
}

const Two: React.FC<{ label: string }> = ({ label }) => {
    return <div>{label}</div>;
};

function Parent({
    children
}: {
    children: React.ReactElement<{ label: string }>[];
}) {
    return (
        <div>
            {children.map((child) => (
                <div key={child.props.label}>{child}</div>
            ))}
        </div>
    );
}

function App2() {
    return React.createElement(Parent, {
        children: [
            // error, all components should have label prop
            React.createElement(One, null),
            React.createElement(Two, { label: 'd' }) // no error
        ]
    });
}

function App3() {
    return React.createElement(Parent, {
        children: [
            /**
             * still error, because One don't expect {label: string}
             * If you add typings for One, error will disappear
             */
            React.createElement(One, { label: 'd' }), //error
            React.createElement(Two, { label: 'd' }) // no error
        ]
    })
`;

const code6 = `
const One: React.FC<{ label: string }> = ({ label }) => {
  return <div>{label}</div>;
};

const Two: React.FC<{ label: string }> = ({ label }) => {
  return <div>{label}</div>;
};

function Parent({
  children,
}: {
  children: React.ReactElement<{ label: string }>[];
}) {
  return (
    <div>
      {children.map((child) => (
        <div key={child.props.label}>{child}</div>
      ))}
    </div>
  );
}

function App4() {
  return React.createElement(Parent, {
    children: [
      React.createElement(One, { label: "d" }),
      React.createElement(Two, { label: "d" }),
    ],
  });
}
`;

const ReactChildren: FC = () => (
  <Layout title="Type safe React children type">
    <p>
      Let's assume you want to create component which will accept array of
      children components with certain props.
    </p>
    <p>
      In this case, I'd like to accept only components with <Var>label</Var>{" "}
      prop
    </p>
    <p>First approach:</p>
    <Code code={code1} />
    <p>
      As you see, there is nothing highlighted, code is ok, but we still need to
      accept components with `label` props.
    </p>
    <p>
      Let's change <Var>children</Var> prop type.
    </p>
    <Code code={code2} />
    <p>Does it work - no! But, why????</p>

    <p>
      {" "}
      Because <Var>{code3}</Var> is still union type, and in fact, it accepts{" "}
      <Var>{code4}</Var>
    </p>
    <p>
      It is looks like, we all forgot about React native syntax, did not we?
    </p>
    <p>
      On my second approach, I will change a bit declaration of <Var>One</Var>{" "}
      component.
    </p>
    <Code code={code5} />
    <p>So, we can write now the code which will meet our requirements:</p>
    <Code code={code6} />
    <Links
      data={[
        {
          href:
            "https://stackoverflow.com/questions/64967447/adding-required-props-to-child-react-elements-with-typescript",
          text: "stackoverflow",
        },
      ]}
    />
  </Layout>
);

export default ReactChildren;
