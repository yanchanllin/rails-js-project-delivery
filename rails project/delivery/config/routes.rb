Rails.application.routes.draw do 
  root'static_pages#home'
  get '/auth/facebook/callback'=>'sessions#create'
  get '/signin', to:'sessions#new', as:'signin'
  post '/sessions' ,to:'sessions#create'
  delete '/sessions/',to:'sessions#destroy'
 
  root 'static_pages#home'
  get '/meals/most_ordered_meal', to:'meals#most_ordered_meal'
  post '/orders/add', to:"orders#add"

  resources :meals do 
    resources :orders do 
      resources :comments
    end 
  end 
  
  resources :comments, only: [:create, :show, :edit]
  resources :users
  resources :orders
end 
