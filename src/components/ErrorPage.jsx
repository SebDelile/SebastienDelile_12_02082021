import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export class ErrorPage extends Component {
  render() {
    return (
      <Container>
        <Titre>Erreur !</Titre>
        <Message>
          La page que vous avez demandée n'existe pas, vérifiez l'adresse saisie
          ou utilisez l'un des liens suivants :
        </Message>
        <LinkList>
          <li>
            <StyledLink to="/12">Utilisateur #12</StyledLink>
          </li>
          <li>
            <StyledLink to="/18">Utilisateur #18</StyledLink>
          </li>
        </LinkList>
      </Container>
    );
  }
}

const Container = styled.main`
  width: calc(100% - var(--nav-left-width));
  flex: 1;
  align-self: flex-end;
  padding: 2rem var(--main-padding);
`;

const Titre = styled.h1`
  padding: 2rem 0;
  font-weight: 700;
  font-size: 2.5rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  padding: 2rem 0;
`;

const LinkList = styled.ul`
  list-style: '➥';
  padding-left: 4.5rem;

  li {
    padding: 1rem 0 1rem 0.5rem;
    font-size: 1.5rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;
