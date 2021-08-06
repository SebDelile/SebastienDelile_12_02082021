import { Component } from 'react';
import styled from 'styled-components';

export class KeyData extends Component {
  constructor(props) {
    super(props);
    this.stuff = null;
  }
  render() {
    return <Container>KeyData</Container>;
  }
}

const Container = styled.div`
  grid-area: key-data;
`;
