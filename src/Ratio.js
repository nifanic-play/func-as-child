import React from "react";

/**
 * @typedef {Object} RatioProps
 * @property {number} x
 * @property {number} y
 */
/**
 * @typedef {Object} RatioState
 * @property {boolean} [hasComputed=false]
 */
/**
 * @typedef {Object} RatioShape
 * @property {number} [heigth=0]
 * @property {number} [width=0]
 */

export class Ratio extends React.Component {
  /** @type {RatioShape & RatioState} */
  state = {
    hasComputed: false,
    width: 0,
    height: 0
  };

  /**
   * @param {RatioProps | React.ReactNode} props
   * @return {RatioShape}
   */
  getComputedDimensions = props => {
    const { x, y } = props;
    const { width } = this.container.getBoundingClientRect();

    return {
      width,
      heigth: width * (y / x)
    };
  };

  /**
   * @param {RatioProps} nextProps
   * @param nextContext
   */
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.setState(this.getComputedDimensions(nextProps));
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
    /** @type {{RatioProps, RatioState}} */
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
