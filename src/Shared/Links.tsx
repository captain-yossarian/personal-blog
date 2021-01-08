import React, { FC } from "react";
import styled from "styled-components";

type PropsAnchor = {
  href: string;
  text: string;
};

type Props = {
  data: PropsAnchor[];
};

const A = styled.a``;

export const Anchor: FC<PropsAnchor> = ({ href, text }) => (
  <A target="_blank" rel="noopener noreferrer" href={href}>
    {text}
  </A>
);

const Links: FC<Props> = ({ data }) => (
  <div>
    <p>Useful links:</p>
    <ul>
      {data.map(({ href, text }, index) => (
        <li key={index}>
          <Anchor href={href} text={text} />
        </li>
      ))}
    </ul>
  </div>
);

export default Links;
