import { Component } from 'react';
import styled from 'styled-components';
import { ChartContainer } from './ChartContainer.jsx';
import { RadarChart } from './RadarChart.jsx';
import { isObjectEmpty } from '../utils/isObjectEmpty.js';
import { colors } from '../utils/colors.js';

/**
 * Render the Performance part of the Dashboard
 * @extends Component
 * @param {object} props
 * @param {array} props.data - the raw data to make the barchart
 * @param {array} dataset - the processed data to make the barchart.
 */
export class Performance extends Component {
  constructor(props) {
    super(props);
    this.dataset = this.props.data.data.map((item) => ({
      key: item.kind,
      value: item.value,
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
          <RadarChart
            title="Performances"
            axis={[
              { key: 1, title: 'Cardio' },
              { key: 2, title: 'Energie' },
              { key: 3, title: 'Endurance' },
              { key: 4, title: 'Force' },
              { key: 5, title: 'Vitesse' },
              { key: 6, title: 'Intensité' },
            ]}
            scales={[0, 50, 100, 150, 200, 250]}
            dataset={this.dataset}
          />
        )}
      </StyledChartContainer>
    );
  }
}

const StyledChartContainer = styled(ChartContainer)`
  grid-area: performance;
  height: 16.5rem;
  background-color: ${colors.secondary};
  border-radius: 0.375rem;
`;
