import React, { Component } from 'react'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import io from 'socket.io-client'
import axios from 'axios'


class Chatroom extends Component {

  constructor() {
    super()
    this.socket = io(`${window.location.hostname}:5001`)
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

    this.socket.on('message-created', (message)=>{
      this.setState({messages: [message, ...this.state.messages,]})
    })
  }

  handleMessageCreate(msgState) {
    console.log(msgState);
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
