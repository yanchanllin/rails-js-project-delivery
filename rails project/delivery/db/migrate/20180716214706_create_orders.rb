class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :meal_id 
      t.integer :user_id 
      t.integer :quantity 
      t.timestamps 
      
    end
  end
end
