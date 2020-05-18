class AddVotesToDescription < ActiveRecord::Migration[6.0]
  def change
    add_column :descriptions, :votes, :integer
  end
end
