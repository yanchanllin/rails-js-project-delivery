class OrdersController < ApplicationController
  

 def index
    @meal = Meal.find(params[:meal_id])
    @orders = @meal.orders 
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @meal, include: :orders}
    end 
  end
  
  def show
    @order = Order.find_by(id: params[:id])
    respond_to do |f|
      f.html {render @order}
      f.json {render json: @order}
    end 
  end

  def new 
    @meal = Meal.find(params[:meal_id])
    @order = Order.new
    render template: 'orders/new'
  end

  def create
    if !params[:meal_id]
    @order = Order.new(order_params)
    @order.user_id = current_user.id
    if @order.save
      respond_to do |f|
        f.html {redirect_to meal_orders_path(@order.meal) }
        f.json {render json: @order}
      end
    else
    redirect_to user_path(current_user), :notice => "can't be blank"
  end
else
  @meal = Meal.find(params[:meal_id])
  @order = @meal.orders.create(orders_params)
  @order.user_id = current_user.id
    if @order.save
      respond_to do |f|
        f.html {redirect_to meal_orders_path(@order.meal)}
        f.json {render json: @order}
      end
    else
       redirect_to new_meal_order_path, :notice => "can't be blank"
    end
  end
end

def next_order
  @order = Order.find(params[:id])
  @next_order = @order.next_order
  respond_to do |f|
    f.html {render @next_order}
    f.json {render json: @next_order.to_json(
      { :include => [
          user: {
            only: [:username]
          },
          meal: {
           only: [:name]
          }
        ]
      }
    )
  }
  end
end

def all_orders
  @orders = Order.all
  respond_to do |f|
    f.html {render @orders}
    f.json {render json: @orders.to_json(
      { :include => [
          user: {
            only: [:username]
          },
          meal:{}
        ]
      }
    )
  }
  end
end

def highest_ordered
  @orders = Order.all

end

  def edit
    @order = Order.find_by(id: params[:id])
  
  end

  def update
    order = Order.find_by(id: params[:id])
    order.update(order_params)
    redirect_to user_path(current_user)
  end

  def users_orders
    @user = User.find_by_id(session[:user_id])
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
