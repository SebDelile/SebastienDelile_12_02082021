import React, { Component } from 'react';
import * as d3 from 'd3';
import giveOpacityToColorHex from '../utils/giveOpacityToColorHex.js';
import COLORS from '../utils/COLORS.js';
import LOADING_TRANSITION_SETTINGS from '../utils/LOADING_TRANSITION_SETTINGS.js';
import getxyFromPolar from '../utils/getxyFromPolar.js';
import propTypes from 'prop-types';
import ComponentWithCurry from '../utils/ComponentWithCurry.js';

/**
 * Render a radarchart (spiderchart). Exported with curry to ensure the props from CharContainer are well checked
 * @memberof charts
 * @extends Component
 * @param {object} props
 * @param {string} props.title - the title of the chart
 * @param {array} props.axis - the details of the Axis data (key and name)
 * @param {array} props.scales - the value of the ticks to build the grid
 * @param {array} props.dataset - the processed data to make the chart. Array of object, with a key "x" containing the axis index and a key "y" containing a y value.
 * @param {number} props.containerWidth - the width of the container provided by ChartContainer
 * @param {number} props.containerHeight - the height of the container provided by ChartContainer
 * @param {object} margin - the margin top, bottom, left, right for the chart inside its container
 * @param {number} chartWidth - the width of the chart (container - margins)
 * @param {number} chartHeight - the height of the chart (container - margins)
 * @param {object} chartCenter - the x and y coordinates of the chart center
 * @param {number} chartRadius - the radius of the chart (min between chartWidth/2 and chartHeight/2)
 */
class RadarChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: this.props.containerHeight * 0.15,
      bottom: this.props.containerHeight * 0.15,
      left: this.props.containerWidth * 0.15,
      right: this.props.containerWidth * 0.15,
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
   * Update all the chart, including axis size, position ... Might be launched on data update
   */
  componentDidUpdate() {
    this.updateChart();
  }

  /**
   * Create and append all the element in the chart. Must be call only once to avoid mismatch between DOM and shadow DOM (so called by componentDidMount)
   */
  createChart = () => {
    const svg = d3.select(this.svgRootNode);

    const chart = svg.append('g').attr('class', 'chart');

    const axis = chart.append('g').attr('class', 'axis-group');
    axis
      .selectAll('axis-label')
      .data(this.props.axis)
      .enter()
      .append('text')
      .attr('class', 'axis-label');

    const grid = chart.append('g').attr('class', 'grid');
    grid
      .selectAll('grid-line')
      .data(this.props.scales)
      .enter()
      .append('path')
      .attr('class', 'grid-line')
      .datum((line) =>
        Array.from(this.props.axis, (data) => ({
          ...data,
          value: line,
        }))
      );

    chart.append('path').attr('class', 'area');

    chart.append('g').attr('class', 'data-points');

    const tooltip = chart.append('g').attr('class', 'tooltip-box');
    tooltip.append('rect').attr('class', 'tooltip-background');
    tooltip.append('text').attr('class', 'tooltip-text');
  };

  /**
   * The function calling all other functions to update the chart including chart/axis/bars/tooltip/... for content/size/position/...
   */
  updateChart = () => {
    this.setSvgAttr();
    this.setChartAttr();
    const axisScale = this.setAxisScale();
    this.setAxisLabelAttr(axisScale);
    this.setGridAttr(axisScale);
    this.setAreaAttr(axisScale);
    this.setDataPointsAttr(axisScale);
    this.setTooltipAttr();
  };

  /**
   * set attributes and styling of the svg element (the root of the chart). have the mouse event listener to make appear the data points
   */
  setSvgAttr = () => {
    d3.select(this.svgRootNode)
      .attr('width', this.props.containerWidth)
      .attr('height', this.props.containerHeight)
      .on('mouseenter', this.makeDataPointsAppear)
      .on('mouseleave', this.makeDataPointsDisappear);
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
   * set the x Axis scale (range and domain).
   * @returns {function} - a function to be used to convert data in chart position/lenght. axis origin (before rotation) is horizontal-left to right
   */
  setAxisScale = () => {
    return d3
      .scaleLinear()
      .range([0, this.chartRadius])
      .domain(d3.extent(this.props.scales));
  };

  /**
   * set attributes and styling of the axis labels. Axis start from center and are rotated counter-clockwise according to axis.key. use this.xyCoordinate() to plot them.
   * @param {function} axisScale - the function to transform data into pixel position on the chart according to the axis scale
   */
  setAxisLabelAttr = (axisScale) => {
    d3.select(this.svgRootNode)
      .selectAll('.axis-label')
      .text((axis) => axis.name)
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('transform', (axis) => {
        axis.value = d3.max(this.props.scales) * 1.25;
        return `translate(${this.xyCoordinates(axis, axisScale).x}, ${
          this.xyCoordinates(axis, axisScale).y + 4
        })`;
      });
  };

  /**
   * set attributes and styling of the grid, make a table of data for each value in this.props.scales and draw it using this.drawPath()
   * @param {function} axisScale - the function to transform data into pixel position on the chart according to the axis scale
   */
  setGridAttr = (axisScale) => {
    d3.select(this.svgRootNode)
      .selectAll('.grid-line')
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .attr('fill', 'none')
      .attr('d', this.drawPath(axisScale));
  };

  /**
   * Make the path of the line according to data. use this.xyCoordinate() to plot it
   * @param {function} axisScale - the function to transform data into pixel position on the chart according to the axis scale
   */
  drawPath = (axisScale) => {
    return d3
      .line(
        (d) => this.xyCoordinates(d, axisScale).x,
        (d) => this.xyCoordinates(d, axisScale).y
      )
      .curve(d3.curveLinearClosed);
  };

  /**
   * Set the attributes of the area. path is drawn with this.drawPath()
   * @param {function} axisScale - the function to transform data into pixel position on the chart according to the axis scale
   */
  setAreaAttr = (axisScale) => {
    d3.select(this.svgRootNode)
      .select('.area')
      .datum(this.props.dataset)
      .attr('stroke', 'none')
      .attr('fill', giveOpacityToColorHex(COLORS.primaryAlt, 0.7))
      .attr('d', () => {
        return `${`M${this.chartCenter.x} ${this.chartCenter.y} `.repeat(
          this.props.axis.length
        )} z`;
      })
      .transition()
      .duration(LOADING_TRANSITION_SETTINGS.duration)
      .ease(LOADING_TRANSITION_SETTINGS.ease)
      .attr('d', this.drawPath(axisScale));
  };

  /**
   * set the attribute for the dataPoint to make appear on hovering the chart. initial opacity to 0 to make it invisible. Hovering a point make the tooltip appear. Use this.xyCoordinate() to plot them
   * @param {function} axisScale - the function to transform data into pixel position on the chart according to the axis scale
   */
  setDataPointsAttr = (axisScale) => {
    d3.select(this.svgRootNode)
      .select('.data-points')
      .selectAll('.data-point')
      .data(this.props.dataset)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (data) => this.xyCoordinates(data, axisScale).x)
      .attr('cy', (data) => this.xyCoordinates(data, axisScale).y)
      .attr('fill', 'white')
      .attr('stroke', 'rgba(255, 255, 255, 0.2)')
      .attr('r', 0)
      .attr('stroke-width', 0)
      .attr('opacity', 0)
      .on('mouseover', (mouseEvent) =>
        this.makeTooltipAppear(mouseEvent, axisScale)
      )
      .on('mouseout', this.makeTooltipDisappear);
  };

  /**
   * the function to be passed as call for the svg mouseenter to make appear the data points
   */
  makeDataPointsAppear = () => {
    d3.select(this.svgRootNode)
      .selectAll('.data-point')
      .attr('opacity', 1)
      .transition()
      .duration(200)
      .attr('r', 3)
      .attr('stroke-width', 8);
  };

  /**
   * the function to be passed as call for the svg mouseleave to make disappear the data points
   */
  makeDataPointsDisappear = () => {
    d3.select(this.svgRootNode)
      .selectAll('.data-point')
      .transition()
      .duration(200)
      .attr('r', 0)
      .attr('stroke-width', 0)
      .transition()
      .duration(0)
      .attr('opacity', 0);
  };

  /**
   * set the attribute for the tooltip (tootlip box, text and background), initial opacity to 0 to make it invisible
   */
  setTooltipAttr = () => {
    const svg = d3.select(this.svgRootNode);

    svg.select('.tooltip-box').attr('opacity', 0);

    svg
      .select('.tooltip-text')
      .attr('height', 24)
      .attr('alignment-baseline', 'middle')
      .attr('transform', 'translate(8, 12)')
      .attr('fill', 'black')
      .attr('font-size', 10)
      .text('');

    svg
      .select('.tooltip-background')
      .attr('height', 24)
      .attr('width', 0)
      .style('fill', 'white');
  };

  /**
   * the function to be passed as call for the data mouseover to make appear the tooltip (tootlip box, text and background + increase r of hovered data). use this.xyCoordinate() to place tooltip
   * @param {object} mouseEvent - the object containing event information
   * @param {function} axisScale - the function to transform data into pixel position on the chart according to the axis scale
   */
  makeTooltipAppear = (mouseEvent, axisScale) => {
    const data = mouseEvent.target.__data__;
    const dataCategory = this.props.axis.find(
      (axis) => axis.key === data.key
    ).name;
    const svg = d3.select(this.svgRootNode);

    svg.select('.tooltip-text').text(`${dataCategory} : ${data.value}`);

    svg
      .select('.tooltip-background')
      .attr('width', svg.select('.tooltip-text').node().getBBox().width + 16);

    const tooltipBoxXShift =
      data.key > this.props.dataset.length / 2
        ? (svg.select('.tooltip-background').node().getBBox().width + 6) * -1
        : 6;

    svg
      .select('.tooltip-box')
      .attr(
        'transform',
        `translate(${
          this.xyCoordinates(data, axisScale).x + tooltipBoxXShift
        },${this.xyCoordinates(data, axisScale).y - 32})`
      )
      .attr('opacity', 1);

    svg
      .selectAll('.data-point')
      .filter((dataPoint) => dataPoint.key === data.key)
      .transition()
      .duration(200)
      .attr('r', 5)
      .attr('stroke-width', 4);
  };

  /**
   * the function to be passed as call for the data mouseout to make disappear the tooltip tootlip box, text and background + reset r of hovered data)
   */
  makeTooltipDisappear = () => {
    const svg = d3.select(this.svgRootNode);
    svg.select('.tooltip-box').attr('opacity', 0).attr('transform', '');
    svg.select('.tooltip-text').text('');
    svg.select('.tooltip-background').attr('width', 0);

    svg
      .selectAll('.data-point')
      .transition()
      .duration(200)
      .attr('r', 3)
      .attr('stroke-width', 8);
  };

  /**
   * a function to transform an axis key (leading to angle) and a value to x/y coordinates on the chart. Need the scale function. +90deg is needed to start the chart from the top
   * @param {object} d - the data point containing a key key and a key value
   * @param {function} scaledValue  - the value after passing the scale function
   * @returns {object} - the x and y coordinates to plot the point in the chart
   */
  xyCoordinates = (d, axisScale) =>
    getxyFromPolar(
      (d.key / this.props.axis.length) * 360 + 90,
      axisScale(d.value),
      this.chartCenter
    );

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

/**
 * The propTypes for the RadarChart component
 * @memberof RadarChart
 */
RadarChart.propTypes = {
  title: propTypes.string,
  axis: propTypes.arrayOf(
    propTypes.shape({ key: propTypes.number, name: propTypes.string })
  ).isRequired,
  scales: propTypes.arrayOf(propTypes.number).isRequired,
  dataset: propTypes.arrayOf(
    propTypes.shape({ key: propTypes.number, value: propTypes.number })
  ).isRequired,
  containerWidth: propTypes.number.isRequired,
  containerHeight: propTypes.number.isRequired,
};

export default ComponentWithCurry(RadarChart);
