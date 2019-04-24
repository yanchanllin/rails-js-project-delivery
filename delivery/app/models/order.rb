class Order < ActiveRecord::Base
  belongs_to :meal
  belongs_to :user
  validates :quantity, presence: true
  has_many :comments
  
  def next
    order = Order.where("id > ?", id).first

    if order
      order
    else
      Order.first
    end
  end 
  
 end
