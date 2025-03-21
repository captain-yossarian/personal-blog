import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const Ukraine: FC = () => (
  <>
    <div>
      <p>
        You can support Ukraine by donating here. We will buy FPV drones 10
        inches for for 155th Separate Mechanized Brigade. They are fighting like
        lions.
      </p>
      <ul>
        <li>
          <Anchor
            href="https://send.monobank.ua/jar/AUdgydtFwG"
            text="FPV drones for 155th Separate Mechanized Brigade"
          />
        </li>
      </ul>
      <div>
        <img src="./155th_Infantry_Brigade_Insignia.png" />
      </div>
    </div>
    <p>
      <Anchor href="https://vilne-nebo.com/" text="Here" /> ypu can find an
      information about our manufacturer and{" "}
      <Anchor href="https://stvoreni-peremahaty.com/" text="here" /> you can
      learn more about charity foundation.
    </p>

    <p>Thank you.</p>
  </>
);

export default Ukraine;
