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


function pick<
    Obj,
    Prop extends string,
    Props extends ReadonlyArray<Prop>,
    Result extends Util<Obj, Props>>
    (
        obj: ValuesUnion<Obj>,
        props: [...Props],
        ..._: Validator<IsAllowed<Result>>
    ): Reducer<Props, Obj>;

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
    updated: true,
  },
  deep_pick: {
    id: "deep_pick",
    text: "Get value by property path (deep pick)",
    updated: true,
  },
  second_approach: {
    id: "second_approach",
    text: "Second approach",
    updated: true,
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
        href="https://www.typescriptlang.org/play?#code/C4TwDgpgBAYg9nKBeKBvAsAKCjqBXAZwgCcAuNLXKqAEwgIGNiBLMYZuAO3I22v84BDALYRyBYC04BzANyV+1AnmJDR4ycxny+-AL4KcBzMax0GAG0HFoAN2tQAZgnLw4OrKEhQACi2HM7Lb0yFASUtJQAD5QnHjCAEYk0WEgiXAWHphe0ABqghZ49AA8ACoAfKGlANoA1hAgcI5QpQC6WJ7g0ACiFhDCoeFach3ZXb42NMwMgsAQxQBK9HgWwFAQAB5znDQEUEsMcMQ0xUMyADRQgpwg5Zel61sQO3u9-ZVIhi2P27tQ9Y1mktlKsoAB+fbLVbVNpQcicCDBYijHKQmh4BgkYpfADSDT2m1+eyWghoXAsIAAgsRiIIQMVrrdzl9KQwGPEVrMjj9nn8DkcTmdpJdGR80MYqB9cfieS8oNV2rpwVBWezhJzgEcvuQ8SACU85dUtI5kgAJRVUCGm2V-N7CL4QvwQKYzObFVUcqya4iXU3lbWxREkAO6-VEqA2UnkkDy41my4AOiTceILUEzAsFtwENK6YsNuJECjnAp1Np9Lt-qVVoLUDtDrRGKxuYzlydLtm8w96q9R195SrVHhQeRSuHSIDCKRWUOnAkUAAFoICH44JBiKBQsUAPIJABWbeIa9rfmYASC9HKAAo4PvyLuD1AwEewORV2AAJQB297qDMPYPlAABkkKHMcxTviKNwfIOuAPhADDAAmz5wJqOQJkuBDbgA7pw74kKACYzBYFg3vulwoZ+WSdN4+SFPQACqnAcJwZSXAAwoIDALtAKAVMgXwPISvJ7Ke57MMEew5nCUB0UUBDFLwijyj4f6cP8DRNC0rSkF8VAxJx3HQDENQ+Fm-AxHJjHMVwZTVGZHFcTxKSma0sFGFWNHQAx7AWDu5ETGuYYiZCxaljSdIQf4gQSZeUpKu+wWGuZyoPgGiW1kanAmqmMDMMQEgpRCeUFWswlygCWlpdWUAPtUJWFZOI7pS+SV-FlOWwBIibJtlyQtpmDYwPO5V-JVzTVZaaYZrWQoKg2PkZv5e71YV9x5u5MlTsGY6BhOu3baOWAAPTHVATDOoEewLsAwBgAQpCndIgQLngCREXAwjHQETBwAQTTAMdpRdAAykwrCA-+yj0MdABMADMACMAAcsMAMRQ0UhzCKInDAAAtPDADsACcAAMJMo8jRNeVAACSBAAHIjsDkBlGKMKtJlh1cxCkhFDJjgFEQWSogzlIkXA2HOuzoQM8zSKs-M-GjXs-PQBCQsWEQMnqzoqJ0cwNBcsQZS1gkCB9NcKRCmKQkGn86vKgqMnVDzoxYI4eCcIhLFPtMtTYkqD7MglL6zZoFxfBlquhWSJZUhF9LvncXzAisZUO3si1+SHgX3QOXxXnpuA-uQVkEExLHLanSpUJRD3ykmCaJa0ofKc3AD65cFEbJvFOLkvSyc6erIXSofuQSzopipuJZcD7lFkXs++wXD+wwgdfCH0fh7HQrt7gMdZ3H0ZlpFKeHzgo+Z+GOfLYeQUDsXdel3eskFPJVe2YvV-UA35BqjN1bn-KgXce4WD7t6AeBAJYWCljLG+A4PwUCVDYYAKh1INwTJMJsL9lJXi4gwCiL4UFIEqJhfCG4QCELZCQtcKCIREOqJRLm5AiGgLfnuL4X4TCjGOgAKgEZQARtVagiOOlgWc84bAgmAMjUIYAA5XmcHAS41QADkhASAaMuBougjAWBsBYho1oKDTpQDgOIzA0i1iyIziTRRyjVHqK0UQYguioD6PoODYxXBPEaLUBAUx5izpWP4UIkRdYNiQEQs6dYNIjgEAkaMWxEYoTAERmTJxm8VEIFcQY3xa9OAhKgBYkgR5RxpPsasRGiMcm1DyWo+UgSRDBLMWUsJtQgA"
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
