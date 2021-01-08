import React, { FC } from "react";
import { Layout, Var } from "./Layout";

const About: FC = () => (
  <Layout title="About">
    <div>
      <p>Hi, my name is Serhii. I work as a front end developer in UBS.</p>
      <p>
        I decided to gather some useful stackoverflow answers with
        <Var>[typescript]</Var> tag in one place.
      </p>
      <p>Here You have a list of other interesting blogs:</p>
      <ul>
        <li>
          <a href="https://www.stephanboyer.com/">
            https://www.stephanboyer.com/
          </a>
        </li>
        <li>
          <a href="http://cliffle.com/contact/">http://cliffle.com/contact/</a>
        </li>
        <li>
          <a href="https://fettblog.eu/">https://fettblog.eu/</a>
        </li>
        <li>
          <a href="https://mariusschulz.com/">https://mariusschulz.com/</a>
        </li>
        <li>
          <a href="https://twitter.com/WrocTypeScript">
            Wroclaw TypeScript twitter group
          </a>
        </li>
        <li>
          <a href="https://typeofweb.com/">TypeOfWeb [PL]</a>
        </li>
      </ul>
    </div>
  </Layout>
);

export default About;
