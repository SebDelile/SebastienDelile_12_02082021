import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import APIStatus from '../others/APIStatus';

/**
 * Render a LandingPage
 * @memberof pages
 * @extends Component
 * @hideconstructor
 */
class LandingPage extends Component {
  /**
   * Render the component.
   * @returns {ReactElement} jsx to be injected in the html
   */
  render() {
    return (
      <Container>
        <Title>Bienvenue !</Title>
        <Message>
          Utilisez les liens suivants pour afficher le dashboard d'un
          utilisateur.
        </Message>
        <APIStatusWrapper>
          <Message>En récupérant les données via l'API :</Message>
          <APIStatus />
        </APIStatusWrapper>
        <LinkList>
          <li>
            <StyledLink to="/user/12">Utilisateur #12</StyledLink>
          </li>
          <li>
            <StyledLink to="/user/18">Utilisateur #18</StyledLink>
          </li>
        </LinkList>
        <Message>Ou en utilisant les données mockées :</Message>
        <LinkList>
          <li>
            <StyledLink to="/user/12-data-from-mock">
              Utilisateur #12
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/user/18-data-from-mock">
              Utilisateur #18
            </StyledLink>
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
  padding: 3rem 0 1rem 0;
`;

const APIStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;

  & > div {
    padding: 3rem 0 1rem 0;
  }
`;

/**
 * The style for the LinkList part of the LandingPage component
 * @memberof LandingPage
 */
const LinkList = styled.ul`
  list-style: '➥ ' inside;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  li {
    padding: 1rem 0 1rem 4rem;
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
