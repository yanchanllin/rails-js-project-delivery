class Meal < ApplicationRecord
  has_many :orders
  has_many :users, through: :orders
  validates :name, presence: true
  scope :most_recent, -> {where{order(created_at: :DESC).limit(1)}}

  def self.most_recent
    where{order(created_at: :DESC).limit(1)}
  end  
  
end
