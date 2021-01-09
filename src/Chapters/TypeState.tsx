import React, { FC } from "react";
import Code from "../Shared/Code";
import { Var } from "../Layout";

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
  <>
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

export default TypeState;
