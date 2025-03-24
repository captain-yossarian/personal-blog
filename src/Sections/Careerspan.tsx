import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const Careerspan: FC = () => (
  <div>
    <p>
      Hi, I am working at awesome (I mean it) startup{" "}
      <Anchor href="https://www.mycareerspan.com/" text="Careerspan" />
    </p>
    <p>
      <Anchor href="https://www.mycareerspan.com/aboutus" text="Here" /> you can
      find about us section
    </p>
    <p>In general, we are working on AI based platform which will help you identify and communicate your strengths to employers and tailor your resume by pasting in a job description.</p>
  </div>
);

export default Careerspan;
