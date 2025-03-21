import React, { FC, ReactNode } from "react";
import styled from "styled-components";

type PropsAnchor = {
  href: string;
  text?: string;
  children?: ReactNode;
};

export type Props = {
  data: ReadonlyArray<PropsAnchor>;
};

const A = styled.a`
  width: 100%;
  margin: 10px 0;
`;

const Span = styled.span`
  display: inline-block;
  margin: 0 5px;
`;

export const Anchor: FC<PropsAnchor> = ({ href, text, children = null }) => (
  <A target="_blank" rel="noopener noreferrer" href={href}>
    <Span>{text}</Span>
    {children}
  </A>
);

const Container = styled.div`
  margin-top: 20px;
  & li {
    margin: 10px 0;
  }
`;

const Header = styled.h2`
  font-weight: bold;
`;

const Links: FC<Props> = ({ data }) => (
  <Container>
    <Header>Useful links:</Header>
    <ul>
      {data.map(({ href, text }, index) => (
        <li key={index}>
          {index + 1}. <Anchor href={href} text={text} />
        </li>
      ))}
    </ul>
  </Container>
);

export default Links;
