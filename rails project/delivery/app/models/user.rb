class User < ActiveRecord::Base
  has_secure_password
  has_many :orders
  has_many :meals, through: :orders
  validates :name, presence: true
  validates :password, length: { in:1...30 } 

end
