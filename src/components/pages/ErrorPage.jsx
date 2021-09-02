import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Render an erroPage
 * @memberof pages
 * @extends Component
 * @hideconstructor
 */
class ErrorPage extends Component {
  /**
   * Render the component.
   * @returns {ReactElement} jsx to be injected in the html
   */
  render() {
    return (
      <Container>
        <Title>Erreur !</Title>
        <Message>La page que vous avez demandée n'existe pas...</Message>
        <LinkList>
          <li>
            <StyledLink to="/">Retourner à la page d'accueil</StyledLink>
          </li>
        </LinkList>
      </Container>
    );
  }
}

/**
 * The style for the Container part of the ErrorPage component
 * @memberof ErrorPage
 */
const Container = styled.main`
  width: calc(100% - var(--nav-left-width));
  flex: 1;
  align-self: flex-end;
  padding: 2rem var(--main-padding);
`;

/**
 * The style for the Title part of the ErrorPage component
 * @memberof ErrorPage
 */
const Title = styled.h1`
  padding: 2rem 0;
  font-weight: 700;
  font-size: 2.5rem;
`;

/**
 * The style for the Message part of the ErrorPage component
 * @memberof ErrorPage
 */
const Message = styled.p`
  font-size: 1.5rem;
  padding: 2rem 0;
`;

/**
 * The style for the LinkList part of the ErrorPage component
 * @memberof ErrorPage
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
 * The style for the StyleLink part of the ErrorPage component
 * @memberof ErrorPage
 */
const StyledLink = styled(Link)`
  text-decoration: underline;
`;

export default ErrorPage;
