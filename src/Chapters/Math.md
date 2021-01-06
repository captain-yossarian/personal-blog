## 2.Math operations - [link](https://stackoverflow.com/questions/65280785/is-it-possible-to-declare-a-typescript-function-which-works-on-both-numbers-and)

Let's assume, You want to make some math operations either on number or bigint

Please keep in mind, this code is not valid in JS/TS:

```typescript
const sum = 2 + 2n; // Error
```

So, we want to accept only number or only bigints.
Let's start with function definition:

```typescript
function sum<A extends number | bigint>(a: A, b: A) {
  return a * a + b * b;
}
```

Unfortunately, this function don't work as expected. Let's test it:

```typescript
const x = 3n;
let y: number | bigint;
if (Math.random() < 0.5) y = 4;
else y = 4n;

sum(x, y); // OK
```

In above case, `y` can be either `number` or `bigint`. So, from TS point of view it is ok, but I'd willing to bet,
that it will throw at least 1 error in dev environment and 1K errors in production. It was a joke.

Ok, what we can do?
We can define two generic parameters:

```typescript
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
```

Unfortunately, above example still don't work as we expect.

```typescript
<A extends Numbers, B extends Numbers>
// same as
<A extends number | bigint, B extends number | bigint>
// so A can be number and B in the same time can be bigint
```

Only overloadings might help us here. We should explicitly say, that `B` generic parameter should have same type as `A`

```typescript
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
```
