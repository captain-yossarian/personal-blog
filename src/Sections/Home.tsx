import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { THEME_COLOR } from "../Layout/utils";
import { blogArticles } from "../Layout/structure";

const keys = Object.entries(blogArticles).sort((a, b) => b[1].id - a[1].id);

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

const Tag = styled.li`
  display: inline-block;
  margin: 0 5px;
  color: #9e6192;
`;

const Tags = styled.ul`
  margin: 1rem 0;
`;
const ArticleHeader: FC<{
  name: string;
  meta: Values<typeof blogArticles>;
}> = ({ name, meta }) => (
  <Li>
    <H2>
      <Link to={name}>{meta.title}</Link>
    </H2>
    <Aside>{meta.description}</Aside>
    <Tags>
      {meta.tags.map((tag, index) => (
        <Tag key={index}>{`#${tag}`}</Tag>
      ))}
    </Tags>
  </Li>
);

const Tip = styled.span`
  font-size: 0.9rem;
  display: block;
`;

const TipWrapper = styled.div`
  margin: 1rem 0;
`;
const Input = styled.input`
  width: 20rem;
  height: 2rem;
`;
const Home: FC = () => {
  const [articles, setArticles] = useState(keys);

  const filterArticles = (tag: string) => {
    if (tag.length >= 3) {
      const filtered = keys.filter((elem) => {
        const [_, article] = elem;

        return article.tags.findIndex((t) => t.includes(tag)) > -1;
      });
      setArticles(filtered);
    } else {
      setArticles(keys);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    filterArticles(e.target.value);

  return (
    <>
      <div>
        <Input
          onChange={onChange}
          placeholder={"Please enter search tag ..."}
        />
        <TipWrapper>
          <Tip>For example: tuple, array, infer, callback...</Tip>
        </TipWrapper>
      </div>
      <ul>
        {articles.map(([name, meta]) => (
          <ArticleHeader name={name} meta={meta} key={name} />
        ))}
      </ul>
    </>
  );
};

export default Home;
