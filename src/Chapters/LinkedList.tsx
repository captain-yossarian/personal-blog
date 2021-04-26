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

type LinkedList<T> =
    T extends None ? None : Option<{
        head: Option<T>,
        tail: LinkedList<T>
    }>

type ListLength<T extends LinkedList<unknown>, Cache extends any[] = []> =
    T extends { head: infer Head, tail: infer Tail }
    ? Tail extends LinkedList<unknown>
    ? ListLength<Tail, [...Cache, Head]>
    : never
    : Cache['length'];

type Overloading =
    & (<Head extends None, Tail extends None>(head: Head, tail: Tail) => { head: Head; tail: Tail })
    & (<T, Head extends Option<T>, Tail extends LinkedList<Option<T>>>
        (...args: [head: Head, tail: Tail]) => { head: Head; tail: Tail; }
    )

const cons: Overloading = <
    T,
    Head extends Option<T>,
    Tail extends LinkedList<Option<T>>
>(...args: [head: Head, tail: Tail]) => {
    const [head, tail] = args
    return { head, tail }
}

const linkedList = cons(2, cons(1, cons(null, null))); // {head: 2, tail ...}

const handleList = <T extends LinkedList<number>>(linkedList: T) => {
    // Drawback of my solution, even if we know
    if (linkedList) {
        const result = linkedList.head // Option<number>
        // handle linkedList
    }
    return linkedList
}

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
    updated: true,
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
      <Anchor
        href="https://www.typescriptlang.org/play?#code/FAegVGwARlDKALAhgWwKYBs0GdsYJ5TYAuA9lgHZQBmATqSlAEoCuJ0YIwx+ADmlABypCgIC8UCiwwYoAHygsKAEzTUAlqOUBubnwFwGaADwAVAHxQJpvfygB5XsXUizliYfRv5QkWmC2AgAymgDWaMohJN5i0FDxplBoAB7EaCrYvqJQAPxZAgBcDk4uFMYA3nHx1VAIaEjKRY7OrhYANFU1UMRI6hhFIRThkerRFp0AvuYBPHZRxEHpAObECGZJqenKmYPD88ZKoRSkAO4U5m1QAMJIAMZ1G2kZUEgU+ADaALpWUF-unYkUk9tlByrV6o0oJpqGhaFAABIQy49PpFaGwqCmXqyCadPJYvqPLY7MIRfaHY5naY1PLzRYUFZrAkYS7vAB0HJu9zQl0RDU+1OqRVEADdYZ0ily6u8AOSURkyz66QIOMW0DCkBqaJZWToAMigAApjHzlETnsJRJdmeaQZa0OZDXUGkVTcjsUVmQBKKyWMHOyGm7TdD2Y7FQCZe-VGsy8iG2zLNUpua3hoHEqC7MmjYjGJOtcyFzo1Q0ctlIWhLbBFd4B11IkOosN9T4+sR+8EuhEQ4Mo-rNjDB3E1KPAW4iEhQccUauq2EarUMn7GAEdGqmhPFFpldoAtObZ5ZkbRfM7ouOssVqs1uvdhrupvM1u+0GdaeT2sNvvfCRX7CdWg0GIFhaCof0v3DXFcTHCdiCgDBSWPOCJHfQ0ACZLlQgBGTCJ0NKQZEuAiMC9UjgxAEBQVvDDG1kMtoPfODkBULB5mXQEDxBI99ikFAACNYULQ0EKGbMSE9Ns-U6CioAAEVoJATj4u5QigUhqCgFBCGwcgWG3S40DFKh1A0k4BCOU5OhMo0RL2HMfUqLpqkYqBAOwaRkPgxD5jZAMoBk09jF4gTaEFJyZOY5QsC80SkMmACgJAqhbLE4hgAY2DXJwH5ItYnNhO8+ygA"
        text="Playground"
      />
    </>
  );
};

export default LinkedList;
