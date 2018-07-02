class SessionController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new,:create]

  def new
    @user = User.new
  end

def create 
  if request.env["omniauth.auth"]
   @user = User.find_or_create_by(uid: auth['uid']) do |u|
    u.name = auth['info']['name']
    u.email = auth['info']['email']
    u.image = auth['info']['image']
    session[:user_id] = @user.id

    redirect_to user_path(@user)
  end    
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
