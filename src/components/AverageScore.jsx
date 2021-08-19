import { Component } from 'react';
import styled from 'styled-components';
import { ChartContainer } from './ChartContainer.jsx';
import { RadialBarChart } from './RadialBarChart.jsx';
import { isObjectEmpty } from '../utils/isObjectEmpty.js';
import { colors } from '../utils/colors.js';

/**
 * Render the AverageScore part of the Dashboard
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the data to make the radialbarchart, no processing needed, only check if >1
 */
export class AverageScore extends Component {
  /**
   * Render the component. contain a condition to render only when data are available
   * @returns {Reactnode} jsx to be injected in the html
   */
  render() {
    const isDataReady = isObjectEmpty(this.props.data);
    return (
      <StyledChartContainer>
        {isDataReady ? null : (
          <RadialBarChart
            title="Score"
            value={this.props.data.value > 1 ? 1 : this.props.data.value}
            description="de votre objectif"
          />
        )}
      </StyledChartContainer>
    );
  }
}

const StyledChartContainer = styled(ChartContainer)`
  grid-area: average-score;
  height: 16.5rem;
  background-color: ${colors.veryLightGrey};
  border-radius: 0.375rem;
`;
