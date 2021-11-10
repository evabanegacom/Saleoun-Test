require 'rails_helper'

RSpec.describe StudensController, type: :feature do
  describe "POST /create" do
    Student.create(name: 'nike boots', student_class: 'II', section: '1C', registration_number: '1A05AA', roll_number: '1A05AA')
    pending "add some examples (or delete) #{__FILE__}"
  end
end
