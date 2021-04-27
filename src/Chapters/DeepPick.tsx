import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Link } from "react-router-dom";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
const result = deepPick({ user: { name: 'John' } }, 'user', 'name') // John
`;

const code2 = `
type Foo = {
    user: {
        description: {
            name: string;
            surname: string;
        }
    }
}
`;
const code3 = `
type FirstAttempt<T> = {
    [P in keyof T]: [T[P]]
}
`;

const code4 = `
type Primitives = string | number | symbol;

type SecondAttempt<T> = {
    [P in keyof T]: T[P] extends Primitives ? [P] : SecondAttempt<T[P]>
}

// { name: ["name"]; surname: ["surname"]; }
type Result = SecondAttempt<Foo>['user']['description'] 
`;

const code5 = `
type Foo = {
    user: {
        description: {
            name: string;
            surname: string;
        }
    }
}

type Primitives = string | number | symbol;

type ThirdAttempt<T, Cache extends Array<Primitives> = []> = {
    [P in keyof T]: T[P] extends Primitives
    ? [...Cache, P]
    : ThirdAttempt<T[P], [...Cache, P]>
}

// {
//     name: ["user", "description", "name"];
//     surname: ["user", "description", "surname"];
// }
type Result = ThirdAttempt<Foo>['user']['description']
`;

const code6 = `
type Foo = {
    user: {
        description: {
            name: string;
            surname: string;
        }
    }
}

type Primitives = string | number | symbol;

type FourthAttempt<T, Cache extends Array<Primitives> = []> = {
    [P in keyof T]: T[P] extends Primitives
    ? [...Cache, P]
    : FourthAttempt<T[P], Cache | [...Cache, P]>
}

type Result = FourthAttempt<Foo>['user']['description']
`;

const code7 = `
type Foo = {
    user: {
        description: {
            name: string;
            surname: string;
        }
    }
}

type Primitives = string | number | symbol;

type FifthAttempt<T, Cache extends Array<Primitives> = []> =
    T extends Primitives ? Cache : {
        [P in keyof T]: FifthAttempt<T[P], Cache | [...Cache, P]>
    }

type Result = FifthAttempt<Foo>
`;
const code8 = `
type Foo = {
    user: {
        description: {
            name: string;
            surname: string;
        }
    }
}

type Primitives = string | number | symbol;
type Values<T> = T[keyof T]

type SixthAttempt0<T, Cache extends Array<Primitives> = []> =
    T extends Primitives ? Cache : Values<{
        [P in keyof T]: SixthAttempt0<T[P], Cache | [...Cache, P]>
    }>

type Result = SixthAttempt0<Foo>

/**
 * You can avoid using extra Values type, just add [keyof T] at the end
 */
type SixthAttempt1<T, Cache extends Array<Primitives> = []> =
    T extends Primitives ? Cache : {
        [P in keyof T]: SixthAttempt1<T[P], Cache | [...Cache, P]>
    }[keyof T]
`;

const code9 = `
type Foo = {
    user: {
        description: {
            name: string;
            surname: string;
        }
    }
}

type Primitives = string | number | symbol;
type FinalAttempt<T, Cache extends Array<Primitives> = []> =
    T extends Primitives ? Cache : {
        [P in keyof T]:
        | [...Cache, P] // <------ it should be unionized with recursion call
        | FinalAttempt<T[P], [...Cache, P]>
    }[keyof T]

type Result = FinalAttempt<Foo>
`;

const code10 = `
type Foo = {
    user: {
        description: {
            name: string;
            surname: string;
        }
    }
}

type Primitives = string | number | symbol;

type FinalAttempt<T, Cache extends Array<Primitives> = []> =
    T extends Primitives ? Cache : {
        [P in keyof T]:
        | [...Cache, P]
        | FinalAttempt<T[P], [...Cache, P]>
    }[keyof T]

declare function deepPick<Obj,>(obj: Obj, ...keys: FinalAttempt<Obj>): void
declare var foo: Foo;

deepPick(foo, 'user'); // ok
deepPick(foo, 'user', 'description') // ok
deepPick(foo, 'description') // expected error
`;

const code11 = `
function deepPick<Obj >(obj: Obj, ...keys: FinalAttempt<Obj>){
    return keys.reduce((acc,elem)=>acc[elem], obj) // <-- errors
}
`;

const code12 = `
const deepPick = <Obj, Keys extends FinalAttempt<Obj> & string[]>
    (obj: Obj, ...keys: Keys) =>
    keys.reduce((acc, elem) => acc[elem], obj as any)
`;

const code13 = `
type Elem = string;

type Predicate<Result extends Record<string, any>, T extends Elem> =
    T extends keyof Result ? Result[T] : never

type Reducer<
    Keys extends ReadonlyArray<Elem>,
    Accumulator extends Record<string, any> = {}
    > =
    /**
     *  If Keys is empty array, no need to call recursion, 
     *  just return Accumulator
     */
    Keys extends []
    ? Accumulator
    /**
     * If keys is one element array,
     * 
     */
    : Keys extends [infer H]
    ? H extends Elem
    /**
     * take this element and call predicate 
     */
    ? Predicate<Accumulator, H>
    : never
    /**
     * If Keys is an Array of more than one element
     */
    : Keys extends readonly [infer H, ...infer Tail]
    ? Tail extends ReadonlyArray<Elem>
    ? H extends Elem
    /**
     * Call recursion with Keys Tail
     * and call predicate with first element 
     */
    ? Reducer<Tail, Predicate<Accumulator, H>>
    : never
    : never
    : never;
`;

const code14 = `
const reducer = (keys: string[], accumulator: Record<string, any> = {}) => {
    const predicate = (obj,prop)=>obj[prop]

    if (keys.length === 0) {
        return accumulator;
    }
    if (keys.length === 1) {
        const [head] = keys;
        return reducer([], predicate(accumulator, head))
    }

    if(keys.length>1){
        const [head, ...tail]=keys;
        return reducer(tail, predicate(accumulator, head))
    }
}
`;

const code15 = `
interface Test {
    test1: string;
    test2: {
        test2Nested: {
            something: string;
            somethingElse: string;
            test3Nestend: {
                end: string
            }
        };
    };
}

type Primitives = string | number | symbol;

type NestedKeys<T, Cache extends Array<Primitives> = []> = T extends Primitives ? Cache : {
    [P in keyof T]: [...Cache, P] | NestedKeys<T[P], [...Cache, P]>
}[keyof T]


const test: Test = {
    test1: "",
    test2: {
        test2Nested: {
            something: "",
            somethingElse: "",
            test3Nestend: {
                end: 'end'
            }
        },
    },
}

type Elem = string;

type Predicate<Result extends Record<string, any>, T extends Elem> =
    T extends keyof Result ? Result[T] : never

type Reducer<
    Keys extends ReadonlyArray<Elem>,
    Accumulator extends Record<string, any> = {}
    > =
    /**
     *  If Keys is empty array, no need to call recursion, 
     *  just return Accumulator
     */
    Keys extends []
    ? Accumulator
    /**
     * If keys is one element array,
     * 
     */
    : Keys extends [infer H]
    ? H extends Elem
    /**
     * take this element and call predicate 
     */
    ? Predicate<Accumulator, H>
    : never
    /**
     * If Keys is an Array of more than one element
     */
    : Keys extends readonly [infer H, ...infer Tail]
    ? Tail extends ReadonlyArray<Elem>
    ? H extends Elem
    /**
     * Call recursion with Keys Tail
     * and call predicate with first element 
     */
    ? Reducer<Tail, Predicate<Accumulator, H>>
    : never
    : never
    : never;


const deepPick = <Obj, Keys extends NestedKeys<Obj> & string[]>
    (obj: Obj, ...keys: Keys): Reducer<Keys, Obj> =>
    keys.reduce((acc, elem) => acc[elem], obj as any)

// ok
deepPick(test, 'test1') 

// expected error
deepPick(test, 'test1', 'test2Nested')

// ok
deepPick(test, 'test2') 

// ok -> {  something: string;  somethingElse: string; test3Nestend: { end: string;  }; }
const result = deepPick(test, 'test2', 'test2Nested') 

// ok -> {end: stirng}
const result3 = deepPick(test, 'test2', 'test2Nested', 'test3Nestend') 

// expeted error
deepPick(test, 'test2', 'test2Nested', 'test3Nestend', 'test2Nested')

// ok -> string
const result2 = deepPick(test, 'test2', 'test2Nested', 'test3Nestend', 'end') 

// expected error
deepPick(test, 'test2', 'test2Nested', 'test3Nestend', 'end', 'test2') 
`;
const navigation = {
  all_keys: {
    id: "all_keys",
    text: "Get all possible variants of keys",
  },
  deep_pick: {
    id: "deep_pick",
    text: "Get value by property path (deep pick)",
  },
};

const links = Object.values(navigation);

const DeepPick: FC = () => (
  <>
    <HeaderNav links={links} />
    <p>
      In this article I will try to implement something similar to
      <Var>lodash.get</Var> function.
    </p>
    <p>This is what I want to implement:</p>
    <Code code={code1} />
    <Header {...navigation.all_keys} />
    <p>
      First of all, we should validate <Var>rest</Var> arguments because they
      should be in right order. Let's assume we have next object:
    </p>
    <Code code={code2} />
    <p>
      Now, we need to generate array of all allowed keys.In order to do that, we
      need to iterate through every key and replace type property with array of
      keys.
    </p>
    <p>Does it make sense for You?</p>
    <Code code={code3} />
    <p>
      Above code does not make any sense. We need to iterate through every
      nested property, hence, we need to make it recursively. Let's try again.
      But now, we need call recursion only if property is not primitive.
    </p>
    <Code code={code4} />
    <p>
      It is looks better now, but we did not receive full path to{" "}
      <Var>name and surname</Var>. We only have an array of last non primitive
      property.
    </p>
    <p>Seems, we need some cache.</p>
    <Code code={code5} />
    <p>
      Looks a way better now. But we need all possible values. User should be
      able to get not only primitive values. We should allow user to get{" "}
      <Var>['user', 'description']</Var>
    </p>
    <p>
      We can try to pass <Var>Cache</Var> as a union of previous and next type
    </p>
    <Code code={code6} />
    <p>
      Seems we are closer now. Pls keep in mind, we still need a union of arrays
      instead of some weird object. Btw, it is still does not feet our
      requirements
    </p>
    <p>Let's move our condition statement one level up.</p>
    <Code code={code7} />
    <p>
      Assume we have our union of arrays in one place, as a value of deepest
      keys. How we can get it? I'd willing to bet that You are aware of famous
      utility type <Var>{`type Values<T>=T[keyof T]`}</Var>
    </p>
    <Code code={code8} />
    <p>We still have a logical error in our code. Let's fix it.</p>
    <Code code={code9} />
    <p>Finally we did it. Are You bored? Feel free to make a break.</p>
    <p>So far we did only 50% of our work.</p>
    <Code code={code10} />
    <p>
      What about our <Var>ReturnType</Var>?
    </p>
    <p>
      Btw, if You will try to write implementation for this function, You will
      get an errors:
    </p>
    <Code code={code11} />
    <p>
      In order to make it work, we should assure TS that <Var>keys</Var> has not
      any problems with infinity recursion and it is an array of strings. Also,
      pls don't judge me for type assertion. AFAIK, if You want write typings
      for <Var>reduce</Var>, no way You can avoid <Var>as</Var>.
    </p>
    <Code code={code12} />
    <Header {...navigation.deep_pick} />
    <p>
      Let's write type for picking the object property. I decided to implement
      deep picking exactly how we did it in function. I think it will help You
      to understand how does it work under the hood. Ok, ok, You cought me. I
      just don't know how to do it in other way :)
    </p>
    <Code code={code13} />
    <p>
      If it is hard to understand what I did here, no worries, it is hard for me
      either.
    </p>
    <p>Here you have pure js analogy:</p>
    <Code code={code14} />
    <p>Ok, we are done, here is the full code:</p>
    <Code code={code15} />
    <p>
      <Anchor
        href="https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCoQM5mQbwLABQyxykWAjAFzJZSgDmA3ISaZmAEzX5GslmcAcuwgATbiz5SMAewC2EMAAsG1Wg2a8prWQuUMAogBsMENWDogmk7f3YBmYVgghxuG7b4u36qx9sAvv4kAZqsoYRBBIRgAJ4ADigACnRywGDAAG6YyAC8NBYMyAA+yCAArnIARtAlNLHVMkaaMQkoTpCiANIQsRgAPKgANMgAwohKKBAAHpCuGMgAglBQcLH9KcBpGdkYAHx5yADaALoH+ajIM3OiC5vbWTkA-GMTKBJax0nIoMgA1r0ZDA0CdqEcAHSQ8YISYjJInOodMQ9PqDI7wkYQqFvOFnSJHAGxIEgwikggIGQgLBsLDUdDU-I8VgCKjIABEbKGHgEXHcn2Z7A4SLcTM8xF0ihUVmoHK5-O0Ev0VmMphlnOCUgEjhErg+Yqk3moAHJvEaNXwooE5eE5VFWolkMYIHJDr5rNECHEHSkxMAEHBIP0AEqYcpGbDXbwLEMUqCifpukZwECxPYjS6R+aOozO84eDOzKP-QHAkMYMPYF5litHVAI6ggCDZKBkr0oEOicpIKD9DwohaZ27IENwUSUoyxZardZOuRpjyLBAISphgMyKBXQtZmPr+OJ5DJ1OHHCWkh5z4AegAVFf-FfiABJYH9n4DuTxOIHlZrEYgGRlCAxFIf9-SMIxkCgCBlygDBgEpEY72IAArcpqUgsByigEAliXFcjDXFt+SvC8+16ActyHU4PBeRdlzkVcwHXDxr1vIjkCfYs+lfZBKSmHMFHAL9p2tVh7zvEjPmoF9BwWI5QBgWoAAkTmo5BFM3G4FlnZib0QsA4ABUgVAHfiXGwZNRGQUDwPiSDRD9AMUHE1SfXs-1A1ovCCJGRS9g8Bsm2gHTWL4e8OJfYAFmTJZv1iHjgTkdcUGUaLeKuUzwGcyTkGkiiFkg0dxziuSQAUjdFJGSFwXk2pUDgYAjBUz4XjqhqNKLEcxxACcpzWfpZz85q1ParNtMvXS2PGMCIKgzDYMpZAAHd0iUHKyLQeqjEQiyrLgabbN9dyUGW5RkBgYAYIjDLsCy1gqzELtoEGTa4TshyPNw+j8MYqAfL2QbWAC5t-IA4HssbZsWg9CkqWwURAPiJI-T+Q5+gAeSqJCRlyzTkGFft0cxg4ADICksehTj2AAKGRMeoDGseQKrCQwKSyIASmoDtHp7fsRgZ84AZIFnwTsx6qapxAEBGCB+PZvIDilo5ZedE4RlppCDyilN2bJeGIER5GqYEEYjRZI15YvC8eL+Qh9cNhA-mN9hTfN13BWFC3kCtzdEgQTorhWJiCHtpHHedrB3awDgvZ9mRbfJSk0NDcNDlDo2TeQM3BSNKOhBEURY+t+PkAAWgOHBxXkSVVDJjQq70KV6BVMw66sRgaTAbVnF1XArl7t0O+QUJh8IGHk-LcN7DThGw6dzPs+j3Os55T28+7m4i5tsuK8NAoLqsKJ0-DheeWXxf8+cQv16RVxz9Xgut5mRIA+gKBg-H7BIMnzgZ4NueI5gDzjHYBa8V4OFvtfLOppLbFxRuXNu9A7azwzi7cBS9QGPxvjqKBJo77AKftMP2r8g6ETJEAA"
        text="Playground"
      />
    </p>
    <p>
      As You may have noticed, above function can throw an error, if property
      does not exists in the object. I did not take into account optional
      properties. It is up to You to make it safer. All I wanted is to write
      some types.
    </p>
  </>
);
export default DeepPick;
