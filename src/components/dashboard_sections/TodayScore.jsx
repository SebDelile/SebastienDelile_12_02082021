import { Component } from 'react';
import styled from 'styled-components';
import ChartContainer from './ChartContainer.jsx';
import RadialBarChart from '../charts/RadialBarChart.jsx';
import LoadingError from '../others/LoadingError.jsx';
import processData from '../../services/ProcessData.js';
import COLORS from '../../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the TodayScore part of the Dashboard with a radial bar chart
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {number|object} props.data - the data to make the radialbarchart, a single value or an error object
 * @param {boolean} isError - true if this.props.data is an error object, false otherwise
 * @param {value|null} dataset - the processed data to make the RadialBarchart or null if data loading has failed
 */
class TodayScore extends Component {
  constructor(props) {
    super(props);
    this.isError = this.props.data instanceof Error;
    this.dataset = this.isError
      ? null
      : processData.todayScoreToRadiaBarChart(this.props.data);
  }

  /**
   * Render the component. display an error message instead of the chart if isError is true
   * @returns {ReactElement} jsx to be injected in the html
   */
  render() {
    return (
      <StyledChartContainer>
        {this.isError ? (
          <LoadingError color={COLORS.veryDarkGrey} />
        ) : (
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
  data: propTypes.oneOfType([propTypes.number, propTypes.instanceOf(Error)])
    .isRequired,
};

/**
 * The style for the AvergareScore component
 * @memberof TodayScore
 */
const StyledChartContainer = styled(ChartContainer)`
  grid-area: average-score;
  background-color: ${COLORS.veryLightGrey};
  border-radius: 0.375rem;
`;

export default TodayScore;
