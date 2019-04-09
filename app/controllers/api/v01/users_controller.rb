class Api::V01::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  #Get api/v01/user
  def index
      @record = User.all
      render json: {status:'SUCCESS', messages: 'Loaded User', data: @record}, status: :ok
  end
  #Get api/v01/user/1
  def show
      @record = User.find_by id: params[:id]
      # current_user
      render json: @record
  end

  def new
      @record = User.new
  end
  #POST api/v01/user
  def create
     @record = User.new(entity_params)
     binding.pry
     if @record.save
        render json: {status:'SUCCESS', messages: 'Save User', data: @record}, status: :ok
     else
        render json: {status:'ERROR', messages: 'Not save User', data: @record.errors}, status: :unprocessable_entity
     end
  end

  #update api/v01/update
  def update
    @record = User.find(params[:id])
    if @record.update_attributes(entity_params)
      render json: {status:'SUCCESS', messages: 'update user', data: @record}, status: :ok
    else
      render json: {status:'ERRORS', messages: 'update user', data: @record.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @record = User.find(params[:id])
    @record.destroy
    render json: {status: 'SUCCESS', messages: 'Delete User', date: @record}, status: :ok
  end

  protected

  def entity_params
    params.require(:record).permit(
      :name,
      :email,
      :role_id,
      :password,
      :password_confirmation
    )
  end
end
