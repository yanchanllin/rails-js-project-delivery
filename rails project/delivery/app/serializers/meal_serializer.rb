class MealSerializer < ActiveModel::Serializer
    attributes :name
    has_many :orders
  end