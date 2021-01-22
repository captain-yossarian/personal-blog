// https://stackoverflow.com/questions/65844206/how-to-avoid-ambiquity-in-typescript-template-literal-type-inference

import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Anchor } from "../Shared/Links";

const code1 = `
// // To avoid recursion as much as possible
type Spaces = (
  | "     "
  | "    "
  | "   "
  | "  "
  | " "
);
 type Whitespace = Spaces | "\n" | "\t";


type EndOfInput = '';

// Validates given \`UnprocessedInput\` input string
// It recursively iterates through each character in the string,
// and appends characters into the second type parameter \`Current\` until the
// token has been consumed. When the token is fully consumed, it is added to 
// \`Result\` and \`Current\` memory is cleared.
//
// NOTE: Do not pass anything else than the first type parameter. Other type
//       parameters are for internal tracking during recursive loop
//
// See https://github.com/microsoft/TypeScript/pull/40336 for more template literal
// examples.
type Split<UnprocessedInput extends string, Current extends string = '', 
  Result extends string[] = []> =
  // Have we reached to the end of the input string ?
  UnprocessedInput extends EndOfInput
    // Yes. Is the \`Current\` empty?
    ? Current extends EndOfInput
      // Yes, we're at the end of processing and no need to add new items to result
      ? Result
      // No, add the last item to results, and return result
      : [...Result, Current]
    // No, use template literal inference to get first char, and the rest of the string
    : UnprocessedInput extends \`${"${infer Head}${infer Rest}"}\`
      // Is the next character whitespace?
      ? Head extends Whitespace
        // No, and is the \`Current\` empty?
        ? Current extends EndOfInput
          // Yes, continue "eating" whitespace
          ? Split<Rest, Current, Result>
          // No, it means we went from a token to whitespace, meaning the token
          // is fully parsed and can be added to the result
          : Split<Rest, '', [...Result, Current]>
        // No, add the character to Current 
        : Split<Rest, \`${"${Current}${Head}"}\`, Result>
      // This shouldn't happen since UnprocessedInput is restricted with
      // \`extends string\` type narrowing.
      // For example ValidCssClassName<null> would be a \`never\` type if it didn't
      // already fail to "Type 'null' does not satisfy the constraint 'string'"
      : [never] 


type Result5 = Split<${`
\`a   


b 

c\`
`}> // ["a", "b", "c"]
`;
const TemplateLiterals: FC = () => (
  <>
    <p>
      <Anchor
        href="https://stackoverflow.com/questions/65844206/how-to-avoid-ambiquity-in-typescript-template-literal-type-inference"
        text="Here"
      />
      I have found really interesting question and no less interesting answer.
      Let's say you have next literal string type <Var>'a b c'</Var>, with
      spaces, and you want to split it into array.
      <Code code={code1} />
      P.S. Please refer to
      <Anchor
        href="https://www.typescriptlang.org/play?#code/PTAEBUHtQQwN0gSwCagE4FMDGBXNBnRSAO1n1AFscsALM0AB0n0ICMAbDAKABcBPBhlABlBjCwZyAXlAAKLqFAAfUACJFG1QuVqNa7SvWKtiw8YO6tASgDcvAUIDqNRD0liJoGaPGSdqgB1idUMAnlU7fkFQADUYdhQAYXYYFi9QAHIYAFosFJYMnQzWXPz8QpUMrFLU8rsuLhBQAFUeRAT+UCihHmgGNEg4FCFiRAk0UAw0AYmKSXwYAHNJe2iAUWmAHgBZeaWhDAAPN2JkcnweNERiRYA+dIADDZmALlAAEgBvXZZ9gF8HvVuhArhQ1qdNuBJscMKdzpdrnd0vJFFCjiczqAHl9rgAzKagABKkh4fy+zlc7l8AO0AH4QYgwRDiRdbto3uAuLZVkJwKDhDwYGgeJDoRj4VcbvcZCiIGLYZjsZ8KW58B4MGTPniCSzSQ86QyKAKhSLdWzFByuZEHIbReiFRLEdLDeDkJD+YLhZDbrd6jyRAwOgARDCsHCLACMdphcNAF0lSKk2jRMcVXziCWQyVqmpVVIkmu1E3AMHaNMU9IA2hmkmUADSgPNq3wNkvtAC67NAxAwcCmDSa4BoQkWaBgFAoQtAiHIxEgPFgFFYiEWOEgOHIMGIfAokEwAEJGmBq-Fa7UG031Q3VCU8rVQNU7yxVJ3gSycOweBH0qJg6Hw1Gqg5E+5C3mUD41M+bINMCv6uCGYaLAATNG4pxgiUpeMm8qxkqRagAAEhgMCoPasY1lm4H0vhREkaAbw9n2aC5i4qrqoWxD4sWpbsOWoBVrRyAXqx+YYK2PGdha3a9v2R4iG07DsKAABWG4LiembZiwwmUs2EjXmB96PmUL7+u+n5IT+gbwf+kabEBkGgY5EEgao0H+nBPAIeGADMqEOuhCbSthZFpp8FFafgLG6exOKcQSba8fqej0imaF4fFEyCdFbHUl8iUAqA2gpaAlaCTpuX6RAEnFRoDEyWgtX1UxA5gAAcpAADuoCdSMXVdMOoC4ogBALnAp6oL0ADWsKwFNMAPuBxDjhgh5NJWDmuRVokGc5xm1KZb6SB+PA+VZf6IX5m3gYZaT7VBDRySGu7EPGMBtDcPWuHQKRoMsi7rsQC6QLii33stcz4HJABCmAwFN5C9GovTQFgkAUIGRygDgowkF0DjqJ132gEhAAMU1g2kEMrMCQYrq46QZKTFSZBGLMZEh7M+ezAAs7MAKzswAbOzADs7MABzswAnBk1rRBFZQRqTKuPCB2RfHTiyuJqWs65r9N6kCNqeVAiu1JI-mxvGTrna4ZsTZFkgAJLED2aDuoy3q+h51k8A7mllC7btTFbmI25hSaojhYXmywysqzlokcVx1VlslGipTH5AZan2XkiJekavlPGFbVFa2oJ9yheQcf4AnpPl3o-GlXyXtVw2AB03em5AdfB+7nsUJCPE+pJzd6G8lbPJsDwZF82WFDO3bzrAoDjZmlP4A8tzj5P0ktfvaUBbnCWlxnJWJdnsSO0rKuNxPFeVole-N1PM9zyXZZL7Oq8LRvKAt471flJSsjEpjtnqOtVQ6sVYRlUNeWBpMkIILUEgnyqCYFlGyCrHmmCkGk0OjacyPAeZ239n3W+Ft8CzwaHoJB34kGWW0OgpuSCyEELoVidyQA"
        text="playground"
      />
      <p>
        If you are interested in template literal types, you can check other my
        article: <Anchor href="/range-numbers" text="range numbers" />
      </p>
    </p>
  </>
);

export default TemplateLiterals;
