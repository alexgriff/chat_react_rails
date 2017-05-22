class MessageSerializer < ActiveModel::Serializer
  attributes :id, :chatroom_id, :username, :content

  def username
    object.user.username
  end
end
