class Order < ActiveRecord::Base
  belongs_to :meal
  belongs_to :user
  validates :quantity, presence: true
  scope :meal_ordered, -> {where(ordered: true)}
  
  def self.meal_ordered
    where(ordered: true)
  end

  
 end
