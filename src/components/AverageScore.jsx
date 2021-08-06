import { Component } from 'react';
import styled from 'styled-components';

export class AverageScore extends Component {
  constructor(props) {
    super(props);
    this.stuff = null;
  }
  render() {
    return <Container>AverageScore</Container>;
  }
}

const Container = styled.div`
  grid-area: average-score;
`;
