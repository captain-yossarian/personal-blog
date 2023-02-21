import React, { FC } from "react";
import { Anchor } from "../Shared/Links";

const Hire: FC = () => (
  <div>
    <p>
      Hi, I am glad you are interested. I have 6 years of experience with
      React/TypeScript/Javascript eco system.
    </p>
    
    <p>
      I am focused on type safe functional programming. My main language is
      TypeScript.
    </p>
    <p>I am also familiar with these technologies (on junior lever)</p>
    <ul>
      <li>NodeJS</li>
      <li>Rust</li>
      <li>F#</li>
    </ul>
    <p>
      I spend a lot of time on StackOferlow, answering on TypeScript/React
      related questions.
      <Anchor
        href="https://stackoverflow.com/users/8495254/captain-yossarian-from-ukraine"
        text="Here"
      />
      you can check my profile.
    </p>
    <p>List of my talks:</p>
    <ul>
      <li>
        <Anchor
          text="(EN) WeAreDevelopers Live - JavaScript Day"
          href="https://www.youtube.com/watch?v=jdyGVV8qwMQ&t=3536s"
        />
      </li>
      <li>
        <Anchor
          text="(PL) Funkcyjne programowanie w TypeScript. Typowanie funkcji compose pipeline"
          href="https://www.youtube.com/watch?v=cUcDB1Y17NA"
        />
      </li>
      <li>
        <Anchor
          text="(PL) ReactJS Wrocław Meetup #22"
          href="https://www.youtube.com/watch?v=66wrgWixQqw"
        />
      </li>
    </ul>
    <p>List of my articles on other resources:</p>
    <ul>
      <li>
        <Anchor
          text="(EN) Currying React components in TypeScript"
          href="https://dev.to/captainyossarian/currying-react-components-13h0"
        />
      </li>
      <li>
        <Anchor
          text="(EN) How to type React props as a pro in TypeScript"
          href="https://dev.to/captainyossarian/how-to-type-react-props-as-a-pro-2df2"
        />
      </li>
    </ul>
    <p>I speak Ukrainian, English and Polish.</p>
    <p>Let's keep in touch:  sergiybiluk@gmail.com</p>
  </div>
);

export default Hire;
