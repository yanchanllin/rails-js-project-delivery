class Order < ActiveRecord::Base
  belongs_to :meal
  belongs_to :user
  validates :quantity, presence: true
  scope :most_recent, -> {where(most_recent: true)}
  
  def self.most_recent
    where(most_recent: true)
  end

  
 end
