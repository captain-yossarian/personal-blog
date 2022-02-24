import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const Ukraine: FC = () => (
  <>
    <p>
      russia launched an all-out invasion of Ukraine by land, air and sea on
      Thursday.
    </p>
    <p>
      If you want to help Ukraine, you can make a donation here{" "}
      <Anchor
        href="https://savelife.in.ua/en/donate/"
        text="https://savelife.in.ua/en/donate/"
      />
      . If you want to help in other way please see this{" "}
      <Anchor
        text="https://ukraine.ua/news/stand-with-ukraine"
        href="https://ukraine.ua/news/stand-with-ukraine/"
      />
    </p>
    <p>
      If you don't trust the link I have provided, it is ok. Please double check
      them with other official web pages or on official Ukraine twitter account.
    </p>
    <p>Thank you.</p>
  </>
);

export default Ukraine;
