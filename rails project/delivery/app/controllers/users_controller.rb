class UsersController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new,:create]
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
    @user = User.find_by(id:params[:id])
  end

  private
  def user_params
    params.require(:user).permit(
      :name,
      :password
      )
  end
end
