class SessionController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new,:create]

  def new
    @user = User.new
  end

def create  
  if auth_hash= request.env['omniauth.auth']
    raise auth_hash.inspect 
  else 
    @user = User.find_by(name:params[:user][:name])
    if @user && @user.authenticate(params[:password])
    session[:user_id] = @user.id
    redirect_to user_path(@user)
    else 
      render 'sessions/new'
    end
  end 
end

def destroy
    session.delete("user_id")
  redirect_to root_path
end 

  private
 
  def auth
    request.env['omniauth.auth']
  end
end 
