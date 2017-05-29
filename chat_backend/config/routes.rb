Rails.application.routes.draw do

  post '/messages', to: 'messages#create'

  get '/chatrooms', to: 'chatrooms#index'
  get '/chatrooms/:id', to: 'chatrooms#show'

  mount ActionCable.server => '/cable'

end
