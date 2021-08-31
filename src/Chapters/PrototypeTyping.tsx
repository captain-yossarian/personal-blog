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
        Interface of out <Var>config</Var> object:
      </p>
      <Code code={code2} />
      <p>
        We need to create utility type which will merge all <Var>css</Var>{" "}
        properties which are exists in <Var>inherit</Var> chain.
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
        function I already hed from my previous{" "}
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
    </>
  );
};

export default PrototypeTyping;
