
export const sections = [
    {
        url: "/about",
        title: 'About',
        description: 'About section',
        Comp: 'About',
        links: [
            ,
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
                text:'A collection of awesome TypeScript resources for client-side and server-side development.'
            },
            {
                text:'Vlad Rișcuția \'s blog',
                href:'https://vladris.com/'
            }
        ],
        id: -1,
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

export const blogArticles = [
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
            }
        ],
        tags: ['number', 'bigint', 'math'],
        date: 'December 13, 2020'
    },
    {
        url: "/typed-react-children",
        title: "Type React component children in TypeScript",
        description:
            "Let's assume you want to create component which will accept array of children components with certain props.",
        Comp: 'ReactChildren',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/64967447/adding-required-props-to-child-react-elements-with-typescript",
                text: "Adding required props to child react elements",
            },
            {
                href: 'https://stackoverflow.com/questions/68398560/typescript-type-for-react-functioncomponent-that-returns-exactly-one-intrinsicel/68399995#68399995',
                text: 'Infer JSX'
            }
        ],
        tags: ['react', 'children'],
        date: 'November 23, 2020'
    },
    {
        url: "/react-return-type",
        title: "Type React component return type in TypeScript",
        description:
            "What if you need to make sure that some component will always return other component with some particular props",
        Comp: 'ReactReturnType',
        links: [
            {
                href:
                    "https://stackoverflow.com/questions/65406516/react-typescript-difference-between-react-fc-t-and-function",
                text: "DIff between typed function component and untyped",
            },
        ],
        tags: ['ReturnType', 'react'],
        date: 'December 22, 2020'
    },
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
                    "https://stackoverflow.com/questions/65307438/how-to-define-properties-in-a-typescript-interface-with-dynamic-elements-in-the",
                text: "Make number range",
            },
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
                text:'Deep pick with more comments'
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
                text:'Validation of tuple rest arguments'
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
            }

        ],
        tags: ['fp'],
        date: 'May 8, 2021'
    },
    {
        url: '/react-props',
        title: 'Handle Props in React in TypeScript',
        description: 'Make illegal React props unrepresentable',
        Comp: 'ReactProps',
        links: [

        ],
        tags: ['illegal state', 'react', 'props'],
        date: 'June 19, 2021'
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
        title: 'Typescript: Type Inference on function arguments',
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
        }


        ],
        tags: ['infer'],
        date: 'July 24, 2021'
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
      
        ],
        tags: ['safe types'],
        date: 'September 2, 2021'
    },

].map((elem, index) => ({ ...elem, type: 'article', id: index + 1 }))
