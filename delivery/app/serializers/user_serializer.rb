class UserSerializer < ActiveModel::Serializer

  has_many :orders
  has_many :meals, through: :orders
  
end