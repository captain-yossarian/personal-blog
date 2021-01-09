import React, { FC } from "react";
import { Layout, Var } from "../Layout";
import Links, { Anchor } from "../Shared/Links";

const links = [
  {
    href: "https://www.stephanboyer.com/",
    text: "https://www.stephanboyer.com/",
  },
  {
    href: "http://cliffle.com/contact/",
    text: "http://cliffle.com/contact/",
  },
  {
    href: "https://fettblog.eu/",
    text: "https://fettblog.eu/",
  },
  {
    href: "https://mariusschulz.com/",
    text: "https://mariusschulz.com/",
  },
  {
    href: "https://twitter.com/WrocTypeScript",
    text: "https://twitter.com/WrocTypeScript",
  },
  {
    href: "https://typeofweb.com/",
    text: "TypeOfWeb [PL]",
  },
];

const About: FC = () => (
  <Layout title="About">
    <div>
      <p>Hi, my name is Serhii.</p>
      <p> I work as a front end developer in UBS.</p>
      <p>
        I decided to gather some useful <Var>[typescript]</Var> stackoverflow
        questions/answers with tag in one place.
      </p>
      <p>
        If I used someone's code and did not provide link to original
        post/article/answer, please let me know, I will add it.
      </p>
      <p>
        Because english is not my first language, I don't have enough experience
        to write long and grammatically correct explanations, hence, if you
        noticed a mistake, I kindly ask You to let me know. Thanks.
      </p>
      <p> You can treat this blog as a stackoverflow typescript news.</p>
      <p>
        If You want to know how TS type system works under the hood, I suggest
        you to follow:
        <Anchor
          href="https://stackoverflow.com/users/2887218/jcalz"
          text="@jcalc"
        />
        ,
        <Anchor
          href="https://stackoverflow.com/users/125734/titian-cernicova-dragomir"
          text="@Titian Cernicova-Dragomir"
        />
        ,
        <Anchor href="https://github.com/ahejlsberg" text="Anders Hejlsberg" />
      </p>
      <p></p>
      <Links data={links} />
    </div>
  </Layout>
);

export default About;
