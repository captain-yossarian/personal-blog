import React, { FC } from "react";
import { Layout } from "../Layout";
import { Props } from "../Chapters/Props";
import Links, { Props as LinksProps } from "./Links";

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
