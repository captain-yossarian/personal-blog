
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
        ]
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
        ]
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
        ]
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
        ]
    },

    "/range-numbers": {
        title: "Generate numbers in range",
        description: "How to generate numbers range as a literal type",
        next: "/recursive-types",
        Comp: 'RangeNumbers',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65307438/how-to-define-properties-in-a-typescript-interface-with-dynamic-elements-in-the",
                text: "stackoverflow",
            },
        ]
    },
    "/recursive-types": {
        title: "Recursive types",
        description: "Some useful techniques with recursive types",
        next: "/tuples",
        Comp: 'RecursiveTypes',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/64899511/deepexclude-type-for-typescript",
                text: "stackoverflow",
            },
            {
                href:
                    "https://stackoverflow.com/questions/65503728/defining-a-type-for-this-function-that-works-on-arbitrary-length-tuples",
                text: "stackoverflow",
            },
        ]
    },
    "/tuples": {
        title: "Handle tuples",
        description: "Transform, filter, search ...",
        next: "/union-array",
        Comp: 'Tuples',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65476787/how-to-dynamically-create-an-object-based-on-a-readonly-tuple-in-typescript/65478618#65478618",
                text: "stackoverflow",
            },
        ]
    },
    "/union-array": {
        title: "Transform Union to Array",
        description: "How to transform unions to array",
        next: "/callback-chain",
        Comp: 'UnionArray',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65533827/get-keys-of-an-interface-in-generics/65534971#65534971",
                text: "stackoverflow",
            },
        ]
    },
    "/callback-chain": {
        title: "Callback chain",
        description: "How to properly type callbacks",
        next: "/handle-arrays",
        Comp: 'CallbackChain',
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
        ]
    },
    "/handle-arrays": {
        title: "Handle arrays",
        description: "Several useful operations on array types",
        next: "/publish-subscribe",
        Comp: 'Arrays',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65429424/need-help-in-understanding-confusing-typescript-function",
                text: "stackoverflow",
            },
            {
                href: "https://typescriptnapowaznie.pl/",
                text: "Typescript na powaznie",
            },
        ]
    },
    "/publish-subscribe": {
        title: "Publish subscribe pattern",
        description: "Type safe publish subscribe pattern",
        next: "/type-state",
        Comp: 'PubSub',
        links: []
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
        ]
    },
    "/api": {
        title: "Api requests",
        description: "Make type safe api requests with TypeScript",
        next: "/math",
        Comp: 'Api',
        links: []
    },
} as const