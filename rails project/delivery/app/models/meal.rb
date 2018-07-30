class Meal < ApplicationRecord
  has_many :orders
  has_many :users, through: :orders
  validates :name, presence: true
 
  
  def self.most_ordered
    Order.joins(:meal).group('meals.id').order('count(meals.id)DESC').limit(1).first
  end 
end

