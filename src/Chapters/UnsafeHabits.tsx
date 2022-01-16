import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";
import { Header, HeaderNav } from "../Shared/ArticleBase";

const code1 = `
`

const navigation = {
  computed_props: {
    id: "computed_props",
    text: "Computed props",
  },
  second_approach: {
    id: "second_approach",
    text: "Second approach",
  },
} as const;
const links = Object.values(navigation);

const UnsafeHabbits: FC = () => (
  <>
    <HeaderNav links={links} />
    <Header {...navigation.computed_props} />
    <p>
      Next pattern called - typestate. You can find in links section, different
      implementations
    </p>
    <p>See next example:</p>
    <Code code={code1} />
    <p>
      Now you are unable to call <Var>disable</Var> if connection is already
      disabled
    </p>
    <p>
      The main goal here - is to make illegal states unrepresentable. This is
      always my first goal, when I'm trying to type smth.
    </p>
  </>
);

export default UnsafeHabbits;
