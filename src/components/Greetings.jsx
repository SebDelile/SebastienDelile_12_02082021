import { Component } from 'react';
import styled from 'styled-components';

export class Greetings extends Component {
  constructor(props) {
    super(props);
    this.stuff = null;
  }
  render() {
    return <Container>Greetings</Container>;
  }
}

const Container = styled.header`
  grid-area: greetings;
`;
