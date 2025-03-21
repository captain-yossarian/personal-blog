import styled from "styled-components";
import React, { VFC } from "react";
import { Link } from "react-router-dom";

import { NAV_WIDTH, CTA_FONT_FAMILY, media } from "./utils";

const Nav = styled.nav`
  padding-top: 20px;
  width: ${NAV_WIDTH};
  background-color: #fdba08;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  ${media.tablet`
  position: relative;
    width: 100%;`}
`;

const links = Object.entries({
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/subscribe": "Subscribe",
  // "/hire": "Hire me!",
  "/looking-for-job": "Looking for a job?",
});

const NavElement = styled.li`
  padding: 10px 10px;
  font-family: ${CTA_FONT_FAMILY};
  & a {
    text-decoration: none;
    color: #0e2924;
    display: inline-block;
    height: 100%;
    width: 100%;
    font-size: 1.3rem;
  }
  border-bottom: 4px solid transparent;
  &:hover {
    border-bottom: 4px solid #0e2924;
  }
  ${media.tablet`
  display:inline-block;`}
`;

const Navigation: VFC = () => (
  <Nav>
    <ul style={{ margin: "0 auto" }}>
      {links.map(([path, name]) => (
        <NavElement key={path}>
          <Link to={path}>{name}</Link>
        </NavElement>
      ))}
    </ul>
  </Nav>
);

export default Navigation;
