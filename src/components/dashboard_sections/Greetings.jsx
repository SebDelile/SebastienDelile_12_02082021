import { Component } from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the Greetings component
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the user main info or an error object or an error if data loading has failed
 * @param {boolean} isError - true if this.props.data is an error object, false otherwise
 * @param {string} firstName - the firstname of the user form the props or nothing if data loading has failed
 */
class Greetings extends Component {
  constructor(props) {
    super(props);
    this.isError = this.props.data instanceof Error;
    this.firstName = this.isError ? '' : this.props.data.firstName;
  }

  /**
   * Render the component.
   * @returns {ReactElement} jsx to be injected in the html
   */
  render() {
    return (
      <Container>
        <Title>
          Bonjour <FirstName>{this.firstName}</FirstName>
        </Title>
        <Message>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </Message>
      </Container>
    );
  }
}

/**
 * The propTypes for the Greetings component
 * @memberof Greetings
 */
Greetings.propTypes = {
  data: propTypes.shape({
    userInfos: propTypes.shape({
      firstName: propTypes.string,
      lastName: propTypes.string,
      age: propTypes.number,
    }),
  }).isRequired,
};

/**
 * The style for the Container part of the Greetings component
 * @memberof Greetings
 */
const Container = styled.header`
  grid-area: greetings;
  margin: 1rem 0;
`;

/**
 * The style for the Title part of the Greetings component
 * @memberof Greetings
 */
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.75rem;

  @media only screen and (min-width: 80rem) {
    font-size: 3rem;
    margin-bottom: 1.25rem;
  }
`;

/**
 * The style for the FirstName part of the Greetings component
 * @memberof Greetings
 */
const FirstName = styled.span`
  color: ${COLORS.primary};
`;

/**
 * The style for the Messages part of the Greetings component
 * @memberof Greetings
 */
const Message = styled.p`
  font-size: 0.875rem;

  @media only screen and (min-width: 80rem) {
    font-size: 1.125rem;
  }
`;

export default Greetings;
