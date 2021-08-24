import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Render a LandingPage
 * @memberof pages
 * @extends Component
 * @hideconstructor
 */
class LandingPage extends Component {
  /**
   * Render the component.
   * @returns {Reactnode} jsx to be injected in the html
   */
  render() {
    return (
      <Container>
        <Title>Bienvenue !</Title>
        <Message>
          Utilisez l'un des liens suivants pour afficher le dashboard d'un des
          utilisateurs :
        </Message>
        <LinkList>
          <li>
            <StyledLink to="/user/12">Utilisateur #12</StyledLink>
          </li>
          <li>
            <StyledLink to="/user/18">Utilisateur #18</StyledLink>
          </li>
        </LinkList>
      </Container>
    );
  }
}

/**
 * The style for the Container part of the Landing component
 * @memberof LandingPage
 */
const Container = styled.main`
  width: calc(100% - var(--nav-left-width));
  flex: 1;
  align-self: flex-end;
  padding: 2rem var(--main-padding);
`;

/**
 * The style for the Title part of the LandingPage component
 * @memberof LandingPage
 */
const Title = styled.h1`
  padding: 2rem 0;
  font-weight: 700;
  font-size: 2.5rem;
`;

/**
 * The style for the Message part of the LandingPage component
 * @memberof LandingPage
 */
const Message = styled.p`
  font-size: 1.5rem;
  padding: 2rem 0;
`;

/**
 * The style for the LinkList part of the LandingPage component
 * @memberof LandingPage
 */
const LinkList = styled.ul`
  list-style: '➥';
  padding-left: 4.5rem;

  li {
    padding: 1rem 0 1rem 0.5rem;
    font-size: 1.5rem;
  }
`;

/**
 * The style for the StyleLink part of the LandingPage component
 * @memberof LandingPage
 */
const StyledLink = styled(Link)`
  text-decoration: underline;
`;

export default LandingPage;
