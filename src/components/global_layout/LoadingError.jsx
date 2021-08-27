import { Component } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

/**
 * Render a LoadingError component (a cross to display in the chart container)
 * @memberof general_layout
 * @extends Component
 * @hideconstructor
 * @param {string} color - the color of the cross
 */
class LoadingError extends Component {
  /**
   * Render the component.
   * @returns {Reactnode} jsx to be injected in the html
   */
  render() {
    return (
      <Container>
        <Title color={this.props.color}>
          Erreur de chargement, impossible d'afficher le graphique
        </Title>
        <Bar color={this.props.color} />
        <Bar color={this.props.color} />
      </Container>
    );
  }
}

/**
 * The propTypes for the LoadingError component
 * @memberof LoadingError
 */
LoadingError.propTypes = {
  color: propTypes.string.isRequired,
};

/**
 * The style for the Container part of the LoadingError component
 * @memberof LoadingError
 */
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

/**
 * The style for the Title part of the LoadingError component
 * @memberof LoadingError
 */
const Title = styled.h3`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  color: ${(props) => props.color};
`;

/**
 * The style for the Bar part of the LoadingError component
 * @memberof LoadingError
 */
const Bar = styled.div`
  position: absolute;
  height: 20px;
  width: 20%;
  min-width: 75px;
  max-width: 150px;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  background: ${(props) => props.color};

  &:first-of-type {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:last-of-type {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export default LoadingError;
