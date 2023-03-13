import styled from "styled-components";
import React, { FC } from "react";
import Navigation from "./Navigation";
import { NAV_WIDTH, CTA_FONT_FAMILY } from "./utils";

export const Title = styled.h1`
  font-weight: bold;
  line-height: 1.5;
  font-size: 30px;
  border-bottom: 5px solid #fdba08;
  display: inline-block;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  & p {
    font-size: 1.1rem;
    line-height: 1.5;
    color: #0e2924;
    margin: 1rem 0;
  }
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
  margin: 0 5px;
`;

const Container = styled.div``;

const Section = styled.section`
  margin-left: ${NAV_WIDTH};
  max-width: 60rem;
  font-family: ${CTA_FONT_FAMILY};
  padding: 50px 20px 10px 80px;
  @media (max-width: 768px) {
    padding: 10px;
    margin-left: 0;
  }
`;

const Banner = styled.aside`
  position: fixed;
  max-width: 20rem;
  z-index: 99999;
  top: 5px;
  right: 5px;
  img {
    width: 100%;
    opacity: 55%;
  }
`;

const Flex = styled.div`
  #banner {
    @media (max-width: 1400px) {
      /* Probably some parent element that limits the img width */
      img {
        display: none;
      }
    }
  }
`;

export const Main: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container>
    <Navigation />
    <Flex>
      <Section>{children}</Section>
    </Flex>
  </Container>
);
