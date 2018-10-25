class MealsController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new,:create]

  def index
    @meals = Meal.all
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @meals, include: :orders}
    end
  end

  def new 
    @meal = Meal.new
  end

  def show
    respond_to do |f|
      f.html
      f.json {render json: @meal}
    end
  end

  def create
    @meal = Meal.create(meal_params)
    if @meal.save
      @meal.save
    redirect_to meal_path(@meal.id), notice: 'New meal was saved'
    else 
      render :new, notice: 'new meal was NOT saved', alert: @meal.errors.full_messages
    end
  end

  def next
    @next_meal = @meal.next
    respond_to do |f|
      f.html {render @next_meal}
      f.json {render json: @next_meal}
    end
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

  def most_ordered_meal 
    @most_ordered_meal = Meal.most_ordered
  end 

  private

  def set_meal
    @meal = Meal.find(params[:id])
  end


  def meal_params
    params.require(:meal).permit(
        :name
      )
  end
end

