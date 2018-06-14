class SessionController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new,:create]

  def new
    @user = User.new
  end

def create

  @user = User.find_or_create_by(uid: auth['uid']) do |u|
    u.name = auth['info']['name']
    u.password = "password"
  end
  
  session[:user_id] = @user.id
  
  #render 'static_pages/home'
  redirect_to user_path(@user)
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