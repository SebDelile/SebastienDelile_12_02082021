import { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import giveOpacityToColorHex from '../../utils/giveOpacityToColorHex.js';
import putThousandSeparator from '../../utils/putThousandSeparator.js';
import COLORS from '../../utils/COLORS.js';
import LOADING_TRANSITION_SETTINGS from '../../utils/LOADING_TRANSITION_SETTINGS.js';
import animateDigits from '../../utils/animateDigits.js';
import propTypes from 'prop-types';

/**
 * Render the card component
 * @memberof charts
 * @extends Component
 * @hideconstructor
 * @param {object} props
 * @param {string} props.name - the name of the card content
 * @param {string} props.unit - the unit corresponding to the card content
 * @param {string} props.icon - the icon corresponding to the card content
 * @param {number|string} props.value - the value corresponding to the card content or a '-' if there is an error
 * @param {string} props.color - the color of the icon shape
 */
class Card extends Component {
  /**
   * set an animation on the mount to make the digits to increase from 0 to final value. Number is rendered with a coma thousand separator
   */
  componentDidMount() {
    if (this.props.value === '-') this.spanValue.textContent = '-';
    else {
      const animationStep =
        this.props.value === 0
          ? 1
          : 5 * 2 ** (Math.floor(Math.log10(this.props.value)) - 1);
      animateDigits(
        d3.select(this.spanValue),
        0,
        this.props.value,
        animationStep,
        LOADING_TRANSITION_SETTINGS,
        putThousandSeparator
      );
    }
  }

  /**
   * Render the component.
   * @returns {ReactElement} jsx to be injected in the html
   */
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

/**
 * The propTypes for the Card component
 * @memberof Card
 */
Card.propTypes = {
  name: propTypes.string.isRequired,
  unit: propTypes.string,
  icon: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.number, propTypes.oneOf(['-'])])
    .isRequired,
  color: propTypes.string.isRequired,
};

/**
 * The style for the Container part of the Card component
 * @memberof Card
 */
const Container = styled.div`
  background-color: ${COLORS.veryLightGrey};
  border-radius: 0.375rem;
  display: flex;
  justify-content: space-arround;
  align-items: center;
`;

/**
 * The style for the ContentGrid part of the Card component
 * @memberof Card
 */
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

/**
 * The style for the IconShape part of the Card component
 * @memberof Card
 */
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

/**
 * The style for the Icon part of the Card component
 * @memberof Card
 */
const Icon = styled.img`
  height: 1rem;

  @media only screen and (min-width: 80rem) {
    height: 1.25rem;
  }
`;

/**
 * The style for the Value part of the Card component
 * @memberof Card
 */
const Value = styled.p`
  grid-area: value;
  color: ${COLORS.secondary};
  font-size: 16px;
  font-weight: 700;

  span {
    font-weight: 700;
  }

  @media only screen and (min-width: 80rem) {
    font-size: 20px;
  }
`;

/**
 * The style for the Name part of the Card component
 * @memberof Card
 */
const Name = styled.p`
  grid-area: name;
  font-size: 14px;
  color: ${COLORS.tertiary};
`;

export default Card;
