import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../Layout";
import styled from "styled-components";
import { THEME_COLOR } from "../Layout/css-utils";

type Meta = {
  title: string;
  description: string;
};
const links: Record<string, Meta> = {
  "/math": {
    title: "Math operations",
    description:
      "Let's assume, You want to make some math operations either on number or bigint",
  },
  "/typed-react-children": {
    title: "Type React component children",
    description:
      "Let's assume you want to create component which will accept array of children components with certain props.",
  },
  "/react-return-type": {
    title: "Type React component return type",
    description:
      "What if you need to make sure that some component will always return other component with some particular props",
  },
  "/compare-arguments": {
    title: "Compare array arguments",
    description: "Compare length of arrays as arguments",
  },
  "/range-numbers": {
    title: "Generate numbers in range",
    description: "How to generate numbers range as a literal type",
  },
  "/recursive-types": {
    title: "Recursive types",
    description: "Some useful techniques with recursive types",
  },
  "/tuples": {
    title: "Handle tuples",
    description: "Transform, filter, search ...",
  },
  "/union-array": {
    title: "Transform Union to Array",
    description: "How to transform unions to array",
  },
  "/callback-chain": {
    title: "Callback chain",
    description: "How to properly type callbacks",
  },
  "/handle-arrays": {
    title: "Handle arrays",
    description: "Several useful operations on array types",
  },
  "/publish-subscribe": {
    title: "Publish subscribe pattern",
    description: "Type safe publish subscribe pattern",
  },
  "/type-state": {
    title: "Type state pattern",
    description: "Type safe handler",
  },
  "/api": {
    title: "Api requests",
    description: "Make type safe api requests with TypeScript",
  },
};

const keys = Object.entries(links);

const Aside = styled.aside`
  margin-left: 30px;
  font-size: 18px;
  line-height: 1.5;
`;

const Li = styled.li`
  margin-bottom: 40px;
`;

const H2 = styled.h2`
  padding: 10px;
  display: inline-block;
  margin-bottom: 20px;
  font-size: 20px;
  border-bottom: 5px solid transparent;
  &:hover {
    border-bottom: 5px solid ${THEME_COLOR};
  }
  & a {
    text-decoration: none;
    color: #0b241e;
    display: inline;
    height: 100%;
    width: 100%;
    font-weight: bold;
    padding: 5px;
  }
`;
const ArticleHeader: FC<{ name: string; meta: Meta }> = ({ name, meta }) => (
  <Li>
    <H2>
      <Link to={name}>{meta.title}</Link>
    </H2>
    <Aside>{meta.description}</Aside>
  </Li>
);

const Home: FC = () => (
  <div>
    <Layout title="Blog">
      <ul>
        {keys.map(([name, meta]) => (
          <ArticleHeader name={name} meta={meta} key={name} />
        ))}
      </ul>
    </Layout>
  </div>
);

export default Home;
