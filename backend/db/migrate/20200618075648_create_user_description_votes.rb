class CreateUserDescriptionVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :user_description_votes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :description, null: false, foreign_key: true
      t.boolean :upvoted

      t.timestamps
    end
  end
end
