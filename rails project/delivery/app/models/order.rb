class Order < ActiveRecord::Base
  belongs_to :meal
  belongs_to :user
  validates :quantity, presence: true
  
  def self.by_order(order_id)
    where(order: order_id)
  end

  
 end
