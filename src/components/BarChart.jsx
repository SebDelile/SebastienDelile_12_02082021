import React, { Component } from 'react';
import * as d3 from 'd3';
import { fixJSfloatError } from '../utils/fixJSfloatError.js';
import { colors } from '../utils/colors.js';

/**
 * Render a barchart
 * @extends Component
 * @param {object} props
 * @param {array} props.title - the title of the chart
 * @param {object} props.xAxis - the details of the x Axis data (name, unit)
 * @param {array} props.series -  is a table of object, each one contains the details of the data serie (name, unit, color, starting from zero or not, y axis displayed or not). Make sure the sequence of serie is the same between this and series and dataset
 * @param {array} dataset - the processed data to make the barchart. Aray of object, object avec a key "x" containing x value and a key "y" containing a table with a y value for each serie.
 * @param {object} margin - the margin top, bottom, left, right for the chart inside its container
 * @param {number} chartWidth - the width of the chart (container - margins)
 * @param {number} chartHeight - the height of the chart (container - margins)
 * @param {number} yAxisSerieIndex - the index of the serie to use to build the y axis
 * @param {number} headerMargin - the margin.top for both title and legend
 */
export class BarChart extends Component {
  constructor(props) {
    super(props);
    this.margin = {
      top: 0.33 * this.props.containerHeight,
      bottom: 0.16 * this.props.containerHeight,
      left: 0.05 * this.props.containerWidth,
      right: 0.1 * this.props.containerWidth,
    };
    this.chartWidth =
      this.props.containerWidth - this.margin.left - this.margin.right;
    this.chartHeight =
      this.props.containerHeight - this.margin.top - this.margin.bottom;
    this.yAxisSerieIndex = this.props.series.findIndex((serie) => serie.isAxis);
    this.headerMargin = this.margin.top / 3;
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

    svg.append('text').attr('class', 'title');

    const legendItems = svg
      .append('g')
      .attr('class', 'legend')
      .selectAll('g.category')
      .data(this.props.series)
      .enter()
      .append('g')
      .attr('class', 'category');

    legendItems.append('circle');

    legendItems.append('text');

    const chart = svg.append('g').attr('class', 'chart');

    chart.append('g').attr('class', 'yGrid');

    chart.append('rect').attr('class', 'hoveredData');

    chart.append('g').attr('class', 'xAxis');

    chart.append('g').attr('class', 'yAxis');

    chart
      .selectAll('g.barsSet')
      .data(this.props.series)
      .enter()
      .append('g')
      .attr('class', 'barsSet');

    const tooltip = chart.append('g').attr('class', 'tooltip');
    tooltip.append('rect').attr('class', 'tooltipBackground');
    tooltip
      .selectAll('tooltipText')
      .data(this.props.series)
      .enter()
      .append('text')
      .attr('class', 'tooltipText');
  };

  /**
   * set the x Axis scale (range and domain). -0.5 and +0.5 in domain lead to equal width for all data point.
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
   * take the serie and calculate a wider domain than the .nice() d3 method. It especially avoids a data to be equal to the minimum of the domain and so the corresponding bar to be 0px height
   * @param {*} serie - the serie for which the domain is built
   * @param {*} index - the index of this serie in the table this.props.dataset and this.props.series
   * @returns {object} - object with the values for the minimum of the domain, the maximum of the domain and the step value
   */
  setyDomain = (serie, index) => {
    const max = d3.max(this.props.dataset, (data) => data.y[index]);
    const min = serie.isFromZero
      ? 0
      : d3.min(this.props.dataset, (data) => data.y[index]);

    const delta = max - min;
    const step = delta / 3;

    const rounder = 10 ** Math.floor(Math.log10(step));
    const stepRounded = Math.ceil(step / rounder) * rounder;

    const minRounded =
      min === 0
        ? 0
        : min - Math.floor(min / stepRounded) * stepRounded >= stepRounded / 3
        ? Math.floor(min / stepRounded) * stepRounded
        : Math.floor(min / stepRounded) * stepRounded - stepRounded;
    const maxRounded = Math.ceil(max / stepRounded) * stepRounded;

    return {
      minRounded: minRounded,
      maxRounded: maxRounded,
      stepRounded: stepRounded,
    };
  };

  /**
   * set the y Axis scale (range and domain). use the enlarge domain provided by this.setyDomain(). range is flipped to have a bottom-up axis. However the conversion to used for data is then y = max - f(x)
   * @returns {function} - a function to be used to convert data in chart position/lenght
   */
  setyAxisScale = () => {
    return this.props.series.map((serie, index) => {
      const { minRounded, maxRounded } = this.setyDomain(serie, index);
      return d3
        .scaleLinear()
        .range([this.chartHeight, 0])
        .domain([minRounded, maxRounded]);
    });
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
   * set attributes and styling of the title of the chart
   */
  setTitleAttr = () => {
    d3.select(this.svgRootNode)
      .select('.title')
      .attr(
        'transform',
        'translate(' +
          (this.margin.left * 3) / 4 +
          ', ' +
          this.headerMargin +
          ')'
      )
      .attr('font-size', 15)
      .attr('alignment-baseline', 'middle')
      .attr('fill', colors.secondaryAlt)
      .text(this.props.title);
  };

  /**
   * set attributes and styling of the legend of the chart
   */
  setLegendAttr = () => {
    const legendItems = d3
      .select(this.svgRootNode)
      .selectAll('.legend .category');

    legendItems
      .select('circle')
      .attr('fill', (serie) => serie.color)
      .attr('r', 4);

    legendItems
      .select('text')
      .attr('font-size', 14)
      .attr('font-family', 'monospace')
      .attr('fill', colors.tertiary)
      .text((serie) => `${serie.name} (${serie.unit})`)
      .attr('dx', 15)
      .attr('alignment-baseline', 'middle');

    legendItems.attr('transform', (el, i) => {
      const interPadding = 32;
      const rightPadding = 24;
      const elementRightAlign =
        this.props.containerWidth -
        rightPadding -
        legendItems.nodes()[i].getBBox().width;
      const shiftDueToOtherElements = (elementIndex) =>
        d3.sum(this.props.series, (el, j) =>
          j > elementIndex
            ? legendItems.nodes()[j].getBBox().width + interPadding
            : 0
        );

      return `translate(${elementRightAlign - shiftDueToOtherElements(i)}, ${
        this.headerMargin
      })`;
    });
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
   * set attributes and styling of the x Axis
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
          .tickFormat(d3.format('.0f'))
      );
    xAxis
      .select('path.domain')
      .attr('stroke', colors.lightGrey)
      .attr('stroke-width', 1);

    xAxis
      .selectAll('text')
      .attr('font-size', 14)
      .attr('text-anchor', 'middle')
      .attr('fill', colors.tertiaryAlt)
      .attr('transform', 'translate(0, ' + (this.margin.bottom / 2 - 10) + ')');
  };
  /**
   * set the tick values according to the ydomain from this.setyDomain()
   * @returns {array} - table of value to be used as tick values by both the y axis and the y grid
   */
  setTicksValues = () => {
    const { minRounded, maxRounded, stepRounded } = this.setyDomain(
      this.props.series[this.yAxisSerieIndex],
      this.yAxisSerieIndex
    );
    return new Array(
      fixJSfloatError((maxRounded - minRounded) / stepRounded + 1)
    )
      .fill(null)
      .map((value, index) => fixJSfloatError(minRounded + index * stepRounded));
  };

  /**
   * set attributes and styling of the y Axis, use the ticks from this.setTickValues()
   */
  setyAxisAttr = (yAxisScale) => {
    const yAxis = d3
      .select(this.svgRootNode)
      .select('.yAxis')
      .attr('transform', 'translate(' + this.chartWidth + ', 0)')
      .call(
        d3.axisRight(yAxisScale).tickSize(0).tickValues(this.setTicksValues())
      );

    yAxis.select('path.domain').attr('stroke', 'none');

    yAxis
      .selectAll('text')
      .attr('font-size', 14)
      .attr('fill', colors.tertiaryAlt)
      .attr('transform', 'translate(' + this.margin.right / 2 + ', 0)')
      .attr('text-anchor', 'middle');
  };

  /**
   * set attributes and styling of the y Grid, use the ticks from this.setTickValues()
   */
  setyGridAttr = (yAxisScale) => {
    const yGrid = d3
      .select(this.svgRootNode)
      .select('.yGrid')
      .call(
        d3
          .axisRight(yAxisScale)
          .tickSize(this.chartWidth)
          .tickFormat('')
          .tickValues(this.setTicksValues())
      );
    yGrid
      .selectAll('.tick line')
      .attr('stroke', colors.lightGrey)
      .attr('stroke-dasharray', 2)
      .attr('stroke-width', 1)
      .filter((line) => line === this.setTicksValues()[0])
      .attr('stroke', 'none');

    yGrid.select('path.domain').attr('stroke', 'none');
  };

  /**
   * Draw a path to represent the bar inclunding position and size
   * @param {number} x - starting x position of the bar (bottom-left)
   * @param {number} y - starting y position of the bar (bottom-left)
   * @param {number} height - height of the bar
   * @param {number} index  - index of the serie in the this.props.series table
   * @returns
   */
  drawBar = (x, y, height, index) => {
    const barWidth = 7;
    const barRadius = 3;
    const barPadding = 8;
    const numberOfSeries = this.props.series.length;
    const v = height <= barRadius ? 0 : height - barRadius;
    const rad = height <= barRadius ? height : barRadius;
    const h = barWidth - 2 * rad;
    const allBarWidth = numberOfSeries * (barWidth + barPadding) - barPadding;
    const shift = index * (barWidth + barPadding) - allBarWidth / 2;
    return `
    M${x + shift},${y}
    v${-v}
    q${0},${-rad} ${rad},${-rad}
    h${h}
    q${rad},${0} ${rad},${rad}
    v${v}
    z
  `;
  };

  /**
   * Set the attributes of the bars. Loop forEach to do it for all series. include the path drawing with this.drawbar() with a bottom-up transition
   * @param {function} xAxisScale - the x Axis scale function
   * @param {function} yAxisScale - the y Axis scale function
   */
  setBarsAttr = (xAxisScale, yAxisScale) => {
    this.props.series.forEach((serie, index) => {
      const bars = d3
        .select(this.svgRootNode)
        .selectAll('.barsSet')
        .filter((bars) => bars.name === serie.name);

      bars.selectAll('path').data(this.props.dataset).exit().remove();

      bars
        .selectAll('path')
        .data(this.props.dataset)
        .enter()
        .append('path')
        .attr('fill', this.props.series[index].color)
        .attr('d', (data) =>
          this.drawBar(xAxisScale(data.x), this.chartHeight, 0, index)
        )
        .on('mouseover', (e) => {
          this.makeHoveredDataAppear(e);
          this.makeTooltipAppear(e);
        })
        .on('mouseout', (e) => {
          this.makeHoveredDataDisappear(e);
          this.makeTooltipDisappear(e);
        })
        .transition()
        .duration(1000)
        .ease(d3.easeCubicOut)
        .attr('d', (data) =>
          this.drawBar(
            xAxisScale(data.x),
            this.chartHeight,
            this.chartHeight - yAxisScale[index](data.y[index]),
            index
          )
        );
    });
  };

  /**
   * set the attribute for the rect underlayer of hovered data, initial opacity to 0 to make it invisible
   */
  setHoveredDataAttr = () => {
    d3.select(this.svgRootNode)
      .select('.hoveredData')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.chartWidth / this.props.dataset.length + 1)
      .attr('height', this.chartHeight)
      .attr('fill', colors.grey)
      .style('opacity', 0);
  };

  /**
   * the function to be passed as call for the data mouseover to make appear the rect underlayer of hovered data
   * @param {event} mouseEvent - the fired event on mouseover
   */
  makeHoveredDataAppear = (mouseEvent) => {
    const data = mouseEvent.target.__data__;
    d3.select(this.svgRootNode)
      .select('.hoveredData')
      .attr('x', (data.x - 1) * (this.chartWidth / this.props.dataset.length))
      .transition()
      .duration(200)
      .style('opacity', 0.5);
  };

  /**
   * the function to be passed as call for the data mouseout to make disappear the rect underlayer
   */
  makeHoveredDataDisappear = () => {
    d3.select(this.svgRootNode)
      .select('.hoveredData')
      .transition()
      .duration(200)
      .style('opacity', 0);
  };

  /**
   * set the attribute for the tooltip. initial opacity to 0 to make it invisible
   */
  setTooltipAttr = () => {
    d3.select(this.svgRootNode).select('.tooltip').attr('opacity', 0);

    d3.select(this.svgRootNode)
      .selectAll('.tooltipText')
      .attr('height', 32)
      .attr('alignment-baseline', 'middle')
      .attr(
        'transform',
        (serie, index) => `translate(8, ${(index + 0.5) * 32})`
      )
      .attr('fill', 'white')
      .attr('font-size', 10)
      .text('');
    d3.select(this.svgRootNode)
      .select('.tooltipBackground')
      .attr('height', 64)
      .attr('width', 0)
      .style('fill', colors.primary);
  };

  /**
   * the function to be passed as call for the data mouseover to make appear the tooltip. add data to the textcontent of the tootip
   * @param {event} mouseEvent - the fired event on mouseover
   */
  makeTooltipAppear = (mouseEvent) => {
    const data = mouseEvent.target.__data__;
    const texts = d3
      .select(this.svgRootNode)
      .selectAll('.tooltipText')
      .text((serie, index) => `${data.y[index]}${serie.unit}`);
    d3.select(this.svgRootNode)
      .select('.tooltip')
      .attr(
        'transform',
        `translate(${
          data.x * (this.chartWidth / this.props.dataset.length) + 12
        },-32)`
      )
      .transition()
      .duration(200)
      .style('opacity', 1);
    d3.select(this.svgRootNode)
      .select('.tooltipBackground')
      .attr(
        'width',
        d3.max(texts.nodes(), (node) => node.getBBox().width) + 16
      );
  };

  /**
   * the function to be passed as call for the data mouseout to make disappear the tooltip. text and width are reset.
   */
  makeTooltipDisappear = () => {
    d3.select(this.svgRootNode).selectAll('.tooltipText').text('');
    d3.select(this.svgRootNode)
      .select('.tooltip')
      .transition()
      .duration(200)
      .style('opacity', 0);
    d3.select(this.svgRootNode).select('.tooltipBackground').attr('width', 0);
  };

  /**
   * The function calling all other functions to update the chart including chart/axis/bars/tooltip/... for content/size/position/...
   */
  updateBarChart = () => {
    const xAxisScale = this.setxAxisScale();
    const yAxisScale = this.setyAxisScale();
    this.setSvgAttr();
    this.setTitleAttr();
    this.setLegendAttr();
    this.setChartAttr();
    this.setxAxisAttr(xAxisScale);
    this.setyAxisAttr(yAxisScale[this.yAxisSerieIndex]);
    this.setyGridAttr(yAxisScale[this.yAxisSerieIndex]);
    this.setBarsAttr(xAxisScale, yAxisScale);
    this.setHoveredDataAttr();
    this.setTooltipAttr();
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
