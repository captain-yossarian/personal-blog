import React, { FC } from "react";
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
    {links.map(({ id, text }) => (
      <Li>
        <a key={id} href={`#${id}`}>
          #{text}
        </a>
      </Li>
    ))}
  </ul>
);

const ArticleBase: FC<Props & { links: LinksProps["data"] }> = ({
  title,
  next,
  children,
  links,
  path,
}) => (
  <Layout title={title}>
    {children}
    {links.length > 0 ? <Links data={links} /> : null}
  </Layout>
);

export default ArticleBase;
