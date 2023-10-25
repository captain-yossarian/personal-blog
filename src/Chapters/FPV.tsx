import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const FPV: FC = () => (
  <>
    <p>
      I, with my friend Nazar, from
      <Anchor
        href="https://polarbearcommerce.com/"
        text="Polar Bear commerce"
      />
      , are making FPV drones to help Ukrainian army to defence Ukraine from
      russian occupiers. The price of the one FPV frone is around 350$ with
      battery.
      <Anchor href="https://www.facebook.com/jossarian/" text="Here" /> you can
      check my facebook for photo confirmation. If you want to support me, this
      is my PayPal serhii.bilyk89@gmail.com .
    </p>
    <p>
      If you have your own old fpv drone that you are not using you can send it
      to us or at least some parts (drone frame, flight controller, motors etc
      ...)
    </p>
    <p>
      If you just have an experience and you want help - dont hesitate, please
      send me an email. I dont have a lot of "drone" experience so I would be
      happy to learn smth new from you
    </p>
    <p>Thank you!</p>
  </>
);

export default FPV;
