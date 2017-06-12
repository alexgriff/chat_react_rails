## Chat Application with Sockets: React and Rails


### Rails Setup and Notes

First you'll need a route for your socket to emit from the server and connect to from the client:

`routes.rb`

```ruby
Rails.application.routes.draw do
	mount ActionCable.server => '/cable'
	...
end
```

We'll need to allow all client's the ability to connect to our new socket url. Just enabling cors is not enough because our socket has it's own protection again forgery. Make sure the following line is in your project:

`config/environments/development.rb`

```ruby
config.action_cable.disable_request_forgery_protection = true
```

Last, you'll need to setup your channels over which specific actions take place. The above code sets up the initial connection between your server and the many clients connecting to it. Now, you need a way to emit different actions over that connection. For example, the action for creating a message and the action for creating a chatroom should be differnt. You don't want your entire frontend to re-render every time a new chatroom is added if you're not interacting with that part of the site. Here's what we used to create our channel for messages:

`app/channels/messages_channel.rb`

```ruby
class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
  end

  def receive(payload)
    message = Message.new(content: payload["content"])
    message.user = User.first
    message.chatroom = Chatroom.first
    message.save
    ActionCable.server.broadcast('messages', MessageSerializer.new(message))
  end
end
```

**Note:** Your payload argument should be a JSON object, meaning that each key is a **string** not a symbol!

`subscribed` is opening a channel for our client to connect to. The only thing we're doing in this method is opening the channel and naming the channel with `stream_from`. We could have chosen any string, but we decided to call it 'messages'. When our client connects to the `MessagesChannel` it will run the `subscribed` method which will listen to the 'messages' channel. This string of 'messages' will be used to reference this open channel with our client. So when we update something in our `receive` method we need to tell our connection to broadcast that change over the 'messages' channel that was opened in `subscribe`.

### React Setup and Notes

`$ npm install --save actioncable`

If you're curious - this package gives us access to the rails actioncable environment typically used through the rails asset pipeline.

`index.js`

```javascript
import actionCable from 'actioncable'

const CableApp = {}

CableApp.cable = actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`)

ReactDOM.render(<App cableApp={CableApp}/>, document.getElementById('root'));
```

`CableApp` is a constructed object that we'll be adding more key's to for our actioncable construction. The first key `cable` is our client's initial connection to the server's web socket over the ActionCable url discussed above. We then want to pass that `CableApp` object down into the component that is handling our fetch and displaying of data. We should also be able to use `context` to perform this same functionality.

From the component that you would like to fetch information from you'll need to hookup your client to the server channel that will stream this data. This will be handled in the `ComponentDidMount` life cycle method:

```javascript
componentDidMount() {
  this.props.cableApp.messages = this.props.cableApp.cable.subscriptions.create('MessagesChannel', 
  { 
    received: (message) => this.setState({ messages: [message, ...this.state.messages,] }) 
  })
}
```

This is effectively connecting this component to the MessagesChannel channel on the server. This line will run the `subscribed` function on that MessagesChannel object. Now, when anything is emitted over the `messages` stream from our `receive` method on the server our `received:` key in the above object will run with the return from the `receive` method.

Last, we need to send over our data through the open socket connection:

```javascript
handleMessageCreate(msgState) {
  this.props.cableApp.messages.send({content: msgState.content})
}
```
We're using the `handleMessageCreate` method as a callback from an onSubmit event. Other than that we're handling the xhr request over the messages channel we established and passing in the object to be used as the `payload` in `receive`.