import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const Ukraine: FC = () => (
  <>
    <div>
      <p>
        You can support Ukraine by donating here. We will buy FPV drones for 155th Separate Mechanized Brigade.
        They are fighting like lions.
      </p>
      <ul>
        <li>
          <Anchor
            href="https://send.monobank.ua/jar/5GdbNDryWQ"
            text="FPV drones for 155th Separate Mechanized Brigade"
          />
        </li>
      </ul>
      <div>
        <img src="./155_infantry.webp" />
      </div>
    </div>
    <p>
      <Anchor href="https://vilne-nebo.com/" text="Here" /> you can find an
      information about our manufacturer and{" "}
      <Anchor href="https://stvoreni-peremahaty.com/" text="here" /> you can
      learn more about charity foundation.
    </p>

    <p>Thank you.</p>
  </>
);

export default Ukraine;
