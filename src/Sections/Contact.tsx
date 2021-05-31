import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const Contact: FC = () => (
  <>
    <div>
      sergiybiluk@gmail.com and{" "}
      <Anchor href="https://twitter.com/captainyosarian" text="twitter" />
    </div>
  </>
);

export default Contact;
