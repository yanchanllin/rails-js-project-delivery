class OrderSerializer < ActiveModel::Serializer
    attributes :quantity, :meal_id, :user_id
    belongs_to :user
    belongs_to :meal
    has_many :comments
  end