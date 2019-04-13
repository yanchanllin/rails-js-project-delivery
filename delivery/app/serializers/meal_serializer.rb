class MealSerializer < ActiveModel::Serializer
    attributes :name
    has_many :orders
  has_many :users, through: :orders
  end