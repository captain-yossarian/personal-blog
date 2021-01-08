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
  <div>
    <p>Useful StackOverflow links:</p>
    <ul>
      {links.map((elem, index) => (
        <li key={index}>
          <Link href={elem} text={`Link - ${index + 1}`} />
        </li>
      ))}
    </ul>
  </div>
);

export default Links;
