import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { THEME_COLOR } from "../Layout/utils";
import { blogArticles } from "../Layout/structure";

import { Props } from "../Chapters/Props";

const keys = Object.entries(blogArticles);

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

type Values<T> = T[keyof T];

const ArticleHeader: FC<{
  name: string;
  meta: Values<typeof blogArticles>;
}> = ({ name, meta }) => (
  <Li>
    <H2>
      <Link to={name}>{meta.title}</Link>
    </H2>
    <Aside>{meta.description}</Aside>
  </Li>
);

const Home: FC = () => (
  <>
    <ul>
      {keys.map(([name, meta]) => (
        <ArticleHeader name={name} meta={meta} key={name} />
      ))}
    </ul>
  </>
);

export default Home;
