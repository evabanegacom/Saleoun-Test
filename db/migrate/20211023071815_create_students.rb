class CreateStudents < ActiveRecord::Migration[6.0]
  def change
    create_table :students do |t|
      t.string :name
      t.string :student_class
      t.string :section
      t.string :registration_number
      t.string :roll_number

      t.timestamps
    end
  end
end
