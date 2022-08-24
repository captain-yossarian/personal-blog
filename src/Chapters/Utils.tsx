import React, { FC, useState } from "react";
import Code from "../Shared/Code";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";
import styled from "styled-components";

export const Button = styled.button`
  background-color: #2d2d2d;
  padding: 15px;
  border-radius: 3px;
  color: #f8c555;
  font-size: 20px;
  cursor: pointer;
  border: none;
  box-shadow: 2px 2px 2px black;
  margin-left: 10px;
`;

const code1 = `
type Separator = '_'
type SnakeToCamel<Str extends string, Acc extends string = ''> =
  // Check if Str mathes the pattern string_string
  (Str extends \`${"${infer Head}${Separator}${infer Tail}"}\` 
    // If yes, check whether it is a first call or not, 
    // because we don't want to capitalize for part of the string
    ? (Acc extends ''
      // This is a first call, because Acc is empty, hence first 
      // part should not be capitalized
      ? SnakeToCamel<Tail, \`${"${Acc}${Head}"}\` >
      // This is not first call, hence Head should be capitalized
      : SnakeToCamel<Tail, \`${"${Acc}${Capitalize<Head>}"}\`>)
    // This is the last call, because Str does not match the pattern
    : \`${"${Acc}${Capitalize<Str>}"}\` )

// "oneTwoThree"
type Test = SnakeToCamel<'one_two_three'>
`;

const code2 = `
type Separator = '_'

/**
 * Check whether it is a char and not a special symbol.
 * The trick is, that uppercased char is not equal to lowercased char,
 * whereas any special character or symbol are equal if you lowercase 
 * them or uppercase
 */
type IsChar<Char extends string> =
    (Uppercase<Char> extends Lowercase<Char>
        ? false
        : true);

/**
 * Check whether char is capitalized or not,
 * treat it as a kind of a separator
 */
type IsCapitalized<Char extends string> =
    (IsChar<Char> extends true
        ? (Uppercase<Char> extends Char
            ? true
            : false)
        : false)

/**
 * If char is capitalized, we need to append lodash
 * and lowercase it
 */
type Replace<Char extends string> =
    (IsCapitalized<Char> extends true
        ? \`${"${Separator}${Lowercase<Char>}"}\`
        : Char)

/**
 * Recursively iterate through each char
 * and replace capitalized chars with lodash + lowercased char
 */
type CamelToSnake<
    Str extends string,
    Acc extends string = ''
    > =
    (Str extends \`${"${infer Char}${infer Rest}"}\`
        ? CamelToSnake<Rest, \`${"${Acc}${Replace<Char>}"}\`>
        : Acc)

// type Result = "foo_bar_baz"
type Result = CamelToSnake<'fooBarBaz'>
`;

const code3 = `
type Substring<T extends string> = 'not implemented'

function transform(str: Substring<'Hello world'>) { }

transform('world'); // should be ok
transform('Hello'); // should be ok
transform('ello');  // should be ok
transform('orl');   // should be ok

transform('hlowrld') // expected error
`;

const code4 = `
function transform<
  T extends string
>(str: "Hello world" extends \`${"${string}${T}${string}"}\` ? T : never) {}
`;

const navigation = {
  war: {
    id: "intro",
    text: "6 months of war with russia",
  },
  snake_to_camel: {
    id: "snake_to_camel",
    text: "Snake_case to camelCase",
  },
  camel_to_snake: {
    id: "camel_to_snake",
    text: "camelCase to snake_case",
  },
  substring: {
    id: "substring",
    text: "Check whether string is a substring",
  },
} as const;
const links = Object.values(navigation);

const Utils: FC = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.war} />
      <p>
        Today is the 6th month of war with russia. My last post was exactly 6
        months ago. It was (and will be) a very hard time for me and my wife.
      </p>
      <Header {...navigation.snake_to_camel} />
      <p>
        If you need to transform interface with snake_case to camelCase, check
        this:{" "}
      </p>
      <Code code={code1} />
      <Header {...navigation.camel_to_snake} />
      <p>
        Transforming from camlCase to snake_case is a bit more complicated
        because we don't have a special character as a separator
      </p>
      <Code code={code2} />
      <Header {...navigation.substring} />
      <p>
        Imagine you have a function which expects only one argument, a string.
        This string should be a substring of some defined upfront literal string
        type.
      </p>
      <Code code={code3} />
      <p>
        Please try to implement it on your own, without checking the solution.
        When I started implementing this soultion, I ended up with partialy
        working recursive ugly solution. However, there is very simple geniuos
        solution, which was provided by{" "}
        <Anchor
          href="https://stackoverflow.com/users/8613630/tobias-s"
          text="Tobias S."
        />{" "}
        and{" "}
        <Anchor
          href="https://stackoverflow.com/questions/73207976/substring-of-a-string-type-typescript"
          text="here"
        />{" "}
        you can find and upvote original answer.
      </p>
      {show ? null : (
        <Button onClick={() => setShow(true)}>Show solution</Button>
      )}
      {show ? <Code code={code4} /> : null}
    </>
  );
};
export default Utils;
