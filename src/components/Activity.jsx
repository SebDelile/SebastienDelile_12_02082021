import { Component } from 'react';
import styled from 'styled-components';
import { ChartContainer } from './ChartContainer.jsx';
import { BarChart } from './BarChart.jsx';
import { isObjectEmpty } from '../utils/isObjectEmpty.js';

export class Activity extends Component {
  constructor(props) {
    super(props);
    this.dataset = this.props.data.sessions.map((session) => ({
      x: new Date(session.day).getDate(),
      y0: session.kilogram,
      y1: session.calories,
    }));
    this.weigthSet = this.props.data.sessions.map(
      (session) => session.kilogram
    );
    this.burnedCalSet = this.props.data.sessions.map(
      (session) => session.calories
    );
  }

  render() {
    const isDataReady = isObjectEmpty(this.props.data);
    return (
      <StyledChartContainer>
        {isDataReady ? null : (
          <BarChart
            title="Activité quotidienne"
            legend={true}
            xAxis={{
              name: 'Date',
              unit: 'jours',
              axisPosition: 'bottom',
              isAxisTitle: false,
              isScaleUnit: false,
            }}
            yAxis={[
              {
                name: 'Poids',
                unit: 'kg',
                color: '#282D30',
                axisPosition: 'rigth',
                isAxisTitle: false,
                isScaleUnit: false,
              },
              {
                name: 'Calories brûlées',
                unit: 'kcal',
                color: '#E60000',
                axisPosition: 'none',
                isAxisTitle: false,
                isScaleUnit: false,
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
  border: 1px solid blue;
`;
