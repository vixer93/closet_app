Rails.application.routes.draw do
  root to: 'wears#index'
  devise_for :users
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  resources :wears, only: [:index, :create]
end
