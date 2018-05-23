class User < ActiveRecord::Base
  has_secure_password
  has_many :customers 
  has_many :orders, through: :customers

  # def food

  #   unless admin
     
  #   end
  # end

end
