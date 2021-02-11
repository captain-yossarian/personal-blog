import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { THEME_COLOR } from "../Layout/utils";
import { blogArticles } from "../Layout/structure";

const keys = blogArticles.sort((a, b) => b.id - a.id);

const lower = (str: string) => str.toLowerCase();
const tags = [
  ...new Set(
    blogArticles.reduce((acc, elem) => [...acc, ...elem.tags], [] as string[])
  ),
].sort((a, b) => {
  const lowerA = lower(a[0]);
  const lowerB = lower(b[0]);
  if (lowerA < lowerB) {
    return -1;
  }
  if (lowerA > lowerB) {
    return 1;
  }
  return 0;
});

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

const SearchTag = styled.button`
  display: inline-block;
  padding: 5px;
  border: 1px solid gray;
  cursor: pointer;
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? THEME_COLOR : "unset"};

  &:hover {
    background-color: ${THEME_COLOR};
  }
`;
const TagWrapper = styled.div`
  max-width: 300px;
  margin: 10px;
`;

const removeItem = (array: string[], index: number) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];

const Home: FC = () => {
  const [{ articles, selectedTags }, setArticles] = useState({
    articles: keys,
    selectedTags: [] as string[],
  });

  const filterArticles = (tag: string) => {
    setArticles((prevState) => {
      const tagIndex = prevState.selectedTags.indexOf(tag);
      const isSelected = tagIndex > -1;

      const filterTags = prevState.selectedTags.filter((elem) => elem !== tag);

      const newSelectedTags = isSelected
        ? removeItem(prevState.selectedTags, tagIndex)
        : [...filterTags, tag];

      const filtered = keys.filter((elem) =>
        newSelectedTags.every((el) => elem.tags.includes(el))
      );

      return {
        articles: filtered,
        selectedTags: newSelectedTags,
      };
    });
  };

  return (
    <>
      <div>
        <TagWrapper>
          {tags.map((tag, index) => (
            <SearchTag
              onClick={() => filterArticles(tag)}
              key={index}
              isSelected={selectedTags.includes(tag)}
            >
              {tag}
            </SearchTag>
          ))}
        </TagWrapper>
        <TipWrapper>
          <Tip>For example: tuple, array, infer, callback...</Tip>
        </TipWrapper>
      </div>
      <ul>
        {articles.map((elem) => (
          <ArticleHeader name={elem.url} meta={elem} key={elem.url} />
        ))}
      </ul>
    </>
  );
};

export default Home;
