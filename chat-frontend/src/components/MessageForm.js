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
    console.log('in handleSubmit');
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
          {/* <div>
            Select your Username or Join this Chatroom:
          </div>
          <div className="ui input">
            <select name="" id="">
              {
                this.props.users.map( user => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="ui input">
            <input type="" placeholder="Enter a new username"/>
          </div> */}
        </form>
      </div>
    )
  }
}

export default MessageForm
