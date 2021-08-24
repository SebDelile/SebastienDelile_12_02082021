import { Component } from 'react';
import styled from 'styled-components';
import iconYoga from '../assets/icon-yoga.svg';
import iconBiking from '../assets/icon-biking.svg';
import iconSwimming from '../assets/icon-swimming.svg';
import iconBodybuilding from '../assets/icon-bodybuilding.svg';
import COLORS from '../utils/COLORS.js';

/**
 * Render a NavLeft component.
 * @memberof general_layout
 * @extends Component
 * @hideconstructor
 */
class NavLeft extends Component {
  /**
   * Render the component.
   * @returns {Reactnode} jsx to be injected in the html
   */
  render() {
    return (
      <Container>
        <IconsWrapper>
          <IconShape>
            <Icon src={iconYoga} alt="Yoga" />
          </IconShape>
          <IconShape>
            <Icon src={iconSwimming} alt="Natation" />
          </IconShape>
          <IconShape>
            <Icon src={iconBiking} alt="Cyclisme" />
          </IconShape>
          <IconShape>
            <Icon src={iconBodybuilding} alt="Musculation" />
          </IconShape>
        </IconsWrapper>
        <Disclaimer>Copyright, SportSee 2020</Disclaimer>
      </Container>
    );
  }
}

/**
 * The style for the Container part of the NavLeft component
 * @memberof NavLeft
 */
const Container = styled.aside`
  position: fixed;
  z-index: 0;
  left: 0;
  top: 0;
  height: 100%;
  width: var(--nav-left-width);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.veryDarkGrey};
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;

/**
 * The style for the IconsWrapper part of the NavLeft component
 * @memberof NavLeft
 */
const IconsWrapper = styled.ul`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  row-gap: 1.25rem;
`;

/**
 * The style for the IconShape part of the NavLeft component
 * @memberof NavLeft
 */
const IconShape = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  border-radius: 0.375rem;
  background-color: white;

  @media only screen and (min-width: 80rem) {
    height: 4rem;
    width: 4rem;
  }
`;

/**
 * The style for the Icon part of the NavLeft component
 * @memberof NavLeft
 */
const Icon = styled.img`
  height: 1.5rem;

  @media only screen and (min-width: 80rem) {
    height: 2rem;
  }
`;

/**
 * The style for the Disclaimer part of the NavLeft component
 * @memberof NavLeft
 */
const Disclaimer = styled.p`
  position: absolute;
  z-index: 1;
  bottom: 3.75rem;
  left: 50%;
  transform: rotate(-90deg);
  transform-origin: center left;
  color: white;
  font-size: 0.75rem;
  white-space: nowrap;
`;

export default NavLeft;
