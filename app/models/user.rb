class User < ApplicationRecord
  has_many :wears, dependent: :delete_all

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  with_options presence: true do
    validates :name
    validates :gender
    validates :email, uniqueness: {case_sensitive: false},
                      format: {with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i}
    validates :password
  end
end
