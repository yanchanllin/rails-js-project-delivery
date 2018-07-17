class SessionController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new,:create]

  def new
    @user = User.new
  end

def create 
  if request.env["omniauth.auth"]
    user = request.env["omniauth.auth"][:info][:name]
    if @user = User.find_by(name: user)
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      @user = User.new(name: request.env["omniauth.auth"][:info][:name], password: SecureRandom.hex(8))
      @user.save
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
