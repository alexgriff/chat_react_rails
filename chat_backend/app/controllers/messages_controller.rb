class MessagesController < ApplicationController

  def create
    # message = Message.first
    message = Message.new(content: params[:content])
    # message.user = User.find_or_create_by(username: params[:username])
    message.user = User.first
    message.chatroom = Chatroom.first

    if message.save
      # ActionCable.server.broadcast('messages', {
      #   message: message.content,
      #   user: message.user
      # })

      # head :ok
      render json: {message_created: true}, status: :ok
      $redis.publish('message-created', MessageSerializer.new(message).to_json)
    else
      # ...
    end
  end

  private

    def message_params
      params.require(:messages).permit(:content, :chatroom_id)
    end
end
