import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const Ukraine: FC = () => (
  <>
    <p>
      russia launched an all-out invasion of Ukraine by land, air and sea on
      Thursday.
    </p>
    <p>
      If you want to help Ukrainian army, you can make a donation here{" "}
      <Anchor
        href="https://www.comebackalive.in.ua/uk/donate?fbclid=IwAR3lATfZiatgnRvwoEam-3aWUNoYJDroYJLAqWsIvdOQNSm-PwAwL1sGM9s"
        text="Сome back alive"
      />
      . If you want to help Territorial Defense Forces please see
      <Anchor text="this donation" href="Territorial Defense Forces" />
    </p>
    <p>
      If you don't trust the link I have provided, it is ok. Please double check
      them with other official web pages or on official Ukraine twitter account.
    </p>
    <p>Thank you.</p>
  </>
);

export default Ukraine;
