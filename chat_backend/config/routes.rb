Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  post '/messages', to: 'messages#create'

  get '/chatrooms', to: 'chatrooms#index'
  get '/chatrooms/:id', to: 'chatrooms#show'


end
