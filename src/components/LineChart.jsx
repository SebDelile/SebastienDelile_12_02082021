import React, { Component } from 'react';
import * as d3 from 'd3';
import { colors } from '../utils/colors.js';

/**
 * Render a linechart
 * @extends Component
 * @param {object} props
 * @param {array} props.title - the title of the chart
 * @param {object} props.xAxis - the details of the x Axis data (name, unit)
 * @param {object} props.serie -  the details of the data serie (name, unit, color)
 * @param {array} dataset - the processed data to make the barchart. Aray of object, object avec a key "x" containing x value and a key "y" containing a y value.
 * @param {object} margin - the margin top, bottom, left, right for the chart inside its container
 * @param {number} chartWidth - the width of the chart (container - margins)
 * @param {number} chartHeight - the height of the chart (container - margins)
 * @param {function} xAxisLabel - a function to convert x data into readable label for the axis
 */
export class LineChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: 80,
      bottom: 40,
      left: 0,
      right: 0,
    };
    this.chartWidth =
      this.props.containerWidth - this.margin.left - this.margin.right;
    this.chartHeight =
      this.props.containerHeight - this.margin.top - this.margin.bottom;
  }

  /**
   * Initialize the chart with create chart and then put the data inside
   */
  componentDidMount() {
    this.createBarChart();
    this.updateBarChart();
  }

  /**
   * Update all the chart, including axis size, position ... Might be launch on window resize
   */
  componentDidUpdate() {
    this.updateBarChart();
  }

  /**
   * Create and append all the element in the chart. Must be call only once to avoid mismatch between DOM and shadow DOM (so called by componentDidMount)
   */
  createBarChart = () => {
    const svg = d3.select(this.svgRootNode);

    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'lineGradient');
    gradient.append('stop').attr('class', 'start');
    gradient.append('stop').attr('class', 'end');

    svg.append('text').attr('class', 'title');

    svg.append('rect').attr('class', 'tooltip-shadowing-data');

    const chart = svg.append('g').attr('class', 'chart');

    chart.append('g').attr('class', 'xAxis');

    chart.append('path').attr('class', 'line');

    const tooltip = chart.append('g').attr('class', 'tooltip-box');
    tooltip.append('rect').attr('class', 'tooltip-background');
    tooltip.append('text').attr('class', 'tooltip-text');

    chart.append('circle').attr('class', 'tooltip-focus');

    svg.append('rect').attr('class', 'overlay');
  };

  /**
   * The function calling all other functions to update the chart including chart/axis/bars/tooltip/... for content/size/position/...
   */
  updateBarChart = () => {
    this.setSvgAttr();
    this.setTitleAttr();
    this.setChartAttr();
    const xAxisScale = this.setxAxisScale();
    this.setxAxisAttr(xAxisScale);
    const yAxisScale = this.setyAxisScale();
    this.setLineGradientAttr();
    this.setLinesAttr(xAxisScale, yAxisScale);
    this.setOverlayAttr(xAxisScale, yAxisScale);
    this.setTooltipAttr();
  };

  /**
   * set attributes and styling of the svg element (the root of the chart)
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
    const titleAsArray = this.props.title.split(' ');
    const titleMaxWidth = this.chartWidth * 0.8;

    const title = d3
      .select(this.svgRootNode)
      .select('.title')
      .attr(
        'transform',
        'translate(' + this.props.containerWidth * 0.1 + ', 48)'
      )
      .attr('font-size', 15)
      .attr('fill', colors.semiTransparentWhite);

    title.selectAll('tspan').remove();

    const buildingLine = d3
      .select(this.svgRootNode)
      .append('text')
      .attr('font-size', 15);

    titleAsArray.forEach((word) => {
      if (buildingLine.text() === '') {
        buildingLine.text(word);
        title.append('tspan').attr('dy', 0).attr('x', 0).text(word);
      } else {
        buildingLine.text(buildingLine.text() + ' ' + word);
        if (buildingLine.node().getBBox().width <= titleMaxWidth) {
          title.select('tspan:last-of-type').text(buildingLine.text());
        } else {
          buildingLine.text(word);
          title.append('tspan').attr('dy', '1.2em').attr('x', 0).text(word);
        }
      }
    });
    buildingLine.remove();
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
   * @returns {function} - a function to be used to convert data in chart position/lenght
   */
  setxAxisScale = () => {
    return d3
      .scaleLinear()
      .range([0, this.chartWidth])
      .domain([
        d3.min(this.props.dataset, (data) => data.x) - 0.5,
        d3.max(this.props.dataset, (data) => data.x) + 0.5,
      ]);
  };

  /**
   * set attributes and styling of the x Axis. Convert day number into day letter
   */
  setxAxisAttr = (xAxisScale) => {
    const xAxis = d3
      .select(this.svgRootNode)
      .select('.xAxis')
      .attr('transform', 'translate(0,' + this.chartHeight + ')')
      .call(
        d3
          .axisBottom(xAxisScale)
          .tickSize(0)
          .tickValues(this.props.dataset.map((data) => data.x))
      );
    xAxis.select('path.domain').attr('stroke', 'none');

    xAxis
      .selectAll('text')
      .attr('font-size', 14)
      .attr('text-anchor', 'middle')
      .attr('fill', colors.semiTransparentWhite)
      .attr('transform', 'translate(0, 12)')
      .text((data) => this.props.xAxisLabel(data));
  };

  /**
   * set the y Axis scale (range and domain). range is flipped to have a bottom-up axis.
   * @returns {function} - a function to be used to convert data in chart position/lenght
   */
  setyAxisScale = () => {
    return d3
      .scaleLinear()
      .range([this.chartHeight, 0])
      .domain([
        d3.min(this.props.dataset, (data) => data.y),
        d3.max(this.props.dataset, (data) => data.y),
      ]);
  };

  /**
   * Make the path of the line according to data. Slight smooth used with monotoneX interpolation
   * @param {function} xAxisScale - the function to transform data into pixel position on the chart according to x axis
   * @param {function} yAxisScale - the function to transform data into pixel position on the chart according to y axis
   */
  drawLine = (xAxisScale, yAxisScale) => {
    return d3
      .line(
        (d) => xAxisScale(d.x),
        (d) => yAxisScale(d.y)
      )
      .curve(d3.curveMonotoneX);
  };

  /**
   * Set the linear gradient attribute for the line path
   */
  setLineGradientAttr = () => {
    const gradient = d3
      .select(this.svgRootNode)
      .select('#lineGradient')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '50%')
      .attr('y2', '50%');
    gradient
      .select('.start')
      .attr('offset', '0%')
      .attr('stop-color', 'white')
      .attr('stop-opacity', '50%');
    gradient
      .select('.end')
      .attr('offset', '100%')
      .attr('stop-color', 'white')
      .attr('stop-opacity', '90%');
  };

  /**
   * Set the attributes of the lines. line is drawn with this.drawLine()
   * @param {function} xAxisScale - the function to transform data into pixel position on the chart according to x axis
   * @param {function} yAxisScale - the function to transform data into pixel position on the chart according to y axis
   */
  setLinesAttr = (xAxisScale, yAxisScale) => {
    d3.select(this.svgRootNode)
      .select('.line')
      .datum(this.props.dataset)
      .attr('d', this.drawLine(xAxisScale, yAxisScale))
      .attr('stroke', 'url(#lineGradient)')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  };

  /**
   * Set the attribute to the overlay (needed for mouse event on the chart)
   * @param {function} xAxisScale - the function to transform data into pixel position on the chart according to x axis
   * @param {function} yAxisScale - the function to transform data into pixel position on the chart according to y axis
   */
  setOverlayAttr = (xAxisScale, yAxisScale) => {
    d3.select(this.svgRootNode)
      .select('.overlay')
      .attr('width', this.props.containerWidth)
      .attr('height', this.props.containerHeight)
      .attr('opacity', 0)
      .on('mouseover', this.makeTooltipAppear)
      .on('mousemove', (mouseEvent) => {
        this.makeTooltipUpdate(mouseEvent, xAxisScale, yAxisScale);
      })
      .on('mouseout', this.makeTooltipDisappear);
  };

  /**
   * set the attribute for the tooltip (data shadowing, data focus and tootlip box), initial opacity to 0 to make it invisible
   */
  setTooltipAttr = () => {
    const svg = d3.select(this.svgRootNode);
    svg
      .select('.tooltip-shadowing-data')
      .attr('x', this.props.containerWidth)
      .attr('y', 0)
      .attr('width', 0)
      .attr('height', this.props.containerHeight)
      .attr('fill', 'black')
      .style('opacity', 0);

    svg
      .select('.tooltip-focus')
      .attr('r', 4)
      .attr('fill', 'white')
      .attr('stroke', 'rgba(255, 255, 255, 0.2)')
      .attr('stroke-width', 5)
      .attr('opacity', 0);

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
   * the function to be passed as call for the data mouseover to make appear the tooltip (data shadowing, data focus and tootlip box)
   */
  makeTooltipAppear = () => {
    const svg = d3.select(this.svgRootNode);
    svg.select('.tooltip-shadowing-data').style('opacity', 0.1);

    svg.select('.tooltip-focus').attr('opacity', 1);

    svg.select('.tooltip-box').attr('opacity', 1);
  };

  /**
   * the function to be passed as call for the data mouseover to make update the tooltip (data shadowing, data focus and tootlip box)
   * @param {object} mouseEvent - the object containing event information
   * @param {function} xAxisScale - the function to transform data into pixel position on the chart according to x axis
   * @param {function} yAxisScale - the function to transform data into pixel position on the chart according to y axis
   */
  makeTooltipUpdate = (mouseEvent, xAxisScale, yAxisScale) => {
    const svg = d3.select(this.svgRootNode);
    const hoveredDataIndex = Math.floor(
      d3.pointer(mouseEvent)[0] / (this.chartWidth / this.props.dataset.length)
    );
    const hoveredDataX = xAxisScale(this.props.dataset[hoveredDataIndex].x);
    const hoveredDataY = yAxisScale(this.props.dataset[hoveredDataIndex].y);
    const tooltipBoxXShift =
      hoveredDataIndex > this.props.dataset.length / 2
        ? (svg.select('.tooltip-background').node().getBBox().width + 6) * -1
        : 6;
    svg
      .select('.tooltip-shadowing-data')
      .attr('x', hoveredDataX)
      .attr('width', this.chartWidth - hoveredDataX);

    svg
      .select('.tooltip-focus')
      .attr('transform', `translate(${hoveredDataX}, ${hoveredDataY})`);

    svg
      .select('.tooltip-text')
      .text(
        `${this.props.dataset[hoveredDataIndex].y}${this.props.serie.unit}`
      );

    svg
      .select('.tooltip-background')
      .attr('width', svg.select('.tooltip-text').node().getBBox().width + 16);

    svg
      .select('.tooltip-box')
      .attr(
        'transform',
        `translate(${hoveredDataX + tooltipBoxXShift}, ${hoveredDataY - 32})`
      );
  };

  /**
   * the function to be passed as call for the data mouseout to make disappear the tooltip (data shadowing, data focus and tootlip box)
   */
  makeTooltipDisappear = () => {
    const svg = d3.select(this.svgRootNode);
    svg
      .select('.tooltip-shadowing-data')
      .style('opacity', 0)
      .attr('x', this.chartWidth)
      .attr('width', 0);

    svg.select('.tooltip-focus').attr('opacity', 0).attr('transform', '');

    svg.select('.tooltip-box').attr('opacity', 0).attr('transform', '');
    svg.select('.tooltip-text').text('');
    svg.select('.tooltip-background').attr('width', 0);
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