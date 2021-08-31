import { Component } from 'react';
import styled from 'styled-components';
import ChartContainer from './ChartContainer.jsx';
import RadarChart from '../charts/RadarChart.jsx';
import LoadingError from '../global_layouts/LoadingError.jsx';
import processData from '../../services/processData.js';
import COLORS from '../../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the Performance part of the Dashboard
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the raw data to make the radarchart
 * @param {boolean} isError - true if this.props.data is an error object, false otherwise
 * @param {array|null} dataset - the processed data to make the radarchart or null if data loading has failed
 */
class Performance extends Component {
  constructor(props) {
    super(props);
    this.isError = this.props.data instanceof Error;
    this.dataset = this.isError
      ? null
      : processData(this.props.data, 'performanceToRadarChart');
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
          <RadarChart
            title="Performances"
            axis={[
              { key: 1, name: 'Cardio' },
              { key: 2, name: 'Energie' },
              { key: 3, name: 'Endurance' },
              { key: 4, name: 'Force' },
              { key: 5, name: 'Vitesse' },
              { key: 6, name: 'Intensité' },
            ]}
            scales={[0, 50, 100, 150, 200, 250]}
            dataset={this.dataset}
          />
        )}
      </StyledChartContainer>
    );
  }
}

/**
 * The propTypes for the Performance component
 * @memberof Performance
 */
Performance.propTypes = {
  data: propTypes.oneOfType([
    propTypes.shape({
      userId: propTypes.number,
      kind: propTypes.object,
      data: propTypes.arrayOf(
        propTypes.shape({
          kind: propTypes.number,
          value: propTypes.number,
        })
      ),
    }),
    propTypes.instanceOf(Error),
  ]).isRequired,
};

/**
 * The style for the Performance component
 * @memberof Performance
 */
const StyledChartContainer = styled(ChartContainer)`
  grid-area: performance;
  background-color: ${COLORS.secondary};
  border-radius: 0.375rem;
`;

export default Performance;
