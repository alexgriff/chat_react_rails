import React, { Component } from 'react'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import axios from 'axios'

class Chatroom extends Component {

  constructor() {
    super()
    this.state = {
      messages: [],
      topic: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get(`http://${window.location.hostname}:3000/chatrooms/${this.props.selectedChatroom}`)
      .then( response => {
        const { messages, topic, users } = response.data
        this.setState({
          messages,
          topic,
          users
         })
      })

    this.props.cableApp.messages = this.props.cableApp.cable.subscriptions.create('MessagesChannel', 
    { 
      received: (message) => this.setState({ messages: [message, ...this.state.messages,] }) 
    })
  }

  handleMessageCreate(msgState) {
    this.props.cableApp.messages.send({content: msgState.content})
  }

  render() {
    const { messages, topic, users } = this.state
    return (
      <div className="row">
        <MessageList topic={ topic } messages={ messages } />
        <MessageForm users={ users } onSubmit={(msgState) => this.handleMessageCreate(msgState)}/>
      </div>
    )
  }
}

export default Chatroom
