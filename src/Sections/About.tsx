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
        If you like my blog, you can <Anchor href="https://ko-fi.com/catchts" text="buy me a coffee" />
      </p>
      <p>
        <Anchor
          href="https://github.com/captain-yossarian/personal-blog"
          text="Here"
        />{" "}
        you can find github repo of my blog.
      </p>
    </div>
  </>
);

export default About;
