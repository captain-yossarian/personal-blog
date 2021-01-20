
export const sections = {
    "/about": {
        title: 'About',
        description: 'About section',
        Comp: 'About',
        next: '',
        links: [
            {
                href: "https://www.stephanboyer.com/",
                text: "https://www.stephanboyer.com/",
            },
            {
                href: "http://cliffle.com/contact/",
                text: "http://cliffle.com/contact/",
            },
            {
                href: "https://fettblog.eu/",
                text: "https://fettblog.eu/",
            },
            {
                href: "https://mariusschulz.com/",
                text: "https://mariusschulz.com/",
            },
            {
                href: "https://twitter.com/WrocTypeScript",
                text: "https://twitter.com/WrocTypeScript",
            },
            {
                href: "https://typeofweb.com/",
                text: "TypeOfWeb [PL]",
            },
        ]
    },
    "/contact": {
        title: 'Contact',
        description: 'About section',
        Comp: 'Contact',
        next: '',
        links: []

    },
    "/": {
        title: 'Home',
        description: 'Home section',
        Comp: 'Home',
        next: '',
        links: []
    },
} as const;

export const blogArticles = {
    "/math": {
        title: "Math operations",
        description:
            "Let's assume, You want to make some math operations either on number or bigint.",
        next: "/typed-react-children",
        Comp: 'MathOperations',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65280785/is-it-possible-to-declare-a-typescript-function-which-works-on-both-numbers-and",
                text: "stackoverflow",
            },
            {
                href: 'https://stackoverflow.com/questions/65508351/is-it-possible-to-use-intersection-to-make-function-overloadings-with-generics',
                text: 'stackoverflow'
            }
        ],
        tags: ['number', 'bigint', 'math', 'add']
    },
    "/typed-react-children": {
        title: "Type React component children",
        description:
            "Let's assume you want to create component which will accept array of children components with certain props.",
        next: "/react-return-type",
        Comp: 'ReactChildren',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/64967447/adding-required-props-to-child-react-elements-with-typescript",
                text: "stackoverflow",
            },
        ],
        tags: ['react', 'component', 'children']
    },
    "/react-return-type": {
        title: "Type React component return type",
        description:
            "What if you need to make sure that some component will always return other component with some particular props",
        next: "/compare-arguments",
        Comp: 'ReactReturnType',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65406516/react-typescript-difference-between-react-fc-t-and-function",
                text: "stackoverflow",
            },
        ],
        tags: ['ReturnType', 'react', 'component']
    },
    "/compare-arguments": {
        title: "Compare array arguments",
        description: "Compare length of arrays as arguments",
        next: "/range-numbers",
        Comp: 'CompareArguments',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65361696/arguments-of-same-length-typescript",
                text: "stackoverflow",
            },
            {
                href: 'https://stackoverflow.com/questions/65549062/template-string-literal-with-variable-cause-argument-of-type-s-not-assignable-t/65549738#65549738',
                text: 'stackoverflow'
            }
        ],
        tags: ['array', 'arguments', 'narrow']
    },

    "/range-numbers": {
        title: "Generate numbers in range",
        description: "How to generate numbers range as a literal type",
        next: "/tuples",
        Comp: 'RangeNumbers',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65307438/how-to-define-properties-in-a-typescript-interface-with-dynamic-elements-in-the",
                text: "stackoverflow",
            },
        ],
        tags: ['number', 'range']
    },
    "/tuples": {
        title: "Handle literal arrays/tuples",
        description: "Filter, map, reduce, findIndex etc ...",
        next: "/union-array",
        Comp: 'Tuples',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65476787/how-to-dynamically-create-an-object-based-on-a-readonly-tuple-in-typescript/65478618#65478618",
                text: "stackoverflow",
            },
        ],
        tags: ['array', 'tuple']
    },
    "/union-array": {
        title: "Transform Union to Array",
        description: "How to transform unions to array",
        next: "/unions",
        Comp: 'UnionArray',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65533827/get-keys-of-an-interface-in-generics/65534971#65534971",
                text: "stackoverflow",
            },
        ],
        tags: ['union', 'array', 'transform']
    },
    "/unions": {
        title: "Handle unions",
        description: "How to work with unions",
        next: "/callbacks",
        Comp: 'Unions',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/64899974/require-at-least-one-prop-to-be-passed-to-component-typescript",
                text: "stackoverflow",
            },
            {
                href:
                    "https://stackoverflow.com/questions/65805600/struggling-with-building-a-type-in-ts",
                text: "stackoverflow",
            },
        ],
        tags: ['union', 'react']
    },
    "/callbacks": {
        title: "Callbacks",
        description: "How to properly type callbacks",
        next: "/publish-subscribe",
        Comp: 'Callbacks',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65540887/typescript-type-can-not-be-inferred-if-function-parameter-is-used/65543597#65543597",
                text: "stackoverflow",
            },
            {
                href:
                    "https://en.wikipedia.org/wiki/Type_system#:~:text=In%20programming%20languages%2C%20a%20type,%2C%20expressions%2C%20functions%20or%20modules.",
                text: "Type system",
            },
            {
                href:
                    "https://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)",
                text: "Covariance_and_contravariance",
            },
            {
                href:
                    "https://basarat.gitbook.io/typescript/type-system/type-compatibility",
                text: "TS book",
            },
        ],
        tags: ['callback', 'infer']
    },
    "/publish-subscribe": {
        title: "Publish subscribe pattern",
        description: "Type safe publish subscribe pattern",
        next: "/type-state",
        Comp: 'PubSub',
        links: [],
        tags: ['pattern']
    },
    "/type-state": {
        title: "Type state pattern",
        description: "Type safe handler",
        next: "/api",
        Comp: 'TypeState',
        links: [
            {
                href:
                    "https://docs.google.com/presentation/d/1po3-zRQCp8m8cwg-CF5dUL_6RPe9gIaKIT5P_DNbGE8/edit#slide=id.g6baf2c25cf_0_33",
                text: "presentation",
            },
            { href: "http://cliffle.com/blog/rust-typestate/", text: "blog" },
            {
                href:
                    "https://stackoverflow.com/questions/65431379/type-property-relying-on-return-type-of-another-property/65433418#65433418",
                text: "stackoverflow",
            },
        ],
        tags: ['pattern']
    },
    "/api": {
        title: "Api requests",
        description: "Make type safe api requests with TypeScript",
        next: "/math",
        Comp: 'Api',
        links: [{
            href: 'https://stackoverflow.com/questions/65658633/how-to-determine-the-type-of-generic-in-a-class/65664455#65664455',
            text: 'stackoverflow'
        }],
        tags: ['pattern']
    },
}