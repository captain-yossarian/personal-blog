// https://stackoverflow.com/questions/65844206/how-to-avoid-ambiquity-in-typescript-template-literal-type-inference

import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";

const TemplateLiterals: FC = () => (
  <>
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/65844206/how-to-avoid-ambiquity-in-typescript-template-literal-type-inference"
        text="Here"
      />{" "}
      I have found really interesting question and no less interesting answer:
    </p>
  </>
);

export default TemplateLiterals;
