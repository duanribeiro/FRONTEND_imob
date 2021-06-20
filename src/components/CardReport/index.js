import React from 'react'
import "./styles.scss"


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