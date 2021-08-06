import { Component } from 'react';
import styled from 'styled-components';

export class Greetings extends Component {
  constructor(props) {
    super(props);
    this.firstName = this.props.data.firstName;
  }
  render() {
    return (
      <Container>
        <Title>
          Bonjour <FirstName>{this.firstName}</FirstName>
        </Title>
        <Message>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </Message>
      </Container>
    );
  }
}

const Container = styled.header`
  grid-area: greetings;
  margin: 1rem 0;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const FirstName = styled.span`
  color: red;
`;

const Message = styled.p`
  font-size: 1.125rem;
`;
