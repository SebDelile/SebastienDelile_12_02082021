import { Component } from 'react';
import styled from 'styled-components';

export class Performance extends Component {
  constructor(props) {
    super(props);
    this.stuff = null;
  }
  render() {
    return <Container>Performance</Container>;
  }
}

const Container = styled.div`
  grid-area: performance;
  height: 16.5rem;
`;
