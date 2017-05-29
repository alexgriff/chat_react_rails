class Message < ApplicationRecord
  default_scope { order(created_at: :desc)}
  belongs_to :user
  belongs_to :chatroom

end
