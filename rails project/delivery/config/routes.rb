Rails.application.routes.draw do 
  root'static_pages#home'
  get '/auth/facebook/callback'=>'sessions#create'
  get '/signin', to:'sessions#new', as:'signin'
  post '/sessions' ,to:'sessions#create'
  delete '/sessions/',to:'sessions#destroy'
 
  root 'static_pages#home'
  get '/meals/most_ordered_meal', to:'meals#most_ordered_meal'

  resources :meals do 
    resources :orders 
  end 
 
  resources :users
  resources :orders
end 
