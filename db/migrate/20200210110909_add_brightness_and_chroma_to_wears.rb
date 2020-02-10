class AddBrightnessAndChromaToWears < ActiveRecord::Migration[5.2]
  def change
    add_column :wears, :brightness, :float
    add_column :wears, :chroma, :float
  end
end
