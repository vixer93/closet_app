Rails.application.routes.draw do
  devise_for :users
  resources :wears
  root to: 'wears#index'
end
