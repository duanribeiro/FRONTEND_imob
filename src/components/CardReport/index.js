import React from 'react'
import ReactDOM from 'react-dom';
import "./styles.scss"


class Button extends React.Component {
  render() {
    return (
      <button className="button button-primary">
        <i className="fa fa-chevron-right"></i> Find out more
      </button>
    )
  }
}

class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        {this.props.title}
        <div className="body-content">{this.props.text}</div>
      </div>
    )
  }
}

class CardReport extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <article className="card">
        <CardBody title={this.props.title} text={this.props.text}/>
      </article>
    )
  }
}

export default CardReport