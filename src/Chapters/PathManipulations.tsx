import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";

const code1 = `
import React, { useState } from 'react'
import { compose, } from 'redux'
import { useDispatch } from 'react-redux'


type State = {
    name: string;
    age: number;
}

type ActionPayload = \`${"${string}/${number}"}\`

const action = (payload: ActionPayload) =>
    ({ type: 'PULL', payload })


const toPayload = ({ name, age }: State): ActionPayload => \`${"${name}/${age}"}\`

const Form = () => {
    const dispatch = useDispatch()
    const [config, handleConfig] = useState<State>({
        name: 'John',
        age: 42
    })

    const callAction = () => {
        dispatch(action(toPayload(config)))
    }

    return (
        <form>
        // a lot of inputs
            <button onClick={callAction} />
        </form>
    )
}
`;

const code2 = `
const Form = () => {
    const dispatch = useDispatch()
    const [config, handleConfig] = useState<State>({
        name: 'John',
        age: 42
    })
    // CHANGE IS HERE
    const dispatchAction = compose(dispatch, action, toPayload)

    const handleClick = () =>
        dispatchAction(config)

    return (
        <form>
        // a lot of inputs
            <button onClick={handleClick} />
        </form>
    )
}
`;

const code3 = `
import React, { useState } from 'react'
import { compose, } from 'redux'
import { useDispatch } from 'react-redux'


type State = {
    name: string;
    // TYPE IS CHANGED
    age: string;
    entitlements: string[]
}

type Action = {
    type: 'PULL',
    payload: State
}

const action = (payload: Action['payload']) =>
    ({ type: 'PULL', payload })


const toPayload = ({ name, age, entitlements }: State) =>
({
    name: name.toLowerCase(),
    age: parseInt(age, 10),
    entitlements: entitlements.filter(elem => elem !== 'admin')
})

const Form = () => {
    const dispatch = useDispatch()
    const [config, handleConfig] = useState<State>({
        name: 'John',
        age: '42',
        entitlements: ['read', 'write', 'admin']
    })
    const dispatchAction = compose(dispatch, action, toPayload)

    const handleClick = () =>
        dispatchAction(config)

    return (
        <form>
        // a lot of inputs
            <button onClick={handleClick} />
        </form>
    )
}
`;

const code4 = `
import React, { useState } from 'react'
import { compose, } from 'redux'
import { useDispatch } from 'react-redux'


type State = {
    name: string;
    age: string;
    entitlements: string[]
}

type Action = {
    type: 'PULL',
    payload: State
}

const action = (payload: Action['payload']) =>
    ({ type: 'PULL', payload })


const isNotAdmin = (entitlement: string) => entitlement !== 'admin'

const convertName = ({ name, ...rest }: State) => ({
    ...rest,
    name: name.toLowerCase(),
})

const convertAge = ({ age, ...rest }: State) => ({
    ...rest,
    age: parseInt(age, 10)
})

const convertEntitlements = ({ entitlements, ...rest }: State) => ({
    ...rest,
    entitlements: entitlements.filter(isNotAdmin)
})

const toPayload = compose(convertAge, convertName, convertEntitlements)

const Form = () => {
    const dispatch = useDispatch()
    const [config] = useState<State>({
        name: 'John',
        age: '42',
        entitlements: ['read', 'write', 'admin']
    })
    const dispatchAction = compose(dispatch, action, toPayload)

    const handleClick = () =>
        dispatchAction(config)

    return (
        <form>
        // a lot of inputs
            <button onClick={handleClick} />
        </form>
    )
}
`;

const code5 = `

type Data = {
    k2: {
        k2A: {
            k2A1: "k2A1_E",
            k2A2: "k2A2_F",
        },
        k2B: {
            k2B1: "k2B1_G",
            k2B2: "k2B2_H",
        },
    }
}

type Iterate<T> = T

// type Result = {
//     k2A1_E: ["k2", "k2A", "k2A1"];
//     k2A2_F: ["k2", "k2A", "k2A2"];
//     k2B1_G: ["k2", "k2B", "k2B1"];
//     k2B2_H: ["k2", "k2B", "k2B2"];
// }
type Result = Iterate<Data>
`;

const code6 = `
type Data = {
    k2: {
        k2A: {
            k2A1: "k2A1_E",
            k2A2: "k2A2_F",
        },
        k2B: {
            k2B1: "k2B1_G",
            k2B2: "k2B2_H",
        },
    }
}

type Iterate<Obj, Path extends any[] = []> =
    {
        /**
         * Iterate recursively through each key/value pair
         */
        [Prop in keyof Obj]:
        /**
         * If iteration hit the bottom call
         * Iterate recursively but without adding current Prop to
         * Path tuple
         */
        Obj[Prop] extends string
        ? Iterate<Obj[Prop], Path>
        /**
         * If Obj[Prop] is a nested object, call
         * Iterate recursively with adding Prop to
         * Path tuple
         */
        : Iterate<Obj[Prop], [...Path, Prop]>
    }


type Result = Iterate<Data>
`;

const code7 = `
type Iterate<Obj, Path extends any[] = []> =
    Obj extends string // <----------- added condition
    ? Record<Obj, Path> // <---------- added condition branch
    : {
        /**
         * Iterate recursively through each key/value pair
         */
        [Prop in keyof Obj]:
        /**
         * If iteration hit the bottom call
         * Iterate recursively but without adding current Prop to
         * Path tuple
         */
        Obj[Prop] extends string
        ? Iterate<Obj[Prop], Path>
        /**
         * If Obj[Prop] is a nested object, call
         * Iterate recursively with adding Prop to
         * Path tuple
         */
        : Iterate<Obj[Prop], [...Path, Prop]>
    }
`;

const code8 = `
type Result = {
    k2: {
        k2A: {
            k2A1: Record<"k2A1_E", ["k2", "k2A"]>;
            k2A2: Record<"k2A2_F", ["k2", "k2A"]>;
        };
        k2B: {
            k2B1: Record<"k2B1_G", ["k2", "k2B"]>;
            k2B2: Record<"k2B2_H", [...]>;
        };
    };
}
`;

const code9 = `
type Iterate<Obj, Path extends any[] = []> =
    Obj extends string
    ? Record<Obj, Path>
    : {
        /**
         * Iterate recursively through each key/value pair
         */
        [Prop in keyof Obj]:
        /**
         * If iteration hit the bottom call
         * Iterate recursively but without adding current Prop to
         * Path tuple
         */
        Obj[Prop] extends string
        ? Iterate<Obj[Prop], Path>
        /**
         * If Obj[Prop] is a nested object, call
         * Iterate recursively with adding Prop to
         * Path tuple
         */
        : Iterate<Obj[Prop], [...Path, Prop]>
    }[keyof Obj] // <-------------- added

`;

const code10 = `
type Values<T> = T[keyof T] // <-------------- added

type Iterate<Obj, Path extends any[] = []> =
    Obj extends string
    ? Record<Obj, Path>
    : Values<{ // <-------------- added 
        [Prop in keyof Obj]:
        Obj[Prop] extends string
        ? Iterate<Obj[Prop], Path>
        : Iterate<Obj[Prop], [...Path, Prop]>
    }>


type Result = Iterate<Data>
`;

const code11 = `
type Iterate<Obj, Path extends any[] = []> =
    Obj extends string
    ? Record<Obj, Path>
    : {
        [Prop in keyof Obj]:
        Obj[Prop] extends string
        ? Iterate<Obj[Prop], Path>
        : Iterate<Obj[Prop], [...Path, Prop]>
    }[keyof Obj] // <----- small revert for readability


// type Result =
//     | Record<"k2A1_E", ["k2", "k2A"]>
//     | Record<"k2A2_F", ["k2", "k2A"]>
//     | Record<"k2B1_G", ["k2", "k2B"]>
//     | Record<"k2B2_H", ["k2", "k2B"]>

type Result = Iterate<Data>

`;

const code12 = `

type Data = {
    k2: {
        k2A: {
            k2A1: "k2A1_E",
            k2A2: "k2A2_F",
        },
        k2B: {
            k2B1: "k2B1_G",
            k2B2: "k2B2_H",
        },
    }
}

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

type Iterate<Obj, Path extends any[] = []> =
    Obj extends string
    ? Record<Obj, Path>
    : {
        [Prop in keyof Obj]:
        Obj[Prop] extends string
        ? Iterate<Obj[Prop], Path>
        : Iterate<Obj[Prop], [...Path, Prop]>
    }[keyof Obj]


// type Result =
//     & Record<"k2A1_E", ["k2", "k2A"]>
//     & Record<"k2A2_F", ["k2", "k2A"]>
//     & Record<"k2B1_G", ["k2", "k2B"]>
//     & Record<"k2B2_H", ["k2", "k2B"]>

type Result = UnionToIntersection<Iterate<Data>>
`;

const code13 = `

type Data = {
    k2: {
        k2A: {
            k2A1: "k2A1_E",
            k2A2: "k2A2_F",
        },
        k2B: {
            k2B1: "k2B1_G",
            k2B2: "k2B2_H",
        },
    }
}

// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

type Debug<T> = { // <-------- added
    [Prop in keyof T]: T[Prop]
}

type Iterate<Obj, Path extends any[] = []> =
    Obj extends string
    ? Record<Obj, Path>
    : {
        [Prop in keyof Obj]:
        Obj[Prop] extends string
        ? Iterate<Obj[Prop], Path>
        : Iterate<Obj[Prop], [...Path, Prop]>
    }[keyof Obj]

// type Result = {
//     k2A1_E: ["k2", "k2A"];
//     k2A2_F: ["k2", "k2A"];
//     k2B1_G: ["k2", "k2B"];
//     k2B2_H: ["k2", "k2B"];
// }

type Result = Debug<UnionToIntersection<Iterate<Data>>>
`;
const navigation = {
  reverse: {
    id: "reverse",
    text: "Key path manipulations",
  },
  fp_react: {
    id: "fp_utils",
    text: "Functional programming utils",
  },
};

const links = Object.values(navigation);

const PathManipulations: FC = () => (
  <>
    <HeaderNav links={links} />
    <Header {...navigation.reverse} />
    <p>
      Imagine you need to create an interface where each key represents deepest
      nested value of input object and value is a tuple which represents a path
      to current value. A bit vogue description, is not it? Here you have an
      example:
    </p>
    <Code code={code5} />
    <p>
      In order to make it work, we need recursively iterate through input object
      and accumulate all passed props.
    </p>
    <Code code={code6} />
    <p>
      However, we still need to handle a case when we need to exit from the
      iteration. We need to do this when <Var>Obj</Var> generic parameter is no
      more object anymore. Please keep in mind that we already have a branch
      with <Var>{"Obj[Prop] extends string ? Iterate<Obj[Prop], Path>"}</Var>.
      In this case
      <Var>Iterate</Var> is called with primitive value <Var>Obj[Prop]</Var>
    </p>
    <Code code={code7} />
    <p>We ended up with weird type</p>
    <Code code={code8} />
    <p>
      This is because we forgot to add <Var>[keyof Obj]</Var> to the end of
      iteration loop.
    </p>
    <Code code={code9} />
    <p>
      Why this change is so important? This trick is also used in{" "}
      <Var>{"type Values<T> = T[keyof T]"}</Var>
    </p>
    <Code code={code10} />
    <p>It helps us to obtain only values of iterated object. We almost there</p>
    <Code code={code11} />
    <p>
      We ended up with a union of all expected key/value pairs. The only thing
      is left to do is to intersect them (merge)
    </p>
    <Code code={code12} />
    <p>
      As you might have noticed, it is hard to read output type, this is why you
      can make it more readable:
    </p>
    <Code code={code12} />
    <p>
      This is exactly what we are looking for.{" "}
      <Anchor
        text="Here"
        href="https://stackoverflow.com/questions/71200802/typescript-how-to-create-a-type-getting-all-nested-object-key#answer-71203797"
      />{" "}
      you can find related answer.
    </p>
    <p>
      Btw, small of topic. As you might have noticed, I have used{" "}
      <Var>Debug</Var> utility type to make it easier to read. If you are
      interested in debugging more complex union types you can check my{" "}
      <Anchor
        text="question"
        href="https://stackoverflow.com/questions/70926297/how-to-get-full-ast-representation-of-union-type-in-typescript"
      />
    </p>
    <Header {...navigation.fp_react} />

    <p>
      In this part of the article I'd like to show you several functional
      patterns I came across working on React projects.
    </p>
    <p>Imagine you have some form with a lot of inputs</p>
    <Code code={code1} />
    <p>
      I'm interested in <Var>callAction</Var>. In this case, we can use
      <Var>compose</Var> function from <Var>redux</Var> package. I'd willing to
      bet that since you are working with <Var>React</Var> you have it in your
      dependencies.
    </p>
    <Code code={code2} />
    <p>Let's slightly modify our example</p>
    <Code code={code3} />
    <p>
      Now we need to transform each property in state in order to make it fit to
      action payload. Above code is perfectly fine. However, in real life,{" "}
      <Var>toPayload</Var> function is usually much bigger and contains more
      business logic.
    </p>
    <p>
      Usually, I'm trying to move each piece of logic into separate function.
      Consider this example:
    </p>
    <Code code={code4} />
    <p>
      As you might have noticed, each function is now composable. I know, it
      seems redundant to create 4 extra functions for this case, and you are,
      probably right. However, in a big project, you may find more patterns, and
      all these functions might be reusable in other files/components. If
      according to project style guide it is required to use FP approach above
      examples might be helpful. Otherwise, it might be not good idea to use
      this approach only in one component.
    </p>
    <p>
      I want to thank
      <Anchor
        text="blog.feedspot.com"
        href="https://blog.feedspot.com/javascript_blogs/"
      />{" "}
      for mentioning my blog in their list.
    </p>
  </>
);

export default PathManipulations;
