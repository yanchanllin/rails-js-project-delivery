Rails.application.routes.draw do
  get 'meal/name:string'
  get '/users/new', to: 'users#new', as: 'new_user'
 root 'static_pages#home'
 get '/users', to:'users#index', as: 'users'
 post '/users', to:'users#create'
 get '/users/:id', to: 'users#show', as: 'user'
 get '/users/:id/edit', to: 'users#edit', as: 'edit_user'
 get '/customers', to: 'customers#index', as: 'customers'
 get '/signin', to: 'session#new', as: 'signin'
 post '/session', to: 'session#create', as: 'session'
 delete '/session/', to: 'session#destroy'
 get '/customers/new', to: 'customers#new', as: 'new_customer'
 get '/customers/:id', to: 'customers#show', as: 'customer'
 get '/customers/:id/edit', to: 'customers#edit', as: 'edit_customer'
 patch '/customers/:id', to: 'customers#update'
 post '/customers', to: 'customers#create'
 get '/orders/new', to: 'orders#new', as: 'new_order'
 post '/orders', to:"orders#create", as: 'orders'
 get '/orders/:id', to:"orders#show", as: 'order'
 get '/orders/:id/edit', to: 'orders#edit', as: 'edit_order'
 #get 'customers/:customer_id/orders/new', to: 'orders#new', as: 'new_customer_order'
 #post '/customers/:id/orders', to: 'orders#create'
 patch '/orders/:id', to: 'orders#update'

 resources :customers do
  resources :orders 

 end
end
