import { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { colors } from '../utils/colors.js';

export class NavTop extends Component {
  render() {
    return (
      <Container>
        <Logo src={logo} alt="logo de SportSee" />
        <Nav>
          <NavList>
            <NavItem>
              <StyledNavLink exact to="/">
                Accueil
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/profile">Profil</StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/setings">Réglage</StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/community">Communauté</StyledNavLink>
            </NavItem>
          </NavList>
        </Nav>
      </Container>
    );
  }
}

const Container = styled.header`
  z-index: 10;
  width: 100%;
  height: 5.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.875rem;
  padding-right: var(--main-padding);
  background: ${colors.veryDarkGrey};
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;

const Logo = styled.img`
  width: 11rem;
  margin-right: 9rem;
`;

const Nav = styled.nav`
  flex: 1;
  max-width: calc(
    90rem * (1 - 2 * var(--main-padding-no-unit)) - var(--nav-left-width)
  );
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavItem = styled.li`
  font-size: 1.5rem;
  color: white;
`;

const StyledNavLink = styled(NavLink)`
  &:hover,
  &.active {
    text-decoration: underline;
  }
`;
