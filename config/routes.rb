Rails.application.routes.draw do
  root to: 'home#index'
  devise_for :users
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  resources :wears, only: [:index, :create], defaults: {format: 'json'}
  get '/recommend' => 'home#recommend'
  get '/outfit' => "home#outfit"
end
