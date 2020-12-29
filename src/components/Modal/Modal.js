import { Component } from "react";
import ReactDom from "react-dom";
import "./Modal.css";
// the code below is the standard way to create a modal in react

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDom.createPortal(this.props.children, this.el);
  }
}

export default Modal;
