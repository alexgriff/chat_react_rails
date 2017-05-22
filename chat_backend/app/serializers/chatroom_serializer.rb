class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :topic
  has_many :messages
end
