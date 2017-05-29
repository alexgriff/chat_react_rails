import React, { Component } from 'react'
import axios from 'axios'

class MessageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      username: ''
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
    axios.post(`http://${window.location.hostname}:3000/messages`, {content: this.state.content})
    this.setState({content: ''})
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
