class UserSerializer < ActiveModel::Serializer
  attributes :name
  has_many :orders
  has_many :meals, through: :orders
  
end