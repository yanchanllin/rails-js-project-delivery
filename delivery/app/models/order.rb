class Order < ActiveRecord::Base
  belongs_to :meal
  belongs_to :user
  validates :quantity, presence: true
  has_many :comments
  
  def next_order
    next_order = Order.where(meal_id: meal).where("id > ?", id).first

    if next_order
      next_order
    else
      Order.where(meal_id: meal).first
    end
  end

  def previous
    if previous_order = self.class.where("id < ?", id).last
      previous_order
    else
      Order.last
    end
  end

  
 end
