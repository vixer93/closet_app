class CreateWears < ActiveRecord::Migration[5.2]
  def change
    create_table :wears do |t|
      t.string :image, null: false
      t.string :color
      t.string :type
      t.string :brand

      t.timestamps
    end
  end
end
