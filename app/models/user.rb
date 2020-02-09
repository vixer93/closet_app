class User < ApplicationRecord
  has_many :wears
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
