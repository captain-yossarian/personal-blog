import styled from "styled-components";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export const Title = styled.h1`
  font-weight: bold;
  line-height: 1.5;
  font-size: 30px;
`;

export const Layout: FC<{ title: string }> = ({ title, children }) => (
  <div>
    <Title>{title}</Title>
    {children}
  </div>
);

export const CodeWrapper = styled.div`
  border-radius: 10px;
  margin: 30px 10px;
  box-shadow: 5px 5px 5px black;
  width: 60%;
`;

export const Var = styled.code`
  background-color: #bfb6b6;
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
`;

const Container = styled.div`
  display: flex;
`;

const Nav = styled.nav`
  width: 300px;
  background-color: #fdba08;
  height: 100vh;
  position: fixed;
`;

const Section = styled.section`
  margin-left: 300px;
  width: 100%;
  padding: 50px 20px 10px 20px;
`;

const links = {
  "/math": "Math operations",
  "/typed-react-children": "Type React component children",
  "/react-return-type": "Type React component return type",
  "/compare-arguments": "Compare array arguments",
  "/range-numbers": "Generate numbers in range",
  "/recursive-types": "Recursive types",
  "/tuples": "Handle tuples",
  "/union-array": "Transform Union to Array",
  "/callback-chain": "Callback chain",
  "/handle-arrays": "Handle arrays",
  "/publish-subscribe": "Publish subscribe pattern",
  "/type-state": "Type state pattern",
  "/api": "Make type safe api requests",
};

const keys = Object.keys(links);

const NavElement = styled.li`
  font-size: 18px;
  padding: 10px 10px;
`;
export const Navigation: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container>
    <Nav>
      <ul style={{ margin: "0 auto" }}>
        {(keys as (keyof typeof links)[]).map((elem, index) => (
          <NavElement key={index}>
            <Link to={elem}>{links[elem]}</Link>
          </NavElement>
        ))}
      </ul>
    </Nav>
    <Section>{children}</Section>
  </Container>
);
