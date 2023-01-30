import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { THEME_COLOR } from "../Layout/utils";
import { blogArticles } from "../Layout/structure";

const toUnix = (date: string) => new Date(date).getTime();

export const sort = (data: typeof blogArticles) =>
  data.sort((prev, next) => toUnix(prev.date) - toUnix(next.date)).reverse();

const Aside = styled.h3`
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
  span {
    font-size: 14px;
  }
`;

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
  meta: typeof blogArticles[number];
}> = ({ name, meta }) => (
  <Li>
    <H2>
      <Link to={name}>{meta.title},</Link>
      <span>{meta.date}</span>
    </H2>
    {meta.description && <Aside>{meta.description}</Aside>}
    {meta.tags.length > 0 && (
      <Tags>
        {meta.tags.map((tag, index) => (
          <Tag key={index}>{`#${tag}`}</Tag>
        ))}
      </Tags>
    )}
  </Li>
);

export const Title = styled.p`
  line-height: 1.5;
  font-size: 20px;
  display: inline-block;
  margin-bottom: 20px;
`;
const Border = styled.ul`
  background: linear-gradient(rgba(0, 87, 183, 0.2) 50%, rgba(255,215,0,.2) 50%);
  & li {
    margin-bottom: 0px !important;
  }
`;

const Ukraine = {
  url: "/Ukraine",
  title: "Do you want to help Ukraine?",
  description: "",
  Comp: "Ukraine",
  links: [],
  tags: [],
  date: "February 24, 2022",
  id: 24022022,
};

const Home: FC = () => {
  return (
    <>
      <div>
        <Border>
          <ArticleHeader name={Ukraine.url} meta={Ukraine} key={Ukraine.url} />
        </Border>
        <Title>
          Here you can find some non-trivial typescript examples taken from real
          life (95% are from stackoverflow).
        </Title>
      </div>
      <ul>
        {sort(blogArticles).map((elem) => (
          <ArticleHeader name={elem.url} meta={elem} key={elem.url} />
        ))}
      </ul>
    </>
  );
};

export default Home;
