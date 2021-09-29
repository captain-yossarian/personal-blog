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
        If you like my blog, you can
        <Anchor href="https://www.buymeacoffee.com/captainyosarian" text="buy me a beer" />
      </p>
    </div>
  </>
);

export default About;
