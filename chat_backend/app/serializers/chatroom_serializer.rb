class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :topic, :users
  has_many :messages

end
