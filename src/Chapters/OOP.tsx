import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";
import { Link } from "react-router-dom";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
function Mixin(...classRefs: any[]) {
  return merge(class {}, ...classRefs);
}

function merge(derived: any, ...classRefs: any[]) {
  classRefs.forEach(classRef => {
    Object.getOwnPropertyNames(classRef.prototype).forEach(name => {
      if (name !== 'constructor') {
        Object.defineProperty(
          derived.prototype,
          name,
          Object.getOwnPropertyDescriptor(classRef.prototype, name) as PropertyDescriptor
        );
      }
    });
  });

  return derived;
}

class Foo {
  foo() {}
}

class Bar {
  bar() {}
}

class Baz {
  baz() {
    console.log('baz');
  }
}

class MyClass extends Mixin(Foo, Bar, Baz) {}

const my = new MyClass();
my.baz();
`;

const code2 = `
type ClassType = new (...args: any[]) => any;
`;

const code3 = `
  function merge(derived: ClassType, ...classRefs: ClassType[]) {
    classRefs.forEach(classRef => {
      Object.getOwnPropertyNames(classRef.prototype).forEach(name => {
        // you can get rid of type casting in this way
        const descriptor = Object.getOwnPropertyDescriptor(classRef.prototype, name)
        if (name !== 'constructor' && descriptor) {
          Object.defineProperty(
            derived.prototype,
            name,
            descriptor
          );
        }
      });
    });

    return derived;
  }
`;

const code4 = `
function Mixin<T extends ClassType>(...classRefs: T[]):
    new (...args: any[]) => UnionToIntersection<InstanceType<T>> {
    return merge(class { }, ...classRefs);
  }

`;

const code5 = `
  let x: Foo = new Foo();
  x = new Bar(); // error
`;

const code6 = `
function Mixin<T extends ClassType, R extends T[]>(...classRefs: [...R])
`;

const code7 = `
function Mixin<T extends ClassType, R extends T[]>(...classRefs: [...R]):
    new (...args: any[]) => [...R][number]> {}
`;

const code8 = `
 function Mixin<T extends ClassType, R extends T[]>(...classRefs: [...R]):
    new (...args: any[]) => InstanceType<[...R][number]> {
   
  }
`;

const code9 = `
// credits goes to https://stackoverflow.com/a/50375286
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (
    k: infer I
  ) => void
  ? I
  : never;

  function Mixin<T extends ClassType, R extends T[]>(...classRefs: [...R]):
    new (...args: any[]) => UnionToIntersection<InstanceType<[...R][number]>> {
    return merge(class { }, ...classRefs);
  }
`;

const code10 = `
function Mixin(...classRefs: any[]) {
  return merge(class { }, ...classRefs);
}

function merge(derived: any, ...classRefs: any[]) {
  classRefs.forEach(classRef => {
    Object.getOwnPropertyNames(classRef.prototype).forEach(name => {
      if (name !== 'constructor') {
        Object.defineProperty(
          derived.prototype,
          name,
          Object.getOwnPropertyDescriptor(classRef.prototype, name) as PropertyDescriptor
        );
      }
    });
  });

  return derived;
}

class Foo {
  foo() { }
}

class Bar {
  bar() { }
}

class Baz {
  baz() {
    console.log('baz');
  }
}

{
  // credits goes to @jcalz
  type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends (
      k: infer I
    ) => void
    ? I
    : never;

  type Infer<T> =
    T extends infer R
    ? R extends new (...args: any) => any
    ? InstanceType<R>
    : never
    : never;

  type ClassType = new (...args: any[]) => any;
  
  function Mixin<T extends ClassType, R extends T[]>(...classRefs: [...R]):
    new (...args: any[]) => UnionToIntersection<InstanceType<[...R][number]>> {
    return merge(class { }, ...classRefs);
  }

  function merge(derived: ClassType, ...classRefs: ClassType[]) {
    classRefs.forEach(classRef => {
      Object.getOwnPropertyNames(classRef.prototype).forEach(name => {
        // you can get rid of type casting in this way
        const descriptor = Object.getOwnPropertyDescriptor(classRef.prototype, name)
        if (name !== 'constructor' && descriptor) {
          Object.defineProperty(
            derived.prototype,
            name,
            descriptor
          );
        }
      });
    });

    return derived;
  }

  class Foo {
    foo() { }
  }

  class Bar {
    bar() { }
  }

  class Baz {
    baz() {
      console.log('baz');
    }
  }

  class MyClass extends Mixin(Foo, Bar, Baz) { }

  const y = Mixin(Foo, Bar, Baz)
  const my = new MyClass();
  my.foo() // ok
  my.bar() // ok
  my.baz(); // ok
`;
const code11 = `
function Mixin<T extends ClassType, R extends T[]>(...classRefs: [T, ...R]):
    new (...args: any[]) => UnionToIntersection<InstanceType<[...R][number]>> {
    return merge(class { }, ...classRefs);
}
`;

const code12 = `
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (
    k: infer I
  ) => void
  ? I
  : never;

type ClassType = new (...args: any[]) => any;

function Mixin<T extends ClassType, R extends T[]>(...classRefs: [T, ...R]):
  new (...args: any[]) => UnionToIntersection<InstanceType<[...R][number]>> {
  return merge(class { }, ...classRefs);
}

function merge(derived: ClassType, ...classRefs: ClassType[]) {
  classRefs.forEach(classRef => {
    Object.getOwnPropertyNames(classRef.prototype).forEach(name => {
      // you can get rid of type casting in this way
      const descriptor = Object.getOwnPropertyDescriptor(classRef.prototype, name)
      if (name !== 'constructor' && descriptor) {
        Object.defineProperty(
          derived.prototype,
          name,
          descriptor
        );
      }
    });
  });

  return derived;
}

class Foo {
  foo() { }
}

class Bar extends Foo {
  bar() { }
}

class Baz extends Foo {
  baz() {
    console.log('baz');
  }
}

class MyClass extends Mixin(Foo, Bar, Baz) { }

const my = new MyClass();
my.foo() // ok
my.bar() // ok
my.baz(); // ok

`;

const code13 = `
type MoreGeneral<T> = T extends string ? string : never;

type Result = MoreGeneral<'a'>; // string
`;

const code14 = `
type Infer<T> = T extends infer R ? R : never;
`;

const code15 = `
interface PlainObject<T> { [index: string]: T }

type ItemValue =
    | boolean
    | number
    | string
    | ItemValue[]
    | { [index: string]: ItemValue }
    | null;

class Item<T> {
    private value: T;
    constructor(value: T) {
        this.value = value;
    }
    public set(value: T) {
        this.value = value;
    }
}

type Infer<T> = T extends infer R ? R & ItemValue : never

// This one puts restrictions on the generic
class StrictItem<T, R = Infer<T>> extends Item<R> { }

let item2 = new StrictItem('a');
item2.set('2'); // ok
`;
const navigation = {
  typed_inheritance: {
    id: "typed_inheritance",
    text: "Typed inheritance",
  },
  strict_to_general: {
    id: "strictt_to_general",
    text: "Convert strict type to more general",
  },
};
const links = Object.values(navigation);

const OOP: FC = () => (
  <>
    <HeaderNav links={links} />
    <p>
      In this article You will find some tips and tricks about typing
      <Var>classes</Var>
    </p>
    <Header {...navigation.typed_inheritance} />
    <p>
      Let's say you want to simulate multiple inheritance in either pure
      JavaScript or TypeScript.
    </p>
    <p>For me, it is not trivial task, because I'm not good in OOP.</p>
    <p>Ok, I'm not good in FP either.</p>
    <p>
      In order to achieve it, we can use <Var>mixin</Var> pattern.
    </p>
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/67084764/function-return-type-that-matches-parameter-types-when-using-the-spread-operato"
        text="Here"
      />
      you have absolutely working example made by
      <Anchor href="https://stackoverflow.com/users/5291/wilco" text="Wilco" />
      user:
    </p>
    <Code code={code1} />
    <p>I will try to type it step by step.</p>
    <p>First of all, we should write base type for all classes.</p>
    <Code code={code2} />
    <p>
      Next, we should type <Var>merge</Var> function. I think it is very
      straight forward. First argument (<Var>derivedClass</Var>) should be a
      class and rest arguments should be an array of classes. Nothing
      complicated.
    </p>
    <Code code={code3} />
    <p>
      To get rid of type casting <Var>as PropertyDescriptor</Var> we should make
      sure that <Var>descriptor</Var> exists
    </p>
    <p>
      <Var>Mixin</Var> function is a bit tricky.
    </p>
    <p>
      Mixin function expects an array of classes. First thing which came to my
      mind was just to add generic argument.
    </p>
    <Code code={code4} />
    <p>
      But, then, TS will expect then every next argument is assignable to
      previous.
    </p>
    <p>In our case, it is impossible.</p>
    <Code code={code5} />
    <p>
      That's why I decided to provide extra generic <Var>R extends T[]</Var>.
    </p>
    <Code code={code6} />
    <p>Now, TS is able to infer each argument separately.</p>
    <p>
      Lets type our return type. What we expect here? We expect class which will
      a sum of all arguments. In other words, our class should inherit all
      passes classes.
    </p>
    <p>In TS terms it means - intersection.</p>
    <p>
      In order to make intersection of some types, we need to gather all of them
      in one place, in other words - we should some how to get union type of all
      passed classes.
    </p>
    <p>
      It is easy to achieve.<Var>[...R][number]</Var>.
    </p>
    <p>
      I have already written about it. To obtain union type of all array values,
      you should just use square bracket notation with index type.
    </p>
    <p>
      I used <Var>[number]</Var> because array's indexes are numbers.
    </p>
    <p>Are You with me? :)</p>
    <p>This is how our type looks so far:</p>
    <Code code={code7} />
    <p>
      So, for now, our <Var>Mixin</Var> function returns a class which instance
      type is a union of passed classes.
    </p>
    <p>Is this what we want? No.</p>
    <p>
      I hope, you have noticed, that we ended up with union of classes
      <Var>typeof Foo | typeof Bar | typeof Baz</Var>.
    </p>
    <p>
      But our instance type of expected class should be an object instead of
      class. We dont need a class which returns another class.
    </p>
    <p>
      In order to obtain instance type of a class TS have built in util type
      <Var>InstanceType</Var>.
    </p>
    <p>Let's use it:</p>
    <Code code={code8} />
    <p>
      We almost finished. Please remember, that we need an intersection instead
      of union.
    </p>
    <p>
      So let's use <Var>UnionToIntersection</Var> helper type:
    </p>
    <Code code={code9} />
    <p>Whole code:</p>
    <Code code={code10} />
    <p>
      <Anchor
        href="https://www.typescriptlang.org/play?#code/FAAhBcE8AcFMQKoDsCWB7JAVNBJJ5YAnAZ1gGNx0kAeBAPhAF5QwQAKBEWADwKQBNiIAIZJIIAPzsA1gC5EASiYMAbmhT8Q8pLBVElPPoPYtWIOSBRIAZkRA5TIJY1Xr+jqQ7PbdRANzALFBwIADCADbCxMSYMPCMIDoA7uwAdOnChADmxPKikADaALrODPkBYCzWAK5IFFQgALIo3FbUmFy8sAJCEVExcQA0IABKnUZCmMV0bOmpZJHRI7DWuSAFcyMlso7JaRnZa-nFpYioGNh4BCTklBjUeMTgomSwsXDUG+lbBUjVALYAIyIRToDAA3o5CLBwNVCEgQP8iFlYGwFv0QOCQABfYZzdFLFbEBQVHGBMA1Op3BFI7Ko-hEFB6fjyPrRd6wPHpAnEZarVmLAZwE6Yxw8vnEVLWNCEACiwjIAAs0YK+cpRWYwAB5QEAK1uqRR4C1SSQAAVCGg4IQoAA5YRI4gq-p81LQS3gNDBWAKKUy+VKthIB3xCGOMwAegjIEgaGqIDIohARpAhA0IDQ1ggcQTUUoSCylgR4EVKCESWEkHDrDIGCeIAZxDIaegnsITBAOv1FENMJN5st1qgABFYE2W23nYTrG6PV6hokQwpq2AUFmgyGQABCRgJADktaQT0I1QoMr3IAAZJeG2PmyhWzKlJDNZquwaGdYrLALVaiFA2BXTUGTTZlZy9ec4EGICzGDJFoNfV9G3vR9CBgpxSVfbFq2xElHFwgIoRhOEERAplYH4UlsJYHkQAAMTQNANVYaU0DYZ8yTAaiwFogAhTJmLAQFMnYzFOLJGjBRAfiAC9BJAYSZNEl9NUPYg0HCWBUnCNAsjYPdFL3PCzGwrjyQTKTGkgNkhEMbpjGaVokDYBi0GGfjCHc4QZI47iEzrcBEXEBI9ismz2NJf5ID9NilCjDNpBYKLUmEwhRPitBErAZLFIikAMsSoA"
        text="Playground"
      />
    </p>
    <p>
      Let's make our task a bit complicated. What if our classes should all
      extend some base class?
    </p>
    <Code code={code11} />
    <p>
      Just add <Var>T</Var> generic explicitly as a first element.
    </p>
    <p>Whole code:</p>
    <Code code={code12} />
    <p>
      <Anchor
        text="Playground"
        href="https://www.typescriptlang.org/play?#code/FAFwngDgpgBAqgOwJYHsEBUUEkEigJwGcoBjEVBAHjgD4YBeYGGACjhigA88EATQmAEMEYGAH5WAawBc8AJQM6ANxRJeMWQihKCCrj36smzGDJhIEAMwIwsxhfWWrexiXeabtBANzBQkWABhABtBQkJ0AIYYLQB3VgA6JMF8AHNCWWEwAG0AXQc6LN9gSwBXBDIKGABZJE4LSnQObig+ARCwiICAGhgAJWaDAXQ8mhYkhJJQ8L6oSwyYbPReib786WM4xOS0hay8gvhkNEwcPCJScjRKHEIQYRIoSOhKbNXc7IRSgFsAIwJcjQ6ABvYz4KAgUr4BAwb4EVJQFhTTowYEwAC+KySyJmc0Icl86L8ZQqVxhcLSiN4BCQOl4sg64WeUCxk2mhFm8wZ7OZB1RxhxHLxCUsKHwAFFBCQABZI9mcxT8kwwADyvwAVpcEgiQCrYggAAr4FDQfDgABygjhhDlnU5CQgxpAKHA0DkIrFkplLAQVtgjiVypgAHpgzAwChSjASMIYDqYPg1DAUJYYK7YDG7hZUuYYSBpUgBLFBGBjMqSGg7jBqYQSImIM78NE1ZqyNqIXrDcbTeAACJQWv1xu23GWB1Ol09GJ+uRlkxIVM+v0wACE9HoMAA5BWEHd8KUyGLNzAAGQn6sDutIBtihSgoMmFta6mWCxQI0mgjgFhzh-UxN0uOLqTtA3S-kGvpwmBD7KjWV43vg4HMAS4FEsq6IocwGHFMw4KQtCF4AVAvCEn4gowAAYigKCBqKKAsHeGLAESwDkQAQikgytIYVE0feMC-CkDGokxLHsYIABeXFtJR1GBoJEnCfxzA7oQKDBFACTBCgqQsJuCmbpholkeyNRgIyAj6NxAi1PUCAsLxvQcfgTmSYxYmViAsKiBuWzVOZ7IMb43xgB69EKKGyaSMAIUJIJ+DCZFKDRbFClBSGYbJcAQA"
      />
    </p>
    <Header {...navigation.strict_to_general} />
    <p>
      Let's say You have very strict literal string type <Var>'a'</Var>.
    </p>
    <p>
      How to convert it to more general <Var>string</Var> type ?
    </p>
    <p>You can use conditional type.</p>
    <Code code={code13} />
    <p>
      But this way is not very generic. We don't want to write huge conditions
      with several nested types.
    </p>
    <p>
      We can use very simple <Var>Infer</Var> utility type
    </p>
    <Code code={code14} />
    <p>
      <Anchor
        text="Here"
        href="https://stackoverflow.com/questions/67070250/typescript-class-generic-type-is-too-narrow-if-extends-something-else-is-not"
      />{" "}
      You can find a use case.
    </p>
    <Code code={code15} />
    <p>
      As You see, you don't need to use explicit generic parameter{" "}
      <Var>{`new StrictItem<string>('a')`}</Var> to help TS infer the general
      type.
    </p>
    <p>
      <Anchor
        text="Playground"
        href="https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgAoBs6gPICMBWECYAPACoB8yA3sgNqgAmEAHgFzIDOYUoA5gF0OZZAF8AUOLABPAA4oAkpAC2ANTjoArigC845AeQAfZLgD2Z9BDgh9hkyE3Lc0OwZPdeIPm+PIlEGoa2nQCvia0DCDM7Fw8-EL+KupaKBKGfo7o6ADckgiYnJxJgeRU1L6yvABucJDItanCeRkIZiCemsRmUAAUjdrCAJQ0vhlgABbAnAB0A7oNwRAthumGspq46MAIXBBg-UvDoxnjU7PzyDqLqSsGEhJScoogMNBlV8girJDRxaBvKDIABKyAA-CDkAAyEpBVLIDggCDVVziAD0aK+52Q7RQGzAxSgEE8OzAwHaxXayEmKD4ECRvAQ4gKcCKyAAyvFiAFlOQADSQ64KV7vShUH70xjFHkkYHlMSSKxgZDAFQAJk+SIA7hyuWAeb0AORwQ1DPKqwJqmacfZGtWmnLIDE4gDWQA"
      />
    </p>
  </>
);
export default OOP;
