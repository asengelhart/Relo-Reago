class AddIsAdminToUsers < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :is_admin, :boolean, :default => false
    User.all.each do |user|
      user.update!(is_admin: false)
      user.save!
    end
  end

  def down
    remove_column :users, :is_admin
  end
end
