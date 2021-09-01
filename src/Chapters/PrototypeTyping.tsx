import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";

const code1 = `
type ConfigObject = {
  effect: {
    hover: {
      css: Record<"$padding", string>
    },
    out: {
      css: Record<"$margin", string>
    },
    align: {
      css: Record<'$left', string>
    }
  },
  button: {
    primary: {
      inherit: 'effect.hover'
      css: Record<"$color", string> & Record<"$margin", string>
    }
    secondary: {
      css: Record<"$what", string>
    }
  },
  div: {
    flexBox: {
      inherit: ['effect.hover', 'effect.align']
    }
  },
}
`;

const code2 = `
interface Config {
  [namespace: string]: {
    [prop: string]: {
      inherit?: string | string[];
      css?: Record<string, string>
    }
  }
}
`;

const code3 = `
type Result = {
    $padding?: string | undefined;
    $color?: string | undefined;
    $margin?: string | undefined;
}
`;

const code4 = `
type Structure = {
    foo: {
        a: 1,
        b: 2,
    }
    bar: {
        c: 3,
        d: 4,
    }
}

/**
 * Compute all possible property combinations
 */
type KeysUnion<T, Cache extends string = ''> =
    /**
     * If T extends string | number | symbol -> return Cache, this is the end
     */
    T extends PropertyKey ? Cache : {
        /**
         * Otherwise, iterate through keys of T, because T is an object
         */
        [P in keyof T]:
        /**
         * Check if property extends string
         */
        P extends string
        /**
         * Check if it is the first call of this utility,
         * because CAche is empty
         */
        ? Cache extends ''
        /**
         * If it is a first call,
         * call recursively itself, go one level down - T[P] and initialize Cache - \`${"${P}"}\`
         */
        ? KeysUnion<T[P], \`${"${P}"}\`>
        /**
         * If it is not first call of KeysUnion and not the last
         * Unionize Cache with recursive call, go one level dow and update Cache
         */
        : Cache | KeysUnion<T[P], \`${"${Cache}.${P}"}\`>
        : never
    }[keyof T]

{
    //"foo" | "bar" | "foo.a" | "foo.b" | "bar.c" | "bar.d"
    type Test1 = KeysUnion<Structure>
}
`;

const code5 = `
type Utility<Obj, Props extends KeysUnion<Obj>> = 'to implement'

{
  type ShouldOk1 = Utility<ConfigObject, 'button.primary'>
  type ShouldOk2 = Utility<ConfigObject, 'effect.align'>

  type ShouldFailButOk1 = Utility<ConfigObject, 'effect'>
  type ShouldFailButOk2 = Utility<ConfigObject, 'button'>

  type ShouldFail1 = Utility<ConfigObject, 'hello'> // error
  type ShouldFail2 = Utility<ConfigObject, 'someProperty'> // error
}
`;

const code6 = `
type KeysUnion<T, Cache extends string = '', Level extends any[] = []> =
  T extends PropertyKey ? Cache : {
    [P in keyof T]:
    P extends string
    ? Cache extends ''
    ? KeysUnion<T[P], \`${"${P}"}\`, [...Level, 1]>
    : Level['length'] extends 1 // if it is a higher level - proceed
    ? KeysUnion<T[P], \`${"${Cache}.${P}"}\`, [...Level, 1]>
    : Level['length'] extends 2 // stop on second level
    ? Cache | KeysUnion<T[P], \`${"${Cache}"}\`, [...Level, 1]>
    : never
    : never
  }[keyof T]

type Path<T> = Extract<KeysUnion<T>, string>

{
  type Expected =
    | "effect.hover"
    | "effect.out"
    | "effect.align"
    | "button.primary"
    | "button.secondary"
    | "div.flexBox"
  type Test = Path<ConfigObject>
  
  // true
  type Check =
    Test extends Expected
    ? Expected extends Test
    ? true
    : false
    : false
}

type Utility<Obj, Props extends Extract<KeysUnion<Obj>, string>> = 'to implement'

{
  type ShouldOk1 = Utility<ConfigObject, 'button.primary'>
  type ShouldOk2 = Utility<ConfigObject, 'effect.align'>

  type ShouldFailButOk1 = Utility<ConfigObject, 'effect'>
  type ShouldFailButOk2 = Utility<ConfigObject, 'button'>

  type ShouldFail1 = Utility<ConfigObject, 'hello'>
  type ShouldFail2 = Utility<ConfigObject, 'someProperty'>
}
`;

const code7 = `
type Callback<Accumulator extends Record<string, any>, El extends string> =
  Record<'not impelemented', string>

type Reducer<
  Keys extends string,
  Accumulator extends Record<string, any> = {}
  > =
  Keys extends \`${"${infer Prop}.${infer Rest}"}\`
  ? Reducer<Rest, Callback<Accumulator, Prop>>
  : Keys extends \`${"${infer Last}"}\`
  ? Callback<Accumulator, Last>
  : never

type Utility<Obj, Props extends Extract<KeysUnion<Obj>, string>> = Reducer<Props, Obj>
`;

const code8 = `
type DigInto<T extends { inherit: string, css: string }> = Record<'not impelemented', string>

type Callback<Accumulator extends Record<string, any>, El extends string> =
  // if El is a key of ConfigObject - dig into it
  El extends keyof Accumulator ? DigInto<Accumulator[El]> : Accumulator
`;

const code9 = `
type DigInto<T extends { inherit: string, css: string }> =
  // if T has either inherit or css or both - proceed
  (T extends { inherit?: infer Inherit, css?: infer CSS }
    // if Inherit is allowed Path of ConfigObject
    ? (Inherit extends Path<ConfigObject>
      // call Reducer recursively with inherited Path and initial ConfigObject
      ? Reducer<Inherit, ConfigObject> & CSS
      // if Inherit is an array of allowed Paths - call Reducer with union of all Pathes
      : (Inherit extends Array<Path<ConfigObject>> ? Reducer<Inherit[number], ConfigObject> & CSS : CSS))
    : T)
`;

const code10 = `
type ConfigObject = {
  effect: {
    hover: {
      css: Record<"$padding", string>
    },
    out: {
      css: Record<"$margin", string>
    },
    align: {
      css: Record<'$left', string>
    }
  },
  button: {
    primary: {
      inherit: 'effect.hover'
      css: Record<"$color", string> & Record<"$margin", string>
    }
    secondary: {
      css: Record<"$what", string>
    }
  },
  div: {
    flexBox: {
      inherit: ['effect.hover', 'effect.align']
    }
  },
}

type KeysUnion<T, Cache extends string = '', Level extends any[] = []> =
  T extends PropertyKey ? Cache : {
    [P in keyof T]:
    P extends string
    ? Cache extends ''
    ? KeysUnion<T[P], \`${"${P}"}\`, [...Level, 1]>
    : Level['length'] extends 1 // if it is a higher level - proceed
    ? KeysUnion<T[P], \`${"${Cache}.${P}"}\`, [...Level, 1]>
    : Level['length'] extends 2 // stop on second level
    ? Cache | KeysUnion<T[P], \`${"${Cache}"}\`, [...Level, 1]>
    : never
    : never
  }[keyof T]

type Path<T> = Extract<KeysUnion<T>, string>

type DigInto<T extends { inherit: string, css: string }> =
  // if T has either inherit or css or both - proceed
  (T extends { inherit?: infer Inherit, css?: infer CSS }
    // if Inherit is allowed Path of ConfigObject
    ? (Inherit extends Path<ConfigObject>
      // call Reducer recursively with inherited Path and initial ConfigObject
      ? Reducer<Inherit, ConfigObject> & CSS
      // if Inherit is an array of allowed Paths - call Reducer with union of all Pathes
      : (Inherit extends Array<Path<ConfigObject>> ? Reducer<Inherit[number], ConfigObject> & CSS : CSS))
    : T)

type Callback<Accumulator extends Record<string, any>, El extends string> =
  // if El is a key of ConfigObject - dig into it
  El extends keyof Accumulator ? DigInto<Accumulator[El]> : Accumulator

type Reducer<
  Keys extends string,
  Accumulator extends Record<string, any> = {}
  > =
  Keys extends \`${"${infer Prop}.${infer Rest}"}\`
  ? Reducer<Rest, Callback<Accumulator, Prop>>
  : Keys extends \`${"${infer Last}"}\`
  ? Callback<Accumulator, Last>
  : never

type Utility<Obj, Props extends Extract<KeysUnion<Obj>, string>> = Reducer<Props, Obj>

// Record<"$padding", string> & Record<"$color", string> & Record<"$margin", string>
type Result = Utility<ConfigObject, 'button.primary'>
`;

const code11 = `
type UnionKeys<T> = T extends T ? keyof T : never;

type StrictUnionHelper<T, TAll> =
  T extends any
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

type StrictUnion<T> = StrictUnionHelper<T, T>

type Utility<Obj, Props extends Extract<KeysUnion<Obj>, string>> =
  StrictUnion<Partial<Reducer<Props, Obj>>>

type Result = Utility<ConfigObject, 'button.primary'>
`;
const navigation = {
  long_way: {
    id: "long_way",
    text: "Long and complicated way",
  },
  short_way: {
    id: "short_way",
    text: "Short way",
  },
  cb_in_tuple: {
    id: "cb_in_tuple",
    text: "Callback in tuple",
  },
};
const links = Object.values(navigation);

const PrototypeTyping: FC = () => {
  return (
    <>
      <p>
        Imagine you are creating UI library with some initial CSS configuration.
      </p>
      <Code code={code1} />
      <p>
        Interface of our <Var>config</Var> object:
      </p>
      <Code code={code2} />
      <p>
        We need to create utility type which will merge all <Var>css</Var>{" "}
        properties which are exists in <Var>inherit</Var> chain and make then
        optional.
      </p>
      <p>
        For example, this code{" "}
        <Var>{`type Result = Util<Data, 'button.primary'>`}</Var> should produce
        Record with 3 keys:
      </p>
      <Code code={code3} />
      <p>
        <Var>$color</Var> and <Var>$margin</Var> because <Var>css</Var> property
        of <Var>{"button.primary"}</Var> contains <Var>Record</Var> with such
        keys.
      </p>
      <p>
        <Var>$padding</Var> - because <Var>button.primary</Var> inherits from{" "}
        <Var>effect.hover</Var>
      </p>
      <p>
        When I started to work on this question, I did not even know where to
        start.
      </p>
      <p>
        Let's start from the validation of second generic argument. As you might
        have noticed it should accept only valid path of properties. This
        function I already have from my previous{" "}
        <Anchor href="https://catchts.com/deep-pick#all_keys" text="article" />.
      </p>
      <p>
        <Anchor
          href="https://stackoverflow.com/questions/68668055/eliminate-nevers-to-make-union-possible/68672512?noredirect=1#comment121362429_68672512"
          text="Here"
        />{" "}
        you can find an example of <Var>KeysUnion</Var> with explanation.
      </p>
      <Code code={code4} />
      <Anchor
        href="https://www.typescriptlang.org/play?#code/C4TwDgpgBAysBOBXAxsR9oF4oG8CwAUFMVAGYD25AXLoSfVAIY0CMANHQ8QEY0BMHIiQC+nHo3g18QrshoBmQV2IATGgBYlIwqIKEA9ACpDdQ1ADC5ALZhEwaIwA2jqGHIBndwEtuj6GHhySHhQKGRrbi8AO0ZgL3Io91N9QlBIKABpCBB3AFUo+KiAHgAVNgtGZAALaAgAD3solXcodwRogHMobAByHoA+brEoIxMZYjMASVIoEqh6xubW9qiugB8oKMQrbgh4KA33EB3yFwBaQYw0eCiK6ohy4CqvFpeoJ9qm4ahDFPG5hYQJotAAKgWCoCyICgAH47jUoFJviRRsiSGYAPIfeAAdxeDygXns8Fi0CegUQHSqUAA1tkWuQZmUoLtkIxEO5oHM3oxbuRuAArCCoNETP7KKAAbRBhNudJAjNmAF0qKLUeMGGZzDVkDTCTMAkE9qFAcDlvBOqKfuLlDLTUs2hbVmrjFatTq9V4ZkTCS0PmQvPA2mEnC5FU83nYvI4iSAtMozKz2ZyLABBe6++Y2UBum1cOHmSoI+0tPousYSn5QaaE4CZxgBoN1tnOeNcMwtlwYZDobwANwgjmhRM5jlI5Q65CgCWgfgHLhU5BxtzOs2lSqYTVlRK8Ti8AC9oIWM6uAAYAEhwIOEp9zorhULyBQSpXX5QvV5v-XLbur3rrbxROQdakIGwadtOMyPvkhSbiomzAe8CKOIwbS-jBCQHkeRbQHiTxQN2vZeAOIatlAk7TlEs4QPOUCLjicFQIgYAqKS8IQHeGokDQx4Ihs0HPsUJRvlAH68RAwgAHSXtep7flxxA0FRA7wMMwiSvKiolEqhCENI9D6PoABEFDkEZBxQEZ3ASOZGwmZQkmMLZlmmZJ3DOVZEiScgHnWfAkkqEZwxpFyEBtCw3SZPSGHFHASCoOgEDyboQA"
        text="Playground"
      />
      <p>Let's try to use our utility:</p>
      <Code code={code5} />
      <p>
        {" "}
        <Anchor
          href="https://www.typescriptlang.org/play?#code/C4TwDgpgBAwg9gOwGYEsDmB5ARgKwgY2CgF4oBvAWACgooIkkDgAuc622gCzgDcIAnVpRoda+AM7jWAJQJx+AEwA8AIgAkYAIYKFKBGhUAaKOOD89aAHzsOAX0M3acAK4s2I0RKlRZ+ecvUAW01+ND0jEzMLaw8oe0coTQAbdAQhBLFJGTlFJQByNST6YDzjU3N9GNFbG3iRLFdgRHTYsHNg-hAW0Vo9TgEUNzz6RkIAOm4+fjyMqC9sv1z1PyT5CPLoqAAyHxyAtQ6whHWoyoSa2PE5BAUQrvceuazdxf2Ad05NYBOKq3PahwiXQ8bocJBFAAeACE4BDQaI+gM3ABtYYMJgTXgCUpQNGjYBjZKpPIAXX+IjqF2ooEgUAA0hAQOIAKoIFCIJQAFWMME0+H6dAhwAgN3EkV+JFxeUsJBsnMFwtFUAACvw4JB+KAGSAoAB+WB8gXwqDI5VQPRQADWjLgSCgnJJzASZogQpFCjFG30CX1vP50Fdio9Up99MZLLZHM5ppJxgABmoyMrbHGqhxWH6BQAfMNM1nshBcmPxxOZiC2MaJ5OphKsBAQKa1ZHWkC2+1kqjUYS0AD0PZUSDgcBUUBzKiwIRHY8HcEJU6gA6HYyw8-HITG+FXE-4YwUKhsNOgnIgpgAjJLtRGC0pu2Ch8baJpWKfAY8sKwAEyvuwJbcPuasAAzN+ogKKwAAsIFxLUMRUlQh5QMywAoCkoBKNgODGKq6pioG7pipe+YchhlgyqQeRNOagRgEUgQiiU1Bdge4DQAAytwzhJAoGCWuepBIShgwgEo8DIOgGFMMYeQNMATQIGMbQoB0IDSsxtLsS4XE8R+koCahwmiagmC4JJuIjBiRJoAgqmdiICEaZxCgAGKaChUKuDxfGIch+kiYgRkSYQUnmYQNm0PZHFcS5bkeZaOn8T5Ql+WJxl4EFuIyXJNlqWxkXOa5SReXpSWGeJJnpXk-RJKsYVQBFmn5Sh8XeYJaGlalpl5OIcB0dhGqgDZFxAA"
          text="Playground"
        />{" "}
      </p>
      <p>
        Seems to be that we made a mistake. We should allow only one level
        nested properties. I mean path with only one dot. The pattern:
        <Var>{`{prop}.{prop}`}</Var>
      </p>
      <p>
        In order to do this, we should provide a <Var>Level</Var> restriction:
      </p>
      <Code code={code6} />
      <p>Ok, we are good to proceed.</p>
      <p>
        Now, the most interesting and complicated part. We need to iterate over
        the whole inheritance chain. Let's refresh our utility type{" "}
        <Var>{`Utility<ConfigObject, 'button.primary'>`}</Var>
      </p>
      <p>
        So, our <Var>Reducer</Var> should:
        <ul>
          <ol>
            1) dig into <Var>{`'button.primary'`}</Var>
          </ol>
          <ol>
            2) grab<Var>css</Var> property if exists, otherwise skip it
          </ol>
          <ol>
            3) grab <Var>inherit</Var> property if exists and dig into it
            (recursion)
          </ol>
        </ul>
      </p>
      <p>
        Looks pretty straightforward. Let's implement simple <Var>Reducer</Var>{" "}
        without any additional logic
      </p>
      <Code code={code7} />
      <p>
        If you are not familiar with this pattern, please take a look at my{" "}
        <Anchor
          href="https://catchts.com/tuples#reduce"
          text="previous article"
        />
      </p>
      <p>
        Now we are ready to implement a <Var>Callback</Var>
      </p>
      <Code code={code8} />
      <p>
        Seems to be that we still did not implement a <Var>DigInto</Var> logic.
        Let's do it
      </p>
      <Code code={code9} />
      <p>Out whole code so far</p>
      <Code code={code10} />
      <p>
        I hope you did not forget that we need to get a <Var>Partial</Var> type
        with optional properties instead of required. Please see my{" "}
        <Anchor href="https://catchts.com/unions" text="previous article" /> ,
        you will find there <Var>StrictUnion</Var> helper. Let's use it.
      </p>
      <Code code={code11} />
      <p>This is time for tests</p>
    </>
  );
};

export default PrototypeTyping;
