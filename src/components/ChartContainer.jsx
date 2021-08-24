import React, { Component } from 'react';
import debounce from '../utils/debounce';

/**
 * Render a chartContainer. This is a template to provide method to the chart containers components in order to pass width and height as props
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} state - the state of the component
 * @param {boolean} state.isContainerSized - turn to false until the final size is stable, then turn to true to pass the props
 * @param {number} state.containerWidth - the width of the container
 * @param {number} state.containerHeight - the height of the container
 * @param {function} rescale - passing debounce to the method setDimensions in order to have only one instance of this method fro the removeeventlistener
 */
class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isContainerSized: false,
      containerWidth: 0,
      containerHeight: 0,
    };
    this.rescale = debounce(this.setDimensions, 500);
  }

  /**
   * give first values to the state and add event listener on resize
   */
  componentDidMount() {
    this.setDimensions();
    window.addEventListener('resize', this.resetDimensions);
    window.addEventListener('resize', this.rescale);
  }

  /**
   * Remove the event listener on unmount
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.resetDimensions);
    window.removeEventListener('resize', this.rescale);
  }

  /**
   * allow to un-render the chart until the size is stabilized
   */
  resetDimensions = () => {
    if (this.state.isContainerSized) this.setState({ isContainerSized: false });
  };

  /**
   * set the state with width and height. Is called within a debounce to avoiding multiple call
   */
  setDimensions = () => {
    this.setState({
      isContainerSized: true,
      containerWidth: this.container.offsetWidth,
      containerHeight: this.container.offsetHeight,
    });
  };

  /**
   * Remove children if the size is not established (during debounce). they add the props to the children (only to reactElements)
   * @returns null or children with additionnal props
   */
  returnChildrenWithProps = () => {
    return React.Children.map(this.props.children, (child) => {
      if (!this.state.isContainerSized) return null;
      else {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isContainerSized: this.state.isContainerSized,
            containerWidth: this.state.containerWidth,
            containerHeight: this.state.containerHeight,
          });
        } else {
          return child;
        }
      }
    });
  };

  /**
   * Render the component.
   * @returns {Reactnode} jsx to be injected in the html
   */
  render() {
    return (
      <figure
        ref={(el) => (this.container = el)}
        className={this.props.className}
      >
        {this.returnChildrenWithProps()}
      </figure>
    );
  }
}

export default ChartContainer;
