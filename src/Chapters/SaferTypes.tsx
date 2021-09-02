import React, { FC } from "react";
import styled from "styled-components";

import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Link } from "react-router-dom";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const Ul = styled.ul``;
const Ol = styled.ol`
  padding-left: 10px;
  margin-top: 5px;
`;

const navigation = {
  part_1: {
    id: "part_1",
    text: "Safer functions",
  },
  part_2: {
    id: "part_2",
    text: "Tricky differences between types and interfaces",
  },
  part_3: {
    id: "part_3",
    text: "Safer data structures",
  },
};

const links = Object.values(navigation);

const code1 = `
type Animal = { tag: 'animal' }

type Dog = Animal & { bark: true }
type Cat = Animal & { meow: true }

declare let animal: (x: Animal) => void;
declare let dog: (x: Dog) => void;
declare let cat: (x: Cat) => void;

animal = dog; // ok without strictFunctionTypes and error with

dog = animal; // should be ok

dog = cat; // should be error
`;

const code2 = `
type Animal = { tag: 'animal' }
type Dog = Animal & { bark: true }

// generic is here
declare let animal: <T extends Animal>(x: T) => void;
declare let dog: (x: Dog) => void;

animal = dog; // error even without strictFunctionTypes
`;

const code3 = `
// unsafe
interface Bivariant<T> {
  call(x: T): void
}

// safe
interface Contravariant<T> {
  call: (x: T) => void
}
`;

const code4 = `
interface Animal {
  tag: 'animal',
  name: 'some animal'
}

declare var animal: Animal;

const handleRecord = (obj:any) => { }

const result = handleRecord(animal)
`;

const code5 = `
interface Animal {
  tag: 'animal',
  name: 'some animal'
}

declare var animal: Animal;

const handleRecord = (obj:Record<string, unknown>) => { }

const result = handleRecord(animal) // error
`;

const code6 = `
type Animal= {
  tag: 'animal',
  name: 'some animal'
}

declare var animal: Animal;

const handleRecord = (obj:Record<string, unknown>) => { }

const result = handleRecord(animal) // ok
`;

const code7 = `
interface Animals {
  dog: 'Sharky dog', // do you remember th Sharky Dog?
  cat: 'Meout'
}

type AnimalEvent<T extends keyof Animals> = {
  name: T
  call: (name: Animals[T]) => void
}
`;

const code8 = `
const handleEvent = <
  T extends keyof Animals
>(event: AnimalEvent<T>) => { }

// we would expect an error but it compiles 
const arrayOfEvents: AnimalEvent<keyof Animals>[] = [{
  name: 'dog',
  call: (name: 'Meout') => { }
}]

// should be error but it compiles
handleEvent<keyof Animals>({
  name: 'dog',
  call: (name: 'Meout') => { }
})
`;

const code9 = `
interface Animals {
  dog: 'Sharky',
  cat: 'Meout'
}

type EventConstructor<T extends keyof Animals> = {
  name: T
  call: (name: Animals[T]) => void
}
/**
 * Retrieves a union of all possible values
 */
type Values<T> = T[keyof T]

// "Sharky" | "Meout"
type Test = Values<Animals>

// EventConstructor<"dog"> | EventConstructor<"cat">
type AnimalEvent = Values<{
  [Prop in keyof Animals]: EventConstructor<Prop>
}>

const handleEvent = (event: AnimalEvent) => { }

// error
const arrayOfEvents: AnimalEvent[] = [{
  name: 'dog',
  call: (name: 'Meout') => { }
}]

// error
handleEvent({
  name: 'dog',
  call: (name: 'Meout') => { }
})
`;
const SaferTypes: FC = () => (
  <>
    <HeaderNav links={links} />

    <p>
      In this article you will learn:
      <Ul>
        <Ol>1) how to make your typescript functions even more safer</Ol>
        <Ol>2) some tricky differences between types and interfaces</Ol>
        <Ol>3) how to make types for your data structure more safe</Ol>
      </Ul>
    </p>
    <Header {...navigation.part_1} />
    <p>Consider this example which is stolen from TypeScript docs:</p>
    <Code code={code1} />
    <p>Very simple code, nothing complicated.</p>
    <p>
      <Var>Animal</Var> is a supertype for <Var> Dog</Var> and <Var>Cat</Var>.
      There are a lot of typescript projects in the wild without strict flags.
      If you have active <Var>strictFunctionTypes</Var> flag, please disable it.
    </p>
    <p>
      After disabling, you will see that <Var>animal = dog</Var> does not
      produces an error despite the fact that it isn’t probably sound.
    </p>
    <p style={{ fontStyle: "italic" }}>
      This is unsound because a caller might end up being given a function that
      takes a more specialized type, but invokes the function with a less
      specialized type. In practice, this sort of error is rare, and allowing
      this enables many common JavaScript patterns
    </p>
    <p>
      Of course if you have a big project you can't just turn on
      <Var>strictFunctionTypes</Var> and fix all errors.This is not always
      possible. So how to live without this flag?
    </p>
    <p>Answer is simple. Just use generics</p>
    <Code code={code2} />
    <p>
      Almost forgot, prefer arrow function notation inside interfaces rather
      than method notation:
    </p>
    <Code code={code3} />
    <Header {...navigation.part_2} />
    <p>
      Imagine you have untyped <Var>handleRecord</Var> function:
    </p>
    <Code code={code4} />
    <p>
      You know that this function expects an object. You can replace{" "}
      <Var>any</Var> with <Var>object</Var> type, but eslint will not be happy
      about this change and will suggest you to use{" "}
      <Var>{`Record<string, unknown>`}</Var> instead.
    </p>
    <Code code={code5} />
    <p>
      As you might have noticed, it still does not work. Because{" "}
      <Var>interfaces</Var> are not indexed by the default and we still can't
      pass <Var>Animal</Var> object to <Var>handleRecord</Var>. So, what we can
      do to fix our type and don't break dependent types?
    </p>
    <p>
      Just use <Var>type</Var> instead of <Var>interface</Var>.
    </p>
    <Code code={code6} />
    <Header {...navigation.part_3} />
    <p>Consider this example:</p>
    <Code code={code7} />
    <p>
      Seems that <Var>AnimalEvent</Var> constructor type is perfectly fine. Yea,
      why not? Let's use it as a function argument or array element:
    </p>
    <Code code={code8} />
    <p>
      It is defenitely something wrong with our type because it allows us to
      represent invalid state. We all know that invalid state should not be
      representable if we use TypeScript.
    </p>
    <p>Let's refactor it a bit:</p>
    <Code code={code9} />
    <p>
      Instead of using generic for animal name we have created a union of all
      possible <Var>AnimalEvents</Var> representation. Hence - illegal state is
      unrepresentable.
    </p>
    <p>These techniques are easy to use and simple to understand.</p>
  </>
);
export default SaferTypes;
