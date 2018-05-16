class Order < ActiveRecord::Base
  belongs_to :user
  belongs_to :customer

  def take_order
    user_has_address，user_has_phone = check_if_user_meets_the_requirements
    if user_has_address && user_has_phone
      start_order
    elsif user_has_address && !user_has_phone
       "Sorry. " + has_no_phone
    elsif user_has_phone && !user_has_address
        "Sorry. " + has_no_address
    else
      "Sorry. " + has_no_address + " " + has_no_phone
    end
  end

  def check_if_user_meets_the_requirements
     user_has_address，user_has_phone = false

     return [user_has_address, user_has_phone]
   end

   def start_order
     new_address = self.user.address
     new_phone = self.user.phone
     new_name =  self.user.name
     self.user.update(
       :name => new_name,
       :address => new_address,
       :phone => new_phone
     )
     "Thanks, this is the order of #{self.customer.name}!"
   end

   def has_no_address
     "You do not have the address for #{self.customer.name}."
   end

   def has_no_phone
     "You do not have the phone for #{self.customer.name}."
   end

 end
