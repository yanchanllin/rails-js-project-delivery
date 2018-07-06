class Meal < ApplicationRecord
  has_many :orders
  has_many :users, through: :orders
  validates :name, presence: true
     
  
end
