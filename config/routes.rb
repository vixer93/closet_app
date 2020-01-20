Rails.application.routes.draw do
  resources :wears
  root to: 'wears#index'
end
