class Api::V1::StudentsController < ApplicationController
  before_action :set_student, only: %i[show update destroy]

  # GET /students or /students.json
  def index
    @students = Student.all.order('name ASC')

    render json: @students
  end

  # GET /students/1 or /students/1.json
  def show
    render json: @student
  end

  # GET /students/new
  def new
    @student = Student.new
  end

  # def create

  #   FirstJob.perform_later(params[:student])
  #   #csv_text = "#{Rails.root}/public/newcsv.csv"
  #   # CSV.foreach(params[:student], encoding: "iso-8859-1:UTF-8", headers: true) do |row|
  #   #   Student.create(name: row[0], student_class: convert_to_roman(row[1]), section: row[2], registration_number: row[3], roll_number: row[4])
  #   # end
  #   render json: @students
  # end

  def create
    # csv_text = "#{Rails.root}/public/newcsv.csv"
    Student.import_file(params[:student])
    # Student.create(name: row[0], student_class: convert_to_roman(row[1]), section: row[2], registration_number: row[3], roll_number: row[4])
    render json: {identifier: Time.now()}
  end

  # GET /students/1/edit
  def edit; end

  ## POST /students or /students.json
  # def create
  #   @student = Student.new(student_params)

  #   if @student.save
  #     render json: @student, status: :created, location: @student
  #   else
  #     render json: @student.errors, status: :unprocessable_entity
  #   end
  # end

  # PATCH/PUT /students/1 or /students/1.json
  def update
    if @student.update(student_params)
      render json: @student
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  # DELETE /students/1 or /students/1.json
  def destroy
    @student.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_student
    @student = Student.find(params[:id])
  end

  # def convert_to_roman(num)
  #   if num == '1'
  #     'I'
  #   elsif num == '2'
  #     'II'
  #   elsif num == '3'
  #   'III'
  #   elsif num == '4'
  #   'IV'
  #   elsif num == '5'
  #   'V'
  #   elsif num == '6'
  #   'VI'
  #   elsif num == '7'
  #   'VII'
  #   elsif num == '8'
  #   'VIII'
  #   elsif num == '9'
  #   'IX'
  #   elsif num == '10'
  #   'X'
  #   else
  #   num
  #   end
  # end

  # Only allow a list of trusted parameters through.
  def student_params
    params.require(:student).permit(:name, :student_class, :section, :registration_number, :roll_number)
  end
end
