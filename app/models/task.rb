class Task < ApplicationRecord
  belongs_to :user
  has_many_attached :photos

  validates :date, presence: true
end
