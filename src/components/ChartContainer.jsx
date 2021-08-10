import React, { Component } from 'react';
import { debounce } from '../utils/debounce';

export class ChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isContainerSized: false,
      containerWidth: 0,
      containerHeight: 0,
    };
    this.rescale = debounce(this.setDimensions, 500);
  }

  componentDidMount() {
    this.setDimensions();
    window.addEventListener('resize', this.resetDimensions);
    window.addEventListener('resize', this.rescale);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resetDimensions);
    window.removeEventListener('resize', this.rescale);
  }

  resetDimensions = () => {
    if (this.state.isContainerSized) this.setState({ isContainerSized: false });
  };

  setDimensions = () => {
    this.setState({
      isContainerSized: true,
      containerWidth: this.container.offsetWidth,
      containerHeight: this.container.offsetHeight,
    });
  };

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
