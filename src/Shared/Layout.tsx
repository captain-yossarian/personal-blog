import styled from "styled-components";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export const Title = styled.h1`
  font-weight: bold;
  line-height: 1.5;
  font-size: 30px;
  border-bottom: 5px solid #fdba08;
  display: inline-block;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  width: 60%;
`;
export const Layout: FC<{ title: string }> = ({ title, children }) => (
  <Wrapper>
    <Title>{title}</Title>
    {children}
  </Wrapper>
);

export const CodeWrapper = styled.div`
  border-radius: 10px;
  margin: 30px 10px;
  box-shadow: 5px 5px 5px black;
`;

export const Var = styled.code`
  background-color: #bfb6b6;
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
`;

const Container = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Nav = styled.nav`
  width: 300px;
  background-color: #fdba08;
  height: 100vh;
  position: fixed;
  @media (max-width: 768px) {
    height: inherit;
    position: relative;
    width: 100%;
  }
`;

const Section = styled.section`
  margin-left: 300px;
  width: 100%;
  padding: 50px 20px 10px 20px;
  @media (max-width: 768px) {
    margin-left: unset;
  }
`;

const links = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
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
