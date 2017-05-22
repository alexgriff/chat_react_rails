import React, { Component } from 'react'

class MessageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      username: 'JJ'
    }
  }

  handleChange(ev) {
    this.setState({
      content: ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({
      content: ''
    })
  }

  render() {
    return (
      <div className="MessageForm">
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
          <input
            type="text"
            value={this.state.content}
            onChange={(ev) => this.handleChange(ev)}
          />
        </form>
      </div>
    )
  }
}

export default MessageForm
