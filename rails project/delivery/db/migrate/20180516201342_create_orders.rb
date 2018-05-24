class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :customer_id
      t.integer :user_id
      t.string :description
     t.datetime "created_at", null: false
     t.datetime "updated_at", null: false
    end
  end
end
