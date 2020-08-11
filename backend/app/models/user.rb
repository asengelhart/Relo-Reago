class User < ApplicationRecord
  has_secure_password
  has_many :translations
  has_many :descriptions
end
