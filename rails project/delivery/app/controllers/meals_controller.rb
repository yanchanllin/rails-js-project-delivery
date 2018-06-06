class MealsController < ApplicationController
  def index
    @meals = Meal.all
  end

  def show
    @meal = Meal.find_by(id: params[:id])
   
  end

  def new 
    @meal = Meal.new
   

  end

  def create 
    @meal = Meal.new(meal_params)
    @meal.save 
    redirect_to meals_path(@meal)
  end

  def edit
    @meal =  Meal.find_by(id: params[:id])
    @meal = @order. Meals.build(user_id:current_user.id)
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

