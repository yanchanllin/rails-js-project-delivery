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



--Add New Meal in the navigation bar when logged in
--Add validation so user cannot create empty name for meal 
--Add login through Facebook -authentication
Display error messages when user tries to create a meal or an order with no values
Add scope method to one of your models - Order model?