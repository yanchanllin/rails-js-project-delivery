class User < ApplicationRecord
  has_secure_password
  has_many :orders
  has_many :customers, through: :orders
  def food

  end

end
