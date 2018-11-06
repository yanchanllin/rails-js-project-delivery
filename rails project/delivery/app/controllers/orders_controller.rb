class OrdersController < ApplicationController
  

 def index
    @orders = Order.all 
    respond_to do |f|
      f.html
      f.json {render json: @orders}
    end 
  end
  
  def show
    respond_to do |f|
      f.html 
      f.json {render json: @order}
    end 
  end

  def new 
    @order = Order.new
  end

  def create
    @current_user = Meal.find(session[:meal_id]) if session[:meal_id]
    if @current_user.orders.create(order_params).valid?
      @current_user.orders.create(order_params)
      flash[:notice] = 'Order was successfully created.'
      redirect_to orders_path
  
    else
      redirect_to new_order_path
    end
  end

def highest_ordered
  @orders = Order.all

end

def users_orders
  @user = User.find_by_id(session[:user_id])
end

  def edit
    @order = Order.find_by(id: params[:id])
  
  end

  def update
    @current_user = Meal.find(session[:meal_id]) if session[:meal_id]
    @current_user.orders.find_by(id: params[:id]).update(order_params)
    flash[:notice] = 'Order was successfully updated.' 
    redirect_to orders_path
  end

  def destroy
    @current_user = Meal.find(session[:meal_id]) if session[:meal_id]
    @current_user.orders.find_by(id: params[:id]).destroy
    flash[:notice] = 'Order was successfully destroyed.' 
    redirect_to orders_path
  end

  def add
    @order = Order.find(params[:id])
    
    @comment = Comment.new(content: params[:content])
    @order.comments << @comment
    @comment.save
  end

  private
  def order_params
    params.require(:order).permit(
        :quantity,
        :meal_id,
        :user_id

      )
  end

  def comment_params
    params.require(:comment).permit(:content)
  end

end
