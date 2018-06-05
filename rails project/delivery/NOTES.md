Models

User
has_many :orders
has_many :meals, through :orders

Meal
has_many :orders
has_many :userss, through :orders

Order - Join
belongs_to :meal
belongs_to :user



cernan

chicken pasta - 2



ashley


chicken pasta - 1


1. remove the customer model
2. add the meal model
3. fix all the associations