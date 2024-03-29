import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Link } from "react-router-dom";

const code1 = `
const sum = 2 + 2n; // Error
`.trim();

const code2 = `
function sum<A extends number | bigint>(a: A, b: A) {
  return a * a + b * b;
}
`.trim();

const code3 = `
const x = 3n;
let y: number | bigint;
if (Math.random() < 0.5) y = 4;
else y = 4n;

sum(x, y); // It is Ok from TS point of view, but we know that here might be a bug
`.trim();

const code4 = `
const x = 3n;
let y: number | bigint;
if (Math.random() < 0.5) y = 4;
else y = 4n;

type Numbers = number | bigint;

function sumOfSquares<A extends Numbers, B extends Numbers>(
  a: A,
  b: B
): Numbers {
  return a * a + b * b;
}

const result = sumOfSquares(x, y); // There should be an error
const result2 = sumOfSquares(3n, 4); // There should be an error
const result3 = sumOfSquares(3, 4n); // There should be an error
const result4 = sumOfSquares(3, 4); // ok
const result5 = sumOfSquares(3n, 4n); // ok
`.trim();

const code5 = `
<A extends Numbers, B extends Numbers>
// same as
<A extends number | bigint, B extends number | bigint>
// so A can be number and B in the same time can be bigint
`.trim();

const code6 = `
const x = 3n;
let y: number | bigint;
if (Math.random() < 0.5) y = 4;
else y = 4n;

type Numbers = number | bigint;

function sumOfSquares<A extends number, B extends number>(a: A, b: B): number;
function sumOfSquares<A extends bigint, B extends bigint>(a: A, b: B): bigint;
function sumOfSquares<A extends Numbers, B extends A>(a: A, b: B): Numbers {
  return a * a + b * b;
}

const result = sumOfSquares(x, y); // There should be an error
const result2 = sumOfSquares(3n, 4); // There should be an error
const result3 = sumOfSquares(3, 4n); // There should be an error
const result4 = sumOfSquares(3, 4); // ok
const result5 = sumOfSquares(3n, 4n); // ok
`.trim();

const MathOperations: FC = () => (
  <>
    <p>
      Let's assume, You want to make some math operations either on number or
      bigint
    </p>
    <Code code={code1} />
    <p>
      So, we want to accept only numbers or only bigints. Let's start with
      function definition:
    </p>
    <Code code={code2} />
    <p>Unfortunately, this function doesn't work as expected. Let's test it:</p>
    <Code code={code3} />
    <p>
      In above case,<Var>y</Var> can be either <Var>number</Var> or
      <Var>bigint</Var>.
    </p>
    <p>
      So, from TS point of view it is ok, but I'd willing to bet, that it will
      throw max 1 error in dev environment and 1K errors in production.
    </p>
    <p>It was my first not funny joke.</p>
    <p>Ok, what we can do? We can define two generic parameters:</p>

    <Code code={code4} />
    <p>Unfortunately, above example still doesn't work as we expect.</p>
    <Code code={code5} />
    <p>
      Only overloadings might help us here. We should explicitly say, that
      <Var>B</Var>generic parameter should have same type as<Var>A</Var>
    </p>
    <p>
      I have tried to replace overloadings with function intersections, but
      without success. See
      <Anchor
        href="https://stackoverflow.com/questions/65508351/is-it-possible-to-use-intersection-to-make-function-overloadings-with-generics"
        text="here"
      />
      .
    </p>
    <p>
      Btw, in most cases, you can replace overloadings with function
      intersections. I used this technique
      <Link to="/publish-subscribe">
        <span> in Publish subscribe section</span>
      </Link>
    </p>
    <Code code={code6} />
  </>
);
export default MathOperations;
