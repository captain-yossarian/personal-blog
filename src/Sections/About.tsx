import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const About: FC = () => (
  <>
    <div>
      <p>Hi, my name is Serhii. I'm from Ukraine.</p>
      <p> I work as a software engineer at Intive.</p>
      <p>
        If I used someone's code and did not provide link to original
        post/article/answer, please let me know, I will add it.
      </p>
      <p>
        If you noticed a mistake\typo, I kindly ask You to let me know. Thanks.
      </p>
      <p>
        <Anchor
          href="https://github.com/captain-yossarian/personal-blog"
          text="Here"
        />
        you can find github repo of my blog.
      </p>
      <p>
        Special thanks to my colleagues from
        <Anchor
          href="https://polarbearcommerce.com/"
          text="Polar Bear commerce"
        />
        for their continuous support of my blog
      </p>
      <a
        href="https://polarbearcommerce.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Polar Bear commerce" width="100px" src="/LOGO_PB_WHITE.png" />
      </a>
    </div>
  </>
);

export default About;
