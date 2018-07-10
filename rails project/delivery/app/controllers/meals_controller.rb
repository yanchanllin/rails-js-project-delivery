class MealsController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new,:create]
  def index
    @meals = Meal.all
  end

  def show
    @meal = Meal.find_by(id: params[:id])
    @order = current_user.orders.build(user_id:current_user.id)
  end

  def new 
    @meal = Meal.new

  end

  def create
    meal = Meal.create(meal_params)
    redirect_to meal_path(meal.id)
        # error me
  end

  def edit
    @meal =  Meal.find_by(id: params[:id])
    @order = @meal.orders.build(user_id:current_user.id)
  end

  def update
    meal =  Meal.find_by(id: params[:id])
    meal.update( meal_params)
    redirect_to meal_path(meal)
  end

  private
  def meal_params
    params.require(:meal).permit(
        :name
      )
  end
end

