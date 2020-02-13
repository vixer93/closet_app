class AddHueToWears < ActiveRecord::Migration[5.2]
  def change
    add_column :wears, :hue, :float
  end
end
