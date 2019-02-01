import React, { Component } from "react";
// import { cloneWithProps } from "react-clonewithprops";

// CSS from http://stackoverflow.com/questions/19064987/html-css-popup-div-on-text-click
// and http://stackoverflow.com/questions/10019797/pure-css-close-button
class LightboxModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.whiteContentStyles = {
      position: "fixed",
      top: "25%",
      left: "30%",
      right: "30%",
      backgroundColor: "#fff",
      color: "#7F7F7F",
      padding: "20px",
      border: "2px solid #ccc",
      borderRadius: "20px",
      boxShadow: "0 1px 5px #333",
      zIndex: "101"
    };
    this.blackOverlayStyles = {
      background: "black",
      opacity: ".5",
      position: "fixed",
      top: "0px",
      bottom: "0px",
      left: "0px",
      right: "0px",
      zIndex: "100"
    };
    this.closeTagStyles = {
      float: "right",
      marginTop: "-30px",
      marginRight: "-30px",
      cursor: "pointer",
      color: "#fff",
      border: "1px solid #AEAEAE",
      borderRadius: "30px",
      background: "#605F61",
      fontSize: "31px",
      fontWeight: "bold",
      display: "inline-block",
      lineHeight: "0px",
      padding: "11px 3px",
      textDecoration: "none"
    };
  }

  componentDidMount() {
    document.addEventListener(
      "keydown",
      function(e) {
        if (this.props.display && e.keyCode === 27) {
          this.props.closeLightbox();
        }
      }.bind(this)
    );
  }

  render() {
    for (var j in this.props) {
      if (j !== "children") {
        this.props.children.props[j] = this.props[j];
      }
    }

    if (this.props.display) {
      return (
        <div>
          <div style={this.blackOverlayStyles} />
          <div style={this.whiteContentStyles}>
            <a style={this.closeTagStyles}>&times;</a>
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

class LightboxTrigger extends Component {
  render() {
    for (var j in this.props) {
      if (j !== "children") {
        this.props.children.props[j] = this.props[j];
      }
    }
    return this.props.children;
  }
}

class Lightbox extends Component {
  constructor(props) {
    super(props);
    this.state = { display: false };
  }

  componentWillMount = () => {
    if (this.props.data) this.setState(this.props.data);
  };

  openLightbox = () => {
    this.setState({ display: true });
  };

  closeLightbox = () => {
    this.setState({ display: false });
  };

  setLightboxState = obj => {
    this.setState(obj);
  };

  render() {
    var childrenWithProps = this.props.children.map(function(child, i) {
      var childProps = {
        openLightbox: this.openLightbox,
        closeLightbox: this.closeLightbox,
        setLightboxState: this.setLightboxState,
        key: i
      };
      for (var j in this.state) {
        childProps[j] = this.state[j];
      }
      var childWithProps = React.cloneElement(child, childProps);
      return childWithProps;
    }, this);

    return <div>{childrenWithProps}</div>;
  }
}

module.exports = {
  Lightbox: Lightbox,
  LightboxModal: LightboxModal,
  LightboxTrigger: LightboxTrigger
};
/** export Lightbox;
export LightboxModal;
export LightboxTrigger;
**/
