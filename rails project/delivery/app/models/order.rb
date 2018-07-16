class Order < ActiveRecord::Base
  belongs_to :meal
  belongs_to :user
  validates :quantity, presence: true
  

  
 end
