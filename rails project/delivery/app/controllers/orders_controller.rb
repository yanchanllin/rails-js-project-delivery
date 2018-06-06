class OrdersController < ApplicationController
  def index
    @orders = Order.all
  end

  def show
    @order = Order.find_by(id: params[:id])
   
  end

  def new 
    @meal = Meal.find(params[:meal_id])
    
    @order = @meal.orders.build
    render template: 'orders/new'

  end

  def create 
    @order = Order.new(order_params)
    @order.meal = Meal.find_by(params[:meal_id])
    @order.save 
    redirect_to order_path(@order)
  end

  def edit
    @order = Order.find_by(id: params[:id])
    @meal = @order.meals.build(user_id:current_user.id)
  end

  def update
    order = Order.find_by(id: params[:id])
    order.update(order_params)
    redirect_to order_path(order)
  end

  private
  def order_params
    params.require(:order).permit(
        :quantity,
        :meal_id,
        :user_id

      )
  end
end
