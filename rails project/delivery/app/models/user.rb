class User < ActiveRecord::Base
  has_secure_password
  has_many :orders
  has_many :meals, through: :orders
  validates :password, length: { in:4..15}

end
