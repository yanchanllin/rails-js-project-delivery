Rails.application.routes.draw do 
  root'static_pages#home'
  get '/auth/facebook/callback'=>'sessions#create'
  root 'orders#index'

  resources :users, only: [:show] do
    resources :orders, to: 'users#orders'
  end

  resources :orders do 
    resources :meals
    resources :comments 
  end 

end 