import React, { FC } from "react";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";

const About: FC = () => (
  <>
    <div>
      <p>Hi, my name is Serhii.</p>
      <p> I work as a front end developer at UBS.</p>
      <p>
        I decided to gather some useful <Var>[typescript]</Var> stackoverflow
        questions/answers in one place.
      </p>
      <p>
        If I used someone's code and did not provide link to original
        post/article/answer, please let me know, I will add it.
      </p>
      <p>
        If you noticed a mistake\typo, I kindly ask You to let me know. Thanks.
      </p>
      <p> You can treat this blog as a stackoverflow typescript news.</p>
      <p>
        Btw, before asking anything on StackOverflow, I suggest you to take a
        look at
        <Anchor
          href="https://www.typescriptlang.org/docs/handbook/intro.html"
          text="TypeScript book"
        />
        ,
        <Anchor
          href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
          text="TypeScript book v2 beta"
        />
        and
        <Anchor
          href="https://github.com/Microsoft/TypeScript/wiki/FAQ"
          text="TypeScript FAQ"
        />
      </p>
    </div>
  </>
);

export default About;
