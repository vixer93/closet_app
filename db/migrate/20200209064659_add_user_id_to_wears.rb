class AddUserIdToWears < ActiveRecord::Migration[5.2]
  def change
    add_reference :wears, :user, foreign_key: true
  end
end
