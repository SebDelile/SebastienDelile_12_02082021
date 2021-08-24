import { Component } from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the Greetings component
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the user main info
 * @param {string} firstName - the fisrtname of the user form the props
 */
class Greetings extends Component {
  constructor(props) {
    super(props);
    this.firstName = this.props.data.firstName;
  }

  /**
   * Render the component.
   * @returns {Reactnode} jsx to be injected in the html
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
  font-size: 3rem;
  margin-bottom: 1.5rem;
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
  font-size: 1.125rem;
`;

export default Greetings;