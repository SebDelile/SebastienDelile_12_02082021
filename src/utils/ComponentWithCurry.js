/**
 * Needded for propTypes to work properly while the props are added to children after cloning (higher-order component like ChartContainer)
 * See this thread : https://github.com/facebook/react/issues/6653
 * @memberof utils
 * @param {ReactElement} Component - the component to pass
 * @returns {ReactElement} the same component with the props inclunding those given by the higher-order component
 */
const ComponentWithCurry = (Component) => (props) => <Component {...props} />;

export default ComponentWithCurry;
