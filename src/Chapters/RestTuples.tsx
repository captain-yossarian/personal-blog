import React, { forwardRef, useRef, ForwardRefRenderFunction, FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";

const code1 = `
type Tuple = [...number[], "middle-element", ...boolean[]] // error
`;

const code2 = `
const last = (data: any) => data[data.length - 1]

const handleEmpty = (data: any[], defaultValue) => data.length === 0 ? null : defaultValue

const never = null;

const validation = (params: any[], cache: any[] = []): any[] | null => {
  if (params.length === 0 && cache.length === 0) {
    return never // never is null
  }
  const [fst, ...rest] = params;
  if (cache.length === 0) {
    if (typeof fst === 'number') {
      return handleEmpty(rest, validation(rest, [...cache, fst]))
    } else {
      return never
    }
  }
  if (typeof fst === 'number') {
    return handleEmpty(rest, validation(rest, [...cache, fst]))
  }
  if (typeof fst === "middle-element") {
    if (typeof last(cache) === 'number') {
      return handleEmpty(rest, validation(rest, [...cache, fst]))

    }
    return null
  }
  if (cache.includes('middle-element')) {
    if (typeof fst === 'boolean') {
      return handleEmpty(rest, validation(rest, [...cache, fst]))
    }
  }
  return never
}
`;

const code3 = `
type Elem = number | boolean | "middle-element";

type Last<T extends any[]> = T extends [infer _]
  ? never
  : T extends [...infer _, infer Tl]
  ? Tl
  : never

type HandleEmpty<T extends any[], Data> = T['length'] extends 0 ? never : Data

type Validation<Params extends any[], Cache extends Elem[] = []> =
  Params extends []
  ? Cache['length'] extends 0
  ? never
  : Cache
  : Params extends [infer Fst, ...infer Rest]
  ? Cache extends []
  ? Fst extends number
  ? HandleEmpty<Rest, Validation<Rest, [...Cache, Fst]>>
  : never
  : Fst extends number
  ? Last<Cache> extends number
  ? HandleEmpty<Rest, Validation<Rest, [...Cache, Fst]>>
  : never
  : Fst extends "middle-element"
  ? Last<Cache> extends number
  ? HandleEmpty<Rest, Validation<Rest, [...Cache, Fst]>>
  : never
  : "middle-element" extends Cache[number]
  ? Fst extends boolean
  ? Validation<Rest, [...Cache, Fst]>
  : never
  : never
  : never
`;

const code4 = `
type Test = Validation<[42, 43, "middle-element", false, true]> // ok
type Test2 = Validation<[42, "middle-element", true, false]> // ok

type Test3 = Validation<[false, "middle-element", 42]> // never
type Test4 = Validation<[42, false]> // never
type Test5 = Validation<[false, false, false, "middle-element", 42, "middle-element", 43]> //never
type Test6 = Validation<[false, false, false, "middle-element", 42, false, 43]> // never
type Test7 = Validation<[false, 42, "middle-element"]> // never
type Test8 = Validation<[false, "middle-element", 42, false, "middle-element", 42,]> // never
type Test9 = Validation<[false, "middle-element"]> // never
type Test10 = Validation<[false]> // never
type Test11 = Validation<[]> // never
type Test12 = Validation<[42, "middle-element", boolean, "middle-element", 43]> //never
type Test13 = Validation<[2, false, "middle-element"]> // never
`;

const code5 = `
type IsNever<T> = [T] extends [never] ? true : false;

function check<
  Params extends Elem[],
  IsValid extends Validation<Params>
>(...arr: IsNever<IsValid> extends true ? [never] : [...Params]) {
  return arr
}

/**
 * Ok
 */
const valid = check(1, 'middle-element', false)
const valid2 = check(1, 42, 43, 67, 'middle-element', false, true, false)

/**
 * Errors
 */
const test2 = check(false, "middle-element", 2)
const test1 = check(1, false)
const test3 = check()
`;

const RestTuples: FC = () => (
  <>
    <p>Assume you have to create a type for this tuple:</p>
    <Code code={code1} />
    <p>
      Above code does not work because of error N 1265
      <Var>A rest element cannot follow another rest element.</Var>
    </p>
    <p>
      Since it is impossible to create such type, we can validate it. I mean,
      create a function which will validate whether our tuple meets the
      requirements or not.
    </p>
    <p>
      Before we proceed with unreadable types, lets think how would you do it in
      plain javascript:
    </p>
    <Code code={code2} />
    <p>
      I know, this code is ugly but readable. I did not use
      <Var>Array.prototype</Var> methods, because typescript mapped types does
      not support such kind of methods. All tuple iteration are made with help of recursion.
      Above example is one-to-one representation of what we will do in type system.
    </p>
    <Code code={code3} />
    <p>I know, you think this type is unreadable, but it is pretty straightforward and repetitive.</p>
    <p>Let's test it.</p>
    <Code code={code4} />
    <p>Now we can try to use our type in function declaration.</p>
    <Code code={code5} />
    <p>It works as expected.</p>
    <p>This is very rare case, that's why I did not provide you with  line-by-line explanation, but at least you know that such validation is possible in typescript.</p>
  </>
);

export default RestTuples;
