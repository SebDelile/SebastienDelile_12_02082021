import { Component } from 'react';
import styled from 'styled-components';
import ChartContainer from './ChartContainer.jsx';
import RadialBarChart from '../charts/RadialBarChart.jsx';
import processData from '../../services/processData.js';
import isObjectEmpty from '../../utils/isObjectEmpty.js';
import COLORS from '../../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the TodayScore part of the Dashboard with a radial bar chart
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the data to make the radialbarchart, no processing needed, only check if value is >1
 * @param {array} dataset - the processed data to make the RadialBarchart.
 */
class TodayScore extends Component {
  constructor(props) {
    super(props);
    this.dataset = processData(this.props.data, 'todayScoreToRadiaBarChart');
  }

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
            value={this.dataset}
            description="de votre objectif"
          />
        )}
      </StyledChartContainer>
    );
  }
}

/**
 * The propTypes for the TodayScore component
 * @memberof TodayScore
 */
TodayScore.propTypes = {
  data: propTypes.shape({
    value: propTypes.number,
  }).isRequired,
};

/**
 * The style for the AvergareScore component
 * @memberof TodayScore
 */
const StyledChartContainer = styled(ChartContainer)`
  grid-area: average-score;
  height: 16.5rem;
  background-color: ${COLORS.veryLightGrey};
  border-radius: 0.375rem;
`;

export default TodayScore;
