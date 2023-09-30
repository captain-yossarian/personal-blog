import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";
import { Anchor } from "../Shared/Links";

const code1 = `
const navigation = [{
    label: "Root", href: '/root',
    children: [
        { label: "Child1", href: "/root/child1" },
        { label: "Child2", href: "/root/child2" },
        { label: "Child3", href: "/root/child3" },
    ],
}]
`;

const code2 = `
type TypeError<Message extends string> = Message & { tag: 'error' }

type Compare<L extends string, R extends string> =
    L extends R ? R :
    (R extends \`${"${L}/${string}"}\` 
        ? (R extends \`${"${L}/${string}/${string}"}\` ? TypeError<'Nested href value should have only one backslash'> : R)
        : TypeError<'Nested href value should extend href context'>)

{
    type Test = Compare<'/webapp', '/webapp'>

    type ok = Expect<Compare<'/webapp', '/webapp'>, '/webapp'>
    type ok2 = Expect<Compare<'/webapp', '/webapp/intro'>, '/webapp/intro'>
    type ok3 = Expect<Compare<'/webapp', '/webapp/intro/first'>, never>

    //@ts-expect-error
    type error = Expect<Compare<'/webapp', '/webapp/intro/first'>, '/webapp'>
    //@ts-expect-error
    type error2 = Expect<Compare<'/webapp', '/webapp/'>, '/webapp'>
    //@ts-expect-error
    type error3 = Expect<Compare<'/webapp', '/webapp/a/b'>, '/webapp/a/b'>
}
`;

const code3 = `
export type NavigationValidation<T extends NavItem[], Href extends string = never, Acc extends NavItem[] = []> =
    (T extends []
        ? Acc
        : (T extends [infer Head extends NavItem, ...infer Rest extends NavItem[]]
            ? NavigationValidation<Rest, Href, [...Acc, Validation<Head, Href>]>
            : never)
    )

`;

const code4 = `
const navigationValidation = (navItems: NavItem[], href: string, acc: NavItem[] = []): NavItem[] => {
    if (navItems.length === 0) {
        return acc
    }

    const [head, ...rest] = navItems;

    return navigationValidation(rest, href, validation(head, href))
}
`;

const code5 = `
type ReplaceHref<Item extends NavItem, Href extends string = never> = {
    [Prop in keyof Item]: Prop extends 'href' ? Href : Item[Prop]
}

type OverrideChildren<T extends { children: NavItem[] }, Children extends NavItem[]> = {
    [Prop in keyof T]: Prop extends 'children' ? Children : T[Prop]
}

type Validation<Item extends NavItem, HrefContext extends string> =
/**
 * In order to proceed we need to infer href property 
 * from current item to compare it and validate
 */
    (Item extends { href: infer Href extends string }
        /**
         * If everything ok, Compare type should return provided href property
         */
        ? (Compare<HrefContext, Href> extends Href
            /**
             * Here we need to decide whether we need go deeper or not.
             * If item has children we need to go deeper,
             * otherwise we need to return current item
             */
            ? (Item extends { children: NavItem[] }
                /**
                 * Since item has children propertywe need to override 
                 * it with new validated children property.
                 * 
                 * In this case I just remove the old one not validated children property and pu
                 * new one which is wrapped into NavigationValidation. Please keep in mind
                 * that NavigationValidation is a recursive function which expects an array
                 * of navigation items. This is the place where mutually recursivenes occurs
                 */
                ? OverrideChildren<Item, NavigationValidation<Item['children'], Href>>
                : Item)
                
            : ReplaceHref<Item, \`${"Href expected to be ${HrefContext}/{string}"}\`>)
        : never)
`;

const code6 = `
interface NavItem {
    label: string;
    href: string;
    children?: NavItem[]
}

export type Expect<Value, _ExpectedValue extends Value> = void
type TypeError<Message extends string> = Message & { tag: 'error' }

type Compare<L extends string, R extends string> =
    L extends R ? R :
    (R extends \`${"${L}/${string}"}\` 
        ? (R extends \`${"${L}/${string}/${string}"}\` ? TypeError<'Nested href value should have only one backslash'> : R)
        : TypeError<'Nested href value should extend href context'>)


type ReplaceHref<Item extends NavItem, Href extends string = never> = {
    [Prop in keyof Item]: Prop extends 'href' ? Href : Item[Prop]
}

type OverrideChildren<T extends { children: NavItem[] }, Children extends NavItem[]> = {
    [Prop in keyof T]: Prop extends 'children' ? Children : T[Prop]
}

type Validation<Item extends NavItem, HrefContext extends string> =
    (Item extends { href: infer Href extends string }
        ? (Compare<HrefContext, Href> extends Href
            ? (Item extends { children: NavItem[] }
                ? OverrideChildren<Item, NavigationValidation<Item['children'], Href>>
                : Item)
            : ReplaceHref<Item, \`${"Href expected to be ${HrefContext}/{string}"}\`>)
        : never)


export type NavigationValidation<T extends NavItem[], Href extends string = never, Acc extends NavItem[] = []> =

    (T extends []
        ? Acc
        : (T extends [infer Head extends NavItem, ...infer Rest extends NavItem[]]
            ? NavigationValidation<Rest, Href, [...Acc, Validation<Head, Href>]>
            : never)
    )

type Test = NavigationValidation<[{
    label: string;
    href: "/root";
    children: [{
        label: string;
        href: "/root/child1";
    }, {
        label: string;
        href: "/rot/child2"; // error is here, see result
    }];
}]>
`;

const code7 = `
const validation = <
    Item extends NavItem,
    Items extends Item[]
>(items: NavigationValidation<[...Items]>) => items

validation([{
    label: "Root", href: '/root',
    children: [
        { label: "Child1", href: "/root/child1" },
        { label: "Child2", href: "/root/child2" },
        { label: "Child3", href: "/root/child3" },
    ],
}])
`;

const code8 = `
const validation = <
    const Item extends NavItem,
    const Items extends Item[]
>(items: NavigationValidation<[...Items]>) => items
`;

const code9 = `
function validation<
    Href extends string,
    Item extends { label: string, href: Href, children: Item[] },
    Items extends Item[]
>(items: [...Items]) { }

`;

const code10 = `

function validation<
    Href extends string,
    Children extends Item[], // <-- Children should be infered separately
    Item extends { label: string, href: Href, children: [...Children] },
    Items extends Item[]
>(items: NavigationValidation<[...Items]> extends [...Items] ? [...Items] : NavigationValidation<[...Items]>) { }
`;

const code11 = `
function validation<
    Href extends string,
    Children extends Item[], // <-- Children should be infered separately
    Item extends { label: string, href: Href, children: [...Children] },
    Items extends Item[]
>(items: NavigationValidation<[...Items]> extends [...Items] ? [...Items] : NavigationValidation<[...Items]>) { }



validation([{
    label: "Root", href: '/root',
    children: [
        { label: "Child1", href: "/root/child1" },
        { label: "Child2", href: "/rot/child2" }, // expected error
    ],
}])
`;

const code12 = `
interface NavItem {
    label: string;
    href: string;
    children?: NavItem[]
}

export type Expect<Value, _ExpectedValue extends Value> = void
type TypeError<Message extends string> = Message & { tag: 'error' }

type Compare<L extends string, R extends string> =
    L extends R ? R :
    (R extends \`${"${L}/${string}"}\` 
        ? (R extends \`${"${L}/${string}/${string}"}\` ? TypeError<'Nested href value should have only one backslash'> : R)
        : TypeError<'Nested href value should extend href context'>)


type ReplaceHref<Item extends NavItem, Href extends string = never> = {
    [Prop in keyof Item]: Prop extends 'href' ? Href : Item[Prop]
}

type OverrideChildren<T extends { children: NavItem[] }, Children extends NavItem[]> = {
    [Prop in keyof T]: Prop extends 'children' ? Children : T[Prop]
}

type Validation<Item extends NavItem, HrefContext extends string> =
    (Item extends { href: infer Href extends string }
        ? (Compare<HrefContext, Href> extends Href
            ? (Item extends { children: NavItem[] }
                ? OverrideChildren<Item, NavigationValidation<Item['children'], Href>>
                : Item)
            : ReplaceHref<Item, \`${"Href expected to be ${HrefContext}/{string}"}\`>)
        : never)


export type NavigationValidation<T extends NavItem[], Href extends string = never, Acc extends NavItem[] = []> =

    (T extends []
        ? Acc
        : (T extends [infer Head extends NavItem, ...infer Rest extends NavItem[]]
            ? NavigationValidation<Rest, Href, [...Acc, Validation<Head, Href>]>
            : never)
    )

function validation<
    Href extends string,
    Children extends Item[],
    Item extends { label: string, href: Href, children: [...Children] },
    Items extends Item[]
>(items: NavigationValidation<[...Items]> extends [...Items] ? [...Items] : NavigationValidation<[...Items]>) { }


validation([{
    label: "Root", href: '/root',
    children: [
        { label: "Child1", href: "/root/child1" },
        { label: "Child2", href: "/rot/child2" }, // expected error
    ],
}])
`;

const navigation = {
  deep_nested_navigation: {
    id: "deep_nested_navigation",
    text: "Deep nested navigation",
  },
} as const;
const links = Object.values(navigation);

const UsefulPatterns: FC = () => (
  <>
    <HeaderNav links={links} />
    <Header {...navigation.deep_nested_navigation} />
    <p>Assume you have a navigation with deep nested menu.</p>
    <Code code={code1} />
    <p>
      My main goal is to make sure that each child <Var>href</Var> inherits
      prefix from parent <Var>href</Var>.
    </p>
    <p>
      If parent href is <Var>{"/root"}</Var>, than child href should be{" "}
      <Var>{"/root/{string}"}</Var>
    </p>
    <p>
      Lets start from validation rules. CHild href should not have more than one
      href path. I mean, if root href is <Var>{"/root"}</Var> child href is not
      allowed to be <Var>{"/root/child/more"}</Var>, it should have only one
      appendix like here <Var>{"/root/child"}</Var>.
    </p>
    <p>
      Please keep in mind that you can define any rules you want, I just want to
      make it as simply as possible and at the same time useful for you, so you
      can copy/paste and play with it. In my solution, it can be also equal to
      root href.
    </p>
    <p>Enough talking, show me the code! Ok, ok, here you have.</p>
    <Code code={code2} />
    <p>
      <Var>TypeError</Var> is just a wrapper for error string. Please check test
      cases, I have provided them for better understanding. Nothing complicated,
      for now{" "}
    </p>
    <p>
      Since we have validator type, we can start iterate through the main array.
      In my example iteration is recursive.
    </p>
    <p>
      We need to iterate through each element and call validation function on
      it.
    </p>
    <Code code={code3} />
    <p>
      I know, it might be hard to understand what is going on in this recursive
      type, hence I have decided to provide you with rintime representation of
      this type
    </p>
    <Code code={code4} />
    <p>
      As you might have noticed, the logic is pretty straitforward. However,{" "}
      <Var>validation</Var> function or type is not implemented yet.
    </p>
    <p>What are we waiting for? Lets implement it!</p>
    <Code code={code5} />
    <p>
      <Var>ReplaceHref</Var> and <Var>OverrideChildren</Var> are provided for
      replacing current property with new one.
    </p>
    <p>
      This is a breif summary what we are doing. First we iterate through an
      array of navigation items. If we encounter an item with{" "}
      <Var>children</Var> we dig into this property{" "}
      <Var>
        {"OverrideChildren<Item, NavigationValidation<Item['children'], Href>>"}
      </Var>{" "}
      and call the function which is our starting point{" "}
      <Var>NavigationValidation</Var> because <Var>children</Var> is the same
      array.
    </p>
    <p>
      It took me some time (will not confesse how much) to figure out this
      mutually recursiveness.
    </p>
    <p>Here you have full example:</p>
    <Code code={code6} />

    <p>
      <Anchor text="Playground" href="https://tsplay.dev/weLgVW" />
    </p>
    <p>
      At this moment, I thought that I had all what I need. I thought it will be
      very straightforward to add this validation to my codebase.But I was
      mistaken.
    </p>
    <p>This is how I usually validate my data</p>
    <Code code={code7} />
    <p>
      <Anchor text="Playground" href="https://tsplay.dev/wgKnbw" />
    </p>
    <p>
      As you might have noticed, provided array did not infered as you might
      have expected. If you want to learn more about function argument inference
      you can check{" "}
      <Anchor text="my article" href="https://catchts.com/infer-arguments" />
    </p>
    <p>
      Then I thought "ok", I will use <Var>const T</Var> - this should resolve
      my issue.
    </p>
    <Code code={code8} />
    <p>
      Nope. It did not worker. Then I decided to go "the long way" with
      inference. By the way, stop reading and try to infer the argument and
      preserve children array length. I mean infered generic argument should be
      equal to provided argument, no array unionizing.
    </p>
    <p>Then I tried this</p>
    <Code code={code9} />
    <p>
      I was close, but nested <Var>childre</Var> still were represented as a
      union and in order to validate it I had to infer it as aan array of three
      elements
    </p>
    <p>Here you have working example</p>
    <Code code={code10} />
    <p>
      As you might have noticed, I infered <Var>Children</Var> separately. ALso
      it is important to use <Var>[...Children]</Var>, it is better for
      inference. I always using it when I want to infer an array with exact
      length and not union of elements
    </p>
    <Code code={code11} />
    <p>
      <Anchor text="Playground" href="https://tsplay.dev/WYKAEN" />
    </p>
    <p>Now, it works.</p>
    <p>Here you have full example</p>
    <Code code={code12} />
    <p>
      <Anchor text="Playground" href="https://tsplay.dev/NnMxvw" />
    </p>
  </>
);
export default UsefulPatterns;
