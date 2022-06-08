
export interface Section {
    url: string,
    title: string;
    description: string;
    Comp: string;
    links: Array<{ href: string, text: string }>;
    id: number;
    date: string;
    type?: string;
    tags: string[]
}
export const sections: Section[] = [
    {
        url: "/about",
        title: 'About',
        description: 'About section',
        Comp: 'About',
        links: [
            {
                href: 'https://www.typescriptlang.org/docs/handbook/intro.html',
                text: 'TypeScript book'
            },
            {
                href: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
                text: 'TypeScript book v2 beta'
            },
            {
                href: 'https://github.com/Microsoft/TypeScript/wiki/FAQ',
                text: 'TypeScript FAQ'
            },
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
                href: 'https://blog.joshuakgoldberg.com/',
                text: 'https://blog.joshuakgoldberg.com/'
            },
            {
                href: 'https://thenewtoys.dev/blog',
                text: 'T.J. Crowder \'s blog'
            },
            {
                href: 'https://github.com/dzharii/awesome-typescript',
                text: 'A collection of awesome TypeScript resources for client-side and server-side development.'
            },
            {
                text: 'Vlad Rișcuția \'s blog',
                href: 'https://vladris.com/'
            },
            {
                text: 'How TS compiler works?',
                href: 'https://ortatalks.s3.us-east-1.amazonaws.com/tsconf-2021/long-tsconf-2021.pdf'
            },
            {
                href: 'https://www.youtube.com/watch?v=wSdV1M7n4gQ',
                text: 'Anders Hejlsberg on Modern Compiler Construction'
            },
            {
                href: 'https://kerkour.com/',
                text: 'Very nice blog dedicated to Rust and security'
            }
        ],
        id: -1,
        date: '',
        type: 'section',
        tags: []
    },
    {
        url: "/subscribe",
        title: 'Subscribe',
        description: 'Subscribe section',
        Comp: 'Subscribe',
        links: [],
        id: -4,
        date: '',
        type: 'section',
        tags: []
    },
    {
        url: "/contact",
        title: 'Contact',
        description: 'About section',
        Comp: 'Contact',
        links: [],
        id: -2,
        date: '',
        type: 'section',
        tags: []
    },
    {
        url: '/',
        title: 'Home',
        description: 'Home section',
        Comp: 'Home',
        links: [],
        id: -3,
        date: '',
        type: 'section',
        tags: []
    },

];

export const blogArticles: Section[] = [
    {
        url: "/math",
        title: "Math operations in TypeScript",
        description:
            "How to make math operations either on number or bigint in TypeScript.",
        Comp: 'MathOperations',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65280785/is-it-possible-to-declare-a-typescript-function-which-works-on-both-numbers-and#answer-65281351",
                text: "Function that work both on numbers and bigints",
            },
            {
                href: 'https://stackoverflow.com/questions/65508351/is-it-possible-to-use-intersection-to-make-function-overloadings-with-generics',
                text: 'Overloadings with generics'
            },
            {
                href: 'https://stackoverflow.com/questions/69612540/typescript-type-to-prevent-division-by-0/69612861#69612861',
                text: 'Division by 0'
            }
        ],
        tags: ['number', 'bigint', 'math'],
        date: 'December 13, 2020'
    },
    // {
    //     url: "/typed-react-children",
    //     title: "Type React component children in TypeScript",
    //     description:
    //         "Let's assume you want to create component which will accept array of children components with certain props.",
    //     Comp: 'ReactChildren',
    //     links: [
    //         {
    //             href:
    //                 "https://stackoverflow.com/questions/64967447/adding-required-props-to-child-react-elements-with-typescript",
    //             text: "Adding required props to child react elements",
    //         },
    //         {
    //             href: 'https://stackoverflow.com/questions/68398560/typescript-type-for-react-functioncomponent-that-returns-exactly-one-intrinsicel/68399995#68399995',
    //             text: 'Infer JSX'
    //         }
    //     ],
    //     tags: ['react', 'children'],
    //     date: 'November 23, 2020'
    // },
    // {
    //     url: "/react-return-type",
    //     title: "Type React component return type in TypeScript",
    //     description:
    //         "What if you need to make sure that some component will always return other component with some particular props",
    //     Comp: 'ReactReturnType',
    //     links: [
    //         {
    //             href:
    //                 "https://stackoverflow.com/questions/65406516/react-typescript-difference-between-react-fc-t-and-function",
    //             text: "DIff between typed function component and untyped",
    //         },
    //     ],
    //     tags: ['ReturnType', 'react'],
    //     date: 'December 22, 2020'
    // },
    {
        url: "/compare-arguments",
        title: "Compare array arguments",
        description: "Compare length of arrays as arguments in TypeScript",
        Comp: 'CompareArguments',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65361696/arguments-of-same-length-typescript",
                text: "How to restrict arguments to same length",
            },
            {
                href: 'https://stackoverflow.com/questions/65549062/template-string-literal-with-variable-cause-argument-of-type-s-not-assignable-t/65549738#65549738',
                text: 'StringNumber hack'
            }
        ],
        tags: ['array', 'arguments', 'narrow'],
        date: 'December 18, 2020'
    },

    {
        url: "/range-numbers",
        title: "Generate literal type for numbers range in TypeScript",
        description: "How to generate numbers range as a literal type",
        Comp: 'RangeNumbers',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/69089549/typescript-template-literal-type-how-to-infer-numeric-type#answer-69090186",
                text: "Make number range",
            },
            {
                href: 'https://stackoverflow.com/questions/68724603/how-to-create-a-uuid-template-literal-type-in-typescript/68724963#68724963',
                text: 'UUID string'
            },
            {
                href: 'https://stackoverflow.com/questions/69089549/typescript-template-literal-type-how-to-infer-numeric-type',
                text: 'TS 4.5 Tail recursion update'
            },
            {
                href: 'https://stackoverflow.com/questions/69766516/infer-generic-from-properties/69766606#69766606',
                text: 'Typing upper bounds'
            },
            {
                href: 'https://stackoverflow.com/questions/70717701/how-to-use-spread-operator-in-typescript-as-argument-to-a-function#answer-70720851',
                text: 'Safe type for RGBA'
            },
            {
                href: 'https://stackoverflow.com/questions/72327925/how-do-i-tell-typescript-that-i-expect-exactly-2-elements-from-split/72347326#72347326',
                text: 'Convert stringified digits to array of numbers'
            }
        ],
        tags: ['number', 'range', 'template literals'],
        date: 'December 15, 2020'
    },
    {
        url: "/tuples",
        title: "Handle literal arrays/tuples types in TypeScript",
        description: "Variadic tuple types: filter, map, reduce, findIndex etc ...",
        Comp: 'Tuples',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65476787/how-to-dynamically-create-an-object-based-on-a-readonly-tuple-in-typescript/65478618#65478618",
                text: "Typing arrays",
            },
            {
                href: 'https://stackoverflow.com/questions/65899183/typescript-template-literals-convert-array-to-a-list#answer-65899432',
                text: 'Reduce array to template string'
            },
            {
                href: 'https://stackoverflow.com/questions/65931013/defining-a-mixed-array-of-tuples/65932929#65932929',
                text: 'Mixed array of tuples'
            },
            {
                href: 'https://stackoverflow.com/questions/66075326/define-an-array-with-infered-types-related-to-first-prop-in-the-array/66077819#66077819',
                text: 'Map union to array'
            },
            {
                href: 'https://stackoverflow.com/questions/67021405/ts-types-convert-arrays-of-keys-and-array-of-values-to-object#answer-67022175',
                text: 'Zip two arrays into object'
            },
            {
                href: 'https://stackoverflow.com/questions/68207767/typescript-infer-possible-object-keys-based-on-value-of-previous-argument/68208487#68208487',
                text: 'Arguments validation with help of Reduce'
            },
            {
                href: 'https://stackoverflow.com/questions/68207767/typescript-infer-possible-object-keys-based-on-value-of-previous-argument/68208487#68208487',
                text: 'Arguments constraints'
            },
            {
                href: 'https://stackoverflow.com/questions/68739264/typescript-unknown-is-assignable-to-the-constraint-of-type-r-but-r-cou/68739510#68739510',
                text: 'Infer function tuples'
            },
            {
                href: 'https://stackoverflow.com/questions/69063690/inferring-a-generic-tuple-with-spread-expressions-in-typescript/69083682#69083682',
                text: 'Handle tuples'
            },
            {
                href: 'https://stackoverflow.com/questions/69299590/transform-array-of-objects-to-single-object-and-keep-types-in-typescript/69300965#69300965',
                text: 'Simple reducer'

            },
            {
                href: 'https://stackoverflow.com/questions/69231722/how-to-get-type-from-object-value/69252777#69252777',
                text: 'Find index'
            },
            {
                href: 'https://stackoverflow.com/questions/69585308/create-string-literal-type-from-dyanamic-array-in-typescript/69587394#69587394',
                text: 'Create tuple with some length'
            },
            {
                href: 'https://stackoverflow.com/questions/70531056/typescript-two-way-string-mapping/70532783#70532783',
                text: 'Less verbose version of Zip'
            }
        ],
        tags: ['array', 'tuples'],
        date: 'April 9, 2021'
    },
    {
        url: "/union-array",
        title: "Transform Union type to Tuple type in TypeScript",
        description: "How to transform unions to array",
        Comp: 'UnionArray',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65533827/get-keys-of-an-interface-in-generics/65534971#65534971",
                text: "Get keys from interface",
            },
            {
                href: 'https://stackoverflow.com/questions/68949858/how-can-i-get-tuple-type-from-the-members-of-another-type-in-typescript/68950848#68950848',
                text: 'How can I get tuple type from the members of another type in typescript'
            },
            {
                href: 'https://stackoverflow.com/questions/69100938/how-to-declare-an-array-of-exactly-one-alias-declared-in-a-type-alias/69101294#69101294',
                text: 'Union to array'
            }
        ],
        tags: ['union', 'array', 'transform'],
        date: 'January 2, 2021'
    },
    {
        url: "/unions",
        title: "Handle unions in React components in TypeScript",
        description: "How to work with unions",
        Comp: 'Unions',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/64899974/require-at-least-one-prop-to-be-passed-to-component-typescript",
                text: "Pass union props to React component - 1",
            },
            {
                href:
                    "https://stackoverflow.com/questions/65805600/struggling-with-building-a-type-in-ts",
                text: "How to make strict union",
            },
            {
                href: "https://dev.to/gcanti/functional-design-algebraic-data-types-36kf",
                text: 'Algebraic data types'
            },
            {
                href: 'https://stackoverflow.com/questions/65811270/problem-with-union-and-intersection-type-in-react-props',
                text: 'Pass union props to React component - 2'
            },
            {
                href: 'https://stackoverflow.com/questions/65842153/property-id-is-optional-in-type-a-but-required-in-type-b-after-if-statement#answer-65842560',
                text: 'Pass union props to React component - 3'
            },
            {
                href: 'https://stackoverflow.com/questions/65668969/event-maps-and-type-guards#answer-65890181',
                text: 'Use event map'
            },
            {
                href: 'https://stackoverflow.com/questions/68591461/reference-for-typescript-parent-or-its-child-class-in-angular-html-template/68591711#68591711',
                text: 'Working with unions'
            },
            {
                href: 'https://stackoverflow.com/questions/68813156/how-to-create-a-union-type-from-nested-arrays/68813549#68813549',
                text: 'Obtain a union of all deep nested props'
            }
        ],
        tags: ['union', 'react'],
        date: 'November 18, 2020'
    },
    {
        url: "/callbacks",
        title: "Callbacks",
        description: "How to properly type callbacks in TypeScript",
        Comp: 'Callbacks',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65540887/typescript-type-can-not-be-inferred-if-function-parameter-is-used/65543597#65543597",
                text: "Callback typings",
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
            {
                href: 'https://stackoverflow.com/questions/66706012/infer-function-generic-type-u-from-return-value-of-passed-function/66725927#66725927',
                text: 'Infer argument and return type of callback when they are depend on each other'
            },
            {
                href: 'https://stackoverflow.com/questions/66668428/typescript-doesnt-figure-out-the-generic',
                text: 'Generic quirks'
            },
            {
                href: 'https://stackoverflow.com/questions/65028565/how-to-overload-optional-boolean-in-typescript',
                text: 'Union types and callbacks'
            }, {
                href: 'https://stackoverflow.com/questions/67337050/typescript-failing-to-correctly-infer-types-from-generic-using-keyof-as-property#answer-67337548',
                text: 'Union type and callbacks 2'
            }
        ],
        tags: ['callback', 'infer'],
        date: 'April 30, 2021'
    },
    {
        url: "/publish-subscribe",
        title: "Publish subscribe pattern in TypeScript",
        description: "Type safe publish subscribe pattern",
        Comp: 'PubSub',
        links: [{
            href: 'https://stackoverflow.com/questions/65668969/event-maps-and-type-guards#answer-65890181',
            text: 'Event mapping'
        }, {
            href: 'https://stackoverflow.com/questions/70137328/mapping-a-variable-number-of-generics-while-retaining-link-between-type-values#answer-70138046',
            text: 'Event mapping 2'
        }],
        tags: ['pattern'],
        date: 'January 25, 2021'
    },
    {
        url: "/type-state",
        title: "Type state pattern in TypeScript",
        description: "Type safe handler",
        Comp: 'TypeState',
        links: [
            {
                href:
                    "https://docs.google.com/presentation/d/1po3-zRQCp8m8cwg-CF5dUL_6RPe9gIaKIT5P_DNbGE8/edit#slide=id.g6baf2c25cf_0_33",
                text: "presentation",
            },
            { href: "http://cliffle.com/blog/rust-typestate/", text: "Cliff L. Biffle's blog" },
            {
                href:
                    "https://stackoverflow.com/questions/65431379/type-property-relying-on-return-type-of-another-property",
                text: "Typing data structure with callbacks",
            },
            {
                href: 'https://stackoverflow.com/questions/65891135/how-to-define-map-with-correlation-between-a-key-type-and-a-value-type-while-th',
                text: 'Make illegal Map irrepresentable'
            },
            {
                href: 'https://stackoverflow.com/questions/65978153/typescript-mapenum-setenum-no-overload-matches-this-call-but-i-dont-get',
                text: 'Map typing'

            },
            {
                href: 'https://stackoverflow.com/questions/68676771/how-can-i-create-a-type-from-a-schema-that-describes-it/68677920#68677920',
                text: 'COmpute allowed state'
            },
            {
                href: 'https://stackoverflow.com/questions/69629691/how-to-use-typescript-generics-to-validate-object-values-correctly/69630484#69630484',
                text: 'Unions'
            }
        ],
        tags: ['pattern', 'Map', 'callback'],
        date: 'December 23, 2020'
    },
    {
        url: "/api",
        title: "Api requests in TypeScript",
        description: "Make type safe api requests with TypeScript",
        Comp: 'Api',
        links: [{
            href: 'https://stackoverflow.com/questions/65658633/how-to-determine-the-type-of-generic-in-a-class/65664455#65664455',
            text: 'Restrict using of methods by generic value'
        }],
        tags: ['pattern'],
        date: 'January 11, 2021'
    },

    {
        url: '/template-literals',
        title: 'Working with template literals in TypeScript',
        description: 'Here you can find some advanced examples with template literals',
        Comp: 'TemplateLiterals',
        links: [
            {
                href: 'https://stackoverflow.com/questions/65844206/how-to-avoid-ambiquity-in-typescript-template-literal-type-inference',
                text: 'How to avoid ambiquity in TypeScript template literal type inference?',
            }, {
                href: 'https://stackoverflow.com/questions/65899183/typescript-template-literals-convert-array-to-a-list/65899432#65899432',
                text: 'Convert array to string'
            },
            {
                href: 'https://stackoverflow.com/questions/66140451/typescript-add-kebab-case-types-form-actual-camel-case-keys#answer-66142561',
                text: 'Classic example with templates string'
            },
            {
                href: 'https://github.com/microsoft/TypeScript/pull/40336',
                text: 'TypeScript main merge request'
            },
            {
                href: 'https://stackoverflow.com/questions/68770740/typescript-dynamic-type-for-object-key-based-on-sibling-string-field/68771074#68771074',
                text: 'Compute router parameter'
            },
            {
                href: 'https://stackoverflow.com/questions/69102544/typescript-template-literals-with-inference/69103247#69103247',
                text: 'Handle keys'
            },
            {
                href: 'https://stackoverflow.com/questions/69126879/typescript-deep-keyof-of-a-nested-object-with-related-type/69129328#69129328',
                text: 'Compute object path string'
            },
            {
                href: 'https://stackoverflow.com/questions/69265186/how-to-generate-array-with-template-literal-types-items/69265799#69265799',
                text: 'Typing UNO card deck'
            },
            {
                href: 'https://stackoverflow.com/questions/69610786/proper-way-to-create-a-trim-type/69612559#69612559',
                text: 'Trim'
            }
        ],
        tags: ['template literals'],
        date: 'January 22, 2021'
    },
    {
        url: '/chain-callbacks',
        title: 'How to chain callbacks in TypeScript',
        description: 'Here you can find information about typing callbacks',
        Comp: 'CallbackChain',
        links: [
            {
                href: 'https://stackoverflow.com/questions/66096137/cant-make-typescript-generics-chain-work',
                text: 'TypeScript callback chain',
            },
            {
                href: 'https://stackoverflow.com/questions/66075326/define-an-array-with-infered-types-related-to-first-prop-in-the-array#answer-66077819',
                text: 'Tuples with callbacks'
            }
        ],
        tags: ['callback', 'union', 'tuples'],
        date: 'February 10, 2021'
    },
    {
        url: '/flatten-union',
        title: 'How to flatten union in TypeScript',
        description: 'Here you can find information about union flattening',
        Comp: 'FlattenUnion',
        links: [
            {
                href: 'https://stackoverflow.com/questions/66116836/how-to-flatten-nested-union-types-in-typescript',
                text: 'Flatten union',
            }
        ],
        tags: ['union', 'flatten'],
        date: 'February 11, 2021'
    },
    {
        url: '/permutations',
        title: 'Compute permutations in TypeScript',
        description: 'Compute permutations of enum keys and other unions',
        Comp: 'Permutations',
        links: [
            {
                href: 'https://stackoverflow.com/questions/66257786/constrain-object-keys-to-enums-values-while-not-requiring-all-keys-to-be-presen#answer-66258085',
                text: 'Use union instead of Partial',
            },
            {
                href: 'https://stackoverflow.com/questions/68252446/is-it-possible-to-generate-string-literal-combinations-with-template-literal-in#answer-68256789',
                text: 'String permutation'
            },
            {
                href: 'https://stackoverflow.com/questions/68935607/how-to-filter-union-type/68953201#68953201',
                text: 'Remove all duplications inside permutation'
            }
        ],
        tags: ['union', 'partial', 'recursion', 'tuples'],
        date: 'July 7, 2021'
    },
    {
        url: '/dates',
        title: 'Working with Dates in TypeScript',
        description: 'Type dates literal strings',
        Comp: 'Dates',
        links: [
            {
                href: 'https://stackoverflow.com/questions/66563064/how-do-i-typescript-this-object-array#answer-66564065',
                text: 'Type safe dates',
            }
        ],
        tags: ['template literals'],
        date: 'March 21, 2021'
    },
    {
        url: '/type-negation',
        title: 'Type negation in TypeScript',
        description: 'I want any type except ...',
        Comp: 'TypeNegation',
        links: [
            {
                href: 'https://stackoverflow.com/questions/66745644/generic-argument-constrained-to-be-non-array#answer-66745744',
                text: 'Generic argument constrained to be non array',
            }, {
                href: 'https://stackoverflow.com/questions/66828502/conditional-type-based-on-a-non-empty-string#answer-66835100',
                text: 'Empty string negation'
            },
            {
                href: 'https://stackoverflow.com/questions/68235338/making-arrays-of-generic-interfaces#68236225',
                text: 'Generic constraints'
            },
            {
                href: 'https://stackoverflow.com/questions/68494404/typescript-definition-how-to-constraint-differently-for-a-param-of-function-by/68496167#68496167',
                text: 'Generic constraints - 2'
            },
            {
                href: 'https://stackoverflow.com/questions/68404097/require-a-specific-item-in-a-typescript-array/68407121#68407121',
                text: 'How to negate number 7 in the array'
            },
            {
                href: 'https://stackoverflow.com/questions/68487359/how-to-dynamically-assign-properties-to-an-object-in-typescript-by-using-record/68526555#68526555',
                text: 'Object/Array negation'
            },
            {
                href: 'https://stackoverflow.com/questions/69537870/passing-property-names-to-type-properties/69543477#69543477',
                text: 'Validation of config object'
            }
        ],
        tags: ['generic', 'negation'],
        date: 'July 7, 2021'
    },
    {
        url: '/hex-validation',
        title: 'HEX Validation in TypeScript',
        description: 'Static type validator for HEX values',
        Comp: 'HexValidation',
        links: [
            {
                href: 'https://stackoverflow.com/questions/66851513/a-way-to-mark-arbitrary-strings-in-typescript-template-literals#answer-66852494',
                text: 'Template literals HEX Validator',
            }, {
                href: 'https://stackoverflow.com/questions/70531056/typescript-two-way-string-mapping/70532783#70532783',
                text: 'validation of static string'
            }
        ],
        tags: ['template literals', 'hex', 'tuples'],
        date: 'March 29, 2021'
    },
    {
        url: '/linked-list',
        title: 'Linked list in TypeScript',
        description: 'Linked List with recursive types',
        Comp: 'LinkedList',
        links: [
            {
                href: 'https://stackoverflow.com/questions/66849973/scala-snippet-to-typescript-how-to-convert-abstract-type-members',
                text: 'Linked List with recursive types in TypeScript',
            }
        ],
        tags: ['recursive', 'data structure'],
        date: 'April 26, 2021'
    },
    {
        url: '/deep-pick',
        title: 'Deep pick typings (updated) in TypeScript',
        description: 'I will try to implement smth similar to lodash.get typings',
        Comp: 'DeepPick',
        links: [
            {
                href: 'https://stackoverflow.com/questions/67242871/declare-a-type-that-allows-all-parts-of-all-levels-of-another-type#answer-67247652',
                text: 'Deep pick function ',
            },
            {
                href: 'https://stackoverflow.com/questions/68668055/eliminate-nevers-to-make-union-possible/68672512?noredirect=1#comment121362429_68672512',
                text: 'Deep pick with more comments'
            },
            {
                href: 'https://stackoverflow.com/questions/69126879/typescript-deep-keyof-of-a-nested-object-with-related-type#answer-69129328',
                text: 'Deep pick with more edge cases, tests and explanation'
            },
            {
                href: 'https://stackoverflow.com/questions/69449511/get-typescript-to-infer-tuple-parameters-types/69450150#69450150',
                text: 'Typing [at] lodash function'
            },
            {
                href: 'https://stackoverflow.com/questions/69449511/get-typescript-to-infer-tuple-parameters-types/69450150#69450150',
                text: 'Typing Lodash [at] function'
            }

        ],
        tags: ['deeppick'],
        date: 'May 28, 2021'
    },
    {
        url: '/validators',
        title: 'Type validators in TypeScript',
        description: 'How to implements several type validators in generic way',
        Comp: 'Validation',
        links: [
            {
                href: 'https://stackoverflow.com/questions/67282788/how-would-i-add-type-to-nested-object#answer-67284951',
                text: 'CSS validation',
            },
            {
                href: 'https://stackoverflow.com/questions/68359417/how-to-type-function-return-type-with-optional-object-of-formatter-function/68359977#68359977',
                text: 'Return type validation/computing'
            },
            {
                href: 'https://stackoverflow.com/questions/68308390/react-props-struggling-with-discriminating-union-types/68312955#68312955',
                text: 'React props validation'
            },
            {
                href: 'https://stackoverflow.com/questions/68207767/typescript-infer-possible-object-keys-based-on-value-of-previous-argument/68208487#68208487',
                text: 'Advanced validation of function arguments'
            },
            {
                href: 'https://stackoverflow.com/questions/68700018/how-to-reuse-rest-types-in-tuples/68700643#68700643',
                text: 'Validation of tuple rest arguments'
            },
            {
                href: 'https://stackoverflow.com/questions/68572718/typescript-how-to-have-second-argument-type-to-be-dependent-on-first-argument-v/68572792#68572792',
                text: 'How to have second argument type to be dependent on first argument value'
            },
            {
                href: 'https://stackoverflow.com/questions/68632520/what-to-do-with-typescript-function-overload-growth-with-optional-variables/68633755#68633755',
                text: 'Validate optional arguments'
            },
            {
                href: 'https://stackoverflow.com/questions/68633821/what-is-the-way-to-declare-a-method-that-apply-only-specific-type-of-key-of-obje/68633904#68633904',
                text: 'ANother one simple validation'
            },
            {
                href: 'https://stackoverflow.com/questions/68971574/how-to-type-an-arrays-values-with-typescript/68972217#68972217',
                text: 'Validation of object keys'
            },
            {
                href: 'https://stackoverflow.com/questions/68993482/x-instanceof-class-type-passed-through-parameter/68995414#68995414',
                text: 'Curring'
            },
            {
                href: 'https://stackoverflow.com/questions/69031540/generic-type-inference-from-an-specific-function-argument/69031642#69031642',
                text: 'Validation of deep nested props'
            },
            {
                href: 'https://stackoverflow.com/questions/69492421/typescript-recovering-the-object-literal-may-only-specify-known-properties-ch/69545730#69545730',
                text: 'Typing exact argument'
            },
            {
                href: 'https://stackoverflow.com/questions/69417437/typescript-is-it-possible-to-ensure-the-key-and-an-inner-value-are-the-same-str/69418019#69418019',
                text: 'Validation of literal argument'
            },
            {
                href: 'https://stackoverflow.com/questions/69594950/typescript-defining-type-of-element-in-array-based-of-the-types-of-the-previous/69596729#69596729',
                text: 'Validate every next value'
            },
            {
                href: 'https://stackoverflow.com/questions/69688023/typescript-object-set-with-unique-proeprty/69688324#69688324',
                text: 'Validate duplicates'
            },
            {
                href: 'https://stackoverflow.com/questions/69680459/soft-type-checking-function-parameters/69681910#69681910',
                text: 'Validate subtype'
            },
            {
                href: 'https://stackoverflow.com/questions/70489636/typescript-weird-behavior-on-implementation-of-union-of-types/70490540#70490540',
                text: 'Validation of tuple arguments'
            }, {
                href: 'https://stackoverflow.com/questions/72515066/an-array-of-object-with-specific-type-using-generics-with-typescript/72517827#72517827',
                text: 'Validation of each object in the array'
            }

        ],
        tags: ['type validation'],
        date: 'April 27, 2021'
    },
    {
        url: '/FP-style',
        title: 'Functional programming. Typing compose and pipe functions in TypeScript',
        description: 'TypeScript typings for compose and pipe functions',
        Comp: 'FP',
        links: [
            {
                href: 'https://stackoverflow.com/questions/65319258/how-to-type-pipe-function-using-variadic-tuple-types-in-typescript-4/68513136#68513136',
                text: 'Typing pipe function'
            },
            {
                href: 'https://stackoverflow.com/questions/65057205/typescript-reduce-an-array-of-function/67760188#67760188',
                text: 'Typing compose function'
            },
            {
                href: 'https://stackoverflow.com/questions/68800808/can-you-write-a-compose-method-that-infer-types-correctly-if-the-innermost-fun/68801798#68801798',
                text: 'Middleware composition'
            },
            {
                href: 'https://stackoverflow.com/questions/69616906/how-can-i-strongly-type-a-composed-mixin/69627763#69627763',
                text: 'Alternative pipeline'
            },
            {
                href: 'https://github.com/drizzer14/fnts',
                text: 'fnts package with interesting utility types'
            }

        ],
        tags: ['fp'],
        date: 'May 8, 2021'
    },
    {
        url: '/react-props',
        title: 'Handle Props in React in TypeScript',
        description: 'Make illegal React props unrepresentable (updated)',
        Comp: 'ReactProps',
        links: [
            {
                text: 'Validation of React props with generic parameter',
                href: 'https://stackoverflow.com/questions/68727850/typing-the-click-handler-when-component-is-generic-polymorphic-react-component/68728199#68728199'
            },
            {
                text: 'Validation of react props',
                href: 'https://stackoverflow.com/questions/68813143/pick-a-type-from-one-of-the-props/68814050#68814050'
            },
            {
                text: 'Manage weird intersection',
                href: 'https://stackoverflow.com/questions/68966710/how-to-get-concrete-type-from-mapping-variable/68967097#68967097'
            },
            {
                text: 'How to type React props as a pro in TypeScript (my article on dev.to)',
                href: 'https://dev.to/captainyossarian/how-to-type-react-props-as-a-pro-2df2'
            },
            {
                text: 'React props validation, make illegal props unrepresentable',
                href: 'https://stackoverflow.com/questions/72376248/type-specificity-in-conditional-type/72377810#72377810'
            }

        ],
        tags: ['illegal state', 'react', 'props'],
        date: 'February 11, 2022'
    },
    {
        url: '/oop-style',
        title: 'OOP typings in TypeScript',
        description: 'Typings for classes',
        Comp: 'OOP',
        links: [
            {
                href: 'https://stackoverflow.com/questions/67084764/function-return-type-that-matches-parameter-types-when-using-the-spread-operato#answer-67089413',
                text: 'Typed inheritance, mixin pattern',
            },
            {
                href: 'https://stackoverflow.com/questions/67070250/typescript-class-generic-type-is-too-narrow-if-extends-something-else-is-not#answer-67071331',
                text: 'Infer strict type to more general'
            },
            {
                href: "https://stackoverflow.com/questions/67979663/typescript-keyof-instancetypet-cannot-be-used-to-index-type-error#answer-68118171",
                text: 'Infer keyof InstanceType'
            },
            {
                href: 'https://stackoverflow.com/questions/68030997/how-can-i-create-generic-function-that-only-accepts-instances-of-a-type-with-a-s/68159603#68159603',
                text: 'Apply relation between class and instance - 1'
            },
            {
                href: 'https://stackoverflow.com/questions/67979663/typescript-keyof-instancetypet-cannot-be-used-to-index-type-error/68118171#68118171',
                text: 'Apply relation between class and instance - 2'
            },
            {
                href: 'https://stackoverflow.com/questions/68598554/typescript-type-of-function-with-automatic-return-type-by-extends-generic/68602727#68602727',
                text: 'Infer class instance'
            },
            {
                href: 'https://stackoverflow.com/questions/68734403/infer-type-when-extending-generic-class/68737746#68737746',
                text: 'Infer generic from inherited class'
            },
            {
                href: 'https://stackoverflow.com/questions/68934894/cast-empty-parameter-to-void/68935321#68935321',
                text: 'Overloading of static class method'
            },
            {
                href: 'https://stackoverflow.com/questions/69141075/generic-typing-for-factory-function#answer-69141469',
                text: 'Trick with rest parameters'
            },
            {
                href: 'https://stackoverflow.com/questions/69584444/how-to-write-a-generic-function-that-calls-a-method-of-an-object/69584551#69584551',
                text: 'Validate argument'
            }
        ],
        tags: ['oop', 'inheritance'],
        date: 'June 24, 2021'
    },
    {
        url: '/mutations',
        title: 'Mutations in typescript',
        description: 'TypeScript is more about immutability',
        Comp: 'Mutations',
        links: [
            {
                href: 'https://stackoverflow.com/questions/67857960/how-to-selectively-assign-from-one-partial-to-another-in-typescript/67860407#67860407',
                text: 'First example'
            },
            {
                href: 'https://stackoverflow.com/questions/67834191/why-can-i-index-by-string-to-get-a-property-value-but-not-to-set-it/67836124#67836124',
                text: 'Second exmaple'
            },
            {
                href: 'https://stackoverflow.com/questions/68189542/typescript-why-cant-i-assign-a-valid-field-of-an-object-with-type-a-a-b/68190097#68190097',
                text: 'Third example'
            },
            {
                href: 'https://stackoverflow.com/questions/67660342/why-does-typescript-say-this-variable-is-referenced-directly-or-indirectly-in-i',
                text: 'TS mutations'
            },
            {
                href: 'https://github.com/microsoft/TypeScript/pull/30769',
                text: 'Official explanation'
            },
            {
                href: 'https://stackoverflow.com/questions/68576735/keyof-and-react-redux-action/68578198#68578198',
                text: 'Working with redux toolkit'
            },
            {
                href: 'https://stackoverflow.com/questions/68521780/cannot-dynamically-set-interface-objects-property-values/68526031#68526031',
                text: 'Classic mutation'
            },
            {
                href: 'https://stackoverflow.com/questions/68576735/keyof-and-react-redux-action/68578198#68578198',
                text: 'Another one mutation'
            },
            {
                href: 'https://stackoverflow.com/questions/68617333/how-to-achieve-a-generic-like-this/68617990#68617990',
                text: 'Workaround'
            },
            {
                href: 'https://stackoverflow.com/questions/68645349/type-extractkeyof-t-string-cannot-be-used-to-index-type-this/68647726#68647726',
                text: 'Mutations'
            },
            {
                href: 'https://stackoverflow.com/questions/68773327/assigning-properties-in-an-object-by-iterating-through-its-keys/68773501#68773501',
                text: 'Mutation 2'
            },
            {
                href: 'https://stackoverflow.com/questions/68788537/convert-object-entries-reduce-to-generics-type/68790139#68790139',
                text: 'Mutation inside reduce'
            }
        ],
        tags: ['fp', 'mutations'],
        date: 'June 30, 2021'
    },
    {
        url: '/currying-components',
        title: 'Currying React components in TypeScript',
        description: 'React: functional approach',
        Comp: 'CurryingComponents',
        links: [
            {
                href: 'https://stackoverflow.com/questions/68397897/typing-a-react-component-factory-function/68433032#68433032',
                text: 'React Component Factory Function'
            },
            {
                href: 'https://stackoverflow.com/questions/68278567/react-ts-generic-component-to-pass-generic-props-to-children/#68442669',
                text: 'Children components constrained by generic'
            },

        ],
        tags: ['fp', 'curry', 'react'],
        date: 'July 20, 2021'
    },
    {
        url: '/infer-arguments',
        title: 'Typescript: Type Inference on function arguments (huge update)',
        description: 'Infer deep nested function arguments',
        Comp: 'InferFunctionArguments',
        links: [{
            href: 'https://stackoverflow.com/questions/68503907/typescript-generic-message-factory/68504003#68504003',
            text: 'Infer generic type with parameters'
        }, {
            href: 'https://stackoverflow.com/questions/68451909/typescript-create-combined-type-from-array-items-generic-types/68452079#68452079',
            text: 'Infer class instances'
        },
        {
            href: 'https://stackoverflow.com/questions/68506919/typescript-instantiation-type-definition/68510416#68510416',
            text: 'Infer class instances - 2'
        },
        {
            href: 'https://stackoverflow.com/questions/68391632/infer-type-from-array-literal/68392353#68392353',
            text: 'Infer and convert literal array to object '
        },
        {
            href: 'https://stackoverflow.com/questions/68557486/type-x-string-ts-is-not-assignable-to-type-partialt/68557852#68557852',
            text: 'Simple infer'
        },
        {
            href: 'https://stackoverflow.com/questions/68601472/type-for-a-function-receiving-array-of-string-and-returning-a-record-with-a-key/68602130#68602130',
            text: 'Infer with recursive iteration'
        },
        {
            href: 'https://stackoverflow.com/questions/68619999/in-typescript-is-there-a-way-to-declare-literal-type-other-than-giving-as-cons/68624247#68624247',
            text: 'Infer return type'
        },
        {
            href: 'https://stackoverflow.com/questions/68669744/infer-types-using-own-properties/68670399#68670399',
            text: 'Infer arguments of nested method'
        },
        {
            href: 'https://stackoverflow.com/questions/68678615/inferring-parameter-list-of-function/68679065#68679065',
            text: 'Infer variadic tuple types'
        },
        {
            href: 'https://stackoverflow.com/questions/68699646/typescript-strong-typing-and-autocomplete-for-a-value-based-on-a-sibling-obje/68700044#68700044',
            text: 'Infer nested props of argument'
        },
        {
            href: 'https://stackoverflow.com/questions/69130587/avoid-silly-inference-for-union-types-element-implicitly-has-an-any-type-bec/69130873#69130873',
            text: 'Curry inference'
        },
        {
            href: 'https://stackoverflow.com/questions/69176666/implementing-a-modular-system-with-typescript/69177072#69177072',
            text: 'Curry inference 2'
        },
        {
            href: 'https://stackoverflow.com/questions/69201083/is-there-a-better-way-to-tell-typescript-which-type-data-is/69204051?noredirect=1#comment122329355_69204051',
            text: 'Reducer inference with curry'
        },
        {
            href: 'https://stackoverflow.com/questions/63708358/typescript-narrowing-tk-in-a-function-when-multiple-key-values-are-passed-in/63710980#63710980',
            text: 'Inference of multiple keys'
        },
        {
            href: 'https://stackoverflow.com/questions/69529837/typescript-generic-union-resolution-order/69530251#69530251',
            text: 'Simple validation with inference'

        },
        {
            href: 'https://stackoverflow.com/questions/69578873/typescript-generic-over-mapk-v-value-type/69582397#69582397',
            text: 'Infer each key and value of a Map which'
        },
        {
            href: 'https://stackoverflow.com/questions/69643202/how-to-use-typescript-generics-to-correctly-map-between-keys-and-values-with-ind/69647430#69647430',
            text: 'Vue helpers inference'
        },
        {
            href: 'https://stackoverflow.com/questions/69629222/typescript-does-not-understand-that-record-types-must-return-the-correct-type/69629742#69629742',
            text: 'Strategy pattern'
        },
        {
            href: 'https://stackoverflow.com/questions/69626029/typescript-generic-type-for-nested-object-properties/69626987#69626987',
            text: 'Infer deep nested react object'
        },
        {
            href: 'https://stackoverflow.com/questions/69605677/typescript-adding-dynamic-fields-to-a-class-at-runtime-with-type-safety/69606143#69606143',
            text: 'OOP and mutation tracking with help of assert'
        },
        {
            href: 'https://stackoverflow.com/questions/69596738/types-object-base-on-arras-of-another-object/69597100#69597100',
            text: 'Infer key/value'
        },
        {
            href: 'https://stackoverflow.com/questions/70680599/get-nested-type-with-generics/70680940#70680940',
            text: 'Infer method name in class constructor'
        },
        {
            href: 'https://stackoverflow.com/questions/72540476/use-values-of-a-certain-key-in-an-array-of-object-as-keys/72541615#72541615',
            text: 'Column/Row function arguments inference'
        }

        ],
        tags: ['infer'],
        date: 'September 18, 2021'
    },
    {
        url: '/prototype-typing',
        title: 'Typing the inheritance chain',
        description: 'Recursive typing of inheritance',
        Comp: 'PrototypeTyping',
        links: [
            {
                href: 'https://stackoverflow.com/questions/68726766/typescript-make-properties-allowed-on-object-depend-on-values-in-other-property',
                text: 'Typing the inheritance chain'
            }
        ],
        tags: ['recursive'],
        date: 'August 31, 2021'
    },
    {
        url: '/safer-types',
        title: 'Safer TypeScript',
        description: 'Some tips and tricks about safer types',
        Comp: 'SaferTypes',
        links: [
            {
                href: 'https://stackoverflow.com/questions/68601578/return-generic-type-of-type-alias/68601916#68601916',
                text: 'Difference between interface and type'
            }

        ],
        tags: ['safe types'],
        date: 'September 2, 2021'
    }, {
        url: '/even-length',
        title: 'Define a recursive array of even length in TypeScript',
        description: 'Define a union of tuples with even length',
        Comp: 'EvenLength',
        links: [
            {
                href: 'https://stackoverflow.com/questions/68370968/define-a-recursive-array-of-even-length-in-typescript#answer-68373774',
                text: 'Define a recursive array of even length in TypeScript'
            },
            {
                href: 'https://stackoverflow.com/questions/69085069/repeat-multiple-function-arguments/69087323#69087323',
                text: 'Function with even length of arguments'
            },
            {
                href: 'https://stackoverflow.com/questions/70718896/how-do-i-define-a-typescript-type-with-a-repeating-structure#answer-70720063',
                text: 'Define recursive pattern for string'
            }

        ],
        tags: ['recursive', 'tuples'],
        date: 'September 4, 2021'
    },
    {
        url: '/flatten',
        title: 'How to flatten a tuple type in TypeScript?',
        description: 'Flat literal deep nested tuple',
        Comp: 'FlattenTuple',
        links: [
            {
                href: 'https://stackoverflow.com/questions/69127304/typescript-interface-for-array-of-anything-but-other-arrays/69128887#69128887',
                text: 'Flat deep nested tuple'
            },
            {
                href: 'https://stackoverflow.com/questions/69537599/types-for-recursive-array-map-in-typescript/69538044#69538044',
                text: 'Recursive iteration through array'
            }
        ],
        tags: ['recursive', 'tuples'],
        date: 'September 12, 2021'
    },
    {
        url: '/safe-enums',
        title: 'Make enums safe again (updated)',
        description: 'You will learn how to make numerical enum safe again',
        Comp: 'SafeEnum',
        links: [
            {
                href: 'https://stackoverflow.com/questions/62268023/how-to-type-function-taking-an-enum#answer-69465829',
                text: 'Make safer enum'
            },
            {
                href: 'https://stackoverflow.com/questions/70591789/enum-typescript-return-specific-value/70592714#70592714',
                text: 'Make safer enum 2'
            },
            {
                href: 'https://stackoverflow.com/questions/70591789/enum-typescript-return-specific-value#answer-70592714',
                text: 'Infer enum value by key'
            }
        ],
        tags: ['enums', 'tuples'],
        date: 'January 11, 2022'
    },
    {
        url: '/rest-tuples',
        title: 'Rest operator in tuples (updated)',
        description: 'Use rest operator one after another in tuple type representation',
        Comp: 'RestTuples',
        links: [
            {
                href: 'https://stackoverflow.com/questions/68700018/how-to-reuse-rest-types-in-tuples/68700643#68700643',
                text: 'How to reuse rest types in tuples?'
            },
            {
                href: 'https://stackoverflow.com/questions/69594950/typescript-defining-type-of-element-in-array-based-of-the-types-of-the-previous/69596729#69596729',
                text: 'Each type is a subtype of previous in the tuple'
            }, {
                href: 'https://stackoverflow.com/questions/69901253/defining-an-array-type-with-matching-pairs-like-domino-bricks-in-typscript/69902043#69902043',
                text: 'Domino validation'
            }, {
                href: 'https://stackoverflow.com/questions/61155425/how-to-define-array-with-alternating-types-in-typescript/69800688#69800688',
                text: 'Typing repeated pattern'
            },
            {
                href: 'https://stackoverflow.com/questions/70489636/typescript-weird-behavior-on-implementation-of-union-of-types#answer-70490540',
                text: 'tuple validation for duplicates'
            }
        ],
        tags: ['tuples'],
        date: 'October 20, 2021'
    },
    {
        url: '/recursive-ds',
        title: 'Recursive data structure',
        description: 'How to put a limit on recursive data structure ?',
        Comp: 'RecursiveDataStructures',
        links: [
            {
                href: 'https://stackoverflow.com/questions/69990263/a-recursive-interface-for-a-react-typescript-component/69992036#69992036',
                text: 'Typing of recursive data structure'
            }, {
                href: 'https://stackoverflow.com/questions/69781314/typescript-in-recursive-type-extra-props-allowed-to-be-assigned-in-object-decl/69808994#69808994',
                text: 'Recursive type'
            },
            {
                href: 'https://stackoverflow.com/questions/72533295/how-can-i-define-a-type-with-a-generic-type-in-parent-child-structure/72535525#72535525',
                text: 'Recursive DT with children'
            },
            {
                href: 'https://stackoverflow.com/questions/72517907/type-vs-interface-for-a-nested-array-which-to-use/72518139#72518139',
                text: 'Recursive array of arrays'
            }

        ],
        tags: ['tuples'],
        date: 'November 17, 2021'
    },
    {
        url: '/email-validation',
        title: 'Validation of static email string',
        description: 'In this article you will learn how to validate template literal type of email string',
        Comp: 'EmailValidation',
        links: [
            {
                href: 'https://stackoverflow.com/questions/70203643/prevent-creation-of-type-alias-instance',
                text: 'Static email validation'
            },

        ],
        tags: ['template literal type'],
        date: 'December 13, 2021'
    },
    {
        url: '/generic-resolving',
        title: 'Resolving generics in TypeScript',
        description: 'In this article you will learn TypeScript resolves generics',
        Comp: 'GenericResolving',
        links: [
            {
                href: 'https://stackoverflow.com/questions/70332961/typescript-factory-with-custom-methods',
                text: 'Resolving generics - part 1'
            },
            {
                href: 'https://stackoverflow.com/questions/70360843/typescript-factory-with-custom-methods-2nd-step',
                text: 'Resolving generics - part 2'
            },
            {
                href: 'https://stackoverflow.com/questions/70453358/typescript-factory-with-custom-methods-3rd-step',
                text: 'Resolving generics - part 3'
            },
            {
                href: 'https://stackoverflow.com/questions/70154354/higher-order-function-how-to-deduct-injected-type-from-model-without-casting#answer-70282196',
                text: 'Infering arguments type of curried function'
            },
            {
                href: 'https://stackoverflow.com/questions/70152059/how-to-type-tuple-array-with-corresponding-types',
                text: 'Map constraints'
            }

        ],
        tags: ['generics'],
        date: 'December 26, 2021'
    },
    {
        url: '/useful-patterns',
        title: 'Useful TypeScript patterns',
        description: 'Here you can find some useful patterns in TS which will save your time',
        Comp: 'UsefulPatterns',
        links: [
            {
                href: 'https://stackoverflow.com/questions/70885329/generic-constraint-between-two-properties-of-an-object',
                text: 'Builder utility',
            },
            {
                href: 'https://github.com/microsoft/TypeScript/pull/47607',
                text: 'Instantiation expressions PR'
            }

        ],
        tags: ['generics'],
        date: 'February 9, 2022'
    },
    {
        url: '/path-manipulations',
        title: 'Key path manipulations and functional patterns',
        description: 'You will find how to invert key path and several functional patterns in React',
        Comp: 'PathManipulations',
        links: [
            {
                text: 'Invert key path',
                href: 'https://stackoverflow.com/questions/71200802/typescript-how-to-create-a-type-getting-all-nested-object-key#answer-71203797'
            }


        ],
        tags: ['recursion', 'react', 'fp',],
        date: 'February 21, 2022'
    },
    {
        url: '/Ukraine',
        title: 'Want to help Ukraine?',
        description: 'Ukraine',
        Comp: 'Ukraine',
        links: [],
        tags: [],
        date: 'February 24, 2022'
    },


].map((elem, index) => ({ ...elem, type: 'article', id: index + 1 }))

/**
 * Decorators
 * https://stackoverflow.com/questions/68648140/type-safe-decorator-for-private-method-in-typescript/68665107#68665107
 */

/**
 * COntravariant
 * https://stackoverflow.com/questions/68692740/typescript-intersection-reduced-to-never-because-property-length-has-conflic/68693586#68693586
 * https://stackoverflow.com/questions/68711007/why-type-recordstring-unknown-does-not-accept-object-with-defined-keys-as-va/68711655#68711655
 * https://stackoverflow.com/questions/68979763/typescript-generics-strange-behavior/68981420#68981420
 * https://stackoverflow.com/questions/69087743/conditional-type-infers-type-that-is-too-wide-when-using-intersection-types/69088618#69088618
 * https://stackoverflow.com/questions/69173641/how-to-type-a-method-with-an-interface-as-parameter/69175495#69175495
 */

/**
 * Validation of tuples
 * https://stackoverflow.com/questions/68700018/how-to-reuse-rest-types-in-tuples/68700643#68700643
 */

/**
 * DUplication in permutation
 * https://stackoverflow.com/questions/68935607/how-to-filter-union-type/68953201#68953201
 */

/**
 * Allow only lowerCase
 * https://stackoverflow.com/questions/68963491/define-a-typescript-type-that-takes-a-lowercase-word/68963571#68963571
 * https://stackoverflow.com/questions/69042390/typescript-allow-only-uppercase-keys-in-object/69042604#69042604
 */

/**
 * Vue types
 * https://stackoverflow.com/questions/68995690/correctly-typing-a-vuex-getters-getters-parameter/68996232#68996232
 * https://stackoverflow.com/questions/69029774/nuxt-with-typescript-it-seems-vue-extend-does-not-support-injected-data/69030092#69030092
 * https://stackoverflow.com/questions/69643202/how-to-use-typescript-generics-to-correctly-map-between-keys-and-values-with-ind/69647430#69647430
 */

/**
 * Tail recursion optimization
 * https://github.com/microsoft/TypeScript/pull/45711
 *
 * Questions:
 * https://stackoverflow.com/questions/68370968/define-a-recursive-array-of-even-length-in-typescript
 * https://stackoverflow.com/questions/68724603/how-to-create-a-uuid-template-literal-type-in-typescript/68724963#68724963
 * https://stackoverflow.com/questions/69127304/typescript-interface-for-array-of-anything-but-other-arrays/69128887#69128887
 */

/**
 * Mix
 * https://stackoverflow.com/questions/69208337/typescript-how-to-give-naming-rules-to-a-dynamic-keyproperty/69208839#69208839
 */

/**
 * Extends is not equal
 * https://stackoverflow.com/questions/69190069/typescript-utilities-record-and-partial-dont-work-with-a-constrained-generi/69205810#69205810
 * https://stackoverflow.com/questions/69187022/why-cant-the-generic-interface-in-ts-infer-the-type-correctly/69188596#69188596
 */


/**
 * React
 * https://stackoverflow.com/questions/69119542/creating-react-element-dynamically-in-typescript/69121051#69121051
 * https://stackoverflow.com/questions/68064397/derived-generic-class-cannot-be-assigned-to-base-generic-class-in-typescript/68065054#68065054
 * https://stackoverflow.com/questions/65625179/react-styled-components-and-typescript-how-to-wrap-a-styled-component-in-a-fun/69143842#69143842

https://stackoverflow.com/questions/67383159/correctly-typing-prop-injection/67384743#67384743

https://stackoverflow.com/questions/68813143/pick-a-type-from-one-of-the-props/68814050#68814050

https://stackoverflow.com/questions/65201089/mapping-an-array-of-data-to-specific-react-components-based-on-a-type-field-in-t/65205649#65205649

https://stackoverflow.com/questions/68456118/how-to-properly-declare-type-for-react-wrapper-component-hoc-using-typescript/68456381#68456381

https://stackoverflow.com/questions/68702969/how-do-i-get-type-checking-to-work-with-react-forwardref/68708743#68708743

https://stackoverflow.com/questions/66382731/how-to-use-2-types-of-events-in-typescript-interface/66383179#66383179

https://stackoverflow.com/questions/65625179/react-styled-components-and-typescript-how-to-wrap-a-styled-component-in-a-fun/65625827#65625827

https://stackoverflow.com/questions/65447359/using-typescript-with-react-hoc-react-lazy-and-forwarref/65451150#65451150

https://stackoverflow.com/questions/67413371/how-to-correctly-type-a-generic-react-function-component-in-typescript/67413938#67413938

https://stackoverflow.com/questions/65414467/how-can-i-set-the-props-type-in-hoc-in-react-typescript/65416381#65416381

https://stackoverflow.com/questions/68067622/forwardref-type-based-on-props/68070078#68070078

https://stackoverflow.com/questions/57750777/generics-error-with-forwardref-property-ref-does-not-exist-on-type-intrinsic
 */

//https://stackoverflow.com/questions/69129519/how-to-write-a-type-for-array-for-multiple-discriminating-unions

//COnditional return statement https://github.com/microsoft/TypeScript/issues/24929

// TO WRITE
// IS UNIQUE SYMBOL https://stackoverflow.com/questions/69244389/force-generic-type-to-be-the-type-of-a-unique-symbol-in-typescript/69244820#69244820
// https://stackoverflow.com/questions/68700018/how-to-reuse-rest-types-in-tuples/68700643#68700643
// mutation track
// https://stackoverflow.com/questions/69605677/typescript-adding-dynamic-fields-to-a-class-at-runtime-with-type-safety/69606143#69606143

// June 2022
// https://stackoverflow.com/questions/72528815/why-typescript-tuples-allow-array-push-method/72530855#72530855