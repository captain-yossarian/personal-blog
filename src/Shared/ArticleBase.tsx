import React, { FC, useEffect, useState } from "react";
import { Layout } from "../Layout";
import { Props } from "../Chapters/Props";
import Links, { Props as LinksProps } from "./Links";
import styled from "styled-components";
import { TEXT_COLOR, THEME_COLOR } from "../Layout/utils";

type NavElem = {
  text: string;
  id: string;
};
type HeaderProps = {
  links: ReadonlyArray<NavElem>;
};

const Li = styled.li`
  margin-left: 2rem;
  padding: 0.5rem;
  border-left: 4px solid ${THEME_COLOR};
`;

export const Heading = styled.h2`
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  border: 3px solid ${THEME_COLOR};
  display: inline-block;
  padding: 0.5rem;
  margin: 1rem 0;
`;

const A = styled.a`
  text-decoration: none;
  color: ${TEXT_COLOR};
`;
export const Header: FC<{ text: string; id: string }> = ({ text, id }) => (
  <Heading id={id}>
    <A rel="noopener noreferrer" href={`#${id}`}>{`#${text}`}</A>
  </Heading>
);

export const HeaderNav: FC<HeaderProps> = ({ links }) => (
  <ul>
    {links.map(({ id, text }, index) => {
      return (
        <Li key={id}>
          <a href={`#${id}`}>#{text}</a>
        </Li>
      );
    })}
  </ul>
);

const twitterSkip = ["about", "contact", "home"];

const TwitterShare: FC<{ title: string; path: string }> = ({ title, path }) =>
  !twitterSkip.includes(title.toLowerCase()) ? (
    <p>
      <a
        href={`https://twitter.com/share?url=catchts.com${path}&hashtags=typescript,catchts&text=${title}`}
      >
        <img
          width="45"
          src="/twitter-logo.png"
          title="Share this page on Twitter"
        />
      </a>
    </p>
  ) : null;

const RenderDate = styled.div`
  text-align: center;
  margin: 0 auto;
  font-weight: 900;
`;
const ArticleBase: FC<Props & { links: LinksProps["data"] }> = ({
  title,
  next,
  children,
  links,
  path,
  date,
  id,
}) => {
  const [likes, setLikes] = useState({ likes: [] });

  useEffect(() => {
    const result = fetch(
      `https://api.catchts.com/get-like?id=${id}`
    ).then((response) => response.json().then((data) => console.log({ data })));
  });

  return (
    <Layout title={title}>
      {children}
      <TwitterShare title={title} path={path} />
      {links.length > 0 ? <Links data={links} /> : null}
      <button>Like</button>
      <RenderDate>{date}</RenderDate>
    </Layout>
  );
};

export default ArticleBase;
