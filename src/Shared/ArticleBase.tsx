import React, { FC, useEffect, useState } from "react";
import { Layout } from "../Layout";
import { Props } from "../Chapters/Props";
import Links, { Props as LinksProps, Anchor } from "./Links";
import styled from "styled-components";
import { TEXT_COLOR, THEME_COLOR } from "../Layout/utils";

type NavElem = {
  text: string;
  id: string;
  updated?: boolean;
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

const Updated = styled.span`
  background-color: #9e6192;
  color: white;
  padding: 3px;
  margin-left: 10px;
`;

export const Header: FC<{ text: string; id: string }> = ({ text, id }) => (
  <Heading id={id}>
    <A rel="noopener noreferrer" href={`#${id}`}>{`#${text}`}</A>
  </Heading>
);

export const HeaderNav: FC<HeaderProps> = ({ links }) => (
  <ul>
    {links.map(({ id, text, updated = false }) => {
      return (
        <Li key={id}>
          <a href={`#${id}`}>#{text}</a>
          {updated && <Updated>New!</Updated>}
        </Li>
      );
    })}
  </ul>
);

const twitterSkip = ["about", "contact", "home"];

const TwitterShare: FC<{ title: string; path: string }> = ({ title, path }) =>
  !twitterSkip.includes(title.toLowerCase()) ? (
    <span>
      <a
        href={`https://twitter.com/share?url=catchts.com${path}&hashtags=typescript,catchts&text=${title}`}
      >
        <img
          width="45"
          src="/twitter-logo.png"
          title="Share this page on Twitter"
        />
      </a>
    </span>
  ) : null;

const RenderDate = styled.div`
  text-align: center;
  margin: 0 auto;
  font-weight: 900;
`;

type Like = {
  id: number;
  article_id: number;
  count: number;
};

type ServiceResponse = {
  likes: ReadonlyArray<Like>;
};
const LikeButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${THEME_COLOR};
  color: #0e2924;
  font-size: 20px;
  padding: 5px;
`;

const Counter = styled.span`
  border: 1px solid black;
  font-size: 20px;
  padding: 5px;
  margin-left: 10px;
`;

const Footer = styled.footer`
  border-top: 2px solid ${THEME_COLOR};
  margin: 10px 0 20px 0;
  padding: 5px;
`;
const ArticleBase: FC<Props & { links: LinksProps["data"] }> = ({
  title,
  children,
  links,
  path,
  date,
  id,
}) => {
  const [count, setCount] = useState(-1);
  const handleClick = () =>
    fetch(`https://api.catchts.com/like?id=${id}`).then(fetchLikes);

  const fetchLikes = () => {
    if (id >= 0) {
      fetch(`https://api.catchts.com/get-like?id=${id}`).then((response) =>
        response.json().then((data: ServiceResponse) => {
          if (data.likes.length === 1) {
            const [like] = data.likes;
            setCount(like.count);
          }
        })
      );
    }
  };

  useEffect(() => fetchLikes(), []);

  return (
    <Layout title={title}>
      {children}
      <Footer>
        {id > 0 ? (
          <>
            <div>
              <p>
                Share on twitter <TwitterShare title={title} path={path} />
              </p>
            </div>
          </>
        ) : null}
        {links.length > 0 ? (
          <div>
            <Links data={links} />
            {id >= 0 ? (
              <>
                <LikeButton onClick={handleClick}>I Like It!</LikeButton>
                <Counter>{count > -1 ? count : 0}</Counter>
              </>
            ) : null}
          </div>
        ) : null}
      </Footer>
      <RenderDate>{date}</RenderDate>
    </Layout>
  );
};

export default ArticleBase;
