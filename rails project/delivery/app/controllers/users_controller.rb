class UsersController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new,:create]

  
  def index
    @users = User.all
  end 

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
     if @user.save
        @user.save
      redirect_to user_path(@user.id)
    else
      flash.now[:error] = 'Invalid signup,can not be blank' 
      render 'new'
    end
  end

  def show
    if logged_in
    @user = User.find_by(id:params[:id])
  else
    redirect_to '/'
   end
  end

  def edit
    @user = User.find(params[:id])
end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
        redirect_to @user
    else
        render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to root_path
end

  private
  def user_params
    params.require(:user).permit(
      :name,
      :password
      )
  end
end
