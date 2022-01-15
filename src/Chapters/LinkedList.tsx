import React, { FC } from "react";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import Code from "../Shared/Code";
import { Anchor } from "../Shared/Links";

const code1 = `
abstract class RowSet<T extends RowSet<T>> {
    abstract with<That extends RowSet<That>>(that: That): Append<T, That>
}

type Append<This extends RowSet<This>, That extends RowSet<That>> =
    This extends Cons<infer A, infer B> ? Cons<A, Append<B, That>> : That;

class Empty extends RowSet<Empty> {
    public with<That extends RowSet<That>>(that: That): That {
        return that;
    }
}

class Cons<A, B extends RowSet<B>> extends RowSet<Cons<A,B>> {
    constructor(public readonly head: A, public readonly tail: B) {
        super();
    }

    public with<That extends RowSet<That>>(that: That): Cons<A, Append<B, That>> {
        return new Cons(this.head, this.tail.with(that))
    }
}

const x = new Cons(5, new Empty)    // Cons<number, Empty>
const y = new Cons("hi", new Empty) // Cons<string, Empty>
const z = x.with(y)                 // Cons<number, Cons<string, Empty>> 
`;

const code2 = `
/**
 * Shamelessly stolen from Rust
 */
type None = null | undefined;
type Some<T> = T
type Option<T> = Some<T> | None

type LinkedList<T> = Option<{
  head: Option<T>,
  tail: LinkedList<T>
}>

const cons= <
  T,
  Head extends Option<T>,
  Tail extends LinkedList<Option<T>>
>(...args: [head: Head, tail: Tail]) => {
  const [head, tail] = args
  return { head, tail }
}

const linkedList = cons(2, cons(1, cons(null, null))); // {head: 2, tail ...}

const handleList = <T extends LinkedList<number>>(linkedList: T) => linkedList

const res = handleList(linkedList)
`;

const navigation = {
  oop: {
    id: "oop",
    text: "OOP approach",
  },
  fp: {
    id: "fp",
    text: "FP approach",
    
  },
};

const links = Object.values(navigation);
const LinkedList: FC = () => {
  return (
    <>
      <HeaderNav links={links} />
      <Header {...navigation.oop} />
      <p>Pretty interesting OOP example of Linked List in Typescript.</p>
      <p>
        Credits goes to
        <Anchor
          text="Oleg Pyzhcov"
          href="https://stackoverflow.com/users/2758343/oleg-pyzhcov"
        />
        and
        <Anchor
          href="https://stackoverflow.com/users/3809223/ksaveljev"
          text="ksaveljev"
        />
      </p>
      <Code code={code1} />
      <Header {...navigation.fp} />
      <p>Functional approach with element type narrowing</p>
      <Code code={code2} />   
    </>
  );
};

export default LinkedList;
