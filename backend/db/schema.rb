# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_18_075648) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "descriptions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "translation_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "votes"
    t.index ["translation_id"], name: "index_descriptions_on_translation_id"
    t.index ["user_id"], name: "index_descriptions_on_user_id"
  end

  create_table "translations", force: :cascade do |t|
    t.string "english"
    t.string "esperanto"
    t.integer "user_id"
    t.integer "votes"
    t.index ["user_id"], name: "index_translations_on_user_id"
  end

  create_table "user_description_votes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "description_id", null: false
    t.boolean "upvoted"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["description_id"], name: "index_user_description_votes_on_description_id"
    t.index ["user_id"], name: "index_user_description_votes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "descriptions", "translations"
  add_foreign_key "descriptions", "users"
  add_foreign_key "translations", "users"
  add_foreign_key "user_description_votes", "descriptions"
  add_foreign_key "user_description_votes", "users"
end
