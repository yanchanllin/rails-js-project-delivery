class CreateCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :food
      t.string :order_id 

    end
  end
end