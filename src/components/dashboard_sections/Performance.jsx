import { Component } from 'react';
import styled from 'styled-components';
import ChartContainer from './ChartContainer.jsx';
import RadarChart from '../charts/RadarChart.jsx';
import processData from '../../services/processData.js';
import isObjectEmpty from '../../utils/isObjectEmpty.js';
import COLORS from '../../utils/COLORS.js';
import propTypes from 'prop-types';

/**
 * Render the Performance part of the Dashboard
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the raw data to make the radarchart
 * @param {array} dataset - the processed data to make the radarchart.
 */
class Performance extends Component {
  constructor(props) {
    super(props);
    this.dataset = processData(this.props.data, 'performanceToRadarChart');
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
  data: propTypes.shape({
    userId: propTypes.number,
    kind: propTypes.object,
    data: propTypes.arrayOf(
      propTypes.shape({
        kind: propTypes.number,
        value: propTypes.number,
      })
    ),
  }).isRequired,
};

/**
 * The style for the Performance component
 * @memberof Performance
 */
const StyledChartContainer = styled(ChartContainer)`
  grid-area: performance;
  height: 16.5rem;
  background-color: ${COLORS.secondary};
  border-radius: 0.375rem;
`;

export default Performance;
