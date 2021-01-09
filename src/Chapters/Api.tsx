import React, { FC } from "react";
import Code from "../Shared/Code";
import { Layout, Var } from "../Layout";

const code1 = `
const enum Endpoints {
  /**
   * Have only GET and POST
   */
  users = "/api/users",
  /**
   * Have only POST and DELETE
   */
  notes = "/api/notes",
  /**
   * Have only GET
   */
  entitlements = "/api/entitlements",
}
`;

const code2 = `
interface HandleUsers {
  get<T>(url: Endpoints.users): Promise<T>;
  post(url: Endpoints.users): Promise<Response>;
}

interface HandleNotes {
  post(url: Endpoints.notes): Promise<Response>;
  delete(url: Endpoints.notes): Promise<Response>;
}

interface HandleEntitlements {
  get<T>(url: Endpoints.entitlements): Promise<T>;
}
`;
const code3 = `
class Api {
  get = <T = void>(url: Endpoints): Promise<T> =>
    fetch(url).then((response) => response.json());
  post = (url: Endpoints) => fetch(url, { method: "POST" });
  delete = (url: Endpoints) => fetch(url, { method: "DELETE" });
}
`;

const code4 = `
// Just helper
type RequiredGeneric<T> = T extends void
  ? { __TYPE__ERROR__: "Please provide generic parameter" }
  : T;

interface HandleHttp {
  <T extends void>(): RequiredGeneric<T>;
  <T extends Endpoints.users>(): HandleUsers;
  <T extends Endpoints.notes>(): HandleNotes;
  <T extends Endpoints.entitlements>(): HandleEntitlements;
}
`;

const code5 = `
const handleHttp: HandleHttp = <_ extends Endpoints>() => new Api();

`;

const code6 = `
// only delete and post methods are allowed
const request1 = handleHttp<Endpoints.notes>(); 

// only get and post methods are allowed
const request2 = handleHttp<Endpoints.users>(); 

// only get method is allowed
const request3 = handleHttp<Endpoints.entitlements>(); 
`;
const code7 = `
const request = {
    __TYPE__ERROR__: 'Please provide generic parameter';
}
`;
const Api: FC = () => (
  <Layout title="Using type safe API requests">
    <p>
      If you ever thought how to make type safe API requests, this article might
      help you.
    </p>
    <p>Let's assume that we have next allowed endpoints:</p>
    <Code code={code1} />
    <p>
      You might have noticed, that I used <Var>const enum</Var> instead of{" "}
      <Var>enum</Var>.
    </p>
    <p>
      This technique will reduce you code output. Please, keep in mind, it does
      not works with babel compiler.
    </p>
    <p>You allowed to make:</p>
    <ul>
      <li>
        <Var>GET</Var> | <Var>POST</Var> requests for <Var>/users</Var>
      </li>
      <li>
        <Var>POST</Var> | <Var>DELETE</Var> requests for <Var>/notes</Var>
      </li>
      <li>
        <Var>Get</Var> requests for <Var>/entitlements</Var>
      </li>
    </ul>
    <p> Let's define interfaces of our allowed fetch methods:</p>
    <Code code={code2} />
    <p>
      Now, we can define our main <Var>Api</Var> class
    </p>
    <Code code={code3} />
    <p>
      For now, class <Var>Api</Var> does not have any constraints. Let's define
      them:
    </p>
    <Code code={code4} />
    <p>
      As You see, <Var>HandleHttp</Var> is just overloading for function.
      Nothing special except the first line. I will come back to it later. We
      have class <Var>Api</Var> and overloadings for function. How we can
      combine them? Very simple - we will just create a function which returns
      instance of <Var>Api</Var> class.
    </p>
    <Code code={code5} />
    <p>
      Take a look on generic parameter of <Var>httpHandler</Var> and
      <Var>HandleHttp</Var> interface, there is a relation between them. Let's
      test our result:
    </p>
    <Code code={code6} />
    <p>
      If you have forgotten to provide generic parameter, return type of
      <Var>request</Var> will be:
    </p>
    <Code code={code7} />
    <p>Drawbacks</p>
    <ul>
      <li>
        Without generic parameter, using <Var>request.TYPE _ERROR</Var> will be
        perfectly valid from TS point of view
      </li>
      <li>
        <Var>Api</Var> class is not singleton, you should create it every time
      </li>
    </ul>
  </Layout>
);

export default Api;
