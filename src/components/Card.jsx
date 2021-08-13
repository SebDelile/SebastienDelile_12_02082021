import { Component } from 'react';
import styled from 'styled-components';
import { giveOpacityToColorHex } from '../utils/giveOpacityToColorHex.js';
import { putThousandSeparator } from '../utils/putThousandSeparator.js';
import { colors } from '../utils/colors.js';

export class Card extends Component {
  constructor(props) {
    super(props);
    this.stuff = null;
  }
  render() {
    return (
      <Container>
        <ContentGrid>
          <IconShape bgcolor={giveOpacityToColorHex(this.props.color, 0.1)}>
            <Icon src={this.props.icon} />
          </IconShape>
          <Value>
            {putThousandSeparator(this.props.value)}
            {this.props.unit}
          </Value>
          <Name>{this.props.name}</Name>
        </ContentGrid>
      </Container>
    );
  }
}

const Container = styled.div`
  background-color: ${colors.veryLightGrey};
  border-radius: 0.375rem;
  display: flex;
  justify-content: space-arround;
  align-items: center;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-areas:
    'icon value'
    'icon name';
  grid-template-columns: repeat(2, auto);
  justify-items: start;
  align-items: center;
  row-gap: 0;
  justify-content: start;
  padding: 2rem 1rem 2rem 1rem;
  column-gap: 1rem;

  @media only screen and (min-width: 80rem) {
    padding: 2rem;
    column-gap: 1.5rem;
  }
`;

const IconShape = styled.div`
  grid-area: icon;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  background-color: ${(props) => props.bgcolor};
  height: 3rem;
  width: 3rem;

  @media only screen and (min-width: 80rem) {
    height: 3.75rem;
    width: 3.75rem;
  }
`;

const Icon = styled.img`
  height: 1rem;

  @media only screen and (min-width: 80rem) {
    height: 1.25rem;
  }
`;

const Value = styled.p`
  grid-area: value;
  font-weight: 700;
  color: ${colors.secondary};
  font-size: 16px;

  @media only screen and (min-width: 80rem) {
    font-size: 20px;
  }
`;

const Name = styled.p`
  grid-area: name;
  font-size: 14px;
  color: ${colors.tertiary};
`;
