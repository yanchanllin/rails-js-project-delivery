class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :meal_id
      t.integer :user_id
      t.integer :quantity
     t.datetime "created_at", null: false
     t.datetime "updated_at", null: false
    end
  end
end
