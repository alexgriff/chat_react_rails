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
