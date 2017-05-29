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
      <div className="ui six wide column">
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
          <div className="ui icon fluid huge input">
            <i className="talk icon"></i>
            <input
              type="text"
              value={this.state.content}
              placeholder="Say something nice..."
              onChange={(ev) => this.handleChange(ev)}
            />
          </div>
          <div className="ui input">
            <select name="" id="">
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option value="4"></option>
            </select>
          </div>
        </form>
      </div>
    )
  }
}

export default MessageForm
