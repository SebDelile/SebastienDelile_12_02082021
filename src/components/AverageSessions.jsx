import { Component } from 'react';
import styled from 'styled-components';

export class AverageSessions extends Component {
  constructor(props) {
    super(props);
    this.stuff = null;
  }
  render() {
    return <Container>AverageSessions</Container>;
  }
}

const Container = styled.div`
  grid-area: average-sessions;
`;
