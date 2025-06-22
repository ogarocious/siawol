Rails.application.routes.draw do  
  root 'pages#home'
  get 'movies', to: 'pages#movies'
  get "up" => "rails/health#show", as: :rails_health_check
  get 'movies-test', to: 'pages#movies_test'

end
