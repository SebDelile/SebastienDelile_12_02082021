import { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import COLORS from '../../utils/COLORS.js';

/**
 * Render a NavTop component.
 * @memberof general_layouts
 * @extends Component
 * @hideconstructor
 */
class NavTop extends Component {
  /**
   * Render the component.
   * @returns {ReactElement} jsx to be injected in the html
   */
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

/**
 * The style for the Container part of the NavLeft component
 * @memberof NavTop
 */
const Container = styled.header`
  z-index: 10;
  width: 100%;
  height: 4.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.875rem;
  padding-right: var(--main-padding);
  background: ${COLORS.veryDarkGrey};
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);

  @media only screen and (min-width: 80rem) {
    height: 5.75rem;
  }
`;

/**
 * The style for the Logo part of the NavLeft component
 * @memberof NavTop
 */
const Logo = styled.img`
  height: 3rem;
  margin-right: 6rem;

  @media only screen and (min-width: 80rem) {
    height: 3.75rem;
    margin-right: 9rem;
  }
`;

/**
 * The style for the Nav part of the NavLeft component
 * @memberof NavTop
 */
const Nav = styled.nav`
  flex: 1;
  max-width: calc(
    90rem * (1 - 2 * var(--main-padding-no-unit)) - var(--nav-left-width)
  );
`;

/**
 * The style for the NavList part of the NavLeft component
 * @memberof NavTop
 */
const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

/**
 * The style for the NavItem part of the NavLeft component
 * @memberof NavTop
 */
const NavItem = styled.li`
  font-size: 1rem;
  color: white;

  @media only screen and (min-width: 80rem) {
    font-size: 1.5rem;
  }
`;

/**
 * The style for the StyledNavLink part of the NavLeft component
 * @memberof NavTop
 */
const StyledNavLink = styled(NavLink)`
  &:hover,
  &.active {
    text-decoration: underline;
  }
`;

export default NavTop;
