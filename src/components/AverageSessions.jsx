import { Component } from 'react';
import styled from 'styled-components';
import ChartContainer from './ChartContainer.jsx';
import LineChart from './LineChart.jsx';
import isObjectEmpty from '../utils/isObjectEmpty.js';
import COLORS from '../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the AverageSession part of the Dashboard
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the raw data to make the linechart
 * @param {array} dataset - the processed data to make the linechart.
 */
class AverageSessions extends Component {
  constructor(props) {
    super(props);
    this.dataset = this.props.data.sessions.map((session) => {
      return {
        x: session.day,
        y: session.sessionLength,
      };
    });
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
  data: propTypes.shape({
    userId: propTypes.number,
    sessions: propTypes.array,
  }).isRequired,
};

/**
 * The style for the AverageSessions component
 * @memberof AverageSessions
 */
const StyledChartContainer = styled(ChartContainer)`
  grid-area: average-sessions;
  height: 16.5rem;
  background-color: ${COLORS.primaryAlt};
  border-radius: 0.375rem;
`;

export default AverageSessions;
