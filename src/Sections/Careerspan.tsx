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
    <p>In general, we are working on AI based platform which will help you to tailor your resume.</p>
    <p>There are a lot more feature they can bring to the table, give it a try!</p>
  </div>
);

export default Careerspan;
