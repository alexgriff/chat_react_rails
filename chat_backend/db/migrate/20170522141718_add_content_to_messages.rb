class AddContentToMessages < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :content, :string
  end
end
