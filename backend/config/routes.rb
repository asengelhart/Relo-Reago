Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  get '/current_user', to: 'sessions#show'
  get '/logout', to: 'sessions#destroy'
  resources :descriptions
  resources :translations
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
