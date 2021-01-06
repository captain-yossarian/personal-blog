import React, { FC } from "react";
import { Link } from "react-router-dom";

const links = {
  "/math": "Math operations",
  "/typed-react-children": "Type React component children",
  "/react-return-type": "Type React component return type",
  "/compare-arguments": "Compare array arguments",
  "/range-numbers": "Generate numbers in range",
  "/recursive-types": "Recursive types",
  "/tuples": "Handle tuples",
  "/union-array": "Transform Union to Array",
  "/callback-chain": "Callback chain",
  "/handle-arrays": "Handle arrays",
  "/publish-subscribe": "Publish subscribe pattern",
  "/type-state": "Type state pattern",
  "/api": "Make type safe api requests",
};

const keys = Object.keys(links);

const Home: FC = () => (
  <ul>
    {(keys as (keyof typeof links)[]).map((elem, index) => {
      return (
        <li key={index}>
          <Link to={elem}>{links[elem]}</Link>
        </li>
      );
    })}
  </ul>
);

export default Home;
