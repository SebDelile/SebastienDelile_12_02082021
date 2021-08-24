import { Component } from 'react';
import styled from 'styled-components';
import ChartContainer from './ChartContainer.jsx';
import RadialBarChart from '../charts/RadialBarChart.jsx';
import isObjectEmpty from '../../utils/isObjectEmpty.js';
import COLORS from '../../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the AverageScore part of the Dashboard
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the data to make the radialbarchart, no processing needed, only check if value is >1
 */
class AverageScore extends Component {
  /**
   * Render the component. contain a condition to render only when data are available
   * @returns {Reactnode} jsx to be injected in the html
   */
  render() {
    const isDataReady = isObjectEmpty(this.props.data);
    return (
      <StyledChartContainer>
        {isDataReady ? null : (
          <RadialBarChart
            title="Score"
            value={this.props.data.value > 1 ? 1 : this.props.data.value}
            description="de votre objectif"
          />
        )}
      </StyledChartContainer>
    );
  }
}

/**
 * The propTypes for the AverageScore component
 * @memberof AverageScore
 */
AverageScore.propTypes = {
  data: propTypes.shape({
    value: propTypes.number,
  }).isRequired,
};

/**
 * The style for the AvergareScore component
 * @memberof AverageScore
 */
const StyledChartContainer = styled(ChartContainer)`
  grid-area: average-score;
  height: 16.5rem;
  background-color: ${COLORS.veryLightGrey};
  border-radius: 0.375rem;
`;

export default AverageScore;
