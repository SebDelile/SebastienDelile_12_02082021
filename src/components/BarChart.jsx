import { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

export class BarChart extends Component {
  componentDidMount() {
    this.createBarChart();
    this.updateBarChart();
  }

  componentDidUpdate() {
    this.updateBarChart();
  }

  createBarChart() {
    const chart = d3
      .select(this.svgRootNode)
      .append('g')
      .attr('class', 'chart');

    chart.append('g').attr('class', 'xAxis');

    chart.append('g').attr('class', 'yAxis');

    chart.append('g').attr('class', 'bars');
  }

  updateBarChart() {
    const svg = d3.select(this.svgRootNode);
    const svgWidth = this.props.containerWidth;
    const svgHeight = this.props.containerHeight;
    const margin = { top: 60, bottom: 60, left: 20, right: 60 };
    const chartWidth = this.props.containerWidth - margin.left - margin.right;
    const chartHeight = this.props.containerHeight - margin.top - margin.bottom;

    const dataset = this.props.dataset;

    const xAxisScale = d3
      .scaleLinear()
      .range([0, chartWidth])
      .domain([0, d3.max(dataset, (data) => data.x) + 0.5]);
    const yAxisScale = d3
      .scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(dataset, (data) => data.y1)])
      .nice();

    const yAxisScale2 = (data) => chartHeight - yAxisScale(data);

    svg.attr('width', svgWidth).attr('height', svgHeight);

    const chart = svg
      .select('.chart')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const xAxis = chart
      .select('.xAxis')
      .attr('transform', 'translate(0,' + chartHeight + ')')
      .call(d3.axisBottom(xAxisScale).tickValues(dataset.map((data) => data.x)))
      .selectAll('text')
      .style('text-anchor', 'middle');

    const yAxis = chart
      .select('.yAxis')
      .attr('transform', 'translate(' + chartWidth + ', 0)')
      .call(d3.axisRight(yAxisScale).ticks(6));

    chart.select('.bars').selectAll('path').data(dataset).exit().remove();

    chart
      .select('.bars')
      .selectAll('path')
      .data(dataset)
      .enter()
      .append('path');

    const barPath = (x, y, width, height, radius) => {
      const v = height <= radius ? 0 : height - radius;
      const rad = height <= radius ? height : radius;
      const h = width - 2 * rad;
      return `
        M${x - width / 2},${y}
        v${-v}
        q${0},${-rad} ${rad},${-rad}
        h${h}
        q${rad},${0} ${rad},${rad}
        v${v}
        z
      `;
    };

    const bars = chart
      .select('.bars')
      .selectAll('path')
      .attr('fill', this.props.yAxis[1].color)
      .attr('d', (data) => barPath(xAxisScale(data.x), chartHeight, 7, 0, 3))
      .transition()
      .duration(1000)
      .ease(d3.easeCubicOut)
      .attr('d', (data) =>
        barPath(xAxisScale(data.x), chartHeight, 7, yAxisScale2(data.y1), 3)
      );
  }

  render() {
    return <svg ref={(node) => (this.svgRootNode = node)} />;
  }
}
