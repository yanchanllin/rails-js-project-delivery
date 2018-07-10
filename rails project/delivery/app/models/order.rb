class Order < ActiveRecord::Base
  belongs_to :meal
  belongs_to :user
  validates :quantity, presence: true
  scope :most_recent, -> {where{order(created_at: :DESC).limit(1)}}

  def self.most_recent
    where{order(created_at: :DESC).limit(1)}
  end

  
 end
