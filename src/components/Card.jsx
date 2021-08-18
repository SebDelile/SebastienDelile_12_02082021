import { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { giveOpacityToColorHex } from '../utils/giveOpacityToColorHex.js';
import { putThousandSeparator } from '../utils/putThousandSeparator.js';
import { colors } from '../utils/colors.js';
import { transitionSettings } from '../utils/transitionSettings.js';

export class Card extends Component {
  animateValue = () => {
    const rounder = 5 * 2 ** (Math.floor(Math.log10(this.props.value)) - 1);
    d3.select(this.spanValue)
      .text(0)
      .transition()
      .duration(transitionSettings.duration)
      .ease(transitionSettings.ease)
      .tween('spanValue', () => {
        let i = d3.interpolateRound(
          this.spanValue.textContent,
          this.props.value
        );
        return (t) => {
          this.spanValue.textContent =
            t === 1
              ? putThousandSeparator(this.props.value)
              : putThousandSeparator(Math.floor(i(t) / rounder) * rounder);
        };
      });
  };

  componentDidMount() {
    this.animateValue();
  }

  render() {
    return (
      <Container>
        <ContentGrid>
          <IconShape bgcolor={giveOpacityToColorHex(this.props.color, 0.1)}>
            <Icon src={this.props.icon} />
          </IconShape>
          <Value>
            <span ref={(el) => (this.spanValue = el)}></span>
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
