class ChatroomsController < ApplicationController
  def show
    chatroom = Chatroom.find_by(id: params[:id])

    render json: chatroom
  end

  def index
  end
end
