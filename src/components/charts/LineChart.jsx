import React, { Component } from 'react';
import * as d3 from 'd3';
import COLORS from '../../utils/COLORS.js';
import setNiceDomain from '../../utils/setNiceDomain.js';
import LOADING_TRANSITION_SETTINGS from '../../utils/LOADING_TRANSITION_SETTINGS.js';
import appendMultilineSvgText from '../../utils/appendMultilineSvgText.js';
import ComponentWithCurry from '../../utils/ComponentWithCurry.js';
import propTypes from 'prop-types';

/**
 * Render a linechart. Exported with curry to ensure the props from CharContainer are well checked
 * @memberof charts
 * @extends Component
 * @param {object} props
 * @param {string} props.title - the title of the chart
 * @param {object} props.xAxis - the details of the x Axis data (name, unit)
 * @param {object} props.serie -  the details of the data serie (name, unit, color)
 * @param {array} props.dataset - the processed data to make the linechart. Array of object, with a key "x" containing x value and a key "y" containing a y value.
 * @param {function} props.xAxisLabel - a function to convert x data into readable label for the axis
 * @param {number} props.containerWidth - the width of the container provided by ChartContainer
 * @param {number} props.containerHeight - the height of the container provided by ChartContainer
 * @param {object} margin - the margin top, bottom, left, right for the chart inside its container
 * @param {number} chartWidth - the width of the chart (container - margins)
 * @param {number} chartHeight - the height of the chart (container - margins)
 * @param {function} xAxisScale - the x scale function to convert data into position/length, updated in this.updateChart()
 * @param {function} yAxisScale - the y scale function to convert data into position/length, updated in this.updateChart()
 */
class LineChart extends Component {
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
    this.xAxisScale = null;
    this.yAxisScale = null;
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
  };

  /**
   * The function calling all other functions to update the chart including chart/axis/bars/tooltip/... for content/size/position/...
   */
  updateChart = () => {
    this.xAxisScale = this.setxAxisScale();
    this.yAxisScale = this.setyAxisScale();
    this.setSvgAttr();
    this.setTitleAttr();
    this.setChartAttr();
    this.setxAxisAttr();
    this.setLineGradientAttr();
    this.setLineAttr();
    this.setTooltipAttr();
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
   * set the y Axis scale (range and domain). range is flipped to have a bottom-up axis.
   * @returns {function} - a function to be used to convert data in chart position/lenght
   */
  setyAxisScale = () => {
    const { minRounded, maxRounded } = setNiceDomain(
      false,
      this.props.dataset.map((data) => data.y),
      8
    );
    return d3
      .scaleLinear()
      .range([this.chartHeight, 0])
      .domain([minRounded, maxRounded]);
  };

  /**
   * set attributes and styling of the svg element (the root of the chart). have the mouse event listener to make appear the tooltip
   */
  setSvgAttr = () => {
    d3.select(this.svgRootNode)
      .attr('width', this.props.containerWidth)
      .attr('height', this.props.containerHeight)
      .on('mouseenter', this.makeTooltipAppear)
      .on('mousemove', (mouseEvent) => {
        this.makeTooltipUpdate(mouseEvent);
      })
      .on('mouseleave', this.makeTooltipDisappear);
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
        'translate(' + this.props.containerWidth * 0.1 + ', 48)'
      )
      .attr('font-size', 15)
      .attr('fill', COLORS.semiTransparentWhite);
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
   * set attributes and styling of the x Axis. Convert day number into day letter
   */
  setxAxisAttr = () => {
    const xAxis = d3
      .select(this.svgRootNode)
      .select('.xAxis')
      .attr('transform', 'translate(0,' + this.chartHeight + ')')
      .call(
        d3
          .axisBottom(this.xAxisScale)
          .tickSize(0)
          .tickValues(this.props.dataset.map((data) => data.x))
      );
    xAxis.select('path.domain').attr('stroke', 'none');

    xAxis
      .selectAll('text')
      .attr('font-size', 14)
      .attr('text-anchor', 'middle')
      .attr('fill', COLORS.semiTransparentWhite)
      .attr('transform', 'translate(0, 12)')
      .text((data) => this.props.xAxisLabel(data));
  };

  /**
   * Make the path of the line according to data. rounded smooth using curveCardinal interpolation
   */
  drawLine = () => {
    return (
      d3
        .line(
          (d) => this.xAxisScale(d.x),
          (d) => this.yAxisScale(d.y)
        )
        //curveCardinal is the better to fit the design, HOWEVER it can lead to unrealistic values (example :session duration < 0)
        .curve(d3.curveCardinal)
    );
  };

  /**
   * Set the color linear gradient attribute for the line path
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
   * Set the attributes of the line. line is drawn with this.drawLine()
   */
  setLineAttr = () => {
    //Data are extrapolated to suit the design, HOWEVER, it should be better to plot a barchart for these discrete data (days)
    const leftExtrapolation = {
      x: d3.min(this.props.dataset, (data) => data.x) - 1,
      y: d3.mean(this.props.dataset, (data) => data.y),
    };
    const rightExtrapolation = {
      x: d3.max(this.props.dataset, (data) => data.x) + 1,
      y: d3.mean(this.props.dataset, (data) => data.y),
    };
    const extrapolatedDataset = [
      leftExtrapolation,
      ...this.props.dataset,
      rightExtrapolation,
    ];
    const path = d3
      .select(this.svgRootNode)
      .select('.line')
      .datum(extrapolatedDataset)
      .attr('d', this.drawLine(this.xAxisScale, this.yAxisScale))
      .attr('stroke', 'url(#lineGradient)')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
    path
      .attr('stroke-dasharray', path.node().getTotalLength())
      .attr('stroke-dashoffset', path.node().getTotalLength())
      .transition()
      .duration(LOADING_TRANSITION_SETTINGS.duration)
      .ease(LOADING_TRANSITION_SETTINGS.ease)
      .attr('stroke-dashoffset', 0);
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
      .attr('stroke-width', 10)
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
   * the function to be passed as call for the data mouseover to make update the tooltip (data shadowing, data focus and tootlip box). First check avoid crash on last point before leaving
   * @param {object} mouseEvent - the object containing event information
   */
  makeTooltipUpdate = (mouseEvent) => {
    if (d3.pointer(mouseEvent)[0] < 0) return;
    const svg = d3.select(this.svgRootNode);
    const hoveredDataIndex = Math.floor(
      d3.pointer(mouseEvent)[0] / (this.chartWidth / this.props.dataset.length)
    );
    const hoveredDataX = this.xAxisScale(
      this.props.dataset[hoveredDataIndex].x
    );
    const hoveredDataY = this.yAxisScale(
      this.props.dataset[hoveredDataIndex].y
    );
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

/**
 * The propTypes for the LineChart component
 * @memberof LineChart
 */
LineChart.propTypes = {
  title: propTypes.string,
  xAxis: propTypes.shape({
    name: propTypes.string,
    unit: propTypes.string,
  }),
  serie: propTypes.shape({
    name: propTypes.string,
    unit: propTypes.string,
    color: propTypes.string,
  }).isRequired,
  dataset: propTypes.arrayOf(
    propTypes.shape({
      x: propTypes.number,
      y: propTypes.number,
    })
  ).isRequired,
  xAxisLabel: propTypes.func,
  containerWidth: propTypes.number.isRequired,
  containerHeight: propTypes.number.isRequired,
};

export default ComponentWithCurry(LineChart);
