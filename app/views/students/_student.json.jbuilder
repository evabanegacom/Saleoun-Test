json.extract! student, :id, :name, :class, :section, :registration_number, :roll_number, :created_at, :updated_at
json.url student_url(student, format: :json)
