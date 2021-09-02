import { Component } from 'react';
import styled from 'styled-components';
import ChartContainer from './ChartContainer.jsx';
import BarChart from '../charts/BarChart.jsx';
import LoadingError from '../others/LoadingError.jsx';
import processData from '../../services/processData.js';
import COLORS from '../../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the Activity part of the Dashboard with a bar chart
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the raw data to make the barchart or an error if data loading has failed
 * @param {boolean} isError - true if this.props.data is an error object, false otherwise
 * @param {array|null} dataset - the processed data to make the barchart or null if data loading has failed
 */
class Activity extends Component {
  constructor(props) {
    super(props);
    this.isError = this.props.data instanceof Error;
    this.dataset = this.isError
      ? null
      : processData.activityToBarChart(this.props.data);
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
  data: propTypes.oneOfType([
    propTypes.shape({
      userId: propTypes.number,
      sessions: propTypes.array,
    }),
    propTypes.instanceOf(Error),
  ]).isRequired,
};

/**
 * The style for the Activity component
 * @memberof Activity
 */
const StyledChartContainer = styled(ChartContainer)`
  grid-area: activity;
  background-color: ${COLORS.veryLightGrey};
  color: black;
  border-radius: 0.375rem;
`;

export default Activity;
