import React, { FC } from "react";
import { Var } from "../Layout";
import Code from "../Shared/Code";
import { Anchor } from "../Shared/Links";

const code0 = `
type Email = \`${"${string}@${string}.${string}"}\`;
`;
const code1 = `
type Email = \`${"${string}@${string}.${string}"}\`;

type AllowedChars =
  | '='
  | '+'
  | '-'
  | '.'
  | '!'
  | '#'
  | '$'
  | '%'
  | '&'
  | "'"
  | '*'
  | '/'
  | '?'
  | '^'
  | '_'
  | '\`'
  | '{'
  | '|'
  | '}'
  | '~'

type Sign = '@'

type IsLetter<Char extends string> = Lowercase<Char> extends Uppercase<Char> ? false : true
{
  type _ = IsLetter<'!'> // false
  type __ = IsLetter<'a'> // true

}

type IsAllowedSpecialChar<Char extends string> = Char extends AllowedChars ? true : false
`;

const code2 = `
type FirstState = 'FirstState'
type SecondState = 'SecondState'
type ThirdState = 'ThirdState'
`;

const code3 = `
type Strategy<
  Char extends string,
  State extends FirstState | SecondState | ThirdState
  > = {
    FirstState: (IsLetter<Char> extends true
      ? true
      : (IsAllowedSpecialChar<Char> extends true
        ? true
        : (Char extends \`${"${number}"}\`
          ? true
          : false)
      )
    ),
    SecondState: (IsLetter<Char> extends true
      ? true
      : false),
    ThirdState: (IsLetter<Char> extends true
      ? true
      : (Char extends '.'
        ? true
        : false)
    )
  }[State]

`;
// \`${"${infer Char}${infer Rest}"}\`
// \`${"${Cache}${Char}"}\`

const code4 = `
type Validate<
  Str extends string,
  Cache extends string = '',
  State extends string = FirstState,
  PrevChar extends string = ''
  > =
  Str extends ''
  ? (Cache extends Email
    ? (IsLetter<PrevChar> extends true
      ? Cache
      : 'Last character should be valid letter')
    : 'Email format is wrong')
  : (Str extends \`${"${infer Char}${infer Rest}"}\`
    ? (State extends FirstState
      ? (Strategy<Char, State> extends true
        ? Validate<Rest, \`${"${Cache}${Char}"}\`, State, Char>
        : (Char extends Sign
          ? (Cache extends ''
            ? 'Symbol [@] can\'t appear at the beginning'
            : Validate<Rest,\`${"${Cache}${Char}"}\`, SecondState, Char>)
          : \`You are using disallowed char [\${Char}] before [@] symbol\`)
      )
      : (State extends SecondState
        ? (Char extends Sign
          ? 'You are not allowed to use more than two [@] symbols'
          : (Strategy<Char, State> extends true
            ? Validate<Rest, \`${"${Cache}${Char}"}\`, State, Char>
            : (Char extends '.'
              ? PrevChar extends Sign ? 'Please provide valid domain name' : Validate<Rest, \`${"${Cache}${Char}"}\`, ThirdState, Char>
              : \`You are using disallowed char [\${Char}] after symbol [@] and before dot [.]\`)
          )
        )
        : (State extends ThirdState
          ? (Strategy<Char, State> extends true
            ? Validate<Rest, \`${"${Cache}${Char}"}\`, State, Char>
            : \`You are using disallowed char [\${Char}] in domain name]\`)
          : never)
      )
    )
    : never)

type Ok = Validate<'+++@gmail.com'>

type _ = Validate<'gmail.com'> // "Email format is wrong"
type __ = Validate<'.com'> // "Email format is wrong"
type ___ = Validate<'hello@a.'> // "Last character should be valid letter"
type ____ = Validate<'hello@a'> // "Email format is wrong"
type _____ = Validate<'1@a'> // "Email format is wrong"
type ______ = Validate<'+@@a.com'> // "You are not allowed to use more than two [@] symbols"
type _______ = Validate<'john.doe@_.com'> // "You are using disallowed char [_] after symbol [@] and before dot [.]"
type ________ = Validate<'john.doe.com'> // "Email format is wrong"
type _________ = Validate<'john.doe@.com'> // "Please provide valid domain name"
type __________ = Validate<'john.doe@.+'> // "Please provide valid domain name"
type ___________ = Validate<'-----@a.+'> // "You are using disallowed char [+] in domain name]"
type ____________ = Validate<'@hello.com'> // "Symbol [@] can't appear at the beginning"



function validateEmail<Str extends string>(email: Str extends Validate<Str> ? Str : Validate<Str>) {
  return email
}

const result = validateEmail('@hello.com') // error
`;

const code5 = `
type Error_001<Char extends string> = \`You are using disallowed char [\${Char}] in domain name]\`
type Error_002<Char extends string> = 'You are not allowed to use more than two [@] symbols'
`;
const EmailValidation: FC = () => {
  return (
    <>
      <p>
        In this article you will learn how to validate email template literal
        string.
      </p>
      <p>
        Please keep in mind, this type utility is completely useless in your
        production code.
      </p>
      <p>
        However, you will learn how to validate non trivial strings. You will
        find
        <Anchor text="this" href="https://catchts.com/rest-tuples" />
        article very similar.
      </p>
      <p>
        Please keep in mind that this example is fully focused on static
        validation. If you are interested in runtime email validation you should
        check{" "}
        <Anchor
          text="this"
          href="https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript"
        />{" "}
        answer.
      </p>
      <p>
        Before we do any validation, we need to define a set of our utility
        types.
      </p>
      <Code code={code1} />
      <p>
        <Var>type Email</Var> represents general email structure.
      </p>
      <p>
        <Var>type AllowedChars</Var> represents allowed characters in the email.
      </p>
      <p>
        <Var>type IsLetter</Var>just checks whether a char is valid letter or
        not.
      </p>
      <p>
        <Var>type IsAllowedSpecialChar</Var> checks whether a char is allowed
        special char or not
      </p>
      <p>Our validation process consists of 3 states:</p>
      <ul>
        <li>
          <Var>FirstState</Var> - represents state before <Var>@</Var> symbol
        </li>
        <li>
          <Var>SecondState</Var> - represents state after <Var>@</Var> and
          before first dot <Var>.</Var>
        </li>
        <li>
          <Var>ThirdState</Var> -represents state after using <Var>@</Var> and
          dot <Var>.</Var>
        </li>
      </ul>
      <Code code={code2} />
      <p>
        Since each state has its own allowed and disallowed symbols, let's
        create appropriate helpers:
      </p>
      <Code code={code3} />
      <p>
        <Var>Strategy</Var> type is an object where keys represents validation
        state and values represents validation function/strategy
      </p>
      <p>
        Please keep in mind that I'm not email validator master and I'm not very
        well familiar with email validation rules, protocol and standard. It
        means that my type can catch some number of invalid cases but not all of
        them. Treat this type as a fun toy and not as a prod ready utility. This
        utility should be thoroughly tested before using it in your code.
      </p>
      <Code code={code4} />
      <p>
        <Anchor text="Playground" href="https://tsplay.dev/NaYVpN" />
      </p>
      <p>
        Every time when we encounter special sign we change our state and call{" "}
        <Var>Validate</Var> recursively.
      </p>
      <p>
        Above utility is just a series of nested conditional statements. It
        looks terrible. You can provide types for each error string, something
        like this:
      </p>
      <Code code={code5} />
      <p>
        Thank you for reading. I know above example looks ugly but it does the
        work. Please keep in mind that you can just use this
      </p>
      <Code code={code0} />
    </>
  );
};

export default EmailValidation;
