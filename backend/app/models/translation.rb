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
end
