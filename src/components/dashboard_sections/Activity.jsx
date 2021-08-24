import { Component } from 'react';
import styled from 'styled-components';
import ChartContainer from './ChartContainer.jsx';
import BarChart from '../charts/BarChart.jsx';
import isObjectEmpty from '../../utils/isObjectEmpty.js';
import COLORS from '../../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the Activity part of the Dashboard
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the raw data to make the barchart
 * @param {array} dataset - the processed data to make the barchart.
 */
class Activity extends Component {
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
                color: COLORS.secondary,
                isAxis: true,
                isFromZero: false,
              },
              {
                name: 'Calories brûlées',
                unit: 'kcal',
                color: COLORS.primary,
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

/**
 * The propTypes for the Activity component
 * @memberof Activity
 */
Activity.propTypes = {
  data: propTypes.shape({
    userId: propTypes.number,
    sessions: propTypes.array,
  }).isRequired,
};

/**
 * The style for the Activity component
 * @memberof Activity
 */
const StyledChartContainer = styled(ChartContainer)`
  grid-area: activity;
  height: 20rem;
  background-color: ${COLORS.veryLightGrey};
  border-radius: 0.375rem;
`;

export default Activity;
