import React from 'react'

export default (props) => {
  const messages = props.messages.map(msg => (
    <li key={msg.id}><b>{msg.username}:</b><p>{msg.content}</p></li>
  ))

  return (
    <div className="MessageList">
      <ul>
        { messages }
      </ul>
    </div>
  )
}
