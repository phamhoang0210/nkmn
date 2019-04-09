class Role < ApplicationRecord
  validates :name, length: { maximum: 80 }, presence: true
  has_many :user
end
