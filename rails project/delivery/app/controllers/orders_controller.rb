class OrdersController < ApplicationController
  def index
    @orders = Order.all
  end

  def show
    @order = Order.find_by(id: params[:id])
    @cutomer = @order.cutomers.build(user_id:current_user.id)
  end

  def new
    @order = Order.new
  end

  def create
    order = Order.create(order_params)
    redirect_to order_path(order)
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
        :name,
        :address,
        :phone,
        :description
      )
  end
end
