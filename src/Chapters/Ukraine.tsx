import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const Ukraine: FC = () => (
  <>
    <p>
      russia launched an all-out invasion of Ukraine by land, air and sea on 24
      of February.
    </p>
    <p>This is why I came back to Ukraine.</p>
    <p>
      I have my own small donation company, which you can find
      <Anchor text="here" href="https://zrzutka.pl/pthyet" />. Once per month I
      am buying holographic sights, starlinks and other tactical equipment.
    </p>

    <p>
      If you don't trust the link I have provided, it is ok. You can also make a
      donation to these most popular charity foundations in Ukraine:
      <ul>
        <li>
          <Anchor
            href="https://savelife.in.ua/en/donate-en/#donate-army-card-monthly"
            text="Сome back alive"
          />
        </li>
        <li>
          <Anchor
            href="https://prytulafoundation.org/en/home/support_page"
            text="Serhiy Prytula Charity Foundation"
          />
        </li>
      </ul>
    </p>

    <p>Thank you.</p>
  </>
);

export default Ukraine;
