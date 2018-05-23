# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(name: "derick", password: "password")

customer = Customer.create(name: "yona", address: '348 31 St New York, NY 10003', phone: "718 421 6788", user_id: user.id) 

order = Order.create(description: "chicken wings and drink combo", customer_id: customer.id)
