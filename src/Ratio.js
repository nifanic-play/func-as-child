import React from "react";

export class Ratio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasComputed: false,
      width: 0,
      height: 0
    };
  }
  
  getComputedDimensions({ x, y }) {
    const { width } = this.container.getBoundingClientRect();
    
    return {
      width,
      heigth: width * (y / x)
    };
  }
  
  componentWillReceiveProps(nextProps) {
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
      () => {}
    );
    this.setState({
      hasComputed: true,
      ...this.getComputedDimensions(this.props)
    });
  };
  
  render() {
    return (
      <div ref={ref => (this.container = ref)}>
        {this.props.children(
          this.state.width,
          this.state.height,
          this.state.hasComputed
        )}
      </div>
    );
  }
}
