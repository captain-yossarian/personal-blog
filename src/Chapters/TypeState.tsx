import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout, Var } from "../Shared/Layout";
import Links from "../Shared/Links";

const links = [
  "https://docs.google.com/presentation/d/1po3-zRQCp8m8cwg-CF5dUL_6RPe9gIaKIT5P_DNbGE8/edit#slide=id.g6baf2c25cf_0_33",
  "http://cliffle.com/blog/rust-typestate/",
  "https://stackoverflow.com/questions/65431379/type-property-relying-on-return-type-of-another-property/65433418#65433418",
];

const code1 = `
interface Active {
  active: true;
  disable(): Disabled;
}

interface Disabled {
  active: false;
  activate(): Active;
}

class ConnectionActive<T> implements Active {
  active: true;
  data: T;
  constructor(data: T) {
    this.data = data;
  }

  disable = () => new ConnectionDisabled<T>(this.data);
}

class ConnectionDisabled<T> implements Disabled {
  active: false;
  data: T;
  constructor(data: T) {
    this.data = data;
  }

  activate = () => new ConnectionActive<T>(this.data);
}

const socket = { foo: 42 };

const result = new ConnectionDisabled(socket);
`;

const TypeState: FC = () => (
  <Layout title="Type state pattern">
    <Links links={links} />
    <p>
      Next patter called - typestate. You can find in links section, different
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
  </Layout>
);

export default TypeState;
