There is a common pattern for typing return value of component:

```typescript
type Props = {
  label: string;
  name: string;
};

const Result: FC<Props> = (prop: Props): JSX.Element => <One label={"hello"} />;

type ComponentReturnType = ReturnType<typeof Result>; // React.ReactElement<any, any> | null
```

Is it correct ? - Yes.
Is it helpful ? - Not really.
What if you need to make sure that Result component will always return component with some particular props.
For example I'm interested in `{label:string}` property.

```typescript
type Props = {
  label: string;
};
type CustomReturn = React.ReactElement<Props>;

const MainButton: FC<Props> = (prop: Props): CustomReturn => <Two />;
```

Unfortunately, there is no error. This code compiles.
Native React syntax comes to help!

```typescript
const Two: React.FC = () => <div></div>;

type Props = {
  label: string;
};
type CustomReturn = React.ReactElement<Props>;

const MainButton: FC<Props> = (prop: Props): CustomReturn =>
  React.createElement(Two); // Error
```

Finally, we have an error:

```
Type 'FunctionComponentElement<{}>' is not assignable to type 'CustomReturn'. Types of property 'props' are incompatible.
Property 'label' is missing in type '{}' but required in type '{ label: string; }'.ts(2322)
```

This code works as expected:

```typescript
type Props = {
  label: string;
};
type CustomReturn = React.ReactElement<Props>;

const One: React.VFC<{ label: string }> = ({ label }) => <div>{label} </div>;

const MainButton: FC<Props> = (props: Props): CustomReturn =>
  React.createElement(One, props);
```

Btw, small reminder, how to use generics with React components:

```typescript
import React from "react";

type Props<D, S> = {
  data: D;
  selector: (data: D) => S;
  render: (data: S) => any;
};

const Comp = <D, S>(props: Props<D, S>) => null;

const result = (
  <Comp<number, string>
    data={2}
    selector={(data: number) => "fg"}
    render={(data: string) => 42}
  />
); // ok

const result2 = (
  <Comp<number, string>
    data={2}
    selector={(data: string) => "fg"}
    render={(data: string) => 42}
  />
); // expected error

const result3 = (
  <Comp<number, string>
    data={2}
    selector={(data: number) => "fg"}
    render={(data: number) => 42}
  />
); // expected error
```
