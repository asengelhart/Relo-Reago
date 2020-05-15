class Translation < ApplicationRecord
  # Note that I'm deliberately NOT validating presence of user,
  # since the large majority of translations will be from our seed data
  
  belongs_to :user
  has_many :descriptions
end
