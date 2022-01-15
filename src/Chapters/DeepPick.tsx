import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
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
    [P in keyof T]: [P]
}
`;

const code4 = `
type Primitives = string | number | symbol;

type SecondAttempt<Obj> = {
    [Prop in keyof Obj]: Obj[Prop] extends Primitives ? [Prop] : SecondAttempt<Obj[Prop]>
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

type ThirdAttempt<Obj, Cache extends Array<Primitives> = []> = {
    [Prop in keyof Obj]: Obj[Prop] extends Primitives
    ? [...Cache, Prop]
    : ThirdAttempt<Obj[Prop], [...Cache, Prop]>
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

type FourthAttempt<Obj, Cache extends Array<Primitives> = []> = {
    [Prop in keyof Obj]: Obj[Prop] extends Primitives
    ? [...Cache, Prop]
    : FourthAttempt<Obj[Prop], Cache | [...Cache, Prop]>
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

type FifthAttempt<Obj, Cache extends Array<Primitives> = []> =
    Obj extends Primitives ? Cache : {
        [Prop in keyof Obj]: FifthAttempt<Obj[Prop], Cache | [...Cache, Prop]>
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
type Values<Obj> = Obj[keyof Obj]

type SixthAttempt0<Obj, Cache extends Array<Primitives> = []> =
    Obj extends Primitives ? Cache : Values<{
        [Prop in keyof Obj]: SixthAttempt0<Obj[Prop], Cache | [...Cache, Prop]>
    }>

type Result = SixthAttempt0<Foo>

/**
 * You can avoid using extra Values type, just add [keyof T] at the end
 */
type SixthAttempt1<T, Cache extends Array<Primitives> = []> =
    Obj extends Primitives ? Cache : {
        [Prop in keyof Obj]: SixthAttempt1<Obj[Prop], Cache | [...Cache, Prop]>
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
type FinalAttempt<Obj, Cache extends Array<Primitives> = []> =
    Obj extends Primitives ? Cache : {
        [Prop in keyof Obj]:
        | [...Cache, Prop] // <------ it should be unionized with recursion call
        | FinalAttempt<Obj[Prop], [...Cache, Prop]>
    }[keyof Obj]

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

type FinalAttempt<Obj, Cache extends Array<Primitives> = []> =
    Obj extends Primitives ? Cache : {
        [Prop in keyof Obj]:
        | [...Cache, Prop]
        | FinalAttempt<Obj[Prop], [...Cache, Prop]>
    }[keyof Obj]

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

const code11_1 = `
type ValuesUnion<Obj, Cache = Obj> =
    Obj extends Primitives ? Obj : Values<{
        [Prop in keyof Obj]:
        | Cache | Obj[Prop]
        | ValuesUnion<Obj[Prop], Cache | Obj[Prop]>
    }>
`;

const code12 = `
const hasProperty = <Obj, Prop extends Primitives>(obj: Obj, prop: Prop)
    : obj is Obj & Record<Prop, any> =>
    Object.prototype.hasOwnProperty.call(obj, prop);

function deepPick<Obj, Keys extends FinalAttempt<Obj> & Array<string>>
    (obj: ValuesUnion<Obj>, ...keys: Keys) {
    return keys
        .reduce(
            (acc, elem) => hasProperty(acc, elem) ? acc[elem] : acc,
            obj
        )
}
`;

const code13 = `
type Elem = string;

type Acc = Record<string, any>

// (acc, elem) => hasProperty(acc, elem) ? acc[elem] : acc
type Predicate<Accumulator extends Acc, El extends Elem> =
    El extends keyof Accumulator ? Accumulator[El] : Accumulator

type Reducer<
    Keys extends ReadonlyArray<Elem>,
    Accumulator extends Acc = {}
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
type Foo = {
    user: {
        description: {
            name: string;
            surname: string;
        }
    }
}

declare var foo: Foo;

/**
 * Common utils
 */

type Primitives = string | number | symbol;

type Values<T> = T[keyof T]

type Elem = string;

type Acc = Record<string, any>

// (acc, elem) => hasProperty(acc, elem) ? acc[elem] : acc
type Predicate<Accumulator extends Acc, El extends Elem> =
    El extends keyof Accumulator ? Accumulator[El] : Accumulator

type Reducer<
    Keys extends ReadonlyArray<Elem>,
    Accumulator extends Acc = {}
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

const hasProperty = <Obj, Prop extends Primitives>(obj: Obj, prop: Prop)
    : obj is Obj & Record<Prop, any> =>
    Object.prototype.hasOwnProperty.call(obj, prop);


/**
 * Fisrt approach
 * 
 */

type KeysUnion<T, Cache extends Array<Primitives> = []> =
    T extends Primitives ? Cache : {
        [P in keyof T]:
        | [...Cache, P]
        | KeysUnion<T[P], [...Cache, P]>
    }[keyof T]

type ValuesUnion<T, Cache = T> =
    T extends Primitives ? T : Values<{
        [P in keyof T]:
        | Cache | T[P]
        | ValuesUnion<T[P], Cache | T[P]>
    }>

function deepPickFinal<Obj, Keys extends KeysUnion<Obj> & ReadonlyArray<string>>
    (obj: ValuesUnion<Obj>, ...keys: Keys): Reducer<Keys, Obj>

function deepPickFinal<Obj, Keys extends KeysUnion<Obj> & Array<string>>
    (obj: ValuesUnion<Obj>, ...keys: Keys) {
    return keys
        .reduce(
            (acc, elem) => hasProperty(acc, elem) ? acc[elem] : acc,
            obj
        )
}

/**
 * Ok
 */
const result = deepPickFinal(foo, 'user') // ok
const result2 = deepPickFinal(foo, 'user', 'description') // ok
const result3 = deepPickFinal(foo, 'user', 'description', 'name') // ok
const result4 = deepPickFinal(foo, 'user', 'description', 'surname') // ok

/**
 * Expected errors
 */
const result5 = deepPickFinal(foo, 'surname')
const result6 = deepPickFinal(foo, 'description')
const result7 = deepPickFinal(foo)
`;

const code16 = `
type Foo = {
    user: {
        description: {
            name: string;
            surname: string;
        }
    }
}

declare var foo: Foo;

type Primitives = string | number | symbol;


type Util<Obj, Props extends ReadonlyArray<Primitives>> =
    Props extends []
    ? Obj
    : Props extends [infer First]
    ? First extends keyof Obj
    ? Obj[First]
    : never
    : Props extends [infer Fst, ...infer Tail]
    ? Fst extends keyof Obj
    ? Tail extends string[]
    ? Util<Obj[Fst], Tail>
    : never
    : never
    : never

// credits https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379091887
type IsNeverType<T> = [T] extends [never] ? true : false;

type IsAllowed<T> = IsNeverType<T> extends true ? false : true;
type Validator<T extends boolean | string> = T extends true ? [] : [never]
type ValuesUnion<T, Cache = T> =
    T extends Primitives ? T : {
        [P in keyof T]:
        | Cache | T[P]
        | ValuesUnion<T[P], Cache | T[P]>
    }[keyof T]

const hasProperty = <Obj, Prop extends Primitives>(obj: Obj, prop: Prop)
    : obj is Obj & Record<Prop, any> =>
    Object.prototype.hasOwnProperty.call(obj, prop);


function pick<
    Obj,
    Prop extends string,
    Props extends ReadonlyArray<Prop>,
    Result extends Util<Obj, Props>>
    (
        obj: ValuesUnion<Obj>,
        props: [...Props],
        ..._: Validator<IsAllowed<Result>>
    ): Util<Obj, Props>;

function pick<
    Obj,
    Prop extends string,
    Props extends ReadonlyArray<Prop>,
    Result extends Util<Obj, Props>>(
        obj: ValuesUnion<Obj>,
        props: [...Props],
        ..._: Validator<IsAllowed<Result>>) {
    return props.reduce(
        (acc, prop) => hasProperty(acc, prop) ? acc[prop] : acc,
        obj
    )
}

/**
 * Ok
 */
const result8 = pick(foo, ['user', 'description']) // ok
const result9 = pick(foo, ['user', 'description', 'name']) // ok

/**
 * Expected errors
 */

const result10 = pick(foo, ['description']) // error
const result11 = pick(foo, ['name']) // ok
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
  second_approach: {
    id: "second_approach",
    text: "Second approach",
    
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
      instead of some weird object. Btw, it is still does not meet our
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
      any problems with infinity recursion and it is an array of strings.
      Further more, how would you type
      <Var>reducer</Var> predicate? Since, every iteration it returns different
      type.
    </p>
    <p>
      We can type it in same way we typed union of keys (<Var>FinalAttempt</Var>
      ), but this time let's make a union of values. It returns all combinations
      of <Var>Foo</Var> values.
    </p>
    <Code code={code11_1} />
    <Code code={code12} />
    <Header {...navigation.deep_pick} />
    <p>
      Let's write type for picking the object property. I decided to implement
      deep picking exactly how we did it in a function. I think it will help You
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
        href="https://www.typescriptlang.org/play?#code/LAKALgngDgpgBAMQPZLgXjgb1HXcCuAzjAE4BcWOe1AJjIQMYkCWUYzSAdhdiNf3k4BDALYwKhMC04BzANxUB1QvhLCxEqc1kK+SgL6K4hkCdB0GAGyEl4ANxtwAZigrIku0AHoAVD5w+cADCSCIiXATsloQBXqCgkLBwAAosIszsdvTocJLSMnAAPnCc+CIARqRFuRAVSJae4NDwAGpClvj0ADwAKgB8OT0A2gDWMBBITnA9ALrxTUkAopYwIjl52vLzifAAggwMOQBKMAxIJDRdG7IANHBCnBB9815ecAAUQgd3MCsiAJToAYACyEhFSSFgJEgn2+cF+q0BAH57gchgiRDM4BQvgwEs0UrYaMwGEIwDAuvsGGV8NYwOd4QAPcmcGiEOBUu7LJkstlwZarAZoIzcmDMmCs9ljCZTKk0ukMlFykS0snnIbLLEUZWq+kkbYEk40fAMUhdIwAaXG7LFvPZJyENC4lgguxIJCEEC6ApEfRuRh1CpIPIlfKpOUwJmoQqMvn8ejwgTgAEkplaIOzmDaRGwIPd3Z67pxUJwYDAaHB6XBSZZLHBbNSSIQOJw7kY4EmAFZEMD1mBgVScDkHeVq-UJ3A+OIT9M28WSuBDOYTpUjlVB2N+duBVNwaWZ9lceAYiW9mweiD+icduDb6fUCizkMLobaJxVAASy+oKI-z75PqbvG-CBGAQhjJWwJZvCfynvcrLVu0dZQESJJkvAd5GCiqTlmh5KUmuurnHcH7PBOFCllk47UHG24pmm1pwNBDwcgWeaTHA4S2JBLFHjBqynph5FwE+tqhuytiOs6eavpw77Bh+dwAHQqW+VQ9EIzCWN+eAohpWn-vaMBSZwLpuhe3p-GRP5wH+YkLoBE60degRBEhfaNs2EQAO4ZMCImMfplh0Q8FY1shqGkuScC+WA-lOMwTa9ienC9kJNlGiaZpBXcOHElFFKBmOJF9NZeAUTAVFGBVVXCZRpCNGcnCSHAoLgiQkKkJAORdAA8uUna5R1UCGYSzDpJk9B9O8SADRQ-WDXAKGQhQEJQP81VwLNnZMeyC1wAAZHAJxnBcXRrXcDxPECRgLacYBKct9I7EpbW9d5nBrV1EBKeFM0DXcy3rY03hbnwgQIFm0L3FAy1fMCAS3uD074kks4AKqcC2vR3G5DDAse85hmx51pBkzBZIQQqLjMMYTj0o2pON5OU3AKJ4wT2KUNeeBDMkTFDtKHGzGQ7Z4MUQwqUpHMwLlOkCMUGNY1wvR8zMdySypMty2VuD6KM4zC8uqOtO0nSEJj2M9Lj8PwBg-ToEYDP2XyTMTRT2R6VzbQdN0vBKIu-PaHuhtTCLYu4MUMvVMMyTy-wxQ++blsq7H6vBLbMdq7rxhkaATj4JwDDsBEdAwFAyQkiMkPCJYfUAwFGajUr2MLQMR0Ok6pmuiT1wyKVRj-Z2FBJ-QKecPXnZ+nAUv7o+1r-BQmWmiQXSzncbfzAXRcl0OZcV1XNftJPdyiUT7ItyrbeHaxFl9wPE5DyPZtj8rE9t8pKlz43hCAv7eC2AHGoEOGYI4zyJFld4YDqCwgYD8P4gI0AgjBF9aEEBYHwMRGzVEDB0R-C1Dgq8AdqDbTARtUwLwwY3l6iMWIoAmotVsCoSwvYMD70rgwau2h2jvBcEgO4AByIgpABGAleFtWhIAGG9iYbSMAAAmHI7DD7cMsLwlAgjhEkAEYIugjAWBsBbKIuA4ikCSOkX2ZhYAADMSiywH04UfNRfDNHEG0bo+gTBWC7x0XAAR6gYDGNMeYrgjD6ByIACx2PLhwrhtd1H8L8Vo3xAi9FeMMVwFJKg1CiECWIt4ZjKHAUCIsRksBi7lnhO6c4MRkb0NCTI8JLCACs0SHFxJ4S4vx2SAmiPqc1RpViABsbTYlOISR4-R3ijHkIsbIlhAB2UZKj4l8P+EAA"
        text="Playground"
      />
    </p>
    <Header {...navigation.second_approach} />
    <p>
      There is another approach to do it. It requires to use{" "}
      <Var>validation technique</Var>.
    </p>
    <p>
      I know, naming is awful :) I don't know how to name it in more meaningful
      way. You can read about it in my{" "}
      <Anchor href="https://catchts.com/validators" text="previous article" />
    </p>
    <p>I'm not sure if it is better way, it is just different.</p>
    <Code code={code16} />
    <p>
      <Anchor
        text="Playground"
        href="https://www.typescriptlang.org/play?#code/C4TwDgpgBAYg9nKBeKBvAsAKCjqBXAZwgCcAuNLXKqAEwgIGNiBLMYZuAO3I22v84BDALYRyBYC04BzANyV+1AnmJDR4ycxny+-AL4KcBzMax0GAG0HFoAN2tQAZgnLw4OrKEhQACi2HM7Lb0yFASUtJQAD5QnHjCAEYk0WEgiXAWHpie4NAAquwWADwA8gkAVgA0vsRwYARQEAAewBCcNA0AShCCNFwWIACCxMSCIEV+zAFB9AB8s8iGNXUNza3tDQDaALpLAPxQZeVL5H4rjS1tHVCbWo7JMMzEEru6UAePz8AX69cA1hAQHBHIcKvtQeVNp8XidYhBgsRYWd6j8rls7g8JNUAHS4jHEKAAFUEzAsryoHwkqI2UABQJBR3BxNJ1Ou4S00h24IKpNKFShL2qzIss1hnHhJDFEsRb3I4oRWCwAHolVAmBAaIEGgALYDAeqkFXSQLavAJbEMODCJUBJhwAjA4BKwm5ADKTFYTuYBGU9CVACYAMwARgAHP6AMTe32W4SiTjAAC0gYA7ABOAAMabDoZTOW8AEkCAA5aUuyBFQkLFCbQnbVlbeUkesHSR4aDkRyCCxELJeaBFwYWCxwADuGsr1agRdLCPLEEnDagbegBy7PY7y+I7Z0-agADVu8waIJgHBiJWlwkEBYepwUuyZFPCUuV+8bvXyJsm8RXnvDxY7YEHknAcJwlbVAAwoIDDatAKBVosbwvmsaI1FMgTMMEDQHC+PBLFQmw+FAWi0oCwJEtspAEbgMTQbB0AxISRHkooMQAUBIFgZWLFQTBcEpMxPjbKKbx6JsdIUXWiqYJanBUtqggEMiJCgKEfJVMsYBLpM0xYXMAAUcAVOQRzVGAtRgKclkAJSwsZ5QkQ0RxQAAZFA3SWsQNATJZ1SCJwIDVqJVBHBADDANiFlwGe-bYopBAlKOnAqcQoAWt2FhGRU5m2VkWCOHgnARWBUBgMwDB-EUSxmUsyJLo+0iVHVlmrJcNLdL0-RDCMYy+XUszNW83TKBY3yoTSPLFGZWkEPMSwGTROAOeQHH0FxXAaYNS1la1X64tiyIENsQ2KFAB0APqrUeJ5nheg7DmOE4jXgY3zW8NnkFNGnVEdsxZIVxXsFwZUVVVNU5S1dQNZoMinbgR1Lp1fScAMwyjOMyLbcN9CveN7XXN9M1-bMi1vFQK0Ht2nGgZtRzY2d0UGjcB1HSdO2XddFjHqe55FA9I7jj5L1vbMNkUG8NjACo95MwQ2I2DQeAMBAZNnQZMEMLldTi0gCwJaloAawwWu7Tr76a5sTOflAmvw-wDlLHZJgyUqABUbuUG7hx-F7SpYHJVI2KNwChqE5WVQZzhwNUmwAOSECQcfVHHdCMCwbBgXH2ziyqUBwL7slcEHuNjWm4dg1HCCxwnRDEMnUCp-QHqZ1wDdx2oEDZ7nqoF67Hte1AACiTSQBFGqNCM54EH7MmB98wd48GGYV5H0c12nLfA5w3dQHnJC1DK89QIvY3BsGq9-FXMc3B3Ihdzne+938QA"
      />
    </p>
    <p>
      <Anchor
        href="https://gist.github.com/captain-yossarian/d7cbc7490e9479ed9f2f1f44919390ac"
        text="Gist link"
      >
        {" "}
        with both examples
      </Anchor>
    </p>
  </>
);
export default DeepPick;
