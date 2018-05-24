class User < ActiveRecord::Base
  has_secure_password
  has_many :orders
  has_many :customers, through: :orders

  # def food

  #   unless admin
     
  #   end
  # end

end
