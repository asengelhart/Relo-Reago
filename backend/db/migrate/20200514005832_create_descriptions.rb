class CreateDescriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :descriptions do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :translation, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
