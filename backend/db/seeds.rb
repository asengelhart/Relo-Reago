# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
open("db/structure.sql") do |f|
  sql = f.read
  sql_lines = sql.split(/$/)
  (0...9000).each{|i| Translation.connection.execute(sql_lines[i]) }
end

user = User.create!(name: "Admin", password: ENV["ADMIN_PASSWORD"], is_admin: true)
# test_translation = Translation.create!(esperanto: "Gonzaga Universitato", english: "Gonzaga University", user: user)
# test_description = Description.create!(translation: test_translation, user: user, content: "Katolika universitato en Spokane, Vaŝingtono")
