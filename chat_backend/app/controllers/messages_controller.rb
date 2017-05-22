class MessagesController < ApplicationController

  def create
    message = Message.new(message_params)
    message.user = User.find_or_create_by(username: params[:username])

    if message.save
      ActionCable.server.broadcast('messages', {
        message: message.content,
        user: message.user
      })

      head :ok
    else
      # ...
    end
  end

  private

    def message_params
      params.require(:messages).permit(:content, :chatroom_id)
    end
end
