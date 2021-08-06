import { Component } from 'react';
import styled from 'styled-components';

export class Activity extends Component {
  constructor(props) {
    super(props);
    this.stuff = null;
  }
  render() {
    return <Container>Activity</Container>;
  }
}

const Container = styled.div`
  grid-area: activity;
`;
