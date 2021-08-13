import { Component } from 'react';
import styled from 'styled-components';
import { ChartContainer } from './ChartContainer.jsx';
import { BarChart } from './BarChart.jsx';
import { isObjectEmpty } from '../utils/isObjectEmpty.js';
import { colors } from '../utils/colors.js';

/**
 * Render the Activity part of the Dashboard
 * @extends Component
 * @param {object} props
 * @param {array} props.data - the raw data to make the barchart
 * @param {array} dataset - the processed data to make the barchart.
 */
export class Activity extends Component {
  constructor(props) {
    super(props);
    this.dataset = this.props.data.sessions.map((session) => ({
      x: new Date(session.day).getDate(),
      y: [session.kilogram, session.calories],
    }));
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
          <BarChart
            title="Activité quotidienne"
            xAxis={{
              name: 'Date',
              unit: 'jours',
            }}
            series={[
              {
                name: 'Poids',
                unit: 'kg',
                color: colors.secondary,
                isAxis: true,
                isFromZero: false,
              },
              {
                name: 'Calories brûlées',
                unit: 'kcal',
                color: colors.primary,
                isAxis: false,
                isFromZero: true,
              },
            ]}
            dataset={this.dataset}
          />
        )}
      </StyledChartContainer>
    );
  }
}

const StyledChartContainer = styled(ChartContainer)`
  grid-area: activity;
  height: 20rem;
  background-color: ${colors.veryLightGrey};
  border-radius: 0.375rem;
`;
