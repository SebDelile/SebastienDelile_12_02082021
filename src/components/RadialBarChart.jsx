import React, { Component } from 'react';
import * as d3 from 'd3';
import { colors } from '../utils/colors.js';
import { transitionSettings } from '../utils/transitionSettings.js';
import { appendMultilineSvgText } from '../utils/appendMultilineSvgText.js';
import { getxyFromPolar } from '../utils/getxyFromPolar.js';
import { animateDigits } from '../utils/animateDigits.js';

/**
 * Render a radarchart (spiderchart)
 * @extends Component
 * @param {object} props
 * @param {string} props.title - the title of the chart
 * @param {number} props.value - the processed data to make the chart. a unique value
 * @param {number} props.containerWidth - the width of the container provided by ChartContainer
 * @param {number} props.containerHeight - the height of the container provided by ChartContainer
 * @param {object} margin - the margin top, bottom, left, right for the chart inside its container
 * @param {number} chartWidth - the width of the chart (container - margins)
 * @param {number} chartHeight - the height of the chart (container - margins)
 * @param {object} chartCenter - the x and y coordinates of the chart center
 * @param {number} chartRadius - the radius of the chart (min between chartWidth/2 and chartHeight/2)
 */
export class RadialBarChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: this.props.containerHeight * 0.2,
      bottom: this.props.containerHeight * 0.2,
      left: this.props.containerWidth * 0.2,
      right: this.props.containerWidth * 0.2,
    };
    this.chartWidth =
      this.props.containerWidth - this.margin.left - this.margin.right;
    this.chartHeight =
      this.props.containerHeight - this.margin.top - this.margin.bottom;
    this.chartCenter = {
      x: Math.round(this.chartWidth / 2),
      y: Math.round(this.chartHeight / 2),
    };
    this.chartRadius = Math.round(
      d3.min([this.chartWidth, this.chartHeight]) / 2
    );
  }

  /**
   * Initialize the chart with create chart and then put the data inside
   */
  componentDidMount() {
    this.createChart();
    this.updateChart();
  }

  /**
   * Update all the chart, including axis size, position ... Might be launch on window resize
   */
  componentDidUpdate() {
    this.updateChart();
  }

  /**
   * Create and append all the element in the chart. Must be call only once to avoid mismatch between DOM and shadow DOM (so called by componentDidMount)
   */
  createChart = () => {
    const svg = d3.select(this.svgRootNode);

    svg.append('text').attr('class', 'title');

    const chart = svg.append('g').attr('class', 'chart');

    chart.append('circle').attr('class', 'circular-background');

    chart.append('path').attr('class', 'radial-bar');

    chart.append('text').attr('class', 'legend-value');
    chart.append('text').attr('class', 'legend-description');
  };

  /**
   * The function calling all other functions to update the chart including chart/axis/bars/... for content/size/position/...
   */
  updateChart = () => {
    this.setSvgAttr();
    this.setTitleAttr();
    this.setChartAttr();
    this.setCircularBackgroundAttr();
    this.setRadialBarAttr();
    this.setLegendAttr();
  };

  /**
   * set attributes and styling of the svg element (the root of the chart).
   */
  setSvgAttr = () => {
    d3.select(this.svgRootNode)
      .attr('width', this.props.containerWidth)
      .attr('height', this.props.containerHeight);
  };

  /**
   * set attributes and styling of the title of the chart. Set the title on multi-line if needed
   */
  setTitleAttr = () => {
    const title = d3
      .select(this.svgRootNode)
      .select('.title')
      .attr(
        'transform',
        'translate(' + this.props.containerWidth * 0.1 + ', 36)'
      )
      .attr('font-size', 15)
      .attr('fill', colors.secondaryAlt);

    appendMultilineSvgText(
      this.props.title,
      title,
      this.props.containerWidth * 0.8
    );
  };

  /**
   * set attributes and styling of the effective area of the chart
   */
  setChartAttr = () => {
    d3.select(this.svgRootNode)
      .select('.chart')
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight)
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  };

  /**
   * set attributes and styling of the circular background of the chart
   */
  setCircularBackgroundAttr = () => {
    d3.select(this.svgRootNode)
      .select('.circular-background')
      .attr('cx', this.chartCenter.x)
      .attr('cy', this.chartCenter.y)
      .attr('r', this.chartRadius)
      .attr('fill', 'white')
      .attr('stroke', 'none');
  };
  /**
   * set attributes and styling of the radial bar of the chart, include an animation on loading
   */
  setRadialBarAttr = () => {
    const startingAngle = 210;
    const endingAngle = startingAngle - this.props.value * 360;
    const radialBarRadius = this.chartRadius + 4;
    const xyCoordinates = (angle) =>
      getxyFromPolar(angle, radialBarRadius, this.chartCenter);
    const radialBar = d3
      .select(this.svgRootNode)
      .select('.radial-bar')
      .attr(
        'd',
        `M${xyCoordinates(startingAngle).x} ${
          xyCoordinates(startingAngle).y
        } A ${radialBarRadius} ${radialBarRadius} 0 0 1 ${
          xyCoordinates(endingAngle).x
        } ${xyCoordinates(endingAngle).y}`
      )
      .attr('fill', 'none')
      .attr('stroke', colors.primaryAlt)
      .attr('stroke-width', 10)
      .attr('stroke-linecap', 'round');
    radialBar
      .attr('stroke-dasharray', radialBar.node().getTotalLength())
      .attr('stroke-dashoffset', radialBar.node().getTotalLength())
      .transition()
      .duration(transitionSettings.duration)
      .ease(transitionSettings.ease)
      .attr('stroke-dashoffset', 0);
  };

  /**
   * set attributes and styling of the legend of the chart. Include an animation on loading
   */
  setLegendAttr = () => {
    const legendValue = d3
      .select(this.svgRootNode)
      .select('.legend-value')
      .attr('font-size', 26)
      .style('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(${this.chartCenter.x}, ${this.chartCenter.y - 10})`
      )
      .attr('fill', colors.secondary);
    animateDigits(
      legendValue,
      0,
      this.props.value * 100,
      1,
      transitionSettings,
      (value) => `${Math.round(value)}%`
    );

    const legendOfWhat = d3
      .select(this.svgRootNode)
      .select('.legend-description')
      .attr('font-size', 16)
      .attr('fill', colors.tertiary)
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `translate(${this.chartCenter.x}, ${this.chartCenter.y + 14})`
      );

    appendMultilineSvgText(
      this.props.description,
      legendOfWhat,
      this.chartRadius * 1.2
    );
  };

  /**
   * Render the component.
   * @returns {Reactnode} jsx to be injected in the html
   */
  render() {
    return (
      <React.Fragment>
        <figcaption className="sr-only">{this.props.title}</figcaption>
        <svg ref={(node) => (this.svgRootNode = node)} />
      </React.Fragment>
    );
  }
}
