import React from "react";

/**
 * @callback FunctionAsChild
 * @param {RatioState}
 */
/**
 * @typedef {Object} RatioProps
 * @property {number} [x]
 * @property {number} [y]
 */
/**
 * @typedef {RatioShape} RatioState
 * @property {boolean} [hasComputed=false]
 */
/**
 * @typedef {Object} RatioShape
 * @property {number} height
 * @property {number} width
 */

export class Ratio extends React.Component {
  /** @param {Readonly<RatioProps>} props */
  constructor(props) {
    super(props);

    /** @type {RatioState} */
    this.state = {
      hasComputed: false,
      width: 0,
      height: 0
    };
  }

  /**
   * @param {Readonly<RatioProps>} props
   * @return {RatioShape}
   */
  getComputedDimensions = props => {
    const { x, y } = props;
    const { width } = this.container.getBoundingClientRect();

    return {
      width,
      height: width * (y / x)
    };
  };

  /**
   * @param {Omit<"children", RatioProps>} nextProps
   * @param {RatioState} prevState
   * @return {RatioProps | null}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const { x, y } = nextProps;
    const { x: prevX, y: prevY } = prevState;

    if (x === prevX || y === prevY) {
      return null;
    }

    return { x, y };
  }

  /**
   * @param {RatioProps} prevProps
   * @param {Readonly<RatioState>} prevState
   * @return {void}
   */
  componentDidUpdate(prevProps, prevState) {
    const { x, y } = this.props;

    if (prevProps.x !== x || prevProps.y !== y) {
      this.setState(this.getComputedDimensions(prevProps));
    }
  }

  componentDidMount() {
    this.setState({
      ...this.getComputedDimensions(this.props)
    });

    window.addEventListener("resize", this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }

  handleResize = () => {
    this.setState(
      {
        hasComputed: false
      },
      () => {
        this.setState({
          hasComputed: true,
          ...this.getComputedDimensions(this.props)
        });
      }
    );
  };

  render() {
    const {
      props: { children },
      state: { width, height, hasComputed }
    } = this;

    return (
      <div ref={ref => (this.container = ref)}>
        {children(width, height, hasComputed)}
      </div>
    );
  }
}

Ratio.defaultProps = {
  x: 3,
  y: 4
};
