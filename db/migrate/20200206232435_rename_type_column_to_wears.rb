class RenameTypeColumnToWears < ActiveRecord::Migration[5.2]
  def change
    rename_column :wears, :type, :wtype
  end
end
