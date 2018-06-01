class OrdersController < ApplicationController
  def index
    @orders = Order.all
  end

  def show
    @order = Order.find_by(id: params[:id])
   
  end

  def new 
    @order = Order.new
    render template: 'orders/new'

  end

  def create 
    @order = Order.new(order_params)
    @order.customer = Customer.find_by(params[:customer_id])
    render template: 'orders/id'
  end

  def edit
    @order = Order.find_by(id: params[:id])
    @customer = @order.cutomers.build(user_id:current_user.id)
  end

  def update
    order = Order.find_by(id: params[:id])
    order.update(order_params)
    redirect_to order_path(order)
  end

  private
  def order_params
    params.require(:order).permit(
        :description,
        :customer_id,
        :user_id

      )
  end
end
