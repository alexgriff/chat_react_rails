import React from 'react'

export default (props) => {
  const messages = props.messages.map(msg => {
    console.log(msg);
    return (<div key={msg.id} className="item">
      <div className="content">
        <div className="header">
          {msg.username}
        </div>
        <div className="description">
          {msg.content}
        </div>
      </div>
    </div>
  )
  })

  return (
    <div className="ui ten wide column">
      <div className="ui raised segment">
        <div className="ui relaxed divided list" >
          <div className="item">
            <h1>{props.topic}</h1>
          </div>
          { messages }
        </div>
      </div>
    </div>
  )
}
