class OrdersController < ApplicationController
  

  def index
    @orders = Order.all
  end

  def show
    @order = Order.find_by(id: params[:id])
   
  end

  def new 
    #@meal = Meal.find(params[:meal_id])
    
    @order = Order.new
    render template: 'orders/new'

  end

  def create
    # binding.pry
    @order = Order.new(order_params)
    current_user.orders << @order
    @order.save 
    redirect_to user_path(current_user)
  end

  def edit
    @order = Order.find_by(id: params[:id])
  
  end

  def update
    order = Order.find_by(id: params[:id])
    order.update(order_params)
    redirect_to user_path(current_user)
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
