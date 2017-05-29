class Chatroom < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :users, -> { distinct }, through: :messages
  validates :topic, presence: true, uniqueness: true, case_sensitive: false
end
