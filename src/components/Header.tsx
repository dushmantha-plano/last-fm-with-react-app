import * as React from 'react';
import { NavLink } from 'react-router-dom';
import SidePanel from './SidePanel/SidePanel';
import styled from 'styled-components';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (): React.ReactElement => (
  <Wrapper>
    <HeaderInner>
      <HeaderNav>
        <HeaderNavLink exact={true} to="/albums" activeClassName="is-active">
          Albums
        </HeaderNavLink>
        <HeaderNavLink exact={true} to="/tracks" activeClassName="is-active">
          Tracks
        </HeaderNavLink>
      </HeaderNav>
    </HeaderInner>
    <SidePanel />
  </Wrapper>
);

export default Header;

// Styled components

const Wrapper = styled('header')`
  align-items: center;
  background: black;
  color: white;
  display: flex;
  font-family: 'Poppins', sans-serif;
  height: 80px;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  @media (min-width: 320px) and (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeaderInner = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: flex-start;
  padding: 0 10px;
`;

const HeaderNav = styled('nav')`
  align-items: center;
  display: flex;
  @media (min-width: 992px) {
    margin: 0;
  }
`;

const HeaderNavLink = styled(NavLink)`
  align-items: center;
  color: #dcdcdc;
  color: #dcdcdc;
  display: flex;
  margin: 0 25px;
  :link {
    text-decoration: none;
  }

  :visited {
    text-decoration: none;
  }

  :hover {
    color: white;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`;
