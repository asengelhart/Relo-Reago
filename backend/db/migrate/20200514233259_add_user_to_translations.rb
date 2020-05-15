class AddUserToTranslations < ActiveRecord::Migration[6.0]
  def change
    add_reference :translations, :user, null: false, foreign_key: true
  end
end
