class AddVotesToTranslation < ActiveRecord::Migration[6.0]
  def change
    add_column :translations, :votes, :integer
  end
end
