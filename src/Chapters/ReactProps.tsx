import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";

const code1 = `
enum Mode {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard'
}

type Props = {
  mode: Mode;
  data: string | number | number[];
  check: (a: Props['data']) => string | number
}
`;

const code2 = `
enum Mode {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard'
}

type A = {
  mode: Mode.easy;
  data: string;
  check: (a: A['data']) => string
}

type B = {
  mode: Mode.medium;
  data: number;
  check: (a: B['data']) => number
}

type C = {
  mode: Mode.hard;
  data: number[];
  check: (a: C['data']) => number
}

type Props = A | B | C;
`;

const code3 = `
const Comp: FC<Props> = (props) => {
  // (property) check:
  // | ((a: A['data']) => string)
  // | ((a: B['data']) => number)
  // | ((a: C['data']) => number)
  props.check
  
  // check(a: never): string | number
  props.check()

  return null
}
`;

const code4 = `
const Comp: FC<Props> = (props) => {
  if (props.mode === Mode.easy) {
    props.check(props.data)
  }

  return null
}
`;

const code5 = `
const Comp: FC<Props> = ({ mode, data, check }) => {
  
  if (mode === Mode.easy) {
    check(data) // error
  }

  return null
}
`;

const code6 = `
const isEasy = <M extends Mode>(
  mode: M,
  check: Fn
): check is Extract<Props, { mode: Mode.easy }>['check'] =>
  mode === Mode.easy

const Comp: FC<Props> = ({ mode, data, check }) => {

  if (isEasy(mode, check)) {
    check('hello')
  }

  return null
}

`;

const code7 = `
type Foo = (a: string) => string;
type Bar = (a: number) => number;

declare var fn: Foo & Bar;

const x = fn(2) // nubmer
const y = fn('hello') // string
`;

const code8 = `
// Get keys where value is a function
type FnProps<T> = {
  [Prop in keyof T]: T[Prop] extends Fn ? Prop : never
}[keyof T]

// check
type Result0 = FnProps<Props>
`;

const code9 = `
type Values<T> = T[keyof T]

type FnUnion<PropsUnion> = Values<Pick<PropsUnion, FnProps<PropsUnion>>>

// | ((a: A['data']) => string) 
// | ((a: B['data']) => number) 
// | ((a: C['data']) => number)
type Result1 = FnUnion<Props>
`;

const code10 = `
type ParametersUnion<PropsUnion> =
  FnUnion<PropsUnion> extends Fn
  ? (a: Parameters<FnUnion<PropsUnion>>[0]) =>
    ReturnType<FnUnion<PropsUnion>>
  : never

// (a: string | number | number[]) => string | number
type Result2 = ParametersUnion<Props>
`;

const code11 = `
// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type Overload<PropsUnion> =
  & UnionToIntersection<PropsUnion[FnProps<PropsUnion>]>
  & ParametersUnion<PropsUnion>

// & ((a: A['data']) => string) 
// & ((a: B['data']) => number) 
// & ((a: C['data']) => number) 
// & ((a: string | number | number[]) => string | number)
type Result3 = Overload<Props>
`;

const code12 = `
type OverloadedProps<PropsUnion> =
  & PropsUnion
  & Record<FnProps<PropsUnion>, Overload<PropsUnion>>


// Props & Record<"check", Overload<Props>>
type Result4 = OverloadedProps<Props>
`;

const code13 = `
import React, { FC } from 'react'

enum Mode {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard'
}

type A = {
  mode: Mode.easy;
  data: string;
  check: (a: A['data']) => string
}

type B = {
  mode: Mode.medium;
  data: number;
  check: (a: B['data']) => number
}

type C = {
  mode: Mode.hard;
  data: number[];
  check: (a: C['data']) => number
}

type Fn = (...args: any[]) => any

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;


type Props = A | B | C;

// Get keys where value is a function
type FnProps<T> = {
  [Prop in keyof T]: T[Prop] extends Fn ? Prop : never
}[keyof T]

// check
type Result0 = FnProps<Props>

type Values<T> = T[keyof T]

type FnUnion<PropsUnion> = Values<Pick<PropsUnion, FnProps<PropsUnion>>>

// | ((a: A['data']) => string) 
// | ((a: B['data']) => number) 
// | ((a: C['data']) => number)
type Result1 = FnUnion<Props>


type ParametersUnion<PropsUnion> =
  FnUnion<PropsUnion> extends Fn
  ? (a: Parameters<FnUnion<PropsUnion>>[0]) =>
    ReturnType<FnUnion<PropsUnion>>
  : never

// (a: string | number | number[]) => string | number
type Result2 = ParametersUnion<Props>


type Overload<PropsUnion> =
  & UnionToIntersection<PropsUnion[FnProps<PropsUnion>]>
  & ParametersUnion<PropsUnion>

// & ((a: A['data']) => string) 
// & ((a: B['data']) => number) 
// & ((a: C['data']) => number) 
// & ((a: string | number | number[]) => string | number)
type Result3 = Overload<Props>

type OverloadedProps<PropsUnion> =
  & PropsUnion
  & Record<FnProps<PropsUnion>, Overload<PropsUnion>>


// Props & Record<"check", Overload<Props>>
type Result4 = OverloadedProps<Props>

const Comp: FC<OverloadedProps<Props>> = (props) => {
  const { mode, data, check } = props;

  if (props.mode === Mode.easy) {
    props.data // string
  }

  const result = check(data) // string | number

  return null
}

`;

const code14 = `
type MapPredicate<T> = T

type MakeOptional<
  Arr extends Array<unknown>,
  Result extends Array<unknown> = []
  > = Arr extends []
  ? []
  : Arr extends [infer H]
  ? Result['length'] extends 0
  ? [...Result, MapPredicate<H>]
  : [...Result, MapPredicate<H>?] // make optional
  : Arr extends [infer Head, ...infer Tail]
  ? MakeOptional<[...Tail], [...Result, MapPredicate<Head>]>
  : Readonly<Result>;

type Head<T> =
  T extends [infer Head]
  ? Head
  : T extends [infer Head, ...infer _]
  ? Head : never;

type Tail<T> =
  T extends [infer _, ...infer Tail]
  ? Tail
  : never;

type ParametersUnion<PropsUnion> =
  FnUnion<PropsUnion> extends Fn
  ? (
    fst: Head<Parameters<FnUnion<PropsUnion>>>,
    ...rest: Tail<MakeOptional<Parameters<FnUnion<PropsUnion>>>>
  ) =>
    ReturnType<FnUnion<PropsUnion>>
  : never

// (
//   fst: string | number | number[],
//   ...rest: [] | [(string[] | undefined)?]
// ) => string | number
type Result2 = ParametersUnion<Props>
`;

const code15 = `
type ParametersUnion<PropsUnion> =
  FnUnion<PropsUnion> extends Fn
  ? <Var extends Parameters<FnUnion<PropsUnion>>>(
    fst: Head<Var>,
    ...rest: Tail<MakeOptional<Var>>
  ) =>
    ReturnType<FnUnion<PropsUnion>>
  : never
`;
const navigation = {
  first: {
    id: "first",
    text: "First example",
  },
};
const links = Object.values(navigation);

const ReactProps: FC = () => (
  <>
    <p>
      In this article, I will describe some issues you may encounter making
      illegal props unrepresentable in React.
    </p>
    <p>Let's start with simple example:</p>
    <Code code={code1} />
    <p>
      In order to make illegal state unrepresentable, we can split the props
      into 3 types:
    </p>
    <Code code={code2} />
    <p>
      Looks better now, but we still have a problem. Try to call{" "}
      <Var>check</Var> callback in React component or any other function
    </p>
    <Code code={code3} />
    <p>
      Because function arguments are in contravariant position, they are merged
      into never because <Var>string {"&"} number</Var> is <Var>never</Var>
    </p>
    <p>There are several ways to handle this:</p>
    <Code code={code4} />
    <p>Unfortunatelly, it does not work with destructure</p>
    <Code code={code5} />
    <p>
      <Anchor
        href="https://github.com/microsoft/TypeScript/issues/12184"
        text="Here"
      />
      you can find an explanation
    </p>
    <p>The most easiest way here is just to add typeguard.</p>
    <Code code={code6} />
    <p>
      It works, but <Var>check</Var> argument in typeguard is unused and we
      still can't use <Var>data</Var> variable from props
    </p>
    <p>
      So, we either can make much complicated typeguard or we can add one more
      typeguard for <Var>data</Var> argument{" "}
    </p>
    <p>
      If you don't want to make refactor, neither of above approaches does not
      work for you.
    </p>
    <p>
      Every time you provide new function to your code, you have to test it.
    </p>
    <p>In this case, I want to show you only the type way.</p>
    <p>
      In order to make it work, we have to overload our <Var>check</Var>{" "}
      callback.
    </p>
    <p>
      You don't have to write all possible cases above the function definition,
      you can just write intersection of all possible function types.
    </p>
    <p>See simple example:</p>
    <Code code={code7} />
    <p>
      Hence, we need to do the same with our <Var>Props</Var> union
    </p>
    <p>We can split our task into 5 smaller.</p>
    <p> 1. Get key name where property is a function.</p>
    <Code code={code8} />
    <p>2. Get union of all functions.</p>
    <Code code={code9} />
    <p>3. Compute less specific overload</p>
    <Code code={code10} />
    <p>
      4. In order to convert function union to overloads, we need to use
      intersection instead of union. So, lets merge our function union with less
      specific overload
    </p>
    <Code code={code11} />
    <p>
      5. And the last step. Wee need merge our union with overloaded function.
      In other words, we will just override our <Var>check</Var>property
    </p>
    <Code code={code12} />
    <p>Full example:</p>
    <Code code={code13} />
    <p>
      <Anchor
        text="Playground"
        href="https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDGMA0cDecBiAwnAL5wBmUEIcA5FKhrQFDNIB2ArjQLIQAmSXMzhxUAZwCecALx0Jk2phFwQSfsG6y6ajdyUqAFiij9ttY6ZYlWMSWCEBBbThUgBSAFxw+ggHQKANwq-CgwKN7iMFDA7ADmwaJohkhoANbeABQRcI4A2rSh4bQAugCUsgB8cFEx8cw2zHYOcABCLm4e3r5IfrqaIIlwRTlcIABGSFBDyakZcNnerQUjpRUy1WOTUA229kLEcq6i7oLdHn6W-EMj3ltTeSUzKelZOYQrYShrVXD3O41mkJ8OxtJk-BCTHFxN4UOxJI91tU4ZJWAB6NFwNAMDQwcRwOIQJD4mAQOCGGAwMAwjFRdBpCAANym5AANhAAO5+NDUNEoNEAVgADABmADsAoATAAOABsTX2cAAquxgBB2AAVCAASXYMCm4lSMDV7AAPErqnJMkqxAAPfXsfj4lFwAD8C3mSqRcEZEGAZjuSGZUAqSHtHCdCxU81i5CmcG1zG9vv9KndidEgeDwT2LQAClRqdpnAAfNpwMuEHMYuAAcSQ8DSSEk+I5KQYPpQrM4QmAzoonHYGBNCpaIILEGppo1luEojyE7AcFicCbkgg5DgGpK3g1C8LJTtDsjILdcEXcCzUwaeTXG63JXRmNm6VHQmQ4k4rJgQu048L4imou4iVLmQgAGpdj2gEztoe53pu25gQQ7AqiaQEAWh6qzpB3bEkBwDpBhk7iFh7DYP+JHEdSZGVHRT4Vgsiy5J8xTlL8tSxHEFTMDWZaZMxyyFF8PwbH83DbDxfFMe8rHfOxYn-GUb6IMSX4wAAjH+qGquq1EgawKl5iYKBqPqUCkbpZrAbRsgqCCZH6bZYbHviIJpgsOTGVApkNgapoOVZTlWXReRCgpoGiKIyAwJwUCavsAU6ehNkhZFl5-EG168ZizGcfEjH-IVEkPBFNTRFxxUTNeQKqZ+36Sto3m+eZlkpQBoHIQA8sG7IoPwwUmpaKgAGTKlZWq6q1RrtSRZF5JRU6pUNJTpWNzVmQajnLdhDFjQJOT5MJbHevl3FwDlcD7YJcmiZsJUhhdNbXbJx3yd6SlPZiL2RBVBVlkVAMPYiHF-XEVWSSpH7qSK2g9VMfUDcBnW1fDUCI+owGDdhdmiOtmFWaNqk8qYSVYzt7CVNgaOI9jlOdZdwFXcT0ADQARC+aRs9TvUQP1+n0bV0PfgALHDvP9ZjAEC6wPLsFEcCENQYDeEQpo03zgj8OTHWzpkYAAd6xxYuqCt4KcSDYCM2Cc6Q2gGyROaiMAm76wBfQeLIMhyD0AQoFIFTG6IDvUn4IwqI0SSm-ADD1fAcic5kIwVDWZ0Q9logMLF8XiayrK7EAA"
      />
    </p>
    <p>
      I'm not claim that it is safely or better than using typeguards. You can
      use this approach if you don't want to provide any changes to business
      logic of your application. After this change, nobody will ask you to write
      unit tests :)
    </p>
    <p>
      I know what you are thinking about. What if I have more than one argument?
    </p>
    <p>
      In this case just replace <Var>ParametersUnion</Var> utility type
    </p>
    <Code code={code14} />
    <p>You may have noticed that the code is a bit repetitive. We can fix it</p>
    <Code code={code15} />
    <p>That's all. I hope it helps you.</p>
  </>
);

export default ReactProps;
