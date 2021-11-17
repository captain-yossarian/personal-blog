import React, { FC } from "react";
import { Var } from "../Layout";
import Code from "../Shared/Code";
import { Anchor } from "../Shared/Links";

const code1 = `
export interface Recursive {
  level: string;
  children?: Recursive;
}
`;

const code2 = `
type Test<T> = {
  [Prop in keyof T]: Test<T>
}

type Result = Test<{ children: 42 }>
`;

const code3 = `
type Test<T, Tuple extends number[] = [1]> =
  5 extends Tuple['length'] ? T : {
    [Prop in keyof T]: Test<T, [...Tuple, 1]>
  }

// type Result = {
//     children: {
//         children: {
//             children: {
//                 children: {
//                     children: 42;
//                 };
//             };
//         };
//     };
// }

type Result = Test<{ children: 42 }>
`;

const code4 = `
type Test<T, Tuple extends number[] = [1]> =
  5 extends Tuple['length'] ? T : {
    [Prop in keyof T | 'level']:
    Prop extends 'level'
    ? Tuple['length']
    : Test<T, [...Tuple, 1]>
  }

// type Result = {
//     level: 1;
//     children: {
//         level: 2;
//         children: {
//             level: 3;
//             children: {
//                 level: 4;
//                 children: {
//                     children: 42;
//                 };
//             };
//         };
//     };
// }

type Result = Test<{ children: 42 }>
`;

const code5 = `
type Test<T, Tuple extends number[] = [1]> =
  (5 extends Tuple['length']
    ? T
    : {
      [Prop in keyof T | 'level']:
      (Prop extends 'level'
        ? Tuple['length'] // if Props is level use Tuple.length as indicator 
        : (Prop extends 'children' // if Prop is children
          ? (5 extends [...Tuple, 1]['length']
            // and if it is before the last one return undefined 
            ? Test<undefined, [...Tuple, 1]> 
            : Test<T, [...Tuple, 1]>)
          : Test<T, [...Tuple, 1]>)
      )
    })

type Result = {
  level: 1;
  children: {
    level: 2;
    children: {
      level: 3;
      children: {
        level: 4;
        children: undefined;
      };
    };
  };
}
`;

const code6 = `
type Test<T, Tuple extends number[] = []> =
  (5 extends Tuple['length']
    ? T
    : {
      [Prop in keyof T | 'level']:
      (Prop extends 'level'
        ? Tuple['length']
        : (Prop extends 'children'
          ? (5 extends [...Tuple, 1]['length']
            ? undefined | Test<undefined, [...Tuple, 1]> // <-------
            : undefined | Test<T, [...Tuple, 1]>) // <-------
          : never)
      )
    })
`;
const code7 = `
type Test<T, Length extends number, Tuple extends number[] = []> =
  (Length extends Tuple['length']
    ? T
    : {
      [Prop in keyof T | 'level']:
      (Prop extends 'level'
        ? Tuple['length']
        : (Prop extends 'children'
          ? (Length extends [...Tuple, 1]['length']
            ? undefined | Test<undefined, Length, [...Tuple, 1]>
            : undefined | Test<T, Length, [...Tuple, 1]>)
          : never)
      )
    })


const result: Test<{ children: 42 }, 5> = {
  level: 0,
  children: {
    level: 1,
    children: {
      level: 2,
      children: {
        level: 3,
        children: {
          level: 4,
          children: undefined
        }
      }
    }
  }
}
`;

const RecursiveDataStructures: FC = () => {
  return (
    <>
      <p>Assume you want to define recursive data structure.</p>
      <Code code={code1} />
      <p>
        Let's make it a bit complicated. What if you want to put a limit on a
        number of nested children? For now, our type allows you to provide
        infinity number of children.
      </p>
      <p>
        If you wonder, how to define recursive type with help of mapped types,
        here you have simple example.
      </p>
      <Code code={code2} />
      <p>
        If you want to restrict it to have some particular number of nested
        properties, you can add extra tuple. Why tuple? TypeScript does not
        allow you to evaluate math operations in a type scope, hence you need a
        tuple. Every iteration, you can add one element to the tuple and then
        just get the length of it. If tuple length reaches some limit - we
        return result. Let's try again.
      </p>
      <Code code={code3} />
      <p>
        There is really nothing complicated. I have used <Var>5</Var> as a max number of children. Let's add some extra property with
        level indicator.
      </p>
      <Code code={code4} />
      <p>
        As you might have noticed, in order to add some extra property it is
        better to add it to the union of keys.
      </p>
      <p>
        Since we need to stop our recursion at some point, last recursive
        property should be <Var>undefined</Var>. But how can we know whether it
        is last or not? We don't know if it last but we know if it is one before
        last. We just can use conditional type and add extra element to the
        <Var>Tuple</Var>
      </p>
      <Code code={code5} />
      <p>
        I know, it a bit hard to read, but once it clicks - it is pretty
        straightforward. These are just conditional statements mixed with
        recursion.
      </p>
      <p>
        Wait a minute, what if we want to allow less nested children but no
        more? Just add <Var>undefined</Var> before recursion is called.
      </p>
      <Code code={code6} />
      <p>Here you have complete example:</p>
      <Code code={code7} />
      <p>
        <Anchor
          text="Here"
          href="https://stackoverflow.com/questions/69990263/a-recursive-interface-for-a-react-typescript-component/69992036#69992036"
        /> you can find related answer on stackoverflow.
      </p>

      <p>
        I want to thank <Anchor href="https://cv.zerkms.com/" text="zerkms" />,
        <Anchor
          href="https://twitter.com/luke_bennett_"
          text="Luke Bennett"
        />{" "}
        and <Var>@0.sh</Var> for the support. Thank you very much!
      </p>
    </>
  );
};

export default RecursiveDataStructures;
