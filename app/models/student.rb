class Student < ApplicationRecord
  validates :name, uniqueness: true, presence: true, length: {minimum: 5, maximum: 25}, format: { with: /\A[a-zA-Z ]+\z/,
    message: "Only letters allowed" }

  validates :student_class, presence: true, length: {minimum: 1, maximum: 4}, format: { with: /\A[a-zA-Z0-9\s]+\z/i, message: "can only contain letters and numbers." }

  validates :section, presence: true, length: {minimum: 2, maximum: 2}, format: { with: /\A[a-zA-Z0-9\s]+\z/i, message: "can only contain letters and numbers." }

  validates :registration_number, uniqueness: true, presence: true, length: {minimum: 6, maximum: 6}, format: { with: /\A[a-zA-Z0-9\s]+\z/i, message: "can only contain letters and numbers." }

  validates :roll_number, uniqueness: true, presence: true, length: {minimum: 6, maximum: 6}, format: { with: /\A[a-zA-Z0-9\s]+\z/i, message: "can only contain letters and numbers." }

  def self.import_file(file)
    FirstJob.perform_later(file.path)
  end

  def row_one
    convert_to_roman(row[1])
  end

  #format: { with: /((\w+\s?-?\w+)(,|\z))/i, message: "please enter keywords in correct format"}
  def self.convert_to_roman(num)
    if num == '1'
      'I'
    elsif num == '2'
      'II'
    elsif num == '3'
    'III'
    elsif num == '4'
    'IV'
    elsif num == '5'
    'V'
    elsif num == '6'
    'VI'
    elsif num == '7'
    'VII'
    elsif num == '8'
    'VIII'
    elsif num == '9'
    'IX'
    elsif num == '10'
    'X'
    else
    num
    end
  end
end
