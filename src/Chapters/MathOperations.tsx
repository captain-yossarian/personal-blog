import React, { FC, useEffect } from 'react';

import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript';
import Code from './Code';

const code1 = `
const sum = 2 + 2n; // Error
`.trim()

const code2 = `
function sum<A extends number | bigint>(a: A, b: A) {
  return a * a + b * b;
}
`.trim()

const code3 = `
const x = 3n;
let y: number | bigint;
if (Math.random() < 0.5) y = 4;
else y = 4n;

sum(x, y); // OK
`.trim();

const code4 = `
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



const MathOperations: FC = () => <Code code={code1} />

export default MathOperations;