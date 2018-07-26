class Meal < ApplicationRecord
  has_many :orders
  has_many :users, through: :orders
  validates :name, presence: true
  scope :most_recently_added_meal, -> {where{order(created_at: :DESC).limit(1)}}

  
end
