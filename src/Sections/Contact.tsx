import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const Contact: FC = () => (
  <>
    <div>
      <Anchor href="mailto:sergiybiluk@gmail.com" text="My email" />
      ,
      <Anchor
        href="https://stackoverflow.com/users/8495254/captain-yossarian?tab=profile"
        text="StackOverflow profile"
      />
      , <Anchor href="https://twitter.com/captainyosarian" text="twitter" />
      and{" "}
      <Anchor
        href="https://www.linkedin.com/in/serhii-bilyk-764b6b7b/"
        text="linkedin"
      />
    </div>
  </>
);

export default Contact;
