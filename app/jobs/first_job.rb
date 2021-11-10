class FirstJob < ApplicationJob
  queue_as :default

  def perform(filepath)
    # Do something later
    CSV.foreach(filepath, encoding: "iso-8859-1:UTF-8", headers: true) do |row|
      Student.create(name: row[0], student_class: Student.convert_to_roman(row[1]), section: row[2], registration_number: row[3], roll_number: row[4])
    end  
   # Notification.create(:user_id)
  end
end
