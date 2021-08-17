import { Component } from 'react';
import styled from 'styled-components';
import { ChartContainer } from './ChartContainer.jsx';
import { LineChart } from './LineChart.jsx';
import { isObjectEmpty } from '../utils/isObjectEmpty.js';
import { colors } from '../utils/colors.js';

/**
 * Render the AverageSession part of the Dashboard
 * @extends Component
 * @param {object} props
 * @param {array} props.data - the raw data to make the linechart
 * @param {array} dataset - the processed data to make the linechart.
 */
export class AverageSessions extends Component {
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

const StyledChartContainer = styled(ChartContainer)`
  grid-area: average-sessions;
  height: 16.5rem;
  background-color: ${colors.primaryAlt};
  border-radius: 0.375rem;
`;
