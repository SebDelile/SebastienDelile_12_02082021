import { Component } from 'react';
import styled from 'styled-components';
import ChartContainer from './ChartContainer.jsx';
import LineChart from '../charts/LineChart.jsx';
import LoadingError from '../global_layouts/LoadingError.jsx';
import processData from '../../services/processData.js';
import COLORS from '../../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the AverageSession part of the Dashboard with a line chart
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the raw data to make the linechart or an error if data loading has failed
 * @param {boolean} isError - true if this.props.data is an error object, false otherwise
 * @param {array|null} dataset - the processed data to make the linechart or null if data loading has failed
 */
class AverageSessions extends Component {
  constructor(props) {
    super(props);
    this.isError = this.props.data instanceof Error;
    this.dataset = this.isError
      ? null
      : processData(this.props.data, 'averageSessionsToLineChart');
  }

  /**
   * Render the component. display an error message instead of the chart if isError is true
   * @returns {ReactElement} jsx to be injected in the html
   */
  render() {
    return (
      <StyledChartContainer>
        {this.isError ? (
          <LoadingError color={COLORS.veryLightGrey} />
        ) : (
          <LineChart
            title="Durée moyenne des sessions"
            xAxis={{
              name: 'Jours de la semaine',
              unit: '',
            }}
            serie={{
              name: 'Durée session',
              unit: 'min',
              color: 'white',
            }}
            dataset={this.dataset}
            xAxisLabel={(xData) => {
              const frenchDayOfTheWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
              return frenchDayOfTheWeek[xData % 7];
            }}
          ></LineChart>
        )}
      </StyledChartContainer>
    );
  }
}

/**
 * The propTypes for the AverageSessions component
 * @memberof AverageSessions
 */
AverageSessions.propTypes = {
  data: propTypes.oneOfType([
    propTypes.shape({
      userId: propTypes.number,
      sessions: propTypes.array,
    }),
    propTypes.instanceOf(Error),
  ]).isRequired,
};

/**
 * The style for the AverageSessions component
 * @memberof AverageSessions
 */
const StyledChartContainer = styled(ChartContainer)`
  grid-area: average-sessions;
  background-color: ${COLORS.primaryAlt};
  border-radius: 0.375rem;
`;

export default AverageSessions;
