class CustomersController < ApplicationController
  def create
    customer = Customer.create(customer_params)
    message = customer.customer_info
    redirect_to user_path(customer.user), flash: { message:message }
  end

  private
  def customer_params
    params.require(:customer).permit(
      :user_id,
      :order_id
      )
  end
end
