require 'sqlite3'

class Translation < ApplicationRecord
  # Note that I'm deliberately NOT validating presence of user,
  # since the large majority of translations will be from our seed data
  
  belongs_to :user, optional: true
  has_many :descriptions

  def self.get_start_by_lang(language, word)
    if language == "eo"
      column = "esperanto"
    elsif language == "en"
      column = "english"
    end
    self.where("#{column} LIKE ?", "#{sanitize_sql_like(word)}%").limit(20)
  end

  # Connects a downloaded sqlite file, iterates over the entries therein and
  # adds any entries that don't already exist.  Think I'll preload the current
  # DB so I don't run thousands of queries one after another
  def self.load_from_package(path = nil)
    if path
      load_from_db(path)
    else
      Downloader.get_package do |db_file|
        load_from_db(db_file.path)
      end
    end
  end

  private 

  def self.load_from_db(db_path)
    translations = self.all
    db = SQLite3::Database.new(db_path)
    db.execute("SELECT en, eo FROM _en;") do |row|
      unless translations.any?{|item| item.english == row[0] && item.esperanto == row[1]}
        create!(english: row[0], esperanto: row[1])
      end
    end
  end
end
