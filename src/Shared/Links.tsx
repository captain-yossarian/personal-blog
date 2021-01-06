import React, { FC } from "react";

type Props = {
  links: string[];
};

export const Link: FC<{ href: string; text: string }> = ({ href, text }) => (
  <a target="_blank" rel="noopener noreferrer" href={href}>
    {text}
  </a>
);

const Links: FC<Props> = ({ links }) => (
  <ul>
    {links.map((elem, index) => (
      <li key={index}>
        <Link href={elem} text={`Link - ${index + 1}`} />
      </li>
    ))}
  </ul>
);

export default Links;
