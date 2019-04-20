class OrdersController < ApplicationController

 def index
    @orders = Order.all 
    respond_to do |f|
      f.html { render :index }
      f.json {render json: @orders}
    end 
  end
  
  def show
    @order = Order.find(params[:id])
    @meal = @order.meal
    respond_to do |format|
      format.html { render :show }
      format.json { render json:  @order }
    end
  end

  def new 
    @order = Order.new
  end
  
  def create
    @order = current_user.orders.build(order_params)
    if @order.save! 
      render json: @order
    else 
      render 'new'
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
    order = Order.find_by(id: params[:id])
    order.update(order_params)
    flash[:notice] = 'Order was successfully updated.' 
    redirect_to user_path(current_user)
  end

  def destroy
    order = Order.find_by(id: params[:id])
     order.destroy
    flash[:notice] = 'Order was successfully destroyed.' 
    redirect_to user_path(current_user)
  end

  def add
    @order = Order.find(params[:id])
    
    @comment = Comment.new(content: params[:content])
    @order.comments << @comment
    @comment.save
  end

  private
  def order_params
    params.permit(
        :quantity,
        :meal, 
        :user_id
      )
  end
  

  def comment_params
    params.require(:comment).permit(:content)
  end

end
